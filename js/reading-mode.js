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

// Theme Manager
// Handles light/dark mode switching

class ThemeManager {
    constructor() {
        this.currentTheme = this.loadTheme();
    }

    init() {
        // Apply initial theme immediately (before page renders)
        this.applyTheme(this.currentTheme);

        // Check if toggle should be shown
        const toggle = document.getElementById('themeToggle');
        if (!CONFIG.showDarkModeToggle && toggle) {
            toggle.style.display = 'none';
            return;
        }

        // Set up toggle buttons
        const toggleButtons = document.querySelectorAll('.theme-btn');
        toggleButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Use currentTarget to get the button, not the SVG inside it
                const button = e.currentTarget;
                const theme = button.dataset.theme;
                if (theme && theme !== this.currentTheme) {
                    this.switchTheme(theme);
                }
            });
        });

        // Update UI
        this.updateToggleUI();

        console.log(`Theme initialized: ${this.currentTheme}`);
    }

    loadTheme() {
        const saved = localStorage.getItem('theme');
        if (saved) return saved;

        // Check config default
        const configDefault = CONFIG.defaultTheme || 'auto';

        if (configDefault === 'auto') {
            // Default to system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
            return 'light';
        }

        return configDefault;
    }

    saveTheme(theme) {
        localStorage.setItem('theme', theme);
    }

    switchTheme(newTheme) {
        this.currentTheme = newTheme;
        this.saveTheme(newTheme);
        this.applyTheme(newTheme);
        this.updateToggleUI();

        window.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme: newTheme }
        }));

        console.log(`Switched to ${newTheme} theme`);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }

    updateToggleUI() {
        const buttons = document.querySelectorAll('.theme-btn');
        buttons.forEach(btn => {
            if (btn.dataset.theme === this.currentTheme) {
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
            } else {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            }
        });
    }

    getTheme() {
        return this.currentTheme;
    }

    isDark() {
        return this.currentTheme === 'dark';
    }

    isLight() {
        return this.currentTheme === 'light';
    }

    toggle() {
        this.switchTheme(this.currentTheme === 'dark' ? 'light' : 'dark');
    }
}

// Create singleton instances
const readingModeManager = new ReadingModeManager();
const themeManager = new ThemeManager();

// Apply theme immediately to prevent flash
themeManager.applyTheme(themeManager.currentTheme);

// Export for use in other modules
export { readingModeManager, themeManager };

// Also expose globally for non-module scripts
window.readingModeManager = readingModeManager;
window.themeManager = themeManager;
