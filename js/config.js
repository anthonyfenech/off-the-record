// =====================================================
// FEATURE CONFIGURATION
// =====================================================
// Flip these switches to enable/disable features.
// true = ON, false = OFF
// After changing, bump the version in sw.js and deploy.
// =====================================================

const CONFIG = {

    // READING MODE TOGGLE
    // Shows "Scroll" and "Pages" buttons in settings
    showReadingModeToggle: true,

    // SEARCH BUTTON
    // Shows magnifying glass icon in header
    showSearchButton: true,

    // PAGE NUMBERS IN HEADER
    // Shows "1/8" page indicator in header (page mode)
    showProgressIndicator: false,

    // Default reading mode: 'scroll' or 'page'
    defaultReadingMode: 'scroll',

};

// Export for use in other modules
export { CONFIG };

// Also expose globally
window.APP_CONFIG = CONFIG;
