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
        subtitle: "St. Paul's Bay, Malta",
        teaser: "A love letter to sports writing, a lesson on craft, and a story full of intense, fascinating characters.",
        content: `<p class="has-dateline"><span class="dateline">ST. PAUL'S BAY, Malta—</span>Dawn is coming up over the Mediterranean now. 7:12 A.M. I can hear the whining of early morning buses and smell the saltwater splashing underneath my balcony, out here at the far end of the island—this is the end of the line for buses, beaches and the life I once lived.</p>

<p>From my desk, I can see the hazy light of a new day. A man casts a fishing line from a dock while his dog lies patiently on the pavement. A shopkeeper brooms the steps of a bodega.</p>

<p>After a week-long windstorm, palm trees barely flicker this morning as I watch the past five years float away in calm, rhythmic ripples toward St. Paul's Shipwreck Island—a rock where Paul the Apostle purportedly crashed in 60 AD on the way to Rome, to be tried for sharing publicly the ridiculous thoughts in his mind. Some of them are carved into the walls of a nearby church.</p>

<p class="block-quote">I HAVE FAITH IN GOD THAT IT WILL BE EXACTLY AS I HAVE BEEN TOLD.</p>

<p>Five years ago, a similar blind faith led me here, to a speck on the map underneath Sicily, a place with three hundred days of sunshine, homemade pasta and, most importantly, a place where nobody knew my name.</p>

<p>Since you, also, don't know my name, allow me to introduce myself. My name is Anthony Fenech. For posterity's sake, it's pronounced Fen-ICK. And yes, I am aware my last name rhymes with dick.</p>

<p>I was a sportswriter in my past life. Started at nineteen in 2007 and lasted into the pandemic year of 2020, including five years when I covered the Detroit Tigers for the <em>Detroit Free Press</em> as the team's beat reporter. That role was something of a dream job for this whippersnapper—covering my favorite team growing up for the hometown paper. I liked it; I was good at it.</p>

<p>Then came the "accident," as my former therapist called it. It went viral. It redefined my life—I became a nameless, faceless person. All because a guy called me unethical.</p>

<p>The guy was Justin Verlander, a superstar pitcher who in an impressive twist of irony was my favorite player growing up, having anchored the Tigers' starting rotation for years. The accident happened in August 2019, when Verlander—then pitching for the Houston Astros—demanded that his team bar me from the clubhouse. The Astros obliged, breaking Major League Baseball's rules that guarantee reporters equal access.</p>

<p>The <em>Free Press</em> came to my defense, Verlander called me a dirty word, and soon the spat was scrolling across ESPN: <span class="small-caps">VERLANDER CALLS DETROIT FREE PRESS REPORTER 'UNETHICAL'</span></p>

<p>As it turns out, unethical is a hard tag for a journalist to shake—even when it's not true.</p>

<p>The accident left my name disfigured in an industry where reputation is all you've got. It nearly destroyed mine, just two years after I was honored as one of the top ten sports beat writers in America.</p>

<p>The <em>Free Press</em> took me off the Tigers beat for a while before reinstating me.</p>

<p>But by then, divine intervention had stepped in. I first felt called to devote my time to write this book within months after the accident, when I was spiraling. I took far too many drugs one weekend and dove headfirst into a box of paper receipts in the basement. The receipts tracked the five years I spent traversing the major leagues and brought to life memories that, for the first time since the accident, made me affectionate toward sports writing again.</p>

<p>The more time I spent on the book, the more fun I had, and the stronger my belief grew that walking away from the beat and writing a behind-the-scenes book about the sports writing life wasn't just the best move—it was the <em>only</em> move.</p>

<p>I arrived in Malta in fall 2020, ahead of the second wave of COVID-19, and hunkered down inside a converted boat house along the sea. When I discovered the nearby bus stop was named <em>Anthony</em>, I took it as a sign I was in the right place and got to work on <em>OFF-THE-RECORD</em>.</p>

<p>I wrote this book primarily for two reasons: (1) To take readers inside the mechanics and realities of the sports media machine—as close to the bone as possible, consequences be damned; and (2) To document my experiences and daily dramas as they unfolded. Most active sports writers can't really take you behind the curtains. They're kept in line by the daily grind—breaking news, trade rumors and speculation that scrolls across your phone like 24/7 Tetris—plus the daily care and feeding of their sources and bosses and major league officials. In Malta, the last thing I cared about was angering folks or re-establishing my sourcing network.</p>

<p>In writing this book, there was no such thing as off-the-record when it came to my career. <em>OFF-THE-RECORD</em> is my reporter's spiral notebook of what I've learned and observed over the years, rather than a reasoned analysis of the state of sports journalism or Major League Baseball as it's played these days. Covering a big-league baseball team is not much different than covering celebrities, city hall or a president who promises to "Make America Great Again." In all cases, you find good and bad and unexpected, reliable sources. To protect them and to keep the dope coming, you wind up knowing a lot of things you can't print. This was one of the journalistic barriers I ignored when writing <em>OFF-THE-RECORD</em>.</p>

<p>There are two problems with that type of all-in, lottery-winning approach. The most obvious but least serious is that even the people I considered friends in sports writing have at times treated me like a walking Wuhan lab.</p>

<p>The first colleague I told about <em>OFF-THE-RECORD</em> appears to have ghosted me—he hasn't responded in almost two years. Another guy sounded shocked that anyone would write something as dangerous as a behind-the-scenes book about the sports writing life. "I wouldn't want people coming after me."</p>

<p>Which brings us to the other, more complicated problem: <em>Losing my identity.</em></p>

<p>I had worked in sports media for my entire adult life before moving to Malta. Having your byline posted and printed from a major metropolitan newsroom comes with a certain kind of attention. Your phone is always lighting up with editors and sources and others. Your mailbox is always full of readers emailing to compliment/complain/criticize your work.</p>

<p>Your name and face are all over the website, more than two million people see it each year. That's not including the weekly podcast and TV appearances and radio interviews and Twitter, where there's always a fresh stack of notifications waiting to scroll through: retweets, favorites, people mentioning you, saying how funny or stupid you are.</p>

<p>I was no longer in a job with its work rhythms and deadlines, a structure I needed. For the first time since high school, I was writing for an audience of one.</p>

<p>I knew enough to realize the challenge of writing hundreds of pages and tens of thousands of words. But I didn't know the act of writing the words would pale in comparison to the personal impact of reliving moments both good and bad, some of the worst and best of my life.</p>

<p>I've been living in my own Edge City, like gonzo god Hunter Thompson, who once wrote that "when a jackrabbit gets addicted to road-running, it is only a matter of time before he gets smashed—and when a journalist turns into a politics junkie he will sooner or later start raving and babbling in print about things that only a person who has Been There can possibly understand."</p>

<p>Same goes for sports writing. I got addicted. Smashed. Turned into a Ball Writing junkie and once found a letter two winters ago that my fiancée hid in a drawer: "I feel sad at the thought of leaving him like this. I don't think he's doing great. It's not even just his use or intake. The war he's fighting these days is deep in his heart. This feels like the last mission. I think he'd be willing to die for this feat." You wouldn't have needed to ask twice.</p>

<p>But that was then. I have been living in St. Paul's Bay, a quiet locality that was bombed by Germany in World War II. It's got a Starbucks with comfortable seating and a McDonald's within ten minutes' walk, surrounded by the bluest water you've ever seen.</p>

<p>It's never looked bluer than today, backdropped by steep brown cliffs and green springtime shrubbery. The day feels as bright as the one when I discovered I wanted to be a sportswriter.</p>

<p>I was in high school, age seventeen, doing community service after being pulled aside for being very drunk at the last football game of my senior year. So, there I was at the local St. Vincent de Paul, unloading donations and organizing shelves of books, CDs, DVDs and movies in alphabetical order. And then I picked up a book that changed my life.</p>

<p>It was a compilation of sports columns by the <em>Free Press'</em> Mitch Albom, the most honored and by many measures the most read columnist and author sports writing has ever produced.</p>

<p>I couldn't put the book down. I read it in the restroom when I didn't have to go, placed it out of order on the shelf, always keeping one eye on it. I bought the copy after my shift and read every column in two days. I guess you could say I've been hooked on this life ever since.</p>

<p>As I reflect, it's difficult to clearly recall but a handful of the hundreds of games I covered. I can't recite records or statistics. No numbers come to mind at all—not even wins and losses. I think instead about relationships formed along the way, those that developed into friendships. Some strengthened by conflict, others severed by it. I think of proud moments I'd once forgotten and others I'd like to forget but never will.</p>

<p><em>OFF-THE-RECORD</em> is an authentic look at the life of a sportswriter from online to print to Twitter to TV. The greatest job on Earth. As close to the bone as it gets, for better or worse.</p>

<p>Whatever I wrote in all those hotel rooms and press boxes and hospitality lounges, whoever I texted and called and bribed for scoops back then, is no different in these pages than it was when I covered baseball like my life depended on it.</p>

<p>I haven't enjoyed everything about sports writing. I've felt like an outcast at times and misunderstood at others. I've also had to learn from—and live with—mistakes I made. Yet, sitting here awash in the fatigue and excitement of surviving a marathon thrill ride, I know there's been far more good than bad. I went from the rawest rookie to breaking stories and winning awards and building life-long relationships in baseball. I wouldn't trade those years, or the years it took to write this book, for anything. If you doubt me, feel the early onset carpal tunnel in my wrists.</p>

<p>So, what follows, then, is not so much a book about me as it is a love letter to sports writing, a lesson on craft, and a story full of intense, fascinating characters.</p>

<p>It's a reflection of what I've seen and felt while covering baseball for a living, which has provided me with the story of a lifetime, too good not to share.</p>

<p class="signature">—Anthony Fenech<br/>April 20, 2025<br/>Portobello Flats, Malta</p>`,
        wordCount: 1850
    },
    {
        id: 2,
        year: null,
        section: 'intro',
        title: "SUMMER 2017",
        subtitle: "Where our story begins",
        teaser: "Where our story begins.",
        content: `<p class="has-dateline"><span class="dateline">CHICAGO, <em>August 27</em>—</span>A storm is coming. Dark clouds approaching the Sears Tower, raindrops streaking against a window and the back of a man's bald head. The last scene before the elevator door closes.</p>

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

<p>"Once you post the story, I can't help you if players decided to not talk to you or the <em>Free Press</em>."</p>

<p>I understood—hell, I wasn't happy either, but such is the life I chose.</p>

<p>The Very Serious Story threatens the harmony of the clubhouse and exposes the bad behavior of a highly paid, highly respected veteran player. A story PR does not want to be published.</p>

<p>It is my job to write these stories; it's PR's job to keep me from writing them. I need access to cover the team. PR is in charge of that access. This can make for awkward relationships when these competing forces collide. Often as a sports writer, you take the loss, bruised from failing to break through brick walls.</p>

<p>I am holding the 'L' as we speak. The biggest of my career. I broke through the brick wall on the Very Serious Story almost a year ago—I had to wait until the time came, if ever it did.</p>

<p>There was a fight in the clubhouse last season. It fractured the team and the player who sparked it had become an even bigger problem this year—but I couldn't put it out there unprompted. I have enough sourcing to go with the Very Serious Story, but I've had to wait—it's bad form to drop a bomb unprompted, and nothing's happened recently to warrant such a move.</p>

<p>Well, a few days ago, I was prompted.</p>

<p>I landed and started putting word out about the story. I talked to the player and the manager at the ballpark the next day and had the story written by 2 <span class="small-caps">A.M.</span> Saturday, with more than enough time to kick up my feet and enjoy a coffee before print deadline for the all-important Sunday Paper, the most circulated of the week.</p>

<p>Even when we somehow missed that deadline (don't wanna talk about it), we still got the Very Serious Story in the chute and ready to go, scheduled to go live online at 1 <span class="small-caps">A.M.</span></p>

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

<p class="has-dateline"><span class="dateline">DENVER, <em>August 29</em>—</span>Still catching up on sleep. The Tigers are here playing the Colorado Rockies. I stay downtown after tonight's game and go to this guy's apartment.</p>

<p>I met the guy a couple of weeks ago at a wedding in Cancún, and here we are, sitting outside on his seventh-floor patio with another couple. I'm wearing shirt-tie-jacket and a work bag, an easy way to introduce myself—hi, I'm Anthony Fenech—I'm a sports writer, I cover the Detroit Tigers baseball team for the <em>Detroit Free Press</em>.</p>

<p>Basically, I fly around the country nine months every year writing about baseball. The job is never-ending, like a machine you can't beat. How, sitting here thinking about it, it's rather ridiculous that I'm writing and tweeting about these millionaires playing baseball. A game.</p>

<p class="has-dateline"><span class="dateline"><em>August 30</em>—</span>The next day comes fast. Clubhouse opens at 9:30 for day games and today is what they call Getaway Day. Justin Verlander is pitching today. Tomorrow is the trade deadline. For the past two months, his name has been circulating in rumors. To the trained eye, his preference is clear: Verlander, thirty-four, a perennial All-Star with Hall of Fame credentials, wants no part of the long rebuild in store for the Tigers next season.</p>

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

<p class="has-dateline"><span class="dateline"><em>August 31</em>—</span>Live from the Denver airport, it's the trade deadline.</p>

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

<p class="has-dateline"><span class="dateline">DETROIT—</span>Per tradition, my mom picks me up from the airport. It gives me time to see her for a bit during the six-month grind of the baseball season.</p>

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
        subtitle: "",
        teaser: "Landing the position of a lifetime.",
        content: `<p class="has-dateline"><span class="dateline">DETROIT, <em>October 21, 2014</em>—</span>Three years earlier.</p>

<p>I'm twenty-seven and working the day shift on the <em>Free Press</em> sports desk. I'm curled in front of a computer with a wad of dipping tobacco and a half-full Styrofoam cup within reach.</p>

<p>Sitting in my cubicle in the sports department—second floor of a beautiful Albert Kahn building in downtown Detroit.</p>

<p>The building feels like home. I first walked in here seven years ago, when the bowling writer, who knew my uncle somehow, got my foot in the door. I was nineteen and came through the Lafayette Street entrance carrying a full binder of clips I wrote for my high school newspaper, with far too many fanboy pictures of my favorite athletes.</p>

<p>My high school journalism teacher insisted we keep these clipbooks, for one day they might get us a job. And damned if she wasn't right: I met with the prep sports editor that day, a regal fellow who was in the market for another body to answer phones and jot down scores a few evenings a week, especially on Friday nights. I was in.</p>

<p>Although I like to think of myself as a sports writer, collecting whatever scrap assignments are sent my way, I should be honest with you: technically, I'm not. Not quite yet. My official title is sports web producer. I work the night shift usually, from 7 <span class="small-caps">P.M.</span>-3 <span class="small-caps">A.M.</span>, almost every weekend.</p>

<p>A few years ago, academically dismissed from college and putting the finishing touches on a summer internship with MLB.com covering the Arizona Diamondbacks, my buddy asked what I was going to do. "I guess get a job at the <em>Free Press</em>," I remarked, way too matter-of-factly. You see, people don't just get jobs here. It is considered a destination paper—a major market where you end up and stay forever.</p>

<p>Back then, August 2011, they didn't have openings. But one day, the longtime sports editor, a short, blond mustachioed man called me up with the next best thing: They could bring me aboard as a sports web intern.</p>

<p>I didn't care—after years of working my way up starting with those prep phone calls, I just wanted to work at the <em>Freep</em> in any capacity. Besides, I had just recently failed out of college. This wasn't the worst fallback plan.</p>

<p>So, I've been putting in long hours as the department dishrag until an actual sports writing spot opens up. When I don't work nights, I often do things like wake up at eight after working all night, and drive to Auburn Hills for Pistons practice—or anything else my mad scientist sports editor has concocted to appease (or abuse) my sports writing ambitions.</p>

<p>The web desk is basically a technologically advanced copy desk. Editing stories, posting stories, writing stories, handling social media, assisting with print, assembling the website and setting it up for the next day.</p>

<p>I bide my time here, working every night, weekend and holiday, sitting between a couple of fogeys whose disdain for the place has definitely started to rub off, and drinking from fresh pots of their extra-leaded coffee. There's a drawerful of empty 5-Hour Energy bottles at my desk. This is all to say: I'm in my late twenties now, this web desk stuff has gotten old—the shift is hell on my body, and I need to write.</p>

<p>The newsroom is as empty as ever. A few years ago, the sports department was moved here—out in the open, occupying two rows of cubes, surrounded by many more empties.</p>

<p>The open desks serve as a sobering reminder of where our business currently stands: Since I got here, the newspaper has shrunk steadily as parent company Gannett bleeds money.</p>

<p>Gannett is no different from any other media company. Every corner of the journalism industry has been affected by cuts and consolidations since the turn of the decade. As the Internet continues to shift the sand beneath legacy media like newspapers, the foundation only becomes shakier.</p>

<p>Gannett has owned the <em>Free Press</em> since 2005, when they bought the 183-year-old newspaper from Knight-Ridder for $262 million. One company was liquidating its media properties, the other expanding its portfolio—the direction has been downhill ever since.</p>

<p>Their business model was simple: buy newspapers, slash costs, extract profits. The company pioneered the efficiency-over-journalism approach that would hollow out local newsrooms nationwide. With advertising revenues collapsed—dropping 63 percent from 2006 to 2016 ($18 billion)—Gannett maintained profit margins by treating journalism like a cost center rather than a public service.</p>

<p>"You're getting out at the right time," is a common refrain, as going-away cakes pile up. "It's only gonna get worse."</p>

<p>Every week, someone else sees the light and jumps off the Titanic, taking the life raft and the better money, hours and work/life balance that come with it.</p>

<p>With those departures goes a generation of institutional knowledge and character—the nightly running conversations, consistent buzz of chatter and colorful jokes have turned to an unnerving whisper.</p>

<p>There's a brick of a big-screen TV with faded color. Plaques acknowledging journalism awards trim the walls and framed front pages hang from standing columns. Worn out teal carpet, a musty dim smell and a tan file cabinet with a bunch of dated white binders. We once had a lovely secretary, solely for sports, who printed out the front cover of each day's section for historical safekeeping. She took a buyout some time ago.</p>

<p>Recently, I stole a few binders for myself. There is some great sports writing on those printouts. The <em>Free Press</em> used to be an absolute talent factory. Somewhere in storage around here, there's paraphernalia celebrating the career of bestselling author Mitch Albom, who is considered the Michael Jordan of sports columnists. You'll hear much more about this Albom fellow, but yeah, we all want to be Mitch when we grow up—and yeah, it annoys me that he started as a sports columnist at my age.</p>

<p>These ancient artifacts of a sports journalism heyday long gone may not see tomorrow. Slowly but surely, the place is clearing out as the <em>Freep</em> newsroom officially relocates down the street sometime in November. We don't need all this space anymore. Word is, there are two floors for us in a fancy, billionaire-owned office building—what we really need is for that billionaire to buy us.</p>

<p>It's easy working on the web desk during the day. There aren't typically live games underway, so the flow of sports writers sending stories isn't as busy as at night. I can also get some quality face time with the boss, who works out of a cubby-hole office across the hall.</p>

<p>I'm in a bit of a daze today when I see something that immediately shocks me into sitting up straight. I quickly swipe the dip from my lip.</p>

<p>It is a tan fedora, a Stetson—so recognizable. I peek my eyes above the computer and follow the path of the hat, straight into the boss' office. The hat is the signature headwear of Seamhead John Lowe, the longtime Tigers' beat writer. It has sounded alarms in my head by appearing unannounced in the newsroom.</p>

<p>By this point, John Lowe has become a trusted mentor and friend. He is one of the kindest, classiest and most professional guys I've ever been around. Seamhead has been covering the Tigers at the <em>Free Press</em> since before I was born—he began his career at 19, stringing home games for the <em>Los Angeles Daily News</em> while in college.</p>

<p>John then went to Philly and covered baseball and hockey for the <em>Philadelphia Inquirer</em> and moved to Detroit in 1986. This, folks, is a Hall of Fame beat writer if there ever was one, a walking baseball history book and the embodiment of a Seamhead—the highest compliment in the business. Why Seamhead? A baseball's leather cover is stitched together by a seam.</p>

<p>I met Lowe back in 2007 when I first got here as a preps score taker. I reached out to him about tagging along at a game, to see what the sports writing scene was all about. Of course, he obliged. At the suggestion of my father, I showed up to the stadium wearing a shirt and tie and soon realized he wears a shirt <em>and</em> tie <em>and</em> jacket <em>and</em> hat for <em>every</em> game.</p>

<p>We hit it off that day and I started soaking up whatever wisdom he was willing to share. Always taking notes, asking questions and picking his brain. Phone calls, Panera Bread meetings, and soon, I'm at the <em>Freep</em>, too—and helping him out regularly at the ballpark.</p>

<p>You will hear much more about Seamhead John Lowe—but for now just know he is a legend, and in the newsroom on an offseason weekday afternoon—which is very unusual.</p>

<p>Now one of the <em>Freep</em>'s top editors joins Seamhead in Gene Myers' office, and I don't need a fly on the wall to know what's being said. I message my buddy, breaking the Big News before anyone leaves the room: "John Lowe is retiring."</p>

<p class="has-dateline"><span class="dateline">DETROIT, <em>October 27</em>—</span>With the chance of a career up for the taking, I go into overdrive.</p>

<p>Although I have the writing chops and second-string experience necessary for an outside chance at succeeding Seamhead—I'm still nowhere near qualified to take over a big boy beat. And this is a big boy beat.</p>

<p>Since I started pursuing a career in sports writing, the <em>Free Press</em> is the only newspaper I've wanted to work for. It's my hometown newspaper in one of the best sports cities in the country—it doesn't get better than this.</p>

<p>As the calendar flipped on the close of the baseball season—with Seamhead's impending retirement plans unbeknownst—I started staying into the newsroom long after last call, until sunlight crept over the Canadian border, compiling a lengthy list of every baseball agent I could find. Hundreds of names—cell phones, office phones, email addresses. I started matching agents with current players, focusing on players with upcoming contract options and those hitting free agency this winter. Hours trying to prove my worth, preparing to pitch editors on adding another sports writing position.</p>

<p>Most of these matches were made on Baseball-Reference.com, the single-most important resource for a beat writer. There is also an agent database on MLBTradeRumors.com.</p>

<p>I know Detroit is looking for a lefty reliever, so I list the candidates. I call their agents and the first guy who calls me back is a guy named Tim Barrata, who says the Tigers have checked in on his client, Craig Breslow. "Don't put that out there." Absolutely not.</p>

<p>The most promising ground I've broken is with Oscar Suarez, a Latino man who represents veteran reliever Joakim Soria. Soria has a $7 million team option on his contract for next season—the team must exercise or decline it within three days following the conclusion of the World Series.</p>

<p>After my first cold call on October 13th, I keep up with Suarez. I call again five days later, and we talk for fifteen minutes. I text on the 21st and call on the 24th, alternating the days until the team's decision on Soria is finally made.</p>

<p>Today, the 27th, connecting with Suarez for yet another check-in. It's seventy-two hours before the deadline. He calls back instead.</p>

<p>Suarez isn't shy and is perhaps even unsmart in saying so many things to someone like me—not even a rookie yet, not even on the beat but foaming at the mouth for the shot. I haven't put in all this work, all these years on the web desk posting other sports writers' words for nothing. The trust Soria's agent shows me provides hope.</p>

<p class="has-dateline"><span class="dateline"><em>October 31</em>—</span>I get a text late this morning from Suarez, who says the Tigers are picking up Soria's option. I seriously consider following <em>Freep</em> protocol and getting my source approved first but remember I need this scoop. So instead, I tweet it out first (11:33 <span class="small-caps">A.M.</span>) then message my source to the web editor on duty.</p>

<p>I decided Soria's agent was trustworthy enough and didn't need clearance—he's In The Room. I couldn't risk him texting a National Guy, who doesn't have to clear sources and could swoop in for the scoop. I was fearful of looking a fool, but equally aware of how sports writing wins are tallied these days: whoever tweets the scoop first.</p>

<p>After the source is quickly cleared, so, too, is my reporting conscience—free of the improperly sourced breaking news floating around with my name on it.</p>

<p>From the sports editor, reply all: "Woo-hoo!!!!"</p>

<p class="has-dateline"><span class="dateline"><em>November 11</em>—</span>Gene Myers pulls me into his office during tonight's web shift and asks if I want the good or bad news first.</p>

<p>I choose bad.</p>

<p>"The bad news is you still have to work on the web desk for a few weeks…"</p>

<p>Dramatic pause.</p>

<p>"The good news is you're our next Tigers beat writer. Congratulations."</p>

<p>He says not to tell anyone, an announcement is coming tomorrow, but I can tell my mom.</p>

<p>Tomorrow, I receive a flood of congratulations from my colleagues. I am finally a sports writer, unchained from the web desk—a <em>Ball Writer</em>, the Tigers' beat writer, can you believe it?</p>

<p class="no-indent">From: Myers, Gene Sent: Wednesday, November 12, 2014 7:45 PM</p>

<p class="no-indent">Subject: ANTHONY WILL TAKE OVER THE TIGERS BEAT</p>

<p class="no-indent"><em>"After more than seven years, in essence, in the </em>Free Press'<em> farm system, Anthony Fenech has earned his big-league call-up. He will assume the reins of the Tigers beat.</em></p>

<p class="no-indent"><em>"This has been Anthony's path to The Show: He started on the Prep Crew and He did stringing work while at Central Michigan. He blogged countless games for Freep.com while interning in Las Vegas, Pittsburgh and Phoenix. He became a </em>Freep<em> intern and officially hired. Since then, he usually has staffed the overnight sports web shift but covered enough baseball to earn his Baseball Writers' Association of America card before the 2013 season. When it arrived, it was one of the happiest days of his life.</em></p>

<p class="no-indent"><em>"John Lowe proudly embraced a phrase for sports writers who devote their careers to baseball: Seamhead. For years, John has schooled Anthony on the ways of the Seamhead, including how, like a ballplayer, to stay strong and focused through a 162-game grind. He even sent this email last year: 'A bit concerned about young Anthony here—might need a better health or eating plan to handle these variant hours. He had a tweet that a home-run call 'interrupted a nap in my car.'"</em></p>

<p class="has-dateline"><span class="dateline"><em>November 12</em>—</span>My first official day as a Ball Writer goes like this: At 4:15 <span class="small-caps">P.M.</span>, I see a tweet from Ken Rosenthal, a FOXSports.com and MLB Network insider.</p>

<p>"Sources: Tigers close to re-signing Víctor Martínez to four-year deal."</p>

<p>Rosenthal is baseball's biggest news breaker. I have no sources and I'm in big shit.</p>

<p>I text the Tigers PR folks (communications VP Ron Colangelo and media relations director Aileen Villarreal): "Can you tell me anything about Víctor? I don't need to use your name."</p>

<p>Only one responds. "No."</p>

<p>Besides PR, I don't yet have the cell number of anyone In The Room.</p>

<p>Dave Dombrowski is the Tigers' GM—the head front office honcho, a longtime baseball executive with a pearl-sparkling smile who carries himself like a politician. Dombrowski, fifty-nine, has been the GM of multiple teams for more than two decades—he is respected, known for winning and saying nothing to the media—or, perhaps more accurately, saying many things that amount to nothing.</p>

<p>Dombrowski is a true professional: He gets back to people of all sizes, no matter how important or insignificant they may be—just ask his colleagues. When he arrived in town in 2002, baseball and business employees alike were encouraged to respond to every single person.</p>

<p>I figure he won't respond to an email about Martínez's reported signing, so instead, I try his right-hand man—longtime assistant GM Al Avila.</p>

<p>"Al, reports swirling that you guys and Víctor are close on a four-year deal. Can you confirm this? And can you keep me in the loop and let me know when it's official? I will not use your name."</p>

<p>Avila—who I have never met and doesn't answer—is as useless as the rest of them.</p>

<p>Dombrowski, Avila, and the rest of team brain trust are in Scottsdale, Ariz. at the annual general managers' meetings.</p>

<p>I am in Detroit, inside the brand spanking new <em>Freep</em> newsroom, which is bland and sterile. Working a web desk shift with my tail between my legs, my ass straight kicked—there are no cubicles here to hide behind. As the minutes turn into hours, the National Guys vulture in, breaking more details about Víctor Martínez re-signing. The deal is for $68 million, one National Guy reports. It includes a no-trade clause, another says—and I can't even muster as much as a confirmation. To pour salt into the wound, the rival paper has it proudly confirmed.</p>

<p>But in Ball Writing, there's always another play. Luckily, I get a chance to redeem myself later that night. Instead? More shame. Past ten, I get a text from PR, notifying me about a trade. I'm late and a loser again.</p>

<p>I message my friend Dylan Hernández, who covers the Dodgers for the <em>Los Angeles Times</em>. I met Hernández one summer in Arizona. I tell him about how I got smoked. He gives me an important introduction to the beat. There are two things I need to know: 1) The phone number of a woman named Rebecca, and 2) Get a Marriott Rewards number.</p>

<p>Soon, I'm calling Rebecca every day, asking for agents' numbers.</p>

<p>She works for the Players' Association and allows for two numbers per day. Simply dial her up, say who you are and which player's agent you're looking for. Agents, you should know, are by far and away the biggest source of information out there. Traditionally, they are the first people who are informed about a roster move involving their client—whether it's an injury, trade, promotion/demotion or signing. Agents are considered a first-hand source, someone In The Room.</p>

<p>But beware: Agents have agendas; they are snaky and have one goal in mind—making money for their clients and themselves. They leak information that may impact negotiations or influence the market in a favorable way.</p>

<p>Agents are their own bosses—they don't answer to anyone for leaking information. Agents enjoy particularly chummy relationships with National Guys—the big-platformed reporting insiders who break news for a living. Guys whose scoops I chase consistently: the Ken Rosenthals, Buster Olneys and Jon Heymans of the world. Agents can just one-stop shop with their favorite National Guy, reaching way more than the local guy with only a fraction of the audience.</p>

<p>This relationship is mutually beneficial and the bane of a beat writer's existence. We work our butts off to build relationships with agents, only to be left sleeping alone most nights.</p>`,
        wordCount: 3800
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
