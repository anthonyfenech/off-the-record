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

// ─── Adapter-side merges (runtime) ──────────────────────────────────────
// The converter emits ch06 / ch06_fb1 / ch06b as three segments (parent
// + flashback + parent-resume). At runtime we collapse them into a single
// visible OPENING DAY chapter with the EMBARRASSING FLASHBACK folded in
// between the first scene break and the resume body. The converter,
// book_full.json / book_full.js, and all validation pipelines stay
// untouched — this collapse is adapter-only.
(() => {
    const secs   = bookData.sections;
    const od     = secs.find(s => s.id === 'ch06');
    const fb     = secs.find(s => s.id === 'ch06_fb1');
    const resume = secs.find(s => s.id === 'ch06b');
    if (!od || !fb || !resume) return; // converter shape changed; bail safely
    // Unwrap the flashback's toc-page wrapper and convert the centered
    // <h2 class="toc-page-title">EMBARRASSING FLASHBACK</h2> into an inline
    // <p class="flashback-header"> subhead. The .flashback-header rule in
    // css/components.css is the design-system pattern for in-body labels.
    const fbInner = fb.content
        .replace(/^\s*<div class="toc-page">\s*/, '')
        .replace(/\s*<\/div>\s*$/, '')
        .replace(/<h2 class="toc-page-title">EMBARRASSING FLASHBACK<\/h2>\s*/,
                 '<p class="flashback-header">EMBARRASSING FLASHBACK</p>\n\n');
    // od ends with <p class="scene-break">***</p>  (BREAK-A — kept).
    // fbInner ends with <p class="scene-break">***</p>  (BREAK-B — kept).
    // resume opens clean with the PITTSBURGH dateline.
    od.content    = od.content + '\n\n' + fbInner + '\n\n' + resume.content;
    od.word_count = (od.word_count || 0) + (fb.word_count || 0)
                  + (resume.word_count || 0);
    bookData.sections = secs.filter(s => s.id !== 'ch06_fb1'
                                      && s.id !== 'ch06b');
})();

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
    content: `<div class="toc-page">
<h2 class="toc-page-title">COPYRIGHT</h2>
<p>Copyright © 2026 by Anthony Fenech</p>
<p>Cover design by Jay Tuohey. Cover copyright © 2026 by Red Dot Press.</p>
<p>Red Dot Press supports the right to free expression and the value of copyright. The purpose of copyright is to encourage writers and artists to produce the creative works that enrich our culture.</p>
<p>The scanning, uploading, and distribution of this book without permission is a theft of the author's intellectual property. If you would like permission to use material from the book (other than for review purposes), please contact permissions@reddotbooks.com. Thank you for your support of the author's rights.</p>
<p>Red Dot Press | reddotbooks.com</p>
<p>First Edition: May 2026</p>
<p>Library of Congress Control Number: 2026909148</p>
<p>ISBNs: 9798995630401 (print) | ISBN 9798995630418 (ebook)</p>
</div>`,
    wordCount: 0,
    parent_id: null,
    hidden: false,
    hideFromToc: false,
};

// End-of-book cover page — inert clone of the landing hero (no button, no
// click handler, no shared id). Unique section value keeps it out of every
// TOC builder; reachable via prev/next + slug only.
const coverBack = {
    id: 'cover-back',
    year: null,
    section: 'cover-back',
    title: "",
    slug: "cover-back",
    subtitle: "",
    teaser: "",
    content: '<div class="home-content cover-back"><img src="./assets/cover-web.jpg" alt="OFF-THE-RECORD" class="home-cover-img cover-back-img"></div>',
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

// Front matter — verbatim from official manuscript (OFF-THE-RECORD.docx ACKNOWLEDGMENTS
// section). Stripped from ch26 body in commit 2eccbf5; rendered here as a dedication-style
// front-matter literal (postscript section, hideFromToc:true, reachable via prev/next + slug).
const acknowledgments = {
    id: 'acknowledgments',
    year: null,
    section: 'postscript',
    hideFromToc: true,
    title: "ACKNOWLEDGMENTS",
    slug: "acknowledgments",
    subtitle: "",
    teaser: "",
    content: `<div class="toc-page">
<h2 class="toc-page-title">ACKNOWLEDGMENTS</h2>
<p>My eighth grade English teacher is the first person who comes to mind.</p>
<p>She kept me after class and said that my essay made her laugh; that I had a gift. I'd been searching for her when she emailed the address below my story about Al Kaline. We talked for more than three hours; it was COVID and I told her about my career crossroads and this crazy idea I'd been working on.</p>
<p>"Anthony," she said, "You're better than them. You're better than all of them."</p>
<p>When I couldn't disagree, that's when I knew I had it bad.</p>
<p>Dad called me "Champion" growing up, and Mom read to me every night as a child.</p>
<p>The fingerprints of the <em>Detroit Free Press</em> are all over these pages: The most raw, incomplete version of this book was read by a veteran copy editor who read it twice more after that. It wasn't much of a book until I found the correct email of an esteemed editor from years past. We connected through James Jahnke's annual bowl pool. When he read some pages and said, "Anthony, I think you've got a book here," I knew I had my man.</p>
<p>Mr. Sports Editor went through every word by hand. He printed 'em out, marked 'em up, and screenshotted 'em back. A year later, he had officially wrangled my wild horse writing into a working manuscript. The <em>Free Press</em>' influence goes beyond the newsroom, to the many readers who found my personal email address over the years. Corresponding with Tigers fans made me feel normal again.</p>
<p>I have been fortunate to work with personable editors who have afforded me the freedom to choose which shape I wanted to be in this cookie-cutter industry. The guy in Las Vegas who bet on Tony Gold. A pair of editors in Pittsburgh nurtured my confidence while working the city desk for free.</p>
<p>Thank you to those who trusted me with this project, especially those who may have found themselves part of the story through no fault of their own. The respect and understanding with which you've treated me under most unusual circumstances won't be forgotten.</p>
<p>A brigade of beta readers made this book better, beginning with a classmate from high school journalism class. My best friend has read <em>OFF-THE-RECORD</em> twice, one of only two known to scale the first full draft. (690 pages.)</p>
<p>The other owns an American sports bar and never knew me when I was an American sports somebody. My Malta friends allowed me to be myself again.</p>
<p>This book doesn't exist without my aunt, who believed in me more than I believed in myself at times. The girl I once met in the college newsroom never gave up on me, even when I made it difficult.</p>
<p>I generally find these missives to be gross public displays of name-dropping, networking and navel-gazing in an industry that is already a few notches too incestuous, but if I didn't thank anybody, they'd be calling me a jerk.</p>
</div>`,
    wordCount: 499,
    parent_id: null,
    hidden: false,
};

// Front matter — name index extracted from name-index.html (24 sections, 312 names).
// Self-contained back-matter literal, dedication-style: section postscript, hideFromToc,
// reachable via prev/next + slug. NOT a link to name-index.html (which remains standalone).
const bookIndex = {
    id: 'index',
    year: null,
    section: 'postscript',
    hideFromToc: true,
    title: "INDEX",
    slug: "index",
    subtitle: "",
    teaser: "",
    content: `<div class="toc-page index-page">
<h2 class="toc-page-title">INDEX</h2>
<h3 class="index-letter">A</h3>
<p class="index-name">Abreu, José</p>
<p class="index-name">Ackert, Kristie</p>
<p class="index-name">Albom, Mitch</p>
<p class="index-name">Alexander, Tyler</p>
<p class="index-name">Allen, Rod</p>
<p class="index-name">Almora, Albert</p>
<p class="index-name">Altuve, Jose</p>
<p class="index-name">Anderson, Brett</p>
<p class="index-name">Anderson, Rick</p>
<p class="index-name">Anderson, Sparky</p>
<p class="index-name">Andrew</p>
<p class="index-name">Arias, Oliver</p>
<p class="index-name">Ausmus, Brad</p>
<p class="index-name">Avila, Al</p>
<p class="index-name">Avila, Alan</p>
<p class="index-name">Avila, Alex</p>
<p class="index-name">Aviles, Mike</p>
<h3 class="index-letter">B</h3>
<p class="index-name">Báez, Javier</p>
<p class="index-name">Bakich, Erik</p>
<p class="index-name">Balelo, Nez</p>
<p class="index-name">Baratta, Tim</p>
<p class="index-name">Barron, David</p>
<p class="index-name">Beck, Jason</p>
<p class="index-name">Bernstein, Carl</p>
<p class="index-name">Bhatia, Peter</p>
<p class="index-name">Billmeyer, Mick</p>
<p class="index-name">Bixler, Bob</p>
<p class="index-name">Boggs, John</p>
<p class="index-name">Bonds, Barry</p>
<p class="index-name">Boras, Scott</p>
<p class="index-name">Bosio, Chris</p>
<p class="index-name">Bouton, Jim</p>
<p class="index-name">Boyd, Matthew</p>
<p class="index-name">Brantley, Michael</p>
<p class="index-name">Braun, Scott</p>
<p class="index-name">Bream, Scott</p>
<p class="index-name">Bregman, Alex</p>
<p class="index-name">Breslow, Craig</p>
<p class="index-name">Britten, Brian</p>
<p class="index-name">Brookens, Tom</p>
<p class="index-name">Bull, Kevin</p>
<h3 class="index-letter">C</h3>
<p class="index-name">Cabrera, Miguel</p>
<p class="index-name">Candelario, Jeimer</p>
<p class="index-name">Caratini, Víctor</p>
<p class="index-name">Cash, Johnny</p>
<p class="index-name">Castellanos, Nick</p>
<p class="index-name">Castro, Harold</p>
<p class="index-name">Castro, Willi</p>
<p class="index-name">Céspedes, Yoenis</p>
<p class="index-name">Chadd, David</p>
<p class="index-name">Chamberlain, Joba</p>
<p class="index-name">Chanock, Nick</p>
<p class="index-name">Charles, Fran</p>
<p class="index-name">Charlie</p>
<p class="index-name">Close, Casey</p>
<p class="index-name">Cobb, Ty</p>
<p class="index-name">Colangelo, Ron</p>
<p class="index-name">Collins, Terry</p>
<p class="index-name">Corbin, Tim</p>
<p class="index-name">Corey</p>
<p class="index-name">Cotillo, Chris</p>
<p class="index-name">Cotsonika, Nick</p>
<p class="index-name">Courtney, Pat</p>
<p class="index-name">Crasnick, Jerry</p>
<p class="index-name">Cron, C.J.</p>
<p class="index-name">Crosby, Bing</p>
<p class="index-name">Crunk, Chad</p>
<h3 class="index-letter">D</h3>
<p class="index-name">Davis, Rajai</p>
<p class="index-name">Demeritte, Travis</p>
<p class="index-name">Dias, Gene</p>
<p class="index-name">Dombrowski, Dave</p>
<p class="index-name">Downey, Mike</p>
<p class="index-name">Drellich, Evan</p>
<p class="index-name">Drummond, Andre</p>
<p class="index-name">Duquette, Jim</p>
<h3 class="index-letter">E</h3>
<p class="index-name">Edwards, Herm</p>
<p class="index-name">Ellis, Vince</p>
<p class="index-name">Everitt, Mike</p>
<h3 class="index-letter">F</h3>
<p class="index-name">Falls, Joe</p>
<p class="index-name">Farmer, Buck</p>
<p class="index-name">Feliz, Neftali</p>
<p class="index-name">Fenech, Anthony</p>
<p class="index-name">Fetter, Chris</p>
<p class="index-name">Feuerborn, John</p>
<p class="index-name">Fiers, Mike</p>
<p class="index-name">Fisk, Carlton</p>
<p class="index-name">Fister, Doug</p>
<p class="index-name">Franklin, Jay</p>
<p class="index-name">Frye, Jeff</p>
<p class="index-name">Fulmer, Michael</p>
<h3 class="index-letter">G</h3>
<p class="index-name">Galli, Brad</p>
<p class="index-name">Gammons, Peter</p>
<p class="index-name">García, Rony</p>
<p class="index-name">Gardenhire, Carol</p>
<p class="index-name">Gardenhire, Ron</p>
<p class="index-name">Gibson, Kirk</p>
<p class="index-name">Gobert, Rudy</p>
<p class="index-name">Gomes, Jonny</p>
<p class="index-name">Gomez, Pedro</p>
<p class="index-name">Gomez, Rio</p>
<p class="index-name">González, Fredi</p>
<p class="index-name">Goodrum, Niko</p>
<p class="index-name">Gordon, Alex</p>
<p class="index-name">Gorzelanny, Tom</p>
<p class="index-name">Grande, Steve</p>
<p class="index-name">Greene, Shane</p>
<p class="index-name">Guillén, Ozzie</p>
<h3 class="index-letter">H</h3>
<p class="index-name">Harbaugh, Jim</p>
<p class="index-name">Hardy, Blaine</p>
<p class="index-name">Harper, Bryce</p>
<p class="index-name">Harwell, Ernie</p>
<p class="index-name">Harwell, Lulu</p>
<p class="index-name">Henning, Lynn</p>
<p class="index-name">Hernández, Ángel</p>
<p class="index-name">Hernández, Dylan</p>
<p class="index-name">Heyman, Jon</p>
<p class="index-name">Hicks, John</p>
<p class="index-name">Hicks, Karen</p>
<p class="index-name">Hinch, A.J.</p>
<p class="index-name">Holaday, Bryan</p>
<p class="index-name">Holland, Ken</p>
<p class="index-name">Horton, Willie</p>
<p class="index-name">Hunter, Torii</p>
<h3 class="index-letter">I</h3>
<p class="index-name">Iglesias, Jose</p>
<p class="index-name">Ilitch, Christopher</p>
<p class="index-name">Ilitch, Mike</p>
<p class="index-name">Impemba, Mario</p>
<p class="index-name">Internet Stalker</p>
<p class="index-name">Izzo, Tom</p>
<h3 class="index-letter">J</h3>
<p class="index-name">Jackson, Joe S.</p>
<p class="index-name">James</p>
<p class="index-name">Jess</p>
<p class="index-name">Jeter, Derek</p>
<p class="index-name">Jones, Jeff</p>
<p class="index-name">Jones, Lynn</p>
<p class="index-name">Joyner, Wally</p>
<h3 class="index-letter">K</h3>
<p class="index-name">Kaline, Al</p>
<p class="index-name">Kawakami, Tim</p>
<p class="index-name">Kelly, Don</p>
<p class="index-name">Kerr, Jimmy</p>
<p class="index-name">King, George</p>
<p class="index-name">King, Stephen</p>
<p class="index-name">Kinsler, Ian</p>
<p class="index-name">Krol, Ian</p>
<h3 class="index-letter">L</h3>
<p class="index-name">LaCanfora, Jason</p>
<p class="index-name">Lamont, Gene</p>
<p class="index-name">Larry</p>
<p class="index-name">Le Batard, Dan</p>
<p class="index-name">Leinenkugel, Dick</p>
<p class="index-name">Lewis, Jerry</p>
<p class="index-name">Leyland, Jim</p>
<p class="index-name">Liddle, Steve</p>
<p class="index-name">Littlefield, Dave</p>
<p class="index-name">Lombardozzi, Steve</p>
<p class="index-name">Lowe, John</p>
<p class="index-name">Lowe, Mark</p>
<p class="index-name">Luhnow, Jeff</p>
<h3 class="index-letter">M</h3>
<p class="index-name">Machota, Jon</p>
<p class="index-name">Manfred, Rob</p>
<p class="index-name">Manuel, Warde</p>
<p class="index-name">Martín, Leonys</p>
<p class="index-name">Martin, Matt</p>
<p class="index-name">Martinez, J.D.</p>
<p class="index-name">Martínez, Víctor</p>
<p class="index-name">Martínez, Víctor Jose</p>
<p class="index-name">Mato, Gene</p>
<p class="index-name">Matt</p>
<p class="index-name">Maybin, Cameron</p>
<p class="index-name">McCann, James</p>
<p class="index-name">McClendon, Lloyd</p>
<p class="index-name">McCosky, Chris</p>
<p class="index-name">McGregor, Conor</p>
<p class="index-name">Menzin, Sam</p>
<p class="index-name">Mercer, Jordy</p>
<p class="index-name">Miech, Rob</p>
<p class="index-name">Milchin, Mike</p>
<p class="index-name">Miley, Wade</p>
<p class="index-name">Mintz, Jake</p>
<p class="index-name">Mize, Casey</p>
<p class="index-name">Monroe, Craig</p>
<p class="index-name">Montas, Frankie</p>
<p class="index-name">Morosi, Jon</p>
<p class="index-name">Morris, Jack</p>
<p class="index-name">Moustakas, Mike</p>
<p class="index-name">Mozeliak, John</p>
<p class="index-name">Murray, Robert</p>
<p class="index-name">Myers, Gene</p>
<h3 class="index-letter">N</h3>
<p class="index-name">Nathan, Joe</p>
<p class="index-name">Nesbitt, Ángel</p>
<p class="index-name">Neuse, Sheldon</p>
<p class="index-name">Nightengale, Bob</p>
<p class="index-name">Norris, Daniel</p>
<h3 class="index-letter">O</h3>
<p class="index-name">Obama, Barack</p>
<p class="index-name">O'Connell, Jack</p>
<p class="index-name">Ohtani, Shohei</p>
<p class="index-name">Olney, Buster</p>
<p class="index-name">Ortiz, David</p>
<p class="index-name">Osuna, Roberto</p>
<h3 class="index-letter">P</h3>
<p class="index-name">Parker, Rob</p>
<p class="index-name">Passan, Jeff</p>
<p class="index-name">Pepe, Dave</p>
<p class="index-name">Pepin, Matt</p>
<p class="index-name">Pérez, Salvador</p>
<p class="index-name">Pieper, Mark</p>
<p class="index-name">Porcello, Rick</p>
<p class="index-name">Price, David</p>
<h3 class="index-letter">R</h3>
<p class="index-name">Rand, Kevin</p>
<p class="index-name">Ray, Robbie</p>
<p class="index-name">Rebecca</p>
<p class="index-name">Reyes, Víctor</p>
<p class="index-name">Reynolds, Harold</p>
<p class="index-name">Robertson, Nate</p>
<p class="index-name">Robles, Víctor</p>
<p class="index-name">Rodríguez, Francisco</p>
<p class="index-name">Rodríguez, Pudge</p>
<p class="index-name">Rodríguez, Ronny</p>
<p class="index-name">Rogers, Jake</p>
<p class="index-name">Rogers, Kenny</p>
<p class="index-name">Romine, Andrew</p>
<p class="index-name">Romine, Austin</p>
<p class="index-name">Rondon, Bruce</p>
<p class="index-name">Rosenberg, Michael</p>
<p class="index-name">Rosenthal, Ken</p>
<p class="index-name">Rozema, Dave</p>
<p class="index-name">Russell, Mike</p>
<p class="index-name">Russo, Christopher</p>
<p class="index-name">Ryan, Kyle</p>
<p class="index-name">Ryan, Sam</p>
<h3 class="index-letter">S</h3>
<p class="index-name">Saltalamacchia, Jarrod</p>
<p class="index-name">Sánchez, Aníbal</p>
<p class="index-name">Sánchez, Gary</p>
<p class="index-name">Sanders, Barry</p>
<p class="index-name">Santiago, Ramon</p>
<p class="index-name">Saupold, Warwick</p>
<p class="index-name">Scherzer, Max</p>
<p class="index-name">Schilling, Curt</p>
<p class="index-name">Schmakel, Jim</p>
<p class="index-name">Schmehl, James</p>
<p class="index-name">Schoop, Jonathan</p>
<p class="index-name">Schuerholz, John</p>
<p class="index-name">Schuerholz, Jonathan</p>
<p class="index-name">Shaer, Tom</p>
<p class="index-name">Sharp, Drew</p>
<p class="index-name">Showalter, Buck</p>
<p class="index-name">Shusterman, Jordan</p>
<p class="index-name">Simon, Alfredo</p>
<p class="index-name">Sinatra, Frank</p>
<p class="index-name">Sipple, George</p>
<p class="index-name">Smilovitz, Bernie</p>
<p class="index-name">Smith, Mike</p>
<p class="index-name">Smith, Steve</p>
<p class="index-name">Snitker, Brian</p>
<p class="index-name">Snyder, Mark</p>
<p class="index-name">Soria, Joakim</p>
<p class="index-name">Soriano, Rafael</p>
<p class="index-name">Sour Shoes</p>
<p class="index-name">Springer, George</p>
<p class="index-name">Strang, Katie</p>
<p class="index-name">Suarez, Oscar</p>
<p class="index-name">Swanson, Dansby</p>
<h3 class="index-letter">T</h3>
<p class="index-name">Teevan, Mike</p>
<p class="index-name">Thomas, B.J.</p>
<p class="index-name">Thomas, Chris</p>
<p class="index-name">Thompson, Hunter S.</p>
<p class="index-name">Thorn, John</p>
<p class="index-name">Tigers Twitter Guy</p>
<p class="index-name">Torkelson, Spencer</p>
<p class="index-name">Torre, Joe</p>
<p class="index-name">Trammell, Alan</p>
<p class="index-name">Trump, Donald</p>
<p class="index-name">Turner, Allyson</p>
<h3 class="index-letter">U</h3>
<p class="index-name">Upton, Justin</p>
<p class="index-name">Upton, Kate</p>
<p class="index-name">Upton, Manny</p>
<h3 class="index-letter">V</h3>
<p class="index-name">Van Gundy, Stan</p>
<p class="index-name">Vavra, Joe</p>
<p class="index-name">Vavra, Lynn</p>
<p class="index-name">Vavra, Terrin</p>
<p class="index-name">Verlander, Ben</p>
<p class="index-name">Verlander, Justin</p>
<p class="index-name">Verlander, Peggy</p>
<p class="index-name">Verlander, Richard</p>
<p class="index-name">Verlander, Rick</p>
<p class="index-name">Villarreal, Aileen</p>
<p class="index-name">Vincent, Charlie</p>
<p class="index-name">Vizquel, Omar</p>
<h3 class="index-letter">W</h3>
<p class="index-name">Wallenbrock, Craig</p>
<p class="index-name">Welch, Bob</p>
<p class="index-name">Wells, Vernon</p>
<p class="index-name">Westhoff, John</p>
<p class="index-name">Wheeler, Zack</p>
<p class="index-name">Whitaker, Lou</p>
<p class="index-name">Wilson, Justin</p>
<p class="index-name">Wolfe, Tom</p>
<p class="index-name">Woodward, Bob</p>
<p class="index-name">Wysocki, Michele</p>
<h3 class="index-letter">Z</h3>
<p class="index-name">Zimmermann, Jordan</p>
<p class="index-name">Zumaya, Joel</p>
</div>`,
    wordCount: 0,
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

// Order: 2 front matter (title, toc), chapters from book_full (with the
// ch06 cluster collapsed by the adapter merge above), dedication, copyright,
// then the end-of-book cover as the absolute last page.
export const CHAPTERS = [
    titlePage,
    toc,
    ...transformedChapters,
    dedication,
    acknowledgments,
    bookIndex,
    copyright,
    coverBack,
];

// Backward-compatible slug aliases (old slug -> new canonical slug). The old
// broken "summer-2017" -> VERY SERIOUS STORY mapping is intentionally NOT
// preserved; that slug now resolves to SUMMER 2017 (the correct chapter).
const SLUG_ALIASES = {
    'summer-2017-prologue': 'summer-2017',
    'letter-to-the-editor': 'a-letter-to-the-editor',
    // Adapter merged ch06 cluster into a single OPENING DAY chapter:
    'embarrassing-flashback': 'opening-day',
    'opening-day-resume-1':   'opening-day',
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
