// Chapter data for OFF-THE-RECORD memoir

const placeholderContent = `This chapter is part of the OFF-THE-RECORD memoir covering Detroit Tigers baseball.

Content will detail the pivotal moments, unforgettable players, and behind-the-scenes stories that defined this era of Tigers baseball.

The full manuscript is being prepared. Each chapter explores a different aspect of covering Major League Baseball, from the intimate moments in the clubhouse to the dramatic finishes under the lights at Comerica Park.

This is placeholder text that will be replaced with the actual memoir content.`.repeat(3);

export const CHAPTERS = [
    // INTRO CHAPTERS (1-4) - Nested under INTRO dropdown
    {
        id: 1,
        year: null,
        section: 'intro',
        title: "AUTHOR'S NOTE",
        subtitle: "To be written",
        teaser: "An introduction to this baseball memoir.",
        content: placeholderContent,
        wordCount: 500
    },
    {
        id: 2,
        year: null,
        section: 'intro',
        title: "SUMMER 2017",
        subtitle: "Where our story begins",
        teaser: "Where our story begins.",
        content: `<p class="section-header">CHICAGO, August 27</p>

<p>A storm is coming. Dark clouds approaching the Sears Tower, raindrops streaking against a window and the back of a man's bald head. The last scene before the elevator door closes.</p>

<p>I am on the South Side at U.S. Cellular Field, home of the Chicago White Sox, and we are slowly descending from the third floor. The skyline is covered in gray. Walls are gray. Everything is gray.</p>

<p>In the back corner, stuck between unsober fans from the suite level, far too close to that man's bald head. I'm smothered by emotions, suffocated by the smell of a packed elevator. Didn't start smoking again until this past weekend, but I need a cigarette.</p>

<p>Not until I squeeze through the slow crowd of stragglers leaving do I think about how different I am now than when I walked into this godforsaken place a couple days earlier.</p>

<p>Sunday afternoon. Light up and wait for my ride to arrive. He will soon take me to Midway, where I can drink these stressors away, and then I'll fly to Denver, where I can smoke 'em away. Thinking about how, at this time yesterday, I was crying, silently sobbing in the back of the press box.</p>

<p>At the time, I had just messaged a star player's dad, giving him a heads-up for a story that was coming out about his son, who had become a problem in the clubhouse.</p>

<p>Now, I'm thinking about how my job as a beat writer will never be the same again. About how I'm a wanted man now. How I might even kind of like it.</p>

<p>My ride soon pulls up, his black Lincoln Navigator serving as a beacon of safety from this rainy, risky world of sports writing. "Don't get punched," a star player messaged me the other day. "For real."</p>

<p>Andrew, my Chicago driver who also shuttles players and umpires, talks in his New York tongue—conversation I'm not interested in at the moment.</p>

<p>The city streets are bumpy. I lean my head on the door panel—maybe the bumps will help ease my pain. I close my eyes and try to forget about the weekend that was, the wreckage still to sift through.</p>

<p>I open them to receive a text message from the Tigers' top PR official. He is apologizing for yesterday, when he tried intimidating me by suggesting I could not continue my baseball writing job if I went through with the Very Serious Story.</p>

<p>"Players are not happy. So, someone else will be covering the last five weeks?"</p>

<p>"I don't think that's an appropriate question."</p>

<p>"I am trying to help you do your job."</p>

<p>He's a veteran PR chief. Worked with him for years—normally a straight shooter who helps me do my job. But he definitely was not trying to help me do my job this weekend, when I had a flaming arrow pointed at the heart of the team.</p>

<p>"Once you post the story, I can't help you if players decided to not talk to you or the Free Press."</p>

<p>I understood—hell, I wasn't happy either, but such is the life I chose.</p>

<p>The Very Serious Story threatens the harmony of the clubhouse and exposes the bad behavior of a highly paid, highly respected veteran player. A story PR does not want to be published.</p>

<p>It is my job to write these stories; it's PR's job to keep me from writing them. I need access to cover the team. PR is in charge of that access. This can make for awkward relationships when these competing forces collide. Often as a sports writer, you take the loss, bruised from failing to break through brick walls.</p>

<p>I am holding the 'L' as we speak. The biggest of my career. I broke through the brick wall on the Very Serious Story almost a year ago—I had to wait until the time came, if ever it did.</p>

<p>There was a fight in the clubhouse last season. It fractured the team and the player who sparked it had become an even bigger problem this year—but I couldn't put it out there unprompted. I have enough sourcing to go with the Very Serious Story, but I've had to wait—it's bad form to drop a bomb unprompted, and nothing's happened recently to warrant such a move.</p>

<p>Well, a few days ago, I was prompted.</p>

<p>I landed and started putting word out about the story. I talked to the player and the manager at the ballpark the next day and had the story written by 2 A.M. Saturday, with more than enough time to kick up my feet and enjoy a coffee before print deadline for the all-important Sunday Paper, the most circulated of the week.</p>

<p>Even when we somehow missed that deadline (don't wanna talk about it), we still got the Very Serious Story in the chute and ready to go, scheduled to go live online at 1 A.M.</p>

<p>Yet here I sit—sixteen hours later—and the Very Serious Story has not been published. I still don't want to talk about it—I successfully silenced Andrew a few minutes ago. Said I was tired and wanted to close my eyes for a bit.</p>

<p>The day was bad. I was hungover enough from whiskey and stress and threw out the burnt crackers the cafeteria was passing off as French toast.</p>

<p>I sat next to the Tigers' traveling PR guy and he told me Justin Verlander (the star starting pitcher) wasn't going to be talking to me anymore. Still mad over something I tweeted about him watching the solar eclipse earlier in the year (seriously), or the way I pushed back in the last postgame interview (he walked out), or maybe in protest of the Very Serious Story I was writing (everyone knows).</p>

<p>All Detroit's media relations manager knew was what Verlander had previously told him— "I'm not talking to Fenech anymore."</p>

<p>Sadly, the Very Serious Story has been killed. It's never going to be published. At least, not in that form. The story I waited so patiently on where I had to walk up to the player with everyone watching, where players and coaches were pulling me outside the clubhouse and pinging my phone. All that for nothing.</p>

<p>Why not? I'll tell you why not and just keep it as straight to the point as possible: For reasons I am far too drained to recollect again, it took far too long for the Very Serious Story to come out of the oven, and we got lucky it did: Past midnight last night, about half an hour before the story was set to go live, I got a phone call from a source who ended up saving us in the end—lest we look like insensitive clowns, kicking the poor chap while he's down.</p>

<p>We pulled the story, which hasn't seen the light of day—and likely never will.</p>

<p>Meanwhile, guess who had to go back into the clubhouse with no story.</p>

<p>How they must think I got scared and didn't write it.</p>

<p>I walked up to the star player two days ago and told him what I was writing and gave him the opportunity to say something. Two days later, still no story. (And no star player, either.)</p>

<p>Andrew says there's an accident on the Stevenson so we're taking side streets to Midway, moving through the bumpy, stop-and-go roads of the sports writing life. I'm still angry. Too angry to be scrolling through Twitter or texting anyone, let alone the top Tigers PR guy, who reigns successful once again after foiling the beat writer in Hail Mary fashion.</p>

<p>"First, that was a very uncalled for comment yesterday. Second—whatever, I don't even want to get into it. Refer to 'First.'"</p>

<p>"I apologize for that," he says. "Have a good trip to Denver. Great ballpark and cool city."</p>

<p class="section-header">DENVER, August 29</p>

<p>Still catching up on sleep. The Tigers are here playing the Colorado Rockies. I stay downtown after tonight's game and go to this guy's apartment.</p>

<p>I met the guy a couple of weeks ago at a wedding in Cancún, and here we are, sitting outside on his seventh-floor patio with another couple. I'm wearing shirt-tie-jacket and a work bag, an easy way to introduce myself—hi, I'm Anthony Fenech—I'm a sports writer, I cover the Detroit Tigers baseball team for the Detroit Free Press.</p>

<p>Basically, I fly around the country nine months every year writing about baseball. The job is never-ending, like a machine you can't beat. How, sitting here thinking about it, it's rather ridiculous that I'm writing and tweeting about these millionaires playing baseball. A game.</p>

<p class="section-header">August 30</p>

<p>The next day comes fast. Clubhouse opens at 9:30 for day games and today is what they call Getaway Day. Justin Verlander is pitching today. Tomorrow is the trade deadline. For the past two months, his name has been circulating in rumors. To the trained eye, his preference is clear: Verlander, thirty-four, a perennial All-Star with Hall of Fame credentials, wants no part of the long rebuild in store for the Tigers next season.</p>

<p>Problem is that the team is paying him big bucks for a long time. This year, Verlander is making $28 million—he's owed $117 million through 2020, thanks to a contract extension signed in his prime. The Tigers, meanwhile, have fallen on tough times: After years of competing for championships with high-payroll rosters, they stink now and have little choice but to enter a rebuild phase, where they'll essentially tank for a few seasons, trading their established players for top prospects and attempt to improve through the draft.</p>

<p>There are 162 games in a baseball season. Today's is No. 132. Tigers win. On the mound, Verlander pitches six strong innings for the trade deadline scouts in attendance, allowing one run.</p>

<p>Knowing his stance about not speaking with me, I circle back to PR, saying, "You have to know that if Verlander doesn't want to speak to the media when I'm around, that's fine. But I'm not going to leave. My credential allows me to be there."</p>

<p>Barring injury, the starting pitcher always speaks to the media after the game. But the last time Verlander went through this routine, he couldn't make it through.</p>

<p>"You should stop."</p>

<p>When I didn't stop, he walked away.</p>

<p>What questions did he not like? Glad you asked.</p>

<p>The reason the Very Serious Story needed to be written was because last week, there was a bench-clearing brawl with the New York Yankees. During the brawl, cameras caught Verlander arguing with a veteran teammate in the dugout. It was shared on social media and sent to the Ball Writer. Lucky for me, Verlander was starting the next day.</p>

<p>After the game, I asked him what happened with his teammate the previous day.</p>

<p>"What happened?"</p>

<p>"The argument with…"</p>

<p>He cut me off.</p>

<p>"You should stop."</p>

<p>I continued.</p>

<p>"What was on TV and shared on social media…"</p>

<p>And he was gone.</p>

<p>So, I enter the locker room today with my antennae up. I see the team's PR guy—a non-confrontational fellow, soft-spoken, wouldn't hurt a fly. The players know this and Verlander knows he's not just another player. He's wearing suede maroon. When the nice PR man approaches, his body language is that of standing his ground. When a handful of us sports writers half-circle him for the interview, I wait purposely for two others to ask questions before asking, 'How big were those two strikeouts in the fourth inning?'"</p>

<p>"Next question," he says. "Next question."</p>

<p>Verlander scans the faces until someone else stammers in. I follow up with an even more basic question, "How was your fastball today?"</p>

<p>Nothing else, no eye contact. PR calls for last question. There are none. Verlander flees the scene.</p>

<p class="section-header">August 31</p>

<p>Live from the Denver airport, it's the trade deadline.</p>

<p>Slow day thus far. Wasn't my best move booking a two-leg return trip, but the end of the season is fast approaching. I'm short of where I need to be for Gold Medallion status, so sacrifices must be made.</p>

<p>I'm flying to Atlanta then Detroit, slouched into an empty row and scrolling through Denver airport conspiracy theories when everything changes. It's Deep Throat, dropping a tip. "Trade coming today. Not Verlander."</p>

<p>Three-alarmer. After I'm tipped off, I canvass my top sources to see if I can fish out the scoop. I blast texts to those who might know.</p>

<p>Trying to find the identity of the mystery trade, I contact the team's general manager—the chief decision-maker, so-to-speak, known around here as the Highest Source In The Land. I slow-play my hand. "Just checking in. Do you think anything's going to happen today?"</p>

<p>Two minutes later, more aggressively: "Actually, I got a tip that something is going to happen. So, I'm checking up on that."</p>

<p>Time is of the essence. Trying to find agents in the know. "Keep me posted if you hear anything about J-Up." I tell Justin Upton's agent something is brewing. "Not Verlander is all I know."</p>

<p>I text Detroit's assistant GM.</p>

<p>"I got a tip something is in the works—any context you can add, completely off-the-record?"</p>

<p>Standing in the jetway now, inching forward into a sports writing nightmare: Boarding a plane while news is breaking—before ten minutes of no Wi-Fi during takeoff.</p>

<p>Before I get to my seat, I'm beat. It's one of the National Guys, of course, who says a trade is "close"—Upton is headed out the door. Ken Rosenthal says J-Up is going to the Los Angeles Angels. Rosenthal is the biggest of the National Guys, an exclusive club of baseball reporting sharks who feed on schools of scoops.</p>

<p>Assistant GM: "This advice from my chief legal counsel. Look at Rosenthal's tweet."</p>

<p>"Why? Why do the National Guys always get it?"</p>

<p>Detroit's top radio guy messages: "Details? Wanna call in? U awake?"</p>

<p>No details, no I do not want to call in, no I'm not awake.</p>

<p>"About to take off," I say.</p>

<p>Before we do, I refix my reporting eye on the much bigger whale in the distance. The National Guys are circling—they can see it, too, but they can't see it like I do. This is my favorite team growing up, potentially trading my favorite player growing up. Now I'm the Ball Writer on watch at my hometown newspaper. The fact that Justin won't even talk to me right now is only icing on top.</p>

<p>I touch base with his agent before boarding: "You think anything's going to happen?"</p>

<p>"I don't think so but predicting others' decisions is not something I'm usually comfortable with."</p>

<p>When I mention being on the plane while the Upton news is breaking, he reassures me: "Don't sweat it, you're really good at what you do and sometimes you can't control timing and info."</p>

<p>With the front office in close proximity back home, I touch base with my sources.</p>

<p>A Houston source says if they're in on Verlander, only the GM and owner know. Another's so paranoid about their tech-savvy front office, he offers his personal email instead of texting on his team phone.</p>

<p class="section-header">DETROIT</p>

<p>Per tradition, my mom picks me up from the airport. It gives me time to see her for a bit during the six-month grind of the baseball season.</p>

<p>I get back home after 10 on the evening of the trade deadline. Midnight approaches. We have less than three hours to go, and conditions appear calm on the Verlander trade front, comfortable enough for a welcome home pour.</p>

<p>I check with a Tigers guy. Nothing.</p>

<p>Deep Throat confirms the front office is In The Room as we speak. They are spending the final hours of the trade deadline at the GM's suburban Detroit house. His wife made dinner, apparently. In fact, according to maps, from where I stand on my porch smoking a cigarette exchanging messages with his subordinates, I could make it to his kitchen table in thirty-five minutes flat. I know. I've been there.</p>

<p>This proximity is something I consider: Not the 24.1 miles in between, rather the dining room area the Tigers' front officers currently share—which includes most, if not all, of my top sources. None of those leakers in there want to be exposed. They're aware of not being on their phones. They probably go to the bathroom to text me while taking a leak. Some must take a lot of leaks.</p>

<p>Forty minutes until the trade deadline, there's a tipster on Line 2. He may or may not be In The Room tonight. Still talking about the Very Serious Story that won't ever be.</p>

<p>"I'm still curious how accurate you were."</p>

<p>"How accurate do you think I was?"</p>

<p>"Most of what u told me was accurate. Couple things were off base."</p>

<p>Tipster wants to read it.</p>

<p>"I'll let you," I say. "Wait until the end of the season." I'm guessing he'll get fired and forget about it anyways.</p>

<p>Sitting in a lawn chair on my porch with a scout on speaker phone when I see a text from my buddy, sharing a tweet that sounds a five-alarm fire. It knocks me off the call and out of the chair.</p>

<p>"Oh, shit… Oh, shit. Gotta go."</p>

<p>I hang up and hurry into the kitchen. I'm extra careful about fake accounts these days, so I pull up Twitter on my computer just in case. "Tigers and Astros very close to finalizing a deal for Justin Verlander," according to my main rival, a Ball Writer for the other paper in town. The pit of my stomach falls.</p>

<p>I feel many things, not one of them good. More confused than angry. Helpless, humiliated, embarrassed—all those. It can be borderline erotic, this feeling of utter failure, being beaten this badly and not knowing how. Is this really happening? Why? Why is nobody getting back to me? IS THERE SOMETHING WRONG WITH MY PHONE? I text the Highest Source In The Land:</p>

<p>"Is this true?"</p>`,
        wordCount: 3200
    },
    {
        id: 3,
        year: null,
        section: 'intro',
        title: "DREAM JOB",
        subtitle: "To be written",
        teaser: "Landing the position of a lifetime.",
        content: placeholderContent,
        wordCount: 500
    },
    {
        id: 4,
        year: null,
        section: 'intro',
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

    // POSTSCRIPT CHAPTERS (31-32) - Nested under POSTSCRIPT dropdown
    {
        id: 31,
        year: null,
        section: 'postscript',
        title: "POSTSCRIPT",
        subtitle: "To be written",
        teaser: "Reflections on the journey.",
        content: placeholderContent,
        wordCount: 500
    },
    {
        id: 32,
        year: null,
        section: 'postscript',
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

// Get intro chapters (nested under INTRO dropdown)
export const getIntroChapters = () => {
    return CHAPTERS.filter(c => c.section === 'intro');
};

// Get postscript chapters (nested under POSTSCRIPT dropdown)
export const getPostscriptChapters = () => {
    return CHAPTERS.filter(c => c.section === 'postscript');
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
