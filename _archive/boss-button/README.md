# Boss Button - Archived

This folder contains the archived Boss Button feature, inspired by NCAA March Madness.

## What it did
- Press ESC to instantly hide the reader and show a fake "work" screen
- 6 rotating realistic screens: Outlook, Gmail, Google Docs, Slack, Teams, Wikipedia
- The Wikipedia screen was meta - a fake article about "Off the Record"

## Files
- `boss-button.js` - Main JavaScript logic
- `boss-button.css` - All styling for the button and fake screens
- `fake-screens.html` - HTML for the 6 fake work screens

## To restore
1. Add fake-screens.html content to index.html (before </body>)
2. Add boss-button.css content to components.css
3. Copy boss-button.js to js/ folder and minify
4. Add `<script type="module" src="./js/boss-button.min.js"></script>` to index.html
5. Import and init in app.js:
   ```js
   import { bossButton } from './boss-button.js';
   // In start():
   bossButton.init();
   ```

## Why it was removed
Simplified the codebase - the ESC key capture and visibility manipulation could interfere with other features.
