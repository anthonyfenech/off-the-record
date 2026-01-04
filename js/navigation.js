// Navigation.js - Handles menu and chapter navigation

class Navigation {
    constructor() {
        this.currentChapter = null;
        this.menuOpen = false;
        this.init();
    }

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
        
        // BLOG
        this.createMediaSection(nav, 'BLOG', 'blog', true);
        
        // ABOUT
        this.createMediaSection(nav, 'ABOUT', 'about', true);
        
        // AUDIO
        this.createMediaSection(nav, 'AUDIO', 'audio', true);
        
        // PHOTOS
        this.createMediaSection(nav, 'PHOTOS', 'photos', true);

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

    createCollapsibleSection(parent, title, id, isLargeFont, contentGenerator, sizeClass = '') {
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
        
        const content = document.createElement('div');
        content.className = 'collapsible-content';
        content.style.display = 'none';
        
        header.addEventListener('click', () => {
            this.toggleCollapsibleSection(header, content);
        });
        
        section.appendChild(header);
        
        if (contentGenerator) {
            const generatedContent = contentGenerator();
            content.appendChild(generatedContent);
        }
        
        section.appendChild(content);
        parent.appendChild(section);
        
        return section;
    }

    toggleCollapsibleSection(header, content) {
        const isOpen = content.style.display !== 'none';
        
        if (isOpen) {
            content.style.display = 'none';
            header.querySelector('.collapse-arrow').textContent = '▼';
        } else {
            content.style.display = 'block';
            header.querySelector('.collapse-arrow').textContent = '▲';
        }
    }

    createChapterList(chapterNumbers) {
        const container = document.createElement('div');
        container.className = 'chapter-list';
        
        chapterNumbers.forEach(num => {
            const chapter = window.chapters.find(c => c.id === num);
            if (chapter) {
                const item = document.createElement('div');
                item.className = 'nav-item chapter-item';
                item.textContent = chapter.title;
                item.addEventListener('click', () => {
                    this.loadChapter(num);
                    this.closeMenu();
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
        
        return container;
    }

    createMediaSection(parent, title, id, isLargeFont) {
        const item = document.createElement('div');
        item.className = 'nav-item';
        if (isLargeFont) item.classList.add('large-font');
        item.innerHTML = this.addRecordDots(title);
        item.addEventListener('click', () => {
            this.loadMediaSection(id);
            this.closeMenu();
        });
        parent.appendChild(item);
    }

    createGuestbookSection() {
        const container = document.createElement('div');
        container.className = 'guestbook-container';
        
        // Header
        const header = document.createElement('div');
        header.className = 'guestbook-header';
        header.textContent = 'Sign the guestbook. Let us know you stopped by.';
        container.appendChild(header);
        
        // Form
        const form = document.createElement('form');
        form.className = 'guestbook-form';
        form.innerHTML = `
            <input type="text" id="guestName" placeholder="Name *" required>
            <input type="email" id="guestEmail" placeholder="Email *" required>
            <input type="text" id="guestHometown" placeholder="Hometown (e.g., Detroit, MI)">
            <textarea id="guestComments" placeholder="Comments" rows="4"></textarea>
            <button type="submit" class="guestbook-submit">Sign the Guestbook</button>
        `;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitGuestbookEntry();
        });
        
        container.appendChild(form);
        
        // Entries
        const entriesContainer = document.createElement('div');
        entriesContainer.className = 'guestbook-entries';
        entriesContainer.id = 'guestbookEntries';
        container.appendChild(entriesContainer);
        
        this.loadGuestbookEntries();
        
        return container;
    }

    submitGuestbookEntry() {
        const name = document.getElementById('guestName').value;
        const email = document.getElementById('guestEmail').value;
        const hometown = document.getElementById('guestHometown').value;
        const comments = document.getElementById('guestComments').value;
        
        const entry = {
            name,
            email,
            hometown,
            comments,
            timestamp: new Date().toISOString()
        };
        
        // Get existing entries
        let entries = JSON.parse(localStorage.getItem('guestbookEntries') || '[]');
        entries.unshift(entry); // Add to beginning
        entries = entries.slice(0, 20); // Keep only 20 most recent
        
        localStorage.setItem('guestbookEntries', JSON.stringify(entries));
        
        // Clear form
        document.getElementById('guestName').value = '';
        document.getElementById('guestEmail').value = '';
        document.getElementById('guestHometown').value = '';
        document.getElementById('guestComments').value = '';
        
        // Reload entries
        this.loadGuestbookEntries();
        
        alert('Thanks for signing!');
    }

    loadGuestbookEntries() {
        const container = document.getElementById('guestbookEntries');
        if (!container) return;
        
        const entries = JSON.parse(localStorage.getItem('guestbookEntries') || '[]');
        
        if (entries.length === 0) {
            container.innerHTML = '<p class="no-entries">No entries yet. Be the first!</p>';
            return;
        }
        
        container.innerHTML = entries.map(entry => `
            <div class="guestbook-entry">
                <div class="entry-header">
                    <strong>${this.escapeHtml(entry.name)}</strong>
                    ${entry.hometown ? ` - ${this.escapeHtml(entry.hometown)}` : ''}
                </div>
                ${entry.comments ? `<div class="entry-comments">"${this.escapeHtml(entry.comments)}"</div>` : ''}
            </div>
        `).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    addRecordDots(text) {
        // Add red dots to O's in specific sections
        const shouldHaveDots = ['BOOK', 'BLOG', 'ABOUT', 'AUDIO', 'PHOTOS', 'COMMENTS', 'CONTACT'].includes(text);
        
        if (!shouldHaveDots) {
            return text;
        }
        
        return text.split('').map(char => {
            if (char === 'O') {
                return '<span class="record-button">O</span>';
            }
            return char;
        }).join('');
    }

    loadChapter(id) {
        const chapter = window.chapters.find(c => c.id === id);
        if (!chapter) return;
        
        this.currentChapter = id;
        localStorage.setItem('lastChapter', id);
        
        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="chapter-header">
                <h2>${chapter.title}</h2>
            </div>
            <div class="chapter-body">
                ${chapter.content}
            </div>
            <div class="chapter-navigation">
                <button class="nav-button prev" ${id === 1 ? 'disabled' : ''} onclick="navigation.previousChapter()">
                    PREVIOUS
                </button>
                <button class="nav-button next" ${id === 32 ? 'disabled' : ''} onclick="navigation.nextChapter()">
                    NEXT
                </button>
            </div>
        `;
        
        this.updateProgress();
    }

    loadMediaSection(sectionId) {
        const content = document.getElementById('content');
        
        switch(sectionId) {
            case 'blog':
                content.innerHTML = '<div class="media-section"><h2>BLOG</h2><p>Coming soon...</p></div>';
                break;
            case 'about':
                content.innerHTML = '<div class="media-section"><h2>ABOUT</h2><p>Book information coming soon...</p></div>';
                break;
            case 'audio':
                content.innerHTML = '<div class="media-section"><h2>AUDIO</h2><p>Audiobook content coming soon...</p></div>';
                break;
            case 'photos':
                this.loadPhotos();
                break;
            case 'contact':
                content.innerHTML = '<div class="media-section"><h2>CONTACT</h2><p>Contact information coming soon...</p></div>';
                break;
        }
        
        this.currentChapter = null;
    }

    loadPhotos() {
        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="media-section">
                <h2>PHOTOS</h2>
                <div class="photo-grid" id="photoGrid"></div>
            </div>
        `;
        
        const grid = document.getElementById('photoGrid');
        
        if (!window.photos || window.photos.length === 0) {
            grid.innerHTML = '<p>No photos available yet.</p>';
            return;
        }
        
        window.photos.forEach(photo => {
            const item = document.createElement('div');
            item.className = 'photo-item';
            item.innerHTML = `
                <img src="${photo.thumb || photo.url}" alt="${photo.caption}" 
                     onclick="navigation.viewPhoto('${photo.url}', '${photo.caption}')">
                <p>${photo.caption}</p>
            `;
            grid.appendChild(item);
        });
    }

    viewPhoto(url, caption) {
        const modal = document.createElement('div');
        modal.className = 'photo-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
                <img src="${url}" alt="${caption}">
                <p>${caption}</p>
            </div>
        `;
        document.body.appendChild(modal);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    loadLastChapter() {
        const lastChapter = localStorage.getItem('lastChapter');
        if (lastChapter) {
            this.loadChapter(parseInt(lastChapter));
        } else {
            this.loadChapter(1);
        }
    }

    previousChapter() {
        if (this.currentChapter > 1) {
            this.loadChapter(this.currentChapter - 1);
            window.scrollTo(0, 0);
        }
    }

    nextChapter() {
        if (this.currentChapter < 32) {
            this.loadChapter(this.currentChapter + 1);
            window.scrollTo(0, 0);
        }
    }

    attachEventListeners() {
        document.getElementById('menuButton').addEventListener('click', () => {
            this.toggleMenu();
        });
        
        document.getElementById('closeMenu').addEventListener('click', () => {
            this.closeMenu();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            const menu = document.getElementById('menu');
            const menuButton = document.getElementById('menuButton');
            
            if (this.menuOpen && !menu.contains(e.target) && !menuButton.contains(e.target)) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        const menu = document.getElementById('menu');
        this.menuOpen = !this.menuOpen;
        menu.classList.toggle('open', this.menuOpen);
    }

    closeMenu() {
        const menu = document.getElementById('menu');
        this.menuOpen = false;
        menu.classList.remove('open');
    }

    updateProgress() {
        const totalChapters = 32;
        const chaptersRead = new Set(
            Object.keys(localStorage)
                .filter(key => key.startsWith('chapter_') && localStorage[key] === 'read')
                .map(key => parseInt(key.replace('chapter_', '')))
        ).size;
        
        const percentage = Math.round((chaptersRead / totalChapters) * 100);
        document.getElementById('progressBar').textContent = `Overall Progress: ${percentage}%`;
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.navigation = new Navigation();
});
