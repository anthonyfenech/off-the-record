// Chapter data for OFF-THE-RECORD — JSON-backed adapter (Phase 2 Option C).
//
// Source of truth is ./book_full.json, produced from OFF-THE-RECORD.docx by
// MASTER/scripts/docx_to_json.py. This module preserves the exact public API
// of the former data/chapters.js (now chapters.js.deprecated): the CHAPTERS
// array shape, all 13 helper exports, the in-content TOC side-effect, and the
// window.CHAPTERS global. Front matter / postscript do not exist in the DOCX
// and are carried here as verbatim constants. Do not hand-edit generated
// chapter bodies; re-run the converter instead.

import bookData from './book_full.js';

// Front matter — extracted verbatim from chapters.js.deprecated 2026-05-19, edit here to update
const titlePage = {
    id: 'title',
    year: null,
    section: 'title',
    title: "TITLE PAGE",
    slug: "title-page",
    subtitle: "",
    teaser: "",
    content: "<div class=\"title-page\">\n<div class=\"title-page-content\">\n<h1 class=\"title-page-title\">OFF-THE-RECORD</h1>\n</div>\n</div>",
    wordCount: 0,
    parent_id: null,
    hidden: false,
    hideFromToc: false,
};

// Front matter — extracted verbatim from chapters.js.deprecated 2026-05-19, edit here to update
const copyright = {
    id: 'copyright',
    year: null,
    section: 'copyright',
    title: "COPYRIGHT",
    slug: "copyright",
    subtitle: "",
    teaser: "",
    content: "<p class=\"no-indent\">Copyright © 2026 by Anthony Fenech. All rights reserved.</p>\n\n<p class=\"no-indent\">First Edition: May 2026</p>\n\n<p class=\"no-indent\">Cover Design: Jay Tuohey</p>\n\n<p class=\"no-indent\">Published by Red Dot Press | reddotbooks.com</p>\n\n<p class=\"no-indent\">Library of Congress Control Number: 2026909148</p>\n\n<p class=\"no-indent\">ISBNs: 979-8-9956304-0-1 (print); 979-8-9956304-1-8 (eBook)</p>",
    wordCount: 0,
    parent_id: null,
    hidden: false,
    hideFromToc: false,
};

// Front matter — extracted verbatim from chapters.js.deprecated 2026-05-19, edit here to update
// content is '' verbatim from source; the IIFE below regenerates it at
// module load from the new CHAPTERS (same behavior as the deprecated file).
const toc = {
    id: 'toc',
    year: null,
    section: 'toc',
    title: "TABLE OF CONTENTS",
    slug: "table-of-contents",
    subtitle: "",
    teaser: "",
    content: '',
    wordCount: 0,
    parent_id: null,
    hidden: false,
    hideFromToc: false,
};

// Front matter — extracted verbatim from chapters.js.deprecated 2026-05-19, edit here to update
const dedication = {
    id: 29,
    year: null,
    section: 'postscript',
    hideFromToc: true,
    title: "DEDICATION",
    slug: "dedication",
    subtitle: "",
    teaser: "",
    content: "<div class=\"toc-page\">\n<h2 class=\"toc-page-title\">DEDICATION</h2>\n<p>This book is dedicated to Pedro Gomez.</p>\n\n<p>Pedro was an ESPN television reporter since 2003 and one of the country’s foremost baseball journalists when he died unexpectedly at age 58 from a heart attack on February 7, 2021. He died watching Super Bowl LV with friends in his Scottsdale, Arizona home.</p>\n\n<p>Pedro was the son of Cuban refugees, born 20 days after his parents arrived in America. He grew up in Miami and spent 35 years covering baseball—America’s national sport and Cuba’s, too—at the <em>Miami News, San Diego Union-Tribune, San Jose Mercury News, Miami Herald and Sacramento Bee.</em> In 1997, he became a columnist and national baseball writer at the <em>Arizona Republic.</em> </p>\n\n<p>I loved Pedro Gomez the way I love my father. Our connection began in November 2014, within weeks after I took over the Tigers beat at the <em>Detroit Free Press.</em> We met not in a dugout or baseball press box, but at the Detroit Lions’ football practice facility as the Buffalo Bills and New York Jets were conducting workouts. A snowstorm had forced the Jets-Bills game indoors at Detroit’s Ford Field.</p>\n\n<p>Pedro was covering the practice for ESPN. I was a newly minted Ball Writer. When I introduced myself, his eyes lit up. Our first phone conversation lasted an hour. Little did I know that would be the rule—not an exception.</p>\n\n<p>Pedro supported me unfailingly, many times at a moment’s notice, and stood by my side during the most stressful moments of my career. When I last talked to him, texting him in the heart of the pandemic summer in 2020, he did not know of my internal turmoil. He didn’t know about <em>OFF-THE-RECORD</em><em>.</em> “I pulled the plug.”</p>\n\n<p>As Pedro always did, he immediately called back. He did not mince disappointment with the boneheaded pizza delivery plan I carried out. It was audible in his voice, the exasperation of his words, and the seriousness with which he said, “Anthony, you committed career suicide.”</p>\n\n<p>I knew that kind of honesty was not easy to share. He sounded like a dejected dad—I had let him down. A couple days later, I messaged him.</p>\n\n<p>“I really appreciate the honesty you gave me a couple nights ago. I know you were disappointed to hear that, and I was embarrassed to tell you about it—you have put in so much time with me because I’m much better than that. You’re right, the pizza didn’t ’just happen.’</p>\n\n<p>“I made the decision; I did it consciously and I am aware of the future implications this may have on my place in the industry. While I wish I would have acted more mature in carrying it out, I hit the breaking point and made a move.</p>\n\n<p>“I am very confident in my ability, and I feel very strongly that this move will put me in a better position to make the kind of impact I desired to make in this industry. I’m looking forward to sharing these thoughts with you.</p>\n\n<p>“Again, I really appreciate the honesty. Though, yes, it was pizza—it is embarrassing, and I am not looking forward to others who I respect like you receiving this information. I know it’s not easy to tell me that I committed ’career suicide’ and I know you’re not being mean, but this is why I trust you so much—because it’s not BS. </p>\n\n<p>“You’re one of the most important people in my career and I’m indebted for your help. I’ll get at you early next week with an update. Appreciate you.”</p>\n\n<p>“See, this is what I saw in you five years ago. Everything you wrote here has so much of YOU in it. It’s heartfelt and definitely feels sincere. It’s like a young player making it to the bigs and he’s unsure of himself but when he gets there, he does something special, meaning it’s inside of that player. It’s IN you. Second chances are a staple of our society. Make a comeback.”</p>\n\n<p>I never got back to Pedro with an update. I never told him about this book. Never called him again to chat, to kill hours talking baseball, journalism or life.</p>\n\n<p>Pedro stood by me because he’d walked in similar shoes many times over, most famously after he wrote a cutthroat column on starting pitcher Curt Schilling prior to the biggest game in Arizona professional sports history—Game 7 of the 2001 World Series.</p>\n\n<p>“<em>Schilling basically threw his manager, Bob Brenly, under a New York City subway car after Wednesday night’s Game 4 loss. He said afterward that he was fully prepared to head back out for the eighth inning, which was not the message he gave Brenly.</em></p>\n\n<p>“<em>It’s now been reported that Schilling told Brenly, ‘Don’t hang me out there,’ after the seventh. Brenly interpreted the statement to mean Schilling was gassed.</em></p>\n\n<p>“<em>After the game, Brenly was saying one thing while Schilling was contradicting it to anyone willing to listen. He then attempted to backpedal furiously in the ensuing days, insisting he was misquoted by reporters who heard only half his statements.</em>”</p>\n\n<p>T.J. Quinn, an ESPN investigative reporter, former Ball Writer (Mets beat, <em>Bergen Record</em> and <em>New York Daily News</em>, 2000-02) and one of Pedro’s best friends, remembers the story well: Quinn was alongside him at the stadium that night, pacing the field pregame, watching early batting practice in front of the Diamondbacks’ dugout.</p>\n\n<p>“We both knew that anybody could decide to take a shot at him. From somebody just airing him out to somebody actually taking a swing, somebody throwing something—you had no idea. You just knew people were really angry.</p>\n\n<p>“He was just there so that if anybody wanted to take a shot, had anything to say, he was there to take it.… And we’re standing there and (veteran lefty reliever) Greg Swindell is coming off the field, he’d been shagging. And he saw Pedro and all of a sudden, changed directions, went straight to him, never said a word, held out his hand, shook it, and nodded. And then he let go of his hand and went inside. And he never said a word. </p>\n\n<p>“It’s one of the bravest things in the business. It’s really easy to take shots when you’re not walking down there on that field or in that clubhouse but he made sure he was and what you saw from Swindell, and what he got from a lot of players afterward was recognition, that not only was he brave, and not only was he correct, but he handled it the right way. And I know that meant more to him than anything.”</p>\n\n<p>Pedro stood by me when not many did—because he’d been there.</p>\n\n<p>He called immediately. “History will be on your side.” I will die wishing Pedro Gomez could read this and I would urge the Baseball Writers’ Association of America to honor him with the highest award in the profession.</p>\n\n<p>Although Pedro was most widely known for his television reporting on ESPN, he was a Ball Writer at heart, born and bred from an undying love of the game. After his death, close friend Steve Kettmann edited a book on Pedro’s life, a collection of essays from a Who’s Who of baseball luminaries—from famous reporters to star players to legendary managers.</p>\n\n<p>The book, <em>Remember Who You Are: What Pedro Gomez Showed Us About Baseball and Life,</em> is a touching tribute to a man who is a Hall of Famer in every sense of the word. As a father to sons Rio and Dante and daughter Sierra. As a husband to Sandi Gomez, president of the Pedro Gomez Foundation. As a reporter. As a person.</p>\n\n<p>My hope is that someday his legacy is honored in Cooperstown with the Baseball Writers’ Association of America’s Career Excellence Award. There is not a Ball Writing Hall of Fame that’s complete without Pedro Gomez in it.</p>\n\n<p>To support Pedro’s Hall of Fame legacy in sports journalism, consider connecting with the Pedro Gomez Foundation. It’s a non-profit created in 2021 to further students’ aspirations in baseball, journalism and beyond with endowed scholarships at Arizona State University and the University of Arizona. The foundation also offers a ten-week paid student internship at the <em>Arizona Republic</em> newspaper, partnering with the National Association of Hispanic Journalists.</p>\n\n<p>To donate to the Pedro Gomez Foundation, visit the website at https://www.pedrogomezfoundation.org/. For more information, email the foundation at info@pedrogomezfoundation.org.</p>\n</div>",
    wordCount: 1394,
    parent_id: null,
    hidden: false,
};

// Transform each book_full.json section into a chapters.js-shaped entry.
// A section with a truthy parent_id is a hidden flashback (Phase 3); it
// inherits section_type/year from its parent (already set in book_full.json)
// and is marked hidden:true so it stays out of the TOC and year groupings
// while remaining reachable via sequential nav and by slug.
const transformedChapters = bookData.sections.map(s => ({
    id: s.id,                       // "ch01".."ch26" or "chNN_fbN"
    year: s.year,                   // from converter's CHAPTER_YEAR_MAP
    section: s.section_type,        // from converter's SECTION_TYPE_MAP
    title: s.title,
    slug: s.slug,
    subtitle: s.subtitle || '',
    teaser: s.teaser || '',
    content: s.content,             // assembled HTML from converter
    wordCount: s.word_count,
    parent_id: s.parent_id || null, // flashback -> parent chapter id
    hidden: !!s.parent_id,          // flashbacks are hidden
    hideFromToc: false,
}));

// Original order: 3 front matter, 26 chapters (ch01..ch26), 1 postscript.
export const CHAPTERS = [
    titlePage,
    copyright,
    toc,
    ...transformedChapters,
    dedication,
];

// Backward-compatible slug aliases (old slug -> new canonical slug). The old
// broken "summer-2017" -> VERY SERIOUS STORY mapping is intentionally NOT
// preserved; that slug now resolves to SUMMER 2017 (the correct chapter).
const SLUG_ALIASES = {
    'summer-2017-prologue': 'summer-2017',
    'letter-to-the-editor': 'a-letter-to-the-editor',
};

// Export total word count for progress calculations
export const getTotalWordCount = () => {
    return CHAPTERS.reduce((sum, chapter) => sum + chapter.wordCount, 0);
};

// Export chapter count
export const getChapterCount = () => CHAPTERS.filter(c => !c.hidden).length;

// Get first chapter ID (skips chapters without IDs like title/TOC)
export const getFirstChapterId = () => {
    const firstWithId = CHAPTERS.find(c => c.id !== undefined);
    return firstWithId?.id ?? 1;
};

// Get last chapter ID
export const getLastChapterId = () => CHAPTERS[CHAPTERS.length - 1]?.id ?? 1;

// Get previous chapter ID (returns null if at first chapter, skips chapters without IDs)
export const getPreviousChapterId = (currentId) => {
    const currentIndex = CHAPTERS.findIndex(c => c.id === currentId);
    if (currentIndex <= 0) return null;
    // Find the previous chapter that has an ID
    for (let i = currentIndex - 1; i >= 0; i--) {
        if (CHAPTERS[i].id !== undefined) {
            return CHAPTERS[i].id;
        }
    }
    return null;
};

// Get next chapter ID (returns null if at last chapter, skips chapters without IDs)
export const getNextChapterId = (currentId) => {
    const currentIndex = CHAPTERS.findIndex(c => c.id === currentId);
    if (currentIndex < 0 || currentIndex >= CHAPTERS.length - 1) return null;
    // Find the next chapter that has an ID
    for (let i = currentIndex + 1; i < CHAPTERS.length; i++) {
        if (CHAPTERS[i].id !== undefined) {
            return CHAPTERS[i].id;
        }
    }
    return null;
};

// Calculate reading time (words per minute = 200)
export const calculateReadingTime = (wordCount) => {
    const minutes = Math.ceil(wordCount / 200);
    return minutes;
};

// Get intro chapters (nested under INTRO dropdown)
export const getIntroChapters = () => {
    return CHAPTERS.filter(c => c.section === 'intro' && !c.hidden);
};

// Get postscript chapters (nested under POSTSCRIPT dropdown)
export const getPostscriptChapters = () => {
    return CHAPTERS.filter(c => c.section === 'postscript' && !c.hideFromToc && !c.hidden);
};

// Get chapters grouped by year (only year-section chapters)
export const getChaptersByYear = () => {
    const yearMap = {};

    CHAPTERS.filter(c => c.section === 'year' && !c.hidden).forEach(chapter => {
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

// Get chapter by slug (with backward-compatible alias fallback)
export const getChapterBySlug = (slug) => {
    // Try direct match first
    let chapter = CHAPTERS.find(c => c.slug === slug);
    if (chapter) return chapter;
    // Try alias
    const aliasedSlug = SLUG_ALIASES[slug];
    if (aliasedSlug) {
        chapter = CHAPTERS.find(c => c.slug === aliasedSlug);
        if (chapter) return chapter;
    }
    return null;
};

// Get chapter slug by ID
export const getChapterSlug = (id) => {
    const chapter = CHAPTERS.find(c => c.id === id);
    return chapter?.slug || null;
};

// Phase 3 (segment model): every hidden segment belonging to a parent
// chapter — flashbacks AND parent-resume segments — in CHAPTERS order
// (document order from book_full.json). Used by the progressive-reveal UX
// to walk a chapter's segments.
export const getSegmentsForParent = (parentId) => {
    return CHAPTERS.filter(c => c.parent_id === parentId);
};

// Build the in-content Table of Contents dynamically from CHAPTERS so future
// additions auto-appear. Same helpers/filters as the sidebar TOC.
(() => {
    const tocChapter = CHAPTERS.find(c => c.section === 'toc');
    if (!tocChapter) return;
    const entries = [
        ...getIntroChapters(),
        ...getSortedYears().flatMap(y => getChaptersByYear()[y] || []),
        ...getPostscriptChapters()
    ];
    const entryHTML = entries
        .map(c => `<p class="toc-entry"><a href="#${c.slug}" class="toc-link">${c.title}</a></p>`)
        .join('\n\n');
    tocChapter.content = `<div class="toc-page">
<h2 class="toc-page-title">TABLE OF CONTENTS</h2>
${entryHTML}
</div>`;
})();

// Window global side-effect (share.js and others read window.CHAPTERS).
if (typeof window !== 'undefined') {
    window.CHAPTERS = CHAPTERS;
}
