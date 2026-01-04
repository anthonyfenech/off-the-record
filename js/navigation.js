// Navigation - Chapter navigation and Table of Contents

import { CHAPTERS, getChapterCount, getChaptersByYear, calculateReadingTime, getOpeningChapters, getClosingChapters, getSortedYears } from '../data/chapters.js';
import { reader } from './reader.js';
import { isChapterComplete, calculateOverallProgress } from './storage.js';
import { photoGallery } from './photoGallery.js';
import { getAllGalleries } from '../data/photos.js';
import { blogService } from './blog.js';

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
        // Build TOC with chapters
        this.buildTOC();

        // Build additional content sections
        this.buildContentSections();

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

    // Build Table of Contents with opening chapters, year sections, and closing chapters
    buildTOC() {
        const fragment = document.createDocumentFragment();

        // 1. Add opening chapters (standalone, not nested)
        const openingChapters = getOpeningChapters();
        openingChapters.forEach(chapter => {
            fragment.appendChild(this.createStandaloneChapterItem(chapter));
        });

        // 2. Add year sections with nested chapters
        const chaptersByYear = getChaptersByYear();
        const years = getSortedYears();

        years.forEach(year => {
            const chapters = chaptersByYear[year] || [];

            // Create year section
            const yearSection = document.createElement('div');
            yearSection.className = 'toc-year-section';
            yearSection.dataset.year = year;

            // Year header (clickable to expand/collapse)
            const yearHeader = document.createElement('div');
            yearHeader.className = 'toc-year-header';

            const yearTitle = document.createElement('h3');
            yearTitle.className = 'toc-year-title';
            yearTitle.textContent = `${year} SEASON`;

            const yearCount = document.createElement('span');
            yearCount.className = 'toc-year-count';
            if (chapters.length === 0) {
                yearCount.textContent = '(coming soon)';
                yearCount.classList.add('coming-soon-text');
            } else {
                yearCount.textContent = `(${chapters.length} ${chapters.length === 1 ? 'chapter' : 'chapters'})`;
            }

            yearHeader.appendChild(yearTitle);
            yearHeader.appendChild(yearCount);

            // Year chapters container
            const chaptersContainer = document.createElement('div');
            chaptersContainer.className = 'toc-year-chapters collapsed';

            // Build chapter items (if any)
            chapters.forEach(chapter => {
                const item = this.createNestedChapterItem(chapter);
                chaptersContainer.appendChild(item);
            });

            // Year header click handler (only if has chapters)
            if (chapters.length > 0) {
                yearHeader.addEventListener('click', () => {
                    this.toggleYear(year, chaptersContainer);
                });
            } else {
                yearHeader.classList.add('disabled');
            }

            yearSection.appendChild(yearHeader);
            yearSection.appendChild(chaptersContainer);
            fragment.appendChild(yearSection);
        });

        // 3. Add closing chapters (standalone, not nested)
        const closingChapters = getClosingChapters();
        closingChapters.forEach(chapter => {
            fragment.appendChild(this.createStandaloneChapterItem(chapter));
        });

        this.tocContent.appendChild(fragment);

        // Add a divider between chapters and other content sections
        const divider = document.createElement('div');
        divider.className = 'toc-divider';
        this.tocContent.appendChild(divider);
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

        const teaser = document.createElement('div');
        teaser.className = 'toc-chapter-teaser';
        teaser.textContent = chapter.teaser;

        info.appendChild(titleRow);
        info.appendChild(teaser);

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
    toggleYear(year, chaptersContainer) {
        if (this.expandedYears.has(year)) {
            // Collapse
            this.expandedYears.delete(year);
            chaptersContainer.classList.add('collapsed');
        } else {
            // Expand
            this.expandedYears.add(year);
            chaptersContainer.classList.remove('collapsed');
        }
    }

    // Build additional content sections (Blog, Podcast, etc.)
    buildContentSections() {
        const sections = [
            { id: 'blog', label: 'BL<span class="record-btn" aria-label="O"></span>G', icon: '📝' },
            { id: 'podcast', label: 'P<span class="record-btn" aria-label="O"></span>DCAST', icon: '🎙️' },
            { id: 'audio', label: 'AUDI<span class="record-btn" aria-label="O"></span>', icon: '🔊' },
            { id: 'video', label: 'VIDE<span class="record-btn" aria-label="O"></span>', icon: '🎬' },
            { id: 'photo', label: 'PH<span class="record-btn" aria-label="O"></span>T<span class="record-btn" aria-label="O"></span>S', icon: '📷' },
            { id: 'support', label: 'SUPP<span class="record-btn" aria-label="O"></span>RT', icon: '💝' }
        ];

        const fragment = document.createDocumentFragment();

        sections.forEach(section => {
            // Create section wrapper
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'toc-content-section';
            sectionDiv.dataset.section = section.id;

            // Section header (clickable to expand/collapse)
            const sectionHeader = document.createElement('div');
            sectionHeader.className = 'toc-section-header';

            const sectionTitle = document.createElement('h3');
            sectionTitle.className = 'toc-section-title';
            sectionTitle.innerHTML = section.label;

            const sectionIcon = document.createElement('span');
            sectionIcon.className = 'toc-section-icon';
            sectionIcon.textContent = section.icon;

            sectionHeader.appendChild(sectionIcon);
            sectionHeader.appendChild(sectionTitle);

            // Section content
            const sectionContent = document.createElement('div');
            sectionContent.className = 'toc-section-content collapsed';
            sectionContent.id = `toc-section-${section.id}`;

            // Photo section gets special treatment - render gallery
            if (section.id === 'photo') {
                // Content will be rendered when section is first expanded
                sectionContent.dataset.needsInit = 'true';
            } else if (section.id === 'blog') {
                // Blog section - content will be loaded when expanded
                sectionContent.dataset.needsInit = 'true';
                // Show loading state initially
                const loading = document.createElement('div');
                loading.className = 'blog-loading';
                loading.textContent = 'Loading posts...';
                sectionContent.appendChild(loading);
            } else {
                // Other sections show "Coming Soon"
                const comingSoon = document.createElement('div');
                comingSoon.className = 'coming-soon';
                comingSoon.textContent = 'Coming Soon';
                sectionContent.appendChild(comingSoon);
            }

            // Click handler for header
            sectionHeader.addEventListener('click', () => {
                this.toggleSection(section.id, sectionContent);
            });

            sectionDiv.appendChild(sectionHeader);
            sectionDiv.appendChild(sectionContent);
            fragment.appendChild(sectionDiv);
        });

        this.tocContent.appendChild(fragment);
    }

    // Toggle content section
    toggleSection(sectionId, sectionContent) {
        if (this.expandedSections.has(sectionId)) {
            // Collapse
            this.expandedSections.delete(sectionId);
            sectionContent.classList.add('collapsed');
        } else {
            // Expand
            this.expandedSections.add(sectionId);
            sectionContent.classList.remove('collapsed');

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

            const galleryInfo = document.createElement('div');
            galleryInfo.className = 'gallery-section-info';

            const galleryTitle = document.createElement('h4');
            galleryTitle.className = 'gallery-section-title';
            galleryTitle.textContent = gallery.title.toUpperCase();

            const galleryCount = document.createElement('span');
            galleryCount.className = 'gallery-section-count';

            if (gallery.comingSoon) {
                galleryCount.textContent = 'Coming Soon';
                galleryCount.classList.add('coming-soon-badge');
            } else {
                galleryCount.textContent = `${gallery.photos.length} photos`;
            }

            galleryInfo.appendChild(galleryTitle);
            galleryInfo.appendChild(galleryCount);
            galleryHeader.appendChild(galleryInfo);

            // Gallery content container
            const galleryContent = document.createElement('div');
            galleryContent.className = 'gallery-section-content collapsed';
            galleryContent.id = `gallery-content-${gallery.id}`;

            // Only add click handler if gallery has photos
            if (!gallery.comingSoon) {
                // Click handler for header
                galleryHeader.addEventListener('click', () => {
                    this.toggleGallery(gallery.id, galleryContent);
                });
                galleryHeader.style.cursor = 'pointer';
            } else {
                // Disable interaction for coming soon galleries
                galleryHeader.classList.add('disabled');
            }

            gallerySection.appendChild(galleryHeader);
            gallerySection.appendChild(galleryContent);
            container.appendChild(gallerySection);
        });
    }

    // Toggle gallery expansion
    toggleGallery(galleryId, galleryContent) {
        const isExpanded = this.expandedGalleries.has(galleryId);

        if (isExpanded) {
            // Collapse
            this.expandedGalleries.delete(galleryId);
            galleryContent.classList.add('collapsed');
        } else {
            // Expand
            this.expandedGalleries.add(galleryId);
            galleryContent.classList.remove('collapsed');

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

                // Auto-expand the year containing current chapter
                const chapter = CHAPTERS.find(c => c.id === chapterId);
                if (chapter) {
                    const yearSection = this.tocContent.querySelector(`[data-year="${chapter.year}"]`);
                    if (yearSection) {
                        const chaptersContainer = yearSection.querySelector('.toc-year-chapters');
                        if (chaptersContainer && chaptersContainer.classList.contains('collapsed')) {
                            this.toggleYear(chapter.year.toString(), chaptersContainer);
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
