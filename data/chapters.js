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

<p><em>I HAVE FAITH IN GOD THAT IT WILL BE EXACTLY AS I HAVE BEEN TOLD.</em></p>

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

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">DENVER, <em>August 29</em>—</span>Still catching up on sleep. The Tigers are here playing the Colorado Rockies. I stay downtown after tonight's game and go to this guy's apartment.</p>

<p>I met the guy a couple of weeks ago at a wedding in Cancún, and here we are, sitting outside on his seventh-floor patio with another couple. I'm wearing shirt-tie-jacket and a work bag, an easy way to introduce myself—hi, I'm Anthony Fenech—I'm a sports writer, I cover the Detroit Tigers baseball team for the <em>Detroit Free Press</em>.</p>

<p>Basically, I fly around the country nine months every year writing about baseball. The job is never-ending, like a machine you can't beat. How, sitting here thinking about it, it's rather ridiculous that I'm writing and tweeting about these millionaires playing baseball. A game.</p>

<p>&nbsp;</p>

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

<p>&nbsp;</p>

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

<p>&nbsp;</p>

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

<p>&nbsp;</p>

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

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline"><em>October 31</em>—</span>I get a text late this morning from Suarez, who says the Tigers are picking up Soria's option. I seriously consider following <em>Freep</em> protocol and getting my source approved first but remember I need this scoop. So instead, I tweet it out first (11:33 <span class="small-caps">A.M.</span>) then message my source to the web editor on duty.</p>

<p>I decided Soria's agent was trustworthy enough and didn't need clearance—he's In The Room. I couldn't risk him texting a National Guy, who doesn't have to clear sources and could swoop in for the scoop. I was fearful of looking a fool, but equally aware of how sports writing wins are tallied these days: whoever tweets the scoop first.</p>

<p>After the source is quickly cleared, so, too, is my reporting conscience—free of the improperly sourced breaking news floating around with my name on it.</p>

<p>From the sports editor, reply all: "Woo-hoo!!!!"</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline"><em>November 11</em>—</span>Gene Myers pulls me into his office during tonight's web shift and asks if I want the good or bad news first.</p>

<p>I choose bad.</p>

<p>"The bad news is you still have to work on the web desk for a few weeks…"</p>

<p>Dramatic pause.</p>

<p>"The good news is you're our next Tigers beat writer. Congratulations."</p>

<p>He says not to tell anyone, an announcement is coming tomorrow, but I can tell my mom.</p>

<p>Tomorrow, I receive a flood of congratulations from my colleagues. I am finally a sports writer, unchained from the web desk—a <em>Ball Writer</em>, the Tigers' beat writer, can you believe it?</p>

<p><strong>From:</strong> Myers, Gene &nbsp;&nbsp;&nbsp; <strong>Sent:</strong> Wednesday, November 12, 2014 7:45 <span class="small-caps">P.M.</span><br/>
<strong>Subject:</strong> ANTHONY WILL TAKE OVER THE TIGERS BEAT</p>

<p><em>"After more than seven years, in essence, in the </em>Free Press'<em> farm system, Anthony Fenech has earned his big-league call-up. He will assume the reins of the Tigers beat.</em></p>

<p><em>"This has been Anthony's path to The Show: He started on the Prep Crew and He did stringing work while at Central Michigan. He blogged countless games for Freep.com while interning in Las Vegas, Pittsburgh and Phoenix. He became a </em>Freep<em> intern and officially hired. Since then, he usually has staffed the overnight sports web shift but covered enough baseball to earn his Baseball Writers' Association of America card before the 2013 season. When it arrived, it was one of the happiest days of his life.</em></p>

<p><em>"John Lowe proudly embraced a phrase for sports writers who devote their careers to baseball: Seamhead. For years, John has schooled Anthony on the ways of the Seamhead, including how, like a ballplayer, to stay strong and focused through a 162-game grind. He even sent this email last year: 'A bit concerned about young Anthony here—might need a better health or eating plan to handle these variant hours. He had a tweet that a home-run call 'interrupted a nap in my car.'"</em></p>

<p>&nbsp;</p>

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

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">SAN DIEGO, <em>December 8</em>—</span>At the winter meetings, hundreds of reporters gather in hotel ballrooms chasing scoops. We're usually cooped up in the media room, with a main stage where press conferences are held, trades announced, and newly inducted Hall of Famers talk about being speechless.</p>

<p>I walk with a purpose, pretending I am a somebody. I stop Ken Rosenthal, as short in person as advertised on Twitter (5-foot-4½), introducing myself. Nice guy.</p>

<p>Each evening, the beat writers are summoned for a media session with the general manager, held in the team's suite. There are five of us, sitting in chairs, while general manager Dave Dombrowski sits at a high-top table on the other side of the room, flanked by assistant Al Avila. Ron Colangelo and Aileen Villarreal (Tigers PR) stand around with on-site executives and scouts.</p>

<p>I'm startled when I see the gray-haired guy from the flight here. We make eye contact again.</p>

<p>After the session, I realize in horror that I didn't turn my recorder on before I placed it on the table—I have no audio. My competitors have pity, sharing their tape so I'm able to write my stories.</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline"><em>December 10</em>—</span>Back at the lobby bar, I re-introduce myself to a tall, tan man with big shoulders who I recognize from the Tigers' suite—Dave Littlefield, formerly the Pittsburgh Pirates GM, was recently hired as a pro scout.</p>

<p>Embarrassingly, I don't remember our conversation from last night. We talk a bit more.</p>

<p>I meet Detroit's young analytics guy, Sam Menzin, and another fellow, Matt Something, who works for San Diego. I make a point of meeting agent Dave Pepe in the flesh, a former adjunct professor at Rutgers who represents veteran closer Joe Nathan. I reached out to Pepe this offseason, had a nice conversation, and I want to pitch an offseason feature story on Nathan, the aging former All-Star who is looking to regain both his fastball and the fans' trust. I suggest I could visit Nathan while training for the season. Pepe buys in.</p>

<p>While it wasn't explicitly stated as such, the story I was pitching to Nathan's agent was a fluff piece. By allowing a certain kind of access, it's almost certain the resulting story will be favorable for the subject. Put another way: Heading into my first year as beat writer of the team, it's pretty much guaranteed I'm going to write a good story about Nathan, who is one of the team's respected veterans.</p>

<p>&nbsp;</p>

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

<p>&nbsp;</p>

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

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline"><em>December 19</em>—</span>Still swinging for the fences, trying to find feature stories. A colleague passes along an email address for Justin Verlander's parents. I message them, introducing myself.</p>

<p>"I'm writing to see if you could reach out to Justin and see if he would consider letting me spend some time with him this winter and sit in on a workout or bullpen to write a behind-the-scenes kind of story.</p>

<p>"His story is an important one to this year's team and I'd like to share it with our readers."</p>

<p>Verlander's dad, Richard, responds.</p>

<p>"We're happy to talk with you but any interviews with Justin should go through normal channels with the Tigers. Happy Holidays."</p>

<p>His agent hasn't answered my two introductory voicemails, the email I sent last week, or another call today about it.</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline"><em>December 23</em>—</span>Enjoying my newfound access to Scott Boras perhaps a bit too much, I call him on my drive into the newsroom tonight. I ask when he's going to get me in touch with Tigers owner Mike Ilitch.</p>

<p>"If you're any good at your job, you would have gotten the number by now."</p>

<p>I'm covering the Red Wings game. Ilitch, a multi-billionaire, owns the local National Hockey League team, too—an Original Six franchise. I stop in the newsroom for expenses and stroll a few blocks to Joe Louis Arena for the game.</p>

<p>In the media dining room, I spot longtime Red Wings general manager Ken Holland at a nearby table. Holland has been in charge since 1998—he'd have Ilitch's number.</p>

<p>Determined to prove my worth to Boras, I walk up to Holland and introduce myself. I ask if he can pass along Ilitch's number. Sorry, but no. Worth a shot.</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline"><em>December 31</em>—</span>Today is my Mitch Albom Birthday. I am 27 years, 2 months and 12 days old today—exactly how old Albom was on August 5, 1985, the day he debuted as a sports columnist. We measure our careers in Mitch Time around here: From the moment you walk into the <em>Free Press</em> sports department, you are measured by the cardboard cutout of Mitch in the corner, holding up one finger, <em>Voted #1 sports columnist in the country—again!</em></p>

<p>I am five years behind Mitch Time, but I remain undeterred. When I landed in Detroit after the winter meetings, I ran into University of Michigan football coach Jim Harbaugh at baggage claim and introduced myself as Anthony Fenech, future <em>Free Press</em> columnist.</p>

<p>Which leads to my latest big idea: In an effort to make up some time, what if I wrote a behind-the-scenes book of my rookie year on the beat? I could write about almost getting canceled by an Internet Stalker and getting blasted at the winter meetings and running into Scott Boras in the valet line.</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">WASHINGTON, <em>January 18, 2015</em>—</span>Working from a standing desk inside Reagan Airport when news breaks of Max Scherzer's impending signing. It's a National Guy with the scoop—Scherzer to the Washington Nationals for seven years and $210 million. In the past couple years, the term "mystery team" has been popularized—national insiders floating out unnamed teams to further a player's market value as a favor to the agent.</p>

<p>So, I chase down the mystery team—despite Dombrowski's insistence all winter, the Tigers were not a serious player to re-sign Scherzer.</p>

<p>I treat this two-alarm fire like a four. I text Dombrowski after I fasten my seatbelt on the plane, asking indirectly if they were the mystery team: "Was the team engaged in talks with Scherzer at the end?" I send a text message and an email: "Doubling up via email because I'm taking off for a flight soon." There is adrenaline. He gets back to me while we taxi the runway—"No"—and I tweet it out while we hit the air.</p>

<p>The extra effort pays off: When I get onto Wi-Fi, I see that Ken Rosenthal retweeted me.</p>

<p>When I land, I pick my car up from short-term parking and I stop at my buddy's house to hang with him and his pops for a bit. We're watching late-nite TV when I get a tip, a direct message on Twitter from a guy who used to work with my mom and apparently knows one of the player's wives, who posted on Facebook that longtime fan-favorite utilityman Don Kelly has signed with the Miami Marlins.</p>

<p>I know Kelly. I have his number. To my scoopin' surprise, he confirms it's true. I ask if I can use his name. Yep, to that, too. This is easy.</p>

<p>&nbsp;</p>

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

<p>&nbsp;</p>

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

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline"><em>February 24</em>—</span>Awakened by news that Joba Chamberlain, a big boy reliever with a bushy beard, has been spotted in TigerTown. This was reported by Ken Rosenthal on Twitter at 6:44 <span class="small-caps">A.M.</span>, while I was fast asleep.</p>

<p>It's been more than three months now and still I have few sources. PR, nothing. Dave Dombrowski, nothing. Today, I'll even bother Jim Leyland, who currently serves Dombrowski as a special assistant, and almost assuredly does not have the information I'm seeking.</p>

<p>"Do you know anything about this Joba signing?"</p>

<p>"No."</p>

<p>During Chamberlain's return, as I offer my recorder into the scrum, I look past the player and lock onto a guy standing near the clubhouse entrance. The guy is talking to a pitcher I can't quite recognize. Backwards hat, baggy-ish clothes and beams like a guy I should know—a guy who might know a thing or two.</p>

<p>I may have seen this guy once or twice earlier in the spring, but now it seems like I'm noticing him here every day. Afterwards, I make it a point to introduce myself and—as my intuition would have it—we vibe like I figured we would.</p>

<p>We exchange numbers. Of course he can get me some, just let him know. Introducing my new favorite friend—we'll call him Gator.</p>

<p>&nbsp;</p>

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

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline"><em>February 26</em>—</span>On the back fields, I get a text message from someone at MLB Network, asking if I have time to come on television today. Immediately, I head back to the hotel to change into a shirt, tie and jacket. I've never been on TV like this, and I'm certifiably nervous—so I take swigs of apple-flavored whiskey when I get back.</p>

<p>It is sweltering as I stand on camera—mid-eighties, and my right hand is sweating so much the microphone keeps slipping to the side. The on-site producer must turn it straight twice. I stumble over words badly at least once, but overall, I survive. MLB Network… hey, now!</p>

<p>I go back into the clubhouse—shirt and tie and jacket and still sweating, scrambling to get some last-second quotes for my newspaper day job, but also probably to let 'em know I was just on MLB Network. I apologize to one player for staying late to answer questions—catcher Alex Avila, whose dad, Al, is Detroit's assistant general manager.</p>

<p>Soon enough, back field activities will conclude with a couple days of live batting practice. Future scout friends from opposing teams will start trickling in, starting their season-long coverage from this sea of gravel stones.</p>

<p>In live BP, hitters and pitchers face off for the first time. The customary batting practice cage around home plate remains. Live BP is the last step of a player's thawing out process before the real baseball begins. It is also the most hated, despised universally—but by hitters especially.</p>

<p>Consider: These guys haven't faced a real-life pitcher for five months. They all throw in the mid-nineties these days, and the guys they're facing are teammates. Those guys aren't used to confrontations like this, facing live pitching from inside the cage. With early camp rosters comes a very assorted mix of talent, age and experience, adding an uneasy unpredictability.</p>

<p>But live batting practice is a necessary evil. Pitchers can now throw semi-competitive pitches. Hitters largely use these offerings to re-train their eyes.</p>

<p>There is adrenaline, excitement and pressure to impress the team's decision makers, who are always watching, always evaluating. A few of them, including Dave Dombrowski, look on from the tower.</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline"><em>March 18</em>—</span>Working hard at spring training again, lounging around with the Tiger Beat at a picnic table outside the clubhouse. We're waiting for the manager to arrive for his media session when an unmistakable voice hollers out from above.</p>

<p>"Hey, Frenchy…"</p>

<p>Nobody calls me Frenchy except Leyland. He is standing on the balcony above, leaning over the railing and smoking a cigarette outside of Dombrowski's office. Leyland is wearing shorts, shoes and no socks.</p>

<p>"Hey Frenchy. Looks like it's time for some new undies… whaddaya say, Frenchy?"</p>

<p>Even at seventy, from that faraway view, can't get nothing past the ol' skipper. Leyland can spot the big hole in the back of my boxers, bunched up and visible to the masses as I sit hunched over at the table.</p>

<p>After the session, Leyland comes down to join us before today's workouts begin. Soon, the Most Popular Boy of Perrysburg, Ohio's 1962 senior class is holding court again.</p>

<p>&nbsp;</p>

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

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">DUNEDIN, Fla., <em>March 27</em>—</span>Panic at the ballpark when Justin Verlander leaves the game after the second inning.</p>

<p>Verlander was scheduled to throw four innings in his second-to-last spring outing.</p>

<p>The team announces right triceps discomfort. Expected to make next start. Afterwards, Verlander chalks it up as no biggie. He wonders if it wasn't the coffee he drank before. (It wasn't.)</p>

<p>Verlander won't make his next start—he doesn't pitch again until June.</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">LAKELAND, Fla., <em>March 28</em>—</span>I arrive to the clubhouse, taking up surveillance. One eye on Verlander's locker at all times.</p>

<p>When he shows up, I give it a second or two—then pounce.</p>

<p>How's he's feeling?</p>

<p>"Can you let me get dressed?"</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">CLEARWATER, Fla., <em>March 29</em>—</span>Standing in the hallway of the visitors' clubhouse when head trainer Kevin Rand calls me over.</p>

<p>"Can I offer you some advice?"</p>

<p>When a player is coming into the clubhouse, especially if they're dealing with an injury, don't walk up to them right away with questions about it.</p>

<p>Obviously, I knew what Rand was talking about. I just knew a potential injury to Verlander was a big deal, and I didn't want to get beat on it.</p>

<p>"I'm not trying to be mean about it. I'm just looking out for you."</p>

<p>Regardless, all I did was my job. I walked up to the team's star pitcher and asked him how he was feeling after an injury forced him to leave the game yesterday.</p>

<p>&nbsp;</p>

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

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">PITTSBURGH, <em>April 13</em>—</span>First away series and I'm road tripping with my buddy on the Ohio Turnpike. We're staying at the team hotel. I forgot to book; the traveling secretary bailed me out.</p>

<p>Sports editor says it's fine to stay there, but not at the team rate. He doesn't want the <em>Freep</em> taking favors from the team. He'll let it slide this time but don't do it again.</p>

<p>The first night, we go to dinner at Hyde Park. The Tigers' coaching staff is in the back room having dinner. I feel vaguely like a stalker when they filter out.</p>

<p>Brad Ausmus is first.</p>

<p>"How ya doing, Anthony?" A pat on the back. Buddy is impressed.</p>

<p>We go up to Mt. Washington for a couple of beers, a neighborhood far above the Pittsburgh skyline—so far it takes an incline to get straight up the cliffside. We're still that high when we get back to the team hotel and run into players waiting at the elevator bank. It's awkward as you'd imagine. Let's just say nothing and pretend like it didn't happen.</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline"><em>April 15</em>—</span>At the park early today, where Justin Verlander is throwing a simulated game—he's even simulating the national anthem, standing with his hat over his heart.</p>

<p>Today is also Jackie Robinson Day.</p>

<p>We talk to David Price about the dwindling number of black players in MLB. Price believes we're only here talking to him about it because it's Jackie Robinson Day.</p>

<p>"Won't hear about this again until next year."</p>

<p>He's not wrong.</p>

<p class="scene-break"><span>***</span></p>

<p>&nbsp;</p>

<p class="flashback-header">EMBARRASSING FLASHBACK</p>

<p>&nbsp;</p>

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

<p>&nbsp;</p>

<p class="scene-break"><span>***</span></p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">DETROIT, <em>April 22, 2015</em>—</span>Two weeks later, Joe Nathan is injured again.</p>

<p>Pitching an injury rehab outing at Triple-A tonight, Nathan throws only ten pitches before exiting the game. The team holds off on providing an update until tomorrow—never a good sign.</p>

<p>Ever the rookie, I ask another stupid question.</p>

<p>"Can I text him asking, 'What happened?' or is that like, insensitive to the situation?"</p>

<p>Marly Rivera explains: "No, the opposite—text him and ask him how he is feeling. It's not insensitive—you ask like you do care. Be open about it, something like, 'Heard you had to leave your rehab start'—then ask him how he feels."</p>

<p>Nathan doesn't respond.</p>

<p>&nbsp;</p>

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

<p>&nbsp;</p>

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

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">SEATTLE, <em>July 8</em>—</span>I sit in the dugout today with J.D. Martinez for a feature story to chronicle his breakout year. I explain my angle—I want to highlight the work his personal hitting coach has done with him, but I want to keep the coach anonymous. I'll call him the Mysterious Hitting Guru.</p>

<p>J.D. says he doesn't want to say anything about him until he gets paid and doesn't want to rub his hitting coaches the wrong way by potentially giving someone else credit for his success.</p>

<p>He didn't explicitly say do not talk to this guy.</p>

<p>I am equal parts inexperienced and undeterred. Before taking off in Seattle, I ask one of Boras' guys about the Mysterious Hitting Guru.</p>

<p>"Ask Scott… see if he's got any ideas."</p>

<p>By the time I land in Minneapolis, the search is over.</p>

<p>"Scott said try Craig Wallenbrock."</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">MINNEAPOLIS, <em>July 9</em>—</span>I got through to Wallenbrock and gave him the spiel. Feature story on J.D. l'll conceal your identity—the Mysterious Hitting Guru.</p>

<p>He gives no promises, but says he'll talk to Martinez. Up to him. I was actually feeling pretty good about it until I got to the stadium and was summoned for a chat with Tigers PR.</p>

<p>Now I've got a disgruntled subject, and the story is up in the air.</p>

<p>"J.D. doesn't want to talk to you," media relations manager Aileen Villarreal said. "He told you not to talk to that guy."</p>

<p>I try to clarify, but it doesn't get far—Martinez didn't say <em>not</em> to talk to Wallenbrock, he said he didn't <em>want</em> me to talk to him. We're soon arguing semantics. Yes, I understand. But I'm a journalist: talking to people who others don't want us talking to is part of the job.</p>

<p>Martinez sits down to finish the interview but doesn't change his tune.</p>

<p>"I still think it's bullshit."</p>

<p>We agree to disagree.</p>

<p>&nbsp;</p>

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

<p>&nbsp;</p>

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

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">DETROIT, <em>July 17</em>—</span>Back from the All-Star break, I get an email from a guy with the Christopher "Mad Dog" Russo radio show, asking for availability to talk Tigers.</p>

<p>Soon, I'll be on SiriusXM Channel 144 with the Mad Dog—one of the most notorious loudmouths on the national sports talk scene. Russo worked for New York's WFAN for nearly twenty years before making the full-time jump to baseball, where he currently hosts a daily show, <em>High Heat</em>, on MLB Network.</p>

<p>But as the interview wears on, things get weird.</p>

<p>"I'm also reading that you got drunk and ran your car into another, into a PT Cruiser, is that correct, and flipped it over. I mean, how do you flip—Anthony, how do you flip a PT Cruiser? Is that true?"</p>

<p>My jaw drops. I am on satellite radio with Mad Dog, and he just hit me with that?</p>

<p>Hanging up, I realize I've been hood-winked. It won't take long for Internet Stalker's sports media terrorist group to claim responsibility. Apparently, I was speaking with someone named Sour Shoes from the Howard Stern Show. The prank call is on the Internet now.</p>

<p>&nbsp;</p>

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

<p>&nbsp;</p>

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

<p>&nbsp;</p>

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

<p>&nbsp;</p>

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

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">WASHINGTON, <em>August 3</em>—</span>I take the train from Baltimore after today's series finale to see my little brother in D.C. for the day, having written a column saying Dombrowski should receive a contract extension. It expires at year's end. My argument is twofold: you can't find a better general manager than Dombrowski, and he's already made trades with an eye for the future.</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">DETROIT, <em>August 4</em>—</span>I see a newsstand in the airport, today's <em>Free Press</em> and the banner on Page 1A. <span class="small-caps">JOB 1: EXTEND DOMBROWSKI</span>. Underneath: <span class="small-caps">KEEPING TIGERS GM IS CRUCIAL TO REBOOTING, REJUVENATING THE TEAM—ANTHONY FENECH, 1B</span> <span class="media-emoji" data-media-id="dombrowski-extension">📰</span></p>

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

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">ROUND ROCK, Texas, <em>August 13</em>—</span>I fly to Texas a day before the Tigers, taking a pit stop in suburban Austin to spend the afternoon at Seamhead's retirement digs. The place is very John Lowe—many bookshelves, minimal decor—down to the Wi-Fi password: 18741874, signifying Sir Winston Churchill's birth year.</p>

<p>Seamhead is a Churchill enthusiast. He introduced me to him years ago.</p>

<p>There are two bookcases and a small flatscreen. On the TV, a recent documentary on Buck Showalter's baseball life is paused.</p>

<p>We watch portions of that show, and John shares his favorite Showalter stories. He still talks to baseball's most-tenured managers, both active and retired—Francona, Gardenhire, Leyland, even Showalter. Such conversations should be preserved for Cooperstown one day.</p>

<p>Grabbing lunch at the world-renowned Salt Lick BBQ, he gives this piece of advice while I wolf down mac and cheese: He suggests I place a call to Dave Dombrowski.</p>

<p>John notes Dombrowski's stature in baseball. But his suggestion is not only because of who Dombrowski is—he explains that it stands for any source, be it general manager, area scout or clubhouse guy. It's an opportunity to further your working relationship with a personal touch—after years of calling this person for information, now you are reaching out in non-transactional fashion.</p>

<p>Hitting the road to Houston, I heed Seamhead's advice and call Dave. Just calling to check in. See how you're doing. We chit-chat for five minutes, rekindling our relationship.</p>

<p>"Thanks for the call, Anthony."</p>

<p>"I'll keep in touch, Dave."</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">HOUSTON, <em>August 15</em>—</span>It's my first free continental breakfast as a Hilton Honors Gold Member, an achievement I've been chasing since the spring. I pick up a copy of the <em>Houston Chronicle</em>, but the sports section is missing.</p>

<p>At the park, I introduce myself to Matt Boyd, one of the pitchers received in return for David Price, and I pick marijuana as common ground. Boyd hails from Seattle, where weed is legal. I break the ice talking about my favorite place—Uncle Ike's Pot Shop.</p>

<p>Boyd doesn't give much of a reaction, but later he tells Tigers PR.</p>

<p>I don't find this out until the offseason, when I met with my assistant sports editor, after he met for an annual coffee with communications VP Ron Colangelo and media relations director Aileen Villarreal.</p>

<p>Apparently, it made Boyd uncomfortable.</p>

<p>In retrospect, it was an unnecessary icebreaker. But I am who I am, and Matthew Boyd is who he is—someone I'll come to learn has never smoked weed in his life.</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">CHICAGO, <em>August 18</em>—</span>First time at historic Wrigley Field, which opened in 1914 and presents horrible working conditions for Ball Writers.</p>

<p>The second-oldest stadium in baseball has no air-conditioning in the press box, which is the smallest in baseball. The closet-sized restroom has one urinal and one stall. There is one elevator, way out in left field. At Wrigley, we fight crowds walking down from the press box to the clubhouses. Everything is small and congested. It's a beloved stadium with ivy on the outfield walls, but it's a nightmare for the working press.</p>

<p>In the opener of a two-game set against the Chicago Cubs, the wind blows out to left field, toward Lake Michigan. There have been twice as many home runs (4) as innings played (2) when Big News drops from Boston. Dave Dombrowski has a new job.</p>

<p>A couple innings later, I scurry out of the press box—Dombrowski is calling. I scribble quotes from the Red Sox president on the back of a print-out scorecard.</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">KANSAS CITY, Mo., <em>September 1</em>—</span>Let me formally introduce my competitors on the Tiger Beat. There's Rival Cohort Chris McCosky from the <em>Detroit News</em>, Jason Beck from MLB.com, James Schmehl from MLive.com and most recently, Katie Strang from ESPN.com.</p>

<p>I was told to watch out for Rival Cohort, but we've held up without animosity so far. Beck, in his twelfth year covering the team, is a soft speaker who is very punctual. I get along particularly well with Schmehl, who is closest in age.</p>

<p>Strang joined us last month, moving from the National Hockey League beat to baseball while ESPN goes through a hyperlocal journalism phase, trying to build sites for every major sports market. She comes to the party with 75,000 Twitter followers. I only have 7,329.</p>

<p>We went out for beers downtown last night. Strang isn't moving from hockey to baseball by choice, so she might not be here long. But she's good at her job, and I'm not thrilled with that, to be honest.</p>

<p>&nbsp;</p>

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

<p>&nbsp;</p>

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

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">ARLINGTON, Texas, <em>September 27</em>—</span>Sweating out the final week of the season. Six to go.</p>

<p>I'm writing about catcher Alex Avila, son of the team boss. Avila, twenty-eight, is a free agent in the offseason. With the team ready to hand the reins to James McCann, it's unlikely he returns.</p>

<p>The story about Alex is a positive piece—lifetime ties with the organization, growing up as a team official's son, soon to fly the coop. We talked last weekend, and I spoke with his wife. A couple days ago, he reached out, asking if he could read the story before it goes out.</p>

<p>This is a big no-no—against the Journalism Ethics we live by. But the world we live in is nothing if not gray…</p>

<p>"I really shouldn't."</p>

<p>But I do.</p>

<p>I see greater long-term pay-off by building trust with Alex than I do by acquiescing to rules that should be applied on a case-by-case basis.</p>

<p>He doesn't take any editing liberties. He thanks me for writing it.</p>

<p>&nbsp;</p>

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

<p>&nbsp;</p>

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

<p>&nbsp;</p>

<p>Lingering in the clubhouse to see who I've missed; I feel a lump building in my throat. It's not the phone numbers and email addresses scribbled in my spiral—it's the years' worth of work that went into building the trust to get them.</p>

<p>With nearly everyone checked off my list, I try to find Víctor Martínez. Even as he struggled this year, Martínez's locker space was always open, a safe haven for a rookie Ball Writer. Martínez hit a career-low .245 with a shell of yesteryear's power. He turns thirty-seven this winter.</p>

<p>With Big Víctor nowhere to be seen, I walk up to Little Víctor and ask where his dad is.</p>

<p>"He's in the back. He's not feeling good."</p>

<p>I ask if he can tell his dad I said thank you for the help this year. I give him a fist bump—see you next year.</p>

<p>"See ya, Anthony."</p>

<p>Walking out of the clubhouse, I bubble with proud emotion. I pull into the restroom and put myself together.</p>

<p>I write my stories slowly, the final Ball Writer to file out of the press box. When I leave, I take the elevator to the concourse. I walk around the emptiness of the half-lit stadium, staying in the last moments of my only rookie year as long as I can.</p>

<p>&nbsp;</p>

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

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">DETROIT, <em>November 18</em>—</span>Pulling double-duty, covering basketball practice when the top National Guy rears his ugly head again: They're closing in on a trade with the Brewers for All-Star closer Francisco Rodríguez, according to Ken Rosenthal.</p>

<p>Nothing back from the Milwaukee guy I met last week. Neither do my other so-called sources. Soon, the team announces the trade, and nothing is left to confirm. Meanwhile, I'm trying to cover two sports at the same time—dialed into a baseball conference call as basketballs rap around the Pistons' practice facility during coach Stan Van Gundy's post-practice scrum.</p>

<p>Tigers PR: "We picked you up asking a question to Van Gundy on the call at the end. Was very strange."</p>

<p>&nbsp;</p>

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

<p><em>"Dear Anthony: I have read your letter and must tell you what a good printer you are. You can start getting ready to be a hockey player (Red Wing) by 1. Eat good food, get exercise, and get a lot of sleep, because hockey players have to be healthy. 2. Listen to mom and dad, because hockey players need discipline. 3. Study hard when you go to school, because hockey players have to be smart. 4. Learn to skate and practice a lot, because hockey players need to be excellent skaters. You do all of the things I listed above and then write me another letter and let me know how you're doing when you start playing with a Mites or Squirt team. Thank you for your letter. Sincerely yours, Michael Ilitch."</em></p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">NASHVILLE, <em>December 6</em>—</span>Back at the winter meetings. This year, I took the advice I was given and come prepared. If the writers don't love me already, maybe they're going to love what I brought inside my garment bag.</p>

<p>This year's extravaganza is at the Gaylord Opryland Resort, a sprawling indoor city twenty minutes from the honky-tonk of downtown. When I arrive, I see Bob Nightengale and stick to him.</p>

<p>Nightengale, forty-six, is <em>USA TODAY</em>'s National Guy. He started as a beat writer in 1986, covering the Royals at the <em>Kansas City Star</em>, then went to the West Coast to cover the San Diego Padres and California Angels. He joined <em>USA TODAY</em> in 1998. I met Bob a few years ago in Arizona, where he lives. We become pals after postgame beers last year.</p>

<p>When I grow up, I want to become the Bob Nightengale of National Guys: Fun guy and skin-tight with the scouts. Bob is in touch with owners and has deep relationships in the game—which I don't. Not yet.</p>

<p>By midnight, I'm scooped again. My team is "closing in" on reliever Mark Lowe, according to Seamhead Jerry Crasnick. I run into him after having a cigarette with a couple of New York writers and ask the ESPN.com senior writer if he's got a contact for Lowe's agent, former player Jeff Frye—whom he probably got the scoop from. For whatever reason, Crasnick shares it. Frye doesn't answer.</p>

<p>I wallow away in my room, writing up another breaking story I can't confirm.</p>

<p>&nbsp;</p>

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

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline"><em>December 8</em>—</span>The annual Baseball Writers' Association of America meeting is bright and early. Writers have crammed into a conference room, where issues are debated and voted on, Hall of Famers are revealed, and various organizational topics are tackled.</p>

<p>This is the profession at its nerdiest. We argue about Hall of Fame vote transparency, cry over the loss of clubhouse time, and question the standards of membership eligibility. We loathe losing access and complain about crappy PR treatment.</p>

<p>But today is a big day for the BBWAA. Results of a recent vote are revealed and MLB.com writers are now eligible for membership. Previously, MLB.com writers were barred to ensure the BBWAA's journalistic integrity—MLB.com writers are employed by MLB Advanced Media and operate as an arm of the league. That can create conflicts of interest.</p>

<p>Every team has an MLB.com beat writer whose coverage is featured on the team's official site, and it stands to reason certain stories could be discouraged. The site serves as a promotional vehicle—buy tickets, jerseys and autographed dirt from the field here.</p>

<p>A newspaper story about a player's domestic violence accusations probably won't make it onto the website. Team turmoil and selling tickets don't go together. The sites are there to make money—and negative stories don't help.</p>

<p>This isn't to say my MLB.com cohorts can't be trusted. Most have a newspaper background—as the industry has spiraled, many jumped to the more secure and money-making MLB.com. I, too, once worked for MLB.com as an associate reporter and can't remember an instance of dictated coverage. But the arrangement is awkward, as evidenced by the disagreements. People turning on the people they sit next to 120 days a year.</p>

<p>Someone makes a good point about the built-in advantages league-affiliated writers have in breaking news, but I'm over it. I need some water in the worst way, so I walk out. I voted no.</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline"><em>December 9</em>—</span>ALERT!</p>

<p>Al Avila's afternoon media session has been pushed back, according to Aileen. This usually means a trade is near.</p>

<p>I know nothing of the sort. Those who do aren't responding.</p>

<p>Once again, a friend helps. This time, it's ESPN.com's Marly Rivera who helps piece together that the Tigers have been pursuing lefty reliever Justin Wilson, according to her source.</p>

<p>That's as close as I come to the scoop. An hour later, the trade is broken by FOX 2 television reporter Jennifer Hammond, who isn't even on the scene—Wilson to the Tigers, two prospect pitchers to the Yankees. At 6 <span class="small-caps">P.M.</span>, it's Villarreal again: "Come now to suite."</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">ZZYZX, Calif., <em>January 15, 2016</em>—</span>I learned many things my rookie year on the beat. Don't overdrink the night before Getaway Day. Always sit with scouts while eating dinner and double-check email addresses. Keep a backup keyboard in your work bag.</p>

<p>Today, I'm re-learning a hard lesson: Don't travel on arbitration day.</p>

<p>Last year, I was lost in the shuffle of a busy train station, beaten on the biggest arbitration deal ever. This year, I'm on the highway, 1½ hours outside Las Vegas, foolishly driving a rental car with one hand. My other hand is texting sources, checking Twitter and searching for the next exit. I've been beaten twice. According to Jon Heyman, the National Guy who breaks arbitration deals with superhuman ease, <em>two</em> deals are happening.</p>

<p>At 2:46, Heyman reports lefty Justin Wilson has agreed to terms. Four minutes later, another one: <em>Tigers, Iglesias settle at $2.1M plus performance bonuses</em>.</p>

<p>At Denny's, I write a catch-up story, angry again. Angry at annoying editors, who ping every time I get beat—as if I don't already know. Angry at my sources, who are nowhere to be found. Angry at the agents, for not thinking about me first.</p>

<p>Angry because I've painstakingly contacted the agents for these arbitration players. I spoke with all but one agent at the winter meetings. I called Jose Iglesias' agent a week ago—we talked for twelve minutes. Angry at Al Avila—I thought we made real progress in the offseason. Last week, he said, "Text or call me whenever you need anything." Angry at Jon Heyman—<em>how</em> is he doing this?</p>

<p>After breaking seventy-nine arbitration deals last year, Heyman will up the record to eighty-four this year. To outsiders, this is what a baseball insider looks like—well-connected, probably cooped in an office working the phones like a coked-out penny stockbroker. But to an insider, Heyman's reporting is beyond the realm. Inexplicable, how Heyman churns a running scroll of scoops like that—minute-by-minute, exact figures, star players and small. When the 4 o'clock deadline passes for teams and players to exchange figures, The Heymachine spits out numbers: <em>Tigers file at $6M, J.D. Martinez at $8M</em>.</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">TORONTO, <em>January 18</em>—</span>I flew to Detroit from L.A. last night, then to Toronto this morning. It's now almost two and I still haven't left the airport. I've been at customs since eight this morning.</p>

<p>The officer had called me to the window and asked why I was coming to Canada. I was honest: My roommate from college works at a PR firm that's hosting a Molson event tonight with an ice rink at the top of a skyscraper. He asked how long I planned on staying. Tomorrow. That was it.</p>

<p>He told me to sit in one of the blue chairs, called me up again a few minutes later and said I wasn't allowed in the country. Canada doesn't permit DUI offenders for ten years. It's only been eight, in my case.</p>

<p>So… customs escort me to a flight home. When I arrive, I'm punched in the face by breaking news. Another big signing.</p>

<p>&nbsp;</p>

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

<p>&nbsp;</p>

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

<p>&nbsp;</p>

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

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>February 21</em>—</span>While walking the aback fields, I try to block out the construction sounds of real-life Tonka trucks and follow the sound of bat cracks I hear in the distance.</p>

<p>The sound becomes more familiar the closer I get—Víctor Martínez is in the batting cage.</p>

<p>Martínez walks out afterward: Towel on shoulder, bats in hand, sweat-soaked face. Walks straight by me. No eye contact. Something is wrong. I trail happy-go-luckily along, and Martínez becomes a barking dog.</p>

<p>"Go away! Go! Go!"</p>

<p>With his foot speed diminished—Martínez ranked as the slowest player in baseball last season, at 23.2 feet per second—I keep up with ease. Trying to get to the bottom of things, he cuts me off.</p>

<p>"I saw what you were saying on TV. No power, nothing this, nothing that. Always talking shit."</p>

<p>Over the winter, I went on MLB Network and was asked whether the Tigers could count on his power swing returning after he hit only eleven home runs last season. "No, they can't," I said. "Víctor is about to be thirty-seven, and he's shown signs of decline. While they can count on Víctor hitting for a high average, I'm not sure the power will return."</p>

<p>Martínez isn't in the mood for my defense. "Away!" he shouts. As Víctor walks off, a security guard runs up.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>February 22</em>—</span>Spring training is the leisure season. For established players, there is minimal pressure. Games are exhibitions, so nobody loses. Optimism intoxicates the air, and eternal wonderment rubs off on Ball Writers, too.</p>

<p>This is the year. They're gonna win the World Series, I tell my buddy, and I'll write a book about it. Working title: <em>Roar Restored—Inside the Jungle with the Detroit Tigers</em>.</p>

<p>The book begins on the back fields. On a turf field named after Ty Cobb, manager Brad Ausmus addresses his players.</p>

<p>Before batting practice, Kirk Gibson reacquaints himself with Justin Upton. Miguel Cabrera warms up with a weighted bat. Al Kaline is standing behind the batting cage.</p>

<p>Upton's father Manny is bouncing around the dugout, starstruck after meeting Mr. Tiger.</p>

<p>"I came here to see him. Royalty."</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>February 23</em>—</span>There is a lighter feel in Lakeland this spring. Although Al Avila worked alongside Dave Dombrowski for almost two decades, in his first spring training on the job, Avila is running his ship in stark contrast to the past. Under Dombrowski, the front-office staff was buttoned up—working diligently but not without fear. He was the boss, not a friend, and club-media relations were separated by a thick black line.</p>

<p>Tonight, Avila invites the Tiger Beat to a barbeque. We arrive at a huge house and find out the living room is half of a basketball court. Wood floors, lines on the court and a professional-grade hoop suspended from the ceiling. The court opens into the kitchen, where there are plenty of finger foods, drinks of all kinds, and a huge party sub from Publix.</p>

<p>Ball Writers, front officers and PR. Breaking bread, boozing and playing basketball under the same roof. A three-on-three game begins. I'm not playing. I'm sitting at the table with two Tigers Guys, texting beat mate George Sipple: "They're having a BBQ. It's one big social experiment. Awkward as hell. But it might just be me, though."</p>

<p>I treat this experiment the way I treat all social gatherings and general moments of awkwardness: I grab a beer. Soon, I'm explaining the auction mechanisms of my fantasy league to the real-life baseball folks. I seek scouting opinions on my players. The basketball game is still going. People are sweating when I see Avila step outside.</p>

<p>The mansion backs up to a man-made lake. It's outlined with palm trees inside a gated community with a golf course, country club and million-dollar houses. The Tigers' team travel guy is renting the house for the spring.</p>

<p>"You could get used to a view like this," I say. Al Avila is out having a smoke. He offers me a cigar. Never smoked one.</p>

<p>Avila shows me how to cut it. As I struggle, he brings out a pocket-size blowtorch and lights the cigar himself. As I cough, he tries to explain how to smoke it without inhaling.</p>

<p>"Stop smoking it like a joint."</p>

<p>We talk about anything except baseball. About Catholic schools, Donald Trump, and not being golfers. About his family and this girl who is coming to see me. The Highest Source In The Land says things to the Ball Writer he really shouldn't. We don't know each other like that. Yet as we stand here clinking our glasses, it feels as though we could.</p>

<p>&nbsp;</p>

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

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>March 13</em>—</span>Although Opening Day is still three weeks away, our season preview section is slated for two days before. That makes the drop-dead deadline for my big feature story eighteen days—and I still don't have a subject for it when I'm forwarded this email.</p>

<p>Subject: FW: Kate Upton - Grand Slam Adoption Event</p>

<p>It's a press release for an upcoming dog-adoption event hosted by supermodel Kate Upton and her boyfriend, Justin Verlander, forwarded by our entertainment reporter.</p>

<p>"Another chance to talk to Kate?" sports editor Kevin Bull wonders.</p>

<p>For years, the media have sniffed around the famous couple. It was well-known not to ask Verlander about the topic—years ago, he pulled a group of beat writers aside and kiboshed any questions now or in the future.</p>

<p>I've never written a profile on Verlander, the Tigers' franchise pitcher. There's an easy angle there—after finishing last season strong, he looks primed for a comeback.</p>

<p>I start by emailing Verlander's parents, telling them I'm writing a feature on Justin and asking if they were going to be at his start today.</p>

<p>"Sounds good," his father says. "How about tomorrow morning?"</p>

<p>When I talk to his parents around the corner of the clubhouse during batting practice the next day, I ask them what story about him hasn't been told. Soon enough, they're talking about how he's happier these days, how the biggest difference in his life has been his girlfriend, and I'm calling out bingo.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>March 26</em>—</span>Cracking Verlander's code proves a tougher task.</p>

<p>With the days before my April Fool's Day deadline dwindling, I have yet to interview the subject of my story and I'm going to Gator for some good juju.</p>

<p>"I gotta put the full court press on Justin today. When I give my sales pitch, can I drop your name, like, 'Ask G about me?'"</p>

<p>Gator resides in Verlander's inner circle, like he seemingly does with every player. Last month, he attended the surprise birthday party Upton threw for Verlander in Orlando.</p>

<p>"The article is all positive stuff, right?"</p>

<p>"Yeah, definitely. I'm just thinking about if I need to give him some more peace of mind. He's protective of his image."</p>

<p>"I don't mind if you want to say, 'I've known Gator for two years, he knows my character, and I know he's a friend of yours.'"</p>

<p>When I talk to Verlander later about getting some time, I suggest we meet at Starbucks and ride to the park together.</p>

<p>"I don't do that kind of stuff."</p>

<p>&nbsp;</p>

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

<p>&nbsp;</p>

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
        subtitle: "Washington, Baltimore, Anaheim, Blue Springs, San Diego, Detroit, Chicago, Arlington",
        teaser: "Manager Brad Ausmus fights to save his job as the Tigers stumble.",
        content: `<p class="has-dateline"><span class="dateline">WASHINGTON, <em>May 8</em>—</span>By the time I check into my hotel room, there's a wild rumor circulating and an urgent alert from the web desk to chase it.</p>

<p>The rumor was originated by Internet Stalker's longtime sidekick—a wannabe somebody who minors in trolling me online. We'll call him Internet Scrub. Tonight, Scrub proclaims big news: "Jim Leyland is expected to be formally offered the job as Tigers manager tonight. Mike Ilitch bypassing his GM, calling personally." Scrub is "100 percent sure." Despite protesting his lack of credibility and telling my boss I don't want to bug the Highest Source In The Land with this bunk, I follow marching orders.</p>

<p>On a Sunday night, no less. HSITL has asked me to never call him on Sundays.</p>

<p>I text instead after 10:20: "I know it's a Sunday night, but I gotta reach out about this… There is a report out there that Mr. Ilitch is calling or called Jim to offer him the job tonight. On the record, can you say if that is true?"</p>

<p>"No. That's preposterous. Anthony, I am already in bed now buddy."</p>

<p>"Ok, I apologize. So, if I'm forced to write something, can I use your denial?"</p>

<p>He must've fallen asleep.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>May 9</em>—</span>After posting a winning record in April, Detroit is nose-diving in May. They arrive in D.C. on a six-game losing streak. Five weeks into the season, the $200 million team is under .500 and struggling to show life. Ausmus has lost fan support.</p>

<p>On MLB Network, Mad Dog asks if Ausmus is on the hot seat.</p>

<p>"There's only so much a manager can do. At some point, the players have to perform."</p>

<p>As a beat writer, it's risky business to put the manager in the crosshairs—traditionally, it's not in the job description to opine on such matters and doing so could make for uncomfortable quarters going forward.</p>

<p>In the clubhouse afterwards, quality control coach Matt Martin pulls me aside.</p>

<p>"Good job on TV today. Brad saw it, too, and he appreciated it."</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>May 11</em>—</span>Caught in a downpour walking to the ballpark. Absolutely soaked. Víctor Martínez does me a solid, offering a spray of fine cologne.</p>

<p>The losing streak was snapped last night, but tonight the Tigers face Max Scherzer.</p>

<p>It was not the night.</p>

<p>Scherzer goes berserk, striking out twenty batters in a complete game win over his former team—the fifth 20-K game in baseball history. He's the story, so I go to the service-level press conference room for his comments. Scherzer soon walks on stage, ice wrapped around his right arm. The rest of the media members are still inside the clubhouse, and etiquette says we can't start until they arrive.</p>

<p>Waiting awkwardly for the others, someone in the back snaps the silence, asking Scherzer if he thought he had a chance at twenty strikeouts.</p>

<p>"I <em>knew</em> I had a chance."</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>May 12</em>—</span>Running late to the train, I'm cold-cocked with a call from my sports editor, who says a top prospect is coming up—can you write about it? I'm in a cab, but sure, and start pecking away on my phone.</p>

<p>I ping a sports writing pal who recently graduated from the beat grind to a fancy features job at some magazine. "If you ever hear of a job like yours, let me know… I'm burning out."</p>

<p>It's my second season.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline">BALTIMORE, <em>May 13</em>—</span>The Tigers are shut out again tonight, and experienced reporters are starting to read the tea leaves. Walking out of the clubhouse after the loss, ESPN.com's Katie Strang asks if I heard what Ian Kinsler said.</p>

<p>I don't know what she means at first. Kinsler answered questions short and serious, like he does. When asked about Ausmus' job status, he said, "I don't think about that. I don't care about that. I don't care about anything except getting a win."</p>

<p>That's Strang's point. Kinsler, an eleven-year veteran, knows the weight his words carry. He could've given Ausmus a <em>vote of confidence</em>, put the blame on the players or said it's not the manager's fault.</p>

<p>"He said nothing."</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>May 14</em>—</span>The roller coaster continues. Detroit has dropped three straight and nine of the last eleven. A Tiger Beat colleague shares a scoop of his own—he's stepping down from his spot and out of sports writing entirely. His marriage is still intact, and he wants to spend more time with his wife and kids, maybe play some more poker.</p>

<p>The baseball beat is often referred to as the Divorce Beat and by now, I trust you see why. A great job for a guy who is single or wants to be. I try not to think about this: I am falling rapidly into a long-distance relationship with a woman in Washington, D.C.</p>

<p>In the press box at Oriole Park at Camden Yards, writers brave the most dangerous working conditions in sports journalism, threatened by high-speed foul balls at a second's notice.</p>

<p>Yesterday, Strang—who is pregnant—became the latest victim. She heads right back to her front-row seat tonight.</p>

<p>I sit as far back as possible. As a bonus, I'm next to an In The Room source—Tigers legal counsel John Westhoff is the front office liaison this trip. He shares a story tip, pointing at the friends and family seating section. "Over there is Warwick Saupold's mom."</p>

<p>Saupold is a rookie reliever from Australia. His mom mad-dashed here to see his debut—twenty-seven hours from Perth to Baltimore.</p>

<p>"Now that's a great story," Westhoff says.</p>

<p>I take him up on it, fishing her out of the family area after the game. I say hello to Justin's parents while waiting for the media elevator.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>May 15</em>—</span>Another loss last night, and with all apologies to Westhoff's idea and Saupold's mother, there is a more pressing story. Ever since Internet Scrub put out that 100 percent wrong information, my sports editor has been all over me, asking for a pre-written story in case Ausmus gets canned.</p>

<p>Instead, I went out drinking by myself. Late again to the press box today, I look down and see Katie Strang sitting in the dugout. I drop my things and head downstairs, practically sprinting through the concourse and hurdling the railing to crash her party.</p>

<p>With the manager on the hot seat, Strang arrived early and stationed herself here. As players and coaches stream past, bullpen coach Mick Billmeyer walks by.</p>

<p>"I don't have a good feeling about this week, guys. I just don't."</p>

<p>Tigers trail in the fifth when I wave Westhoff over to my computer. Making a mockery of journalistic integrity, I ask if he wants to edit my story. He slides his chair closer, squints at the screen and looks back in horror as I crack up: It's the pre-written story my boss asked for.</p>

<p>"Jerk."</p>

<p>Try as we may (again), the <em>Free Press</em> can't fire Brad Ausmus. Miguel Cabrera and J.D. Martinez go back-to-back in the eighth and the Tigers leave town with a managerial-saving win.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline">ANAHEIM, Calif., <em>May 31</em>—</span>Although I joke about it, this whole Internet Stalker thing is starting to take its toll. When I'm out with friends in Detroit, I feel under surveillance, carefully looking around. I don't text people back. I watch my surroundings before I speak.</p>

<p>It's a relief to get back on the road, this far from home. We're near Disneyland, where dreams come true. My dream has come true—I cover the Detroit Tigers. Yet I can't help thinking, more and more, be careful what you wish for.</p>

<p>Today, my dream has taken me into the visitor's clubhouse at Angel Stadium, where I'm in Miguel Cabrera's corner. Miggy sits at his locker.</p>

<p>Miggy, I have come to realize in proximity, is a man child. Signed out of Venezuela for $1.8 million at sixteen, he reached unspeakable wealth by his mid-twenties. He's been hailed for his generational hitting ability and handled accordingly since then—he's never done wrong, and nobody feels comfortable telling him otherwise.</p>

<p>Today when I stand in front of Cabrera, our roles are reversed. He is the interviewer. We have a small audience—reliever Francisco "K-Rod" Rodríguez is a few lockers to the left, Víctor Martínez is to the right and Jarrod Saltalamacchia is somewhere in between.</p>

<p>Cabrera asks something so inappropriate that it stops the conversation cold.</p>

<p>"No," I say immediately.</p>

<p>K-Rod, a fifteen-year veteran, shakes his head at Cabrera's behavior. Martínez stays silent, but Saltalamacchia makes an equally inappropriate comment encouraging the situation.</p>

<p>I offer Cabrera an editorial comment I know he'll understand. I point at myself. "Me—Grande," I say, pointing to him. "You—Pequeño."</p>

<p>PR calls the writers into Ausmus' office. I walk away, pretending to be unflustered. I look back and blow Miggy a kiss.</p>

<p>Livin' the dream.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline">BLUE SPRINGS, Mo., <em>June 15</em>—</span>Back on the Jim Harbaugh beat.</p>

<p>I'm assigned to arrive early in Kansas City this week—half an hour into the suburbs for one of Harbaugh's controversial satellite camps for high-school football players. Today, the Michigan football coach continues to expose a loophole in NCAA rules, which allow schools to host paid-for football camps across the country. These camps are angering rival coaches, who decry them as a sneaky scheme for additional in-person recruiting visits.</p>

<p>Harbaugh's wife is from Blue Springs, and I get in touch with her brother, John Feuerborn, one of Harbaugh's "trusted agents." He owns a couple bars in the area and speaks with a pinch of tobacco in his lip. During the camp, we hit it off. Afterwards, Harbaugh swims around questions from a radio reporter, who's fishing for a soundbite on the camp controversy.</p>

<p>I note Harbaugh's antsy answers, asking a leading question instead.</p>

<p>Harbaugh's eyes light up. Finally, a question he likes.</p>

<p>"Man, how much do you love football? You can just tell how much you love it out there."</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline">SAN DIEGO, <em>July 11</em>—</span>I come to this year's all-star festivities strictly for the airline miles. I meet my long-distance relationship love interest here and skip the futures game and the home-run derby. We go for dinner in the Gaslamp District. But I can't skip the All-Star Game itself—Miguel Cabrera's appearance is the reason the company spent thousands of dollars in travel to send me here.</p>

<p>I'm pleased to see Cabrera in a good mood during media time—we've been getting on well enough since his weird question. He welcomes my presence inside the American League clubhouse before the game, stepping out of a conversation with fellow stars to answer a few questions.</p>

<p>The two days off have done him good.</p>

<p>"Even one day off in the regular season helps a lot. I think four days will help a lot."</p>

<p>Miggy proudly shows off his custom Louis Vuitton cleats.</p>

<p>"Sweet, huh?"</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline">DETROIT, <em>July 15</em>—</span>When the regular season restarts after the All-Star break, the Tigers are in the thick of things. They begin the second half at 46-43, within striking distance of the division lead and two games behind a playoff spot.</p>

<p>Brad Ausmus has not been fired—the day after the Tigers hit back-to-back homers to beat Baltimore in mid-May, Ausmus was ejected for an uncharacteristic temper tantrum that he punctuated by throwing his hoodie on home plate. The team went on a run, winning eight of nine games to get back into the race.</p>

<p>After a few shaky starts, rookie righty Michael Fulmer has emerged as a potential top-of-the-rotation arm alongside Verlander. Fulmer, acquired from the Mets last year, has skyrocketed in value, becoming the midseason favorite for Rookie of the Year. Only twenty-three years old, Fulmer entered the break on a heater—in his last nine starts, he's 7-1 with an 0.63 ERA, limiting opponents to a batting average of .145.</p>

<p>Outside of a recent injury to Jordan Zimmermann, who was sidelined with a right neck strain on July 4, the veteran rotation has managed to stay relatively healthy. Justin Verlander has largely picked up where he left off last season, eating up quality innings and slinging upper-nineties fastballs late in the game.</p>

<p>Verlander opens the second half in the win column, dominating the Royals over seven innings at Comerica Park. Verlander strikes out ten batters, allowing one unearned run on four hits. July ends on an eight-game winning streak.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>July 25</em>—</span>At the <em>Free Press</em>, we're all Jim Harbaugh, all the time. Harbaugh gets the clicks. So, I'm staying another day in Chicago, complying with my sports editor's request to cover the Michigan football coach.</p>

<p>Big Ten football media days are being held at the city's convention center. I am on Harbaugh Watch, following him around the sprawling McCormick Place all day for a feature story. Apparently, Harbaugh has taken a liking to me after I wrote about his family last month at the satellite camp. I've kept in touch with an In The Room source close to Harbaugh, who could be of good use one day—you never know. The source owns a bar in Kansas City and invited me to visit the next time I'm in town.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline">ARLINGTON, Texas, <em>August 12</em>—</span>You can never assume anything in Ball Writing—as sports editor Kevin Bull now understands.</p>

<p>Last week, he sent word that the suits wanted a Tigers take out story: "1A is interested in a story about How The Tigers Saved Their Season. I think it's something you can start reporting now. Can definitely take us back to that road trip in Baltimore where we thought Ausmus was close to being fired. This assumes the Tigers are still doing well and don't get swept in Seattle."</p>

<p>Well, they did get swept and the editors of Page 1A—the front of the newspaper—are no longer interested in that upbeat story. But Detroit is still seven games above .500 and well within reach—1½ games behind the wild-card.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline">DETROIT, <em>August 20</em>—</span>Thanks to a colossal scheduling mishap, I'm back at the ballpark on an off day I had requested weeks in advance. My backup is on vacation, and I'm stuck covering pregame. I have plans tonight.</p>

<p>My goal is to get in, get done, and get out. Attend the pregame manager's session, get some quotes, and knock out two stories. Be out of the ballpark no later than 6:15.</p>

<p>During Ausmus' session, I ask about Red Sox slugger David Ortiz, playing his final series at Comerica Park. Ortiz, forty, is retiring after the season and has tormented Detroit over the years.</p>

<p>A hall of fame-caliber offensive player who starred at the height of the steroid era.</p>

<p>Ortiz becomes the obvious choice for my second story. I'll ask Miggy about him.</p>

<p>Me and Miggy have lived in harmony since last month's All-Star Game. When he appears at his locker, I give him a certain distance, waiting until he sits down before making a move. He's fiddling with his cleats.</p>

<p>I crouch down so we're eye level. Immediately, I sense his combativeness.</p>

<p>"I want to ask you about David Ortiz."</p>

<p>"What about him?"</p>

<p>"You're probably friends, right? What kind of guy is he? What's your relationship like with him?"</p>

<p>"Ask him."</p>

<p>"Well, what do you think of Ortiz as a player? Is there anything that stands out from his swing…"</p>

<p>"He's a lefty hitter. I swing righty."</p>

<p>I crouch lower, trying for eye contact. He's still looking down at his shoes.</p>

<p>"You mean, you can't tell me anything—<em>anything</em>—about David Ortiz?"</p>

<p>"Don't talk to <em>me</em> like that."</p>

<p>Instead of diffusing the situation, I choose escalation.</p>

<p>"Don't talk to me like that."</p>

<p>"Fuck you," Cabrera says.</p>

<p>"Fuck you," I say.</p>

<p>"Fuck <em>you</em>!"</p>

<p>"No, fuck <em>you</em>!"</p>

<p>Walking out of the clubhouse, I turn around and see a National Guy who witnessed the whole thing, the nicest guy you'll meet, face flushed crimson.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>August 21</em>—</span>On this beat, there's only one way to get over things.</p>

<p>Postgame the next day, PR is on high alert. I see Cabrera at his locker—first one to the right. Walking by, I wait for eye contact. When Miggy sees me, I apologize.</p>

<p>"I'm sorry for what I said."</p>

<p>To my surprise, Miggy apologizes, too.</p>

<p>"Look, man. I like you. But sometimes, you can take it too far."</p>

<p>"I get what you're saying, but I wasn't trying to be like that."</p>

<p>"But you were like that."</p>

<p>"I feel you."</p>

<p>We bring it in. Bygones be bygones. Miggy never messed with me again.</p>`,
        wordCount: 3200
    },
    {
        id: 12,
        year: 2016,
        section: 'year',
        title: "PENNANT RACE",
        subtitle: "Minneapolis, Atlanta",
        teaser: "The Tigers' final push for the playoffs—and a Cy Young vote as currency.",
        content: `<p class="has-dateline"><span class="dateline">MINNEAPOLIS, <em>September 20</em>—</span>Justin Verlander seeks a buyer for his car.</p>

<p>Standing a few feet away from his locker when TV broadcaster Rod Allen walks by.</p>

<p>"Hey Rod. You wanna buy my Aston Martin?"</p>

<p>"Too pricey for me."</p>

<p>I'm offended.</p>

<p>"Why didn't you ask me?"</p>

<p>"You got that much?"</p>

<p>"No… But I do have a Cy Young vote this year."</p>

<p>That'll get his attention.</p>

<p>"Oh yeah?"</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>September 21</em>—</span>Per usual, Verlander speaks with reporters the day before his start.</p>

<p>Afterwards, I tell him, "You really know how to fill up the notebook," explaining its old journalism slang for providing plenty of material. He's not fluent in newspaper-speak—and really, who is? I explain what a "notebook" is—a side-car story that touches on multiple topics.</p>

<p>With the rest of the writers' pack scattered, I stand between Verlander and Víctor Martínez.</p>

<p>"Back in the day, didn't writers and players travel together?" Verlander asks.</p>

<p>"Yeah. Writers used to ride trains and fly with teams. Some even hung out together."</p>

<p>Víctor doesn't believe it. I tell them how writers and players were friends but maintained professional boundaries—they'd travel together, even drink together, but certain things couldn't be written about. Peter Gammons used to shag flies with Red Sox players.</p>

<p>The amicable relationship between writers and players dates to long train rides in the forties. The writers observed the code because they cherished their jobs and considered themselves immensely privileged.</p>

<p>How could they not?</p>

<p>I turn to Víctor: "We should hang out sometime."</p>

<p>They laugh. What a ridiculous concept.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline">ATLANTA, <em>September 30</em>—</span>For the first time in my career, it's a real pennant race. Detroit arrives 1½ games back.</p>

<p>Inside the clubhouse, chatting up lefty reliever Ian Krol when I'm startled by loud screams. I turn to see two clubhouse attendants, still shaking from opening the red cooler—players taped a rubber snake underneath the lid.</p>

<p>"Hey Anthony," Verlander hollers at me. "Are there any Red Bulls in there?"</p>

<p>He wants me to open it. I stare and laugh.</p>

<p>Justin chuckles after his prank falls flat in front of teammates. He couldn't get me.</p>

<p>Before batting practice, I sit with Al Avila in the dugout. He's one winning weekend away from taking the Tigers back to the playoffs in his first full season as general manager.</p>

<p>"We're going to watch Zimmermann carefully. As far as his role in the playoffs, we'll deal with that once we get there."</p>

<p>I ask if he's nervous about postseason hopes hanging in the balance.</p>

<p>"No. This is baseball. It's all just a game."</p>

<p>The Tigers explode early—three runs in the first inning. I spend the rest of the game booking postseason travel. Cabrera hits his 38th home run. Upton homers too. Daniel Norris spins a gem.</p>

<p>Half a game out. Two to go.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>October 1</em>—</span>After blocking Justin's prank attempt yesterday, I come bearing gifts today.</p>

<p>He is starting the season finale tomorrow. After a late surge, Verlander is considered a top Cy Young candidate—he's 16-7 with a 3.10 ERA and 246 strikeouts in 220 innings.</p>

<p>I baked a fresh batch of brownie points. Bad luck had inflated his numbers, and I thought he'd like to know.</p>

<p>His eyes light up: "Good to know."</p>

<p>Against my protest, the <em>Freep</em> wants a column on manager Brad Ausmus' status next year. I say it's awkward timing and not my job as the beat reporter. My sports editor says it's what the readers want.</p>

<p>Ian Kinsler sits at his locker, unbothered before I walk up and mention this story. Do you think Ausmus should be back next year?</p>

<p>"Not answering that. Not my call."</p>

<p>"How much of a difference-maker has Brad been this year?"</p>

<p>"It sounds like you already know what you're writing. What are you writing?"</p>

<p>"I'm writing that Al should bring Brad back… I think you guys have done a good job this year given the injuries, and he deserves another year."</p>

<p>"So, write that. Write exactly that. Why do you need my quotes for that?"</p>

<p>"I'm trying to get a player's perspective."</p>

<p>"I'm not the team voice on Brad. I haven't asked a single guy in here about that."</p>

<p>It's not wise for Ball Writers to take public stances on managers. We deal with them daily, natural bias can emerge, and we risk losing them as trusted sources.</p>

<p>I play it safe and write that Avila should bring Ausmus back. My primary motivation—the playoff race is still undecided, and I don't want to cause ill-timed, distracting headlines.</p>

<p>Detroit enters Game 160 trailing the Blue Jays for the last wild-card spot.</p>

<p>Their last stand comes in the eighth: Bases loaded for Miguel Cabrera, J.D. Martinez up next. Cabrera strikes out and Martinez hits a rocket into the hole at shortstop—Dansby Swanson stabs it, starting an inning-ending double play.</p>

<p>Players watch Toronto's game inside the silent clubhouse. Ausmus hopes for the best.</p>

<p>"In a perfect world, Boston can win this, and we still control our own destiny."</p>

<p>By the time the media is kicked out, Jays win.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>October 2</em>—</span>There were still scenarios in which the Tigers could play another day, but each required help. Both teams ahead in the standings won, and the season finale was rendered without suspense—they were shut out.</p>

<p>Verlander struck out eight batters over seven innings. For the second straight year, I got a first-name farewell. I didn't have many phone numbers to gather, and I was surprised Cameron Maybin shut me down. "Hell naw." Not even his email.</p>

<p>I was less emotional in the clubhouse this year. More assured, more one of the guys, still just an Idiot Reporter. I've enjoyed covering Maybin and getting to better know the young pitchers—Norris, Boyd, and Fulmer.</p>

<p>I moved forward with Miggy this year in a topsy-turvy but not insignificant way—and the rest of the Tigers' superstars on less dramatic scale. I feel eye-to-eye with most everyone else in here.</p>

<p>The players will soon scatter on charters for the winter. I'm flying commercial, with an upgrade. It was a good season—it's too bad the book won't happen. Maybe next year.</p>`,
        wordCount: 1200
    },
    {
        id: 13,
        year: 2016,
        section: 'year',
        title: "WAKE-UP CALL",
        subtitle: "Detroit, Scottsdale, Oxon Hill, Secaucus, Washington",
        teaser: "The offseason grind—from Cy Young heartbreak to Mike Ilitch's death.",
        content: `<p class="has-dateline"><span class="dateline">DETROIT, <em>October 3</em>—</span>Not even bloody seven o'clock on the first morning of the offseason and my phone is ringing. Deep Throat is fuming about my Ausmus column.</p>

<p>"I can't talk for long, but look, Brad is part of the problem. A big part of it."</p>

<p>He asks if I remember the August 27 game where everyone got ejected.</p>

<p>"I was on vacation. I remember reading about it."</p>

<p>"That night, after Víctor got thrown out, he left the stadium."</p>

<p>When the Tigers returned to the clubhouse, Martínez was gone. Andrew Romine pointed this out to teammates. Jose Iglesias must have told Víctor what Romine said.</p>

<p>"The next day, all hell broke loose."</p>

<p>Martínez confronted Romine, charging at him in a physical altercation that teammates broke up.</p>

<p>"Everyone in there had Romine's back."</p>

<p>Martínez then went after Ausmus, upset he didn't have his back the previous night.</p>

<p>"It ruined the room. Víctor became more detached as the season wore on. Brad will be back, I guarantee it. And Wally won't be back as hitting coach—I guarantee that, too."</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>October 4</em>—</span>After scores of unanswered emails and unreturned voicemails— "Just trying to open a line of communication," I'd say—it's Mike Milchin himself showing up in my texts.</p>

<p>Milchin is Justin Verlander's agent and has been since Verlander was drafted in 2004. Today, Mike Milchin wants to boost his client's Cy Young chances.</p>

<p>"We need a campaign for my boy Verlander and the Cy! Voters vote today! Leads baseball in WHIP, K's, Opponent average, opponents on base %, WAR! 2nd in ERA and innings pitched."</p>

<p>I've been reaching out to Milchin since I got the beat. Since Verlander gave me Milchin's cell number after the season finale last year, I've tried reaching him directly with no response.</p>

<p>I call Mike Milchin's BS.</p>

<p>"Man, I have called and texted you so many times, no response."</p>

<p>"I am VERY low key, Anthony, and never put myself in front of players, which is why I am always silent. This situation w/JV is so important that I cannot sit idle on this. No disrespect intended, I just never talk."</p>

<p>"No worries. I get it."</p>

<p>I'm going to give Milchin something (write a story), in exchange for a <em>take</em> in the future (inside information, accessibility).</p>

<p>"Just trying to have an open line of communication. Let me see what I can do—I have a vote, so it's kind of tricky."</p>

<p>"Understood. I will work to be more accessible in the future."</p>

<p>That's all I'm looking for—an understanding that we're playing by traditional give-and-take rules here.</p>

<p>"Even better since you have a vote. JV was hosed when Price won it a few years back. Maybe this year the tables will turn?"</p>

<p>"Trust me. I've heard all about that, lol."</p>

<p>Walking the tightrope, I write an article on the historical perspective I know Verlander wants. By winning a second Cy Young, his ticket to Cooperstown would be all but punched.</p>

<p>When the story is live, I send Milchin the link.</p>

<p>"Awesome! Thanks for sharing and writing."</p>

<p>An hour later, Milchin again.</p>

<p>"JV wanted me to send you a thank you for your article and work. He appreciated it very much."</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline">DETROIT, <em>October 21</em>—</span>Some sad news to share today.</p>

<p>Longtime <em>Free Press</em> sports columnist Drew Sharp died yesterday. I met Sharp eleven years ago, fresh out of high school working my first internship at Detroit's AM-dial sports station. Sharp occasionally filled in as co-host. During commercial breaks I'd ask Sharp about sports writing. More recently, he was my co-host on the Talkin' Tigers podcast.</p>

<p>By then, the native Detroiter had become quite comfortable as a local lightning rod, often taking the pessimist perspective, toying with fans' fragile feelings. I know—I hated Sharp. I crossed Xs through his column sig. But I always found myself reading what he wrote—and underlining words I didn't know.</p>

<p>When I got to work with him, I instantly became fond of Drew—not for his provocative columns, but for how good a teammate he was. Drew Sharp never considered himself bigger than me, or any writer. Never bigger than anyone on the Sports desk.</p>

<p>Yet he was high-profile, a recurring guest on Jim Rome's national sports-talk TV show. To succeed as a Black man, media personality and columnist in contrarian cross hairs took thick skin. How thick? I found out one night by accident.</p>

<p>I had worked late, met a friend for a drink—and then we decided to go exploring in the deserted <em>Freep</em> garage. Down in the basement, in a dark corner, we stumbled across two white cardboard boxes, stacked to the brim with letters.</p>

<p>Many of those letters were sent to Drew Sharp. In crooked capital letters, letter writers called him a nigger. They told Uncle Tom to take his sports opinions elsewhere, lest they should be so lucky to see him on the street one day.</p>

<p>The <em>Free Press</em> family turns out for the funeral. Michigan State basketball coach Tom Izzo speaks. Sharp covered Izzo before he became a household name.</p>

<p>"I never felt guarded with him. Drew is the kind of friend everyone needs. He was not afraid to tell you what was on his mind, and he was not afraid to disagree with you. In this day and age, we tell everybody what they want to hear instead of what they need to hear. He was refreshing, to me, in that respect."</p>

<p>Izzo speaking at Drew's funeral says volumes about him. As Izzo's voice booms through the church, I think about my Internet Haters. About how I'd be remembered if I didn't wake up tomorrow.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline">SCOTTSDALE, Ariz., <em>November 7</em>—</span>Up and at 'em for breakfast, a man jogs past. Navy blue pullover, red shorts, crew socks. Dave Dombrowski, out for his morning run.</p>

<p>"Hi, Anthony!"</p>

<p>Welcome to the GM meetings, presented this year at a posh Phoenix property where guests don't stay in rooms—they stay in villas. This week, executives and agents will bandy about potential collaborations, tilling the ground for free agent negotiations this winter.</p>

<p>What was once a baker's dozen of writers, mostly National Guys, is now a cadre large enough to fill a ballroom. The event is designed to whet fans' appetites before next month's winter meetings—the more rumors, the better.</p>

<p>I've come to Scottsdale this week strapped with ScoopSheet, the reporting database I've been building for the past month. It tells me when I last talked to a source and when I'm talking to them next. How many kids they have, which players agents represent, which organizations scouts cover.</p>

<p>I'm hoping to connect with new agents here. As much as they can get on my nerves, agents do provide reporters with more than just information—they also provide access to players, which I receive in spades while reporting for an upcoming profile on rookie righty Michael Fulmer.</p>

<p>Fulmer is the frontrunner for Rookie of the Year. My access comes via his agent, Jay Franklin. The story angle came from an innocent question.</p>

<p>"Anything unique I should know?"</p>

<p>"Did you know that he's a plumber in the offseason?"</p>

<p>That kind of tidbit is worth its weight in gold—picture the Tigers' hotshot pitcher craning his neck underneath a sink cabinet, fixing a leaky faucet. When it's published, my Fulmer plumbing story gets aggregated to death by dinnertime.</p>

<p>Al Avila and his traveling contingent appear. Flight was delayed. He's still gotta check-into his room, get to a meeting, then dinner…</p>

<p>"One question each. Better make 'em good."</p>

<p>At night, action happens in the courtyard. I get the lucky draw of pulling up an empty seat next to longtime agent Adam Katz. Instead of bombarding him with baseball questions, I filter the conversation through his girlfriend, a lovely lady we'll call "Miss V." I get his number afterwards. We'll talk shop another time.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>November 8</em>—</span>I get to the gym at 7:25 on Election Day, and I'm disgusted to see Ken Rosenthal already sweating on the elliptical. When I walk over to the weights area, I'm even more disgusted to see Rival Cohort in a cut-off shirt.</p>

<p>We share an 8x10 workout mat, two adjustable benches and a small-scale dumbbell rack. Before I can pick a weight up, my colleague bursts.</p>

<p>"Your column, man," shaking his head. "I don't know why you write stuff like that."</p>

<p>"What?"</p>

<p>"Al isn't going to talk to us anymore if you keep writing like that."</p>

<p>"What did I write?"</p>

<p>"You know what you wrote."</p>

<p>I'm genuinely confused. I wrote a fair and balanced column today: "<em>Al Avila arrived late at the GM meetings, his flight from Detroit delayed an hour or so. The delay wasn't his fault… But it's a problem Avila contributed to with wild spending last winter that couldn't deliver enough wins.</em>"</p>

<p>Afternoons, reporters line up like anxious cattle for a free-for-all with general managers. I stay huddled next to Al Avila from start-to-finish, asking every question there is to ask about the Tigers' off-season plans.</p>

<p>Avila is an open book. During the half-hour, he frequently flips between on and off-the-record, rambling about this or that. He's my kind of guy—a Ball Writer's kind of guy.</p>

<p>It's almost dark when I walk to the lobby bar tonight. Around the lobby bar, a mostly liberal collective looks at the electoral scoreboard with increasing anxiety. When I squeeze to the front for a beer, someone with a phone exclaims, "We got Michigan!"</p>

<p>Within the hour, it becomes clear that Donald J. Trump may very well win the presidency tonight. Like our Ausmus reporting, the <em>Freep</em>'s projection is proven wrong when Trump overtakes Clinton late.</p>

<p>Heading back to my villa, I stroll slowly past a fire pit, side-eying until I can confirm who the man in the white shirt is—Al Avila, surrounded by Tigers' execs. Loud, laughing and drinking. In the villa, I break into the mini-fridge and shoot a whiskey, socially lubricating for the unexpected opportunity.</p>

<p>I return to the fire pit with one objective—to find my way amongst the Tigers' front officers. When nothing happens, I stop and say, "Hey."</p>

<p>Avila doesn't recognize me at first but once he does, "Boy, do I have a bone to pick with you." He is seated in an Adirondack chair. I lean over a rope that might as well represent the separation of church and state we live by.</p>

<p>"You know what. Why don't you come up here?"</p>

<p>Objective accomplished.</p>

<p>For the next hour and a half, the Highest Source In The Land holds court—Grey Goose in one hand, Cuban cigar in the other. Legal counsel John Westhoff goads Avila on. Assistant GM David Chadd sits to my right.</p>

<p>Avila airs his grievance.</p>

<p>"It's bullshit what you wrote in the paper, saying I showed up late. I wasn't late! What if my owner reads that?"</p>

<p>I play defense, pulling up the article.</p>

<p>"I literally wrote 'it wasn't Avila's fault.'"</p>

<p>"I wasn't late!"</p>

<p>Feeling on the outside of an inside joke, I concede.</p>

<p>"Technically, you weren't late."</p>

<p>"Thank you. Now get him a drink."</p>

<p>HSITL includes me in upcoming rounds, bantering loudly, unbothered by the Ball Writer who has infiltrated the scene.</p>

<p>Avila basks at the numbers. He voted for Trump not once, but twice, he proudly explains—sending absentee ballots in both Michigan and Florida, his two states of residence.</p>

<p>Brad Ausmus arrives, fresh off a flight from San Diego. Analytics manager Sam Menzin plays waiter, shuttling drinks from the open bar.</p>

<p>By the second drink, I'm too comfortable here. My foreign presence provides an easy target. <em>Watch what you're saying when Fenech's around</em>… <em>The Fake News Media</em>… <em>Earmuffs, Anthony</em>!</p>

<p>They josh, asking me to reveal my sources. I joke back, shining what I intend to be a light-hearted spotlight on David Chadd.</p>

<p>"David Chadd's my source. You guys know that."</p>

<p>"Oh, no, Anthony. No, no, no."</p>

<p>"C'mon. You know I get all the info from him."</p>

<p>"Better watch yourself, Anthony."</p>

<p>I laugh it off. I'm kidding. Obviously.</p>

<p>"Seriously. I'm just kidding."</p>

<p>I've made a Jack and Coke-fueled mistake. David Chadd is my longest-standing relationship In The Room—he was a source, and joking or not, I just outed him in front of his coworkers.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline">DETROIT, <em>November 16</em>—</span>All those famous people I rub shoulders with daily? Scott, Justin, Kate… you don't call your friends by their full name, do you?</p>

<p>But true friends follow you on Twitter, right? Toiling for some relationship-cultivating catnip, I take an informal poll of Cy Young voters.</p>

<p>"Every voter I've talked to had him first," one guy says. "A bunch of others, too."</p>

<p>I tweet my findings and hook the big fish himself. With sky-high hopes, Verlander likes the tweet and follows me on Twitter.</p>

<p>Kate leaves me hanging. She will, however, be very active later tonight.</p>

<p>Shortly after 8 <span class="small-caps">P.M.</span>, with my pre-written story declaring Verlander victorious ready for publication, BBWAA secretary Jack O'Connell opens the envelope on another election stunner:</p>

<p>Verlander finishes runner-up again, behind former teammate Rick Porcello in the second-closest vote ever. Verlander was victimized in both votes—five points short of Porcello this year and four points short of David Price in 2012.</p>

<p>Porcello won largely because Verlander was left off two ballots altogether—both writers in the Tampa Bay chapter. They didn't have Verlander anywhere in their top five.</p>

<p>While I'm mad scrambling to rewrite the story, Mike Milchin calls on Line 1.</p>

<p>"It is my hope that this debacle creates transparency and change," Milchin says, stately and solemnly. "Thank you for your time on this earlier."</p>

<p>"First pitcher in AL history to get the most first-place votes and lose… How he was left off two ballots is beyond me."</p>

<p>"Do we know who left him off?"</p>

<p>"Two guys from Tampa," I tell Verlander's agent.</p>

<p>"Wow. How's that possible? Isn't that a reckless and irresponsible way to handle a vote?"</p>

<p>One of the Tampa voters, MLB.com's Bill Chastain, tells the <em>New York Daily News</em> he sent in his ballot with about a week remaining in the regular season, perhaps even before Verlander's two final starts.</p>

<p>"Justin struck out sixty-five more guys with a .207 batting average against, by far the lowest among starters," I tell Milchin. "Still surprised."</p>

<p>Meanwhile, somewhere along the Amalfi Coast, nobody is more surprised than Kate: "Hey @MLB I thought I was the only person allowed to fuck @JustinVerlander?! What two writers didn't have him on their ballot?"</p>

<p>Upton's 2 <span class="small-caps">A.M.</span> tweet in Italy has the web desk thinking hits.</p>

<p>"Check her out on Twitter. Might be worth writing up."</p>

<p>I would rather write my obituary.</p>

<p>I've successfully navigated seven years as a Freep Sports staffer without having my byline linked to celebrity clickbait. I'm a sports writer, not a <em>TMZ</em> voyeur. An official BBWAA card-carrying citizen who voted Justin Verlander for Cy Young. I didn't think it was close, and my reporting shows that. Kate Upton obviously agrees.</p>

<p>In the aftermath of her attention-grabbing tweet, I receive a late-night interview request.</p>

<p>It's Channel 4's Bernie Smilovitz, wondering if I could come into the studio for a quick hit on the Cy Young vote. I should say no, but Bernie is my mom's favorite sportscaster.</p>

<p>In the newsroom, Bernie asks a couple quick-hitters about the vote and then sticks me with the <em>Entertainment Tonight</em> question I feared—asking for my reaction to Upton's tweets.</p>

<p>"I'm just glad that I voted for Verlander so Kate Upton can't come at me."</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline">OXON HILL, Md., <em>December 4</em>—</span>It's a stress-free cab ride to this year's winter meetings from D.C. Walking into the resort, the first recognizable face I see is Jim Leyland. He's on the phone, wearing loafers with no socks.</p>

<p>I send in a quick story when I get to my room—while checking on a few players on the ride here, I learned from Jarrod Saltalamacchia's agent that they're not bringing him back.</p>

<p>You can tell a lot about Ball Writers based on who they hang with at the lobby bar. I bounce from fresh faces with new perspectives to baseball lifers with the wisdom of experience.</p>

<p>Tonight, the festivities open alongside Kristie Ackert from the <em>New York Daily News</em> and Mets manager Terry Collins. Ackert covers the miserable Mets beat; she's quickly become one of my better friends since we met last year. Collins is a Michigan native and Eastern Michigan alum.</p>

<p>The crowd is classic nu skool/old school mix. I move from baseball lifers like Collins to a table with two college-aged kids named Jake Mintz and Jordan Shusterman, who started a blog called Céspedes' Family BBQ. Currently, they have 41,000 on Twitter and will become a mainstay on the baseball media landscape. They're a breath of fresh air. We bond over video games.</p>

<p>Throughout the week, I use the lobby bar to take my relationship with newly minted sources to the next level. In October, I conducted a 150-person sourcing round—adding five new people per team to the ScoopSheet. I followed up with them a few days before the GM meetings.</p>

<p>The goal is to advance the conversation past emails as quickly as possible. I met a few sources in person in Scottsdale last month and a couple guys from San Diego on the opening night here.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>December 5</em>—</span>I start the winter meetings hot, getting the first scoop out of the way early. Working remotely from my twelfth-floor hotel room, I text Ian Kinsler.</p>

<p>"Are you playing for Team USA in the World Baseball Classic?"</p>

<p>"I believe so. The union asked me, Leyland asked me… why?"</p>

<p>"Trying to get a scoop, lol."</p>

<p>To pitching coach Jeff Jones. "Is Justin pitching in the WBC?"</p>

<p>"Not that I'm aware of."</p>

<p>To Brad Ausmus: "A couple things I've heard: Kinsler playing in WBC, Verlander no."</p>

<p>"I haven't confirmed it with either of them. Pretty sure Kins is playing. Haven't talked to Ver about it yet."</p>

<p>After lunch, my scoop scrolls across the TV: <span class="small-caps">KINSLER TO PLAY FOR TEAM USA</span>.</p>

<p>I work remotely in my room so my competitors can't see the color-coded ScoopSheet on my screen. I arrange rendezvous with sources, then take the elevators down to meet 'em on the main floor. The Gaylord National Resort and Conference Center is the center point of this year's shindig, sitting along the Potomac encased in glass scaffolding reminiscent of modern stadiums.</p>

<p>Between two giant banks of luxury hotel rooms, each nineteen floors high, the main floor transforms this week into a baseball-themed winter wonderland. Snowflakes stream from the ceiling, and a large Christmas tree overlooks the water. Criss-crossing the indoor city beneath the glass, baseball executives, scouts, agents, plenty of media and sometimes even the players themselves make their way through the constant hum of industry chatter.</p>

<p>I join the afternoon action at a press conference inside a walled-off ballroom on the main floor. Today, Major League Baseball released a list of thirty players who will participate in next spring's World Baseball Classic. Jim Leyland is coming out of retirement to manage Team USA.</p>

<p>While Leyland speaks with reporters, his phone rings in clear view of those close to him.</p>

<p>"JV" is calling.</p>

<p>"This is Verlander. Maybe we got him."</p>

<p>Based on my reporting, that's not happening.</p>

<p>Ron Colangelo reaches out around dinner: "Leyland wants to connect with you."</p>

<p>When we do, Leyland is leaving an instant replay meeting—he's worked closely with the commissioner's office while serving as a special assistant since retiring in 2013.</p>

<p>Leyland, seventy-one, still reads the newspaper every day. And he's read fan comments enough to know how fans will react if Verlander passes up Team USA.</p>

<p>I ask Leyland: "Verlander not pitching—is that true?"</p>

<p>"Probably not pitching… Great talk with him today."</p>

<p>The longtime manager is trying to protect his former player. He's getting in front of the story.</p>

<p>"We had a great conversation, and after we talked about everything, I just felt that maybe it was best for him to skip it. He was into it. He wanted to do it. He was positive about it, but we talked about a lot of different circumstances, and we just felt—particularly, me—that it was probably best for him."</p>

<p>By taking ownership of the decision, Leyland shields Verlander. Fans can't blame him for not playing for his country—it was <em>Leyland</em>'s decision. A savvy, selfless move by the skipper.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>December 6</em>—</span>I finally meet Mike Milchin in the flesh. He stands more unassuming than most agents. Glasses, red sweater, black leather jacket.</p>

<p>Milchin is punctual, arriving early at our meet-up point.</p>

<p>"I'm here. Upstairs standing next to the concierge."</p>

<p>He holds a legal pad, crossing off a list of folks to see as the day wears on.</p>

<p>I keep our face-to-face introduction quick. We chit-chat about Verlander not playing in the WBC. Milchin has a few free agents but says Detroit isn't in. He represents reliever Jesse Crain, second baseman Kelly Johnson and first baseman Adam LaRoche—all veterans looking for a job—so he's got better places to be. Firm handshake and a fond farewell. Milchin surprises me—I think we might get along.</p>

<p>Back up in the room, I highlight Milchin's name in teal.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>December 7</em>—</span>Another sourcing milestone, flagging down agent Jay Franklin. After playing phone tag for three days, I pinned him down Wednesday afternoon at a resort watering hole.</p>

<p>Franklin, forty-eight, is the head of BBI Sports Group. He represents both Kinsler and Rookie of the Year Michael Fulmer. Franklin has been agenting since the late nineties.</p>

<p>He's the older brother of reliever Ryan Franklin, who pitched twelve seasons in the 2000s. Both Franklins account for a pinch of tobacco behind their lower lip.</p>

<p>I'd been working on Jay Franklin for two years, cold calling and leaving voicemails. I've scared off others with far less, I'm sure. I salute Franklin with a shot of whiskey. One of the more important persons in my life, so it's good to finally highlight his name.</p>

<p>By tonight's media session, a news desert is making the Tiger Beat desperate for crumbs of information. Every time I ask a question I feel like Oliver, pleading for more porridge.</p>

<p>I look hard for things not meant to be seen. Sitting close to Avila's table, I see his phone flash. Afterwards, I text a Houston scout:</p>

<p>"(Astros GM) Jeff Luhnow just called Avila."</p>

<p>"About?"</p>

<p>"That's what you need to find out."</p>

<p>My guy theorizes it could regard Justin Wilson. The lefty reliever is the Tigers' most talked-about trade chip. Avila acquired Wilson at last year's winter meetings. At twenty-nine, he has emerged as one of the league's most reliable lefties out of the pen. Wilson as trade bait makes sense.</p>

<p>I've been texting Al Avila at the same time every day out of pure entertainment, to see how long he can ignore me.</p>

<p>"You got <em>anything</em> cooking?"</p>

<p>No answer—again.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline">DETROIT, <em>January 27, 2017</em>—</span>The <em>Free Press</em> drops its latest reorganization today. In a 21-page PDF dubbed "Freep Forward," top editors introduce new Gannett gobbledygook.</p>

<p>My job hasn't changed, but others have—general assignment reporters are now "storytelling writers," editors are "directors," and assistant editors are "planners." The photo/video desk is now the "consumer product team."</p>

<p>Every department has a mission statement, except two of them: The copy desk and print team mission statements say only, <em>Need mission statement…</em></p>

<p>According to the document, we still have a (whoops!) music &amp; entertainmnet reporter and a (whoops!) restaurnts reporter. So much for the copy desk.</p>

<p>In Sports, my boss (sports editor) Kevin Bull is now "senior planner/digital." There's also an "OPEN POSITION" for "sports content coach."</p>

<p>Odds are this position will never get filled.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline">SECAUCUS, N.J., <em>February 9</em>—</span>Visiting MLB Network's studios, I peel the visitor's badge and stuff it in my coat. I'm going on the morning show, sitting across from <em>Sports Illustrated</em>'s Tom Verducci, still one of the best Ball Writers around.</p>

<p>Ken Rosenthal is behind the glass. The segment goes as well as it should—we spent six minutes discussing the Tigers' uneventful off-season and I got off the stage without getting scooped</p>

<p>"What the Tigers are counting on is avoiding the injuries from last year. That's what they're banking on to get them back to the postseason."</p>

<p>With time to kill, I message Tim Baratta, a boutique agent who lives nearby in Jersey—the first agent to call me back when I started cold-calling. He calls me "Big Time" over lunch and mentions Tigers owner Mike Ilitch, whose health has been declining.</p>

<p>Ilitch, eighty-seven, hasn't made a public appearance in more than a year—not even for the team picture last year.</p>

<p>"What's going to happen to the team when he's gone?"</p>

<p>Baratta drops me at the train station, and I begin to retrace my steps—New Jersey Transit to Grand Central to D.C.</p>

<p>Thirty minutes outside of Union Station, things change.</p>

<p>Michael Ilitch Sr., the patriarch of one of the most powerful families in Michigan, a self-made multi-billionaire who started Little Caesars Pizza and owned two of Detroit's storied professional sports teams, has died.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline">WASHINGTON—</span>Though the <em>Free Press</em> has reporters in other departments pulling together information, my first job is to get another independent confirmation.</p>

<p>I text agents who can help me reach players. No luck with most. I do talk to Scott Boras, though.</p>

<p>That I'm speaking with a baseball agent about the death of a team owner is crazy enough in itself. Boras made a lot of money off Ilitch—over $350 million in contracts since 2004, when he first got Ilitch's ear by convincing him to sign All-Star catcher Pudge Rodriguez.</p>

<p>Boras sold Ilitch on a bigger dream by explaining baseball's big-spending reality. He convinced Ilitch that Detroit was a below-the-radar baseball hotbed. Boras knew what Ilitch wanted more than anything: a World Series title.</p>

<p>"The best way to get it," Boras told him, "is to buy the best players."</p>

<p>What Ilitch bought was damn near the dream Boras sold him: The Tigers went on a 10-year run, winning divisions and making deep postseason runs.</p>

<p>Boras sounds unusually emotional. "In the end, what made Mike Ilitch a winner was his passion. Because he really, really studied the game. These weren't business decisions. This was something very close to his heart."</p>

<p>That's the thing about a five-alarm news story: It's a mad rush to get critical information, then build on it with as many sources as you can as quickly as you can. The truest test of reporting—your sourcing network, interviewing skills and deadline stamina under pressure.</p>`,
        wordCount: 3800
    },

    // 2017 SEASON CHAPTERS (15-19)
    {
        id: 14,
        year: 2017,
        section: 'year',
        title: "PRIME-TIME",
        subtitle: "Tampa, Lakeland, Chicago, Oakland, Anaheim, Kansas City",
        teaser: "Year three on the beat—and a death threat to start the season.",
        content: `<p class="has-dateline"><span class="dateline">TAMPA, Fla., <em>February 12, 2017</em>—</span>The calendar begins when I arrive to spring training. Still thinking about what Pedro Gomez said earlier, what he's been saying for the past two years.</p>

<p>I texted him on the way to the airport.</p>

<p>"Thinking about what you told me about three years on beat."</p>

<p>"Third year is the defining moment," he replied. "You now OWN the beat."</p>

<p>I land in Tampa feeling like it. My third year begins with the first apparent death threat I've received. I come across it while strolling through my Twitter mentions in the rental car line.</p>

<p>Courtesy of one Twitter troll: user @d159program: "I hope next headline is 'FL bound plane crashes, Fenech burns'… I don't think we'll need dental records but maybe, because I think Fenech is all burnt up."</p>

<p>I feel only mildly creeped out. Not quite a death threat but impressed nonetheless by garnering that kind of hatred in the first place. I am a <em>Ball Writer</em>—I write about <em>baseball</em>.</p>

<p class="has-dateline no-indent"><span class="dateline">LAKELAND, Fla., <em>February 13</em>—</span>Nothing much is happening in TigerTown, twenty-four hours before pitchers and catchers officially report. Catchers take batting practice and pitchers throw long toss. Clubhouses are closed, and the manager doesn't talk until tomorrow.</p>

<p>I was in-and-out by noon, bringing to mind something Pittsburgh writer Bill Brink once said: "I would love to see the look on our editors' faces if they found out what we do early in spring training."</p>

<p>The routine is always the same early in spring training. Arrive at 8 <span class="small-caps">A.M.</span> and gather 'round the Tigers' infield practice area. Watch pitchers and catchers play catch. Half throw bullpen sessions, then they go back into the clubhouse. We follow 'em, get fifteen minutes of clubhouse time and file out half past noon.</p>

<p>I stick around after the other reporters leave, wandering the back fields. A few pitchers come out of the complex.</p>

<p>"What's up, Anthony!"</p>

<p>I hear it clearly from way over here. Justin Verlander raises his right arm.</p>

<p>"What's up, man?"</p>

<p>After long toss, I ask: Couple questions on the way out?</p>

<p>"No problem."</p>

<p>Five minutes becomes thirty becomes an hour. At least I'll have a good sunburn.</p>

<p class="has-dateline no-indent"><span class="dateline"><em>February 15</em>—</span>This morning, we're allowed into the brand-new clubhouse for the first time.</p>

<p>Joker Marchant Stadium has undergone a massive renovation. The venture cost upwards of $40 million, transforming what were previously among the worst facilities in baseball.</p>

<p>The formerly cramped clubhouse, where players and reporters would literally bump into each other, is now a spacious rival to their Detroit digs. There's enough space for established stars to have two lockers and the kitchen is staffed round-the-clock by chefs. I smell omelets.</p>

<p>This is my new domain as a Ball Writer. The clubhouse is where we do our most important work—reporting, sourcing, relationship-building. Find nooks where you can line up one-on-one interviews. Identify "hot spots," where you're friendly with a cluster of players—and the "badlands," where players who have a problem with you board up.</p>

<p>But old or new, all clubhouses are alike. As Kristie Ackert says: "The clubhouse is a lot like the kindergarten classroom—you truly have to deal with every child differently."</p>

<p class="has-dateline no-indent"><span class="dateline"><em>February 16</em>—</span>Justin Verlander likes my tweet this morning, a picture of the waffle machine.</p>

<p>"Good morning, beautiful."</p>

<p>I awoke early to start this spring's sourcing round. From opposing teams' media guides, I came up with a few front office execs for each team, plus scouts and advance scouts. Before our teams' cross paths this spring, I'll try to initiate meetups.</p>

<p>This year, I'm targeting younger front-office staffers in line for promotions in years to come.</p>

<p class="has-dateline no-indent"><span class="dateline"><em>March 15</em>—</span>HSITL invites me to his spring abode, where we share a smoke on the balcony. Avila is staying at Grasslands, a gated community with a golf and country club. Apparently, Verlander has a place here, too.</p>

<p>Avila's place is a second-story flat. David Chadd and longtime Tigers executive Mike Healy is watching the WBC semifinals—Venezuela against Team USA in San Diego. Healy's official title is VP of park operations—the guy for anything stadium-related.</p>

<p>They don't seem to bat an eye when I arrive, like it's the most normal thing in the world that the beat writer is here drinking with the GM. But I'm harangued when I choose a coffee mug from the cabinet to drink a cocktail.</p>

<p>Avila's drink of choice is Grey Goose with just a splash of tonic. He pours two of them. We get some space and head outside for cigars. He puts the music on.</p>

<p>For the next hour and a half, we smoke, drink and talk. Nothing about the team—<em>anything</em> but the team. We're just two guys getting to know each other, making a personal connection.</p>

<p>For me, the bottom line about building relationships is this—you want people to see you for more than the malevolent media you represent. You want them to know you. You want them to like you.</p>

<p>As if on cue, Avila asks, "You know why I like you?"</p>

<p>"Because I'm cool?"</p>

<p>"It's because of your dad."</p>

<p>As Avila's story goes, one day my father approached him near the entrance of the prestigious Detroit Athletic Club. My Dad works the door there. Avila was arriving for an event. Dad, a born Detroiter, is a compassionate man and cares about his three sons a lot. That day, he couldn't help himself: He introduced himself to Avila and asked him to be good to me.</p>

<p>"And I'll never forget that."</p>

<p>Avila himself is a father of three. A devout Catholic. An all-around good guy. He dips the cigar into his drink. "I could tell your dad is a good man." The best, I say. Avila tells stories about his climb up the scouting ranks and how he met his wife. He refills our drinks twice.</p>

<p class="has-dateline no-indent"><span class="dateline"><em>March 28</em>—</span>With Opening Day only seventy-two hours away and the Tigers' roster not finalized, I wake up on high alert.</p>

<p>"You hear anything?"</p>

<p>"Nope."</p>

<p>Agent Gene Mato represents veteran righty Aníbal Sánchez, who is locked in a battle with young lefty Matthew Boyd for the fifth rotation spot. Sánchez, thirty-three, has been a mainstay since joining Detroit in 2012, but his performance has slipped along with velocity on his fastball.</p>

<p>When the clubhouse opens to reporters, I stay out of the dressing room, instead observing the comings-and-goings from the hallway—there's more information to be had out there.</p>

<p>I notice the shades in Ausmus' office are drawn. Sánchez walks in.</p>

<p>"He's in there talking with Dubee and Brad."</p>

<p>Before he walks out, the clubhouse closes.</p>

<p>"Let me know."</p>

<p>"I was right," Mato responds.</p>

<p>I don't actually know what he's right about. I <em>think</em> I know but need to be sure.</p>

<p>Deep Throat keeps me busy while I wait for answers.</p>

<p>"What's the scoop?"</p>

<p>"Boyd rotation. But I can't go with it yet."</p>

<p>"Why not?"</p>

<p>"Because Al and Brad aren't answering."</p>

<p>"You're soft."</p>

<p>Mato confirms Sánchez will begin the season in the bullpen.</p>

<p class="has-dateline no-indent"><span class="dateline">CHICAGO, <em>April 4</em>—</span>After a rainout, Opening Day finally arrives. Clouds continue to cake the sky, sprinkles drop off-and-on, and the gloomy gray U.S. Cellular Field looks as ugly as ever.</p>

<p>I'm in my third year of making the Opening Day clubhouse rounds, offering up a handshake and, "good luck, good health."</p>

<p>This year, I add the training staff to the mix. Trainers, like coaches and scouts, love being treated as being part of the team—because they very much are. They are about to win or lose ninety games, too.</p>

<p>As I stand in the clubhouse pregame, seeking out any strays I'd missed, closer Shane Greene shouts to me from his seat along the wall. I've grown increasingly comfortable with Greene over the past year.</p>

<p>"Hey Anthony. Come here."</p>

<p>Greene thumbs through his phone.</p>

<p>"Remember when you asked if you could see my blister last year and I said 'hell no' or something like that? Well, here's what it looked like."</p>

<p>He turns the phone to me, showing the kind of multi-colored, oozing blood blister that would put a pitcher on the disabled list—the kind of blister I hope to never in my life see again.</p>

<p>But finally getting a look at Shane Greene's epic blister is proof of why I walk around the dressing room shaking hands on Opening Day every year. Why do I spend so many days inside a major-league clubhouse every year? That's the payoff, right there.</p>

<p>Outside in the dugout, there's an industrial-strength propane heater at one end, blowing fire. I sit mostly by my lonesome, on the top seat where the manager would.</p>

<p>I'm wearing a red knit winter hat. Wind bounces around the stadium, which is silent but for the symphonic melody of the grounds crew's equipment tinkering with the tundra. A pair of bundled-up pitchers walk onto the field and out toward the bullpen. As I start to follow their trail, I feel a hand on my left shoulder.</p>

<p>It's Al Avila, who has come to receive his good-luck handshake. We bring it in for a warm hug instead.</p>

<p>And, despite conditions, the game is played. Verlander wins on Opening Day.</p>

<p class="has-dateline no-indent"><span class="dateline"><em>April 18</em>—</span>Standing in front of the visitor's dugout, staring into the camera, hand shaking a bit as I hold the microphone. Jordan Zimmermann walks by, as close as one can without touching me. I'm waiting for today's MLB Network spot to begin.</p>

<p>"Face for radio if I've ever seen one."</p>

<p>Zimmermann's dry humor is appreciated—I'm still more than a tinge nervous for the red light, and he loosens me up. The veteran righty starter is a pretty solid guy, I've found—the Wisconsinite out of Division III University of Wisconsin-Stevens Point comes with more normal qualities than most hundred-millionaires.</p>

<p>Like his first two starts this season, Zimmermann's debut last year in Detroit was a mixed bag. We exchanged numbers at the end of the season. Our subsequent offseason exchanges were entertaining, with Zimmermann either acting like he doesn't have my number or saying something sarcastically stupid. This is to say—I like him.</p>

<p class="has-dateline no-indent"><span class="dateline">OAKLAND, Calif., <em>May 7</em>—</span>Two minutes into today's pregame media session, the manager has a question for this Ball Writer.</p>

<p>"Are those the same pants you had on yesterday?" Brad Ausmus asks.</p>

<p>"Yeah, they are. Thanks for noticing that. I got nine different shirts for this road trip, and you call me out on the pants. Tough crowd."</p>

<p>Ausmus is more interested in his tablet than the Tiger Beat gathering round. Asked if his right fielder, Nick Castellanos, is going through a little bit of a slump right now: "Not really. He's actually hitting the shit out of the ball."</p>

<p>Ausmus is following the real-time GameCast data of Class A Lakeland's matinee. Now batting J.D. Martinez, the Tigers' rehabilitating slugger who could return within the week—Martinez has been out with a foot strain since stumbling over a sprinkler in the spring.</p>

<p>"What did J.D. just do?" Ausmus waits for the screen to load. "He hit a home run."</p>

<p class="has-dateline no-indent"><span class="dateline">ANAHEIM, Calif., <em>May 11</em>—</span>Waiting for my luggage at John Wayne Airport, itching for a scoop, I decide to give Martinez a try.</p>

<p>"You know when you're joining the team yet?"</p>

<p>We're in Disneyland this week, which has been far from The Happiest Place on Earth for the Tigers—Detroit hasn't won a series here since 2009. They have been trudging along, bobbing over and under the .500 mark for the past month. Martinez's impending return should give the starting lineup a boost—he homers again today, this time for Triple-A Toledo. He doesn't text back.</p>

<p>Powered by seven sterling innings from reigning rookie of the year Michael Fulmer, they take the opener. Fulmer picks up the victory and lowers his ERA to 2.54 in seven starts.</p>

<p>Martinez rejoins the team tomorrow. He singles in his first at-bat, then hits two homers the next night. After the game, I opt against writing from the awkward press box at Angel Stadium, heading back to the hotel instead. In the parking lot, I come across first base coach Omar Vizquel and his teenage son, Nico.</p>

<p>Vizquel off-handedly asks for a ride. I don't know if he's joking.</p>

<p>"I'm looking for the Uber lot."</p>

<p>"I don't know where the Uber lot is, but I can give you a ride."</p>

<p>I drive them to the team hotel in Newport Beach.</p>

<p class="has-dateline no-indent"><span class="dateline">CHICAGO, <em>May 26</em>—</span>Halfway through the longest road trip of the season—11 games in 12 days—I land at O'Hare around 2:30 <span class="small-caps">A.M.</span> and check into my room past four. I set an alarm for 9:30 and shut the curtains.</p>

<p>Stepping into the hotel gym, I'm smacked by breaking news while scrolling Twitter.</p>

<p>It's National Guy Jon Morosi, who says, "If Tigers are still under .500 by end of June, sources say… all veterans will be available in trade."</p>

<p>I head up to the room and write a story, summarizing Morosi's report. It's clearly coming from someone In The Room. I don't return to the gym.</p>

<p class="has-dateline no-indent"><span class="dateline"><em>May 27</em>—</span>I write a column decoding Morosi's reporting for the readers.</p>

<p>"<em>Within that message—a wholly unsurprising one, given the Tigers' current play and future state—was a message from the front office to the team. That message was clear: You guys need to start playing better, and soon.</em>"</p>

<p>The words drive Avila berserk—he's booming through my phone between the doubleheader, taking exception to the notion he'd be communicating through the press.</p>

<p class="has-dateline no-indent"><span class="dateline">KANSAS CITY, Mo., <em>May 29</em>—</span>Avila accepts my apology, messaging early Memorial Day: "I read your stuff. Now we can kiss and make up."</p>

<p>I arrive early to the stadium and hop on MLB Network in a suit while Brad Ausmus completes his workout routine around the field. I sweat through my suit in only five minutes on the field. Afterwards, I squat in front of an industrial fan inside the visitor's dugout to dry off.</p>

<p>Standing alongside MLB.com's Jason Beck in the clubhouse, I scan the large throwback baseball cards displayed above players' lockers, easily identifying the stadiums the photos were taken in. I acquired this talent rummaging through boxes of my dad's baseball cards in the basement.</p>

<p>"Impressive," Beck nods.</p>

<p>Justin Verlander must think so, too. Momentarily, he walks up with a kind smile on his face, bearing gifts.</p>

<p>"Anthony," pinning a red poppy onto my baby blue blazer.</p>

<p>"Jason," pinning a red poppy onto Beck.</p>

<p>Verlander is active in the veteran's community and established the Wins For Warriors foundation to support Iraq and Afghanistan war vets.</p>

<p>I do my part to further Verlander's philanthropic endeavors by writing a piece on the red poppy.</p>

<p class="has-dateline no-indent"><span class="dateline"><em>May 30</em>—</span>The charitable, cheery feeling in this corner of the clubhouse does not last.</p>

<p>The next day, as I'm standing in the same spot with Beck, Francisco Rodríguez walks up. K-Rod does not seem happy. Earlier this month, after blowing back-to-back saves in Oakland, Rodríguez lost a grip on the Tigers' closer role. Last night, he blew another save—his fifth in twelve tries this season, ballooning his ERA to 7.79. Looks like he simply doesn't have it anymore.</p>

<p>Rodríguez comes this way with a badly bruised ego. He can't get anyone out and could soon be cut. Making matters worse, he read what I wrote in the paper. By <em>what I wrote</em>, I mean <em>what the manager said</em>: "We have to find out if he can pitch with the game on the line, quite frankly."</p>

<p>This distinction makes no difference to Rodríguez, who holds his phone and waves me closer. On the screen, his career stats are proudly shown—spanning sixteen seasons and 437 saves, fourth-most all-time. <span class="media-emoji" data-media-id="k-rod-stats">🔗</span> I recently sat with him for a feature story on his flame-throwing glory days, so Rodríguez feels comfortable enough to call me out.</p>

<p>"You see these? How many saves? Is that good?"</p>

<p>"Yes, it's very good… Borderline Hall of Fame good."</p>

<p>"You think that's mop-up? I can't pitch in close games?"</p>

<p>Before I can explain to K-Rod the difference between what I wrote and what the manager said, he shakes his head and walks away.</p>`,
        wordCount: 2700
    },
    {
        id: 15,
        year: 2017,
        section: 'year',
        title: "FIREWORKS",
        subtitle: "Detroit, Up North, Kansas City, Arlington",
        teaser: "Trade deadline chaos, the Kinsler-Hernández rant, and the solar eclipse blowup.",
        content: `<p class="has-dateline"><span class="dateline">DETROIT, <em>July 2</em>—</span>Pulling into the parking lot yesterday, I got a ping from Top Scout—"Are you here tomorrow?"</p>

<p>Sure am. He sits across from me inside the auxiliary media dining room, recapping his recent travel. Been on the road for almost three weeks. Flew in yesterday, flying out today, so he's rooting for a quick game.</p>

<p>Top Scout is a special-assignment guy—handling the highest priorities. He's a trusted advisor for the Cubs front office, who sent him here to watch Verlander face the Indians today.</p>

<p>The Tigers are reeling as trade deadline season kicks into gear, all but dead in the water since losing eight straight recently. At the halfway point, Detroit is 36-44. Inconsistent offense, subpar pitching, aging roster. Their fortunes began fading when J.D. Martinez stumbled over a sprinkler head in spring training. Now, their fate seems clear: barring an unlikely midsummer surge, they're shaping up as sellers—with big-name players available.</p>

<p>None bigger than Verlander, who wants no part of a rebuild.</p>

<p>Top Scout asks what I think.</p>

<p>Give him the 411: Verlander is well-respected in the clubhouse, but more superstar and less leader. On the mound, Verlander is still good. I predict someone will get a nice payoff trading for him. I assure him that Verlander wants out. "Definitely… He might <em>need</em> to get out."</p>

<p>While I'd get retweets and new followers by mentioning Top Scout's presence, I hold off—with a month until the trade deadline, I'm not risking today's relationship gains with rumor-mongering tweets. My goal is strengthening the relationship for the possibility of an actual trade.</p>

<p>I <em>do</em> share the Cubs' scouting mission with Verlander's agent, Mike Milchin, fulfilling my role to provide information (give) for future considerations (take).</p>

<p>"FYI: Cubs sent one of their special assistants here to watch Justin."</p>

<p>It's a disastrous day for Verlander, who is clubbed by Cleveland so badly that my scout can watch the final innings from the airport bar.</p>

<p>Verlander is pulled with one out in the fourth inning. He allows seven runs on nine hits and three walks. For the first time in his career, he strikes out nobody.</p>

<p>Top Scout leaves town unimpressed.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline">UP NORTH, Mich., <em>July 5</em>—</span>Although I promised not to be on my phone this holiday weekend, here I am—scrolling underneath sunsetting skies, still cursing National Guy Jon Morosi to the heavens.</p>

<p>Morosi is one of the nicest guys you'll ever hate. Yesterday, he blew my cover. First, he shared my inside information on Twitter: "Cubs inquired to Tigers on availability of Justin Verlander and Alex Avila, sources say, but sides have not engaged in trade negotiations." Then he called out my source, telling everyone that a "top Chicago scout" was at yesterday's game.</p>

<p>Still thinking about it a day later, since I abandoned the plan of spending vacation without a phone glued to my hand.</p>

<p>"That's all I'm asking," my girlfriend said.</p>

<p>Yet here I am, sneaking swipes at Twitter every ten minutes. Tonight, I sit at a campfire on a sweater-weather summer evening—fireworks, stars, all that jazz—after a day I strove to stay off the phone. An off day. I see the progress I've made—1 hour and 27 minutes on Twitter—a 43 percent decrease from yesterday.</p>

<p>I'm on the beat. That's every day from February to October. These are workhorse sports-writing roles—the first thing you think about in the morning and the last thing you think about at night. Your life is dictated by your job. You're diving out of luggage, usually alone and married to the game.</p>

<p>Soon going overboard, taking a full-blown phone call from work: "I have to take this call… I'm sorry."</p>

<p>It's not my fire, but my beloved <em>Free Press</em> sports department is starting to smolder. Beat mate George Sipple just called to say Mark Snyder, our machine-like Michigan beat writer, is leaving the paper. Snyder has covered U-M for the past twelve years.</p>

<p>Snyder is a consistently tireless sports writer with strong sourcing and scoops to prove it. He's also under-appreciated. The final straw comes when Snyder is denied a chance to cover Michigan Football's preseason camp in Italy while a columnist gets the kush gig.</p>

<p>"They drove Mark out," George says.</p>

<p>Nobody seems safe. Beat writers are in the crosshairs, fighting off aggregators, influencers and hot-take artists. Many left on their own. It felt personal, watching the hardest working reporter walk away.</p>

<p>I soon get a text message from an unfamiliar number.</p>

<p>"This is my new number. Hope you stay in touch—Mark Snyder."</p>

<p>I think about something Perry Farrell once said. Farrell, a longtime <em>Free Press</em> preps and general assignment sports writer, quipped: "They'll burn you all out. I feel sorry for you and Mark."</p>

<p>It will get worse in a hurry. Nine days from now, Kevin Bull resigns, citing "an even more important and involved job… one that centers on my two kids." He served as sports editor since January 2016, leaving the <em>Freep</em> after eleven years—and newspapers altogether.</p>

<p>When I became a full-timer in September 2011, the Freep Sports schedule listed thirty-seven names, including fifteen writers. Now, we're down to sixteen names, with nine writers. No sports editor or assistant sports editor, but we did end up hiring a sports content coach and let me tell you.</p>

<p>But even as the newspaper industry and the <em>Freep</em> have been buffeted, the beat remains. My job is to cover a team with its own accelerating change—none of it good.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline">DETROIT, <em>July 5</em>—</span>I get a message from Mitch Albom—he's looking for his Baseball Writers' Card.</p>

<p>"Do you or someone have my baseball writers pass? Trying to track it down."</p>

<p>I have been safe keeping his card since the chapter chair handed 'em out. The Tigers haven't been good enough to get Mitch out to the yard, save an Opening Day here or there.</p>

<p>He needs the badge for a pregame on-field promotion for his theater play.</p>

<p>Before becoming famous for writing heart-tugging, Hallmark-worthy fiction, Albom won the yearly top sports column contest thirteen times. Only one other columnist has won it twice. Mitch influenced a generation of sports writers, many of whom were introduced to him not via print but on TV—watching <em>The Sports Reporters</em> on Sunday mornings on ESPN. He made being a sports writer cool and became something of the first sports writer talking head.</p>

<p>Mitch was on ESPN2 when it went live on October 1, 1993, sitting alongside Suzy Kolber and Keith Olbermann, who wore a leather vest and said, "Good evening, and welcome to the end of our careers."</p>

<p>Albom paved the way for sports writers to become multimedia celebrities. In the mid-nineties, he wrote for the <em>Free Press</em>, hosted a radio show and appeared regularly on TV. He was awarded the Red Smith Award in 2010—the sports writing equivalent of the Hall of Fame.</p>

<p>"I'll be at Hockeytown Cafe in the theater. Can you drop it by?"</p>

<p>Of course, I can—it's not every day you get a chance to DoorDash your idol.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline">KANSAS CITY, Mo., <em>July 17</em>—</span>With the trade deadline two weeks away, I'm on special assignment, sort of like Top Scout.</p>

<p>I'm accompanying teammate George Sipple to Kansas City—a good old fashioned fire sale could begin flaming soon, we don't want to be caught flat-footed.</p>

<p>Inside the clubhouse, players admit to hearing their names.</p>

<p>"It's definitely getting down to it and you're hearing it a lot more," outfielder J.D. Martinez says before the series opener against the Royals. "Every time you look at the TV, MLB Network or whatever, you're constantly seeing it. But I think it's more for a guy like Justin (Wilson) than me, right now."</p>

<p>Martinez, the slugging outfielder, and Wilson, the lefty reliever, are two of the Tigers' popular trade pieces. Despite emerging from the All-Star break with a series win over Toronto (and manager Brad Ausmus still at the helm), Detroit's front office has decided to break up the band.</p>

<p>Martinez is a month shy of his thirtieth birthday and will be a free agent after this season. Since returning from his spring training injury, he's been one of baseball's most feared hitters</p>

<p>Facing a roster reset, Avila is all but certain to trade Martinez soon—so suspicions arise when he's pulled late in the opener against the Royals. The Tigers are ahead by seven runs and Martinez doesn't return to the field for the sixth. Injury? Trade? Playing it safe? Someone online says Víctor Robles, a top prospect center fielder in the Washington Nationals system, has been removed from his game. Related?</p>

<p>I text a Nats' Top Scout: "Tigers want a young CF. Anything there?"</p>

<p>With Martinez's status up in the air, sources come to the Ball Writer for info. A Dodgers guy asks: "Whatcha got?"</p>

<p>I text him back <em>before</em> I put it on Twitter: "Lower back tightness."</p>

<p>Not what the front office wants to hear—Avila had been discussing a Martinez trade with Arizona throughout the day. After the game, J.D. terms his exit "precautionary." He thinks dehydration may be to blame—it was ninety-two degrees at game time.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>July 18</em>—</span>This evening, it's ninety degrees at Kauffman Stadium—but decidedly cooler inside the air-conditioned press box, where news breaks an hour before the game. Martinez, hitting fifth and starting in right field, is "close" to being traded to the Diamondbacks.</p>

<p>"Close" is quickly becoming sports writing's accepted way of couching the scoop. A lot can happen between "close" and "done." Three minutes later, after one National Guy is credited with the "close" report, another National Guy swoops in to close the gap.</p>

<p>It's "done," Jeff Passan says—J.D. Martinez to the D-backs.</p>

<p>Good thing they've got me here: I'm officially beaten on the story. I forget chasing for confirmation and focus on what the Tigers are getting in return. I text nine sources, some of them part of the traveling front office party, currently huddled in a suite at the team hotel in Country Club Plaza. The trade is announced before I can get anything more.</p>

<p>We're called down to the visitor's dugout for parting thoughts from J.D. He walks up with teary-red eyes and hops onto the high seat.</p>

<p>"I grew up a lot here. I love this team, I love this organization, I love everything Detroit—that's home for me. This is the organization that believed in me when no one else did."</p>

<p>After reconstructing his swing, the Astros' cast-off reclaimed his career with Detroit in 2014. He's turned a minor-league deal into $21.5 million and counting.</p>

<p>J.D. is one of my favorites. We've come a long way since early friction, when I wanted to talk with the Mysterious Hitting Guru—a testament to how relationships can be strengthened along the way.</p>

<p>Not everyone is melancholy about the trade.</p>

<p>"That sucks about J.D.," I remark to a veteran pitcher in passing.</p>

<p>"Why? He sucks in the outfield."</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline">KANSAS CITY, Mo., <em>July 20</em>—</span>With trade deadline season in full swing (eleven days away), things are starting to pick up. I wake up to a tip from Jordan Zimmermann, who sent a pair of texts my way at 1:50 <span class="small-caps">A.M.</span></p>

<p>"Got breaking news!… More breaking news!!!!!!!!!!!!!!"</p>

<p>After breakfast, more substantial rumors need to be chased—a National Guy throws Justin Verlander's name into the wind, saying the Houston Astros are interested in both Verlander and lefty reliever Justin Wilson. Poking around, I don't hear much about that one.</p>

<p>"Going on MLB Net later," I text a source. "I've gathered HOU interest in Verlander is overblown, would that be accurate?"</p>

<p>"Yes it is. Probably won't happen."</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline">DETROIT, <em>July 24</em>—</span>Like an elephant, Mike Moustakas doesn't forget.</p>

<p>Walking through the Royals clubhouse this afternoon, minding my business, Moustakas calls me out.</p>

<p>"Hey, there's the guy that said we were a beatable team. Who's beatable now?"</p>

<p><em>When did I say that</em>? A month ago, I went on MLB Network and said time was ripe for the Tigers to make a move: "Beginning with the Royals, they have some winnable games coming up."</p>

<p>Kansas City puts 'em in the casket: The Tigers are swept, outscored 24-6 in the series and fully humiliated at home—utilityman Andrew Romine recorded more outs than malcontent Bruce Rondon, who was ejected for throwing beanballs in the 16-2 loss.</p>

<p>Rondon incited the Royals, former champions, which led to this scene in the clubhouse, many minutes after the lopsided win.</p>

<p>Someone screaming in the showers, half-naked with a full smile walking out.</p>

<p>"I love this fucking team!"</p>

<p>After he dresses, I introduce myself to Moustakas.</p>

<p>"You guys really shoved it up my ass."</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>July 29</em>—</span>I've decided to write a column blasting the Tigers for their lack of competitiveness, calling them soft for how the team of high-priced veterans were bulldozed by the Royals.</p>

<p>I know my angle and what I'm going to write. Today, I don't see either Miguel Cabrera or Víctor Martínez—some players tend to hide when things aren't going well.</p>

<p>I stay late and wait for second baseman Ian Kinsler.</p>

<p>Kinsler, thirty-five, is a four-time All-Star in his twelfth season.</p>

<p>"Leadership… Is there anything this team is lacking besides players? Who are the lead–"</p>

<p>He cuts me off.</p>

<p>Kinsler has been doing this long enough to know what reporters are writing about by the questions they ask. He can be an intimidatingly straight shooter.</p>

<p>The clubhouse is emptying. "You already know what you're going to write. Just write it."</p>

<p>He provides his logic for passing on the leadership question.</p>

<p>"Why would it make sense for me to talk about leadership? Because that would portray me as the leader of the team, and then this issue falls on my shoulders."</p>

<p>Kinsler sits between Cabrera and Martínez's empty lockers—the two players publicly portrayed as team leaders. He shrugs his shoulders and points at each side.</p>

<p>"What can I do? What can I say to those guys?"</p>

<p>Soon, the conversation becomes off-the-record. The kind that builds trust.</p>

<p>Kinsler says many things without really saying them. When I bring up the manager, he says the problems start above him.</p>

<p>"It starts at the top. At the top."</p>

<p>Out of the corner of my eye, I see the grim reaper. It's PR, cutting off the conversation.</p>

<p>"The clubhouse is closed."</p>

<p>About ten minutes later, I see Kinsler on the field. He's walking my way with a bat in one hand and another hand extended. We shake hands.</p>

<p>"Thanks for the chat earlier."</p>

<p>"Same here. I enjoyed it."</p>

<p>I decide to let him know what I know.</p>

<p>"Say… I know about what happened last year."</p>

<p>"What?"</p>

<p>"The fight with Víctor."</p>

<p>Kinsler looks back at me differently, in acknowledgment of what I said—knowing the damage it could do.</p>

<p>"Are you going to write it?"</p>

<p>I won't write it just to write it—bringing up past clubhouse incidents without current relevance feels like tabloid territory.</p>

<p>Kinsler messages later. "Good talk today. Excuse me for being so guarded. I think… I'm not trying to blow anyone up."</p>

<p>"Same here. I know it's a sensitive situation… I'm not trying to blow anyone up, either, but it comes with the territory sometimes."</p>

<p>"I guess. I think this will take care of itself and you will have plenty to write about."</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline">ARLINGTON, Texas, <em>August 14</em>—</span>On my first day back on the beat after attending a wedding in Cancún, I head to Ian Kinsler's corner. It's become something of a comfort area, after our conversations last month. Kinsler's locker is closest to the showers with an empty stall next door—respect shown to a veteran and former Texas Ranger.</p>

<p>I mention how tired I am from traveling—Cancún to Chicago to Fort Worth.</p>

<p>"Come on, man… You were in Cancún."</p>

<p>Tonight, Kinsler is ejected in the fourth inning by home plate umpire Ángel Hernández for arguing balls and strikes. After a poor strike call on the first pitch of the at-bat, Kinsler sends a sarcastic remark back to Hernández following a ball outside— "How about that one?"</p>

<p>Hernández promptly tosses Kinsler, leading to one of the most memorable interviews of a Ball Writer's life.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>August 15</em>—</span><span class="small-caps">WHAT'S SAID IN HERE, STAYS IN HERE</span>.</p>

<p>A big banner hangs on the wall in the visitor's clubhouse here, above where Ian Kinsler is sitting back in a scrum of reporters, sounding off on veteran umpire Angel Hernández. Hernández ejected Kinsler last night for arguing balls and strikes.</p>

<p>"He's messing with baseball games. Blatantly. It's not just like a borderline call here or there… I didn't even cuss at him. I just said you need to re-evaluate your life, man… I'm just saying it's pretty obvious that he needs to stop ruining baseball games… He needs to find another job… If I get fined for saying the truth, then so be it… He's that bad. I'm not mad at him for being bad. He just has to go away."</p>

<p>At the risk of spoiling the fun, I speak up.</p>

<p>"So, is this fair game? I'm just looking for clarity because you're being very candid."</p>

<p>"I don't care. I'll get fined, I guess. Candidly, leave the game. No one wants you behind the plate anymore. No one… None of the players."</p>

<p>Kinsler talks for nearly twenty minutes.</p>

<p>"Write what you want. Just keep the cuss words out of it."</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>August 16</em>—</span>Brad Ausmus says Kinsler has indeed been fined by the commissioner's office—it's by far the highest fine he's seen in his career.</p>

<p>He won't disclose the amount. Years later, Kinsler will—revealing it was $10,000, roughly eighteen percent of my yearly salary at that time.</p>

<p>Verlander pitches the series finale against Texas and loses, allowing five runs in six innings. Afterward, he seems to welcome questions about his future.</p>

<p>The July 31st trade deadline came and went with no takers.</p>

<p>"Right now, I'm looking around the locker room and Miguel will be back here, I'll be back here, Kinsler will be back here, Justin Upton will be back here and a lot of other guys. That's a pretty good core of guys. There's a brighter side to look at."</p>

<p>"Is there anything specific in your mind that needs to change?"</p>

<p>Verlander knows where I'm going—the guy who sets the tone in the clubhouse and fills out the lineup card every day. I needn't say names.</p>

<p>Verlander pauses. He utters an unconvincing "no" instead.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline">DETROIT, <em>August 22</em>—</span>The commissioner is on the scene.</p>

<p>Making his annual trip around the circuit, Rob Manfred is at Comerica Park. With the coast clear and the commish in town, I have an easy excuse for conversation with Justin Verlander.</p>

<p>I stroll up. "So, Manfred is here today…"</p>

<p>Verlander is one of the first pitchers to complain publicly about how MLB manipulates the baseballs—making them easier to hit harder and farther.</p>

<p>"Do you have any questions you want me to ask him for you?"</p>

<p>Verlander can't help himself. "Ask him why they keep changing the balls."</p>

<p>He spirals into a mini rant, then stops.</p>

<p>"I gotta throw… But you know what the worst part might be? That it's going to impact the history books."</p>

<p>He points to Al Kaline's locker. "Guys like him, their numbers get shit on now. He's got three thousand hits… How many home runs did he hit?"</p>

<p>"399."</p>

<p>"Exactly. He'll get passed by guys nowadays—because of these baseballs—guys who couldn't hold his jock strap."</p>

<p>In divine intervention, Kaline walks this way. Justin turns back at me, as if to say—<em>We were just talking about him</em>. Verlander and Kaline stop to chat, and I join them. They're talking about the solar eclipse. Apparently, Verlander flew to Nashville to watch the eclipse from inside the path of totality.</p>

<p>He describes how the sky went completely dark—so dark the streetlights went on. How everybody screamed, and some cried.</p>

<p>"It was the most beautiful thing I've ever seen in my life."</p>

<p>"So, you're kind of a dork, huh?"</p>

<p>Verlander, the alpha ace pitcher, is absolutely not a dork.</p>

<p>"No. I'm not a dork."</p>

<p>"No, no… I'm not saying it in a mean way. I'm a dork, too."</p>

<p>"I like astronomy."</p>

<p>"That's interesting. I didn't know that. I like space and science, too."</p>

<p>I figure: If I don't know that, then the public definitely doesn't know that—and fans will think it's just as cool as I do.</p>

<p>I walk down the tunnel to the dugout and send two tweets:</p>

<p><em>Justin Verlander watched the solar eclipse from the Path of Totality. "It was the most beautiful thing I've seen in my life," he said.</em></p>

<p><em>Verlander, an admitted astronomy enthusiast, traveled to Nashville to watch the eclipse in its fullest totality, he said.</em></p>

<p>I was trying to humanize the guy. Instead, Verlander is inflamed. A team PR official comes up to me during dinner in the press box and says, "JV didn't like your tweets. He said he was in a private conversation with Al Kaline."</p>

<p>Verlander isn't at his locker postgame.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>August 23</em>—</span>Same time as yesterday, just before batting practice.</p>

<p>I'm sitting in the dugout next to Omar Vizquel when I see Justin out of the corner of my eye.</p>

<p>He walks up the dugout steps behind us. I look back.</p>

<p>"Really? Really?"</p>

<p>This proves to be the wrong approach.</p>

<p>Verlander returns serve with verbal rage, quickly going 0-to-100. He says this is horseshit and that is horseshit and I'm horseshit. I stand up and trail him out of the dugout.</p>

<p>"Justin, this isn't very professional. Do you want to talk about this?"</p>

<p>"Unprofessional? You know what's unprofessional? Do you know who that was? That's Al Kaline, a baseball legend!"</p>

<p>He's loud, demonstrative, and doesn't listen. "Calm down. Let's talk."</p>

<p>Verlander walks onto the field. I follow.</p>

<p>"Get the fuck away from me!"</p>

<p>He walks to the pitchers' stretching circle in left field, shaking his head and waving his glove. He tells the other pitchers how I hijacked his private conversation with Mr. Tiger. Back inside the clubhouse, he shows the tweet around.</p>

<p>My up-and-down relationship with Justin has crashed again.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>August 24</em>—</span>On the tarmac at DTW for a short flight to Chicago, watching highlights of today's base-brawl between the Tigers and Yankees.</p>

<p>TV cameras also catch an argument between Víctor Martínez and Justin Verlander, and it's galloping across the Internet. It's unusual for two veteran teammates to go at it like they do—screaming in each other's faces—especially a starting pitcher and designated hitter, who locker at opposite ends of the room.</p>

<p>But more than anything, it's the first open sign of player discontent with Martínez inside the clubhouse. What was once a private issue has now gone public. By take-off, I know the time for the Very Serious Story has come. Before landing, I've decided on a plan.</p>

<p>A crew member comes over the speakers.</p>

<p>"Buckle up. Midway runways are short, and landings can be quite aggressive—make sure your seatbelt is tight."</p>`,
        wordCount: 3200
    },
    {
        id: 16,
        year: 2017,
        section: 'year',
        title: "SUMMER 2017",
        subtitle: "Part II",
        teaser: "The Very Serious Story.",
        content: `<p class="has-dateline"><span class="dateline">CHICAGO, <em>August 24</em>—</span>I reach out to sources as we land.</p>
            <p>To general manager Al Avila—"I'm writing about how Víctor is a problem in the clubhouse, dating back to an incident last season. I can't hold off any longer. The timing is never going to be good—but now with what happened today, it's out there."</p>
            <p>To manager Brad Ausmus—"This isn't comfortable. I'm somewhat conflicted. I strive to build trust with the players and understand this might hurt that. But I also feel I'm doing a disservice to my position if I don't write it. I just want to give you a heads up. I'm going to ask Víctor about it tomorrow and give him the opportunity to comment before anything runs."</p>
            <p>To second baseman Ian Kinsler—"I just wanna run this by you. I'm planning on writing about Víctor's presence in the clubhouse. If you have any thoughts on going about this, I welcome them. I respect your opinion."</p>
            <p>Avila: "No worries. You do what you have to do."</p>
            <p>Ausmus: "I can't really comment. I understand where you're coming from. Maybe talk to me tmrrw."</p>
            <p>Kinsler: "Do what you have to do. It's your job. Just be careful with the other players. Good luck. Don't get punched."</p>
            <p>"Lol"</p>
            <p>"For real."</p>
            <p>I spend tonight writing the Very Serious Story, stressed about what's to come.</p>
            <p>I reach out to the Highest Source In The Land.</p>
            <p>"I'm about to lose the clubhouse for good, aren't I?… Sorry, just thinking out loud. I strive to build players' trust, and this might kill it all."</p>
            <p>Soon, Avila is shouting through the phone, saying how he wishes Martínez would just retire, for crying out loud. If Martínez voluntarily retires, he'd forfeit the remainder of his salary.</p>
            <p>"But he doesn't have the fuckin' balls to. He wants to get released, and I'm not gonna fuckin' do it."</p>

            <p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>August 25</em>—</span>With the bulk of the Very Serious Story written, I need to talk to Martínez and Ausmus at the ballpark today.</p>
            <p>Ron Colangelo calls: "Anthony, what are you writing?"</p>
            <p>When top PR is reaching out, it's a Very Serious Story indeed.</p>
            <p>"Anonymous quotes are not good."</p>
            <p>Martínez was once my strongest player-relationship in the clubhouse. When I drove two hours outside Cleveland one summer night in 2014, his minor-league foster parents allowed me into their house in Warren, Ohio, and talked with me for a feature story on Víctor. I'm proud of the rapport I share with his son, Víctor Jose—all because his dad one day introduced me as Anthony, "who's gonna be a really good baseball writer."</p>
            <p>Now here I am, pointing the pen at him.</p>
            <p>The visitor's clubhouse in Chicago's U.S. Cellular Field is basic—a rectangle with lockers on three sides. A pair of circle table-tops and couches. Training room behind curtains in the back. A wide doorway leads to the manager's office, coaches' room and food pantry.</p>
            <p>Ten feet separate where I stand from Martínez's empty locker. When Martínez appears, it's the best-case scenario. He walks out no more than a few minutes after the clubhouse opens. No players sit on either side—not many around, actually. I walk to him and tell him directly:</p>
            <p>"I'm writing a story about how you've been a clubhouse problem. I know about the fight last year, and I've talked to players and coaches. So, if you want to answer questions…"</p>
            <p>Víctor smirks, paying more attention to the tan bat he's taping up. He plays with the bat in his hands, rolling his wrists while making no eye contact.</p>
            <p>"Look, you know I don't want to write this kind of story. I know your family…"</p>
            <p>Martínez doesn't break character. Same look, still twitching the bat.</p>
            <p>"Write what you want."</p>
            <p>"Did you initiate a fight last sea—"</p>
            <p>"Write what you want."</p>
            <p>I ask Víctor if there's anything he wants to say. He shakes his head, looking straight down at the handle of his bat. He twirls it around and appears to be smiling now.</p>
            <p>"Write what you want."</p>
            <p>After Ausmus' pregame media session, I linger outside of his office as other reporters leave. I pop my head back in.</p>
            <p>"Got a minute?"</p>
            <p>As I sit down, media relations manager Chad Crunk appears. Ausmus waves him away.</p>
            <p>I give him the low-down. There's a clubhouse problem with Víctor dating to a fight last season, and it's now out in the open. I'm going to write about it.</p>
            <p>Ausmus is nothing if not consistent. He upholds his policy about not speaking on internal issues. Even when I afford him the chance to go off-the-record, the fourth-year manager stands strong.</p>
            <p>"Are there anonymous sources?"</p>
            <p>He's dejected when I deliver the answer.</p>
            <p>Back in the dressing room, James McCann wants to talk. In private.</p>
            <p>"Can we talk outside?"</p>
            <p>In his third season, McCann has earned a chunk of respect inside the Tigers' room. We've developed a good relationship—talking about personal topics, like our grandfathers growing ill and dying, and the challenges of living out of a suitcase.</p>
            <p>"Is the story coming out?"</p>
            <p>"Yeah. Tomorrow or Sunday."</p>
            <p>"Who have you talked to?"</p>
            <p>"You know I can't tell you that. All I can say is that I've had this for a while. And I've had people come to me with unsolicited information, that's how bad it's been."</p>
            <p>McCann says there isn't a problem in the clubhouse.</p>
            <p>"It's a problem when guys are talking to me about it."</p>
            <p>McCann says I should only write about what happens on the field. But clubhouse problems influence what happens on the field.</p>
            <p>He points out our working relationship, saying it could change: "You've always been good to me, and I've always tried to be good to you. I might not be able to do your interviews anymore if you write this."</p>
            <p>We can't find common ground. We do shake hands, though. I follow him back inside, remembering what Pedro Gomez told me last night: "You cannot leave the clubhouse. You need to be in there from start to finish, until the second it closes."</p>
            <p>I take in stares. Feels like forever. Finally, PR closes the room.</p>
            <p>Tigers lose. The bullpen blows it, again.</p>
            <p>Verlander pitches well. He throws seven innings, allows two runs and strikes out eight. But his postgame performance is the main event. As is custom, the starting pitcher always speaks with the media after the game.</p>
            <p>We'll finally get the chance to ask about yesterday's shenanigans. The media crowd gathers around Verlander's locker. Rival Cohort begins: "I know you might not want to talk about what happened yesterday…" (Ausmus remarked pregame that Martínez and Verlander were playing cards on the short flight to Chicago.) "Everything is good, right?"</p>
            <p>Verlander gladly takes the exit ramp. "All good."</p>
            <p>I follow up.</p>
            <p>"Justin, what happened yesterday between you and Víctor in the dugout?"</p>
            <p>"What are you talking about?"</p>
            <p>"The argument which was caught on video and shared on social media…"</p>
            <p>Verlander cuts me off. "You should stop."</p>
            <p>"The altercation that was shared on social media…"</p>
            <p>"OK. I'm leaving."</p>

            <p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>August 26</em>—</span>Late in the game, a lump in my throat. Been building all day.</p>
            <p>Sitting in the back of the press box, off to the side, small table near the fountain machine. I feel like I should reach out to Martínez's minor-league host family and tell them what's coming.</p>
            <p>I start crying when I think about it. I walk out of the press box to the concourse ramp to calm myself. Back inside, once composed, I text Bob Bixler.</p>
            <p>"Hello Bob, this is Anthony. This is a tough message to send to you, but I feel it's only right to do so. Tomorrow, we're running a story about Víctor being a distraction in the clubhouse. It was not easy, but I have a responsibility to my employer and the readers to report information about the team. I understand this will likely hurt my relationship with other players, which I strive to build trust with.</p>
            <p>"I also understand this could sever my ties with you guys and Víctor Jose. Thank you again for allowing me into your house to tell your story with Víctor and I hope I have the opportunity to write a more positive story about him in the future. This message has been the toughest part of this process—until I face the team tomorrow. Please pass this along to Patti. I hope all is well."</p>
            <p>"Thanks for the heads up. Business is business."</p>
            <p>Half an hour later, he texts again: "I'm in Cooperstown watching Víctor's son play. Just giving you a heads up that I am with Víctor's wife, and I need to let her know what is coming. I'm sure her phone will explode tomorrow."</p>
            <p>If we publish the story. Ron Colangelo has been in touch with sports content coach Chris Thomas. He and another Gannett editor fret until print deadline passed. But we can still publish online.</p>
            <p>"This is going to drop tomorrow," Thomas says.</p>
            <p>"So, what are we waiting for?"</p>
            <p>Postgame, I'm in and out of the clubhouse. I quickly file a game recap.</p>
            <p>Packing up my stuff, I see a message flash onto my phone. It's Ian Kinsler.</p>
            <p>"Be careful. You might lose the clubhouse."</p>
            <p>Maybe. Players have a 'pack mentality'—even if I'm writing about an issue that most of the clubhouse agrees with, they won't be seen speaking to me out of solidarity. But I knew I hadn't lost Ian Kinsler.</p>
            <p>Despite any previous pessimism, we iron out the final few wrinkles. Very Serious Story is in the hopper by 11 <span class="small-caps">P.M.</span>, ready to go live online at 1 <span class="small-caps">A.M.</span> local time—the plan is to run it in the following day's print edition.</p>
            <p>Nearing midnight, I receive a most unnerving text message.</p>
            <p>"U might want to hold off on ur story."</p>
            <p>I handle this well: "What the fuck, man?… Sorry… What's up."</p>
            <p>"I'm just saying the timing might not be great."</p>
            <p>I ask why.</p>
            <p>"U will find out tmrrw."</p>
            <p>"You can't just say that. Like, there is a story that's going up very shortly. If you have a chance to call me, please do—because I do not want to fuck this up."</p>
            <p>"You cannot use this. In any way at all."</p>
            <p>"Ok."</p>
            <p>"Vic went to the hospital tonight. Heart issues again. Gonna be DL'd. But u can't release this in any way, shape or form."</p>
            <p>"Ok."</p>
            <p>And with that, Brad Ausmus saves our bacon.</p>
            <p>It would've looked terribly tone deaf if we ran an exposé about how Víctor Martínez is a clubhouse problem on the same day he's sent to the hospital with a heart condition. I can't decide if I'm angry or sad—or mostly relieved?</p>
            <p>"I appreciate you reaching out to me."</p>
            <p>"Honestly, if this comes out before tmrrw, it will be a major issue."</p>
            <p>"You have my word."</p>

            <p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>August 27</em>—</span>After fitful sleep, I see a text from a player, sent at 6:16 <span class="small-caps">A.M.</span></p>
            <p>"Did u write it??"</p>
            <p>Word travels fast. When I talked to him about the Very Serious Story previously, he asked if it included anything about Martínez hogging one of the clubhouse TVs for video games.</p>
            <p>I text him back. "Technically, yes… Did we publish it? No." I explain why not.</p>
            <p>"So that gave u a change of heart??"</p>
            <p>"I don't think we can run that story when he's on the DL for that. That's serious."</p>
            <p>"Glad u didn't print it… Repercussions wouldn't of been worth it."</p>
            <p>In a yellow cab to the stadium, I start to text Pedro Gomez and realize I haven't confirmed that Martínez actually went to the hospital.</p>
            <p>"The skeptic in me wonders if it's too much of a coincidence, but I doubt it—that's serious stuff."</p>
            <p>"That was my first thought, also. We have to be cynical. It's part of our DNA… This is why holding things is never a good idea. Should have run two days ago."</p>
            <p>Inside the clubhouse, we're quickly pulled into manager Brad Ausmus' office. Afterward, I attract eyes. Verlander and Jordan Zimmermann sneak looks from inside a cut-out cubby hole that doubles as a video area and snack bar.</p>
            <p>I'll stay here until I can't anymore, giving players the opportunity to address any issues with me.</p>
            <p>I lean against the brick wall closest to Miguel Cabrera's locker. Only when the clubhouse closes, only then, does Cabrera say something—shouting in Spanish as I turn to head out.</p>
            <p>Sitting in the press box before game time, I text Bob Bixler again.</p>
            <p>"Obviously, the story is not coming out now. I found out about the hospital shortly before it was set to go live and we canned it for the time being. I hope it doesn't have to run."</p>
            <p>"I hope it never runs… I hope you understand!!"</p>
            <p>Throughout the game, I'm kept company by those in the know.</p>
            <p>"Send me the article," a source says, sharing his personal address.</p>
            <p>"That's a well written drill down on a guy's deterioration of character. Unpleasant. You may suffer a little blowback. Not on the substance of what you wrote. But on the ever-changing code to not write such things."</p>
            <p>The rest of the day is a daze.</p>
            <p>After the postgame manager's session, I split. Take the stairs to the third floor and quickly pick up my gear in the press box. Not even thirty minutes after the final pitch, I'm stuck behind a crowd of suite-dwelling drunks waiting for the elevator.</p>
            <p>I consider taking the stairs, but decide to cut ahead of the crowd, squeezing into the elevator car. I don't feel ashamed—the third level is listed as <span class="small-caps">PRESS LEVEL</span>.</p>
            <p>The last scene before the elevator door closes: A man's bald head. Streaks of rain on the window. Dark clouds.</p>

            <p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline">DENVER, <em>August 30</em>—</span>The change of scenery has been welcome—my fortunes changed immediately after I landed in Colorado two nights ago. The cab driver got me to the dispensary just before closing time and I've slept well since then—after the past weekend, I needed at least six solid hours.</p>
            <p>The visitor's digs at Coors Field are decidedly nicer than those in Chicago. With the Very Serious Story shuttered, tension inside the dressing room has dissipated. I've felt my way around, keeping a distance, unsure if I should talk to clubhouse sources in the open.</p>
            <p>Before today's series finale, I see Justin Verlander's brother talking with rookie relievers—former minor-league teammates, probably. Ben was released last month after five seasons in the minors.</p>
            <p>Older brother Justin is pitching today. Tomorrow is the non-waiver trade deadline, the last day Verlander can be traded. Nobody claimed him when he cleared waivers, so today's outing is his last chance to show teams he's the ace they need for the stretch run.</p>
            <p>Verlander leaves a good impression: He throws six strong innings, allowing one run on three hits. He strikes out nine and records his first career RBI.</p>
            <p>They win, all is well, players are in good spirits. Of course, I had yet to walk in the happy clubhouse. And by now, we know what can happen when I do. Given the circumstances of the previous weekend and communication with PR—that Verlander isn't going to speak with me anymore—I'm on alert.</p>
            <p>I tell Crunk: "You have to know that if Verlander doesn't want to speak to the media when I'm around, that's fine. But I'm not going to leave. My credential allows me to be there."</p>
            <p>Crunk quietly sends the message to Verlander, who shakes his head in defiance.</p>
            <p>Soon, he waves the writers over. Verlander puts on a sport coat, straightening the cuffs.</p>
            <p>I wait for two others to ask questions before asking mine.</p>
            <p>"How big were those two strikeouts in the fourth inning?"</p>
            <p>His eyes dart away.</p>
            <p>"Next question. Next question."</p>
            <p>I wait my turn to ask another.</p>
            <p>"How was your fastball today?"</p>
            <p>Verlander ignores me.</p>
            <p>"Anyone else?" Crunk asks.</p>
            <p>Verlander leaves.</p>

            <p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>August 31</em>—</span>When I arrive at the Denver airport for a two-leg trip home, the pieces for a wild trade are coming together in St. Petersburg, Florida.</p>
            <p>Today, Astros manager A.J. Hinch is ejected early from Houston's hurricane-displaced game against Texas. Miffed, with time on his hands, Hinch connects with Tigers adviser Scott Bream and rekindles trade talks. From inside the visiting manager's office at Tropicana Field, over speakerphone, the framework for trade deadline fireworks is falling into place.</p>
            <p>Me? Don't know anything about it. With my luck, Verlander will get traded while I'm in the air.</p>

            <p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline">DETROIT—</span>I get home after 10. Less than two hours to go, and conditions appear calm on the Verlander trade front, comfortable enough for a welcome back pour.</p>
            <p>Deep Throat confirms the front office is In The Room. Apparently, they are spending the deadline at Al Avila's suburban Detroit home.</p>
            <p>Working every contact I have—scouts, PR flacks, anyone who might know something—I take a call from a Houston scout. We're in the same boat. We know nothin'.</p>
            <p>That's when I see a tweet from my buddy.</p>
            <p>"Oh, shit… Oh, shit. Gotta go."</p>
            <p>The first person I text is Tigers GM—"Is it true?"</p>
            <p>"What's going on? There's something out there about the Astros."</p>
            <p>No answer back.</p>
            <p>Assistant GM David Chadd: "Nothing."</p>
            <p>"What's going on? Is there a deal?"</p>
            <p>"No."</p>
            <p>Rival Cohort retracts his report. "I have been told Verlander deal is off. Apparently, he didn't waive no trade clause."</p>
            <p>Tapping in from the subway, a clued-in Astros guy says the deal isn't off. "Shit hit the fan; we had a deal done."</p>
            <p>Thirty minutes until midnight. Pour another drink.</p>
            <p>I reach out to Verlander's agent again. "Dude. My main competitor has this and you're hanging me out to dry."</p>
            <p>Ten minutes before the deadline, I consider breaking forbidden glass: violating one of three cardinal rules to my long-standing relationship with Deep Throat.</p>
            <p>I break the glass.</p>
            <p>Deep Throat. Finally. "They still haven't said anything. So, we're finding out together."</p>
            <p>A buzzer sounds on MLB Network. Midnight comes and goes without a word.</p>
            <p>"Nothing????"</p>
            <p>Finally, Deep Throat delivers the Big News: "Apparently, he said yes at 11:59."</p>
            <p>But I can't yet claim this as my own yet. To Avila: "Come on. I got a tip it's done. What the hell."</p>
            <p>I pray I don't get backdoored by Ken Rosenthal. I type the words in, ready to go.</p>
            <p>The Tigers have traded Justin Verlander to the Astros, I'm told.</p>
            <p>The cursor hovers over the button—CLICK HERE TO WIN.</p>
            <p>Devil on my shoulder: Being first is all that matters. Brain: Being right is all that matters.</p>
            <p>Al Avila is calling. I grab the phone as fast as I can.</p>
            <p>"Is it done?"</p>
            <p>"Yes, the deal is done."</p>
            <p>"Thank you," and nothing more.</p>
            <p>The call lasts eleven seconds. I click here and WIN.</p>
            <p>My name crawls across the bright red breaking news bar on the TV screen. According to Anthony Fenech.</p>

            <p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>September 1</em>—</span>I arrive at the ballpark today as Big Man On Campus—the beat writer who scooped the National Guys.</p>
            <p>A doubleheader beckons—Tigers and Indians. In the afterglow of the big trade, I reach out to Richard Verlander for the parents' perspective. I step out between games to take his call—when it all went down, they were sleeping.</p>
            <p>Walking back into the press box with my head down, I run into ESPN.com reporter Katie Strang, who seems in a rush. I don't know what Strang is up to—but she's leaving halfway through a doubleheader for a reason.</p>
            <p>Strang had a nose for the story, staking out Verlander's favorite brunch spot. Who does she find when she arrives? Justin and Kate, sharing a table.</p>
            <p>"I knew it was their spot and figured they would give it one more go-round before they leave town."</p>
            <p>Strang took a seat at the bar, bought them a drink and intercepted them as they left. Such an exclusive could even the score—which Strang desperately wants after getting beat.</p>
            <p>Lucky for me, Verlander keeps quiet. After skirting questions, he slips in and out of Comerica Park without detection, grabbing his goods from the clubhouse and avoiding the media.</p>
            <p>I text Verlander's agent Mike Milchin between games. "Working on a story about the trade. Give me a ring whenever you have a few minutes to chat."</p>
            <p>"You'll need to ask the club. I've not commented in nineteen years on any transaction and or how/why it happened. Sorry."</p>
            <p>With no thanks to Milchin, here's the backstory of the deal…</p>
            <p>Everything changed with a phone call at 10:30—Astros GM Jeff Luhnow to Al Avila.</p>
            <p>Ninety minutes later, the two sides came together at nearly the last possible moment. Two baseball operations officials made the ten-minute drive from Avila's house to Verlander's apartment with simple instructions: "Wait."</p>
            <p>They waited while Verlander weighed the decision—stay or go.</p>
            <p>The Tigers did their part, putting pressure on him to accept the deal by leaking that he blocked it. It worked: Verlander signed away his no-trade rights sometime before midnight.</p>
            <p>When the league office approved it, I was the first reporter to know, breaking the news of my favorite player a decade after I decided to become a Ball Writer.</p>`,
        wordCount: 3650
    },
    {
        id: 17,
        year: 2017,
        section: 'year',
        title: "WORLD SERIES",
        subtitle: "2007-2008, Fall 2017",
        teaser: "The origin story, and Verlander finally wins it all.",
        content: `<p class="has-dateline"><span class="dateline">DETROIT, <em>May 22, 2007</em>—</span>It’s my first week at the <em>Free Press</em>.</p>

<p>When I arrive, the security guard asks me to sign-in and calls up to Sports. When the prep sports editor arrives, he tells the guard I’m new on the Prep Crew and I’ll need a badge.</p>

<p>Say cheese!</p>

<p>I’m nineteen and finishing my second year at community college. I didn’t really apply myself in high school and got a 2.8 GPA. The plan was to get good grades and transfer to a big journalism school, but school has never been my thing.</p>

<p>So, I’m diving headfirst into sports journalism. I worked an unpaid internship at Detroit’s sports radio station last year, and I still write blogs for the show’s website sometimes.</p>

<p>Inside a back room on the newsroom’s third floor, I receive my first taste of sports writing, answering phones as coaches call in to report scores and statistics. I put ‘em in a text file and send ‘em to an editor before deadline.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>August 31, 2007</em>—</span>Sports writing is going great so far.</p>

<p>I’ve earned a bunch of “contributing” bylines for writing short game recaps. I find these stories easily when coaches call in with a close score. I gauge the game’s worthiness by asking, “Was it a good game?”</p>

<p>If they answer convincingly, I ask for details and write a short story. Mom cuts them out of the paper as mementos.</p>

<p>Last month, I got the chance to cover my first game—a Little League matchup for the state championship. The local team’s victory landed my story in the community section of the Sunday Paper!</p>

<p>The Prep Crew is packed to the gills during high school football season: Six guys every Friday night. Sounds like a call center. One person handles the score list: it’s important to get as many scores into the early editions as possible.</p>

<p>We have an eclectic mix on the Prep Crew. Some will carve out impressive careers: Jon Machota will one day cover the Dallas Cowboys. Marty Dobek is a future steward for the Detroit Sports Commission.</p>

<p>But many have no sports writing ambitions. Corey moonlights as rapper Leaf Erikson. Matt is going to business school. Charlie is a musician. Nobody knows what James does, or if it’s legal. From the back room where the Prep Crew sits, I look over my shoulder at a Sports Department powerhouse: cubicles filled, editors by the dozen and a roster of writers covering everything under the sun.</p>

<p>In 2007, Freep Sports has a staff of 44, including 24 folks manning the desk and 18 sports writers covering Detroit’s pro and Big Ten teams, columnists and general assignment reporters. We’ve even got writers for outdoor sports, motorsports and prep sports.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>September 5, 2007</em>—</span>Today is my first Tigers game as a member of the media. I’m official. I’ve got a credential with my name and affiliation: <em>Detroit Free Press</em>.</p>

<p>I’m tagging along with longtime Tigers beat reporter John Lowe, who obliged when asked to shadow him at a game. I want to see what a beat writer <em>does</em>. Lowe is an institution.</p>

<p>In the press box, John pulls a thick book from his bag. “Don’t let me forget. I have something I want you to read.”</p>

<p>Inside the clubhouse, I stand feet away from guys I grew up idolizing.</p>

<p>In the manager’s office, Tigers skipper Jim Leyland is lying on a couch in a tank top, smoking a cigarette. He’s asked about tonight’s rain forecast.</p>

<p>“I had a rule in A-ball… They get on the bus, and I say, ‘If you fuckers look up at the clouds, I’m fining the shit out of you.’” Uproarious laughter.</p>

<p>Leaving Leyland’s office, I’m sold on sports writing.</p>

<p>John looks at me. “That is what the Mona Lisa of baseball managers looks like. They’re not all made like that.”</p>

<p>Back in the clubhouse, I do what any 19-year-old would his very first time here—I walk up to my favorite player, Justin Verlander, last year’s American League Rookie of the Year. Earlier this year, I nearly drove my car off the freeway when he threw a no-hitter. It was my grandma’s funeral that day, which I think was a message from heaven.</p>

<p>I introduce myself as a <em>Free Press</em> intern and ask: “What do you chew?”</p>

<p>“Oh. Dip… Copenhagen straight.”</p>

<p>I’m one numb-skull question away from Verlander calling security.</p>

<p>During the game, John has me track Kenny Rogers’ pitch velocity. After I transcribe Leyland quotes, he passes me the book.</p>

<p>Leaving the ballpark, I’m hooked. I fear I’ve been drugged by this life.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>February 10, 2008</em>—</span>I’m about to meet another legend today, after picking John Lowe’s brain all winter. We’d meet up at bookstores and Ram’s Horn. I keep notes, so I don’t lose the wisdom he shares.</p>

<p>I turned twenty last fall, so I need all the guidance I can get. Seamhead was already a Ball Writer at my age. I’m still answering phones.</p>

<p>But I did end up helping cover five Tigers games last year—and now I’m hanging out with Tigers’ broadcasting legend Ernie Harwell.</p>

<p>I’m at Harwell’s retirement complex for his surprise 90th birthday party. One of his friends invited me, and here I am sitting with Ernie and his wife Lulu.</p>

<p>Me and Ernie, shooting the breeze—my dad’s gonna think this is so cool.</p>

<p>I did my research, so I know what to ask. “Who were your favorite performers?”</p>

<p>“The big bands, that’s the era I liked.”</p>

<p>He talks about Bing Crosby and Frank Sinatra. Brings up B.J. Thomas.</p>

<p>“I don’t know if you remember him or not.”</p>

<p>“I can’t even grow facial hair… I don’t remember a lot of those guys.” I tell Ernie I want to be a sports writer.</p>

<p>“Freelance writer is a tough job. When I got out of school my senior year, I planned to be a newspaper man, and I couldn’t get a job. So, I’m really a failed sports writer.” Ernie laughs.</p>

<p>I ask for his favorite sports writers.</p>

<p>“I think the sports writers today are a lot better than they used to be… They’re better trained on the literary side. When sports writing first started, the sports editors were the guys that had the good contacts. They really couldn’t write much, but they hung around the pool, and they knew the gamblers—so they could get information.</p>

<p>“And it’s developed now where guys can really write, they can put a phrase together.” Ernie praises Detroit sports writers—Mitch Albom, Drew Sharp, John Lowe. One day, I hope to be mentioned in the same breath.</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">DETROIT, <em>September 21, 2017</em>—</span>Ten years later, plans change in a hurry. It’s Friday afternoon and I’m ironing my suit jacket, getting ready for a wedding when I get a text.</p>

<p>3:33 <span class="small-caps">P.M.</span>—"What’s going to happen at Comerica today?”</p>

<p>Nothing that concerns me. The Tigers host the Twins—but I’m off.</p>

<p>“Picture Day?” (The day where everyone arrives early for the official team photo.)</p>

<p>“Between us, the Tigers called us to make sure we send someone down for pregame sound.</p>

<p>I didn’t tell you.”</p>

<p>That doesn’t sound like Picture Day. It sounds like an alarm.</p>

<p>“What’s this presser about?” I text manager Brad Ausmus.</p>

<p>“How did the beat writer from the paper of record get no heads up on a press conference?” I text Ron Colangelo.</p>

<p>“Just get here.”</p>

<p>I apologize to my friend: “I’m really sorry but not gonna be able to make it tonight… breaking news.”</p>

<p>Deep Throat reaches out—he has my back. I listen, thank him, text the GM. “I got a tip Brad isn’t coming back and I’m going to go with it after I shower.” The Highest Source In The Land urges me to shower quickly.</p>

<p>I’ve already found out. Besides Deep Throat, I have a source on the coaching staff saying,</p>

<p>“Looks that way, but not 100 percent certain.”</p>

<p>Teammate George Sipple is at the stadium—PR has called a presser inside the dugout.</p>

<p>4:10 <span class="small-caps">P.M.</span>—On my way to the stadium, I’m navigating a school zone when I hit send—The</p>

<p>Tigers will not extend Brad Ausmus’ contract beyond this season, I’m told.” I pump my fist—I’ve got the scoop.</p>

<p>Ausmus and Avila take questions. I listen on the car’s radio with my tape recorder riding shotgun. Al told Brad two nights ago the Tigers weren’t going to exercise his option for 2018.</p>

<p>“I told him if he’d have walked in and offered me a contract, I probably wouldn’t have come back… Because the team and this organization are starting over and need a new voice.”</p>

<p>4:32 <span class="small-caps">P.M.</span>—Arriving late but victorious, I walk onto the field. Particularly peeved to see me is Katie Strang, who had a bead on the news since before I was tipped off. Strang walks to the opposite end of the dugout when I arrive.</p>

<p>Seven hours ago, I was getting ready for a wedding. Now, I bleed out a blowout loss.</p>

<p>I use the time to write a column. I consider calling Brad but figure he’s all talked out. The sports desk’s headline goes live: <span class="small-caps">TIGERS PARTED WAYS WITH AUSMUS 2 YEARS TOO LATE</span>.</p>

<p>“<em>Ausmus, a player’s manager to a fault, was not the right fit for a team that needed more conviction than comfort from a leader. In talking with Tigers people, that notion was repeated.</em> “<em>And, so, the immediate reaction to the unsurprising news is that it had been a long time coming. But it should have come much sooner.</em>”</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">KANSAS CITY, Mo., <em>September 26</em>—</span>When the final road trip of the season begins, the Tigers rest comfortably in free-fall mode, losers of seven straight. Between the lines and behind closed doors, players can’t wait for the season to mercifully end.</p>

<p>After Ausmus’ perfunctory pregame remarks, I pop my head back into his office—much the way I did a month ago in Chicago. That time, I needed to question him on the chemistry that evaporated beneath the surface of his underperforming veteran team.</p>

<p>This time, I want to clear the air. Taking a seat across from Ausmus in the empty office, I ask if he read my column.</p>

<p>“Yeah, I did.”</p>

<p>“I guess, what are your thoughts on it?”</p>

<p>“I don’t really have many. I’m a little surprised you didn’t reach out to me.” The comment hits home. I wince.</p>

<p>I did consider calling him the night of the announcement, postgame. But I didn’t want to bug him into talking again about the bad news of losing his job. What I wrote wasn’t personal—I was just calling it like I saw it.</p>

<p>“I could’ve given you my side of things. I think I’ve helped you out in the past…”</p>

<p>“And I appreciate that.”</p>

<p>Ausmus thought I was piling on with the column. That wasn’t my intention—but I wish I’d called him. If I had, he likely would have provided me background information to balance the column.</p>

<p>He picks up his phone and starts scrolling.</p>

<p>“The other day, I got this text from a baseball writer. I won’t say who, but he said about your story—he said, ‘That piece is the problem with our industry these days.’”</p>

<p>I’m charged with playing Monday Morning Quarterback, joining the vocal majority, jumping on someone by public demand when they’re down. If I’m guilty of anything—and I am— it’s not doing my due diligence in reporting the story. I should’ve called Ausmus before writing that column—which is why I slinked into his office today.</p>

<p>Ausmus, forty-eight, has been in professional baseball longer than I’ve been alive. He was drafted by the Yankees in the 48th round of the 1987 draft. He’s caught more games than all but six catchers in history. And now he’s sitting across from a third-year Ball Writer who just wrote that he should’ve been fired two years ago.</p>

<p>“Quite frankly, you’re not qualified for your job.”</p>

<p>It’s a dagger delivered to me in private. My column was delivered to 400,000 <em>Free Press</em> readers. Wince again.</p>

<p>“Compared to a guy like John Lowe—no, I’m not qualified for my job… But I’ve been doing this for a while. I know how to write. I know baseball…” “No, you don’t. You don’t know baseball.” What’s a third-year Ball Writer to say?</p>

<p>“I guess you’re right.”</p>

<p>I take my medicine. We shake hands and I leave feeling a little bit better—but still sour that I didn’t call.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>October 1</em>—</span>The Tigers have just wrapped up a last-place season (64-98) with a lopsided loss to Minnesota.</p>

<p>When reporters entered the clubhouse, Cabrera sat visibly emotional in front of his locker with a towel draped over his head. Hitting coach Lloyd McClendon consoled him.</p>

<p>But after disappearing for a minute, Miggy re-appears with a big smile, smells like booze and sways our way.</p>

<p>He comes closer and says louder, “Lloyd McClendon… Fredi González… Ozzie Guillén.” This was Cabrera’s way of relaying his preferences for the Tigers’ open managerial seat. Before I can establish an on- or off-the-record discussion, he’s gently led away by the team’s Spanish translator.</p>

<p>I wasn’t the only Ball Writer who heard Miggy’s endorsements. Neither of us wrote about</p>

<p>it.</p>

<p>I circle back to Cabrera on the way out.</p>

<p>“Have a good offseason.”</p>

<p>“Later, bro.”</p>

<p>Outside the clubhouse, I wait for the Highest Source In The Land. Al Avila walks out with a phone to his ear.</p>

<p>“Just checking my voicemail.”</p>

<p>“I just wanted to say thank you.”</p>

<p>When we bring it in for a handshake and a hug, I see <em>Fredi González</em> on his screen.</p>

<p>“Fredi González, huh?”</p>

<p>“You motherfucker.”</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>October 19</em>—</span>For the second year in a row, my birthday is interrupted by breaking news.</p>

<p>Last year, starting pitcher Daniel Norris revealed he’d been diagnosed with thyroid cancer. This year, the Tigers have hired a manager. In no surprise, general manager Al Avila has opted for a veteran—Ron Gardenhire, longtime Minnesota Twins skipper.</p>

<p>To my chagrin, I’m caught off-guard by the news, broken by Katie Strang and Ken Rosenthal. I’m furious with Gardenhire’s agent, John Boggs.</p>

<p>I was so out of touch with the Tigers’ search that I was texting players earlier about support for hitting coach Lloyd McClendon, who was promised an interview.</p>

<p>To Boggs: “Is this accurate about Gardenhire?”</p>

<p>“Anthony, I do not have anything to report at this time.”</p>

<p>“John, the National Guys have this. What gives?”</p>

<p>“Anthony, don’t know what the National Guys have—only can tell you that I don’t have anything to report at this time. Hope you can respect that.”</p>

<p>Biting my tongue: “Yes, I do. Thank you for getting back to me.”</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">LOS ANGELES, <em>October 31</em>—</span>At the airport again. I get a text from Alex Avila, who says he’s in Italy. I reached out to Alex once my flight was booked: “I have to write a story on Verlander. Is there anything behind the scenes you might know, any possible angles, etc.?”</p>

<p>I’ve been sent to L.A. on last-minute notice. Yesterday, my sports editor called and asked if I’d fly here to cover the rest of the World Series—they’re interested in the Verlander angle. The Astros lead the series, 3-2, one win away from winning it all. Game 6 is tonight at Dodger Stadium—Justin is on the mound.</p>

<p>It’s another chance to drop in on my favorite player growing up.</p>

<p>Credentialed in the auxiliary press box for Game 6. I sit at a World Series game, texting Gator, who’s at the airport in Miami getting ready to fly to Italy for Verlander’s wedding on the Amalfi Coast.</p>

<p>In his first-ever chance to win the World Series, Verlander pitches well but allows the Dodgers two fateful runs—Houston scores only once and they lose.</p>

<p>I prepare for the potential worst-case scenario—a pissed-off postgame Verlander who previously swore to never answer one of my questions again… popping out from the pack of reporters… a prime chance to embarrass me in front of the National Guys.</p>

<p>I don’t know what to expect.</p>

<p>I stand around his locker two guys back—tall enough to see straight at him. Verlander’s session has begun. He’s a few questions deep, scanning the scrum while answering a question. I’m startled when he spots me and stops.</p>

<p>“Oh, Anthony. Hey.”</p>

<p>He says it friendly, like, ‘<em>Hello, Old Pal</em>!’</p>

<p>“Where was I? Oh, yes…”</p>

<p>Now I have to ask a question. To Verlander’s left, the Astros PR guy sends a warning.</p>

<p>“Last couple, guys.”</p>

<p>At the buzzer, I lob my question.</p>

<p>He answers. I’m relieved.</p>

<p>As the crowd disperses, celebrity news breaker Jon Heyman walks by. “He seemed happy to see you. He must like you.”</p>

<p><em> </em></p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>November 1</em>—</span>In Game 7, Houston ambushes the Dodgers in the first inning. George Springer jumps a Yu Darvish fastball for a lead-off double and scores on a throwing error. The Astros score twice before Darvish records an out.</p>

<p>The next inning, Springer. Again. He homers on a hanging slider. 5-0, Houston. It’s an anti-climactic series finale from there.</p>

<p>Verlander isn’t needed for duty. He watches the final out from the bullpen, streaming onto the field in a celebratory sprint with the rest of his mates.</p>

<p>Inside the clubhouse after the Astros win the World Series, I awkwardly hover with my tape recorder stretched behind a cameraman while Ken Rosenthal interviews him on FOX.</p>

<p>Even after yesterday’s friendly display, even after Houston wins, I’m not sure if Justin will stonewall me. I’m not the only reporter stalking him when he leaves the TV interview. A pair of entertainment reporters charge his way. I cozy up alongside as a small scrum starts to form.</p>

<p>Opposite is a woman from<em> E! News</em>, who wastes no time asking about the reported wedding. “Is it true that you and Kate Upton are getting married on Saturday?” Verlander doesn’t say no.</p>

<p>“I’m not going to speak on the details… I’m just happy we won.” She’s intrepid, though. She asks if the wedding is in Italy.</p>

<p>“I’m just glad we won the World Series.”</p>

<p>Asked if he has a message for his fans back in Detroit, Verlander says, “Thank you for everything over the years, thank you for recognizing all the hard work that I put in, thank you for recognizing how hard of a decision this was for me. Thank you from the bottom of my heart.” We shake hands and we go our separate ways—Old Pals once again.</p>

<p>When I leave the clubhouse, I walk past Verlander family members on their way in—his mom, his dad, his soon-to-be wife (sunglasses off) and his little brother.</p>

<p>They are moving fast, ready to celebrate. One of them sees me and offers a quick wave of acknowledgment as they hurry past.</p>

<p>I write the stuffing out of that story—it takes until the sun comes up.</p>

<p>“<em>Verlander wore an Astros shirt. A backwards hat with a certain accomplishment in his eyes.</em></p>

<p>“‘<em>I can’t even put it into words; This experience is everything I dreamed it would be.’</em></p>

<p>“<em>But for so long, his dream came true in Detroit. A city he considers home, with teammates he considers family, for the only fans he’s known. And damned if he didn’t try. But when he finally won the World Series, the thought was not far behind.</em></p>

<p>“‘<em>Yes,’ he felt the support of the city this postseason, he said, trying to wipe away the winning burn that ultimately brought him here. ‘I absolutely did.’</em></p>

<p>“‘<em>I’m never going to forget my time in Detroit… It’s a special place for me.’</em></p>

<p>“<em>After a few hugs and a kiss from a teammate, eyes still burning and Budweiser in hand, Verlander reached for his cell phone. It was sitting on a toiletry bag in his locker.</em></p>

<p>“<em>The bag had the Olde English ‘D’ on it.</em>”</p>

<p>The next day, I hear from Verlander’s dad, who shared the story on his Facebook page. I even get a message from Tigers legal guy John Westhoff, who never texts me.</p>

<p>“Nice article about J.V.”</p>

<p>“Thanks. See you at the GM Meetings.”</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">ORLANDO, Fla., <em>November 14</em>—</span>I begin the GM meetings with a bang.</p>

<p>“Mark Montgomery has a minor league deal in place with the Tigers,” an agent source alerts. “MLB invite. Say from a source.”</p>

<p>Montgomery is a journeyman reliever. His signing may not move the needle—minor-league deals are the shrimp in a sea of scoops. But it feels good to get one out of the way early.</p>

<p>First night at the lobby bar, I’m talking to a New York scribe when two Tigers Guys walk up—Alan Avila and Sam Menzin.</p>

<p>Avila is assistant legal counsel. Menzin is the pro scouting director.</p>

<p>I get on well with Avila, the oldest of Al’s two sons. He is much more cut from his father’s cloth than younger brother Alex, the team’s longtime catcher.</p>

<p>Menzin, meanwhile, has been a cold case. I last spoke with him two years ago, when he stonewalled me after his promotion.</p>

<p>“I don’t talk to the media,” Menzin said then.</p>

<p>With drinks flowing steadily, Avila and Menzin mesh easily with us. The New York writer talks with Menzin and exchanges cards with him—something I’ve been trying for years.</p>

<p>“Wow! You’ll give <em>him</em> your card, but not <em>me</em>? Just when I thought we were making strides, Sam.”</p>

<p>“I was younger then… I didn’t know what to do. I’ll give you my number. What’s yours?”</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">ORLANDO, Fla., <em>December 10</em>—</span>Back in Orlando for the winter meetings. I’m a seasoned vet— it’s my fourth meetings.</p>

<p>Opening night isn’t laid back this year—two legendary Tigers are up for election to the Baseball Hall of Fame, with the announcement in a couple hours.</p>

<p>Starting pitcher Jack Morris and shortstop Alan Trammell are part of this year’s Veterans’ Committee ballot for players not elected by the Baseball Writers’ Association of America.</p>

<p>I await the Veterans’ Committee decision in my room, writing up four different stories to cover all bases—one if both players get in, one if neither gets in, one each if only one gets in.</p>

<p>The official word comes shortly after 6 <span class="small-caps">P.M.</span>—the Tiger teammates are headed to Cooperstown. Morris was selected on fourteen of sixteen, Trammell on thirteen. After media teleconferences, Trammell speaks with the Tiger Beat downstairs.</p>

<p>“I’m not usually at a loss for words, but it’s overwhelming.”</p>

<p>After the scrum, I rush up to the room. I upload the video from Trammell’s interview and send it to the web desk. I text with Deep Throat. I phone Kirk Gibson: “About time.”</p>

<p>General manager Al Avila shares a video from dinner at Shula’s Steak House.”</p>

<p>“We gave Tram a standing ovation. Toasted him. Jack is not here yet.”</p>

<p>In the video, Tram is welcomed to the private room at the restaurant. The roster of dinner attendees is deep in Detroit baseball lore—Mr. Tiger Al Kaline, Willie Horton, Jim Leyland— along with manager Ron Gardenhire and the rest of the front office.</p>

<p>“Great moment. Thanks for sharing.”</p>

<p>“Yes! What a great night.”</p>

<p>“Let me know if you want to have a cigar after your meeting, before things get crazy.”</p>

<p>“I didn’t bring any. Have one for me.”</p>

<p>“I’m offering you one… Got three.”</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>December 11</em>—</span>On the first afternoon of the winter meetings, tension simmers inside the Tigers’ suite. I’m sitting at the opposite end of the row from Katie Strang, who strikes fear in the room.</p>

<p>Last week, Detroit signed catcher Derek Norris to a minor-league deal. Norris served a season-ending suspension for domestic violence and was fined $100,000. He put his ex-fiancée in a chokehold and grabbed her by the hair when she tried to get away.</p>

<p>Instead of immediately questioning Avila over the phone, I held off, trying to curry favor— with the winter meetings a few days away, I’d have the opportunity to ask him in person.</p>

<p>Strang jumps right in. Her questions soon have Tigers’ officials tongue-tied. They point at each other, using the commissioner’s office as a shield.</p>

<p>“The main thing you should know is we called the commissioner’s office… they felt we certainly should sign the guy.”</p>

<p>Avila looks to legal counsel John Westhoff for guidance.</p>

<p>“Obviously, all of these things are serious, but it was the mildest…”</p>

<p>Avila finishes Westhoff’s thought. “The mildest of the seriousness that you can get. Let’s put it that way.”</p>

<p>Mild? A season-ending suspension and $100,000 fine?</p>

<p>In one breath, Avila says the team is confident Norris’ behavior is in the rearview mirror.</p>

<p>In the next breath, Avila says he’s never talked to Norris.</p>

<p>I ask for the Detroit Tigers’ stance on domestic violence.</p>

<p>“Obviously, we don’t tolerate it. Obviously, if there’s a domestic violence situation, it will be investigated.”</p>

<p>Asked by Strang how the team could be so confident in signing him, assistant GM David Chadd says, “I’ve known him since he was eight years old… what we did was go to the commissioner’s office and get their take on what happened.”</p>

<p>Strang also went to the commissioner’s office. She reached out to the victim, his agent, and the Players’ Association. In a statement to the <em>Athletic</em>, MLB said, “The Tigers asked if there were any issues with signing Mr. Norris. We let them know that he had completed his suspension and was eligible to sign with any club.”</p>

<p>Norris never returned to the majors, with the Tigers or anyone else.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>December 13</em>—</span>The Tigers have pushed back today’s media session. I’ve been holed up in my room pestering people like Al Avila about Kinsler.</p>

<p>“Checking in on Kinsler.”</p>

<p>Waiting for an elevator, I thumb through breaking news. Shohei Ohtani has a bum pitching elbow, according to <em>Yahoo! Sports</em>’ Jeff Passan.</p>

<p>When the elevator arrives, it opens to the National Guy responsible for breaking the news.</p>

<p>“Nice scoop with the Ohtani story.”</p>

<p>I head to the lobby bar and bring two whiskeys back—it could be a long night.</p>

<p>An hour later, I text agent Jay Franklin: “Checking in on Kinsler, sorry to bug.”</p>

<p>He answers. “Get back with ya here soon, buddy.”</p>

<p>6:59 <span class="small-caps">P.M.</span>—Ken Rosenthal reports the Angels are in serious discussions to acquire Kinsler.</p>

<p>A few minutes later, Rosenthal goes all the way. “Kinsler to Angels.”</p>

<p>The small difference in attribution indicates the source behind Rosenthal’s scoop—my</p>

<p>“buddy.”</p>

<p>In The Room sources tell me no deal is imminent. The truth between what those sources say and what Rosenthal reported is semantics.</p>

<p>Behind the scenes, Kinsler’s camp has brilliantly leveraged his no-trade protection. It’s Anaheim or bust, he tells Avila.</p>

<p>While the baseball world waits, ESPN’s Buster Olney throws cold water on the trade:</p>

<p>“Tigers do not have an Ian Kinsler deal with the Angels yet, according to sources.”</p>

<p>Rosenthal can’t resist: “Any delay on Kinsler likely would be due to his no-trade. Again, my understanding is deal will happen.”</p>

<p>Meanwhile, I haven’t heard back from Jay Franklin. “Soon, buddy” was an hour ago.</p>

<p>8:47 <span class="small-caps">P.M.</span>—I get confirmation from an L.A. scout, but I can’t go with only a scout. I use it to confirm the deal, then quickly report the players Detroit receives in return.</p>

<p>Soon after, the feeling is downright funereal inside the Tigers’ suite. Team execs arrived envisioning a sweepstakes for Kinsler. Four teams were interested initially. Then Kinsler unplugged the game, and Detroit had to settle for what little the Angels offered.</p>

<p>“It’s very frustrating,” Al Avila says.</p>

<p>11:44 <span class="small-caps">P.M.</span>—At the lobby bar, I see a couple guys from the agency that represents Justin Upton. Reuniting with Upton weighed heavily on Kinsler’s decision.</p>

<p>The trade took time because Avila held out false hope that Kinsler would budge. Kinsler phoned Avila with the bad news.</p>

<p>“I don’t know what to tell ya, buddy, but I’m only going to the Angels.”</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">DETROIT, <em>January 8, 2018</em>—</span>Nothing to report. It’s a slow offseason for Major League Baseball and Ball Writers alike. Several top free agents—including mega-stars Bryce Harper and Manny Machado—are still on the market. Former Tiger J.D. Martinez, too.</p>

<p>Meanwhile, I’m not getting many scoops. The Tigers are entering the first year of a tear-it-down rebuild. They did sign veteran righty Mike Fiers (my scoop), but otherwise, just minor-league signings.</p>

<p>They are essentially tanking, shedding expensive salaries and accruing prospects. The Tigers will stink for a few years—the worse they are, the higher the draft pick.</p>

<p>The lack of scoops is either due to the Tigers rebuild—or it’s me.</p>

<p>Maybe I’m <em>still</em> not persistent enough. Over the past year, more kid reporters have popped up—college-age guys who are breaking more news than me. I picture them glued to their phones, constantly texting sources.</p>

<p>I don’t know if I have it in me to be that obsessed all the time. To be honest, I don’t know if I <em>want</em> to. Serving the 24/7 Internet and printed newspaper deadlines makes my dream job harder each year. As a kid, I grew up wanting to be Mitch Albom. My end goal remains to be a columnist, which better suits my writing style.</p>

<p>I became a Ball Writer to <em>write</em>—not stenograph seven web updates a day.</p>

<p>Since our newest sports editor hopped in the driver’s seat last year and set the cruise to 150 mph, I’ve been snagging speed from a network of folks just to keep up—a former roommate, a guy I met in the locker room at LA Fitness, a lady I see at the Anchor Bar, a contact on the Tigers’ business side.</p>

<p>Morning web updates. Midday web updates. Pregame, in-game and postgame web updates. Videos, podcasts, tweets. Live chats and awkward questions.</p>

<p>So, I take another pill. I reach out to sources, begging around for more and more morsels of information.</p>

<p>I also realize I’m caring less and less.</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">LAKELAND, Fla., <em>February 1</em>—</span>In TigerTown early to report on top prospects.</p>

<p>At night, I search for front office guys to go out with. It comes as no surprise that I spy Al Avila. Tigers GM is at Chili’s for happy hour.</p>

<p>We decide on Fish City Grill, smack dab in the center of a nearby outdoor mall.</p>

<p>“6:30 cocktails, 7:00 dinner. You’re paying. That big newspaper expense account.”</p>

<p>In the future, when I look back on my Ball Writing life, I’ll look back on tonight as high tide. At the moment, everything is working in harmony. Anthony Fenech and the Tigers are getting along quite well. We’re setting up stories together, talking on the phone and texting, busting each other’s chops. Even Sam Menzin answers my calls these days.</p>

<p>With the rebuild underway, the pressure to win is put on the backburner. The Tigers are relaxed. Going into my fourth year on the beat, my relationships are in bloom.</p>

<p>We sit outside. Drinks and a cigar. During dinner, Avila comments how my bosses must love him—for the info he shares with me.</p>

<p>“They should be more worried I’m getting too close with you.”</p>

<p>After dinner, we head to a beer-only bar across the street and order soft pretzel bites. Al talks about his early years in baseball. He tears up talking about how tough it was traveling with the Marlins for years, leaving a young wife and two sons at home.</p>

<p>Avila also lets me in on a blockbuster trade that never happened: Last summer, the Tigers could have traded young righty Michael Fulmer to the Cubs for star shortstop Javier Báez and two prospects—Albert Almora and Víctor Caratini. But the Tigers viewed Fulmer as a rotation anchor—too high a price.</p>

<p>Sitting at the bar, Al is not the Tigers GM. I’m not a Ball Writer. Here, I’m a drinking buddy. A friend.</p>

<p>I realize that our relationship will always be rooted transactionally, in a game of give-and-take. But for the moment, our unlikely friendship is triumphing over the competing interests meant to keep it at bay.</p>

<p>Still… I’m a Ball Writer. When I get back to my hotel, I immediately write notes on what Avila told me. There might come a day.</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">DETROIT, <em>February 6</em>—</span>Things are going so well, the Tigers let me throw luggage onto their 18-wheeler of baseball equipment, training supplies and other cargo soon headed to Florida for spring training. I’ll realize later that this is a convenience afforded to everyone on the Tiger Beat—I’m not that special.</p>

<p>I park my car in the garage back home, where it’ll stay for the next six weeks, and give Mom a big hug at departures—it’s off to spring training once again.</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">SECAUCUS, N.J., <em>February 7</em>—</span>Making my annual pit stop at MLB Network. This year, I’m a panelist on the network’s afternoon show.</p>

<p>I arrive five hours early. We’re opening with the ongoing free-agent saga of J.D. Martinez.</p>

<p>After the Tigers traded Martinez to Arizona last summer, he mashed 29 home runs in 62 games, powering the Diamondbacks to the postseason. He hit the free agent market as one of the most feared hitters in baseball.</p>

<p>But in November, J.D. ditched longtime agent Bob Garber for Scott Boras.</p>

<p>Posting up in a shared office, Ken Rosenthal sticks his head in to say hello. Today is his last appearance for a while—he will soon undergo back surgery.</p>

<p>“Six-to-eight weeks,” he says.</p>

<p>Overnight, J.D. Martinez finds his name at the head of rumors, due to the latest from National Guy Jon Heyman: “Martinez is telling people in Miami that he’s willing to hold out until he gets his price.”</p>

<p>Rosenthal matches Heyman’s report and adds that Martinez is “telling people that he is fed up with the Red Sox’s inflexibility and would rather sign with another club.”</p>

<p>With the spotlight on Martinez’s situation and three years’ experience covering him, I better bring something to the stage. I text J.D.: “I’m in New York to go on MLB Network show and we’re going to be talking about you. Is there anything you would like me to get out there, message-wise?”</p>

<p>“I said you don’t seem like the kinda guy that’s gonna be pissed at any specific team for an offer.”</p>

<p>“Haha I never said those things about being pissed off. Lol I don’t know where people get this shit. I just laugh about it. Nowadays people can write anything, and everyone believes anything. What time you going on?”</p>

<p>Before I can answer, J.D. calls me.</p>

<p>“Look, Anthony: If Boston wants me to become a full-time DH, they’re going to have to pay a little bit more, you know?”</p>

<p>Martinez tells me not to say this on TV, but he’s got two offers—Arizona and Boston.</p>

<p>I want to look good. The benefits of sitting on stage are big when you recognize how they can boost your relationships. Pretty much everyone gets back to you when you’re on TV. Ken Rosenthal benefits from this every day. He doesn’t <em>have</em> to text sources—they text him. He’s got the platform to spin their intel for favors in return.</p>

<p>Seconds from live, I hear the show’s intro, producers in my ear, and we’re off…</p>

<p>Scott Braun, anchor: “This, the latest from Ken Rosenthal, on the five-year, $125 million offer from the Red Sox. Ken said, ‘He is telling people in Miami he is willing to hold out until he gets his price…”</p>

<p>“Anthony. Do you think that happens? You covered J.D. for quite a few years…”</p>

<p>“Well, first of all, the notion that he’s fed up—far be it from me to contradict any reporting otherwise—but people close to J.D. have said that’s kind of laughable. This is a guy I’ve covered for a few years, and it would be very out of character if he’s walking around pouting about $100 million.</p>

<p>“I think the big thing is that he wants to play right field, not be a designated hitter. Boston already has a right fielder, so if they want him as a DH, they’re going to have to pay premium for that.”</p>

<p>Got the first segment under my belt and the rest was a blur. Positive reviews.</p>

<p>Shuttling back to the train station, it’s J.D.</p>

<p>“Hey man thanks so much for that I just saw the interview.”</p>

<p>He’ll remain unsigned for two more weeks, until Dave Dombrowski wins the staring contest with Scott Boras. Martinez signs with Boston for five years and $110 million.</p>

<p>The news is broken by who else but Pedro Gomez.</p>

<p>He shares his source—J.D. Martinez.</p>`,
        wordCount: 5500
    },

    // 2018 SEASON CHAPTERS (18-22)
    {
        id: 18,
        year: 2018,
        section: 'year',
        title: "AWARDS SEASON",
        subtitle: "Spring 2018",
        teaser: "Highs and lows in Lakeland.",
        content: `<p class="has-dateline"><span class="dateline">LAKELAND, Fla., <em>February 13</em>—</span>The first week of pitchers and catchers isn't short on drama. Unfortunately, it's self-inflicted.</p>
            <p>I commit the worst crime of my career today. Trying too hard to make a joke nobody asked for, I take a potshot at Jordan Zimmermann's injury struggles.</p>
            <p>It's a cardinal sin to take personal shots at a player's health, which is something they largely cannot control. Especially a person who was taking incredibly painful neck injections to pitch.</p>
            <p>The next day, I seek out Zimmermann to apologize. Got a minute?</p>
            <p>"No. You're a sarcastic asshole."</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline"><em>February 18</em>—</span>More clouds hover over TigerTown. The team has lost its veteran star power except for two players: Víctor Martínez, who won't speak to me—and Miguel Cabrera, who is embroiled in an ongoing child paternity lawsuit.</p>
            <p>The <em>Free Press</em> caught scent of it recently and dispatched a news reporter and photographer to Florida. Cabrera has fathered two children with ex-mistress Belkis Rodríguez, who wants $100,000 per month in child support. He's been married to his high-school sweetheart since 2002; they have three children. The <em>Free Press</em> put a photo of the house Cabrera bought Rodríguez on the front page.</p>
            <p>Cabrera has not talked to the <em>Free Press</em> about the lawsuit—today won't be the day, either. The Tigers and Miggy are teaming up for a sideshow to deflect from his off-field drama. Joker Marchant Stadium has been taken over by the Miggy Ball 24 youth baseball camp, and the media have been invited.</p>
            <p>"Only baseball and the kids' camp, guys," says media relations coordinator Michele Wysocki. She's indicating that asking Cabrera about his out-of-wedlock kids at his kid's baseball camp would ruin the happy vibe.</p>
            <p>That's OK. I will get Cabrera one-on-one tomorrow. He'll talk to me. Maybe.</p>
            <p>Soon, I've got someone from the desk in my ear, asking if I—or anyone—asked Cabrera about the paternity suit.</p>
            <p>"No, but I'm going to ask him in the morning."</p>
            <p>"That'll definitely be worth a post. No matter how that goes."</p>
            <p>This year's Tigers are a toy bin of new players, misfits and bargains mixed with future Hall of Famer Cabrera and Martínez, a five-time All-Star.</p>
            <p>The first full-squad workout is short: By mid-morning, we're back in the clubhouse. Time to talk to Martínez, who is seated at his locker when the media overtakes him. Martínez, now thirty-nine, missed the rest of the year after his trip to the hospital in Chicago. He underwent cardiac ablation surgery two weeks later to address an irregular heartbeat issue. Now he's back ahead of his 16th season.</p>
            <p>I usually ask two questions to a player who's clearly ignoring me. Today, I ask Víctor three.</p>
            <p><em>How was your offseason</em>?</p>
            <p><em>Have you decided if this year is your last year</em>?</p>
            <p><em>Are you looking forward to helping some of the young guys</em>?</p>
            <p>Martínez answers none of them. Doesn't raise his noggin to look at me. He simply ignores me, as he's done since the Very Serious Story last year.</p>

            <p class="has-dateline no-indent"><span class="dateline no-indent">There's a new sheriff in town.</span></p>
            <p>Ron Gardenhire comes to Detroit after managing thirteen mostly successful seasons for Minnesota. Gardenhire's coaching staff is nearly a carbon-copy of his Twins crew—a loyal bunch of baseball men he trusts.</p>
            <p>Gardy brings a new vibe—they put together a playlist for infield warm-ups. Johnny Cash blasts from a big speaker while infielders take ground balls. Zero expectations. Players are loose.</p>
            <p>In his first meeting with the team, Gardenhire told 'em, "I don't know any of you guys, so I'm just going to call you 'buddy' when you're running around—until I can get a look at the back of your uniform."</p>
            <p>Today, Jordan Zimmermann has clubhouse manager Jim Schmakel stitch a trio of uniforms with <span class="small-caps">BUDDY</span> on the back. Zimmermann and fellow pitchers Michael Fulmer and Alex Wilson wear them out to the field.</p>
            <p>After workouts, I meet Tigers bench coach Steve Liddle on the back fields. I introduce myself and we walk across a field, getting to know one another.</p>
            <p>Liddle walks into the clubhouse through a back door. I walk around and enter through the lobby.</p>
            <p>Inside the dressing room, I feel an unusual energy—and eyes on me. Sauntering to the major-league side, I see why.</p>
            <p>Sheets of paper are taped to the top shelf of each locker stall. I immediately recognize my handiwork:</p>

            <p class="block-quote"><strong>Detroit Tigers Will Stink in 2018</strong><br>
            <span class="small-caps">Anthony Fenech, Detroit Free Press</span></p>

            <p class="no-indent">I pop my head into Gardy's office before leaving. He's sitting at his desk. Liddle is in a chair across from him.</p>
            <p>I tap the doorframe.</p>
            <p>"I'm a big boy; I can take it. If you ever need me to light a fire under them, let me know."</p>
            <p>They laugh. I know where the sheets came from. Liddle printed them himself.</p>
            <p>Walking away, I feel like The Man. The team's dominant veteran presence has dissolved, leaving a group of young guys. I've been in major-league clubhouses longer than most of them.</p>
            <p>ESPN.com's Jerry Crasnick asks if he can mention Gardy's ploy in a column.</p>
            <p>"<em>Gardenhire isn't averse to some time-honored motivational tactics. Shortly thereafter, copies of the story were hanging in each player's locker, courtesy of the manager.</em>"</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline"><em>February 20</em>—</span>Out killing time on the back fields when Miggy appears.</p>
            <p>He's out walking early and sits next to me on a silver titanium grandstand behind the backstop of Field No. 3. Nobody else is here. I ask about his first baseman's glove. The moment seems right, so I put it on and imagine snagging balls at first like Miggy.</p>
            <p>As we chat, a crowd of fans gathers beyond the gate. Miggy hops down and signs autographs.</p>
            <p>When workouts commence, I text Pedro Gomez.</p>
            <p>"Lengthy baseball talk with Miguel on the bench today, a conversation. Víctor was next to him (for part of this time). I didn't talk to Víctor but Miguel talking to me was big. He will be that bridge."</p>
            <p>"<span class="small-caps">THAT</span> is how you cover a baseball beat."</p>
            <p>Later, my friend Miggy returns to sit next to me on the bench again. He remains in a good mood. He snuggles up and grins.</p>
            <p>"It was Verlander, wasn't it?"</p>
            <p>He keeps looking back at Víctor, who's in another conversation at the end of the bench.</p>
            <p>"Verlander. The guy… the source."</p>
            <p>He means Verlander tipped me off about Víctor's bad behavior in the past.</p>
            <p>"You know I can't reveal my sources. You can't ever reveal your sources."</p>
            <p>But Cabrera can't get Verlander out of his head, convinced he's solved the mystery.</p>
            <p>"It was Verlander! It was!"</p>
            <p>He laughs harder, trying unsuccessfully to get Martínez's attention. But Víctor still shows an incurable case of Fenech Fever—he won't even look my direction, ignoring Miggy's antics.</p>
            <p>I get up and leave the bench to them and their speculation.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline"><em>February 25</em>—</span>Justin Verlander was traded to Houston, but his name still reverberates here. After the World Series, we appear to be on good terms. He still follows me on Twitter, still favorites my tweets:</p>
            <p>"Pitchers and catchers have reported to spring training, but I still haven't seen Justin Verlander. Will ask."</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">SARASOTA, Fla., <em>February 26</em>—</span>On another postcard-perfect spring day, I drive to Ed Smith Stadium, spring home of the Baltimore Orioles. A message pops in from my boss. Wondering whether it could ruin my day, I wait to read it until the song ends.</p>
            <p>"Congrats on the APSE. Very well done."</p>
            <p>Big News! I won an award in this year's Associated Press Sports Editors' national contest—the Super Bowl for sports news organizations.</p>
            <p>I finished top ten in beat writing among all those entered in APSE's highest-circulation category. All sports, college and pro, National Guys included.</p>
            <p>The contest is judged on a variety of stories—features, game stories and breaking news. Chris Thomas thought I had a chance, so he submitted an entry. I won for my coverage of the last-place team in baseball.</p>
            <p>As Seamhead John Lowe says: "It's easy to cover a winning team. Anybody can do that."</p>
            <p>Since 2001, only one Freepster has placed in the APSE beat writing contest: Lions football writer Dave Birkett received honors last year. Birkett makes more than double what I do, so maybe I can spin this into a raise.</p>
            <p>I thank Thomas for submitting my work.</p>
            <p>"No problem. You earned it. Now you have to one-up yourself next year :)"</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">WEST PALM BEACH, Fla., <em>March 4</em>—</span>The Tigers begin a two-game road trip on Florida's East Coast—today against the Nationals at The Ballpark of the Palm Beaches, which the Nationals share with the Astros.</p>
            <p>I ask a Houston PR flack for directions to Justin Verlander's locker. When Justin arrives, I wait half a minute and walk his way. I ask him about a <em>Sports Illustrated</em> story documenting his ace resurgence in his mid-thirties. In the article, Verlander credits Houston's analytical advancements.</p>
            <p>"Was it really that big of a factor? I mean, you were basically back to yourself, dominating while you were still with the Tigers, right?"</p>
            <p>"This is off-the-record, right?"</p>
            <p>"Of course… I just came over here to say hi."</p>
            <p>"It's just different here. That's all I can say about it. It's just different here. It's still way behind over there… Like, in the playoffs last year, what we have is night and day different from what we had in Detroit."</p>
            <p>The conversation is short. I lament the bad Tiger baseball I'll be watching this year. I don't want to overstay—I wish him good luck and good health this year. We shake on it.</p>
            <p>"Thanks, Anthony."</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">DETROIT, <em>April 13</em>—</span>Before the series opener against New York, I spend time outside the clubhouse with Willie Horton.</p>
            <p>I've struck up a nice friendship with Mr. Horton. Today, the Tigers' legend is sharing a story about his struggling 1980 season with Seattle, when he hit .183 after April.</p>
            <p>Horton pulled longtime sports writer Emmett Watson aside and implored him to criticize him publicly when it was called for. He considers Hall of Fame sports writer Joe Falls, who covered the Tigers for the <em>Free Press</em> in the sixties and seventies, an influential part of his career for that reason.</p>
            <p>"I appreciated the criticism. It motivated me."</p>
            <p>Tonight is the first night game of the season at Comerica Park. 53 degrees and wind-whipping. In the second inning, Nick Castellanos gets twisted up on a line drive off the right field wall, allowing Yankees catcher Gary Sánchez to reach second base. The next batter hits an inside-the-park homer.</p>
            <p>Three hours later, Tigers lose.</p>
            <p>Afterwards, Castellanos recoils when reporters approach to ask about the play.</p>
            <p>"I didn't lose it in the lights. Sánchez just doubled. It was a line drive off the wall. There was no misplay."</p>
            <p>Asked if the play was part of his transition to right field, Castellanos bristles.</p>
            <p>"But I think it's funny. In 40-degree weather, I get a line drive off the wall that's a double and I get a bunch of microphones and stuff in my face asking me if this is a transition, you know? I think it's funny. But it is what it is."</p>
            <p>With Mr. Horton's story still fresh in my mind, I do what Joe Falls would do—I hold Castellanos accountable in my column tomorrow.</p>
            <p>"<em>After the misplay in the second inning the development of both Castellanos the right fielder and Castellanos the leader was on display inside a sparse Tigers' clubhouse afterwards</em>.</p>
            <p>"<em>He is, as Gardenhire said before the game, speaking solely about his defense, a work in progress</em>. <em>Maybe next time Castellanos will know how close he is to the wall. Maybe next time he will say he messed up</em>.</p>
            <p>"<em>Because that's what leaders say</em>."</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline"><em>April 22</em>—</span>After staying out too late with a few visiting scouts last night, I'm back at Comerica Park bright and early. Chapel is scheduled for 10 <span class="small-caps">A.M.</span> in Conference Room B, according to the sign on the open clubhouse door.</p>
            <p><span class="small-caps">PLAYERS, TEAM PERSONNEL AND STADIUM STAFF WELCOME</span></p>
            <p>Yes, media members are allowed to attend chapel. But it's the Tigers who need prayers—they're under .500 on the young season. I came here to record a podcast with beat partner George Sipple.</p>
            <p>Retired Tigers coach Gene Lamont arrives for the game and sits in Suite 118—the visiting GM suite. I stop by and say hi. Lamont was Detroit's first-round pick in 1965. In Lakeland the next spring, he met a fellow catcher named Jim Leyland.</p>
            <p>The two became best friends. Lamont played parts of five years in Detroit. Leyland never made it to the majors, finding his calling in the dugout instead. After retiring as a player, Lamont followed Leyland into managing. Both had success in the minors, and Leyland was hired by Pittsburgh in 1986. His first call was to Lamont, who came along as third base coach—no questions asked.</p>
            <p>Lamont, seventy-one, retired from coaching last year—he was bench coach for two seasons under Brad Ausmus. He's currently a special assistant with the Royals and still talks to Leyland every morning on the phone over coffee.</p>
            <p>Last year, when Verlander exploded on me in the dugout after my solar eclipse tweets, Lamont was sitting off to my right.</p>
            <p>"Who pissed in <em>his</em> Wheaties?" Lamont asked.</p>
            <p>I shook my head.</p>
            <p>"Apparently, I did… You're not going to believe what happened."</p>
            <p>Lamont chuckled and stood up.</p>
            <p>"Trust me. I don't wanna know."</p>
            <p>With a wide-open weekend afternoon—a sunny, spring-like sixty degrees—what do I do? I stay inside my house and watch baseball. Call sources. Text friends.</p>
            <p>Apparently, Kristie Ackert of the <em>New York Daily News</em> recently ruffled the soft, salt-and-pepper feathers of rookie manager Mickey Callaway, who apologized to her for getting heated over her clear-headed column about his recent bullpen usage.</p>
            <p>I reach out to Al Avila. "You wanna get dinner? Cigar?"</p>
            <p>"No, I'm pooped. Next time."</p>
            <p>Avila changes his mind later on—I'm invited to his suburban home in Bloomfield Hills.</p>
            <p>He gives a short tour. Baseball is on TV and Avila has prepared a charcuterie board of meats and cheeses on the kitchen table. I send a picture.</p>
            <p>Caption: "True Life: I'm A Ball Writer. In this episode, I text my GM for a cigar. When I arrive, the GM says, 'I got some munchies for you.'"</p>`,
        wordCount: 2900
    },
    {
        id: 19,
        year: 2018,
        section: 'year',
        title: "DRAFT DAY",
        subtitle: "",
        teaser: "Where futures are made.",
        content: `
            <p class="has-dateline"><span class="dateline">BOSTON, <em>June 5</em>—</span>After a couple hours' sleep in Atlanta, it's back to the airport. I had an alarm at 4 and snoozed it until 4:30.</p>
            <p>The annual MLB draft began last evening in Auburn, Alabama, where the Tigers selected Auburn University pitcher Casey Mize with the top pick. I was on the scene, having followed Mize closely after visiting his hometown last month and watching him dominate LSU while Al Avila watched from the bleachers.</p>
            <p>The break-neck life has now led me to Fenway Park for MLB Network. The hot topic: Is Nick Castellanos entering the league's elite echelon of hitters? Through two months, he's hitting .333 with 6 homers and 19 doubles.</p>
            <p>At the park, I text J.D. Martinez, and we reconnect in the stairway to the Red Sox dugout. I ask him if Castellanos should be considered elite.</p>
            <p>"If yes, I'm gonna quote you. If no, I won't."</p>
            <p>"Define elite. Like top ten?"</p>
            <p>"Just hitting ability. It's a 'no' if you gotta think about it… Ruined a great opening, though."</p>
            <p>Martinez laughs.</p>
            <p>"I'm sorry, bro. I think elite is a strong word. I think you could say he's on his way to becoming elite. But I think u need multiple years to say that—that's my take."</p>
            <p>After my TV gig, I see Tigers quality control coach Joe Vavra sitting in the dugout, scrolling through his phone in disbelief. Today, he's a proud father filled with emotion. Vavra tries to keep up with congratulatory messages—his son, Terrin, was drafted in the third round by Colorado.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline"><em>June 6</em>—</span>Bending the rules, I dial traveling secretary Brian Britten. I'm in a terrible spot, 25 minutes from Fenway Park. He finds an open room for me at the historic Commonwealth Hotel—five minutes' walk to the park.</p>
            <p>After the game, I ride the elevator with Miguel Cabrera. Miggy locks a goofy stare at me, smiling like a crazed clown until I finally say, "You're weird."</p>
            <p>I share a shrimp cocktail at the oyster bar next door with Kirk Gibson, who broadcast the game for FOX Sports Detroit. Across the aisle, Nick Castellanos sits at a booth with his girlfriend, Jess. He waves us over.</p>
            <p>At twenty-six, Castellanos seems ready to step into a leadership role. I've developed a unique relationship with Nick over the years. Our careers began to run parallel in 2014, when I met him in spring training. Nick was cocky then. He's confident now. He's grown up on the fly in the big leagues.</p>
            <p>The Tigers have lost both games here, outscored 13-1. In last night's shutout loss, young third baseman Jeimer Candelario took a ground ball off his wrist and left the game.</p>
            <p>"You couldn't do this anymore," Gibby says, "but back in our day, someone would hang a tampon in the guy's locker the next day."</p>
            <p>Castellanos has played with veterans his entire career. All-Stars and future Hall of Famers.</p>
            <p>"You'd have to take a finger off for me to leave the game. Playing alongside Miguel Cabrera? Are you kidding me? You should see the kind of stuff Miggy has played through."</p>
            <p>We get another round and get to talking about how I got here.</p>
            <p>"I covered Gibby back when he managed in Arizona. My first season covering baseball." I tell Castellanos what a good manager Gibson was before Parkinson's disease began affecting him.</p>
            <p>"I believe it. I love this man."</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">DETROIT, <em>June 13</em>—</span>The mood is sullen inside the Tigers' clubhouse. Mighty Miggy is out for the season.</p>
            <p>His left arm is braced, ready for surgery. Cabrera sits stone-faced, devoid of his usual joviality.</p>
            <p>"I'm like in shock right now. It's tough, but in the same way, I gotta go out and fix it and try to come back better."</p>
            <p>Cabrera left last night's game wincing in pain after a swing in the third inning. After tests, he was diagnosed with a torn left biceps. At thirty-five, the future Hall of Famer is in the twilight of his career.</p>
            <p>After the media circle dissolves, Cabrera hangs out with teammates in the corner, sitting inside his empty locker stall. There's no rush to clean it out.</p>
            <p>I walk up, wish him luck with surgery and pass along my business card.</p>
            <p>"Text me if you want." (He doesn't.)</p>
            <p>I find Nick Castellanos and say: "It's your team now. Good luck."</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">CLEVELAND, <em>June 24</em>—</span>Sandwiched between Tigers Twitter Guy and Seamhead John Lowe, who joined us after Sunday service, church program in tote.</p>
            <p>The Tigers need religion. After arriving sky-high with a five-game winning streak, they're currently getting blasted by the Indians, 12-2, in the series finale. Today's loss will be the fifth of eleven straight.</p>
            <p>The losses are taking a toll on Deep Throat, who looks ahead.</p>
            <p>"Who's starting for Oakland?"</p>
            <p>"Bob Welch."</p>
            <p>"Not funny."</p>
            <p>"Vida Blue, maybe."</p>
            <p>"Stop."</p>
            <p>He doesn't appreciate my gallows humor, invoking long-retired Oakland hurlers who mightn't break a sweat against the free-swinging Tigers youngsters.</p>
            <p>John Lowe gets a jump on traffic. Sensing I need religion, too, he leaves me today's program. I pass it to Tigers Twitter Guy.</p>
            <p>"Peace be with your mentions."</p>
            <p>The Tigers are outscored 26-3 in the series. Postgame, I hang around the clubhouse long after the rest. Waiting for the team leader, who appears many minutes later, mostly naked and slightly surprised to see me standing there.</p>
            <p>Nick Castellanos is one of the most tenured players in the clubhouse now, and with that comes responsibility to speak for the players when things aren't going right. Nick passes his first test with flying colors, facing the music after the lopsided loss.</p>
            <p>"It's just growth. You're either in it for the long haul or you're not. Getting your ass kicked is a part of learning how to become a good team, and it's no secret that if we want to get to the World Series, we have to get through Cleveland."</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">DETROIT, <em>June 26</em>—</span>Lounging on an off night, I feel my skin tingle. With the postgame show muted in the background—<span class="small-caps">TIGERS LOSE SEVENTH STRAIGHT</span>—I hear from Deep Throat.</p>
            <p>"Something's up. Not a roster move. I can't say any more."</p>
            <p>I try to catch Al Avila on his ride home from the ballpark. No answer. I call again a few minutes later. Voicemail. Send a text. "Call me on your way home if you want."</p>
            <p>I won't hear from Deep Throat again tonight.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline"><em>June 27</em>—</span>HSITL still hasn't gotten back to me, and my grapevine of sources appears to be gagged. Another call goes unanswered. One message comes back negative— "haven't heard anything."</p>
            <p>Just when you think you've got this job figured out, you're back to texting clubhouse attendants. That's Ball Writing—some days you can't even pin the tail wearing no blindfold.</p>
            <p>Luckily for me, nobody else can, either. Moments after the clubhouse opens, the media are quickly ushered into Gardenhire's office, where Al Avila stands waiting with a piece of paper. He reads a team announcement, relieving pitching coach Chris Bosio of his duties for bad behavior. What that behavior was, Avila declines to say.</p>
            <p>Rumors fly: One person hears there was a fight with another coach. "Word on my end is that he used inappropriate language," a scout says. "Someone brought him decaf instead of regular," Daniel Norris says.</p>
            <p>One of his teammates gives a more serious answer to my text.</p>
            <p>"Apparently something was wrongfully said to an employee, although I don't know if I fully believe that."</p>
            <p>I press for details.</p>
            <p>"Dude, I get it, and if it's something the team has told us little about and have told us to be hush-hush about, like this incident, you will get vague answers. Like my current ones haha."</p>
            <p>In the press box, I whip up a story with my earbuds in. At the top of the hour, TV man Brad Galli gives the most concrete report so far. Galli says Bosio allegedly "used racist language" toward a team employee.</p>
            <p>Tigers' pro scouting director Sam Menzin soon barges through the door. Apparently on Freep.com right now, there's a picture of bullpen coach Rick Anderson above the headline: <span class="small-caps">TIGERS FIRE PITCHING COACH BOSIO</span>.</p>
            <p>In an uncharacteristic show of emotion, Menzin points at me.</p>
            <p>"That's the problem with <em>you guys</em>!"</p>
            <p>I'm caught off-guard and take out my earbuds.</p>
            <p>"I don't have anything to do with that. But I'll let the desk know."</p>
            <p>Menzin is already walking out, almost as if he'd caught himself—as if he had an out-of-body experience. He's probably surprised with himself, maybe even a little proud of what he did.</p>
            <p>I know I am. I vow to never forget it.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">TAMPA, Fla., <em>July 12</em>—</span>It's taken three years, but Ball Writing has finally broken my body.</p>
            <p>I'll spare you the details, except to mention that I haven't had a normal bowel movement for almost three weeks. Whether it's the constant travel and stress, nightly forages at hotel bars, or crappy press box food, who knows?</p>
            <p>All I know is I spent more time in the restroom at Tropicana Field the past few days than watching baseball. Which isn't the worst thing—the Tigers were swept by the Tampa Bay Rays.</p>
            <p>Today, I'm flying early—Tampa to Cincinnati to Houston to visit Old Pal Justin Verlander. He's set to face the Tigers for the first time this weekend. With the Astros playing a matinee today, I should've been able to make it there for pregame clubhouse—and get exclusive Verlander quotes to rankle Rival Cohort.</p>
            <p>I stop at Walgreens for a bottle of Imodium before my 5:45 <span class="small-caps">A.M.</span> flight. Landing in Houston, I run to the restroom. It's hellish.</p>
            <p>Cabbing into the city, I text a friend who's a team doctor for the Detroit Red Wings.</p>
            <p>"I haven't done drinks or drugs in a couple weeks, but symptoms have continued. I went to urgent care and got some meds—I need this cleared up before I see my girlfriend next week."</p>
            <p>"Go get checked out."</p>
            <p>At the hotel, I ask the concierge if there's a hospital nearby. She points me to a place ten minutes away. Instead, I drop my bags and get a cab to the stadium. I enter the Astros clubhouse at Minute Maid Park—open until 11 <span class="small-caps">A.M.</span>—and see Justin at his locker.</p>
            <p>He's occupied. Trapped, even. Justin has been cornered by a foreign reporter who wants him to describe the talents of L.A. Angels' superstar Shohei Ohtani.</p>
            <p>"I can't speak to facing him as a pitcher, so I can't say."</p>
            <p>I'm standing around in the background. A minute becomes three. Justin certainly sees me. The longer this interview goes, the less time he'll have for me—he looks ready to scoot away.</p>
            <p>Sure enough, when the interview wraps up, I'm quickly shooed away.</p>
            <p>"Gotta go."</p>
            <p>"Not even for a couple quick ones?"</p>
            <p>"Nope."</p>
            <p>Justin turns toward his locker, looking for something.</p>
            <p>"What about after you throw?"</p>
            <p>"I won't have time then, either."</p>
            <p>"Not even if I changed my trip and took a 5 <span class="small-caps">A.M.</span> flight to get here?"</p>
            <p>"Not my problem. I talk tomorrow."</p>
            <p>After our friendly conversation this spring, I didn't expect this.</p>
            <p>"Well, if you change your mind, I'll be waiting in the dugout afterwards."</p>
            <p>"I won't."</p>
            <p>He doesn't. After Justin throws a bullpen session, he walks past me in the dugout and into the clubhouse. He doesn't break stride.</p>
            <p>After all that for nothing, I go to the hospital. Three years building this relationship, a 5 <span class="small-caps">A.M.</span> flight, and bacterial infection, and I get "Not my problem." I give samples and soon find myself strapped to a hospital bed with an IV in my arm.</p>
            <p>Tests show a bacterial infection. I pick up a prescription and dinner to-go, then purchase <em>Titanic</em> on pay-per-view for $3.99. Life's too short.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">HOUSTON, <em>July 15</em>—</span>If karma is a thing, we're seeing it at Minute Maid Park.</p>
            <p>A couple days after he punked me, Justin is getting tattooed by the Tigers. In the second inning, he's taken deep by catcher John Hicks, who hails from the same hometown as Justin. Hicks' older brother, Daniel, was best friends with Justin growing up in Goochland, Va.</p>
            <p>Hicks, twenty-eight, is in his second year with the Tigers. His two-run shot to left field secures a lifetime supply of bragging rights. Detroit homers thrice more off Verlander and Old Pal takes an unlikely loss.</p>
            <p>The Tigers snap a seven-game losing streak, heading into the break with a payback win.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">WASHINGTON, <em>July 16</em>—</span>Despite any previous proclamations that I'd never cover another All-Star Game, I'm back in D.C., combining work with a chance to see my girlfriend.</p>
            <p>The Tigers' representative is Joe Jiménez, a young righty reliever from Puerto Rico. Jiménez is all but left alone during today's media free-for-all.</p>
            <p>Here, on a suite level at Nationals Park, the American League All-Stars sit behind tables, drawing media scrums. Reporters buzz around for one-on-one interviews, peppering players with the same questions over and over until the half-hour obligation ends. Agents roam the premises—Scott Boras stands behind J.D. Martinez when I stop to say hi.</p>
            <p>Sick of our profession looking silly with some of the questions I've heard, I restore some respect by asking Martinez: "Who's your favorite beat writer?"</p>
            <p>He laughs.</p>
            <p>"What's the name of the guy from Detroit?"</p>
            <p>It's gravy for Boras to see how I interact with J.D. I reach around the table to shake Scott's hand.</p>
            <p>I say hello to Royals catcher Salvador Perez.</p>
            <p>After filing my story on Jiménez, I surrender my first-row seat for the Home Run Derby and watch from the hotel room with my gal. We scrap dinner plans and order room service instead.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">DETROIT, <em>July 20</em>—</span>Tonight, for the first and only time ever, I leave the stadium through the underground tunnel that leads to the players' parking garage. I hop into Kirk Gibson's white F-150 and hitch a lift back to his house in the suburbs.</p>
            <p>Riding shotgun, I ask Gibson for as many PG-13 stories he can share about good friends and Tiger teammates Alan Trammell and Jack Morris, who will be inducted into the Baseball Hall of Fame next weekend. Off the top of his head, he recalls the time when Dave Rozema accidentally hit Trammell with a wine glass, causing forty stitches, and the time when Morris purposely dropped the baseball after Hall of Fame manager Sparky Anderson came out to pull him from the game.</p>
            <p>"Jack went, 'Oops' and picked up the ball. So later they had a little meeting and Sparky said, 'Nobody shows <em>me</em> up. I won't show <em>you</em> up. You don't say anything to the press about me, and I won't say anything about you. Nobody throws anybody under the bus.'"</p>
            <p>It feels full circle as Gibby flosses through the freeways, like it was just yesterday when I showed up in his manager's office in Arizona, stationed myself in the front row of every media session to prove my worth, and then shook his hand goodbye after the summer.</p>
            <p>Back then, I saw the future clearly—one day, I'd be covering the Tigers and Gibson would be managing them. After he took the Diamondbacks from worst-to-first, winning the National League West in 2011, Arizona went .500 two straight years, and Gibson was fired in 2014—when they finished in last place.</p>
            <p>By that point, he had developed a stick-figure-like gimp despite his fearsome athletic body. In April 2015, Gibson announced he had Parkinson's disease.</p>
            <p>As we turn into Gibby's subdivision, I think of that summer. I think about what my dad told me back then. I was twenty-one, about to drive off to Phoenix to cover big-league baseball for the summer. The radio was already up full blast when I hit the road and saw my dad in the rearview mirror, waving his hands frantically for me to stop.</p>
            <p>When he reached the window, he said, "Don't let Gibson intimidate you."</p>
            <p>I laughed. Dad didn't.</p>
            <p>"Anthony, don't let Gibson intimidate you."</p>
            <p>Gibby was known as one of the most hard-ass players of the eighties, an All-Star, longtime Tiger and college football star, too. He was a physical force with a flair for the dramatic—his pinch-hit, walk-off home run on one good leg in the 1988 World Series with the Dodgers remains one of the most iconic home runs in baseball history.</p>
            <p>Gibson, sixty-one, is a local legend. He grew up in nearby Waterford, starred in football and baseball at Michigan State University and will go down as one of the most beloved players in Tigers history.</p>
            <p>"I'm from Detroit," I said upon my introduction inside the manager's office that day.</p>
            <p>And now, I look back and see the merit in Dad's advice: If I had slunk in the middle rows, stumbled when I asked questions or didn't stand steady in the dugout for nearly ten minutes, waiting to say farewell at summer's end… if I had been intimidated by Kirk Gibson, I wouldn't be here today.</p>
            <p>Inside the house, Gibson opens a bottle of tequila. His wife of thirty-two years, JoAnn, is here—she puts out a bowl of popcorn. We talk in the kitchen, around the island. I browse the living room, taking in photos and mementos of the family.</p>
            <p>The Gibsons—who got married in a double ceremony with Rozema and JoAnn's sister Sandy—have four grown kids.</p>
            <p>Gibby takes me down to the basement, which looks like most basements—boxes and clutter, recreation activities, a TV and an old cloth recliner from grandma's house.</p>
            <p>Down here, more than three years into his fight with Parkinson's, Gibby annihilates my athletic ego. He whips me in ping-pong and pool, twice each. Although his hands can shake uncontrollably and his movements can be stiff, Gibson's still got elite hand-eye coordination.</p>
            <p>When I've had enough, we refill our drinks and watch some baseball highlights.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline"><em>July 25</em>—</span>After today's matinee, the Tigers front office will fly to Detroit on the team's private plane and then to Cooperstown for Baseball Hall of Fame induction weekend. There, they'll stay in a big corner house off Main Street.</p>
            <p>I'll fly commercial to Albany, about 1½ hours' drive time from Cooperstown. I don't even know where I'm staying. Everything within a 30-mile radius is booked—"Has been for months," a front desk worker at a nearby Hilton property said when I called last week. And since I don't know where I'm staying, I don't know if I should get a rental car.</p>
            <p>Arriving at the ballpark, I see a missed call from Kirk Gibson. I call back; he's staying in a house in Cooperstown this weekend with a few other couples. One of the wives burst her appendix—and that couple can't make the trip.</p>
            <p>"There's gonna be some rules, but would you be interested in staying with us?"</p>`,
        wordCount: 3200
    },
    {
        id: 20,
        year: 2018,
        section: 'year',
        title: "COOPERSTOWN",
        subtitle: "",
        teaser: "A pilgrimage to baseball's shrine.",
        content: `
            <p class="has-dateline"><span class="dateline">COOPERSTOWN, N.Y., <em>July 27</em>—</span>The first rule of the Cooperstown House is you don't talk about the Cooperstown House.</p>
            <p>"Incognito," Kirk Gibson texts me. "U will get killed if you blow our cover."</p>
            <p>It's Friday afternoon, and three married couples and I have gathered at a cottage off a county road in central New York to live together for the weekend. They are here to celebrate their friends and former Tiger teammates Jack Morris and Alan Trammell getting inducted into the Baseball Hall of Fame. I'm here out of dumb luck, a last-minute replacement for another couple who couldn't come. I'm also here as a Ball Writer to cover induction ceremony weekend.</p>
            <p>I was invited.</p>
            <p>Gibson sits on one of the beds, across from me. He reminds me of the first rule of the Cooperstown House.</p>
            <p>"The wives are watching." He's not kidding. "Labatt or Coors?"</p>
            <p>I'm staying with Gibson and former Tiger teammates Tom Brookens and Lynn Jones and their wives. They'll do this all weekend, telling stories and eating and drinking. The wives have created a lawn-chair circle of their own nearby. The guys talk about the good ole days, when the Ball Writers used to hang out with the players. About the time they saw <em>Free Press</em> sports columnist Joe Falls at a bar in Edison Plaza. Another time when Morris put a small reporter in a garbage can.</p>
            <p>"We even liked a few of the writers," Brookens says.</p>
            <p>Gibson: "But only a few. So be careful."</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline"><em>July 28</em>—</span>Leaving a hall of fame party, walking to Tigers' HQ. The front office is holed up this weekend in a four-bedroom colonial hidden behind tall trees.</p>
            <p>"Which house is it?" I text Al Avila.</p>
            <p>"Corner house. Lights on in the back."</p>
            <p>Walking up, I see Al in the kitchen, through the window. I walk around to the back patio. More Tigers officers. Stay there for a couple hours, share some laughs.</p>
            <p>At 2 <span class="small-caps">A.M.</span>, I try to sneak quietly through the squeaky side door of the Cooperstown House. At 3:30, as I work on a 3,000-word story at the kitchen table, Gibby comes out of the main floor bedroom.</p>
            <p>We speak softly. He sits on the rocker next to the couch.</p>
            <p>"You gotta ask yourself," Gibby says, "Do you want to be a golden retriever… or do you want to be a pitbull?"</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">DETROIT, <em>July 30</em>—</span>Trade deadline eve, I receive an auspicious text from a Red Sox scout.</p>
            <p>A few days ago, I shared a trade idea: "Just spitballing. You guys should get Kinsler."</p>
            <p>The former Tiger is having an unimpressive season, at least statistically, with the Angels. But he's a clutch player, an asset to any team. BoSox guy isn't convinced.</p>
            <p>"Three years ago, Kinsler's an upgrade but right now he's not."</p>
            <p>"He can play," I said. "Brings that (Dustin) Pedroia-type edge. Seems to have gotten old in the offseason but I wouldn't bet against him in the second half."</p>
            <p>"Kinsler is still owed five million or so. I love Ian but he would not really help."</p>
            <p>That was three days ago. Tonight, I get this: You may be on to something."</p>
            <p>Another scout says I'm right. I have it from two sources, but neither is In The Room. I can't risk being wrong. Worth a shot, I text J.D. Martinez.</p>
            <p>"You hear anything?"</p>
            <p>"You crack me up lol"</p>
            <p>"Dude, I'm just trying to break some news. I've texted Kinsler three times lol."</p>
            <p>"Lmfaoo bro I'm in the middle of a game and you're texting me about a trade."</p>
            <p>11:32 <span class="small-caps">P.M.</span>—As I sweat out the scoop, feeling it slipping away—I've had it for an hour now—I see a saving grace.</p>
            <p>Kinsler's agent Jay Franklin calls.</p>
            <p>I pick up first ring.</p>
            <p>"Hey, what's going on?"</p>
            <p>He hangs up and texts me instead.</p>
            <p>"I'll call you back."</p>
            <p>11:33 <span class="small-caps">P.M.</span>—Seconds later, a tweet from Ken Rosenthal. "Red Sox get Kinsler."</p>
            <p>Ball Writing: Where you can do everything right. You can get the scoop. You can have the contacts. You can pick up right away. And still, the agent could be trying to call Ken Rosenthal, not you. The guy could hang up and immediately call him with the scoop.</p>
            <p>Four minutes after midnight, it's Dave Dombrowski. Always returns your message, no matter how big or small.</p>
            <p>"Yes! You can see the deal was announced."</p>
            <p>I count to ten and decide to sleep on it before texting him back.</p>
            <p>"I wanted the scoop. Thanks for getting back to me. Good luck the rest of the way."</p>
            <p>This year—as opposed to last year, when the Tigers had All-Star players to dangle—GM Al Avila is trying to peddle marginal pieces at the trade deadline. At the top of Avila's list is veteran righty starter Mike Fiers.</p>
            <p>In January, the Tigers signed Fiers to a one-year, $6 million contract for this very reason—to flip him for prospects in July. So far, Fiers, thirty-three, has held up his end of the bargain, pitching to a 3.48 ERA in twenty-two starts. Fiers has provided the young pitching staff with rotation stability.</p>
            <p>Fiers, a teammate of J.D. Martinez at Nova Southeastern University near Miami, joined Detroit after winning a World Series with the Astros in 2017. He's almost two years away from blowing the whistle on the elaborate sign-stealing system Houston used while winning that title. Fiers will speak to the <em>Athletic</em> for a November 12, 2019 story, saying: "That's not playing the game the right way. They were advanced and willing to go above and beyond to win."</p>
            <p>In the days leading up to the Tigers' trip to Houston earlier this month, Fiers told his pitching mates to watch out for what might be in store at Minute Maid Park. Game 2 of the series was the worst of Michael Fulmer's career. Fulmer was beaten physically and mentally. He allowed a career-high seven runs on ten hits, walking off the mound more annoyed each inning.</p>
            <p>"I swear, they're cheating," he said in the dugout.</p>
            <p>Every time Fulmer would throw certain pitches, he'd hear different sounds coming out of the home dugout. Houston wasn't even offering at certain pitches, he complained. Fulmer was knocked out of the game in the fifth inning trailing by six runs against Gerrit Cole, the Astros' ace starter who may have partaken in trickery of his own.</p>
            <p>Fiers will allude to this trip when talking to the <em>Athletic</em> in 2019: "We had a lot of young guys with Detroit (in 2018) trying to make a name and establish themselves… I wanted to help them out and say, 'Hey, this stuff really does go on. Just be prepared.'"</p>
            <p>For his part, Fiers pitched a quality start that series—his eighth of the season. The future whistleblower has positioned himself nicely for the trade deadline, posting a 2.05 ERA over the past month, throwing at least six innings in each outing. As of last night, Avila had been in contact with about twelve teams, trying to deal Fiers and other veterans for talented prospects.</p>
            <p>Already limited, shortstop Jose Iglesias' market fell through when Philly and Milwaukee filled their needs elsewhere. Avila is holding out hope the Tigers can trade center fielder Leonys Martín, but nobody has called about veteran lefty Francisco Liriano.</p>
            <p>"I have discussed Fiers with several clubs, but none feel he can make a difference," Avila said last night. And with veteran reliever Shane Greene, "the return is poor right now so we can wait till winter or next year."</p>
            <p>Midday of the trade deadline, I reach out to a Cleveland exec about Leonys Martín.</p>
            <p>"Any chance of adding Martín today? Heard you guys looked at him recently."</p>
            <p>An hour later, I'm scooped—Martín has been traded to Cleveland, according to Robert Murray, a newcomer to the National Guy scene. Since appearing as Jon Heyman's protégé at startup <em>FanRag Sports</em>, Murray has been breaking more news than he should at twenty-three. He's a poster child of persistence, the kind of young Energizer bunny I can't keep up with.</p>
            <p>In exchange for Martín, the Tigers receive infield prospect Willi Castro. Scouts tell me:</p>
            <p>"He's a legitimate prospect… Switch hitter, chance to be a solid hit and power guy… They needed a player like that…"</p>
            <p>Fiers is still out there. I decide that perhaps I can be of use to the stressed-out GM.</p>
            <p>Offering myself up, I ask Al Avila while driving to the park: "How many teams are in on Fiers? And do you want me to put that out there?"</p>
            <p>Two teams: "One just wants us to dump him, and the other is considering how much to offer. No matter what you put out, I don't think it will matter."</p>
            <p>As I pull into the Comerica Park parking garage, with the 4 <span class="small-caps">P.M.</span> trade deadline less than an hour away, Avila says he's close to sending Fiers to the Oakland A's. I park the car and put the news out there.</p>
            <p>"The Tigers are close to a deal that would send Mike Fiers to the Athletics, I'm told."</p>
            <p>Never before have I couched a scoop as "close," essentially leaving room for error in my reporting. Today, I do—100 percent confident in the source but not 100 percent confident the source isn't selling snake oil—with me as his top salesman.</p>
            <p>My Fiers report spreads on Twitter. Bob Nightengale passes it on. MLBTradeRumors.com posts a link. I ask Avila.</p>
            <p>"Where's it at?" With his silence comes a knowing panic. I sit frozen in the car.</p>
            <p>Avila calls back. Uh-oh.</p>
            <p>"Why did you put that out there?"</p>
            <p>"Because you told me you guys were close on a deal for Fiers."</p>
            <p>"I said we were still 'talking' to them."</p>
            <p>Well, no, that's not what he said. But Avila is my source, and I'm in no position now to dispute him. I punch the dashboard.</p>
            <p>"Fuck!"</p>
            <p>"It's OK…"</p>
            <p>By using me to leak the false report 42 minutes before the deadline, the Tigers were able to send a signal to other teams interested in Fiers, of which there was at least one. Milwaukee showed mild interest—but never acted.</p>
            <p>Neither will Oakland. The report put the onus on them to potentially settle for the sake of saving public face. A's fans on social media are enraged at ownership for not adding pitching help for the stretch run.</p>
            <p>A longtime A's beat writer weighs in, shooting down my report.</p>
            <p>"Two sources are telling me they do not think the A's are close to obtaining Mike Fiers."</p>
            <p>Avila calls again. Says a deal is still doubtful. Of course. Noooo kidding.</p>
            <p>"Can I put that out there?"</p>
            <p>"Yeah."</p>
            <p>"For real this time?"</p>
            <p>He hangs up. I tweet an update: "The Tigers and Athletics do not yet have a deal done and there is doubt one will be finalized by 4 <span class="small-caps">P.M.</span> Fiers' remaining contract is an obstacle, I'm told."</p>
            <p>The top of the hour passes and Fiers isn't traded. Before joining other media inside the dugout for a post-trade deadline presser, I call Avila from a service-level stairwell.</p>
            <p>"You're going to have to throw me under the bus. Whatever miscommunication that was, I'm going to have to eat it. When I ask, just say the report wasn't true."</p>
            <p>During the presser, I ask him: "How close were you guys to trading Fiers to the Athletics?"</p>
            <p>"It never got to the point where I felt that we were going to make a deal."</p>
            <p>"Was money an issue with a deal getting done?"</p>
            <p>"No, money was not an issue. We're trying to accumulate the best players and talent possible, so money was never an issue."</p>
            <p>Well, no, that's not what he said privately. I take it like a man—on the chin on Twitter.</p>
            <p>"My reporting that the Tigers and Athletics were close on a Mike Fiers deal and his contract was an obstacle, was incorrect."</p>
            <p>Furious with myself. Yesterday, my gut told me yes—that my Boston guy was in the know on the Kinsler trade, but I didn't go with it. Today, my gut says Tigers GM is using me to create leverage for Fiers, and I <em>do</em> go with it.</p>
            <p>To avoid further shame, I don't stand up from my third row seat the entire game. Like caring for a sick child, Tigers Twitter Guy brings me refreshments throughout.</p>
            <p>As the worst day ends, when it couldn't get any worse, I get a call from Kirk Gibson.</p>
            <p>I'm in trouble. Tram's wife is upset she was mentioned in the Cooperstown story—she doesn't like the public eye. I can't win.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline"><em>August 1</em>—</span>I wait outside the clubhouse postgame for another big fail moment. This one isn't in the public domain—but it's tougher to swallow.</p>
            <p>I'm waiting to nab Hall of Famer Alan Trammell to apologize to him and his wife. With the team headed on a road trip and unsure when I'll see him next, I don't want it to linger—I've built a good relationship with Tram over the years.</p>
            <p>"Gibby told me about it last night."</p>
            <p>Tram is cool. Says he understands.</p>
            <p>"You didn't even need to apologize, Anthony… honestly. But I appreciate it."</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">OAKLAND, Calif., <em>August 4</em>—</span>Last night, halfway through the Tigers-A's opener, veteran Oakland starter Brett Anderson had yet to allow a baserunner when I decided to muck things up. I tweeted that I picked Anderson, never an All-Star, "just to face the Tigers in fantasy baseball"—poking fun at the team's lack of offense.</p>
            <p>When I get to the stadium today, Chad Crunk is texting: "Just giving you a heads up. You might hear some stuff from our guys about your fantasy team tweet from last night."</p>
            <p>For gonzo Ball Writers, nothing gets the adrenaline going like an angry clubhouse—full of players pissed at you. Crunk escorts me in—his name suddenly reminds me of a fight promoter.</p>
            <p>The first thing I notice is that somebody has printed out my most offensive tweet and stuck it on the bulletin board by the door. There's silence. I walk around a circular table, one of three in the room. I maze around them all. More silence.</p>
            <p>Finally, catcher James McCann breaks the ice. He's seated at his locker. Víctor Martínez is seated at a table, holding an iPad, and Nick Castellanos nods his head nearby.</p>
            <p>All players listen in as McCann asks, as a prosecutor might, "Were those your tweets?"</p>
            <p>"They were."</p>
            <p>"Why did you tweet them?"</p>
            <p>"It's just kind of my style."</p>
            <p>"Well, you know we don't have to talk to you in here, right?"</p>
            <p>Detroit's veteran has the attention of the room.</p>
            <p>"You don't have to talk to me, no."</p>
            <p>Another player pipes up from behind.</p>
            <p>"There's young players in here!" says closer Shane Greene, raising his voice. "They see that stuff!"</p>
            <p>McCann and Greene are sticking up for the youngsters who may not feel comfortable calling me out.</p>
            <p>"Point taken."</p>
            <p>I'm last among media who file into Gardenhire's office.</p>
            <p>"Did he take his whoopin' yet?"</p>
            <p>"Yep," someone else says.</p>
            <p>I appear in the doorway.</p>
            <p>"There he is!" Gardy grins. I stay in the clubhouse until it closes.</p>
            <p>When I leave the clubhouse, I head to the dugout, as I would before batting practice on any other game day. McCann walks out.</p>
            <p>"I had a feeling I'd find you out here… It wasn't personal."</p>
            <p>"I respect that." I acknowledge that I can step over the line sometimes and I appreciate his reaching out. We shake hands.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">ANAHEIM, Calif., <em>August 6</em>—</span>When I land in SoCal, my phone returns to service with a Ball Writer's worst nightmare.</p>
            <p>The <em>Free Press</em> and the Tigers have been trying to reach me, over and over. Texts pop onto the lock screen, contacts still syncing, nonidentifiable by sender. I feel a slight panic setting in.</p>
            <p>"Creating a slug on trade. He'll get three quick grafs up. Sub ASAP."</p>
            <p>"Feeling vindicated I hope."</p>
            <p>"We'll have Al Avila available on a conference call at 3:30 ET this afternoon. I'll send dial-in information momentarily."</p>
            <p>"You alive?"</p>
            <p>I click over to email. More messages from the sports desk and Tigers PR. A headline on Freep.com. The Tigers have traded Mike Fiers after all—you'll never believe where.</p>

            <p class="no-indent" style="text-align: center;"><strong>TIGERS ACQUIRE TWO PLAYERS TO BE NAMED LATER OR CASH CONSIDERATIONS FROM OAKLAND IN EXCHANGE FOR MIKE FIERS</strong></p>

            <p class="no-indent">How could this happen? Because the major-league trade deadline is not really a deadline. It's just that after July, players must pass through waivers and could be claimed by another team. Fiers passed through, and here we are.</p>
            <p>Walking through the terminal at John Wayne Airport, I dial into the call with Avila and join the reporters asking questions through a moderator.</p>
            <p>"I think Anthony Fenech has one follow-up and then we'll conclude the call."</p>
            <p>"Of course he does," Avila interjects. "Anthony always has a follow-up question."</p>
            <p>"Yeah, Al, what are the names of the players on the list that you have to choose from?"</p>
            <p>To complete the trade, the Tigers will pick two players by a certain date.</p>
            <p>"Well, that's the comedy part of it," Avila laughs. "Obviously, I can't give you those names."</p>
            <p>Later, the Tigers choose two relievers who never make the major leagues, and all of Avila's machinations with Fiers add up to nothing in the end. But that's in the future—at the press conference, Avila is feeling good and cracks an inside joke directed at me.</p>
            <p>"Anthony, you can pat yourself on the back that at the trade deadline you did break the story that we did have something going on with Oakland."</p>
            <p>Avila the comedian adds that I must have had a "good source."</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">SALT LAKE CITY, <em>August 9</em>—</span>On the flight home, I'm alerted by the sports desk about a long story posted by <em>Bleacher Report</em>, an online sports outlet, about <span class="small-caps">HOW KATE UPTON SAVED JUSTIN VERLANDER'S CAREER</span>.</p>
            <p>It's a headline-grabbing love story, with Verlander crediting his wife for maybe saving his life, finding him a physical therapist who remade his body, and generally inspiring his return to glory.</p>
            <p>"She kept me from jumping off a bridge. Who knows if I'm even here if it wasn't for her?"</p>
            <p>It's an uplifting piece about the power of love. But red flags fly.</p>
            <p>In the story, Verlander claims the Tigers misdiagnosed his injury in spring training 2015 as a triceps strain. He missed the first three months of the season.</p>
            <p>"I knew something was wrong. They take me out and misdiagnose me… Didn't get an MRI. Because it was so mild."</p>
            <p>Another thing the story says: "Local writers seemed disinterested in following up on his health or its effect on his play." OK, well, I believe we've clearly established that this Ball Writer did closely follow Verlander's health issues.</p>
            <p>The story reeks of melodrama, but astronomical web traffic is there for the taking. The Freep Sports desk acts fast. <span class="small-caps">JUSTIN VERLANDER SAYS KATE UPTON SAVED HIS LIFE FROM DEPRESSION</span> is the leading story on the <em>Freep</em>'s mobile app.</p>
            <p>I know enough to know this won't be the end of it. Houston visits next month.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">DETROIT, <em>August 10</em>—</span>Verlander has apparently apologized to the Tigers for his comments.</p>
            <p>I get a text from an editor tonight: "Hey there. You have anything coming on the Verlander/misdiagnosis stuff?"</p>
            <p>"I don't. I was told they weren't talking about it yesterday."</p>
            <p>"Well, they talked to the <em>Detroit News</em>. Did they just give it to them? Can we try and confirm that Verlander apologized?"</p>
            <p>I rage-call Tigers PR. Luckily, he doesn't answer. I eventually cobble this together: "Through a team spokesperson, the Tigers did not comment directly on Verlander's claim (of misdiagnosis) or the nature of his apologies, but provided details of his injury rehabilitation process, which refute his claim."</p>
            <p>Ron Colangelo returns my call and carefully feeds me details of Verlander's apology. Colangelo says it centered on the word "misdiagnose."</p>
            <p>I've already reached out to Verlander's agent, Mike Milchin:</p>
            <p>"Does Verlander have any comment on this misdiagnosis quote?"</p>
            <p>"I wouldn't be able to comment for him."</p>
            <p>"Can you ask him if he would?"</p>
            <p>"To be honest I'm not sure that's a good call on my part. I have never commented on anything publicly and or asked any of my players to comment on anything. It's the Bill Belichick model of representation. (Keep your trap shut, say nothing.) I would ask him directly if you would like an answer."</p>
            <p>Milchin attaches his wisdom to my words.</p>
            <p>"I hear you and am always happy to help with info, but pressing too hard for quotes will make relationships erode as opposed to grow. You'll get there, you're too good.</p>
            <p>"And you do it the right way, unlike most of the assclowns dickwads."</p>`,
        wordCount: 3700
    },
    {
        id: 21,
        year: 2018,
        section: 'year',
        title: "BURN OUT",
        subtitle: "",
        teaser: "The toll of the grind.",
        content: `
            <p class="has-dateline"><span class="dateline">MINNEAPOLIS, <em>August 16</em>—</span>With no rooms available downtown this weekend, the Tigers traveling secretary helps me book a room at the team hotel—the luxury-brand Loews, located in a tall tower around the corner from the ballpark.</p>
            <p>Checking in, I run into general manager Al Avila and TV broadcaster Rod Allen, who are heading out the door to Union Rooftop. "We're going for a cigar," Avila says. "Meet us there."</p>
            <p>When I arrive, there's a table of Tigers players to the right of the rooftop bar. To make certain they see me chumming with the head honcho, I fetch drinks. I walk slowly, careful not to spill—carrying 'em the way one might say I've been carrying Al Avila's water this year. Three cheers to the <em>Free Press</em>—I pick up this round.</p>
            <p>Smoking cigars to the stubs, we watch the sun go down.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline"><em>August 18</em>—</span>Before the media are admitted to the visitor's clubhouse, I'm standing against a brick wall in the bowels of Target Field when Rod Allen walks up. He's no longer the soft-speaking guy I shared the hotel bar with. Today, Allen is louder, significantly so, and appears not to care that longtime broadcast partner Mario Impemba is standing close by, in easy range of his booming voice.</p>
            <p>"See?" he blurts.</p>
            <p>Allen is shaking his head while talking to me, looking at Impemba.</p>
            <p>Last night, the longtime FOX Sports Detroit play-by-play analyst made a passing mention of his relationship—or lack thereof—with Impemba. This was news to me. Rod and Mario have worked as the popular Tigers' TV tandem for the past sixteen years and have become part of franchise fabric.</p>
            <p>I pried into that passing mention while sitting with Rod at the bar last night. Turns out, the broadcast partners haven't shared a meal in years.</p>
            <p>"Like, how many years?"</p>
            <p>"Like ten years."</p>
            <p>I was shocked like you told me Santa wasn't real.</p>
            <p>In fact, Rod said the two of them have been together off the air only a few times.</p>
            <p>"He doesn't like me. Never has, never will. Just one of those things."</p>
            <p>What he said last night, Allen repeats much louder today.</p>
            <p>"Dude just doesn't like me."</p>
            <p>I want to tell him to shut up, dude, because Mario is standing right there, you're talking loud enough that he can definitely hear, and I don't want to be guilty by association. Instead, I try to avoid the thick, spreading awkwardness by ignoring him.</p>
            <p>I look down at my shoes and inch myself away until the clubhouse finally opens.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">DETROIT, <em>August 23</em>—</span>Ronny Rodríguez hits his first home run—the Tigers' third homer today, securing free Arby's curly fries for fans at participating Metro Detroit locations.</p>
            <p>Colleague Vince Ellis checks in from summer vacation. Ellis, the Detroit Pistons' beat writer for the past ten seasons, is sitting behind home plate.</p>
            <p>"Who is your backup?"</p>
            <p>Don't have one. My trusty sidekick George Sipple left last month after twenty-three years. Couldn't pass up the hours and higher pay at a public-school job and left me to die.</p>
            <p>"I'm burned out. I've covered the last nineteen games."</p>
            <p>"You got to speak up."</p>
            <p>I call my boss on the way home. Nineteen straight, including two roadies—one to the West Coast. Almost embarrassed, I ask if I can skip the upcoming three-city trip.</p>
            <p>Done. This actually works out perfect, he says—corporate recently levied a travel mandate and he wants to save $3,000 on Tigers (53-75) the rest of the way.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline"><em>August 30</em>—</span>Living my best life on the Burn Out List, lying around watching <em>90 Day Fiancé</em> when I get a text message from hell: "I'll call you in a few."</p>
            <p>It's my boss, who says the Tigers hit back-to-back homers in the ninth inning at Yankee Stadium to beat the Yankees.</p>
            <p>Víctor Martínez hit a game-tying homer, the very next guy (Niko Goodrum) hit another, and now it's 10:39 <span class="small-caps">P.M.</span> and I'm not on the Burn Out List anymore: CC takes another piece of my religion, asking if I could write about a game I didn't attend. A game I wasn't even watching.</p>
            <p>Newspapers these days.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline"><em>September 5</em>—</span>By myself at the neighborhood watering hole when something strange catches my eye—Kirk Gibson is on TV for the Tigers-White Sox series finale in Chicago. Strange, because I talked to Gibby yesterday—and he wasn't in Chicago.</p>
            <p>He's sitting alongside a fill-in broadcaster. What happened to Rod and Mario?</p>
            <p>I reach out to a FOX Sports Detroit executive. Wonder if Deep Throat knows. "Why aren't Rod and Mario on tonight?"</p>
            <p>"Ask them, but rumor has it they're suspended. I only have a few details, so I'm counting on you for more."</p>
            <p>Funny.</p>
            <p>"I got a call saying they fought and not to talk about it. Same rules as always: I never told you any of this. But I believe it was physical."</p>
            <p>It was boiling over in Minnesota, and this story is boiling over now.</p>
            <p>More texts. To the TV producer, Kirk Gibson and Rod Allen. I text Rod twice: "Call me."</p>
            <p>Dots appear on the screen—he's typing back.</p>
            <p>"Free Press Anthony Fenech."</p>
            <p>The message is a mistake, meant for Allen's agent, to let him know the press is on it.</p>
            <p>"I will later," Rod says later on.</p>
            <p>He never does. Neither he nor Mario nor anyone else I contact responds besides Deep Throat, the most dependable of 'em all. He predicts they'll both be fired by Happy Hour tomorrow but can't say more. The quiet—too quiet—keeps me up all night.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline"><em>September 6</em>—</span>By dawn, it's out. Another reporter was on the case—Katie Strang, of course—and her scoop is racing across the Internet: <span class="small-caps">TIGERS BROADCASTERS INVOLVED IN PHYSICAL ALTERCATION</span>.</p>
            <p>A month later, FOX Sports Detroit parts ways with the broadcasting pair. I'll write an inside look on what happened:</p>
            <p><em>"The fight started over a chair. Allen arrived to find Impemba in the booth—what began as a request for the comfortable chair ended in an argument. The conversation turned heated about Allen not showing up early for a scheduled interview. Tensions simmered during the broadcast and boiled over postgame.</em></p>

<p><em>"The argument centered on Allen's frustration with Impemba questioning his professionalism. It continued with Impemba's finger in Allen's face and ended after Allen put his arms above Impemba's shoulder, below his chin, and pushed Impemba against the wall before they were separated by a freelance TV producer.</em></p>

<p><em>"'It was not a chokehold,' Allen's agent Tom Shaer said—a claim confirmed by two other persons with knowledge of the situation."</em></p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline"><em>September 11</em>—</span>The suits have had this series circled—my boss sent a reminder three days ago—and now it's here.</p>
            <p>"We'll need to ask Verlander about the misdiagnosis quote when he gets to town. I'm sure it will come up in the scrum, but if not, let's make sure it does."</p>
            <p>I made it through yesterday unscathed.</p>
            <p>In his first start in Detroit since last year's trade, Verlander beat the Tigers, 3-2. He threw seven innings, striking out ten—and received more standing ovations (three) than runs allowed (two). Postgame, we crossed paths before his interview.</p>
            <p>"Hi, Anthony."</p>
            <p>He answered my question; all good.</p>
            <p>A day later, no scrum in sight. Just me in Verlander's corner of the clubhouse, asking for his pregame schedule the next couple days.</p>
            <p>"I gotta steal a few minutes with you."</p>
            <p>Justin tilts his head at my advance.</p>
            <p>"What's it about?"</p>
            <p>I explain I've got editor's orders to ask about his comments in <em>Bleacher Report</em> last month, claiming the Tigers misdiagnosed his injury in 2015. He's busy today and not thrilled.</p>
            <p>"I have to go out soon. Come back tomorrow."</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline"><em>September 12</em>—</span>And here we are. Same spot as yesterday, I pull the recorder from my back pocket. We're on the record.</p>
            <p>I reintroduce the topic—the "misdiagnosis" comments. Verlander has already apologized. Two days after the story was published last month, he reached out to Al Avila and veteran trainer Kevin Rand, who has helmed the Tigers' training room for sixteen seasons.</p>
            <p>Verlander leans back in thought, fingers tapping the armchair. There's a pause—ten seconds pass, twenty on the tape.</p>
            <p>He exhales.</p>
            <p>"I'm just gonna let it lie. No point in dredging up the past anymore."</p>
            <p>"So, I can quote you on that?"</p>
            <p>"I could also give you advice on what to say—and you can take it or not."</p>
            <p>"Sure… go ahead."</p>
            <p>"I would just say, 'No, they didn't (misdiagnose) me.'"</p>
            <p>"My words weren't wrong. I wasn't wrong… I think the article made a little bit of a bigger deal out of it than should've been made."</p>
            <p>I switch my approach.</p>
            <p>"This is me and you talking here… you came really hard at me earlier, and I'm just working to get you to trust me, because I feel like for the first four years, or three years, you did trust me."</p>
            <p>"I tried to talk to you."</p>
            <p>"And Justin, when there's people coming to me, saying 'Víctor's a problem in the clubhouse'—these are people inside your clubhouse, right? They're going to lose respect for me if I don't write that. And I understand that creates a storm, but that's just part of the job sometimes."</p>
            <p>"That wasn't my problem with you. It was the lack of respect for the players. You walk around like you think you're better than the players."</p>
            <p>"What?"</p>
            <p>"The first time you ever interviewed me. You ask me a question, and you can't even look me in the face—you're looking around the locker room, looking for your next story. It's just consistent stuff like that."</p>
            <p>"I went to great lengths to cultivate this relationship with how important you are to the Tigers."</p>
            <p>We're interrupted by a clubhouse kid.</p>
            <p>Verlander defended his injury claims but insisted he held no ill will toward the Tigers.</p>
            <p>"All right… What I'm going to do is—since there's been a lot of conversation here, I'm going to put together a quote for you."</p>
            <p>"OK."</p>
            <p>"And I will be back here after the game and I will read it back to you, just so we double-check."</p>
            <p>"I appreciate that."</p>
            <p>Upstairs, I'm flagged down by Astros PR Gene Dias.</p>
            <p>Dias says he just spoke with Verlander and asks if we can talk in private. He pulls me outside the press box.</p>
            <p>"Justin doesn't see any need for the story."</p>
            <p>I just spent the better part of ten minutes talking to him about it.</p>
            <p>"I think it would be beneficial for your relationship going forward if you didn't write the story."</p>
            <p>"You know I have a job to do. Justin's been a professional for a long time, he knows how this works."</p>
            <p>"I'm just telling you what could happen."</p>
            <p>Listen to the audio recording and scribble out a quote for Verlander.</p>
            <p>The quote: "I'm going to let it lie. No point in dredging up the past anymore. I think the easiest way for me to answer it is, it was initially diagnosed as a tricep, and it ended up being a lat. Those are the facts. I don't have any ill will towards them. Like I said, I think that article blew it out of proportion. I don't know if the original diagnosis caused anything—I don't know if it caused me extra time—I don't know. This organization did a lot for me, and I really don't hold any ill will."</p>
            <p>After the game, I approach Old Pal at his locker.</p>
            <p>My notebook is flipped to the quote. I hope this will be quick and easy, despite what Dias said.</p>
            <p>Nope. Verlander cuts me off: "I don't see why the story needs to be written. I already apologized."</p>
            <p>"Justin, it's my job. I have bosses who tell me what to do."</p>
            <p>I read him the quote. He says it was off the record.</p>
            <p>"I asked you if I could bring my recorder out. I was taking notes the whole time."</p>
            <p>"You're the only one who asked about it. If you write that, I'm not talking to you anymore."</p>
            <p>I slip out my business card.</p>
            <p>"Well, if there's anything more you want to say, give me a call or shoot me a text. Here's my phone number. My deadline is at 6:30."</p>
            <p>"I've never texted someone in the media. Are you blackmailing me?"</p>
            <p>"What?"</p>
            <p>"Justin, that's ridiculous."</p>
            <p>"Well, we're done here… good luck to you."</p>
            <p>The <em>Free Press</em> publishes what Verlander said, on the record. Other local media take a pass.</p>
            <p>And I'm left with my thoughts.</p>
            <p>Balancing human relationships with job requirements is tricky. No matter how hard you try, one side of the equation always comes up short. The juggling act can make you question the job you're doing—and sometimes, the job itself.</p>
            <p>"You think that's a legitimate question to ask?" I want Pedro Gomez's opinion.</p>
            <p>"For your readers? Absolutely. Even though he apologized, it shouldn't kill the story. He never commented on it."</p>
            <p>On this beat, if you're not the bad guy every now and then, you're probably not doing a good job.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">MILWAUKEE, <em>September 28</em>—</span>For the last road trip of the season, I have a final request.</p>
            <p>I text the Highest Source In The Land: "I want to have a cigar with Gardy and Steve Liddle. We have two nights left. Make it happen."</p>
            <p>From the outside, Miller Park looks like a spaceship. But at field level, with the retractable roof closed and the lights dim, the 18-year-old stadium feels homey.</p>
            <p>It's the final weekend of the season. The Tigers clubhouse is open. Ball Writers: As a general rule, stay in the clubhouse from start to finish for the final series of the season and in the dugout until all players and coaches have left the field following batting practice. For the final series, it's especially important to be available to players, coaches and staff, because these are the final in-person opportunities to build your relationships before the offseason.</p>
            <p>I saunter onto the field, where I stumble upon a tender scene.</p>
            <p>For perhaps the final time on a major-league field, Víctor Martínez is throwing batting practice to his 14-year-old son, Víctor Jose. The apple doesn't fall far from the tree—Víctor Jose mimics his dad's movements in the box, spraying balls from both sides of the plate. Martínez implores him to keep his weight back, hands in.</p>
            <p>Martínez is officially retiring after this weekend, putting the injuries, tension and torment of his final seasons behind him. One could argue he's been retired for a week now—Martínez played his final game in front of the home fans last week.</p>
            <p>On September 22 against the Royals, Víctor recorded an infield single in the final at-bat of his career. In a short, tearful farewell to the crowd before the game, he said, "From the bottom of my heart, I can only say thank you. Thank you for being behind us all these years, supporting my teammates, supporting myself. Thank you very much."</p>
            <p>Martínez finished with a .295 career average, 246 home runs and 1,178 RBI, including .251 and nine home runs this season. On the day of his career finale, I wrote a column in the <em>Free Press</em> about his impact on a young Ball Writer.</p>
            <p>The day I first met Víctor Martínez, I forgot what I wanted to say. Four years ago, at spring training, I mustered up the nerve to ask him about catching. It went fine until I forgot my first question. Standing there, completely blanked out, I said as much. Torii Hunter sat to his right.</p>
            <p>"You hear this, T?" Martínez said. "He is minor league."</p>
            <p>He didn't say it dismissively, rather endearingly. The next day, Martínez saw me and said, "Hey, Minor League." I was in, wearing that name as a badge of pride.</p>
            <p>Perhaps this nostalgia could ease our more recent tensions. I try to flag him down in the dugout after he finishes batting practice with his son.</p>
            <p>"Víctor," I call out.</p>
            <p>"Víctor," a bit louder.</p>
            <p>He doesn't even look my way. Down the steps and into the clubhouse.</p>
            <p>I'm not surprised. Don't necessarily blame him. If the shoe was on the other foot, I might act the same way. Just wanted to say thanks. Víctor Martínez had as much impact on me as any player I've covered—he was the first guy to make me feel comfortable in the clubhouse.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline"><em>September 29</em>—</span>When I wake up, I text Dick Leinenkugel.</p>
            <p>"Always fun to run into guys smoking cigars outside the Pfister in the wee hours of the morning!"</p>
            <p>After the game, it's back to the Haunted Hotel for the last hurrah.</p>
            <p>The Highest Source In The Land is standing at the bar, speaking with a couple of middle-aged women. One of them is Kelly or Kathy or Kristen—her husband runs a large Michigan company that advertises with the team. The women are on a quest to attend a game at every big-league stadium—and Detroit's traveling secretary has hooked them up with rooms.</p>
            <p>The women are drinking cocktails, and Al Avila has a pop when I walk up and introduce myself. HSITL had all the attention until the Ball Writer butts in.</p>
            <p>Coaches sit at a table nearby: manager Ron Gardenhire and his wife, Carol; quality control coach Joe Vavra and his wife, Lynn. I step away from the bar to say hello to the Gardenhires and Vavras.</p>
            <p>Avila is looking at me as I return to the bar. He is talking about me, telling the ladies how I'm a newspaper rat and can't be trusted. How I hung him out to dry last month with my coverage of a Tigers' roster screw-up in Minnesota.</p>
            <p>"That's not what happened. Ladies, this is what happened…"</p>
            <p>Before I can explain, Avila loses his mind and pushes me. In front of everybody at the lobby bar, including the team security guy, who's sitting at the end of the bar with his wife.</p>
            <p>Losing my balance, I spill the drink on my sleeve.</p>
            <p>Avila ushers himself away to cool down. One of the coaches' wives offers me a napkin.</p>
            <p>When Avila returns, we hug and make up. Get drinks and go outside for a cigar. I smoke half—it figures to be a long night—and leave the other half on the ledge behind the ashtray. We go inside, then back outside, and my half-smoked cigar is gone. While we look for it, a guy with a backpack jaywalks from across the street, beelining for us.</p>
            <p>He arrives holding what appears to be my half-smoked cigar in his hands.</p>
            <p>"Is this yours?"</p>
            <p>We close down the lobby bar. Tigers GM, the ladies who want to see every ballpark, and another guy they welcomed to the group. We go up to one of the ladies' suites. Nothing frivolous or even semi-scandalous, just five people having a good time trying to finish all the alcohol in the suite.</p>
            <p>Not even five hours earlier, Al shoved me at the lobby bar. Now, at almost 3 <span class="small-caps">A.M.</span>, we're leaving the suite, stepping into the elevator together.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline"><em>September 30</em>—</span>In the postseason clubhouse, I settle accounts. Apologize again to veteran righty Jordan Zimmermann for the tweet I made in spring training.</p>
            <p>Exchange so-longs with catcher James McCann.</p>
            <p>"Thanks for being accessible this season." Offer best wishes to every player who walks by—even as I realize that the Tigers are getting less recognizable by the year. It takes time to build meaningful relationships.</p>
            <p>I wait for Nick Castellanos out of respect for the player-reporter relationship we'd built this season. I've tried to cultivate him as a leader and don't want to leave without a final word—next season, Nick might be the only familiar face around here.</p>
            <p>Castellanos stayed in the dugout long after the last out, watching the sold-out stadium send the Brewers off to the postseason with a standing ovation. Castellanos watched it all. He was a rookie when the Tigers last made the postseason. Naively, he thought champagne celebrations would be a yearly occurrence. Four years later, the championship contender he came up with is rebuilding—and Castellanos figures to hear his name in trade rumors this winter.</p>
            <p>"We're not on that side. We don't have a tomorrow. You're frustrated when you're on this side. It's the last game of the season and music's not playing, everything is quiet, so it's not an environment that I'm happy in. But it's reality."</p>
            <p>Nick reflects on the year, his first as a team leader.</p>
            <p>"As a player, I'm still inconsistent. As a leader, I get selfish at times when I'm struggling. In general, we have a lot of work to do. Me, personally, I have a lot of work to do."</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">DETROIT, <em>October 1</em>—</span>Tell me about it.</p>
            <p>The day after the season ends, I go to Milwaukee to Minneapolis to Detroit, drop my bags at home and dart downtown to the Corktown neighborhood.</p>
            <p>It's the second iteration of Miguel Cabrera's kids camp and the man himself is here. Cabrera is on the mend from the biceps rupture that ended his season in June. Arm in a sling, smile on his face, like he's happy to see me.</p>
            <p>We've developed a rapport over the years, me and ol' Miggy. What kind of rapport, I'm still not sure, but for example, just now… he's sitting in a swivel chair a few feet away and I'm standing amongst a handful of media types not giving him attention when he takes a love tap at my crotch.</p>
            <p>He's like a puppy in a big dog's body.</p>
            <p>I came here to cover my ass—whenever the franchise player talks, someone needs to be there. Since I'm riding solo, that someone is me. Even if it's a travel day following a weeklong road trip. After running ragged since February, losing my backup and almost my girlfriend, I get this email at 5:48 <span class="small-caps">P.M.</span> on the first day of the offseason.</p>
            <p>"Noticed your phone was off (or died?) This week: have season grades done by Wednesday morning. You can work on them tomorrow. Beyond that, plan to look at Tigers free agency. Could be a listicle. I also think a postseason prospect ranking would be good to have over the next week or so… and maybe set the early odds on who the Tigers will pick in next year's draft in another post?"</p>
            <p>No word yet on a day off.</p>`,
        wordCount: 3800
    },
    {
        id: 22,
        year: 2018,
        section: 'year',
        title: "VIVA LAS VEGAS",
        subtitle: "",
        teaser: "What happens in Vegas...",
        content: `
            <p class="has-dateline"><span class="dateline">LAS VEGAS, <em>December 9</em>—</span>Heading to the winter meetings, I get a text from Ian Kinsler.</p>
            <p>"You should write an article about why a reunion for me to the Tigers would be a good fit."</p>
            <p>Playing next year at age thirty-seven, Kinsler is trying to secure a final contract in a skeptical free-agent market. His reaching out shows a veteran savvy, stirring up interest with a familiar team and fan base—even if it's just for leverage.</p>
            <p>I return to Las Vegas, a familiar place where I spent nine formative months working for the <em>Las Vegas Sun</em> when I was barely twenty-one. I covered my first beat here, the Wranglers hockey team, a farm team of the NHL's Phoenix Coyotes.</p>
            <p>This was nearly a decade ago: Before the Oakland A's threatened to move here, before the Oakland Raiders will move here, before the city got its first major sports team—NHL's expansion Golden Knights in 2017. Before the sports arena was built and ground broken on the new $1.9 billion football stadium, that's when I spent nine months of my impressionable youth in the valley.</p>
            <p>Now I'm back as a Ball Writer. The casino floor is populated with familiar faces. Small talk with a Rival Exec (future GM) on the way to the front desk.</p>
            <p>Baseball folks move between the Mandalay Bay Casino to the Delano Hotel, the shared Vegas Strip property where this year's winter meetings are being held. Amongst a sea of slot machines, the lobby bars are already swelling.</p>
            <p>Kinsler sends thanks for the story.</p>
            <p>"Stir it a little."</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline"><em>December 10</em>—</span>A bad-influence friend from the past stopped by last night with a box of beer and a bag. Bad decisions were made, and I didn't get back on the floor until news had broken: Detroit signs Jordy Mercer.</p>
            <p>Boras's client, but I don't bother bugging Big Agent this week. Boras represents the marquee name on the market: Vegas' own Bryce Harper, who appeared on the cover of <em>Sports Illustrated</em> at sixteen as "Baseball's Chosen One."</p>
            <p>Impossibly, Harper has all but lived up to that hype. At twenty-six, he enters free agency angling for the most lucrative contract in baseball history. Harper is a six-time All-Star in seven seasons with the Nationals. He's a lifetime .279 hitter with 184 home runs, and his career is currently on Hall of Fame trajectory—no surprise to the locals, who have been hearing about him since Little League.</p>
            <p>Harper earned his GED, leaving high school early to enroll at the College of Southern Nevada in neighboring Henderson, a sprawling community of 309,906. Harper played one season at junior college CSN for two reasons: The team competed in the Scenic West Athletic Conference, which used wooden bats like the pros—not aluminum like the rest of college baseball—and CSN's head coach Tim Chambers was hand-picked by Harper's family to mold him before the MLB draft in 2010, when he was taken by Washington with the top pick.</p>
            <p>I watched Harper take batting practice at CSN the fall before he was drafted. I was there reporting on a couple of his teammates and never talked to Harper—Chambers and Co. kept him off-limits to the media. The closest anyone came was <em>Sun</em> colleague Rob Miech, who wrote a book about Harper's season at CSN.</p>
            <p>Harper will sign with the Phillies in February for thirteen years and $330 million—the largest contract in baseball history.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline"><em>December 14</em>—</span>More news: Kinsler signs a sweet deal with the Padres, securing two years for $16 million.</p>
            <p>Back in my room, I sit up at a message from Deep Throat.</p>
            <p>A trade is afoot.</p>
            <p>"Hardy's going to the A's. Frankie Montas and Sheldon Neuse coming back."</p>
            <p>Swingman Blaine Hardy, a lefty reliever entering his age thirty-two season—trade piece?</p>
            <p>I message him himself. "Hey, I heard you got traded to the A's."</p>
            <p>"Haha I haven't heard anything."</p>
            <p>"Ok… When/if you do, let me know."</p>
            <p>Hardy is a new father—he and his wife welcomed a baby recently.</p>
            <p>"Also, congratulations… Boy or girl?"</p>
            <p>I text Al Avila twice—" Hardy to A's???… I heard Hardy got traded to the A's, is that true?" I call Avila twice. When I nudge him <em>again</em> five minutes later, he calls back.</p>
            <p>"The deal isn't done."</p>
            <p>Avila is perturbed he has to deal with me, a potential fly in the ointment of a lopsided trade he's lined up with Oakland. He shoots me straight: The deal has been agreed to, pending physicals. Their team doctor is performing surgery and hasn't reviewed the medicals.</p>
            <p>We make a deal—I'll stop snooping around, and he'll let me know immediately when it's done.</p>
            <p>When Avila hangs up with me, he dials up lieutenant Scott Bream, screaming him off the green at a Scottsdale, Ariz., golf course.</p>
            <p>"How the hell is this stuff getting out?" he asks Bream.</p>
            <p>The Highest Source In The Land is on a warpath trying to find the front-office leak. Is Deep Throat at risk?</p>
            <p>Avila tries to fish out my source when we next speak on the phone.</p>
            <p>"Who told you"</p>
            <p>"Al, you know I can't tell you that."</p>
            <p>"Where did you get the information from?"</p>
            <p>"I'm not gonna answer that."</p>
            <p>"What team did it come from?"</p>
            <p>"You're putting me in a tough position here. I'm not going to lie to you. That's all I'll say."</p>
            <p>"I know who it was that told you. '<em>Oh, I know</em>…'"</p>
            <p>Worrying for Deep Throat's welfare, I wait impatiently for the doctor's word.</p>
            <p>To Hardy's agent: "Have you heard anything?"</p>
            <p>"No sir. Detroit said he was 100 percent healthy when he left at season's end."</p>
            <p>Sitting by the phone when Avila calls: Oakland's doctor nixed it. The deal doesn't go through, and so do my chances to score a big scoop at this year's winter meetings.</p>
            <p>"He evidently didn't like something he saw. There's nothing we can do about it—it's their prerogative."</p>
            <p>Avila is dejected. The deal would've been a boon for Detroit. Montas, 25, will open next season hot before receiving an eighty-game suspension for testing positive for a banned substance. He'll return to post a 3.90 ERA, 1.24 WHIP and 9.6 strikeouts per nine innings in seventy-one starts for the A's and Yankees through 2022. Hardy, meanwhile, will suffer a bum elbow in 2019—cutting his season short.</p>
            <p>Deep Throat circles back after hearing the news: "Good thing you didn't go with it."</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">DETROIT, <em>January 4, 2019</em>—</span>Ringing in the new year at a swanky cigar bar in suburban Detroit.</p>
            <p>The Highest Source In The Land is wearing a burgundy turtleneck and reading glasses that he flips on when checking his phone. Al Avila is drinking the usual tonight. I'm drinking wine.</p>
            <p>The meeting is status quo: Steak dinner, cigar, a few drinks—HSITL gets the cigars, <em>Free Press</em> gets the rest. The Tigers are entering the second year of a tear-it-down rebuild, and this year could very well be worse than last. They're not doing anything in free agency, so there's not much inside intel. Avila tells me who they've chosen as the team's new TV announcer, but I've sworn not to share.</p>
            <p>Our relationship blurs between sources and friends. We barely talk about baseball. We talk about him trying to see his grandkids more and how I want a job at the <em>Washington Post</em>. About NFL football (he's a Miami Dolphins fan), attending a Catholic school growing up (I went to church every other day), and even social media (he recently started an Instagram account).</p>
            <p>The relaxed moments are fleeting. I'm entering my fifth year on the beat, and this could very well be my last. Although I'd love to spend my entire career here, I'm resigned to the reality that time at my beloved <em>Freep</em> may be running out—for better or worse.</p>
            <p>I've already aced the Tigers beat and I'm still getting paid less than $50,000. I'm craving a new challenge and begging for more development. But most of all, I barely made it out alive last year when George Sipple left midseason.</p>
            <p>I don't have support from my own front office. I've soured on my dream job, and it's starting to take its toll.</p>
            <p>My New Year's resolution is to Make Ball Writing Fun Again. I want to tell fun stories and have fun writing them and live every day this year on the beat as if it's my last.</p>
            <p>It's snowing when we leave. Avila is stopped by a stranger on the street. The stranger introduces himself— "You're Al Avila, aren't you?"—and compliments him on the job he's done.</p>
            <p>"I'm rooting for you.</p>
            <p>After years of getting ripped everywhere—laughed at on the radio for accidentally mispronouncing a player's name, ridiculed on social media for moves made and derided as the captain who's sinking the ship—the random compliment of kindness strikes a chord.</p>
            <p>Walking away, Avila sounded relieved the stranger said something nice for a change.</p>
            <p>I'm rooting for Al, too. Does that make me a bad journalist? Or does it make me human?</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline"><em>January 15</em>—</span>A lot has changed since I stumbled upon fantasy camp on the back fields of TigerTown last winter, quickly swearing it off. But this year we're making Ball Writing fun again. So, in December, I signed up to play ball with bankers, accountants, lawyers—Tigers fans eager to wear the Olde English 'D'.</p>
            <p>For me, it was a no-brainer. Fantasy camp provided a chance to light myself on fire and tell a feature story that will assuredly leave a smoky plume of questions about sports journalism ethics—as if sports journalism is anything but entertainment at its core.</p>
            <p>And maybe this whacked-out reporter just wants to play some slow-pitch baseball, have fun and write an entertaining story. <span class="media-emoji" data-media-id="fantasy-camp">📰</span></p>
            <p>I tell Lewis the trip has been cleared.</p>
            <p>"Great news! We're excited to have you."</p>
            <p>I'm excited, too—even with my chances at the Post officially crossed out.</p>
            <p>Before we hang up, Lewis says fantasy campers are divided into teams and asks what kind of team I want to play for. I don't follow.</p>
            <p>"Do you want to play for a good team or a bad team?"</p>
            <p>I think about it.</p>
            <p>"Bad. Definitely bad."</p>
            <p>"Great! I'll put you on the worst team then."</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">LAKELAND, Fla., <em>January 28</em>—</span>Fantasy camp begins with a powwow. All 72 participants circle round, standing outside the Tigers' minor-league clubhouse, listening to Jerry Lewis' opening remarks. This week, each player has a locker. Inside hangs a Tigers uniform—home or road. Mine says <span class="small-caps">FENECH</span> on the back. No. 19.</p>
            <p>I'm on Team 4, the Worst Team. According to flyers posted around the locker room, we're supposed to wear road grays today—but all I have is a home white. No matter. I put on the Tigers uniform and trot out with the rest of the campers.</p>
            <p>We stretch and play catch. Each team takes ten minutes inside the Willie Horton batting cages—the same cages that Miguel Cabrera uses. By the time Team 4 takes our cuts, they've got a road gray for me—no name or number on the back.</p>
            <p>This fantasy camp, celebrating the 35th anniversary of the 1984 World Series team, offers a number of coaches who played for the 2006 Tigers, my favorite baseball team ever. It was around that time when I decided to pursue a career in sports writing.</p>
            <p>Both of Team 4's coaches are from the '06 team: longtime lefty starter Nate Robertson (head coach) and one-time flame-throwing righty reliever Joel Zumaya (assistant).</p>
            <p>The fantasy continues when I receive the Opening Day nod. Nobody spoke up, so I said I could pitch, and I threw three innings. At least seventy pitches, easily, until my arm got tired—I haven't thrown that much since I got cut from the community college team my first year. I was all-area my senior year. Hit .310 with one extra-base hit, got my picture in the paper, all that.</p>
            <p>"Good job," Robertson says, taking the ball. "We're going to need you for innings, so rest that arm up."</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline"><em>January 29</em>—</span>Wearing whites, I'm on the bump again.</p>
            <p>My arm feels fine in the first inning, but then I throw sixty pitches in the second, knocked for seven or eight runs by undefeated Team 1—the best team in fantasy camp. One of the real-life Tiger players gets a whiff of this and sends a couple of trainers to check it out.</p>
            <p>Anthony Fenech, a man with many a night perched in the cheap seats, is unable to throw a pitch over the plate in coach pitch. His arm hurts.</p>
            <p>Video of my performance circulates online, shared on Twitter by Jordan Zimmermann, who is participating in fantasy beat writer camp. He reports my pitching line: <em>@anthonyfenech line vs Tigers Fantasy Camp: 2/3 IP, 2 H, 5 BB, 5 ER, or, not very good</em>.</p>
            <p>I sit at my locker scrolling through the ridicule, lucky the video culprits didn't stick around. I actually went back out for <em>another</em> inning and moved up five feet, like it was coach pitch.</p>
            <p>Everyone shacks up at the Ramada Inn, fantasy campers and coaches alike—even real-life ones. I walk past Tigers' third-base coach Ramon Santiago with an ice pack on my knee. "Now you know how it feels, <em>An-tony</em>."</p>
            <p>Is the pain worth it? I've been receiving comments from all over: Ball Writers, readers, sources—even players are getting into it.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline"><em>February 12</em>—</span>Arriving at the park, I walk past Jordan Zimmermann in the parking lot.</p>
            <p>"Here's trouble."</p>
            <p>Pitchers and catchers have reported to camp.</p>
            <p>With everyone trying to catch a first look at the 2019 Tigers, the team's PR staff is cracking down on the Fake News Media. Ball Writers are welcomed to camp with frustrating news of restricted access—we can't watch bullpen sessions from behind the screen anymore.</p>
            <p>"Did you have to miss softball fantasy camp for this?"</p>
            <p>It's good to be back.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline"><em>February 19</em>—</span>I'm on the back fields watching Hall of Famer Alan Trammell work with prospect middle infielders during minor-league mini-camp.</p>
            <p>"That's it?" Tram asks. "That's it for the day? Are you kidding me?"</p>
            <p>It's nearly 5 <span class="small-caps">P.M.</span> Tram has been on campus since 7 <span class="small-caps">A.M.</span> Watching him, I can't stop thinking about how everybody should love something in life as much as Tram loves baseball. After drills conclude, walking toward the mess halls, Tram spots stray baseballs beyond the outfield fence.</p>
            <p>He stops, picks up one ball. Then another. And another. Soon, he's walking behind center field, throwing each ball back over the fence. A couple of clubhouse attendants see this and speed over on a John Deere. They pick up Tram, whooshing past me.</p>
            <p>"Hello, Anthony!" he says.</p>
            <p>I first met Trammell in 2009, as an intern at the <em>Las Vegas Sun</em>. He came to town that spring as the Chicago Cubs' bench coach, serving as acting manager for the team's Cactus League exhibition against the Chicago White Sox at downtown Las Vegas' Cashman Field—home of the Las Vegas 51s, the Triple-A affiliate of the Oakland A's.</p>
            <p>Introducing myself, I called him "Mr. Trammell." Ten years later, he's "Tram."</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">LAKELAND, Fla., <em>March 1</em>—</span>Today in the parking lot, Miguel Cabrera vrooms around the corner in a car so exotic I couldn't tell you what it was.</p>
            <p>Miggy drives at me. He hits the gas, and I stick out my leg.</p>
            <p>"You wish!" he yells out the window, speeding away from my chances at a seven-figure injury settlement.</p>
            <p>This is our relationship now—playful threats of vehicular manslaughter.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline"><em>March 4</em>—</span>The big kid in class is cutting up, so I have to tell the teacher—former media relations director Aileen Villarreal, who's now Cabrera's PR handler.</p>
            <p>I inform her that Miggy, as the only recognizable player in the Tigers' young clubhouse, will be featured in this year's season preview—but he doesn't wanna do it. I also tell her I called Cabrera's agent, Fernando (Fern) Cuza.</p>
            <p>"He said he was gonna talk to him when he comes to Lakeland next about how it's good for him."</p>
            <p>I email the story pitch: "I want to give people a look at 'The New Miggy'—how the past year away from the game has impacted him and what his future holds. My goal is to get under the surface, so fans see the core of Miguel, his passion for baseball, family and the Tigers."</p>
            <p>I should've just read this to Miggy earlier. Instead, I described the story for him, and he said no.</p>
            <p>Villarreal emails back: "Fern wanted me to let you know; he and I will be in Lakeland in the next couple weeks and will talk to Miguel."</p>
            <p>The teacher and principal are on the way. That'll show him.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">LAKE BUENA VISTA, Fla., <em>March 6</em>—</span>I see pro scouting director Sam Menzin in the media dining area, which reminds me. During the game, I text Menzin, taking him up on his dinner invitation from a couple days ago.</p>
            <p>He's seated alongside the rest of the Tigers' second-tier hierarchy, a row behind the team's top officials—HSITL, assistant GMs, Jim Leyland.</p>
            <p>"You like seafood?" Menzin messages me. "I took Katie (Strang) to Gary's Oyster Bar last year. My reporter tradition."</p>
            <p>"Wow. I'm second-fiddle to Katie."</p>
            <p>"Hey, be happy I asked you."</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">LAKELAND, Fla., <em>March 7</em>—</span>I'm at breakfast with Craig Monroe at Cracker Barrel when I get a call from a scout, who says the front office is freaking out because earlier I'd texted some provocative questions to the Highest Source In The Land.</p>
            <p>Buzzed from a quad-espresso coffee, unable to hold the hot potato any longer, I tip my hand. I text Al Avila, letting him in on the secrets I know.</p>
            <p>"If I report the Astros have maintained contact about Nick Castellanos, would that be accurate?… And that you guys turned down (Alex) Bregman for (Michael) Fulmer two years ago!"</p>
            <p>Bregman is Houston's young superstar at third base, an RBI and home-run machine. Fulmer's star has faded since his Rookie of the Year campaign in 2016—the righty starter has lost more games than he's won for the Tigers.</p>
            <p>These questions trigger a flash five-alarm meeting in TigerTown. Al Avila calls the front office into a meeting room and threatens to fire anyone found to be the source of the mortifying media leak. I get a message from Sam Menzin.</p>
            <p>"I have to cancel our dinner. Sorry, stuff came up."</p>
            <p>After breakfast, I head to the ballpark for the Tigers-Cardinals. Midway through the game, I stir the pot—letting HSITL know that I know about him taking his front officers to the woodshed.</p>
            <p>"So did you find the leak?"</p>
            <p>Stuck in a slow crawl of fans and senior citizens after the game, Avila calls.</p>
            <p>"I can't hear you that well. I'll call you later."</p>
            <p>Walking out of the manager's office, I see a missed call from Menzin. He calls again. I answer, speaking softly, walking faster, shaking a tail of trailing writers. They take the stairs to the press box… I stay straight onto the empty concourse.</p>
            <p>Sam Menzin is in an absolute frenzy.</p>
            <p>"Slow down, Sam. Slow down… What's wrong?"</p>
            <p>"I shouldn't even be calling you right now."</p>
            <p>Menzin's voice rises. He asks for my sources, saying he wants to know where I got that information.</p>
            <p>I wonder why he's prodding—to funnel information back to the HSTIL?</p>
            <p>He asks about specific folks: "Was it (scout)?… Do you talk to (executive)?"</p>
            <p>"Look, Sam. I'm not going to tell you who I am or am not speaking to. You know I can't answer that. I wish we had that kind of relationship, but you never even talk to me, man. You haven't given me anything in five years, you know?"</p>
            <p>In this rare moment, I'm a reporter with an advantage. Menzin is like a sea lion shaken off its ice patch by Avila's scare tactics—and he's seeking help from a shark.</p>
            <p>"Anthony, I could get fired. I could lose my job. He said he's gonna fi—"</p>
            <p>I cut him off.</p>
            <p>"Sam, chill… I hate to say it like this, but that's not any of my business. And it's not yours, either—you didn't tell me anything about the Bregman deal."</p>
            <p>I try to calm him down.</p>
            <p>"We had plans. How about you just meet me at the oyster bar like we said. We'll talk then."</p>
            <p>"Anthony, I can't."</p>
            <p>Sam says that his parents are in town. That he feels like he's going to throw up.</p>
            <p>"Look, I'm not writing anything about it right now, OK? But this is literally my job… what's in it for me?"</p>
            <p>"Nothing's going to happen, Sam. Enjoy dinner with your parents."</p>
            <p>"You are doing your job," my source says, "very, very, very well."</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline"><em>March 8</em>—</span>The Daily Churn is waiting by dawn. The desk is looking to capitalize on the access controversy with web hits. It's Coach Content: "Thinking about changing the headline to reference the policy change. Probably would get a little more traction."</p>
            <p>Later on, a twilight against the Yankees in Tampa. This afternoon in TigerTown, I wait around to watch Miguel Cabrera field ground balls. No other reporters. Earlier, I noticed the bench coach replacing the agenda taped to the clubhouse door: <span class="small-caps">CABRERA—GROUND BALLS —FIELD #3, 1:30 PM.</span></p>
            <p>I could have shared this half-baked exclusive on Twitter—<em>Miggy To Field Ground Balls!</em> —but then I'd have blown my cover. I still need to get him all to myself. I'm going to pull off a mega Miggy story for the 2019 season preview. But Cabrera sees me coming. He holds up his hands, laughing uproariously.</p>
            <p>"No comment! No comment!"</p>
            <p>In Tampa, Brad Ausmus says reliever Bruce Rondon has been sent to the minors.</p>
            <p>Rondon, once considered the team's future closer, was sent home last season for poor conditioning and effort level. He arrived this spring at 6-foot-3 and 275 pounds—but with a fastball pushing 100 mph and, at least on the surface, an attitude adjustment.</p>
            <p>With our relationship blooming like the Outback onion, I go straight to the Highest Source In The Land, sitting a couple tables over in the media dining room.</p>
            <p>"Can I grab you for a sec when you get out?"</p>
            <p>Avila reads it. No reply.</p>
            <p>Instead, he sends Aileen Villarreal my way.</p>
            <p>"Al said you reached out to him. From now on, whenever you want to talk to him, go through me."</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">LAKELAND, Fla., <em>March 9</em>—</span>Michael Fulmer has grown testy talking about it, insisting he's not worried about his fastball.</p>
            <p>"It's not like it just vanished anywhere. It's going to come back."</p>
            <p>According to scouts' radar gun readings, Fulmer's fastball registered 88-92 mph today—still short of the mid-90s he typically sits. He's tired of answering questions about velocity—especially from the guy with a 32.80 fantasy camp ERA.</p>
            <p>Fulmer's body is much older than the 26th birthday he celebrates next week. After rehabilitating from another knee surgery this winter, the big righty hasn't passed the eye test this spring. Among the most laid back in the clubhouse, Fulmer looks over this scene—he stands silent, in surrender almost, while reporters prod.</p>
            <p>Not even a pair of nearby parking signs can provide levity: <em>Please, NO spitting in this area</em>… <em>Goobers are GROSS</em>!</p>
            <p>I tell Michael what I'm writing—that he doesn't look good. Am I wrong?</p>
            <p>"Well, you're wrong because I thought you guys are more result-oriented… So, if my velocity is up and I have a bad game, you're result-oriented. And if my velocity is down but the results are good, you guys are still worried about my velocity. Which one are you going to take there?"</p>
            <p>I provide my answer in the column: "I'm going to take the Fulmer who throws 95 mph. But I haven't seen him yet and I'm starting to wonder when—or if—I will again."</p>
            <p>Meanwhile, in Clubhouse Wars, PR makes its latest move—restricting media access to the main hallway separating the manager's office and the dressing room. This is all my fault—for years I've been loitering in the hallway to sniff out roster moves. Even with blinds shut, you can see who walks into the manager's office and how they look walking out.</p>
            <p>Three years ago, the team promised the Tiger Beat a new media center in the renovation. Now they're restricting clubhouse hallway access. Maybe a cage is more what they had in mind.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">FORT MYERS, Fla., <em>March 10</em>—</span>I pack my bags, fuel up the rental and leave early for spring break—the Tigers and I need a little space. Plus, Pedro Gomez is scheduled to be in Red Sox camp tomorrow.</p>
            <p>With Dombrowski, my annual pilgrimage to Fenway South is for a glimpse at a young farmhand named Rio Gomez.</p>
            <p>Gomez is not projected as a top prospect or even a future major-leaguer: Gomez was drafted two years ago in the 36th round out of the University of Arizona as a soft-tossing lefty reliever—he's twenty-four, past puberty by professional baseball standards, expected to start the season at Class A.</p>
            <p>Yesterday, I saw his dad was in Florida and wondered if he would be close enough to meet up. Pedro Gomez answered: "Heading to The Fort (Myers) for a Rio Gomez two-inning intrasquad outing and then home to PHX."</p>
            <p>I had to be here for that. When I see Pedro, I'm beaming. I give him a big hug, and we catch up. A man wearing a Sox polo walks up with a smile on his face.</p>
            <p>"The VP of player development," Pedro says, introducing us.</p>
            <p>"What are you doing down here?" the guy asks.</p>
            <p>"I came here to see him."</p>
            <p>And even if we only have a few minutes together today, it's true.</p>
            <p>I can't recall ever seeing or hearing Pedro nervous—probably a product of his Cuban heritage. Waiting for Rio to walk out, Pedro is quiet. I want him to have that moment by himself. You never know how many there will be with people you love. Make that call. Take that drive. Tell someone you love them.</p>
            <p>I tell Pedro. We hug it out.</p>
            <p>A rival executive shares news while I brunch with scouts in the media dining. It's a link for a job opening: <span class="small-caps">RED SOX BEAT WRITER—THE BOSTON GLOBE</span>.</p>
            <p>Covering the Red Sox at the <em>Boston Globe</em> is arguably the best beat in baseball—a major newspaper in a baseball-mad city where some of the greatest sports writers of all-time have written—Gammons, McDonough, Montville, Ryan, Shaughnessy.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">ATLANTA, <em>March 19</em>—</span>High noon at the world's busiest airport, I get a tip from TigerTown. Michael Fulmer is injured, as indicated by the velocity dip this spring.</p>
            <p>I hear from Deep Throat while mad-dashing terminals, trying to make my connection to Tampa for the final week of camp.</p>
            <p>"You hear about Fulmer?"</p>
            <p>"No, what?"</p>
            <p>"Tommy John."</p>
            <p>Four alarms. Immediately, I call and text Al Avila. I text Sam Menzin in hopes that after our last conversation, he'll become a useful source.</p>
            <p>Deep Throat tells me not to run with it right this second.</p>
            <p>"It'll be easy to trace back to me."</p>
            <p>I miss my flight. No reply from Al Avila or the agent. On the tram to the next flight, I message Deep Throat: "Al is gonna screw me."</p>
            <p>Tigers PR announces the news before I step off.</p>
            <p>All that for no scoop.</p>`,
        wordCount: 4100
    },

    // 2019 SEASON CHAPTERS (23-27)
    {
        id: 23,
        year: 2019,
        section: 'year',
        title: "GLOBETROTTING",
        subtitle: "",
        teaser: "Baseball takes us around the world.",
        content: `
            <p class="has-dateline"><span class="dateline">TORONTO, <em>March 28</em>—</span>Welcome to Canada, at long last. I arrived from Tampa yesterday. Cold, gray, rainy, the whole deal—good thing baseball is played under a roof here.</p>
            <p>I buzz around the Rogers Centre during the Tigers' preseason workout. It's my favorite baseball holiday, the Opening Day sourcing round, Christmas Eve to Christmas. I record an interview for the <em>Freep</em>'s weekly Tigers podcast with the new TV broadcaster, exchange pleasantries with players and coaches.</p>
            <p>I get a scoop from clubhouse manager Jim Schmakel: The Olde English 'D' on the Tigers' batting helmets is smaller this year. I snap a shot for Twitter.</p>
            <p>Back in my hotel room by half past noon, I shower and pull up the ScoopSheet. From my computer, I rapid-fire good luck messages across the league, personalizing the greetings: <em>How's it going</em>?… <em>What's your coverage like this year</em>?… <em>Safe travels</em>. I do this until midnight, leaving West Coast guys for last.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline"><em>March 29</em>—</span>I walk to the dome for Opening Day: Tigers-Blue Jays.</p>
            <p>Making my way around the clubhouse, wishing players good luck and good health, I notice Rival Cohort copying my ritual. Not even this can blemish the best clubhouse experience of the year. Besides, he doesn't say "good health"—and that's what really gets 'em going.</p>
            <p>Nick Castellanos' outfield glove sits on the railing of the dugout. 'Go Get It' is embroidered in dark leather.</p>
            <p>An hour before first pitch, I send my application to the <em>Boston Globe</em>.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">NEW YORK, <em>April 3</em>—</span>Phone interview today.</p>
            <p>Clubhouse in the Bronx opens at 12:30 <span class="small-caps">P.M.</span>, but I'm skipping. Instead, I'm twenty-two stories high in my midtown Manhattan hotel room for a thirty-minute call with the <em>Boston Globe</em>.</p>
            <p>I keep 'em on for forty-four minutes, the sports editor and two assistants. He was quick to respond to my application, which included these references: Pedro Gomez, Bob Nightengale and Al Avila. Listing the general manager of the team is certainly not conventional—but I did it intentionally.</p>
            <p>The Highest Source In The Land makes my references page stand out. It begs to be asked about.</p>
            <p>"I think it's very important to have a good relationship with your GM. I put my GM down there because I think he'd give you guys a unique look at the way I cover a team."</p>
            <p>After the interview, I take the 4 Train to The Bronx. Yankee Stadium is sterile and too corporate but still carries the ambiance of a baseball Mecca. Today's train ride was a herky-jerky hell with standing-room riders pressed against each other, the past two nights have been cold, and what kind of Mecca doesn't have windows in the press box? The joint cost $2.3 billion and its press box is wide open, exposed to windchill, leaving a roomful of Ball Writers watching on TV inside the enclosed media workroom—me included.</p>
            <p>I spot Seamhead George King in the cafeteria in the second inning. King sits at a roundtable, material sprawled out, updating his game logs by hand.</p>
            <p>The Tigers catch the Yanks at the right time. They win the series, heading to Detroit with a winning record.</p>
            <p>They will lose 114 games this season, among the most ever. But for now, they are 4-3. Tomorrow is the first and most popular game of the year. Brown liquor, keg beer at the fantasy camp tailgate—an Opening Day made for the 'Ball Writing Fun' movement.</p>
            <p>I wait for Miguel Cabrera postgame. He knows what to say.</p>
            <p>"Tell Detroit we're coming."</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline"><em>April 20</em>—</span>Scott Boras called this afternoon to let me know that Nick Castellanos signed with him. Apparently, Nick ditched his longtime agent, who has always been helpful. Agenting is cutthroat. I also can't blame Castellanos for defecting—Boras is the surest way to secure big money.</p>
            <p>I put the headline on Twitter and the story in my back pocket. The <em>Globe</em> is watching. Next week, they'll ask about the scoop, noticing Big Agent's accessibility. By that point, I'll be following the Red Sox closer than the Tigers, sizing up the Boston beat and trying to snuff out information about the search.</p>
            <p>I keep my sources in the loop. Executives, scouts, even the PR chief over there I've gotten to know. The night before I leave, I meet with a Red Sox scout I've known for years at a dingy dive near the airport. He helps me compile a list of story ideas for the interview and wishes me good luck.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">BOSTON, <em>April 22</em>—</span>Inside the press box at Fenway Park, there's a framed picture of the <em>Boston Globe</em> sports front on October 22, 1975—the day after Carlton Fisk hit one of the most famous home runs in baseball history.</p>
            <p>On the page is the greatest lede in Ball Writing history, penned by Peter Gammons:</p>
            <p><em>"And all of a sudden the ball was there, like the Mystic River Bridge, suspended out in the black of the morning.</em></p>

<p><em>"When it finally crashed off the mesh attached to the left field foul pole, one step after another the reaction unfurled: from Carlton Fisk's convulsive leap to John Kiley's booming of the 'Hallelujah Chorus' to the wearing off of the numbness to the outcry that echoed across the cold New England morning.</em></p>

<p><em>"At 12:34 <span class="small-caps">A.M.</span>, in the 12th inning, Fisk's histrionic home run brought a 7-6 end to a game that will be the pride of historians in the year 2525, a game won and lost what seemed like a dozen times, and a game that brings back summertime one more day. For the seventh game of the World Series."</em></p>
            <p>It can give you chills.</p>
            <p>Today's game gets rained out. Doubleheader tomorrow—bad news for anyone who has an interview at the <em>Boston Globe</em>.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline"><em>April 24</em>—</span>The interview was rescheduled for today, within the hour.</p>
            <p>I snap a selfie in the back of a taxi to the newsroom. Ron Colangelo checks in, looking for a scoop.</p>
            <p>"How did yesterday go?"</p>
            <p>"Heading there now… Let's get it."</p>
            <p>"You would enjoy living there. Going to Fenway every day is special."</p>
            <p>When I get checked in, sports editor Matt Pepin gives me a newsroom tour. It's everything. People. Vibrancy. Windows etched in the design of historic Boston events. Big, but not too big, like the <em>Washington Post</em> was.</p>
            <p>This is my second newsroom interview of the year. In January, I talked my way into visiting <em>Post</em> HQ on K Street, a mammoth, multi-floor operation backed by hundreds of millions of Jeff Bezos' dollars. The Amazon founder bought the <em>Post</em> for $250 million in 2013, because why not. They were looking for a Nationals beat writer and I'm clearly looking for a way out, but I never heard back, and now here I am.</p>
            <p>Mr. Sports Editor throws a curve—I'm meeting with the <em>Globe</em>'s top editor in fifteen minutes, not this afternoon, like the itinerary says. It's been a car wash of interviews since then.</p>
            <p>What would you bring to the beat? "Creativity. I really like to let my personality show."</p>
            <p>Your key to reporting? "It's all about building relationships."</p>
            <p>And so on and so forth. My biggest win might've been eating my whole meal at lunch—my stomach develops armor when stressed. He shared a story about the local sports scene that hit close to home. Apparently one time a guy wrote something and didn't cite the other station—the guy got attacked online and outed for crap in the past.</p>
            <p>"It wasn't pretty."</p>
            <p>"I can imagine."</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">CHICAGO, <em>April 26</em>—</span>Physically and emotionally exhausted, I climb into Andrew's Navigator at O'Hare. I tell my personal Chicago cabbie about the interview.</p>
            <p>I've been running on adrenaline since arriving in Boston for interview week. After acing the in-person interview, scoops right now are very valuable. Last night in Boston, Jordan Zimmermann left his start with an arm injury. Zimmermann is scheduled for an MRI and I'm all-over Deep Throat—given the circumstances, he's graciously lifted the Three Commandments.</p>
            <p>Mid-afternoon: "Al has the info, and we are releasing a press note at three."</p>
            <p>Wait—what info?</p>
            <p>I call Al Avila. He doesn't answer. Deep Throat got to my urgent questions. "Will call in a few."</p>
            <p>Avila beeps in while we're on the phone. PR puts out an announcement—Zimmermann won't have elbow surgery, but he's going on the ten-day injured list. He will speak in the dugout soon, says media relations director Chad Crunk.</p>
            <p>Zimmerman's eyes are red when he does. He's clearly been crying—even though he doesn't have to get surgery right now, Zimmermann has considered the possibility that if he does go under the knife again, his career might be over.</p>
            <p>This whole scene gets me unusually emotional. I've never gotten over the sarcastic tweet I sent about Zimmermann's ongoing injuries last year. It's one of two professional regrets I carry. I know I apologized and we've moved on, but I think about this today when I sit alone in the press box during batting practice.</p>
            <p>Down below, Zimmermann walks alone in right field, hands in coat pockets. He can't play catch or participate like a healthy player, and I can't help but hurt for him. Guilt swells. I send Zimmermann a message:</p>
            <p>"Hey man, I know I don't need to, but I wanna apologize again for that tweet last year. And I'm sorry you have to go through this. None of us will ever know what goes into staying on the field and how you guys can't control when your bodies let you down.</p>
            <p>"It was tough talking to you about it today and I know you were holding it back. I wouldn't be able to say this to you in person, so yeah."</p>
            <p>"No worries."</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">MINNEAPOLIS, <em>May 12</em>—</span>The suspense is killing me.</p>
            <p>I'm losing sleep over the <em>Globe</em>. Who the other finalists are. What my chances are. Why they haven't called. I toss and turn and pick up my phone in the middle of the night, scouring the Internet for clues.</p>
            <p>It's been more than two weeks. Decision day is looming.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">DETROIT, <em>May 13</em>—</span>Mom picks me up at the airport.</p>
            <p>"You look exhausted."</p>
            <p>"These have been the longest two weeks of my life."</p>
            <p>That's around the time I saw the missed call I'd been waiting for. He left a voicemail.</p>
            <p>"Just calling to catch up with you regarding our position here at the <em>Globe</em>…"</p>
            <p>I waved Mom out of the house. Preparing for the biggest call of my life, I got down on my knees and prayed. Not for the job—but please, God, let whatever happens be the right thing.</p>
            <p>I take a deep breath. Call back. God answered my prayers: I didn't get the job.</p>
            <p>It was hard to process and getting blurry and I spit out a follow-up.</p>
            <p>"Where did I come up short?"</p>
            <p>"You didn't come up short, Anthony. We really, really liked you. It was a tough decision, but we just thought there was a better fit. If I say any more, I will get slapped on the wrist by HR."</p>
            <p>He needn't. I'm a journalist—I can read between the lines.</p>
            <p>Hell yeah, I cried. I sobbed. I'm devastated, embarrassed, heartbroken. I really thought I was going to get it. Worst of all, I feel trapped now.</p>
            <p>I shaved my mustache, blared the music and missed a call from a <em>Houston, TX</em> number. Thought it was spam until I got this: "This is Gene Dias from the Astros. Please call me when you get a second."</p>
            <p>Just what I needed. I called back and he asked if I'd be at the ballpark today—Houston is in town. I tell him no. It's a travel day for me. He asked if I'd be there at all this series and if I planned on speaking with Justin Verlander.</p>
            <p>"OK. You might not have been planning on it, but I wanted to let you know that after last time—what we spoke about last season and when Justin said he wasn't granting you interviews anymore—he said on the flight here that he will be sticking to that."</p>
            <p>I tell Dias I understand. No Verlander. Got it.</p>
            <p>I hang up the phone. Somehow, someway, I laugh. Life's funny like that.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline"><em>May 18</em>—</span>The Tigers (18-25) have lost five straight, and I'm trying my best to lighten things up. Today, my fantasy campers are at Comerica Park. Before tonight's game, they'll get introduced on the field. This afternoon, they're being treated to a luncheon inside the Champions Club—the stadium's VIP season-ticket holder restaurant.</p>
            <p>I join them here on my off day for a just cause. Veteran lefty starter Matthew Boyd has become one of my favorites in the clubhouse—not only is Boyd one of the nicest guys, but he's also started a charity with his wife to defend against human trafficking in Uganda.</p>
            <p>I'm here to help the Kingdom Home charity along with some coverage.</p>
            <p>After interviewing Boyd, I sneak into the Champions Club, where manager Ron Gardenhire is conducting a Q&A with the fantasy campers and taking questions. I jump in.</p>
            <p>"Who's your favorite beat writer?"</p>
            <p>"Not you."</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">NEW YORK, <em>May 24</em>—</span>The days after I didn't get the <em>Boston Globe</em> job are becoming a blur. Drinking almost every day. I'm at the Museum of Modern Art in Manhattan.</p>
            <p>I take the subway to Citi Field, the Mets stadium in Queens. I get some extra time with Gardy today to squeeze out a feature story about his former days as a Met. Gardenhire refers to himself as a "futility player," spending parts of five seasons with New York in the early eighties. The Tigers snap their ten-game losing streak in a slugfest, 9-8.</p>
            <p>I celebrate by staying out until the sun comes up.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline"><em>May 26</em>—</span>I'm high-level hungover, thinking about my buddy Dylan Hernández. I avoid looking at the garbage can in Gardy's office. Dylan once found himself in similar peril on the Dodgers beat—finding an unlikely hangover cure.</p>
            <p>"I (had) a tray of untouched food when Vin Scully sat down in front of me," Hernández recalled in the <em>Los Angeles Times</em>. "He took one look at me, smiled mischievously and asked, 'Mr. Hernández, were you overserved last night?'</p>
            <p>"I laughed, and for a few seconds forgot about how much I hurt."</p>
            <p>Afterwards, on the ledge at New York City's famous baseball bar, Foley's—a longtime staple for Ball Writers, scouts and umpires alike. Foley's is an industry institution, owned by an Irishman named Shaun Clancy—longtime boyfriend of colleague Kristie Ackert.</p>
            <p>Foley's displays millions of dollars of memorabilia, including a collection of four thousand baseballs—signed by such luminaries as Pope John Paul II, President George H.W. Bush and Ball Writer Anthony Fenech.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">BALTIMORE, <em>May 27</em>—</span>According to an online report from the Dominican Republic, the Tigers are close to signing fan favorite Bartolo Colón, a rubber-armed righty starter. Colón has pitched twenty-one big-league seasons. Last year, the forty-five-year-old logged 140 innings for Texas.</p>
            <p>I see the report while my flight descends into Baltimore. Twitter is in a frenzy. I send feelers to the right people—In The Room sources like Al Avila, Colón's agent Adam Katz and Sam Menzin (again).</p>
            <p>False report. Avila says no. Adam Katz says, "Nah, there's been some discussions but nothing close," but Menzin plays a different tune: "Hey man, if you have a rules question or something technical, I can help with that. Otherwise, I'm not the right person."</p>
            <p>"Ah. So that's the kind of help you meant when you called me hyperventilating, 'About to throw up,' saying you would help me out in the future, begging me not to write the Fulmer trade."</p>
            <p>"Anthony, we should discuss the situation face-to-face."</p>`,
        wordCount: 2700
    },
    {
        id: 24,
        year: 2019,
        section: 'year',
        title: "ROAD TO OMAHA",
        subtitle: "",
        teaser: "College baseball's biggest stage.",
        content: `
            <p class="has-dateline"><span class="dateline">KANSAS CITY, Mo., <em>June 12</em>—</span>Skipping town after the second game, hitting the road for three hours. I'm driving a lime green Camaro, flipping through the radio dial on a dark construction detour after midnight. Listening to a debate on porn—healthy part of society or public health hazard?</p>
            <p>Arriving in Omaha, I settle in for my new assignment on the college baseball beat.</p>
            <p>No, I did not quit. Yes, I chose this. I saw the planets aligning a week ago, when the University of Michigan advanced to the Super Regionals in the NCAA Tournament. Already in the area, I planted a bug in my sports editor's ear—<em>this</em> is the story we should be covering.</p>
            <p>Detroit wraps up its series against the Royals at Omaha's TD Ameritrade Field tomorrow night—it's a grand-opening big league game to kick off the College World Series. I get to stay when the Tigers leave and cover a winning team for a change.</p>
            <p>For the first time since 1984, the Wolverines are in Omaha—the heartland city that has hosted college baseball's annual championship since 1950. They arrive as the most unlikely of the College World Series' eight teams—a cold-weather, Big Ten program that has stolen serious attention from the Tigers.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">OMAHA, Neb., <em>June 13</em>—</span>Kicking up stones, I pull into a parking lot at a local high school.</p>
            <p>I'm late, but in the right place—a bus emblazoned in maize-and-blue lettering blocks my view of the field where Michigan baseball is finishing practice.</p>
            <p>On that bus is Chris Fetter, a friendly face I've known almost as long as I've been covering baseball. Fetter, 33, was one of the first pro scouts I met on the Tiger Beat—we were both sitting in the media dining room during a rain delay in 2015. Fetter was an Angels pro scout before leaving scouting for coaching. After a stint at Ball State, Fetter returned to his alma mater as U-M pitching coach last season. His star is shining brightly, and he's being mentioned for big league jobs.</p>
            <p>Michigan is led by up-and-coming head coach Erik Bakich. My pre-scheduled interview with him runs long, as the team waits impatiently on the bus.</p>
            <p>Fetter sends a picture of his favorite Anthony Fenech moment. I'm sitting slack-jawed in the third row of the press box, head back and eyes shut during a doubleheader.</p>
            <p>"C'mon. You're putting us to sleep."</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline"><em>June 17</em>—</span>After Michigan's tournament-opening win over Texas Tech two days ago, I met up with a trio of player dads. They celebrated the win; I celebrated covering it. Before tonight's game, I stop for <em>another</em> beer with the dads.</p>
            <p>I'm having so much fun in Omaha; I don't even mind the goofy stories the desk shamelessly throws my way.</p>
            <p>Even here, I keep my ear to the pavement.</p>
            <p>"You hearing anything about Tigers?" I ask around.</p>
            <p>Rival Exec: "Heard they are winning the whole thing."</p>
            <p>Since they left Omaha, with freelance writers covering their misfortunes, the Tigers were swept by the Indians. By the time I leave Omaha, they'll be on an eight-game losing streak. Things on the farm aren't much better—after rocketing up the system, last year's top pick Casey Mize hits the injured list with shoulder inflammation.</p>
            <p>The majors seem a million miles away. Next month's trade deadline seems light years from now. It can stay there. For the next few off days, I live the dream at the College World Series. It's as if the Ball Writing gods knew exactly what the 'fun' movement needed.</p>
            <p>In Omaha, I wake up late, enjoy unlimited juices and pastries at the breakfast bar and take a nap before covering practice. Michigan has been using Creighton University's field. After today's practice, I take the college newspaper staff out for burgers—paying it forward is a Seamhead tradition.</p>
            <p>I'm having more fun than I've had in years. I'm reporting, too, building up the college baseball network I started last year. I run into Auburn pitching coach Steve Smith roaming the concourse, take calls from PAC-12 head coaches and top junior college coaches and even get agent Casey Close on the line.</p>
            <p>Close, an agent at Excel, is a Michigan alum. He played on the Wolverines' last College World Series teams in 1983-84. Close was <em>Baseball America</em>'s player of the year as a slugging senior outfielder in 1986 but found success off the field in pro baseball. <em>Forbes</em> currently lists Close as the sixth-most powerful agent in sports. He represents A-listers, including future Hall of Fame shortstop Derek Jeter—who committed to U-M before signing with the Yankees in 1992.</p>
            <p>I've been trying to get in touch with Close for five years. I've called, emailed, sent his assistant old pictures and clippings from the <em>Freep</em> archives, everything. At long last, I highlight his name in green on ScoopSheet.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline"><em>June 19</em>—</span>Criss-crossing the empty campus on an electric scooter, I chase stories with an enthusiasm unknown to mankind. After interviewing Fetter for a story, I speed to an interview with Vanderbilt head coach Tim Corbin.</p>
            <p>Corbin gave Michigan head coach Erik Bakich his big break in 2002, hiring him as a volunteer assistant at Vandy, which is now considered the nation's top program. Corbin has led the Commodores to Omaha twice, winning the national title in 2014 and finishing runner-up the following season.</p>
            <p>Now, seventeen years later, Corbin and Bakich will square off for the national championship.</p>
            <p>"I never would have believed it," Corbin says.</p>
            <p>Bakich, forty-one, has finally broken through in his seventh season at Michigan. The Wolverines' run has made the youngest head coach at a power-five conference a hot commodity—and athletic director Warde Manuel is already cornering Bakich for a contract extension. Manuel's overtures in Omaha will be finalized in the winter, keeping the coach in Ann Arbor for two more years.</p>
            <p>"I don't think there could be a better way," Bakich says of his reunion with Corbin, "than to meet in the College World Series finals."</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline"><em>June 21</em>—</span>Michigan stamps its spot in the finals by beating Texas Tech <em>again</em> tonight. The Wolverines are trying to add a third national title alongside the 1953 and '62 teams.</p>
            <p>Despite arriving here as an underdog, U-M doesn't lack talent. Four players were selected in the MLB draft earlier this month—all Michigan natives.</p>
            <p>Junior righty Karl Kauffmann was taken three picks after Henry in the second round. Junior outfielder Jordan Brewer, named the Big Ten player of the year, was taken in the third.</p>
            <p>Senior first baseman Jimmy Kerr was the Tigers' 33rd round pick. Kerr is a third-generation Wolverine—his grandfather John played in the 1962 College World Series, and his dad Derek played in '84.</p>
            <p>Covering the Wolverines, I've got the college game down again. I've been on the beat before: I covered the 2009 Central Michigan Chippewas back in college. Predictably, I had problems with PR back then, too—the sports information director once kicked me out of the press box for wearing (and not removing) a throwback Miami Hurricanes hat.</p>
            <p>With no pregame duties here, I arrive early and get comfortable at the dads designated bar.</p>
            <p>I message Al Avila: "Miss you."</p>
            <p>"You cover college baseball now."</p>
            <p>"We had a few good years together."</p>
            <p>"Stop it."</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline"><em>June 26</em>—</span>Michigan and Vanderbilt split the first two games in the best-of-three finals to set up a grand finale.</p>
            <p>Almost two weeks after I arrived in Omaha to cover college baseball, I'm still here, still having fun and still reporting like the sports writing championship is on the line.</p>
            <p>In the afternoon of Game 3, I arrive at the team hotel early. Family, friends and fans are sending the Wolverines off at 3:25, but the usually helpful sports information director won't tell me where the team is meeting pregame.</p>
            <p>"You should tell me what time/ballroom their pregame meeting is in. Could get color of them coming in and out."</p>
            <p>"We're keeping today the same as all others. Fans and media are welcome to be in the lobby."</p>
            <p>I love a good challenge, so I text my network of dads— "Anyone know what time team meeting is? For story."</p>
            <p>At the Marriott. Staking out the meeting room levels. When the team arrives on the second floor, I watch them walk in and walk out.</p>
            <p>Their final meeting began a minute early, at 3:14, when the door closed to the ballroom.</p>
            <p>That time had a purpose—attention to detail—and was the last Erik Bakich-ism on the back of the Wolverines' blue workout shirts, right below the letters, 'LFG.' I take note of the crowd, and the police escort the Wolverines receive for the drive around the block.</p>
            <p>The press box is decidedly more crowded tonight—I'm packed into the front row next to the college sports writers, no elbow room.</p>
            <p>U-M started hot, opening the game with three hits and a run, but early momentum stalled. Vandy scored six unanswered runs, cruising to an 8-2 win.</p>
            <p>Postgame, after attending conference room interviews and gathering quotes around the crestfallen Michigan clubhouse, I leave my stuff in the press box, exit the stadium and hustle to the hotel. I'm running in my shirt, tie, jacket and dress shoes. I'm winded by the second block.</p>
            <p>Sweating through my jacket, I get to the team hotel—hands on knees and breathing heavily—before the Wolverines' bus pulls up to another roar.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">DETROIT, <em>July 4</em>—</span>Back on the Tiger Beat and left to my own devices on Independence Day, I reach out to Al, suggesting we smoke a cigar in the name of freedom.</p>
            <p>Avila is eating dinner at a local bistro and invites me over afterwards. He suggests I take an Uber. We sit on the patio at sunset, drinks poured, cigars lit, fireworks crackling over a half-constructed house beyond the backyard.</p>
            <p>Avila asks how I'm holding up after the <em>Boston Globe</em> job fell through. (They never called him.)</p>
            <p>I'm honest and say I'm still struggling.</p>
            <p>"Everything is temporary," he says.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">DETROIT, <em>July 23</em>—</span>Cloudy with a 90 percent chance I start trouble today—rain is in the forecast, and I don't really want to go to work. The Tigers are 12-46 since I didn't get the <em>Boston Globe</em> job. Tigers-Phillies tonight.</p>
            <p>I seek out pro scouting director Sam Menzin. I'm flying to Seattle tomorrow for a two-week, three-city road trip through the trade deadline, and now is my last chance to impress upon Menzin that he still owes me. Trades are coming, and this Ball Writer needs some scoops.</p>
            <p>"Let's meet up for a few at the park today. Wherever, whenever—I'd like to talk to you."</p>
            <p>"About what? I'm pretty tied up today."</p>
            <p>"Personal in nature. Don't give me the run-around. It won't take long."</p>
            <p>We talk between the sloping concrete walls of Section 223, stepping into the Comerica Park concourse when it starts pouring rain.</p>
            <p>I make sure to pump Menzin up, acknowledging the frustration he feels being forced to wait his turn for more influence. That's not just me trying to soften him up. Menzin has ability—he's a sharp guy, an experienced baseball executive at a young age (28), and I'd expect him to grow into a general manager one day.</p>
            <p>Menzin says Avila has warned the front office about being tight-lipped. But he also says, "I can't guarantee anything," which leaves the door open. He outs himself as being in touch with <em>another</em> National Guy. "I've even told Buster (Olney) about needing to be quiet right now."</p>
            <p>But I'm not going to be patient. The trade deadline is coming.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">ANAHEIM, Calif., <em>July 31</em>—</span>Nearly twenty unanswered texts to Al Avila tells you everything about how this trade deadline is going. After getting frozen out by my own team's front office, I'm relying on second-hand sources, Snapchat messages, and Scott Boras to break news. It's a humbling position for a beat writer, but it's also liberating—when your primary sources cut you off, you get creative.</p>
            <p>Conditions in sunny Orange County are good for last-minute trade deadline drama. Playing a matinee on the West Coast has created an unusual situation—the 1 o'clock deadline coincides closely with the first pitch, scheduled for 1:07 <span class="small-caps">P.M.</span></p>
            <p>I'm trying to salvage something from a deadline that feels like professional quicksand.</p>
            <p>I text a source at hotel breakfast: "Accept my Snapchat. Don't text me back."</p>
            <p>Anything going on with Shane Greene?</p>
            <p>"No," the source "snaps" back.</p>
            <p>Greene, the Tiger most likely to be traded, asks for the latest details.</p>
            <p>"Gun to my head, I think it's gonna be the Braves."</p>
            <p>An hour before the game, Greene is reportedly traded to Atlanta. "Close," one insider says. "Done," another echoes. Six minutes before the game, I'm still in the dugout. <span class="media-emoji" data-media-id="july-2019">📷</span> The national anthem plays. Last I saw, Nick Castellanos was in the on-deck circle, but I've lost him. Playing Telephone while taking the stairs—texting or tweeting or talking on Facebook Messenger.</p>
            <p>I hear from a third-hand source that Castellanos has been traded to the Cubs. They share a screenshot of a conversation with a second-hand source who works in the clubhouse. I text Al Avila once more and Scott Boras again. "No news." So, I give him some news: "Cubs I think. He left the dugout."</p>
            <p>It's true.</p>
            <p>"Cubs," Boras says.</p>
            <p>I can't tweet it fast enough. Ken (expletive) Rosenthal beats me by two or three seconds.</p>
            <p>HSITL ghosted me, but he can't hide forever. In a conference call with reporters, I ask what he'd say to fans who are underwhelmed by the moves—in exchange for the best reliever traded (Greene) and an impact rental bat (Castellanos), Detroit received four middling prospects.</p>
            <p>"I don't know what you mean by underwhelmed. I thought the return was pretty good considering the market for relief pitchers, the competition, and everything involved."</p>
            <p>The utopian phase has worn off. I'm an unhappy Ball Writer rapidly outgrowing his patch of land, becoming a big pain in the Tigers' behind.</p>
            <p>Rival Exec talks me down. Over an hour on the phone. He knows how it goes: "There comes a time where you gotta punch back."</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">ARLINGTON, Texas, <em>August 3</em>—</span>Since I arrived here for the final leg of the three-city trip, I've been putting together the Trade Deadline Exposé—unearthing moves Al Avila should've made, analyzing his below-average return on players and questioning why he keeps making similar mistakes.</p>
            <p>Two years ago, teams were hot for righty starter Michael Fulmer: The Cubs offered shortstop Javier Báez as the centerpiece in talks, plus a pair of prospects; Houston offered third baseman Alex Bregman as the centerpiece in talks for Fulmer and lefty reliever Justin Wilson.</p>
            <p>Avila didn't act on those deals, and things went sideways—Fulmer underwent elbow surgery in March, while both Báez and Bregman have blossomed into bonafide stars. This year, Avila passed on trading veteran lefty Matthew Boyd, who was perhaps the most attractive starter available on the trade market.</p>
            <p>At twenty-eight, Boyd is in his prime. He'll strike out nine in 5⅔ innings tomorrow against Texas, lowering his ERA to 3.91 in twenty-three starts. Boyd is coveted not only for his pitching but also his contract—he doesn't hit free agency until 2021.</p>
            <p>The Trade Deadline Exposé is similar to the Very Serious Story of yesteryear. The sourcing has been secure for months—it was just about waiting for the right time.</p>
            <p>The exposé carries perhaps tougher implications than those two years ago: Instead of alienating the problem child in the clubhouse, I'll be alienating my best source for cigars and information—the Highest Source In The Land—and, in turn, most of his In The Room officers.</p>
            <p>I've been cutting out the booze lately, but this pushes me to a late-night establishment.</p>
            <p>"I feel like I'm gonna puke," I text a friend.</p>
            <p>Explaining to a Freep Sports confidante how we got here, I second-guess myself, wondering if I reported the story with too much emotion: "Basically, Al stonewalled me. From not getting back to me about Jake Rogers' call-up at the start of the trip (gave him and others multiple chances) to him ghosting me at the trade deadline. I've had his back consistently. And it's because I like him—not because I believe it.</p>
            <p>"I just flipped when I was sitting in the dugout empty-handed watching another college kid break the Shane Greene deal. I felt humiliated, so I said, 'F' it. This is done with.''</p>
            <p>And emotion aside, the Tigers and Tigers fans deserve better from the GM. At midnight, the story goes live on Freep.com, detailing Avila's past and present failings.</p>
            <p>Avila didn't do Castellanos' trade value any favors in the winter, responding to the outfielder's preference for a preseason trade, "Quite frankly, there has been no interest at this point." And he closed up shop early on Boyd's bustling market, telling the lefty a week before the trade deadline that he was unlikely to be traded.</p>
            <p>In the Trade Deadline Exposé, rival executives speak out, calling the Tigers' price on Boyd "borderline comical" and the team's rigid negotiation stances "impossible to deal with."</p>
            <p>"<em>The end result was another missed opportunity, aided by self-inflicted issues in marketing their players, a lack of creativity in finding the best returns and, of course, the shrinking trade market, which has long been their excuse for not bringing back significant prospect hauls.</em>"</p>
            <p>My issues with the front office have really piled up on this road trip, beginning last week in Seattle when my workout was cut short by news of a lawsuit—they've been sued by the clubhouse attendant who was allegedly subjected to a racial slur last year from Chris Bosio.</p>
            <p>Avila, assistant GM David Chadd and special assistant Willie Horton, the famous former Tiger star, are the only current employees listed in the complaint.</p>
            <p>According to the complaint, the Tigers directed Horton, who is black, to contact Derrell Coleman, another black man, who had been diagnosed with Asperger's Syndrome—a high-functioning form of autism characterized by difficulties in social interaction and non-verbal communication.</p>
            <p>Horton, who is seventy-six, allegedly reached out to Coleman, twenty-two, the day after Bosio was fired in 2018—purportedly to discuss the possibility of Coleman getting involved in "scout school," a Major League Baseball training course for scouting that had ended in 2017.</p>
            <p>The complaint alleges the Tigers took advantage of Coleman's medical condition. When Coleman learned "scout school" was no longer operating, the team promised him an internship.</p>
            <p>Coleman says those promises were never fulfilled. On January 4, Coleman was contacted by an HR coordinator, who fired him, saying the team was "going in a different direction." Coleman seeks more than $25,000 in damages.</p>
            <p>It upset me that the team took advantage of Horton, a Detroit civic legend who spoke out against the city's 1968 race riots, putting him in a position to be named in a racial discrimination lawsuit.</p>
            <p>After I chased that news from Seattle, we flew to Anaheim for the trade deadline. Got nothing from the front office. Now I'm in Texas and my phone hasn't stopped flashing texts since the story about front-office malfunctions went live.</p>
            <p>"Lots of respect that you called them out on it."</p>
            <p>"I was wondering when you were gonna drop it. You'd been sitting on it for a loonnng time. Al must've really ticked you off…"</p>
            <p>I reach out to Rival Exec. "There will be repercussions."</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">DETROIT, <em>August 5</em>—</span>Back home after twelve days on the road, more Tiger Beat drama.</p>
            <p>They're talking about the exposé on 97.1 The Ticket in Detroit and 96.1 The Game in Grand Rapids.</p>
            <p>"I'll tell you right now, this piece that Fenech wrote today. Find me the last time someone wrote something this impactful. This thing's picked up by every outlet out there—because it says something. Because it calls Avila and this organization out for what they are. You got a beat writer putting his balls on the block."</p>
            <p>Across the state, a friend checks in.</p>
            <p>"Someone called you a hero."</p>
            <p>PR reaches out. Ron Colangelo says Al wants to talk about the story. I'm "off" today, but I'd rather nip this in the bud. Sure, I'll stop by.</p>
            <p>Deep Throat checks in. "Heard you're meeting with Al later today. Stand your ground, man."</p>
            <p>Yesterday's article has challenged my good standing with Avila, who says my reporting wasn't true— "well, not entirely." He is sullen, not steaming mad, and doesn't ask for my sources this time.</p>
            <p>"If you have someone on your side leaking incorrect info, then that's an even bigger problem."</p>
            <p>Avila says reading the story felt like getting stabbed in the chest.</p>
            <p>I tell him: "I texted you almost twenty times at the trade deadline and got nothing—nothing—in return… I'm not doing my job, my position, my readers justice by not reporting what I know—especially when I'm not getting anything from you."</p>
            <p>Avila doesn't say much, but I know our high times are over. I hear it in his voice; I see it in his face: I hurt the Highest Source In The Land.</p>`,
        wordCount: 3100
    },
    {
        id: 25,
        year: 2019,
        section: 'year',
        title: "A LETTER TO THE EDITOR",
        subtitle: "",
        teaser: "Words that needed to be said.",
        content: `
            <p><strong>From:</strong> Thomas, Christopher <strong>Sent:</strong> Tuesday, August 20, 2019 12:15 <span class="small-caps">P.M.</span></p>
            <p><strong>Subject:</strong> Tigers today</p>
            <p><em>Might be worth asking J.V. about if Bregman had been traded to Detroit, would things have been different. If he's got access. Would tie in nicely if we end up getting Bregman.</em></p>

            <p>&nbsp;</p>

            <p><strong>To:</strong> Thomas, Christopher <strong>Sent:</strong> Tuesday, August 20, 2019 1:28 <span class="small-caps">P.M.</span></p>
            <p><strong>Subject:</strong> RE: Tigers today</p>
            <p><em>I apologize if I'm coming off a certain way, but I just need to make a couple points here: There is a very minimal chance I will be asking Justin Verlander anything. Why? Because I was the only person to ask him last year—at my editor's request—about his injury misdiagnosis claims. I understood then that it would harm my future relations with him, but I did it anyways.</em></p>
            <p><em>So, if I'm in the Astros clubhouse looking for Bregman and a scrum appears, sure, I'll go over there, once again putting myself in a situation that will almost assuredly result in Verlander ignoring my questions or taking the opportunity to publicly bully me.</em></p>

            <p>&nbsp;</p>

            <p><strong>From:</strong> Thomas, Christopher <strong>Sent:</strong> Tuesday, August 20, 2019 2:05 <span class="small-caps">P.M.</span></p>
            <p><strong>Subject:</strong> RE: Tigers today</p>
            <p><em>Seriously, man, if his stance is that a reporter from Detroit can't ask him about a very serious claim that he made about his time in Detroit, I don't know what to tell him. You did your job. I think you've been fair in your scrutiny of the franchise, and the questions are definitely worth asking. It's not as much about pageviews as much as holding the franchise accountable for their decision-making during this process. I think you've done a nice job finding things to talk about during a time when there isn't much to talk about. It isn't easy, and I recognize that. Thanks for doing it.</em></p>

            <p>&nbsp;</p>

            <p class="has-dateline"><span class="dateline">HOUSTON, <em>August 20</em>—</span>The mess I'm about to step into was created last week. I stopped by the <em>Free Press</em> newsroom to check my mail, and sports editor Chris Thomas caught me flat-footed. I was catching up with another editor when he said, "Let's have you follow-up with Bregman while you're in Houston to get his thoughts."</p>

            <p>Still basking in the afterglow of a clicks bonanza from the Trade Deadline Exposé, Thomas wanted more juice—the lowly Tigers aren't bringing eyes to the site these days.</p>
            <p>I hoped it'd slip his mind, but nope. "Don't forget," he emailed yesterday, "as we mentioned before, we gotta get Bregman talking about the possibility of being a Tiger a few seasons ago. The sooner we get that one pregame, the better."</p>
            <p>So, here I am. Walking into the Astros clubhouse to find Alex Bregman. Responding to my August 4 report, which said two years ago Detroit rebuffed Houston's efforts to trade for Michael Fulmer using Bregman as the centerpiece, the cocksure superstar tweeted, "Nah, false."</p>
            <p>Days later, Bregman's tweet was gone. Weeks later, and Commander Click wants me to ask him about it. The first person I see? Bregman, inspecting a box of brand-new bats in a hallway off-limits to the media. Inside the locker room, Old Pal is not at his locker. I keep an eye on Bregman's stall.</p>
            <p>The digital clock says 3:04 <span class="small-caps">P.M.</span> I set a mental five-minute timer to get out of Dodge. Haven't seen Bregman—I'm hoping he went to the batting cages after picking a winner.</p>
            <p>The Tigers' TV guy and a cameraman enter the locker room. Rival Cohort Chris McCosky hustles in. More writers gather—all at Verlander's locker. He finally appears, squeezing into the center of the scrum.</p>
            <p>Ball Writers want to know how the future Hall of Famer feels about facing his former team tomorrow night.</p>
            <p>I was hoping this wouldn't happen. I didn't want this to happen. Forced to decide between staying here—on Bregman watch—and walking over to the Verlander crowd, your fearless <em>Free Press</em> Ball Writer decides to join the fun (of course he does).</p>
            <p>Walking slowly toward his locker, past the digital clock. Justin spots me and says:</p>
            <p>"I told you guys…"</p>
            <p>His eyes dart from side to side. We make eye contact at least once.</p>
            <p>"I'm not talking with Fenech here."</p>
            <p>I look at him and shake my Baseball Writers' Card.</p>
            <p>"Hey, I have my badge here."</p>
            <p>He's inflamed.</p>
            <p>"All right. Well, then I'm not talking. Sorry, guys. You guys know what he did."</p>
            <p>Actually, they have no idea. And when you come right down to it, neither do I.</p>
            <p>Verlander turns around and grabs his phone. Apologizes once more to the assembled media standing at his locker, struck silent in awkwardness.</p>
            <p>He points at me.</p>
            <p>"The only person I said I wasn't going to talk to. Everybody else, bring it up with him."</p>
            <p>Nobody does.</p>
            <p>Verlander walks off.</p>
            <p>One of Houston's PR guys stands nearby—communications manager Steve Grande.</p>
            <p>"So, that's how you're going to play this?"</p>
            <p>"Yeah… How would you play it? Leave?"</p>
            <p>Grande shakes his head. He mutters something about not thinking about my colleagues. In fact, I am thinking about my colleagues—anyone gonna speak up? The Tigers' TV guy looks bewildered: "I don't know what the hell's going on."</p>
            <p>I stick around long enough for Verlander to return to the scene. He sits down for a teammates' card game—and plays gossip girl under his breath.</p>
            <p>"Standing right there."</p>
            <p>A player shoots a quick glance. Others take turns looking the idiot reporter's way. I stay in the clubhouse for twelve more minutes, according to the digital clock. After Justin blew me off, I couldn't just flee the scene. Now I'm just lingering to prove a point.</p>
            <p>Later, I discover the laughs on me. Verlander met up with Rival Cohort for a one-on-one interview—arranged by the Astros—before returning to his gossip and cards.</p>
            <p>I can't help but think: Instead of talking <em>about</em> me, could have talked <em>to</em> me—maybe we could've come up with a solution to what's still bothering him. Maybe.</p>
            <p>Astros PR keeps an eye on me as I keep an eye on Bregman's locker. He never shows.</p>
            <p>Back in the friendly confines of the visitor's side. Chit-chatting, stuffing my slacks with bubble gum. Jordan Zimmermann has a look on his face.</p>
            <p>"I heard Verlander's looking for you."</p>
            <p>My first thought: How does Zimmermann know that Verlander walked out in protest no more than twenty minutes ago?</p>
            <p>On second thought: "You're kidding me."</p>
            <p>The Tigers lose, falling 50 games under the .500 mark. During the game, I get a text from a Toronto scout in attendance, who says, "I'd travel with a bottle of moonshine if I were you and had to watch this team every night."</p>
            <p>Postgame, I make a point to speak with Miguel Cabrera, previewing tomorrow's main event. For the first time, Cabrera will face off against Verlander. The future Hall of Famers were teammates for ten seasons in Detroit.</p>
            <p>"Another day at the office. I know what he's gonna do, so…"</p>
            <p>When I ask Miggy how Verlander will pitch him, he doesn't hesitate.</p>
            <p>"Inside. He's gonna pitch high with a fastball and use his slider to try and get a first-pitch strike with the breaking ball and that's it."</p>
            <p>I tell Miggy his secret is safe with me.</p>
            <p>"I'm not going to write anything… because if he reads it, then he's going to know."</p>
            <p>In lieu of moonshine, I meet up with my Blue Jays buddy at a downtown tap house. I give him the backstory. About the solar eclipse tweets, the injury misdiagnosis questions, how Old Pal blew me off earlier and what I tweeted postgame: "Asked how he thinks Verlander is going to pitch him, Cabrera said a bunch of stuff I'm not posting on Twitter because Verlander checks my feed obsessively when he plays the Tigers, no doubt."</p>
            <p>It's satire, obviously. Like Justin Verlander would ever read my tweets.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline"><em>August 21</em>—</span>Standing next to an Astros PR guy at the urinal.</p>
            <p>"You think Gene (Dias) is going to be pissed when I go ask Verlander questions after the game?"</p>
            <p>He laughs uncomfortably and returns to his front-row seat along Dias. The Astros' VP of media relations is in his mid-fifties. Been with the team for ten years. He spent twenty years with the Phillies before that. The message I let slip is delivered. Dias glances at the third row. He gets up and gestures to join him for a chat. Here we go again.</p>
            <p>"Why are you going to talk to (Verlander)?" Dias asks.</p>
            <p>I need postgame quotes from Verlander because, in my boss' words, "That's the story we sent you there to cover."</p>
            <p>Dias: "This isn't the first time he's told you this. You know why Verlander doesn't want to speak with you."</p>
            <p>"No, honestly, Gene, I don't—why?"</p>
            <p>"Because of last time. Because you wrote what you wrote. He told you he wouldn't be talking to you any longer."</p>
            <p>I tell Dias that I'll be in the clubhouse—I'm credentialed. "I have a job to do."</p>
            <p>"He doesn't want to talk to you. You know this."</p>
            <p>"I know, but I have a job to do. My editor wants me to go over there."</p>
            <p>I'm "antagonizing" Verlander, he says, which makes me laugh.</p>
            <p>"Give me a break, Gene. He's a professional baseball player, for crying out loud… I'm just doing my job."</p>
            <p>We end the conversation as far apart as it started. It doesn't inspire confidence I'll be allowed in the Astros clubhouse postgame—BBWAA protection or not. I'm an out-of-towner. This is Dias' turf. A credential won't matter when push comes to shove—he is the gatekeeper.</p>
            <p>I call our guy in charge. Chris Thomas. Once again, I express caution. I suggest skipping the Astros clubhouse after the game, barring a no-hitter or something.</p>
            <p>He's not having it.</p>
            <p>"You need to go over there, no-hitter or not… Verlander is the local story, which is why we have you in Houston right now."</p>
            <p>I call Pedro Gomez. He's at home in Phoenix, before flying out to Minneapolis tomorrow for a long weekend road trip—he's covering the Vikings-Cardinals preseason game.</p>
            <p>I tell Pedro the Astros are trying to keep me out of the clubhouse. Pedro says call Mike Teevan, MLB's VP of communications. Teevan has heard of other issues with Verlander. But he offers no quick fix.</p>
            <p>Pedro: "You should consider asking your editor if you can write a first-person piece about the absurdity of all this. Write notes down of what the Astros have said to you. Use them. Let the baseball world know how petty they are being."</p>
            <p>Pedro will be in my ear all night. He's been there as a Ball Writer—reporting on problem children like Curt Schilling, Barry Bonds, and many more.</p>
            <p>Continue volleying texts with Gene Dias.</p>
            <p>"Hey Gene, it's Anthony, just circling back: For our Detroit readers, I'm going to your clubhouse after the game to listen to Verlander and ask questions about his performance tonight."</p>
            <p>"You are aware that Verlander has said he will not talk to you, correct?"</p>
            <p>"Yes, but I have an obligation to my readers. If he doesn't want to talk because I'm there, I'll report what happens. But I will be in your clubhouse. My BBWAA card allows that. He's under no obligation to speak with me but neither he nor anyone can prevent me from doing my job."</p>
            <p>"You have done your job. You have made it known that you want to talk to him. He has declined. As a courtesy, I can revisit this with the player postgame. OK?"</p>
            <p>"I appreciate you asking as a courtesy… I'll be in your clubhouse postgame."</p>
            <p>Pedro Gomez is fired up.</p>
            <p>"The Astros don't get to dictate your story. Do your job. Stand your ground. Don't leave the Astros clubhouse until it closes. Make your point. If that means he doesn't speak at all, then so be it. This makes me incensed, but I'm guessing you can tell. My Cuban blood is boiling."</p>
            <p>So is mine. I send Astros PR <em>another</em> message.</p>
            <p>"Just so you know, I've been in touch with MLB, and they have assured me that I cannot be prevented from entering your clubhouse."</p>
            <p>"Thx for the info."</p>
            <p>Dias' paycheck comes from the Astros. He's doing what he's paid to do. My paycheck comes from the <em>Free Press</em>. I do what I have to do.</p>
            <p>"Tell Teevan that you don't want to get down there and have some overzealous security guard try and prevent you from doing your job," Pedro says, "because if that happens, that scenario may keep you out long enough where JV will finish and you'll be fucked."</p>
            <p>Verlander dominated in a complete game, striking out 11 with no walks. He allowed two hits. Ronny Rodriguez hit a solo shot in the fifth inning, and John Hicks did it again in the ninth. Stepping in against big brother's childhood buddy, Hicks retained hometown bragging rights: He homered, his second off Verlander in as many years, and the Tigers pulled off the biggest single-game upset in baseball history, 2-1.</p>
            <p>"Win of the Year!" Ron Colangelo with a massive understatement.</p>
            <p>But instead of bee-lining to the visitor's locker room and interviewing Rodríguez, Hicks and pitchers Buck Farmer, Daniel Norris and Tyler Alexander—who combined to silence the Astros—I head the other way as assigned.</p>
            <p>"What a win for them… and my boss wants me to go to the other side. I'll hustle back."</p>
            <p>I end up standing near the end of a long line of media waiting to gain entry to the Astros' clubhouse, anxiously scrolling through my phone. I know what's going to happen next.</p>
            <p>Pedro reminds me: "Take notes of everything. Detail everything. Document it. Make sure you have it."</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">9:27 <span class="small-caps">P.M.</span>—</span>Trying to get social media attention, the <em>Freep</em> Twitter account sends a cute breaking news tweet, extra-cheeky and factually incorrect, linking to my game story:</p>
            <p><em>#BREAKING: Justin Verlander once again pitches Detroit Tigers to victory, 2-1 in Houston.</em></p>
            <p>The sports editor texts me: "Hey, that headline was intentional, I'm told… I can change if you want, given touchiness of everything."</p>
            <p>Ya think?</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">9:30 <span class="small-caps">P.M.</span>—</span>Gene Dias: "I'm going to speak with Justin again to see if he'll talk to the media with you present, but I don't expect anything has changed."</p>
            <p>I reiterate the party line: I'm a BBWAA member—I get the same access as everyone else.</p>
            <p>"Why are you doing this?"</p>
            <p>"What? My job?"</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">9:33 <span class="small-caps">P.M.</span>—</span>He's back.</p>
            <p>"Justin said he is not talking with you there. You'll come in when I get you."</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">9:35 <span class="small-caps">P.M.</span>—</span>Doors open. The line snakes into the clubhouse. A super-sized security guard stands in my way. "You can't go in right now."</p>
            <p>I think about juking, but there's backup—two others stand nearby.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">9:36 <span class="small-caps">P.M.</span>—</span>I text MLB PR Mike Teevan: "Just got stopped by security… Verlander is not talking with me there and Gene has said I can't come in with the others, until he gets me."</p>
            <p>I call Teevan. No answer.</p>
            <p>Pedro: "Show your card. Tell them to scan it. It's in good standing. You're allowed.</p>
            <p>"Ask the guard why you can't go in. Keep all these notes. Take out your phone and shoot video. Ask why you aren't being allowed in on camera."</p>
            <p>Fidgeting on my phone, I approach the security guard who stopped me.</p>
            <p>"Why can't I go in?"</p>
            <p>"Gene said, 'I'll come and get him when he's ready to come in.'"</p>
            <p>The guy has a clean-shaven head. He wears khaki pants and a team-issued employee ID badge hanging from a belt loop. I take a few steps back and snap the cover shot of my career—three security guards, standing side by side by side in front of the Astros clubhouse.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">9:39 <span class="small-caps">P.M.</span>—</span>Teevan, four minutes later: "I reached out to Gene and he said he'll be getting you shortly."</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">9:41 <span class="small-caps">P.M.</span>—</span>Dias waves me in—six minutes late.</p>
            <p>As I enter the room, the media scrum slowly dissipates from Justin's locker. Cameras are down and reporters have retreated. While I was kept outside, Verlander talked about the loss.</p>
            <p>"One bad pitch in the ninth inning. We battled back, and I give it back in the ninth. I don't blame anybody but myself. I could have done a better job executing a pitch there."</p>
            <p>Old Pal sits in his chair. He's expecting me.</p>
            <p>"I'm not answering your questions."</p>
            <p>On the winners' side, media relations manager Chad Crunk turns the music down as reporters make their way around the victorious clubhouse, sans one. The worst team in baseball just beat arguably the best team in baseball and Justin Verlander, who will <em>finally</em> win his second Cy Young Award this year.</p>
            <p>Too late for Ron Gardenhire's postgame session, I join the clubhouse mix. Tonight's hero draws a crowd. Hicks was claimed off waivers last year. Technically, he's the second player from Goochland to homer off Verlander: In 2016, Verlander's little brother Ben (then a Tigers' farmhand) took him deep on the back fields in spring training.</p>
            <p>I stick my recorder into the scrum around Hicks.</p>
            <p>"It's surreal, for sure. I've kept track of him his whole career and it was a special moment getting to catch him (with the Tigers). And then getting to hit against him… I mean, he's got me plenty of times. But I've gotten him twice."</p>
            <p>Afterwards, I'm intercepted by Jordan Zimmermann, who's been full of jokes lately.</p>
            <p>With that same cheeky look as the other day, he grabs my Baseball Writers' Card hanging from my lanyard, shaking it as a prop for his comedy: "Is this the wrong year you're using?"</p>
            <p>Zimmermann's wondering why my badge didn't work entering the Astros clubhouse earlier. He thinks it's hilarious that he knows why. So do I.</p>
            <p>"Really?"</p>
            <p>Daniel Norris overhears. He asks what happened. Another joins in.</p>
            <p>"Ver is an egomaniac," someone shrugs. "Everyone knows that."</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">9:44 <span class="small-caps">P.M.</span>—</span>Leaving the clubhouse, I call my boss.</p>
            <p>"You know we're going to have to write about this, right?"</p>
            <p>The mad dash begins. It's a five-alarm fire—and this one has my name in it. I exhaust my contacts, going all the way up to MLB's top-ranking PR official, chief communications coordinator Pat Courtney, the commissioner's right-hand man. I try to track down BBWAA president Rob Biertempfel and reach out to BBWAA secretary Jack O'Connell. I reach Crunk, who comes through in the clutch, sending a copy of the collective bargaining agreement.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">9:46 <span class="small-caps">P.M.</span>—</span>I leave Gene Dias a voicemail, letting him know we're writing a story.</p>
            <p>Returning to the press box, Dias is leaving. The door shuts behind him.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">10:30 <span class="small-caps">P.M.</span>—</span>I head to the Four Seasons team hotel, find a second-floor table with a nearby electrical outlet and post up there. I've got one more story to write.</p>
            <p>The loud music of the lobby bar tries to lure me. I've been off the sauce for seven days and pass up the temptation with one concession—the Jack Daniel's mini I keep in my work bag in case of emergency.</p>
            <p>Working into the wee hours with the help of trusted confidantes Pedro Gomez and Bob Nightengale from his hotel room in New York, sports editor Chris Thomas and I try to decipher CBA language and BBWAA rules. The story goes live just before two in the morning.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">3:04 <span class="small-caps">A.M.</span>—</span>I leave the Four Seasons so late, the Astros' next opponents have already arrived for their upcoming series—a puddle of Angels luggage takes up half the valet line when I grab a cab.</p>
            <p>Could text Brad Ausmus but no—the Angels arrive having lost back-to-back walk-offs against the Rangers.</p>
            <p>Back in my hotel room, it's quiet. Scrolling through the story over and over, yawning in bed. It's on the front page of Freep.com, my cover shot included. Just a matter of time it's everywhere after that.</p>
            <p>I text my friend: "Gonna wake up tomorrow to a 'Justin Verlander Hates Anthony Fenech's Guts' story on <em>Deadspin</em>."</p>
            <p>I guess it could be worse. I could be the guy who bet $63,250 on tonight's game and lost.</p>`,
        wordCount: 3500
    },
    {
        id: 26,
        year: 2019,
        section: 'year',
        title: "UNETHICAL",
        subtitle: "",
        teaser: "When the story becomes the story.",
        content: `
            <p class="has-dateline"><span class="dateline">HOUSTON, <em>August 22</em>—</span>Must have dozed off in my dress slacks—4 in the morning, maybe?</p>
            <p>The personal issue between old pals is on the home screen of Freep.com: <span class="small-caps">ASTROS BLOCK FREE PRESS FROM JUSTIN VERLANDER'S POSTGAME MEDIA SESSION</span></p>
            <p>My name's not mentioned, but the secret is out. A rising tide of interview requests has already begun—morning shows back home are on the case.</p>
            <p>"If you're awake, do you want to talk about the incident?" a radio producer asks.</p>
            <p>The cell phone flashes again at 5:47. It's Teevan: "Catching up on the missed call and messages you left since we last spoke. I went to bed after your 10:39 <span class="small-caps">P.M.</span> text."</p>
            <p>Well, I'm glad one of us did. Not that I'm any worse for wear: I woke up wired with a nervous energy that reminds me of sixth grade. A field trip to an amusement park, deathly afraid of roller coasters and squeezing the safety bar all the way up. I learned an important lesson that day: Sometimes, all you can do is take the ride.</p>
            <p>I survived but haven't been on a roller coaster since… until now.</p>
            <p>"Sorry to bother you," someone from News Radio 950 texts me. "I know your phone must be blowing up."</p>
            <p>Soon, it will be—with friends, family, colleagues, sources and randoms wishing me well.</p>
            <p>I ignore all but a select few. I've been keeping a tally of phone calls since last night: <em>Nightengale</em>… <em>Pedro Gomez</em>… <em>BBWAA president Rob Biertempfel</em>… <em>MLB PR</em>…</p>
            <p>Evan Drellich texts me: "Gene Dias, ladies and gentlemen!"</p>
            <p>Drellich is a longtime colleague. He was the Astros' beat writer until 2016 and knows more than most about dealing with them. He tweets: "A fun 'did you know' from half a decade ago. The Astros held a meeting with the top two editors at the <em>Houston Chronicle</em> when I was there in an attempt to get me fired. Why? Because I asked about and wrote critical things."</p>
            <p>"Off-the-record," Evan asks, "What happened? Like why is he mad?"</p>
            <p>A reader emails: "Was it simply because Verlander took a blow to his sizable ego after getting beaten by an epically bad team and didn't want to face questions he found humiliating? Is he really that sensitive and petty?"</p>
            <p>I lay on the bed, stare at the ceiling and count down from 90.</p>
            <p>This is when it hits me: I am now the subject of the story.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">10:32 <span class="small-caps">A.M.</span>—</span>Breakfast at the Sam Houston Hotel.</p>
            <p>After placing my order, I call Evan, catching him up on the past five seasons of Fenech-Verlander sagas. About solar eclipse tweets, clubhouse freeze-outs and the Kate Upton Saved My Life story.</p>
            <p>Before I cut a fork into my eggs, Mount Verlander erupts on Twitter.</p>
            <p>"I declined to speak with the @Freep rep last night because of his unethical behavior in the past. I reached out to the @Freep multiple times before the game to notify them why and to give them an opportunity to have someone else there. Ironically they didn't answer."</p>
            <p>"Although I tried to avoid this situation altogether, I've still reached out to @Freep multiple times today with no response. They're still not interested in my side of the story."</p>
            <p>Gulp down breakfast. Gotta go. Still talking to Drellich when the elevator arrives. He asks if I want him to put anything out there, something to share my side.</p>
            <p>"I'm good for now, but I'll let you know."</p>
            <p>Drellich does what he can, spinning context into the growing chaos. He shares his recent column in the <em>Athletic</em>, headlined, "The first rule of beat writing: Don't talk about beat writing."</p>
            <p>"These aren't issues reporters often pick through publicly. Media complaints generally fall on deaf ears. Twitter harassment doesn't need to be deliberately sought by those who encounter plenty already from the burn-the-media crowd.</p>
            <p>"Beyond the almighty power of common fear, though, is a guiding principle at work, rooted in old-school journalistic training: You are not the story. Do not inject yourself."</p>
            <p>Drellich tweets about the dilemma: "Fenech is in this bind now. Air it all out? Stay quiet?"</p>
            <p>Verlander just called me the nastiest word in journalism without substantiating his claim, like someone accusing him of taking steroids with no proof. He's essentially invited me into his social media echo chamber—Verlander has 1.9 million followers.</p>
            <p>He unfollowed me early in the 2017 season. Asked why, he said, "Too much sarcasm. I couldn't take it anymore."</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">10:57 <span class="small-caps">A.M.</span>—</span>Sports Editor Chris Thomas responds to Verlander from his personal Twitter account: "I would like to know who you have contacted @freep about telling your side of the story. My reporter has not heard from you directly, nor have I. My email is listed on the article we published last night—I am more than happy to speak with you about it."</p>
            <p>ISE Baseball CEO Mark Pieper called Chris' work number and left a voicemail, but Thomas didn't check until just now. Both Pieper and fellow ISE agent Mike Milchin has my number. Just saying.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">11:03 <span class="small-caps">A.M.</span>—</span>The midday show on MLB Network Radio SiriusXM 89 weighs in with an interview of former Mets GM Jim Duquette. His take? "There must've been some critical articles of him (Verlander) in the past."</p>
            <p>Duquette is asked if Verlander should have "let bygones be bygones and let everyone in—or just single out one person in particular?"</p>
            <p>"It's definitely not a good look."</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">11:27 <span class="small-caps">A.M.</span>—</span>I'm trending on Twitter. By noon, someone turns the feud into a meme, comparing a 'Tale of the Tape' between the contestants. Every half hour, the feud is mentioned on The Ticket's sports radio update. The meme gives my mustache the edge over his. <span class="media-emoji" data-media-id="tale-of-tape">📷</span></p>
            <p><em>Deadspin</em>'s story has been up since mid-morning—<span class="small-caps">ASTROS BAR REPORTER FROM POSTGAME PRESSER AT JUSTIN VERLANDER'S REQUEST</span>. The reporter messages that she's "writing about you being barred from the Astros postgame presser last night. What was their reason for keeping you out? Did you or your bosses lodge a complaint? Also happy to hop on the phone if you have a few minutes. Thanks."</p>
            <p>I ignore her, like the rest of reporters who fill my text messages, direct messages, Facebook messages and email. There are already stories in the <em>New York Post,</em> <em>Sports Illustrated</em>, and <em>The Big Lead</em>. <em>Awful Announcing</em> and ESPN.com. Radio shows and TV stations are asking, even a blogger from <em>Barstool Sports</em>.</p>

            <p>&nbsp;</p>

            <p class="has-dateline no-indent"><span class="dateline">1:05 <span class="small-caps">P.M.</span>—</span>MLB releases a statement: "Per our Club-Media Regulations, the reporter should have been allowed to enter the clubhouse postgame at the same time as the other members of the media. We have communicated this to the Astros."</p>
            <p>Messages arrive from everywhere. "You're Big News on the radio," a local radio host says. "People backing you."</p>
            <p>I'm jacked up, bouncing off the walls again, buzzing from extra-leaded coffee—and angry, absolutely. Too much adrenaline for a hotel room, I go down to the third-floor workout room. The TV in the corner scrolls the global news <span class="small-caps">(…$16.3 TRILLION CLIMATE PLAN • AMAZON FIRE STARTED BY HUMANS</span> • <span class="small-caps">NEW POLL PUTS TRUMP APPROVAL RATING AT</span>…) while I spend an hour on airplane mode, insulated from the chaos on my phone.</p>

<p class="scene-break">***</p>

<p>Mom: Woohoo best game Tigers could win—against Houston!!!!</p>

<p>BBWAA President: Anthony, I'm sorry for missing your calls. My phone was charging downstairs overnight and I didn't hear it ringing.</p>

<p>Copy Editor: Did you ask about the eclipse again?</p>

<p>Arizona Scout: I love you.</p>

<p>Verlander's Former Teammate: Fenech-Verlander beef is exactly what I needed in my life.</p>

<p>Gator: He's not talking about you is he? Lol</p>

<p>Unknown (313) Number: Any comment on the locker-room incident?</p>

<p>Drug Dealer: Lmk if anyone tries to mess with you.</p>

<p>Middle School Friend: verlander beefin with you? whats up man?</p>

<p>MLB PR: Hi Anthony, I just tried calling you. Here is a statement that we wanted you to have first. We have gotten some other requests from reporters and we will send this to them as well.</p>

<p>Sports Editor: Give me a shout when you can.</p>

<p>Pedro Gomez: This is such a scary moment. It allows every club to say they can keep whoever they want out of their clubhouse. This is why this is an important matter. You're not wrong here. Remember that.</p>

<p>Radio Host: Hey bro, long time… any chance you can come on about the Verlander thing?</p>

<p>Pro Ball Player: Yooo what's Verlander's deal?</p>

<p>Ex-Girlfriend's Roommate: Thought the reporters weren't supposed to be the news? Wasn't expecting to see you the topic of the little red ribbon at the top of the Freep.</p>

<p>Deep Throat: I'd say you're the most popular sports writer in America today.</p>

<p>National Radio Host: Anthony, that was so lame by Verlander. Hope ur OK. U wanna come on my radio show for a few minutes tonight?</p>

<p>High School Classmate: Why is Justin Verlander trashing u on Twitter hahah?</p>

<p>National TV Reporter: Crazy you're on his mind so much. You should be flattered.</p>

<p>Brewers Scout: Sounds like a lot went on since we talked lol, still wanna catch up today?</p>

<p>National Guy: Anthony, don't let the creeps get you down. Worst PR guy in my experience, which probably covers 100-plus PR guys.</p>

<p>Orioles Scout: Just read your name in ESPN. That's great. Getting your name out there!</p>

<p>Mom: Omg. Call when you can.</p>

<p class="scene-break">***</p>

<p class="has-dateline no-indent"><span class="dateline">2:44 <span class="small-caps">P.M.</span>—</span>The barrage of messages continues when I return to reality.</p>

<p>Dylan Hernández: "Guessing everyone's been bothering you today, but out of curiosity, why is Verlander so pissed at you?… Are you going back at him today? I think that's what you have to think about."</p>

<p>Hernández, a <em>Los Angeles Times</em> columnist (former Dodgers beat writer), is a like-minded hellraiser—perhaps the inspiration I need.</p>

<p>"Was in airplane mode. As of right now, no. I would LOVE to write about it, though."</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline">3:17 <span class="small-caps">P.M.</span>—</span>Taking the hotel shuttle bus to the stadium, reading the Astros statement: "Reporter Anthony Fenech was delayed temporarily from entering the Astros clubhouse following last night's game. This course of action was taken after taking into consideration the past history between Fenech and one of our players, Justin Verlander, Verlander's legitimate concerns about past interactions with Fenech, and the best interests of the other media members working the game. We chose to prioritize these factors when making this decision. Fenech was allowed access to the clubhouse shortly after other media members and had the opportunity to approach Verlander or any player he needed. We believe that our course of action in this isolated case was appropriate."</p>

<p>"Keep copious notes in this entire chapter of your life," Pedro says. "Everything. Who's contacted you. What they've said. Who you've contacted… Down the road, you never know."</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline">3:46 <span class="small-caps">P.M.</span>—</span>No security guard triple-team today. The Bad Boy of Ball Writing is back. My every move is watched inside the Astros' clubhouse. <em>Of course,</em> I needed to off my phone. Nothing good to see there at the moment: <em>Y'all are nothing but leeches… You are a true dipshit af… Fenech is garbage. Good for JV.</em></p>

<p>I stand in the middle of the clubhouse like nothing's wrong. Head up, eyes forward, no phone.</p>

<p>Old Pal isn't here. During a quiet moment, I hear PR flaks chat outside the clubhouse.</p>

<p>"He's in there alone. I wouldn't leave him in the clubhouse by himself."</p>

<p>I don't take it personally. It's not why I'm here. Access is why I'm standing inside the Astros clubhouse again today. Access is the reason the Baseball Writers' Association of America was founded during the 1908 World Series, when the Ball Writers had finally had enough.</p>

<p>According to baseball historian John Thorn, the BBWAA was born when writers "continued to suffer mistreatment during the Cubs-Tigers World Series that followed. The writers covering the Series were outraged at the treatment accorded them. In Chicago, out-of-town writers were placed in the back row of the grandstand. In Detroit, the writers were compelled to climb a ladder to the roof of the first base pavilion, where they were forced to write in the rain and snow that hampered the Series. Finally, unwilling to endure these conditions another year, the writers decided to organize."</p>

<p>On the day of decisive Game 5, <em>Free Press</em> sports editor Joe S. Jackson rounded up the earliest traveling writers at Detroit's Hotel Pontchartrain, where 24 white men from big league cities east of the Mississippi became founding fathers of the BBWAA.</p>

<p>A constitution was established, an agreement of decency formed with the league, and writers were never again banished to stadium rooftops—or, at least in theory, banned from locker rooms.</p>

<p>I return 111 years later to enemy territory in the name of Jackson, my <em>Freep</em> forefather who once covered notoriously nasty Tigers outfielder Ty Cobb, a Hall of Fame player who slid with his metal spikes up. Jackson nicknamed Cobb the "Georgia Peach" in a <em>Free Press</em> column. He paved the path to where I stand in the Astros clubhouse today.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline">3:49 <span class="small-caps">P.M.</span>—</span>I take notes on everything and nothing at all. Mostly, the scene:</p>

<p>Not many players in the clubhouse. Most are holding iPhones and iPads. Three guys playing Fortnite online—veteran outfielders Michael Brantley, George Springer and pitcher Wade Miley. Reporters talk to a rookie outfielder.</p>

<p>Jose Altuve looks knowingly across the room. The Astros' superstar second baseman sits at his locker, speaking in Spanish to a teammate who turns around to look at me.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline">3:53 <span class="small-caps">P.M.</span>—</span>David Barron introduces himself from the <em>Houston Chronicle</em>. Says he's working on a story about the flap with Old Pal and asks, "Do you have anything to say about it?… Or is the paper speaking for you?"</p>

<p>I have a lot to say about it, believe me. But I defer.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline">4:09 <span class="small-caps">P.M.</span>—</span>Back in the friendly confines of the Detroit clubhouse, the visitors are still buzzing after last night's win. Nineties R&B slaps from a slim boombox as I arrive in Gardy's office pregame. Kci & JoJo, I think it was.</p>

<p>"They let you in here?"</p>

<p>"What can I say to piss you off? I've pissed everyone else off."</p>

<p>"I never said you haven't pissed me off."</p>

<p>From a Ball Writer's perspective, the tragedy about this whole episode is not the viral attention it's garnered—it's that the terrible 2019 Tigers won the biggest game of their season last night. There haven't been many wins (38), there won't be many more (9), and last night was the best of 'em.</p>

<p>And here I am, gobbling up the headlines for feuding with a player on the <em>losing</em> team. I'm supposed to ask for comment, but I'm being asked for comment. I cover the Tigers, but I went to the Astros clubhouse after the game yesterday—and again today.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline">4:28 <span class="small-caps">P.M.</span>—</span>Standing in the Detroit clubhouse, I'm alerted. "Call me please."</p>

<p>Chris Thomas wants me to provide a statement, for the record and for publication in the <em>Free Press</em>. We don't consult on what to say. I call a friend who knows a friend in PR crisis management, who advises strongly against the first ditty I scribbled down.</p>

<p>"Why not?" I snap. "He can dunk on me, but I can't dunk back?"</p>

<p>My statement: "I'm extremely disappointed with the Astros' inexplicable decision to limit my BBWAA-credentialed clubhouse access. In my time as the Tigers beat writer, my foremost goal has been fair and ethical coverage. I am confident that goal has been clearly and consistently achieved in my body of work and with the personal and professional way I build relationships across baseball."</p>

<p class="has-dateline no-indent"><span class="dateline">7:28 <span class="small-caps">P.M.</span>—</span><em>Chronicle</em> reporter David Barron sits in the front row as tonight's game begins—I don't know Barron beyond earlier, but he did strike me as a reporter who knows what to do with background information. Purely on that hunch, I walk down to his workspace and lean into his ear: "I know I can't talk about this, but you can put on background if you want that I was in the Astros' clubhouse for twenty minutes. I'm just letting you know."</p>

<p>His story tomorrow includes this graf: "Verlander was not available in the Astros' clubhouse during the 50-minute period that it was open to reporters. Fenech was present in the mostly unpopulated clubhouse for at least twenty minutes."</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline">12:08 <span class="small-caps">A.M.</span>—</span>Stepping onto the hotel elevator exhausted, I press for the wrong floor twice. It feels good to be home—even if it's a hotel room.</p>

<p>Kristie Ackert: "Text me tonight just to let me know you are ok. We are concerned."</p>

<p>"I'm down, I'm tired, I'm done with today. But I'm ok."</p>

<p>As I slowly pack for tomorrow's early flight, my good name bakes to a crisp in the spotlight. My grandparents came to this country on a boat and started from nothing so I could one day write about baseball… for what, now?</p>

<p>My phone flashes occasionally, like a thunderstorm passing through. One message is from a local TV reporter— "I will read your book one day."</p>

<p><em>SportsCenter</em> plays in the background. World champion fighter Conor McGregor appears to be screaming during an interview. The TV is muted.</p>

<p>&nbsp;</p>

<p>My name scrolls by on ESPN's BottomLine: <em>Verlander calls</em> Detroit Free Press <em>reporter 'unethical'</em>—<em>Reporter kept from Astros clubhouse after Wednesday's game</em>. <span class="media-emoji" data-media-id="espn-bottomline">📷</span></p>

<p>I watch it over and over, like I'm in a trance. Like I'm hypnotizing myself into accepting my new name. Is that who I am now? An Unethical Reporter?</p>

<p>Scrolling through a looney bin of emails, I see a note from the same <em>Freep</em> editor who reached out years ago when Internet Stalker tried canceling my career before it began.</p>

<p>"Yesterday and today may not go down as your favorites but they'll make you an even better reporter than you are. Stay strong. You have fans rooting for you from the newsroom."</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline"><em>August 23</em>—</span>Arriving at the Houston airport, I have 152 unread messages.</p>

<p>Scanning through while snacking on a breakfast bagel at the gate, I can't help but notice who <em>didn't</em> reach out. Al Avila must've sent a front office edict after the Trade Deadline Exposé—no talking to Fenech… or else.</p>

<p>Many of the unread messages asked: What did you do to Verlander? Why does he hate you so much? What's the beef?</p>

<p>In retrospect, our relationship was probably doomed from the start—by no fault of our own. I've mentioned that Justin was my favorite player growing up. I think subconsciously that was hard to shake—maybe I tried too hard to make him the person I wanted him to be. The guy I thought he was as a fan—a down-to-earth dude you could grab a burger and beer and chill with.</p>

<p>Justin is not that guy. Maybe he used to be. Now, he's a famous professional athlete, an alpha dog and the most sensitive kid in class. His critical flaw is ego—same as mine.</p>

<p>I knew I was getting under his skin to the point of no return. I knew something like this was possible—"putting myself in a situation that will almost assuredly result in Verlander ignoring my questions or taking the opportunity to publicly bully me."</p>

<p>In covering my favorite player, I've gotten to know him in a way I wish I never had.</p>

<p>When Mom picks me up from the airport, she brings Fuzzles, our family's geriatric cat. Fuzzles is nineteen—she's staying for the weekend as my emotional support animal. In more peaceful times, Old Pal wished Fuzzles a happy birthday.</p>

<p>It's good to smell home. I throw a load in the laundry and hopscotch around town running errands. Dropping off clothes at the cleaners, I get an unknown call. Miami area code.</p>

<p>I haven't answered an unknown call for years—some people out there pay others to prank me—and I don't know what compelled me to answer this time.</p>

<p>"Hello, is this Anthony?"</p>

<p>A pit forms in my stomach. "It is."</p>

<p>"Hi, this is Allyson with the Dan Le Batard Show… Dan's talking about the thing with Verlander yesterday and he wants to see if you can come on the show for a few minutes."</p>

<p>ABORT MISSION ABORT MISSION ABORT MISSION</p>

<p>"I'm actually kind of in the middle of something right now. Can we do this later?"</p>

<p>"He's wrapping on it soon. Can you do it i–"</p>

<p>ABORT ABORT ABORT</p>

<p>I hang up on poor Allyson. Nothing against her or Dan, but we're going to need to see some proper ID. Secondly, I don't think I'm in the right frame of mind to talk about this for the first time publicly on the Le Batard Show—driving around town with my emotional support cat riding shotgun and dirty clothes in the back.</p>

<p>The phone rings again.</p>

<p>ABORT ABORT ABORT</p>

<p>Instead, I pick up again. Allyson again.</p>

<p>"Hi, Anthony. Do you have just a second? Dan wants to talk to you. We're in a break, I'm gonna put him on the line."</p>

<p>Le Batard, fifty-one, is one of the best sports writers of his generation, and these days a media brand unto himself. He was born and bred at the <em>Miami Herald</em> and began his ascent as a talented, personable, pull-no-punches Ball Writer and columnist in the nineties. Le Batard became a regular on ESPN talk shows in the early 2000s and soon joined the network himself. Le Batard has his own show now—a quirky, creative appetizer called <em>Highly Questionable</em>, co-hosted with his dad and still kicking six years later.</p>

<p>But I don't know if Allyson is real or if I'm being pranked again by Internet Stalker… next thing you know, someone who sounds like Dan jumps onto the phone.</p>

<p>"Hey Anthony, it's Dan. So, we're talking about this and what happened…"</p>

<p>He says we're not on the air.</p>

<p>"Dan, you know how this goes. The guy didn't like what I was writing about him and the questions I was asking him and he's a prima donna and decided to take it out on me on Twitter."</p>

<p>"OK, Anthony. Thanks… gotta go!" And that was that.</p>

<p>I can't say for sure it was Le Batard. I can only pray another prank call doesn't surface.</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">DETROIT, <em>August 24</em>—</span>Forty-eight hours later, and the Verlander storm isn't over.</p>

<p>There's a story coming in tomorrow's <em>Free Press</em>—a column, really, and not mine. Sports editor Chris Thomas is writing about the Astros' gross malfeasance. I've been uneasy about it from the start.</p>

<p>Last night, I talked with colleague Evan Drellich, whose advice was let things lie. "Once the weekend hits, nobody will care."</p>

<p>Drellich has been brushed back before. Covering the Red Sox for the <em>Boston Herald</em> in 2016, he was part of a clubhouse dustup gone public with former Tiger pitcher David Price. As Drellich wrote in the <em>Athletic</em>: "When Price cursed me out in a Yankee Stadium hallway a couple years ago, the concern I had then is the same [as] now—you don't want to come off grandstanding if you're a beat writer worth your salt. The player got angry, so you must have done something wrong, in the eyes of many—and the player's got a lot more pull."</p>

<p>Put another way: Justin Verlander could have knocked me upside the head with a baseball bat, and some folks would still blame me for standing in the clubhouse.</p>

<p>Thomas's column—<span class="small-caps">ASTROS, VERLANDER, AND FREE PRESS: HERE'S WHAT HAPPENED</span>—will post on Freep.com tomorrow as a defense of my rights as a reporter.</p>

<p>The word 'unethical' attached to my name makes me sick. I wait on the couch for the column to appear online.</p>

<p>Finally, there it is: "When the Astros used three security officials to stand between Fenech and the clubhouse while Verlander spoke to reporters on Wednesday night," Thomas writes, "it sent a message that the BBWAA is powerless against baseball's biggest stars."</p>

<p>The column lands in the pit of my stomach—1,466 words piling onto my only regret of the past week: that none were written by me.</p>

<p>In the past few days, I've been written about far and wide. By reporters who reached out and those who never bothered. Barstool Sports bloggers and NBC Sports reporters—even the rival <em>Detroit News</em>.</p>

<p>Maybe I should have followed Pedro Gomez's advice. He suggested I write a first-person piece. I certainly had the standing—last year, I won a national top ten beat reporting honors from the Associated Press Sports Editors, the highest honor for any sports reporter covering any team. Much of my contest entry included stories about Justin Verlander.</p>

<p>I would have loved to have written about Old Pal again, explaining in my own words what had happened and how this all came to be. But I wasn't ready to write about it. Didn't know how long it would take. I had no clue, in the moment, that it would take years.</p>

<p>Thankfully, I wasn't scheduled to follow the team to Minnesota for the rest of the road trip. But in Ball Writing, as in life, the news always seems to find you.</p>

<p>Lunchtime, a fire breaks out—Twitter user @NotIanKinsler says prospect Willi Castro is being called up.</p>

<p>"Report that I had it first," Not Ian Kinsler tweets.</p>

<p>Really not in the mood for getting scooped by a parody account. Half an hour later, I'm still hot. An hour after Not Ian Kinsler's report, I'm left hanging. Again.</p>

<p>The Tigers tweet the news on their official Twitter feed. Castro, twenty-two, was acquired from Cleveland last summer for Leonys Martín—a trade that will age fondly on Al Avila's resume. Castro will develop into a solid switch-hitting utility player, making an All-Star appearance with Minnesota in 2024.</p>

<p>The call-up stirs excitement from starved fans and sends me up the wall. Freshly wounded from the week, still stonewalled by team sources—and maybe a little hurt I hadn't heard from some of 'em—I lash out at the Highest Source In The Land.</p>

<p>"Another one you told PR to announce so I couldn't break it."</p>

<p>I'm confused and grasping for straws. Three weeks after putting Avila's decision-making in the crosshairs, this Sunday's sports front is dedicated to mine. I hurl the remote into the cushion, only serves to inflame me—I want to break something. I'm an unethically stained Ball Writer with no sources, now giving credit to parody accounts: "@NotIanKinsler was first to report the Castro promotion."</p>

<p>Embarrassed and angry, even after cooling off, I message HSITL: "Hey, taking a step back. Been a long week for me personally and professionally. I understand our relationship has changed and I am not going to scorch Earth every time you don't help me."</p>

<p>I consider reaching out to my new competitor for advice: I'd like to become Not Anthony Fenech. Any ideas?</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline"><em>September 11</em>—</span>Driving through drizzle into work, endless dark skies forecast a long night ahead. The radar doesn't look much better.</p>

<p>But with the Yankees in town and only twelve home dates left, the Tigers will allow time for the weather to turn. This season, baseball attendance has continued its downward trend, dipping for a fourth consecutive year as games skew longer and less action-oriented for an audience whose attention span shrinks by the second. In Detroit, long gone is the heyday of $200 million payrolls and topping three million fans annually—crowds have dropped on average 19 percent from last season and 40 percent since the team's last winning season in 2016.</p>

<p>The rebuild is taking a toll on the ticket office, where a mass exodus of sales staff is underway: According to records I've patched together with business-side sources, 38 ticket employees have left since 2017 and nearly 70 percent of the 41-person staff will depart this year. I've been keeping track since July, when a pair of longtime business-side executives curiously departed.</p>

<p>Last month, I talked with a ticket-department employee who cried describing the work environment—alleging a sexist culture and employee mistreatment under recently installed upper management. She passed along a number to speak with a former employee.</p>

<p>When I called, the former employee said, sorry, but she just got a new job and doesn't want to talk about that. A few minutes later, she called back.</p>

<p>"Hey. I just wanted to call and let you know that… You know if you write this story, you're not going to have a job, right?"</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline"><em>September 13</em>—</span>The city is abuzz: Meaningful baseball has returned to Comerica Park.</p>

<p>Once an annual postseason tune-up month for the perennial-contending Tigers, recent Septembers have been more taxi squad tryout camp than pennant race. It's easy to forget that just five years ago, Detroit won its fourth straight American League Central title.</p>

<p>Then Anthony Fenech took over the beat, and everything went to hell. The Tigers have gone 331-460 since, finishing in last place three out of five years.</p>

<p>Alas! The buzz, festivities, meaningful baseball—yes.</p>

<p>Tonight marks the start of the World Series Of Misery, pitting two familiar contenders: Orioles (48-99) vs. Tigers (43-103). At stake: The first overall pick in next year's draft. Your host: The most miserable Ball Writer of them all—<em>Mr. Unethical</em>!</p>

<p>Entering the long weekend set, Detroit is 4½ games ahead for the worst record in baseball. The O's are at a similar rebuilding point, having finished last in the American League East three years running. The series opener is for the record books: The matchup features the most combined losses (202) of any matchup in American League history.</p>

<p>It figures to be a busy night at the ballpark. Today is Picture Day and Friday Night Fireworks <em>and</em> we've got special guests: the Michigan Baseball Team 153 Wolverines, who will be honored pregame.</p>

<p>After Tiger players pose for the 2019 class photo in center field, team chairman and CEO Christopher Ilitch takes questions from the media, which for months has been egged on by an impatient fanbase.</p>

<p>Ilitch isn't available often, but when he is, Tigers PR makes sure he's marinated with talking points.</p>

<p>Case in point: Ilitch begins today's presser with a PR-coached announcement of "clarity" on manager Ron Gardenhire's status for next season—but he doesn't confirm what exactly that clarity is. Ilitch says GM Al Avila is "on the same page," but won't say more.</p>

<p>Good for me, because Avila and I have been talking again. I text him while waiting my turn to grill Ilitch on Avila's job performance.</p>

<p>&nbsp;</p>

<p>"Is Gardy coming back next year? Chris said you've addressed it, but I don't recall."</p>

<p>"He is coming back."</p>

<p>Inside Ron Gardenhire's office, a last look at the cozy access of our times: A veteran manager, sixty-one, set to return for a third season after going 107-200 the first two years, stands up behind his desk. His office is filled with media.</p>

<p>Out of respect for his coaching staff—some of whom may not be returning next season—Gardy refrains from comment when asked for his reaction to Ilitch's comments, which seem to signal he'll be returning as manager in 2020.</p>

<p>"That's for a later time. We still have some weeks here to play. We're going to have meetings—let us have our meetings and go from there. We don't really talk about that stuff; we're just trying to finish the season."</p>

<p>Three reporters sit on the couch. TV play-by-play guy in one chair, radio play-by-play in another. Media and PR (three of 'em) stand around the office. I'm in the corner, zoning out on a pile of books, when a title catches my eye. <em>Ego Is The Enemy</em>.</p>

<p>Not long from now, I'll find this sentence in an old notebook, written when I was hanging out with Seamhead John Lowe back in the day: "Don't let your ego take over."</p>

<p>&nbsp;</p>

<p>Mine probably has, for better and worse: Do you know how much confidence is required to work a big-league clubhouse of millionaire Adonises, some of whom make more money in tonight's game than you made last year? The Teflon shield you must burn into your psyche to endure loss after loss, battling National Guys, Rival Cohorts, Old Pals and Internet Stalkers?</p>

<p>The unnatural machismo you must at times exude, trying to survive in a testosterone-charged room of pro athletes as a punk reporter for the Podunk Press. Some of these guys, you grew up rooting for. Many, you have little in common with. All of 'em, you'd probably trade spots with—who among us grew up dreaming of being the Ball Writer?</p>

<p>The scene is a final vestige of access this generation, a color picture in gray times. In the years to come, this kind of close-quarters access will become extinct. Gardenhire today talks to a room of reporters at arms-length for more than fifteen minutes. Sports writers in the future will be lucky to get the manager in the dugout—with marketing dollars at stake, teams will soon put their managers on stage, answering questions in front of corporate-sponsored backdrops.</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline"><em>September 20</em>—</span>The final home stand of the season gets off to a fitting start.</p>

<p>A substitute TV reporter opens with an amateur hour question for Gardy:</p>

<p>"Coach, last homestand… any message to the fans?"</p>

<p>"Well, yeah… that's a good start."</p>

<p>Gardy must've actually read <em>Ego Is The Enemy</em>, which has been on his shelf for the past two years. I've seen managers flip their lid for being called "coach." It takes much more to fluster a manager who's lost 108 games this season… and counting.</p>

<p>"It's been one of those seasons where hopefully, you've seen our young kids develop and you know what, thanks for hanging in there with us. It's been tough for everybody—the coaching staff, everybody—and we really appreciate your support. So, thanks for hanging with this ballclub."</p>

<p>The Tigers open the week against the White Sox and division-leading Twins, facing an embarrassing mark of futility—they must win one of their final six home games to avoid becoming the first team in modern baseball history to lose sixty home games in a season.</p>

<p>Before the opener, I catch up with James McCann, who signed in Chicago last year. His twin boys are in town.</p>

<p>"They're getting big."</p>

<p>I wrote a feature story on the twins, born two months' premature last spring. In five seasons with Detroit, I built a good relationship with McCann, whose first year as starting catcher coincided with my first on the beat.</p>

<p>After the Tigers declined to tender him a contract in the winter, McCann is mashing with the White Sox. He was a first-time All-Star this season, currently hitting .274 with 17 home runs and 57 RBIs. He mentions the mixed feelings seeing his former squad struggling like this: "As far as from a player's standpoint, you want competitive teams on the field—and take this organization out of it, there's multiple teams facing 100-loss seasons. I think that from a player's standpoint we want the most competitive teams on the field day in and day out.</p>

<p>"Being part of teams that are rebuilding, it's tough. It's a different feeling coming into a September ballgame with the playoffs on the line."</p>

<p>McCann singles in the top of the second inning, upping his average to .375 in 40 at-bats against his former team. The Tigers are throttled, 10-1. Two days later, they snap a five-game losing streak, narrowly avoiding the record for most home losses.</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline"><em>September 25</em>—</span>Normal day at the ballpark.</p>

<p>Tigers lose their 111th game of the season to the Twins, who wait an hour and eighteen minutes for Cleveland to lose in Chicago before popping champagne in the visitor's clubhouse—Minnesota is the American League Central champion.</p>

<p>Across the hallway, the home team cleared out long ago. There was no similar celebration after clinching the worst record in baseball—even if it results in the top draft pick, widely projected to be Spencer Torkelson, a slugging sophomore who broke Barry Bonds' freshman home run record at Arizona State.</p>

<p>Postgame, I split from the clubhouse pack for a quick catch-up with Miguel Cabrera. His 17th season has shown that even with age, an impressive ability remains. At thirty-six, Cabrera is hitting .282 with 10 home runs and an on-base percentage of .358. He will play a team-high 134 games (108 as designated hitter) despite dealing with a lingering right knee issue and assorted other ailments for most of the year.</p>

<p>Miggy will never swing as mighty: He'll hit .255 with 34 home runs, 187 RBI and a .363 slugging percentage the next four seasons, aging into his late thirties about as gracefully as one could have hoped in 2014, when former team owner Mike Ilitch made Cabrera a Tiger for life, signing him to a ten-year contract extension for $292 million—then the largest deal in baseball history. Miggy made $54,347 per plate appearance this year.</p>

<p>I approach his locker while he slips on sneakers. Jeans are on. No shirt, but gold chains.</p>

<p>"My editor wants me to do a story on you. Can I talk to you this weekend for–" Cabrera cuts me off with the same wildly inappropriate question he asked me in Anaheim three years ago.</p>

<p>This time, it doesn't stop the conversation cold. I'm shocked he hasn't grown up—our relationship has—but I've seen this absurdity before.</p>

<p>Immediately and matter-of-factly, I say, "No."</p>

<p>Miggy drops the charade. "We'll see. I don't know."</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">CHICAGO, <em>September 27</em>—</span>In my worst nightmare, I wake up in a chilly hotel room in the South Loop and stare outside. Clouds cover the lake. It is rainy, windy and gray. Take a taxi to the ugliest baseball stadium ever built. In this nightmare, I am stuck in traffic and heading to U.S. Cellular Field to cover not one game between the Tigers (46-112) and White Sox, but two. A doubleheader.</p>

<p>This is not surprising. It's always raining in Chicago and in my head. It was raining when Andrew's Navigator picked me up from O'Hare yesterday evening, while walking to the party store for a Red Bull this morning, and now arriving at my personal house of horrors.</p>

<p>"At least once a year here, I wonder, 'Why am I even going to the park?'"</p>

<p>"An appropriate place to end the year," a colleague responds. "Brings things full circle."</p>

<p>It is only then, while watching touristy ads scroll by on a seatback monitor, when I consider for the first time that this weekend could be my last on the beat.</p>

<p>My memories here are not all bad.</p>

<p>While U.S. Cellular Field is far and away the worst on the big-league circuit, it also holds a sliver of fondness in my heart. It was in the press box where I first met Deep Throat in the flesh, while waiting in line for coffee during the final series of my rookie year.</p>

<p>"I think I know you," I said.</p>

<p>Visiting team officials usually sit in a neighboring suite and often walk over to use the espresso machine—the only remotely redeeming quality about the entire place.</p>

<p>This chance interaction came years before I agreed to the Three Commandments, before I even got Deep Throat's number. We'd only traded emails, but he responded warmly that day.</p>

<p>"I've read plenty of your stuff. You do a good job."</p>

<p>This season, however, I'm not so sure. I've been on the fritz since the middle of May, I can't remember the last time I've attended morning clubhouse, my entire career is now encapsulated in an ugly eight-letter word, and yet here I stand, at the finish line of my fifth season. Still alive.</p>

<p>After a 52-minute delay, Hittin' Harold Castro opens the doubleheader with a single, upping his average to .297. Castro, a rookie utilityman from Caracas, Venezuela, is unabashedly my favorite player on the Tigers. In a strong first impression, Castro has shown professional bat-to-ball skills and solid defensive durability—playing 47 games at infield, 44 at outfield and seven positions in total. Two years after nearly being cut loose following a down year at Double-A, Castro has carved out a bench spot on next season's roster. Since May 1 in Philadelphia, when Castro arrived at the stadium for his call-up in the fourth inning and slapped a first-pitch single in the ninth, all he's done is make contact.</p>

<p>"You gotta be ready for it."</p>

<p>Many young Latin players have come through Detroit in recent years. But few have hung with Miguel Cabrera the way Hittin' Harold has this year—and Miggy only hangs with guys who hit. Young sports writers: Pay attention to who hangs out with who in the locker room.</p>

<p>After Castro's single, Cabrera drives him in with a blooper. He is all smiles at first base.</p>

<p>Cabrera was chatty earlier. With the team's Spanish-speaking translator nearby, Miggy gave a season-ending address—talking in English about the Tigers' losing season ("Frustrating"), his health ("Surgery is off the table"), and how he viewed his individual performance in 2019.</p>

<p>"Really, my goal this year was to finish the season. I wasn't paying attention to numbers, I was more paying attention to at-bats, getting ready and not being hurt."</p>

<p>Game 1 pauses at 5:39 <span class="small-caps">P.M.</span> when the tarp monster returns during a downpour. An hour later, everyone is told to go home—both games postponed, another doubleheader tomorrow.</p>

<p>I don't wake up. In this nightmare, I'm left at U.S. Cellular Field waiting forty minutes for my ride. Andrew apologizes for the delay when he arrives—he needed to take All-Star slugger José Abreu home first.</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline"><em>September 29</em>—</span>The regular season finale feels like Christmas morning. I can't fall back asleep.</p>

<p>My first call goes to Deep Throat.</p>

<p>"Big day."</p>

<p>"We did it."</p>

<p>That's one way to put it. Feeling dangerous, I answer some questions on Twitter while commuting to work. Someone asks if I can finally take some time off. "No. The baseball news cycle has long since become year-round." Another person asks for my favorite moment of the season.</p>

<p>"John Hicks catching the first pitch from his mom."</p>

<p>I'll highlight the moment in my annual season-ending memories column: "Hicks caught the first pitch from his mother, Karen, with tears in his eyes on 'Pink Out the Park' night. Karen has battled breast cancer throughout Hicks' career and fought tears herself before delivering a strong throw. Hands-down the best moment of the season."</p>

<p>Instead of tweeting out the starting lineup like I have for the first 160 games of the season, I make an exception for the finale:</p>

<p><em>Game 161: Finally.</em></p>

<p>Reporters pack into the visiting manager's office—which, like most amenities here, are among the worst in the big leagues.</p>

<p>Ron Gardenhire begins his final pregame media session of the year.</p>

<p>"Fitting. Chance of rain."</p>

<p>Gardenhire's sixteenth season in the dugout was a struggle, to say the least. Standing closest to Gardenhire, he speaks for the both of us.</p>

<p>Reporter: <em>Ron, what's held this group together despite everything from the outside</em>?</p>

<p>"Vodka."</p>

<p>Reporter: <em>What will you do in the offseason to get recharged for next year</em>?</p>

<p>"It's easy. You go home. I'm gonna relax with my daughters… drink. Then drive down to Oklahoma and see my grandbabies and my daughter… and drink a little more. And then I'm going to fly to Fort Myers. That's where I'll relax a little bit."</p>

<p>Me: <em>Will you drink in Florida</em>?</p>

<p>"Water… A lot of water. It's hot down there… I sound like I drink all the time, but not really. I normally wait until after ten in the morning."</p>

<p>Today's Freep Sports cover boy goes deep. Miguel Cabrera's homer comes despite playing on a bad knee that's moved him off first base. For the 114th and final time, Tigers lose.</p>

<p>Rookie Travis Demeritte strikes out to end the season—fittingly, it's a team record.</p>

<p>Sitting in the final class of the year waiting for the bell, Rival Cohort is still taking notes.</p>

<p>As the rest think about what's next—smoking a cigarette, drinking afterwards, possibly quitting our jobs—veteran sports writer Chris McCosky covers his bases. As he always does.</p>

<p>McCosky, sixty-one, has been at the <em>Detroit News</em> since 1994 and is believed to be the only sports writer in Detroit's rich history to cover all four professional beats.</p>

<p>He asks Gardy why outfielder Víctor Reyes was pulled after a bunt hit in the sixth inning.</p>

<p>Gardenhire explains he wanted to preserve Reyes' .304 average—the traditional mark of a successful season.</p>

<p>Reyes also made a lifelong fan this season in Broxbourne, England, of all places—where last month a die-hard fan got off work, cracked open a pale ale lager and, perhaps as a symptom of watching too much Tiger baseball this year, tweeted, "If the Tigers take a single game off the Astros this series, I will get a Víctor Reyes tattoo."</p>

<p>Reyes started the series with a bunt hit, smacked his first home run the next night and Detroit beat Houston on the last normal day of my adult life. Reyes hit .331 with 3 homers and 12 extra-base hits in 37 games following Jed's tweet. True to his word, the mad Englishman received a tattoo on his left calf this month with Reyes' name and uniform number (22).</p>

<p>He tweeted the next day: "I am hungover. Hope you're happy."</p>

<p>Hangover—the best word for this season. A six-month hangover that you couldn't shake.</p>

<p>I am all but emotionless entering the dressing room for this season's final reporting scene. A roster of relative no-names bid farewell. Many won't be back, instead recycled elsewhere during another rebuilding winter. Some of the guys I don't even know.</p>

<p>Five years after adrenaline-rushing this same clubhouse, asking veteran players for phone numbers as the final task of my rookie year—players who I'd worked hard to build trust with… I barely know the nameplates now.</p>

<p>Without a contact list of players or agents to get (I haven't updated ScoopSheet in months), I don't stay for long. I say goodbye to the usual suspects—veterans, coaches, trainers, Miguel Cabrera and the team translator.</p>

<p>&nbsp;</p>

<p>Walking out of the clubhouse, I wonder if I'll be back—or if I want to be.</p>

<p>&nbsp;</p>

<p class="scene-break"><span>***</span></p>

<p>&nbsp;</p>

<p class="flashback-header">AIRPLANE MODE</p>

<p>&nbsp;</p>

<p class="scene-break"><span>***</span></p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">DETROIT, <em>October 4</em>—</span>After spending the past month in an emotional spin cycle, I'm holed up with enough supply to fend off even the most intrusive self-loathing thoughts.</p>

<p>I won't sleep for days, burrowing into cardboard boxes, notebooks and old tape recorders. Receipts rubber-banded and piled by month and year. Receipts everywhere. Hundreds, maybe a thousand. Organized by time and date, work and personal. Finding much more than items and purchases—it's like my Ball Writing life is unfolding in front of my eyes.</p>

<p>The deeper into the memories, the less pain I feel, the more I want to keep going. Exhilarating and out-of-control, but onto something.</p>

<p>Message Mom on bingo night, asking if she can stop by after. She brings food, which is good, because I haven't eaten in quite some time.</p>

<p>"Don't freak out. I'm in a good place now, the best place in months."</p>

<p>But I can't fool Mom. She can see I haven't been eating or sleeping. I explain what the drugs are, what they do, why I started taking them (work) and why I think I'm taking more than ever (coping mechanism/addiction).</p>

<p>She's horrified. Asks me why. Am I trying to hurt myself? I don't really know—but no, I don't think so. It's emotional. We yell and scream and cry and get into cold, hard truths. How things have really spiraled after the incident with Old Pal.</p>

<p>I take off my shirt. "<em>Look</em> at me—I've lost like thirty pounds since Opening Day!"</p>

<p>Telling all to Mom feels like a weight lifted. I grab a handful of pills from the bottle but give her the rest. I make a promise to Mom before she leaves. A promise I won't break.</p>

<p>My next steps are clear. I book a flight to Malta and scribble more words about the book that's quickly coming into focus.</p>

<p>The working title is <em>OFF-THE-RECORD</em>.</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">LONDON, <em>November 14</em>—</span>After more than a month away, I'm heading home when an email arrives: <span class="small-caps">LAYOFFS LOOMING</span></p>

<p>The <em>Free Press</em> needs to cut three reporters and a photographer. Seven years of seniority should put me in the clear. A good thing?</p>

<p>I've never felt more insecure about my career.</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">DETROIT, <em>November 22</em>—</span>I pull myself together and decide to meet with <em>Free Press</em> brass before the winter begins. I'm going to go on the offensive.</p>

<p>"Haven't gotten a raise in five years and none are coming," I tell a friend. "I need to keep developing and growing and it's not happening. What am I working toward here? I want to know what I need to do to be a columnist, how close I am."</p>

<p>I email executive editor Peter Bhatia and sports editor Chris Thomas. "I had time to think while I was on my trip, and I'd like to share those thoughts with you guys in order to best position ourselves for success going forward."</p>

<p>We set a meeting for Monday morning.</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline"><em>November 25</em>—</span>Heading into the newsroom, I cover my bases with sources before beeping into the building.</p>

<p>To GM Al Avila: "Are you going to make any news in the next two hours? Heading into a meeting with my bosses, don't want to be caught off-guard."</p>

<p>When I get to the <em>Freep</em>, I meet Thomas at his workstation. We walk into Peter Bhatia's office together; Thomas takes one side of the small round table; I take the other. Bhatia sits behind his desk.</p>

<p>Written in my reporter's notebook are an outline of ideas, a list of grievances, other talking points. I'll never get to any of them. I won't even flip the notebook open or take my pen out.</p>

<p>Bhatia begins.</p>

<p>"Well, Anthony, as you know, we've had some ups-and-downs over the last couple of years, and you've had to endure the abuse from Verlander and the Astros, as well… I know you had some issues with the way we handled that, but our intent in all of that was to back you, 100 percent…"</p>

<p>"But where we're at right now I think it's the right time to make a change with the beat."</p>

<p>He says pro basketball writer Vince Ellis is taking a buyout, and I've got a choice to make: I can cover the Detroit Pistons and NBA basketball or—as Bhatia urges—volunteer to take the last remaining buyout offer on the table.</p>

<p>"Seriously?"</p>

<p>Trying not to raise my voice: "Did you <em>read</em> some of the stuff I wrote last year?… And I got an APSE award the year before that."</p>

<p>I'm angry now. Very angry.</p>

<p>"Like, I own the beat… it's not even close."</p>

<p>Chris Thomas chimes in: "Awards aren't the only thing that matters."</p>

<p>"What does matter then? Web hits?"</p>

<p>He laughs. "You think that's all I'm about is web hits."</p>

<p>"Yeah, I do."</p>

<p>Snapping at each other, our frosty relationship is on full display. The short back-and-forth leaves our personality conflict bare. In one breath, Chris Thomas calls me "the best sourced reporter in the city." In the next, he says that I can't adapt to covering a beat.</p>

<p>This is about as much talking as we'll do. I ask Bhatia, "Do you know how this is going to look for me professionally?"</p>

<p>With years of breaking the cold-blooded truth to people, he plays it cool.</p>

<p>"I understand you may not agree with our decision… but that's what we're going with."</p>

<p>He says Ellis took the buyout over the weekend, giving them flexibility to make the move. Now, it's my decision: Slide into Ellis' spot covering the Detroit Pistons and NBA or take the final buyout remaining. If there aren't enough volunteers, then one photographer or web editor will be laid off based on seniority.</p>

<p>I've got seven years under my belt, so I'm safe. Bhatia can't force me to take the buyout. But his message about my future at the <em>Detroit Free Press</em> is clear.</p>

<p>I stand up and numbly shake hands all around. My face is flushing as I stumble out of the newsroom, feeling like I've been hit with a flash-bang grenade.</p>

<p>Hours later, still reeling from the meeting, I receive a phone call from Willie Horton—one of the organization's legendary figures. Earlier this off-season, he called, suggesting we meet sometime soon.</p>

<p>His timing prompts me to wonder: Has he somehow heard about today's meeting?</p>

<p>He doesn't mention it. Neither do I. He invites me over to his house tomorrow and I accept eagerly. We hang out in his basement museum—signed baseballs, photographs, plaques, a wood-carved figurine of Tiger Stadium.</p>

<p>After nearly two hours, he passes over a folder of hitting strategies and an email report he sent directly to the Highest Source In The Land. Before I go, I'm introduced to one of his daughters.</p>

<p>I message my closest work confidante: "On the day they told me they didn't want me covering the Tigers anymore, I broke a trade and received a call from Willie Horton, inviting me to his house."</p>`,
        wordCount: 8350
    },
    {
        id: 27,
        year: 2020,
        section: 'year',
        title: "BOTTOM NINE",
        subtitle: "San Diego • Dominican Republic • Lakeland",
        teaser: "The Winter Meetings, a trip to the Dominican Republic, and the end of the world as we knew it.",
        content: `<p class="has-dateline"><span class="dateline">SAN DIEGO, <em>December 8</em>—</span>The Winter Meetings again. Perhaps, for me, the final one—a scary thought I cannot shake. It is raining as I arrive at the Manchester Grand Hyatt Resort.</p>

<p>I can still see my first day ever at the Ball Writing carnival. I remember pulling out my wallet to make sure I had at least five business cards packed into the outside flap.</p>

<p>Today, I have none. I don't even have a back pocket. I'm wearing sweats. Waiting for the elevator, I run into an Arizona reporter. When we return from lunch, Kristie Ackert is at the sports bar. Dylan Hernández is here somewhere. The whole gang.</p>

<p>There's no Tigers-oriented celebration this year. Second baseman Lou Whitaker is not elected to the Hall of Fame by the veterans' committee, as double-play partner Alan Trammell was last year. Sweet Lou was selected on six of sixteen ballots, falling short of the twelve required for election. I didn't even bother to pre-write a story—Whitaker's been getting screwed for years.</p>

<p>I'm here as a lame duck, a hawk whose wings have been clipped. Only a select few know how my career hangs by a thread, but everyone knows who I am—the unethical guy who Justin Verlander doesn't like.</p>

<p>Five years ago, sports writing was still a dream. I hadn't the earthliest clue of how to get scoops. A simpler time. Just happy to be here, closing the lobby bar each night, meeting new people all the time.</p>

<p>Tonight, I go to my room after dinner. Take a sleeping pill. In bed by eleven.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>December 9</em>—</span>The last thing I want to do is linger at the lobby bar for familiar faces. As expected, everybody asks about the Verlander thing. It's frustrating because it's not something I can explain in one standing conversation. Not something I particularly want to explain.</p>

<p>Reporting-wise, I'm in a tight spot. Aware of my impending assignment change, Al Avila and other officers have no incentive to help me. The last thing they want is the <em>Free Press</em> getting cold feet about re-assigning me. I've become an annoying, truth-telling pest.</p>

<p>Not only that, but Deep Throat isn't here this year. Vacationing somewhere tropical. Might not even be in the country, I can't remember.</p>

<p>"Are you still in the loop of things going down?"</p>

<p>"No."</p>

<p>I lay low in my room. When I see someone I know on the floor, my first instinct is to walk the other way. I haven't aggressively sought out info from sources.</p>

<p>I do text Octagon agent Rod Blunck, who is a basketball fan. I called Blunck a couple weeks back to get a pulse on the NBA—does he know any basketball agents?</p>

<p>"You hearing anything about the Pistons?… I mean Tigers?"</p>

<p>"We met with them. They are focusing on a couple of veterans for clubhouse reasons."</p>

<p>I don't even follow-up for more.</p>

<p>Unlike five years ago, I know nearly all the agents, but I haven't reached out to many this offseason… can't remember the last time I opened ScoopSheet.</p>

<p>Jim Leyland still wanders around the winter meetings like he did back then, looking for restaurants the way teenagers look at mall directories—lost. Leyland is looking for lunch when we cross paths. He asks if I'm hungry. "Wanna join?"</p>

<p>We sit at a white-table Italian spot. First topic is Lou Whitaker's Hall of Fame candidacy. Leyland managed Whitaker in his first full season in the minor leagues in 1976 at Class A Lakeland. Whitaker was nineteen. Two years later, he'd win Rookie of the Year.</p>

<p>In nineteen seasons, he hit .276 with 244 home runs and 143 stolen bases. Whitaker was a five-time All-Star with four Silver Slugger Awards and three Gold Glove Awards at second base. Like Alan Trammell, Whitaker only played for the Detroit Tigers.</p>

<p>I ask Leyland if he thinks Whitaker is a Hall of Famer.</p>

<p>"I do… I do."</p>

<p>"Do you think he'll get in eventually?"</p>

<p>"I do… I do."</p>

<p>Leyland will eventually be canonized in Cooperstown himself. As with all managers and executives, Leyland was voted in by the veterans' committee and inducted in July 2024.</p>

<p>The waitress asks about Leyland's shiny ring—he's wearing his 2012 American League championship ring.</p>

<p>"I never wear any of them, but when I come to the meetings, sometimes people like to see 'em. So, I just picked this one."</p>

<p>Leyland says he's won 12 to 14 rings between the minors and majors.</p>

<p>"You can have it if you want it."</p>

<p>"Really?!" she laughs.</p>

<p>More folks walk up.</p>

<p>Braves manager Brian Snitker is joined by Jonathan Schuerholz, the son of Hall of Fame executive John Schuerholz.</p>

<p>"He's a good manager," Leyland says of Snitker. "He paid his price."</p>

<p>Snitker's minor-league tour of duty makes Leyland's eleven years seem short—Snitker, sixty-four, managed twenty minor-league seasons before debuting in the majors in 2016.</p>

<p>Over a quick snack, I ask Leyland about managing and the benefit of minor-league experience.</p>

<p>"It's like with anything… You've seen that movie before. When a situation comes up, you've seen it before."</p>

<p>He mentions the younger crop of managers like Yankees manager Aaron Boone (forty-six).</p>

<p>"One of my favorites. Those guys are good. They're great guys and I'm happy for them."</p>

<p>But he laments that his generation hasn't gotten more chances, too. Guys like Snitker and St. Louis' Mike Shildt, who received his first chance to manage in the bigs at forty-nine after eight years in the minors. The Cardinals won the National League Central this year, in Shildt's second season.</p>

<p>"I'd just rather see guys like myself get a chance from a selfish standpoint. Guys that have paid their dues."</p>

<p>Lunch is quick. I got a pasta starter and a glass of white wine. He got a sandwich, no wine. Despite pleas that the <em>Free Press</em> can afford it, Leyland picks up the tab. I don't know if he knows what's going on with me, or if we just happened to bump into each other in the right place at the right time.</p>

<p>Walking back to the hotel, we run into a couple of Tigers Guys and stop to say hello. Leyland points at me.</p>

<p>"He's ripping somebody today. You know that."</p>

<p>Leyland is prophetic. Turns out that The Highest Source In The Land is selling today—and I'm not buying.</p>

<p>Sounding like a robot programmed to parrot buzz-phrases, general manager Al Avila talks about "building it up" at his first media session of the week inside the team's suite. Avila uses some variation of the phrase seven times in 37 minutes.</p>

<p>I comment to a colleague: "Five bucks says he was coached to say that."</p>

<p>"I have absolutely no doubt."</p>

<p>I write a column critical of the approach, calling out the Propaganda Police:</p>

<p>"The Tigers wanted Avila to deliver optimism—they sense fans' frustration reaching a boil. They know confidence is at an all-time low.</p>

<p>"Instead, he offered words he can't back up: The message of a team ready to turn the page, of having money to spend, inching ever closer, and excitement—a message that sounds like the start of the process. Back then, it was a 'retool,' not a 'rebuild.'</p>

<p>"It's more lip service than substance. They're good at delivering buzz phrases."</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>December 10</em>—</span>I work from my room today until the Tigers media availability at 4:30, when I decide to raise hell again.</p>

<p>Al Avila sits flanked by manager Ron Gardenhire and VP of player development Dave Littlefield. They drone on about analytics and the minor leagues before I jump in.</p>

<p>"Four years ago, I think it was in Nashville, you said you were going to come up with the 'Tiger Way' plan. Kind of like a uniform plan for players to play the game…"</p>

<p>"We have a manual. It started with Tram, and Sam (Menzin) is the one that put it together."</p>

<p>I've been poking around about this Tiger Way thing, and guys across the minors haven't even heard of it. I ask Al to describe it.</p>

<p>"Well, there's a lot to that, to just make a comment. And you can fill in the blanks a lot of different ways, but we want our players, obviously, to play the game the right way. Obviously, we want the hustle, we want the fundamentals, things of that nature. So, when you look at the Tiger Way, it's running the bases, defensive situations, knowing where to set up, where to hit the cut-off man, things of that nature. It's no different than the Dodger Way when I grew up. It showed you where you're supposed to be set up on almost every play defensively and how you're supposed to approach certain situations.</p>

<p>"So, it's a step-by-step manual for the player, but also the coaches as a guideline. That's the best way I can explain it."</p>

<p>Avila chuckles.</p>

<p>"It's not like a quote or a phrase or anything like that, you know? If that's what you're asking."</p>

<p>It's not. I ask: "Do you guys have the manual? Can I see it?"</p>

<p>"It's in the computer. No. It's ours."</p>

<p>"There are people in the organization that have not heard anything about this. I ask them, 'Hey, what's the status of the Tiger Way—has this been done?' They say they have no idea what this is. So, you're saying that it's in the computer. Any kind of proof this has been done would probably be helpful in disputing those claims, I guess."</p>

<p>"I'm not going to get into that if you're going that direction."</p>

<p>"But you are saying that it has been done?"</p>

<p>"Yeah. But as I told you, it's always a work in progress."</p>

<p>I connect with a minor-league manager after the media session.</p>

<p>"I asked Al to show me the Tiger Way tonight."</p>

<p>"And u probably got a confused look."</p>

<p>"Brutally awkward. Stumbling and bumbling about what it is, and then he says he won't show it to me."</p>

<p>The manager laughs. "Because it doesn't exist!"</p>

<p>&nbsp;</p>

<p>Five years earlier, I proudly introduced myself to super-agent Ken Rosenthal in this lobby. Back then, I wanted my phone to flash 24/7/365 with "important people," influential dealmakers and the ilk.</p>

<p>Now, I just want Ken Rosenthal to walk up to me like he did a couple years ago in K.C., coming over to say hello, shaking my hand in the clubhouse and complimenting me on the "heck of a story" I wrote the previous weekend about the Tigers' collapse.</p>

<p>I want to feel like Fenech again—not an unethical schmuck, uncomfortable in his own skin and shying away from folks like Rosenthal. Right now, we're on opposite hotel escalators, and I keep my head down. I raise it long enough to catch a stray glance from baseball's No. 1 National Guy. No acknowledgment. Ken Rosenthal—like everybody else these days—looks at me like I'm a ghost.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>December 11</em>—</span>Bright and early, the annual managers' buffet brunch.</p>

<p>American League skippers crowd into a ballroom, sip coffee with the local Ball Writers and take a class yearbook-style photo.</p>

<p>At our table, it's Ron Gardenhire, the Tiger Beat and Tiger PR (communications VP Ron Colangelo, media relations director Chad Crunk and another staffer). There's an empty seat between Gardenhire and me. He leans over and asks, "I thought you were moving to the Pistons?"</p>

<p>"Where did you hear that?"</p>

<p>"It's all over the Internet."</p>

<p>Gardy doesn't know not to joke with me like that—I have PTSD from being all over the Internet for five years. Furiously scrolling through Twitter, I can't find anything. I think he's pulling my leg—but clearly, Tiger Guys have been talking in the suite.</p>

<p>4:50 <span class="small-caps">P.M.</span>—PR sends an alert ten minutes before today's media session: "We are pushing Al's session back. Please be on standby."</p>

<p>I bug Deep Throat again during his vacation. He's been my safety net for years, but I'm wondering if he's turned on me, too. "Have you heard the length of Al's contract?" Deep Throat: "Will be happy to talk after vacation is done."</p>

<p>"You're a jerk."</p>

<p>Deep Throat: "You're a jerk. I told you on the phone I was headed out of the country and wasn't going to be any help. Quit bugging me with this shit."</p>

<p>A day after pressing Avila on the Tiger Way, I contemplate more wartime reporting.</p>

<p>Surveying more sources, I ask if it's fair game to ask about (and report on) the length of the contract extension Avila signed last summer.</p>

<p>Pedro Gomez says so: "If I'm a Tigers fan, that's something I'd like to know. Why the secret?"</p>

<p>I decide to let things lie for the night. I poke out a story in my room and head down to the Seaport Ballroom, where the Professional Baseball Scouts' Foundation banquet is being held. Kristie Ackert is there.</p>

<p>"Free drinks."</p>

<p>"Get me a glass of red."</p>

<p>It's waiting when I get there. Dinner program is under way. I sneak into an open seat at a front-row table. Kristie's boyfriend Shaun asks about the book he hears I'm working on. "Is it a bridge-burning book?"</p>

<p>Poking my head into the lobby bar after the scouts' banquet, I still can't escape the Astros and Old Pal. Industry scuttlebutt remains fixated on an unfolding cheating scandal involving Houston's 2017 World Series team—sign-stealing using cameras and trash can banging to tip off hitters.</p>

<p>The irony isn't lost on me: while I'm being called "unethical" by Justin Verlander, his team was systematically cheating their way to a championship. Within weeks, MLB's investigation will cost three managers their jobs, including Houston's A.J. Hinch.</p>

<p>I swore I wouldn't stay in the lobby for more than one, but here I am, holding a third drink.</p>

<p>Later, I step out for a cigarette, and the bizarro worlds I've been living in this week collide. Al Avila strolls through the lobby with a drink. Odds are, it's not his first or second. We're in the same boat—except I've got smokes. So, we come together, again. As uneasy as I may feel these days in public, I'm always comfortable around Al. Even now. Even after grilling him in the team suite.</p>

<p>One night we decided that, if we crossed paths in the cosmos at the right time and place, we could have grown up best friends. Al even invoked divine intervention.</p>

<p>"This was His way of bringing us together."</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>December 12</em>—</span>Five years ago, I'd contact sources like a mad man, building my baseball spider web from brunch time until the lobby bar. Now, I can't get out of here soon enough.</p>

<p>Unfortunately, I can't escape until the Rule 5 draft is complete. Detroit selects pitcher Rony García from the Yankees, but before I can even research him, my phone explodes with Austin Romine signing news.</p>

<p>I spend the morning chasing contract details, texting agents, and trying to nail down figures—the usual winter meetings chaos, but without any enthusiasm.</p>

<p>At the airport, I spot Tigers legal counsel John Westhoff—the same guy I saw before my first winter meetings five years ago. When small talk turns to my impending assignment change, I fake a smile: "I'm actually looking forward to it."</p>

<p>Flight home, I write about the Romine signing. Two years ago, he caught for the Yankees, helping ignite a brawl with Miguel Cabrera. Now he's a Tiger. Baseball's funny like that.</p>

<p>4:02 <span class="small-caps">P.M.</span>—After filing my column, I'm slapped in the face. An email lists three open jobs—mine among them. Reading it makes me sick with embarrassment.</p>

<p>8:21 <span class="small-caps">P.M.</span>—Ron Colangelo texts a link about Pistons center Andre Drummond being a game-time decision due to an allergic reaction to an avocado.</p>

<p>"See what awaits you…"</p>

<p>I can't decide if he's being supportive or touchdown-dancing on my grave.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>December 16</em>—</span>Deep Throat is officially back on American soil.</p>

<p>"Hi Anthony, thank you for letting me enjoy my trip. I got you something and that's a heads-up the Lou (Whitaker) number retirement announcement will come as soon as tomorrow if you want a story prepared."</p>

<p>Deep Throat's heard chatter about "not saying anything to Fenech." He keeps in touch. But after the Tigers iced me out at the winter meeting, he's keeping in touch. As are others.</p>

<p>"How you doing?" a co-worker asks. "Hanging in there."</p>

<p>"Let's catch up tonight bro!" a local TV reporter says. "You doing okay? I'm at the (expletive) Pistons tonight."</p>

<p>"Did you quit?" a former colleague asks. "Or you moving to Pistons. Sorry about the abrupt message. Just surprised to see a job posting."</p>

<p>Me, too.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>December 20</em>—</span>One of my sports writing friends is in the news. Josh Katzenstein, former Lions beat writer, got laid off from the <em>New Orleans Times-Picayune</em>.</p>

<p>Katzenstein left the industry to sell CBD products. His story is featured in the <em>Ringer</em>: "He used to be a beat writer, and when he sells CBD products to vape shops, he still acts like one. 'The skills,' said Katzenstein, 'are super-transferrable.'"</p>

<p>The <em>Ringer</em> was created by Bill Simmons, who earned his spot on sports writing's Mount Rushmore the hard way. After getting rejected by traditional outlets, Simmons started blogging while bar backing, eventually building a media empire.</p>

<p>But what if the <em>Boston Globe</em> had hired him as their star columnist instead? Would we have gotten the same innovation, or would newspaper constraints have absorbed another talented writer into a dying system? Sometimes getting shut out of the old game forces you to create a better one.</p>

<p>Simmons proved you could bypass the gatekeepers entirely—build your own audience, create your own rules, become your own company.</p>

<p>The article makes me think about paths not taken. Katz went from covering NFL football to hawking CBD; Simmons went from bartending to biggest sports podcast on the planet.</p>

<p>If this sports writing thing doesn't work out, maybe I could start selling weed. It is becoming legal in Michigan…</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>December 21</em>—</span>Deep Throat drops an early Christmas present down my chimney, tipping me off that the Tigers are signing first baseman C.J. Cron and second baseman Jonathan Schoop.</p>

<p>With the team on high alert, I can't verify through the Tigers without exposing Deep Throat— one of my only sources left. I work the agents instead.</p>

<p>When I call Schoop's agent, he puts me on hold and immediately leaks the news to National Guy Ken Rosenthal, who tweets it out while I'm waiting on hold. I'm not kidding. <em>While I'm on hold</em>. When he comes back on the line, he gives me the same information.</p>

<p>After getting beat by Rosenthal by two minutes, I manage to beat Jeff Passan by three on the Cron signing.</p>

<p>Not bad for a local guy who's been told he can't cover baseball anymore and was eating Rice Krispies Treats for breakfast.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>December 23</em>—</span>Word that I'm not long for the beat reaches Internet Stalker, who does the honors. He breaks the news on a burner account named after his dog—the Twitter account he'd been using to harass me has been banned.</p>

<p>"Marlo the Mutt Scoop: The <em>Free Press</em> has an ad for a new Tigers beat writer. Fenech leaving. Most predictable thing ever."</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>December 25</em>—</span>Merry Christmas!</p>

<p>I receive a text from a local media friend, wondering what's going on. He shares a bulletin from the Michigan State University sports journalism department, advertising my job: <em>Opportunity! The</em> Detroit Free Press <em>is looking for a Tigers beat reporter. Send resume, cover letter, and clips</em>…</p>

<p>"Everything ok with you?"</p>

<p>"Yeah, I'm not covering the Tigers anymore."</p>

<p>"Sheez. What's next. How can I help?"</p>

<p>"I'm going to be covering the Pistons."</p>

<p>"Good Lord."</p>

<p>"I know."</p>

<p>I'm still on the beat until the <em>Free Press</em> finds someone—Vince Ellis's last day isn't for a few weeks. I plot three months' worth of Pistons road trips—they're out of town for baseball's Opening Day in April. Vince sends me the link for credentials to the NBA All-Star Game in Chicago.</p>

<p>All is not calm. All is not bright.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>December 26</em>—</span>A local reporter publicly connects the dots: "So Anthony Fenech to exit the Tigers beat and switch to covering the Pistons to replace the buyout-taking Vince Ellis—and a new hire to cover in place of Fenech?"</p>

<p>This lights up my phone. "Your choice or theirs?" a minor league guy asks. "Something up?" a former colleague wonders.</p>

<p>&nbsp;</p>

<p>I spend the holidays ignoring calls and trying to dive into NBA sourcing. I've been building a new ScoopSheet (SwooshSheet), going through media guides, picking sourcing targets for introductory emails. Vince passed along contacts for scouts with the Heat and Nets.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>December 31</em>—</span>We had to put Fuzzles down today, four months shy of her twentieth birthday. I was in sixth grade when we got her, a little ball of long gray hair. She always lived with Mom but stayed some weekends with me.</p>

<p>Fuzzles stopped eating a few days ago and kept sitting on the heat vents for comfort. We took her to the vet, who ran some tests. Kidney cancer.</p>

<p>So, yeah. 2019 was a shitty year.</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">SAN PEDRO de MACORIS, Dominican Republic, <em>March 10, 2020</em>—</span>Josh Katzenstein, as featured online: "When you wanna start selling CBD?"</p>

<p>"Oh, I got my job back."</p>

<p>"What????"</p>

<p>It's a long story. Most of it doesn't matter anymore—what matters is that I'm here, where the back roads are bumpy and my driver crawls between sugarcane crops in his wife's Subaru.</p>

<p>Oliver Arias, a Dominican area scout, has been my tour guide and interpreter for two days while I report from the Tigers' academy.</p>

<p>After the nightmare of 2019, being back on assignment feels surreal. Yesterday I profiled the mystery top prospect they sent me here to cover. Today I'm watching eighty international prospects emerge from dormitories at 9:21 <span class="small-caps">A.M.</span>, a baseball ant farm of teenage dreams and long odds.</p>

<p>When Arias returns me to the hotel, I get the heavy lifting out of the way—transcribing six pages worth of tape. It takes almost two hours.</p>

<p>At the lobby bar, I ask for a shot of whiskey and a beer. Keep the tab open—we've got a lot to catch up on. <em>To answer your first question: Yes, I'm still a Ball Writer, still covering the Tigers. No, I did not kidnap the sports editor to get my job back. So… how did I manage that? As I told Katz, they STILL hadn't found anybody.</em></p>

<p>Chris Thomas offered my job to one of my friends, who turned it down and got a raise. He even reached out to a Tiger Beat competitor, who reached out to me. "I think you're one of the best in the country," he said, which I appreciated. After all that, the <em>Free Press</em> landed back on Fen.</p>

<p>I had already started hoops networking. I registered for a credential for the NBA All-Star Game in Chicago and drove to cover a Cavaliers game in Cleveland, passing a sign on the side of the baseball stadium reminding fans that it was <span class="small-caps">46 DAYS UNTIL OPENING DAY</span>.</p>

<p>I kept track of the Tigers as a lame duck, left up north for a month in sub-freezing temps after pitchers and catchers reported in the warm sunshine. I officially got my job back ten days ago. Thomas pulled me aside to break the good news at a co-worker's going-away party: "Don't fuck it up."</p>

<p>In his official announcement, Thomas wrote, "Anthony has shown exceptional improvement in communication and collaboration over the past month after being reassigned from the Tigers beat in November 2019."</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">SANTO DOMINGO, Dominican Republic, <em>March 11</em>—</span>Seventy-three degrees at 7:15 <span class="small-caps">A.M.</span> when the cab pulls out of the hotel parking lot.</p>

<p>I breeze through security and text Deep Throat: "Is 7:30 too early to drink you think?"</p>

<p>"Yes."</p>

<p>I'm only two flights away from spring training, but a contagious, airborne illness called the coronavirus dominates the media cycle. More than 2,300 Covid-19 cases were reported in Italy yesterday, and experts say it's coming our way next. Eight cases in Florida yesterday—the state's first significant jump.</p>

<p>This morning, another jump. Mom is terrified. "Are you in FL yet? Got your wipes? Don't shake hands with anyone… Over 1,000 in U.S., 30 deaths."</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline">ATLANTA—</span>Two-hour layover. More people wearing masks than I've ever seen, including bartenders. Every TV shows red breaking news ribbons: <span class="small-caps">CDC: AT LEAST 1,200+ COVID-19 CASES IN U.S.</span></p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline">TAMPA, Fla.—</span>Messages when I land: "When you have a min, give me a call."—Willie Horton. "Call if you get the chance."—Deep Throat. "Are you in Lakeland yet?"—Mom.</p>

<p>I call Mr. Horton (no answer) and talk with Deep Throat for twenty minutes on the drive, then check into the hotel and head to the bar.</p>

<p>Sunny, seventy-seven degrees, and smells like spring training. I made it to Florida for Ball Writing's best month. Only got fourteen days, let's make the most of 'em.</p>

<p>&nbsp;</p>

<p class="has-dateline"><span class="dateline">LAKELAND, Fla., <em>March 12</em>—</span>By morning, the sports world begins to spin more slowly.</p>

<p>"Hopefully you brought your wipes," Mom texts me. "They quarantined Pistons. They played Jazz on Saturday. The player from Jazz has the virus."</p>

<p>Two days after Utah's All-Star center Rudy Gobert mocked questions about the pandemic, touching recorders and microphones following a press conference, he tests positive. Gobert was scratched in the lead-up to last night's Utah-Oklahoma City game, which was soon postponed, setting off a firestorm of events.</p>

<p>Within an hour of the cancellation, the NBA suspended its season—a monumental move that knocked Mark Cuban back in his chair. Cuban, the billionaire Dallas Mavericks owner, had been sitting courtside in Denver when he got the news like everybody else—through his phone.</p>

<p>"This is crazy," Cuban told reporter Tom Rinaldi. "This can't be true. I mean, it's not within the realm of possibility. It seems like more out of a movie than reality."</p>

<p>This morning, many in baseball forecast the same fate. "We're always the last to act."</p>

<p>Me? I'm just happy to be back, even if it's in a mask.</p>

<p>I arrive for my sixth spring training the same day as the coronavirus. I hit the ground running—there is other important news besides impending doomsday. This week was the Tigers' open tryout, one of the few remaining in the major leagues where any Tom, Dick or Harry can stop by and try to make the roster of a professional baseball team.</p>

<p>I check with a source. Nobody was signed.</p>

<p>I don't know yet that years from now, we'll look back on March 2020 the way we look back on the day JFK was shot, or the day when the planes hit the towers. The world seemed to stop for Americans on those tragic days. As for now? The world <em>will</em> stop.</p>

<p>All I know right now is that it's good to be back. Good to see the parking lot attendant whose name escapes me. "Why hello stranger!" he beams. Good to see the lobby secretary and Michele Wysocki, who last season left her job as Tigers media relations coordinator—she has tickets on the Margaritaville patio deck in right field.</p>

<p>With clubhouses closed, Tigers PR facilitates interviews by request. I ask media relations director Chad Crunk for players' union rep Matthew Boyd and the team's head trainer.</p>

<p>I go 1-for-2 in my spring debut. The trainer can't talk, but Boyd does—speaking to reporters inside the lobby at team HQ, expressing hope that baseball won't shut down.</p>

<p>He stands six feet away, behind an elastic line. He's wearing metal spikes, holding a baseball glove, planning to throw later in the outfield.</p>

<p>"If you get sick, you get sick. There's so much that is out of your control. You can do what you want but you can't go live life out of fear—that's not what you're supposed to do. That's not living as you're called to. We talk about that in a baseball sense, but that's general life sense in the same impact."</p>

<p>Boyd is asked if he thinks spring training will continue.</p>

<p>"I think the show is going to go on as long as it can."</p>

<p>The show indeed goes on: Detroit takes the field for stretch, calisthenics and batting practice.</p>

<p>After sending in a web update with Boyd's comments and a video clip, I head down to the field and climb over the short fence next to the Tigers' dugout, where Miguel Cabrera welcomes me to camp the only way he can—he gives me the finger.</p>

<p>Miggy loosens up behind the cage, readying for batting practice. I smile and wave back.</p>

<p>Teams begin pulling their scouts from the road.</p>

<p>Rival Exec: "Multiple teams are pulling scouts: Red Sox, Angels, Cardinals, and others."</p>

<p>Adjacent to the media dining tent, former Tiger reliever Shane Greene stands outside the visitor's clubhouse. Greene is still with Atlanta after last season's trade. He's as surprised as anybody that they're playing today.</p>

<p>"We touch the ball on every pitch," Greene says, spinning a ball off his fingers in slow-motion. "By just throwing the ball, players could be at risk."</p>

<p>Not to mention the tens of thousands of fans across Florida and Arizona—many of them senior citizens—who will pack into stadiums today.</p>

<p>Having a margarita in Section 105, Wysocki texts me: "Stop by if you need a break."</p>

<p>"A break or a margarita?"</p>

<p>"Well, I'm not sharing mine."</p>

<p>My days in baseball may be numbered, as well. The desk has sent six text messages and two emails so far today—and the game hasn't even started.</p>

<p>When it does, outfielder Víctor Reyes, last seen on the back of an Englishman's leg, makes a nice running catch in left field.</p>

<p>While the Braves and Tigers begin play, the sports world continues toward a hard stop—and speculation ensues baseball is next.</p>

<p>"MLB is on deck," Deep Throat warns.</p>

<p>In the newsroom up north, the editor on duty agrees: "Start pumping out that 'MLB is shutting down' story. Looks like it's inevitable."</p>

<p>Deep Throat is on Line 1: "MLB statement at 2."</p>

<p>Already, Major League Soccer and the National Hockey League have followed the NBA and suspended play. But baseball games across Florida have begun, and gates will open soon across Arizona. All while the government is urging folks to stay away from large gatherings.</p>

<p>"How some teams haven't told their guys to go home is beyond me," one source says. "MLB blew this one hard. When the NBA suspended, it should have been immediate."</p>

<p>Selfishly, I'm glad it wasn't.</p>

<p>Tigers lead Braves, 2-1, bottom of the sixth.</p>

<p>Shane Greene finishes a scoreless inning by striking out Miguel Cabrera swinging. In midseason form, Miggy appeals the checked swing to the first base umpire, who upholds strike three. Looking fresh at age thirty-seven, Cabrera hit .375 this spring.</p>

<p>MLB announces it is suspending spring training and pushing back the start of the regular season by at least two weeks.</p>

<p>Opening Day was supposed to be March 26. Now it's April 8, at best.</p>

<p>This game continues. Down three runs in the ninth, Hittin' Harold Castro smacks an RBI single, and Detroit brings the tying run to the plate. With dark coronavirus clouds moving in and spring training already doomed, the crowd stirs for the last time in who knows how long.</p>

<p>The rally falls short. Tigers lose.</p>

<p>Postgame, Boyd addresses reporters again. Privy to private Players' Association discussions, Boyd shares what he can about the immediate future.</p>

<p>"I was wrong earlier. Didn't take long for that to switch around."</p>

<p>The team will stay in Lakeland until further notice. Informal, optional workouts will be conducted.</p>

<p>After Boyd speaks, general manager Al Avila and manager Ron Gardenhire step in.</p>

<p>Avila wears a navy polo; a ballpoint pen hooked between buttons. The Tigers will have their facilities deep-cleaned, top-to-bottom. No positive tests so far. Gardenhire is asked how he found out—from a field-level security guard, he says, who showed him his phone.</p>

<p>"Read this."</p>

<p>"I kinda got a game going on. So, it was different. No doubt, it was different."</p>

<p>It's good to see Avila again—even if we are standing six feet apart and roped off. I stand in the back of the reporting bunch, next to a stairway that winds up to the Tigers' front offices. He finishes his interrogation first, leaving Gardy for the rest.</p>

<p>Walking behind me, Avila pinches my ear.</p>

<p>A scout friend suggests dinner before the world ends.</p>

<p>Larry the press box attendant is gone, and the computer screen is asleep. I've been the last man hanging for almost half an hour now—no lights, mini fridge locked, sun shading a stadium that might not get much use for a while.</p>

<p>I don't write. Just sit and think.</p>

<p>After years of filing quickly to meet print deadlines and feed the web and promptly leave the park, I can't bring myself to do anything but sit here and think about the good ol' days. Sometimes, I smile.</p>

<p>I think about my first time here, a problem child for PR even back then. Left unattended at spring training in 2014 as an emergency fill-in for Seamhead John Lowe, I took a picture of a gag posted in the clubhouse—a picture of backup catcher Bryan Holaday in a stars-and-stripes women's one-piece photoshopped into a mock <em>Sports Illustrated</em> swimsuit cover.</p>

<p>Of course I tweeted it, before media relations manager Chad Crunk pulled me outside and asked me to delete it—and the picture from my phone. (I deleted the tweet but not the pic.)</p>

<p>I was thrown into the Ball Writing fire when the Tigers were blindsided by an injury to Jose Iglesias, the young dynamo defender at shortstop, who was forecast to miss many months—if not the season—with a tear of the patella tendon. This was a calamity for both the contending club, which lost its defensive backbone just two weeks before the season, but also for a less-than-rookie reporter, who sat in a press box on fire with less-than-zero sources.</p>

<p>I think about the five years since then. How I will break the news if the shortstop goes down now.</p>

<p>And I think about when I first met Víctor Martínez that week in 2014. He called me "minor league" back then, and I worked hard on our relationship. A year later, my first covering the team in 2015, he was struggling early, hitting .240-something with only four extra-base hits.</p>

<p>One night, the Tigers lost a tough one in extra innings, and after reporters from his scrum scattered, Víctor called me back.</p>

<p>"Hey, Anthony…"</p>

<p>With a backpack on, turning away from his locker, he reached out to me for a fist bump. I complied, and it made me feel good as a young reporter—he gave me a sign of respect. Then he walked off through the clubhouse manager's office and out the door. I think about how I'll never talk to Víctor again…</p>

<p>I continue to sit in the Joker Marchant Stadium press box, trying to imagine what the stadium looked like before renovations and before the large tan building was constructed beyond right field. When there weren't seats in right, no Margaritaville porch, just a few tall palm trees and green netting to catch homers and protect reporters and others outside the clubhouse from getting blistered with foul balls.</p>

<p>I strain to see it. Back when there were black chain-link picnic tables out there, the kind you could stick your fingers into, where I once interviewed my favorite baseball player growing up and got razzed by Jim Leyland and spent the doe-eyed days of my cub reporting youth. A place far in the fantasy of the past, so far away from the reality of now, which I can easily sum up like this:</p>

<p>I'm afraid to leave the press box because I don't think I'll ever be back.</p>

<p>&nbsp;</p>

<p class="has-dateline no-indent"><span class="dateline"><em>March 13</em>—</span>New this morning: Two Utah Jazz players who were at Detroit's Little Caesars Arena last weekend have tested positive.</p>

<p>"They just said that they are keeping everything clean lol," says one employee. "They passed out tubes of Clorox wipes last week and were like good luck."</p>

<p>I haven't showered since the Dominican Republic and I'm not planning on it until I get back home—Lord knows who's been in that shower or what kind of COVID they might be spreading.</p>

<p>I work the baseball switchboard from Starbucks, texting everyone for updates. "Is this stuff true about you guys being told to go home?"</p>

<p>Clubhouse source: "Yes but can't talk about it."</p>

<p>Player: "No. Don't believe so. Nothing is mandated."</p>

<p>Avila: "MLB has shut down ML and MiLB spring training. All players can return home."</p>

<p>Even with teams telling them to scram, many players remain stubborn.</p>

<p>"It's not required," Boyd says. "We want to stay ready to play."</p>

<p>I put my untouched luggage back into the trunk. Sadly, my time with the silver Corolla I picked up forty-eight hours ago has been cut short. I'm returning her twelve days early—if I can scrounge up enough change to get out of here.</p>

<p>At the toll booth, I'm dismayed to realize I'm short. Car in park, I claw through the cabin—beneath the seats, between the seats, in the back—as someone pulls up. Panicking, I hit the gas and pass onto the toll. A flash—guess I'll be hearing from the State of Florida.</p>

<p>On the road, I get a text from Nick Castellanos. "It's a personal choice" about whether to stay or go home.</p>

<p>Even with the exhibition schedule canceled, the players' collective doesn't want to retreat any further from baseball fields than necessary. Heading home could presume a longer absence.</p>

<p>You don't need to ask me to leave Lakeland twice. I do feel warmly about my adopted spring home. But if the coronavirus means end times for all, well, Polk County, Florida is among the last places on Earth I'd want to spend my final days.</p>

<p>I text Mom that we're taking off soon. We get in at 11:15. She'll be there. Last door to the right of baggage claim, like she always is.</p>

<p>The plane rolls back, the cabin falls dim. A baby cries somewhere behind me. An actual pandemic is coming. And I'm looking out the window thinking about how, if I live to write that sports writing book, this is how it would end.</p>

<p>Eyes closed, engine humming. My phone pings.</p>

<p>"Got anything leftover for the morning?"</p>

<p>I put the phone on airplane mode.</p>`,
        wordCount: 5200
    },

    // 2020 SEASON - No chapters, just the year header (handled in navigation)

    // POSTSCRIPT CHAPTERS (28-29) - Nested under POSTSCRIPT dropdown
    {
        id: 28,
        year: null,
        section: 'postscript',
        title: "POSTSCRIPT",
        subtitle: "Where are they now?",
        teaser: "Reflections on the journey and updates on the people who shaped it.",
        content: `<p>Sometimes, sports writing means making tough calls. Three weeks after the pandemic hit, the <em>Free Press</em> received the kind of tip nobody wants to get.</p>

<p>Al Kaline had died. A connected freelancer called in, and within minutes, the desk reached out with a phone number for Mr. Kaline's oldest son, Mark. My first job was to text him.</p>

<p>"I am sorry for reaching out to you under these circumstances, but we are putting something together about your dad and wanted to reach out to the family for any kind of comment. Again, I'm sorry for your loss and having to reach out at this time."</p>

<p>Somehow, my second task was even worse.</p>

<p>Willie Horton, Al's teammate and dear friend of 50-plus years, was next on my call list. He once saved Kaline's life when, in 1970, Kaline collided with another outfielder, swallowed his tongue and crumpled to the ground unable to breathe. Horton rushed to his side and cleared Al's airway.</p>

<p>As I called Mr. Horton, it was sunny and springtime. At seventy-seven, he was gardening outside his home. I didn't want to be the one to tell him if he didn't already know, so I asked a circumspect question about hearing anything about Al Kaline. He said nope, nothing new, just saw Al last week.</p>

<p>Calling back minutes later, Willie was crying, wailing upon learning the news. It took him nine days to put the loss into words.</p>

<p>"It's my whole life. That's all of Willie Horton's life as a professional."</p>

<p class="scene-break">***</p>

<p>The early months of the coronavirus was a lead pipe to the knees for most, including the newspaper industry, which, hobbled for years, took a particularly tough blow.</p>

<p>Gannett imposed three weeks of mandatory unpaid furlough in May and June 2020, during which company stock dipped to $1.11. The <em>Free Press</em> newsroom housed 85 employees in 2020. Five years later, stock had rebounded to $5 per share—but the <em>Freep</em> head count had dwindled to 73, and the whole operation had moved to smaller offices for the second time in ten years.</p>

<p>In January 2025, the newspaper announced the impending closure of its largest local operating facility, which has printed Michigan's Most-Read Newspaper since 1972. The Sterling Heights Operating Facility was scheduled to close in eight months, with 115 more jobs lost.</p>

<p>The sports department remained a shell of itself—four overworked editors and a shrinking roster of sports writers struggling to feed the online appetite of the greatest sports city in America.</p>

<p>Chris Thomas left in December 2020 to be sports editor of the <em>Nashville Tennessean</em>. Thomas was promoted to executive editor of sports at <em>USA TODAY</em> in 2024.</p>

<p>Peter Bhatia retired as executive editor in 2022 with another round of layoffs looming. Facing fourteen job losses, including five reporters, the newsroom was spared further damage when eight employees volunteered to leave—Bhatia included.</p>

<p class="scene-break">***</p>

<p>I last spoke with John Lowe in June 2020, checking in with him for some much-needed Seamhead therapy. He sensed that, for me, the end on the beat was near.</p>

<p>Lamenting the start of "summer camp," baseball's sterilized pandemic-era answer to spring training, I told John I had been thinking a lot about the changing times, the rise of social media and multimedia, and the insatiable Internet eclipsing the printed newspaper. I was juggling all that without a backup writer to give me a break, something John had in better times.</p>

<p>"I fear that this profession is never going to be the same again… I will be forever grateful for you showing me how to navigate the stadium."</p>

<p>We spoke for forty-five minutes. I didn't quite tell him that I had decided to quit, only vaguely alluding to a "book idea that I've been kicking around"—but the writing was on the wall.</p>

<p>"Even if there was no COVID, things have changed significantly from when you first got a taste for this life," he said. "This is allowing you to bring some things into focus that the grind may have hid from you for a while."</p>

<p>The next time we speak, John Lowe will be in Cooperstown.</p>

<p>Seamhead was inducted into the writer's wing of the Baseball Hall of Fame in 2023 as the recipient of the Baseball Writers Association of America's Career Excellence Award. To his great thrill, John was inducted in front of his managing idol, Whitey Herzog.</p>

<p>"I've made it fifty-seven years in my journey. The whole ride has been outstanding."</p>

<p>Jim Leyland joined Seamhead in Cooperstown the next summer, inducted into the Hall of Fame in 2024. Despite his deep ties with the Tigers—Leyland has worked as a special assistant and team ambassador since retiring as manager—he was enshrined wearing no team cap, out of respect to all four teams he managed. (Colorado, Florida and Pittsburgh in addition to Detroit).</p>

<p>Leyland was elected by the contemporary era committee and wore a radiant blue jacket for his speech, a shade more fluorescent than royal. Bright white shirt, colorful plaid tie. He spent most of his speech talking about others, thanking and congratulating a total of sixty-four people. He was as authentic at the podium as he was lying on the couch during my first trip to the ballpark, telling funny jokes and fighting back his trademark emotions.</p>

<p>Thanking his family and wife, Leyland said to her, "This just doesn't happen without you. I was having coffee with Katie a couple weeks after I was elected to the Hall of Fame. And I casually said, 'Katie, can you believe in your wildest dreams that I've been elected to the Hall of Fame?' And Katie replied, 'Jim, you're not in my wildest dreams.'"</p>

<p>Leyland's voice shook, talking about winning the World Baseball Classic as Team USA skipper in 2017 and saluting best friend Gene Lamont.</p>

<p>"Gene and I were roommates… It was unbelievable to have your closest friend standing next to you in the dugout through the good times and the tough times. Gene is here. Gene, you're a big part of this. Please stand up."</p>

<p>Lamont retired from the dugout in 2017 after twenty-three years in the big leagues as a manager and coach. He worked for the Royals as a special assistant after retiring and still speaks with Leyland every morning.</p>

<p class="scene-break">***</p>

<p>I closed the Miguel Cabrera chapter of my beat writing career inside a nondescript warehouse, where in July 2020, the greatest right-handed hitter of this generation readied for batting practice. I arrived to watch uninvited, only because I knew a guy who knew a guy who ran a local travel baseball program—and it turned out Miggy had been using its indoor batting cages.</p>

<p>Cabrera was loosening up with a weighted bat when he saw me. "Hey, bitch." Bringing it in for a handshake, he pretended to hit me upside the head—some things never change.</p>

<p>Inside the cage, Cabrera laced the JUGS machine. Line drives into the net, off the pitching screen and smack-dab into the heart of a paper target, hanging from a zip-tie to indicate straightaway center field. What I remember most is the sound as his bat smacked the ball, echoing around the garage like a shotgun blast.</p>

<p>After working up a sweat, Miggy and his crew—including fellow Venezuelan Hittin' Harold Castro—packed into a black Range Rover with dark window tints and drove off. It was the last exclusive of my career, the old-school kind—taking readers somewhere they couldn't go. It was the closest any Ball Writer got to Cabrera all season.</p>

<p>Cabrera retired after the 2023 season. In the final plate appearance of his career, with a sell-out crowd on its feet, fans holding their phones and hoping for one more hit, the Mighty Miggy drew a walk.</p>

<p>In 2029, the first year he's eligible, Cabrera will join the Seamhead and the Skipper in Cooperstown.</p>

<p class="scene-break">***</p>

<p>Four years after fleeing, I received an errant text one morning. A mistake. Had to be.</p>

<p>"Have you been watching?"</p>

<p>I hadn't talked to Deep Throat in ages. Now he reaches out? In September 2024?</p>

<p>Me: "I don't have TV here."</p>

<p>Deep Throat: "They're over .500."</p>

<p>Who? The Tigers? The team that lost 137 more games than they won when I was covering them. They're in the pennant race?</p>

<p>I checked the standings, and sure enough: 71-70, 4½ games back and climbing. On August 11, the Tigers were ten games back of the second American League wild-card spot, with playoff odds at 0.2 percent according to FanGraphs. But after that, Detroit began a historic run.</p>

<p>Their astounding finishing kick was 31-13, and the Tigers made the postseason for the first time since 2014.</p>

<p>It was disarming how much I didn't know about the team. I wasn't even sure I really connected with these Tigers until they swept Houston's hated black hats in the wild-card round. Then, just as I started to have fun watching baseball again, almost allowing myself to root like a fan, things got complicated.</p>

<p>Opposing Detroit in the American League Division Series: Matthew Boyd.</p>

<p>Fifty-five days removed from making his first start in more than a year, Boyd took the hill for Cleveland—a team no longer known as the Indians, but since 2022 as the Guardians—and started Game 1 against the Tigers.</p>

<p>This was unfortunate, because I couldn't root against Matthew Boyd. Our connection was solidified in that pandemic summer of 2020, when clubhouses were closed and Ball Writers had to lean on their networks for information.</p>

<p>I talked with Boyd while players and owners squabbled, showing just how far things can come in five years—from my ill-advised icebreaker about marijuana to comfortable chats with the guy who became perhaps the favorite player I covered.</p>

<p>The last time we talked, I said as much: "I'm excited. Now I get to root for you guys."</p>

<p>Boyd was terrible in 2020, had elbow surgery in 2021 and over three years bounced from the Tigers to Giants to Mariners to Tigers again in 2023 for another injury-shortened season: Tommy John surgery on his ailing elbow, shelving him for a year.</p>

<p>Boyd threw 4⅔ scoreless innings for the Guardians in Game 1 and returned to start the deciding Game 5.</p>

<p>The fan in me was relieved when Boyd was hooked according to the Guardians' plan after two scoreless innings. He did his job, striking out five, but the Tigers took a one-run lead into the bottom of the fifth before lefty ace Tarik Skubal—the eventual American League Cy Young Award winner—hung a fat breaking ball with the bases loaded. The ball landed in the seats, and the Tigers' fairy tale season went up in flames.</p>

<p>A great pitcher was rewarded—and so was a great guy. Boyd and his wife Ashley founded Kingdom Home in 2018, a charity that combats sex trafficking and abuse in Uganda and operates safe homes for children. The Boyd's effort started with a helping hand to a Ugandan widow who rescued three dozen from forced marriages or prostitution rings. Kingdom Home is still going strong. Hundreds of children have been rescued and put into safe homes, and many donations have come from major leaguers—including Skubal.</p>

<p class="scene-break">***</p>

<p>Plagued by too many poor decisions, the Highest Source In The Land was fired in 2022 after the Tigers' slow-moving rebuild—in its fifth year—was deemed a failure. Al Avila was replaced by a young hotshot executive, who came into town with a much-needed set of fresh eyes.</p>

<p>Avila went only 404-573 as general manager in eight seasons, and his fate was likely sealed after another free agent deal went awry—this one the most debilitating yet.</p>

<p>Years after his name came up in trade discussions while an All-Star in Chicago, shortstop Javier Báez was finally signed by Avila to a mega six-year deal for $147 million. Báez, something of an enigma with elite athleticism and an equally unpolished approach to the game, has been arguably the majors' worst batter in baseball since arriving in Detroit, hitting .221 with pedestrian power and striking out 23 percent of the time.</p>

<p>Thirty-five-year-old Scott Harris was hired as president of baseball operations in September 2022, replacing Avila, and two years later, led Detroit to its first postseason appearance in a decade. But Harris' savvy acquisitions told only half the tale. Of the Tigers' twenty-six players on the postseason roster in 2024, seventeen were acquired by Avila.</p>

<p>I haven't talked with Avila since 2023. I messaged him that winter, "You know I'm writing a book, right?" He called later but I missed it, and I haven't heard from him since. My calls go directly to voicemail. I think HSITL has moved on with his life.</p>

<p>The last time I saw Al was at summer camp, July 2020. Every day felt like a scene straight out of <em>E.T.</em>, with masked attendants taking your temperature. Avila wore a baggy Tommy Bahama button-down and watched from behind home plate. Catchers took batting practice, pitchers threw in the bullpen, and Miguel Cabrera did calisthenics.</p>

<p>I took videos, tweeted and sent in socially distant observations. After workouts, manager Ron Gardenhire spoke with reporters on Zoom. Gardy was asked if he missed the Ball Writers: "Some of you, yes."</p>

<p>The Tigers finished in last place again in the shortened 2020. Gardenhire stepped down with eight games to go, citing health concerns.</p>

<p>To replace Gardy, Avila pulled a shocker, hiring tainted manager A.J. Hinch fresh off a one-year suspension for his role in the Astros' cheating scandal. Good move by HSITL. In Hinch's time in Detroit, he re-established himself as perhaps the best manager in baseball.</p>

<p>Hinch found poetic justice in 2024 by upsetting the Astros in the Tigers' two-game sweep at Minute Maid Park, the ballpark where his team once banged trash cans, beating the team that fired him and bringing to its knees the modern-day American League dynasty he helped build.</p>

<p class="scene-break">***</p>

<p>Changes within the Tigers' organization have been widespread, in the office and on the field—but some familiar faces remain.</p>

<p>Kirk Gibson continued broadcasting games for FOX Sports Detroit until 2025 and still serves as a special assistant to the front office. Gibby has raised more than $3 million through the Kirk Gibson Foundation, which in 2024 announced plans to build a Parkinson's disease care center in Metro Detroit. Entering 2025, Gibby has been kicking Parky's ass for more than a decade. He's best friends with Alan Trammell, who still shows up at spring training at the crack of dawn and travels around the Tigers' minor-league affiliates as a special assistant.</p>

<p>Ron Colangelo remains at the helm of the Tigers PR department, entering his eighteenth season. Aileen Villarreal married a Ball Writer and became head of PR at Independent Sports & Entertainment, one of the largest baseball agencies. Media relations director Chad Crunk worked ten seasons for the Tigers—he stuck it out until the 2024 playoffs.</p>

<p>Ten years after my rookie year on the Tiger Beat in 2015, a dwindling bunch of major-leaguers remain from that team as of Opening Day 2025: Boyd, Nick Castellanos, Jose Iglesias, Joe Jiménez and Justin Verlander. Five others entered the season in the minors, a handful were playing elsewhere in the world, and one—J.D. Martinez—remained unsigned.</p>

<p>J.D. is the hitter I most enjoyed watching. Ever. Even before he stepped in the batter's box. He's bounced around contending teams since leaving Detroit in 2017, hitting with power and amassing more than 300 home runs. But that's not why he's memorable to me.</p>

<p>The hardest I've ever laughed in a clubhouse might've been in 2016, watching Cameron Maybin give an animated impression of J.D. getting ready to hit. Maybin grabbed a duffel bag and started going through it as if searching for a magic bat, acting all finicky, mimicking J.D., mumbling out a hitting to-do list, how anal J.D. gets with all his routines in the batting cages and on the way to plate.</p>

<p>Maybin, quite the entertainer, has served as a part-time TV commentator for YES Network and MLB Network since retiring in 2021.</p>

<p>Nick Castellanos became one of my favorites for a different reason—he's a throwback from twenty years past, raised as a winning player by the veteran Tigers clubhouse. After a down season with the Reds in 2020, Nick responded with a strong season in 2021 and secured a five-year, $100 million deal from the Phillies. At his introductory press conference, Castellanos sat beside Dave Dombrowski, who joined the Phillies a few months earlier as their head honcho of baseball operations.</p>

<p>Ten years since the Tigers said goodbye, Dombrowski is still winning: After cementing his spot in Cooperstown with a second World Series in Boston (2018), his run so far in Philly has looked awfully similar to his fourteen years in Detroit: The Phillies made the postseason in three of Dombrowski's first four years, but as of 2024 have yet to win it all.</p>

<p>Jose Iglesias took his career to unique heights in 2024 with the Mets. At age thirty-seven and enjoying a second act as a two-way star (Latin pop artist and big-league infielder), Iglesias sparked the Mets to the postseason. He hit .337 in eighty-five games, while his single <em>OMG</em> received widespread airplay.</p>

<p>Daniel Norris also re-invented himself. He pitched for the Tigers off and on in 8 different seasons, retired in 2023 from the Guardians, married a world-class surfer and settled down near the beach in California. Just like a drunken script writer would draw it up.</p>

<p>Ian Kinsler joined the Rangers front office in 2023 as a special assistant, positioning himself nicely for the next act of his career. Kinsler retired after the 2019 season with San Diego and worked three seasons in player development with the Padres and managed Team Israel in the 2023 World Baseball Classic. Some believe Kinsler could make a successful general manager one day. His outstanding fourteen-year playing career was one-and-done for the Hall of Fame after he received just 2.5 percent of the vote in 2025.</p>

<p>Francisco Rodriguez's stats were put to the test in 2023, when the closer formally known as K-Rod debuted on the ballot. K-Rod (437 saves, sixth all-time) polled 10.2 percent in 2025, nowhere near enough to be enshrined. But perhaps he'll stack up better in the future. Closer Billy Wagner is in, and if Kenley Jansen and Craig Kimbrel also get in, K-Rod would be one of only two closers with 400 saves not in the Hall of Fame. Then there's six-time All-Star Joe Nathan, tenth all-time with 377 saves. He lasted only one year on the ballot and spends time watching his son play college baseball.</p>

<p>Víctor Martínez is a special assistant in Toronto, where he works for longtime executive Mark Shapiro, who signed him in Cleveland. Little Víctor is not so little anymore: Víctor Jose Martínez is a switch-hitting first baseman at the College of Central Florida. He hit .327 with 11 home runs, 47 RBI and one stolen base as a freshman.</p>

<p>David Price retired as quietly as a player of his caliber can, walking away after 2022 with the Dodgers. Although his last ace-worthy season came in 2015 with Detroit, Price posted numbers his last seven years better than most pitchers' entire careers: He went 53-26 with a 3.78 ERA and 700 innings pitched, which included winning a ring with the Red Sox in 2018.</p>

<p>And the Avila era in Detroit didn't begin and end with Al. Son Alex Avila retired in 2021 with thirteen seasons in the bigs, seven in Detroit, and one All-Star appearance in 2011. I met Alex during media availability in the American League clubhouse on workout day that year, while covering the Arizona All-Star Game as an intern for MLB.com. Since calling it a playing career, he's worked in television and radio, calling Tigers broadcasts as color commentator. Alex's older brother, Alan Avila, spent eight years with the Tigers as assistant legal counsel.</p>

<p>Sam Menzin's tenure came to an unfortunate end in April 2025, when he resigned in response to an active HR investigation: According to the <em>Athletic</em>, Menzin allegedly sent two female employees "photos of his genitals via Snapchat, an app where images are viewed and then auto deleted. Both women said they received unsolicited lewd photos from Menzin on several occasions, dating back to at least 2017."</p>

<p class="scene-break">***</p>

<p>Eleven days after Justin Verlander accused me of "unethical" behavior and had the Astros bar me from the clubhouse, he put an exclamation point on an award-winning season—throwing his third career no-hitter on September 1, 2019. Verlander struck out 14 batters against Toronto in the best game of his career. That winter, he won his elusive second Cy Young Award, posting numbers at age thirty-six worthy of his career prime.</p>

<p>Approaching 3,000 career innings, Verlander's right arm finally blew out early in the pandemic season. Old Pal returned from Tommy John surgery two years later and won the Cy Young again in 2022, posting a career-best 1.75 ERA.</p>

<p>In his first foray into free agency, Verlander then ventured to the National League, signing with the New York Mets for the 2023 season. In Queens, Verlander reunited with former teammate Max Scherzer, whose career has followed a similar trajectory since leaving Detroit.</p>

<p>The reunion didn't work. Trying to make sense of the Mets' fourth-place season, <em>New York Post</em> Ball Writer Mike Puma shed light on clubhouse chemistry issues: "Verlander and Scherzer had a strained relationship as Tigers teammates, and a source said even as the pitchers worked toward harmony with the Mets, there was occasional discord. Verlander was a 'diva,' according to this Met, causing Scherzer to grouse about his longtime teammate.</p>

<p>"Verlander, who was traded back to the Astros on Aug. 1, was largely detached from teammates, according to the Met, and didn't add to the team's identity. On the other hand, Scherzer (who was traded to the Rangers on July 29) helped form the fabric of the clubhouse."</p>

<p>I never covered Scherzer on a full-time basis. He signed with the Washington Nationals just months after I took over as the Tigers' Ball Writer. But we were familiar enough, and I strived to build a relationship with Scherzer. At All-Star Game media days, I'd always sidle up to Max's podium for a quick hello.</p>

<p>I last spoke with Max following a dominant start at Comerica Park midseason 2019: He allowed one run on four hits over eight innings, striking out fourteen in the win. When asked following his postgame session with Washington reporters if he had time for a couple questions on the side, Scherzer obliged.</p>

<p>"This is where I grew up. Where I really established myself as a major leaguer and really taking it to the next level with all the guys here, and that's what happens when you win, It makes you want to find everything you can do for the team. Winning's the ultimate motivator."</p>

<p>Scherzer thanked former pitching coach Jeff Jones for teaching him a curveball and credited the Tigers' winning atmosphere for cultivating his drive. When Scherzer left town in January 2015, the righty and his wife Erica May-Scherzer took out a full-page advertisement in the <em>Free Press</em>, saying, "Thank you to Mr. Ilitch and the Tigers organization, teammates and most of all the Detroit fans."</p>

<p>The Tigers had acquired Scherzer from Arizona in 2009, three years after the Diamondbacks selected him in the first round.</p>

<p>Justin Verlander was taken by the Tigers with the second overall pick in 2004, sprouting almost overnight into a homegrown ace. He played his first thirteen years in Detroit before he was traded to Houston in 2017. The next day, he ducked in and out of the clubhouse, saying farewell to fans on Instagram.</p>

<p>Beyond their five years as Tiger teammates, the two ace pitchers will be forever entwined by greatness. Both will be inducted into the Hall of Fame on their first try. Both have won three Cy Young Awards and two World Series—although one of Verlander's titles has an asterisk. Both rank on anybody's list as the best 1A and 1B righty starters of this generation.</p>

<p>Verlander spent an injury-riddled season in 2024 with the Astros and didn't pitch in the postseason. He wasn't part of the Astros' playoff roster, instead watching stone-faced from the dugout while the Tigers celebrated.</p>

<p>Entering the 2025 season, his twentieth, Verlander is pitching in San Francisco. He's the oldest player in U.S. professional sports, at forty-two years and counting.</p>

<p class="scene-break">***</p>

<p>In addition to his tremendous natural gifts, Verlander has always looked for an edge, a little something extra. That doesn't make him unique among major-leaguers.</p>

<p>The sticky stuff used for many years by various teams and many pitchers—including Verlander and Scherzer—was officially exposed in 2021, when Brian "Bubba" Harkins, an obscure Los Angeles Angels' visiting clubhouse manager, got sacked by the team.</p>

<p>Harkins, fifty-five, worked thirty-eight years for the Angels, originally hired as a batboy in 1981. But his sideline was experimenting with pine tar and other ingredients to produce a sticky mix that helped pitchers grip the ball better. MLB through the years has been a chain of chemistry labs in Houston, California and other sites, but MLB exposed Harkins as an example, and the Angels fired him.</p>

<p>Harkins fought back. He sued MLB and the Angels for defamation in January 2021, listing in court filings a Who's Who of customers—current and former pitchers, including Old Pal.</p>

<p>According to a June 2021 interview with <em>Sports Illustrated</em>, Harkins said the substance was developed by All-Star closer Troy Percival, who saved 316 games in ten seasons with the Angels from 1995-2004. Harkins said he wasn't asked to produce the goo until 2005, when Percival signed with the Tigers.</p>

<p>From <em>Sports Illustrated</em>: "A year or two later, with Percival gone, then-Detroit ace Justin Verlander approached Harkins during a road trip: 'He said, 'Hey, we had Troy Percival on our team last year, and he shared the stuff that he was using and we started using it—and we called him and said, 'We would like to get some; what do we need to do?' He said, 'Well, talk to Bubba.'"</p>

<p>In court filings, Harkins said Verlander texted him after the Angels fired him: "Bubba, it's JV. Firstly, I'm so sorry to hear about this. Please give me a shout whenever you can." In their subsequent phone conversation, Verlander said 'the league has let this go on for 100 hundred years,' and that it was '(expletive).'"</p>

<p>Harkins' defamation suit was settled confidentially in July 2023, hours before the case was scheduled to go to trial.</p>

<p class="scene-break">***</p>

<p>As for Anthony Fenech, I played out the string for as long as I could before officially losing my mind.</p>

<p>Ball Writing under COVID conditions was anything but. In lockdown, I took up Twitch streaming, broadcasting video game simulations of the Tigers' season on Freep.com, which was fun for a couple days until it became a drag.</p>

<p>The worst part was writing game recaps for the Virtual Tigers. Looking back, that might've been what finally broke me. Furloughs every other week, that was fine. The weather turned and I mowed lawns and listened to music, and some days had more fun than sports writing.</p>

<p>When furlough ended, I fell fast into old habits. The bad ones.</p>

<p>And the longer summer camp wore on, the closer Opening Day loomed, the harder I fought its advances. The constant push-and-pull had taken its toll. I got fed up with the editors, the non-stop demands, the Tigers themselves and, most of all, with myself.</p>

<p>I was in no shape to cover baseball. No desire, no thank you. I swore to myself I would quit and devote time to the book, promised myself I wouldn't cover another game. Locked eyes with the mirror and lost sleep. Could I really do it, really walk away?</p>

<p>I drafted short resignation emails and long, emotional letters—drunk enough to start, never enough to send. I began shaming myself, wondering if I was strong enough to follow my heart with this book.</p>

<p>There were a lot of hangovers that summer.</p>

<p>I woke up late one afternoon, picked up a pizza on the way to the stadium and shared a picture on Twitter: PIZZA PARTY TONIGHT.</p>

<p>The intrasquad game at Comerica Park that night made for an eerie atmosphere. A scrimmage under the lights with nobody there. Artificial crowd noise pumped through the speakers, preparing players for regular season play with no fans in attendance.</p>

<p>Ron Colangelo—a minor-league broadcaster in much younger days—served as public-address announcer. His voice echoed around the empty stadium.</p>

<p>Late in the final scrimmage of summer camp, socially distanced from reality and light years beyond better judgment, I stepped into the lower-level concourse and put in motion a spectacular resignation plan.</p>

<p>It was neither knee-jerk nor well-thought out. As I triggered the plan, I felt like I was already walking to the principal's office—defiantly ignoring the flashing, screaming, DON'T DO IT warnings around me.</p>

<p>I ordered two large pizzas, cheese bread, a two-liter of Coke, and left Ron Colangelo's phone number as the main contact. Colangelo's office phone rang.</p>

<p>Minutes later, my boss called. He asked if I did it. I said, indeed, I had.</p>

<p>The conversation was quick. I was happy until the drugs wore off.</p>

<p>I left the <em>Free Press</em> a month later, after being reassigned to the web desk. Truth is, I should've left with my head held high. I had a book in there. I did a hell of a good job as a Ball Writer. But I didn't. I left like this—with pizza.</p>

<p>For my last assignment, I reported on a local pastor who died in a tragic boating accident on the Detroit River. My final byline was from the pastor's funeral in the church I was baptized in.</p>

<p>I got into therapy, went stone cold sober and flew to Malta for sports writing rehab. When I did, it was my first time at the airport in six months. In an empty wing of the terminal, a tip jar stood empty on a grand piano that once provided background music to the busy life.</p>

<p>Food stands were shuttered, and the corner bar was closed. In vending machines, sodas were swapped out for masks, snacks for travel-size hand sanitizer. I spent my six hundredth hotel night at London Gatwick, where I quarantined for two weeks and celebrated my birthday by sneaking out for a Big Mac.</p>

<p>I received a message from Andrew the Chicago Cab Driver my first day in Malta. Andrew picked me up at the start of the book, rescuing me from the rain in the immediate aftermath of the Very Serious Story weekend.</p>

<p>Where had I gone? Why hadn't I called all season? You're where? Vacationing or working?</p>

<p>"Off-the-record, I came here to work on a writing project I've been wanting to tackle. Been thinking about you recently. The story begins in the back of your SUV."</p>

<p>Internet Stalker continued his crusades, even with his Twitter account suspended. He posted on his media fanfic website—until that got suspended, too.</p>

<p>A year after Fuzzles died and six since the boogeyman caught me smoking a marijuana cigarette at a party, I lived New Year's Eve 2021 in quiet solitude inside a converted boat house along the sea. Malta had been in shutdown since the day after I arrived. Bars and restaurants closed. Gyms and coffee shops, too. Masks everywhere—even outside, even at the beach.</p>

<p>Asleep early and many months sober, I was awakened by pots and pans at midnight, blissfully unaware of an Amber Alert circulating back home.</p>

<p>Internet Stalker rang in the new year with a piece on my disappearance:</p>

<p><em>"Something strange occurred this past summer. It has now been 164 days since Fenech posted a tweet. When the season started, Fenech was no longer writing about the Tigers.</em></p>

<p><em>"Where is Fenech? No tweets from a once prolific social media user. No articles. I sent an email to the paper's sports editor. No response. I sent multiple text messages to Fenech's cell phone requesting information about his status. No response.</em></p>

<p><em>"I have asked several members of the media if they know where the guy has been. Nobody knows anything. Hell, I even had one sports writer text ME to see if I knew what was going on.</em></p>

<p><em>"I even reached out to a 'girlfriend' of Fenech's and couldn't get any info.</em></p>

<p><em>"One of these days, we will find out what happened between Anthony Fenech and life."</em></p>

<p class="scene-break">- 30 -</p>`,
        wordCount: 4550
    },
    {
        id: 29,
        year: null,
        section: 'postscript',
        title: "DEDICATION",
        subtitle: "For Pedro Gomez",
        teaser: "A tribute to the mentor who stood by me when not many did.",
        content: `<p>This book is dedicated to Pedro Gomez.</p>

<p>Pedro was an ESPN television reporter since 2003 and one of the country's foremost baseball journalists when he died unexpectedly at age fifty-eight from a heart attack on February 7, 2021. He died watching Super Bowl LV with friends in his Scottsdale, Arizona home.</p>

<p>Pedro was the son of Cuban refugees, born twenty days after his parents arrived in America. He grew up in Miami and spent thirty-five years covering baseball—America's national sport and Cuba's, too—at the <em>Miami News</em>, <em>San Diego Union-Tribune</em>, <em>San Jose Mercury News</em>, <em>Miami Herald</em> and <em>Sacramento Bee</em>. In 1997, he became a columnist and national baseball writer at the <em>Arizona Republic</em>.</p>

<p>I loved Pedro Gomez the way I love my father. Our connection began in November 2014, within weeks after I took over the Tigers beat at the <em>Detroit Free Press</em>. We met not in a dugout or baseball press box, but at the Detroit Lions' football practice facility as the Buffalo Bills and New York Jets were conducting workouts. A snowstorm had forced the Jets-Bills game indoors at Detroit's Ford Field.</p>

<p>Pedro was covering the practice for ESPN. I was a newly minted Ball Writer. When I introduced myself, his eyes lit up. Our first phone conversation lasted an hour. Little did I know that would be the rule—not an exception.</p>

<p>Pedro supported me unfailingly, many times at a moment's notice, and stood by my side during the most stressful moments of my career. When I last talked to him, texting him in the heart of the pandemic summer in 2020, he did not know of my internal turmoil. He didn't know about <em>OFF-THE-RECORD</em>. "I pulled the plug," I said.</p>

<p>As Pedro always did, he immediately called back. He did not mince disappointment with the boneheaded pizza delivery plan I carried out. It was audible in his voice, the exasperation of his words, and the seriousness with which he said, "Anthony, you committed career suicide."</p>

<p>I knew that kind of honesty was not easy to share. He sounded like a dejected dad—I had let him down. A couple days later, I messaged him.</p>

<p>"I really appreciate the honesty you gave me a couple nights ago. I know you were disappointed to hear that, and I was embarrassed to tell you about it—you have put in so much time with me because I'm much better than that. You're right, the pizza didn't 'just happen.'</p>

<p>"I made the decision; I did it consciously and I am aware of the future implications this may have on my place in the industry. While I wish I would have acted more mature in carrying it out, I hit the breaking point and made a move.</p>

<p>"I am very confident in my ability, and I feel very strongly that this move will put me in a better position to make the kind of impact I desired to make in this industry. I'm looking forward to sharing these thoughts with you.</p>

<p>"Again, I really appreciate the honesty. Though, yes, it was pizza—it is embarrassing, and I am not looking forward to others who I respect like you receiving this information. I know it's not easy to tell me that I committed 'career suicide' and I know you're not being mean, but this is why I trust you so much—because it's not BS.</p>

<p>"You're one of the most important people in my career and I'm indebted for your help. I'll get at you early next week with an update. Appreciate you."</p>

<p>"See, this is what I saw in you five years ago. Everything you wrote here has so much of YOU in it. It's heartfelt and definitely feels sincere. It's like a young player making it to the bigs and he's unsure of himself but when he gets there, he does something special, meaning it's inside of that player. It's IN you. Second chances are a staple of our society. Make a comeback."</p>

<p>I never got back to Pedro with an update. I never told him about this book. Never called him again to chat, to kill hours talking baseball, journalism or life.</p>

<p>Pedro stood by me because he'd walked in similar shoes many times over, most famously after he wrote a cutthroat column on starting pitcher Curt Schilling prior to the biggest game in Arizona professional sports history—Game 7 of the 2001 World Series.</p>

<p>"<em>Schilling basically threw his manager, Bob Brenly, under a New York City subway car after Wednesday night's Game 4 loss. He said afterward that he was fully prepared to head back out for the eighth inning, which was not the message he gave Brenly.</em></p>

<p>"<em>It's now been reported that Schilling told Brenly, 'Don't hang me out there,' after the seventh. Brenly interpreted the statement to mean Schilling was gassed.</em></p>

<p>"<em>After the game, Brenly was saying one thing while Schilling was contradicting it to anyone willing to listen. He then attempted to backpedal furiously in the ensuing days, insisting he was misquoted by reporters who heard only half his statements.</em>"</p>

<p>T.J. Quinn, an ESPN investigative reporter, former Ball Writer (Mets beat, <em>Bergen Record</em> and <em>New York Daily News</em>, 2000-02) and one of Pedro's best friends, remembers the story well: Quinn was alongside him at the stadium that night, pacing the field pregame, watching early batting practice in front of the Diamondbacks' dugout.</p>

<p>"We both knew that anybody could decide to take a shot at him. From somebody just airing him out to somebody actually taking a swing, somebody throwing something—you had no idea. You just knew people were really angry.</p>

<p>"He was just there so that if anybody wanted to take a shot, had anything to say, he was there to take it.… And we're standing there and (veteran lefty reliever) Greg Swindell is coming off the field, he'd been shagging. And he saw Pedro and all of a sudden, changed directions, went straight to him, never said a word, held out his hand, shook it, and nodded. And then he let go of his hand and went inside. And he never said a word.</p>

<p>"It's one of the bravest things in the business. It's really easy to take shots when you're not walking down there on that field or in that clubhouse but he made sure he was and what you saw from Swindell, and what he got from a lot of players afterward was recognition, that not only was he brave, and not only was he correct, but he handled it the right way. And I know that meant more to him than anything."</p>

<p>Pedro stood by me when not many did—because he'd been there.</p>

<p>He called immediately. "History will be on your side." I will die wishing Pedro Gomez could read this and I would urge the Baseball Writers' Association of America to honor him with the highest award in the profession.</p>

<p>Although Pedro was most widely known for his television reporting on ESPN, he was a Ball Writer at heart, born and bred from an undying love of the game. After his death, close friend Steve Kettmann edited a book on Pedro's life, a collection of essays from a Who's Who of baseball luminaries—from famous reporters to star players to legendary managers.</p>

<p>The book, <em>Remember Who You Are: What Pedro Gomez Showed Us About Baseball and Life</em>, is a touching tribute to a man who is a Hall of Famer in every sense of the word. As a father to sons Rio and Dante and daughter Sierra. As a husband to Sandi Gomez, president of the Pedro Gomez Foundation. As a reporter. As a person.</p>

<p>My hope is that someday his legacy is honored in Cooperstown with the Baseball Writers' Association of America's Career Excellence Award. There is not a Ball Writing Hall of Fame that's complete without Pedro Gomez in it.</p>

<p>To support Pedro's Hall of Fame legacy in sports journalism, consider connecting with the Pedro Gomez Foundation. It's a non-profit created in 2021 to further students' aspirations in baseball, journalism and beyond with endowed scholarships at Arizona State University and the University of Arizona. The foundation also offers a ten-week paid student internship at the <em>Arizona Republic</em> newspaper, partnering with the National Association of Hispanic Journalists.</p>

<p>To donate to the Pedro Gomez Foundation, visit the website at https://www.pedrogomezfoundation.org/. For more information, email the foundation at info@pedrogomezfoundation.org.</p>`,
        wordCount: 1450
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
