// Service Worker for OFF-THE-RECORD

const CACHE_VERSION = 'v507';
const STATIC_CACHE = 'off-the-record-static-v477';
const CONTENT_CACHE = 'off-the-record-content-v477';
const ANALYTICS_CACHE = 'off-the-record-analytics-v477';

// Files to cache immediately on install
const STATIC_ASSETS = [
    './',
    './index.html',
    './binge-mode.html',
    './offline.html',
    './downloadpage.html',
    './guestbook.html',
    './credentials.html',
    './manifest.json',
    './css/fonts.min.css',
    './css/reset.min.css',
    './css/variables.min.css',
    './css/typography.css',
    './css/layout.min.css',
    './css/components.min.css',
    './css/otr-tier1-states.css',
    './css/share.min.css',
    './fonts/literata-regular.woff2',
    './fonts/literata-regular-ext.woff2',
    './fonts/literata-italic.woff2',
    './fonts/literata-italic-ext.woff2',
    './js/app.min.js',
    './js/reader.min.js',
    './js/navigation.min.js',
    './js/storage.min.js',
    './js/pwa.min.js',
    './js/blog.min.js',
    './js/guestbook.min.js',
    './js/reading-mode.min.js',
    './js/font-size.min.js',
    './js/search.min.js',
    './js/config.min.js',
    './js/analytics-config.js',
    './js/otr-tier1-error-handler.min.js',
    './js/reader-name.js',
    './js/analytics.min.js',
    './js/bookmark.min.js',
    './js/mediaModal.min.js',
    './js/photoGallery.min.js',
    './js/theme.min.js',
    './js/page-controls.min.js',
    './js/share.min.js',
    './js/reader-counter.min.js',
    './js/admin-access.min.js',
    './js/install-nudge.min.js',
    './js/auth-standalone.min.js',
    './js/binge-init.min.js',
    './js/failsafes.js',
    './js/overlay-cleanup.js',
    './js/binge-theme.min.js',
    './js/binge-analytics.min.js',
    './js/pdf-stamper.min.js',
    './data/chapters.js',
    './data/media.js',
    './assets/icons/icon-192.png',
    './assets/icons/icon-512.png',
    './assets/icons/OTR-header.png',
    './assets/icons/tab-logo.svg'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');

    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('Service Worker: Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('Service Worker: Installation complete');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('Service Worker: Installation failed', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((cacheName) => {
                            // Delete old caches
                            return cacheName !== STATIC_CACHE && cacheName !== CONTENT_CACHE;
                        })
                        .map((cacheName) => {
                            console.log('Service Worker: Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        })
                );
            })
            .then(() => {
                console.log('Service Worker: Activation complete');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip cross-origin requests
    if (url.origin !== location.origin) {
        return;
    }

    // Handle different types of requests
    if (isStaticAsset(request)) {
        // Static assets: Cache-first strategy
        event.respondWith(cacheFirst(request));
    } else if (isHTMLRequest(request)) {
        // HTML: Network-first strategy
        event.respondWith(networkFirst(request));
    } else {
        // Everything else: Network-first with cache fallback
        event.respondWith(networkFirst(request));
    }
});

// Cache-first strategy
async function cacheFirst(request) {
    const cache = await caches.open(STATIC_CACHE);
    const cached = await cache.match(request);

    if (cached) {
        // Return cached version
        return cached;
    }

    try {
        // Fetch from network
        const response = await fetch(request);

        // Cache the new response (skip partial content 206)
        if (response.ok && response.status !== 206) {
            cache.put(request, response.clone());
        }

        return response;
    } catch (error) {
        console.error('Fetch failed:', error);
        throw error;
    }
}

// Network-first strategy
async function networkFirst(request) {
    try {
        // Try network first
        const response = await fetch(request);

        if (response.ok && response.status !== 206) {
            // Cache successful responses (skip partial content 206)
            const cache = await caches.open(CONTENT_CACHE);
            cache.put(request, response.clone());
        }

        return response;
    } catch (error) {
        // Network failed, try cache
        const cache = await caches.open(CONTENT_CACHE);
        const cached = await cache.match(request);

        if (cached) {
            return cached;
        }

        // If HTML request and not cached, return offline page
        if (isHTMLRequest(request)) {
            return caches.match('./offline.html');
        }

        throw error;
    }
}

// Helper: Check if request is for a static asset
function isStaticAsset(request) {
    const url = new URL(request.url);
    return url.pathname.match(/\.(css|js|png|jpg|jpeg|svg|ico|woff|woff2|ttf)$/);
}

// Helper: Check if request is for HTML
function isHTMLRequest(request) {
    return request.headers.get('Accept').includes('text/html');
}

// Listen for messages from the app
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => caches.delete(cacheName))
                );
            })
        );
    }

    // Queue analytics for background sync
    if (event.data && event.data.type === 'QUEUE_ANALYTICS') {
        event.waitUntil(queueAnalytics(event.data.payload));
    }
});

// Background sync for analytics
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-analytics') {
        event.waitUntil(syncAnalytics());
    }
});

// Queue analytics data for later sync
async function queueAnalytics(data) {
    const cache = await caches.open(ANALYTICS_CACHE);
    const queue = await getAnalyticsQueue(cache);
    queue.push({
        ...data,
        timestamp: Date.now()
    });
    await cache.put('analytics-queue', new Response(JSON.stringify(queue)));
}

// Get queued analytics
async function getAnalyticsQueue(cache) {
    try {
        const response = await cache.match('analytics-queue');
        if (response) {
            return await response.json();
        }
    } catch (e) {
        // Ignore errors
    }
    return [];
}

// Sync queued analytics when online
async function syncAnalytics() {
    const cache = await caches.open(ANALYTICS_CACHE);
    const queue = await getAnalyticsQueue(cache);

    if (queue.length === 0) return;

    // Process queue
    const successfulItems = [];
    for (const item of queue) {
        try {
            // Try to send analytics
            const response = await fetch(item.url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item.data)
            });
            if (response.ok) {
                successfulItems.push(item);
            }
        } catch (e) {
            // Will retry on next sync
        }
    }

    // Remove successful items from queue
    const remaining = queue.filter(item => !successfulItems.includes(item));
    await cache.put('analytics-queue', new Response(JSON.stringify(remaining)));
}
