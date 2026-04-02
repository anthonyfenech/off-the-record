/**
 * Share Feature - OFF-THE-RECORD
 * ===============================
 * Floating "O" button that captures visible text as a branded PNG
 * and offers share options (X/Twitter, Copy, Email, Native Share).
 */

(function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════
    // CONSTANTS
    // ═══════════════════════════════════════════════════════════════

    const BRAND_RED = '#cc0000';
    const CANVAS_WIDTH = 1080;
    const CANVAS_MIN_HEIGHT = 400;
    const CANVAS_MAX_HEIGHT = 1920;
    const CANVAS_PADDING = 120;
    const CANVAS_BG = '#1a1a1a';
    const CANVAS_TEXT_COLOR = '#f5f5f5';
    const CANVAS_FONT_SIZE = 36;
    const CANVAS_LINE_HEIGHT = 1.6;
    const WATERMARK_SIZE = 160;
    const WATERMARK_OPACITY = 0.15;

    // ═══════════════════════════════════════════════════════════════
    // STATE
    // ═══════════════════════════════════════════════════════════════

    let oButton = null;
    let overlay = null;
    let currentImageBlob = null;
    let currentImageDataUrl = null;
    let currentPreviewUrl = null;
    let currentTextExcerpt = '';
    let isProcessing = false;

    // Check if clipboard image copy is supported (not in Firefox)
    const canCopyImages = typeof ClipboardItem !== 'undefined';

    // ═══════════════════════════════════════════════════════════════
    // O BUTTON
    // ═══════════════════════════════════════════════════════════════

    function createOButton() {
        if (oButton) return;

        oButton = document.createElement('button');
        oButton.id = 'share-o-button';
        oButton.className = 'share-o-button';
        oButton.textContent = 'O';
        oButton.setAttribute('aria-label', 'Share this passage');
        oButton.addEventListener('click', handleOButtonClick);

        document.body.appendChild(oButton);
        updateOButtonVisibility();
    }

    function updateOButtonVisibility() {
        if (!oButton) return;

        const shouldShow = isReadingScreen();
        oButton.style.display = shouldShow ? 'flex' : 'none';
    }

    function isReadingScreen() {
        // Belt and suspenders: check both class and chapter ID

        // Check 1: Look for title-page or toc-page classes
        const chapterBody = document.getElementById('chapterBody');
        if (chapterBody) {
            const hasTitlePage = chapterBody.querySelector('.title-page');
            const hasTocPage = chapterBody.querySelector('.toc-page');
            if (hasTitlePage || hasTocPage) {
                return false;
            }
        }

        // Check 2: Check chapter ID from window.currentChapterId or reader
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

    function handleOButtonClick() {
        captureAndShowOverlay();
    }

    // ═══════════════════════════════════════════════════════════════
    // TEXT CAPTURE
    // ═══════════════════════════════════════════════════════════════

    function captureVisibleText() {
        const chapterBody = document.getElementById('chapterBody');
        if (!chapterBody) return [];

        const paragraphs = chapterBody.querySelectorAll('p');
        const viewportTop = window.scrollY;
        const viewportBottom = viewportTop + window.innerHeight;
        const isCleanRead = document.body.classList.contains('clean-read');

        const visibleContent = [];

        paragraphs.forEach(p => {
            const rect = p.getBoundingClientRect();
            const elementTop = rect.top + window.scrollY;
            const elementBottom = rect.bottom + window.scrollY;

            // Check if paragraph overlaps viewport
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                // Check if it's a scene break
                if (p.classList.contains('scene-break')) {
                    visibleContent.push({ type: 'scene-break' });
                    return;
                }

                // Extract text with italic tracking
                const textRuns = extractTextWithFormatting(p, isCleanRead);
                if (textRuns.length > 0) {
                    visibleContent.push({ type: 'paragraph', runs: textRuns });
                }
            }
        });

        return visibleContent;
    }

    function extractTextWithFormatting(element, excludeEmojis) {
        const runs = [];

        function processNode(node, isItalic) {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent;
                if (text.trim()) {
                    runs.push({ text: text, italic: isItalic });
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                // Skip emoji spans if in clean-read mode
                if (excludeEmojis && node.classList && node.classList.contains('media-emoji')) {
                    return;
                }

                // Check if emoji is hidden via computed style
                if (node.classList && node.classList.contains('media-emoji')) {
                    const style = window.getComputedStyle(node);
                    if (style.display === 'none') {
                        return;
                    }
                }

                // Check for italic elements
                const tagName = node.tagName.toLowerCase();
                const newIsItalic = isItalic || tagName === 'em' || tagName === 'i';

                // Process children
                node.childNodes.forEach(child => {
                    processNode(child, newIsItalic);
                });
            }
        }

        processNode(element, false);
        return runs;
    }

    // ═══════════════════════════════════════════════════════════════
    // CANVAS RENDERING
    // ═══════════════════════════════════════════════════════════════

    function renderToCanvas(content) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = CANVAS_WIDTH;

        // Calculate required height
        const maxTextWidth = CANVAS_WIDTH - (CANVAS_PADDING * 2);
        const lineHeight = CANVAS_FONT_SIZE * CANVAS_LINE_HEIGHT;

        // First pass: calculate total height needed AND cache wrapped lines
        let totalHeight = CANVAS_PADDING; // Top padding
        const wrappedContent = [];

        content.forEach((item, index) => {
            if (item.type === 'scene-break') {
                totalHeight += lineHeight * 2;
                wrappedContent.push({ type: 'scene-break' });
            } else if (item.type === 'paragraph') {
                const lines = wrapText(ctx, item.runs, maxTextWidth, CANVAS_FONT_SIZE);
                totalHeight += lines.length * lineHeight;
                wrappedContent.push({ type: 'paragraph', lines: lines });

                if (index < content.length - 1) {
                    totalHeight += 24;
                }
            }
        });

        totalHeight += CANVAS_PADDING;

        // Clamp height
        let finalHeight = Math.max(CANVAS_MIN_HEIGHT, Math.min(CANVAS_MAX_HEIGHT, totalHeight));
        canvas.height = finalHeight;

        // Fill background
        ctx.fillStyle = CANVAS_BG;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Render text using cached wrapped lines
        let y = CANVAS_PADDING + CANVAS_FONT_SIZE;
        const availableHeight = finalHeight - CANVAS_PADDING - 100;
        let truncated = false;

        for (let i = 0; i < wrappedContent.length && y < availableHeight; i++) {
            const item = wrappedContent[i];

            if (item.type === 'scene-break') {
                y += lineHeight * 0.5;

                ctx.font = `${CANVAS_FONT_SIZE}px "Literata", Georgia, serif`;
                ctx.fillStyle = CANVAS_TEXT_COLOR;
                ctx.textAlign = 'center';
                ctx.fillText('***', CANVAS_WIDTH / 2, y);
                ctx.textAlign = 'left';

                y += lineHeight * 1.5;
            } else if (item.type === 'paragraph') {
                for (const line of item.lines) {
                    if (y > availableHeight) {
                        truncated = true;
                        break;
                    }

                    let x = CANVAS_PADDING;

                    for (const segment of line) {
                        const fontStyle = segment.italic ? 'italic' : 'normal';
                        ctx.font = `${fontStyle} ${CANVAS_FONT_SIZE}px "Literata", Georgia, serif`;
                        ctx.fillStyle = CANVAS_TEXT_COLOR;
                        ctx.fillText(segment.text, x, y);
                        x += ctx.measureText(segment.text).width;
                    }

                    y += lineHeight;
                }

                if (i < wrappedContent.length - 1 && !truncated) {
                    y += 24;
                }
            }

            if (truncated) break;
        }

        if (truncated) {
            ctx.font = `${CANVAS_FONT_SIZE}px "Literata", Georgia, serif`;
            ctx.fillStyle = CANVAS_TEXT_COLOR;
            ctx.fillText('…', CANVAS_PADDING, availableHeight);
        }

        // Draw watermark
        ctx.font = `bold ${WATERMARK_SIZE}px "Courier New", monospace`;
        ctx.fillStyle = BRAND_RED;
        ctx.globalAlpha = WATERMARK_OPACITY;
        ctx.textAlign = 'right';
        ctx.fillText('O', CANVAS_WIDTH - 60, finalHeight - 60);
        ctx.globalAlpha = 1;
        ctx.textAlign = 'left';

        return canvas;
    }

    function wrapText(ctx, runs, maxWidth, fontSize) {
        const lines = [];
        let currentLine = [];
        let currentWidth = 0;

        // Flatten runs into words with formatting
        const words = [];
        runs.forEach(run => {
            const runWords = run.text.split(/(\s+)/);
            runWords.forEach(word => {
                if (word) {
                    words.push({ text: word, italic: run.italic });
                }
            });
        });

        for (const word of words) {
            const fontStyle = word.italic ? 'italic' : 'normal';
            ctx.font = `${fontStyle} ${fontSize}px "Literata", Georgia, serif`;
            const wordWidth = ctx.measureText(word.text).width;

            // Check if word fits on current line
            if (currentWidth + wordWidth <= maxWidth || currentLine.length === 0) {
                currentLine.push(word);
                currentWidth += wordWidth;
            } else {
                // Start new line
                if (currentLine.length > 0) {
                    lines.push(currentLine);
                }
                currentLine = [word];
                currentWidth = wordWidth;
            }
        }

        // Don't forget last line
        if (currentLine.length > 0) {
            lines.push(currentLine);
        }

        return lines;
    }

    // ═══════════════════════════════════════════════════════════════
    // SHARE OVERLAY
    // ═══════════════════════════════════════════════════════════════

    function createOverlay() {
        if (overlay) {
            overlay.remove();
        }

        overlay = document.createElement('div');
        overlay.id = 'share-overlay';
        overlay.className = 'share-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-label', 'Share passage');
        overlay.innerHTML = `
            <div class="share-modal">
                <button class="share-close" aria-label="Close share dialog">&times;</button>
                <div class="share-preview">
                    <img id="share-preview-img" alt="Preview of passage to share" />
                </div>
                <div class="share-actions" role="group" aria-label="Share options">
                    <button class="share-btn share-btn-x" data-action="twitter" aria-label="Share to X (Twitter)">
                        <span class="share-btn-text">Share to X</span>
                    </button>
                    <button class="share-btn share-btn-copy" data-action="copy" aria-label="${canCopyImages ? 'Copy image to clipboard' : 'Download image'}">
                        <span class="share-btn-text">${canCopyImages ? 'Copy Image' : 'Download Image'}</span>
                    </button>
                    <button class="share-btn share-btn-email" data-action="email" aria-label="Share via email">
                        <span class="share-btn-text">Email</span>
                    </button>
                    <button class="share-btn share-btn-native" data-action="native" style="display: none;" aria-label="Share using device share menu">
                        <span class="share-btn-text">Share</span>
                    </button>
                </div>
                <div class="share-toast" id="share-toast" role="status" aria-live="polite"></div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Check for native share support
        if (navigator.share && navigator.canShare) {
            const nativeBtn = overlay.querySelector('.share-btn-native');
            if (nativeBtn) {
                nativeBtn.style.display = 'flex';
            }
        }

        // Event listeners
        overlay.querySelector('.share-close').addEventListener('click', closeOverlay);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeOverlay();
        });

        overlay.querySelectorAll('.share-btn').forEach(btn => {
            btn.addEventListener('click', handleShareAction);
        });

        // Escape key and focus trap
        document.addEventListener('keydown', handleOverlayKeydown);

        // Set initial focus to close button
        requestAnimationFrame(() => {
            const closeBtn = overlay.querySelector('.share-close');
            if (closeBtn) closeBtn.focus();
        });
    }

    function handleOverlayKeydown(e) {
        if (!overlay) return;

        if (e.key === 'Escape') {
            closeOverlay();
            return;
        }

        // Focus trap
        if (e.key === 'Tab') {
            const focusableElements = overlay.querySelectorAll(
                'button:not([style*="display: none"]):not([disabled])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }

    function closeOverlay() {
        if (overlay) {
            overlay.classList.remove('visible');
            setTimeout(() => {
                if (overlay) {
                    overlay.remove();
                    overlay = null;
                }
            }, 300);
        }
        document.removeEventListener('keydown', handleOverlayKeydown);

        // Clean up object URL to prevent memory leak
        if (currentPreviewUrl) {
            URL.revokeObjectURL(currentPreviewUrl);
            currentPreviewUrl = null;
        }

        currentImageBlob = null;
        currentImageDataUrl = null;
        currentTextExcerpt = '';
        isProcessing = false;

        // Return focus to O button
        if (oButton) {
            oButton.focus();
        }
    }

    function showToast(message) {
        const toast = document.getElementById('share-toast');
        if (toast) {
            toast.textContent = message;
            toast.classList.add('visible');
            setTimeout(() => {
                toast.classList.remove('visible');
            }, 3000);
        }
    }

    async function handleShareAction(e) {
        const action = e.currentTarget.dataset.action;

        switch (action) {
            case 'twitter':
                await shareToTwitter();
                break;
            case 'copy':
                await copyImageToClipboard();
                break;
            case 'email':
                shareViaEmail();
                break;
            case 'native':
                await nativeShare();
                break;
        }
    }

    async function shareToTwitter() {
        // Copy image to clipboard first (or download on Firefox)
        const copied = await copyImageToClipboard(true);

        // Build tweet URL
        const excerpt = currentTextExcerpt.substring(0, 200);
        const tweetText = encodeURIComponent(`${excerpt}… — OFF-THE-RECORD`);
        const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

        window.open(tweetUrl, '_blank', 'noopener,noreferrer,width=550,height=420');

        if (copied && canCopyImages) {
            showToast('Image copied — paste into your tweet');
        } else if (copied) {
            showToast('Image downloaded — attach to your tweet');
        }
    }

    async function copyImageToClipboard(silent = false) {
        if (!currentImageBlob) {
            if (!silent) showToast('No image to copy');
            return false;
        }

        // Firefox fallback: download instead of copy
        if (!canCopyImages) {
            downloadImage();
            return true;
        }

        try {
            // Safari quirk: ClipboardItem needs a Promise for the blob
            const clipboardItem = new ClipboardItem({
                'image/png': Promise.resolve(currentImageBlob)
            });
            await navigator.clipboard.write([clipboardItem]);
            if (!silent) showToast('Image copied');
            return true;
        } catch (err) {
            console.error('Failed to copy image:', err);
            // Fallback to download on error
            if (!silent) {
                downloadImage();
            }
            return false;
        }
    }

    function downloadImage() {
        if (!currentImageDataUrl) {
            showToast('No image to download');
            return;
        }

        const link = document.createElement('a');
        link.href = currentImageDataUrl;
        link.download = 'off-the-record-excerpt.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast('Image downloaded');
    }

    function shareViaEmail() {
        const subject = encodeURIComponent('From OFF-THE-RECORD');
        const body = encodeURIComponent(currentTextExcerpt + '\n\n— OFF-THE-RECORD\nhttps://anthonyfenech.com/off-the-record/');
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }

    async function nativeShare() {
        if (!navigator.share || !currentImageBlob) return;

        try {
            const file = new File([currentImageBlob], 'off-the-record-excerpt.png', { type: 'image/png' });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    title: 'OFF-THE-RECORD',
                    text: currentTextExcerpt.substring(0, 200) + '…',
                    files: [file]
                });
            } else {
                // Fallback: share without file
                await navigator.share({
                    title: 'OFF-THE-RECORD',
                    text: currentTextExcerpt.substring(0, 200) + '…',
                    url: 'https://anthonyfenech.com/off-the-record/'
                });
            }
        } catch (err) {
            if (err.name !== 'AbortError') {
                console.error('Share failed:', err);
                showToast('Share failed');
            }
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // MAIN CAPTURE FLOW
    // ═══════════════════════════════════════════════════════════════

    function isModalOpen() {
        // Check for any conflicting modals that might be open
        const mediaModal = document.querySelector('.media-modal-overlay.active, .lightbox-overlay.active, .photo-modal-overlay.active');
        return !!mediaModal;
    }

    function captureAndShowOverlay() {
        // Debounce: ignore if already processing or overlay is open
        if (isProcessing || overlay) {
            return;
        }

        // Don't open share if another modal is active
        if (isModalOpen()) {
            return;
        }

        const content = captureVisibleText();

        if (content.length === 0) {
            console.warn('[Share] No visible text to capture');
            return;
        }

        isProcessing = true;

        // Show loading state on O button
        if (oButton) {
            oButton.classList.add('loading');
        }

        // Build plain text excerpt for email/tweet
        currentTextExcerpt = content.map(item => {
            if (item.type === 'scene-break') return '\n***\n';
            if (item.type === 'paragraph') {
                return item.runs.map(r => r.text).join('');
            }
            return '';
        }).join('\n\n').trim();

        // Render to canvas (use setTimeout to allow loading animation to start)
        setTimeout(() => {
            try {
                const canvas = renderToCanvas(content);

                // Store data URL for Firefox download fallback
                try {
                    currentImageDataUrl = canvas.toDataURL('image/png');
                } catch (err) {
                    console.error('[Share] Failed to get data URL:', err);
                }

                // Convert to blob
                canvas.toBlob(blob => {
                    // Remove loading state
                    if (oButton) {
                        oButton.classList.remove('loading');
                    }

                    if (!blob) {
                        console.error('[Share] Failed to create image blob');
                        isProcessing = false;
                        return;
                    }

                    currentImageBlob = blob;

                    // Create and show overlay
                    createOverlay();

                    // Set preview image with tracked URL for cleanup
                    const previewImg = document.getElementById('share-preview-img');
                    if (previewImg) {
                        currentPreviewUrl = URL.createObjectURL(blob);
                        previewImg.src = currentPreviewUrl;
                    }

                    // Show overlay with animation
                    requestAnimationFrame(() => {
                        if (overlay) {
                            overlay.classList.add('visible');
                        }
                    });
                }, 'image/png');
            } catch (err) {
                console.error('[Share] Canvas rendering failed:', err);
                if (oButton) {
                    oButton.classList.remove('loading');
                }
                isProcessing = false;
            }
        }, 50);
    }

    // ═══════════════════════════════════════════════════════════════
    // INITIALIZATION
    // ═══════════════════════════════════════════════════════════════

    function init() {
        // Only initialize on main reader page (index.html)
        if (!document.getElementById('chapterBody')) {
            return;
        }

        createOButton();

        // Listen for chapter changes
        window.addEventListener('chapterLoaded', updateOButtonVisibility);
        window.addEventListener('hashchange', updateOButtonVisibility);

        // Periodic check for visibility (in case of dynamic content)
        setInterval(updateOButtonVisibility, 1000);

        console.log('[Share] Initialized');
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
