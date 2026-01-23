# OFF-THE-RECORD: Atticus eBook Style Guide

## Brand Overview

**Aesthetic:** Typewriter meets modern minimalism
**Mood:** Raw, authentic, journalistic
**Era feel:** Classic newsroom with digital polish

---

## STEP 1: FONTS

### Body Text (Chapter Content)
- **Font:** Literata (Google Fonts - free)
- **Fallback:** Georgia, Times New Roman
- **Why:** Designed specifically for long-form reading, excellent on screens and print

### Headings & UI Elements
- **Font:** Courier New (monospace)
- **Fallback:** Courier, any monospace
- **Why:** Typewriter aesthetic, journalistic feel

### In Atticus:
1. Go to **Design → Fonts**
2. **Body Font:** Select "Literata" or upload the .ttf/.otf file
3. **Heading Font:** Select "Courier New" or "Courier Prime"
4. If Literata unavailable, use **Georgia** (closest match)

---

## STEP 2: COLORS

### Primary Palette (Monochromatic)
| Element | Hex Code | Use |
|---------|----------|-----|
| Primary Text | `#333333` | Body text, headings |
| Secondary Text | `#666666` | Subtitles, metadata |
| Tertiary Text | `#999999` | Scene breaks, hints |
| Background | `#FEFEFE` | Page background (off-white) |
| Accent | `#333333` | Buttons, emphasis |
| Borders | `#DDDDDD` | Dividers, rules |

### In Atticus:
1. Go to **Design → Theme**
2. Set text color to `#333333`
3. Keep background white/off-white
4. Avoid colored accents - stay monochrome

---

## STEP 3: TYPOGRAPHY SETTINGS

### Body Text
| Setting | Value |
|---------|-------|
| Font Size | 16px (1rem) - let reader adjust |
| Line Height | 1.4 (tight for book feel) |
| Alignment | **Justified** |
| Paragraph Indent | **0.5 inch** (first-line indent) |
| Paragraph Spacing | **0** (no space between paragraphs) |

### Chapter Titles
| Setting | Value |
|---------|-------|
| Font | Courier New (monospace) |
| Size | 30px / 1.875rem |
| Weight | **Bold** |
| Case | **ALL UPPERCASE** |
| Letter Spacing | **3px / wide** |
| Alignment | **Centered** |

### In Atticus:
1. **Design → Paragraph**
   - First line indent: 0.5"
   - Space after paragraph: 0
   - Alignment: Justified

2. **Design → Chapter Headings**
   - Font: Courier/monospace
   - Transform: UPPERCASE
   - Alignment: Center
   - Add letter-spacing if available

---

## STEP 4: SPECIAL FORMATTING

### Scene Breaks (Section Dividers)
**Symbol:** `* * *` (three asterisks with spaces)
**Styling:**
- Centered
- Color: `#999999` (gray)
- Letter spacing: wide (0.5em)
- Margin: 2.5rem above and below

**In Atticus:**
1. Use the scene break feature (usually `***` or `* * *`)
2. Or insert centered text: `* * *`
3. Style as gray if possible

### Datelines (Location/Time stamps)
**Example:** *Lakeland, Florida — March 2017*
**Styling:**
- Italic
- No indent on that paragraph
- Same font as body (Literata/serif)

**In Atticus:**
1. Italicize the dateline text
2. Remove first-line indent for that paragraph
3. Format: *Location — Date*

### Flashback Headers
**Example:** SUMMER 2014
**Styling:**
- Courier/monospace font
- Bold
- ALL UPPERCASE
- Centered
- No indent

**In Atticus:**
1. Create as a subheading or styled paragraph
2. Apply monospace font
3. Bold + uppercase + center

### Block Quotes (Emails, Letters, Documents)
**Styling:**
- No indent
- Light gray background (`#F5F5F5`) if supported
- Padding around text
- Distinct from body text

**In Atticus:**
1. Use the blockquote feature
2. Or indent left/right margins
3. Remove first-line indent

### Text Messages / Dialogue Lists
**Styling:**
- No indent
- Each message on new line
- Consider slight left margin

---

## STEP 5: CHAPTER STRUCTURE

### Standard Chapter Layout:
```
[CHAPTER NUMBER - optional]

CHAPTER TITLE
(centered, uppercase, monospace, bold)

[blank line]

First paragraph starts here with no indent.

    Subsequent paragraphs have 0.5" indent.

    Continue with indented paragraphs...

* * *

Scene break resets indent - no indent after.

    Back to indented paragraphs...
```

### First Paragraph Rule:
**IMPORTANT:** First paragraph of each chapter has NO indent.
After scene breaks (`* * *`), the next paragraph also has NO indent.

**In Atticus:**
1. Manually remove indent from first paragraph
2. Remove indent from paragraphs following scene breaks
3. Or use Atticus's "no indent after break" setting if available

---

## STEP 6: FRONT & BACK MATTER

### Title Page
- **Title:** OFF-THE-RECORD
- Font: Courier/monospace
- ALL UPPERCASE
- Centered
- Bold
- Letter-spacing: wide

### Copyright Page
- Monospace font
- Standard copyright language
- Centered or left-aligned

### Table of Contents
- Monospace font for chapter titles
- UPPERCASE chapter names
- Simple, minimal styling

---

## STEP 7: SPECIFIC ELEMENTS

### Article Citations
When referencing published articles:
```
**Detroit Tigers Will Stink in 2018**
By Anthony Fenech, Detroit Free Press
🔗 freep.com/link
```
- Title: Bold, 14pt
- Byline: Regular, 10pt
- Link: Small, 8pt

### Signature Blocks
For letters/emails ending with signatures:
- Right-aligned
- Italic
- Extra space above

---

## STEP 8: EXPORT SETTINGS

### For eBook (EPUB/Kindle):
1. Embed fonts (Literata + Courier)
2. Allow reader font-size adjustment
3. Keep justified alignment
4. Test on Kindle Previewer

### For Print (PDF):
1. Page size: 6" x 9" (standard trade)
2. Margins: 0.75" inside, 0.5" outside
3. Font size: 11-12pt for print
4. Line height: 1.3-1.4

---

## QUICK REFERENCE CARD

| Element | Font | Size | Style |
|---------|------|------|-------|
| Body text | Literata | 16px | Regular, justified |
| Chapter title | Courier | 30px | Bold, UPPER, center |
| Scene break | Literata | 16px | Gray, center, `* * *` |
| Dateline | Literata | 16px | *Italic* |
| Flashback | Courier | 16px | **Bold**, UPPER, center |
| Block quote | Literata | 16px | No indent, gray bg |

---

## CHECKLIST BEFORE EXPORT

- [ ] Body font is Literata (or Georgia)
- [ ] Headings are Courier/monospace
- [ ] Chapter titles are UPPERCASE + centered
- [ ] First paragraphs have no indent
- [ ] Scene breaks use `* * *`
- [ ] Justified text alignment
- [ ] 0.5" first-line indent
- [ ] No extra space between paragraphs
- [ ] Datelines are italic with no indent
- [ ] All formatting is consistent throughout

---

## BRAND VOICE NOTES

The OFF-THE-RECORD brand is:
- **Raw** - typewriter aesthetic, unpolished feel
- **Authentic** - journalistic, documentary style
- **Minimal** - monochrome, no decoration
- **Professional** - clean, readable, serious

Avoid:
- Decorative fonts
- Colored text
- Fancy chapter ornaments
- Drop caps (unless simple)
- Excessive styling

The design should feel like reading a confidential document or a reporter's manuscript - professional but with character.
