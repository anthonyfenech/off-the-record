# OFF-THE-RECORD: Manuscript Update Workflow
## The Complete Guide — Updated February 8, 2026

---

## TABLE OF CONTENTS

1. [Before You Start](#before-you-start)
2. [Option A: Update a Single Chapter](#option-a-update-a-single-chapter)
3. [Option B: Update Multiple Specific Chapters](#option-b-update-multiple-specific-chapters)
4. [Option C: Full Manuscript Replacement](#option-c-full-manuscript-replacement)
5. [Option D: Small Text Edit (a few sentences)](#option-d-small-text-edit)
6. [Option E: Add a Brand New Chapter](#option-e-add-a-brand-new-chapter)
7. [Formatting Rules (Must Preserve)](#formatting-rules-must-preserve)
8. [Special Section Reference](#special-section-reference)
9. [Verification Checklists](#verification-checklists)
10. [Emergency Rollback](#emergency-rollback)

---

## BEFORE YOU START

### What You Need to Know

All manuscript content lives in ONE file: `data/chapters.js`

This file feeds the main reader (index.html).

### Chapter Structure in chapters.js

Each chapter is a JavaScript object:

```javascript
{
    id: 5,                    // Unique number — DO NOT CHANGE
    year: 2015,               // Year for nav grouping
    section: 'year',          // Section type (see below)
    title: "ROOKIE YEAR",     // Chapter title
    subtitle: "Detroit",      // Subtitle (optional)
    teaser: "The beginning.", // Teaser text (optional)
    content: `                // THE MANUSCRIPT TEXT (HTML)
        <p>First paragraph...</p>
        <p>Second paragraph...</p>
    `,
    wordCount: 2400           // Approximate word count
}
```

### Section Types

| Value | Purpose | Chapters |
|---|---|---|
| `title` | Title page | id: -1 |
| `toc` | Table of contents | id: 0 |
| `intro` | Opening chapters | ids: 1-4 (Author's Note through Scandal!) |
| `year` | Main story chapters | ids: 5-27 |
| `postscript` | Closing chapters | ids: 28-29 (Postscript, Dedication) |

### Preparing Your Word Doc

**Recommended: Save as "Web Page, Filtered"**
1. Open Manuscript.docx in Microsoft Word
2. File → Save As
3. Format: "Web Page, Filtered (.htm)"
4. Save as `Manuscript_update.html`

This preserves italics as `<em>` tags while stripping Word formatting junk.

**Alternative: Plain Text Export**
1. Open Manuscript.docx
2. Select All (Cmd+A), Copy (Cmd+C)
3. Open TextEdit → Paste → Format → Make Plain Text
4. Save as `Manuscript_update.txt`

This strips ALL formatting — you'll need to manually note where italics go, or Claude Code can compare against the Word doc.

**Third Option: Upload the .docx directly to Claude Code**
Claude Code can read .docx files. Less clean than HTML export but works for targeted updates.

---

## OPTION A: UPDATE A SINGLE CHAPTER

**When to use:** You edited one chapter in Word and want to update just that one.

### Your Prep:
1. Note which chapter (title and id number)
2. Copy the updated chapter text from Word
3. Note any new italics, datelines, or special sections

### Prompt for Claude Code:

```
MANUSCRIPT UPDATE - SINGLE CHAPTER

I need to update Chapter [NUMBER]: "[CHAPTER TITLE]" in data/chapters.js.

BEFORE MAKING ANY CHANGES:
1. Read docs/SPECIAL-FORMATTING-GUIDE.md
2. Show me the CURRENT content of this chapter in chapters.js
3. I will paste the new text below

FORMATTING RULES:
- Every paragraph = <p> tag
- Dateline paragraphs: <p class="has-dateline"><span class="dateline">CITY, <em>Date</em>—</span>Text...</p>
- Italics: <em>text</em>
- Scene breaks: <p></p><p class="scene-break">***</p><p></p>
- First paragraph of chapter: no special class needed (CSS handles it)
- All other paragraphs: regular <p> (CSS adds indent automatically)

MUST PRESERVE (do not delete or modify):
- All <span class="media-emoji" data-media-id="..."> elements and their exact positions
- All <span class="dateline"> wrappers
- All class="has-dateline" on dateline paragraphs
- All class="scene-break", "flashback-header", "email-line" elements
- All <p></p> spacing elements around special sections

WORKFLOW:
1. Show me current chapter content (first 10 lines, last 10 lines)
2. I paste new text
3. You show me a diff of what changed
4. I confirm
5. You update chapters.js
6. You update wordCount
7. Commit: git add data/chapters.js && git commit -m "Update Chapter [N]: [TITLE]" && git push origin main

NEW TEXT FOR CHAPTER [NUMBER]:
[PASTE YOUR UPDATED TEXT HERE]
```

### What Claude Code Does:
1. Shows you current content
2. Compares old vs new
3. Converts your pasted text to proper HTML
4. Preserves all media emojis and special formatting
5. Updates and pushes

---

## OPTION B: UPDATE MULTIPLE SPECIFIC CHAPTERS

**When to use:** You edited 3-10 chapters and want to update them in batch.

### Your Prep:
1. List the chapters being updated (titles and id numbers)
2. Export Word doc as "Web Page, Filtered" OR prepare individual text for each chapter
3. Note any structural changes (new sections, moved content, etc.)

### Prompt for Claude Code:

```
MANUSCRIPT UPDATE - MULTIPLE CHAPTERS

I need to update the following chapters in data/chapters.js:
- Chapter [N]: [TITLE]
- Chapter [N]: [TITLE]
- Chapter [N]: [TITLE]

BEFORE MAKING ANY CHANGES:
1. Read docs/SPECIAL-FORMATTING-GUIDE.md
2. Create a backup: cp data/chapters.js data/chapters.js.backup
3. Create a new branch: git checkout -b manuscript-update

UPLOADED FILE: [Manuscript_update.html OR .docx OR .txt]

FORMATTING RULES:
- Every paragraph = <p> tag
- Dateline paragraphs: <p class="has-dateline"><span class="dateline">CITY, <em>Date</em>—</span>Text...</p>
- Italics: <em>text</em>
- Scene breaks: <p></p><p class="scene-break">***</p><p></p>
- Special sections: follow docs/SPECIAL-FORMATTING-GUIDE.md exactly

MUST PRESERVE (do not delete or modify):
- All <span class="media-emoji" data-media-id="..."> elements
- All dateline spans and has-dateline classes
- All scene-break, flashback-header, email-line elements
- All <p></p> spacing elements around special sections
- Chapter metadata (id, year, section, title, subtitle, teaser) — do NOT change these

WORKFLOW — process ONE chapter at a time:
1. Extract the chapter text from the uploaded file
2. Compare to current chapters.js content for that chapter
3. Show me a summary: what lines changed, what was added, what was deleted
4. Wait for my confirmation before updating
5. After I confirm, update that chapter's content in chapters.js
6. Update wordCount
7. Move to next chapter

After ALL chapters are updated:
1. Run verification: grep -c 'media-emoji\|has-dateline\|scene-break\|flashback-header\|email-line' data/chapters.js
2. Report counts
3. Commit: git add data/chapters.js && git commit -m "Update chapters [list]: [brief summary]"
4. Do NOT push yet — I will test locally first

CHANGE LOG:
[Describe what changed in each chapter — e.g., "Chapter 5: rewrote opening 3 paragraphs, added new scene at end"]
```

---

## OPTION C: FULL MANUSCRIPT REPLACEMENT

**When to use:** Major rewrite. Most or all chapters have changes. Nuclear option.

### Your Prep:
1. Export Word doc as "Web Page, Filtered" → `Manuscript_new.html`
2. Upload to Claude Code along with current `chapters.js`
3. Have a change log ready (even rough notes help)

### Prompt for Claude Code:

```
FULL MANUSCRIPT REPLACEMENT

I'm replacing the entire manuscript in data/chapters.js from a new Word HTML export.

BEFORE MAKING ANY CHANGES:
1. Read docs/SPECIAL-FORMATTING-GUIDE.md
2. Create a full backup: cp data/chapters.js data/chapters.js.FULL-BACKUP
3. Create a new branch: git checkout -b full-manuscript-update
4. Extract current media emoji inventory:
   grep -o 'data-media-id="[^"]*"' data/chapters.js | sort > /tmp/media-before.txt
5. Extract current dateline count:
   grep -c 'has-dateline' data/chapters.js > /tmp/dateline-count-before.txt
6. Extract current special section counts:
   grep -c 'scene-break\|flashback-header\|email-line' data/chapters.js > /tmp/special-before.txt

UPLOADED FILE: Manuscript_new.html

THE PROCESS — chapter by chapter:

For EACH chapter (1 through 29):

1. EXTRACT the chapter text from Manuscript_new.html
   - Find the chapter by its title heading
   - Extract all paragraphs until the next chapter heading

2. CONVERT to proper HTML:
   - <em> for italics (should already be there from Word HTML export)
   - <p> for each paragraph
   - Identify datelines: CITY, Date— format → add has-dateline class and dateline span
   - Identify scene breaks: *** → add scene-break class with <p></p> spacing
   - Identify special sections: JUNK MAIL, AIRPLANE MODE, EMBARRASSING FLASHBACK → apply formatting per SPECIAL-FORMATTING-GUIDE.md

3. PRESERVE existing media emojis:
   - For each chapter, extract all media-emoji spans from the CURRENT chapters.js
   - Find where each emoji was positioned (what text it appears after)
   - Re-insert each emoji in the same relative position in the new text
   - If surrounding text changed significantly, flag it for my review

4. REPLACE the chapter content in chapters.js
   - Update the content field
   - Update wordCount
   - Do NOT change id, year, section, title, subtitle, or teaser

5. SHOW ME a summary before moving to the next chapter:
   - Paragraphs added/removed
   - Media emojis preserved (count)
   - Any emojis that couldn't be placed (flagged for review)
   - Special sections handled

AFTER ALL CHAPTERS:

1. Run full verification:
   grep -o 'data-media-id="[^"]*"' data/chapters.js | sort > /tmp/media-after.txt
   diff /tmp/media-before.txt /tmp/media-after.txt
   
2. Compare counts:
   - Media emojis: before vs after (should be identical)
   - Datelines: before vs after
   - Scene breaks, flashback headers, email lines

3. If any media emojis are MISSING, list them so I can manually place them

4. Commit to branch: git commit -m "Full manuscript replacement from Word v[X]"
5. Do NOT merge to main — I will test locally first

IMPORTANT:
- Process ONE chapter at a time
- Show me summary after EACH chapter
- Wait for my OK before proceeding to the next
- Flag anything uncertain — better to ask than to guess
```

### After Testing Locally:

```
MERGE MANUSCRIPT UPDATE

git checkout main
git merge --squash full-manuscript-update
git commit -m "Full manuscript update v[X]: [brief summary of major changes]"
git push origin main
git branch -d full-manuscript-update
```

---

## OPTION D: SMALL TEXT EDIT (A FEW SENTENCES)

**When to use:** Fixing a typo, rewording a sentence, adding a line or two.

### Prompt for Claude Code:

```
SMALL TEXT EDIT

In data/chapters.js, Chapter [NUMBER] ("[TITLE]"):

Find this text:
"[PASTE THE CURRENT TEXT — enough context to find it uniquely]"

Replace with:
"[PASTE THE NEW TEXT]"

Preserve all HTML tags, classes, and media emojis in or near this text.

git add data/chapters.js && git commit -m "Edit Chapter [N]: [brief description]" && git push origin main
```

That's it. No branch needed for small edits.

---

## OPTION E: ADD A BRAND NEW CHAPTER

**When to use:** Adding a chapter that doesn't exist yet in chapters.js.

### Prompt for Claude Code:

```
ADD NEW CHAPTER

Add a new chapter to data/chapters.js.

BEFORE MAKING ANY CHANGES:
1. Read docs/SPECIAL-FORMATTING-GUIDE.md
2. Show me the current last chapter (id and title)

NEW CHAPTER DETAILS:
- id: [NEXT NUMBER — one higher than current last]
- year: [YEAR]
- section: '[year/intro/postscript]'
- title: "[CHAPTER TITLE]"
- subtitle: "[SUBTITLE OR EMPTY]"
- teaser: "[TEASER OR EMPTY]"

INSERT POSITION: [after Chapter N / before Chapter N / at the end]

CONTENT:
[PASTE THE CHAPTER TEXT]

FORMATTING:
- Apply all standard paragraph formatting
- Identify and format any datelines
- Identify and format any special sections (per SPECIAL-FORMATTING-GUIDE.md)
- Wrap italics in <em>
- Calculate wordCount

Also update the TABLE OF CONTENTS (id: 0) to include the new chapter.

git add data/chapters.js && git commit -m "Add new chapter: [TITLE]" && git push origin main
```

---

## FORMATTING RULES (MUST PRESERVE)

### Standard Paragraphs
```html
<p>Regular paragraph with 0.5in indent (CSS handles this).</p>
```

### Dateline Paragraphs (flush left, no indent)
```html
<p class="has-dateline"><span class="dateline">DETROIT, <em>April 15</em>—</span>Text continues here.</p>
```

### Dateline Variations
```html
<!-- City + State + Date -->
<p class="has-dateline"><span class="dateline">LAKELAND, Fla., <em>February 16</em>—</span>Text...</p>

<!-- City + Date -->
<p class="has-dateline"><span class="dateline">DETROIT, <em>April 15</em>—</span>Text...</p>

<!-- Date only -->
<p class="has-dateline"><span class="dateline"><em>April 15</em>—</span>Text...</p>

<!-- Time only -->
<p class="has-dateline"><span class="dateline">1:05 <span class="small-caps">P.M.</span>—</span>Text...</p>
```

### Italics
```html
<p>He read the <em>Free Press</em> every morning.</p>
```

### Media Emojis (interactive triggers)
```html
<p>Text before the trigger. <span class="media-emoji" data-media-id="unique-id">📷</span></p>
```

Common emoji types:
- 📷 = photo
- 🔴 = audio
- 📧 = email screenshot
- 💬 = text message
- 🎙️ = interview clip

### Scene Breaks
```html
<p></p>
<p class="scene-break">***</p>
<p></p>
```

### Empty Line (section spacing)
```html
<p></p>
```

### Small Caps
```html
<span class="small-caps">P.M.</span>
```

---

## SPECIAL SECTION REFERENCE

(See docs/SPECIAL-FORMATTING-GUIDE.md for complete details)

### Quick Reference:

| Type | Header | Content Style | Examples |
|---|---|---|---|
| Type 1 | flashback-header + scene breaks | email-line (tight) | JUNK MAIL, AIRPLANE MODE |
| Type 1B | No header, just emails | email-line (tight) | A LETTER TO THE EDITOR emails |
| Type 2 | flashback-header + scene breaks | Normal paragraphs | EMBARRASSING FLASHBACK |
| Type 3 | flashback-header + scene breaks | Empty (no content) | AIRPLANE MODE (2nd) |

---

## VERIFICATION CHECKLISTS

### After Any Update — Quick Check:
```bash
# Media emojis still present
grep -c 'media-emoji' data/chapters.js

# Datelines intact
grep -c 'has-dateline' data/chapters.js

# Scene breaks intact
grep -c 'scene-break' data/chapters.js

# Special headers intact
grep -c 'flashback-header' data/chapters.js

# Email formatting intact
grep -c 'email-line' data/chapters.js

# No banned patterns
grep -c '&nbsp;' data/chapters.js  # Should be 0
grep -c '<span>.*\*\*\*' data/chapters.js  # Should be 0

# File parses correctly (no syntax errors)
node -e "import('./data/chapters.js').then(m => console.log(m.CHAPTERS.length + ' chapters loaded'))"
```

### After Full Manuscript Replacement — Comprehensive:
```bash
# All of the above, PLUS:

# Compare media emoji inventory
grep -o 'data-media-id="[^"]*"' data/chapters.js | sort | uniq

# Check chapter count
grep -c '"id":' data/chapters.js

# Check for orphaned HTML tags
grep -c '<p>$' data/chapters.js  # Unclosed p tags
grep -c '</p>$' data/chapters.js  # Orphaned closing tags

# Verify all chapters have content
node -e "import('./data/chapters.js').then(m => m.CHAPTERS.forEach(c => { if(c.content.length < 50 && c.id > 0) console.log('SHORT:', c.id, c.title) }))"
```

### Visual Spot-Check (you do this):
1. Open localhost, check 3 random chapters
2. Verify paragraph indents look correct
3. Click 2-3 media emojis — do they trigger?
4. Check a dateline — is it flush left?
5. Check a special section — does it match the formatting guide?

---

## EMERGENCY ROLLBACK

### If Something Breaks After Pushing to Main:

```bash
# See recent commits
git log --oneline -10

# Revert the last commit
git revert HEAD
git push origin main

# OR hard reset to a specific commit
git reset --hard [COMMIT_HASH]
git push origin main --force
```

### If You Have a Backup:

```bash
# Restore from backup file
cp data/chapters.js.backup data/chapters.js
git add data/chapters.js
git commit -m "Restore chapters.js from backup"
git push origin main
```

### If Working on a Branch (safest):

```bash
# Just delete the branch and go back to main
git checkout main
git branch -D [branch-name]
# Main is untouched
```

---

## TIPS & BEST PRACTICES

1. **Always backup first** — `cp data/chapters.js data/chapters.js.backup` before big changes
2. **Use branches for big updates** — Options B and C create branches; Options A and D go straight to main
3. **Process chapter by chapter** — Never let Claude Code update all chapters at once without showing you each one
4. **Test locally before pushing** — `python3 -m http.server 8000` and check localhost
5. **Keep a change log** — Even rough notes help Claude Code target the right content
6. **Verify media emojis survived** — These are the most fragile elements in an update
7. **Don't rush full replacements** — Option C should take 2-3 sessions, not one
8. **Word HTML export is your friend** — "Web Page, Filtered" gives the cleanest conversion
9. **Upload the formatting guide** — Always reference docs/SPECIAL-FORMATTING-GUIDE.md in prompts
10. **Screenshot and compare** — After updates, screenshot the same section on the live site and compare to Word
