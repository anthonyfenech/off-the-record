// title-images.js
// Maps chapter titles to their image files for chapters that
// have a custom title PNG (with red dot baked in).

const TITLE_IMAGE_MAP = {};

const TITLE_IMAGE_BASE_PATH = "./assets/chapter-titles/";

/**
 * Returns HTML for a chapter title.
 * If the title has a matching PNG, returns an <img> tag.
 * Otherwise returns the title as escaped plain text.
 */
function renderChapterTitle(title) {
  if (!title || typeof title !== 'string') return '';
  const upper = title.toUpperCase();
  const filename = TITLE_IMAGE_MAP[upper];

  if (filename) {
    const lightSrc = TITLE_IMAGE_BASE_PATH + filename;
    const darkSrc = TITLE_IMAGE_BASE_PATH +
      filename.replace('.png', '-dark.png');
    const altText = escapeHtml(title);
    return `<picture class="chapter-title-picture">` +
      `<img src="${lightSrc}" alt="${altText}" ` +
      `class="chapter-title-img chapter-title-img--light">` +
      `<img src="${darkSrc}" alt="" aria-hidden="true" ` +
      `class="chapter-title-img chapter-title-img--dark">` +
      `</picture>`;
  }

  // No image — return escaped text
  return escapeHtml(title);
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export { renderChapterTitle, TITLE_IMAGE_MAP };

// Also expose globally as a fallback
if (typeof window !== 'undefined') {
  window.renderChapterTitle = renderChapterTitle;
}
