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
    const CANVAS_FONT_SIZE = 42;
    const CANVAS_LINE_HEIGHT = 1.6;
    const CANVAS_TITLE_SIZE = 48;
    const WATERMARK_SIZE = 160;
    const WATERMARK_OPACITY = 0.22;

    // Font loading
    const FONT_FAMILY = 'Literata';
    const FONT_FALLBACK = 'Georgia';
    let fontLoaded = false;
    let fontFamily = FONT_FAMILY;

    async function ensureFontLoaded() {
        if (fontLoaded) return;

        try {
            // Try to load Literata at the canvas size
            const fontSpec = `${CANVAS_FONT_SIZE}px "${FONT_FAMILY}"`;
            const loadPromise = document.fonts.load(fontSpec);
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Font load timeout')), 2000)
            );

            const loadedFonts = await Promise.race([loadPromise, timeoutPromise]);

            // Check if font actually loaded (empty array means it resolved without loading)
            if (!loadedFonts || loadedFonts.length === 0) {
                // Double-check with fonts.check()
                if (!document.fonts.check(fontSpec)) {
                    console.warn('[Share] Literata not available, falling back to Georgia');
                    fontFamily = FONT_FALLBACK;
                }
            }

            fontLoaded = true;
        } catch (err) {
            console.warn('[Share] Font load failed, using fallback:', err.message);
            fontFamily = FONT_FALLBACK;
            fontLoaded = true;
        }
    }

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
    // FIX 4: SMART FIRST-PARAGRAPH CAPTURE
    // ═══════════════════════════════════════════════════════════════

    function applySmartFirstParagraph(content) {
        if (content.length < 2) return content;

        // Find the first paragraph item (skip scene breaks)
        let firstParagraphIndex = -1;
        for (let i = 0; i < content.length; i++) {
            if (content[i].type === 'paragraph') {
                firstParagraphIndex = i;
                break;
            }
        }

        if (firstParagraphIndex === -1) return content;

        const firstItem = content[firstParagraphIndex];

        // If the paragraph has a dateline or is a scene break, keep it
        if (firstItem.hasDateline || firstItem.isSceneBreak) {
            return content;
        }

        // Get the DOM element for the first captured paragraph
        const chapterBody = document.getElementById('chapterBody');
        if (!chapterBody) return content;

        const paragraphs = chapterBody.querySelectorAll('p');
        const viewportTop = window.scrollY;

        // Find the actual first visible paragraph in DOM
        let firstVisibleParagraph = null;
        for (const p of paragraphs) {
            const rect = p.getBoundingClientRect();
            const elementBottom = rect.bottom + window.scrollY;
            if (elementBottom > viewportTop) {
                firstVisibleParagraph = p;
                break;
            }
        }

        if (!firstVisibleParagraph) return content;

        // Check if has-dateline or scene-break class
        if (firstVisibleParagraph.classList.contains('has-dateline') ||
            firstVisibleParagraph.classList.contains('scene-break')) {
            return content;
        }

        // Get previous sibling <p> within #chapterBody
        let prevSibling = firstVisibleParagraph.previousElementSibling;
        while (prevSibling && prevSibling.tagName !== 'P') {
            prevSibling = prevSibling.previousElementSibling;
        }

        // If no previous <p> sibling in #chapterBody, it's the first paragraph - keep it
        if (!prevSibling) return content;

        // Check if previous sibling is in viewport
        const prevRect = prevSibling.getBoundingClientRect();
        const prevBottom = prevRect.bottom + window.scrollY;
        const viewportBottom = viewportTop + window.innerHeight;

        // If previous sibling is NOT in viewport, the first captured is mid-thought - skip it
        if (prevBottom <= viewportTop || prevRect.top + window.scrollY >= viewportBottom) {
            // Skip the first paragraph
            return content.slice(1);
        }

        return content;
    }

    // ═══════════════════════════════════════════════════════════════
    // FIX 6 & 7: CHAPTER INFO FOR TITLE AND YEAR
    // ═══════════════════════════════════════════════════════════════

    function getCurrentChapterInfo() {
        const info = {
            title: null,
            year: null,
            showTitle: false
        };

        // Get chapter title from DOM
        const titleEl = document.getElementById('chapterTitle');
        if (titleEl) {
            info.title = titleEl.textContent.trim();
        }

        // Check if near top of chapter (Fix 6)
        const chapterBody = document.getElementById('chapterBody');
        if (chapterBody) {
            const rect = chapterBody.getBoundingClientRect();
            info.showTitle = rect.top > -window.innerHeight;
        }

        // Get year from CHAPTERS array
        const currentId = window.currentChapterId;
        if (typeof currentId === 'number' && currentId > 0 && window.CHAPTERS) {
            // CHAPTERS array: index 0 = title page (id -1), index 1 = TOC (id 0), index 2+ = chapters
            // Find the chapter with matching id
            for (const chapter of window.CHAPTERS) {
                if (chapter.id === currentId) {
                    info.year = chapter.year;
                    break;
                }
            }
        }

        return info;
    }

    // ═══════════════════════════════════════════════════════════════
    // FIX 7: DATELINE YEAR APPEND
    // ═══════════════════════════════════════════════════════════════

    function appendYearToDatelines(text, year) {
        if (!year || typeof year !== 'number') return text;

        // Regex to match: Month + space + day number + em dash
        // Must have month name (not time-only like "10:32 A.M.—")
        const datelineRegex = /(January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\s+(\d{1,2})(\u2014)/g;

        return text.replace(datelineRegex, (match, month, day, emDash) => {
            // Check if there's already a year (4 digits) before the em dash
            // This is a safety check - shouldn't happen but just in case
            const beforeEmDash = match.slice(0, -1); // Remove em dash
            if (/\d{4}/.test(beforeEmDash)) {
                return match; // Already has year, don't modify
            }

            return `${month} ${day}, ${year}${emDash}`;
        });
    }

    // ═══════════════════════════════════════════════════════════════
    // CANVAS RENDERING
    // ═══════════════════════════════════════════════════════════════

    function renderToCanvas(content, chapterInfo = {}) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = CANVAS_WIDTH;

        // Calculate required height
        const maxTextWidth = CANVAS_WIDTH - (CANVAS_PADDING * 2);
        const lineHeight = CANVAS_FONT_SIZE * CANVAS_LINE_HEIGHT;

        // Fix 7: Transform content to append year to datelines
        const { year } = chapterInfo;
        if (year) {
            content = content.map(item => {
                if (item.type === 'paragraph') {
                    return {
                        ...item,
                        runs: item.runs.map(run => ({
                            ...run,
                            text: appendYearToDatelines(run.text, year)
                        }))
                    };
                }
                return item;
            });
        }

        // Fix 6: Check if we should show chapter title
        const { title, showTitle } = chapterInfo;
        const titleHeight = showTitle && title ? CANVAS_TITLE_SIZE + 40 : 0;

        // First pass: calculate total height needed AND cache wrapped lines
        let totalHeight = CANVAS_PADDING + titleHeight; // Top padding + optional title
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

        // Fix 6: Draw chapter title if near top
        let y = CANVAS_PADDING;
        if (showTitle && title) {
            ctx.font = `bold ${CANVAS_TITLE_SIZE}px "Courier New", monospace`;
            ctx.fillStyle = CANVAS_TEXT_COLOR;
            ctx.textAlign = 'center';
            ctx.fillText(title.toUpperCase(), CANVAS_WIDTH / 2, y + CANVAS_TITLE_SIZE);
            ctx.textAlign = 'left';
            y += CANVAS_TITLE_SIZE + 40; // Title height + spacing
        }

        // Render text using cached wrapped lines
        y += CANVAS_FONT_SIZE;
        const availableHeight = finalHeight - CANVAS_PADDING - 100;
        let truncated = false;

        for (let i = 0; i < wrappedContent.length && y < availableHeight; i++) {
            const item = wrappedContent[i];

            if (item.type === 'scene-break') {
                y += lineHeight * 0.5;

                ctx.font = `${CANVAS_FONT_SIZE}px "${fontFamily}", Georgia, serif`;
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
                        ctx.font = `${fontStyle} ${CANVAS_FONT_SIZE}px "${fontFamily}", Georgia, serif`;
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
            ctx.font = `${CANVAS_FONT_SIZE}px "${fontFamily}", Georgia, serif`;
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
            ctx.font = `${fontStyle} ${fontSize}px "${fontFamily}", Georgia, serif`;
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

    // SVG Icons (inline, minimal, white stroke)
    const ICONS = {
        x: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4l16 16M4 20L20 4"/></svg>',
        email: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6L12 13 2 6"/></svg>',
        copy: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>',
        download: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>',
        share: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>',
        close: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>'
    };

    function createOverlay(isOnline = true) {
        if (overlay) {
            overlay.remove();
        }

        overlay = document.createElement('div');
        overlay.id = 'share-overlay';
        overlay.className = 'share-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-label', 'Share passage');

        // Fix 5: Offline detection - show only Copy button when offline
        const offlineMessage = !isOnline ? '<div class="share-offline-msg">More sharing options available online</div>' : '';

        overlay.innerHTML = `
            <div class="share-modal">
                <button class="share-close" aria-label="Close share dialog">${ICONS.close}</button>
                <div class="share-preview">
                    <img id="share-preview-img" alt="Preview of passage to share" />
                </div>
                <div class="share-actions" role="group" aria-label="Share options">
                    <button class="share-btn share-btn-twitter" data-action="twitter" aria-label="Share to X"${!isOnline ? ' style="display:none"' : ''}>${ICONS.x}</button>
                    <button class="share-btn share-btn-email" data-action="email" aria-label="Email"${!isOnline ? ' style="display:none"' : ''}>${ICONS.email}</button>
                    <button class="share-btn" data-action="copy" aria-label="${canCopyImages ? 'Copy' : 'Save'}">${canCopyImages ? ICONS.copy : ICONS.download}</button>
                    <button class="share-btn share-btn-native" data-action="native" aria-label="Share"${!isOnline ? ' style="display:none"' : ''}>${ICONS.share}</button>
                </div>
                ${offlineMessage}
                <div class="share-toast" id="share-toast" role="status" aria-live="polite"></div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Check for native share support - hide if unavailable
        if (!navigator.share || !navigator.canShare) {
            const nativeBtn = overlay.querySelector('.share-btn-native');
            if (nativeBtn) {
                nativeBtn.style.display = 'none';
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

    async function captureAndShowOverlay() {
        // Debounce: ignore if already processing or overlay is open
        if (isProcessing || overlay) {
            return;
        }

        // Don't open share if another modal is active
        if (isModalOpen()) {
            return;
        }

        let content = captureVisibleText();

        if (content.length === 0) {
            console.warn('[Share] No visible text to capture');
            return;
        }

        isProcessing = true;

        // Show loading state on O button
        if (oButton) {
            oButton.classList.add('loading');
        }

        // Fix 4: Smart first-paragraph capture
        content = applySmartFirstParagraph(content);

        // Get current chapter info for title and year
        const chapterInfo = getCurrentChapterInfo();

        // Build plain text excerpt for email/tweet
        currentTextExcerpt = content.map(item => {
            if (item.type === 'scene-break') return '\n***\n';
            if (item.type === 'paragraph') {
                return item.runs.map(r => r.text).join('');
            }
            return '';
        }).join('\n\n').trim();

        // Ensure font is loaded before rendering
        await ensureFontLoaded();

        // Render to canvas (use setTimeout to allow loading animation to start)
        setTimeout(() => {
            try {
                const canvas = renderToCanvas(content, chapterInfo);

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

                    // Create and show overlay (Fix 5: pass offline state)
                    createOverlay(navigator.onLine);

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
