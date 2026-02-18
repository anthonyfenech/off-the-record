export const PROMPTS = [
  {
    "id": "verlander-eclipse",
    "status": "active",
    "name": "Verlander Eclipse Confrontation",
    "chapter": 16,
    "triggerElement": "verlander-eclipse-scene",
    "title": "WHAT WOULD YOU DO?",
    "setup": "You just tweeted about Verlander's private conversation with Al Kaline about the solar eclipse. A PR official tells you 'JV didn't like your tweets.' Now Verlander is walking toward you in the dugout, visibly angry.",
    "question": "What would you do?",
    "type": "multiple-choice",
    "choices": [
      {
        "id": "A",
        "text": "Apologize and back off"
      },
      {
        "id": "B",
        "text": "Stand your ground"
      },
      {
        "id": "C",
        "text": "Double down on the story"
      }
    ],
    "answer": "B",
    "answerText": "Stand your ground",
    "outcome": "Verlander exploded. 'Unprofessional? You know what's unprofessional? Do you know who that was? That's Al Kaline, a baseball legend!' He walked to the pitchers' stretching circle, shaking his head and waving his glove. He told the other pitchers how I hijacked his private conversation with Mr. Tiger."
  },
  {
    "id": "vmart-hospital-text",
    "status": "active",
    "name": "V-Mart Hospital Text",
    "chapter": 16,
    "triggerElement": "vmart-hospital-scene",
    "title": "WHAT DO YOU TEXT BACK?",
    "setup": "August 27, 2017, 11:30 PM. Your explosive Victor Martinez clubhouse story publishes at 1 AM. Brad Ausmus just texted: 'U might want to hold off on ur story.' He says the timing might not be great. You have 90 minutes.",
    "question": "What do you text Ausmus?",
    "type": "creative-text",
    "maxLength": 280,
    "placeholder": "Type your text...",
    "answer": "What the fuck, man?",
    "outcome": "You texted back in a panic. Ausmus revealed V-Mart was hospitalized with heart issues. The story was killed. Disaster averted.\n\n(REPORTER'S NOTE: Fenech never independently confirmed Martinez actually went to the hospital that night. The timing could seem 'exceptionally coincidental.')"
  },
  {
    "id": "verlander-trade",
    "status": "active",
    "name": "Verlander Trade Tweet",
    "chapter": 17,
    "triggerElement": "verlander-trade-scene",
    "title": "TWEET THE SCOOP",
    "setup": "Your source just confirmed it. The biggest scoop of your career. Justin Verlander traded to Houston. The clock is ticking. Other reporters are getting the same tip. What do you tweet?",
    "question": "Write your tweet (280 characters max):",
    "type": "creative-text",
    "maxLength": 280,
    "placeholder": "Type your tweet here...",
    "answer": "The Tigers have traded Justin Verlander to the Astros, I'm told.",
    "outcome": "Simple. Clean. Perfect. The scoop of a lifetime, and I got it first."
  },
  {
    "id": "astros-clubhouse",
    "status": "active",
    "name": "Astros Clubhouse Decision",
    "chapter": 26,
    "triggerElement": "astros-clubhouse-scene",
    "title": "SHOULD I GO INTO THE ASTROS CLUBHOUSE?",
    "setup": "Day after the Verlander Incident. He called you unethical. ESPN ran the story. The Astros might bar you again. But MLB rules say you have access. Three security guards are standing in the way.",
    "question": "Should I go into the Astros clubhouse?",
    "type": "multiple-choice",
    "choices": [
      {
        "id": "A",
        "text": "No, lay low for now"
      },
      {
        "id": "B",
        "text": "Yes, it's my right"
      },
      {
        "id": "C",
        "text": "Of course—I'm the Bad Boy of Ball Writing"
      }
    ],
    "answer": "C",
    "answerText": "Of course—I'm the Bad Boy of Ball Writing",
    "outcome": "No security guard triple-team today. The Bad Boy of Ball Writing is back. My every move is watched inside the Astros' clubhouse. Of course, I needed to stay off my phone. Nothing good to see there at the moment: 'Y'all are nothing but leeches… You are a true dipshit… Fenech is garbage. Good for JV.'"
  },
  {
    "id": "quit-job",
    "status": "active",
    "name": "Pizza Resignation",
    "chapter": 28,
    "triggerElement": "pizza-decision-scene",
    "title": "HOW SHOULD I QUIT MY JOB?",
    "setup": "You've been frozen out, humiliated, pushed to the breaking point. You've made your decision to leave. On your notepad: Jet's Pizza number, Comerica Park address, Ron Colangelo's phone number.",
    "question": "How should I quit my job?",
    "type": "multiple-choice",
    "choices": [
      {
        "id": "A",
        "text": "Email a resignation letter"
      },
      {
        "id": "B",
        "text": "Call the boss directly"
      },
      {
        "id": "C",
        "text": "Send the Tigers a pizza"
      }
    ],
    "answer": "C",
    "answerText": "Send the Tigers a pizza",
    "outcome": "I ordered two large pizzas, cheese bread, a two-liter of Coke, and left Ron Colangelo's phone number as the main contact. Colangelo's office phone rang. This became viral career suicide."
  }
];