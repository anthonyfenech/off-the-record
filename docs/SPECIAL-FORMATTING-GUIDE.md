# OFF-THE-RECORD: Special Section Formatting Guide
## Updated February 8, 2026

---

## CSS Classes Reference

| Class | Purpose | Properties | Defined In |
|---|---|---|---|
| `scene-break` | Centered `***` divider | `text-align: center !important; text-indent: 0 !important;` | index.html, css/typography.css, css/components.css |
| `flashback-header` | Special section headline | `text-align: center !important; text-indent: 0 !important; font-family: 'Courier New', monospace; font-weight: bold; font-size: calc(var(--font-size-reader) + 2px); letter-spacing: 3px;` | index.html, css/components.css |
| `email-line` | Tight-grouped content (no spacing between lines) | `text-indent: 0 !important; margin-top: 0 !important; margin-bottom: 0 !important;` | index.html |
| `has-dateline` | Flush left with spacing above (for datelines) | `text-indent: 0 !important; margin-top: 1em !important;` | index.html |

---

## Standard Paragraph Formatting (for reference)

Regular body paragraphs use `.chapter-body p`:
- `text-indent: 0.5in` (first-line indent)
- `text-align: justify`
- `margin: 0`
- `line-height: 1.6`
- First paragraph of each chapter: no indent (`p:first-child`)
- Dateline paragraphs (`has-dateline`): flush left, spacing above

---

## Scene Break (Universal Divider)

The scene break is the standard divider used everywhere. Plain black `***` text, centered, same font and size as body text. No gray, no special styling.

### HTML:
```html
<p></p>
<p class="scene-break">***</p>
<p></p>
```

### Rules:
- Always has `<p></p>` above AND below
- Plain text — no `<span>` wrappers ever
- No `<p>&nbsp;</p>` — always use `<p></p>` for spacing
- Inherits body font color and size — no special styling

---

## Special Section Types

### Type 1: SECTION WITH MESSAGE/EMAIL CONTENT
**Used for: JUNK MAIL (×2), AIRPLANE MODE (1st instance)**

#### Full HTML Pattern:
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

<!-- Messages - all tight together, no spacing between lines -->
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

#### Message Rules:
1. Every message paragraph gets `class="email-line"`
2. Sender name up to and including the colon is bold: `<strong>Sender Name:</strong>`
3. NO `<p></p>` between individual messages — they sit tight together
4. One `<p></p>` after the header before first message
5. One `<p></p>` after last message before closing `***`

#### Email-Style Content (JUNK MAIL with From/Subject/Body):
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

#### Email-Specific Rules:
1. From/Sent line, Subject line, and body text sit tight (no `<p></p>` between them)
2. `<p></p>` ONLY between separate emails (before each new `From:` or `To:` line)
3. Bold labels: `From:`, `Sent:`, `Subject:`, `To:` — colon included in the bold
4. Email body text is italic: wrapped in `<em>` tags
5. Multi-paragraph email bodies: each paragraph gets its own `<p class="email-line"><em>...</em></p>`

---

### Type 1B: EMAIL CONTENT WITHOUT HEADER
**Used for: A LETTER TO THE EDITOR (email exchange)**

Same as Type 1 email formatting but with NO opening `***` and NO `flashback-header`. The emails just start directly in the chapter flow, with a closing scene break after the last email.

#### HTML Pattern:
```html
<!-- Previous narrative text -->
<p>Previous paragraph ends here.</p>

<!-- Emails start directly - no header, no opening *** -->
<p class="email-line"><strong>From:</strong> Name <strong>Sent:</strong> Date</p>
<p class="email-line"><strong>Subject:</strong> Subject line</p>
<p class="email-line"><em>Email body text.</em></p>

<p></p>

<p class="email-line"><strong>To:</strong> Name <strong>Sent:</strong> Date</p>
<p class="email-line"><strong>Subject:</strong> RE: Subject line</p>
<p class="email-line"><em>Reply body text.</em></p>

<!-- Closing divider after emails -->
<p></p>
<p class="scene-break">***</p>
<p></p>

<!-- Next narrative text continues -->
```

---

### Type 2: SECTION WITH NARRATIVE CONTENT
**Used for: EMBARRASSING FLASHBACK**

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

<!-- Content uses normal paragraph formatting -->
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
1. Content inside uses NORMAL manuscript formatting (datelines, indented paragraphs)
2. NOT flush left — regular paragraph rules apply
3. The header and `***` dividers follow the same pattern as Type 1

---

### Type 3: EMPTY SECTION HEADER (divider only)
**Used for: AIRPLANE MODE (2nd instance — no content)**

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
| EMBARRASSING FLASHBACK | Type 2 (narrative) | ROOKIE YEAR | Flashback to Opening Day 2013 |
| JUNK MAIL (1st) | Type 1 (emails) | PENNANT RACE | 4 reader/editor emails with From/Subject/Body |
| JUNK MAIL (2nd) | Type 1 (emails) | GLOBETROTTING area | 5 reader/editor emails with From/Subject/Body |
| AIRPLANE MODE (1st) | Type 1 (messages) | UNETHICAL | 23 text messages after Verlander incident |
| AIRPLANE MODE (2nd) | Type 3 (empty) | Late chapter | Divider only, no content |
| A LETTER TO THE EDITOR emails | Type 1B (no header) | A LETTER TO THE EDITOR | 3 editor emails, no section header |

### Standalone Scene Breaks (no header):
- After Ernie Harwell passage
- Various chapter transitions (8+ total as of Feb 8, 2026)

---

## Adding New Content

### Adding new emails to an existing JUNK MAIL section:
```html
<!-- After existing emails, before closing *** -->
<p></p>
<p class="email-line"><strong>From:</strong> New Person <strong>Sent:</strong> Date</p>
<p class="email-line"><strong>Subject:</strong> Subject line</p>
<p class="email-line"><em>Email body text.</em></p>
```

### Adding new messages to AIRPLANE MODE:
```html
<!-- After existing messages, before closing *** -->
<p class="email-line"><strong>New Contact:</strong> Message text here.</p>
```
No `<p></p>` between messages — they stay tight.

### Adding a new scene break anywhere:
```html
<p></p>
<p class="scene-break">***</p>
<p></p>
```

### Creating a brand new special section:
1. Determine the type: messages (Type 1), narrative (Type 2), or empty (Type 3)
2. Use `flashback-header` class for the header (this class applies to ALL special section headers)
3. Follow the HTML pattern for that type exactly
4. No CSS changes needed — existing classes handle everything

---

## Things That Must NEVER Change

- `scene-break` is plain black centered text — no gray, no special font-size, no letter-spacing
- `flashback-header` is always Courier New bold, centered, +2px from body text, letter-spacing 3px
- `email-line` always has zero margin top AND bottom
- `<p></p>` is the ONLY way to create blank line spacing — NEVER use `<p>&nbsp;</p>`
- No `<span>` wrappers inside scene breaks — ever
- Sender names / email labels are always bold up to and including the colon
- Email body text is always italic (`<em>` wrapped)
- Regular narrative content inside special sections keeps normal paragraph formatting

---

## Banned Patterns (DO NOT USE)

| Bad | Good |
|---|---|
| `<p>&nbsp;</p>` | `<p></p>` |
| `<p class="scene-break"><span>***</span></p>` | `<p class="scene-break">***</p>` |
| Gray/colored scene breaks | Plain black inherited text |
| Special font-size on scene breaks | Inherit from body |
| `margin` or `padding` on scene breaks | None — spacing comes from `<p></p>` elements |
| Hardcoded `font-size` on flashback-header | `calc(var(--font-size-reader) + 2px)` |

---

## Chapter Section Types

| Section Value | Purpose | Appears in Nav |
|---|---|---|
| `title` | Title page | No (filtered out) |
| `toc` | Table of contents | No (filtered out) |
| `intro` | Opening chapters (Author's Note, Summer 2017, etc.) | Yes |
| `year` | Main story chapters | Yes |
| `postscript` | Closing chapters (Postscript, Dedication) | Yes |

---

## Claude Code Instructions

When processing manuscript updates that include special sections:

1. Read this formatting guide FIRST — check `docs/SPECIAL-FORMATTING-GUIDE.md` in the repo
2. Identify which special sections are affected
3. Apply the correct Type (1, 1B, 2, or 3) formatting
4. Use the exact CSS classes specified — do not invent new ones
5. Preserve all existing media emoji spans and `data-media-id` attributes
6. Preserve all dateline spans and `has-dateline` classes outside special sections
7. Preserve all `<p></p>` spacing elements
8. Test by counting: `grep -c 'email-line\|flashback-header\|scene-break' data/chapters.js`
9. Verify no banned patterns exist: `grep -c '&nbsp;\|<span>.*\*\*\*' data/chapters.js` (should be 0)
