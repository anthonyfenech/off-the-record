# OFF-THE-RECORD Site Specifications

*Compiled: April 2026*
*Source: css/variables.css, css/typography.css, css/layout.css, css/components.css, css/share.css, css/comments.css, css/otr-tier1-states.css*

---

## 1. TYPOGRAPHY

### Font Families

| Purpose | Variable | Value |
|---------|----------|-------|
| Monospace (headers, UI) | `--font-mono` | `'Courier New', Courier, monospace` |
| Serif (body text) | `--font-serif` | `'EB Garamond', 'Times New Roman', Times, Georgia, serif` |
| Sans (fallback) | `--font-sans` | `'Courier New', Courier, monospace` |

### Font Sizes

| Variable | rem | px |
|----------|-----|-----|
| `--font-size-xs` | 0.8125rem | 13px |
| `--font-size-sm` | 0.875rem | 14px |
| `--font-size-base` | 1rem | 16px |
| `--font-size-md` | 1.125rem | 18px |
| `--font-size-lg` | 1.375rem | 22px |
| `--font-size-xl` | 1.75rem | 28px |
| `--font-size-2xl` | 2.25rem | 36px |
| `--font-size-3xl` | 3rem | 48px |

### Reader Font Sizes (User-Adjustable)

| Setting | Variable | Value |
|---------|----------|-------|
| Small (default) | `--font-size-reader-small` | 1.0625rem (17px) |
| Medium | `--font-size-reader-medium` | 1.125rem (18px) |
| Large | `--font-size-reader-large` | 1.375rem (22px) |

### Line Heights

| Variable | Value |
|----------|-------|
| `--line-height-tight` | 1.2 |
| `--line-height-normal` | 1.5 |
| `--line-height-relaxed` | 1.6 |

### Letter Spacing

| Variable | Value |
|----------|-------|
| `--letter-spacing-tight` | 1px |
| `--letter-spacing-normal` | 2px |
| `--letter-spacing-wide` | 3px |

### Element Typography

| Element | Font | Size | Weight | Color | Line-height |
|---------|------|------|--------|-------|-------------|
| `body` | `--font-mono` | `--font-size-md` | 400 | `--color-text-primary` | 1.6 |
| `.chapter-body` | `--font-serif` | `--font-size-reader` | 400 | `--color-text-primary` | 1.6 |
| `.chapter-body p` | inherited | inherited | 400 | inherited | 1.6 |
| `.chapter-title` | `--font-mono` | 1.875rem (mobile: 1.5rem) | bold | `--color-text-primary` | 1.2 |
| `.chapter-subtitle` | `--font-mono` | `--font-size-sm` | 400 | `--color-text-secondary` | 1.4 |
| `.chapter-body h2` | `--font-mono` | 1.375rem | bold | `--color-text-primary` | 1.3 |
| `.chapter-body h3` | `--font-mono` | 1.125rem | bold | `--color-text-primary` | 1.4 |
| `.header-title` | `--font-mono` | 1.25rem | bold | `--color-text-primary` | — |
| `.nav-btn` | `'Courier New'` | 10px | 400 | `--color-text-primary` | — |
| `.nav-btn.nav-media` | `'Courier New'` | 9px | 400 | varies | — |
| `.toc-chapter-title` | `--font-mono` | `--font-size-xs` | 400 | `--color-text-primary` | 1.4 |

---

## 2. CSS VARIABLES

### Colors — Light Mode (Default)

| Variable | Value | Usage |
|----------|-------|-------|
| `--color-text-primary` | `#333` | Main text |
| `--color-text-secondary` | `#666` | Subtitles, metadata |
| `--color-text-tertiary` | `#999` | Placeholders, hints |
| `--color-background` | `#fefefe` | Page background |
| `--color-background-secondary` | `#f8f8f8` | Alternate sections |
| `--color-background-tertiary` | `#f0f0f0` | Tertiary areas |
| `--color-accent` | `#333` | UI accent |
| `--color-accent-light` | `#f5f5f5` | Hover backgrounds |
| `--color-accent-red` | `#cc0000` | Error accent |
| `--color-border` | `#ddd` | Main borders |
| `--color-border-subtle` | `#eee` | Subtle dividers |
| `--color-success` | `#333` | Success states |
| `--color-overlay` | `rgba(51, 51, 51, 0.5)` | Sidebar overlay |
| `--color-link` | `#0066cc` | Links |
| `--color-link-hover` | `#0044aa` | Link hover |
| `--color-error-bg` | `#ffebee` | Error background |
| `--color-error-border` | `#ef5350` | Error border |
| `--color-error-text` | `#c62828` | Error text |
| `--color-highlight` | `#ffeb3b` | Search highlight |
| `--color-highlight-current` | `#ff9800` | Current match |
| `--color-modal-bg` | `#ffffff` | Modal background |
| `--color-modal-overlay` | `rgba(0, 0, 0, 0.6)` | Modal backdrop |
| `--color-header-bg` | `#ffffff` | Header |
| `--color-footer-bg` | `#ffffff` | Footer |
| `--color-sidebar-bg` | `#f5f5f5` | Sidebar |
| `--color-player-bg` | `#1a1a1a` | Audio player |
| `--color-player-bar` | `#444` | Progress track |
| `--color-player-fill` | `#fff` | Progress fill |

### Colors — Dark Mode

| Variable | Light Value | Dark Value |
|----------|-------------|------------|
| `--color-text-primary` | `#333` | `#e0e0e0` |
| `--color-text-secondary` | `#666` | `#aaaaaa` |
| `--color-text-tertiary` | `#999` | `#777777` |
| `--color-background` | `#fefefe` | `#1a1a1a` |
| `--color-background-secondary` | `#f8f8f8` | `#242424` |
| `--color-background-tertiary` | `#f0f0f0` | `#2e2e2e` |
| `--color-accent` | `#333` | `#e0e0e0` |
| `--color-accent-light` | `#f5f5f5` | `#333333` |
| `--color-border` | `#ddd` | `#444444` |
| `--color-border-subtle` | `#eee` | `#333333` |
| `--color-overlay` | `rgba(51,51,51,0.5)` | `rgba(0,0,0,0.7)` |
| `--color-link` | `#0066cc` | `#6db3f2` |
| `--color-link-hover` | `#0044aa` | `#9dcbf7` |
| `--color-modal-bg` | `#ffffff` | `#242424` |
| `--color-modal-overlay` | `rgba(0,0,0,0.6)` | `rgba(0,0,0,0.85)` |
| `--color-header-bg` | `#ffffff` | `#1f1f1f` |
| `--color-sidebar-bg` | `#f5f5f5` | `#222222` |
| `--color-image-border` | `transparent` | `#444444` |

---

## 3. SPACING

| Variable | rem | px |
|----------|-----|-----|
| `--space-xs` | 0.25rem | 4px |
| `--space-sm` | 0.5rem | 8px |
| `--space-md` | 1rem | 16px |
| `--space-lg` | 1.25rem | 20px |
| `--space-xl` | 2rem | 32px |
| `--space-2xl` | 2.5rem | 40px |
| `--space-3xl` | 3.75rem | 60px |

### Padding

| Element | Value |
|---------|-------|
| `--padding-mobile` | 1.25rem (20px) |
| `--padding-tablet` | 2.5rem (40px) |
| `body` (top) | 70px (header clearance) |
| `body` (bottom) | 120px (footer clearance) |
| `.reader` (mobile) | `--padding-mobile` |
| `.reader` (tablet+) | `--padding-tablet` |
| `.chapter-body` (bottom) | 60px (nav-footer clearance) |
| `.nav-footer` | 9px 14px |
| `.header-content` | 0 `--padding-mobile` |

### Margins

| Element | Value |
|---------|-------|
| `.chapter-body p` | bottom: 1.2rem |
| `.chapter-header` | top: 2em, bottom: 2em |
| `.chapter-body .scene-break` | top: -0.6rem, bottom: -0.6rem |
| `.chapter-body h2` | top: 2.5em, bottom: 1em |
| `.chapter-body h3` | top: 2em, bottom: 0.75em |

---

## 4. BORDERS

### Footer Navigation

| Element | Border | Source |
|---------|--------|--------|
| `.nav-footer` | `1.5px solid var(--color-text-primary)` | layout.css:143 |
| `.nav-btn` | `none` | layout.css:162 |
| `.nav-btn.nav-media` | `1.5px solid var(--color-text-primary)` | layout.css:198 |
| `.nav-btn.nav-binge` | `1.5px solid var(--color-text-primary)` | layout.css:198 |
| Dark mode `.nav-footer` | `border-color: var(--color-border)` | layout.css:271 |

### Header

| Element | Border |
|---------|--------|
| `.header` | `bottom: 1px solid var(--color-border)` |
| `.chapter-header` | `bottom: 1px solid var(--color-border)` |

### Sidebar

| Element | Border |
|---------|--------|
| `.toc-sidebar` | `right: 1px solid var(--color-border)` |
| `.toc-header` | `bottom: 1px solid var(--color-border)` |
| `.toc-footer` | `top: 1px solid var(--color-border)` |
| `.toc-chapter` | `bottom: 1px solid var(--color-border)` |

### Modals

| Element | Border |
|---------|--------|
| `.media-modal` | `1px solid var(--color-accent)` |
| `.media-modal-close` | `1px solid var(--color-border)`, radius: 50% |
| `.media-modal-caption` | `top: 2px solid var(--color-border)` |
| `.comment-modal` | `1px solid var(--color-border)` |
| `.share-modal` | none (uses border-radius: 12px) |

### Other Borders

| Element | Border |
|---------|--------|
| `.reading-mode-toggle` | `1px solid var(--color-border)`, radius: 3px |
| `.otr-tier1-retry-btn` | `1px solid var(--color-text-primary)` |
| `.chapter-body blockquote` | `left: 2px solid var(--color-border)` |
| `.chapter-body .pullquote` | `left: 3px solid var(--color-accent-red)` |

---

## 5. LAYOUT & POSITIONING

### Z-Index Hierarchy

| Layer | z-index | Elements |
|-------|---------|----------|
| Hidden | -1 | Inactive overlays |
| In-content | 1-10 | Chapter elements |
| Dropdowns | 50 | Search results |
| Continue reading | 85 | Banner |
| Nav footer | 90 (`--z-nav-footer`) | Footer |
| Share/Comment buttons | 95 | Floating buttons |
| Progress bar | 95 (`--z-progress-bar`) | Reading progress |
| Header | 100 (`--z-header`) | Fixed header |
| Offline bar | 105 | Network status |
| Overlay backdrop | 150 (`--z-overlay`) | Sidebar overlay |
| Comment modal | 200 | Comment form |
| Sidebar | 200 (`--z-sidebar`) | TOC |
| Share toast | 200 | Notifications |
| Media modal | 1000-1001 | Photo/video |
| Lightbox | 5000 | Full-screen images |
| Prompt modal | 5001 | Interactive prompts |
| Offline indicator | 9999 | Network status |
| Password gate | 50000 | Auth screen |
| Skip link | 99999 | Accessibility |

### Fixed Elements

| Element | Position | Dimensions |
|---------|----------|------------|
| `.header` | top: 0, left: 0, right: 0 | height: 69px |
| `.nav-footer` | bottom: 16px, left: 50%, transform: translateX(-50%) | max-width: 300px |
| `.share-o-button` | bottom: calc(32px + safe-area), right: 24px | 48x48px |
| `.comment-bubble-button` | bottom: calc(32px + safe-area), left: 24px | 48x48px |
| `.toc-sidebar` | top: 0, left: 0 | width: 70%, max-width: 280px, height: 100vh |
| `.otr-tier1-offline-bar` | top: 0, left: 0, right: 0 | auto height |

### Max Widths

| Element | Value |
|---------|-------|
| `--max-width-reader` | 800px |
| `.chapter-body` | 650px |
| `.nav-footer` | 300px (mobile: 290px, small: 270px) |
| `.toc-sidebar` | 280px |
| `.media-modal` | 500px |
| `.share-modal` | 320px |
| `.comment-modal` | 360px |

---

## 6. BREAKPOINTS

| Breakpoint | Width | CSS Variable |
|------------|-------|--------------|
| Small (mobile) | max-width: 599px | `--breakpoint-sm: 600px` |
| Tablet | min-width: 600px | |
| Medium | min-width: 768px | `--breakpoint-md: 768px` |
| Desktop | min-width: 1024px | `--breakpoint-lg: 1024px` |
| Extra small | max-width: 374px | iPhone SE and smaller |

### Responsive Changes

**max-width: 599px (Mobile)**
- `.header-title`: font-size: `--font-size-lg`, letter-spacing: 1px
- `.chapter-body`: max-width: 100%
- `.chapter-title`: font-size: 1.5rem
- `.nav-footer`: bottom: safe-area + 12px, max-width: 290px
- `.share-o-button`: bottom: safe-area + 78px
- `.comment-bubble-button`: bottom: safe-area + 78px
- `.share-overlay`: align-items: flex-end (bottom sheet)
- `.share-modal`: full width, border-radius: 16px

**max-width: 374px (Extra Small)**
- `.nav-footer`: max-width: 270px
- `.nav-btn.nav-media`: font-size: 8px, padding: 3px 8px
- `.share-o-button`: right: 16px, bottom: safe-area + 88px

**min-width: 600px (Tablet+)**
- `.header-content`: padding: `--space-lg` `--padding-tablet`
- `.reader`: padding: `--padding-tablet`
- `.chapter-title`: font-size: `--font-size-2xl`
- `.toc-sidebar`: width: 280px

**Touch devices (hover: none)**
- `.nav-btn`: min-height: 44px
- `.nav-btn.nav-media`: min-height: 44px

---

## 7. BRAND

### Primary Color

| Name | Hex | Usage |
|------|-----|-------|
| OTR Red | `#D42B2B` | Heart like, comment submit button |
| Accent Red | `#cc0000` | `--color-accent-red`, errors, pullquote border |
| Error Red | `#c62828` | Error text |
| Error Border | `#ef5350` | Error borders |

### Logo Assets

| Asset | Path |
|-------|------|
| Header logo | `assets/icons/red-dot-o-180.png` |
| Share button logo | `assets/icons/red-dot-o-180.png` |
| Favicon (32px) | `assets/icons/red-dot-o-32.png` |
| PWA icon (192px) | `assets/icons/red-dot-o-192.png` |
| PWA icon (512px) | `assets/icons/red-dot-o-512.png` |
| Apple touch icon | `assets/icons/apple-touch-icon.png` |

### Touch Targets

| Variable | Value |
|----------|-------|
| `--min-touch-target` | 44px |

All interactive elements (buttons, links, nav items) must have minimum 44x44px touch area for accessibility compliance.

---

## 8. ANIMATIONS

### Transitions

| Variable | Value |
|----------|-------|
| `--transition-fast` | 150ms ease |
| `--transition-normal` | 300ms ease |
| `--transition-slow` | 500ms ease |
| `--transition-modal` | 0.3s cubic-bezier(0.4, 0, 0.2, 1) |

### Keyframes

**spin** (loading spinner)
```css
@keyframes spin {
    to { transform: rotate(360deg); }
}
```

**share-pulse** (share button loading)
```css
@keyframes share-pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.7; }
}
```

**heartPop** (like button)
```css
@keyframes heartPop {
    0%   { transform: scale(0.9); }
    50%  { transform: scale(1.15); }
    100% { transform: scale(1.0); }
}
```

**otr-tier1-spin** (tier 1 spinner)
```css
@keyframes otr-tier1-spin {
    to { transform: rotate(360deg); }
}
```

### Common Transitions

| Element | Transition |
|---------|------------|
| `.nav-btn` | opacity 0.15s ease |
| `.share-o-button` | transform 0.15s ease |
| `.share-overlay` | opacity 0.15s ease, visibility 0.15s ease |
| `.share-modal` | transform 0.15s ease, opacity 0.15s ease |
| `.media-modal-overlay` | opacity 150ms ease, visibility 150ms ease |
| `.media-modal` | transform 150ms ease |
| `.toc-sidebar` | transform `--transition-normal` |
| `.overlay` | opacity `--transition-normal`, visibility `--transition-normal` |
| `body` | background-color `--transition-fast`, color `--transition-fast` |

### GPU Acceleration

The following elements use `will-change` and `transform: translate3d()` for hardware acceleration:

- `.nav-footer` — `will-change: transform`
- `.toc-sidebar` — `will-change: transform`, `backface-visibility: hidden`, `contain: layout style paint`
- `.otr-tier1-offline-bar` — `transform: translateY(-100%)`

---

## 9. SHADOWS

| Variable | Value |
|----------|-------|
| `--shadow-sm` | none |
| `--shadow-md` | 0 2px 4px rgba(0, 0, 0, 0.05) |
| `--shadow-lg` | 0 4px 8px rgba(0, 0, 0, 0.08) |

### Element-Specific Shadows

| Element | Shadow |
|---------|--------|
| `.nav-footer` | 0 2px 12px rgba(0,0,0,0.08) |
| `.nav-footer` (dark) | 0 2px 12px rgba(0,0,0,0.3) |
| `.toc-sidebar` | `--shadow-md` |
| `.share-preview img` | 0 2px 12px rgba(0,0,0,0.3) |
| `.share-toast` | 0 4px 12px rgba(0,0,0,0.3) |
| `.comment-modal` | 0 4px 20px rgba(0,0,0,0.15) |

---

## 10. SELF-HOSTED FONTS

### EB Garamond (Body Text)

| Weight | Style | File |
|--------|-------|------|
| 400 | normal | `fonts/eb-garamond-regular.woff2` |
| 500 | normal | `fonts/eb-garamond-regular.woff2` |
| 400 | italic | `fonts/eb-garamond-italic.woff2` |

All use `font-display: swap` for performance.

### System Fonts (UI)

- `'Courier New', Courier, monospace` — No external files needed

---

*End of Site Specifications*
