/**
 * Install Nudge for OFF-THE-RECORD PWA
 * Respects admin settings from localStorage
 */
(function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════
    // GATE CHECKS — Exit early if nudge should not show
    // ═══════════════════════════════════════════════════════════════════════

    // Check admin toggle first
    if (localStorage.getItem('admin_installPromptEnabled') !== 'true') return;

    // Skip if not mobile
    if (window.innerWidth > 768) return;

    // Skip if already installed (standalone mode)
    if (navigator.standalone === true) return;
    if (window.matchMedia('(display-mode: standalone)').matches) return;

    // Skip if user already accepted
    if (localStorage.getItem('otr_install_accepted') === 'true') return;

    // Skip if dismissed within 30 days
    const dismissed = localStorage.getItem('otr_install_dismissed');
    if (dismissed) {
        const dismissedTime = parseInt(dismissed, 10);
        const thirtyDays = 30 * 24 * 60 * 60 * 1000;
        if (Date.now() - dismissedTime < thirtyDays) return;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // CONFIGURATION — Read from admin settings with defaults
    // ═══════════════════════════════════════════════════════════════════════

    const config = {
        message: localStorage.getItem('admin_installMessage') || 'Read like an app — add OFF-THE-RECORD to your home screen.',
        buttonText: localStorage.getItem('admin_installButton') || 'ADD TO HOME SCREEN',
        delaySeconds: parseInt(localStorage.getItem('admin_installDelay') || '1', 10),
        autoHideSeconds: parseInt(localStorage.getItem('admin_installAutoHide') || '0', 10)
    };

    // ═══════════════════════════════════════════════════════════════════════
    // STATE
    // ═══════════════════════════════════════════════════════════════════════

    let deferredPrompt = null;
    let hasScrolled = false;
    let nudgeShown = false;

    // ═══════════════════════════════════════════════════════════════════════
    // CAPTURE beforeinstallprompt (Android/Chrome)
    // ═══════════════════════════════════════════════════════════════════════

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
    });

    // ═══════════════════════════════════════════════════════════════════════
    // SCROLL LISTENER — Start delay timer after first scroll
    // ═══════════════════════════════════════════════════════════════════════

    window.addEventListener('scroll', function onFirstScroll() {
        if (hasScrolled) return;
        hasScrolled = true;

        // Don't show on title page (check if chapter content exists)
        const chapterBody = document.getElementById('chapterBody');
        if (!chapterBody || chapterBody.innerHTML.trim().length < 100) {
            // Re-listen on next scroll (user might navigate to chapter)
            hasScrolled = false;
            return;
        }

        // Start delay timer
        setTimeout(showNudge, config.delaySeconds * 1000);
    }, { passive: true });

    // ═══════════════════════════════════════════════════════════════════════
    // SHOW NUDGE
    // ═══════════════════════════════════════════════════════════════════════

    function showNudge() {
        if (nudgeShown) return;
        nudgeShown = true;

        // Create styles
        const style = document.createElement('style');
        style.id = 'install-nudge-styles';
        style.textContent = `
            #install-nudge {
                position: fixed;
                bottom: 90px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 49;
                background: var(--color-background, #ffffff);
                border: 1px solid var(--color-border, #1a1a1a);
                border-radius: 4px;
                box-shadow: 0 2px 12px rgba(0,0,0,0.1);
                padding: 16px;
                max-width: 320px;
                width: calc(100% - 32px);
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            #install-nudge.visible {
                opacity: 1;
            }
            .install-nudge-text {
                font-family: 'Literata', Georgia, serif;
                font-size: 14px;
                line-height: 1.4;
                color: var(--color-text-primary, #1a1a1a);
                margin: 0 0 14px 0;
                text-align: center;
            }
            .install-nudge-buttons {
                display: flex;
                gap: 8px;
                justify-content: center;
            }
            .install-nudge-btn {
                font-family: 'Courier New', monospace;
                font-size: 10px;
                letter-spacing: 0.5px;
                text-transform: uppercase;
                padding: 10px 14px;
                border-radius: 3px;
                cursor: pointer;
                border: 1px solid var(--color-text-primary, #1a1a1a);
                transition: opacity 0.15s;
            }
            .install-nudge-btn:active {
                opacity: 0.7;
            }
            .install-nudge-btn.primary {
                background: var(--color-text-primary, #1a1a1a);
                color: var(--color-background, #ffffff);
            }
            .install-nudge-btn.secondary {
                background: transparent;
                color: var(--color-text-primary, #1a1a1a);
            }
            .install-nudge-ios-tip {
                font-family: 'Literata', Georgia, serif;
                font-size: 12px;
                color: var(--color-text-secondary, #666);
                text-align: center;
                margin: 12px 0 0 0;
                display: none;
            }
            .install-nudge-ios-tip.visible {
                display: block;
            }
        `;
        document.head.appendChild(style);

        // Create nudge element
        const nudge = document.createElement('div');
        nudge.id = 'install-nudge';
        nudge.innerHTML = `
            <p class="install-nudge-text">${config.message}</p>
            <div class="install-nudge-buttons">
                <button class="install-nudge-btn primary" id="installAddBtn">${config.buttonText}</button>
                <button class="install-nudge-btn secondary" id="installDismissBtn">NOT NOW</button>
            </div>
            <p class="install-nudge-ios-tip" id="installIosTip">Tap the Share button <span style="font-size:16px;">⎙</span> then "Add to Home Screen"</p>
        `;
        document.body.appendChild(nudge);

        // Fade in
        requestAnimationFrame(() => {
            nudge.classList.add('visible');
        });

        // Auto-hide if configured
        if (config.autoHideSeconds > 0) {
            setTimeout(() => hideNudge(), config.autoHideSeconds * 1000);
        }

        // ───────────────────────────────────────────────────────────────────
        // BUTTON HANDLERS
        // ───────────────────────────────────────────────────────────────────

        document.getElementById('installAddBtn').addEventListener('click', handleInstall);
        document.getElementById('installDismissBtn').addEventListener('click', handleDismiss);
    }

    function handleInstall() {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

        if (isIOS) {
            // iOS: Show manual instructions
            document.getElementById('installIosTip').classList.add('visible');
            // Hide after 5 seconds
            setTimeout(() => hideNudge(), 5000);
        } else if (deferredPrompt) {
            // Android/Chrome: Trigger native prompt
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choice) => {
                if (choice.outcome === 'accepted') {
                    localStorage.setItem('otr_install_accepted', 'true');
                    // Increment admin counter
                    const count = parseInt(localStorage.getItem('admin_installCount') || '0', 10);
                    localStorage.setItem('admin_installCount', (count + 1).toString());
                }
                hideNudge();
            });
            deferredPrompt = null;
        } else {
            // Fallback: Show iOS-style instructions (works for most browsers)
            document.getElementById('installIosTip').classList.add('visible');
            setTimeout(() => hideNudge(), 5000);
        }
    }

    function handleDismiss() {
        localStorage.setItem('otr_install_dismissed', Date.now().toString());
        hideNudge();
    }

    function hideNudge() {
        const nudge = document.getElementById('install-nudge');
        if (nudge) {
            nudge.classList.remove('visible');
            setTimeout(() => {
                nudge.remove();
                document.getElementById('install-nudge-styles')?.remove();
            }, 300);
        }
    }

})();
