/**
 * ShareCore - Extracted share.js rendering logic for stress testing
 * DO NOT use in production - this is for testing only
 */
const ShareCore = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════
    // CONSTANTS (from share.js lines 14-25)
    // ═══════════════════════════════════════════════════════════════

    const BRAND_RED = '#cc0000';
    const CANVAS_WIDTH = 1080;
    const CANVAS_MIN_HEIGHT = 400;
    const CANVAS_MAX_HEIGHT = 1920;
    const CANVAS_PADDING = 120;
    const CANVAS_FONT_SIZE = 42;
    const CANVAS_LINE_HEIGHT = 1.6;
    const CANVAS_TITLE_SIZE = 48;
    const WATERMARK_SIZE = 160;

    // Theme colors (from share.js lines 27-38)
    const THEME_COLORS = {
        light: {
            bg: '#fafafa',
            text: '#1a1a1a',
            watermarkOpacity: 0.18
        },
        dark: {
            bg: '#1a1a1a',
            text: '#f5f5f5',
            watermarkOpacity: 0.22
        }
    };

    // State
    let currentTheme = 'dark';
    let fontFamily = 'Georgia'; // Use fallback for testing (no async font loading)

    // ═══════════════════════════════════════════════════════════════
    // THEME
    // ═══════════════════════════════════════════════════════════════

    function setTheme(theme) {
        currentTheme = theme;
    }

    function getThemeColors() {
        return THEME_COLORS[currentTheme] || THEME_COLORS.dark;
    }

    // ═══════════════════════════════════════════════════════════════
    // DATELINE YEAR APPEND (from share.js lines 367-400)
    // ═══════════════════════════════════════════════════════════════

    function appendYearToDatelines(text, year) {
        if (!year || typeof year !== 'number') return text;

        const datelineRegex = /(January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\s+(\d{1,2})(\u2014)/g;

        return text.replace(datelineRegex, (match, month, day, emDash, offset) => {
            const beforeEmDash = match.slice(0, -1);
            if (/\d{4}/.test(beforeEmDash)) {
                return match;
            }

            const isAtStart = offset === 0;
            const textBefore = text.slice(Math.max(0, offset - 50), offset);
            const hasCityPrefix = /[A-Z]{2,}(?:[',.\s]+[A-Z]{2,})*,\s*$/.test(textBefore);

            if (!isAtStart && !hasCityPrefix) {
                return match;
            }

            return `${month} ${day}, ${year}${emDash}`;
        });
    }

    // ═══════════════════════════════════════════════════════════════
    // TWO-STAGE DATELINE PROCESSING (from share.js lines 447-489)
    // ═══════════════════════════════════════════════════════════════

    function processDatelines(content, year) {
        if (!year || typeof year !== 'number') return content;

        const monthDayEndPattern = /(January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\s+(\d{1,2})\s*$/;

        // Stage 1: Handle split datelines (where <em> separates date from em-dash)
        content = content.map(item => {
            if (item.type === 'paragraph') {
                const runs = item.runs.map((run, i, arr) => {
                    const match = run.text.match(monthDayEndPattern);
                    if (!match) return run;

                    let nextRun = null;
                    for (let j = i + 1; j < arr.length; j++) {
                        if (arr[j].text.trim()) {
                            nextRun = arr[j];
                            break;
                        }
                    }

                    if (!nextRun || !nextRun.text.startsWith('\u2014')) return run;
                    if (/\d{4}/.test(run.text)) return run;

                    return { ...run, text: run.text.trimEnd() + ', ' + year };
                });
                return { ...item, runs };
            }
            return item;
        });

        // Stage 2: Handle non-split datelines
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

        return content;
    }

    // ═══════════════════════════════════════════════════════════════
    // TEXT WRAPPING (from share.js lines 576-618)
    // ═══════════════════════════════════════════════════════════════

    function wrapText(ctx, runs, maxWidth, fontSize) {
        const lines = [];
        let currentLine = [];
        let currentWidth = 0;

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

            if (currentWidth + wordWidth <= maxWidth || currentLine.length === 0) {
                currentLine.push(word);
                currentWidth += wordWidth;
            } else {
                if (currentLine.length > 0) {
                    lines.push(currentLine);
                }
                currentLine = [word];
                currentWidth = wordWidth;
            }
        }

        if (currentLine.length > 0) {
            lines.push(currentLine);
        }

        return lines;
    }

    // ═══════════════════════════════════════════════════════════════
    // CANVAS RENDERING (adapted from share.js lines 406-574)
    // ═══════════════════════════════════════════════════════════════

    function renderToCanvas(content, chapterInfo = {}) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const colors = getThemeColors();

        canvas.width = CANVAS_WIDTH;

        const maxTextWidth = CANVAS_WIDTH - (CANVAS_PADDING * 2);
        const lineHeight = CANVAS_FONT_SIZE * CANVAS_LINE_HEIGHT;

        const { title, showTitle, year } = chapterInfo;
        const titleHeight = showTitle && title ? CANVAS_TITLE_SIZE + 40 : 0;

        // First pass: calculate height and cache wrapped lines
        let totalHeight = CANVAS_PADDING + titleHeight;
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

        let finalHeight = Math.max(CANVAS_MIN_HEIGHT, Math.min(CANVAS_MAX_HEIGHT, totalHeight));
        canvas.height = finalHeight;

        // Fill background
        ctx.fillStyle = colors.bg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw chapter title if near top
        let y = CANVAS_PADDING;
        if (showTitle && title) {
            ctx.font = `bold ${CANVAS_TITLE_SIZE}px "Courier New", monospace`;
            ctx.fillStyle = colors.text;
            ctx.textAlign = 'center';
            ctx.fillText(title.toUpperCase(), CANVAS_WIDTH / 2, y + CANVAS_TITLE_SIZE);
            ctx.textAlign = 'left';
            y += CANVAS_TITLE_SIZE + 40;
        }

        // Render text
        y += CANVAS_FONT_SIZE;
        const availableHeight = finalHeight - CANVAS_PADDING - 100;
        let truncated = false;

        for (let i = 0; i < wrappedContent.length && y < availableHeight; i++) {
            const item = wrappedContent[i];

            if (item.type === 'scene-break') {
                y += lineHeight * 0.5;
                ctx.font = `${CANVAS_FONT_SIZE}px "${fontFamily}", Georgia, serif`;
                ctx.fillStyle = colors.text;
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
                        ctx.fillStyle = colors.text;
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
            ctx.fillStyle = colors.text;
            ctx.fillText('…', CANVAS_PADDING, availableHeight);
        }

        // Draw watermark
        ctx.font = `bold ${WATERMARK_SIZE}px "Courier New", monospace`;
        ctx.fillStyle = BRAND_RED;
        ctx.globalAlpha = colors.watermarkOpacity;
        ctx.textAlign = 'right';
        ctx.fillText('O', CANVAS_WIDTH - 60, finalHeight - 60);
        ctx.globalAlpha = 1;
        ctx.textAlign = 'left';

        return canvas;
    }

    // ═══════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════

    return {
        setTheme,
        getThemeColors,
        appendYearToDatelines,
        processDatelines,
        wrapText,
        renderToCanvas
    };
})();
