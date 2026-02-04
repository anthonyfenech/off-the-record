/**
 * Auto-Bookmark & Resume System
 * Dead-simple: saves position, one-click resume
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
        } catch {
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
        } catch {
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

    // ========== TIME FORMATTING ==========

    function formatTimestamp(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;

        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 5) return 'Just now';
        if (minutes < 60) return `${minutes} minutes ago`;
        if (hours < 24) return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
        if (days === 1) return 'Yesterday';
        if (days < 7) return `${days} days ago`;
        return new Date(timestamp).toLocaleDateString();
    }

    // ========== RESUME PROMPT ==========

    function createResumePrompt() {
        const prompt = document.createElement('div');
        prompt.id = 'resume-prompt';
        prompt.className = 'resume-prompt';
        prompt.innerHTML = `
            <div class="resume-card">
                <p class="resume-label">Continue Reading</p>
                <h3 class="resume-chapter" id="resume-chapter-title"></h3>
                <p class="resume-time" id="resume-time"></p>
                <button id="btn-resume" class="btn-resume">CONTINUE →</button>
            </div>
        `;
        prompt.style.display = 'none';
        return prompt;
    }

    function showResumePrompt(bookmark) {
        let prompt = document.getElementById('resume-prompt');

        if (!prompt) {
            prompt = createResumePrompt();
            // Insert after title page content or at start of chapter body
            const titlePage = document.querySelector('.title-page');
            const chapterBody = document.getElementById('chapterBody');

            if (titlePage) {
                titlePage.appendChild(prompt);
            } else if (chapterBody) {
                chapterBody.insertBefore(prompt, chapterBody.firstChild);
            } else {
                return; // Can't find insertion point
            }
        }

        // Fill in bookmark details
        const titleEl = document.getElementById('resume-chapter-title');
        const timeEl = document.getElementById('resume-time');
        const btnResume = document.getElementById('btn-resume');

        if (titleEl) titleEl.textContent = bookmark.chapterTitle;
        if (timeEl) timeEl.textContent = formatTimestamp(bookmark.timestamp);

        // Handle resume click
        if (btnResume) {
            btnResume.onclick = () => resumeReading(bookmark);
        }

        // Show prompt
        prompt.style.display = 'block';
    }

    function hideResumePrompt() {
        const prompt = document.getElementById('resume-prompt');
        if (prompt) {
            prompt.style.display = 'none';
        }
    }

    function resumeReading(bookmark) {
        // Store scroll target for destination
        sessionStorage.setItem('scrollToPercent', bookmark.scrollPercent.toString());

        // Navigate to chapter using slug
        window.location.hash = bookmark.chapterSlug;
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

        // Check if this is the title/home page
        const isTitlePage = !currentChapter.id || currentChapter.id < 1;

        if (isTitlePage) {
            // Show resume prompt if bookmark exists
            const bookmark = getBookmark();
            if (bookmark && bookmark.chapterId) {
                // Small delay to let title page render
                setTimeout(() => showResumePrompt(bookmark), 100);
            }
        } else {
            // Hide resume prompt
            hideResumePrompt();

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

        console.log('[Bookmark] Initialized');
    }

    // ========== PUBLIC API ==========

    window.bookmark = {
        init: init,
        save: saveBookmark,
        get: getBookmark,
        clear: clearBookmark,
        resume: function() {
            const bm = getBookmark();
            if (bm) resumeReading(bm);
        }
    };

    // Auto-init when DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
