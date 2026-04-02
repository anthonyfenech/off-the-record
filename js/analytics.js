/**
 * Reader Analytics - Enhanced Engagement Intelligence System
 * Tracks: scroll depth, reading behavior, media assets, chapter flow, device/session
 */

(function() {
    'use strict';

    const GOOGLE_SHEETS_URL = OTR_ANALYTICS_CONFIG.analyticsScriptUrl;

    // ========== SESSION MANAGEMENT ==========

    function generateSessionId() {
        const existingId = sessionStorage.getItem('analytics_session_id');
        if (existingId) return existingId;
        const newId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 11);
        sessionStorage.setItem('analytics_session_id', newId);
        return newId;
    }

    function getVisitorId() {
        let visitorId = localStorage.getItem('analytics_visitor_id');
        if (!visitorId) {
            visitorId = 'vis_' + Date.now() + '_' + Math.random().toString(36).substring(2, 11);
            localStorage.setItem('analytics_visitor_id', visitorId);
        }
        return visitorId;
    }

    function isReturnVisitor() {
        const visitCount = parseInt(localStorage.getItem('analytics_visit_count') || '0', 10);
        localStorage.setItem('analytics_visit_count', (visitCount + 1).toString());
        return visitCount > 0;
    }

    // ========== DEVICE DETECTION ==========

    function getDeviceType() {
        const width = window.innerWidth;
        if (width <= 480) return 'mobile';
        if (width <= 1024) return 'tablet';
        return 'desktop';
    }

    function getBrowserInfo() {
        const ua = navigator.userAgent;
        if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
        if (ua.includes('Firefox')) return 'Firefox';
        if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
        if (ua.includes('Edg')) return 'Edge';
        return 'Other';
    }

    function getScreenSize() {
        return `${window.screen.width}x${window.screen.height}`;
    }

    // ========== DATA TRANSMISSION ==========

    const FAILED_QUEUE_KEY = 'analytics_failed_queue';
    const eventQueue = [];
    let isProcessingQueue = false;

    // Load any previously failed events from localStorage
    function loadFailedQueue() {
        try {
            const stored = localStorage.getItem(FAILED_QUEUE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            return [];
        }
    }

    // Save failed events to localStorage for retry
    function saveFailedQueue(queue) {
        try {
            // Keep max 100 events to prevent storage overflow
            const trimmed = queue.slice(-100);
            localStorage.setItem(FAILED_QUEUE_KEY, JSON.stringify(trimmed));
        } catch (e) {
            // Storage full or unavailable - silently fail
        }
    }

    // Clear failed queue after successful sync
    function clearFailedQueue() {
        try {
            localStorage.removeItem(FAILED_QUEUE_KEY);
        } catch (e) {
            // Ignore
        }
    }

    async function sendToGoogleSheets(data, isRetry = false) {
        const enrichedData = {
            ...data,
            readerName: window.OTR_READER_NAME || 'Unknown Reader',
            visitorId: getVisitorId(),
            sessionId: generateSessionId(),
            deviceType: getDeviceType(),
            browser: getBrowserInfo(),
            screenSize: getScreenSize(),
            isReturnVisitor: isReturnVisitor(),
            timestamp: data.timestamp || new Date().toISOString(),
            url: window.location.href,
            isRetry: isRetry
        };

        // If offline, queue for later
        if (!navigator.onLine) {
            const failedQueue = loadFailedQueue();
            failedQueue.push(enrichedData);
            saveFailedQueue(failedQueue);
            return false;
        }

        // Check if tracking is enabled
        if (typeof OTR_ANALYTICS_CONFIG !== 'undefined' && OTR_ANALYTICS_CONFIG.trackingEnabled) {
            try {
                await fetch(GOOGLE_SHEETS_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(enrichedData)
                });
                return true;
            } catch (error) {
                // Queue failed event for retry
                const failedQueue = loadFailedQueue();
                failedQueue.push(enrichedData);
                saveFailedQueue(failedQueue);
                console.warn('[Analytics] Queued for retry:', error.message);
                return false;
            }
        } else {
            console.log('[OTR Analytics]', new Date().toISOString(), 'SUPPRESSED:', data.event || 'unknown', JSON.stringify(enrichedData));
            return true;
        }
    }

    function queueEvent(data) {
        eventQueue.push(data);
        processQueue();
    }

    async function processQueue() {
        if (isProcessingQueue || eventQueue.length === 0) return;
        isProcessingQueue = true;

        while (eventQueue.length > 0) {
            const data = eventQueue.shift();
            await sendToGoogleSheets(data);
            await new Promise(resolve => setTimeout(resolve, 100)); // Rate limit
        }

        isProcessingQueue = false;
    }

    // Retry failed events when back online
    async function retryFailedEvents() {
        const failedQueue = loadFailedQueue();
        if (failedQueue.length === 0) return;

        clearFailedQueue();

        for (const event of failedQueue) {
            await sendToGoogleSheets(event, true);
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    // Listen for online event to retry failed events
    window.addEventListener('online', () => {
        setTimeout(retryFailedEvents, 1000);
    });

    // ========== PAGE STATE ==========

    let currentPage = null;
    let currentChapter = null;
    let pageStartTime = null;
    let sessionStartTime = Date.now();

    // ========== SCROLL TRACKING ==========

    const scrollState = {
        maxDepth: 0,
        milestones: { 25: false, 50: false, 75: false, 100: false },
        scrollEvents: [],
        lastScrollTime: 0,
        scrollBackCount: 0,
        lastScrollTop: 0
    };

    function getScrollDepth() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollHeight <= 0) return 100;
        return Math.min(100, Math.round((scrollTop / scrollHeight) * 100));
    }

    function trackScrollMilestone(depth) {
        const milestones = [25, 50, 75, 100];
        milestones.forEach(milestone => {
            if (depth >= milestone && !scrollState.milestones[milestone]) {
                scrollState.milestones[milestone] = true;
                queueEvent({
                    event: 'scroll_milestone',
                    page: currentPage,
                    chapter: currentChapter,
                    milestone: milestone,
                    timeToMilestone: Math.round((Date.now() - pageStartTime) / 1000)
                });
            }
        });
    }

    function handleScroll() {
        const now = Date.now();
        if (now - scrollState.lastScrollTime < 200) return; // Throttle
        scrollState.lastScrollTime = now;

        const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
        const depth = getScrollDepth();

        // Track max depth
        if (depth > scrollState.maxDepth) {
            scrollState.maxDepth = depth;
        }

        // Track scroll-back behavior
        if (currentScrollTop < scrollState.lastScrollTop - 200) {
            scrollState.scrollBackCount++;
        }
        scrollState.lastScrollTop = currentScrollTop;

        // Track milestones
        trackScrollMilestone(depth);

        // Calculate scroll speed
        const scrollDelta = Math.abs(currentScrollTop - scrollState.lastScrollTop);
        const timeDelta = now - scrollState.lastScrollTime;
        const scrollSpeed = timeDelta > 0 ? scrollDelta / timeDelta : 0;

        // Store scroll event for analysis
        if (scrollState.scrollEvents.length < 100) {
            scrollState.scrollEvents.push({
                depth,
                speed: scrollSpeed,
                timestamp: now - pageStartTime
            });
        }
    }

    function resetScrollState() {
        scrollState.maxDepth = 0;
        scrollState.milestones = { 25: false, 50: false, 75: false, 100: false };
        scrollState.scrollEvents = [];
        scrollState.scrollBackCount = 0;
        scrollState.lastScrollTop = 0;
    }

    // ========== TAB VISIBILITY ==========

    let hiddenTime = 0;
    let hiddenStart = null;

    function handleVisibilityChange() {
        if (document.hidden) {
            hiddenStart = Date.now();
            queueEvent({
                event: 'tab_hidden',
                page: currentPage,
                chapter: currentChapter
            });
        } else if (hiddenStart) {
            hiddenTime += Date.now() - hiddenStart;
            hiddenStart = null;
            queueEvent({
                event: 'tab_visible',
                page: currentPage,
                chapter: currentChapter,
                hiddenDuration: Math.round(hiddenTime / 1000)
            });
        }
    }

    // ========== MEDIA ASSET TRACKING ==========

    const assetState = {
        viewed: {},
        openTimes: {}
    };

    function trackAssetOpen(assetId, assetType, chapterContext) {
        assetState.openTimes[assetId] = Date.now();

        if (!assetState.viewed[assetId]) {
            assetState.viewed[assetId] = { count: 0, totalTime: 0 };
        }
        assetState.viewed[assetId].count++;

        queueEvent({
            event: 'asset_open',
            assetId: assetId,
            assetType: assetType,
            chapter: chapterContext || currentChapter,
            page: currentPage,
            viewCount: assetState.viewed[assetId].count
        });
    }

    function trackAssetClose(assetId) {
        if (assetState.openTimes[assetId]) {
            const viewDuration = Math.round((Date.now() - assetState.openTimes[assetId]) / 1000);

            if (assetState.viewed[assetId]) {
                assetState.viewed[assetId].totalTime += viewDuration;
            }

            queueEvent({
                event: 'asset_close',
                assetId: assetId,
                viewDuration: viewDuration,
                totalTime: assetState.viewed[assetId]?.totalTime || viewDuration,
                chapter: currentChapter,
                page: currentPage
            });

            delete assetState.openTimes[assetId];
        }
    }

    function trackEmojiClick(emojiType, assetId, chapter) {
        queueEvent({
            event: 'emoji_click',
            emojiType: emojiType,
            assetId: assetId,
            chapter: chapter || currentChapter,
            page: currentPage
        });
    }

    // ========== CHAPTER FLOW TRACKING ==========

    const chapterHistory = [];
    let entryPoint = null;

    function trackChapterEnter(chapterNum, chapterName) {
        const prevChapter = currentChapter;
        currentChapter = chapterNum;

        if (!entryPoint) {
            entryPoint = {
                chapter: chapterNum,
                referrer: document.referrer || 'direct',
                timestamp: Date.now()
            };
        }

        chapterHistory.push({
            chapter: chapterNum,
            timestamp: Date.now(),
            from: prevChapter
        });

        queueEvent({
            event: 'chapter_enter',
            chapter: chapterNum,
            chapterName: chapterName,
            fromChapter: prevChapter,
            entryPoint: entryPoint.chapter === chapterNum,
            navigationPattern: getNavigationPattern()
        });
    }

    function trackChapterExit(chapterNum, reason) {
        queueEvent({
            event: 'chapter_exit',
            chapter: chapterNum,
            exitReason: reason || 'navigation',
            scrollDepth: scrollState.maxDepth,
            timeSpent: pageStartTime ? Math.round((Date.now() - pageStartTime) / 1000) : 0,
            scrollBackCount: scrollState.scrollBackCount,
            completed: scrollState.maxDepth >= 90
        });
    }

    function getNavigationPattern() {
        if (chapterHistory.length < 2) return 'entry';

        const lastTwo = chapterHistory.slice(-2);
        const diff = lastTwo[1].chapter - lastTwo[0].chapter;

        if (diff === 1) return 'linear';
        if (diff === -1) return 'backward';
        if (Math.abs(diff) > 1) return 'jump';
        return 'other';
    }

    // ========== PAGE VIEW & TIME TRACKING ==========

    function trackPageView(pageName, chapterNum, chapterName) {
        // Send exit data for previous page
        if (currentPage && pageStartTime) {
            const elapsed = Math.round((Date.now() - pageStartTime) / 1000);
            const activeTime = elapsed - Math.round(hiddenTime / 1000);

            queueEvent({
                event: 'page_exit',
                page: currentPage,
                chapter: currentChapter,
                timeSpent: elapsed,
                activeTime: activeTime,
                scrollDepth: scrollState.maxDepth,
                scrollBackCount: scrollState.scrollBackCount,
                completed: scrollState.maxDepth >= 90
            });
        }

        // Reset state for new page
        currentPage = pageName;
        pageStartTime = Date.now();
        hiddenTime = 0;
        resetScrollState();

        if (chapterNum) {
            trackChapterEnter(chapterNum, chapterName);
        }

        queueEvent({
            event: 'pageview',
            page: pageName,
            chapter: chapterNum,
            chapterName: chapterName,
            referrer: document.referrer || 'direct',
            entryPoint: !entryPoint
        });
    }

    // ========== SESSION SUMMARY ==========

    function sendSessionSummary() {
        const sessionDuration = Math.round((Date.now() - sessionStartTime) / 1000);

        queueEvent({
            event: 'session_summary',
            sessionDuration: sessionDuration,
            chaptersViewed: [...new Set(chapterHistory.map(c => c.chapter))].length,
            totalChapters: chapterHistory.length,
            assetsViewed: Object.keys(assetState.viewed).length,
            lastChapter: currentChapter,
            lastScrollDepth: scrollState.maxDepth,
            navigationPatterns: chapterHistory.slice(0, 20).map(c => c.chapter).join('->'),
            entryChapter: entryPoint?.chapter
        });
    }

    // ========== UNLOAD HANDLING ==========

    function handleUnload() {
        if (currentPage && pageStartTime) {
            const elapsed = Math.round((Date.now() - pageStartTime) / 1000);
            const data = {
                event: 'page_unload',
                readerName: window.OTR_READER_NAME || 'Unknown Reader',
                visitorId: getVisitorId(),
                sessionId: generateSessionId(),
                page: currentPage,
                chapter: currentChapter,
                timeSpent: elapsed,
                scrollDepth: scrollState.maxDepth,
                timestamp: new Date().toISOString()
            };

            // Check if tracking is enabled
            if (typeof OTR_ANALYTICS_CONFIG !== 'undefined' && OTR_ANALYTICS_CONFIG.trackingEnabled) {
                try {
                    navigator.sendBeacon(GOOGLE_SHEETS_URL, JSON.stringify(data));
                } catch (error) {
                    // Ignore beacon errors
                }
            } else {
                console.log('[OTR Analytics]', new Date().toISOString(), 'SUPPRESSED:', 'page_unload', JSON.stringify(data));
            }
        }
    }

    // ========== EVENT LISTENERS ==========

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleUnload);
    window.addEventListener('pagehide', handleUnload);

    // Send session summary periodically (every 5 minutes)
    setInterval(sendSessionSummary, 5 * 60 * 1000);

    // ========== PUBLIC API ==========

    window.analytics = {
        // Core tracking
        trackPageView: trackPageView,
        trackEvent: function(eventType, eventData) {
            queueEvent({ event: eventType, ...eventData, page: currentPage, chapter: currentChapter });
        },

        // Asset tracking
        trackAssetOpen: trackAssetOpen,
        trackAssetClose: trackAssetClose,
        trackEmojiClick: trackEmojiClick,

        // Chapter tracking
        trackChapterEnter: trackChapterEnter,
        trackChapterExit: trackChapterExit,

        // Utilities
        getSessionId: generateSessionId,
        getVisitorId: getVisitorId,
        getReaderName: function() { return window.OTR_READER_NAME || 'Unknown Reader'; },
        getDeviceType: getDeviceType,
        getScrollDepth: getScrollDepth,

        // State access (for debugging/dashboard)
        getState: function() {
            return {
                currentPage,
                currentChapter,
                scrollDepth: scrollState.maxDepth,
                chapterHistory: chapterHistory.slice(-10),
                assetsViewed: Object.keys(assetState.viewed).length,
                sessionDuration: Math.round((Date.now() - sessionStartTime) / 1000)
            };
        }
    };

    // Initialize
})();
