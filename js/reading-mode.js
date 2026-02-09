// Reading Mode Manager
// Lets users switch between scroll and pagination modes

import { CONFIG } from './config.js';

class ReadingModeManager {
    constructor() {
        this.currentMode = this.loadMode();
    }

    init() {
        // Apply initial mode
        this.applyMode(this.currentMode, false);

        // Check if toggle should be shown
        const toggle = document.getElementById('readingModeToggle');
        if (!CONFIG.showReadingModeToggle && toggle) {
            toggle.style.display = 'none';
            return;
        }

        // Set up toggle buttons
        const toggleButtons = document.querySelectorAll('.mode-btn');
        toggleButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mode = e.target.dataset.mode;
                if (mode !== this.currentMode) {
                    this.switchMode(mode);
                }
            });
        });

        // Update UI to show current mode
        this.updateToggleUI();
    }

    loadMode() {
        // Always start in scroll mode (no localStorage persistence)
        return 'scroll';
    }

    switchMode(newMode) {
        // Save current chapter
        const currentChapter = window.currentChapterId;

        // Update mode
        this.currentMode = newMode;
        this.applyMode(newMode, true);
        this.updateToggleUI();

        // Reload current chapter in new mode
        if (window.readerInstance && currentChapter) {
            window.readerInstance.loadChapter(currentChapter, 0);
        }

        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('readingModeChanged', {
            detail: { mode: newMode }
        }));
    }

    applyMode(mode, isSwitch = false) {
        const body = document.body;

        if (mode === 'page') {
            // Enable pagination mode
            body.classList.add('paginated');
            body.classList.remove('scrolling');
        } else {
            // Enable scroll mode
            body.classList.add('scrolling');
            body.classList.remove('paginated');
        }
    }

    updateToggleUI() {
        const buttons = document.querySelectorAll('.mode-btn');
        buttons.forEach(btn => {
            if (btn.dataset.mode === this.currentMode) {
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
            } else {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            }
        });
    }

    getMode() {
        return this.currentMode;
    }

    isPageMode() {
        return this.currentMode === 'page';
    }

    isScrollMode() {
        return this.currentMode === 'scroll';
    }
}

// Create singleton instance
const readingModeManager = new ReadingModeManager();

// Export for use in other modules
export { readingModeManager };

// Also expose globally for non-module scripts
window.readingModeManager = readingModeManager;
