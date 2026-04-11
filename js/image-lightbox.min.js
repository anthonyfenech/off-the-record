// Image Lightbox - Minimal lightbox for chapter inline images

class ImageLightbox {
    constructor() {
        this.overlay = null;
        this.isOpen = false;
    }

    init() {
        this.createOverlay();
        this.bindEscape();
    }

    createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'lightbox-overlay';
        this.overlay.innerHTML = `
            <button class="lightbox-close" aria-label="Close"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
            <div class="lightbox-content">
                <img src="" alt="">
                <div class="lightbox-caption"></div>
            </div>
        `;
        document.body.appendChild(this.overlay);

        // Close on overlay click (not image)
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close();
        });

        // Close button
        this.overlay.querySelector('.lightbox-close').addEventListener('click', () => this.close());
    }

    bindEscape() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) this.close();
        });
    }

    // Bind click handlers to images in chapter content
    bindImages() {
        const chapterBody = document.getElementById('chapterBody');
        if (!chapterBody) return;

        const images = chapterBody.querySelectorAll('img:not(.parental-advisory):not([src$=".svg"])');
        images.forEach(img => {
            if (!img.dataset.lightboxBound) {
                img.dataset.lightboxBound = 'true';
                img.addEventListener('click', () => this.open(img));
            }
        });
    }

    open(img) {
        const lightboxImg = this.overlay.querySelector('.lightbox-content img');
        const caption = this.overlay.querySelector('.lightbox-caption');

        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || '';
        caption.textContent = img.alt || '';
        caption.style.display = img.alt ? 'block' : 'none';

        this.overlay.classList.add('active');
        this.isOpen = true;
    }

    close() {
        this.overlay.classList.remove('active');
        this.isOpen = false;
    }
}

export const imageLightbox = new ImageLightbox();
