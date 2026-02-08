/**
 * Analytics Dashboard - Engagement Intelligence System
 * Processes and visualizes reader analytics data
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        SHEETS_API_URL: 'https://script.google.com/macros/s/AKfycbz1raPMd46nzBkkhC48PnmixrH-m3_GHzcNLWr830hdcF2EkgE1NGl5Tesaf8XVM59i/exec',
        REFRESH_INTERVAL: 30000, // 30 seconds
        CACHE_DURATION: 60000,   // 1 minute cache
        PASSWORD: 'otr2024admin'
    };

    // State
    let analyticsData = [];
    let filteredData = [];
    let currentTimeRange = '7d';
    let lastFetch = 0;
    let refreshInterval = null;

    // ========== AUTHENTICATION ==========

    function checkAuth() {
        return sessionStorage.getItem('analytics_auth') === 'true';
    }

    function authenticate(password) {
        if (password === CONFIG.PASSWORD) {
            sessionStorage.setItem('analytics_auth', 'true');
            return true;
        }
        return false;
    }

    function showDashboard() {
        document.querySelector('.auth-screen').style.display = 'none';
        document.querySelector('.dashboard').classList.add('active');
        initDashboard();
    }

    function setupAuth() {
        const form = document.getElementById('auth-form');
        const input = document.getElementById('auth-password');
        const error = document.getElementById('auth-error');

        if (checkAuth()) {
            showDashboard();
            return;
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (authenticate(input.value)) {
                showDashboard();
            } else {
                error.textContent = 'Invalid password';
                input.value = '';
            }
        });
    }

    // ========== DATA FETCHING ==========

    async function fetchAnalyticsData() {
        // Check cache
        if (Date.now() - lastFetch < CONFIG.CACHE_DURATION && analyticsData.length > 0) {
            return analyticsData;
        }

        try {
            // For demo purposes, generate sample data
            // In production, this would fetch from Google Sheets API
            analyticsData = generateSampleData();
            lastFetch = Date.now();
            return analyticsData;
        } catch (error) {
            console.error('[Dashboard] Fetch error:', error);
            return analyticsData;
        }
    }

    function generateSampleData() {
        // Generate realistic sample data for demonstration
        const events = [];
        const chapters = 28;
        const now = Date.now();
        const dayMs = 24 * 60 * 60 * 1000;

        // Generate 30 days of data
        for (let d = 0; d < 30; d++) {
            const dayStart = now - (d * dayMs);
            const readersPerDay = Math.floor(Math.random() * 20) + 5;

            for (let r = 0; r < readersPerDay; r++) {
                const visitorId = `vis_${d}_${r}`;
                const sessionId = `sess_${d}_${r}_${Math.random().toString(36).substring(7)}`;
                const isReturn = Math.random() > 0.7;
                const device = ['mobile', 'desktop', 'tablet'][Math.floor(Math.random() * 3)];

                // Entry chapter (weighted towards chapter 1)
                let entryChapter = Math.random() > 0.6 ? 1 : Math.floor(Math.random() * chapters) + 1;

                // How many chapters will they read?
                const chaptersToRead = Math.floor(Math.random() * 10) + 1;
                let currentChapter = entryChapter;

                for (let c = 0; c < chaptersToRead && currentChapter <= chapters; c++) {
                    const timeSpent = Math.floor(Math.random() * 600) + 60; // 1-10 minutes
                    const scrollDepth = Math.min(100, Math.floor(Math.random() * 40) + 60); // 60-100%
                    const completed = scrollDepth >= 90;

                    events.push({
                        event: 'chapter_exit',
                        visitorId,
                        sessionId,
                        chapter: currentChapter,
                        timeSpent,
                        scrollDepth,
                        completed,
                        isReturnVisitor: isReturn,
                        deviceType: device,
                        timestamp: new Date(dayStart + Math.random() * dayMs).toISOString()
                    });

                    // Track some scroll milestones
                    [25, 50, 75, 100].forEach(milestone => {
                        if (scrollDepth >= milestone) {
                            events.push({
                                event: 'scroll_milestone',
                                visitorId,
                                sessionId,
                                chapter: currentChapter,
                                milestone,
                                timestamp: new Date(dayStart + Math.random() * dayMs).toISOString()
                            });
                        }
                    });

                    // Random asset clicks
                    if (Math.random() > 0.5) {
                        const assetTypes = ['photo', 'video', 'quote', 'article'];
                        events.push({
                            event: 'asset_open',
                            visitorId,
                            sessionId,
                            chapter: currentChapter,
                            assetType: assetTypes[Math.floor(Math.random() * assetTypes.length)],
                            assetId: `asset_${currentChapter}_${Math.floor(Math.random() * 5)}`,
                            timestamp: new Date(dayStart + Math.random() * dayMs).toISOString()
                        });
                    }

                    // Navigation pattern
                    if (Math.random() > 0.3) {
                        currentChapter++; // Linear
                    } else if (Math.random() > 0.5) {
                        currentChapter += Math.floor(Math.random() * 3) + 2; // Jump
                    } else {
                        break; // Drop off
                    }
                }

                // Session summary
                events.push({
                    event: 'session_summary',
                    visitorId,
                    sessionId,
                    chaptersViewed: chaptersToRead,
                    sessionDuration: Math.floor(Math.random() * 3600) + 300,
                    isReturnVisitor: isReturn,
                    deviceType: device,
                    timestamp: new Date(dayStart + Math.random() * dayMs).toISOString()
                });
            }
        }

        return events;
    }

    // ========== DATA PROCESSING ==========

    function filterByTimeRange(data, range) {
        const now = Date.now();
        const ranges = {
            '24h': 24 * 60 * 60 * 1000,
            '7d': 7 * 24 * 60 * 60 * 1000,
            '30d': 30 * 24 * 60 * 60 * 1000,
            'all': Infinity
        };

        const cutoff = now - (ranges[range] || ranges['7d']);

        return data.filter(event => {
            const eventTime = new Date(event.timestamp).getTime();
            return eventTime >= cutoff;
        });
    }

    function calculateMetrics(data) {
        const sessions = new Set();
        const visitors = new Set();
        const returnVisitors = new Set();
        const chapterCompletions = {};
        const chapterViews = {};
        let totalTime = 0;
        let completedChapters = 0;
        let totalChapterViews = 0;

        data.forEach(event => {
            if (event.sessionId) sessions.add(event.sessionId);
            if (event.visitorId) visitors.add(event.visitorId);
            if (event.isReturnVisitor && event.visitorId) returnVisitors.add(event.visitorId);

            if (event.event === 'chapter_exit') {
                totalTime += event.timeSpent || 0;
                totalChapterViews++;

                if (!chapterViews[event.chapter]) {
                    chapterViews[event.chapter] = 0;
                    chapterCompletions[event.chapter] = 0;
                }
                chapterViews[event.chapter]++;

                if (event.completed) {
                    chapterCompletions[event.chapter]++;
                    completedChapters++;
                }
            }
        });

        const avgTimePerChapter = totalChapterViews > 0 ? Math.round(totalTime / totalChapterViews) : 0;
        const completionRate = totalChapterViews > 0 ? Math.round((completedChapters / totalChapterViews) * 100) : 0;
        const returnRate = visitors.size > 0 ? Math.round((returnVisitors.size / visitors.size) * 100) : 0;

        return {
            totalReaders: visitors.size,
            totalSessions: sessions.size,
            avgTimePerChapter,
            completionRate,
            returnRate,
            chapterViews,
            chapterCompletions
        };
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    }

    // ========== RENDERING ==========

    function renderMetrics(metrics) {
        document.getElementById('metric-readers').textContent = metrics.totalReaders;
        document.getElementById('metric-time').textContent = formatTime(metrics.avgTimePerChapter);
        document.getElementById('metric-completion').textContent = metrics.completionRate + '%';
        document.getElementById('metric-return').textContent = metrics.returnRate + '%';
    }

    function renderChapterHeatmap(metrics) {
        const container = document.getElementById('chapter-heatmap');
        container.innerHTML = '';

        const chapters = Object.keys(metrics.chapterViews).map(Number).sort((a, b) => a - b);
        const maxViews = Math.max(...Object.values(metrics.chapterViews));

        chapters.forEach(chapter => {
            const views = metrics.chapterViews[chapter] || 0;
            const completions = metrics.chapterCompletions[chapter] || 0;
            const completionRate = views > 0 ? Math.round((completions / views) * 100) : 0;
            const widthPercent = maxViews > 0 ? Math.round((views / maxViews) * 100) : 0;

            // Determine color class based on completion rate
            let colorClass = 'low';
            if (completionRate >= 70) colorClass = 'high';
            else if (completionRate >= 40) colorClass = 'medium';

            const row = document.createElement('div');
            row.className = 'heatmap-row';
            row.innerHTML = `
                <div class="heatmap-label">Ch ${chapter}</div>
                <div class="heatmap-bar-container">
                    <div class="heatmap-bar ${colorClass}" style="width: ${widthPercent}%"></div>
                </div>
                <div class="heatmap-value">${views} (${completionRate}%)</div>
            `;
            container.appendChild(row);
        });
    }

    function renderAssetPerformance(data) {
        const container = document.getElementById('asset-table-body');
        container.innerHTML = '';

        // Aggregate asset data
        const assets = {};
        data.forEach(event => {
            if (event.event === 'asset_open') {
                const key = event.assetId;
                if (!assets[key]) {
                    assets[key] = {
                        id: event.assetId,
                        type: event.assetType,
                        clicks: 0,
                        chapters: new Set()
                    };
                }
                assets[key].clicks++;
                if (event.chapter) assets[key].chapters.add(event.chapter);
            }
        });

        // Sort by clicks
        const sorted = Object.values(assets).sort((a, b) => b.clicks - a.clicks).slice(0, 20);

        const typeEmojis = {
            photo: '📷',
            video: '🔴',
            quote: '💬',
            article: '📰'
        };

        sorted.forEach(asset => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="emoji-type">${typeEmojis[asset.type] || '📎'}</td>
                <td>${asset.id}</td>
                <td>${asset.clicks}</td>
                <td>${[...asset.chapters].join(', ')}</td>
            `;
            container.appendChild(row);
        });

        if (sorted.length === 0) {
            container.innerHTML = '<tr><td colspan="4" style="text-align:center;color:#999">No asset data yet</td></tr>';
        }
    }

    function renderDropOffFunnel(metrics) {
        const container = document.getElementById('dropoff-funnel');
        container.innerHTML = '';

        // Calculate drop-off between chapters
        const chapters = Object.keys(metrics.chapterViews).map(Number).sort((a, b) => a - b);
        const startReaders = metrics.chapterViews[1] || 100;

        chapters.slice(0, 10).forEach((chapter, index) => {
            const views = metrics.chapterViews[chapter] || 0;
            const percent = Math.round((views / startReaders) * 100);
            const prevViews = index > 0 ? (metrics.chapterViews[chapters[index - 1]] || 0) : startReaders;
            const dropOff = prevViews > 0 ? Math.round(((prevViews - views) / prevViews) * 100) : 0;

            const step = document.createElement('div');
            step.className = 'funnel-step';
            step.innerHTML = `
                <div class="funnel-label">Chapter ${chapter}</div>
                <div class="funnel-bar-container">
                    <div class="funnel-bar" style="width: ${percent}%">${percent}%</div>
                </div>
                ${dropOff > 0 ? `<div class="funnel-drop">-${dropOff}%</div>` : ''}
            `;
            container.appendChild(step);
        });
    }

    function renderInsights(data, metrics) {
        const container = document.getElementById('insights-panel');
        container.innerHTML = '';

        const insights = [];

        // Most engaging chapter
        const sortedChapters = Object.entries(metrics.chapterCompletions)
            .sort((a, b) => b[1] - a[1]);
        if (sortedChapters.length > 0) {
            insights.push({
                icon: '🔥',
                text: `Chapter ${sortedChapters[0][0]} has the highest completion rate`
            });
        }

        // Drop-off warning
        const sortedByViews = Object.entries(metrics.chapterViews)
            .sort((a, b) => a[1] - b[1]);
        if (sortedByViews.length > 2) {
            insights.push({
                icon: '⚠️',
                text: `Chapter ${sortedByViews[0][0]} has the lowest views - consider promoting`
            });
        }

        // Return visitors insight
        if (metrics.returnRate > 20) {
            insights.push({
                icon: '✨',
                text: `${metrics.returnRate}% return visitor rate indicates strong engagement`
            });
        }

        // Average time insight
        if (metrics.avgTimePerChapter > 300) {
            insights.push({
                icon: '📖',
                text: `Readers spend ${formatTime(metrics.avgTimePerChapter)} per chapter on average`
            });
        }

        // Device breakdown
        const devices = {};
        data.forEach(e => {
            if (e.deviceType) {
                devices[e.deviceType] = (devices[e.deviceType] || 0) + 1;
            }
        });
        const topDevice = Object.entries(devices).sort((a, b) => b[1] - a[1])[0];
        if (topDevice) {
            insights.push({
                icon: '📱',
                text: `Most readers use ${topDevice[0]} devices (${Math.round(topDevice[1] / Object.values(devices).reduce((a, b) => a + b, 0) * 100)}%)`
            });
        }

        insights.forEach(insight => {
            const item = document.createElement('div');
            item.className = 'insight-item';
            item.innerHTML = `
                <span class="insight-icon">${insight.icon}</span>
                <span>${insight.text}</span>
            `;
            container.appendChild(item);
        });
    }

    function renderReadingPatterns(data) {
        const container = document.getElementById('reading-patterns');
        container.innerHTML = '';

        // Analyze navigation patterns
        const patterns = { linear: 0, jump: 0, entry: 0, backward: 0 };

        data.forEach(event => {
            if (event.event === 'chapter_enter' && event.navigationPattern) {
                patterns[event.navigationPattern] = (patterns[event.navigationPattern] || 0) + 1;
            }
        });

        const total = Object.values(patterns).reduce((a, b) => a + b, 0) || 1;

        const patternLabels = {
            linear: 'Linear (1→2→3...)',
            jump: 'Chapter Hoppers',
            entry: 'Entry Points',
            backward: 'Re-readers'
        };

        Object.entries(patterns).forEach(([pattern, count]) => {
            const percent = Math.round((count / total) * 100);
            if (percent > 0) {
                const row = document.createElement('div');
                row.className = 'heatmap-row';
                row.innerHTML = `
                    <div class="heatmap-label" style="width:150px">${patternLabels[pattern] || pattern}</div>
                    <div class="heatmap-bar-container">
                        <div class="heatmap-bar" style="width: ${percent}%"></div>
                    </div>
                    <div class="heatmap-value">${percent}%</div>
                `;
                container.appendChild(row);
            }
        });
    }

    // ========== EXPORT ==========

    function exportToCSV(data, filename) {
        if (data.length === 0) return;

        const headers = Object.keys(data[0]);
        const csvContent = [
            headers.join(','),
            ...data.map(row => headers.map(h => JSON.stringify(row[h] || '')).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }

    // ========== INITIALIZATION ==========

    async function initDashboard() {
        // Show loading
        document.querySelectorAll('.loading').forEach(el => el.style.display = 'flex');

        // Fetch data
        analyticsData = await fetchAnalyticsData();
        filteredData = filterByTimeRange(analyticsData, currentTimeRange);

        // Calculate and render
        const metrics = calculateMetrics(filteredData);
        renderMetrics(metrics);
        renderChapterHeatmap(metrics);
        renderAssetPerformance(filteredData);
        renderDropOffFunnel(metrics);
        renderInsights(filteredData, metrics);
        renderReadingPatterns(filteredData);

        // Hide loading
        document.querySelectorAll('.loading').forEach(el => el.style.display = 'none');

        // Set up auto-refresh
        if (refreshInterval) clearInterval(refreshInterval);
        refreshInterval = setInterval(refreshDashboard, CONFIG.REFRESH_INTERVAL);

        // Update last refresh time
        updateRefreshTime();
    }

    async function refreshDashboard() {
        lastFetch = 0; // Force refresh
        analyticsData = await fetchAnalyticsData();
        filteredData = filterByTimeRange(analyticsData, currentTimeRange);

        const metrics = calculateMetrics(filteredData);
        renderMetrics(metrics);
        renderChapterHeatmap(metrics);
        renderAssetPerformance(filteredData);
        renderDropOffFunnel(metrics);
        renderInsights(filteredData, metrics);
        renderReadingPatterns(filteredData);

        updateRefreshTime();
    }

    function updateRefreshTime() {
        const el = document.getElementById('last-refresh');
        if (el) {
            el.textContent = 'Updated ' + new Date().toLocaleTimeString();
        }
    }

    function setupEventListeners() {
        // Time range buttons
        document.querySelectorAll('.time-range button').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.time-range button').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentTimeRange = btn.dataset.range;

                filteredData = filterByTimeRange(analyticsData, currentTimeRange);
                const metrics = calculateMetrics(filteredData);
                renderMetrics(metrics);
                renderChapterHeatmap(metrics);
                renderAssetPerformance(filteredData);
                renderDropOffFunnel(metrics);
                renderInsights(filteredData, metrics);
                renderReadingPatterns(filteredData);
            });
        });

        // Refresh button
        document.getElementById('refresh-btn')?.addEventListener('click', refreshDashboard);

        // Export button
        document.getElementById('export-csv')?.addEventListener('click', () => {
            exportToCSV(filteredData, `analytics-export-${currentTimeRange}.csv`);
        });

        // Theme toggle
        document.getElementById('theme-toggle')?.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            document.documentElement.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
        });
    }

    // ========== STARTUP ==========

    document.addEventListener('DOMContentLoaded', () => {
        setupAuth();
        setupEventListeners();

        // Check for saved theme
        const savedTheme = localStorage.getItem('reader_theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    });

    // Expose for debugging
    window.analyticsDashboard = {
        refresh: refreshDashboard,
        getData: () => filteredData,
        getMetrics: () => calculateMetrics(filteredData)
    };
})();
