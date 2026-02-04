// ═══════════════════════════════════════════════════════════════
// ANALYTICS TRACKING
// Page view and chapter change tracking for main reader
// Extracted from index.html inline scripts
// ═══════════════════════════════════════════════════════════════

(function() {
    'use strict';

    // Track Home page view on load
    window.addEventListener('load', function() {
        if (window.analytics) {
            window.analytics.trackPageView('Home');
        }
    });

    // Track chapter changes via URL hash changes
    window.addEventListener('hashchange', function() {
        if (window.analytics) {
            var hash = window.location.hash;
            var chapterMatch = hash.match(/chapter-(\d+)/);
            if (chapterMatch) {
                window.analytics.trackPageView('Chapter ' + chapterMatch[1]);
            }
        }
    });

    // Observe chapter title changes for SPA navigation
    var titleEl = document.getElementById('chapterTitle');
    if (titleEl) {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && titleEl.textContent) {
                    if (window.analytics) {
                        window.analytics.trackPageView(titleEl.textContent);
                    }
                }
            });
        });
        observer.observe(titleEl, { childList: true, characterData: true, subtree: true });
    }

})();
