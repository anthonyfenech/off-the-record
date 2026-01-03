// Main app initialization

import { reader } from './reader.js';
import { navigation } from './navigation.js';
import { pwa } from './pwa.js';
import { photoGallery } from './photoGallery.js';

class App {
    constructor() {
        this.isReady = false;
    }

    // Initialize the app
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            this.start();
        }
    }

    // Start the app
    start() {
        console.log('OFF-THE-RECORD: Initializing...');

        try {
            // Initialize core modules
            reader.init();
            navigation.init();
            pwa.init();
            photoGallery.init();

            this.isReady = true;
            console.log('OFF-THE-RECORD: Ready');

            // Dispatch ready event
            window.dispatchEvent(new Event('appReady'));
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.showError('Failed to load the app. Please refresh the page.');
        }
    }

    // Show error message
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = message;
        document.body.insertBefore(errorDiv, document.body.firstChild);
    }
}

// Create and initialize app
const app = new App();
app.init();

// Make app available globally for debugging
if (typeof window !== 'undefined') {
    window.app = app;
}
