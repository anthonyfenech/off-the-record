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
        // Save current chapter and position
        const currentChapter = window.currentChapterId;
        const reader = window.readerInstance;
        const oldMode = this.currentMode;
        let readingPercent = 0;

        // Capture current reading position as percentage
        if (reader && currentChapter) {
            if (oldMode === 'scroll') {
                // Scroll mode: calculate scroll percentage
                const scrollTop = window.scrollY || document.documentElement.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                readingPercent = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
            } else if (oldMode === 'page' && reader.totalPages > 0) {
                // Page mode: calculate page percentage
                readingPercent = reader.currentPage / reader.totalPages;
            }
            // Clamp between 0 and 1
            readingPercent = Math.max(0, Math.min(1, readingPercent));
        }

        // Update mode
        this.currentMode = newMode;
        this.applyMode(newMode, true);
        this.updateToggleUI();

        // Reload current chapter in new mode with position restoration
        if (reader && currentChapter) {
            if (newMode === 'page') {
                // Switching to Pages: load chapter, then jump to approximate page
                reader.loadChapter(currentChapter, null, false);
                // After pagination calculates, jump to approximate page
                setTimeout(() => {
                    if (reader.totalPages > 0) {
                        const targetPage = Math.min(
                            Math.round(readingPercent * reader.totalPages),
                            reader.totalPages - 1
                        );
                        reader.showPage(Math.max(0, targetPage));
                    }
                }, 50);
            } else {
                // Switching to Scroll: load chapter, then scroll to approximate position
                reader.loadChapter(currentChapter, 0, false);
                setTimeout(() => {
                    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const targetScroll = Math.round(readingPercent * scrollHeight);
                    window.scrollTo({ top: targetScroll, behavior: 'instant' });
                }, 50);
            }
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
