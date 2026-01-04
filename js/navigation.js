// Navigation - Chapter navigation and Table of Contents

import { CHAPTERS, getChapterCount, getChaptersByYear, calculateReadingTime, getIntroChapters, getPostscriptChapters, getSortedYears } from '../data/chapters.js';
import { reader } from './reader.js';
import { isChapterComplete, calculateOverallProgress } from './storage.js';
import { photoGallery } from './photoGallery.js';
import { getAllGalleries } from '../data/photos.js';
import { blogService } from './blog.js';
import { guestbook } from './guestbook.js';
import { bookmarks } from './bookmarks.js';

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
        this.overallProgress = document.getElementById('overallProgress');

        // State
        this.currentChapterId = 1;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.expandedYears = new Set(); // Track which years are expanded
        this.expandedSections = new Set(); // Track which content sections are expanded
    }

    // Initialize navigation
    init() {
        // Build TOC with all sections
        this.buildTOC();

        // Set up event listeners
        this.prevBtn.addEventListener('click', () => this.goToPreviousChapter());
        this.nextBtn.addEventListener('click', () => this.goToNextChapter());
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
            { id: 'blog', label: 'BL<span class="record-o">O</span>G', type: 'link', url: 'https://anthonyfenech.substack.com' },
            { id: 'about', label: 'AB<span class="record-o">O</span>UT', type: 'link', comingSoon: true },
            { id: 'audio', label: 'AUDI<span class="record-o">O</span>', type: 'link', comingSoon: true },
            { id: 'photo', label: 'PH<span class="record-o">O</span>T<span class="record-o">O</span>S', type: 'dropdown' }
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
        sectionTitle.innerHTML = 'B<span class="record-o">O</span><span class="record-o">O</span>K';

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

    // Build the content inside BOOK (INTRO, years, POSTSCRIPT)
    buildBookContent(container) {
        // 1. INTRO section
        const introChapters = getIntroChapters();
        container.appendChild(this.createNestedCollapsibleSection('intro', 'INTRO', introChapters));

        // 2. Year sections
        const chaptersByYear = getChaptersByYear();
        const years = getSortedYears();

        years.forEach(year => {
            const chapters = chaptersByYear[year] || [];
            container.appendChild(this.createNestedYearSection(year, chapters));
        });

        // 3. POSTSCRIPT section
        const postscriptChapters = getPostscriptChapters();
        container.appendChild(this.createNestedCollapsibleSection('postscript', 'POSTSCRIPT', postscriptChapters));
    }

    // Create a nested collapsible section inside BOOK (for INTRO, POSTSCRIPT)
    createNestedCollapsibleSection(sectionId, labelHtml, chapters) {
        const section = document.createElement('div');
        section.className = 'toc-nested-section';
        section.dataset.section = sectionId;

        const sectionHeader = document.createElement('div');
        sectionHeader.className = 'toc-nested-header';

        const sectionTitle = document.createElement('h4');
        sectionTitle.className = 'toc-nested-title';
        sectionTitle.innerHTML = labelHtml;

        sectionHeader.appendChild(sectionTitle);

        const chaptersContainer = document.createElement('div');
        chaptersContainer.className = 'toc-nested-chapters collapsed';

        chapters.forEach(chapter => {
            chaptersContainer.appendChild(this.createNestedChapterItem(chapter));
        });

        sectionHeader.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleNestedSection(sectionId, sectionHeader, chaptersContainer);
        });

        section.appendChild(sectionHeader);
        section.appendChild(chaptersContainer);

        return section;
    }

    // Create a nested year section inside BOOK
    createNestedYearSection(year, chapters) {
        const section = document.createElement('div');
        section.className = 'toc-nested-section';
        section.dataset.year = year;

        const sectionHeader = document.createElement('div');
        sectionHeader.className = 'toc-nested-header';

        const sectionTitle = document.createElement('h4');
        sectionTitle.className = 'toc-nested-title';
        sectionTitle.textContent = `${year} SEASON`;

        sectionHeader.appendChild(sectionTitle);

        const chaptersContainer = document.createElement('div');
        chaptersContainer.className = 'toc-nested-chapters collapsed';

        chapters.forEach(chapter => {
            chaptersContainer.appendChild(this.createNestedChapterItem(chapter));
        });

        if (chapters.length > 0) {
            sectionHeader.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleYear(year, sectionHeader, chaptersContainer);
            });
        } else {
            sectionHeader.classList.add('disabled');
        }

        section.appendChild(sectionHeader);
        section.appendChild(chaptersContainer);

        return section;
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

    // Create a top section (BLOG, ABOUT, AUDIO, PHOTOS)
    createTopSection(section) {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'toc-top-section';
        sectionDiv.dataset.section = section.id;

        const sectionHeader = document.createElement('div');
        sectionHeader.className = section.type === 'dropdown' ? 'toc-top-header' : 'toc-top-header toc-top-link';

        const sectionTitle = document.createElement('h3');
        sectionTitle.className = 'toc-top-title';
        sectionTitle.innerHTML = section.label;

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
            { id: 'comments', label: 'C<span class="record-o">O</span>MMENTS', type: 'dropdown' },
            { id: 'contact', label: 'C<span class="record-o">O</span>NTACT', type: 'link', comingSoon: true }
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

    // Create a collapsible section (INTRO or POSTSCRIPT)
    createCollapsibleSection(sectionId, labelHtml, chapters) {
        const section = document.createElement('div');
        section.className = 'toc-year-section';
        section.dataset.section = sectionId;

        // Section header (clickable to expand/collapse)
        const sectionHeader = document.createElement('div');
        sectionHeader.className = 'toc-year-header';

        const sectionTitle = document.createElement('h3');
        sectionTitle.className = 'toc-year-title';
        sectionTitle.innerHTML = labelHtml;

        sectionHeader.appendChild(sectionTitle);

        // Chapters container
        const chaptersContainer = document.createElement('div');
        chaptersContainer.className = 'toc-year-chapters collapsed';

        // Build chapter items
        chapters.forEach(chapter => {
            const item = this.createNestedChapterItem(chapter);
            chaptersContainer.appendChild(item);
        });

        // Click handler
        sectionHeader.addEventListener('click', () => {
            this.toggleCollapsibleSection(sectionId, sectionHeader, chaptersContainer);
        });

        section.appendChild(sectionHeader);
        section.appendChild(chaptersContainer);

        return section;
    }

    // Create BOOKMARKS section
    createBookmarksSection() {
        const section = document.createElement('div');
        section.className = 'toc-year-section bookmarks-section';
        section.dataset.section = 'bookmarks';

        // Section header
        const sectionHeader = document.createElement('div');
        sectionHeader.className = 'toc-year-header';

        const sectionTitle = document.createElement('h3');
        sectionTitle.className = 'toc-year-title';
        sectionTitle.innerHTML = 'B<span class="record-o">O</span><span class="record-o">O</span>KMARKS';

        const countBadge = document.createElement('span');
        countBadge.className = 'bookmarks-count';
        countBadge.id = 'bookmarksCount';
        const count = bookmarks.getCount();
        countBadge.textContent = count > 0 ? `(${count})` : '';

        sectionHeader.appendChild(sectionTitle);
        sectionHeader.appendChild(countBadge);

        // Bookmarks container
        const bookmarksContainer = document.createElement('div');
        bookmarksContainer.className = 'toc-year-chapters collapsed';
        bookmarksContainer.id = 'bookmarksContainer';

        // Click handler
        sectionHeader.addEventListener('click', () => {
            this.toggleBookmarksSection(sectionHeader, bookmarksContainer);
        });

        // Listen for bookmark changes
        window.addEventListener('bookmarksChanged', () => {
            this.updateBookmarksCount();
            if (this.expandedSections.has('bookmarks')) {
                this.renderBookmarks(bookmarksContainer);
            }
        });

        section.appendChild(sectionHeader);
        section.appendChild(bookmarksContainer);

        return section;
    }

    // Toggle bookmarks section
    toggleBookmarksSection(sectionHeader, bookmarksContainer) {
        if (this.expandedSections.has('bookmarks')) {
            this.expandedSections.delete('bookmarks');
            bookmarksContainer.classList.add('collapsed');
            sectionHeader.classList.remove('expanded');
        } else {
            this.expandedSections.add('bookmarks');
            bookmarksContainer.classList.remove('collapsed');
            sectionHeader.classList.add('expanded');
            this.renderBookmarks(bookmarksContainer);
        }
    }

    // Render bookmarks list
    renderBookmarks(container) {
        bookmarks.renderBookmarksList(container, (chapterId) => {
            reader.loadChapter(chapterId);
            this.closeTOC();
        });
    }

    // Update bookmarks count badge
    updateBookmarksCount() {
        const countBadge = document.getElementById('bookmarksCount');
        if (countBadge) {
            const count = bookmarks.getCount();
            countBadge.textContent = count > 0 ? `(${count})` : '';
        }
    }

    // Toggle collapsible section (INTRO/POSTSCRIPT)
    toggleCollapsibleSection(sectionId, sectionHeader, chaptersContainer) {
        if (this.expandedSections.has(sectionId)) {
            // Collapse
            this.expandedSections.delete(sectionId);
            chaptersContainer.classList.add('collapsed');
            sectionHeader.classList.remove('expanded');
        } else {
            // Expand
            this.expandedSections.add(sectionId);
            chaptersContainer.classList.remove('collapsed');
            sectionHeader.classList.add('expanded');
        }
    }

    // Create a standalone chapter item (for opening/closing chapters)
    createStandaloneChapterItem(chapter) {
        const item = document.createElement('div');
        item.className = 'toc-chapter toc-chapter-standalone';
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

        const readTime = document.createElement('span');
        readTime.className = 'toc-read-time';
        const minutes = calculateReadingTime(chapter.wordCount);
        readTime.textContent = `${minutes} min`;

        titleRow.appendChild(title);
        titleRow.appendChild(readTime);

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

    // Create a nested chapter item (for year sections)
    createNestedChapterItem(chapter) {
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

        const readTime = document.createElement('span');
        readTime.className = 'toc-read-time';
        const minutes = calculateReadingTime(chapter.wordCount);
        readTime.textContent = `${minutes} min`;

        titleRow.appendChild(title);
        titleRow.appendChild(readTime);

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

    // Toggle year section
    toggleYear(year, yearHeader, chaptersContainer) {
        if (this.expandedYears.has(year)) {
            // Collapse
            this.expandedYears.delete(year);
            chaptersContainer.classList.add('collapsed');
            yearHeader.classList.remove('expanded');
        } else {
            // Expand
            this.expandedYears.add(year);
            chaptersContainer.classList.remove('collapsed');
            yearHeader.classList.add('expanded');
        }
    }


    // Toggle content section
    toggleSection(sectionId, sectionHeader, sectionContent) {
        if (this.expandedSections.has(sectionId)) {
            // Collapse
            this.expandedSections.delete(sectionId);
            sectionContent.classList.add('collapsed');
            sectionHeader.classList.remove('expanded');
        } else {
            // Expand
            this.expandedSections.add(sectionId);
            sectionContent.classList.remove('collapsed');
            sectionHeader.classList.add('expanded');

            // Initialize photo gallery if needed
            if (sectionId === 'photo' && sectionContent.dataset.needsInit === 'true') {
                this.initializePhotoGallery(sectionContent);
                delete sectionContent.dataset.needsInit;
            }

            // Initialize blog if needed
            if (sectionId === 'blog' && sectionContent.dataset.needsInit === 'true') {
                this.initializeBlog(sectionContent);
                delete sectionContent.dataset.needsInit;
            }

            // Initialize guestbook if needed
            if (sectionId === 'comments' && sectionContent.dataset.needsInit === 'true') {
                guestbook.render(sectionContent);
                delete sectionContent.dataset.needsInit;
            }
        }
    }

    // Initialize blog posts in the sidebar
    async initializeBlog(container) {
        try {
            const posts = await blogService.fetchPosts();

            // Clear loading state
            container.innerHTML = '';

            if (posts.length === 0) {
                // Show empty state with subscribe form
                this.renderBlogEmptyState(container);
            } else {
                // Render blog posts
                this.renderBlogPosts(container, posts);
            }
        } catch (error) {
            console.error('Error loading blog:', error);
            container.innerHTML = '';
            this.renderBlogEmptyState(container);
        }
    }

    // Render blog posts
    renderBlogPosts(container, posts) {
        const blogContainer = document.createElement('div');
        blogContainer.className = 'blog-posts-container';

        posts.forEach(post => {
            const postCard = document.createElement('article');
            postCard.className = 'blog-post-card';

            const postTitle = document.createElement('h4');
            postTitle.className = 'blog-post-title';
            postTitle.textContent = post.title;

            const postDate = document.createElement('time');
            postDate.className = 'blog-post-date';
            postDate.textContent = post.pubDateFormatted;
            postDate.dateTime = post.pubDate.toISOString();

            const postExcerpt = document.createElement('p');
            postExcerpt.className = 'blog-post-excerpt';
            postExcerpt.textContent = post.excerpt;

            const postLink = document.createElement('a');
            postLink.className = 'blog-post-link';
            postLink.href = post.link;
            postLink.target = '_blank';
            postLink.rel = 'noopener noreferrer';
            postLink.innerHTML = 'Read on Substack <span class="arrow">→</span>';

            postCard.appendChild(postTitle);
            postCard.appendChild(postDate);
            postCard.appendChild(postExcerpt);
            postCard.appendChild(postLink);

            // Make whole card clickable
            postCard.addEventListener('click', (e) => {
                if (e.target !== postLink) {
                    window.open(post.link, '_blank', 'noopener,noreferrer');
                }
            });

            blogContainer.appendChild(postCard);
        });

        // Add subscribe link at bottom
        const subscribeSection = document.createElement('div');
        subscribeSection.className = 'blog-subscribe-link';
        subscribeSection.innerHTML = `
            <a href="https://anthonyfenech.substack.com" target="_blank" rel="noopener noreferrer">
                Subscribe on Substack →
            </a>
        `;

        container.appendChild(blogContainer);
        container.appendChild(subscribeSection);
    }

    // Render empty state for blog
    renderBlogEmptyState(container) {
        const emptyState = document.createElement('div');
        emptyState.className = 'blog-empty-state';

        const message = document.createElement('p');
        message.className = 'blog-empty-message';
        message.textContent = 'New posts coming soon';

        const subscribeFrame = document.createElement('iframe');
        subscribeFrame.className = 'blog-subscribe-embed';
        subscribeFrame.src = 'https://anthonyfenech.substack.com/embed';
        subscribeFrame.width = '100%';
        subscribeFrame.height = '150';
        subscribeFrame.frameBorder = '0';
        subscribeFrame.scrolling = 'no';

        emptyState.appendChild(message);
        emptyState.appendChild(subscribeFrame);
        container.appendChild(emptyState);
    }

    // Initialize photo gallery in the sidebar
    initializePhotoGallery(container) {
        const galleries = getAllGalleries();
        this.expandedGalleries = new Set(); // Track expanded galleries

        // Render each gallery with collapsible header
        galleries.forEach(gallery => {
            const gallerySection = document.createElement('div');
            gallerySection.className = 'gallery-section';
            gallerySection.dataset.galleryId = gallery.id;

            // Gallery header (clickable to expand/collapse)
            const galleryHeader = document.createElement('div');
            galleryHeader.className = 'gallery-section-header';

            const galleryTitle = document.createElement('h4');
            galleryTitle.className = 'gallery-section-title';
            galleryTitle.textContent = gallery.title.toUpperCase();

            galleryHeader.appendChild(galleryTitle);

            // Gallery content container
            const galleryContent = document.createElement('div');
            galleryContent.className = 'gallery-section-content collapsed';
            galleryContent.id = `gallery-content-${gallery.id}`;

            // Only add click handler if gallery has photos
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
            // Collapse
            this.expandedGalleries.delete(galleryId);
            galleryContent.classList.add('collapsed');
            galleryHeader.classList.remove('expanded');
        } else {
            // Expand
            this.expandedGalleries.add(galleryId);
            galleryContent.classList.remove('collapsed');
            galleryHeader.classList.add('expanded');

            // Render gallery grid if not already rendered
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

            // Remove all classes
            item.classList.remove('active', 'completed');
            indicator.innerHTML = '';

            // Add current chapter indicator
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
                        // Year section (nested inside BOOK)
                        const yearSection = this.tocContent.querySelector(`[data-year="${chapter.year}"]`);
                        if (yearSection) {
                            const yearHeader = yearSection.querySelector('.toc-nested-header');
                            const chaptersContainer = yearSection.querySelector('.toc-nested-chapters');
                            if (yearHeader && chaptersContainer && chaptersContainer.classList.contains('collapsed')) {
                                this.toggleYear(chapter.year.toString(), yearHeader, chaptersContainer);
                            }
                        }
                    } else if (chapter.section === 'intro' || chapter.section === 'postscript') {
                        // INTRO or POSTSCRIPT section (nested inside BOOK)
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
            }
            // Add completion checkmark
            else if (isChapterComplete(chapterId)) {
                item.classList.add('completed');
                indicator.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            }
        });

        // Update overall progress
        const progress = calculateOverallProgress(getChapterCount());
        this.overallProgress.textContent = `Overall Progress: ${progress}%`;
    }

    // Update navigation button states
    updateNavigationState() {
        // Disable prev button on first chapter
        if (this.currentChapterId <= 1) {
            this.prevBtn.disabled = true;
        } else {
            this.prevBtn.disabled = false;
        }

        // Disable next button on last chapter
        if (this.currentChapterId >= getChapterCount()) {
            this.nextBtn.disabled = true;
        } else {
            this.nextBtn.disabled = false;
        }
    }

    // Navigation actions
    goToPreviousChapter() {
        if (this.currentChapterId > 1) {
            reader.loadChapter(this.currentChapterId - 1);
        }
    }

    goToNextChapter() {
        if (this.currentChapterId < getChapterCount()) {
            reader.loadChapter(this.currentChapterId + 1);
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
        // Ignore if TOC is open or user is typing
        if (this.tocSidebar.classList.contains('open') ||
            e.target.tagName === 'INPUT' ||
            e.target.tagName === 'TEXTAREA') {
            return;
        }

        switch(e.key) {
            case 'ArrowLeft':
            case 'h':
                e.preventDefault();
                this.goToPreviousChapter();
                break;
            case 'ArrowRight':
            case 'l':
                e.preventDefault();
                this.goToNextChapter();
                break;
            case 'Escape':
                e.preventDefault();
                this.closeTOC();
                break;
        }
    }

    // Swipe gestures for mobile
    setupSwipeGestures() {
        const reader = document.getElementById('reader');

        reader.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        reader.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });
    }

    handleSwipe() {
        const swipeThreshold = 100; // Minimum distance for swipe
        const diff = this.touchStartX - this.touchEndX;

        // Swipe left = next chapter
        if (diff > swipeThreshold) {
            this.goToNextChapter();
        }
        // Swipe right = previous chapter
        else if (diff < -swipeThreshold) {
            this.goToPreviousChapter();
        }
    }
}

// Export single instance
export const navigation = new Navigation();
