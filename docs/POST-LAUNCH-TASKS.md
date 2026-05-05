# Post-Launch Tasks

Operational notes and known issues to address after launch.

## Tooling

- **Site Checker target list update** — Site Checker
  (file:///Users/fenech/Desktop/OTR-TOOLS/site-checker.html)
  expects `css/style.css` which doesn't exist — site uses split
  modular CSS. Update Site Checker target list to point at
  load-bearing files: `variables.css`, `typography.css`,
  `components.css`, `layout.css`, `fonts.css`.

## Item #6 — Hidden page breaks (REJECTED)

**Status:** Evaluated May 5, 2026. Rejected.

**Original spec:** POST-MIGRATION-PUNCH-LIST-ITEM-6-HIDDEN-PAGE-BREAKS.md (in user's local files, not in repo).

**What was proposed:** Make 8 special sections (EMBARRASSING FLASHBACK, JUNK MAIL ×2, AIRPLANE MODE, TWO YEARS EARLIER, Malta italics ×3) function as forced paginator pages instead of being separated by *** scene-breaks.

**Why rejected:**

1. The reader defaults to scroll mode. Forced page breaks only render in page mode (minority use case). Scroll mode users would see no difference.

2. *** is a universally recognized literary convention for section transitions. Replacing it with a non-standard interaction (tap "next" to continue) wouldn't improve the reading experience for any user.

3. Malta passages are reflective italic meditations. They earn their atmosphere through the *** pause + contrast with surrounding prose. A "tap next" interruption would break that flow at exactly the wrong moment.

4. Forced page breaks introduce mobile edge cases (Malta passages are giant single paragraphs that overflow forced page boundaries) and accessibility complexity (screen readers, keyboard navigation) for no real gain.

**Conclusion:** The current *** scene-break design is correct for the medium (web memoir reading). The hidden-page-break idea was solving a print-book problem that doesn't apply here.

**Closed permanently.** Do not revisit unless reader-mode usage data post-launch shows a strong shift to page mode AND user feedback specifically requests this treatment.
