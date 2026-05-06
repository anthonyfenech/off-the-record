/**
 * Auto-Bookmark System
 * Saves reading position for chapter progress tracking
 * Note: Visual continue reading prompt removed - tracking remains for sidebar indicators
 */

(function() {
    'use strict';

    const STORAGE_KEY = 'otr_bookmark';
    const SAVE_DELAY = 5000; // 5 seconds after scroll stops

    // State
    let currentChapter = null;
    let saveTimeout = null;
    let isInitialized = false;

    // ========== STORAGE ==========

    function isStorageAvailable() {
        try {
            localStorage.setItem('_test', '1');
            localStorage.removeItem('_test');
            return true;
        } catch (e) {
            console.warn('[OTR] Storage not available:', e);
            return false;
        }
    }

    function saveBookmark() {
        if (!currentChapter || !isStorageAvailable()) return;

        // Don't save for special pages (title, toc)
        if (!currentChapter.id || currentChapter.id < 1) return;

        const scrollPercent = getScrollPercent();

        const bookmark = {
            chapterId: currentChapter.id,
            chapterSlug: currentChapter.slug,
            chapterTitle: currentChapter.title,
            scrollPercent: scrollPercent,
            timestamp: Date.now()
        };

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmark));
        } catch (e) {
            // Storage full or blocked - fail silently
        }
    }

    function getBookmark() {
        if (!isStorageAvailable()) return null;

        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : null;
        } catch (e) {
            console.warn('[OTR] Bookmark read error:', e);
            return null;
        }
    }

    function clearBookmark() {
        if (!isStorageAvailable()) return;
        localStorage.removeItem(STORAGE_KEY);
    }

    // ========== SCROLL HELPERS ==========

    function getScrollPercent() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (scrollHeight <= 0) return 0;
        return Math.round((scrollTop / scrollHeight) * 100);
    }

    function scrollToPercent(percent) {
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const targetScroll = (scrollHeight * percent) / 100;

        window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });
    }

    // ========== SCROLL RESTORATION ==========

    function checkScrollRestore() {
        const scrollTarget = sessionStorage.getItem('scrollToPercent');

        if (scrollTarget) {
            // Wait for content to render
            setTimeout(() => {
                scrollToPercent(parseInt(scrollTarget, 10));
                sessionStorage.removeItem('scrollToPercent');
            }, 300);
        }
    }

    // ========== EVENT HANDLERS ==========

    function handleScroll() {
        if (!currentChapter || !currentChapter.id || currentChapter.id < 1) return;

        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(saveBookmark, SAVE_DELAY);
    }

    function handleChapterLoaded(e) {
        const detail = e.detail || {};
        const chapter = detail.chapter;

        // Get chapter info from event
        if (chapter) {
            currentChapter = {
                id: chapter.id,
                slug: chapter.slug,
                title: chapter.title
            };
        } else {
            // Fallback
            currentChapter = {
                id: detail.chapterId,
                slug: '',
                title: ''
            };
        }

        // Check if this is a real chapter (not title/home page)
        const isRealChapter = currentChapter.id && currentChapter.id >= 1;

        if (isRealChapter) {
            // Check if we should restore scroll position
            checkScrollRestore();

            // Save bookmark immediately for this chapter
            setTimeout(saveBookmark, 1000);
        }
    }

    function handleBeforeUnload() {
        // Save on page exit
        if (currentChapter && currentChapter.id && currentChapter.id >= 1) {
            saveBookmark();
        }
    }

    // ========== INITIALIZATION ==========

    function init() {
        if (isInitialized) return;
        isInitialized = true;

        if (!isStorageAvailable()) {
            console.log('[Bookmark] localStorage not available');
            return;
        }

        // Listen for chapter loads
        window.addEventListener('chapterLoaded', handleChapterLoaded);

        // Track scrolling
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Save on exit
        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('pagehide', handleBeforeUnload);

        // Check for initial state (if chapter already loaded)
        if (window.currentChapterId !== undefined) {
            handleChapterLoaded({ detail: { chapterId: window.currentChapterId } });
        }
    }

    // ========== PUBLIC API ==========

    window.bookmark = {
        init: init,
        save: saveBookmark,
        get: getBookmark,
        clear: clearBookmark
    };

    // Auto-init when DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
