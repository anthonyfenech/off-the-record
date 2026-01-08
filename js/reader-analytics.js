// Reader Analytics System for OFF-THE-RECORD
// Tracks reading behavior silently in background

class ReaderAnalytics {
    constructor() {
        this.sessionId = this.getOrCreateSessionId();
        this.readerId = this.getOrCreateReaderId();
        this.currentChapter = null;
        this.chapterStartTime = null;
        this.scrollMilestones = { 0: false, 25: false, 50: false, 75: false, 100: false };
        this.isTracking = false;
        this.heartbeatInterval = null;
        this.sheetsEndpoint = localStorage.getItem('analytics_sheetsEndpoint') || '';
        this.localQueue = [];
        this.chaptersRead = new Set(JSON.parse(localStorage.getItem('analytics_chaptersRead') || '[]'));
        this.readingHistory = JSON.parse(localStorage.getItem('analytics_readingHistory') || '[]');
        this.lastChapter = localStorage.getItem('analytics_lastChapter') || null;

        // Device detection
        this.deviceType = this.detectDevice();
        this.userAgent = navigator.userAgent;

        // Bind methods
        this.handleScroll = this.handleScroll.bind(this);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
        this.handleBeforeUnload = this.handleBeforeUnload.bind(this);
    }

    // Initialize analytics
    init() {
        // Check if analytics is enabled
        if (localStorage.getItem('admin_analyticsEnabled') === 'false') {
            console.log('Analytics disabled');
            return;
        }

        // Set up event listeners
        document.addEventListener('visibilitychange', this.handleVisibilityChange);
        window.addEventListener('beforeunload', this.handleBeforeUnload);

        // Listen for chapter changes
        window.addEventListener('chapterLoaded', (e) => {
            this.trackChapterView(e.detail.chapterId, e.detail.chapterTitle);
        });

        // Listen for home page
        window.addEventListener('homePageLoaded', () => {
            this.stopTracking();
            this.trackEvent('home_view', { from: this.lastChapter });
        });

        // Process any queued events
        this.processQueue();

        // Update live reader count
        this.updateLiveCount(true);

        console.log('Reader Analytics initialized', { sessionId: this.sessionId, readerId: this.readerId });
    }

    // Generate or retrieve session ID (new each visit)
    getOrCreateSessionId() {
        let sessionId = sessionStorage.getItem('analytics_sessionId');
        if (!sessionId) {
            sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('analytics_sessionId', sessionId);
        }
        return sessionId;
    }

    // Generate or retrieve reader ID (persistent across visits)
    getOrCreateReaderId() {
        let readerId = localStorage.getItem('analytics_readerId');
        if (!readerId) {
            readerId = 'reader_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('analytics_readerId', readerId);
        }
        return readerId;
    }

    // Detect device type
    detectDevice() {
        const ua = navigator.userAgent;
        if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
        if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return 'mobile';
        return 'desktop';
    }

    // Track chapter view
    trackChapterView(chapterId, chapterTitle) {
        // Stop tracking previous chapter
        if (this.isTracking) {
            this.stopTracking();
        }

        this.currentChapter = { id: chapterId, title: chapterTitle };
        this.chapterStartTime = Date.now();
        this.scrollMilestones = { 0: true, 25: false, 50: false, 75: false, 100: false };
        this.isTracking = true;

        // Check if re-read
        const isReread = this.chaptersRead.has(chapterId);
        this.chaptersRead.add(chapterId);
        localStorage.setItem('analytics_chaptersRead', JSON.stringify([...this.chaptersRead]));

        // Track reading pattern (linear vs jumping)
        const readingPattern = this.detectReadingPattern(chapterId);

        // Add to reading history
        this.readingHistory.push({
            chapterId,
            timestamp: Date.now(),
            fromChapter: this.lastChapter
        });
        if (this.readingHistory.length > 100) this.readingHistory.shift();
        localStorage.setItem('analytics_readingHistory', JSON.stringify(this.readingHistory));
        this.lastChapter = chapterId;
        localStorage.setItem('analytics_lastChapter', chapterId);

        // Send event
        this.trackEvent('chapter_view', {
            chapterId,
            chapterTitle,
            isReread,
            readingPattern,
            entryPoint: this.readingHistory.length === 1
        });

        // Set up scroll tracking
        window.addEventListener('scroll', this.handleScroll, { passive: true });

        // Start heartbeat for time tracking
        this.startHeartbeat();
    }

    // Detect reading pattern
    detectReadingPattern(currentChapterId) {
        if (this.readingHistory.length < 2) return 'start';

        const lastEntry = this.readingHistory[this.readingHistory.length - 1];
        if (!lastEntry || !lastEntry.chapterId) return 'unknown';

        const lastId = parseInt(lastEntry.chapterId);
        const currentId = parseInt(currentChapterId);

        if (currentId === lastId + 1) return 'linear_forward';
        if (currentId === lastId - 1) return 'linear_backward';
        if (currentId > lastId) return 'jump_forward';
        if (currentId < lastId) return 'jump_backward';
        return 'same';
    }

    // Handle scroll for depth tracking
    handleScroll() {
        if (!this.isTracking) return;

        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;

        // Check milestones
        const milestones = [25, 50, 75, 100];
        for (const milestone of milestones) {
            if (scrollPercent >= milestone && !this.scrollMilestones[milestone]) {
                this.scrollMilestones[milestone] = true;
                this.trackEvent('scroll_milestone', {
                    chapterId: this.currentChapter?.id,
                    milestone,
                    timeToReach: Math.round((Date.now() - this.chapterStartTime) / 1000)
                });

                // Dispatch event for survey system
                if (milestone === 100) {
                    window.dispatchEvent(new CustomEvent('chapterComplete', {
                        detail: { chapterId: this.currentChapter?.id, chapterTitle: this.currentChapter?.title }
                    }));
                }
            }
        }
    }

    // Start heartbeat for accurate time tracking
    startHeartbeat() {
        if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);

        this.heartbeatInterval = setInterval(() => {
            if (this.isTracking && document.visibilityState === 'visible') {
                this.trackEvent('heartbeat', {
                    chapterId: this.currentChapter?.id,
                    timeSpent: Math.round((Date.now() - this.chapterStartTime) / 1000),
                    scrollDepth: this.getMaxScrollDepth()
                }, true); // silent - don't queue if offline
            }
        }, 30000); // Every 30 seconds
    }

    // Get max scroll depth reached
    getMaxScrollDepth() {
        for (const m of [100, 75, 50, 25, 0]) {
            if (this.scrollMilestones[m]) return m;
        }
        return 0;
    }

    // Stop tracking current chapter
    stopTracking() {
        if (!this.isTracking) return;

        const timeSpent = Math.round((Date.now() - this.chapterStartTime) / 1000);
        const maxScroll = this.getMaxScrollDepth();

        // Track chapter exit
        this.trackEvent('chapter_exit', {
            chapterId: this.currentChapter?.id,
            chapterTitle: this.currentChapter?.title,
            timeSpent,
            maxScrollDepth: maxScroll,
            completed: this.scrollMilestones[100],
            milestones: { ...this.scrollMilestones }
        });

        // Clean up
        window.removeEventListener('scroll', this.handleScroll);
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
            this.heartbeatInterval = null;
        }
        this.isTracking = false;
    }

    // Handle visibility change (tab switch, minimize)
    handleVisibilityChange() {
        if (document.visibilityState === 'hidden') {
            this.updateLiveCount(false);
            if (this.isTracking) {
                this.trackEvent('tab_hidden', {
                    chapterId: this.currentChapter?.id,
                    timeSpent: Math.round((Date.now() - this.chapterStartTime) / 1000)
                });
            }
        } else {
            this.updateLiveCount(true);
            if (this.isTracking) {
                this.trackEvent('tab_visible', {
                    chapterId: this.currentChapter?.id
                });
            }
        }
    }

    // Handle page unload
    handleBeforeUnload() {
        this.updateLiveCount(false);
        if (this.isTracking) {
            const timeSpent = Math.round((Date.now() - this.chapterStartTime) / 1000);

            // Use sendBeacon for reliable delivery
            this.trackEvent('session_end', {
                chapterId: this.currentChapter?.id,
                timeSpent,
                maxScrollDepth: this.getMaxScrollDepth(),
                totalChaptersRead: this.chaptersRead.size,
                exitPoint: this.currentChapter?.id
            }, false, true);
        }
    }

    // Update live reader count
    updateLiveCount(isActive) {
        const data = {
            type: 'live_count',
            readerId: this.readerId,
            isActive,
            timestamp: Date.now()
        };

        if (this.sheetsEndpoint) {
            navigator.sendBeacon?.(this.sheetsEndpoint, JSON.stringify(data)) ||
            fetch(this.sheetsEndpoint, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(data)
            }).catch(() => {});
        }
    }

    // Main event tracking function
    trackEvent(eventType, data = {}, silent = false, useBeacon = false) {
        const event = {
            type: eventType,
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            readerId: this.readerId,
            deviceType: this.deviceType,
            url: window.location.href,
            ...data
        };

        // Always save to localStorage as backup
        this.saveToLocalStorage(event);

        // Send to Google Sheets
        if (this.sheetsEndpoint) {
            if (useBeacon && navigator.sendBeacon) {
                navigator.sendBeacon(this.sheetsEndpoint, JSON.stringify(event));
            } else if (!silent) {
                this.sendToSheets(event);
            }
        } else if (!silent) {
            // Queue for later if no endpoint configured
            this.localQueue.push(event);
            localStorage.setItem('analytics_queue', JSON.stringify(this.localQueue));
        }

        console.log('Analytics event:', eventType, data);
    }

    // Send data to Google Sheets
    async sendToSheets(event) {
        if (!this.sheetsEndpoint) return;

        try {
            await fetch(this.sheetsEndpoint, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(event)
            });
        } catch (error) {
            // Queue for retry
            this.localQueue.push(event);
            localStorage.setItem('analytics_queue', JSON.stringify(this.localQueue));
        }
    }

    // Process queued events
    async processQueue() {
        const queue = JSON.parse(localStorage.getItem('analytics_queue') || '[]');
        if (queue.length === 0 || !this.sheetsEndpoint) return;

        for (const event of queue) {
            try {
                await this.sendToSheets(event);
            } catch (e) {
                // Keep in queue
                return;
            }
        }

        // Clear queue on success
        localStorage.removeItem('analytics_queue');
        this.localQueue = [];
    }

    // Save to localStorage as backup
    saveToLocalStorage(event) {
        const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
        events.push(event);

        // Keep last 500 events
        if (events.length > 500) events.shift();

        localStorage.setItem('analytics_events', JSON.stringify(events));
    }

    // Get all local analytics data (for dashboard)
    getLocalData() {
        return {
            events: JSON.parse(localStorage.getItem('analytics_events') || '[]'),
            chaptersRead: [...this.chaptersRead],
            readingHistory: this.readingHistory,
            readerId: this.readerId,
            sessionId: this.sessionId
        };
    }

    // Clear all analytics data
    clearData() {
        localStorage.removeItem('analytics_events');
        localStorage.removeItem('analytics_queue');
        localStorage.removeItem('analytics_chaptersRead');
        localStorage.removeItem('analytics_readingHistory');
        localStorage.removeItem('analytics_lastChapter');
        this.chaptersRead.clear();
        this.readingHistory = [];
        this.localQueue = [];
    }

    // Set Google Sheets endpoint
    setEndpoint(url) {
        this.sheetsEndpoint = url;
        localStorage.setItem('analytics_sheetsEndpoint', url);
        this.processQueue();
    }

    // Track survey response
    trackSurveyResponse(surveyType, responses) {
        this.trackEvent('survey_response', {
            surveyType,
            responses,
            chapterId: this.currentChapter?.id
        });
    }

    // Track pricing survey
    trackPricingResponse(data) {
        this.trackEvent('pricing_survey', {
            ...data,
            chapterId: this.currentChapter?.id,
            chaptersReadCount: this.chaptersRead.size
        });
    }

    // Track demographic data
    trackDemographics(data) {
        this.trackEvent('demographics', data);
        localStorage.setItem('analytics_demographicsComplete', 'true');
    }

    // Track inline reaction
    trackReaction(paragraphId, reactionType, chapterId) {
        this.trackEvent('inline_reaction', {
            paragraphId,
            reactionType,
            chapterId
        });
    }

    // Get reading stats for this reader
    getReaderStats() {
        const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
        const chapterExits = events.filter(e => e.type === 'chapter_exit');

        const totalTime = chapterExits.reduce((sum, e) => sum + (e.timeSpent || 0), 0);
        const completions = chapterExits.filter(e => e.completed).length;
        const avgScrollDepth = chapterExits.length > 0
            ? Math.round(chapterExits.reduce((sum, e) => sum + (e.maxScrollDepth || 0), 0) / chapterExits.length)
            : 0;

        return {
            totalChaptersViewed: this.chaptersRead.size,
            totalTimeSpent: totalTime,
            completedChapters: completions,
            avgScrollDepth,
            sessions: new Set(events.map(e => e.sessionId)).size
        };
    }
}

// Create and export singleton
export const readerAnalytics = new ReaderAnalytics();

// Auto-initialize
if (typeof window !== 'undefined') {
    window.readerAnalytics = readerAnalytics;

    // Initialize when DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => readerAnalytics.init());
    } else {
        readerAnalytics.init();
    }
}
