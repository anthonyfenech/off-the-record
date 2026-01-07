// Bookmarks - Save and manage chapter bookmarks

const STORAGE_KEY = 'otr_bookmarks';

class Bookmarks {
    constructor() {
        this.bookmarks = this.loadBookmarks();
    }

    // Load bookmarks from localStorage
    loadBookmarks() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading bookmarks:', error);
            return [];
        }
    }

    // Save bookmarks to localStorage
    saveBookmarks() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.bookmarks));
        } catch (error) {
            console.error('Error saving bookmarks:', error);
        }
    }

    // Check if a chapter is bookmarked
    isBookmarked(chapterId) {
        return this.bookmarks.some(b => b.chapterId === chapterId);
    }

    // Add a bookmark
    addBookmark(chapterId, chapterTitle, pageNumber = null, totalPages = null) {
        if (this.isBookmarked(chapterId)) {
            return false; // Already bookmarked
        }

        const bookmark = {
            chapterId: chapterId,
            chapterTitle: chapterTitle,
            pageNumber: pageNumber,
            totalPages: totalPages,
            timestamp: new Date().toISOString()
        };

        this.bookmarks.unshift(bookmark); // Add to beginning (newest first)
        this.saveBookmarks();
        this.dispatchChange();
        return true;
    }

    // Remove a bookmark
    removeBookmark(chapterId) {
        const index = this.bookmarks.findIndex(b => b.chapterId === chapterId);
        if (index !== -1) {
            this.bookmarks.splice(index, 1);
            this.saveBookmarks();
            this.dispatchChange();
            return true;
        }
        return false;
    }

    // Toggle bookmark state
    toggleBookmark(chapterId, chapterTitle, pageNumber = null, totalPages = null) {
        if (this.isBookmarked(chapterId)) {
            this.removeBookmark(chapterId);
            return false; // Now unbookmarked
        } else {
            this.addBookmark(chapterId, chapterTitle, pageNumber, totalPages);
            return true; // Now bookmarked
        }
    }

    // Get all bookmarks
    getAllBookmarks() {
        return this.bookmarks;
    }

    // Get bookmark by chapter ID
    getBookmark(chapterId) {
        return this.bookmarks.find(b => b.chapterId === chapterId) || null;
    }

    // Get bookmark count
    getCount() {
        return this.bookmarks.length;
    }

    // Format date for display
    formatDate(isoString) {
        const date = new Date(isoString);
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    // Dispatch custom event when bookmarks change
    dispatchChange() {
        window.dispatchEvent(new CustomEvent('bookmarksChanged', {
            detail: { bookmarks: this.bookmarks }
        }));
    }

    // Render bookmarks list in a container
    renderBookmarksList(container, onChapterClick) {
        container.innerHTML = '';

        if (this.bookmarks.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'bookmarks-empty';
            empty.textContent = 'No bookmarks yet. Tap the bookmark icon while reading to save chapters.';
            container.appendChild(empty);
            return;
        }

        const list = document.createElement('div');
        list.className = 'bookmarks-list';

        this.bookmarks.forEach(bookmark => {
            const item = document.createElement('div');
            item.className = 'bookmark-item';

            const info = document.createElement('div');
            info.className = 'bookmark-info';
            info.addEventListener('click', () => {
                if (onChapterClick) {
                    onChapterClick(bookmark.chapterId, bookmark.pageNumber);
                }
            });

            const title = document.createElement('div');
            title.className = 'bookmark-title';
            title.textContent = bookmark.chapterTitle;

            const date = document.createElement('div');
            date.className = 'bookmark-date';
            let dateText = `Saved ${this.formatDate(bookmark.timestamp)}`;
            if (bookmark.pageNumber !== null && bookmark.totalPages !== null) {
                dateText += ` · Page ${bookmark.pageNumber + 1} of ${bookmark.totalPages}`;
            }
            date.textContent = dateText;

            info.appendChild(title);
            info.appendChild(date);

            const removeBtn = document.createElement('button');
            removeBtn.className = 'bookmark-remove';
            removeBtn.innerHTML = '&times;';
            removeBtn.setAttribute('aria-label', 'Remove bookmark');
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.removeBookmark(bookmark.chapterId);
                this.renderBookmarksList(container, onChapterClick);
            });

            item.appendChild(info);
            item.appendChild(removeBtn);
            list.appendChild(item);
        });

        container.appendChild(list);
    }
}

// Export singleton instance
export const bookmarks = new Bookmarks();
