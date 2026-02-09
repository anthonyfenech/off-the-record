# OFF-THE-RECORD: Special Section Formatting Guide

## Purpose
This document defines the formatting rules for special sections in OFF-THE-RECORD. When updating manuscript content, adding new sections, or modifying existing ones, follow these rules exactly.

---

## CSS Classes Reference

| Class | Purpose | Properties |
|---|---|---|
| `scene-break` | Centered `***` divider | `text-align: center !important; text-indent: 0 !important;` |
| `flashback-header` | Special section headline | `text-align: center !important; text-indent: 0 !important; font-family: 'Courier New', monospace; font-weight: bold; font-size: calc(var(--font-size-reader) + 2px); letter-spacing: 3px;` |
| `email-line` | Tight-grouped content (no spacing between lines) | `text-indent: 0 !important; margin-top: 0 !important; margin-bottom: 0 !important;` |
| `has-dateline` | Flush left with spacing above (for datelines) | `text-indent: 0 !important; margin-top: 1em !important;` |

---

## Standard Paragraph Formatting (for reference)

Regular body paragraphs use `.chapter-body p`:
- `text-indent: 0.5in` (first-line indent)
- `text-align: justify`
- `margin: 0`
- `line-height: 1.6`
- First paragraph of each chapter: no indent (`p:first-child`)

---

## Special Section Types

### Type 1: SECTION WITH MESSAGE/EMAIL CONTENT
Used for: **JUNK MAIL**, **AIRPLANE MODE** (with messages)

#### HTML Pattern:
```html
<!-- Space before section -->
<p></p>

<!-- Opening divider -->
<p class="scene-break">***</p>

<!-- Space between divider and header -->
<p></p>

<!-- Section header -->
<p class="flashback-header">SECTION NAME HERE</p>

<!-- Space between header and content -->
<p></p>

<!-- Messages/emails - all tight together, no spacing between lines -->
<p class="email-line"><strong>Sender Name:</strong> Message text here.</p>
<p class="email-line"><strong>Another Sender:</strong> Their message text here.</p>
<p class="email-line"><strong>Third Person:</strong> More message text.</p>

<!-- Space before closing divider -->
<p></p>

<!-- Closing divider -->
<p class="scene-break">***</p>

<!-- Space after section -->
<p></p>
```

#### Rules:
1. Every message paragraph gets `class="email-line"`
2. Sender name up to and including the colon is bold: `<strong>Sender Name:</strong>`
3. NO `<p></p>` between individual messages — they sit tight together
4. One `<p></p>` after the header before first message
5. One `<p></p>` after last message before closing `***`

#### For email-style content (like JUNK MAIL with From/Subject/Body):
```html
<p class="email-line"><strong>From:</strong> Name <strong>Sent:</strong> Date</p>
<p class="email-line"><strong>Subject:</strong> Subject line</p>
<p class="email-line"><em>Email body text in italics.</em></p>

<!-- Blank line ONLY between separate emails -->
<p></p>

<p class="email-line"><strong>From:</strong> Next Person <strong>Sent:</strong> Date</p>
<p class="email-line"><strong>Subject:</strong> Subject line</p>
<p class="email-line"><em>Next email body text in italics.</em></p>
```

#### Email-specific rules:
1. From/Sent line, Subject line, and body text sit tight (no `<p></p>` between them)
2. `<p></p>` ONLY between separate emails (before each new `From:` or `To:` line)
3. Bold labels: `From:`, `Sent:`, `Subject:`, `To:` — colon included in the bold
4. Email body text is italic: wrapped in `<em>` tags

---

### Type 2: SECTION WITH NARRATIVE CONTENT
Used for: **EMBARRASSING FLASHBACK**

#### HTML Pattern:
```html
<!-- Space before section -->
<p></p>

<!-- Opening divider -->
<p class="scene-break">***</p>

<!-- Space between divider and header -->
<p></p>

<!-- Section header -->
<p class="flashback-header">EMBARRASSING FLASHBACK</p>

<!-- Space between header and content -->
<p></p>

<!-- Content uses normal paragraph formatting (regular classes) -->
<p class="has-dateline"><span class="dateline">CITY, <em>Date</em>—</span>Regular narrative text...</p>
<p>Regular indented paragraph continues the story...</p>
<p>More regular paragraphs...</p>

<!-- Space before closing divider -->
<p></p>

<!-- Closing divider -->
<p class="scene-break">***</p>

<!-- Space after section -->
<p></p>
```

#### Rules:
1. Content inside uses normal manuscript formatting (datelines, indented paragraphs)
2. NOT flush left — regular paragraph rules apply
3. The header and `***` dividers follow the same pattern as Type 1

---

### Type 3: EMPTY SECTION HEADER (divider only)
Used for: **AIRPLANE MODE** (second instance — no content)

#### HTML Pattern:
```html
<p></p>
<p class="scene-break">***</p>
<p></p>
<p class="flashback-header">AIRPLANE MODE</p>
<p></p>
<p class="scene-break">***</p>
<p></p>
```

#### Rules:
1. No content between header and closing `***`
2. Still gets `<p></p>` spacing on all sides

---

## Current Special Sections in the Manuscript

| Section | Type | Chapter | Content |
|---|---|---|---|
| EMBARRASSING FLASHBACK | Type 2 (narrative) | Rookie Year | Flashback to Opening Day 2013 |
| AIRPLANE MODE (1st) | Type 1 (messages) | World Series | 23 text messages after Verlander incident |
| AIRPLANE MODE (2nd) | Type 3 (empty) | Late chapter | Divider only, no content |
| JUNK MAIL (1st) | Type 1 (emails) | Pennant Race | 4 reader/editor emails with From/Subject/Body |
| JUNK MAIL (2nd) | Type 1 (emails) | Later chapter | 5 reader/editor emails with From/Subject/Body |

---

## Adding New Content to Existing Special Sections

### Example: Adding 4 new emails to JUNK MAIL

If the manuscript is updated with new emails, insert them following the email pattern:

```html
<!-- After existing emails, before closing *** -->

<p></p>
<p class="email-line"><strong>From:</strong> New Person <strong>Sent:</strong> Wednesday, March 15, 2017 3:22 PM</p>
<p class="email-line"><strong>Subject:</strong> New subject line</p>
<p class="email-line"><em>New email body text goes here.</em></p>

<p></p>
<p class="email-line"><strong>From:</strong> Another Person <strong>Sent:</strong> Thursday, March 16, 2017 9:00 AM</p>
<p class="email-line"><strong>Subject:</strong> Another subject</p>
<p class="email-line"><em>Another email body.</em></p>
```

### Example: Adding new messages to AIRPLANE MODE

```html
<!-- After existing messages, before closing *** -->
<p class="email-line"><strong>New Contact:</strong> Their message text here.</p>
<p class="email-line"><strong>Another Contact:</strong> Another message.</p>
```

No `<p></p>` between messages — they stay tight.

---

## Creating a Brand New Special Section

If the manuscript introduces a new special section (e.g., "PRESS BOX NOTES"):

1. Determine the type: messages (Type 1), narrative (Type 2), or empty divider (Type 3)
2. Use `flashback-header` class for the header (despite the name, it applies to ALL special sections)
3. Follow the HTML pattern for that type exactly
4. No CSS changes needed — the existing classes handle everything

---

## Things That Must NEVER Change

- `scene-break` is plain black centered text — no gray, no special font-size, no letter-spacing
- `flashback-header` is always Courier New bold, centered, +2px from body text
- `email-line` always has zero margin top AND bottom
- `<p></p>` is the ONLY way to create blank line spacing — never use `<p>&nbsp;</p>`
- Sender names are always bold up to and including the colon
- Email body text is always italic (`<em>` wrapped)
- Regular narrative content inside special sections keeps normal paragraph formatting

---

## Claude Code Instructions

When processing manuscript updates that include special sections:

1. Read this formatting guide FIRST
2. Identify which special sections are affected
3. Apply the correct Type (1, 2, or 3) formatting
4. Use the exact CSS classes specified — do not invent new ones
5. Preserve all existing media emoji spans and data-media-id attributes
6. Preserve all dateline spans and has-dateline classes outside special sections
7. Test by counting: `grep -c 'email-line\|flashback-header\|scene-break' data/chapters.js`
