// PWA - Service Worker registration and install prompt

class PWA {
    constructor() {
        this.deferredPrompt = null;
        this.isInstalled = false;
        this.autoHideTimer = null;
    }

    // Get install prompt settings from admin panel
    getSettings() {
        return {
            enabled: localStorage.getItem('admin_installPromptEnabled') === 'true',
            message: localStorage.getItem('admin_installMessage') || 'Install OFF-THE-RECORD for easy access and offline reading',
            buttonText: localStorage.getItem('admin_installButton') || 'Install',
            delay: parseInt(localStorage.getItem('admin_installDelay') || '1') * 1000, // convert to ms
            autoHide: parseInt(localStorage.getItem('admin_installAutoHide') || '0') * 1000 // convert to ms
        };
    }

    // Track install count
    trackInstall() {
        const currentCount = parseInt(localStorage.getItem('admin_installCount') || '0');
        localStorage.setItem('admin_installCount', currentCount + 1);
        console.log(`Install tracked! Total installs: ${currentCount + 1}`);
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
            this.trackInstall();
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
        const settings = this.getSettings();

        // Check if install prompt is enabled in admin
        if (!settings.enabled) {
            return;
        }

        // Check if user has dismissed before - never show again
        if (localStorage.getItem('installPromptDismissed') === 'true') {
            return;
        }

        // Create install prompt element
        const prompt = document.createElement('div');
        prompt.className = 'install-prompt';
        prompt.id = 'installPrompt';
        prompt.innerHTML = `
            <div class="install-prompt-text">
                ${settings.message}
            </div>
            <button class="install-btn" id="installBtn">${settings.buttonText}</button>
            <button class="dismiss-install" id="dismissInstall" aria-label="Dismiss">✕</button>
        `;

        document.body.appendChild(prompt);

        // Show with animation after configured delay
        setTimeout(() => {
            prompt.classList.add('show');

            // Auto-hide if configured (0 = never)
            if (settings.autoHide > 0) {
                this.autoHideTimer = setTimeout(() => {
                    this.hideInstallPrompt();
                }, settings.autoHide);
            }
        }, settings.delay);

        // Install button click
        document.getElementById('installBtn').addEventListener('click', () => {
            this.handleInstallClick();
        });

        // Dismiss button click - remember dismissal forever
        document.getElementById('dismissInstall').addEventListener('click', () => {
            localStorage.setItem('installPromptDismissed', 'true');
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

        // If accepted, track will happen via appinstalled event
        // If dismissed, just hide the prompt
        if (outcome === 'dismissed') {
            localStorage.setItem('installPromptDismissed', 'true');
        }

        // Clear deferred prompt
        this.deferredPrompt = null;

        // Hide custom prompt
        this.hideInstallPrompt();
    }

    // Hide install prompt
    hideInstallPrompt() {
        // Clear auto-hide timer if set
        if (this.autoHideTimer) {
            clearTimeout(this.autoHideTimer);
            this.autoHideTimer = null;
        }

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
