// Transitions - Smooth chapter transitions with preloading
// Invisible preloader + fade transitions for instant navigation

import { CHAPTERS, getNextChapterId } from '../data/chapters.js';

class ChapterTransitions {
    constructor() {
        this.preloadedChapters = new Map(); // chapterId -> chapter content
        this.isTransitioning = false;
        this.preloadThreshold = 0.6; // 60% scroll triggers preload
        this.transitionDuration = 300; // 300ms fade
        this.chapterBody = null;
        this.currentChapterId = null;
    }

    init() {
        this.chapterBody = document.getElementById('chapterBody');

        // Listen for chapter loads to set up preloading
        window.addEventListener('chapterLoaded', (e) => {
            this.currentChapterId = e.detail.chapterId;
            this.setupScrollPreloader();
        });

        // Listen for scroll to trigger preloading
        this.handleScroll = this.throttle(this.checkScrollPosition.bind(this), 200);
        window.addEventListener('scroll', this.handleScroll, { passive: true });
    }

    // Check if we should preload next chapter
    checkScrollPosition() {
        if (!this.currentChapterId) return;

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

        if (scrollPercent >= this.preloadThreshold) {
            this.preloadNextChapter();
        }
    }

    // Setup preloader for current chapter
    setupScrollPreloader() {
        // Clear old preloads (keep only adjacent chapters)
        const nextId = getNextChapterId(this.currentChapterId);

        // Keep only next chapter in cache
        for (const [id] of this.preloadedChapters) {
            if (id !== nextId) {
                this.preloadedChapters.delete(id);
            }
        }
    }

    // Preload next chapter content
    preloadNextChapter() {
        const nextId = getNextChapterId(this.currentChapterId);
        if (!nextId || this.preloadedChapters.has(nextId)) return;

        const chapter = CHAPTERS.find(c => c.id === nextId);
        if (!chapter) return;

        // Check if chapter is locked
        const lockedChapters = JSON.parse(localStorage.getItem('admin_lockedChapters') || '[]');
        if (lockedChapters.includes(nextId)) return;

        // Store parsed content for instant load
        const paragraphData = chapter.content
            .split('\n\n')
            .filter(p => p.trim())
            .map(p => {
                const trimmed = p.trim();
                if (trimmed === '---') {
                    return { type: 'break', content: '' };
                }
                return { type: 'paragraph', content: trimmed };
            });

        this.preloadedChapters.set(nextId, {
            chapter,
            paragraphData
        });
    }

    // Check if chapter is preloaded
    isPreloaded(chapterId) {
        return this.preloadedChapters.has(chapterId);
    }

    // Get preloaded content
    getPreloaded(chapterId) {
        return this.preloadedChapters.get(chapterId);
    }

    // Transition to new chapter with fade
    async transitionTo(callback) {
        if (!this.chapterBody || this.isTransitioning) {
            callback();
            return;
        }

        this.isTransitioning = true;

        // Fade out
        this.chapterBody.classList.add('chapter-fade-out');

        // Wait for fade out
        await this.wait(this.transitionDuration);

        // Execute the chapter load
        callback();

        // Fade in
        this.chapterBody.classList.remove('chapter-fade-out');
        this.chapterBody.classList.add('chapter-fade-in');

        // Wait for fade in
        await this.wait(this.transitionDuration);

        // Clean up
        this.chapterBody.classList.remove('chapter-fade-in');
        this.isTransitioning = false;
    }

    // Promise-based wait
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Throttle helper
    throttle(func, wait) {
        let timeout = null;
        let previous = 0;

        return (...args) => {
            const now = Date.now();
            const remaining = wait - (now - previous);

            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                func.apply(this, args);
            } else if (!timeout) {
                timeout = setTimeout(() => {
                    previous = Date.now();
                    timeout = null;
                    func.apply(this, args);
                }, remaining);
            }
        };
    }
}

// Export single instance
export const transitions = new ChapterTransitions();
