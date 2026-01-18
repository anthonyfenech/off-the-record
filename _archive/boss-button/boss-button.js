// Boss Button - Instant hide/show for work-appropriate cover
// Inspired by NCAA March Madness Boss Button
// Performance requirement: <100ms toggle, exact scroll restoration

class BossButton {
    constructor() {
        this.isHidden = false;
        this.savedScrollX = 0;
        this.savedScrollY = 0;
        this.screenModes = ['outlook', 'gmail', 'gdocs', 'slack', 'teams', 'wikipedia'];
        this.currentMode = null;
        this.lastActivated = null;
        this.fakeScreens = {};
    }

    init() {
        // Cache DOM elements for performance
        this.reader = document.getElementById('reader');
        this.header = document.getElementById('header');
        this.navFooter = document.getElementById('navFooter');
        this.tocSidebar = document.getElementById('tocSidebar');
        // Note: We don't manage the overlay - it has its own visibility via .active class

        // Cache fake screens
        this.screenModes.forEach(mode => {
            this.fakeScreens[mode] = document.getElementById(`fake-screen-${mode}`);
        });

        // Set up ESC key listener
        this.setupEscListener();

        // Set up fake screen click listeners
        this.setupFakeScreenListeners();
    }

    setupEscListener() {
        // ESC key listener - highest priority, capture phase
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                e.stopPropagation();
                this.toggle();
            }
        }, { capture: true, passive: false });
    }

    setupFakeScreenListeners() {
        // Click anywhere on fake screen to deactivate
        Object.values(this.fakeScreens).forEach(screen => {
            if (screen) {
                screen.addEventListener('click', () => this.deactivate());
            }
        });
    }

    // Activate Boss Mode - must complete in <100ms
    activate() {
        const startTime = performance.now();

        // Capture exact scroll position FIRST
        this.savedScrollX = window.scrollX;
        this.savedScrollY = window.scrollY;

        // Hide all real content immediately using visibility for speed
        // visibility: hidden is faster than display: none for large DOM
        if (this.reader) this.reader.style.visibility = 'hidden';
        if (this.header) this.header.style.visibility = 'hidden';
        if (this.navFooter) this.navFooter.style.visibility = 'hidden';
        if (this.tocSidebar) this.tocSidebar.style.visibility = 'hidden';

        // Randomly select a fake screen
        this.currentMode = this.screenModes[Math.floor(Math.random() * this.screenModes.length)];

        // Show the randomly selected fake screen
        const activeScreen = this.fakeScreens[this.currentMode];
        if (activeScreen) {
            activeScreen.style.display = 'block';
            // Force reflow to ensure immediate paint
            activeScreen.offsetHeight;
        }

        // Scroll to top on fake screen for realism
        window.scrollTo(0, 0);

        // Update state
        this.isHidden = true;
        this.lastActivated = Date.now();

        // Add body class for any additional styling
        document.body.classList.add('boss-mode-active');

        this.logAnalytics('activate');
    }

    // Deactivate Boss Mode - restore exact position
    deactivate() {
        // Hide all fake screens
        Object.values(this.fakeScreens).forEach(screen => {
            if (screen) screen.style.display = 'none';
        });

        // Show all real content
        if (this.reader) this.reader.style.visibility = 'visible';
        if (this.header) this.header.style.visibility = 'visible';
        if (this.navFooter) this.navFooter.style.visibility = 'visible';
        if (this.tocSidebar) this.tocSidebar.style.visibility = 'visible';

        // Restore EXACT scroll position
        window.scrollTo(this.savedScrollX, this.savedScrollY);

        // Update state
        this.isHidden = false;

        // Remove body class
        document.body.classList.remove('boss-mode-active');

        this.logAnalytics('deactivate');
    }

    // Toggle between states
    toggle() {
        if (this.isHidden) {
            this.deactivate();
        } else {
            this.activate();
        }
    }

    // Analytics logging
    logAnalytics(action) {
        const data = {
            timestamp: new Date().toISOString(),
            action: action,
            mode: this.currentMode,
            chapter: window.location.hash || 'home',
            timeHidden: action === 'deactivate' && this.lastActivated
                ? (Date.now() - this.lastActivated)
                : null
        };

        // Dispatch custom event for external analytics integration
        window.dispatchEvent(new CustomEvent('bossButtonAction', { detail: data }));
    }
}

// Create singleton instance
const bossButton = new BossButton();

// Export for module usage
export { bossButton };
