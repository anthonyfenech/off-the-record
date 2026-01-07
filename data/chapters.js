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
        content: `<p class="has-dateline"><span class="dateline">ST. PAUL'S BAY, Malta—</span>Dawn is coming up over the Mediterranean now. 7:12 <span class="small-caps">A.M.</span> I can hear the whining of early morning buses and smell the saltwater splashing underneath my balcony, out here at the far end of the island—this is the end of the line for buses, beaches and the life I once lived.</p>

<p>From my desk, I can see the hazy light of a new day. A man casts a fishing line from a dock while his dog lies patiently on the pavement. A shopkeeper brooms the steps of a bodega.</p>

<p>After a week-long windstorm, palm trees barely flicker this morning as I watch the past five years float away in calm, rhythmic ripples toward St. Paul's Shipwreck Island—a rock where Paul the Apostle purportedly crashed in 60 AD on the way to Rome, to be tried for sharing publicly the ridiculous thoughts in his mind. Some of them are carved into the walls of a nearby church.</p>

<p class="block-quote"><em>I HAVE FAITH IN GOD THAT IT WILL BE EXACTLY AS I HAVE BEEN TOLD.</em></p>

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

<p class="signature"><em>—Anthony Fenech<br/>April 20, 2025<br/>Portobello Flats, Malta</em></p>`,
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

<p class="block-quote"><strong>From:</strong> Myers, Gene<br/>
<strong>Sent:</strong> Wednesday, November 12, 2014 7:45 <span class="small-caps">P.M.</span><br/>
<strong>Subject:</strong> ANTHONY WILL TAKE OVER THE TIGERS BEAT<br/><br/>
<em>"After more than seven years, in essence, in the </em>Free Press'<em> farm system, Anthony Fenech has earned his big-league call-up. He will assume the reins of the Tigers beat.</em><br/><br/>
<em>"This has been Anthony's path to The Show: He started on the Prep Crew and He did stringing work while at Central Michigan. He blogged countless games for Freep.com while interning in Las Vegas, Pittsburgh and Phoenix. He became a </em>Freep<em> intern and officially hired. Since then, he usually has staffed the overnight sports web shift but covered enough baseball to earn his Baseball Writers' Association of America card before the 2013 season. When it arrived, it was one of the happiest days of his life.</em><br/><br/>
<em>"John Lowe proudly embraced a phrase for sports writers who devote their careers to baseball: Seamhead. For years, John has schooled Anthony on the ways of the Seamhead, including how, like a ballplayer, to stay strong and focused through a 162-game grind. He even sent this email last year: 'A bit concerned about young Anthony here—might need a better health or eating plan to handle these variant hours. He had a tweet that a home-run call 'interrupted a nap in my car.'"</em></p>

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
        subtitle: "",
        teaser: "When everything changed.",
        content: `<p class="has-dateline"><span class="dateline">DETROIT, <em>December 5</em>—</span>Something bad has happened. I have an Internet Stalker. There's this guy who runs a blog with more than 15,000 followers on Twitter, and he's trying to ruin my career.</p>

<p>For reasons unclear, I've become his new whipping boy. I've never met him, never interacted with him, nothing—haven't even blocked him.</p>

<p>He's got a loyal army of followers who are tweeting at me, too. He's emailing me and my sports editor and tweeting at the sports department's Twitter account—this is not good.</p>

<p class="no-indent"><em>"I am contacting you to find out why you chose Anthony Fenech on the Tigers beat? My sources have told me that Mr. Fenech has at least one DUI conviction. I am told there was another incident that I am still trying to dig up.</em></p>

<p class="no-indent"><em>"My sources also tell me that Mr. Fenech doesn't have a college degree. Is that a prerequisite for a beat writers job at your paper? It would seem that Mr. Fenech leap frogged others for this promotion. Please advise why this decision was made."</em></p>

<p>Internet Stalker has written a few articles about me, including one titled <span class="small-caps">ANTHONY FENECH IS A FUCKING MORON</span>. He's digging up Facebook messages from college and posting them, too.</p>

<p>So let me come clean: Months away from my twenty-first birthday, I got a DUI after flipping my PT Cruiser on the freeway. I was drinking on an empty stomach, changed lanes at high speed, and went airborne. My mom picked me up from the hospital.</p>

<p>Almost forgotten until now, when it's currently online. Twelve RTs and counting.</p>

<p>I did more than a few things I now regret when I was younger. I would like to apologize for everything dumb that I did or said back then—this is extremely embarrassing to share publicly but I feel explaining it is necessary to move forward, in case you Google my name and read about it online one day.</p>

<p>So yeah. That's basically what's happened, and I don't know what's going to happen from here, but I think the plan is just to ignore the noise and move on. Don't respond, don't interact—and no phone interviews without clearing it first.</p>

<p>So far, we have. Ignore and move on. Don't read the comments.</p>

<p>A news editor reaches out: "I'm sorry because it has to suck. Hang in there."</p>

<p>I started praying again, which seems to have worked. Still employed, I arrive at the airport for my first road trip—the winter meetings are this week.</p>

<p>At the gate, I cannot stop making inadvertent eye contact with this older gentleman on the same flight—gray hair parted to the side, glasses, looks like Stephen King in a slightly more friendly way.</p>

<p>Has he read Internet Stalker's stuff? I feel like I'm living my own horror story.</p>

<p class="has-dateline"><span class="dateline">SAN DIEGO, <em>December 8</em>—</span>At the winter meetings, hundreds of reporters gather in hotel ballrooms chasing scoops. We're usually cooped up in the media room, with a main stage where press conferences are held, trades announced, and newly inducted Hall of Famers talk about being speechless.</p>

<p>I walk with a purpose, pretending I am a somebody. I stop Ken Rosenthal, as short in person as advertised on Twitter (5-foot-4½), introducing myself. Nice guy.</p>

<p>Each evening, the beat writers are summoned for a media session with the general manager, held in the team's suite. There are five of us, sitting in chairs, while general manager Dave Dombrowski sits at a high-top table on the other side of the room, flanked by assistant Al Avila. Ron Colangelo and Aileen Villarreal (Tigers PR) stand around with on-site executives and scouts.</p>

<p>I'm startled when I see the gray-haired guy from the flight here. We make eye contact again.</p>

<p>After the session, I realize in horror that I didn't turn my recorder on before I placed it on the table—I have no audio. My competitors have pity, sharing their tape so I'm able to write my stories.</p>

<p class="has-dateline"><span class="dateline"><em>December 10</em>—</span>Back at the lobby bar, I re-introduce myself to a tall, tan man with big shoulders who I recognize from the Tigers' suite—Dave Littlefield, formerly the Pittsburgh Pirates GM, was recently hired as a pro scout.</p>

<p>Embarrassingly, I don't remember our conversation from last night. We talk a bit more.</p>

<p>I meet Detroit's young analytics guy, Sam Menzin, and another fellow, Matt Something, who works for San Diego. I make a point of meeting agent Dave Pepe in the flesh, a former adjunct professor at Rutgers who represents veteran closer Joe Nathan. I reached out to Pepe this offseason, had a nice conversation, and I want to pitch an offseason feature story on Nathan, the aging former All-Star who is looking to regain both his fastball and the fans' trust. I suggest I could visit Nathan while training for the season. Pepe buys in.</p>

<p>While it wasn't explicitly stated as such, the story I was pitching to Nathan's agent was a fluff piece. By allowing a certain kind of access, it's almost certain the resulting story will be favorable for the subject. Put another way: Heading into my first year as beat writer of the team, it's pretty much guaranteed I'm going to write a good story about Nathan, who is one of the team's respected veterans.</p>

<p class="has-dateline"><span class="dateline"><em>December 11</em>—</span>My mouth is dry when I wake up.</p>

<p>I get a glass of water and check Twitter. Calamity! My team is close to a trade, reportedly sending a prospect shortstop to the Cincinnati Reds for righty starter Alfredo Simon.</p>

<p>Dave Dombrowski is known for making trades. And by the time I'm nearly finished whipping up a story for the first trade, Dombrowski is reportedly close to making another one—and this one is bigger.</p>

<p>According to Twitter, Detroit is landing star outfielder Yoenis Céspedes from the Boston Red Sox. Helpless, I communicate with the sports desk, Should I re-do the first story or write a whole new story? Soon, an alert for an impending press conference.</p>

<p>My sports editor sends an urgent message. Apparently one of the players Detroit dealt for has a domestic violence charge against him—I need to ask Dombrowski.</p>

<p>This morning has been a total mess. I barely slept after partying too hard at the lobby bar, and my head throbs with dehydration. The presser begins in ten minutes, and I can't risk not being there—I need to ask him that question—so I pass on dress clothes and go down in a white T-shirt and jeans, embarrassingly underdressed.</p>

<p>I call for the mic. I'm a little bit anxious about it—that I might stutter and sound like a scaredy cat—but I ask Dombrowski if the team considered the domestic violence charge.</p>

<p>"We're totally aware of the situations. I can't talk about his legal scenarios, but we're aware of it and comfortable with where it stands at this point."</p>

<p>I don't follow up, but I'm proud of myself. In a white t-shirt and jeans, no less. A New York Ball Writer emails: "Good question to Dombrowski on the legal issues. Keep showing balls like that and you'll do well."</p>

<p>Hurry back up to my room and write a new story. Put a dress shirt over the white tee and a jacket. Feeling quite hungover, I go to the front desk and check out.</p>

<p>I didn't travel lightly and probably look like a newbie. Large garment bag, rolling carry-on luggage and struggling to keep my work bag on my shoulder when I walk through the elastic markers of the valet line.</p>

<p>Standing right in front of me, within an arm's length, is Scott Boras—the biggest agent in baseball, arguably the most powerful person in the sport. Boras reps a lot of Tigers. When he turns around, I extend my hand and say, "I should introduce myself…"</p>

<p>Boras is wearing a black fleece pullover with his company's logo on it. Jeans, shiny black shoes, thinning hair.</p>

<p>Stretching small talk, mustering up the nerve to make a move, Boras' ride pulls up. He's not waiting on cab to the airport. A sleek, black Mercedes convertible rolls into the valet. Newport Beach is only an hour and a half up the coast with light traffic.</p>

<p>The moment is fleeting, but I meet it. I pull out my wallet, suggest we exchange cards, and shake Scott Boras' hand.</p>

<p>"Call my assistant," he says.</p>

<p>He writes her name on the back of the card in blue ink: RACHEL—EXT. 149.</p>

<p class="has-dateline"><span class="dateline">DETROIT, <em>December 21</em>—</span>Haven't smoked in forever when I go to my buddies to watch football tonight. A week after the winter meetings—fifteen-day clean streak. No more.</p>

<p>It's Christmas time and already dark outside when my phone lights up. <em>Unknown</em> is calling. I don't answer <em>Unknown</em>, especially not with Internet Stalker following me around.</p>

<p>A couple minutes later, another call—<em>Unknown</em> again.</p>

<p>Sorry, man—you must have the right number, but I'm not biting.</p>

<p>Then I receive a text message from a 949 number.</p>

<p>"Anthony, this is Scott Boras. Give me a call."</p>

<p>Remember: I'm high as a kite, through the roof, hovering a thousand feet in the air. I pick up the phone and Scott Boras is telling me to call him.</p>

<p>I ask one of my buddies to smack me. I scream each time and call Boras back.</p>

<p>He got my number from Dylan.</p>

<p>"Dylan Hernández," Boras says. "A man of mystery."</p>

<p>Boras is calling to chat about client Max Scherzer, the ace righty starter, who is a free agent after five seasons with the Tigers. He's greasing my wheels, working his angles, essentially providing me with reasons why they should be in on Scherzer, to keep him with the team.</p>

<p>Scherzer, thirty, won the Cy Young Award two years ago and became one of baseball's best pitchers in Detroit, a workhorse who logs 200-plus innings yearly. Still stunned I'm talking to Scott Boras; my early objective becomes clear—keep him on the phone as long as I can.</p>

<p>We talk for 26 minutes. I call Ball Writer Dylan Hernández for translation—Boras wants me to write something about the Tigers pursuing Scherzer, to stir up the market.</p>

<p>A couple days later, I write a column about how they should be aggressive in pursuing Scherzer. I push Boras' agenda under the guise of my opinion. I'm being used. It feels good.</p>

<p class="has-dateline"><span class="dateline"><em>December 19</em>—</span>Still swinging for the fences, trying to find feature stories. A colleague passes along an email address for Justin Verlander's parents. I message them, introducing myself.</p>

<p>"I'm writing to see if you could reach out to Justin and see if he would consider letting me spend some time with him this winter and sit in on a workout or bullpen to write a behind-the-scenes kind of story.</p>

<p>"His story is an important one to this year's team and I'd like to share it with our readers."</p>

<p>Verlander's dad, Richard, responds.</p>

<p>"We're happy to talk with you but any interviews with Justin should go through normal channels with the Tigers. Happy Holidays."</p>

<p>His agent hasn't answered my two introductory voicemails, the email I sent last week, or another call today about it.</p>

<p class="has-dateline"><span class="dateline"><em>December 23</em>—</span>Enjoying my newfound access to Scott Boras perhaps a bit too much, I call him on my drive into the newsroom tonight. I ask when he's going to get me in touch with Tigers owner Mike Ilitch.</p>

<p>"If you're any good at your job, you would have gotten the number by now."</p>

<p>I'm covering the Red Wings game. Ilitch, a multi-billionaire, owns the local National Hockey League team, too—an Original Six franchise. I stop in the newsroom for expenses and stroll a few blocks to Joe Louis Arena for the game.</p>

<p>In the media dining room, I spot longtime Red Wings general manager Ken Holland at a nearby table. Holland has been in charge since 1998—he'd have Ilitch's number.</p>

<p>Determined to prove my worth to Boras, I walk up to Holland and introduce myself. I ask if he can pass along Ilitch's number. Sorry, but no. Worth a shot.</p>

<p class="has-dateline"><span class="dateline"><em>December 31</em>—</span>Today is my Mitch Albom Birthday. I am 27 years, 2 months and 12 days old today—exactly how old Albom was on August 5, 1985, the day he debuted as a sports columnist. We measure our careers in Mitch Time around here: From the moment you walk into the <em>Free Press</em> sports department, you are measured by the cardboard cutout of Mitch in the corner, holding up one finger, <em>Voted #1 sports columnist in the country—again!</em></p>

<p>I am five years behind Mitch Time, but I remain undeterred. When I landed in Detroit after the winter meetings, I ran into University of Michigan football coach Jim Harbaugh at baggage claim and introduced myself as Anthony Fenech, future <em>Free Press</em> columnist.</p>

<p>Which leads to my latest big idea: In an effort to make up some time, what if I wrote a behind-the-scenes book of my rookie year on the beat? I could write about almost getting canceled by an Internet Stalker and getting blasted at the winter meetings and running into Scott Boras in the valet line.</p>

<p class="has-dateline"><span class="dateline">WASHINGTON, <em>January 18, 2015</em>—</span>Working from a standing desk inside Reagan Airport when news breaks of Max Scherzer's impending signing. It's a National Guy with the scoop—Scherzer to the Washington Nationals for seven years and $210 million. In the past couple years, the term "mystery team" has been popularized—national insiders floating out unnamed teams to further a player's market value as a favor to the agent.</p>

<p>So, I chase down the mystery team—despite Dombrowski's insistence all winter, the Tigers were not a serious player to re-sign Scherzer.</p>

<p>I treat this two-alarm fire like a four. I text Dombrowski after I fasten my seatbelt on the plane, asking indirectly if they were the mystery team: "Was the team engaged in talks with Scherzer at the end?" I send a text message and an email: "Doubling up via email because I'm taking off for a flight soon." There is adrenaline. He gets back to me while we taxi the runway—"No"—and I tweet it out while we hit the air.</p>

<p>The extra effort pays off: When I get onto Wi-Fi, I see that Ken Rosenthal retweeted me.</p>

<p>When I land, I pick my car up from short-term parking and I stop at my buddy's house to hang with him and his pops for a bit. We're watching late-nite TV when I get a tip, a direct message on Twitter from a guy who used to work with my mom and apparently knows one of the player's wives, who posted on Facebook that longtime fan-favorite utilityman Don Kelly has signed with the Miami Marlins.</p>

<p>I know Kelly. I have his number. To my scoopin' surprise, he confirms it's true. I ask if I can use his name. Yep, to that, too. This is easy.</p>

<p class="has-dateline"><span class="dateline"><em>January 22</em>—</span>The team's annual winter caravan begins with a media free-for-all—players scattered around tables in the stadium's beer garden. The goal is to talk to as many guys as possible so you can skip the actual bus tour stops.</p>

<p>As a rookie beat writer, I'm trying to get face time with key figures like Justin Verlander, who, I'll admit, was my favorite player growing up. I wore a tan glove in high school because he did. Now, I've gotta flush all that and cover him like an unbiased reporter.</p>

<p>I haven't even started this job in earnest, but already in my young journalism career, I miss being a fan. Enjoying a baseball game. Rooting for players and having a favorite one. I wish I didn't know that some can display real jerk tendencies at times—just wait until you hear about the time I met Miguel Cabrera last year.</p>

<p>Anyways, Verlander. He's a big car guy. Got a garage full of exotics—Aston Martins, Lamborghinis, Porsches, you name it. My car—a 2000 Ford Taurus with nearly 200,000 miles—died a couple days ago.</p>

<p>Breaking the ice, I ask Justin, "Are you pissed off?"</p>

<p>He's in a good mood. The boys are back in town. Baseball around the corner.</p>

<p>"Yeah, of course," he deadpans. "Are you?"</p>

<p>"Kinda. My car died."</p>

<p>What kind of car, he asks.</p>

<p>"A Taurus."</p>

<p>Verlander laughs.</p>

<p>"Dude!"</p>

<p class="has-dateline"><span class="dateline"><em>January 24</em>—</span>The frigid streets around the stadium are full of fans. They've come early, standing in double-file lines waiting for the doors to open. It's TigerFest—a winter extravaganza that promises up close and personal looks, autograph opportunities and plenty of fun.</p>

<p>Today, I can properly receive my due credit for writing that killer feature on Víctor Martínez and his American family last year—I haven't seen Víctor since the story came out.</p>

<p>At TigerFest, an elevator door opens, and Víctor walks out. I say hi but Martínez pays no attention. He chuckles, continuing, and I can't believe this.</p>

<p>"Did you read the story?"</p>

<p>"Yeah," over his back shoulder. "It was shit."</p>`,
        wordCount: 4200
    },

    // 2015 SEASON CHAPTERS (5-9)
    {
        id: 5,
        year: 2015,
        section: 'year',
        title: "ROOKIE YEAR",
        subtitle: "Lakeland, Dunedin, Clearwater",
        teaser: "Learning the ropes on the Tigers beat.",
        content: `<p class="has-dateline"><span class="dateline">LAKELAND, Fla., <em>February 16</em>—</span>Walk downstairs for breakfast and see Tigers chief legal counsel John Westhoff, sipping cereal and reading a newspaper. I smile. He nods knowingly from behind his glasses.</p>

<p>Today is the first day of school—pitchers and catchers reporting day.</p>

<p class="has-dateline"><span class="dateline"><em>February 24</em>—</span>Awakened by news that Joba Chamberlain, a big boy reliever with a bushy beard, has been spotted in TigerTown. This was reported by Ken Rosenthal on Twitter at 6:44 <span class="small-caps">A.M.</span>, while I was fast asleep.</p>

<p>It's been more than three months now and still I have few sources. PR, nothing. Dave Dombrowski, nothing. Today, I'll even bother Jim Leyland, who currently serves Dombrowski as a special assistant, and almost assuredly does not have the information I'm seeking.</p>

<p>"Do you know anything about this Joba signing?"</p>

<p>"No."</p>

<p>During Chamberlain's return, as I offer my recorder into the scrum, I look past the player and lock onto a guy standing near the clubhouse entrance. The guy is talking to a pitcher I can't quite recognize. Backwards hat, baggy-ish clothes and beams like a guy I should know—a guy who might know a thing or two.</p>

<p>I may have seen this guy once or twice earlier in the spring, but now it seems like I'm noticing him here every day. Afterwards, I make it a point to introduce myself and—as my intuition would have it—we vibe like I figured we would.</p>

<p>We exchange numbers. Of course he can get me some, just let him know. Introducing my new favorite friend—we'll call him Gator.</p>

<p class="has-dateline"><span class="dateline"><em>February 25</em>—</span>Big News out of camp: Brad Ausmus is on Twitter.</p>

<p>"Twenty-first century, gotta move on. Can't be stuck in the stone age."</p>

<p>Ausmus, entering his second season as manager, appears very much at ease. Last fall, a year after taking over this expensive roster, they sputtered in the playoffs, swept by Baltimore in the Division Series. Was last season's failure a team problem—or the inexperienced manager?</p>

<p>At forty-five, Ausmus was viewed as a managing wunderkind when Detroit hired him to succeed Jim Leyland after the 2013 season. But unfortunately for him, last year's successes are considered the baseline around TigerTown. Time is ticking. The Tigers have big names with big contracts—Cabrera, Verlander, Price, J.D. and Víctor Martínez.</p>

<p>Team owner Mike Ilitch turned eighty-five last week. His dying wish is for his beloved baseball team to win the World Series.</p>

<p>Ausmus's daily briefings drip with dry wit. Lots of sarcasm and laughter.</p>

<p>"You're not going to have a ghostwriter, are you?" someone asks.</p>

<p>Nope—everything will come straight from the source. He may use the platform to "refute articles written by media members."</p>

<p>We get along fine, Brad and me. Today, these relations—the back-and-forth we're starting to establish—are on full display.</p>

<p>"The message to the team—between you and the team, right?"</p>

<p class="has-dateline"><span class="dateline"><em>February 26</em>—</span>On the back fields, I get a text message from someone at MLB Network, asking if I have time to come on television today. Immediately, I head back to the hotel to change into a shirt, tie and jacket. I've never been on TV like this, and I'm certifiably nervous—so I take swigs of apple-flavored whiskey when I get back.</p>

<p>It is sweltering as I stand on camera—mid-eighties, and my right hand is sweating so much the microphone keeps slipping to the side. The on-site producer must turn it straight twice. I stumble over words badly at least once, but overall, I survive. MLB Network… hey, now!</p>

<p>I go back into the clubhouse—shirt and tie and jacket and still sweating, scrambling to get some last-second quotes for my newspaper day job, but also probably to let 'em know I was just on MLB Network. I apologize to one player for staying late to answer questions—catcher Alex Avila, whose dad, Al, is Detroit's assistant general manager.</p>

<p>Soon enough, back field activities will conclude with a couple days of live batting practice. Future scout friends from opposing teams will start trickling in, starting their season-long coverage from this sea of gravel stones.</p>

<p>In live BP, hitters and pitchers face off for the first time. The customary batting practice cage around home plate remains. Live BP is the last step of a player's thawing out process before the real baseball begins. It is also the most hated, despised universally—but by hitters especially.</p>

<p>Consider: These guys haven't faced a real-life pitcher for five months. They all throw in the mid-nineties these days, and the guys they're facing are teammates. Those guys aren't used to confrontations like this, facing live pitching from inside the cage. With early camp rosters comes a very assorted mix of talent, age and experience, adding an uneasy unpredictability.</p>

<p>But live batting practice is a necessary evil. Pitchers can now throw semi-competitive pitches. Hitters largely use these offerings to re-train their eyes.</p>

<p>There is adrenaline, excitement and pressure to impress the team's decision makers, who are always watching, always evaluating. A few of them, including Dave Dombrowski, look on from the tower.</p>

<p class="has-dateline"><span class="dateline"><em>March 18</em>—</span>Working hard at spring training again, lounging around with the Tiger Beat at a picnic table outside the clubhouse. We're waiting for the manager to arrive for his media session when an unmistakable voice hollers out from above.</p>

<p>"Hey, Frenchy…"</p>

<p>Nobody calls me Frenchy except Leyland. He is standing on the balcony above, leaning over the railing and smoking a cigarette outside of Dombrowski's office. Leyland is wearing shorts, shoes and no socks.</p>

<p>"Hey Frenchy. Looks like it's time for some new undies… whaddaya say, Frenchy?"</p>

<p>Even at seventy, from that faraway view, can't get nothing past the ol' skipper. Leyland can spot the big hole in the back of my boxers, bunched up and visible to the masses as I sit hunched over at the table.</p>

<p>After the session, Leyland comes down to join us before today's workouts begin. Soon, the Most Popular Boy of Perrysburg, Ohio's 1962 senior class is holding court again.</p>

<p class="has-dateline"><span class="dateline"><em>March 20</em>—</span>The Opening Day starter is revealed.</p>

<p>And it surprises not just the writers when Ausmus tabs David Price—not longtime franchise ace Justin Verlander, snapping his seven-year streak of Opening Day starts</p>

<p>Given his stellar 2014 and exemplary clubhouse leadership, Price is a worthy choice. But although Price may have been the better option on paper, Ausmus' decision was wrought with unnecessary overthinking. Verlander made 30 starts last season while hampered by injuries that led to offseason surgery.</p>

<p>Verlander is the team's most tenured superstar—a homegrown talent who has risen to superstardom over the past decade. If Verlander's right arm is attached, he starts Opening Day for Detroit—or so it was thought.</p>

<p>This spring, Price has looked more comfortable in the clubhouse. And so far, the Tigers' two star pitchers seem to be coalescing far better than the previous two.</p>

<p>Max Scherzer and Justin Verlander are different personalities cut from the same alpha dog cloth. When asked earlier in the spring if he had talked to Scherzer after signing a record-setting deal with Washington, he hadn't.</p>

<p>Price and Verlander have gotten on so well, I've tried coaxing them into co-starring for season preview feature story. The idea: Tagging along during a round of golf.</p>

<p>I try Verlander first.</p>

<p>He's non-committal. I chalk up as a win.</p>

<p>Next time, I try them together.</p>

<p>"Golfing is our personal time," Verlander says. "Plus, we don't golf that much, anyways."</p>

<p>They let me down easy.</p>

<p>"We'll think about it."</p>

<p>I hand a business card to both of 'em. The answer will be the same as it's ever been: No.</p>

<p>Onto Plan B I go—a profile piece on Dave Dombrowski.</p>

<p>Detroit enters 2015 as the four-time defending division champions. But even with all that, Dombrowski still finds himself in a peculiar position—he's a lame duck, his contract expires after the year. I am still far too fresh to recognize any of this, years away from realizing how rare of a position I'm in. A GM in his situation needs the media. For once, I have leverage.</p>

<p class="has-dateline"><span class="dateline">DUNEDIN, Fla., <em>March 27</em>—</span>Panic at the ballpark when Justin Verlander leaves the game after the second inning.</p>

<p>Verlander was scheduled to throw four innings in his second-to-last spring outing.</p>

<p>The team announces right triceps discomfort. Expected to make next start. Afterwards, Verlander chalks it up as no biggie. He wonders if it wasn't the coffee he drank before. (It wasn't.)</p>

<p>Verlander won't make his next start—he doesn't pitch again until June.</p>

<p class="has-dateline"><span class="dateline">LAKELAND, Fla., <em>March 28</em>—</span>I arrive to the clubhouse, taking up surveillance. One eye on Verlander's locker at all times.</p>

<p>When he shows up, I give it a second or two—then pounce.</p>

<p>How's he's feeling?</p>

<p>"Can you let me get dressed?"</p>

<p class="has-dateline"><span class="dateline">CLEARWATER, Fla., <em>March 29</em>—</span>Standing in the hallway of the visitors' clubhouse when head trainer Kevin Rand calls me over.</p>

<p>"Can I offer you some advice?"</p>

<p>When a player is coming into the clubhouse, especially if they're dealing with an injury, don't walk up to them right away with questions about it.</p>

<p>Obviously, I knew what Rand was talking about. I just knew a potential injury to Verlander was a big deal, and I didn't want to get beat on it.</p>

<p>"I'm not trying to be mean about it. I'm just looking out for you."</p>

<p>Regardless, all I did was my job. I walked up to the team's star pitcher and asked him how he was feeling after an injury forced him to leave the game yesterday.</p>

<p class="has-dateline"><span class="dateline"><em>April 3</em>—</span>In the chaotic aftermath of the spring finale, with attendants and staffers and players ready for departure—opportunity knocks me over while collecting postgame quotes.</p>

<p>Careening out of the coaches' room, assistant GM Al Avila bowls into me while texting.</p>

<p>I try to use it to my advantage.</p>

<p>"I've been meaning to ask you. Can I get your number?"</p>

<p>"You better not bother me," Avila says.</p>`,
        wordCount: 1900
    },
    {
        id: 6,
        year: 2015,
        section: 'year',
        title: "OPENING DAY",
        subtitle: "Detroit, Pittsburgh, Oakland",
        teaser: "The magic of Opening Day at Comerica Park.",
        content: `<p class="has-dateline"><span class="dateline">DETROIT, <em>April 6</em>—</span>You only cover your first Opening Day one time. Here was mine.</p>

<p>Driving to the ballpark in the fast lane, a car speeds up from behind—black, fancy and fast. I move over and let the guy pass. He takes the same exit as I do but parks in a different garage.</p>

<p>It's Opening Day—a local holiday—and not too bad. Forty-two degrees and cloudy. Dressed dangerously, wearing a navy-blue jacket with a baby blue shirt. Gray slacks and brown wingtips.</p>

<p>Standing in the clubhouse before the game, Justin Verlander walks by. I ask if he was driving a fast black car this morning. He was, indeed. What kind? An Aston Martin. "I think you passed me on the freeway."</p>

<p>"Probably."</p>

<p>He asks what kind of car I drive.</p>

<p>My tongue twists. I say I drive a Ford Focus, which is embarrassing because really, I drive a Ford <em>Fusion</em>—big difference.</p>

<p>Miguel Cabrera sits at his locker in the clubhouse, eyeing me pregame. He looks at Ron Colangelo, points at me, "I like this guy. Look at him, he dresses nice."</p>

<p class="has-dateline"><span class="dateline">PITTSBURGH, <em>April 13</em>—</span>First away series and I'm road tripping with my buddy on the Ohio Turnpike. We're staying at the team hotel. I forgot to book; the traveling secretary bailed me out.</p>

<p>Sports editor says it's fine to stay there, but not at the team rate. He doesn't want the <em>Freep</em> taking favors from the team. He'll let it slide this time but don't do it again.</p>

<p>The first night, we go to dinner at Hyde Park. The Tigers' coaching staff is in the back room having dinner. I feel vaguely like a stalker when they filter out.</p>

<p>Brad Ausmus is first.</p>

<p>"How ya doing, Anthony?" A pat on the back. Buddy is impressed.</p>

<p>We go up to Mt. Washington for a couple of beers, a neighborhood far above the Pittsburgh skyline—so far it takes an incline to get straight up the cliffside. We're still that high when we get back to the team hotel and run into players waiting at the elevator bank. It's awkward as you'd imagine. Let's just say nothing and pretend like it didn't happen.</p>

<p class="has-dateline"><span class="dateline"><em>April 15</em>—</span>At the park early today, where Justin Verlander is throwing a simulated game—he's even simulating the national anthem, standing with his hat over his heart.</p>

<p>Today is also Jackie Robinson Day.</p>

<p>We talk to David Price about the dwindling number of black players in MLB. Price believes we're only here talking to him about it because it's Jackie Robinson Day.</p>

<p>"Won't hear about this again until next year."</p>

<p>He's not wrong.</p>

<p class="scene-break"><span>***</span></p>

<p class="no-indent" style="text-align: center;">EMBARRASSING FLASHBACK</p>

<p class="has-dateline"><span class="dateline">DETROIT, <em>April 5, 2013</em>—</span>Opening Day, my first game as a BBWAA member. After the Tigers beat the Yankees, I head to the visitor's clubhouse—the quiet, losing side.</p>

<p>The New York media surrounds lefty reliever Boone Logan. Poking a tape recorder into a pack of reporters, the Taylor Swift Pandora on my phone goes off.</p>

<p>It's the pop-guitar riff from her latest hit song "I thought you were trouble."</p>

<p><em>Once upon a time</em>…</p>

<p>Clawing furiously at my pocket, trying to pull my phone out, to silence it. To stop this nightmare.</p>

<p><em>A few mistakes ago…</em></p>

<p>Pressing power, squeezing the phone, turning red as a light.</p>

<p>Afterwards, veteran outfielder Vernon Wells lets me know.</p>

<p>"My 9-year-old daughter listens to that, man."</p>

<p>Players laugh. Reporters, too. It's my first game as a BBWAA member—I don't know how I'll recover from this.</p>

<p class="scene-break"><span>***</span></p>

<p class="has-dateline"><span class="dateline">DETROIT, <em>April 22, 2015</em>—</span>Two weeks later, Joe Nathan is injured again.</p>

<p>Pitching an injury rehab outing at Triple-A tonight, Nathan throws only ten pitches before exiting the game. The team holds off on providing an update until tomorrow—never a good sign.</p>

<p>Ever the rookie, I ask another stupid question.</p>

<p>"Can I text him asking, 'What happened?' or is that like, insensitive to the situation?"</p>

<p>Marly Rivera explains: "No, the opposite—text him and ask him how he is feeling. It's not insensitive—you ask like you do care. Be open about it, something like, 'Heard you had to leave your rehab start'—then ask him how he feels."</p>

<p>Nathan doesn't respond.</p>

<p class="has-dateline"><span class="dateline"><em>April 23</em>—</span>Bad news arrives the next day.</p>

<p>Nathan's season is over—he's set to undergo elbow ligament reconstruction (Tommy John surgery) Speaking red-eyed in front of reporters, Nathan describes the elbow "pop" he felt on his final pitch last night and defiantly declares he'll be back.</p>

<p>"This won't be easy. It's gonna be a long road. I've always enjoyed the work…"</p>

<p>His voice cracks. At forty, Nathan has 377 career saves, eighth-most all-time.</p>

<p>"I will rehab and do everything I'm supposed to as if I'm coming back to be a major league pitcher. That is my goal—to come back and pitch again."</p>

<p>Back in the press box, I receive a call from Scott Boras. I step outside to call back. He wants to talk about Rafael Soriano, an unsigned righty relief client of his. Boras is calling by way of Nathan's injury, with a scoop: Detroit has interest in Soriano.</p>

<p>I phone my sports editor for next steps. Get something from the team—in case Boras is using me again.</p>

<p>I try a couple of sources— "I heard you guys are talking with Soriano, is that true?"</p>

<p>Director of baseball operations Mike Smith puts a stop to further inquiries: "I'm never going to be able to confirm or deny rumors like this for you, sorry."</p>

<p>The other source—assistant general manager Al Avila—still hasn't responded.</p>

<p>Back in the press box, I write three stories: A game story, a sidebar on Nathan's injury and an opinion piece about why it would be wise to pursue Soriano—a favor for Scott Boras.</p>

<p class="has-dateline"><span class="dateline">OAKLAND, Calif., <em>May 27</em>—</span>The best part about Gator's friendship isn't the breaking news tips, but his bead on the clubhouse.</p>

<p>About one player. "He's soft. Got a Charley Horse on his thigh and he's been out for a week. A lot of guys have been upset with him."</p>

<p>Gator might not have In The Room information, but he's got guys on the inside. He says the Tigers might go with a spot starter. Probable pitcher Kyle Ryan remains in transit.</p>

<p>Gator again. "I heard Ryan just showed up."</p>

<p>He's standing at his locker when the clubhouse opens.</p>

<p>After the game, I meet visiting New York writers for a drink, including Seamhead George King of the <em>New York Post</em>. King is in his 26th year—it's his 14th season covering the Yankees for the <em>Post</em>. John Lowe regales stories of King on the beat.</p>

<p>"One year, the Yankees played in the Boston Marathon game (traditionally played at 11 <span class="small-caps">A.M.</span>) on Patriots' Day Monday. But, of course, ESPN wants <em>Sunday Night Baseball</em> the night before. So, it's Red Sox-Yankees at 8 <span class="small-caps">P.M.</span> on Sunday night, so that means the Yankees clubhouse opens at 7:30 Monday morning. And Joe Torre got there at 7:25 and George is standing there at the clubhouse, waiting for it to open at 7:30, and Torre says, 'What are you doing here this early?' And George says, 'My job is to be here when that door opens.'"</p>

<p>He spends at least three hours on the phone every day. Not texting or Twittering or Facebooking. No, George King is actually <em>on the phone</em>, talking to people.</p>

<p>Ball Writing rules to live by.</p>`,
        wordCount: 1400
    },
    {
        id: 7,
        year: 2015,
        section: 'year',
        title: "MIDSEASON",
        subtitle: "Detroit, Seattle, Minneapolis",
        teaser: "The dog days of summer baseball.",
        content: `<p class="has-dateline"><span class="dateline">DETROIT, <em>July 2</em>—</span>Halfway through my rookie year, my best source isn't in the front office, the clubhouse, the press box or affiliated with the team at all. I have yet to figure out what Gator does for a living or why he hangs out with baseball players—but I don't particularly care.</p>

<p>He's at his friend's place drinking beers today, asking about the vibe in the clubhouse. His friend, an injured player, is wondering.</p>

<p>Gator is my best source. With the team at .500 (39-39) and slipping in the standings, roster moves are afoot. Ausmus gives reporters a hint—a reliever is coming up.</p>

<p>My source network is finally paying off. Even if I don't have anybody who can tell me things, I have enough folks who hear 'em.</p>

<p>Last month, I started squeezing information out of Ángel Nesbitt, a young Venezuelan reliever. After making the team with a terrific spring, Nesbitt's early struggles earned him a ticket to Triple-A.</p>

<p>I kept in touch, and soon, he was tipping me off with roster moves.</p>

<p>Gator and I work as a tag team: I text one guy and Gator texts his guys.</p>

<p>Neither of my two tries—assistant general manager, farm director—get back to me. It is just after 2 <span class="small-caps">P.M.</span> on an off day. Soon, the Comerica Park clubhouse will open to the media, and the remaining roster moves in question officially announced.</p>

<p>Waiting to hear back, I am beaten by a blogger. The news blindsides Gator, triggering a flurry of texts: Reliever Joba Chamberlain, a big part of the clubhouse, is being sent out.</p>

<p>Gator is on Line 1. A different player just called, and yep, Joba Chamberlain is gone. Tom Gorzelanny, too.</p>

<p>It was a better day for the beat writer. I got four-of-six roster moves. But my scoops amount to second-hand rumors—if I don't find some real sources, I'm bound to get burned.</p>

<p class="has-dateline"><span class="dateline">SEATTLE, <em>July 8</em>—</span>I sit in the dugout today with J.D. Martinez for a feature story to chronicle his breakout year. I explain my angle—I want to highlight the work his personal hitting coach has done with him, but I want to keep the coach anonymous. I'll call him the Mysterious Hitting Guru.</p>

<p>J.D. says he doesn't want to say anything about him until he gets paid and doesn't want to rub his hitting coaches the wrong way by potentially giving someone else credit for his success.</p>

<p>He didn't explicitly say do not talk to this guy.</p>

<p>I am equal parts inexperienced and undeterred. Before taking off in Seattle, I ask one of Boras' guys about the Mysterious Hitting Guru.</p>

<p>"Ask Scott… see if he's got any ideas."</p>

<p>By the time I land in Minneapolis, the search is over.</p>

<p>"Scott said try Craig Wallenbrock."</p>

<p class="has-dateline"><span class="dateline">MINNEAPOLIS, <em>July 9</em>—</span>I got through to Wallenbrock and gave him the spiel. Feature story on J.D. l'll conceal your identity—the Mysterious Hitting Guru.</p>

<p>He gives no promises, but says he'll talk to Martinez. Up to him. I was actually feeling pretty good about it until I got to the stadium and was summoned for a chat with Tigers PR.</p>

<p>Now I've got a disgruntled subject, and the story is up in the air.</p>

<p>"J.D. doesn't want to talk to you," media relations manager Aileen Villarreal said. "He told you not to talk to that guy."</p>

<p>I try to clarify, but it doesn't get far—Martinez didn't say <em>not</em> to talk to Wallenbrock, he said he didn't <em>want</em> me to talk to him. We're soon arguing semantics. Yes, I understand. But I'm a journalist: talking to people who others don't want us talking to is part of the job.</p>

<p>Martinez sits down to finish the interview but doesn't change his tune.</p>

<p>"I still think it's bullshit."</p>

<p>We agree to disagree.</p>

<p class="has-dateline"><span class="dateline"><em>July 10</em>—</span>Tigers lead Twins, 6-1. Bottom of the ninth.</p>

<p>Forty-eight hours until the All-Star break and the Tigers still don't know who they are. A winning team? Contender? Third place? They have struggled to stay above .500 all season. Flaws are obvious—unathletic roster, one-dimensional offense, subpar defense—but the team's biggest hole remains in the bullpen.</p>

<p>As the Royals showed last year, riding a three-headed monster of late-inning relievers within a win of the World Series, baseball has begun prioritizing bullpen usage. For whatever reason, the Tigers have not.</p>

<p>Tonight, they're up five runs with three outs to go.</p>

<p>By the time they get the first, activity in the press box: Writers clawing at keyboards. Two men on. A hit. Pitching change. Walk. Another hit. Typetypetypetype</p>

<p>What seemed excessive mere minutes ago—rewriting the lede, reworking the game story, reading bottom-to-top for stray mentions of the wrong score—is now necessary.</p>

<p>At the start of the inning, our stories were resting comfortably, ready to be sent immediately after the final pitch—and at least one poor soul has already filed.</p>

<p>Now, as the final pitch is hit into the left field seats, the stories we're scrambling to rewrite are very different. Somehow, the Tigers lose.</p>

<p>Back in the press box, the TV is on mute. Apparently, Pedro Martinez has the scoop.</p>

<p>Martinez says on TBS that Detroit is signing veteran reliever Neftali Feliz. We hear about the report on Twitter.</p>

<p>One colleague has had enough: "Fuck this job."</p>

<p>I leave the press box past eleven. As if the drama and the game and the postgame signing wasn't enough fun, I still have the feature story I haven't started.</p>

<p>I meet up with scouts at the bar instead. A drink turns into three and I end up doing it the old-fashioned way, staying up all bloody night on coffee and tobacco.</p>

<p>The sun comes up. Day game today.</p>

<p class="has-dateline"><span class="dateline"><em>July 11</em>—</span>In the first inning, straight out of the You Couldn't Make This Up If You Tried files, disaster is coming.</p>

<p>J.D. Martinez just fouled off a pitch.</p>

<p>It is fast approaching, upwards of eighty-five mph, spinning like a programmed missile. It is a sneak attack, a foul ball I never see coming, not until it—<em>SMACK!</em>—makes a direct hit, causing a first-row explosion of Mountain Dew and popcorn.</p>

<p>The crowd gasps. Pop everywhere, popcorn all over the carpet. My computer is a casualty, screen spider-webbed, currently sitting in a box of rice—the laptop that might've saved my life.</p>

<p>On the FOX Sports 1 broadcast, the analyst provides play-by-play.</p>

<p>"If you're wondering what the crowd was reacting to—that ball went into the press box, and I believe it was Anthony Fenech from the <em>Free Press</em> on the Tigers beat who had the bad end of that ball.</p>

<p>"I don't know if he caught it or not. I don't know if it knocked him down. He isn't in his seat anymore—he has since left the third row. So, I guess we'll find out soon enough."</p>

<p>Dave Dombrowski passes me in the hallway.</p>

<p>"I heard J.D. was upset with you."</p>

<p>I try and fail at lobbying Martinez to buy me a new laptop.</p>

<p>"That's what you get, bro."</p>

<p class="has-dateline"><span class="dateline">DETROIT, <em>July 17</em>—</span>Back from the All-Star break, I get an email from a guy with the Christopher "Mad Dog" Russo radio show, asking for availability to talk Tigers.</p>

<p>Soon, I'll be on SiriusXM Channel 144 with the Mad Dog—one of the most notorious loudmouths on the national sports talk scene. Russo worked for New York's WFAN for nearly twenty years before making the full-time jump to baseball, where he currently hosts a daily show, <em>High Heat</em>, on MLB Network.</p>

<p>But as the interview wears on, things get weird.</p>

<p>"I'm also reading that you got drunk and ran your car into another, into a PT Cruiser, is that correct, and flipped it over. I mean, how do you flip—Anthony, how do you flip a PT Cruiser? Is that true?"</p>

<p>My jaw drops. I am on satellite radio with Mad Dog, and he just hit me with that?</p>

<p>Hanging up, I realize I've been hood-winked. It won't take long for Internet Stalker's sports media terrorist group to claim responsibility. Apparently, I was speaking with someone named Sour Shoes from the Howard Stern Show. The prank call is on the Internet now.</p>

<p class="has-dateline"><span class="dateline"><em>July 19</em>—</span>Redemption is mine. A week after I got punk'd by Internet Stalker, I get an email from an ESPN producer, inviting me onto <em>SportsCenter</em> today.</p>

<p>No, it's not another prank—that's what I thought at first, too. Email address checked out; I found the producer on LinkedIn.</p>

<p>At a studio downtown, I sit in front of a color canvas of the Detroit skyline. I have the producer snap a picture so I can show my grandkids one day. <em>SportsCenter</em>!</p>`,
        wordCount: 1650
    },
    {
        id: 8,
        year: 2015,
        section: 'year',
        title: "TRADE DEADLINE",
        subtitle: "St. Petersburg, Baltimore, Houston, Chicago, Kansas City",
        teaser: "When rosters get shuffled and careers change.",
        content: `<p class="has-dateline"><span class="dateline">ST. PETERSBURG, Fla., <em>July 27</em>—</span>It's raining when we land. I get a taxi and check into my room at a Hampton Inn, way too far from Tropicana Field.</p>

<p>Only positive of the place is they've got a shuttle to downtown St. Pete, where the dome is located. While waiting for the van, I scroll past a ruckus on Twitter—Tigers outfielder Rajai Davis has followed a bunch of St. Louis Cardinals accounts.</p>

<p>Someone notices. Fans pay attention to which accounts players follow on social media. Davis' activity raises a red flag and gains traction on social media. Soon, a blog is posted, connecting the dots—is Davis involved in a trade?</p>

<p>I treat this Internet Rumor like any dogged reporter would. I chase it down, emailing the Cardinals GM: "There is some buzz about Rajai Davis—he apparently followed a few Cardinals-related accounts. If there is anything to this, let me know."</p>

<p>When the clubhouse opens today, reporters quickly approach Davis' locker. With his back turned, Davis can't keep it together—he starts laughing and so do teammates nearby. They were pulling a prank on us—it's trade deadline season in the social media age; players oftentimes follow official accounts and new teammates when traded.</p>

<p>Well, they got me bad. I never followed up with Mozeliak after that—even though others were fooled, I knew my fate with St. Louis' head honcho was sealed as the guy who fell for the Rajai Davis Internet Rumor.</p>

<p>The Tigers enter the series on the outskirts of the pennant race. They lose the first two games—the bullpen taking the loss both times. Heading into the series, I had written they should "buy" at the trade deadline. After last night's walk-off loss, I wrote that they should "sell." Now, I'm getting torched online—they're calling me Flip-Floppin' Fen.</p>

<p class="has-dateline"><span class="dateline"><em>July 29</em>—</span>They avoid the sweep with a win on Getaway Day. In the clubhouse afterwards—two days until the trade deadline—the players try to put a positive spin on things. Verlander hopes his performance (eight innings, one run, 10 strikeouts) helps the front office believe there's a chance. I linger after the scrum and comment on his suede jacket, trying to get on his good side.</p>

<p>"Nice jacket."</p>

<p>"Thanks."</p>

<p>Leaving the clubhouse, we walk past Dave Dombrowski—a front office assistant at his side.</p>

<p>The veteran of the crew, Lynn Henning of the <em>Detroit News</em> stops Dombrowski to ask if he has a reaction to tonight's Twitter report, which says the Tigers are selling.</p>

<p>"I don't, no."</p>

<p>Waiting for the press elevator to arrive, Aileen tells the writers to come back.</p>

<p>"Dave is going to talk."</p>

<p>Dombrowski now has something to say: "We are going to be prepared to listen to offers on our players." The report is true—they're sellers.</p>

<p>This is now a four-alarm fire, a scramble.</p>

<p>I start by rushing up to the press box and tweeting out Dombrowski's quotes. Then I have to write up a story about that and rewrite the game story—and I gotta do it by 5 <span class="small-caps">P.M.</span> at the latest because I have a 7:20 flight to Baltimore.</p>

<p class="has-dateline"><span class="dateline">BALTIMORE, <em>July 30</em>—</span>News breaks that the Tigers' fire sale has begun: They are trading David Price to the Toronto Blue Jays, according to a National Guy. It takes me a bit—and my Internet Haters are taunting me online because of it—but I finally get it confirmed with a Toronto source (pro scout). It was an hour late, but any kind of confirmation feels like a win.</p>

<p>PR tells the writers to meet in the ballroom of the downtown Baltimore hotel they're staying in—Dave Dombrowski is going to talk at 3 <span class="small-caps">P.M.</span></p>

<p>In exchange for Price, who will hit free agency this offseason, they received a package of three pitching prospects. Two lefty starters, Matthew Boyd and Daniel Norris, are currently pitching at Triple-A.</p>

<p>"It makes a big difference if you can get players who are close to the big leagues and ready to contribute. We're rebooting, not rebuilding, so you can go into next year and identify on the free agent and trade market what you want to pursue to still be really good."</p>

<p>I ask Dombrowski if, after years of buying at the trade deadline, it's "fun" to sell for a change.</p>

<p>"I wouldn't use the word 'fun.' It's a situation where you never want to be in a spot where you're doing what we're doing. I would much rather be acquiring than I would be trading. But it's just where we are at this point."</p>

<p>Across the harbor at the ballpark, David Price is packing up his stuff. For the second straight year, he's been dealt at the trade deadline. Price, twenty-nine, has posted stellar numbers once again this season (9-4, 2.53 ERA). After Tampa Bay traded him, this time isn't nearly as tough.</p>

<p>"I think everybody kind of envisions themselves playing for one team their entire career. That's not the way it happens."</p>

<p>Asked to sum up his time in Detroit, he says, "It was fun. The city took me in very well."</p>

<p>Before Price makes his exit, I approach him to say good luck. In just half a season, our professional relationship had ups and downs. It finishes with a handshake and healthy respect.</p>

<p>He throws on a backpack, hops on a bicycle and heads to Toronto.</p>

<p class="has-dateline"><span class="dateline"><em>July 31</em>—</span>It's the trade deadline. Detroit still has two veteran players they'd like to move: outfielder Yoenis Céspedes and closer Joakim Soria, both of whom are hitting free agency.</p>

<p>It's a night game. Clubhouse opens at 3:05 <span class="small-caps">P.M.</span>, and it's obscenely hot when it does. There are no windows in the press box.</p>

<p>Inside the visitor's clubhouse at Oriole Park, there is an MLB emblem on the wall to the right, signed by a collection of the greatest players who have come through here, names like Brooks Robinson, Cal Ripken, Jr. and Baltimore native Al Kaline, Mr. Tiger. The signed emblem is the most valuable artifact in any big-league clubhouse.</p>

<p>When the clubhouse opens, the trade deadline clock ticks down to 4. Rumors swirl. Ball Writers must know their way around the clubhouse, and I know my way around this one: They have been posting the lineup card outside the locker room, in the tunnel heading to the dugout.</p>

<p>Knowing my target and sensing nobody else does, I disappear into the tunnel and find the lineup card.</p>

<p>Céspedes is currently on it, playing left field and hitting fifth. I tweet out the news, walk back into the clubhouse and watch as the others look in vain for the card.</p>

<p>But the lineup is subject to change. Back in the clubhouse, there's breaking news on Twitter: The New York Mets are close to acquiring Céspedes from the Tigers. I have but one In The Room source I've made progress with—and I put the pressure on. With the deal already reported on Twitter, I try for a small piece of the pie.</p>

<p>The Tigers' return for the star has yet to be reported and fans are wondering if young righty Zack Wheeler, currently rehabbing from elbow surgery, is involved.</p>

<p>"Is Wheeler in the deal?"</p>

<p>I pester. "Come on, give me something."</p>

<p>"No."</p>

<p>I tweet out the tidbit. It's all the news I'll break at the deadline, but at least it's something.</p>

<p>Dealin' Dave Dombrowski isn't done, though. By the time the writers are ushered out of the clubhouse, he's reportedly striking another deal, this time sending closer Joakim Soria to Pittsburgh.</p>

<p class="has-dateline"><span class="dateline">WASHINGTON, <em>August 3</em>—</span>I take the train from Baltimore after today's series finale to see my little brother in D.C. for the day, having written a column saying Dombrowski should receive a contract extension. It expires at year's end. My argument is twofold: you can't find a better general manager than Dombrowski, and he's already made trades with an eye for the future.</p>

<p class="has-dateline"><span class="dateline">DETROIT, <em>August 4</em>—</span>I see a newsstand in the airport, today's <em>Free Press</em> and the banner on Page 1A. <span class="small-caps">JOB 1: EXTEND DOMBROWSKI</span>. Underneath: <span class="small-caps">KEEPING TIGERS GM IS CRUCIAL TO REBOOTING, REJUVENATING THE TEAM—ANTHONY FENECH, 1B</span></p>

<p>Already dressed for work, I go straight to the stadium. The press box is empty—everyone's downstairs, waiting for the clubhouse to open in a few minutes.</p>

<p>When I grab my notebook and recorder, out of the corner of my eye, I notice that Dombrowski is on the field, calling for his son. Landon, fourteen, is running in from center field, where he's been playing with Little Víctor Martínez and trainer Kevin Rand's sons.</p>

<p>After a newsworthy road trip, the local media is well-represented—Ball Writers, columnists, sports radio reporters, cameras and anchors for each of Detroit's TV stations are waiting outside the clubhouse.</p>

<p>I don't wait with them—I head for the tunnel behind home plate, a quiet place for my radio interview. On the phone, I spot Gene Mato, Aníbal Sánchez's agent, sitting front-row down the third-base line. Sánchez is talking to Royals catcher Salvador Perez in the outfield nearby. After the radio hit, I say hello.</p>

<p>"I'm surprised Dombrowski did it. I didn't think he would sell. The team seems on edge."</p>

<p>I'm late for clubhouse: "Gotta get in there. I'll be in touch."</p>

<p>It's 3:34 <span class="small-caps">P.M.</span> The clubhouse must be open by now, so I take the back way. Through the dugout, up the stairs and past a player. I open the double doors, see a lineup card taped on the back, and that's when I hear PR.</p>

<p>"Anthony, no!" It's Aileen Villarreal from down the hall. "The clubhouse is closed."</p>

<p>I'm confused.</p>

<p>"So, when is Brad talking?"</p>

<p>"We'll let you know."</p>

<p>Outside clubhouse walls, reporters are restless. I share my inside view: "I was just in there. They were freaking out, telling me to get out, that the clubhouse was closed."</p>

<p>Bernie Smilovitz pulls me aside. The longtime Channel 4 sports anchor thought my column today was spot on. In fact, he talked with Dave Dombrowski at a charity event last night.</p>

<p>"I wanted to ask him about his contract. I said, 'Hey, what's going on with your stuff?' He was dodgy about it. He said, 'Everything will work out, all right?' I've known Dave for years. I haven't seen him like that. He just seemed off."</p>

<p>I reach out to my two sources, again and again.</p>

<p>"The clubhouse is still closed. Seems like something is up."</p>

<p>Not until Landon Dombrowski walks out of the clubhouse do we know what. Landon is in tears, consoled by his father, Dave, who has been fired after fifteen years as general manager of the Tigers.</p>

<p>The press release hits everyone's phones.</p>

<p>Dave Dombrowski is gone. Al Avila promoted to GM. Press conference soon.</p>

<p>Avila has worked under Dombrowski since joining Detroit. He's been next-in-line, the highest-paid assistant GM, and up for other GM jobs. Now, Avila finally has the keys. He received the good news at a car dealership, while returning a lease.</p>

<p>The news isn't as good for me. Avila has answered exactly none of seven messages since we exchanged numbers in spring training. What else would you expect from a guy who has worked under Dave Dombrowski for the past quarter-century.</p>

<p>Along with Avila's appointment, the Tigers make more promotions: scouting director David Chadd becomes assistant GM, Dave Littlefield is director of player development, and Sam Menzin is director of baseball operations.</p>

<p>We're standing in line together, shoulder-to-shoulder for the last pork chops in the pan.</p>

<p>I congratulate him on the new job.</p>

<p>"Now that you're promoted, here's my card."</p>

<p>Before I can pull it out, Sam says no, recoiling at the business card in fear.</p>

<p>"I can't take that. I don't speak to the media."</p>

<p>Mhmmm. That's what they all say.</p>

<p>After skirting questions about his contract in the presser, Avila's terms have leaked. Five-year deal, according to the Tiger Beat competitor two seats down.</p>

<p>I have nothing. Not even Gator can save me. With the desk getting anxious and nobody else to count on, I pray the eighth time is the charm with Avila."</p>

<p>"It's being reported that your deal is five years after this one, is that true?"</p>

<p>"Yes."</p>

<p>"Thanks. Just wanted to say congrats. So, congrats."</p>

<p>"I appreciate it. I am sure we will work well together."</p>

<p class="has-dateline"><span class="dateline">ROUND ROCK, Texas, <em>August 13</em>—</span>I fly to Texas a day before the Tigers, taking a pit stop in suburban Austin to spend the afternoon at Seamhead's retirement digs. The place is very John Lowe—many bookshelves, minimal decor—down to the Wi-Fi password: 18741874, signifying Sir Winston Churchill's birth year.</p>

<p>Seamhead is a Churchill enthusiast. He introduced me to him years ago.</p>

<p>There are two bookcases and a small flatscreen. On the TV, a recent documentary on Buck Showalter's baseball life is paused.</p>

<p>We watch portions of that show, and John shares his favorite Showalter stories. He still talks to baseball's most-tenured managers, both active and retired—Francona, Gardenhire, Leyland, even Showalter. Such conversations should be preserved for Cooperstown one day.</p>

<p>Grabbing lunch at the world-renowned Salt Lick BBQ, he gives this piece of advice while I wolf down mac and cheese: He suggests I place a call to Dave Dombrowski.</p>

<p>John notes Dombrowski's stature in baseball. But his suggestion is not only because of who Dombrowski is—he explains that it stands for any source, be it general manager, area scout or clubhouse guy. It's an opportunity to further your working relationship with a personal touch—after years of calling this person for information, now you are reaching out in non-transactional fashion.</p>

<p>Hitting the road to Houston, I heed Seamhead's advice and call Dave. Just calling to check in. See how you're doing. We chit-chat for five minutes, rekindling our relationship.</p>

<p>"Thanks for the call, Anthony."</p>

<p>"I'll keep in touch, Dave."</p>

<p class="has-dateline"><span class="dateline">HOUSTON, <em>August 15</em>—</span>It's my first free continental breakfast as a Hilton Honors Gold Member, an achievement I've been chasing since the spring. I pick up a copy of the <em>Houston Chronicle</em>, but the sports section is missing.</p>

<p>At the park, I introduce myself to Matt Boyd, one of the pitchers received in return for David Price, and I pick marijuana as common ground. Boyd hails from Seattle, where weed is legal. I break the ice talking about my favorite place—Uncle Ike's Pot Shop.</p>

<p>Boyd doesn't give much of a reaction, but later he tells Tigers PR.</p>

<p>I don't find this out until the offseason, when I met with my assistant sports editor, after he met for an annual coffee with communications VP Ron Colangelo and media relations director Aileen Villarreal.</p>

<p>Apparently, it made Boyd uncomfortable.</p>

<p>In retrospect, it was an unnecessary icebreaker. But I am who I am, and Matthew Boyd is who he is—someone I'll come to learn has never smoked weed in his life.</p>

<p class="has-dateline"><span class="dateline">CHICAGO, <em>August 18</em>—</span>First time at historic Wrigley Field, which opened in 1914 and presents horrible working conditions for Ball Writers.</p>

<p>The second-oldest stadium in baseball has no air-conditioning in the press box, which is the smallest in baseball. The closet-sized restroom has one urinal and one stall. There is one elevator, way out in left field. At Wrigley, we fight crowds walking down from the press box to the clubhouses. Everything is small and congested. It's a beloved stadium with ivy on the outfield walls, but it's a nightmare for the working press.</p>

<p>In the opener of a two-game set against the Chicago Cubs, the wind blows out to left field, toward Lake Michigan. There have been twice as many home runs (4) as innings played (2) when Big News drops from Boston. Dave Dombrowski has a new job.</p>

<p>A couple innings later, I scurry out of the press box—Dombrowski is calling. I scribble quotes from the Red Sox president on the back of a print-out scorecard.</p>

<p class="has-dateline"><span class="dateline">KANSAS CITY, Mo., <em>September 1</em>—</span>Let me formally introduce my competitors on the Tiger Beat. There's Rival Cohort Chris McCosky from the <em>Detroit News</em>, Jason Beck from MLB.com, James Schmehl from MLive.com and most recently, Katie Strang from ESPN.com.</p>

<p>I was told to watch out for Rival Cohort, but we've held up without animosity so far. Beck, in his twelfth year covering the team, is a soft speaker who is very punctual. I get along particularly well with Schmehl, who is closest in age.</p>

<p>Strang joined us last month, moving from the National Hockey League beat to baseball while ESPN goes through a hyperlocal journalism phase, trying to build sites for every major sports market. She comes to the party with 75,000 Twitter followers. I only have 7,329.</p>

<p>We went out for beers downtown last night. Strang isn't moving from hockey to baseball by choice, so she might not be here long. But she's good at her job, and I'm not thrilled with that, to be honest.</p>

<p class="has-dateline"><span class="dateline"><em>September 2</em>—</span>I am starting to build a relationship with Royals players.</p>

<p>Early in the year, I bugged Martínez to introduce me to catcher Salvador Perez—one of my favorite players, despite being forbidden as a Ball Writer to have favorite players or teams. One day, I saw them on the field talking, hovering closer and closer until Víctor had to introduce me. I check-in with Salvy each series now—he's also the captain of my fantasy baseball team.</p>

<p>I've talked to Eric Hosmer a couple times, Mike Moustakas and now, veteran outfielder Johnny Gomes. After talking with Salvy, I re-introduce myself to Gomes.</p>

<p>"I got a story for you…"</p>

<p>Back in 2013, I was sent to help cover Game 5 of the American League Championship Series. I loitered in the empty Boston dugout with Gomes and teammate Shane Víctorino when Gomes put a fat wad of chew into his cheek. He looked at me, holding the pouch: "You want one?"</p>

<p>By now, you know I'm not one to say no. So, I grabbed a pinch, stuffed it in my cheek and started slowly chewing it into place. As I did this, a mega-sized postseason media throng gathered in the dugout for interviews.</p>

<p>I felt the tobacco spread, quickly pooling on the floor of my mouth, leaking down my throat—and I felt a buzz. I remember I saw them walking out of the tunnel as the buzz intensified. There was way too much juice in my mouth. I needed to spit—but where?</p>

<p>Split seconds before barfing on the dugout steps in front of everyone, I jumped out of my seat, grabbed a cup off the Gatorade cart and spit as controlled as I could into the cup. I plucked the rest of the chew from my mouth and flicked it into the trash. Couldn't find a napkin to wipe my fingers, so I wiped them on my pants instead.</p>

<p>"I was literally about to puke out there."</p>

<p>Gomes is laughing.</p>`,
        wordCount: 3200
    },
    {
        id: 9,
        year: 2015,
        section: 'year',
        title: "FIRE DRILL",
        subtitle: "Detroit, Cleveland, Arlington, Chicago, Boca Raton, Nashville, Toronto, Secaucus",
        teaser: "Chaos in the clubhouse.",
        content: `<p class="has-dateline"><span class="dateline">DETROIT, <em>September 10</em>—</span>A code green Thursday night. Watching the NFL season opener with pizza and friends on my off day. George Sipple is with the last-place Tigers in Cleveland.</p>

<p>Sipple has served as the sports department's do-it-all reporter for twenty years. George primarily covers baseball, pro and college hockey. He's been at the <em>Freep</em> since 1995, starting on the Prep Crew. He also covers auto racing, colleges, everything.</p>

<p>It's a baseball-free night. I didn't watch (they lost), haven't been on Twitter, and don't even have my phone on me. When I check it next, there is a list of missed messages:</p>

<p>11:08 <span class="small-caps">P.M.</span>— "Is Al on the trip?… Did you see the assistant sports editor's email? A person at Channel 4 thinks Ilitch might have told Bernie about Ausmus being done at the end of the year… You watching???"</p>

<p>Apparently, while I wasn't, Bernie Smilovitz promoted an exclusive report during the break. "A major change is on the way for the Tigers. Tune into <em>Local 4 News</em> after the game."</p>

<p>I reach out to a friend who works at the station. The exclusive report? Brad Ausmus is out after the season—Bernie was at ownership's annual charity golf classic earlier in the week.</p>

<p>Code green is now bright red—a five-alarm fire.</p>

<p>11:27 <span class="small-caps">P.M.</span>—Sipple passes along the phone number for retired hockey executive Jim Devellano, a longtime Ilitch confidante. Devellano, seventy-two, was the Red Wings general manager for eleven seasons in the eighties and nineties and has kept figurehead positions with the Ilitch-owned Red Wings and Tigers. But Devellano is In The Room by title only—although he's listed in the Tigers' media guide as a senior VP, he's not considered in the know.</p>

<p>Sipple has been talking to Devellano for years while covering hockey and says he'll call him.</p>

<p>I text PR (both Ron Colangelo and Aileen Villarreal) and Dodgers beat writer Dylan Hernández, who says he'll call back—he's putting his kids to sleep.</p>

<p>"What do I do?"</p>

<p>I've never been in a five-alarm fire.</p>

<p>11:52 <span class="small-caps">P.M.</span>—I call Brad. No answer.</p>

<p>"I hate to reach out about this. Have you been told anything about this report?"</p>

<p>"I heard about it."</p>

<p>"Have you been told anything about your future?"</p>

<p>"I don't really have a comment on my future."</p>

<p>Frantically texting folks In The Room: "We are about to report that Brad is out at the end of next season. If there is anything you want to let me know, please do."</p>

<p>Assistant GM David Chadd responds: "Not true."</p>

<p>I relay the denial to the desk, but the source is already approved. A story is posted, matching Bernie's report. According to the two largest news sites in Michigan, Ausmus is out.</p>

<p>12:38 <span class="small-caps">A.M.</span>—Dylan Hernández suggests I call Scott Boras, because "Boras knows everything that's going on." It's not even 10 <span class="small-caps">P.M.</span> out west. Boras tells me he hasn't heard anything, but it certainly wouldn't surprise him.</p>

<p>I'm assigned a next-day story—who's up next? It's on Freep.com by last call. <span class="small-caps">FENECH—AUSMUS OUT, SO TIGERS SHOULD LOOK AT GARDENHIRE</span>.</p>

<p>Yup, Ausmus is out. Or is he?</p>

<p>Myers tells me to cancel my weekend plans: "I need you to be in Cleveland tomorrow."</p>

<p class="has-dateline"><span class="dateline">CLEVELAND, <em>September 11</em>—</span>At Progressive Field the next day in time for Ausmus' pregame media session. Ausmus isn't out: He's being peppered with questions from reporters.</p>

<p><em>Did that report sting you? Did it surprise you that it came out… angry even?</em></p>

<p>"Not really."</p>

<p><em>Is it awkward?</em></p>

<p>"Not really… For who?"</p>

<p><em>For you?</em></p>

<p>"Not really."</p>

<p><em>What's been the most trying part of this year, Brad, for you?</em></p>

<p>Ausmus never loses his quip.</p>

<p>"You."</p>

<p class="has-dateline"><span class="dateline">ARLINGTON, Texas, <em>September 27</em>—</span>Sweating out the final week of the season. Six to go.</p>

<p>I'm writing about catcher Alex Avila, son of the team boss. Avila, twenty-eight, is a free agent in the offseason. With the team ready to hand the reins to James McCann, it's unlikely he returns.</p>

<p>The story about Alex is a positive piece—lifetime ties with the organization, growing up as a team official's son, soon to fly the coop. We talked last weekend, and I spoke with his wife. A couple days ago, he reached out, asking if he could read the story before it goes out.</p>

<p>This is a big no-no—against the Journalism Ethics we live by. But the world we live in is nothing if not gray…</p>

<p>"I really shouldn't."</p>

<p>But I do.</p>

<p>I see greater long-term pay-off by building trust with Alex than I do by acquiescing to rules that should be applied on a case-by-case basis.</p>

<p>He doesn't take any editing liberties. He thanks me for writing it.</p>

<p class="has-dateline"><span class="dateline"><em>September 29</em>—</span>In Texas, I'm issued a final challenge for my rookie year. It comes by way of Nick Cotsonika, temporarily a <em>Freep</em> editor between stops in his impressive sports writing career. Cotsonika, returned a few months ago after getting laid off as <em>Yahoo! Sports</em>' top NHL guy.</p>

<p>I grew up reading Cotsonika in the <em>Free Press</em>. He covered Michigan football, the Lions and Red Wings in his twelve years here. He's made me a lot better in a short period of time. Today, he asks if I can write a story on Verlander's second-half resurgence.</p>

<p>"See if he'll talk."</p>

<p>Great, I think. Just what I need. But I'm not going to say no to Nick, so when I'm in the clubhouse later, I ask Verlander if I could get a couple minutes with him.</p>

<p>Verlander pitched Detroit to a win in the series opener last night. After missing the first 2½ months with a right triceps strain, Verlander returned on June 13. Following six roller-coaster starts, he found his consistency and looks like a top starter again: In thirteen starts since the All-Star break, he's posted a 2.80 ERA with 9.75 strikeouts per nine innings.</p>

<p>After a down season in 2014, due in no small part to the after-effects of core muscle surgery, Verlander's rebound has been a relief for both team and player. They're paying him $28 million to anchor their rotation while the righty, now thirty-two, is exiting his physical prime.</p>

<p>On August 26 against the Angels, Verlander came within three outs of his third career no-hitter. The bid was broken up on a hit off the foul line. He said afterwards, "Obviously, luck always has to be a little bit on your side."</p>

<p>Luck is on my side today. He's in a good mood.</p>

<p>"Two minutes?"</p>

<p>"Yeah."</p>

<p>"Like, literally two minutes? Hey, your rules, not mine."</p>

<p>He's seated at his locker, legs crossed, shorts and flip flops. Scratching his chin, pretending to ponder.</p>

<p>"Well, maybe like five minutes?"</p>

<p>"Okay. Now it's five minutes. Next, it's gonna be ten minutes."</p>

<p>Verlander agrees to talk. When five minutes pass, I let him know.</p>

<p>"It's good. You can keep going."</p>

<p>Verlander has all day to talk about this kind of story.</p>

<p class="has-dateline"><span class="dateline">CHICAGO, <em>October 4</em>—</span>On the final day of the season I wake up and run ten miles. The long run in preparation for a half-marathon in two weeks. To the end of Lake Shore Drive.</p>

<p>When I get to the ballpark, I'm standing in the clubhouse when the Tigers' bus arrives. Verlander strides up to his locker.</p>

<p>"About time you wrote a good story, Anthony."</p>

<p>"Every now and then, I get lucky."</p>

<p>This marks a milestone in our relationship—it is the first time Verlander addresses me by name. It feels good—I've tried hard to build a good relationship with him.</p>

<p>Detroit wins its last game but finishes a disappointing 74-87. Their streak of four straight division titles stopped in last place.</p>

<p>The season may be over, but back out in the clubhouse, there's still work to be done. Sometimes painfully awkward work. In this last scene with players, coaches and anyone else, I gather as many phone numbers as I can.</p>

<p>Some of them ask, <em>Why</em>? "In case anything happens, and I need to get ahold of you."</p>

<p><em>Why would you need to get ahold of me</em>? "Like, a trade or something like that…"</p>

<p><em>What if I don't want you to get ahold of me</em>?</p>

<p>Time is of the essence—the clubhouse will only be open for so long. And when it's closed, it doesn't open again until spring training. I quickly make my way around. A couple veteran players cough up their number easily. I thank Ian Kinsler for his professionalism. In busy-bee mode, I walk up to J.D. Martinez, failing to anticipate the towel he's just dropped.</p>

<p>"What the hell, man? Right now? Really?"</p>

<p>Martinez gives me his number.</p>

<p>To avoid the risk of ruining the good thing we have going, I decide against asking Verlander for his number. I walk up to him—good meeting you this year, good handshake.</p>

<p>"You, too, Anthony."</p>

<p>"Oh… Do you think I can get your agent's cell phone number?"</p>

<p>He pulls out his phone and gives it to me, which is great—I've been calling this guy's office for months, and he hasn't answered one message.</p>

<p>This exchange draws schoolyard attention. A competitor eyes me. He comes too close and says, "Did he just give you his number?" I turn the other way to avoid him, in case Verlander is watching. He's not. He's buried in his locker, gathering his belongings, which now include a pair of Miguel Cabrera's batting gloves.</p>

<p>Cabrera gifted them to Verlander after last night's game, when he went 3-for-4 with a home run, clinching the American League batting title. Cabrera, thirty-two, hit .338 despite playing through lower-body injuries that would sideline most players. It is Cabrera's fourth batting title in five seasons.</p>

<p>I say so long to the batting champ. He nods back.</p>

<p>Lingering in the clubhouse to see who I've missed; I feel a lump building in my throat. It's not the phone numbers and email addresses scribbled in my spiral—it's the years' worth of work that went into building the trust to get them.</p>

<p>With nearly everyone checked off my list, I try to find Víctor Martínez. Even as he struggled this year, Martínez's locker space was always open, a safe haven for a rookie Ball Writer. Martínez hit a career-low .245 with a shell of yesteryear's power. He turns thirty-seven this winter.</p>

<p>With Big Víctor nowhere to be seen, I walk up to Little Víctor and ask where his dad is.</p>

<p>"He's in the back. He's not feeling good."</p>

<p>I ask if he can tell his dad I said thank you for the help this year. I give him a fist bump—see you next year.</p>

<p>"See ya, Anthony."</p>

<p>Walking out of the clubhouse, I bubble with proud emotion. I pull into the restroom and put myself together.</p>

<p>I write my stories slowly, the final Ball Writer to file out of the press box. When I leave, I take the elevator to the concourse. I walk around the emptiness of the half-lit stadium, staying in the last moments of my only rookie year as long as I can.</p>

<p class="has-dateline"><span class="dateline">BOCA RATON, Fla., <em>November 9</em>—</span>Welcome to the offseason.</p>

<p>It begins unofficially this week at the general managers meetings, held annually at resorts in warm-weather locales where our front-office friends can indulge in job perks—five-star suites, fine dining and feverish attention.</p>

<p>The offseason is the sowing season: It is where relationships are founded and strengthened with pure persistence; where the biggest scoops are had with free agent signings, trades and rumors, where all the hard work is put to test when news breaks at a moment's notice.</p>

<p>This year's events unfold at the Boca Raton Resort & Beach Club Spa. The place exudes elegance: A bronze statue of a woman called "Infanta Margarita" welcomes high-paid executives, agents and sports writers, many of them chauffeured to the front of the palm-lined roundabout. I arrive in a rental car.</p>

<p>A potpourri of people strolls through the marble-floored lobby. Others lounge on the couch or linger in the corner. Think of the GM Meetings as the quiet little brother of next month's winter meetings—with far fewer people in attendance, higher quality sourcing chances can be plentiful.</p>

<p>This is my focus. I'm soon sitting on a couch with Dylan Hernández from the <em>Los Angeles Times</em> and a couple of other writers. Dylan is hard at work, live streaming the media lounging. Shown to the masses, Dylan shares with me his screen, featuring an all-too-familiar troll: "Did Fenech crash a car today? Horrible acne. Try Proactive, you tool!"</p>

<p>Everyone wants to know: "Who is this Internet Stalker guy?"</p>

<p>We dwell mostly in the lobby and in the media workroom around the corner. We are supposed to speak with our GMs at some point, but nobody is quite sure when. I am enjoying an advantage as the only local beat reporter in attendance—I cannot shake the satisfying thought of Rival Cohort slamming his keyboard in frustration when he finds out.</p>

<p>Mostly, I try to talk with agents. I'm sitting next to agent Oscar Suarez, who helped me out with the Joakim Soria scoop last month. I meet two agents with Octagon, a big firm that represents Víctor Martínez and others. I play the poor young Ball Writer card—it's my first year, don't know anybody. It worked: Got both of their numbers. Detroit seeks a front-line starting pitcher, and I come across Sam Samardzija—who doubles as the agent and older brother of free-agent starter Jeff Samardzija. I get his card. I send hello texts and shake hands and squeeze in a question for Scott Boras during his super-sized media session in the lobby.</p>

<p>With more experience comes more confidence, more knowledge. By the end of the week, I'm borderline brash. One sun-soaked afternoon, standing on a pier overlooking Lake Boca Raton, I correctly identify the guy nearby as an agent—sport jacket, shirt unbuttoned, sunglasses—and strike up an introduction. I'm Anthony Fenech with the <em>Detroit Free Press</em>. He's Nick Chanock, with Wasserman. "It's my first year, but I don't want to do this forever.… I want to do something bigger. <em>Really</em> write, you know?"</p>

<p>Chanock's gotta go. Gives me his number. We'll keep in touch.</p>

<p>I meet an executive from Milwaukee and am pointed in the direction of a pot-bellied, bald man with glasses and a Southern accent. His name is Mike Russell, and apparently, it's my lucky day. Rumor has Russell leaving Arizona to return to the Tigers as a special assistant.</p>

<p>The rumor is true, he says—but it's off-the-record to you. I use Russell's confirmation on background. "I don't want to see my name in the paper, now, Anthony."</p>

<p>On the flight home from Fort Lauderdale, I follow-up with the folks I met. "Nice meeting you," I email the Brewers assistant GM. "I'll keep in touch," I email Daniels. "Save my number," I message agents.</p>

<p>It was a successful week at the GM meetings—I didn't get scooped.</p>

<p class="has-dateline"><span class="dateline">DETROIT, <em>November 18</em>—</span>Pulling double-duty, covering basketball practice when the top National Guy rears his ugly head again: They're closing in on a trade with the Brewers for All-Star closer Francisco Rodríguez, according to Ken Rosenthal.</p>

<p>Nothing back from the Milwaukee guy I met last week. Neither do my other so-called sources. Soon, the team announces the trade, and nothing is left to confirm. Meanwhile, I'm trying to cover two sports at the same time—dialed into a baseball conference call as basketballs rap around the Pistons' practice facility during coach Stan Van Gundy's post-practice scrum.</p>

<p>Tigers PR: "We picked you up asking a question to Van Gundy on the call at the end. Was very strange."</p>

<p class="has-dateline"><span class="dateline"><em>November 29</em>—</span>Worlds collide again: At Red Wings morning skate when baseball news breaks.</p>

<p>"Big signing coming. Starting pitcher. Not sure who."</p>

<p>The person can't be more specific. "Just letting you know what I heard."</p>

<p>Even with a head start, I finish nowhere near first place. Within the half-hour, a National Guy gets the scoop: <em>Jordan Zimmermann to the Tigers</em>. Like piranhas, another takes a bite. <em>Five years, no opt-out</em>. And the big one: <em>$110 million</em>.</p>

<p>Zimmermann is introduced the next day. The righty starter is the latest recipient of Mike Ilitch's riches, most recently estimated at $5.4 billion by <em>Forbes</em>. Ilitch makes a rare public appearance at the press conference. At eighty-five, he can't move around much. But he can still make his voice heard—loud and clear.</p>

<p>"I don't care about the money. I want the best players—and that's it."</p>

<p>For nearly a decade, he's proven it—reaching the World Series in 2006 and 2012 and the American League Championship Series in 2011 and 2013. The Tigers—a mid-market team—have carried a top five payroll in most years since.</p>

<p>One day, a bill will come past due. I don't want to be covering this team when it does.</p>

<p>Ilitch grew up on the west side of Detroit and began his empire by founding Little Caesars Pizza. He's won four Stanley Cups with the Red Wings and appears still willing to pay whatever it takes for another shot at a World Series—perhaps the lone puzzle piece missing in his extraordinary life.</p>

<p>He bought the Tigers in 1992, months after typing this return letter to a local youngster, who at age four already had his future planned out. With help, I wrote in crayon to Ilitch that I wanted to be a hockey player.</p>

<p class="block-quote"><em>"Dear Anthony: I have read your letter and must tell you what a good printer you are. You can start getting ready to be a hockey player (Red Wing) by 1. Eat good food, get exercise, and get a lot of sleep, because hockey players have to be healthy. 2. Listen to mom and dad, because hockey players need discipline. 3. Study hard when you go to school, because hockey players have to be smart. 4. Learn to skate and practice a lot, because hockey players need to be excellent skaters. You do all of the things I listed above and then write me another letter and let me know how you're doing when you start playing with a Mites or Squirt team. Thank you for your letter. Sincerely yours, Michael Ilitch."</em></p>

<p class="has-dateline"><span class="dateline">NASHVILLE, <em>December 6</em>—</span>Back at the winter meetings. This year, I took the advice I was given and come prepared. If the writers don't love me already, maybe they're going to love what I brought inside my garment bag.</p>

<p>This year's extravaganza is at the Gaylord Opryland Resort, a sprawling indoor city twenty minutes from the honky-tonk of downtown. When I arrive, I see Bob Nightengale and stick to him.</p>

<p>Nightengale, forty-six, is <em>USA TODAY</em>'s National Guy. He started as a beat writer in 1986, covering the Royals at the <em>Kansas City Star</em>, then went to the West Coast to cover the San Diego Padres and California Angels. He joined <em>USA TODAY</em> in 1998. I met Bob a few years ago in Arizona, where he lives. We become pals after postgame beers last year.</p>

<p>When I grow up, I want to become the Bob Nightengale of National Guys: Fun guy and skin-tight with the scouts. Bob is in touch with owners and has deep relationships in the game—which I don't. Not yet.</p>

<p>By midnight, I'm scooped again. My team is "closing in" on reliever Mark Lowe, according to Seamhead Jerry Crasnick. I run into him after having a cigarette with a couple of New York writers and ask the ESPN.com senior writer if he's got a contact for Lowe's agent, former player Jeff Frye—whom he probably got the scoop from. For whatever reason, Crasnick shares it. Frye doesn't answer.</p>

<p>I wallow away in my room, writing up another breaking story I can't confirm.</p>

<p class="has-dateline"><span class="dateline"><em>December 7</em>—</span>At 4 <span class="small-caps">P.M.</span>, we're summoned to a sixth-floor suite. Behind a table sits general manager Al Avila, flanked by his top lieutenant—assistant David Chadd. Behind them, a bay window overlooks the lobby action below.</p>

<p>Avila says they aren't in active pursuit of free agent outfielders Yoenis Céspedes and Alex Gordon. At 4:05, Bob Nightengale tweets as much: "Al Avila tells Detroit reporters that they are out of Céspedes and Alex Gordon talks."</p>

<p>This surprises all of us on the Tiger Beat. We exit the suite half an hour later with our thumbs atwitter—only to find our meatiest piece of information stolen by a National Guy who wasn't even In The Room.</p>

<p>Nightengale's scoop angers my Rival Cohort Chris McCosky, from the <em>Detroit News</em>, who points a finger: "I know it was you who leaked it to him!" He is guilting me by my employment (<em>USA TODAY</em> and the <em>Free Press</em> are both owned by Gannett) and concluding that for some reason I must be aiding Nightengale's efforts to scoop everyone—including me.</p>

<p>He grumbles the entire way down the elevator. I pay no attention to the others eye-rolling pleas for peace. There's four of us in the car. I don't bite my tongue. "You've gotta be kidding me. Yes, of course, I want Bob Nightengale to kick my ass."</p>

<p>"Who was it then? It had to be you."</p>

<p>"Just stop, man. This is ridiculous."</p>

<p>"I saw you guys together last night!"</p>

<p>Beat writers are supposed to be experts with inside information, yet we mostly hang our hats on the access we receive.</p>

<p>Our insights each day come from the Tigers' media sessions. In the suite, our information is thought to be safe from the National Guys—but like pre- and postgame managerial sessions during the regular season, live tweeting is prohibited. Most times, the quotes we get are the only chance to provide our followers with exclusive insight. Thus, a speed test commences: They who tweet the quickest get the social media spoils—the retweets and favorites and followers.</p>

<p>I channel my anger and phone Ron Colangelo, asking how the hell did Nightengale get that? I point the blame at PR.</p>

<p>"I think it was you… I'm not an idiot."</p>

<p>Colangelo is convincing as he claims innocence—but finding the culprit is fruitless. During Avila's sessions, the entire traveling front office is present. They sit around, silently judging our questions. They make faces at each other and text people. They are sources—at least one of them Bob Nightengale's.</p>

<p class="has-dateline"><span class="dateline"><em>December 8</em>—</span>The annual Baseball Writers' Association of America meeting is bright and early. Writers have crammed into a conference room, where issues are debated and voted on, Hall of Famers are revealed, and various organizational topics are tackled.</p>

<p>This is the profession at its nerdiest. We argue about Hall of Fame vote transparency, cry over the loss of clubhouse time, and question the standards of membership eligibility. We loathe losing access and complain about crappy PR treatment.</p>

<p>But today is a big day for the BBWAA. Results of a recent vote are revealed and MLB.com writers are now eligible for membership. Previously, MLB.com writers were barred to ensure the BBWAA's journalistic integrity—MLB.com writers are employed by MLB Advanced Media and operate as an arm of the league. That can create conflicts of interest.</p>

<p>Every team has an MLB.com beat writer whose coverage is featured on the team's official site, and it stands to reason certain stories could be discouraged. The site serves as a promotional vehicle—buy tickets, jerseys and autographed dirt from the field here.</p>

<p>A newspaper story about a player's domestic violence accusations probably won't make it onto the website. Team turmoil and selling tickets don't go together. The sites are there to make money—and negative stories don't help.</p>

<p>This isn't to say my MLB.com cohorts can't be trusted. Most have a newspaper background—as the industry has spiraled, many jumped to the more secure and money-making MLB.com. I, too, once worked for MLB.com as an associate reporter and can't remember an instance of dictated coverage. But the arrangement is awkward, as evidenced by the disagreements. People turning on the people they sit next to 120 days a year.</p>

<p>Someone makes a good point about the built-in advantages league-affiliated writers have in breaking news, but I'm over it. I need some water in the worst way, so I walk out. I voted no.</p>

<p class="has-dateline"><span class="dateline"><em>December 9</em>—</span>ALERT!</p>

<p>Al Avila's afternoon media session has been pushed back, according to Aileen. This usually means a trade is near.</p>

<p>I know nothing of the sort. Those who do aren't responding.</p>

<p>Once again, a friend helps. This time, it's ESPN.com's Marly Rivera who helps piece together that the Tigers have been pursuing lefty reliever Justin Wilson, according to her source.</p>

<p>That's as close as I come to the scoop. An hour later, the trade is broken by FOX 2 television reporter Jennifer Hammond, who isn't even on the scene—Wilson to the Tigers, two prospect pitchers to the Yankees. At 6 <span class="small-caps">P.M.</span>, it's Villarreal again: "Come now to suite."</p>

<p class="has-dateline"><span class="dateline">ZZYZX, Calif., <em>January 15, 2016</em>—</span>I learned many things my rookie year on the beat. Don't overdrink the night before Getaway Day. Always sit with scouts while eating dinner and double-check email addresses. Keep a backup keyboard in your work bag.</p>

<p>Today, I'm re-learning a hard lesson: Don't travel on arbitration day.</p>

<p>Last year, I was lost in the shuffle of a busy train station, beaten on the biggest arbitration deal ever. This year, I'm on the highway, 1½ hours outside Las Vegas, foolishly driving a rental car with one hand. My other hand is texting sources, checking Twitter and searching for the next exit. I've been beaten twice. According to Jon Heyman, the National Guy who breaks arbitration deals with superhuman ease, <em>two</em> deals are happening.</p>

<p>At 2:46, Heyman reports lefty Justin Wilson has agreed to terms. Four minutes later, another one: <em>Tigers, Iglesias settle at $2.1M plus performance bonuses</em>.</p>

<p>At Denny's, I write a catch-up story, angry again. Angry at annoying editors, who ping every time I get beat—as if I don't already know. Angry at my sources, who are nowhere to be found. Angry at the agents, for not thinking about me first.</p>

<p>Angry because I've painstakingly contacted the agents for these arbitration players. I spoke with all but one agent at the winter meetings. I called Jose Iglesias' agent a week ago—we talked for twelve minutes. Angry at Al Avila—I thought we made real progress in the offseason. Last week, he said, "Text or call me whenever you need anything." Angry at Jon Heyman—<em>how</em> is he doing this?</p>

<p>After breaking seventy-nine arbitration deals last year, Heyman will up the record to eighty-four this year. To outsiders, this is what a baseball insider looks like—well-connected, probably cooped in an office working the phones like a coked-out penny stockbroker. But to an insider, Heyman's reporting is beyond the realm. Inexplicable, how Heyman churns a running scroll of scoops like that—minute-by-minute, exact figures, star players and small. When the 4 o'clock deadline passes for teams and players to exchange figures, The Heymachine spits out numbers: <em>Tigers file at $6M, J.D. Martinez at $8M</em>.</p>

<p class="has-dateline"><span class="dateline">TORONTO, <em>January 18</em>—</span>I flew to Detroit from L.A. last night, then to Toronto this morning. It's now almost two and I still haven't left the airport. I've been at customs since eight this morning.</p>

<p>The officer had called me to the window and asked why I was coming to Canada. I was honest: My roommate from college works at a PR firm that's hosting a Molson event tonight with an ice rink at the top of a skyscraper. He asked how long I planned on staying. Tomorrow. That was it.</p>

<p>He told me to sit in one of the blue chairs, called me up again a few minutes later and said I wasn't allowed in the country. Canada doesn't permit DUI offenders for ten years. It's only been eight, in my case.</p>

<p>So… customs escort me to a flight home. When I arrive, I'm punched in the face by breaking news. Another big signing.</p>

<p class="has-dateline"><span class="dateline">DETROIT, <em>January 20</em>—</span>An introductory press conference is called. Upton, a three-time All-Star, is the latest free agent import. The power hitting outfielder will soon be $132.75 million richer.</p>

<p>"Don't tweet that. Don't want moles to know. The Internet Stalkers of the world and his moles follow all of you and know your every move."</p>

<p>If only he knew. But Ron Colangelo knows more than most—enough to take precautions.</p>

<p>A few years back, Internet Stalker (same one) snuck into a Comerica Park press conference as a reporter for the fictitious <em>Jewish News</em>.</p>

<p>In December 2013, they dealt fan-favorite starting pitcher Doug Fister to the Washington Nationals for a trio of no-names—southpaws Robbie Ray (starter), Ian Krol (reliever), and utilityman Steve Lombardozzi.</p>

<p>The trade was unearthed by a no-name, too—a high school senior from Massachusetts broke the news on Twitter. The news changed his life: Chris Cotillo became an Internet sensation, and within the week, he was at the winter meetings being interviewed by MLB Network.</p>

<p>The trade went as fans feared. Fister was outstanding for the Nationals, finishing eighth in Cy Young voting, while the incoming triumvirate disappointed—Ray couldn't stick in the big-leagues, Krol posted a 4.96 ERA, and Lombardozzi was traded away.</p>

<p>When Dave Dombrowski took the dais to meet with the media after the season, my Internet Stalker was waiting. He even got one of his cronies credentialed as a photographer for the phony publication. Soon, Internet Stalker had the microphone in the back row, squeaking a string of questions Dombrowski's way.</p>

<p>"Why did you trade Doug Fister? Did you do your due diligence? Many in the national media said you didn't."</p>

<p>Dombrowski pulled a piece of paper from his jacket. On the paper was a list of other young pitchers the team had considered. He showed the list to Brad Ausmus, sitting beside him.</p>

<p>"I don't weigh such opinions when making decisions. Robbie Ray was at the top of that list. I feel we did tremendous due diligence."</p>

<p>After struggling as a rookie, Ray was traded to Arizona the following winter. He would eventually fulfill his potential, winning the Cy Young Award with Toronto in 2021.</p>

<p>Pardoned from the mic, Internet Stalker pleaded for a follow-up, but security got him out.</p>

<p class="has-dateline"><span class="dateline"><em>January 21</em>—</span>The boys are back in town. After the media kickoff at Comerica Park, I head to the Veterans Affairs medical center in Ann Arbor for the ribbon-cutting of a new wing personally financed by Justin Verlander.</p>

<p>I chose this winter caravan stop carefully. Most other reporters crowded around Verlander at the stadium earlier, so I figured they'd go elsewhere. I'd throw the franchise player a bone—writing about his charitable endeavors—and get a couple minutes one-on-one.</p>

<p>I'm right on both accounts. I'm here alone. Verlander gives a little speech, cuts the ribbon, and takes a few photos. Employees and patients applaud. Afterwards, I get a couple minutes. Ushered into a side room, unbuttoning his uniform, I ask Justin if he ever looks at the money he makes as a superstar athlete compared to, say, an Army officer in Afghanistan.</p>

<p>"Do you ever think about the difference?" I was going for something quotable, something to humanize the guy.</p>

<p>Justin doesn't get it.</p>

<p>"Do you know how much I donate to veterans?"</p>

<p>"No."</p>

<p>"Then I don't know why you'd ask a question like that."</p>

<p>I try to explain.</p>

<p>"Justin, I wasn't tryi—"</p>

<p>"Got anything else? Because if not, I gotta go."</p>

<p>"I think I should be good."</p>

<p>"Great."</p>

<p>Verlander: Jacket on, jets out. He tells Ron Colangelo.</p>

<p>"Positive story, correct?"</p>

<p class="has-dateline"><span class="dateline">SECAUCUS, N.J., <em>February 12</em>—</span>A couple weeks ago, I reached out to the producers at MLB Network, saying I'd be in the area today. I'm in Brooklyn for the premiere of my buddy's new short film, which was selected to screen at an indie festival. But as I found out this morning, Brooklyn is not in the same world as industrial New Jersey, where network studios are located.</p>

<p>It took almost two hours, but I made it from hostel to subway to another subway to the Long Island Railroad and finally to a shuttle bus to 1 Network Plaza. Couldn't sleep a wink last night. I'm going on the morning show around 10 <span class="small-caps">A.M.</span>, live with Harold Reynolds and Fran Charles.</p>

<p>I'm scheduled for two segments. Three to five minutes each. I am wearing a pepper-gray jacket, pink shirt, and against everything I believe in, no tie—I was counseled by MLB Network reporter, runner and supermom Sam Ryan. I'm glad I listened. I feel good walking out of the green room, and the guys make me feel comfortable immediately.</p>

<p>I don't understand the visibility of sitting in this studio chair until I stand up. I glance at the TV as the show goes to break. UP NEXT, a promotion says, DAVID PRICE INTERVIEW.</p>

<p>Price is joining the show by phone. He was on hold prior, listening to my segment. Sitting in that chair lends an invaluable legitimacy to your name. Everyone in the industry watches. Players, coaches, GMs. Sources and scouts. Front officers you've reached out to and those you'll email in the future. Agents. Fans. Even David Price.</p>

<p>By the time I leave the studio, my phone is blowing up with those people.</p>

<p>The producer asks if I want to be a regular correspondent. They'll pay me. He'll have the secretary send the contract out today. For up-and-down Ball Writer Anthony Fenech, this is definitely up.</p>`,
        wordCount: 6500
    },

    // 2016 SEASON CHAPTERS (10-14)
    {
        id: 10,
        year: 2016,
        section: 'year',
        title: "SPRING TRAINING",
        subtitle: "Lakeland, Fla.",
        teaser: "Justin Verlander comes alive—and finally talks about Kate Upton.",
        content: `<p class="has-dateline"><span class="dateline">LAKELAND, Fla., <em>February 18</em>—</span>Pitchers and catchers report to camp today and Justin Verlander is driving his Range Rover. After Verlander battled injuries for the past two years, folks are anxious to see which pitcher pulls up in TigerTown: The one who looked past his prime in the first half of last season or the one who looked like Justin Verlander in the second half?</p>

<p>His latest bullpen session provides an early clue.</p>

<p>"I'm definitely excited. I can tell you that."</p>

<p>Two days from his birthday, Verlander feels healthy and primed for a comeback season.</p>

<p>"Feeling like I pitched well last year, I think, went a long way for everybody about being excited for this season. I'm ready to step on the gas. I'm ready to go."</p>

<p>But he's not ready to speak on the scuttlebutt about adding a split-fingered fastball to his repertoire.</p>

<p>"I can't tell you that."</p>

<p>I try another way.</p>

<p>"Can you tell us off-the-record?"</p>

<p>No again. "Because then, you'll write about it the first time I throw anything different."</p>

<p class="has-dateline no-indent"><span class="dateline"><em>February 21</em>—</span>While walking the aback fields, I try to block out the construction sounds of real-life Tonka trucks and follow the sound of bat cracks I hear in the distance.</p>

<p>The sound becomes more familiar the closer I get—Víctor Martínez is in the batting cage.</p>

<p>Martínez walks out afterward: Towel on shoulder, bats in hand, sweat-soaked face. Walks straight by me. No eye contact. Something is wrong. I trail happy-go-luckily along, and Martínez becomes a barking dog.</p>

<p>"Go away! Go! Go!"</p>

<p>With his foot speed diminished—Martínez ranked as the slowest player in baseball last season, at 23.2 feet per second—I keep up with ease. Trying to get to the bottom of things, he cuts me off.</p>

<p>"I saw what you were saying on TV. No power, nothing this, nothing that. Always talking shit."</p>

<p>Over the winter, I went on MLB Network and was asked whether the Tigers could count on his power swing returning after he hit only eleven home runs last season. "No, they can't," I said. "Víctor is about to be thirty-seven, and he's shown signs of decline. While they can count on Víctor hitting for a high average, I'm not sure the power will return."</p>

<p>Martínez isn't in the mood for my defense. "Away!" he shouts. As Víctor walks off, a security guard runs up.</p>

<p class="has-dateline no-indent"><span class="dateline"><em>February 22</em>—</span>Spring training is the leisure season. For established players, there is minimal pressure. Games are exhibitions, so nobody loses. Optimism intoxicates the air, and eternal wonderment rubs off on Ball Writers, too.</p>

<p>This is the year. They're gonna win the World Series, I tell my buddy, and I'll write a book about it. Working title: <em>Roar Restored—Inside the Jungle with the Detroit Tigers</em>.</p>

<p>The book begins on the back fields. On a turf field named after Ty Cobb, manager Brad Ausmus addresses his players.</p>

<p>Before batting practice, Kirk Gibson reacquaints himself with Justin Upton. Miguel Cabrera warms up with a weighted bat. Al Kaline is standing behind the batting cage.</p>

<p>Upton's father Manny is bouncing around the dugout, starstruck after meeting Mr. Tiger.</p>

<p>"I came here to see him. Royalty."</p>

<p class="has-dateline no-indent"><span class="dateline"><em>February 23</em>—</span>There is a lighter feel in Lakeland this spring. Although Al Avila worked alongside Dave Dombrowski for almost two decades, in his first spring training on the job, Avila is running his ship in stark contrast to the past. Under Dombrowski, the front-office staff was buttoned up—working diligently but not without fear. He was the boss, not a friend, and club-media relations were separated by a thick black line.</p>

<p>Tonight, Avila invites the Tiger Beat to a barbeque. We arrive at a huge house and find out the living room is half of a basketball court. Wood floors, lines on the court and a professional-grade hoop suspended from the ceiling. The court opens into the kitchen, where there are plenty of finger foods, drinks of all kinds, and a huge party sub from Publix.</p>

<p>Ball Writers, front officers and PR. Breaking bread, boozing and playing basketball under the same roof. A three-on-three game begins. I'm not playing. I'm sitting at the table with two Tigers Guys, texting beat mate George Sipple: "They're having a BBQ. It's one big social experiment. Awkward as hell. But it might just be me, though."</p>

<p>I treat this experiment the way I treat all social gatherings and general moments of awkwardness: I grab a beer. Soon, I'm explaining the auction mechanisms of my fantasy league to the real-life baseball folks. I seek scouting opinions on my players. The basketball game is still going. People are sweating when I see Avila step outside.</p>

<p>The mansion backs up to a man-made lake. It's outlined with palm trees inside a gated community with a golf course, country club and million-dollar houses. The Tigers' team travel guy is renting the house for the spring.</p>

<p>"You could get used to a view like this," I say. Al Avila is out having a smoke. He offers me a cigar. Never smoked one.</p>

<p>Avila shows me how to cut it. As I struggle, he brings out a pocket-size blowtorch and lights the cigar himself. As I cough, he tries to explain how to smoke it without inhaling.</p>

<p>"Stop smoking it like a joint."</p>

<p>We talk about anything except baseball. About Catholic schools, Donald Trump, and not being golfers. About his family and this girl who is coming to see me. The Highest Source In The Land says things to the Ball Writer he really shouldn't. We don't know each other like that. Yet as we stand here clinking our glasses, it feels as though we could.</p>

<p class="has-dateline no-indent"><span class="dateline"><em>February 29</em>—</span>Royalty is in camp this morning. Peter Gammons, perhaps the Greatest Ball Writer of All-Time, moves slowly through the clubhouse.</p>

<p>The ping-pong game stops. Alan Trammell wants to shake Gammons' hand. Players and coaches young and old address him by first name. Only the most respected Seamheads receive this kind of welcome. Gammons is invited into the coaches' room by Kirk Gibson and pokes his head into the trainer's room.</p>

<p>As Gammons stands nearby, catcher Jarrod Saltalamacchia walks out of the clubhouse.</p>

<p>"Peter! "How are you doing?"</p>

<p>"Is that really your car, my friend?" Gammons asks.</p>

<p>Saltalamacchia, a nine-year veteran, joined in free agency over the winter. His truck, a white Ford F-150 KingRanch edition with camouflage trim, is raised a foot or two and casts a monster truck shadow over the players' parking lot.</p>

<p>"I couldn't fit that in Boston."</p>

<p>"If you could, they'd take it apart on the street anyways."</p>

<p>Chauffeured by Ron Colangelo, Gammons is a runaway waterspout of stories. He is a BBWAA Hall of Famer with a blind spot for the Red Sox. Saltalamacchia played four seasons in Boston. Ausmus grew up in New Haven, Connecticut reading Gammons, who made his name at the <em>Boston Globe</em> before becoming the first Ball Writer to bound head-first into television. He joined ESPN in 1989 and has become an institution there.</p>

<p>I don't get intimidated much anymore, but my usually talkative self has been following along silently with my tape recorder running, like a cameraman on a reality TV show.</p>

<p>I text Seamhead John Lowe: "I was just part of a conversation with Peter Gammons."</p>

<p>"Mountaintop."</p>

<p class="has-dateline no-indent"><span class="dateline"><em>March 13</em>—</span>Although Opening Day is still three weeks away, our season preview section is slated for two days before. That makes the drop-dead deadline for my big feature story eighteen days—and I still don't have a subject for it when I'm forwarded this email.</p>

<p>Subject: FW: Kate Upton - Grand Slam Adoption Event</p>

<p>It's a press release for an upcoming dog-adoption event hosted by supermodel Kate Upton and her boyfriend, Justin Verlander, forwarded by our entertainment reporter.</p>

<p>"Another chance to talk to Kate?" sports editor Kevin Bull wonders.</p>

<p>For years, the media have sniffed around the famous couple. It was well-known not to ask Verlander about the topic—years ago, he pulled a group of beat writers aside and kiboshed any questions now or in the future.</p>

<p>I've never written a profile on Verlander, the Tigers' franchise pitcher. There's an easy angle there—after finishing last season strong, he looks primed for a comeback.</p>

<p>I start by emailing Verlander's parents, telling them I'm writing a feature on Justin and asking if they were going to be at his start today.</p>

<p>"Sounds good," his father says. "How about tomorrow morning?"</p>

<p>When I talk to his parents around the corner of the clubhouse during batting practice the next day, I ask them what story about him hasn't been told. Soon enough, they're talking about how he's happier these days, how the biggest difference in his life has been his girlfriend, and I'm calling out bingo.</p>

<p class="has-dateline no-indent"><span class="dateline"><em>March 26</em>—</span>Cracking Verlander's code proves a tougher task.</p>

<p>With the days before my April Fool's Day deadline dwindling, I have yet to interview the subject of my story and I'm going to Gator for some good juju.</p>

<p>"I gotta put the full court press on Justin today. When I give my sales pitch, can I drop your name, like, 'Ask G about me?'"</p>

<p>Gator resides in Verlander's inner circle, like he seemingly does with every player. Last month, he attended the surprise birthday party Upton threw for Verlander in Orlando.</p>

<p>"The article is all positive stuff, right?"</p>

<p>"Yeah, definitely. I'm just thinking about if I need to give him some more peace of mind. He's protective of his image."</p>

<p>"I don't mind if you want to say, 'I've known Gator for two years, he knows my character, and I know he's a friend of yours.'"</p>

<p>When I talk to Verlander later about getting some time, I suggest we meet at Starbucks and ride to the park together.</p>

<p>"I don't do that kind of stuff."</p>

<p class="has-dateline no-indent"><span class="dateline"><em>March 28</em>—</span>It's quiet in TigerTown, only a dozen or so players around.</p>

<p>I'm interviewing Justin at a table across from the clubhouse. We may not be cruising through Lakeland in his orange Lamborghini, but Verlander comes out with a coffee, a smile, and sits down in a good mood, offering a rare peek behind his private curtain.</p>

<p>"I never changed. If anything, I probably just became a little bit more bristled, put my walls up a little bit more and kind of blocked out people that weren't in my inner circle."</p>

<p>Verlander talks about the career-crossroads challenge of recovering from core muscle surgery two years ago. "When I talked to your parents, they said how good Kate (Upton) has been for you."</p>

<p>He nods, choosing his words carefully.</p>

<p>"When things weren't going well and I wasn't feeling great and had all these physical issues, it was nice to be able to go home and be in that world and have fun with her."</p>

<p>I text Gator afterwards. "He kinda opened up. He was good."</p>

<p>After a year's work on my relationship with the franchise player, a breakthrough. By addressing his relationship with Upton, Verlander is trusting me to write this story.</p>

<p>As the conversation winds down, I ask Verlander if I can talk to her. I mention the dog-adoption event.</p>

<p>"I just wanted to make sure it was cool with you first."</p>

<p>"Yeah, sure. If she'll talk to you."</p>

<p class="has-dateline no-indent"><span class="dateline">LAKELAND, Fla., <em>March 31</em>—</span>To put the cherry on top of the Verlander profile and talk to Kate Upton herself, I flex my corporate muscle before the dog adoption show. I reach out to the PR flak who sent the story pitch a couple weeks ago and offer a trade. I'm working on a story about Justin—if I can talk to Upton for a couple minutes, I'll write a separate story about the dog adoption and get it on <em>USA TODAY</em>'s website.</p>

<p>Ms. PR passes me along to Christie Williams, who's running the event and turns out to be Upton's older sister. Christie OKs the deal. When I get to the old airplane hangar where the dogs are waiting for a forever home, it's obvious they're not the main attraction. A crowd grows. People point their phones, carry magazines and hold up life-sized posters of Upton in a bikini.</p>

<p>She briefly appears at the event inside the hanger and soon rides by in a golf cart out of sight from the crazies. I consider my chances for a quick quote gone. The golf cart heads to the back fields, where Verlander is throwing today against minor-leaguers.</p>

<p>While Upton watches from the observation tower, I reconnect with Christie, who apologizes for the hang-up. She'll bring her over before they leave.</p>

<p>When she does, I decide against shaking Upton's hand. She doesn't remove her sunglasses. I hold up my end of the bargain, asking inane questions about her dog and the event. Before I can get the real questions out, Christie cuts me off.</p>

<p>"One more, she's gotta go."</p>

<p>I ask about Verlander.</p>

<p>"Justin is my best friend. He has made my life full and happy in every way possible."</p>

<p>And off she goes.</p>`,
        wordCount: 2450
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
