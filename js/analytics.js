/**
 * Reader Analytics - Google Sheets Integration
 * Tracks page views, time spent, device type, and referrer
 */

(function() {
    'use strict';

    const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzrquxCfMdj1C2t43Qh8kH2RFg-_EmOz5RbaNTqJbMsIWtO_umHXtftiMfELm6LFPWp/exec';

    // Session management
    function generateSessionId() {
        const existingId = sessionStorage.getItem('analytics_session_id');
        if (existingId) {
            return existingId;
        }
        const newId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 11);
        sessionStorage.setItem('analytics_session_id', newId);
        return newId;
    }

    // Device detection
    function getDeviceType() {
        return window.innerWidth <= 768 ? 'mobile' : 'desktop';
    }

    // Send data to Google Sheets
    async function sendToGoogleSheets(data) {
        try {
            const response = await fetch(GOOGLE_SHEETS_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            console.log('[Analytics] Data sent:', data);
            return true;
        } catch (error) {
            console.error('[Analytics] Error sending data:', error);
            return false;
        }
    }

    // Track page view
    function trackPageView(pageName) {
        const data = {
            event: 'pageview',
            sessionId: generateSessionId(),
            page: pageName,
            deviceType: getDeviceType(),
            referrer: document.referrer || 'direct',
            timestamp: new Date().toISOString()
        };
        sendToGoogleSheets(data);
    }

    // Track time spent
    function trackTimeSpent(pageName, seconds) {
        const data = {
            event: 'timespent',
            sessionId: generateSessionId(),
            page: pageName,
            seconds: seconds,
            timestamp: new Date().toISOString()
        };
        sendToGoogleSheets(data);
    }

    // Time tracking state
    let currentPage = null;
    let pageStartTime = null;

    // Start tracking time for a page
    function startTimeTracking(pageName) {
        // Send time for previous page if exists
        if (currentPage && pageStartTime) {
            const elapsed = Math.round((Date.now() - pageStartTime) / 1000);
            if (elapsed > 0) {
                trackTimeSpent(currentPage, elapsed);
            }
        }
        currentPage = pageName;
        pageStartTime = Date.now();
    }

    // Handle page unload - send final time tracking
    function handleUnload() {
        if (currentPage && pageStartTime) {
            const elapsed = Math.round((Date.now() - pageStartTime) / 1000);
            if (elapsed > 0) {
                // Use sendBeacon for reliable delivery on page unload
                const data = {
                    event: 'timespent',
                    sessionId: generateSessionId(),
                    page: currentPage,
                    seconds: elapsed,
                    timestamp: new Date().toISOString()
                };
                try {
                    navigator.sendBeacon(GOOGLE_SHEETS_URL, JSON.stringify(data));
                    console.log('[Analytics] Beacon sent on unload:', data);
                } catch (error) {
                    console.error('[Analytics] Beacon error:', error);
                }
            }
        }
    }

    // Set up unload listener
    window.addEventListener('beforeunload', handleUnload);
    window.addEventListener('pagehide', handleUnload);

    // Track custom events (e.g., emoji clicks)
    function trackEvent(eventType, eventData) {
        const data = {
            event: eventType,
            sessionId: generateSessionId(),
            page: currentPage || 'Unknown',
            timestamp: new Date().toISOString(),
            ...eventData
        };
        sendToGoogleSheets(data);
    }

    // Expose functions globally
    window.analytics = {
        trackPageView: function(pageName) {
            trackPageView(pageName);
            startTimeTracking(pageName);
        },
        trackTimeSpent: trackTimeSpent,
        trackEvent: trackEvent,
        getSessionId: generateSessionId,
        getDeviceType: getDeviceType
    };

    // Auto-initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            console.log('[Analytics] Initialized with session:', generateSessionId());
        });
    } else {
        console.log('[Analytics] Initialized with session:', generateSessionId());
    }
})();
