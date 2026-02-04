// ═══════════════════════════════════════════════════════════════
// ADMIN ACCESS
// Secret password listener to reveal Admin tab in sidebar
// Type the password anywhere on the page to unlock
// Extracted from index.html inline scripts
// ═══════════════════════════════════════════════════════════════

(function() {
    'use strict';

    var ADMIN_PASSWORD = 'FENECHADMIN';
    var ADMIN_KEY = 'otr_admin_access';
    var typed = '';
    var adminSection = document.getElementById('adminSection');

    // Check if already authenticated
    if (localStorage.getItem(ADMIN_KEY) === 'true' && adminSection) {
        adminSection.style.display = '';
    }

    // Listen for password typing
    document.addEventListener('keypress', function(e) {
        typed += e.key.toUpperCase();

        // Keep only last N characters where N is password length
        if (typed.length > ADMIN_PASSWORD.length) {
            typed = typed.slice(-ADMIN_PASSWORD.length);
        }

        // Check for match
        if (typed === ADMIN_PASSWORD) {
            localStorage.setItem(ADMIN_KEY, 'true');
            if (adminSection) adminSection.style.display = '';
            typed = '';
        }
    });

})();
