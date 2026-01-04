// Reader - Core reading interface logic with pagination

import { CHAPTERS, calculateReadingTime } from '../data/chapters.js';
import { getProgress, saveProgress, markChapterComplete, isChapterComplete } from './storage.js';
import { mediaModal } from './mediaModal.js';
import { readingModeManager, themeManager } from './reading-mode.js';
import { CONFIG } from './config.js';
import { getRandomCredential, getCredentialPath } from '../data/credentials.js';

class Reader {
    constructor() {
        this.currentChapter = 1;
        this.currentPage = 0;
        this.totalPages = 0;
        this.pages = []; // Array of arrays, each containing paragraph elements for that page
        this.paragraphElements = []; // All paragraph elements
        this.autoSaveInterval = null;

        // DOM elements
        this.chapterTitle = document.getElementById('chapterTitle');
        this.chapterSubtitle = document.getElementById('chapterSubtitle');
        this.chapterMeta = document.getElementById('chapterMeta');
        this.chapterBody = document.getElementById('chapterBody');
        this.continueReading = document.getElementById('continueReading');
        this.continueChapter = document.getElementById('continueChapter');

        // Bind methods
        this.handleResize = this.debounce(this.onResize.bind(this), 250);
        this.handleScroll = this.throttle(this.onScroll.bind(this), 100);
        this.scrollThreshold = 0.9; // 90% scroll = chapter complete
    }

    // Initialize reader
    init() {
        // Initialize media modal
        mediaModal.init();

        // Initialize reading mode manager
        readingModeManager.init();

        // Initialize theme manager
        themeManager.init();

        // Hide progress indicator if disabled in config
        if (!CONFIG.showProgressIndicator && this.headerProgress) {
            this.headerProgress.style.display = 'none';
        }

        // Expose reader instance globally for other modules
        window.readerInstance = this;
        window.currentChapterId = this.currentChapter;

        // Load saved progress
        const progress = getProgress();
        this.currentChapter = progress.currentChapter || 1;
        this.currentPage = progress.currentPage || 0;

        // Check if we should show home page or a chapter
        const hashChapter = this.getChapterFromHash();
        const isHomePage = !window.location.hash || window.location.hash === '#' || window.location.hash === '#home';

        if (isHomePage) {
            this.showHomePage();
        } else if (hashChapter) {
            this.currentChapter = hashChapter;
            this.loadChapter(this.currentChapter);
            this.hideContinueReading();
        } else {
            this.showHomePage();
        }

        // Listen for hash changes
        window.addEventListener('hashchange', () => this.handleHashChange());

        // Listen for resize to recalculate pages
        window.addEventListener('resize', this.handleResize);

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
        // Hide chapter header on home page
        const chapterHeader = document.querySelector('.chapter-header');
        if (chapterHeader) {
            chapterHeader.style.display = 'none';
        }

        // Remove paginated class
        document.body.classList.remove('paginated');

        // Get saved progress
        const progress = getProgress();
        const savedChapter = progress.currentChapter || 1;
        const savedPage = progress.currentPage || 0;

        // Button text - use random message if available, otherwise default
        let buttonText = progress.lastUpdated ? 'Continue Reading' : 'Start Reading';
        if (window.getRandomButtonMessage) {
            buttonText = window.getRandomButtonMessage();
        }

        // Check for credential to display
        const credential = getRandomCredential();

        if (credential) {
            // Show credential as the clickable button
            const credentialPath = getCredentialPath(credential);
            this.chapterBody.innerHTML = `
                <div class="home-content">
                    <button class="credential-btn" id="startReadingBtn" aria-label="Tap credential to continue reading">
                        <img src="${credentialPath}" alt="Press credential" class="credential-img">
                    </button>
                </div>
            `;
        } else {
            // Fallback to text button when no credentials
            this.chapterBody.innerHTML = `
                <div class="home-content">
                    <button class="start-reading-btn" id="startReadingBtn">${buttonText}</button>
                </div>
            `;
        }

        // Add click handler for start reading button
        const startBtn = document.getElementById('startReadingBtn');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.currentPage = savedPage;
                this.loadChapter(savedChapter);
                this.hideContinueReading();
            });
        }

        // Dispatch event
        window.dispatchEvent(new CustomEvent('homePageLoaded'));
    }

    // Load a specific chapter
    loadChapter(chapterId, startPage = null) {
        const chapter = CHAPTERS.find(c => c.id === chapterId);

        if (!chapter) {
            this.showError(`Chapter ${chapterId} not found`);
            return;
        }

        // Show chapter header (may be hidden from home page)
        const chapterHeader = document.querySelector('.chapter-header');
        if (chapterHeader) {
            chapterHeader.style.display = '';
        }

        // Check reading mode
        const mode = readingModeManager.getMode();

        // Apply appropriate body class based on mode
        if (mode === 'page') {
            document.body.classList.add('paginated');
            document.body.classList.remove('scrolling');
        } else {
            document.body.classList.add('scrolling');
            document.body.classList.remove('paginated');
        }

        this.currentChapter = chapterId;
        window.currentChapterId = chapterId;

        // Update DOM
        this.chapterTitle.textContent = chapter.title;
        this.chapterSubtitle.textContent = chapter.subtitle;

        // Display reading time
        const readTime = calculateReadingTime(chapter.wordCount);
        this.chapterMeta.textContent = `${readTime} min read`;

        // Parse content into paragraph data
        const paragraphData = chapter.content
            .split('\n\n')
            .filter(p => p.trim())
            .map(p => {
                const trimmed = p.trim();
                if (trimmed === '---' || trimmed === '***' || trimmed === '* * *') {
                    return { type: 'break', content: '* * *' };
                }
                return { type: 'paragraph', content: trimmed };
            });

        // Create paragraph elements
        this.createParagraphElements(paragraphData);

        // Update URL hash
        this.updateHash(chapterId);

        // Handle based on reading mode
        requestAnimationFrame(() => {
            if (mode === 'page') {
                // Page mode - calculate and show pages
                this.calculatePages();

                // Restore page or start at beginning
                if (startPage !== null) {
                    this.currentPage = Math.min(startPage, this.totalPages - 1);
                } else if (chapterId === getProgress().currentChapter) {
                    const savedPage = getProgress().currentPage || 0;
                    this.currentPage = Math.min(savedPage, this.totalPages - 1);
                } else {
                    this.currentPage = 0;
                }

                this.showPage(this.currentPage);
                this.updateProgressIndicators();

                // Remove scroll listener in page mode
                window.removeEventListener('scroll', this.handleScroll);
            } else {
                // Scroll mode - show all content, enable scrolling
                this.paragraphElements.forEach(el => {
                    el.style.display = '';
                });

                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'instant' });

                // Add scroll listener for progress
                window.removeEventListener('scroll', this.handleScroll);
                window.addEventListener('scroll', this.handleScroll);

                // Update progress for scroll mode
                this.updateScrollProgress();
            }

            // Dispatch event for other components
            window.dispatchEvent(new CustomEvent('chapterLoaded', {
                detail: { chapterId, chapter, totalPages: this.totalPages, mode }
            }));
        });
    }

    // Create paragraph elements from data
    createParagraphElements(paragraphData) {
        // Clear existing content
        this.chapterBody.innerHTML = '';
        this.paragraphElements = [];

        // Create a container for paginated content
        const pageContainer = document.createElement('div');
        pageContainer.className = 'page-container';

        paragraphData.forEach((item, index) => {
            let element;
            if (item.type === 'break') {
                element = document.createElement('div');
                element.className = 'scene-break';
                element.innerHTML = `<span>${item.content}</span>`;
            } else {
                element = document.createElement('p');
                element.innerHTML = item.content;
            }
            element.dataset.paragraphIndex = index;
            this.paragraphElements.push(element);
            pageContainer.appendChild(element);
        });

        this.chapterBody.appendChild(pageContainer);

        // Attach click handlers to media emojis
        this.attachMediaEmojiHandlers();
    }

    // Calculate which paragraphs fit on each page
    calculatePages() {
        if (this.paragraphElements.length === 0) return;

        // Get available height for content
        const availableHeight = this.getAvailableHeight();

        this.pages = [];
        let currentPageParagraphs = [];
        let currentHeight = 0;

        // First, show all paragraphs to measure them
        this.paragraphElements.forEach(el => {
            el.style.display = '';
        });

        this.paragraphElements.forEach((element, index) => {
            const elementHeight = element.offsetHeight;
            const marginBottom = parseInt(window.getComputedStyle(element).marginBottom) || 0;
            const totalElementHeight = elementHeight + marginBottom;

            // Check if adding this element would exceed the page height
            if (currentHeight + elementHeight > availableHeight && currentPageParagraphs.length > 0) {
                // Start a new page
                this.pages.push([...currentPageParagraphs]);
                currentPageParagraphs = [index];
                currentHeight = totalElementHeight;
            } else {
                currentPageParagraphs.push(index);
                currentHeight += totalElementHeight;
            }
        });

        // Add the last page
        if (currentPageParagraphs.length > 0) {
            this.pages.push(currentPageParagraphs);
        }

        this.totalPages = this.pages.length;

        // Ensure current page is valid
        if (this.currentPage >= this.totalPages) {
            this.currentPage = Math.max(0, this.totalPages - 1);
        }
    }

    // Get available height for content
    getAvailableHeight() {
        const viewportHeight = window.innerHeight;
        const header = document.querySelector('.header');
        const chapterHeader = document.querySelector('.chapter-header');
        const navFooter = document.querySelector('.nav-footer');

        const headerHeight = header ? header.offsetHeight : 70;
        const chapterHeaderHeight = chapterHeader ? chapterHeader.offsetHeight : 0;
        const footerHeight = navFooter ? navFooter.offsetHeight : 40;

        // Add some padding
        const padding = 40;

        return viewportHeight - headerHeight - chapterHeaderHeight - footerHeight - padding;
    }

    // Show a specific page
    showPage(pageIndex) {
        if (pageIndex < 0 || pageIndex >= this.totalPages) return;

        this.currentPage = pageIndex;
        const pageContent = this.pages[pageIndex];

        // Hide all paragraphs, then show only current page's
        this.paragraphElements.forEach((el, index) => {
            if (pageContent.includes(index)) {
                el.style.display = '';
            } else {
                el.style.display = 'none';
            }
        });

        // Scroll to top of content area
        window.scrollTo({ top: 0, behavior: 'instant' });

        // Update progress
        this.updateProgressIndicators();

        // Check for chapter completion
        if (pageIndex >= this.totalPages - 1 && !isChapterComplete(this.currentChapter)) {
            markChapterComplete(this.currentChapter);
            window.dispatchEvent(new CustomEvent('chapterCompleted', {
                detail: { chapterId: this.currentChapter }
            }));
        }

        // Dispatch page change event
        window.dispatchEvent(new CustomEvent('pageChanged', {
            detail: {
                currentPage: this.currentPage,
                totalPages: this.totalPages,
                chapterId: this.currentChapter
            }
        }));
    }

    // Navigate to next page
    nextPage() {
        if (this.currentPage < this.totalPages - 1) {
            this.showPage(this.currentPage + 1);
            return true;
        }
        return false; // No more pages in this chapter
    }

    // Navigate to previous page
    prevPage() {
        if (this.currentPage > 0) {
            this.showPage(this.currentPage - 1);
            return true;
        }
        return false; // Already on first page
    }

    // Check if on first page
    isFirstPage() {
        return this.currentPage === 0;
    }

    // Check if on last page
    isLastPage() {
        return this.currentPage >= this.totalPages - 1;
    }

    // Get pagination info
    getPaginationInfo() {
        return {
            currentPage: this.currentPage,
            totalPages: this.totalPages,
            currentChapter: this.currentChapter
        };
    }

    // Handle window resize
    onResize() {
        const mode = readingModeManager.getMode();
        if (this.paragraphElements.length > 0 && mode === 'page') {
            const savedPage = this.currentPage;
            this.calculatePages();
            this.currentPage = Math.min(savedPage, this.totalPages - 1);
            this.showPage(this.currentPage);
        }
    }

    // Handle scroll events (for scroll mode)
    onScroll() {
        if (readingModeManager.getMode() !== 'scroll') return;

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

        // Mark chapter as complete if scrolled to bottom
        if (scrollPercent >= this.scrollThreshold && !isChapterComplete(this.currentChapter)) {
            markChapterComplete(this.currentChapter);
            window.dispatchEvent(new CustomEvent('chapterCompleted', {
                detail: { chapterId: this.currentChapter }
            }));
        }
    }

    // Update scroll progress (no-op, progress display removed)
    updateScrollProgress() {
        // Progress display removed
    }

    // Throttle utility function
    throttle(func, wait) {
        let timeout = null;
        let previous = 0;

        return (...args) => {
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

    // Update progress indicators (no-op, progress display removed)
    updateProgressIndicators() {
        // Progress display removed
    }

    // Auto-save progress
    startAutoSave() {
        this.autoSaveInterval = setInterval(() => {
            this.saveCurrentProgress();
        }, 2000);
    }

    // Save current reading progress
    saveCurrentProgress() {
        const completionPercentage = this.calculateBookProgress();
        saveProgress(this.currentChapter, this.currentPage, completionPercentage);
    }

    // Calculate overall book progress
    calculateBookProgress() {
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

    // Utility: Debounce function
    debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Show continue reading button
    showContinueReading(chapterId) {
        const chapter = CHAPTERS.find(c => c.id === chapterId);
        if (!chapter || !this.continueReading) return;

        this.continueChapter.textContent = chapter.title;
        this.continueReading.style.display = 'block';

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
        window.removeEventListener('resize', this.handleResize);
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
        }
        this.saveCurrentProgress();
    }
}

// Export single instance
export const reader = new Reader();
