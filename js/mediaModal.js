// MediaModal - Displays media content in a modal overlay
// Handles photos, videos, audio, documents, and other inline media

import { overlayCleanup } from './overlay-cleanup.js';

// Media data lookup - requires data/media.js to be loaded first
// Falls back gracefully if MEDIA_DATA not available
function getMediaById(id) {
  if (typeof MEDIA_DATA !== 'undefined' && MEDIA_DATA[id]) {
    return MEDIA_DATA[id];
  }
  return null;
}

// Articles data cache
let articlesCache = null;

class MediaModal {
    constructor() {
        this.currentMedia = null;
        this.modal = null;
        this.overlay = null;
        this.isOpen = false;
        this.triggerElement = null; // Element that opened the modal
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.modalOpenTime = null; // Timestamp for duration tracking
        this.trackingData = null; // Store tracking data for close event

        // Audio player cleanup references
        this.audioElement = null;
        this.dragMouseUp = null;
        this.dragMouseMove = null;
    }

    // Load articles data (cached)
    async loadArticles() {
        if (articlesCache) return articlesCache;
        try {
            const response = await fetch('./data/freep-articles.json');
            articlesCache = await response.json();
            return articlesCache;
        } catch (e) {
            console.error('[MediaModal] Failed to load articles:', e);
            return {};
        }
    }

    // Get article by ID
    async getArticleById(id) {
        const articles = await this.loadArticles();
        return articles[id] || null;
    }

    // Initialize the modal
    init() {
        this.createModalElements();
        this.attachEventListeners();
        this._registerCleanup();
    }

    // Register with overlay cleanup system
    _registerCleanup() {
        if (typeof overlayCleanup !== 'undefined') {
            overlayCleanup.register('mediaModal', {
                isOpen: () => this.isOpen,
                close: () => this.close(),
                element: this.overlay
            });
        }
    }

    // Create modal DOM elements
    createModalElements() {
        // Create modal overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'media-modal-overlay';
        this.overlay.setAttribute('role', 'dialog');
        this.overlay.setAttribute('aria-modal', 'true');

        // Create modal container
        this.modal = document.createElement('div');
        this.modal.className = 'media-modal';

        // Create modal header
        const header = document.createElement('div');
        header.className = 'media-modal-header';

        const headerContent = document.createElement('div');
        headerContent.className = 'media-modal-header-content';

        const icon = document.createElement('span');
        icon.className = 'media-modal-icon';
        icon.id = 'mediaModalIcon';

        const label = document.createElement('span');
        label.className = 'media-modal-label';
        label.id = 'mediaModalLabel';

        headerContent.appendChild(icon);
        headerContent.appendChild(label);

        const closeBtn = document.createElement('button');
        closeBtn.className = 'media-modal-close';
        closeBtn.setAttribute('aria-label', 'Close media');
        closeBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        `;
        closeBtn.addEventListener('click', () => this.close());

        header.appendChild(headerContent);

        // Create modal body
        const body = document.createElement('div');
        body.className = 'media-modal-body';
        body.id = 'mediaModalBody';

        // Create modal caption
        const caption = document.createElement('div');
        caption.className = 'media-modal-caption';
        caption.id = 'mediaModalCaption';

        // Assemble modal - close button directly on modal for overlay positioning
        this.modal.appendChild(closeBtn);
        this.modal.appendChild(header);
        this.modal.appendChild(body);
        this.modal.appendChild(caption);

        this.overlay.appendChild(this.modal);
        document.body.appendChild(this.overlay);
    }

    // Attach event listeners
    attachEventListeners() {
        // Close on overlay click (but not on modal content click)
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });
    }

    // Handle keyboard events (focus trap + close)
    handleKeyDown(e) {
        if (!this.isOpen) return;

        if (e.key === 'Escape') {
            this.close();
            return;
        }

        // Focus trap - keep Tab within modal
        if (e.key === 'Tab') {
            const focusableElements = this.modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                // Shift+Tab: if on first element, go to last
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                // Tab: if on last element, go to first
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    }

    // Check if media is disabled in admin (RED status)
    isMediaEnabled(mediaId) {
        const status = localStorage.getItem(`media_status_${mediaId}`);
        return status !== 'red';
    }

    // Map media types to asset categories for analytics
    getAssetCategory(mediaType) {
        const categoryMap = {
            // Photos
            'photo': 'photo',
            'photo2': 'photo',
            'selfie': 'photo',
            // Videos
            'video': 'video',
            'tv-local': 'video',
            'tv-network': 'video',
            // Audio
            'audio': 'audio',
            'radio': 'audio',
            'interview': 'audio',
            'mic': 'audio',
            'phone': 'audio',
            'record': 'audio',
            // Documents
            'newspaper': 'document',
            'newspaper2': 'document',
            'receipt': 'document',
            'pdf': 'document',
            'attachment': 'document',
            'text': 'document',
            // Links
            'link': 'link',
            // Articles
            'article': 'article',
            // Text/Notes
            'notes': 'text',
            'email': 'text',
            'scoop': 'text',
            'duck': 'text',
            'award': 'text',
            'skeleton': 'text',
            'baseball': 'text',
            'stats': 'text',
            'correction': 'text',
            'important': 'text',
            'question': 'text'
        };
        return categoryMap[mediaType] || 'other';
    }

    // Open modal with media content
    async open(mediaId) {
        console.log('[MediaModal] open() called with:', mediaId);

        // Check if media is disabled (RED status in admin)
        if (!this.isMediaEnabled(mediaId)) {
            console.log('[MediaModal] Media is DISABLED (red status):', mediaId);
            return; // Silently skip disabled media
        }
        console.log('[MediaModal] Media is enabled');

        let media = getMediaById(mediaId);
        console.log('[MediaModal] getMediaById returned:', media);

        // If not in MEDIA_CONTENT, check if it's an article
        if (!media) {
            console.log('[MediaModal] Not in MEDIA_DATA, checking articles...');
            const article = await this.getArticleById(mediaId);
            if (article) {
                // Convert article to media format
                media = {
                    type: 'article',
                    emoji: '🗞️',
                    label: 'Article',
                    caption: article.headline,
                    headline: article.headline,
                    date: article.date,
                    publication: article.publication || 'Detroit Free Press',
                    url: article.url,
                    excerpt: article.excerpt
                };
            }
        }

        if (!media) {
            console.error('[MediaModal] Media not found:', mediaId);
            return;
        }
        console.log('[MediaModal] Proceeding to render media:', media.type);

        try {
            // Store timestamp and tracking data for duration calculation on close
            this.modalOpenTime = Date.now();
            this.trackingData = {
                assetType: this.getAssetCategory(media.type),
                assetId: mediaId,
                emoji: media.emoji,
                label: media.label
            };
            console.log('[MediaModal] trackingData set');

            // Save the element that triggered the modal for focus restore
            this.triggerElement = document.activeElement;

            this.currentMedia = media;
            console.log('[MediaModal] About to call renderContent()');
            this.renderContent(media);
            console.log('[MediaModal] renderContent() completed, calling show()');
            this.show();
        } catch (err) {
            console.error('[MediaModal] Error after "Proceeding to render":', err);
        }
    }

    // Render media content based on type
    renderContent(media) {
        const icon = document.getElementById('mediaModalIcon');
        const label = document.getElementById('mediaModalLabel');
        const body = document.getElementById('mediaModalBody');
        const caption = document.getElementById('mediaModalCaption');

        // Set header
        icon.textContent = media.emoji;
        label.textContent = media.label;

        // Set caption
        caption.textContent = media.caption || '';

        // Clear previous content
        body.innerHTML = '';

        // Add audio-modal class for compact audio styling
        const isAudio = ['audio', 'radio', 'interview', 'mic', 'phone', 'record'].includes(media.type);
        this.modal.classList.toggle('audio-modal', isAudio);

        // Render based on type
        if (media.placeholder) {
            body.innerHTML = this.renderPlaceholder(media);
        } else {
            switch (media.type) {
                case 'photo':
                case 'photo2':
                case 'selfie':
                    body.innerHTML = this.renderImage(media);
                    break;
                case 'video':
                case 'tv-local':
                case 'tv-network':
                    body.innerHTML = this.renderVideo(media);
                    break;
                case 'audio':
                case 'radio':
                case 'interview':
                case 'mic':
                case 'phone':
                case 'record':
                    body.innerHTML = this.renderAudio(media);
                    break;
                case 'notes':
                case 'email':
                case 'scoop':
                case 'duck':
                case 'award':
                case 'skeleton':
                case 'baseball':
                case 'stats':
                case 'correction':
                case 'important':
                case 'question':
                    body.innerHTML = this.renderText(media);
                    break;
                case 'newspaper':
                case 'newspaper2':
                case 'receipt':
                case 'pdf':
                case 'attachment':
                case 'text':
                    body.innerHTML = this.renderDocument(media);
                    break;
                case 'link':
                    body.innerHTML = this.renderLink(media);
                    break;
                case 'article':
                    body.innerHTML = this.renderArticle(media);
                    break;
                default:
                    body.innerHTML = this.renderPlaceholder(media);
            }
        }
    }

    // Render placeholder content
    renderPlaceholder(media) {
        return `
            <div class="media-placeholder">
                <div class="media-placeholder-icon">${media.emoji}</div>
                <div class="media-placeholder-text">
                    <p><strong>Content coming soon</strong></p>
                    <p>${media.label}</p>
                </div>
            </div>
        `;
    }

    // Render image content
    renderImage(media) {
        const mediaId = media.id || 'unknown';
        return `
            <div class="media-image-container">
                <img src="${media.src}"
                     alt="${media.caption}"
                     class="media-image"
                     loading="lazy"
                     decoding="async"
                     onerror="this.onerror=null; this.parentNode.innerHTML='<div class=\\'media-error\\'><div class=\\'media-error-icon\\'>📷</div><p>Image failed to load</p><button class=\\'media-retry-btn\\' onclick=\\'window.mediaModal.retryMedia(\\x22${mediaId}\\x22)\\'>Try Again</button></div>';">
            </div>
        `;
    }

    // Render video content
    renderVideo(media) {
        const mediaId = media.id || 'unknown';
        return `
            <div class="media-video-container">
                <video controls class="media-video" controlsList="nodownload noplaybackrate" disablePictureInPicture
                       onerror="this.onerror=null; this.parentNode.innerHTML='<div class=\\'media-error\\'><div class=\\'media-error-icon\\'>🎥</div><p>Video failed to load</p><button class=\\'media-retry-btn\\' onclick=\\'window.mediaModal.retryMedia(\\x22${mediaId}\\x22)\\'>Try Again</button></div>';">
                    <source src="${media.src}" type="video/mp4">
                    Your browser does not support video playback.
                </video>
            </div>
        `;
    }

    // Render audio content with slim custom player
    renderAudio(media) {
        const playerId = 'slimPlayer_' + Date.now();

        // Set up player after render
        setTimeout(() => this.initSlimPlayer(playerId), 0);

        return `
            <div class="slim-player" id="${playerId}">
                <audio class="slim-player-audio">
                    <source src="${media.src}" type="audio/mpeg">
                </audio>
                <button class="slim-player-btn" aria-label="Play">
                    <svg class="slim-player-icon play" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                    <svg class="slim-player-icon pause" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 4h4v16H6zM14 4h4v16h-4z"/>
                    </svg>
                </button>
                <div class="slim-player-progress">
                    <div class="slim-player-bar">
                        <div class="slim-player-fill"></div>
                        <div class="slim-player-handle"></div>
                    </div>
                </div>
                <span class="slim-player-time">0:00</span>
            </div>
        `;
    }

    // Initialize slim player controls
    initSlimPlayer(playerId) {
        const player = document.getElementById(playerId);
        if (!player) return;

        const audio = player.querySelector('.slim-player-audio');
        const btn = player.querySelector('.slim-player-btn');
        const bar = player.querySelector('.slim-player-bar');
        const fill = player.querySelector('.slim-player-fill');
        const handle = player.querySelector('.slim-player-handle');
        const time = player.querySelector('.slim-player-time');

        // Format time as m:ss
        const formatTime = (secs) => {
            const m = Math.floor(secs / 60);
            const s = Math.floor(secs % 60);
            return `${m}:${s.toString().padStart(2, '0')}`;
        };

        // Play/pause toggle
        btn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        });

        // Update UI on play/pause
        audio.addEventListener('play', () => player.classList.add('playing'));
        audio.addEventListener('pause', () => player.classList.remove('playing'));

        // Update progress bar
        audio.addEventListener('timeupdate', () => {
            const pct = (audio.currentTime / audio.duration) * 100 || 0;
            fill.style.width = pct + '%';
            handle.style.left = pct + '%';
            time.textContent = formatTime(audio.currentTime);
        });

        // Show duration when loaded
        audio.addEventListener('loadedmetadata', () => {
            time.textContent = formatTime(audio.duration);
        });

        // Seek on click
        bar.addEventListener('click', (e) => {
            const rect = bar.getBoundingClientRect();
            const pct = (e.clientX - rect.left) / rect.width;
            audio.currentTime = pct * audio.duration;
        });

        // Drag to seek - store references for cleanup
        let dragging = false;
        handle.addEventListener('mousedown', () => dragging = true);

        // Store references to remove on modal close
        this.dragMouseUp = () => dragging = false;
        this.dragMouseMove = (e) => {
            if (!dragging) return;
            const rect = bar.getBoundingClientRect();
            const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            audio.currentTime = pct * audio.duration;
        };

        document.addEventListener('mouseup', this.dragMouseUp);
        document.addEventListener('mousemove', this.dragMouseMove);

        // Store audio element for cleanup
        this.audioElement = audio;
    }

    // Render text content
    renderText(media) {
        return `
            <div class="media-text-container">
                <p>${media.content || 'No content available.'}</p>
            </div>
        `;
    }

    // Render document/image content
    renderDocument(media) {
        if (media.src) {
            return `
                <div class="media-document-container">
                    <img src="${media.src}" alt="${media.caption}" class="media-document-image" loading="lazy" decoding="async">
                </div>
            `;
        } else {
            return this.renderPlaceholder(media);
        }
    }

    // Render external link
    renderLink(media) {
        return `
            <div class="media-link-container">
                <p>This link opens in a new window:</p>
                <a href="${media.url}" target="_blank" rel="noopener noreferrer" class="media-link">
                    ${media.url}
                </a>
            </div>
        `;
    }

    // Render Free Press article
    renderArticle(media) {
        const excerpt = media.excerpt && media.excerpt !== media.headline
            ? `<p class="article-excerpt">${this.escapeHtml(media.excerpt)}</p>`
            : '';

        return `
            <div class="media-article-container">
                <div class="article-publication">DETROIT FREE PRESS</div>
                <div class="article-byline">BY ANTHONY FENECH</div>
                <h2 class="article-headline">${this.escapeHtml(media.headline)}</h2>
                <div class="article-date">${media.date}</div>
                ${excerpt}
                <a href="${media.url}" target="_blank" rel="noopener noreferrer" class="article-link-btn">
                    READ FULL ARTICLE →
                </a>
            </div>
        `;
    }

    // Escape HTML for safe display
    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Show the modal
    show() {
        console.log('[MediaModal] show() called');

        // CRITICAL: Clear any inline styles set by overlay-cleanup.js
        // Inline styles override CSS classes, so we must clear them first
        this.overlay.style.display = '';
        this.overlay.style.visibility = '';
        this.overlay.style.opacity = '';
        this.overlay.style.pointerEvents = '';

        this.isOpen = true;
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        console.log('[MediaModal] show() complete - overlay should be visible');

        // Add keyboard listener for focus trap
        document.addEventListener('keydown', this.handleKeyDown);

        // Focus the close button
        const closeBtn = this.modal.querySelector('.media-modal-close');
        if (closeBtn) {
            closeBtn.focus();
        }
    }

    // Close the modal - wrapped in try/catch for guaranteed cleanup
    close() {
        try {
            // Track emoji click with duration on close
            try {
                if (window.analytics && window.analytics.trackEvent && this.trackingData) {
                    let seconds = null;
                    if (this.modalOpenTime) {
                        seconds = Math.round((Date.now() - this.modalOpenTime) / 1000);
                        // Cap at 600 seconds (10 minutes) - likely user left tab open
                        if (seconds > 600) {
                            seconds = 600;
                        }
                        // Ensure minimum of 0
                        if (seconds < 0) {
                            seconds = 0;
                        }
                    }
                    window.analytics.trackEvent('emoji_click', {
                        ...this.trackingData,
                        seconds: seconds
                    });
                }
            } catch (e) {
                console.error('[Analytics] Error tracking emoji click:', e);
            }

            // Remove keyboard listener
            document.removeEventListener('keydown', this.handleKeyDown);

            // Clean up audio player listeners and stop playback
            if (this.audioElement) {
                this.audioElement.pause();
                this.audioElement = null;
            }
            if (this.dragMouseUp) {
                document.removeEventListener('mouseup', this.dragMouseUp);
                this.dragMouseUp = null;
            }
            if (this.dragMouseMove) {
                document.removeEventListener('mousemove', this.dragMouseMove);
                this.dragMouseMove = null;
            }

            // Restore focus to trigger element
            if (this.triggerElement && this.triggerElement.focus) {
                this.triggerElement.focus();
            }

            this.currentMedia = null;
            this.triggerElement = null;
            this.modalOpenTime = null;
            this.trackingData = null;
        } finally {
            // ALWAYS ensure these cleanup steps happen
            this.isOpen = false;
            if (this.overlay) {
                this.overlay.classList.remove('active');
            }
            document.body.style.overflow = ''; // Restore scrolling
        }
    }

    // Retry loading media after failure
    retryMedia(mediaId) {
        if (mediaId && mediaId !== 'unknown') {
            this.close();
            setTimeout(() => this.open(mediaId), 100);
        }
    }

    // Clean up
    destroy() {
        if (this.overlay && this.overlay.parentNode) {
            this.overlay.parentNode.removeChild(this.overlay);
        }
        this.modal = null;
        this.overlay = null;
        this.currentMedia = null;
    }
}

// Create and export single instance
const mediaModalInstance = new MediaModal();

// Expose globally for error retry buttons
window.mediaModal = mediaModalInstance;

export const mediaModal = mediaModalInstance;
