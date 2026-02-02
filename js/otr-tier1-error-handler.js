/**
 * OTR Tier 1: Error Handling & Offline Detection
 *
 * RULES:
 * - Creates ONLY new DOM elements with .otr-tier1- classes
 * - NEVER modifies existing DOM elements (style, classes, structure)
 * - NEVER touches document.body.style
 * - NEVER uses document.body.prepend()
 * - NEVER adds/removes classes on document.body
 * - Uses document.body.appendChild() for fixed-position elements
 * - Broken images: replaces src with SVG data URI (keeps <img> tag)
 * - Error handlers: LOG ONLY, never swallow/preventDefault
 */
(function() {
  'use strict';

  // ══════════════════════════════════════════
  // 1. OFFLINE BAR
  // ══════════════════════════════════════════
  var offlineBar = document.createElement('div');
  offlineBar.className = 'otr-tier1-offline-bar';
  offlineBar.setAttribute('role', 'status');
  offlineBar.setAttribute('aria-live', 'polite');
  offlineBar.textContent = '\u2014 offline mode \u2014';

  // appendChild (NEVER prepend). position:fixed means DOM order
  // does not affect visual layout.
  document.body.appendChild(offlineBar);

  function setOfflineState(isOffline) {
    // Set className on OUR element only — never on body
    if (isOffline) {
      offlineBar.className = 'otr-tier1-offline-bar otr-tier1-offline-bar--visible';
    } else {
      offlineBar.className = 'otr-tier1-offline-bar';
    }
  }

  window.addEventListener('online', function() { setOfflineState(false); });
  window.addEventListener('offline', function() { setOfflineState(true); });
  if (!navigator.onLine) { setOfflineState(true); }

  // ══════════════════════════════════════════
  // 2. GLOBAL ERROR LOGGING (observe-only)
  // ══════════════════════════════════════════
  // Log errors for debugging. DO NOT call preventDefault or
  // stopPropagation — existing app code (prompts, admin panel,
  // analytics) needs to see these errors.
  window.addEventListener('error', function(e) {
    console.warn('[OTR] Error:', e.message, '| File:', e.filename, '| Line:', e.lineno);
    // DO NOT call e.preventDefault()
    // DO NOT return true
  });

  window.addEventListener('unhandledrejection', function(e) {
    console.warn('[OTR] Unhandled promise:', e.reason);
    // DO NOT call e.preventDefault()
  });

  // ══════════════════════════════════════════
  // 3. IMAGE ERROR HANDLING
  // ══════════════════════════════════════════
  document.addEventListener('error', function(e) {
    var el = e.target;
    if (el.tagName !== 'IMG') return;
    if (el.dataset.otrErrorHandled) return;

    el.dataset.otrErrorHandled = 'true';

    var msg = navigator.onLine ? 'IMAGE UNAVAILABLE' : 'AVAILABLE ONLINE';
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">' +
      '<rect fill="#f0f0f0" width="300" height="200" rx="4"/>' +
      '<text fill="#aaa" font-family="Courier New,monospace" font-size="11" ' +
      'text-anchor="middle" x="150" y="105">' + msg + '</text></svg>';

    // Replace src only — element stays as <img>, DOM unchanged
    el.src = 'data:image/svg+xml,' + encodeURIComponent(svg);
    if (el.hasAttribute('srcset')) {
      el.removeAttribute('srcset');
    }
    // DO NOT modify el.style
    // DO NOT modify el.className
    // DO NOT modify el.parentNode
  }, true);

  // ══════════════════════════════════════════
  // 4. AUDIO ERROR HANDLING (log-only)
  // ══════════════════════════════════════════
  document.addEventListener('error', function(e) {
    if (e.target.tagName === 'AUDIO' || e.target.tagName === 'SOURCE') {
      console.warn('[OTR] Audio load failed:', e.target.src || '(no src)');
    }
  }, true);

})();
