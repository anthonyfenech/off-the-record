/**
 * Comment Bubble Feature - OFF-THE-RECORD
 * ========================================
 * Floating chat bubble button for reader feedback.
 * Mirrors share button positioning (left instead of right).
 */

(function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════
    // CONSTANTS
    // ═══════════════════════════════════════════════════════════════

    const COMMENT_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzxbj0xjFmjzDA6L5MNG4IqZKuiI0mb9SAOOXhJY_UeQmeTWE7ldaas1fFC6xqUzHn0/exec';

    const MAX_MESSAGE_LENGTH = 300;
    const RATE_LIMIT_MS = 30000; // 30 seconds between submissions

    // Chat bubble SVG icon with thin circle border
    const CHAT_ICON_SVG = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="22" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <path d="M31 17H17c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12l4 4V19c0-1.1-.9-2-2-2z" fill="currentColor"/>
    </svg>`;

    // ═══════════════════════════════════════════════════════════════
    // STATE
    // ═══════════════════════════════════════════════════════════════

    let commentButton = null;
    let modalOverlay = null;
    let lastSubmitTime = 0;

    // ═══════════════════════════════════════════════════════════════
    // VISIBILITY LOGIC (mirrors share.js)
    // ═══════════════════════════════════════════════════════════════

    function isReadingScreen() {
        // Supports main reader (#chapterBody)

        // Check 1: Look for title-page or toc-page classes (main reader only)
        const chapterBody = document.getElementById('chapterBody');
        if (chapterBody) {
            const hasTitlePage = chapterBody.querySelector('.title-page');
            const hasTocPage = chapterBody.querySelector('.toc-page');
            if (hasTitlePage || hasTocPage) {
                return false;
            }
        }

        // Check 2: Check chapter ID from window.currentChapterId (main reader only)
        const currentChapterId = window.currentChapterId;
        if (currentChapterId === -1 || currentChapterId === 0 ||
            currentChapterId === '-1' || currentChapterId === '0') {
            return false;
        }

        // Check 3: Verify we have actual content (either mode)
        const hasContent = document.querySelectorAll('.chapter-body p').length > 0;
        if (!hasContent) {
            return false;
        }

        // Check 4: Not on home page
        if (document.body.classList.contains('home-page')) {
            return false;
        }

        return true;
    }

    function updateButtonVisibility() {
        if (!commentButton) return;
        const shouldShow = isReadingScreen();
        commentButton.style.display = shouldShow ? 'flex' : 'none';
    }

    // ═══════════════════════════════════════════════════════════════
    // BUTTON CREATION
    // ═══════════════════════════════════════════════════════════════

    function createButton() {
        if (commentButton) return;

        // Check admin toggle - default is OFF (feature hidden until enabled)
        if (localStorage.getItem('admin_commentButtonEnabled') === 'false') return;

        commentButton = document.createElement('button');
        commentButton.id = 'comment-bubble-button';
        commentButton.className = 'comment-bubble-button';
        commentButton.innerHTML = CHAT_ICON_SVG;
        commentButton.setAttribute('aria-label', 'Send a message');
        commentButton.addEventListener('click', openModal);

        document.body.appendChild(commentButton);
        updateButtonVisibility();
    }

    // ═══════════════════════════════════════════════════════════════
    // PASSAGE CAPTURE (simplified from share.js)
    // ═══════════════════════════════════════════════════════════════

    function getVisiblePassage() {
        // Use document-level selector to support main reader
        const paragraphs = document.querySelectorAll('.chapter-body p');
        if (paragraphs.length === 0) return '';

        const viewportTop = window.scrollY;
        const viewportBottom = viewportTop + window.innerHeight;

        for (const p of paragraphs) {
            const rect = p.getBoundingClientRect();
            const pTop = rect.top + window.scrollY;
            const pBottom = rect.bottom + window.scrollY;

            // Check if paragraph is in viewport
            if (pBottom > viewportTop && pTop < viewportBottom) {
                const text = p.textContent?.trim() || '';
                if (text && text.length > 10) {
                    return text.substring(0, MAX_MESSAGE_LENGTH);
                }
            }
        }

        return '';
    }

    function getChapterTitle() {
        // Try main reader DOM first
        const titleEl = document.getElementById('chapterTitle');
        if (titleEl?.textContent?.trim()) {
            return titleEl.textContent.trim();
        }
        // Fallback: derive from first visible paragraph's chapter-section
        const paragraphs = document.querySelectorAll('.chapter-body p');
        for (const p of paragraphs) {
            const rect = p.getBoundingClientRect();
            if (rect.bottom > 0 && rect.top < window.innerHeight) {
                const section = p.closest('.chapter-section');
                if (section) {
                    const header = section.querySelector('.chapter-title');
                    return header?.textContent?.trim() || '';
                }
            }
        }
        return '';
    }

    // ═══════════════════════════════════════════════════════════════
    // MODAL
    // ═══════════════════════════════════════════════════════════════

    function openModal() {
        if (modalOverlay) return;

        modalOverlay = document.createElement('div');
        modalOverlay.className = 'comment-modal-overlay';
        modalOverlay.innerHTML = `
            <div class="comment-modal">
                <button class="comment-modal-close" aria-label="Close">×</button>
                <form class="comment-form" id="commentForm">
                    <textarea id="commentMessage" placeholder="Message" required></textarea>
                    <button type="submit" class="comment-submit" id="commentSubmit">SEND</button>
                    <div class="comment-status" id="commentStatus"></div>
                </form>
            </div>
        `;

        document.body.appendChild(modalOverlay);

        // Event listeners
        modalOverlay.querySelector('.comment-modal-close').addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
        document.addEventListener('keydown', handleEscape);

        // Form submission
        document.getElementById('commentForm').addEventListener('submit', handleSubmit);

        // Clear 280-char error when user edits back under limit
        document.getElementById('commentMessage').addEventListener('input', function() {
            const statusEl = document.getElementById('commentStatus');
            if (statusEl.classList.contains('error') &&
                statusEl.textContent.includes('280') &&
                this.value.length <= 280) {
                statusEl.textContent = '';
                statusEl.className = 'comment-status';
            }
        });

        // Show with animation
        requestAnimationFrame(() => {
            modalOverlay.classList.add('visible');
            document.getElementById('commentMessage').focus();
        });
    }

    function closeModal() {
        if (!modalOverlay) return;

        // Blur any focused input before removing (fixes iOS viewport distortion)
        const activeEl = document.activeElement;
        if (activeEl && modalOverlay.contains(activeEl)) {
            activeEl.blur();
        }

        modalOverlay.classList.remove('visible');
        document.removeEventListener('keydown', handleEscape);

        setTimeout(() => {
            if (modalOverlay) {
                modalOverlay.remove();
                modalOverlay = null;
            }
            // Reset iOS visual viewport shift caused by keyboard
            // Known: visualViewport.width stays at 328 after keyboard dismissal on iOS.
            // Not visually affecting UI. Revisit if width-related layout bugs surface.
            window.scrollTo(0, window.scrollY);
            // Return focus to comment button
            if (commentButton) {
                commentButton.focus();
            }
        }, 200);
    }

    function handleEscape(e) {
        if (e.key === 'Escape') closeModal();
    }

    // ═══════════════════════════════════════════════════════════════
    // FORM SUBMISSION
    // ═══════════════════════════════════════════════════════════════

    async function handleSubmit(e) {
        e.preventDefault();

        const messageInput = document.getElementById('commentMessage');
        const submitBtn = document.getElementById('commentSubmit');
        const statusEl = document.getElementById('commentStatus');

        // Clear previous status
        statusEl.textContent = '';
        statusEl.className = 'comment-status';

        // Validate empty
        if (!messageInput.value.trim()) {
            statusEl.textContent = 'Message is required';
            statusEl.className = 'comment-status error';
            return;
        }

        // Validate length (280 char limit)
        if (messageInput.value.length > 280) {
            statusEl.textContent = 'Comment too long. 280 characters max.';
            statusEl.className = 'comment-status error';
            return;
        }

        // Rate limiting
        const now = Date.now();
        if (now - lastSubmitTime < RATE_LIMIT_MS) {
            const waitSeconds = Math.ceil((RATE_LIMIT_MS - (now - lastSubmitTime)) / 1000);
            statusEl.textContent = `Please wait ${waitSeconds} seconds before sending another message.`;
            statusEl.className = 'comment-status error';
            return;
        }

        // Build payload (mirrors hearts pattern from share.js)
        const payload = {
            action: 'comment',
            message: messageInput.value.trim(),
            passage: getVisiblePassage(),
            chapter: getChapterTitle(),
            timestamp: new Date().toISOString(),
            url: window.location.href
        };


        // Disable submit
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        statusEl.textContent = '';
        statusEl.className = 'comment-status';

        try {
            // Fire and forget — mirrors hearts pattern from share.js
            fetch(COMMENT_ENDPOINT, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain' },
                body: JSON.stringify(payload)
            });

            // With no-cors, we can't read the response, assume success
            lastSubmitTime = Date.now();
            statusEl.textContent = 'COMMENT SENT';
            statusEl.className = 'comment-status success';

            setTimeout(closeModal, 2000);

        } catch (error) {
            console.error('[Comments] Submit error:', error);
            statusEl.textContent = 'SEND FAILED — TRY AGAIN';
            statusEl.className = 'comment-status error';
            submitBtn.disabled = false;
            submitBtn.textContent = 'SEND';
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // CONSOLE ACCESS
    // ═══════════════════════════════════════════════════════════════

    window.openCommentModal = function() {
        // Temporarily bypass admin check for testing
        if (!modalOverlay) {
            openModal();
        }
    };

    // ═══════════════════════════════════════════════════════════════
    // INITIALIZATION
    // ═══════════════════════════════════════════════════════════════

    function init() {
        // Only initialize on reader pages
        if (!document.getElementById('chapterBody') && !document.getElementById('content')) {
            return;
        }

        createButton();

        // Listen for chapter changes
        window.addEventListener('chapterLoaded', updateButtonVisibility);
        window.addEventListener('hashchange', updateButtonVisibility);

        // Periodic check for visibility
        setInterval(updateButtonVisibility, 1000);

        console.log('[Comments] Initialized');
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
