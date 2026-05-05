// red-dot.js
// Wraps the LAST "O" in specific chapter titles with a red dot span.
// CSS in components.css handles the visual rendering.

const RED_DOT_TITLES = new Set([
  "AUTHOR'S NOTE",
  "DREAM JOB",
  "OPENING DAY",
  "HOT SEAT",
  "FIREWORKS",
  "WORLD SERIES",
  "AWARDS SEASON",
  "COOPERSTOWN",
  "BURN OUT",
  "GLOBETROTTING",
  "ROAD TO OMAHA",
  "A LETTER TO THE EDITOR",
  "BOTTOM NINE",
  "DEDICATION"
]);

/**
 * Apply red dot to a chapter title.
 * @param {string} title - The chapter title (will be uppercased for matching)
 * @returns {string} HTML string with the last O wrapped, or original title unchanged
 */
function applyRedDotToTitle(title) {
  if (!title || typeof title !== 'string') return title;

  const upper = title.toUpperCase();

  // Only apply to chapters in our designated list
  if (!RED_DOT_TITLES.has(upper)) return title;

  // Find the LAST "O" in the original title (preserving case)
  const lastOIndex = title.lastIndexOf('O');
  if (lastOIndex === -1) return title;

  // Wrap the last O with a span containing the dot overlay
  const before = title.substring(0, lastOIndex);
  const after = title.substring(lastOIndex + 1);
  return before +
    '<span class="red-o">O<span class="red-o-dot" aria-hidden="true"></span></span>' +
    after;
}

// Export for ES module imports
export { applyRedDotToTitle, RED_DOT_TITLES };

// Also expose globally for non-module scripts
if (typeof window !== 'undefined') {
  window.applyRedDotToTitle = applyRedDotToTitle;
  window.RED_DOT_TITLES = RED_DOT_TITLES;
}
