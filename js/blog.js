// Blog Service - Fetches and caches Substack RSS feed

const SUBSTACK_FEED_URL = 'https://anthonyfenech.substack.com/feed';
const RSS_PROXY_URL = 'https://api.rss2json.com/v1/api.json';
const CACHE_KEY = 'off-the-record-blog-cache';
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

class BlogService {
    constructor() {
        this.posts = [];
        this.loading = false;
        this.error = null;
        this.lastFetch = null;
    }

    // Check if cache is still valid
    isCacheValid() {
        const cached = this.getCachedData();
        if (!cached || !cached.timestamp) return false;

        const now = Date.now();
        return (now - cached.timestamp) < CACHE_DURATION;
    }

    // Get cached data from localStorage
    getCachedData() {
        try {
            const data = localStorage.getItem(CACHE_KEY);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.warn('Error reading blog cache:', e);
            return null;
        }
    }

    // Save data to cache
    setCachedData(posts) {
        try {
            const cacheData = {
                posts: posts,
                timestamp: Date.now()
            };
            localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        } catch (e) {
            console.warn('Error saving blog cache:', e);
        }
    }

    // Fetch posts from RSS feed
    async fetchPosts(forceRefresh = false) {
        // Return cached data if valid and not forcing refresh
        if (!forceRefresh && this.isCacheValid()) {
            const cached = this.getCachedData();
            this.posts = cached.posts;
            this.lastFetch = new Date(cached.timestamp);
            return this.posts;
        }

        this.loading = true;
        this.error = null;

        try {
            // Use RSS2JSON proxy to avoid CORS issues
            const proxyUrl = `${RSS_PROXY_URL}?rss_url=${encodeURIComponent(SUBSTACK_FEED_URL)}`;

            const response = await fetch(proxyUrl);

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const data = await response.json();

            if (data.status !== 'ok') {
                throw new Error(data.message || 'Failed to fetch RSS feed');
            }

            // Parse and format posts
            this.posts = this.parsePosts(data.items || []);
            this.lastFetch = new Date();

            // Cache the results
            this.setCachedData(this.posts);

            return this.posts;

        } catch (e) {
            console.error('Error fetching blog posts:', e);
            this.error = e.message;

            // Try to return cached data even if expired
            const cached = this.getCachedData();
            if (cached && cached.posts) {
                this.posts = cached.posts;
                return this.posts;
            }

            return [];
        } finally {
            this.loading = false;
        }
    }

    // Parse RSS items into post objects
    parsePosts(items) {
        return items.map(item => ({
            title: item.title || 'Untitled',
            link: item.link || item.guid || '#',
            pubDate: this.parseDate(item.pubDate),
            pubDateFormatted: this.formatDate(item.pubDate),
            excerpt: this.createExcerpt(item.description || item.content || ''),
            author: item.author || 'Anthony Fenech',
            thumbnail: item.thumbnail || item.enclosure?.link || null
        }));
    }

    // Parse date string to Date object
    parseDate(dateString) {
        try {
            return new Date(dateString);
        } catch (e) {
            return new Date();
        }
    }

    // Format date for display
    formatDate(dateString) {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (e) {
            return '';
        }
    }

    // Create excerpt from HTML content
    createExcerpt(html, maxLength = 150) {
        // Strip HTML tags
        const text = html
            .replace(/<[^>]*>/g, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .trim();

        if (text.length <= maxLength) {
            return text;
        }

        // Truncate at word boundary
        const truncated = text.substring(0, maxLength);
        const lastSpace = truncated.lastIndexOf(' ');

        if (lastSpace > maxLength * 0.7) {
            return truncated.substring(0, lastSpace) + '...';
        }

        return truncated + '...';
    }

    // Get posts (fetches if needed)
    async getPosts() {
        if (this.posts.length === 0 || !this.isCacheValid()) {
            await this.fetchPosts();
        }
        return this.posts;
    }

    // Check if there are any posts
    hasPosts() {
        return this.posts.length > 0;
    }

    // Get loading state
    isLoading() {
        return this.loading;
    }

    // Get error state
    getError() {
        return this.error;
    }
}

// Export singleton instance
export const blogService = new BlogService();
