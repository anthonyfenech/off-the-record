#!/usr/bin/env python3
"""apply-mutations.py — Phase 2b.2 forward-sync.

Applies 26 prose substitutions to data/chapters.js plus a full rebuild
of the AIRPLANE MODE message block. Each substitution must match
EXACTLY once; otherwise the script aborts. After substitutions, walks
the chapter list and recomputes wordCount only for chapters whose
content actually changed. Validates the JS parses before writing.

This script is transient — delete after a successful commit.
"""
import html
import json
import os
import re
import subprocess
import sys
from datetime import datetime
from pathlib import Path

CHAPTERS_JS = "data/chapters.js"
SIDECAR_NEW = "/tmp/chapters-test.mjs"
SIDECAR_ORIG = "/tmp/chapters-orig.mjs"

TAG_RE = re.compile(r"<[^>]+>")


# ─── 26 string substitutions ────────────────────────────────────────────────
# Mutation #2 was tightened (per user) to anchor on a unique three-feature
# Scene-1 prefix so the later Crunk callback (line 3932) stays untouched.

MUTATIONS = [
    # SUMMER 2017
    ("Verlander is making $28 million",
     "he’s making $28 million"),
    ('Knowing his stance about not speaking with me, I circle back to PR, saying, “You have to know that if Verlander doesn’t want to speak',
     'Knowing his newfound stance about not speaking with me, I circle back to team PR: “You have to know that if he doesn’t want to speak'),
    ("Lucky for me, Verlander was starting the next day.",
     "And guess who was starting the next day."),
    ("After the game, I asked him what happened",
     "After the game, I asked what happened"),
    ("Verlander knows he’s not just another player",
     "Justin knows he’s not just another player"),
    ("the last time Verlander went through this routine",
     "the last time Justin went through this routine"),
    ("Verlander scans the faces",
     "He scans the faces"),
    # FIRE DRILL (December 9 — reverse-sync per user)
    ("FOX 2 television reporter Jennifer Hammond, who isn’t even on the scene",
     "a television reporter back home, who isn’t even at the meetings"),
    ("it’s Villarreal again",
     "another alert from PR"),
    # THE PANDEMIC
    ("My phone pings. It’s Coach Content.",
     "My phone pings. Guess who."),
    ("At home, I crack open the Casamigos and chug.",
     "At home, I chug from a pint of tequila."),
    ("after seeing CC’s email",
     "after seeing another email"),
    ("Tigers PR or Coach Content or, if I’m really lucky, both",
     "Tigers PR, Coach Content, or, if I’m really lucky, both"),
    ("really lucky, both. If not, we might be in trouble.",
     "really lucky, both. If not, we might be all out of options."),
    ("CC sighs. He’ll call me back.",
     "He sighs. He’ll call back."),
    # PRIME-TIME (one BBQ instance, proper-noun "Salt Lick BBQ" preserved)
    ("BBQ sauce on his bottom lip",
     "barbecue sauce on his bottom lip"),
    # WAKE-UP CALL
    ("Wally won’t be back as hitting coach—I guarantee that, too",
     "Wally won’t be back—I guarantee that, too"),
    # UNETHICAL
    ("Coach Content emails about a story on Ron Colangelo—his connection to Arizona State football coach Herm Edwards",
     "My boss emails about a story on Ron Colangelo and his connection to Arizona State football coach Herm Edwards"),
    ("When I mention it to Ron, he rolls his eyes.",
     "I mention it to Ron in passing at the salad bar. He rolls his eyes."),
    ("I don’t know if CC’s email is a suggestion",
     "I don’t know if the email is a suggestion"),
    # A LETTER TO THE EDITOR
    ("Coach Content caught me flat-footed",
     "Thomas caught me flat-footed"),
    # WORLD SERIES
    ("Since Coach Content took the driver’s seat last year",
     "Since the new guy took the driver’s seat last year"),
    # BURN OUT
    ("CC takes another piece of my religion",
     "Coach Content takes another piece of my religion"),
    # BOTTOM NINE
    ("flown in to interview for my job: Ball Writing BFF Kristie Ackert—Coach Content reached out to her.",
     "to interview for my job: Ball Writing BFF Kristie Ackert. Yep. Of all the sports writers in the world, Coach Content landed on her."),
    ("So I called Coach Content, that’s how serious I was",
     "So, I called Coach Content, that’s how serious I was"),
    ("A few days ago, CC said he had a memo",
     "A few days ago, he said he had a memo"),
]


# ─── AIRPLANE MODE rebuild block ────────────────────────────────────────────
# Verbatim from spec. Contains zero backticks (verified at runtime).
# Mix of curly and straight quotes preserved exactly as the user provided.

NEW_AIRPLANE_MODE = """\
<div class="toc-page">
<h2 class="toc-page-title">AIRPLANE MODE</h2>
<p class="email-line"><strong>Mom:</strong> Woohoo best game Tigers could win—against Houston!!!!</p>

<p class="email-line"><strong>Verlander’s Former Teammate:</strong> Fenech-Verlander beef is exactly what I needed in my life.</p>

<p class="email-line"><strong>Unknown (313) Number:</strong> Any comment on the locker-room incident?</p>

<p class="email-line"><strong>Gator:</strong> He’s not talking about you is he? Lol</p>

<p class="email-line"><strong>Drug Dealer:</strong> Lmk if anyone tries to mess with you.</p>

<p class="email-line"><strong>No Clue:</strong> verlander beefin with you? whats up man?</p>

<p class="email-line"><strong>Radio Host:</strong> Hey bro, long time … any chance you can come on about the Verlander thing?</p>

<p class="email-line"><strong>National Guy:</strong> Anthony, don’t let the creeps get you down. Astros PR? Worst PR guy in my experience, which probably covers 100-plus PR guys</p>

<p class="email-line"><strong>Pedro:</strong> This is such a scary moment. It allows every club to say they can keep whoever they want out of their clubhouse. This is why this is an important matter. You’re not wrong here. Remember that.</p>

<p class="email-line"><strong>MLB PR:</strong> Hi Anthony, I just tried calling you. Here is a statement that we wanted you to have first. We have gotten some other requests from reporters and we will send this to them as well. But we wanted you to have it first.</p>

<p class="email-line"><strong>BBWAA President:</strong> Anthony, I’m sorry for missing your calls. My phone was charging downstairs overnight and I didn’t hear it ringing.</p>

<p class="email-line"><strong>Another Former Teammate:</strong> Yooo what’s Verlander’s deal?</p>

<p class="email-line"><strong>Ex-Girlfriend’s Roommate:</strong> Thought the reporters weren’t supposed to be the news? Wasn’t expecting to see you the topic of the little red ribbon at the top of the Freep.</p>

<p class="email-line"><strong>High School Classmate:</strong> Why is Justin Verlander trashing u on Twitter hahah?</p>

<p class="email-line"><strong>Deep Throat:</strong> I'd say you're the most popular sports writer in America today.</p>

<p class="email-line"><strong>Rob Parker:</strong> Anthony, that was so lame by Verlander. Hope ur OK. U wanna come on my radio show for a few minutes tonight?</p>

<p class="email-line"><strong>National TV Reporter</strong>: Crazy you’re on his mind so much. You should be flattered.</p>

<p class="email-line"><strong>Copy Editor:</strong> Did you ask about the eclipse again?</p>

<p class="email-line"><strong>Top Scout:</strong> Just read your name in ESPN. That’s great. Getting your name out there!</p>

<p class="email-line"><strong>Mom:</strong> Omg. Call when you can.</p>
</div>"""


# ─── helpers ────────────────────────────────────────────────────────────────

def abort(msg):
    print(f"ABORT: {msg}", file=sys.stderr)
    sys.exit(1)


def parse_chapters_via_node(file_text):
    """Write file_text to a sidecar .mjs and import via node; return CHAPTERS."""
    Path(SIDECAR_NEW).write_text(file_text, encoding="utf-8")
    proc = subprocess.run(
        ["node", "--no-warnings", "-e",
         f"import('file://{Path(SIDECAR_NEW).resolve()}').then(m => process.stdout.write(JSON.stringify(m.CHAPTERS))).catch(e => {{ console.error(e.message); process.exit(1); }})"],
        capture_output=True, text=True,
    )
    if proc.returncode != 0:
        abort(f"node parse failed:\n{proc.stderr}")
    return json.loads(proc.stdout)


def compute_wordcount(content):
    """Same logic the file uses: strip HTML, count whitespace tokens."""
    plain = TAG_RE.sub(" ", content)
    plain = html.unescape(plain).replace(" ", " ")
    return len(plain.split())


def id_marker(chapter_id):
    """Render the chapter id as it appears in the source file."""
    if isinstance(chapter_id, str):
        return f"id: '{chapter_id}',"
    if isinstance(chapter_id, float) and chapter_id == int(chapter_id):
        return f"id: {int(chapter_id)},"
    return f"id: {chapter_id},"


def update_wordcount_in_text(text, chapter_id, new_wc):
    """Locate the chapter's id line, walk forward past its content backtick
    block, and replace the wordCount integer that follows."""
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
        abort(f"update_wordcount: wordCount field not found for {marker!r}")
    return text[:pos + m.start(1)] + str(new_wc) + text[pos + m.end(1):]


# ─── main ───────────────────────────────────────────────────────────────────

def main():
    if not Path(CHAPTERS_JS).exists():
        abort(f"{CHAPTERS_JS} not found (run from repo root)")

    text = Path(CHAPTERS_JS).read_text(encoding="utf-8")
    print(f"Loaded {CHAPTERS_JS} ({len(text):,} bytes)", file=sys.stderr)

    # Reuse the timestamped backup if one already exists for today's run; else create.
    backup_glob = sorted(Path("/tmp").glob("chapters.js.backup-*"), reverse=True)
    if backup_glob:
        backup_path = backup_glob[0]
        print(f"Reusing existing backup: {backup_path}", file=sys.stderr)
    else:
        backup_path = Path(f"/tmp/chapters.js.backup-{datetime.now().strftime('%Y%m%d-%H%M%S')}")
        backup_path.write_text(text, encoding="utf-8")
        print(f"Wrote backup: {backup_path}", file=sys.stderr)

    # ── apply 26 substitutions in order, each must match exactly once ──
    for i, (find_, replace_) in enumerate(MUTATIONS, 1):
        n = text.count(find_)
        if n != 1:
            abort(f"mutation #{i} matched {n} times (expected 1). FIND={find_!r}")
        text = text.replace(find_, replace_, 1)
    print(f"Applied {len(MUTATIONS)} substitutions", file=sys.stderr)

    # ── AIRPLANE MODE block replacement ──
    if "`" in NEW_AIRPLANE_MODE:
        abort("NEW_AIRPLANE_MODE contains a backtick — refusing to embed inside template literal")

    title_marker = 'title: "AIRPLANE MODE"'
    title_pos = text.find(title_marker)
    if title_pos == -1:
        abort(f"{title_marker!r} not found")
    content_idx = text.find("content: `", title_pos)
    if content_idx == -1:
        abort("AIRPLANE MODE content field not found")
    bt_open = content_idx + len("content: `") - 1  # position of opening `
    pos = bt_open + 1
    while pos < len(text):
        ch = text[pos]
        if ch == "\\" and pos + 1 < len(text):
            pos += 2
            continue
        if ch == "`":
            break
        pos += 1
    if pos >= len(text):
        abort("AIRPLANE MODE: closing backtick not found")
    bt_close = pos
    text = text[:bt_open + 1] + NEW_AIRPLANE_MODE + text[bt_close:]
    print("AIRPLANE MODE block replaced", file=sys.stderr)

    # ── validate via node import (must return 43 chapters) ──
    new_chapters = parse_chapters_via_node(text)
    if len(new_chapters) != 43:
        abort(f"validate: expected 43 chapters, got {len(new_chapters)}")
    print(f"Validate OK: {len(new_chapters)} chapters parse", file=sys.stderr)

    # ── recompute wordCount for changed chapters ──
    # Parse original from disk backup
    Path(SIDECAR_ORIG).write_text(backup_path.read_text(encoding="utf-8"), encoding="utf-8")
    orig_proc = subprocess.run(
        ["node", "--no-warnings", "-e",
         f"import('file://{Path(SIDECAR_ORIG).resolve()}').then(m => process.stdout.write(JSON.stringify(m.CHAPTERS)))"],
        check=True, capture_output=True, text=True,
    )
    orig_chapters = json.loads(orig_proc.stdout)
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
        text = update_wordcount_in_text(text, cid, new_wc)
        wc_updates.append((cid, c.get("title"), old_wc, new_wc, len(new_c) - len(old_c)))

    print(f"\nwordCount updates ({len(wc_updates)} chapters):", file=sys.stderr)
    for cid, title, old_wc, new_wc, byte_delta in wc_updates:
        print(f"  id={cid!r:<8} {title:<28} wc {old_wc} → {new_wc}  (content byte delta {byte_delta:+,})", file=sys.stderr)

    # ── write final ──
    Path(CHAPTERS_JS).write_text(text, encoding="utf-8")
    print(f"\nWrote {CHAPTERS_JS} ({len(text):,} bytes)", file=sys.stderr)
    print(f"Backup at: {backup_path}", file=sys.stderr)


if __name__ == "__main__":
    main()
