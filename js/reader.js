// Reader - Core reading interface logic with pagination

import { CHAPTERS, getChapterBySlug, getChapterSlug } from '../data/chapters.js';
import { getProgress, saveProgress, markChapterComplete, isChapterComplete } from './storage.js';
import { mediaModal } from './mediaModal.js';
import { readingModeManager } from './reading-mode.js';
import { CONFIG } from './config.js';
import { transitions } from './transitions.js';
import { imageLightbox } from './image-lightbox.js';

// Expose CHAPTERS globally for share feature
window.CHAPTERS = CHAPTERS;

class Reader {
    constructor() {
        this.currentChapter = 1;
        this.currentPage = 0;
        this.totalPages = 0;
        this.pages = []; // Array of paragraph indices for each page
        this.paragraphElements = []; // All paragraph elements
        this.autoSaveInterval = null;

        // DOM elements
        this.chapterTitle = document.getElementById('chapterTitle');
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

        // Initialize transitions for smooth chapter navigation
        transitions.init();

        // Initialize image lightbox
        imageLightbox.init();

        // Expose reader instance globally for other modules
        window.readerInstance = this;

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

        // Listen for font size changes to recalculate pages
        window.addEventListener('fontsizechange', this.handleResize);

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
        if (!this.chapterBody) return;

        // Hide chapter header on home page
        const chapterHeader = document.querySelector('.chapter-header');
        if (chapterHeader) {
            chapterHeader.style.display = 'none';
        }

        // Hide nav footer on home page
        const navFooter = document.querySelector('.nav-footer');
        if (navFooter) {
            navFooter.style.display = 'none';
        }

        // Remove paginated class, add home-page class
        document.body.classList.remove('paginated');
        document.body.classList.add('home-page');

        // Get saved progress
        const progress = getProgress();
        const savedChapter = progress.currentChapter || -1; // Default to title page
        const savedPage = progress.currentPage || 0;
        const isNewReader = !progress.lastUpdated;

        // Button text
        const buttonText = isNewReader ? 'START READING' : 'CONTINUE READING';

        // Homepage: Title + button centered, reader count, sticker lower right
        this.chapterBody.innerHTML = `
            <div class="home-content">
                <h1 class="home-title">OFF-THE-RECORD</h1>
                <button class="start-reading-btn" id="startReadingBtn">${buttonText}</button>
                <p class="public-reader-count" id="publicReaderCount" style="display: none;"></p>
                <img src="./assets/icons/parental-advisory.svg" alt="Parental Advisory - Explicit Content" class="home-sticker">
            </div>
        `;

        // Fetch and display public reader count
        this.fetchPublicReaderCount();

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

    // Fetch and display public reader count on homepage
    async fetchPublicReaderCount() {
        const countEl = document.getElementById('publicReaderCount');
        if (!countEl) return;

        try {
            // This is a READ call - not gated behind trackingEnabled
            if (typeof OTR_ANALYTICS_CONFIG === 'undefined' || !OTR_ANALYTICS_CONFIG.readerCounterUrl) {
                return;
            }

            const response = await fetch(
                OTR_ANALYTICS_CONFIG.readerCounterUrl + '?action=getReaderCount',
                { method: 'GET' }
            );

            if (!response.ok) return;

            const data = await response.json();
            const total = parseInt(data.total, 10);

            // Hide if 0 or invalid
            if (!total || total <= 0) return;

            // Round down to nearest 10
            const rounded = Math.floor(total / 10) * 10;
            if (rounded <= 0) return;

            // Display the count
            countEl.textContent = `MORE THAN ${rounded} READERS`;
            countEl.style.display = '';
        } catch (e) {
            // Silently fail - don't show the element
            console.log('[OTR] Reader count fetch failed:', e.message);
        }
    }

    // Check if a chapter is locked
    isChapterLocked(chapterId) {
        const lockedChapters = JSON.parse(localStorage.getItem('admin_lockedChapters') || '[]');
        return lockedChapters.includes(chapterId);
    }

    // Load a specific chapter with optional transitions
    loadChapter(chapterId, startPage = null, useTransition = true) {
        const chapter = CHAPTERS.find(c => c.id === chapterId);

        if (!chapter) {
            this.showError(`Chapter ${chapterId} not found`);
            return;
        }

        // Check if chapter is locked
        if (this.isChapterLocked(chapterId)) {
            this.showLockedChapter(chapter);
            return;
        }

        // Use transition if enabled and we're changing chapters (not initial load)
        const shouldTransition = useTransition && this.currentChapter !== null && this.currentChapter !== chapterId;

        if (shouldTransition) {
            transitions.transitionTo(() => this.doLoadChapter(chapter, chapterId, startPage));
        } else {
            this.doLoadChapter(chapter, chapterId, startPage);
        }
    }

    // Internal method to actually load chapter content
    doLoadChapter(chapter, chapterId, startPage) {
        // Show chapter header (may be hidden from home page)
        const chapterHeader = document.querySelector('.chapter-header');
        if (chapterHeader) {
            chapterHeader.style.display = '';
        }

        // Show nav footer (may be hidden from home page)
        const navFooter = document.querySelector('.nav-footer');
        if (navFooter) {
            navFooter.style.display = '';
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

        // Remove home-page class when viewing a chapter
        document.body.classList.remove('home-page');

        this.currentChapter = chapterId;
        window.currentChapterId = chapterId;

        // Update DOM - just the title, no subtitle or reading time
        this.chapterTitle.textContent = chapter.title;

        // Add data-slug for CSS targeting
        this.chapterBody.dataset.slug = chapter.slug || '';

        // Check if chapter is preloaded for instant loading
        const preloaded = transitions.getPreloaded(chapterId);

        // Parse content into paragraph data (use preloaded if available)
        const paragraphData = preloaded ? preloaded.paragraphData : chapter.content
            .split('\n\n')
            .filter(p => p.trim())
            .map(p => {
                const trimmed = p.trim();
                if (trimmed === '---') {
                    return { type: 'break', content: '' };
                }
                return { type: 'paragraph', content: trimmed };
            });

        // Add *** separator at end of chapter (except special pages and last chapter)
        const isSpecial = chapter.section === 'title' || chapter.section === 'toc';
        const isLastChapter = CHAPTERS.indexOf(chapter) === CHAPTERS.length - 1;
        if (!isSpecial && !isLastChapter) {
            paragraphData.push({ type: 'break', content: '***' });
        }

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

                // Remove scroll listener in page mode
                window.removeEventListener('scroll', this.handleScroll);
            } else {
                // Scroll mode - show all content, enable scrolling
                this.paragraphElements.forEach(el => {
                    el.style.display = '';
                });

                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'instant' });

                // Add scroll listener for completion tracking (passive for performance)
                window.removeEventListener('scroll', this.handleScroll);
                window.addEventListener('scroll', this.handleScroll, { passive: true });
            }

            // Bind lightbox to any inline images
            imageLightbox.bindImages();

            // Dispatch event for other components
            window.dispatchEvent(new CustomEvent('chapterLoaded', {
                detail: { chapterId, chapter, totalPages: this.totalPages, mode }
            }));
        });
    }

    // Create paragraph elements from data
    createParagraphElements(paragraphData) {
        // Null guard for DOM element
        if (!this.chapterBody) return;

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
                // Check if content already has <p> tag with classes
                const pMatch = item.content.match(/^<p([^>]*)>([\s\S]*)<\/p>$/);
                if (pMatch) {
                    element = document.createElement('p');
                    // Preserve attributes from original <p> tag
                    const attrs = pMatch[1];
                    if (attrs) {
                        const classMatch = attrs.match(/class="([^"]*)"/);
                        if (classMatch) element.className = classMatch[1];
                    }
                    element.innerHTML = pMatch[2];
                } else {
                    element = document.createElement('p');
                    element.innerHTML = item.content;
                }
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
        // Null guard for DOM element and empty content
        if (!this.chapterBody || this.paragraphElements.length === 0) return;

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
        // Null guard for pages array and boundary check
        if (!this.pages || pageIndex < 0 || pageIndex >= this.totalPages) return;

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

    // Handle window resize or font size change
    onResize() {
        if (!this.chapterBody) return;

        const mode = readingModeManager.getMode();
        if (this.paragraphElements.length > 0 && mode === 'page') {
            // Calculate approximate reading position (percentage through chapter)
            const oldTotalPages = this.totalPages;
            const readingProgress = oldTotalPages > 0 ? this.currentPage / oldTotalPages : 0;

            this.calculatePages();

            // Restore approximate position based on percentage
            if (this.totalPages > 0) {
                this.currentPage = Math.min(
                    Math.round(readingProgress * this.totalPages),
                    this.totalPages - 1
                );
            } else {
                this.currentPage = 0;
            }

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
        if (!this.chapterBody) return;

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

    // Get chapter ID from URL hash (supports slug-based URLs)
    getChapterFromHash() {
        const hash = window.location.hash.replace('#', '');
        if (!hash) return null;

        // Try to find chapter by slug
        const chapter = getChapterBySlug(hash);
        if (chapter) {
            return chapter.id;
        }

        // Backwards compatibility: support old #chapter-N format
        if (hash.startsWith('chapter-')) {
            const chapterId = parseInt(hash.replace('chapter-', ''));
            if (!isNaN(chapterId)) {
                const validIds = CHAPTERS.map(c => c.id).filter(id => id !== undefined);
                if (validIds.includes(chapterId)) {
                    // Redirect to new slug URL
                    const slug = getChapterSlug(chapterId);
                    if (slug) {
                        history.replaceState(null, null, `#${slug}`);
                    }
                    return chapterId;
                }
            }
        }

        return null;
    }

    // Update URL hash (uses slug)
    updateHash(chapterId) {
        const slug = getChapterSlug(chapterId);
        if (slug) {
            const newHash = `#${slug}`;
            if (window.location.hash !== newHash) {
                history.pushState(null, null, newHash);
            }
        }
    }

    // Show error message with user-friendly UI
    showError(message) {
        if (!this.chapterBody) return;

        const isOffline = !navigator.onLine;
        const errorIcon = isOffline ? '📡' : '📖';
        const errorTitle = isOffline ? 'You\'re Offline' : 'Chapter Unavailable';
        const errorMessage = isOffline
            ? 'This chapter isn\'t available offline. Connect to the internet to continue reading.'
            : message || 'We couldn\'t load this chapter. Please try again.';

        this.chapterBody.innerHTML = `
            <div class="chapter-error">
                <div class="chapter-error-icon">${errorIcon}</div>
                <h2>${errorTitle}</h2>
                <p>${errorMessage}</p>
                <div class="chapter-error-actions">
                    <button class="chapter-error-btn primary" onclick="window.location.reload()">Try Again</button>
                    <button class="chapter-error-btn" onclick="window.location.hash='home'">Go Home</button>
                </div>
            </div>
        `;
    }

    // Show locked chapter placeholder
    showLockedChapter(chapter) {
        if (!this.chapterBody) return;

        // Show chapter header
        const chapterHeader = document.querySelector('.chapter-header');
        if (chapterHeader) {
            chapterHeader.style.display = '';
        }

        // Show nav footer
        const navFooter = document.querySelector('.nav-footer');
        if (navFooter) {
            navFooter.style.display = '';
        }

        this.currentChapter = chapter.id;
        window.currentChapterId = chapter.id;
        this.chapterTitle.textContent = chapter.title;

        // Show locked placeholder
        this.chapterBody.innerHTML = `
            <div class="locked-chapter">
                <div class="locked-icon">🔒</div>
                <p class="locked-message">This chapter is currently locked.</p>
                <p class="locked-hint">Check back soon or contact the author for access.</p>
            </div>
        `;

        // Update URL hash
        this.updateHash(chapter.id);

        // Dispatch event for navigation state
        window.dispatchEvent(new CustomEvent('chapterLoaded', {
            detail: { chapterId: chapter.id, chapter, totalPages: 1, mode: 'scroll', locked: true }
        }));
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
