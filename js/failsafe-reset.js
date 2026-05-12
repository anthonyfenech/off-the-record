// FAILSAFE: URL kill switch — append ?reset=true to URL to clear all overlays.
// Loaded as the first <script> on user-facing pages so the injected <style>
// enters the head before stylesheets that might restore overlay visibility.
(function () {
    if (window.location.search.indexOf('reset=true') === -1) return;
    var s = document.createElement('style');
    s.textContent = '*{pointer-events:auto!important}.overlay,.modal,.toc-sidebar,.lightbox-overlay,.photo-modal-overlay,#overlay,#passwordGate,.prompt-overlay,#prompt-modal,[class*="overlay"],[class*="modal"],[class*="lightbox"]{display:none!important;pointer-events:none!important;visibility:hidden!important;opacity:0!important;z-index:-1!important}body{overflow:auto!important;pointer-events:auto!important}';
    document.head.appendChild(s);
    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.active').forEach(function (el) { el.classList.remove('active'); });
        document.querySelectorAll('.overlay,.modal,.toc-sidebar,.lightbox-overlay,.photo-modal-overlay,#overlay,#passwordGate,.prompt-overlay,#prompt-modal,[class*="overlay"],[class*="modal"],[class*="lightbox"]').forEach(function (el) {
            el.style.cssText = 'display:none!important;pointer-events:none!important;visibility:hidden!important;opacity:0!important;z-index:-1!important';
        });
        document.body.style.overflow = 'auto';
        document.body.style.pointerEvents = 'auto';
        document.body.classList.remove('sidebar-open', 'modal-open', 'no-scroll', 'home-page');
        console.log('NUCLEAR RESET TRIGGERED — all overlays destroyed. Remove ?reset=true from URL to restore normal behavior.');
    });
})();
