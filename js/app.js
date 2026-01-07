// Main app initialization

import { reader } from './reader.js';
import { navigation } from './navigation.js';
import { pwa } from './pwa.js';
import { photoGallery } from './photoGallery.js';
import { bookmarks } from './bookmarks.js';
import { CHAPTERS } from '../data/chapters.js';

class App {
    constructor() {
        this.isReady = false;
        this.bookmarkBtn = null;
        this.currentChapterId = 1;
    }

    // Initialize the app
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            this.start();
        }
    }

    // Start the app
    start() {
        console.log('OFF-THE-RECORD: Initializing...');

        // Check maintenance mode (skip if already on maintenance or admin page)
        if (localStorage.getItem('admin_maintenanceMode') === 'true') {
            const path = window.location.pathname;
            if (!path.includes('maintenance.html') && !path.includes('admin.html')) {
                window.location.href = './maintenance.html';
                return;
            }
        }

        try {
            // Initialize core modules
            reader.init();
            navigation.init();
            pwa.init();
            photoGallery.init();

            // Initialize bookmark button
            this.initBookmarkButton();

            // Initialize home link
            this.initHomeLink();

            this.isReady = true;
            console.log('OFF-THE-RECORD: Ready');

            // Dispatch ready event
            window.dispatchEvent(new Event('appReady'));
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.showError('Failed to load the app. Please refresh the page.');
        }
    }

    // Initialize home link click handler
    initHomeLink() {
        const homeLink = document.getElementById('homeLink');
        if (!homeLink) return;

        homeLink.addEventListener('click', (e) => {
            e.preventDefault();
            // Clear hash and navigate to home
            history.pushState(null, null, window.location.pathname);
            window.dispatchEvent(new HashChangeEvent('hashchange'));
        });
    }

    // Initialize bookmark button functionality
    initBookmarkButton() {
        this.bookmarkBtn = document.getElementById('bookmarkBtn');
        if (!this.bookmarkBtn) return;

        // Check if bookmarks are disabled via admin panel
        const bookmarksDisabled = localStorage.getItem('admin_allowBookmarks') === 'false';
        if (bookmarksDisabled) {
            this.bookmarkBtn.style.display = 'none';
            return;
        }

        // Click handler
        this.bookmarkBtn.addEventListener('click', () => {
            const chapter = CHAPTERS.find(c => c.id === this.currentChapterId);
            if (chapter) {
                // Get page info if in page mode
                let pageNumber = null;
                let totalPages = null;
                if (window.readerInstance) {
                    const pageInfo = window.readerInstance.getPaginationInfo();
                    if (pageInfo.totalPages > 0) {
                        pageNumber = pageInfo.currentPage;
                        totalPages = pageInfo.totalPages;
                    }
                }
                const isNowBookmarked = bookmarks.toggleBookmark(chapter.id, chapter.title, pageNumber, totalPages);
                this.updateBookmarkButtonState(isNowBookmarked);
            }
        });

        // Listen for chapter changes
        window.addEventListener('chapterLoaded', (e) => {
            this.currentChapterId = e.detail.chapterId;
            this.updateBookmarkButtonState(bookmarks.isBookmarked(this.currentChapterId));
        });

        // Listen for bookmark changes (in case removed from navigation)
        window.addEventListener('bookmarksChanged', () => {
            this.updateBookmarkButtonState(bookmarks.isBookmarked(this.currentChapterId));
        });

        // Set initial state
        this.updateBookmarkButtonState(bookmarks.isBookmarked(this.currentChapterId));
    }

    // Update bookmark button visual state
    updateBookmarkButtonState(isBookmarked) {
        if (!this.bookmarkBtn) return;

        if (isBookmarked) {
            this.bookmarkBtn.classList.add('active');
            this.bookmarkBtn.setAttribute('aria-label', 'Remove bookmark');
        } else {
            this.bookmarkBtn.classList.remove('active');
            this.bookmarkBtn.setAttribute('aria-label', 'Bookmark chapter');
        }
    }

    // Show error message
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = message;
        document.body.insertBefore(errorDiv, document.body.firstChild);
    }
}

// Create and initialize app
const app = new App();
app.init();

// Make app available globally for debugging
if (typeof window !== 'undefined') {
    window.app = app;
}
