// ═══════════════════════════════════════════════════════════════
// INTERACTIVE PROMPTS INITIALIZATION
// Loads and initializes text-triggered Q&A prompts
// Extracted from index.html inline scripts
// ═══════════════════════════════════════════════════════════════

import { InteractivePrompts } from './interactivePrompts.min.js';

// Load from admin panel localStorage first, fallback to static file
const adminPrompts = JSON.parse(localStorage.getItem('admin_interactivePrompts') || '[]');
let promptsInstance = null;

function initPrompts() {
    if (adminPrompts.length > 0) {
        promptsInstance = new InteractivePrompts(adminPrompts);
    } else {
        // Fallback to static prompts file
        import('../data/prompts.js').then(({ PROMPTS }) => {
            if (PROMPTS && PROMPTS.length > 0) {
                promptsInstance = new InteractivePrompts(PROMPTS);
            }
        }).catch(() => {
            // No static file or empty - that's fine
        });
    }
}

// Initialize on page load
initPrompts();

// Re-initialize when chapter changes (SPA navigation)
document.addEventListener('chapterLoaded', () => {
    if (promptsInstance) {
        promptsInstance.destroy();
    }
    setTimeout(initPrompts, 300);
});
