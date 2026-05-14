==========
DIFF-PROMPT.md
TRIPLE-CHECK TEXT ACCURACY AUDIT
==========

Datelines like "DETROIT, August 27—" are NOT chapter breaks.
Only chapter titles listed in chapters.js are chapter breaks.

==========
ABSOLUTE RULES
==========

1. Never modify the DOCX
2. Never modify chapters.js
3. Never modify any website file
4. Never "fix" typos or normalize source text
5. Flag every difference. Trivial differences do not exist.
6. Same inputs must produce same outputs (reproducible)
7. If uncertain, STOP and ask

==========
PARAMETERS
==========

DOCX_PATH:         absolute path to .docx
CHAPTERS_JS_PATH:  absolute path to chapters.js
WEBSITE_BASE_URL:  HTTPS base URL
OUTPUT_PATH:       absolute path for report
DIFF_SCOPE:        "ALL" or a chapter title
RANDOM_SEED:       integer (default: 42)
VERIFICATION_RUNS: integer 1-3 (default: 1)

If any parameter is missing or a placeholder, STOP.

==========
DEPENDENCIES
==========

Required: python-docx, playwright, difflib.
If you lack install permission, STOP and request it.

==========
MULTI-RUN VERIFICATION
==========

If VERIFICATION_RUNS == 1: standard single-pass audit.

If VERIFICATION_RUNS > 1:
  Execute the full audit (Checkpoint 1 through Pass 3) the
  specified number of times in sequence.

  Each run uses a different seed:
    - Run 1: RANDOM_SEED
    - Run 2: RANDOM_SEED + 1
    - Run 3: RANDOM_SEED + 2

  DETERMINISM CHECK after all runs complete:
    - Pass 1 results MUST be identical across all runs
    - Pass 2 results MUST be identical across all runs
    - Pass 3 sample sets WILL differ (different seeds, expected)
    - Pass 3 findings: report the UNION of all runs

  If Pass 1 or Pass 2 differs between runs:
    DETERMINISM_FAILURE — flag prominently in report header
    Complete the audit anyway. Do not STOP.
    The human will decide whether the disagreement is actionable.

==========
CHECKPOINT 1 — SOURCE INTEGRITY
==========

A. SHA-256 hash the DOCX
B. SHA-256 hash chapters.js
C. Parse chapters.js for chapter titles in order → known_chapters[]
D. Test-fetch first chapter URL (10s timeout, one retry)
E. JS rendering detection:
   - Fetch raw HTML
   - If text < 500 chars OR < 3 <p> tags: JS_RENDERING_REQUIRED
   - Else: RAW_FETCH_OK

Output:
  "CHECKPOINT 1 PASSED"
  - DOCX hash, chapters.js hash
  - Chapter count from chapters.js
  - Rendering mode

On failure: "CHECKPOINT 1 FAILED: [reason]" → STOP.

==========
STEP 1 — EXTRACT FROM DOCX
==========

Read paragraphs in document order with python-docx.

CHAPTER DETECTION (priority order, use first that works):
  1. Paragraph text matches a title in known_chapters[]
  2. Heading 1 style
  3. Heading 2 style
  4. Paragraph starts with "# "

If no method matches the chapter count in known_chapters[], STOP.
Report what was found vs. expected.

Per chapter, store:
  - title
  - paragraphs[]: { text, is_empty, has_italic }

Print extraction manifest:
  CH 1: "AUTHOR'S NOTE" — N paragraphs, N empty, N italic
  CH 2: "SUMMER 2017" — N paragraphs, N empty, N italic
  ...
  TOTAL: N chapters, N paragraphs

==========
STEP 2 — EXTRACT FROM WEBSITE
==========

If DIFF_SCOPE != "ALL", limit to that chapter only.

Fetch each chapter URL (parallel, max 5 concurrent):
  - RAW_FETCH_OK: 30s timeout, one retry
  - JS_RENDERING_REQUIRED: Playwright, wait for network idle

Identify content area:
  - Prefer <article>, <main>, or div class containing
    "chapter", "content", "post", "manuscript", "reader"
  - Exclude: nav, footer, header, aside, .share, .comments,
    .related, .ads, script, style

Extract <p> tags in order, preserve every character.

SUSPICIOUS flags (do not halt — log in report):
  - Website count < 50% of DOCX count → SUSPICIOUS_LOW_COUNT
  - Website count > 150% of DOCX count → SUSPICIOUS_HIGH_COUNT

Print extraction manifest mirroring DOCX format.

==========
CHECKPOINT 2 — EXTRACTION SANITY
==========

Show:
A. Chapter counts (DOCX vs. website, match Y/N)
B. Chapter titles side-by-side
C. Paragraph totals
D. First chapter: paragraph[0] and paragraph[-1], both sources, 100 chars
E. Last chapter: same
F. Any SUSPICIOUS flags

Output: "CHECKPOINT 2 PASSED" or "CHECKPOINT 2 FAILED: [reason]" → STOP.

==========
PASS 1 — STRUCTURAL DIFF
==========

For each chapter pair:
  Compare non-empty count, empty count, italic-bearing count.

Log mismatches:
  STRUCTURE_MISMATCH: "[title]"
    DOCX:    N para, N empty, N italic
    Website: N para, N empty, N italic
    Delta:   +/-N, +/-N, +/-N

Italic comparison is on COUNT only, not text content.

==========
PASS 2 — CONTENT DIFF (NORMALIZED)
==========

Deep-copy both arrays. Apply IN ORDER to copies only:
  1. U+2018 ('), U+2019 (')     -> U+0027 (')
  2. U+201C ("), U+201D (")     -> U+0022 (")
  3. U+2013 (-)                  -> U+2014 (-)
  4. "--" (two hyphens)          -> U+2014 (-)
  5. U+00A0 (nbsp)               -> U+0020 (space)
  6. U+2026 (...)                -> "..."
  7. Whitespace runs             -> single space
  8. Trim leading/trailing whitespace

Originals untouched. Report references originals.

PER CHAPTER PAIR:
  If counts match: compare paragraph-by-paragraph
  If counts differ: difflib.SequenceMatcher to align, then
    classify unaligned paragraphs as PARAGRAPH_ADDED,
    PARAGRAPH_REMOVED, PARAGRAPH_SPLIT, or PARAGRAPH_MERGE

Per difference, log:
  - chapter_title
  - paragraph_index (within chapter, 0-based)
  - context_before (up to 10 words before first differing char;
    "[paragraph start]" if at position 0)
  - docx_text (original)
  - website_text (original)
  - char_diff (inline)
  - category: MISSING_TEXT | EXTRA_TEXT | CHANGED_TEXT |
              PUNCTUATION | WHITESPACE | CHARACTER_ENCODING |
              PARAGRAPH_SPLIT | PARAGRAPH_MERGE |
              PARAGRAPH_ADDED | PARAGRAPH_REMOVED

==========
PASS 3 — RAW SPOT-CHECK (UNNORMALIZED)
==========

sample_size = min(50, max(20, total_paragraphs * 0.05))

Seed random with the run's seed (RANDOM_SEED for run 1,
RANDOM_SEED+1 for run 2, etc.). Sample paragraphs proportional
to chapter length. Always include first paragraph of first
chapter and last paragraph of last chapter.

For each sampled paragraph:
  - Locate corresponding website paragraph by chapter + index
  - If no match (count mismatch), skip and note
  - Compare character-by-character WITHOUT normalization
  - Log differences as RAW_CHARACTER_DRIFT:
    - chapter + paragraph index (e.g., "BURN OUT, paragraph 23")
    - Unicode codepoints of differing characters
    - Visual representation

Print the full sample list (chapter + paragraph index) per run.

==========
CHECKPOINT 3 — REPORT THE PASSES
==========

If VERIFICATION_RUNS == 1:
  - Pass 1 structural: N
  - Pass 2 content: N
  - Pass 3 raw drift: N
  - In BOTH Pass 2 AND Pass 3: N (double-confirmed)
  - In Pass 3 ONLY: N (encoding hidden by normalization)

If VERIFICATION_RUNS > 1:
  Same totals (using union for Pass 3), PLUS:
  - Determinism check: PASSED / FAILED
  - If FAILED: which pass differed between which runs

Output: "CHECKPOINT 3 PASSED"

==========
CHECKPOINT 4 — REPORT INTEGRITY
==========

A. Every Difference entry fully populated
B. Re-hash DOCX. Must match Checkpoint 1.
C. Re-hash chapters.js. Must match Checkpoint 1.
D. OUTPUT_PATH directory writable

If a hash changed: CRITICAL BUG. Report loudly.
Output: "CHECKPOINT 4 PASSED" or "CHECKPOINT 4 FAILED: [reason]"

==========
STEP 4 — WRITE REPORT
==========

Save to OUTPUT_PATH:

----------
TRIPLE-CHECK DIFF REPORT
Generated: [ISO timestamp]
DOCX: [filename] (SHA-256: [hash])
chapters.js: [filename] (SHA-256: [hash])
Website base: [url]
Rendering: [RAW_FETCH | JS_RENDERING]
Seed: [N]
Verification runs: [N]
Determinism: [PASSED | FAILED — only if runs > 1]
Scope: [ALL | chapter title]
----------

SUMMARY
DOCX chapters:        N
Website chapters:     N
Chapter match:        YES/NO
DOCX paragraphs:      N
Website paragraphs:   N
Paragraph match:      YES/NO

Pass 1 structural:    N
Pass 2 content:       N
Pass 3 raw drift:     N (union across runs if multi-run)
Double-confirmed:     N
Encoding-only:        N

CHECKPOINTS
  1. Source Integrity:     PASSED
  2. Extraction Sanity:    PASSED
  3. Three-Pass Reporting: PASSED
  4. Report Integrity:     PASSED

----------
EXTRACTION MANIFESTS
----------
[Per-chapter paragraph counts, DOCX vs. website]

----------
PASS 1 — STRUCTURAL
----------
[Mismatches per chapter]

----------
PASS 2 — CONTENT
----------
[Numbered differences]

----------
PASS 3 — RAW DRIFT
----------
Run 1 sampled (seed=N):
  [list of chapter + paragraph indices]
Run 2 sampled (seed=N+1):
  [list of chapter + paragraph indices]
...

Findings (union across runs):
  [drift instances with codepoints]

----------
DETERMINISM CHECK (multi-run only)
----------
Run 1 Pass 1: N mismatches
Run 2 Pass 1: N mismatches
Run 1 Pass 2: N differences
Run 2 Pass 2: N differences
Result: IDENTICAL / DIFFERENT
[If DIFFERENT: explain what diverged]

----------
END OF REPORT
----------