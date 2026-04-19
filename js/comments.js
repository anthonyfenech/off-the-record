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

    const COMMENT_ENDPOINT = 'PLACEHOLDER_APPS_SCRIPT_URL';
    // TODO: Replace with actual Google Apps Script web app URL

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
        // Check 1: Look for title-page or toc-page classes
        const chapterBody = document.getElementById('chapterBody');
        if (chapterBody) {
            const hasTitlePage = chapterBody.querySelector('.title-page');
            const hasTocPage = chapterBody.querySelector('.toc-page');
            if (hasTitlePage || hasTocPage) {
                return false;
            }
        }

        // Check 2: Check chapter ID from window.currentChapterId
        const currentChapterId = window.currentChapterId;
        if (currentChapterId === -1 || currentChapterId === 0 ||
            currentChapterId === '-1' || currentChapterId === '0') {
            return false;
        }

        // Check 3: Verify we have actual content
        if (!chapterBody || chapterBody.children.length === 0) {
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
        const chapterBody = document.getElementById('chapterBody');
        if (!chapterBody) return '';

        const paragraphs = chapterBody.querySelectorAll('p');
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
        const titleEl = document.getElementById('chapterTitle');
        return titleEl?.textContent?.trim() || '';
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
                <button class="comment-modal-close" aria-label="Close"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
                <form class="comment-form" id="commentForm">
                    <textarea id="commentMessage" placeholder="Message" required maxlength="${MAX_MESSAGE_LENGTH}"></textarea>
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

        // Validate
        if (!messageInput.value.trim()) {
            statusEl.textContent = 'Message is required';
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

        // Build payload
        const payload = {
            type: 'comment',
            message: messageInput.value.trim(),
            passage: getVisiblePassage(),
            chapter: getChapterTitle(),
            timestamp: new Date().toISOString(),
            url: window.location.href
        };

        // Check if endpoint is placeholder
        if (COMMENT_ENDPOINT.includes('PLACEHOLDER')) {
            console.log('[Comments] Payload:', payload);
            statusEl.textContent = 'Comment feature coming soon!';
            statusEl.className = 'comment-status info';
            return;
        }

        // Disable submit
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        statusEl.textContent = '';
        statusEl.className = 'comment-status';

        try {
            const response = await fetch(COMMENT_ENDPOINT, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            // With no-cors, we can't read the response, assume success
            lastSubmitTime = Date.now();
            statusEl.textContent = 'Sent!';
            statusEl.className = 'comment-status success';

            setTimeout(closeModal, 2000);

        } catch (error) {
            console.error('[Comments] Submit error:', error);
            statusEl.textContent = 'Something went wrong. Try again.';
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
        if (!document.getElementById('chapterBody')) {
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
