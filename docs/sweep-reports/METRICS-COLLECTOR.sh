#!/usr/bin/env bash
# METRICS-COLLECTOR.sh — produces metrics block for sweep reports
#
# Usage:
#   bash docs/sweep-reports/METRICS-COLLECTOR.sh --pre    # before sweep
#   bash docs/sweep-reports/METRICS-COLLECTOR.sh --post   # after Phase 2 fixes
#   bash docs/sweep-reports/METRICS-COLLECTOR.sh          # raw snapshot, no label
#
# Output goes to stdout. Pipe to a file or copy/paste into the sweep report.
# Designed to be IDEMPOTENT and READ-ONLY — runs against current working tree.

set -uo pipefail

# Portable md5: Linux uses md5sum, macOS uses md5 -q
md5_of() {
  if command -v md5sum >/dev/null 2>&1; then
    md5sum "$1" | awk '{print $1}'
  elif command -v md5 >/dev/null 2>&1; then
    md5 -q "$1"
  else
    echo "missing-md5-tool"
  fi
}

# ─────────────────────────────────────────────
# CONFIGURATION + MODE DISPATCH
# ─────────────────────────────────────────────

# cd to repo root FIRST so PRE_FILE resolves correctly regardless of CWD.
cd "$(git rev-parse --show-toplevel)" 2>/dev/null || {
  echo "ERROR: not in a git repository"
  exit 1
}

# ───── Mode dispatch (snapshot / pre / post) ─────
MODE_ARG="${1:-snapshot}"
case "$MODE_ARG" in
  --pre|-pre|pre)         RUN_MODE="pre"      ; LABEL="PRE" ;;
  --post|-post|post)      RUN_MODE="post"     ; LABEL="POST" ;;
  --snapshot|-snapshot|snapshot|"")
                          RUN_MODE="snapshot" ; LABEL="SNAPSHOT" ;;
  *)
    echo "Usage: $0 [--pre|--post|--snapshot]" >&2
    exit 2
    ;;
esac

PRE_FILE="docs/sweep-reports/.pre-snapshot.md"
POST_TMP="$(mktemp -t otr-post.XXXXXX)"
trap 'rm -f "$POST_TMP"' EXIT

# Save original stdout on fd 3 so we can restore it cleanly at the end
# without depending on /dev/tty (which doesn't exist in non-interactive
# contexts like CI or tool-invocation).
exec 3>&1

# In --pre and --post, redirect stdout so the existing echo logic
# below writes to file/temp instead of the terminal.
case "$RUN_MODE" in
  pre)   exec > "$PRE_FILE" ;;
  post)  exec > "$POST_TMP" ;;
  # snapshot leaves stdout as-is
esac

# ─────────────────────────────────────────────
# HEADER
# ─────────────────────────────────────────────

echo "## METRICS — $(echo "$LABEL" | tr '[:lower:]' '[:upper:]') ($(date -u '+%Y-%m-%d %H:%M:%SZ'))"
echo ""
echo "**Git state:**"
echo "- Branch: $(git branch --show-current)"
echo "- HEAD SHA: $(git rev-parse HEAD)"
echo "- Working tree clean: $(if [ -z "$(git status --short)" ]; then echo "yes"; else echo "no"; fi)"
echo ""

# ─────────────────────────────────────────────
# CODE VOLUME (source lines, excluding minified)
# ─────────────────────────────────────────────

echo "### Code volume"
echo ""

js_lines=$(find js -type f -name "*.js" ! -name "*.min.js" -exec cat {} \; 2>/dev/null | wc -l | tr -d ' ')
css_lines=$(find css -type f -name "*.css" ! -name "*.min.css" -exec cat {} \; 2>/dev/null | wc -l | tr -d ' ')
html_lines=$(find . -maxdepth 1 -type f -name "*.html" -exec cat {} \; 2>/dev/null | wc -l | tr -d ' ')
data_lines=$(find data -type f -name "*.js" -exec cat {} \; 2>/dev/null | wc -l | tr -d ' ')

echo "| Type | Lines |"
echo "|------|------:|"
echo "| JS (source, non-minified) | $js_lines |"
echo "| CSS (source, non-minified) | $css_lines |"
echo "| HTML (root pages) | $html_lines |"
echo "| Data files (chapters.js, media.js, etc.) | $data_lines |"
echo "| **Total source lines** | **$((js_lines + css_lines + html_lines + data_lines))** |"
echo ""

# File counts
js_files=$(find js -type f -name "*.js" ! -name "*.min.js" 2>/dev/null | wc -l | tr -d ' ')
css_files=$(find css -type f -name "*.css" ! -name "*.min.css" 2>/dev/null | wc -l | tr -d ' ')
html_files=$(find . -maxdepth 1 -type f -name "*.html" 2>/dev/null | wc -l | tr -d ' ')

echo "**File counts:**"
echo "- JS source files: $js_files"
echo "- CSS source files: $css_files"
echo "- HTML root pages: $html_files"
echo ""

# ─────────────────────────────────────────────
# CODE QUALITY INDICATORS
# ─────────────────────────────────────────────

echo "### Code quality indicators"
echo ""

# These are the metrics the sweep specifically targets
console_count=$(grep -rcn "console\." js/*.js 2>/dev/null | grep -v '\.min\.' | awk -F: '{s+=$2} END {print s+0}')
debugger_count=$(grep -rcn "debugger" js/*.js 2>/dev/null | grep -v '\.min\.' | awk -F: '{s+=$2} END {print s+0}')
empty_catches=$(grep -rnE 'catch\s*\([^)]*\)\s*\{\s*\}' js/*.js 2>/dev/null | grep -v '\.min\.' | wc -l | tr -d ' ')
alert_count=$(grep -rcn 'alert(' js/*.js 2>/dev/null | grep -v '\.min\.' | awk -F: '{s+=$2} END {print s+0}')
todo_count=$(grep -rcEn 'TODO|FIXME|HACK|XXX' js/*.js css/*.css 2>/dev/null | grep -v '\.min\.' | awk -F: '{s+=$2} END {print s+0}')
important_count=$(grep -c '!important' css/*.css 2>/dev/null | grep -v '\.min\.' | awk -F: '{s+=$2} END {print s+0}')
loose_eq=$(grep -rcEn '[^=!]==[^=]' js/*.js 2>/dev/null | grep -v '\.min\.' | awk -F: '{s+=$2} END {print s+0}')

echo "| Indicator | Count | Severity |"
echo "|-----------|------:|----------|"
echo "| console.* statements | $console_count | P2 |"
echo "| debugger statements | $debugger_count | P1 if >0 |"
echo "| Empty catch blocks | $empty_catches | P2 |"
echo "| alert() calls | $alert_count | P2 |"
echo "| TODO/FIXME/HACK/XXX | $todo_count | P3 |"
echo "| CSS !important usages | $important_count | P2 trend |"
echo "| Loose equality (==) | $loose_eq | P3 |"
echo ""

# ─────────────────────────────────────────────
# MANUSCRIPT INTEGRITY (sacred — must be stable)
# ─────────────────────────────────────────────

echo "### Manuscript integrity (sacred — must remain stable across sweeps)"
echo ""

if [ -f data/chapters.js ]; then
  chapters_md5=$(md5_of data/chapters.js)
  echo "**chapters.js MD5:** \`$chapters_md5\`"
  echo ""

  italics=$(grep -c '<em>' data/chapters.js)
  datelines=$(grep -c 'has-dateline' data/chapters.js)
  scene_breaks=$(grep -c 'scene-break' data/chapters.js)
  flashbacks=$(grep -c 'flashback-header' data/chapters.js)
  email_lines=$(grep -c 'email-line' data/chapters.js)
  small_caps=$(grep -c 'small-caps' data/chapters.js)
  empty_p=$(grep -c '<p></p>' data/chapters.js)

  echo "| Element | Count |"
  echo "|---------|------:|"
  echo "| Italic runs (<em>) | $italics |"
  echo "| Datelines | $datelines |"
  echo "| Scene breaks | $scene_breaks |"
  echo "| Flashback headers | $flashbacks |"
  echo "| Email lines | $email_lines |"
  echo "| Small caps | $small_caps |"
  echo "| Empty \`<p></p>\` tags | $empty_p |"
  echo ""
fi

# ─────────────────────────────────────────────
# CSS HEALTH
# ─────────────────────────────────────────────

echo "### CSS health"
echo ""

# Hardcoded colors outside variables.css
hardcoded_colors=$(grep -rEn '#[0-9a-fA-F]{3,8}' css/*.css 2>/dev/null | grep -v 'variables.css' | grep -v '\.min\.' | grep -v '/\*' | wc -l | tr -d ' ')

# Empty rules
empty_rules=$(grep -E '\{[[:space:]]*\}' css/*.css 2>/dev/null | grep -v '\.min\.' | wc -l | tr -d ' ')

# Dark-mode override count
dark_mode_blocks=$(grep -rEn '\[data-theme=.dark.\]' css/*.css 2>/dev/null | grep -v '\.min\.' | wc -l | tr -d ' ')

echo "| Metric | Count |"
echo "|--------|------:|"
echo "| Hardcoded colors (approximate — may include commented) outside variables.css | $hardcoded_colors |"
echo "| Empty rules ({}) | $empty_rules |"
echo "| Dark-mode override blocks | $dark_mode_blocks |"
echo ""

# ─────────────────────────────────────────────
# SERVICE WORKER STATE
# ─────────────────────────────────────────────

echo "### Service worker"
echo ""

if [ -f sw.js ]; then
  cache_version=$(grep -oE "CACHE_VERSION.*v[0-9]+" sw.js | sed 's/.*v//' | head -1)
  min_js_refs=$(grep -c '\.min\.js' sw.js 2>/dev/null | head -1 | tr -d ' \n')
  cached_files=$(grep -oE "'[^']+'" sw.js | tr -d "'" | grep -cE '\.(html|css|js|json|woff2?|png|svg|ico)$' | tr -d ' ')

  echo "- Cache version: **v$cache_version**"
  echo "- .min.js references (regression target: 0): **$min_js_refs**"
  echo "- Static assets in cache list: **$cached_files**"
  echo ""
fi

# ─────────────────────────────────────────────
# GIT HEALTH
# ─────────────────────────────────────────────

echo "### Git health"
echo ""

local_branches=$(git for-each-ref refs/heads/ --format='%(refname:short)' | wc -l | tr -d ' ')
remote_branches=$(git for-each-ref refs/remotes/origin/ --format='%(refname:short)' 2>/dev/null | wc -l | tr -d ' ')
stale_threshold=$(date -d '14 days ago' +%Y-%m-%d 2>/dev/null || date -v-14d +%Y-%m-%d)
stale_local=$(git for-each-ref --sort=committerdate refs/heads/ --format='%(committerdate:short) %(refname:short)' | awk -v c="$stale_threshold" '$1 < c {n++} END {print n+0}')

echo "| Metric | Count |"
echo "|--------|------:|"
echo "| Local branches | $local_branches |"
echo "| Remote branches | $remote_branches |"
echo "| Local branches stale (>14 days) | $stale_local |"
echo ""

# Recent commit cadence (last 7 days)
recent_commits=$(git log --since='7 days ago' --oneline | wc -l | tr -d ' ')
echo "**Commit cadence:** $recent_commits commits in last 7 days"
echo ""

# ─────────────────────────────────────────────
# DEAD CODE INDICATORS
# ─────────────────────────────────────────────

echo "### Dead-code indicators"
echo ""

# Files with no inbound references (rough heuristic — full check is in Suite 4B)
echo "*Full orphan analysis runs in Suite 4B (HTML pages) and Suite 13E*"
echo "*(dead CSS selectors) of the sweep itself. This block reports rough counts only.*"
echo ""

# Untracked files
untracked=$(git status --short | grep '^??' | wc -l | tr -d ' ')
echo "- Untracked files: $untracked"

# Backup/temp files
backup_files=$(find . -not -path "./.git/*" -not -path "./node_modules/*" \
  \( -name "*.bak" -o -name "*~" -o -name "*.orig" -o -name "*.BACKUP*" -o -name "*.backup" -o -name "*.tmp" \) 2>/dev/null | wc -l | tr -d ' ')
echo "- Backup/temp files in tree: $backup_files"

# Large files
large_files=$(find . -type f -size +500k -not -path "./.git/*" -not -path "./node_modules/*" 2>/dev/null | wc -l | tr -d ' ')
echo "- Files >500KB: $large_files"

echo ""

# ─────────────────────────────────────────────
# COMPOSITE SCORE (rough — full scoring happens in sweep itself)
# ─────────────────────────────────────────────

echo "### Composite indicators (rough)"
echo ""

# Build a rough score from individual metrics. Higher = healthier.
# Each metric scaled to 0-10, then averaged. Sweep suite scores are
# more rigorous; these are just trend indicators.

# Console count: 0 = 10, >50 = 0
console_score=$(awk -v c="$console_count" 'BEGIN { s=10-(c/5); if (s<0) s=0; if (s>10) s=10; print s }')

# Empty catches: 0 = 10, >5 = 0
catch_score=$(awk -v c="$empty_catches" 'BEGIN { s=10-(c*2); if (s<0) s=0; if (s>10) s=10; print s }')

# debugger: any = 0, else 10
debugger_score=$(awk -v c="$debugger_count" 'BEGIN { print (c==0 ? 10 : 0) }')

# .min.js refs in sw.js: 0 = 10, >0 = 0
sw_min_score=$(awk -v c="$min_js_refs" 'BEGIN { print (c==0 ? 10 : 0) }')

# Stale branches: 0 = 10, >5 = 0
branch_score=$(awk -v c="$stale_local" 'BEGIN { s=10-(c*2); if (s<0) s=0; if (s>10) s=10; print s }')

# Untracked files: 0 = 10, >10 = 0
untracked_score=$(awk -v c="$untracked" 'BEGIN { s=10-c; if (s<0) s=0; if (s>10) s=10; print s }')

avg=$(awk -v a="$console_score" -v b="$catch_score" -v c="$debugger_score" -v d="$sw_min_score" -v e="$branch_score" -v f="$untracked_score" \
  'BEGIN { printf "%.2f", (a+b+c+d+e+f)/6 }')

echo "| Component | Score / 10 |"
echo "|-----------|----------:|"
echo "| Console hygiene | $console_score |"
echo "| Error handling | $catch_score |"
echo "| Debug artifacts | $debugger_score |"
echo "| SW .min.js fix preserved | $sw_min_score |"
echo "| Branch hygiene | $branch_score |"
echo "| Working tree cleanliness | $untracked_score |"
echo "| **Composite (rough)** | **$avg** |"
echo ""

echo "*Note: This is a rough composite. The full sweep produces per-suite*"
echo "*scores in Phase 1 report which should be considered authoritative.*"
echo ""

# ─────────────────────────────────────────────
# FOOTER
# ─────────────────────────────────────────────

echo "---"
echo ""
echo "*Generated by METRICS-COLLECTOR.sh on $(date -u '+%Y-%m-%d %H:%M:%SZ')*"
echo "*Working tree: $(if [ -z "$(git status --short)" ]; then echo "clean"; else echo "DIRTY — metrics may not reflect committed state"; fi)*"

# ───── Post-process based on mode ─────
case "$RUN_MODE" in
  snapshot)
    : # already printed to stdout
    ;;
  pre)
    # Confirmation message goes to original stdout (saved on fd 3)
    echo "Pre-snapshot saved to $PRE_FILE" >&3
    ;;
  post)
    # Restore original stdout from fd 3, then close fd 3
    exec 1>&3 3>&-
    # Print the post metrics
    cat "$POST_TMP"
    echo ""
    echo "## Diff vs. --pre"
    echo ""
    if [ -f "$PRE_FILE" ]; then
      # Strip timestamp lines before diffing (they trivially differ)
      TS_RE='[0-9]{4}-[0-9]{2}-[0-9]{2}[[:space:]][0-9]{2}:[0-9]{2}:[0-9]{2}Z'
      diff -u \
        <(grep -vE "$TS_RE" "$PRE_FILE") \
        <(grep -vE "$TS_RE" "$POST_TMP") \
        | head -200
      diff_exit=$?
      if [ $diff_exit -ne 0 ] && [ $diff_exit -ne 1 ]; then
        echo "_(diff command failed unexpectedly: $diff_exit)_"
      fi
      rm -f "$PRE_FILE"
      echo ""
      echo "_(Pre-snapshot file consumed and deleted.)_"
    else
      echo "_No pre-snapshot found at $PRE_FILE. Run with --pre first._"
    fi
    ;;
esac
