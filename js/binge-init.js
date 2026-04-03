// ═══════════════════════════════════════════════════════════════
// BINGE MODE INITIALIZATION
// Full book reader - renders all chapters, handles navigation
// Extracted from binge-mode.html inline scripts
// ═══════════════════════════════════════════════════════════════

import { CHAPTERS } from '../data/chapters.js';
import { mediaModal } from './mediaModal.min.js';
import { markChapterComplete, isChapterComplete } from './storage.min.js';

// Get locked chapters from admin settings
const lockedChapters = JSON.parse(localStorage.getItem('admin_lockedChapters') || '[]');

function isChapterLocked(chapterId) {
    return lockedChapters.includes(chapterId);
}

// Render chapters
const container = document.getElementById('content');
if (container) {
    container.innerHTML = CHAPTERS.map((ch, i) => {
        const isSpecial = ch.section === 'title' || ch.section === 'toc';
        const isLocked = isChapterLocked(ch.id);
        const isLastChapter = i === CHAPTERS.length - 1;

        const chapterContent = isLocked
            ? `<div class="locked-chapter">
                   <div class="locked-icon">🔒</div>
                   <p class="locked-message">This chapter is currently locked.</p>
                   <p class="locked-hint">Check back soon or contact the author for access.</p>
               </div>`
            : ch.content;

        // Show *** separator after each chapter except: special pages, locked, or last chapter
        const showSeparator = !isSpecial && !isLocked && !isLastChapter;

        return `
        <article class="chapter-section${isSpecial ? ' special-page' : ''}${isLocked ? ' locked' : ''}" id="${ch.slug}" data-chapter="${i}">
            ${!isSpecial ? `<header class="chapter-header"><h2 class="chapter-title">${applyRedDotToTitle(ch.title)}${isLocked ? ' 🔒' : ''}</h2></header>` : ''}
            <div class="chapter-body">${chapterContent}</div>
            ${showSeparator ? '<p class="scene-break">***</p>' : ''}
        </article>
    `}).join('');
}

// Handle hash navigation on load
if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
        setTimeout(() => {
            const header = document.getElementById('header');
            const headerHeight = header ? header.offsetHeight + 20 : 90;
            const targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            window.scrollTo({ top: targetTop, behavior: 'smooth' });
        }, 100);
    }
}

// Chapter navigation
const chapters = document.querySelectorAll('.chapter-section');
const totalChapters = chapters.length;
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentChapter = 0;

function updateNav() {
    if (prevBtn) prevBtn.disabled = currentChapter === 0;
    if (nextBtn) nextBtn.disabled = currentChapter === totalChapters - 1;
}

function scrollToChapter(index) {
    if (index >= 0 && index < totalChapters) {
        currentChapter = index;
        const header = document.getElementById('header');
        const headerHeight = header ? header.offsetHeight + 20 : 90;
        const targetTop = chapters[index].getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
        updateNav();
    }
}

// Track current chapter on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            currentChapter = parseInt(entry.target.dataset.chapter);
            updateNav();
        }
    });
}, { rootMargin: '-80px 0px -50% 0px', threshold: 0 });

chapters.forEach(ch => observer.observe(ch));

// Mark chapters as complete when scrolled past
const completionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
            const chapterIndex = parseInt(entry.target.dataset.chapter);
            const chapterId = CHAPTERS[chapterIndex]?.id;
            if (chapterId && chapterId > 0 && !isChapterLocked(chapterId)) {
                markChapterComplete(chapterId);
            }
        }
    });
}, { threshold: 0 });

chapters.forEach(ch => completionObserver.observe(ch));

if (prevBtn) prevBtn.addEventListener('click', () => scrollToChapter(currentChapter - 1));
if (nextBtn) nextBtn.addEventListener('click', () => scrollToChapter(currentChapter + 1));

updateNav();

// Initialize media modal
mediaModal.init();

// Initialize interactive prompts
import('./interactivePrompts.js').then(({ InteractivePrompts }) => {
    const adminPrompts = JSON.parse(localStorage.getItem('admin_interactivePrompts') || '[]');
    if (adminPrompts.length > 0) {
        new InteractivePrompts(adminPrompts);
    } else {
        import('../data/prompts.js').then(({ PROMPTS }) => {
            if (PROMPTS && PROMPTS.length > 0) {
                new InteractivePrompts(PROMPTS);
            }
        }).catch((error) => {
            console.warn('[BingeMode] Failed to load prompts:', error);
        });
    }
});

// Attach click handlers to media emojis
document.querySelectorAll('.media-emoji').forEach(emoji => {
    emoji.addEventListener('click', (e) => {
        e.preventDefault();
        const mediaId = emoji.getAttribute('data-media-id');
        if (mediaId) {
            mediaModal.open(mediaId);
        }
    });
});

// Media toggle (in footer)
const mediaBtn = document.getElementById('mediaBtn');
const mediaKey = 'reader_cleanRead';

if (mediaBtn) {
    function updateMediaBtnState() {
        const isCleanRead = localStorage.getItem(mediaKey) === 'true';
        mediaBtn.classList.toggle('media-active', !isCleanRead);
    }

    if (localStorage.getItem(mediaKey) === 'true') {
        document.body.classList.add('clean-read');
    }
    updateMediaBtnState();

    mediaBtn.addEventListener('click', () => {
        document.body.classList.toggle('clean-read');
        const isCleanRead = document.body.classList.contains('clean-read');
        localStorage.setItem(mediaKey, isCleanRead);
        updateMediaBtnState();
    });
}

// Expose globals for sidebar navigation
window.CHAPTERS = CHAPTERS;
window.chapters = chapters;
window.scrollToChapter = scrollToChapter;
Object.defineProperty(window, 'currentChapter', {
    get: () => currentChapter,
    set: (val) => { currentChapter = val; }
});
