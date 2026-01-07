// MediaModal - Displays media content in a modal overlay
// Handles photos, videos, audio, documents, tweets, and other inline media

import { getMediaById } from '../data/media.js';

// Load Twitter widget script if not already loaded
let twitterWidgetLoaded = false;
function loadTwitterWidget() {
    if (twitterWidgetLoaded) return Promise.resolve();
    return new Promise((resolve) => {
        if (window.twttr) {
            twitterWidgetLoaded = true;
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        script.onload = () => {
            twitterWidgetLoaded = true;
            resolve();
        };
        document.head.appendChild(script);
    });
}

class MediaModal {
    constructor() {
        this.currentMedia = null;
        this.modal = null;
        this.overlay = null;
        this.isOpen = false;
    }

    // Initialize the modal
    init() {
        this.createModalElements();
        this.attachEventListeners();
    }

    // Create modal DOM elements
    createModalElements() {
        // Create modal overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'media-modal-overlay';
        this.overlay.setAttribute('role', 'dialog');
        this.overlay.setAttribute('aria-modal', 'true');
        this.overlay.setAttribute('aria-hidden', 'true');

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
        header.appendChild(closeBtn);

        // Create modal body
        const body = document.createElement('div');
        body.className = 'media-modal-body';
        body.id = 'mediaModalBody';

        // Create modal caption
        const caption = document.createElement('div');
        caption.className = 'media-modal-caption';
        caption.id = 'mediaModalCaption';

        // Assemble modal
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

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    // Open modal with media content
    open(mediaId) {
        const media = getMediaById(mediaId);

        if (!media) {
            console.error(`Media not found: ${mediaId}`);
            return;
        }

        this.currentMedia = media;
        this.renderContent(media);
        this.show();
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
                case 'tweet':
                    this.renderTweet(media, body);
                    return; // renderTweet handles its own async rendering
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
        return `
            <div class="media-image-container">
                <img src="${media.src}" alt="${media.caption}" class="media-image">
            </div>
        `;
    }

    // Render video content
    renderVideo(media) {
        return `
            <div class="media-video-container">
                <video controls class="media-video">
                    <source src="${media.src}" type="video/mp4">
                    Your browser does not support video playback.
                </video>
            </div>
        `;
    }

    // Render audio content
    renderAudio(media) {
        return `
            <div class="media-audio-container">
                <audio controls class="media-audio">
                    <source src="${media.src}" type="audio/mpeg">
                    Your browser does not support audio playback.
                </audio>
            </div>
        `;
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
                    <img src="${media.src}" alt="${media.caption}" class="media-document-image">
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

    // Render embedded tweet
    renderTweet(media, body) {
        // Check if Twitter embeds are enabled in admin settings
        const embedsEnabled = localStorage.getItem('admin_twitterEmbeds') === 'true';

        if (!embedsEnabled) {
            // Fall back to simple link if embeds disabled
            body.innerHTML = `
                <div class="media-link-container">
                    <p>View on Twitter/X:</p>
                    <a href="${media.url}" target="_blank" rel="noopener noreferrer" class="media-link">
                        ${media.url}
                    </a>
                </div>
            `;
            return;
        }

        // Show loading state
        body.innerHTML = `
            <div class="media-tweet-container">
                <div class="tweet-loading">Loading tweet...</div>
            </div>
        `;

        // Extract tweet ID from URL
        const tweetId = media.url.match(/status\/(\d+)/)?.[1];
        if (!tweetId) {
            body.innerHTML = this.renderLink(media);
            return;
        }

        // Load Twitter widget and create embed
        loadTwitterWidget().then(() => {
            const container = body.querySelector('.media-tweet-container');
            if (container && window.twttr) {
                container.innerHTML = '';
                window.twttr.widgets.createTweet(tweetId, container, {
                    theme: document.body.classList.contains('dark-mode') ? 'dark' : 'light',
                    dnt: true // Do Not Track
                }).then((el) => {
                    if (!el) {
                        // Tweet failed to load, show link fallback
                        container.innerHTML = `
                            <div class="tweet-error">
                                <p>Tweet could not be loaded.</p>
                                <a href="${media.url}" target="_blank" rel="noopener noreferrer" class="media-link">
                                    View on Twitter/X
                                </a>
                            </div>
                        `;
                    }
                });
            }
        });
    }

    // Show the modal
    show() {
        this.isOpen = true;
        this.overlay.classList.add('active');
        this.overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Close the modal
    close() {
        this.isOpen = false;
        this.overlay.classList.remove('active');
        this.overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restore scrolling
        this.currentMedia = null;
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

// Export single instance
export const mediaModal = new MediaModal();
