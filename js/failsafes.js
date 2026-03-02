/**
 * OTR Failsafes — Bulletproof overlay protection
 * Prevents any overlay/modal/sidebar from ever freezing the site
 */

(function() {
    'use strict';

    // All overlay-type selectors used across the site
    var OVERLAY_SELECTORS = '.overlay, .modal, .toc-sidebar, .lightbox-overlay, #overlay, #prompt-modal, .prompt-overlay, [class*="overlay"], [class*="modal"], [class*="lightbox"]';
    var ACTIVE_OVERLAY_SELECTORS = '.overlay.active, .modal.active, .toc-sidebar.active, .lightbox-overlay.active, #prompt-modal.active, .prompt-overlay.active';
    var BODY_CLASSES = ['sidebar-open', 'modal-open', 'no-scroll'];

    // === HELPER: Close all overlays ===
    function closeAllOverlays(source) {
        document.querySelectorAll(OVERLAY_SELECTORS).forEach(function(el) {
            el.classList.remove('active');
        });
        document.body.style.overflow = '';
        document.body.style.pointerEvents = '';
        BODY_CLASSES.forEach(function(cls) {
            document.body.classList.remove(cls);
        });
        if (source) {
            console.log('[OTR Failsafe] Overlays closed via: ' + source);
        }
    }

    // === FAILSAFE 1: Escape Key Universal Close ===
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            var hasActive = document.querySelector(ACTIVE_OVERLAY_SELECTORS);
            if (hasActive) {
                closeAllOverlays('Escape key');
            }
        }
    });

    // === FAILSAFE 2: Navigation Event Cleanup ===
    ['popstate', 'hashchange'].forEach(function(evt) {
        window.addEventListener(evt, function() {
            closeAllOverlays('navigation: ' + evt);
        });
    });

    // === FAILSAFE 3: Overlay Timeout (90 seconds) ===
    var overlayTimer = null;

    function startOverlayTimer() {
        clearTimeout(overlayTimer);
        overlayTimer = setTimeout(function() {
            var stuck = document.querySelector(ACTIVE_OVERLAY_SELECTORS);
            if (stuck) {
                closeAllOverlays('90s timeout');
            }
        }, 90000);
    }

    function stopOverlayTimer() {
        clearTimeout(overlayTimer);
    }

    // === FAILSAFE 4: Backdrop Click/Tap Universal Close ===
    function setupBackdropListeners() {
        document.querySelectorAll('.overlay, .prompt-overlay, .lightbox-overlay').forEach(function(overlay) {
            // Only add listeners once
            if (overlay.dataset.failsafeListenerAdded) return;
            overlay.dataset.failsafeListenerAdded = 'true';

            overlay.addEventListener('click', function(e) {
                // Only close if clicking the backdrop itself, not a child element
                if (e.target === this) {
                    closeAllOverlays('backdrop click');
                }
            });

            overlay.addEventListener('touchstart', function(e) {
                if (e.target === this) {
                    e.preventDefault();
                    closeAllOverlays('backdrop tap');
                }
            }, { passive: false });
        });
    }

    // === FAILSAFE 5: MutationObserver for overlay timeout ===
    function setupOverlayObserver() {
        var observer = new MutationObserver(function(mutations) {
            var anyActive = false;
            mutations.forEach(function(m) {
                if (m.target.classList && m.target.classList.contains('active')) {
                    anyActive = true;
                }
            });
            if (anyActive) {
                startOverlayTimer();
            } else {
                // Check if ALL overlays are now inactive
                var stillActive = document.querySelector(ACTIVE_OVERLAY_SELECTORS);
                if (!stillActive) {
                    stopOverlayTimer();
                }
            }
        });

        document.querySelectorAll('.overlay, .toc-sidebar, .modal, .lightbox-overlay, .prompt-overlay, #prompt-modal').forEach(function(el) {
            observer.observe(el, { attributes: true, attributeFilter: ['class'] });
        });
    }

    // === FAILSAFE 6: Console Emergency Function ===
    window.__forceCloseOverlays = function() {
        document.querySelectorAll(OVERLAY_SELECTORS).forEach(function(el) {
            el.classList.remove('active');
            el.style.pointerEvents = 'none';
            el.style.visibility = 'hidden';
            el.style.opacity = '0';
            el.style.zIndex = '-1';
        });
        document.body.style.overflow = 'auto';
        document.body.style.pointerEvents = 'auto';
        BODY_CLASSES.forEach(function(cls) {
            document.body.classList.remove(cls);
        });
        console.log('All overlays force-closed');
        return 'Done — all overlays cleared. Reload page to restore normal behavior.';
    };

    // === INIT: Run on DOMContentLoaded ===
    document.addEventListener('DOMContentLoaded', function() {
        // Initial cleanup — clear any stuck states from previous sessions
        var stuckOverlay = document.querySelector(ACTIVE_OVERLAY_SELECTORS);
        if (stuckOverlay) {
            closeAllOverlays('page load cleanup');
        }

        // Ensure body is scrollable
        if (!document.querySelector('.toc-sidebar.active') && !document.querySelector('.modal.active')) {
            document.body.style.overflow = '';
        }

        // Setup backdrop listeners
        setupBackdropListeners();

        // Setup mutation observer for timeout
        setupOverlayObserver();

        console.log('[OTR] Failsafes initialized — Escape key, timeout, backdrop click, navigation cleanup, console __forceCloseOverlays()');
    });

    // === ALSO: Re-setup backdrop listeners after dynamic content loads ===
    // (in case modals are added to DOM after initial load)
    var bodyObserver = new MutationObserver(function() {
        setupBackdropListeners();
    });
    document.addEventListener('DOMContentLoaded', function() {
        bodyObserver.observe(document.body, { childList: true, subtree: true });
    });

})();
