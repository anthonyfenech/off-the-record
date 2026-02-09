// ═══════════════════════════════════════════════════════════════
// PAGE CONTROLS
// UI toggle handlers for media, reading mode, text size, and sections
// Extracted from index.html inline scripts for cleaner organization
// ═══════════════════════════════════════════════════════════════

(function() {
    'use strict';

    // ─────────────────────────────────────────────────────────────
    // MEDIA TOGGLE (Footer Navigation)
    // Toggles clean-read mode (hides/shows media embeds)
    // ─────────────────────────────────────────────────────────────
    const mediaBtn = document.getElementById('mediaBtn');
    const mediaKey = 'reader_cleanRead';

    if (mediaBtn) {
        function updateMediaBtnState() {
            const isCleanRead = localStorage.getItem(mediaKey) === 'true';
            mediaBtn.classList.toggle('media-active', !isCleanRead);
        }

        // Load saved state
        if (localStorage.getItem(mediaKey) === 'true') {
            document.body.classList.add('clean-read');
        }
        updateMediaBtnState();

        mediaBtn.addEventListener('click', function() {
            document.body.classList.toggle('clean-read');
            const isCleanRead = document.body.classList.contains('clean-read');
            localStorage.setItem(mediaKey, isCleanRead);
            updateMediaBtnState();
        });
    }

    // ─────────────────────────────────────────────────────────────
    // BINGE BUTTON (Footer Navigation)
    // Navigates to binge-mode.html
    // ─────────────────────────────────────────────────────────────
    const bingeBtn = document.getElementById('bingeBtn');

    if (bingeBtn) {
        bingeBtn.addEventListener('click', function() {
            // Navigate to binge mode
            window.location.href = './binge-mode.html';
        });
    }

    // ─────────────────────────────────────────────────────────────
    // MODE TOGGLE (Scroll/Pages)
    // Switches between scroll mode and pagination mode
    // ─────────────────────────────────────────────────────────────
    const modeToggle = document.getElementById('modeToggle');
    const modeKey = 'reader_mode';

    if (modeToggle) {
        function setMode(mode) {
            modeToggle.querySelectorAll('.option-btn').forEach(function(btn) {
                btn.classList.toggle('active', btn.dataset.mode === mode);
            });

            if (mode === 'page') {
                document.body.classList.remove('scrolling');
                document.body.classList.add('paginated');
            } else {
                document.body.classList.remove('paginated');
                document.body.classList.add('scrolling');
            }

            // Sync with reading mode manager (if loaded)
            if (window.readingModeManager) {
                window.readingModeManager.switchMode(mode);
            }
        }

        function initMode() {
            // Always start in scroll mode (no localStorage persistence)
            setMode('scroll');
        }

        initMode();

        modeToggle.addEventListener('click', function(e) {
            var btn = e.target.closest('.option-btn');
            if (btn) {
                setMode(btn.dataset.mode);
            }
        });
    }

    // ─────────────────────────────────────────────────────────────
    // TEXT SIZE TOGGLE
    // Delegates to fontSizeManager (single source of truth)
    // ─────────────────────────────────────────────────────────────
    const textSizeToggle = document.getElementById('textSizeToggle');

    if (textSizeToggle) {
        function updateTextSizeUI(size) {
            textSizeToggle.querySelectorAll('.option-btn').forEach(function(btn) {
                btn.classList.toggle('active', btn.dataset.size === size);
            });
        }

        // Initialize UI from fontSizeManager state
        function initTextSize() {
            var currentSize = window.fontSizeManager ?
                window.fontSizeManager.getSize() :
                (localStorage.getItem('reader_fontSize') || 'small');
            updateTextSizeUI(currentSize);
        }

        initTextSize();

        // Handle button clicks - delegate to fontSizeManager
        textSizeToggle.addEventListener('click', function(e) {
            var btn = e.target.closest('.option-btn');
            if (btn && window.fontSizeManager) {
                window.fontSizeManager.changeSize(btn.dataset.size);
            }
        });

        // Sync UI when font size changes (e.g., from keyboard shortcuts)
        window.addEventListener('fontsizechange', function(e) {
            if (e.detail && e.detail.size) {
                updateTextSizeUI(e.detail.size);
            }
        });
    }

    // ─────────────────────────────────────────────────────────────
    // SEARCH SECTION TOGGLE
    // Expands/collapses search section in sidebar
    // ─────────────────────────────────────────────────────────────
    const searchToggle = document.getElementById('searchToggle');
    const searchSection = document.getElementById('searchSection');
    const searchContent = document.getElementById('searchContent');
    const searchInput = document.getElementById('searchInput');

    if (searchToggle && searchSection && searchContent) {
        searchToggle.addEventListener('click', function() {
            var isOpen = searchSection.classList.toggle('open');
            searchToggle.setAttribute('aria-expanded', isOpen);
            searchContent.style.display = isOpen ? 'block' : 'none';

            if (isOpen && searchInput) {
                setTimeout(function() { searchInput.focus(); }, 100);
            }
        });
    }

    // ─────────────────────────────────────────────────────────────
    // OPTIONS SECTION TOGGLE
    // Expands/collapses options section in sidebar
    // ─────────────────────────────────────────────────────────────
    const optionsToggle = document.getElementById('optionsToggle');
    const optionsSection = document.getElementById('optionsSection');
    const optionsContent = document.getElementById('optionsContent');

    if (optionsToggle && optionsSection && optionsContent) {
        optionsToggle.addEventListener('click', function() {
            var isOpen = optionsSection.classList.toggle('open');
            optionsToggle.setAttribute('aria-expanded', isOpen);
            optionsContent.style.display = isOpen ? 'block' : 'none';
        });
    }

})();
