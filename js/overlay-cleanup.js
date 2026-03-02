/**
 * Global Overlay Cleanup Utility
 * Provides guaranteed cleanup for all overlay/modal systems to prevent stuck states.
 *
 * Usage: Import and call overlayCleanup.forceCleanup() to dismiss all overlays.
 * Automatically cleans up on page visibility changes and errors.
 */

export const overlayCleanup = {
    // Track all registered overlay systems
    _overlays: new Map(),

    /**
     * Register an overlay system for cleanup
     * @param {string} id - Unique identifier for the overlay
     * @param {Object} config - Configuration object
     * @param {Function} config.isOpen - Returns true if overlay is currently open
     * @param {Function} config.close - Function to close the overlay
     * @param {HTMLElement} [config.element] - The overlay DOM element (for fallback cleanup)
     */
    register(id, config) {
        this._overlays.set(id, config);
    },

    /**
     * Unregister an overlay system
     * @param {string} id - Identifier of overlay to remove
     */
    unregister(id) {
        this._overlays.delete(id);
    },

    /**
     * Force close all registered overlays
     */
    forceCleanup() {
        // Always restore body scroll
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';

        // Close all registered overlays
        this._overlays.forEach((config, id) => {
            try {
                if (config.isOpen && config.isOpen()) {
                    if (config.close) {
                        config.close();
                    }
                }
            } catch (e) {
                console.warn(`[OverlayCleanup] Error closing ${id}:`, e);
            }

            // Fallback: directly manipulate DOM element if provided
            if (config.element) {
                try {
                    config.element.classList.remove('active');
                    config.element.style.display = 'none';
                    config.element.style.visibility = 'hidden';
                    config.element.style.opacity = '0';
                    config.element.style.pointerEvents = 'none';
                } catch (e) {
                    // Ignore DOM errors
                }
            }
        });

        // Fallback: clean up any known overlay elements that might be stuck
        this._fallbackCleanup();
    },

    /**
     * Fallback cleanup for known overlay selectors
     * This catches any overlays that weren't properly registered
     */
    _fallbackCleanup() {
        const overlaySelectors = [
            '#passwordGate',
            '.media-modal-overlay',
            '.photo-modal-overlay',
            '.prompt-overlay',
            '.prompt-modal',
            '.live-prompt-overlay',
            '#live-prompt-modal',
            '#prompt-modal',
            '.overlay.active',
            '[role="dialog"]'
        ];

        overlaySelectors.forEach(selector => {
            try {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    // Don't hide the password gate if user isn't authenticated
                    if (el.id === 'passwordGate') {
                        // Check if we should keep it visible
                        const isAuthenticated = localStorage.getItem('otr_beta_session');
                        if (!isAuthenticated) return;

                        // Parse and check expiry
                        try {
                            const session = JSON.parse(isAuthenticated);
                            if (session.expires && session.expires < Date.now()) return;
                        } catch (e) {
                            return; // Keep gate visible if can't parse
                        }
                    }

                    // Clean up the element
                    el.classList.remove('active');

                    // For display-based overlays
                    if (el.style.display === 'flex' || el.style.display === 'block') {
                        el.style.display = 'none';
                    }

                    // For visibility-based overlays
                    el.style.visibility = 'hidden';
                    el.style.opacity = '0';
                    el.style.pointerEvents = 'none';
                });
            } catch (e) {
                // Ignore selector errors
            }
        });
    },

    /**
     * Check if any overlay is currently open
     * @returns {boolean}
     */
    hasOpenOverlay() {
        for (const [, config] of this._overlays) {
            try {
                if (config.isOpen && config.isOpen()) {
                    return true;
                }
            } catch (e) {
                // Ignore
            }
        }
        return false;
    },

    /**
     * Initial cleanup on page load - removes stuck overlays
     * This runs before any other JavaScript to ensure clean state
     */
    _initialCleanup() {
        // Remove active class from all overlays
        const activeOverlays = document.querySelectorAll('.overlay.active, .active[class*="overlay"]');
        activeOverlays.forEach(el => {
            el.classList.remove('active');
        });

        // Ensure body scroll is not locked
        document.body.style.overflow = '';

        // Ensure all overlay elements have pointer-events: none
        const overlaySelectors = [
            '.overlay:not(.active)',
            '.media-modal-overlay:not(.active)',
            '.photo-modal-overlay:not(.active)',
            '.prompt-overlay:not(.active)',
            '#prompt-modal:not(.active)'
        ];
        overlaySelectors.forEach(selector => {
            try {
                document.querySelectorAll(selector).forEach(el => {
                    el.style.pointerEvents = 'none';
                });
            } catch (e) { /* ignore */ }
        });
    },

    /**
     * Initialize automatic cleanup handlers
     */
    init() {
        // Immediate cleanup on page load - clear any stuck overlays from previous session
        this._initialCleanup();

        // Clean up when page becomes hidden (tab switch, minimize)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.hasOpenOverlay()) {
                // User left the page with an overlay open - restore scroll on return
                this._scrollWasLocked = document.body.style.overflow === 'hidden';
            } else if (!document.hidden && this._scrollWasLocked) {
                // User returned - if no overlay is open, ensure scroll is restored
                if (!this.hasOpenOverlay()) {
                    document.body.style.overflow = '';
                }
                this._scrollWasLocked = false;
            }
        });

        // Clean up on unhandled errors
        window.addEventListener('error', () => {
            // Only restore scroll, don't close overlays on errors
            // (user might want to see error state)
            if (document.body.style.overflow === 'hidden') {
                // Delay to allow error to be logged
                setTimeout(() => {
                    if (!this.hasOpenOverlay()) {
                        document.body.style.overflow = '';
                    }
                }, 100);
            }
        });

        // Safety timeout: if body scroll is locked for too long, restore it
        setInterval(() => {
            if (document.body.style.overflow === 'hidden' && !this.hasOpenOverlay()) {
                console.warn('[OverlayCleanup] Detected stuck scroll lock, restoring');
                document.body.style.overflow = '';
            }
        }, 5000);

        // Expose global cleanup function for emergency use
        window.__forceCloseOverlays = () => this.forceCleanup();
    }
};

// Auto-initialize when script loads
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => overlayCleanup.init());
    } else {
        overlayCleanup.init();
    }
}
