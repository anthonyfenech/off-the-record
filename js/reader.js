// Reader - Core reading interface logic

import { CHAPTERS, calculateReadingTime } from '../data/chapters.js';
import { getProgress, saveProgress, markChapterComplete, isChapterComplete } from './storage.js';
import { mediaModal } from './mediaModal.js';

class Reader {
    constructor() {
        this.currentChapter = 1;
        this.scrollPosition = 0;
        this.autoSaveInterval = null;
        this.scrollThreshold = 0.9; // 90% scroll = chapter complete

        // DOM elements
        this.chapterTitle = document.getElementById('chapterTitle');
        this.chapterSubtitle = document.getElementById('chapterSubtitle');
        this.chapterMeta = document.getElementById('chapterMeta');
        this.chapterBody = document.getElementById('chapterBody');
        this.progressFill = document.getElementById('progressFill');
        this.headerProgress = document.getElementById('headerProgress');
        this.continueReading = document.getElementById('continueReading');
        this.continueChapter = document.getElementById('continueChapter');

        // Throttle scroll handler
        this.handleScroll = this.throttle(this.onScroll.bind(this), 100);
    }

    // Initialize reader
    init() {
        // Initialize media modal
        mediaModal.init();

        // Load saved progress
        const progress = getProgress();
        this.currentChapter = progress.currentChapter || 1;
        this.scrollPosition = progress.scrollPosition || 0;

        // Check if we should show home page or a chapter
        const hashChapter = this.getChapterFromHash();
        const isHomePage = !window.location.hash || window.location.hash === '#' || window.location.hash === '#home';

        if (isHomePage) {
            // Show home page
            this.showHomePage();
            // Show continue reading if user has progress
            if (progress.lastUpdated && progress.currentChapter >= 1) {
                this.showContinueReading(progress.currentChapter);
            }
        } else if (hashChapter) {
            this.currentChapter = hashChapter;
            this.loadChapter(this.currentChapter);
            this.hideContinueReading();
        } else {
            // Invalid hash, show home
            this.showHomePage();
        }

        // Set up scroll listener
        window.addEventListener('scroll', this.handleScroll);

        // Listen for hash changes
        window.addEventListener('hashchange', () => this.handleHashChange());

        // Start auto-save
        this.startAutoSave();
    }

    // Handle hash changes (for back/forward navigation)
    handleHashChange() {
        const hashChapter = this.getChapterFromHash();
        const isHomePage = !window.location.hash || window.location.hash === '#' || window.location.hash === '#home';

        if (isHomePage) {
            this.showHomePage();
        } else if (hashChapter) {
            this.loadChapter(hashChapter);
        }
    }

    // Show the home page
    showHomePage() {
        this.chapterTitle.textContent = 'OFF-THE-RECORD';
        this.chapterSubtitle.textContent = 'A Baseball Memoir';
        this.chapterMeta.textContent = '15 years covering the Detroit Tigers';

        this.chapterBody.innerHTML = `
            <div class="home-content">
                <p class="home-intro">Welcome to <strong>OFF-THE-RECORD</strong>, a memoir about covering Major League Baseball for the Detroit Free Press.</p>

                <p class="home-description">This is the story of fifteen seasons on the Tigers beat—the clubhouse drama, the late-night deadlines, the sources, the scoops, and everything they never taught you in journalism school.</p>

                <div class="home-cta">
                    <button class="start-reading-btn" id="startReadingBtn">Start Reading</button>
                </div>
            </div>
        `;

        // Add click handler for start reading button
        const startBtn = document.getElementById('startReadingBtn');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.loadChapter(1);
                this.hideContinueReading();
            });
        }

        // Update progress bar to 0
        this.progressFill.style.width = '0%';
        const progressText = document.querySelector('.progress-text');
        if (progressText) {
            progressText.textContent = '';
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'instant' });

        // Dispatch event
        window.dispatchEvent(new CustomEvent('homePageLoaded'));
    }

    // Load a specific chapter
    loadChapter(chapterId) {
        const chapter = CHAPTERS.find(c => c.id === chapterId);

        if (!chapter) {
            this.showError(`Chapter ${chapterId} not found`);
            return;
        }

        this.currentChapter = chapterId;

        // Update DOM
        this.chapterTitle.textContent = chapter.title;
        this.chapterSubtitle.textContent = chapter.subtitle;

        // Display reading time
        const readTime = calculateReadingTime(chapter.wordCount);
        this.chapterMeta.textContent = `${readTime} min read`;

        // Convert content to paragraphs with scene break support
        const paragraphs = chapter.content
            .split('\n\n')
            .filter(p => p.trim())
            .map(p => {
                const trimmed = p.trim();
                // Check for scene breaks
                if (trimmed === '---' || trimmed === '***' || trimmed === '* * *') {
                    return '<div class="scene-break"><span>* * *</span></div>';
                }
                return `<p>${trimmed}</p>`;
            })
            .join('');

        this.chapterBody.innerHTML = paragraphs;

        // Attach click handlers to media emojis
        this.attachMediaEmojiHandlers();

        // Update URL hash
        this.updateHash(chapterId);

        // Restore scroll position or scroll to top
        requestAnimationFrame(() => {
            if (this.scrollPosition > 0 && chapterId === getProgress().currentChapter) {
                window.scrollTo({ top: this.scrollPosition, behavior: 'instant' });
            } else {
                window.scrollTo({ top: 0, behavior: 'instant' });
            }

            // Update progress indicators after scroll
            setTimeout(() => this.updateProgressIndicators(), 100);
        });

        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('chapterLoaded', {
            detail: { chapterId, chapter }
        }));
    }

    // Attach click handlers to media emojis
    attachMediaEmojiHandlers() {
        const mediaEmojis = this.chapterBody.querySelectorAll('.media-emoji');

        mediaEmojis.forEach(emoji => {
            emoji.addEventListener('click', (e) => {
                e.preventDefault();
                const mediaId = emoji.getAttribute('data-media-id');
                if (mediaId) {
                    mediaModal.open(mediaId);
                }
            });
        });
    }

    // Handle scroll events
    onScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

        // Update progress bar
        this.progressFill.style.width = `${scrollPercent * 100}%`;

        // Mark chapter as complete if scrolled to bottom
        if (scrollPercent >= this.scrollThreshold && !isChapterComplete(this.currentChapter)) {
            markChapterComplete(this.currentChapter);
            window.dispatchEvent(new CustomEvent('chapterCompleted', {
                detail: { chapterId: this.currentChapter }
            }));
        }

        // Store current scroll position
        this.scrollPosition = scrollTop;
    }

    // Update progress indicators
    updateProgressIndicators() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

        // Update header progress
        const progressText = document.querySelector('.progress-text');
        if (progressText) {
            progressText.textContent = `${Math.round(scrollPercent)}%`;
        }

        // Update progress bar
        this.progressFill.style.width = `${scrollPercent}%`;
    }

    // Auto-save progress
    startAutoSave() {
        // Save every 2 seconds
        this.autoSaveInterval = setInterval(() => {
            this.saveCurrentProgress();
        }, 2000);
    }

    // Save current reading progress
    saveCurrentProgress() {
        const completionPercentage = this.calculateBookProgress();
        saveProgress(this.currentChapter, this.scrollPosition, completionPercentage);
    }

    // Calculate overall book progress
    calculateBookProgress() {
        // Simple calculation: (completed chapters / total chapters) * 100
        const completed = CHAPTERS.filter(c => isChapterComplete(c.id)).length;
        return Math.round((completed / CHAPTERS.length) * 100);
    }

    // Get chapter ID from URL hash
    getChapterFromHash() {
        const hash = window.location.hash.replace('#chapter-', '');
        const chapterId = parseInt(hash);
        return chapterId && chapterId >= 1 && chapterId <= CHAPTERS.length ? chapterId : null;
    }

    // Update URL hash
    updateHash(chapterId) {
        const newHash = `#chapter-${chapterId}`;
        if (window.location.hash !== newHash) {
            history.pushState(null, null, newHash);
        }
    }

    // Show error message
    showError(message) {
        this.chapterBody.innerHTML = `<div class="error">${message}</div>`;
    }

    // Utility: Throttle function
    throttle(func, wait) {
        let timeout = null;
        let previous = 0;

        return function(...args) {
            const now = Date.now();
            const remaining = wait - (now - previous);

            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                func.apply(this, args);
            } else if (!timeout) {
                timeout = setTimeout(() => {
                    previous = Date.now();
                    timeout = null;
                    func.apply(this, args);
                }, remaining);
            }
        };
    }

    // Show continue reading button
    showContinueReading(chapterId) {
        const chapter = CHAPTERS.find(c => c.id === chapterId);
        if (!chapter || !this.continueReading) return;

        this.continueChapter.textContent = chapter.title;
        this.continueReading.style.display = 'block';

        // Click handler
        this.continueReading.addEventListener('click', () => {
            this.loadChapter(chapterId);
            this.hideContinueReading();
        }, { once: true });
    }

    // Hide continue reading button
    hideContinueReading() {
        if (this.continueReading) {
            this.continueReading.style.display = 'none';
        }
    }

    // Clean up
    destroy() {
        window.removeEventListener('scroll', this.handleScroll);
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
        }
        this.saveCurrentProgress(); // Final save
    }
}

// Export single instance
export const reader = new Reader();
