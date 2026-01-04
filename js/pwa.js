// PWA - Service Worker registration and install prompt

class PWA {
    constructor() {
        this.deferredPrompt = null;
        this.isInstalled = false;
    }

    // Initialize PWA features
    init() {
        // Register service worker
        if ('serviceWorker' in navigator) {
            this.registerServiceWorker();
        }

        // Check if already installed
        this.checkIfInstalled();

        // Listen for install prompt
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent default browser install prompt
            e.preventDefault();

            // Store the event for later use
            this.deferredPrompt = e;

            // Show custom install prompt if not already installed
            if (!this.isInstalled) {
                this.showInstallPrompt();
            }
        });

        // Listen for successful installation
        window.addEventListener('appinstalled', () => {
            console.log('PWA installed successfully');
            this.isInstalled = true;
            this.hideInstallPrompt();
        });
    }

    // Register service worker
    async registerServiceWorker() {
        try {
            const registration = await navigator.serviceWorker.register('./sw.js');

            console.log('Service Worker registered:', registration.scope);

            // Check for updates
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;

                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // New service worker available
                        console.log('New version available');
                        this.showUpdateNotification();
                    }
                });
            });
        } catch (error) {
            console.error('Service Worker registration failed:', error);
        }
    }

    // Check if app is already installed
    checkIfInstalled() {
        // Check standalone mode (iOS)
        if (window.matchMedia('(display-mode: standalone)').matches) {
            this.isInstalled = true;
            return;
        }

        // Check navigator.standalone (iOS Safari)
        if (window.navigator.standalone === true) {
            this.isInstalled = true;
            return;
        }

        // Check if opened from home screen
        if (document.referrer.includes('android-app://')) {
            this.isInstalled = true;
            return;
        }
    }

    // Show install prompt
    showInstallPrompt() {
        // Create install prompt element
        const prompt = document.createElement('div');
        prompt.className = 'install-prompt';
        prompt.id = 'installPrompt';
        prompt.innerHTML = `
            <div class="install-prompt-text">
                Install OFF-THE-RECORD for easy access and offline reading
            </div>
            <button class="install-btn" id="installBtn">Install</button>
            <button class="dismiss-install" id="dismissInstall" aria-label="Dismiss">✕</button>
        `;

        document.body.appendChild(prompt);

        // Show with animation
        setTimeout(() => {
            prompt.classList.add('show');
        }, 1000);

        // Install button click
        document.getElementById('installBtn').addEventListener('click', () => {
            this.handleInstallClick();
        });

        // Dismiss button click
        document.getElementById('dismissInstall').addEventListener('click', () => {
            this.hideInstallPrompt();
        });
    }

    // Handle install button click
    async handleInstallClick() {
        if (!this.deferredPrompt) {
            return;
        }

        // Show browser install prompt
        this.deferredPrompt.prompt();

        // Wait for user choice
        const { outcome } = await this.deferredPrompt.userChoice;

        console.log(`User ${outcome} the install prompt`);

        // Clear deferred prompt
        this.deferredPrompt = null;

        // Hide custom prompt
        this.hideInstallPrompt();
    }

    // Hide install prompt
    hideInstallPrompt() {
        const prompt = document.getElementById('installPrompt');
        if (prompt) {
            prompt.classList.remove('show');
            setTimeout(() => {
                prompt.remove();
            }, 300);
        }
    }

    // Show update notification
    showUpdateNotification() {
        // Simple notification for new version
        const notification = document.createElement('div');
        notification.className = 'update-notification';
        notification.innerHTML = `
            <div>A new version is available</div>
            <button onclick="window.location.reload()">Reload</button>
        `;
        document.body.appendChild(notification);

        // Auto-dismiss after 10 seconds
        setTimeout(() => {
            notification.remove();
        }, 10000);
    }
}

// Export single instance
export const pwa = new PWA();
