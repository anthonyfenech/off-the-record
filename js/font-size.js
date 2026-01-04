// FONT SIZE MANAGER
// Lets readers adjust text size to their preference

class FontSizeManager {
    constructor() {
        this.sizes = ['small', 'medium', 'large'];
        this.currentSize = this.loadSize();
        this.init();
    }

    init() {
        // Apply saved size immediately
        this.applySize(this.currentSize);
        console.log(`Font size initialized: ${this.currentSize}`);
    }

    loadSize() {
        // Load saved preference from localStorage
        const saved = localStorage.getItem('fontSize');
        // Default to medium if no preference saved
        return saved || 'medium';
    }

    saveSize(size) {
        localStorage.setItem('fontSize', size);
    }

    changeSize(size) {
        // Validate size
        if (!this.sizes.includes(size)) {
            console.error(`Invalid font size: ${size}`);
            return;
        }

        // Update current size
        this.currentSize = size;

        // Save preference
        this.saveSize(size);

        // Apply to page
        this.applySize(size);

        console.log(`Font size changed to: ${size}`);
    }

    applySize(size) {
        const body = document.body;

        // Remove all font size classes
        this.sizes.forEach(s => {
            body.classList.remove(`font-${s}`);
        });

        // Add current size class
        body.classList.add(`font-${size}`);
    }

    increaseFontSize() {
        const currentIndex = this.sizes.indexOf(this.currentSize);

        // If not at max size, increase
        if (currentIndex < this.sizes.length - 1) {
            const newSize = this.sizes[currentIndex + 1];
            this.changeSize(newSize);
            return newSize;
        }
        return this.currentSize;
    }

    decreaseFontSize() {
        const currentIndex = this.sizes.indexOf(this.currentSize);

        // If not at min size, decrease
        if (currentIndex > 0) {
            const newSize = this.sizes[currentIndex - 1];
            this.changeSize(newSize);
            return newSize;
        }
        return this.currentSize;
    }

    getSize() {
        return this.currentSize;
    }

    isSmall() {
        return this.currentSize === 'small';
    }

    isMedium() {
        return this.currentSize === 'medium';
    }

    isLarge() {
        return this.currentSize === 'large';
    }
}

// Create singleton instance
const fontSizeManager = new FontSizeManager();

// Set up keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Plus = larger
    // Ctrl/Cmd + Minus = smaller
    // Ctrl/Cmd + 0 = reset to medium

    if ((e.ctrlKey || e.metaKey) && !e.shiftKey) {
        if (e.key === '=' || e.key === '+') {
            e.preventDefault();
            fontSizeManager.increaseFontSize();
        } else if (e.key === '-') {
            e.preventDefault();
            fontSizeManager.decreaseFontSize();
        } else if (e.key === '0') {
            e.preventDefault();
            fontSizeManager.changeSize('medium');
        }
    }
});

// Export for use in other modules
export { fontSizeManager };
