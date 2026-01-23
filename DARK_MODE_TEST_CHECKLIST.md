# Dark Mode Test Checklist

## Core Functionality
- [ ] Moon toggle (🌙) appears in header where Clean button was
- [ ] Clicking toggle switches between light/dark mode
- [ ] Theme persists after page refresh
- [ ] Theme persists after navigating between chapters
- [ ] Theme persists when opening binge-mode.html

## Light Mode Verification
- [ ] Background is white/off-white (#fefefe)
- [ ] Text is dark (#333)
- [ ] Header has white background
- [ ] Sidebar has light gray background
- [ ] Nav footer has white background
- [ ] All modals have white backgrounds

## Dark Mode Verification
- [ ] Background is dark (#1a1a1a)
- [ ] Text is light (#e0e0e0)
- [ ] Header has dark background (#1f1f1f)
- [ ] Sidebar has dark background (#222222)
- [ ] Nav footer has dark background
- [ ] All modals have dark backgrounds (#242424)
- [ ] Links are light blue (#6db3f2)
- [ ] Borders are visible (#444444)

## CRITICAL: No Color Leaking
- [ ] No black bleeding through white in light mode
- [ ] No white bleeding through dark in dark mode
- [ ] Hidden/inactive chapters don't show wrong theme colors
- [ ] Page mode pagination doesn't show color leaking
- [ ] Modal overlays don't leak colors

## OPTIONS Section (Sidebar)
- [ ] OPTIONS section appears above Logout button
- [ ] "Show Media" toggle is present
- [ ] Toggle is ON by default (media emojis visible)
- [ ] Toggle OFF hides media emojis (clean-read mode)
- [ ] Toggle state persists after page refresh

## Elements to Check
- [ ] Header background
- [ ] Reader/content area
- [ ] Navigation footer
- [ ] Sidebar (TOC)
- [ ] Chapter headers
- [ ] Paragraphs
- [ ] Scene breaks (***)
- [ ] Block quotes
- [ ] Media modals (image, audio, video)
- [ ] Photo gallery modal
- [ ] Password gate (if applicable)
- [ ] Fake screens (boss button) - not affected by theme

## Mobile Testing
- [ ] Theme toggle works on iOS Safari
- [ ] Theme toggle works on Android Chrome
- [ ] No flash of wrong colors on page load
- [ ] Touch targets are appropriately sized

## Binge Mode (binge-mode.html)
- [ ] Inherits theme from main site (uses same localStorage)
- [ ] Header background changes with theme
- [ ] Navigation footer changes with theme
- [ ] Clean toggle still works independently

## Edge Cases
- [ ] First visit (no saved preference) defaults to light mode
- [ ] Clearing localStorage resets to light mode
- [ ] Multiple tabs stay in sync (on refresh)
