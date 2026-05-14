#!/usr/bin/env python3
"""apply-mutations-2b3.py — Phase 2b.3 residual cleanup.

Third and final round of manuscript-website sync. Applies 17 labeled
mutations in order, each must match exactly once. Recomputes wordCount
for changed chapters. Validates JS parses. Writes back.

Transient script — delete after a successful commit.
"""
import html
import json
import re
import subprocess
import sys
from datetime import datetime
from pathlib import Path

CHAPTERS_JS = "data/chapters.js"
SIDECAR_NEW = "/tmp/chapters-2b3-test.mjs"
SIDECAR_ORIG = "/tmp/chapters-2b3-orig.mjs"

TAG_RE = re.compile(r"<[^>]+>")


# ─── 17 labeled mutations (label, find, replace) ────────────────────────────

MUTATIONS = [
    ("B3",
     "Once again, a friend helps. This time, it’s ESPN.com’s Marly Rivera who helps piece together that the Tigers have been pursuing lefty reliever Justin Wilson, according to her source.",
     "Once again, a friend helps. ESPN.com’s Marly Rivera helps me piece together the rumor du jour of the hour: Detroit is pursuing reliever Justin Wilson, according to her source."),

    ("B4",
     "I try and fail at lobbying Martinez to buy me a new laptop.",
     "After the game, I try and fail at lobbying J.D. to buy me a new laptop."),

    ("B5",
     "While we’re walking out of the clubhouse, a local TV reporter looks at me and says, “Why the hell would you do that?”",
     "Walking out of the clubhouse, someone looks at me and says, “Why the hell would you do that?”"),

    # B6 — leading-space-fragile: deletes one sentence including the
    # preceding single space, leaving the prior sentence's period flush.
    ("B6",
     " I am told there was another incident that I am still trying to dig up.",
     ""),

    ("B7",
     "CC: “Hey, man. Is anything coming on them facing off? Would be good to have a headline on it, please.”",
     "“Hey, man. Is anything coming on them facing off? Would be good to have a headline on it, please.”"),

    # B8a — UNETHICAL Dec 19 opening restructure.
    # Inserts a paragraph break (</p>\n\n<p>) inside what was a single
    # <p>...</p>. The website's straight-quote &quot; becomes a curly “ ”
    # pair in the docx phrasing.
    ("B8a",
     "By the time I get out of bed, Coach Content is calling. &quot;Can you come into the office and talk to Peter today?",
     "By the time I get out of bed, my boss is calling. He doesn’t say hello, or even good morning—it’s half past nine—he says this: “Did you</p>\n\n<p>“Can you come into the office and talk to Peter today?"),

    ("B8b",
     "sports content coach Christopher Thomas phoned",
     "sports content coach Chris Thomas phoned"),

    ("C1",
     "So, I’m not shocked when Coach Content flashes my phone. But I’ll admit to being surprised when I saw the reason why.",
     "So, I’m not shocked when my boss texts me. But I’ll admit to being surprised when I saw the reason why."),

    # C3 — REVERSE: docx says "Coach Content", website currently says "Thomas".
    ("C3",
     "“This is going to drop tomorrow,” Thomas says.",
     "“This is going to drop tomorrow,” Coach Content says."),

    # C4 — leading-space-fragile: drop "Visited the village" sentence (LONDON)
    ("C4",
     " Visited the village where my grandparents lived.",
     ""),

    # C5 — leading-space-fragile: drop "I headed for the village" sentence (MALTA)
    ("C5",
     " I headed for the village, past an old man selling veggies at the side of the road.",
     ""),

    ("D2",
     "I get back home after 10 on the evening of the trade deadline.",
     "I get back home on the evening of the trade deadline."),

    ("D3",
     "Ron Colangelo has been in touch with the new sports content coach. He and another Gannett editor fret until print deadline passed.",
     "Ron Colangelo has been in touch with a new desk guy who was hired in the spring as sports content coach. He and another Gannett editor fret until print deadline passes."),

    ("D4",
     "Postgame, I’m in and out.",
     "Postgame, I’m in and out of the clubhouse."),

    # D5 — INNER-MARKUP SAFE: trailing space matches "11 " before <span class="small-caps">P.M.</span>
    ("D5",
     "Very Serious Story is in the hopper by 11 ",
     "The Very Serious Story is in the hopper by 11 "),

    ("D6",
     "Nearing midnight, I receive a most unnerving text message.",
     "But nearing midnight, I receive a most unnerving text message."),

    # E1 — INNER-MARKUP SAFE: <em>Free Press</em> stays intact
    ("E1",
     "<em>Free Press</em>’entertainment reporter",
     "<em>Free Press</em>’ entertainment reporter"),

    # E2 — INNER-MARKUP SAFE: anchored on the redaction-bar &nbsp;</span>;
    # inserts the docx opening sentence before "Seriously".
    ("E2",
     "&nbsp;</span>Seriously, man, if his stance",
     "&nbsp;</span>Time to investigate J.V.’s steroid use, eh? Seriously, man, if his stance"),
]


# ─── helpers ────────────────────────────────────────────────────────────────

def abort(msg):
    print(f"ABORT: {msg}", file=sys.stderr)
    sys.exit(1)


def parse_chapters(file_text, sidecar):
    Path(sidecar).write_text(file_text, encoding="utf-8")
    proc = subprocess.run(
        ["node", "--no-warnings", "-e",
         f"import('file://{Path(sidecar).resolve()}').then(m => process.stdout.write(JSON.stringify(m.CHAPTERS))).catch(e => {{ console.error(e.message); process.exit(1); }})"],
        capture_output=True, text=True,
    )
    if proc.returncode != 0:
        abort(f"node parse failed:\n{proc.stderr}")
    return json.loads(proc.stdout)


def compute_wordcount(content):
    plain = TAG_RE.sub(" ", content)
    plain = html.unescape(plain).replace(" ", " ")
    return len(plain.split())


def id_marker(chapter_id):
    if isinstance(chapter_id, str):
        return f"id: '{chapter_id}',"
    if isinstance(chapter_id, float) and chapter_id == int(chapter_id):
        return f"id: {int(chapter_id)},"
    return f"id: {chapter_id},"


def update_wordcount(text, chapter_id, new_wc):
    marker = id_marker(chapter_id)
    idx = text.find(marker)
    if idx == -1:
        abort(f"update_wordcount: id marker {marker!r} not found")
    cidx = text.find("content: `", idx)
    if cidx == -1:
        abort(f"update_wordcount: content field not found for {marker!r}")
    pos = cidx + len("content: `")
    while pos < len(text):
        ch = text[pos]
        if ch == "\\" and pos + 1 < len(text):
            pos += 2
            continue
        if ch == "`":
            break
        pos += 1
    if pos >= len(text):
        abort(f"update_wordcount: unterminated content backtick for {marker!r}")
    m = re.search(r"wordCount:\s*(\d+)\b", text[pos:])
    if not m:
        abort(f"update_wordcount: wordCount not found for {marker!r}")
    return text[:pos + m.start(1)] + str(new_wc) + text[pos + m.end(1):]


# ─── main ───────────────────────────────────────────────────────────────────

def main():
    if not Path(CHAPTERS_JS).exists():
        abort(f"{CHAPTERS_JS} not found (run from repo root)")

    text = Path(CHAPTERS_JS).read_text(encoding="utf-8")
    print(f"Loaded {CHAPTERS_JS} ({len(text):,} bytes)", file=sys.stderr)

    # ── Pre-apply sanity checks ───────────────────────────────────────────
    nbsp_count = text.count("&nbsp;</span>")
    if nbsp_count != 1:
        abort(f"sanity: &nbsp;</span> count is {nbsp_count}, expected 1 (E2 anchor ambiguous)")
    free_press_count = text.count("<em>Free Press</em>")
    if free_press_count < 1:
        abort(f"sanity: <em>Free Press</em> count is {free_press_count}, expected at least 1 (E1 anchor missing)")
    b8a_pre = text.count("By the time I get out of bed, Coach Content is calling")
    if b8a_pre != 1:
        abort(f"sanity: B8a anchor count is {b8a_pre}, expected 1")
    b8a_continuation = text.count("By the time I get out of bed, Coach Content is calling. &quot;Can you come into")
    if b8a_continuation != 1:
        abort(f"sanity: B8a anchor is not followed by '&quot;Can you come into' as expected (count {b8a_continuation})")
    print(f"Sanity checks OK: &nbsp;</span>={nbsp_count}, <em>Free Press</em>={free_press_count}, B8a anchor=1", file=sys.stderr)

    # ── Backup (reuse today's if exists) ──────────────────────────────────
    backups = sorted(Path("/tmp").glob("chapters.js.backup-2b3-*"), reverse=True)
    if backups:
        backup_path = backups[0]
        print(f"Reusing backup: {backup_path}", file=sys.stderr)
    else:
        backup_path = Path(f"/tmp/chapters.js.backup-2b3-{datetime.now().strftime('%Y%m%d-%H%M%S')}")
        backup_path.write_text(text, encoding="utf-8")
        print(f"Wrote backup: {backup_path}", file=sys.stderr)

    # ── Apply 17 mutations in order ───────────────────────────────────────
    for label, find_, replace_ in MUTATIONS:
        n = text.count(find_)
        if n != 1:
            abort(f"mutation {label}: found {n} matches (expected 1). FIND first 100 chars: {find_[:100]!r}")
        text = text.replace(find_, replace_, 1)
        print(f"  {label}: applied", file=sys.stderr)
    print(f"Applied {len(MUTATIONS)} mutations", file=sys.stderr)

    # ── Validate via node ─────────────────────────────────────────────────
    new_chapters = parse_chapters(text, SIDECAR_NEW)
    if len(new_chapters) != 43:
        abort(f"validate: expected 43 chapters, got {len(new_chapters)}")
    print(f"Validate OK: {len(new_chapters)} chapters", file=sys.stderr)

    # ── Recompute wordCounts for changed chapters ─────────────────────────
    orig_chapters = parse_chapters(backup_path.read_text(encoding="utf-8"), SIDECAR_ORIG)
    orig_content = {str(c["id"]): c.get("content", "") for c in orig_chapters}

    wc_updates = []
    for c in new_chapters:
        cid = c["id"]
        new_c = c.get("content", "")
        old_c = orig_content.get(str(cid))
        if old_c is None or new_c == old_c:
            continue
        new_wc = compute_wordcount(new_c)
        old_wc = c.get("wordCount", 0)
        text = update_wordcount(text, cid, new_wc)
        wc_updates.append((cid, c.get("title"), old_wc, new_wc, len(new_c) - len(old_c)))

    print(f"\nwordCount updates ({len(wc_updates)} chapters):", file=sys.stderr)
    for cid, title, old_wc, new_wc, byte_delta in wc_updates:
        print(f"  id={cid!r:<8} {title:<28} wc {old_wc} → {new_wc}  (content byte delta {byte_delta:+,})", file=sys.stderr)

    # ── Write final ──
    Path(CHAPTERS_JS).write_text(text, encoding="utf-8")
    print(f"\nWrote {CHAPTERS_JS} ({len(text):,} bytes)", file=sys.stderr)
    print(f"Backup at: {backup_path}", file=sys.stderr)


if __name__ == "__main__":
    main()
