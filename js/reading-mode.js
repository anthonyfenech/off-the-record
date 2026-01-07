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

        console.log(`Reading mode initialized: ${this.currentMode}`);
    }

    loadMode() {
        // Load saved preference from localStorage
        const saved = localStorage.getItem('readingMode');
        // Default to config setting for new users
        return saved || CONFIG.defaultReadingMode || 'scroll';
    }

    saveMode(mode) {
        localStorage.setItem('readingMode', mode);
    }

    switchMode(newMode) {
        console.log(`Switching from ${this.currentMode} to ${newMode}`);

        // Save current chapter
        const currentChapter = window.currentChapterId;

        // Update mode
        this.currentMode = newMode;
        this.saveMode(newMode);
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

        console.log(`Switched to ${newMode} mode`);
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
