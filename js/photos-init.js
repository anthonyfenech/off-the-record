// ═══════════════════════════════════════════════════════════════
// PHOTOS PAGE INITIALIZATION
// Renders photo galleries using data from photos.js
// Extracted from photos.html inline scripts
// ═══════════════════════════════════════════════════════════════

import { getAllGalleries } from '../data/photos.js';
import { photoGallery } from './photoGallery.min.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize photo gallery modal
    photoGallery.init();

    const container = document.getElementById('photosContainer');
    if (!container) return;

    const galleries = getAllGalleries();

    galleries.forEach(gallery => {
        // Create gallery section
        const section = document.createElement('section');
        section.className = 'gallery-page-section';
        section.id = `gallery-${gallery.id}`;

        // Gallery header
        const header = document.createElement('div');
        header.className = 'gallery-page-header';

        const title = document.createElement('h3');
        title.className = 'gallery-page-title';
        title.textContent = gallery.title.toUpperCase();

        header.appendChild(title);
        section.appendChild(header);

        if (gallery.comingSoon) {
            // Show coming soon message
            const comingSoon = document.createElement('div');
            comingSoon.className = 'gallery-coming-soon';
            comingSoon.textContent = 'Coming Soon';
            section.appendChild(comingSoon);
        } else {
            // Render photo grid
            const gridContainer = document.createElement('div');
            gridContainer.id = `photos-${gallery.id}`;
            section.appendChild(gridContainer);

            // Use photoGallery to render the grid
            setTimeout(() => {
                photoGallery.renderGalleryGrid(gallery.id, `photos-${gallery.id}`);
            }, 0);
        }

        container.appendChild(section);
    });
});
