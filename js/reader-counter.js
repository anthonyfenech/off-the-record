// ═══════════════════════════════════════════════════════════════
// READER COUNTER SYSTEM
// Fetches and displays reader count, increments on password gate pass
// Extracted from index.html inline scripts
// ═══════════════════════════════════════════════════════════════

(function() {
    'use strict';

    var API_URL = OTR_ANALYTICS_CONFIG.readerCounterUrl;

    // Format number with commas
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Fetch and display count
    async function fetchCount() {
        try {
            var response = await fetch(API_URL + '?action=getReaderCount');
            var data = await response.json();

            // Check if counter is enabled
            if (data.counter_enabled === false) {
                var countEl = document.getElementById('reader-count');
                if (countEl) countEl.style.display = 'none';
                return;
            }

            if (data.total !== undefined) {
                var numberEl = document.getElementById('count-number');
                var countEl = document.getElementById('reader-count');
                if (numberEl) numberEl.textContent = formatNumber(data.total);
                if (countEl) countEl.style.display = 'block';
            }
        } catch (error) {
            // Silently fail - counter is non-critical
        }
    }

    // Increment count
    async function incrementCount() {
        // Check if tracking is enabled
        if (typeof OTR_ANALYTICS_CONFIG !== 'undefined' && OTR_ANALYTICS_CONFIG.trackingEnabled) {
            try {
                await fetch(API_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'incrementStartReading' })
                });
            } catch (error) {
                // Silently fail - counter is non-critical
            }
        } else {
            console.log('[OTR Analytics]', new Date().toISOString(), 'SUPPRESSED:', 'incrementStartReading', JSON.stringify({ action: 'incrementStartReading' }));
        }
    }

    // Initialize - fetch count on page load
    fetchCount();

    // Hook into password form - increment when password gate is passed
    var passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            // Check if password is correct by watching for gate hide
            setTimeout(function() {
                var gate = document.getElementById('passwordGate');
                if (gate && (gate.style.display === 'none' || gate.classList.contains('hidden'))) {
                    incrementCount();
                }
            }, 100);
        });
    }

})();
