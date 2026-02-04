// Mobile Optimizer - Network detection, iOS fixes, and mobile optimizations

class MobileOptimizer {
    constructor() {
        this.isMobile = false;
        this.isSlowConnection = false;
        this.isDataSaver = false;
        this.isIOS = false;
    }

    init() {
        this.detectDevice();
        this.detectConnection();
        this.applyOptimizations();

        // Listen for connection changes
        if ('connection' in navigator) {
            const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            if (conn) {
                conn.addEventListener('change', () => {
                    this.detectConnection();
                    this.applyOptimizations();
                });
            }
        }
    }

    detectDevice() {
        // Check screen width
        this.isMobile = window.innerWidth <= 768;

        // Check for iOS
        this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

        // Add device class to body
        if (this.isMobile) {
            document.body.classList.add('is-mobile');
        }
        if (this.isIOS) {
            document.body.classList.add('is-ios');
        }
    }

    detectConnection() {
        if ('connection' in navigator) {
            const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

            if (conn) {
                // Check effective connection type
                const slowTypes = ['slow-2g', '2g', '3g'];
                this.isSlowConnection = slowTypes.includes(conn.effectiveType);

                // Check data saver mode
                this.isDataSaver = conn.saveData === true;
            }
        }
    }

    applyOptimizations() {
        // iOS-specific fixes
        if (this.isIOS) {
            this.applyIOSFixes();
        }

        // Slow connection optimizations
        if (this.isSlowConnection || this.isDataSaver) {
            this.applySlowConnectionOptimizations();
        } else {
            this.removeSlowConnectionOptimizations();
        }

        // Mobile-specific optimizations
        if (this.isMobile) {
            this.applyMobileOptimizations();
        }
    }

    applyIOSFixes() {
        // Fix viewport height (100vh includes address bar on iOS)
        const setVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        setVH();
        window.addEventListener('resize', setVH);
        window.addEventListener('orientationchange', () => {
            setTimeout(setVH, 100);
        });
    }

    applySlowConnectionOptimizations() {
        document.body.classList.add('slow-connection');

        // Disable chapter preloading
        window.DISABLE_PRELOAD = true;

        // Remove any existing prefetch links
        document.querySelectorAll('link[rel="prefetch"]').forEach(link => link.remove());
    }

    removeSlowConnectionOptimizations() {
        document.body.classList.remove('slow-connection');
        window.DISABLE_PRELOAD = false;
    }

    applyMobileOptimizations() {
        // Reduce animation duration for snappier feel
        document.documentElement.style.setProperty('--transition-normal', '200ms ease');

        // Reduce IntersectionObserver margins
        window.MOBILE_OBSERVER_MARGIN = '50px';
    }
}

// Export and initialize
export const mobileOptimizer = new MobileOptimizer();
