// Navigation - Chapter navigation and Table of Contents

import { CHAPTERS, getChapterCount, getChaptersByYear, getIntroChapters, getPostscriptChapters, getSortedYears } from '../data/chapters.js';
import { reader } from './reader.js';
import { isChapterComplete } from './storage.js';
import { photoGallery } from './photoGallery.js';
import { getAllGalleries } from '../data/photos.js';
import { blogService } from './blog.js';
import { guestbook } from './guestbook.js';
import { bookmarks } from './bookmarks.js';
import { readingModeManager, themeManager } from './reading-mode.js';
import { fontSizeManager } from './font-size.js';

class Navigation {
    constructor() {
        // DOM elements
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.menuBtn = document.getElementById('menuBtn');
        this.closeTocBtn = document.getElementById('closeTocBtn');
        this.tocSidebar = document.getElementById('tocSidebar');
        this.overlay = document.getElementById('overlay');
        this.tocContent = document.getElementById('tocContent');

        // State
        this.currentChapterId = 1;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.expandedYears = new Set();
        this.expandedSections = new Set();
    }

    // Initialize navigation
    init() {
        // Build TOC with all sections
        this.buildTOC();

        // Set up event listeners - now for page navigation
        this.prevBtn.addEventListener('click', () => this.goToPrevious());
        this.nextBtn.addEventListener('click', () => this.goToNext());
        this.menuBtn.addEventListener('click', () => this.openTOC());
        this.closeTocBtn.addEventListener('click', () => this.closeTOC());
        this.overlay.addEventListener('click', () => this.closeTOC());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));

        // Listen for chapter changes
        window.addEventListener('chapterLoaded', (e) => {
            this.currentChapterId = e.detail.chapterId;
            this.updateNavigationState();
            this.updateTOCState();
        });

        // Listen for page changes
        window.addEventListener('pageChanged', () => {
            this.updateNavigationState();
        });

        // Listen for chapter completion
        window.addEventListener('chapterCompleted', () => {
            this.updateTOCState();
        });

        // Touch gestures for swipe navigation
        this.setupSwipeGestures();

        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            const chapterId = reader.getChapterFromHash();
            if (chapterId) {
                reader.loadChapter(chapterId);
            }
        });

        // Initial state
        this.updateNavigationState();
    }

    // Build Table of Contents with new structure: BOOK contains all chapters
    buildTOC() {
        const fragment = document.createDocumentFragment();

        // Build top sections (larger font): BOOK, BLOG, ABOUT, AUDIO, PHOTOS
        this.buildTopSections(fragment);

        // Add a divider between top and bottom sections
        const divider = document.createElement('div');
        divider.className = 'toc-divider';
        fragment.appendChild(divider);

        // Build bottom sections (smaller font): COMMENTS, CONTACT
        this.buildBottomSections(fragment);

        this.tocContent.appendChild(fragment);
    }

    // Build top navigation sections (larger font)
    buildTopSections(fragment) {
        // 1. BOOK section - contains all chapters
        fragment.appendChild(this.createBookSection());

        // 2. Other top sections as links/dropdowns
        const topSections = [
            { id: 'blog', label: 'BLOG', type: 'link', url: 'https://anthonyfenech.substack.com' },
            { id: 'about', label: 'ABOUT', type: 'link', comingSoon: true },
            { id: 'audio', label: 'AUDIO', type: 'link', comingSoon: true },
            { id: 'photo', label: 'PHOTOS', type: 'link', url: './photos.html' }
        ];

        topSections.forEach(section => {
            fragment.appendChild(this.createTopSection(section));
        });
    }

    // Create the BOOK section with all nested chapter content
    createBookSection() {
        const section = document.createElement('div');
        section.className = 'toc-top-section';
        section.dataset.section = 'book';

        // Section header
        const sectionHeader = document.createElement('div');
        sectionHeader.className = 'toc-top-header';

        const sectionTitle = document.createElement('h3');
        sectionTitle.className = 'toc-top-title';
        sectionTitle.textContent = 'OFF-THE-RECORD';

        sectionHeader.appendChild(sectionTitle);

        // Book content container (contains all chapter sections)
        const bookContent = document.createElement('div');
        bookContent.className = 'toc-book-content collapsed';
        bookContent.id = 'toc-book-content';

        // Build nested chapter sections inside book
        this.buildBookContent(bookContent);

        // Click handler
        sectionHeader.addEventListener('click', () => {
            this.toggleTopSection('book', sectionHeader, bookContent);
        });

        section.appendChild(sectionHeader);
        section.appendChild(bookContent);

        return section;
    }

    // Build the content inside BOOK (all chapters flat)
      buildBookContent(container) {
          const introChapters = getIntroChapters();
          const chaptersByYear = getChaptersByYear();
          const years = getSortedYears();
          const postscriptChapters = getPostscriptChapters();

          // Add intro chapters directly
          introChapters.forEach(chapter => {
              container.appendChild(this.createChapterItem(chapter));
          });

          // Add year chapters directly
          years.forEach(year => {
              const chapters = chaptersByYear[year] || [];
              chapters.forEach(chapter => {
                  container.appendChild(this.createChapterItem(chapter));
              });
          });

          // Add postscript chapters directly
          postscriptChapters.forEach(chapter => {
              container.appendChild(this.createChapterItem(chapter));
          });
      }

    // Create a chapter item
    createChapterItem(chapter) {
        const item = document.createElement('div');
        item.className = 'toc-chapter';
        item.dataset.chapterId = chapter.id;

        const indicator = document.createElement('div');
        indicator.className = 'chapter-indicator';

        const info = document.createElement('div');
        info.className = 'toc-chapter-info';

        const titleRow = document.createElement('div');
        titleRow.className = 'toc-chapter-title-row';

        const title = document.createElement('span');
        title.className = 'toc-chapter-title';
        title.textContent = chapter.title;

        titleRow.appendChild(title);
        info.appendChild(titleRow);

        item.appendChild(indicator);
        item.appendChild(info);

        // Click handler
        item.addEventListener('click', () => {
            reader.loadChapter(chapter.id);
            this.closeTOC();
        });

        return item;
    }

    // Toggle nested section (INTRO/POSTSCRIPT inside BOOK)
    toggleNestedSection(sectionId, sectionHeader, chaptersContainer) {
        if (this.expandedSections.has(sectionId)) {
            this.expandedSections.delete(sectionId);
            chaptersContainer.classList.add('collapsed');
            sectionHeader.classList.remove('expanded');
        } else {
            this.expandedSections.add(sectionId);
            chaptersContainer.classList.remove('collapsed');
            sectionHeader.classList.add('expanded');
        }
    }

    // Toggle year section
    toggleYear(year, yearHeader, chaptersContainer) {
        if (this.expandedYears.has(year)) {
            this.expandedYears.delete(year);
            chaptersContainer.classList.add('collapsed');
            yearHeader.classList.remove('expanded');
        } else {
            this.expandedYears.add(year);
            chaptersContainer.classList.remove('collapsed');
            yearHeader.classList.add('expanded');
        }
    }

    // Create a top section (BLOG, ABOUT, AUDIO, PHOTOS)
    createTopSection(section) {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'toc-top-section';
        sectionDiv.dataset.section = section.id;

        const sectionHeader = document.createElement('div');
        sectionHeader.className = section.type === 'dropdown' ? 'toc-top-header' : 'toc-top-header toc-top-link';

        const sectionTitle = document.createElement('h3');
        sectionTitle.className = 'toc-top-title';
        sectionTitle.textContent = section.label;

        sectionHeader.appendChild(sectionTitle);

        if (section.type === 'dropdown') {
            const sectionContent = document.createElement('div');
            sectionContent.className = 'toc-top-content collapsed';
            sectionContent.id = `toc-section-${section.id}`;

            if (section.id === 'photo') {
                sectionContent.dataset.needsInit = 'true';
            }

            sectionHeader.addEventListener('click', () => {
                this.toggleTopSection(section.id, sectionHeader, sectionContent);
            });

            sectionDiv.appendChild(sectionHeader);
            sectionDiv.appendChild(sectionContent);
        } else {
            sectionHeader.addEventListener('click', () => {
                if (section.url) {
                    window.open(section.url, '_blank', 'noopener,noreferrer');
                } else if (section.comingSoon) {
                    alert('Coming Soon');
                }
                this.closeTOC();
            });

            sectionDiv.appendChild(sectionHeader);
        }

        return sectionDiv;
    }

    // Toggle top section (BOOK, PHOTOS)
    toggleTopSection(sectionId, sectionHeader, sectionContent) {
        if (this.expandedSections.has(sectionId)) {
            this.expandedSections.delete(sectionId);
            sectionContent.classList.add('collapsed');
            sectionHeader.classList.remove('expanded');
        } else {
            this.expandedSections.add(sectionId);
            sectionContent.classList.remove('collapsed');
            sectionHeader.classList.add('expanded');

            // Initialize photo gallery if needed
            if (sectionId === 'photo' && sectionContent.dataset.needsInit === 'true') {
                this.initializePhotoGallery(sectionContent);
                delete sectionContent.dataset.needsInit;
            }
        }
    }

    // Build bottom navigation sections (smaller font)
    buildBottomSections(fragment) {
        const bottomSections = [
            { id: 'settings', label: 'SETTINGS', type: 'dropdown' },
            { id: 'bookmarks', label: 'BOOKMARKS', type: 'dropdown' },
            { id: 'comments', label: 'COMMENTS', type: 'link', url: './guestbook.html' },
            { id: 'contact', label: 'CONTACT', type: 'link', comingSoon: true }
        ];

        bottomSections.forEach(section => {
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'toc-content-section';
            sectionDiv.dataset.section = section.id;

            const sectionHeader = document.createElement('div');
            sectionHeader.className = section.type === 'dropdown' ? 'toc-section-header' : 'toc-section-header toc-section-link';

            const sectionTitle = document.createElement('h3');
            sectionTitle.className = 'toc-section-title';
            sectionTitle.innerHTML = section.label;

            sectionHeader.appendChild(sectionTitle);

            if (section.type === 'dropdown') {
                const sectionContent = document.createElement('div');
                sectionContent.className = 'toc-section-content collapsed';
                sectionContent.id = `toc-section-${section.id}`;

                if (section.id === 'comments') {
                    sectionContent.dataset.needsInit = 'true';
                }

                sectionHeader.addEventListener('click', () => {
                    this.toggleSection(section.id, sectionHeader, sectionContent);
                });

                sectionDiv.appendChild(sectionHeader);
                sectionDiv.appendChild(sectionContent);
            } else {
                sectionHeader.addEventListener('click', () => {
                    if (section.url) {
                        window.open(section.url, '_blank', 'noopener,noreferrer');
                    } else if (section.comingSoon) {
                        alert('Coming Soon');
                    }
                    this.closeTOC();
                });

                sectionDiv.appendChild(sectionHeader);
            }

            fragment.appendChild(sectionDiv);
        });
    }

    // Toggle content section
    toggleSection(sectionId, sectionHeader, sectionContent) {
        if (this.expandedSections.has(sectionId)) {
            this.expandedSections.delete(sectionId);
            sectionContent.classList.add('collapsed');
            sectionHeader.classList.remove('expanded');
        } else {
            this.expandedSections.add(sectionId);
            sectionContent.classList.remove('collapsed');
            sectionHeader.classList.add('expanded');

            // Initialize guestbook if needed
            if (sectionId === 'comments' && sectionContent.dataset.needsInit === 'true') {
                guestbook.render(sectionContent);
                delete sectionContent.dataset.needsInit;
            }

            // Render settings if needed
            if (sectionId === 'settings') {
                this.renderSettings(sectionContent);
            }

            // Render bookmarks if needed
            if (sectionId === 'bookmarks') {
                bookmarks.renderBookmarksList(sectionContent, (chapterId) => {
                    this.loadChapter(chapterId);
                    this.closeTOC();
                });
            }
        }
    }

    // Render settings panel
    renderSettings(container) {
        container.innerHTML = '';

        const wrapper = document.createElement('div');
        wrapper.className = 'settings-wrapper';

        // Reading Mode Setting
        const readingModeRow = document.createElement('div');
        readingModeRow.className = 'settings-row';

        const readingModeLabel = document.createElement('span');
        readingModeLabel.className = 'settings-label';
        readingModeLabel.textContent = 'Mode';

        const readingModeToggle = document.createElement('div');
        readingModeToggle.className = 'reading-mode-toggle';
        readingModeToggle.id = 'readingModeToggle';

        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'mode-btn' + (readingModeManager.isScrollMode() ? ' active' : '');
        scrollBtn.dataset.mode = 'scroll';
        scrollBtn.textContent = 'Scroll';
        scrollBtn.addEventListener('click', () => {
            if (readingModeManager.getMode() !== 'scroll') {
                readingModeManager.switchMode('scroll');
                scrollBtn.classList.add('active');
                pagesBtn.classList.remove('active');
            }
        });

        const pagesBtn = document.createElement('button');
        pagesBtn.className = 'mode-btn' + (readingModeManager.isPageMode() ? ' active' : '');
        pagesBtn.dataset.mode = 'page';
        pagesBtn.textContent = 'Pages';
        pagesBtn.addEventListener('click', () => {
            if (readingModeManager.getMode() !== 'page') {
                readingModeManager.switchMode('page');
                pagesBtn.classList.add('active');
                scrollBtn.classList.remove('active');
            }
        });

        readingModeToggle.appendChild(scrollBtn);
        readingModeToggle.appendChild(pagesBtn);
        readingModeRow.appendChild(readingModeLabel);
        readingModeRow.appendChild(readingModeToggle);

        // Font Size Setting
        const fontSizeRow = document.createElement('div');
        fontSizeRow.className = 'settings-row';

        const fontSizeLabel = document.createElement('span');
        fontSizeLabel.className = 'settings-label';
        fontSizeLabel.textContent = 'Text Size';

        const fontSizeToggle = document.createElement('div');
        fontSizeToggle.className = 'font-size-toggle';

        const smallBtn = document.createElement('button');
        smallBtn.className = 'font-btn' + (fontSizeManager.isSmall() ? ' active' : '');
        smallBtn.dataset.size = 'small';
        smallBtn.textContent = 'A-';
        smallBtn.setAttribute('aria-label', 'Small text');

        const mediumBtn = document.createElement('button');
        mediumBtn.className = 'font-btn' + (fontSizeManager.isMedium() ? ' active' : '');
        mediumBtn.dataset.size = 'medium';
        mediumBtn.textContent = 'A';
        mediumBtn.setAttribute('aria-label', 'Medium text');

        const largeBtn = document.createElement('button');
        largeBtn.className = 'font-btn' + (fontSizeManager.isLarge() ? ' active' : '');
        largeBtn.dataset.size = 'large';
        largeBtn.textContent = 'A+';
        largeBtn.setAttribute('aria-label', 'Large text');

        const updateFontButtons = () => {
            smallBtn.classList.toggle('active', fontSizeManager.isSmall());
            mediumBtn.classList.toggle('active', fontSizeManager.isMedium());
            largeBtn.classList.toggle('active', fontSizeManager.isLarge());
        };

        smallBtn.addEventListener('click', () => {
            fontSizeManager.changeSize('small');
            updateFontButtons();
        });

        mediumBtn.addEventListener('click', () => {
            fontSizeManager.changeSize('medium');
            updateFontButtons();
        });

        largeBtn.addEventListener('click', () => {
            fontSizeManager.changeSize('large');
            updateFontButtons();
        });

        fontSizeToggle.appendChild(smallBtn);
        fontSizeToggle.appendChild(mediumBtn);
        fontSizeToggle.appendChild(largeBtn);
        fontSizeRow.appendChild(fontSizeLabel);
        fontSizeRow.appendChild(fontSizeToggle);

        wrapper.appendChild(readingModeRow);
        wrapper.appendChild(fontSizeRow);
        container.appendChild(wrapper);
    }

    // Initialize photo gallery in the sidebar
    initializePhotoGallery(container) {
        const galleries = getAllGalleries();
        this.expandedGalleries = new Set();

        galleries.forEach(gallery => {
            const gallerySection = document.createElement('div');
            gallerySection.className = 'gallery-section';
            gallerySection.dataset.galleryId = gallery.id;

            const galleryHeader = document.createElement('div');
            galleryHeader.className = 'gallery-section-header';

            const galleryTitle = document.createElement('h4');
            galleryTitle.className = 'gallery-section-title';
            galleryTitle.textContent = gallery.title.toUpperCase();

            galleryHeader.appendChild(galleryTitle);

            const galleryContent = document.createElement('div');
            galleryContent.className = 'gallery-section-content collapsed';
            galleryContent.id = `gallery-content-${gallery.id}`;

            if (!gallery.comingSoon) {
                galleryHeader.addEventListener('click', () => {
                    this.toggleGallery(gallery.id, galleryHeader, galleryContent);
                });
                galleryHeader.style.cursor = 'pointer';
            } else {
                galleryHeader.classList.add('disabled');
            }

            gallerySection.appendChild(galleryHeader);
            gallerySection.appendChild(galleryContent);
            container.appendChild(gallerySection);
        });
    }

    // Toggle gallery expansion
    toggleGallery(galleryId, galleryHeader, galleryContent) {
        const isExpanded = this.expandedGalleries.has(galleryId);

        if (isExpanded) {
            this.expandedGalleries.delete(galleryId);
            galleryContent.classList.add('collapsed');
            galleryHeader.classList.remove('expanded');
        } else {
            this.expandedGalleries.add(galleryId);
            galleryContent.classList.remove('collapsed');
            galleryHeader.classList.add('expanded');

            if (!galleryContent.dataset.rendered) {
                photoGallery.renderGalleryGrid(galleryId, `gallery-content-${galleryId}`);
                galleryContent.dataset.rendered = 'true';
            }
        }
    }

    // Update TOC state (active chapter, completion)
    updateTOCState() {
        const items = this.tocContent.querySelectorAll('.toc-chapter');

        items.forEach(item => {
            const chapterId = parseInt(item.dataset.chapterId);
            const indicator = item.querySelector('.chapter-indicator');

            item.classList.remove('active', 'completed');
            indicator.innerHTML = '';

            if (chapterId === this.currentChapterId) {
                item.classList.add('active');
                indicator.classList.add('current');
                indicator.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>';

                // Auto-expand the BOOK section and the section containing current chapter
                const chapter = CHAPTERS.find(c => c.id === chapterId);
                if (chapter) {
                    // First, expand BOOK section
                    const bookSection = this.tocContent.querySelector('[data-section="book"]');
                    if (bookSection) {
                        const bookHeader = bookSection.querySelector('.toc-top-header');
                        const bookContent = bookSection.querySelector('.toc-book-content');
                        if (bookHeader && bookContent && bookContent.classList.contains('collapsed')) {
                            this.toggleTopSection('book', bookHeader, bookContent);
                        }
                    }

                    if (chapter.year) {
                        const yearSection = this.tocContent.querySelector(`[data-year="${chapter.year}"]`);
                        if (yearSection) {
                            const yearHeader = yearSection.querySelector('.toc-nested-header');
                            const chaptersContainer = yearSection.querySelector('.toc-nested-chapters');
                            if (yearHeader && chaptersContainer && chaptersContainer.classList.contains('collapsed')) {
                                this.toggleYear(chapter.year.toString(), yearHeader, chaptersContainer);
                            }
                        }
                    } else if (chapter.section === 'intro' || chapter.section === 'postscript') {
                        const section = this.tocContent.querySelector(`.toc-nested-section[data-section="${chapter.section}"]`);
                        if (section) {
                            const sectionHeader = section.querySelector('.toc-nested-header');
                            const chaptersContainer = section.querySelector('.toc-nested-chapters');
                            if (sectionHeader && chaptersContainer && chaptersContainer.classList.contains('collapsed')) {
                                this.toggleNestedSection(chapter.section, sectionHeader, chaptersContainer);
                            }
                        }
                    }
                }
            } else if (isChapterComplete(chapterId)) {
                item.classList.add('completed');
                indicator.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            }
        });
    }

    // Update navigation button states
    updateNavigationState() {
        const mode = window.readingModeManager?.getMode() || 'scroll';

        if (mode === 'page') {
            // Page mode: disable based on pages
            const isFirstChapter = this.currentChapterId <= 1;
            const isFirstPage = reader.isFirstPage ? reader.isFirstPage() : true;
            this.prevBtn.disabled = isFirstChapter && isFirstPage;

            const isLastChapter = this.currentChapterId >= getChapterCount();
            const isLastPage = reader.isLastPage ? reader.isLastPage() : false;
            this.nextBtn.disabled = isLastChapter && isLastPage;
        } else {
            // Scroll mode: disable based on chapters only
            this.prevBtn.disabled = this.currentChapterId <= 1;
            this.nextBtn.disabled = this.currentChapterId >= getChapterCount();
        }
    }

    // Navigate to previous page or chapter
    goToPrevious() {
        const mode = window.readingModeManager?.getMode() || 'scroll';

        if (mode === 'page') {
            // Page mode: go to previous page, then previous chapter
            if (!reader.prevPage()) {
                if (this.currentChapterId > 1) {
                    reader.loadChapter(this.currentChapterId - 1, 999);
                }
            }
        } else {
            // Scroll mode: go to previous chapter only
            if (this.currentChapterId > 1) {
                reader.loadChapter(this.currentChapterId - 1, 0);
            }
        }
    }

    // Navigate to next page or chapter
    goToNext() {
        const mode = window.readingModeManager?.getMode() || 'scroll';

        if (mode === 'page') {
            // Page mode: go to next page, then next chapter
            if (!reader.nextPage()) {
                if (this.currentChapterId < getChapterCount()) {
                    reader.loadChapter(this.currentChapterId + 1, 0);
                }
            }
        } else {
            // Scroll mode: go to next chapter only
            if (this.currentChapterId < getChapterCount()) {
                reader.loadChapter(this.currentChapterId + 1, 0);
            }
        }
    }

    // TOC actions
    openTOC() {
        this.tocSidebar.classList.add('open');
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeTOC() {
        this.tocSidebar.classList.remove('open');
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Keyboard navigation
    handleKeyPress(e) {
        if (this.tocSidebar.classList.contains('open') ||
            e.target.tagName === 'INPUT' ||
            e.target.tagName === 'TEXTAREA') {
            return;
        }

        switch(e.key) {
            case 'ArrowLeft':
            case 'h':
                e.preventDefault();
                this.goToPrevious();
                break;
            case 'ArrowRight':
            case 'l':
                e.preventDefault();
                this.goToNext();
                break;
            case 'Escape':
                e.preventDefault();
                this.closeTOC();
                break;
        }
    }

    // Swipe gestures for mobile
    setupSwipeGestures() {
        const readerEl = document.getElementById('reader');

        readerEl.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        readerEl.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });
    }

    handleSwipe() {
        const swipeThreshold = 100;
        const diff = this.touchStartX - this.touchEndX;

        if (diff > swipeThreshold) {
            this.goToNext();
        } else if (diff < -swipeThreshold) {
            this.goToPrevious();
        }
    }
}

// Export single instance
export const navigation = new Navigation();
