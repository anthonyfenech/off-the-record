// Navigation.js - Handles menu and chapter navigation

class Navigation {
    constructor() {
        this.currentChapter = null;
        this.menuOpen = false;
        this.init();
    }

    init() {
        this.createNavigation();
        this.attachEventListeners();
        this.loadLastChapter();
    }

    createNavigation() {
        const nav = document.getElementById('navigation');
        
        // TOP SECTION - LARGER FONT
        // BOOK section (collapsible with all chapters inside)
        this.createCollapsibleSection(nav, 'BOOK', 'book-section', true, () => {
            const bookContent = document.createElement('div');
            bookContent.className = 'nested-content';
            
            // INTRO
            this.createCollapsibleSection(bookContent, 'INTRO', 'intro', false, () => {
                return this.createChapterList([1, 2, 3, 4]);
            });
            
            // 2015 SEASON
            this.createCollapsibleSection(bookContent, '2015 SEASON', '2015', false, () => {
                return this.createChapterList([5, 6, 7, 8, 9]);
            });
            
            // 2016 SEASON
            this.createCollapsibleSection(bookContent, '2016 SEASON', '2016', false, () => {
                return this.createChapterList([10, 11, 12, 13, 14]);
            });
            
            // 2017 SEASON
            this.createCollapsibleSection(bookContent, '2017 SEASON', '2017', false, () => {
                return this.createChapterList([15, 16, 17, 18, 19]);
            });
            
            // 2018 SEASON
            this.createCollapsibleSection(bookContent, '2018 SEASON', '2018', false, () => {
                return this.createChapterList([20, 21, 22, 23, 24]);
            });
            
            // 2019 SEASON
            this.createCollapsibleSection(bookContent, '2019 SEASON', '2019', false, () => {
                return this.createChapterList([25, 26, 27, 28, 29, 30]);
            });
            
            // 2020 SEASON (empty for now)
            const season2020 = document.createElement('div');
            season2020.className = 'nav-item nested-item disabled';
            season2020.textContent = '2020 SEASON';
            bookContent.appendChild(season2020);
            
            // POSTSCRIPT
            this.createCollapsibleSection(bookContent, 'POSTSCRIPT', 'postscript', false, () => {
                return this.createChapterList([31, 32]);
            });
            
            return bookContent;
        });
        
        // BLOG
        this.createMediaSection(nav, 'BLOG', 'blog', true);
        
        // ABOUT
        this.createMediaSection(nav, 'ABOUT', 'about', true);
        
        // AUDIO
        this.createMediaSection(nav, 'AUDIO', 'audio', true);
        
        // PHOTOS
        this.createMediaSection(nav, 'PHOTOS', 'photos', true);

        // Divider
        const divider = document.createElement('div');
        divider.className = 'nav-divider';
        nav.appendChild(divider);

        // BOTTOM SECTION - SMALLER FONT
        // COMMENTS (guestbook)
        this.createCollapsibleSection(nav, 'COMMENTS', 'comments', false, () => {
            return this.createGuestbookSection();
        }, 'small');
        
        // CONTACT
        this.createMediaSection(nav, 'CONTACT', 'contact', false);
    }

    createCollapsibleSection(parent, title, id, isLargeFont, contentGenerator, sizeClass = '') {
        const section = document.createElement('div');
        section.className = 'nav-section';
        
        const header = document.createElement('div');
        header.className = `nav-item collapsible ${sizeClass}`;
        if (isLargeFont) header.classList.add('large-font');
        header.innerHTML = `
            ${this.addRecordDots(title)}
            <span class="collapse-arrow">▼</span>
        `;
        
        const content = document.createElement('div');
        content.className = 'collapsible-content';
        content.style.display = 'none';
        
        header.addEventListener('click', () => {
            this.toggleCollapsibleSection(header, content);
        });
        
        section.appendChild(header);
        
        if (contentGenerator) {
            const generatedContent = contentGenerator();
            content.appendChild(generatedContent);
        }
        
        section.appendChild(content);
        parent.appendChild(section);
        
        return section;
    }

    toggleCollapsibleSection(header, content) {
        const isOpen = content.style.display !== 'none';
        
        if (isOpen) {
            content.style.display = 'none';
            header.querySelector('.collapse-arrow').textContent = '▼';
        } else {
            content.style.display = 'block';
            header.querySelector('.collapse-arrow').textContent = '▲';
        }
    }

    createChapterList(chapterNumbers) {
        const container = document.createElement('div');
        container.className = 'chapter-list';
        
        chapterNumbers.forEach(num => {
            const chapter = window.chapters.find(c => c.id === num);
            if (chapter) {
                const item = document.createElement('div');
                item.className = 'nav-item chapter-item';
                item.textContent = chapter.title;
                item.addEventListener('click', () => {
                    this.loadChapter(num);
                    this.closeMenu();
                });
                container.appendChild(item);
            }
        });
        
        return container;
    }

    createMediaSection(parent, title, id, isLargeFont) {
        const item = document.createElement('div');
        item.className = 'nav-item';
        if (isLargeFont) item.classList.add('large-font');
        item.innerHTML = this.addRecordDots(title);
        item.addEventListener('click', () => {
            this.loadMediaSection(id);
            this.closeMenu();
        });
        parent.appendChild(item);
    }

    createGuestbookSection() {
        const container = document.createElement('div');
        container.className = 'guestbook-container';
        
        // Header
        const header = document.createElement('div');
        header.className = 'guestbook-header';
        header.textContent = 'Sign the guestbook. Let us know you stopped by.';
        container.appendChild(header);
        
        // Form
        const form = document.createElement('form');
        form.className = 'guestbook-form';
        form.innerHTML = `
            <input type="text" id="guestName" placeholder="Name *" required>
            <input type="email" id="guestEmail" placeholder="Email *" required>
            <input type="text" id="guestHometown" placeholder="Hometown (e.g., Detroit, MI)">
            <textarea id="guestComments" placeholder="Comments" rows="4"></textarea>
            <button type="submit" class="guestbook-submit">Sign the Guestbook</button>
        `;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitGuestbookEntry();
        });
        
        container.appendChild(form);
        
        // Entries
        const entriesContainer = document.createElement('div');
        entriesContainer.className = 'guestbook-entries';
        entriesContainer.id = 'guestbookEntries';
        container.appendChild(entriesContainer);
        
        this.loadGuestbookEntries();
        
        return container;
    }

    submitGuestbookEntry() {
        const name = document.getElementById('guestName').value;
        const email = document.getElementById('guestEmail').value;
        const hometown = document.getElementById('guestHometown').value;
        const comments = document.getElementById('guestComments').value;
        
        const entry = {
            name,
            email,
            hometown,
            comments,
            timestamp: new Date().toISOString()
        };
        
        // Get existing entries
        let entries = JSON.parse(localStorage.getItem('guestbookEntries') || '[]');
        entries.unshift(entry); // Add to beginning
        entries = entries.slice(0, 20); // Keep only 20 most recent
        
        localStorage.setItem('guestbookEntries', JSON.stringify(entries));
        
        // Clear form
        document.getElementById('guestName').value = '';
        document.getElementById('guestEmail').value = '';
        document.getElementById('guestHometown').value = '';
        document.getElementById('guestComments').value = '';
        
        // Reload entries
        this.loadGuestbookEntries();
        
        alert('Thanks for signing!');
    }

    loadGuestbookEntries() {
        const container = document.getElementById('guestbookEntries');
        if (!container) return;
        
        const entries = JSON.parse(localStorage.getItem('guestbookEntries') || '[]');
        
        if (entries.length === 0) {
            container.innerHTML = '<p class="no-entries">No entries yet. Be the first!</p>';
            return;
        }
        
        container.innerHTML = entries.map(entry => `
            <div class="guestbook-entry">
                <div class="entry-header">
                    <strong>${this.escapeHtml(entry.name)}</strong>
                    ${entry.hometown ? ` - ${this.escapeHtml(entry.hometown)}` : ''}
                </div>
                ${entry.comments ? `<div class="entry-comments">"${this.escapeHtml(entry.comments)}"</div>` : ''}
            </div>
        `).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    addRecordDots(text) {
        // Add red dots to O's in specific sections
        const shouldHaveDots = ['BOOK', 'BLOG', 'ABOUT', 'AUDIO', 'PHOTOS', 'COMMENTS', 'CONTACT'].includes(text);
        
        if (!shouldHaveDots) {
            return text;
        }
        
        return text.split('').map(char => {
            if (char === 'O') {
                return '<span class="record-button">O</span>';
            }
            return char;
        }).join('');
    }

    loadChapter(id) {
        const chapter = window.chapters.find(c => c.id === id);
        if (!chapter) return;
        
        this.currentChapter = id;
        localStorage.setItem('lastChapter', id);
        
        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="chapter-header">
                <h2>${chapter.title}</h2>
            </div>
            <div class="chapter-body">
                ${chapter.content}
            </div>
            <div class="chapter-navigation">
                <button class="nav-button prev" ${id === 1 ? 'disabled' : ''} onclick="navigation.previousChapter()">
                    PREVIOUS
                </button>
                <button class="nav-button next" ${id === 32 ? 'disabled' : ''} onclick="navigation.nextChapter()">
                    NEXT
                </button>
            </div>
        `;
        
        this.updateProgress();
    }

    loadMediaSection(sectionId) {
        const content = document.getElementById('content');
        
        switch(sectionId) {
            case 'blog':
                content.innerHTML = '<div class="media-section"><h2>BLOG</h2><p>Coming soon...</p></div>';
                break;
            case 'about':
                content.innerHTML = '<div class="media-section"><h2>ABOUT</h2><p>Book information coming soon...</p></div>';
                break;
            case 'audio':
                content.innerHTML = '<div class="media-section"><h2>AUDIO</h2><p>Audiobook content coming soon...</p></div>';
                break;
            case 'photos':
                this.loadPhotos();
                break;
            case 'contact':
                content.innerHTML = '<div class="media-section"><h2>CONTACT</h2><p>Contact information coming soon...</p></div>';
                break;
        }
        
        this.currentChapter = null;
    }

    loadPhotos() {
        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="media-section">
                <h2>PHOTOS</h2>
                <div class="photo-grid" id="photoGrid"></div>
            </div>
        `;
        
        const grid = document.getElementById('photoGrid');
        
        if (!window.photos || window.photos.length === 0) {
            grid.innerHTML = '<p>No photos available yet.</p>';
            return;
        }
        
        window.photos.forEach(photo => {
            const item = document.createElement('div');
            item.className = 'photo-item';
            item.innerHTML = `
                <img src="${photo.thumb || photo.url}" alt="${photo.caption}" 
                     onclick="navigation.viewPhoto('${photo.url}', '${photo.caption}')">
                <p>${photo.caption}</p>
            `;
            grid.appendChild(item);
        });
    }

    viewPhoto(url, caption) {
        const modal = document.createElement('div');
        modal.className = 'photo-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
                <img src="${url}" alt="${caption}">
                <p>${caption}</p>
            </div>
        `;
        document.body.appendChild(modal);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    loadLastChapter() {
        const lastChapter = localStorage.getItem('lastChapter');
        if (lastChapter) {
            this.loadChapter(parseInt(lastChapter));
        } else {
            this.loadChapter(1);
        }
    }

    previousChapter() {
        if (this.currentChapter > 1) {
            this.loadChapter(this.currentChapter - 1);
            window.scrollTo(0, 0);
        }
    }

    nextChapter() {
        if (this.currentChapter < 32) {
            this.loadChapter(this.currentChapter + 1);
            window.scrollTo(0, 0);
        }
    }

    attachEventListeners() {
        document.getElementById('menuButton').addEventListener('click', () => {
            this.toggleMenu();
        });
        
        document.getElementById('closeMenu').addEventListener('click', () => {
            this.closeMenu();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            const menu = document.getElementById('menu');
            const menuButton = document.getElementById('menuButton');
            
            if (this.menuOpen && !menu.contains(e.target) && !menuButton.contains(e.target)) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        const menu = document.getElementById('menu');
        this.menuOpen = !this.menuOpen;
        menu.classList.toggle('open', this.menuOpen);
    }

    closeMenu() {
        const menu = document.getElementById('menu');
        this.menuOpen = false;
        menu.classList.remove('open');
    }

    updateProgress() {
        const totalChapters = 32;
        const chaptersRead = new Set(
            Object.keys(localStorage)
                .filter(key => key.startsWith('chapter_') && localStorage[key] === 'read')
                .map(key => parseInt(key.replace('chapter_', '')))
        ).size;
        
        const percentage = Math.round((chaptersRead / totalChapters) * 100);
        document.getElementById('progressBar').textContent = `Overall Progress: ${percentage}%`;
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.navigation = new Navigation();
});
