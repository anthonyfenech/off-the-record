// Chapter data for OFF-THE-RECORD memoir

const placeholderContent = `This chapter is part of the OFF-THE-RECORD memoir covering Detroit Tigers baseball.

Content will detail the pivotal moments, unforgettable players, and behind-the-scenes stories that defined this era of Tigers baseball.

The full manuscript is being prepared. Each chapter explores a different aspect of covering Major League Baseball, from the intimate moments in the clubhouse to the dramatic finishes under the lights at Comerica Park.

This is placeholder text that will be replaced with the actual memoir content.`.repeat(3);

export const CHAPTERS = [
    // OPENING CHAPTERS (1-4) - Standalone, not nested under any year
    {
        id: 1,
        year: null,
        section: 'opening',
        title: "AUTHOR'S NOTE",
        subtitle: "To be written",
        teaser: "An introduction to this baseball memoir.",
        content: placeholderContent,
        wordCount: 500
    },
    {
        id: 2,
        year: null,
        section: 'opening',
        title: "SUMMER 2017",
        subtitle: "To be written",
        teaser: "Where our story begins.",
        content: placeholderContent,
        wordCount: 500
    },
    {
        id: 3,
        year: null,
        section: 'opening',
        title: "DREAM JOB",
        subtitle: "To be written",
        teaser: "Landing the position of a lifetime.",
        content: placeholderContent,
        wordCount: 500
    },
    {
        id: 4,
        year: null,
        section: 'opening',
        title: "SCANDAL!",
        subtitle: "To be written",
        teaser: "When everything changed.",
        content: placeholderContent,
        wordCount: 500
    },

    // 2015 SEASON CHAPTERS (5-9)
    {
        id: 5,
        year: 2015,
        section: 'year',
        title: "ROOKIE YEAR",
        subtitle: "To be written",
        teaser: "Learning the ropes on the Tigers beat.",
        content: placeholderContent,
        wordCount: 500
    },
    {
        id: 6,
        year: 2015,
        section: 'year',
        title: "OPENING DAY",
        subtitle: "To be written",
        teaser: "The magic of Opening Day at Comerica Park.",
        content: placeholderContent,
        wordCount: 500
    },
    {
        id: 7,
        year: 2015,
        section: 'year',
        title: "MIDSEASON",
        subtitle: "To be written",
        teaser: "The dog days of summer baseball.",
        content: placeholderContent,
        wordCount: 500
    },
    {
        id: 8,
        year: 2015,
        section: 'year',
        title: "TRADE DEADLINE",
        subtitle: "To be written",
        teaser: "When rosters get shuffled and careers change.",
        content: placeholderContent,
        wordCount: 500
    },
    {
        id: 9,
        year: 2015,
        section: 'year',
        title: "FIRE DRILL",
        subtitle: "To be written",
        teaser: "Chaos in the clubhouse.",
        content: placeholderContent,
        wordCount: 500
    },

    // 2016 SEASON CHAPTERS (10-14)
    {
        id: 10,
        year: 2016,
        section: 'year',
        title: "SPRING TRAINING",
        subtitle: "To be written",
        teaser: "Florida sunshine and fresh starts.",
        content: placeholderContent,
        wordCount: 500
    },
    {
        id: 11,
        year: 2016,
        section: 'year',
        title: "HOT SEAT",
        subtitle: "To be written",
        teaser: "When the pressure mounts.",
        content: placeholderContent,
        wordCount: 500
    },
    {
        id: 12,
        year: 2016,
        section: 'year',
        title: "UNCENSORED",
        subtitle: "To be written",
        teaser: "The stories that couldn't be told... until now.",
        content: placeholderContent,
        wordCount: 500
    },
    {
        id: 13,
        year: 2016,
        section: 'year',
        title: "PENNANT RACE",
        subtitle: "To be written",
        teaser: "The stretch run toward October.",
        content: placeholderContent,
        wordCount: 500
    },
    {
        id: 14,
        year: 2016,
        section: 'year',
        title: "WAKE-UP CALL",
        subtitle: "To be written",
        teaser: "A moment of reckoning.",
        content: placeholderContent,
        wordCount: 500
    },

    // 2017 SEASON CHAPTERS (15-19)
    {
        id: 15,
        year: 2017,
        section: 'year',
        title: "PRIME-TIME",
        subtitle: "To be written",
        teaser: "Under the national spotlight.",
        content: placeholderContent,
        wordCount: 500
    },
    {
        id: 16,
        year: 2017,
        section: 'year',
        title: "FIREWORKS",
        subtitle: "To be written",
        teaser: "Explosive moments on and off the field.",
        content: placeholderContent,
        wordCount: 500
    },
    {
        id: 17,
        year: 2017,
        section: 'year',
        title: "SUMMER 2017",
        subtitle: "To be written",
        teaser: "The heat of the season.",
        content: placeholderContent,
        wordCount: 500
    },
    {
        id: 18,
        year: 2017,
        section: 'year',
        title: "FLASHBACK",
        subtitle: "To be written",
        teaser: "Looking back at what led us here.",
        content: placeholderContent,
        wordCount: 500
    },
    {
        id: 19,
        year: 2017,
        section: 'year',
        title: "WORLD SERIES",
        subtitle: "To be written",
        teaser: "The ultimate stage.",
        content: placeholderContent,
        wordCount: 500
    },

    // 2018 SEASON CHAPTERS (20-24)
    {
        id: 20,
        year: 2018,
        section: 'year',
        title: "AWARDS SEASON",
        subtitle: "To be written",
        teaser: "Recognition and accolades.",
        content: placeholderContent,
        wordCount: 500
    },
    {
        id: 21,
        year: 2018,
        section: 'year',
        title: "DRAFT DAY",
        subtitle: "To be written",
        teaser: "Where futures are made.",
        content: placeholderContent,
        wordCount: 500
    },
    {
        id: 22,
        year: 2018,
        section: 'year',
        title: "COOPERSTOWN",
        subtitle: "To be written",
        teaser: "A pilgrimage to baseball's shrine.",
        content: placeholderContent,
        wordCount: 500
    },
    {
        id: 23,
        year: 2018,
        section: 'year',
        title: "BURN OUT",
        subtitle: "To be written",
        teaser: "The toll of the grind.",
        content: placeholderContent,
        wordCount: 500
    },
    {
        id: 24,
        year: 2018,
        section: 'year',
        title: "VIVA LAS VEGAS",
        subtitle: "To be written",
        teaser: "What happens in Vegas...",
        content: placeholderContent,
        wordCount: 500
    },

    // 2019 SEASON CHAPTERS (25-30)
    {
        id: 25,
        year: 2019,
        section: 'year',
        title: "GLOBETROTTING",
        subtitle: "To be written",
        teaser: "Baseball takes us around the world.",
        content: placeholderContent,
        wordCount: 500
    },
    {
        id: 26,
        year: 2019,
        section: 'year',
        title: "ROAD TO OMAHA",
        subtitle: "To be written",
        teaser: "College baseball's biggest stage.",
        content: placeholderContent,
        wordCount: 500
    },
    {
        id: 27,
        year: 2019,
        section: 'year',
        title: "A LETTER TO THE EDITOR",
        subtitle: "To be written",
        teaser: "Words that needed to be said.",
        content: placeholderContent,
        wordCount: 500
    },
    {
        id: 28,
        year: 2019,
        section: 'year',
        title: "CONTROVERSY!",
        subtitle: "To be written",
        teaser: "When the story becomes the story.",
        content: placeholderContent,
        wordCount: 500
    },
    {
        id: 29,
        year: 2019,
        section: 'year',
        title: "AIRPLANE MODE",
        subtitle: "To be written",
        teaser: "Life on the road.",
        content: placeholderContent,
        wordCount: 500
    },
    {
        id: 30,
        year: 2019,
        section: 'year',
        title: "BOTTOM NINE",
        subtitle: "To be written",
        teaser: "The final innings approach.",
        content: placeholderContent,
        wordCount: 500
    },

    // 2020 SEASON - No chapters, just the year header (handled in navigation)

    // CLOSING CHAPTERS (31-32) - Standalone, not nested under 2020
    {
        id: 31,
        year: null,
        section: 'closing',
        title: "POSTSCRIPT",
        subtitle: "To be written",
        teaser: "Reflections on the journey.",
        content: placeholderContent,
        wordCount: 500
    },
    {
        id: 32,
        year: null,
        section: 'closing',
        title: "DEDICATION",
        subtitle: "To be written",
        teaser: "To those who made this possible.",
        content: placeholderContent,
        wordCount: 500
    }
];

// Export total word count for progress calculations
export const getTotalWordCount = () => {
    return CHAPTERS.reduce((sum, chapter) => sum + chapter.wordCount, 0);
};

// Export chapter count
export const getChapterCount = () => CHAPTERS.length;

// Calculate reading time (words per minute = 200)
export const calculateReadingTime = (wordCount) => {
    const minutes = Math.ceil(wordCount / 200);
    return minutes;
};

// Get opening chapters (standalone at top)
export const getOpeningChapters = () => {
    return CHAPTERS.filter(c => c.section === 'opening');
};

// Get closing chapters (standalone at bottom)
export const getClosingChapters = () => {
    return CHAPTERS.filter(c => c.section === 'closing');
};

// Get chapters grouped by year (only year-section chapters)
export const getChaptersByYear = () => {
    const yearMap = {};

    CHAPTERS.filter(c => c.section === 'year').forEach(chapter => {
        const yearKey = chapter.year;
        if (!yearMap[yearKey]) {
            yearMap[yearKey] = [];
        }
        yearMap[yearKey].push(chapter);
    });

    return yearMap;
};

// Get sorted year keys
export const getSortedYears = () => {
    const years = Object.keys(getChaptersByYear()).map(Number);
    years.sort((a, b) => a - b);
    // Add 2020 as empty year section
    if (!years.includes(2020)) {
        years.push(2020);
    }
    return years;
};
