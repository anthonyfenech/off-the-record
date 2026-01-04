// Search Manager
// Enables searching through all chapter content

import { CHAPTERS } from '../data/chapters.js';
import { CONFIG } from './config.js';

class SearchManager {
    constructor() {
        this.searchIndex = [];
        this.modal = null;
        this.input = null;
        this.results = null;
        this.isOpen = false;
    }

    init() {
        // Check if search should be shown
        const searchBtn = document.getElementById('searchBtn');
        if (!CONFIG.showSearchButton && searchBtn) {
            searchBtn.style.display = 'none';
            return;
        }

        // Get DOM elements
        this.modal = document.getElementById('searchModal');
        this.input = document.getElementById('searchInput');
        this.results = document.getElementById('searchResults');

        if (!this.modal || !this.input || !this.results) {
            console.warn('Search elements not found');
            return;
        }

        // Build search index
        this.buildIndex();

        // Set up event listeners
        this.setupEventListeners();

        console.log('Search initialized with', this.searchIndex.length, 'indexed items');
    }

    buildIndex() {
        this.searchIndex = [];

        CHAPTERS.forEach(chapter => {
            // Index the title
            this.searchIndex.push({
                chapterId: chapter.id,
                title: chapter.title,
                subtitle: chapter.subtitle,
                type: 'title',
                text: chapter.title,
                paragraphIndex: -1
            });

            // Parse and index content paragraphs
            const paragraphs = chapter.content
                .split('\n\n')
                .filter(p => p.trim())
                .map(p => p.trim());

            paragraphs.forEach((paragraph, index) => {
                // Skip scene breaks
                if (paragraph === '---' || paragraph === '***' || paragraph === '* * *') {
                    return;
                }

                // Strip HTML tags to get plain text
                const plainText = this.stripHtml(paragraph);

                if (plainText.length > 0) {
                    this.searchIndex.push({
                        chapterId: chapter.id,
                        title: chapter.title,
                        subtitle: chapter.subtitle,
                        type: 'content',
                        text: plainText,
                        paragraphIndex: index
                    });
                }
            });
        });
    }

    stripHtml(html) {
        // Create a temporary element to strip HTML
        const temp = document.createElement('div');
        temp.innerHTML = html;
        return temp.textContent || temp.innerText || '';
    }

    setupEventListeners() {
        // Open search
        const searchBtn = document.getElementById('searchBtn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.open());
        }

        // Close search
        const closeBtn = document.getElementById('searchCloseBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }

        // Clear input
        const clearBtn = document.getElementById('searchClearBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearInput());
        }

        // Search on input
        this.input.addEventListener('input', (e) => {
            this.search(e.target.value);
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Handle result clicks
        this.results.addEventListener('click', (e) => {
            const resultItem = e.target.closest('.search-result-item');
            if (resultItem) {
                const chapterId = parseInt(resultItem.dataset.chapterId);
                const paragraphIndex = parseInt(resultItem.dataset.paragraphIndex);
                this.navigateToResult(chapterId, paragraphIndex);
            }
        });
    }

    open() {
        this.isOpen = true;
        this.modal.classList.add('open');
        document.body.style.overflow = 'hidden';

        // Focus input after animation
        setTimeout(() => {
            this.input.focus();
        }, 100);
    }

    close() {
        this.isOpen = false;
        this.modal.classList.remove('open');
        document.body.style.overflow = '';
        this.clearInput();
    }

    clearInput() {
        this.input.value = '';
        this.results.innerHTML = '<p class="search-hint">Type to search through all chapters</p>';
    }

    search(query) {
        const trimmedQuery = query.trim().toLowerCase();

        if (trimmedQuery.length < 2) {
            this.results.innerHTML = '<p class="search-hint">Type to search through all chapters</p>';
            return;
        }

        const matches = [];
        const seen = new Set(); // Avoid duplicate chapter matches

        this.searchIndex.forEach(item => {
            const text = item.text.toLowerCase();
            const matchIndex = text.indexOf(trimmedQuery);

            if (matchIndex !== -1) {
                // Create unique key to avoid too many matches from same chapter
                const key = `${item.chapterId}-${item.paragraphIndex}`;
                if (!seen.has(key)) {
                    seen.add(key);
                    matches.push({
                        ...item,
                        matchIndex,
                        matchText: item.text
                    });
                }
            }
        });

        // Sort: titles first, then by chapter order
        matches.sort((a, b) => {
            if (a.type === 'title' && b.type !== 'title') return -1;
            if (a.type !== 'title' && b.type === 'title') return 1;
            return a.chapterId - b.chapterId;
        });

        // Limit results
        const limitedMatches = matches.slice(0, 50);

        this.displayResults(limitedMatches, trimmedQuery);
    }

    displayResults(matches, query) {
        if (matches.length === 0) {
            this.results.innerHTML = '<p class="search-no-results">No results found</p>';
            return;
        }

        const html = matches.map(match => {
            const context = this.getContext(match.matchText, query, 60);
            const highlighted = this.highlightMatch(context, query);

            return `
                <div class="search-result-item" data-chapter-id="${match.chapterId}" data-paragraph-index="${match.paragraphIndex}">
                    <div class="search-result-chapter">${match.title}</div>
                    <div class="search-result-text">${highlighted}</div>
                </div>
            `;
        }).join('');

        this.results.innerHTML = html;
    }

    getContext(text, query, contextLength) {
        const lowerText = text.toLowerCase();
        const matchIndex = lowerText.indexOf(query.toLowerCase());

        if (matchIndex === -1) return text.slice(0, contextLength * 2);

        const start = Math.max(0, matchIndex - contextLength);
        const end = Math.min(text.length, matchIndex + query.length + contextLength);

        let context = text.slice(start, end);

        // Add ellipsis if truncated
        if (start > 0) context = '...' + context;
        if (end < text.length) context = context + '...';

        return context;
    }

    highlightMatch(text, query) {
        const regex = new RegExp(`(${this.escapeRegex(query)})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    navigateToResult(chapterId, paragraphIndex) {
        this.close();

        // Navigate to chapter
        window.location.hash = `chapter-${chapterId}`;

        // After chapter loads, scroll to paragraph if specified
        if (paragraphIndex >= 0) {
            setTimeout(() => {
                const paragraph = document.querySelector(`[data-paragraph-index="${paragraphIndex}"]`);
                if (paragraph) {
                    paragraph.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Brief highlight effect
                    paragraph.classList.add('search-highlight');
                    setTimeout(() => {
                        paragraph.classList.remove('search-highlight');
                    }, 2000);
                }
            }, 300);
        }
    }
}

// Create singleton instance
const searchManager = new SearchManager();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => searchManager.init());
} else {
    searchManager.init();
}

// Export for use in other modules
export { searchManager };

// Also expose globally
window.searchManager = searchManager;
