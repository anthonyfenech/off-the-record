// ============================================
// SEARCH FUNCTIONALITY FOR OFF-THE-RECORD
// Client-side search with relevance scoring
// ============================================

import { CHAPTERS } from '../data/chapters.js';

// Configuration
const CONFIG = {
    minSearchLength: 2,        // Minimum characters before searching
    maxDisplayedResults: 5,    // Results shown before "Show all"
    snippetLength: 100,        // Characters in context snippet
    debounceDelay: 300,        // ms to wait after typing stops
};

class SearchManager {
    constructor() {
        this.searchIndex = null;  // Lazy build
        this.searchInput = null;
        this.searchResults = null;
        this.searchClear = null;
        this.debounceTimer = null;
    }

    // Build searchable index from CHAPTERS (lazy)
    getIndex() {
        if (!this.searchIndex) {
            this.searchIndex = CHAPTERS
                .filter(ch => ch.id > 0) // Exclude title page (-1) and TOC (0)
                .map(chapter => ({
                    id: chapter.id,
                    title: chapter.title,
                    year: chapter.year,
                    section: chapter.section,
                    // Strip HTML and convert to lowercase for searching
                    searchableText: this.stripHTML(chapter.content).toLowerCase(),
                    // Keep original for context snippets
                    rawText: this.stripHTML(chapter.content),
                    wordCount: chapter.wordCount || 0
                }));
        }
        return this.searchIndex;
    }

    // Strip HTML tags from text
    stripHTML(html) {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }

    // Initialize search UI
    init() {
        this.searchInput = document.getElementById('searchInput');
        this.searchResults = document.getElementById('searchResults');
        this.searchClear = document.getElementById('searchClear');

        if (!this.searchInput) return; // Not on a page with search

        // Set up event listeners
        this.searchInput.addEventListener('input', () => this.handleInput());
        this.searchInput.addEventListener('focus', () => {
            // Re-show results if there's a query
            if (this.searchInput.value.trim().length >= CONFIG.minSearchLength) {
                this.performSearch(this.searchInput.value.trim());
            }
        });

        if (this.searchClear) {
            this.searchClear.addEventListener('click', () => this.clearSearch());
        }

        // Close results when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                this.hideResults();
            }
        });

        // Keyboard navigation
        this.searchInput.addEventListener('keydown', (e) => this.handleKeydown(e));
    }

    // Handle keyboard navigation
    handleKeydown(e) {
        if (e.key === 'Escape') {
            this.clearSearch();
            this.searchInput.blur();
        } else if (e.key === 'Enter') {
            const firstResult = this.searchResults?.querySelector('.search-result-item');
            if (firstResult) {
                const chapterId = parseInt(firstResult.dataset.chapterId);
                this.navigateToChapter(chapterId);
            }
        }
    }

    // Handle search input with debouncing
    handleInput() {
        const query = this.searchInput.value.trim();

        // Show/hide clear button
        if (this.searchClear) {
            this.searchClear.style.display = query ? 'block' : 'none';
        }

        // Clear previous timer
        clearTimeout(this.debounceTimer);

        // If query too short, hide results
        if (query.length < CONFIG.minSearchLength) {
            this.hideResults();
            return;
        }

        // Debounce search
        this.debounceTimer = setTimeout(() => {
            this.performSearch(query);
        }, CONFIG.debounceDelay);
    }

    // Perform the actual search
    performSearch(query) {
        const index = this.getIndex();
        const results = index
            .map(item => {
                const score = this.calculateRelevance(item, query);
                return { ...item, score };
            })
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score); // Highest score first

        this.displayResults(results, query);
    }

    // Calculate relevance score for a chapter
    calculateRelevance(item, query) {
        let score = 0;
        const queryLower = query.toLowerCase();
        const words = queryLower.split(/\s+/).filter(w => w.length > 1);

        // 1. Exact phrase match (highest priority)
        if (item.searchableText.includes(queryLower)) {
            score += 10;
            // Bonus for multiple occurrences
            const occurrences = this.countOccurrences(item.searchableText, queryLower);
            score += Math.min((occurrences - 1) * 2, 10);
        }

        // 2. Title match (high priority)
        if (item.title.toLowerCase().includes(queryLower)) {
            score += 8;
        }

        // 3. All words present (medium priority)
        if (words.length > 1) {
            const allWordsPresent = words.every(word => item.searchableText.includes(word));
            if (allWordsPresent) {
                score += 5;
            }
        }

        // 4. Individual word matches (low priority)
        words.forEach(word => {
            if (item.searchableText.includes(word)) {
                score += 2;
                // Frequency bonus (capped)
                const wordOccurrences = this.countOccurrences(item.searchableText, word);
                score += Math.min(wordOccurrences - 1, 3);
            }
        });

        return score;
    }

    // Count occurrences of substring in text
    countOccurrences(text, search) {
        let count = 0;
        let pos = 0;
        while ((pos = text.indexOf(search, pos)) !== -1) {
            count++;
            pos += search.length;
        }
        return count;
    }

    // Display search results
    displayResults(results, query) {
        if (!this.searchResults) return;

        if (results.length === 0) {
            this.showNoResults(query);
            return;
        }

        const displayCount = Math.min(results.length, CONFIG.maxDisplayedResults);
        const hasMore = results.length > CONFIG.maxDisplayedResults;

        let html = `
            <div class="search-results-header">
                ${results.length} Result${results.length !== 1 ? 's' : ''}
            </div>
        `;

        results.slice(0, displayCount).forEach(result => {
            const snippet = this.getSnippet(result.rawText, query);
            const matchCount = this.countOccurrences(result.searchableText, query.toLowerCase());
            html += `
                <div class="search-result-item" data-chapter-id="${result.id}">
                    <div class="search-result-title">${this.escapeHTML(result.title)}</div>
                    <div class="search-result-snippet">${snippet}</div>
                    <div class="search-result-meta">
                        ${result.year || ''} ${result.year ? '·' : ''} ${matchCount} match${matchCount !== 1 ? 'es' : ''}
                    </div>
                </div>
            `;
        });

        if (hasMore) {
            html += `
                <button class="search-show-all" data-query="${this.escapeHTML(query)}" data-total="${results.length}">
                    Show all ${results.length} results
                </button>
            `;
        }

        this.searchResults.innerHTML = html;
        this.searchResults.style.display = 'block';

        // Attach click handlers
        this.attachResultHandlers(results, query);
    }

    // Show "no results" message
    showNoResults(query) {
        if (!this.searchResults) return;
        this.searchResults.innerHTML = `
            <div class="search-no-results">
                No results for "${this.escapeHTML(query)}"
            </div>
        `;
        this.searchResults.style.display = 'block';
    }

    // Get context snippet around search term
    getSnippet(text, query) {
        const queryLower = query.toLowerCase();
        const textLower = text.toLowerCase();

        // Find first occurrence
        let index = textLower.indexOf(queryLower);

        // If exact phrase not found, try first word
        if (index === -1) {
            const firstWord = queryLower.split(/\s+/)[0];
            if (firstWord.length > 1) {
                index = textLower.indexOf(firstWord);
            }
        }

        // If still not found, return beginning
        if (index === -1) {
            const beginning = text.substring(0, CONFIG.snippetLength).trim();
            return this.highlightMatches(beginning + '...', query);
        }

        // Calculate snippet boundaries
        const start = Math.max(0, index - 30);
        const end = Math.min(text.length, index + CONFIG.snippetLength);

        let snippet = text.substring(start, end).trim();

        // Add ellipsis
        if (start > 0) snippet = '...' + snippet;
        if (end < text.length) snippet = snippet + '...';

        return this.highlightMatches(snippet, query);
    }

    // Highlight search terms in snippet
    highlightMatches(text, query) {
        const words = query.toLowerCase().split(/\s+/).filter(w => w.length > 1);
        let highlighted = this.escapeHTML(text);

        // Sort words by length (longest first) to avoid partial replacements
        words.sort((a, b) => b.length - a.length);

        // Highlight each word
        words.forEach(word => {
            const regex = new RegExp(`(${this.escapeRegex(word)})`, 'gi');
            highlighted = highlighted.replace(regex, '<mark>$1</mark>');
        });

        return highlighted;
    }

    // Attach click handlers to result items
    attachResultHandlers(allResults, query) {
        // Individual results
        document.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const chapterId = parseInt(item.dataset.chapterId);
                this.navigateToChapter(chapterId);
            });
        });

        // Show all button - expand to show all results
        const showAllBtn = document.querySelector('.search-show-all');
        if (showAllBtn) {
            showAllBtn.addEventListener('click', () => {
                this.displayAllResults(allResults, query);
            });
        }
    }

    // Display all results (when "Show all" is clicked)
    displayAllResults(results, query) {
        if (!this.searchResults) return;

        let html = `
            <div class="search-results-header">
                ${results.length} Result${results.length !== 1 ? 's' : ''}
            </div>
        `;

        results.forEach(result => {
            const snippet = this.getSnippet(result.rawText, query);
            const matchCount = this.countOccurrences(result.searchableText, query.toLowerCase());
            html += `
                <div class="search-result-item" data-chapter-id="${result.id}">
                    <div class="search-result-title">${this.escapeHTML(result.title)}</div>
                    <div class="search-result-snippet">${snippet}</div>
                    <div class="search-result-meta">
                        ${result.year || ''} ${result.year ? '·' : ''} ${matchCount} match${matchCount !== 1 ? 'es' : ''}
                    </div>
                </div>
            `;
        });

        this.searchResults.innerHTML = html;

        // Re-attach click handlers
        document.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const chapterId = parseInt(item.dataset.chapterId);
                this.navigateToChapter(chapterId);
            });
        });
    }

    // Navigate to chapter
    navigateToChapter(chapterId) {
        // Clear search and hide results
        this.clearSearch();

        // Close sidebar
        const sidebar = document.getElementById('tocSidebar');
        const overlay = document.getElementById('overlay');
        if (sidebar) sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';

        // Navigate using URL parameter (works with current reader)
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('chapter', chapterId);
        window.location.href = currentUrl.toString();
    }

    // Clear search input and results
    clearSearch() {
        if (this.searchInput) {
            this.searchInput.value = '';
        }
        if (this.searchClear) {
            this.searchClear.style.display = 'none';
        }
        this.hideResults();
    }

    // Hide results dropdown
    hideResults() {
        if (this.searchResults) {
            this.searchResults.style.display = 'none';
        }
    }

    // Utility: Escape HTML
    escapeHTML(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // Utility: Escape regex special characters
    escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}

// Create singleton instance
const searchManager = new SearchManager();

// Initialize when DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => searchManager.init());
} else {
    searchManager.init();
}

export { searchManager };
