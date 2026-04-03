/**
 * Red Dot O Branding
 * Wraps the target "O" character in chapter titles with red-dot styling.
 * Uses a hardcoded lookup table — do not compute dynamically.
 */

const RED_DOT_TITLE_MAP = {
    "AUTHOR'S NOTE": 10,
    "DREAM JOB": 7,
    "ROOKIE YEAR": 2,
    "OPENING DAY": 0,
    "MIDSEASON": 7,
    "HOT SEAT": 1,
    "FIREWORKS": 5,
    "WORLD SERIES": 1,
    "AWARDS SEASON": 11,
    "COOPERSTOWN": 8,
    "BURN OUT": 5,
    "GLOBETROTTING": 7,
    "ROAD TO OMAHA": 8,
    "A LETTER TO THE EDITOR": 20,
    "BOTTOM NINE": 4,
    "POSTSCRIPT": 1,
    "DEDICATION": 8
};

/**
 * Process a chapter title and return HTML with the correct O wrapped in red-dot spans.
 * @param {string} title - The chapter title text
 * @returns {string} - HTML string with red-dot wrapper applied (or original if no match)
 */
function applyRedDotToTitle(title) {
    if (!title || typeof title !== 'string') {
        return title;
    }

    // Normalize to uppercase for lookup
    const upperTitle = title.toUpperCase().trim();

    // Check if this title has a red-dot mapping
    if (!(upperTitle in RED_DOT_TITLE_MAP)) {
        return title; // Return unchanged
    }

    const targetIndex = RED_DOT_TITLE_MAP[upperTitle];

    // Validate the index points to an 'O' character
    if (targetIndex < 0 || targetIndex >= title.length) {
        console.warn(`Red-dot: Invalid index ${targetIndex} for title "${title}"`);
        return title;
    }

    const char = title[targetIndex];
    if (char.toUpperCase() !== 'O') {
        console.warn(`Red-dot: Index ${targetIndex} in "${title}" is "${char}", not "O"`);
        return title;
    }

    // Build the HTML with the red-dot wrapper
    const before = title.substring(0, targetIndex);
    const after = title.substring(targetIndex + 1);
    const wrappedO = `<span class="red-o">${char}<span class="red-o-dot"></span></span>`;

    return before + wrappedO + after;
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.applyRedDotToTitle = applyRedDotToTitle;
}
