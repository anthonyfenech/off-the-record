# OFF-THE-RECORD: A Baseball Memoir

A mobile-first Progressive Web App for reading a baseball memoir covering 15 years as Detroit Tigers beat writer.

## Features

- **Clean Reading Interface**: Optimized for phones with serif typography and generous spacing
- **18 Chapters**: Approximately 90,000 words covering 15 years of Detroit Tigers baseball
- **Progress Tracking**: Automatically saves your reading position and chapter completion
- **Offline Reading**: Install to your phone's home screen and read offline
- **Mobile-First Design**: Beautiful, responsive design that works on any device
- **PWA**: Installable as an app on iOS and Android

## Tech Stack

- Vanilla HTML/CSS/JavaScript (zero dependencies)
- Progressive Web App with Service Worker
- localStorage for progress tracking
- Mobile-first responsive design

## Getting Started

### 1. Local Development

Simply open `index.html` in a modern web browser. The app will work immediately.

For testing PWA features (service worker, offline mode), you'll need to serve the app over HTTP:

**Using Python:**
```bash
python3 -m http.server 8000
```

**Using Node.js:**
```bash
npx http-server -p 8000
```

Then visit `http://localhost:8000` in your browser.

### 2. PWA Icons

The app requires icons for installation to home screen. You need to create 8 PNG icons in the following sizes:

- 72x72
- 96x96
- 128x128
- 144x144
- 152x152
- 192x192
- 384x384
- 512x512

**Quick way to generate icons:**

1. Create a 1024x1024px source image with your book cover or logo
2. Use an online tool like [PWA Asset Generator](https://www.pwabuilder.com/) or [RealFaviconGenerator](https://realfavicongenerator.net/)
3. Save the generated icons to `/assets/icons/`

**Design recommendations:**
- Use the book cover or a baseball-themed graphic
- Ensure the design is visible at small sizes
- Use the theme color: `#0d47a1` (deep blue)
- Make the 512x512 icon "maskable" (safe zone in center 80%)

### 3. Adding Your Memoir Content

Replace the placeholder content in `/data/chapters.js`:

1. Open `/data/chapters.js`
2. Replace the `content` field for each chapter with your actual memoir text
3. Update `title`, `subtitle`, and `wordCount` for each chapter
4. The content should use `\n\n` to separate paragraphs

Example:
```javascript
{
    id: 1,
    title: "Chapter 1: The First Pitch",
    subtitle: "Spring Training, 1987",
    content: `Your first paragraph here.

Your second paragraph here.

And so on...`,
    wordCount: 5000
}
```

## Project Structure

```
/Users/fenech/Documents/off-the-record-app/
├── index.html              # Main entry point
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker
├── css/
│   ├── reset.css          # CSS reset
│   ├── variables.css      # Design system
│   ├── typography.css     # Reading styles
│   ├── layout.css         # Layout styles
│   └── components.css     # UI components
├── js/
│   ├── app.js            # App initialization
│   ├── reader.js         # Reading interface
│   ├── navigation.js     # Chapter navigation
│   ├── storage.js        # Progress tracking
│   └── pwa.js            # PWA features
├── data/
│   └── chapters.js       # Chapter content
└── assets/
    └── icons/            # PWA icons
```

## Features Explained

### Reading Interface
- Serif font (Georgia) optimized for long-form reading
- 18px base font size on mobile, scales up on tablets
- 1.7 line height for comfortable reading
- Maximum 600px width for optimal line length
- Auto-saves scroll position every 2 seconds

### Navigation
- Previous/Next buttons in footer
- Swipe gestures (swipe right = previous, left = next)
- Keyboard shortcuts (arrow keys, h/l)
- Table of Contents sidebar
- URL-based deep linking (`#chapter-5`)
- Browser back/forward button support

### Progress Tracking
- Saves current chapter and scroll position
- Marks chapters as complete when scrolled to bottom
- Tracks overall book completion percentage
- Visual indicators in Table of Contents
- Progress bar at bottom of screen

### PWA Features
- Installable to home screen
- Works offline after first visit
- Cache-first strategy for assets
- Network-first for content
- Custom install prompt
- Update notifications

## Browser Support

- iOS Safari 12+
- Chrome/Edge (mobile) 80+
- Firefox (mobile) 80+
- Samsung Internet 10+

## Testing Checklist

- [ ] Open app in browser
- [ ] Navigate between chapters
- [ ] Check progress tracking (reload page)
- [ ] Test Table of Contents
- [ ] Try swipe gestures on mobile
- [ ] Install to home screen (iOS/Android)
- [ ] Test offline mode
- [ ] Check reading experience on different screen sizes

## Deployment

### Option 1: GitHub Pages (Free)

1. Create a GitHub repository
2. Push this code to the repository
3. Enable GitHub Pages in repository settings
4. Your app will be live at `https://yourusername.github.io/repository-name`

### Option 2: Netlify (Free)

1. Create a Netlify account
2. Drag and drop this folder to Netlify
3. Your app will be live at a custom URL

### Option 3: Vercel (Free)

1. Create a Vercel account
2. Import this project
3. Deploy with zero configuration

### Option 4: Your Own Hosting

Upload all files to any web host with HTTPS enabled. PWA features require HTTPS (except localhost).

## Customization

### Colors
Edit `/css/variables.css` to change the color scheme:

```css
--color-accent: #0d47a1;  /* Main brand color */
--color-text-primary: #1a1a1a;  /* Body text */
--color-background: #ffffff;  /* Background */
```

### Typography
Edit `/css/variables.css` to change fonts:

```css
--font-serif: Georgia, 'Times New Roman', serif;
--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Chapter Count
The app automatically adapts to any number of chapters. Just add or remove chapter objects in `/data/chapters.js`.

## Future Enhancements

Planned features for future versions:

- **Payment Integration**: Stripe integration for $2.99 one-time purchase
- **Font Size Control**: Let readers adjust text size
- **Dark Mode**: Reading mode for low-light conditions
- **Bookmarks**: Save favorite passages
- **Highlights**: Mark important text
- **Search**: Full-text search across all chapters
- **Cloud Sync**: Sync progress across devices
- **Reading Stats**: Track reading time and pace
- **Sharing**: Share quotes with attribution

## License

Copyright 2026. All rights reserved.

## Support

For technical issues or questions, please contact the developer.

## Credits

Built with vanilla JavaScript, HTML, and CSS. No frameworks, no dependencies, just web standards.

Designed for baseball fans who appreciate great storytelling.
