# Search Feature Test Checklist

## Basic Functionality
- [ ] Search input appears in sidebar (below header, above TOC)
- [ ] Search icon (🔍) visible
- [ ] Placeholder text "Search chapters..." displayed
- [ ] Input accepts text
- [ ] Clear button (✕) appears when typing
- [ ] Clear button clears input and hides results
- [ ] Results appear after 2+ characters
- [ ] Results hide when query < 2 characters
- [ ] Debouncing works (300ms delay)

## Search Accuracy
- [ ] Exact phrase matches rank highest
- [ ] Title matches rank high
- [ ] Multiple word matches work
- [ ] Single word matches work
- [ ] Case-insensitive search
- [ ] Special characters don't break search
- [ ] Numbers searchable
- [ ] Apostrophes/quotes handled correctly

## Result Display
- [ ] Results show chapter title (uppercase, monospace)
- [ ] Results show context snippet with match
- [ ] Search terms highlighted in snippets (yellow mark)
- [ ] Match count displayed
- [ ] Year displayed when available
- [ ] Max 5 results shown initially
- [ ] "Show all X results" button appears if >5 results
- [ ] "No results" message when appropriate
- [ ] Results dropdown scrollable

## Navigation
- [ ] Clicking result navigates to chapter
- [ ] Search clears after navigation
- [ ] Results hide after navigation
- [ ] Sidebar closes after navigation
- [ ] URL updates with ?chapter=X

## Keyboard Support
- [ ] Enter key selects first result
- [ ] Escape key clears search and closes results
- [ ] Tab navigation works

## UI/UX
- [ ] Results dropdown positioned correctly (below input)
- [ ] Results don't overflow sidebar
- [ ] Hover states work on results
- [ ] Click anywhere outside closes results
- [ ] Focus ring on input when focused

## Dark Mode Compatibility
- [ ] Search input styled correctly in dark mode
- [ ] Results dropdown dark in dark mode
- [ ] Text readable in dark mode
- [ ] Highlight marks visible in dark mode (amber)
- [ ] Borders visible in dark mode
- [ ] No color leaking

## Mobile Testing
- [ ] Search works on mobile
- [ ] Input keyboard-friendly
- [ ] Results dropdown fits screen
- [ ] Touch targets adequate size
- [ ] No horizontal scroll
- [ ] Virtual keyboard doesn't break layout

## Performance
- [ ] Search feels instant (<100ms perceived)
- [ ] No lag when typing
- [ ] Debouncing prevents excessive searches
- [ ] Works with all chapters loaded

## Edge Cases
- [ ] Empty query shows nothing
- [ ] Single character shows nothing
- [ ] Special characters handled (!, @, #, etc.)
- [ ] Very long query handled gracefully
- [ ] Query with only spaces shows nothing
- [ ] Title page (-1) excluded from results
- [ ] TOC page (0) excluded from results

## Integration
- [ ] Doesn't interfere with Show Media toggle
- [ ] Works with sidebar open/close
- [ ] Works in light mode
- [ ] Works in dark mode

## Bookmark Removal Verification
- [ ] No bookmark button in nav-footer (index.html)
- [ ] No bookmark button in nav-footer (binge-mode.html)
- [ ] bookmarks.min.js not loaded in index.html
- [ ] No JavaScript errors related to bookmarks
- [ ] Sidebar doesn't show bookmarks section

## Sample Searches to Test
- [ ] "Verlander" - should find multiple chapters
- [ ] "trade deadline" - should match Chapter 8
- [ ] "World Series" - should match Chapter 17
- [ ] "unethical" - should find Chapter 26
- [ ] "Malta" - should find Author's Note
- [ ] "xyzabc123" - should show "No results"
