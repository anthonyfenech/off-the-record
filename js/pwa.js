// PWA - Silent service worker registration
// No visible UI, no popups, no notifications

class PWA {
    constructor() {
        // Silent initialization
    }

    init() {
        // Register service worker silently
        if ('serviceWorker' in navigator) {
            this.registerServiceWorker();
        }
    }

    async registerServiceWorker() {
        try {
            await navigator.serviceWorker.register('./sw.js');
            // Success - do nothing visible
        } catch (error) {
            // Failed - do nothing visible
        }
    }
}

// Export single instance
export const pwa = new PWA();
