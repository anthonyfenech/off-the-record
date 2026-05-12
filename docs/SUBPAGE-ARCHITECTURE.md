# SUB-PAGE ARCHITECTURE — DOCUMENTATION UPDATE

**Purpose:** Permanent reference for the sub-page split architecture committed to main on May 11, 2026 (merge commit 69830a0). Documents what exists, why it exists, and how to maintain it.

---

## SUB-PAGE ARCHITECTURE

### What it is

Six chapters in `data/chapters.js` are split into multiple entries — a visible parent chapter plus one or more hidden sub-pages. Sub-pages appear when the reader clicks NEXT in the footer; they do NOT appear in the sidebar TOC, year listings, or chapter counts.

### Why it exists

Certain in-chapter interruptions (flashbacks, email exchanges, text message threads, italic interludes) function as distinct visual moments. The split architecture lets each one render as its own page with appropriate framing, rather than scrolling past inline in the middle of the parent chapter's flow.

### The 13 sub-pages (across 6 chapters)

| Parent | ID | Sub-page title | Visual treatment |
|---|---|---|---|
| Opening Day (6) | 6.1 | EMBARRASSING FLASHBACK | toc-page wrapper + centered h2 headline |
| Opening Day (6) | 6.2 | OPENING DAY (resumption) | plain chapter body |
| Fire Drill (9) | 9.1 | JUNK MAIL | toc-page + h2, email-line styling |
| Fire Drill (9) | 9.2 | FIRE DRILL (resumption) | plain chapter body |
| Hot Seat (11) | 11.1 | JUNK MAIL | toc-page + h2, email-line styling |
| Hot Seat (11) | 11.2 | HOT SEAT (resumption) | plain chapter body |
| Burn Out (21) | 21.1 | MALTA | toc-page wrapper, NO h2, no-indent italic |
| Unethical (26) | 26.1 | AIRPLANE MODE | toc-page + h2, email-line text messages |
| Unethical (26) | 26.2 | UNETHICAL (middle resumption) | plain chapter body |
| Unethical (26) | 26.3 | TWO YEARS EARLIER | toc-page + h2, includes one no-indent paragraph |
| Unethical (26) | 26.4 | UNETHICAL (resumption after flashback) | plain chapter body |
| Unethical (26) | 26.5 | MALTA | toc-page wrapper, NO h2, no-indent italic |
| Unethical (26) | 26.6 | UNETHICAL (final resumption) | plain chapter body |

### Architectural patterns

Four patterns proven across the rollout:

1. **3-block h2** — parent + interruption (toc-page + h2) + resumption. Used: Opening Day, Fire Drill, Hot Seat.
2. **5-block h2** — parent + interruption + resumption + interruption + resumption. Used: Unethical original split (before Malta extension).
3. **2-block no-h2** — parent + Malta-style interlude (toc-page, no h2). Used: Burn Out.
4. **3-block no-h2-extension** — extending a resumption block with a Malta interlude into Part 1 + Malta + Part 2. Used: Unethical 26.4 extension.

### Counts that must hold (after any chapters.js edit)

| Metric | Expected value |
|---|---|
| `hidden: true` entries | 13 |
| Decimal-ID entries | 13 |
| `toc-page` wrappers | 7 (one per interruption page) |
| `toc-page-title` h2 elements | 5 (h2 pages only — Malta pages have no h2) |
| Visible chapter count `getChapterCount()` | 29 |
| Total `CHAPTERS.length` | 42 |
| Sub-pages with slug fields | 0 (intentional — sub-pages are not directly linkable) |

### Footer nav chain (18 transitions)

```
6 → 6.1 → 6.2 → 8
9 → 9.1 → 9.2 → 10
11 → 11.1 → 11.2 → 12
21 → 21.1 → 22
26 → 26.1 → 26.2 → 26.3 → 26.4 → 26.5 → 26.6 → 27
```

Any change to chapters.js that reorders or deletes entries must preserve every transition.

### Required CSS rules

These selectors must remain present and unmodified:

| Selector | File | Purpose |
|---|---|---|
| `.toc-page` | css/components.css | Wrapper for all 7 interruption pages — drives flex layout |
| `.toc-page-title` | css/components.css | h2 styling for 5 interruption pages with centered headlines |
| `.chapter-body p.email-line` | css/components.css | Email/text-message styling in JUNK MAIL and AIRPLANE MODE pages |
| `.chapter-body p.no-indent` | css/typography.css | Flush-left italic styling for Malta passages and the TWO YEARS EARLIER disclaimer |
| `.chapter-body:has(.toc-page)` | css/components.css | -60px offset that pulls sub-page content high on the page |

If any of these are removed during a CSS refactor, the corresponding sub-pages break visually. The CSS sweep should grep for each selector's presence.

### Helper function filters

Four helper functions in `data/chapters.js` filter out hidden entries from public views:

- `getChapterCount()` → must include `!c.hidden`
- `getChaptersByYear()` → must include `!c.hidden`
- `getIntroChapters()` → must include `!c.hidden`
- `getPostscriptChapters()` → must include `!c.hidden && !c.hideFromToc`

These functions exist so the sidebar TOC and year listings show only the 29 visible chapters, not the 13 sub-pages.

`getNextChapterId()` and `getPreviousChapterId()` deliberately do NOT filter — they walk the full 42-entry array sequentially so footer NEXT/PREV reaches sub-pages.

### URL routing — known limitation (intentional)

Sub-pages have no `slug` field, so they have no addressable URL. Refreshing on a sub-page bounces the reader to the parent chapter's slug. Sub-pages cannot be shared as direct links.

This was an explicit launch decision (May 11, 2026). The slug infrastructure exists — adding slugs to sub-pages would activate URL routing automatically. Reconsidered post-launch if/when sub-page sharing becomes a priority.

### Maintenance suite addition

Phase 1 of the standard maintenance protocol now includes a ninth suite:

**Suite 9: Sub-page architecture integrity**

Runs the read-only diagnostic in `SUBPAGE-INTEGRITY-SWEEP.md`. Verifies:

1. Counts (hidden flags, decimal IDs, toc-page wrappers, h2 elements, visible/total chapter counts)
2. Each sub-page has its hidden flag
3. Each interruption page has an h2 headline
4. Each Malta page has NO h2
5. Footer nav traversal — all 18 transitions correct
6. Required CSS rules present
7. Sub-pages remain slug-less
8. Per-page content class assertions (email-line counts, no-indent counts)

Severity: P1 (any failure indicates architectural regression that breaks reader experience).

### Common pitfalls to avoid in future edits

- **Don't add chapter content to sub-pages by hand-typing.** Always extract bytes from existing content. Manual typing introduces curly-quote / em-dash / italic drift.
- **Don't reorder chapters.js entries without re-running the nav-traversal check.** Sub-pages assume the parent is immediately followed by its sub-pages.
- **Don't add slugs to sub-pages unless you intentionally want them linkable.** This was a deliberate launch decision.
- **Don't remove `<div class="toc-page">` wrappers from interruption pages.** The wrapper drives the standalone-page chrome (hidden chapter-header, hidden end-stars, -60px offset).
- **Don't add `<h2 class="toc-page-title">` to Malta pages (21.1, 26.5).** Their visual treatment depends on the no-h2 pattern.
- **Don't manually rename `paginated` to `page-turn-mode` or similar.** That refactor was abandoned in the page-turn-mode branch; the codebase actively uses `paginated`.

### History

- May 11, 2026 — entire sub-page rollout completed in one session
- Commits bb2b606 → b1784f6 (8 commits)
- Merge commit 69830a0 integrated into main alongside phase-1 (SW kill switch) and phase-1.5 (binge mode elimination)
- Pre-merge main SHA for emergency rollback: 0d7549d8192b2477c72abf10f32a0a460b0bdda2
- Deferred work: URL hash routing for sub-pages (not needed for launch)
