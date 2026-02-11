# Media Activation Guide

**Generated:** 2026-02-11

## How to Activate Media Embeds

To activate a media embed:
1. Find the span in `data/chapters.js`
2. Change `class="media-emoji media-draft"` to `class="media-emoji"`
3. Remove `style="display:none;"`
4. Delete the `<!-- DRAFT: ... -->` comment above it

## Draft Span Format
```html
<!-- DRAFT: [media-id] — [reason] -->
<span class="media-emoji media-draft" data-media-id="[media-id]" style="display:none;">[emoji]</span>
```

---

## 8 New Media Entries (from this sync)

| # | Media ID | Ch | Type | Emoji | Suggested Placement | Notes |
|---|----------|-----|------|-------|---------------------|-------|
| 1 | `sold-taurus-webp` | 4 | photo | 📷 | Near "ford-taurus" span | Alternate screenshot of sold Taurus |
| 2 | `hr-derby-arizona-2011` | 4 | photo | 📷 | Background/intro section | 2011 HR Derby photo - early career |
| 3 | `first-year-plan` | 5 | doc | 📄 | Career planning discussion | First year plan document |
| 4 | `katie-strang-video-raw` | 8 | video | 📺 | Line ~3920: "Katie Strang... in a rush" | Raw video of Katie Strang interview |
| 5 | `mccosky-tweet-verlander-2` | 16 | screenshot | 📷 | Line ~6786: Verlander trade scrum | Alternate McCosky tweet screenshot |
| 6 | `fantasy-camp-paper` | 22 | screenshot | 📷 | Line ~5991: "Fantasy camp begins" | Newspaper clipping about fantasy camp |
| 7 | `all-notebooks` | 28 | photo | 📷 | Postscript reflection section | Photo of all notebooks from career |
| 8 | `freep-farewell` | 28 | doc | 📄 | Postscript farewell section | Farewell document |

---

## Placement Instructions

### Chapter 4 (Scandal)
- `sold-taurus-webp`: Place after existing `ford-taurus` span OR skip if redundant
- `hr-derby-arizona-2011`: Place in early career/background discussion

### Chapter 5 (Rookie Year)
- `first-year-plan`: Place near career planning or early assignments discussion

### Chapter 8 (Trade Deadline)
- `katie-strang-video-raw`: Search for "Katie Strang" mentions around the Verlander trade storyline

### Chapter 16 (Summer 2017 II)
- `mccosky-tweet-verlander-2`: Place near Verlander trade announcement coverage

### Chapter 22 (Viva Las Vegas)
- `fantasy-camp-paper`: Place in fantasy camp section (starts around "Fantasy camp begins with a powwow")

### Chapter 28 (Postscript)
- `all-notebooks`: Place near reflection/conclusion content
- `freep-farewell`: Place near farewell/leaving content

---

## Files Modified This Sync
- `data/media.js` - 8 entries added (134 → 142)
- Deleted 6 duplicate files from audio-staging (~1.1MB freed)
