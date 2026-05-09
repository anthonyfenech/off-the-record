// PWA - Service worker registration with kill-switch infrastructure
// Per stress test 20260508-2345 finding P2: this file previously
// unregistered all service workers unconditionally. It now registers
// based on URL override > remote config > register.

class PWA {
    constructor() {
        // Silent initialization
    }

    // ============================================================
    // PWA / Service Worker initialization
    // Kill-switch priority: URL override > remote config > register
    // ============================================================
    async init() {
        if (!('serviceWorker' in navigator)) {
            console.info('[PWA] Service Worker API not supported');
            return;
        }

        // Layer 1: URL override (?nopwa=1) — session-only kill switch
        try {
            const url = new URL(window.location.href);
            if (url.searchParams.get('nopwa') === '1') {
                console.info('[PWA] Disabled by URL override (?nopwa=1)');
                await this.unregisterAllSW();
                return;
            }
        } catch (e) {
            // URL parse failed — non-fatal, continue
        }

        // Layer 2: Remote config (pwa-config.json) — global kill switch
        let config;
        try {
            const r = await fetch('/pwa-config.json', { cache: 'no-cache' });
            if (!r.ok) throw new Error('config fetch failed: ' + r.status);
            config = await r.json();
        } catch (e) {
            console.warn('[PWA] Could not fetch pwa-config.json:', e);
            // Fail SAFE: leave SW state unchanged. Don't register, don't
            // unregister. Status quo is the safest default.
            return;
        }

        if (!config || config.enabled !== true) {
            console.info('[PWA] Disabled by remote config');
            await this.unregisterAllSW();
            return;
        }

        // Layer 3: Register SW
        await this.registerServiceWorker();
    }

    async registerServiceWorker() {
        try {
            const reg = await navigator.serviceWorker.register('/sw.js', {
                scope: '/'
            });
            console.info('[PWA] Service Worker registered, scope:', reg.scope);

            // Force-update detection
            reg.addEventListener('updatefound', () => {
                const newWorker = reg.installing;
                if (!newWorker) return;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' &&
                        navigator.serviceWorker.controller) {
                        console.info('[PWA] New version available; will activate on next visit');
                    }
                });
            });
        } catch (error) {
            console.error('[PWA] Service Worker registration failed:', error);
        }
    }

    async unregisterAllSW() {
        if (!('serviceWorker' in navigator)) return;
        try {
            const regs = await navigator.serviceWorker.getRegistrations();
            for (const reg of regs) {
                await reg.unregister();
            }
        } catch (e) {
            console.warn('[PWA] unregisterAllSW failed:', e);
        }
    }
}

// Export single instance
export const pwa = new PWA();
