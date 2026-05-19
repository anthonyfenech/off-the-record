// localStorage wrapper for reading progress tracking

import { CHAPTERS, getFirstChapterId } from '../data/chapters.js';

const STORAGE_KEYS = {
    PROGRESS: 'off_the_record_progress',
    COMPLETION: 'off_the_record_completion',
    PREFERENCES: 'off_the_record_preferences',
    DEBUG: 'otr_debug_mode'
};

// ═══════════════════════════════════════════════════════════════
// DEBUG LOGGING SYSTEM
// Silent in production, verbose when enabled for troubleshooting
// ═══════════════════════════════════════════════════════════════

const logger = {
    isDebugMode() {
        try {
            return localStorage.getItem(STORAGE_KEYS.DEBUG) === 'true';
        } catch {
            return false;
        }
    },

    error(message, error = null) {
        if (!this.isDebugMode()) return;
        if (error) {
            console.error(`[OTR Storage] ${message}`, error);
        } else {
            console.error(`[OTR Storage] ${message}`);
        }
    },

    warn(message) {
        if (!this.isDebugMode()) return;
        console.warn(`[OTR Storage] ${message}`);
    },

    log(message) {
        if (!this.isDebugMode()) return;
    }
};

// Toggle debug mode from console: window.toggleDebugMode()
if (typeof window !== 'undefined') {
    window.toggleDebugMode = function() {
        try {
            const current = localStorage.getItem(STORAGE_KEYS.DEBUG) === 'true';
            const newValue = !current;
            localStorage.setItem(STORAGE_KEYS.DEBUG, newValue.toString());
            if (newValue) {
                console.log('Storage errors will now be logged. Run toggleDebugMode() again to disable.');
            }
            return newValue;
        } catch (e) {
            return false;
        }
    };
}

// ═══════════════════════════════════════════════════════════════
// STORAGE UTILITIES
// ═══════════════════════════════════════════════════════════════

// Check if localStorage is available
function isLocalStorageAvailable() {
    try {
        const test = '__storage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

// Get reading progress
export function getProgress() {
    if (!isLocalStorageAvailable()) {
        return {
            currentChapter: getFirstChapterId(),
            currentPage: 0,
            lastUpdated: null,
            completionPercentage: 0
        };
    }

    try {
        const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
        if (!data) {
            return {
                currentChapter: getFirstChapterId(),
                currentPage: 0,
                lastUpdated: null,
                completionPercentage: 0
            };
        }
        const parsed = JSON.parse(data);
        // Backwards compatibility: convert scrollPosition to currentPage if needed
        if (parsed.scrollPosition !== undefined && parsed.currentPage === undefined) {
            parsed.currentPage = 0;
        }
        // Post-migration sanitizer (Commit 17): chapter IDs are now strings
        // (ch01, ch06_fb1, …). Legacy numeric/fractional values (1, 6.1) or
        // any unknown value → treat as a fresh reader at the first section.
        const validIds = new Set(CHAPTERS.map(c => c.id));
        const validSlugs = new Set(CHAPTERS.map(c => c.slug));
        if (typeof parsed.currentChapter !== 'string'
            || (!validIds.has(parsed.currentChapter)
                && !validSlugs.has(parsed.currentChapter))) {
            parsed.currentChapter = getFirstChapterId();
        }
        return parsed;
    } catch (error) {
        logger.error('Error reading progress:', error);
        return {
            currentChapter: getFirstChapterId(),
            currentPage: 0,
            lastUpdated: null,
            completionPercentage: 0
        };
    }
}

// Save reading progress
export function saveProgress(currentChapter, currentPage, completionPercentage) {
    if (!isLocalStorageAvailable()) {
        logger.warn('localStorage not available');
        return false;
    }

    try {
        const data = {
            currentChapter,
            currentPage,
            lastUpdated: new Date().toISOString(),
            completionPercentage
        };
        localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(data));
        return true;
    } catch (error) {
        logger.error('Error saving progress:', error);
        if (error.name === 'QuotaExceededError') {
            logger.error('localStorage quota exceeded');
        }
        return false;
    }
}

// Get chapter completion status
export function getChapterCompletion() {
    if (!isLocalStorageAvailable()) {
        return {};
    }

    try {
        const data = localStorage.getItem(STORAGE_KEYS.COMPLETION);
        return data ? JSON.parse(data) : {};
    } catch (error) {
        logger.error('Error reading chapter completion:', error);
        return {};
    }
}

// Mark chapter as completed
export function markChapterComplete(chapterId) {
    if (!isLocalStorageAvailable()) {
        return false;
    }

    try {
        const completion = getChapterCompletion();
        completion[chapterId] = true;
        localStorage.setItem(STORAGE_KEYS.COMPLETION, JSON.stringify(completion));
        return true;
    } catch (error) {
        logger.error('Error saving chapter completion:', error);
        return false;
    }
}

// Check if chapter is completed
export function isChapterComplete(chapterId) {
    const completion = getChapterCompletion();
    return completion[chapterId] === true;
}

// Get user preferences
export function getPreferences() {
    if (!isLocalStorageAvailable()) {
        return {
            fontSize: 'medium',
            theme: 'light'
        };
    }

    try {
        const data = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
        return data ? JSON.parse(data) : { fontSize: 'medium', theme: 'light' };
    } catch (error) {
        logger.error('Error reading preferences:', error);
        return { fontSize: 'medium', theme: 'light' };
    }
}

// Save user preferences
export function savePreferences(preferences) {
    if (!isLocalStorageAvailable()) {
        return false;
    }

    try {
        localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(preferences));
        return true;
    } catch (error) {
        logger.error('Error saving preferences:', error);
        return false;
    }
}

// Clear all data (for testing/reset)
export function clearAllData() {
    if (!isLocalStorageAvailable()) {
        return false;
    }

    try {
        localStorage.removeItem(STORAGE_KEYS.PROGRESS);
        localStorage.removeItem(STORAGE_KEYS.COMPLETION);
        localStorage.removeItem(STORAGE_KEYS.PREFERENCES);
        return true;
    } catch (error) {
        logger.error('Error clearing data:', error);
        return false;
    }
}

// Calculate overall progress based on chapter completion
export function calculateOverallProgress(totalChapters) {
    const completion = getChapterCompletion();
    const completedCount = Object.values(completion).filter(v => v === true).length;
    return Math.round((completedCount / totalChapters) * 100);
}
