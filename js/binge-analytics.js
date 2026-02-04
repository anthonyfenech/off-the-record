// ═══════════════════════════════════════════════════════════════
// BINGE MODE ANALYTICS & BOOKMARK
// Tracks chapter scrolling and saves/restores reading position
// Extracted from binge-mode.html inline scripts
// ═══════════════════════════════════════════════════════════════

(function() {
    'use strict';

    // ─────────────────────────────────────────────────────────────
    // ANALYTICS TRACKING
    // ─────────────────────────────────────────────────────────────

    // Track Binge Mode page view on load
    window.addEventListener('load', function() {
        if (window.analytics) {
            window.analytics.trackPageView('Binge Mode');
        }
    });

    // Track chapter scrolling in binge mode
    var lastTrackedChapter = null;
    var chapterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var chapterId = entry.target.id;
                if (chapterId && chapterId !== lastTrackedChapter) {
                    lastTrackedChapter = chapterId;
                    if (window.analytics) {
                        var chapterNum = chapterId.replace('chapter-', '');
                        window.analytics.trackPageView('Binge Mode - Chapter ' + chapterNum);
                    }
                }
            }
        });
    }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });

    // Observe all chapter sections
    document.querySelectorAll('.chapter-section').forEach(function(section) {
        chapterObserver.observe(section);
    });

    // ─────────────────────────────────────────────────────────────
    // BOOKMARK SYSTEM
    // Saves and restores reading position
    // ─────────────────────────────────────────────────────────────

    var BINGE_BOOKMARK_KEY = 'otr_binge_bookmark';
    var currentVisibleChapter = null;
    var saveTimeout = null;

    function saveBingeBookmark() {
        if (!currentVisibleChapter) return;
        try {
            var scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
            localStorage.setItem(BINGE_BOOKMARK_KEY, JSON.stringify({
                chapterId: currentVisibleChapter,
                scrollPercent: scrollPercent,
                timestamp: Date.now()
            }));
        } catch (e) {}
    }

    function restoreBingeBookmark() {
        try {
            var stored = localStorage.getItem(BINGE_BOOKMARK_KEY);
            if (!stored) return;
            var bookmark = JSON.parse(stored);
            // Only restore if less than 7 days old
            if (Date.now() - bookmark.timestamp > 7 * 24 * 60 * 60 * 1000) return;
            var section = document.getElementById('chapter-' + bookmark.chapterId);
            if (section) {
                // Scroll to chapter
                setTimeout(function() {
                    section.scrollIntoView({ behavior: 'instant', block: 'start' });
                }, 100);
            }
        } catch (e) {}
    }

    // Track visible chapter
    var bookmarkObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var match = entry.target.id && entry.target.id.match(/chapter-(\d+)/);
                if (match) {
                    currentVisibleChapter = match[1];
                }
            }
        });
    }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

    document.querySelectorAll('.chapter-section').forEach(function(section) {
        bookmarkObserver.observe(section);
    });

    // Save position after scroll stops
    window.addEventListener('scroll', function() {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(saveBingeBookmark, 3000);
    }, { passive: true });

    // Save on exit
    window.addEventListener('beforeunload', saveBingeBookmark);
    window.addEventListener('pagehide', saveBingeBookmark);

    // Restore on load (unless URL has hash)
    if (!window.location.hash) {
        restoreBingeBookmark();
    }

})();
