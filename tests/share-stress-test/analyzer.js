/**
 * ShareAnalyzer v2 - Fixed false positives
 * Excludes: email metadata, time-only stamps, dates already with years
 */
const ShareAnalyzer = {
    analyze: function(cardData) {
        const issues = [];
        const stats = {
            datelinesFound: 0,
            yearsAppended: 0,
            emailDatesSkipped: 0,
            timeStampsSkipped: 0,
            alreadyHadYear: 0
        };

        const { originalText, processedText, scrollPosition, hasChapterTitle, year } = cardData;

        // ═══════════════════════════════════════════════════════════════
        // DATELINE DETECTION (matches share.js logic)
        // ═══════════════════════════════════════════════════════════════

        // Only count datelines that share.js would actually process:
        // Pattern: Month Day followed by em-dash (with optional CITY prefix)
        const datelinePattern = /(January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\s+\d{1,2}\s*\u2014/g;

        const datelineMatches = originalText.match(datelinePattern) || [];
        stats.datelinesFound = datelineMatches.length;

        // ═══════════════════════════════════════════════════════════════
        // FILTER OUT FALSE POSITIVES
        // ═══════════════════════════════════════════════════════════════

        // Email metadata pattern: "On Mon, Apr 6, 2015 at 10:32 AM"
        const emailMetadataPattern = /On\s+(Mon|Tue|Wed|Thu|Fri|Sat|Sun)[a-z]*,\s+(January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\s+\d{1,2},\s*\d{4}/gi;
        const emailMatches = originalText.match(emailMetadataPattern) || [];
        stats.emailDatesSkipped = emailMatches.length;

        // Time-only stamps: "10:32 AM" or "3:45 PM" (not actual datelines)
        const timeOnlyPattern = /\d{1,2}:\d{2}\s*(AM|PM|am|pm)/g;
        const timeMatches = originalText.match(timeOnlyPattern) || [];
        stats.timeStampsSkipped = timeMatches.length;

        // Dates that already have years: "April 6, 2015"
        const dateWithYearPattern = /(January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\s+\d{1,2},\s*\d{4}/gi;
        const alreadyHasYear = originalText.match(dateWithYearPattern) || [];
        stats.alreadyHadYear = alreadyHasYear.length;

        // ═══════════════════════════════════════════════════════════════
        // COUNT YEARS APPENDED BY SHARE.JS
        // ═══════════════════════════════════════════════════════════════

        // Count ", YYYY—" pattern (the format share.js adds)
        const yearAppendedPattern = /,\s*\d{4}\s*\u2014/g;
        const yearsInProcessed = (processedText.match(yearAppendedPattern) || []).length;
        const yearsInOriginal = (originalText.match(yearAppendedPattern) || []).length;
        stats.yearsAppended = Math.max(0, yearsInProcessed - yearsInOriginal);

        // ═══════════════════════════════════════════════════════════════
        // MISSING_YEAR DETECTION (only true positives)
        // ═══════════════════════════════════════════════════════════════

        // Only flag MISSING_YEAR if:
        // 1. There are datelines that share.js should process
        // 2. None of them got years appended
        // 3. The chapter has a year defined
        // 4. The datelines don't already have years
        // 5. They're not email metadata

        const trueDatelines = stats.datelinesFound - stats.alreadyHadYear;

        if (trueDatelines > 0 && stats.yearsAppended === 0 && year) {
            // Check if all datelines are in email metadata context
            let allInEmailContext = true;

            // Simple heuristic: if text contains "On Mon," or similar, skip
            const hasEmailContext = /On\s+(Mon|Tue|Wed|Thu|Fri|Sat|Sun)/i.test(originalText);

            if (!hasEmailContext) {
                allInEmailContext = false;
            }

            if (!allInEmailContext) {
                issues.push('MISSING_YEAR');
            }
        }

        // ═══════════════════════════════════════════════════════════════
        // OTHER ISSUE DETECTION
        // ═══════════════════════════════════════════════════════════════

        // ISSUE: Text starts with lowercase (sentence fragment)
        const firstChar = originalText.trim().charAt(0);
        if (firstChar && firstChar === firstChar.toLowerCase() && /[a-z]/.test(firstChar)) {
            issues.push('STARTS_LOWERCASE');
        }

        // ISSUE: Only flag if paragraph 0 or scroll 0 AND no title
        if (scrollPosition === 0 && !hasChapterTitle) {
            issues.push('MISSING_TITLE');
        }

        // ISSUE: Captured text is very short
        // Exclude dialogue (quoted text) and scene breaks from TOO_SHORT
        const trimmedText = originalText.trim();
        const isDialogue = /^["'"']/.test(trimmedText);
        const isSceneBreak = /^\*\s*\*\s*\*/.test(trimmedText);
        if (trimmedText.length < 50 && !isDialogue && !isSceneBreak) {
            issues.push('TOO_SHORT');
        }

        // ISSUE: HTML tags or entities leaked through
        if (/<[^>]+>/.test(originalText) || /&[a-z]+;/.test(originalText) || /&#\d+;/.test(originalText)) {
            issues.push('HTML_LEAK');
        }

        // ISSUE: Scene break is the first content
        if (/^\s*\*\s*\*\s*\*/.test(originalText.trim())) {
            issues.push('SCENE_BREAK_FIRST');
        }

        // ISSUE: Encoding problems (common Word artifacts)
        if (/â€"|â€™|â€œ|â€/.test(originalText)) {
            issues.push('ENCODING_ERROR');
        }

        return { issues, stats };
    }
};
