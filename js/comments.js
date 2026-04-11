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

    const MAX_MESSAGE_LENGTH = 500;
    const RATE_LIMIT_MS = 30000; // 30 seconds between submissions

    // Chat bubble SVG icon (filled, uses currentColor for auto light/dark)
    const CHAT_ICON_SVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
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
        if (localStorage.getItem('admin_commentButtonEnabled') !== 'true') return;

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
                <button class="comment-modal-close" aria-label="Close">&times;</button>
                <h2 class="comment-modal-title">QUESTIONS? COMMENTS? CONCERNS?</h2>
                <form class="comment-form" id="commentForm">
                    <div class="comment-field">
                        <textarea id="commentMessage" placeholder="Message" required maxlength="${MAX_MESSAGE_LENGTH}"></textarea>
                        <div class="comment-char-counter"><span id="charCount">0</span>/${MAX_MESSAGE_LENGTH}</div>
                        <span class="comment-error"></span>
                    </div>
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

        // Character counter
        const messageInput = document.getElementById('commentMessage');
        const charCount = document.getElementById('charCount');
        messageInput.addEventListener('input', () => {
            charCount.textContent = messageInput.value.length;
        });

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

        modalOverlay.classList.remove('visible');
        document.removeEventListener('keydown', handleEscape);

        setTimeout(() => {
            if (modalOverlay) {
                modalOverlay.remove();
                modalOverlay = null;
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

        // Clear previous errors
        clearErrors();

        // Validate
        if (!messageInput.value.trim()) {
            showFieldError(messageInput, 'Message is required');
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

    function showFieldError(input, message) {
        const field = input.closest('.comment-field');
        const errorEl = field.querySelector('.comment-error');
        errorEl.textContent = message;
        input.classList.add('error');
    }

    function clearErrors() {
        const errors = document.querySelectorAll('.comment-error');
        errors.forEach(el => el.textContent = '');
        const inputs = document.querySelectorAll('.comment-form input, .comment-form textarea');
        inputs.forEach(el => el.classList.remove('error'));
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
