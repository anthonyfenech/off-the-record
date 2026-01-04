// Simple Search
// Basic search through chapter content in sidebar

import { CHAPTERS } from '../data/chapters.js';
import { CONFIG } from './config.js';

class SearchManager {
    constructor() {
        this.searchIndex = [];
        this.input = null;
        this.results = null;
    }

    init() {
        if (!CONFIG.showSearchButton) {
            const searchContainer = document.getElementById('sidebarSearch');
            if (searchContainer) {
                searchContainer.style.display = 'none';
            }
            return;
        }

        this.input = document.getElementById('sidebarSearchInput');
        this.results = document.getElementById('sidebarSearchResults');

        if (!this.input || !this.results) {
            return;
        }

        this.buildIndex();
        this.setupEventListeners();
    }

    buildIndex() {
        this.searchIndex = [];

        CHAPTERS.forEach(chapter => {
            // Index title
            this.searchIndex.push({
                chapterId: chapter.id,
                title: chapter.title,
                type: 'title',
                text: chapter.title
            });

            // Index content
            const paragraphs = chapter.content.split('\n\n').filter(p => p.trim());
            paragraphs.forEach((paragraph, index) => {
                if (paragraph === '---' || paragraph === '***') return;
                const plainText = this.stripHtml(paragraph);
                if (plainText.length > 0) {
                    this.searchIndex.push({
                        chapterId: chapter.id,
                        title: chapter.title,
                        type: 'content',
                        text: plainText,
                        paragraphIndex: index
                    });
                }
            });
        });
    }

    stripHtml(html) {
        const temp = document.createElement('div');
        temp.innerHTML = html;
        return temp.textContent || temp.innerText || '';
    }

    setupEventListeners() {
        this.input.addEventListener('input', (e) => {
            this.search(e.target.value);
        });

        // Handle result clicks
        this.results.addEventListener('click', (e) => {
            const item = e.target.closest('.sidebar-search-result');
            if (item) {
                const chapterId = parseInt(item.dataset.chapterId);
                this.navigateToResult(chapterId);
            }
        });
    }

    search(query) {
        const trimmed = query.trim().toLowerCase();

        if (trimmed.length < 2) {
            this.results.innerHTML = '';
            return;
        }

        const matches = [];
        const seen = new Set();

        this.searchIndex.forEach(item => {
            const text = item.text.toLowerCase();
            if (text.includes(trimmed)) {
                const key = item.chapterId;
                if (!seen.has(key)) {
                    seen.add(key);
                    matches.push(item);
                }
            }
        });

        // Limit to 10 results
        const limited = matches.slice(0, 10);
        this.displayResults(limited, trimmed);
    }

    displayResults(matches, query) {
        if (matches.length === 0) {
            this.results.innerHTML = '<div class="sidebar-search-empty">No results</div>';
            return;
        }

        const html = matches.map(match => {
            return `<div class="sidebar-search-result" data-chapter-id="${match.chapterId}">${match.title}</div>`;
        }).join('');

        this.results.innerHTML = html;
    }

    navigateToResult(chapterId) {
        // Clear search
        this.input.value = '';
        this.results.innerHTML = '';

        // Close sidebar
        const sidebar = document.getElementById('tocSidebar');
        const overlay = document.getElementById('overlay');
        if (sidebar) sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';

        // Navigate
        window.location.hash = `chapter-${chapterId}`;
    }
}

const searchManager = new SearchManager();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => searchManager.init());
} else {
    searchManager.init();
}

export { searchManager };
