// PhotoGallery - Photo gallery viewer with navigation
// Handles thumbnail grid and full-screen photo viewing with swipe/keyboard navigation

import { getGalleryById, getPhotoById, getNextPhoto, getPreviousPhoto, getPhotoIndex } from '../data/photos.js';

class PhotoGallery {
    constructor() {
        this.currentGallery = null;
        this.currentPhoto = null;
        this.photoModal = null;
        this.photoModalOverlay = null;
        this.isOpen = false;
        this.touchStartX = 0;
        this.touchEndX = 0;
    }

    // Initialize photo gallery
    init() {
        this.createPhotoModal();
        this.attachEventListeners();
    }

    // Create photo modal DOM elements
    createPhotoModal() {
        // Create modal overlay
        this.photoModalOverlay = document.createElement('div');
        this.photoModalOverlay.className = 'photo-modal-overlay';
        this.photoModalOverlay.setAttribute('role', 'dialog');
        this.photoModalOverlay.setAttribute('aria-modal', 'true');
        this.photoModalOverlay.setAttribute('aria-hidden', 'true');

        // Create modal container
        this.photoModal = document.createElement('div');
        this.photoModal.className = 'photo-modal';

        // Create close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'photo-modal-close';
        closeBtn.setAttribute('aria-label', 'Close photo');
        closeBtn.innerHTML = `
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        `;
        closeBtn.addEventListener('click', () => this.close());

        // Create navigation buttons
        const prevBtn = document.createElement('button');
        prevBtn.className = 'photo-modal-nav photo-modal-prev';
        prevBtn.setAttribute('aria-label', 'Previous photo');
        prevBtn.innerHTML = `
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
        `;
        prevBtn.addEventListener('click', () => this.showPrevious());

        const nextBtn = document.createElement('button');
        nextBtn.className = 'photo-modal-nav photo-modal-next';
        nextBtn.setAttribute('aria-label', 'Next photo');
        nextBtn.innerHTML = `
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
        `;
        nextBtn.addEventListener('click', () => this.showNext());

        // Create photo container
        const photoContainer = document.createElement('div');
        photoContainer.className = 'photo-modal-container';
        photoContainer.id = 'photoModalContainer';

        // Create photo info
        const photoInfo = document.createElement('div');
        photoInfo.className = 'photo-modal-info';
        photoInfo.id = 'photoModalInfo';

        // Assemble modal
        this.photoModal.appendChild(closeBtn);
        this.photoModal.appendChild(prevBtn);
        this.photoModal.appendChild(nextBtn);
        this.photoModal.appendChild(photoContainer);
        this.photoModal.appendChild(photoInfo);

        this.photoModalOverlay.appendChild(this.photoModal);
        document.body.appendChild(this.photoModalOverlay);
    }

    // Attach event listeners
    attachEventListeners() {
        // Close on overlay click
        this.photoModalOverlay.addEventListener('click', (e) => {
            if (e.target === this.photoModalOverlay) {
                this.close();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.isOpen) return;

            switch(e.key) {
                case 'Escape':
                    this.close();
                    break;
                case 'ArrowLeft':
                    this.showPrevious();
                    break;
                case 'ArrowRight':
                    this.showNext();
                    break;
            }
        });

        // Touch swipe navigation
        this.photoModal.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        this.photoModal.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });
    }

    // Handle swipe gesture
    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next photo
                this.showNext();
            } else {
                // Swipe right - previous photo
                this.showPrevious();
            }
        }
    }

    // Open photo modal
    open(galleryId, photoId) {
        const gallery = getGalleryById(galleryId);
        const photo = getPhotoById(galleryId, photoId);

        if (!gallery || !photo) {
            console.error(`Gallery or photo not found: ${galleryId}, ${photoId}`);
            return;
        }

        this.currentGallery = galleryId;
        this.currentPhoto = photoId;

        this.renderPhoto(gallery, photo);
        this.show();
    }

    // Render photo in modal
    renderPhoto(gallery, photo) {
        const container = document.getElementById('photoModalContainer');
        const info = document.getElementById('photoModalInfo');

        // Clear previous content
        container.innerHTML = '';

        // Create photo element or placeholder
        if (photo.hasImage) {
            const img = document.createElement('img');
            img.src = photo.src;
            img.alt = photo.caption;
            img.className = 'photo-modal-image';
            container.appendChild(img);
        } else {
            // Show placeholder
            const placeholder = document.createElement('div');
            placeholder.className = 'photo-placeholder';
            placeholder.innerHTML = `
                <div class="photo-placeholder-icon">📷</div>
                <div class="photo-placeholder-text">
                    <p><strong>${photo.filename}</strong></p>
                    <p>Photo will be displayed here once uploaded</p>
                </div>
            `;
            container.appendChild(placeholder);
        }

        // Update photo info
        const photoIndex = getPhotoIndex(this.currentGallery, this.currentPhoto);
        info.innerHTML = `
            <div class="photo-modal-caption">${photo.caption}</div>
            <div class="photo-modal-meta">
                <span class="photo-modal-count">${photoIndex + 1} / ${gallery.photos.length}</span>
                ${photo.location ? `<span class="photo-modal-location">${photo.location}</span>` : ''}
                ${photo.date ? `<span class="photo-modal-date">${this.formatDate(photo.date)}</span>` : ''}
            </div>
        `;

        // Update navigation button states
        this.updateNavigationButtons();
    }

    // Update navigation button states
    updateNavigationButtons() {
        const prevBtn = this.photoModal.querySelector('.photo-modal-prev');
        const nextBtn = this.photoModal.querySelector('.photo-modal-next');

        const prevPhoto = getPreviousPhoto(this.currentGallery, this.currentPhoto);
        const nextPhoto = getNextPhoto(this.currentGallery, this.currentPhoto);

        prevBtn.style.display = prevPhoto ? 'flex' : 'none';
        nextBtn.style.display = nextPhoto ? 'flex' : 'none';
    }

    // Show previous photo
    showPrevious() {
        const prevPhoto = getPreviousPhoto(this.currentGallery, this.currentPhoto);
        if (prevPhoto) {
            this.currentPhoto = prevPhoto.id;
            const gallery = getGalleryById(this.currentGallery);
            this.renderPhoto(gallery, prevPhoto);
        }
    }

    // Show next photo
    showNext() {
        const nextPhoto = getNextPhoto(this.currentGallery, this.currentPhoto);
        if (nextPhoto) {
            this.currentPhoto = nextPhoto.id;
            const gallery = getGalleryById(this.currentGallery);
            this.renderPhoto(gallery, nextPhoto);
        }
    }

    // Format date for display
    formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Show the modal
    show() {
        this.isOpen = true;
        this.photoModalOverlay.classList.add('active');
        this.photoModalOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    // Close the modal
    close() {
        this.isOpen = false;
        this.photoModalOverlay.classList.remove('active');
        this.photoModalOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        this.currentGallery = null;
        this.currentPhoto = null;
    }

    // Render gallery grid
    renderGalleryGrid(galleryId, containerId) {
        const gallery = getGalleryById(galleryId);
        const container = document.getElementById(containerId);

        if (!gallery || !container) {
            console.error(`Gallery or container not found: ${galleryId}, ${containerId}`);
            return;
        }

        // Clear container
        container.innerHTML = '';

        // Create photo grid
        const grid = document.createElement('div');
        grid.className = 'photo-grid';

        gallery.photos.forEach(photo => {
            const photoCard = document.createElement('div');
            photoCard.className = 'photo-card';
            photoCard.setAttribute('data-photo-id', photo.id);
            photoCard.setAttribute('role', 'button');
            photoCard.setAttribute('tabindex', '0');
            photoCard.setAttribute('aria-label', `View photo: ${photo.caption}`);

            // Create thumbnail or placeholder
            if (photo.hasImage) {
                photoCard.style.backgroundImage = `url(${photo.thumbnail || photo.src})`;
            } else {
                photoCard.classList.add('photo-card-placeholder');
                photoCard.innerHTML = `
                    <div class="photo-card-icon">📷</div>
                    <div class="photo-card-filename">${photo.filename}</div>
                `;
            }

            // Add click handler
            photoCard.addEventListener('click', () => {
                this.open(galleryId, photo.id);
            });

            // Add keyboard handler
            photoCard.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.open(galleryId, photo.id);
                }
            });

            grid.appendChild(photoCard);
        });

        container.appendChild(grid);
    }

    // Clean up
    destroy() {
        if (this.photoModalOverlay && this.photoModalOverlay.parentNode) {
            this.photoModalOverlay.parentNode.removeChild(this.photoModalOverlay);
        }
        this.photoModal = null;
        this.photoModalOverlay = null;
        this.currentGallery = null;
        this.currentPhoto = null;
    }
}

// Export single instance
export const photoGallery = new PhotoGallery();
