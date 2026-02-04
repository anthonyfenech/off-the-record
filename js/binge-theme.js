// ═══════════════════════════════════════════════════════════════
// BINGE MODE THEME TOGGLE
// Handles dark/light theme switching in binge mode
// Extracted from binge-mode.html inline scripts
// ═══════════════════════════════════════════════════════════════

(function() {
    'use strict';

    var themeToggle = document.getElementById('themeToggle');
    var themeKey = 'reader_theme';

    if (!themeToggle) return;

    // Initialize toggle state
    function updateThemeToggle() {
        var isDark = localStorage.getItem(themeKey) === 'dark';
        themeToggle.classList.toggle('active', isDark);
    }
    updateThemeToggle();

    themeToggle.addEventListener('click', function() {
        var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem(themeKey, 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem(themeKey, 'dark');
        }
        updateThemeToggle();
    });

})();
