// ============================================
// SEARCH SYSTEM FOR OFF-THE-RECORD
// Complete rebuild with highlighting & navigation
// ============================================

import { CHAPTERS } from '../data/chapters.js';
import { reader } from './reader.js';

// Configuration
const CONFIG = {
    minSearchLength: 2,
    maxDisplayedResults: 8,
    snippetLength: 100,
    debounceDelay: 300,
    highlightDuration: 4000, // ms before highlight fades
};

class SearchManager {
    constructor() {
        // Index
        this.searchIndex = null;

        // DOM Elements (set in init)
        this.searchInput = null;
        this.searchResults = null;
        this.searchClear = null;
        this.searchContent = null;
        this.searchToggle = null;
        this.matchNav = null;
        this.matchCounter = null;
        this.prevMatchBtn = null;
        this.nextMatchBtn = null;

        // State
        this.debounceTimer = null;
        this.currentQuery = '';
        this.currentMatches = []; // All matches across chapters
        this.currentMatchIndex = 0;
        this.inPageMatches = []; // Highlights in current page
        this.inPageMatchIndex = 0;
    }

    // Build searchable index from CHAPTERS (lazy)
    getIndex() {
        if (!this.searchIndex) {
            this.searchIndex = CHAPTERS
                .filter(ch => ch.id > 0)
                .map(chapter => ({
                    id: chapter.id,
                    title: chapter.title,
                    year: chapter.year,
                    section: chapter.section,
                    searchableText: this.stripHTML(chapter.content).toLowerCase(),
                    rawText: this.stripHTML(chapter.content),
                    wordCount: chapter.wordCount || 0
                }));
        }
        return this.searchIndex;
    }

    // Strip HTML tags
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
        this.searchContent = document.getElementById('searchContent');
        this.searchToggle = document.getElementById('searchToggle');

        if (!this.searchInput) return;

        // Create match navigation UI
        this.createMatchNavUI();

        // Input handler with debouncing
        this.searchInput.addEventListener('input', () => this.handleInput());

        // Focus handler - re-show results
        this.searchInput.addEventListener('focus', () => {
            if (this.searchInput.value.trim().length >= CONFIG.minSearchLength) {
                this.performSearch(this.searchInput.value.trim());
            }
        });

        // CRITICAL FIX: Prevent form submission on Enter (fixes double-enter bug)
        this.searchInput.addEventListener('keydown', (e) => this.handleKeydown(e));

        // Clear button
        if (this.searchClear) {
            this.searchClear.addEventListener('click', () => this.clearSearch());
        }

        // Close results when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#searchSection') && !e.target.closest('.search-match-nav')) {
                this.hideResults();
            }
        });

        // Global keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleGlobalKeydown(e));

        // Check for pending search highlight on page load
        this.checkPendingHighlight();

        // Listen for chapter loads to apply highlights
        window.addEventListener('chapterLoaded', () => {
            setTimeout(() => this.checkPendingHighlight(), 100);
        });
    }

    // Create floating match navigation UI
    createMatchNavUI() {
        // Check if already exists
        if (document.getElementById('searchMatchNav')) return;

        const nav = document.createElement('div');
        nav.className = 'search-match-nav';
        nav.id = 'searchMatchNav';
        nav.style.display = 'none';
        nav.innerHTML = `
            <button class="match-nav-btn" id="prevMatch" aria-label="Previous match">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>
            <span class="match-counter" id="matchCounter">1/1</span>
            <button class="match-nav-btn" id="nextMatch" aria-label="Next match">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
            <button class="match-nav-close" id="matchNavClose" aria-label="Close">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        `;
        document.body.appendChild(nav);

        this.matchNav = nav;
        this.matchCounter = document.getElementById('matchCounter');
        this.prevMatchBtn = document.getElementById('prevMatch');
        this.nextMatchBtn = document.getElementById('nextMatch');
        const closeBtn = document.getElementById('matchNavClose');

        this.prevMatchBtn.addEventListener('click', () => this.previousMatch());
        this.nextMatchBtn.addEventListener('click', () => this.nextMatch());
        closeBtn.addEventListener('click', () => this.closeMatchNav());
    }

    // Handle keyboard input in search field
    handleKeydown(e) {
        if (e.key === 'Escape') {
            e.preventDefault();
            this.clearSearch();
            this.searchInput.blur();
        } else if (e.key === 'Enter') {
            e.preventDefault(); // CRITICAL: Prevents double-enter bug
            e.stopPropagation();

            const query = this.searchInput.value.trim();
            if (query.length >= CONFIG.minSearchLength) {
                // If dropdown is visible, navigate to first result
                const firstResult = this.searchResults?.querySelector('.search-result-item');
                if (firstResult && this.searchResults.style.display !== 'none') {
                    const chapterId = parseInt(firstResult.dataset.chapterId);
                    this.navigateToChapter(chapterId, query);
                } else {
                    // Perform search and navigate to first result
                    this.performSearchAndNavigate(query);
                }
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.focusNextResult();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.focusPrevResult();
        }
    }

    // Handle global keyboard shortcuts
    handleGlobalKeydown(e) {
        // Ctrl/Cmd + F to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            this.openSearchAndFocus();
        }

        // F3 or Ctrl+G for next match
        if (e.key === 'F3' || ((e.ctrlKey || e.metaKey) && e.key === 'g')) {
            if (this.matchNav && this.matchNav.style.display !== 'none') {
                e.preventDefault();
                if (e.shiftKey) {
                    this.previousMatch();
                } else {
                    this.nextMatch();
                }
            }
        }
    }

    // Open search section and focus input
    openSearchAndFocus() {
        // Expand search section if collapsed
        if (this.searchContent && this.searchContent.style.display === 'none') {
            this.searchContent.style.display = 'block';
            if (this.searchToggle) {
                this.searchToggle.setAttribute('aria-expanded', 'true');
                this.searchToggle.classList.add('expanded');
            }
        }

        // Open sidebar if closed
        const sidebar = document.getElementById('tocSidebar');
        const overlay = document.getElementById('overlay');
        if (sidebar && !sidebar.classList.contains('open')) {
            sidebar.classList.add('open');
            if (overlay) overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // Focus input
        if (this.searchInput) {
            this.searchInput.focus();
            this.searchInput.select();
        }
    }

    // Handle search input with debouncing
    handleInput() {
        const query = this.searchInput.value.trim();

        // Show/hide clear button
        if (this.searchClear) {
            this.searchClear.style.display = query ? 'block' : 'none';
        }

        clearTimeout(this.debounceTimer);

        if (query.length < CONFIG.minSearchLength) {
            this.hideResults();
            return;
        }

        this.debounceTimer = setTimeout(() => {
            this.performSearch(query);
        }, CONFIG.debounceDelay);
    }

    // Perform search and show dropdown
    performSearch(query) {
        this.currentQuery = query;
        const index = this.getIndex();
        const results = index
            .map(item => {
                const score = this.calculateRelevance(item, query);
                const matchCount = this.countAllMatches(item.searchableText, query);
                return { ...item, score, matchCount };
            })
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score);

        this.currentMatches = results;
        this.displayResults(results, query);
    }

    // Perform search and navigate to first result
    performSearchAndNavigate(query) {
        this.currentQuery = query;
        const index = this.getIndex();
        const results = index
            .map(item => {
                const score = this.calculateRelevance(item, query);
                const matchCount = this.countAllMatches(item.searchableText, query);
                return { ...item, score, matchCount };
            })
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score);

        this.currentMatches = results;
        this.currentMatchIndex = 0;

        if (results.length > 0) {
            this.navigateToChapter(results[0].id, query);
        } else {
            this.showNoResults(query);
        }
    }

    // Count all matches of query in text
    countAllMatches(text, query) {
        const queryLower = query.toLowerCase();
        let count = 0;
        let pos = 0;
        while ((pos = text.indexOf(queryLower, pos)) !== -1) {
            count++;
            pos += queryLower.length;
        }
        return count;
    }

    // Calculate relevance score
    calculateRelevance(item, query) {
        let score = 0;
        const queryLower = query.toLowerCase();
        const words = queryLower.split(/\s+/).filter(w => w.length > 1);

        // Exact phrase match
        if (item.searchableText.includes(queryLower)) {
            score += 10;
            const occurrences = this.countAllMatches(item.searchableText, queryLower);
            score += Math.min((occurrences - 1) * 2, 10);
        }

        // Title match
        if (item.title.toLowerCase().includes(queryLower)) {
            score += 8;
        }

        // All words present
        if (words.length > 1) {
            const allWordsPresent = words.every(word => item.searchableText.includes(word));
            if (allWordsPresent) score += 5;
        }

        // Individual word matches
        words.forEach(word => {
            if (item.searchableText.includes(word)) {
                score += 2;
                const wordOccurrences = this.countAllMatches(item.searchableText, word);
                score += Math.min(wordOccurrences - 1, 3);
            }
        });

        return score;
    }

    // Display search results in dropdown
    displayResults(results, query) {
        if (!this.searchResults) return;

        if (results.length === 0) {
            this.showNoResults(query);
            return;
        }

        // Calculate total matches across all chapters
        const totalMatches = results.reduce((sum, r) => sum + r.matchCount, 0);
        const displayCount = Math.min(results.length, CONFIG.maxDisplayedResults);

        let html = `
            <div class="search-results-header">
                <span class="search-results-count">${totalMatches} match${totalMatches !== 1 ? 'es' : ''} in ${results.length} chapter${results.length !== 1 ? 's' : ''}</span>
            </div>
        `;

        results.slice(0, displayCount).forEach(result => {
            const snippet = this.getSnippet(result.rawText, query);
            html += `
                <div class="search-result-item" data-chapter-id="${result.id}" tabindex="0">
                    <div class="search-result-chapter">${this.escapeHTML(result.title)}</div>
                    <div class="search-result-preview">${snippet}</div>
                    <div class="search-result-meta">${result.matchCount} match${result.matchCount !== 1 ? 'es' : ''}</div>
                </div>
            `;
        });

        if (results.length > CONFIG.maxDisplayedResults) {
            html += `
                <button class="search-show-all">
                    Show all ${results.length} chapters
                </button>
            `;
        }

        this.searchResults.innerHTML = html;
        this.searchResults.style.display = 'block';
        this.attachResultHandlers(results, query);
    }

    // Show no results message
    showNoResults(query) {
        if (!this.searchResults) return;
        this.searchResults.innerHTML = `
            <div class="search-no-results">
                No results for "<strong>${this.escapeHTML(query)}</strong>"
            </div>
        `;
        this.searchResults.style.display = 'block';
    }

    // Get context snippet around match
    getSnippet(text, query) {
        const queryLower = query.toLowerCase();
        const textLower = text.toLowerCase();

        let index = textLower.indexOf(queryLower);
        if (index === -1) {
            const firstWord = queryLower.split(/\s+/)[0];
            if (firstWord.length > 1) {
                index = textLower.indexOf(firstWord);
            }
        }

        if (index === -1) {
            const beginning = text.substring(0, CONFIG.snippetLength).trim();
            return this.highlightSnippetMatches(beginning + '...', query);
        }

        const start = Math.max(0, index - 40);
        const end = Math.min(text.length, index + CONFIG.snippetLength);

        let snippet = text.substring(start, end).trim();
        if (start > 0) snippet = '...' + snippet;
        if (end < text.length) snippet = snippet + '...';

        return this.highlightSnippetMatches(snippet, query);
    }

    // Highlight matches in snippet preview
    highlightSnippetMatches(text, query) {
        const words = query.toLowerCase().split(/\s+/).filter(w => w.length > 1);
        let highlighted = this.escapeHTML(text);

        words.sort((a, b) => b.length - a.length);

        words.forEach(word => {
            const regex = new RegExp(`(${this.escapeRegex(word)})`, 'gi');
            highlighted = highlighted.replace(regex, '<mark>$1</mark>');
        });

        return highlighted;
    }

    // Attach click handlers to results
    attachResultHandlers(allResults, query) {
        document.querySelectorAll('.search-result-item').forEach(item => {
            const handler = () => {
                const chapterId = parseInt(item.dataset.chapterId);
                const index = allResults.findIndex(r => r.id === chapterId);
                this.currentMatchIndex = index >= 0 ? index : 0;
                this.navigateToChapter(chapterId, query);
            };

            item.addEventListener('click', handler);
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handler();
                }
            });
        });

        const showAllBtn = document.querySelector('.search-show-all');
        if (showAllBtn) {
            showAllBtn.addEventListener('click', () => {
                this.displayAllResults(allResults, query);
            });
        }
    }

    // Display all results
    displayAllResults(results, query) {
        if (!this.searchResults) return;

        const totalMatches = results.reduce((sum, r) => sum + r.matchCount, 0);

        let html = `
            <div class="search-results-header">
                <span class="search-results-count">${totalMatches} match${totalMatches !== 1 ? 'es' : ''} in ${results.length} chapter${results.length !== 1 ? 's' : ''}</span>
            </div>
        `;

        results.forEach(result => {
            const snippet = this.getSnippet(result.rawText, query);
            html += `
                <div class="search-result-item" data-chapter-id="${result.id}" tabindex="0">
                    <div class="search-result-chapter">${this.escapeHTML(result.title)}</div>
                    <div class="search-result-preview">${snippet}</div>
                    <div class="search-result-meta">${result.matchCount} match${result.matchCount !== 1 ? 'es' : ''}</div>
                </div>
            `;
        });

        this.searchResults.innerHTML = html;
        this.attachResultHandlers(results, query);
    }

    // Focus navigation for arrow keys
    focusNextResult() {
        const items = this.searchResults?.querySelectorAll('.search-result-item');
        if (!items || items.length === 0) return;

        const current = document.activeElement;
        const currentIndex = Array.from(items).indexOf(current);
        const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        items[nextIndex].focus();
    }

    focusPrevResult() {
        const items = this.searchResults?.querySelectorAll('.search-result-item');
        if (!items || items.length === 0) return;

        const current = document.activeElement;
        const currentIndex = Array.from(items).indexOf(current);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        items[prevIndex].focus();
    }

    // Navigate to chapter and highlight matches
    navigateToChapter(chapterId, query) {
        // Store query for highlighting after navigation
        sessionStorage.setItem('searchHighlight', JSON.stringify({
            query: query,
            chapterId: chapterId,
            timestamp: Date.now()
        }));

        this.currentQuery = query;
        this.hideResults();

        // Close sidebar
        const sidebar = document.getElementById('tocSidebar');
        const overlay = document.getElementById('overlay');
        if (sidebar) sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';

        // Use reader to load chapter (no page reload)
        if (reader && typeof reader.loadChapter === 'function') {
            reader.loadChapter(chapterId);
            // Highlight after chapter loads
            setTimeout(() => {
                this.highlightInChapter(query);
                this.showMatchNav();
            }, 300);
        } else {
            // Fallback: URL navigation
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set('chapter', chapterId);
            window.location.href = currentUrl.toString();
        }
    }

    // Check for pending highlight on page load
    checkPendingHighlight() {
        const stored = sessionStorage.getItem('searchHighlight');
        if (!stored) return;

        try {
            const data = JSON.parse(stored);
            // Only use if recent (within 10 seconds)
            if (Date.now() - data.timestamp < 10000) {
                this.currentQuery = data.query;

                // Rebuild matches for navigation
                const index = this.getIndex();
                this.currentMatches = index
                    .map(item => {
                        const score = this.calculateRelevance(item, data.query);
                        const matchCount = this.countAllMatches(item.searchableText, data.query);
                        return { ...item, score, matchCount };
                    })
                    .filter(item => item.score > 0)
                    .sort((a, b) => b.score - a.score);

                this.currentMatchIndex = this.currentMatches.findIndex(m => m.id === data.chapterId);
                if (this.currentMatchIndex < 0) this.currentMatchIndex = 0;

                setTimeout(() => {
                    this.highlightInChapter(data.query);
                    this.showMatchNav();
                }, 200);
            }
            sessionStorage.removeItem('searchHighlight');
        } catch (e) {
            sessionStorage.removeItem('searchHighlight');
        }
    }

    // Highlight matches in current chapter content
    highlightInChapter(query) {
        // Remove existing highlights
        this.removeHighlights();

        const contentEl = document.getElementById('content') || document.querySelector('.chapter-content');
        if (!contentEl) return;

        const regex = new RegExp(`(${this.escapeRegex(query)})`, 'gi');
        this.inPageMatches = [];
        this.inPageMatchIndex = 0;

        // Walk through text nodes and highlight matches
        const walker = document.createTreeWalker(
            contentEl,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: (node) => {
                    // Skip script, style, and already highlighted content
                    const parent = node.parentElement;
                    if (!parent) return NodeFilter.FILTER_REJECT;
                    const tag = parent.tagName.toLowerCase();
                    if (tag === 'script' || tag === 'style' || parent.classList.contains('search-highlight')) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );

        const nodesToProcess = [];
        let node;
        while (node = walker.nextNode()) {
            if (regex.test(node.textContent)) {
                nodesToProcess.push(node);
                regex.lastIndex = 0; // Reset regex
            }
        }

        nodesToProcess.forEach(textNode => {
            const text = textNode.textContent;
            const parts = text.split(regex);

            if (parts.length > 1) {
                const fragment = document.createDocumentFragment();

                parts.forEach((part, i) => {
                    if (i % 2 === 1) {
                        // This is a match
                        const highlight = document.createElement('span');
                        highlight.className = 'search-highlight';
                        highlight.textContent = part;
                        fragment.appendChild(highlight);
                        this.inPageMatches.push(highlight);
                    } else if (part) {
                        fragment.appendChild(document.createTextNode(part));
                    }
                });

                textNode.parentNode.replaceChild(fragment, textNode);
            }
        });

        // Scroll to first match
        if (this.inPageMatches.length > 0) {
            this.scrollToMatch(0);
        }

        // Schedule highlight removal
        setTimeout(() => {
            this.fadeOutHighlights();
        }, CONFIG.highlightDuration);
    }

    // Scroll to specific match
    scrollToMatch(index) {
        if (index < 0 || index >= this.inPageMatches.length) return;

        this.inPageMatchIndex = index;
        const match = this.inPageMatches[index];

        // Remove current marker from all
        this.inPageMatches.forEach(m => m.classList.remove('search-highlight-current'));

        // Mark current
        match.classList.add('search-highlight-current');

        // Scroll into view
        match.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Update counter
        this.updateMatchCounter();
    }

    // Remove all highlights
    removeHighlights() {
        document.querySelectorAll('.search-highlight').forEach(el => {
            const parent = el.parentNode;
            if (parent) {
                parent.replaceChild(document.createTextNode(el.textContent), el);
                parent.normalize();
            }
        });
        this.inPageMatches = [];
        this.inPageMatchIndex = 0;
    }

    // Fade out highlights gracefully
    fadeOutHighlights() {
        document.querySelectorAll('.search-highlight').forEach(el => {
            el.classList.add('search-highlight-fade');
        });

        // Remove after animation
        setTimeout(() => {
            this.removeHighlights();
            this.hideMatchNav();
        }, 1000);
    }

    // Show match navigation
    showMatchNav() {
        if (!this.matchNav) return;
        if (this.inPageMatches.length === 0 && this.currentMatches.length === 0) return;

        this.matchNav.style.display = 'flex';
        this.updateMatchCounter();
    }

    // Hide match navigation
    hideMatchNav() {
        if (this.matchNav) {
            this.matchNav.style.display = 'none';
        }
    }

    // Close match navigation and clear highlights
    closeMatchNav() {
        this.removeHighlights();
        this.hideMatchNav();
        this.currentQuery = '';
        this.currentMatches = [];
        this.currentMatchIndex = 0;
    }

    // Update match counter display
    updateMatchCounter() {
        if (!this.matchCounter) return;

        if (this.inPageMatches.length > 0) {
            // Show in-page match position
            this.matchCounter.textContent = `${this.inPageMatchIndex + 1}/${this.inPageMatches.length}`;
            this.prevMatchBtn.disabled = this.inPageMatchIndex === 0 && this.currentMatchIndex === 0;
            this.nextMatchBtn.disabled = this.inPageMatchIndex === this.inPageMatches.length - 1 &&
                                          this.currentMatchIndex === this.currentMatches.length - 1;
        } else if (this.currentMatches.length > 0) {
            // Show chapter match position
            this.matchCounter.textContent = `${this.currentMatchIndex + 1}/${this.currentMatches.length}`;
            this.prevMatchBtn.disabled = this.currentMatchIndex === 0;
            this.nextMatchBtn.disabled = this.currentMatchIndex === this.currentMatches.length - 1;
        }
    }

    // Navigate to next match
    nextMatch() {
        if (this.inPageMatches.length > 0 && this.inPageMatchIndex < this.inPageMatches.length - 1) {
            // Next match in current page
            this.scrollToMatch(this.inPageMatchIndex + 1);
        } else if (this.currentMatches.length > 0 && this.currentMatchIndex < this.currentMatches.length - 1) {
            // Next chapter
            this.currentMatchIndex++;
            const match = this.currentMatches[this.currentMatchIndex];
            this.navigateToChapter(match.id, this.currentQuery);
        }
    }

    // Navigate to previous match
    previousMatch() {
        if (this.inPageMatches.length > 0 && this.inPageMatchIndex > 0) {
            // Previous match in current page
            this.scrollToMatch(this.inPageMatchIndex - 1);
        } else if (this.currentMatches.length > 0 && this.currentMatchIndex > 0) {
            // Previous chapter
            this.currentMatchIndex--;
            const match = this.currentMatches[this.currentMatchIndex];
            this.navigateToChapter(match.id, this.currentQuery);
        }
    }

    // Clear search
    clearSearch() {
        if (this.searchInput) {
            this.searchInput.value = '';
        }
        if (this.searchClear) {
            this.searchClear.style.display = 'none';
        }
        this.hideResults();
        this.removeHighlights();
        this.hideMatchNav();
        this.currentQuery = '';
        this.currentMatches = [];
        this.currentMatchIndex = 0;
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

    // Utility: Escape regex
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
