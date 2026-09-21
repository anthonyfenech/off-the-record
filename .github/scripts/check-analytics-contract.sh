#!/usr/bin/env bash
#
# check-analytics-contract.sh
#
# Verifies the structural contract that keeps page tracking alive.
# Guards three historical failures:
#   Feb 4  - the _trackPage callers were lost when analytics-tracking.js
#            was removed (c24a6f9), so pages stopped being recorded.
#   Apr 3  - trackingEnabled was left false, so events were suppressed.
#   July   - anonymous writes to the Apps Script endpoint broke.
#
# This script covers the first two. The live endpoint check runs in the
# workflow, so this script stays offline and can run on every push.
#
# Usage: check-analytics-contract.sh [directory]
#        Defaults to the repository root.
#
# Exits 0 only if every assertion passes.

set -uo pipefail

ROOT="${1:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)}"

ANALYTICS="$ROOT/js/analytics.js"
CONFIG="$ROOT/js/analytics-config.js"
READER="$ROOT/js/reader.js"

# Native DOM events analytics.js legitimately listens for. Anything it
# listens for that is NOT in this list is a custom event and must be
# dispatched by reader.js.
NATIVE_EVENTS="beforeunload online offline pagehide pageshow scroll resize load unload visibilitychange DOMContentLoaded focus blur"

pass_count=0
fail_count=0

pass() { printf 'PASS  %s\n' "$1"; pass_count=$((pass_count + 1)); }
fail() { printf 'FAIL  %s\n' "$1"; fail_count=$((fail_count + 1)); }

printf '=== analytics contract ===\n'
printf 'root: %s\n\n' "$ROOT"

# Files must exist before anything else is meaningful.
missing=0
for f in "$ANALYTICS" "$CONFIG" "$READER"; do
    if [ ! -f "$f" ]; then
        fail "required file missing: ${f#"$ROOT"/}"
        missing=1
    fi
done
if [ "$missing" -ne 0 ]; then
    printf '\n%d passed, %d failed\n' "$pass_count" "$fail_count"
    exit 1
fi

# ---------------------------------------------------------------
# 1. _trackPage is defined
# ---------------------------------------------------------------
if grep -qE '(^|[^A-Za-z0-9_])function[[:space:]]+_trackPage[[:space:]]*\(' "$ANALYTICS"; then
    pass "1  _trackPage is defined in js/analytics.js"
else
    fail "1  _trackPage is NOT defined in js/analytics.js"
fi

# ---------------------------------------------------------------
# 2/3. the two contract listeners exist (quote-agnostic)
# ---------------------------------------------------------------
for ev in chapterLoaded homePageLoaded; do
    case "$ev" in
        chapterLoaded)  n=2 ;;
        homePageLoaded) n=3 ;;
    esac
    if grep -qE "addEventListener\([\"']${ev}[\"']" "$ANALYTICS"; then
        pass "$n  a ${ev} listener exists in js/analytics.js"
    else
        fail "$n  no ${ev} listener in js/analytics.js"
    fi
done

# ---------------------------------------------------------------
# 4. both listeners sit BEFORE the IIFE's closing line
#    A listener registered after })(); never runs.
# ---------------------------------------------------------------
close_line=$(grep -nE '^\}\)\(\);' "$ANALYTICS" | tail -1 | cut -d: -f1)
if [ -z "$close_line" ]; then
    fail "4  could not find the IIFE closing line (^})();) in js/analytics.js"
else
    order_ok=1
    for ev in chapterLoaded homePageLoaded; do
        ln=$(grep -nE "addEventListener\([\"']${ev}[\"']" "$ANALYTICS" | head -1 | cut -d: -f1)
        if [ -z "$ln" ]; then
            order_ok=0
            printf '      %s listener not found, cannot check order\n' "$ev"
        elif [ "$ln" -ge "$close_line" ]; then
            order_ok=0
            printf '      %s listener at line %s is AFTER the IIFE close at line %s\n' \
                "$ev" "$ln" "$close_line"
        fi
    done
    if [ "$order_ok" -eq 1 ]; then
        pass "4  both listeners appear before the IIFE close (line $close_line)"
    else
        fail "4  a listener is at or after the IIFE close (line $close_line)"
    fi
fi

# ---------------------------------------------------------------
# 5/6. reader.js dispatches the two contract events
# ---------------------------------------------------------------
for ev in chapterLoaded homePageLoaded; do
    case "$ev" in
        chapterLoaded)  n=5 ;;
        homePageLoaded) n=6 ;;
    esac
    if grep -qE "new CustomEvent\([\"']${ev}[\"']" "$READER"; then
        pass "$n  js/reader.js dispatches ${ev}"
    else
        fail "$n  js/reader.js does NOT dispatch ${ev}"
    fi
done

# ---------------------------------------------------------------
# 7. every CUSTOM event analytics.js listens for is dispatched
#    by reader.js.
#
#    Deliberately one-directional. reader.js also dispatches
#    chapterCompleted and pageChanged, which other modules consume
#    and analytics has no reason to hear. Requiring a listener for
#    those would fail for no good reason.
# ---------------------------------------------------------------
listened=$(grep -oE "addEventListener\([\"'][A-Za-z]+[\"']" "$ANALYTICS" \
           | sed -E "s/.*[\"']([A-Za-z]+)[\"']/\1/" | sort -u)
unmatched=""
for ev in $listened; do
    is_native=0
    for nat in $NATIVE_EVENTS; do
        [ "$ev" = "$nat" ] && { is_native=1; break; }
    done
    [ "$is_native" -eq 1 ] && continue
    if ! grep -qE "new CustomEvent\([\"']${ev}[\"']" "$READER"; then
        unmatched="$unmatched $ev"
    fi
done
if [ -z "$unmatched" ]; then
    pass "7  every custom event analytics listens for is dispatched by reader.js"
else
    fail "7  listened for but never dispatched:$unmatched"
fi

# ---------------------------------------------------------------
# 8. trackingEnabled is literally true in the repo copy
# ---------------------------------------------------------------
if grep -qE '^[[:space:]]*trackingEnabled:[[:space:]]*true[[:space:]]*(,|$)' "$CONFIG"; then
    pass "8  trackingEnabled is true in js/analytics-config.js"
else
    actual=$(grep -E '^[[:space:]]*trackingEnabled:' "$CONFIG" | head -1 | sed 's/^[[:space:]]*//')
    fail "8  trackingEnabled is not literally true (found: ${actual:-nothing})"
fi

# ---------------------------------------------------------------
# 9. analyticsScriptUrl is present and is an Apps Script /exec URL
# ---------------------------------------------------------------
if grep -E '^[[:space:]]*analyticsScriptUrl:' "$CONFIG" \
   | grep -qE "https://script\.google\.com/macros/s/[A-Za-z0-9_-]+/exec"; then
    pass "9  analyticsScriptUrl is present and matches the Apps Script /exec shape"
else
    fail "9  analyticsScriptUrl is missing or not an Apps Script /exec URL"
fi

printf '\n%d passed, %d failed\n' "$pass_count" "$fail_count"
[ "$fail_count" -eq 0 ]
