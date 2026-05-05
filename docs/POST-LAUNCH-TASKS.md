# Post-Launch Tasks

Operational notes and known issues to address after launch.

## Tooling

- **Site Checker target list update** — Site Checker
  (file:///Users/fenech/Desktop/OTR-TOOLS/site-checker.html)
  expects `css/style.css` which doesn't exist — site uses split
  modular CSS. Update Site Checker target list to point at
  load-bearing files: `variables.css`, `typography.css`,
  `components.css`, `layout.css`, `fonts.css`.

## Item #6 — Hidden page breaks (deferred)

Original spec: POST-MIGRATION-PUNCH-LIST-ITEM-6-HIDDEN-PAGE-BREAKS.md
(stored in user's local files, not in repo).

Goal: Make 8 special sections (JUNK MAIL ×2, AIRPLANE MODE,
EMBARRASSING FLASHBACK, TWO YEARS EARLIER, Malta ×3) feel
like fresh pages.

May 5, 2026: Tried forced paginator pages via class
`page-break-before` on marker paragraphs. Approach assumed
page mode but the reader's default is scroll mode (body class
`scrolling`) — forced breaks were invisible to readers.
Reverted in commits `4478283` and `ab0791b`.

Future approaches to consider:
1. CSS-only: extra top/bottom margin on the special sections,
   applied via class on existing paragraphs (not `<div>`
   wrapping which the loader can't parse). Works in both
   modes via spacing.
2. Mode-conditional: detect reading mode and apply different
   treatment for page mode vs scroll mode.
3. Accept current behavior: the `***` scene-breaks already
   mark transitions for readers. Item may not need fixing.
