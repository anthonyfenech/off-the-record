// =====================================================
// FEATURE CONFIGURATION
// =====================================================
// Flip these switches to enable/disable features.
// true = ON, false = OFF
// After changing, bump the version in sw.js and deploy.
// =====================================================

const CONFIG = {

    // READING MODE TOGGLE
    // Shows "Scroll" and "Pages" buttons in header
    // Lets readers choose between scrolling or pagination
    showReadingModeToggle: true,

    // DARK MODE TOGGLE
    // Shows sun/moon icons in header
    // Lets readers switch between light and dark themes
    showDarkModeToggle: true,

    // RANDOM BUTTON MESSAGES
    // Shows random messages on the home page button
    // Instead of just "Continue Reading"
    showRandomButtonMessages: true,

    // PAGE NUMBERS IN HEADER
    // Shows "1/8" page indicator in header (page mode)
    // Shows "45%" progress in header (scroll mode)
    showProgressIndicator: true,

    // NAVIGATION FOOTER
    // Shows PREVIOUS/NEXT buttons at bottom
    showNavigationFooter: true,

    // PROGRESS BAR
    // Shows thin progress bar at very bottom of screen
    showProgressBar: true,

    // SWIPE GESTURES
    // Enables swipe left/right to navigate
    enableSwipeGestures: true,

    // KEYBOARD SHORTCUTS
    // Arrow keys to navigate
    enableKeyboardShortcuts: true,

    // AUTO-SAVE PROGRESS
    // Saves reading position every 2 seconds
    enableAutoSave: true,

    // =====================================================
    // DEFAULT VALUES
    // =====================================================

    // Default reading mode: 'scroll' or 'page'
    defaultReadingMode: 'scroll',

    // Default theme: 'light', 'dark', or 'auto' (system preference)
    defaultTheme: 'auto',

};

// Export for use in other modules
export { CONFIG };

// Also expose globally
window.APP_CONFIG = CONFIG;
