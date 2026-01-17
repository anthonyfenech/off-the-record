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

        console.log('Boss Button: Initialized with', this.screenModes.length, 'rotating screens (ESC key only)');
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

        const endTime = performance.now();
        const duration = endTime - startTime;

        if (duration > 100) {
            console.warn(`Boss Button: Activation took ${duration.toFixed(2)}ms (target: <100ms)`);
        } else {
            console.log(`Boss Button: Activated in ${duration.toFixed(2)}ms`);
        }

        this.logAnalytics('activate');
    }

    // Deactivate Boss Mode - restore exact position
    deactivate() {
        const startTime = performance.now();

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

        const endTime = performance.now();
        const duration = endTime - startTime;

        console.log(`Boss Button: Deactivated in ${duration.toFixed(2)}ms`);

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

        console.log('Boss Button Analytics:', data);

        // Dispatch custom event for external analytics integration
        window.dispatchEvent(new CustomEvent('bossButtonAction', { detail: data }));
    }

    // Performance test suite
    runTests() {
        console.log('=================================');
        console.log('   BOSS BUTTON TEST SUITE');
        console.log('=================================');

        const perfResult = this.testPerformance();
        const scrollResult = this.testScrollRestoration();

        console.log('=================================');
        if (perfResult && scrollResult) {
            console.log('✅ ALL TESTS PASSED - Ready for production');
        } else {
            console.error('❌ TESTS FAILED - DO NOT DEPLOY');
        }
        console.log('=================================');

        return perfResult && scrollResult;
    }

    testPerformance() {
        console.log('🧪 Testing Boss Button Performance...');
        const iterations = 50;
        const timings = [];

        for (let i = 0; i < iterations; i++) {
            const start = performance.now();
            this.activate();
            this.deactivate();
            const end = performance.now();
            timings.push(end - start);
        }

        const avgTime = timings.reduce((a, b) => a + b) / timings.length;
        const maxTime = Math.max(...timings);
        const minTime = Math.min(...timings);

        console.log(`📊 Performance Results (${iterations} iterations):`);
        console.log(`   Average: ${avgTime.toFixed(2)}ms`);
        console.log(`   Min: ${minTime.toFixed(2)}ms`);
        console.log(`   Max: ${maxTime.toFixed(2)}ms`);

        if (maxTime > 100) {
            console.error('❌ FAILED: Boss Button exceeds 100ms requirement');
            return false;
        }

        console.log('✅ PASSED: Boss Button performance acceptable');
        return true;
    }

    testScrollRestoration() {
        console.log('🧪 Testing Scroll Restoration...');
        const testPositions = [0, 100, 500, 1000, 2500];
        let passed = true;

        testPositions.forEach(pos => {
            window.scrollTo(0, pos);
            // Wait for scroll to settle
            const savedPos = window.scrollY;

            this.activate();
            this.deactivate();

            const restoredPos = window.scrollY;

            if (Math.abs(savedPos - restoredPos) > 1) {
                console.error(`❌ FAILED: Scroll restoration at ${pos}px (expected ${savedPos}, got ${restoredPos})`);
                passed = false;
            } else {
                console.log(`✅ Position ${pos}px restored correctly`);
            }
        });

        if (passed) {
            console.log('✅ PASSED: All scroll positions restored accurately');
        }

        return passed;
    }
}

// Create singleton instance
const bossButton = new BossButton();

// Export for module usage
export { bossButton };

// Make available globally for debugging and testing
if (typeof window !== 'undefined') {
    window.bossButton = bossButton;
    window.runBossButtonTests = () => bossButton.runTests();
}
