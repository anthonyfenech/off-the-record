// SIMPLE SLOT-BASED BUTTON SYSTEM
// Each message has a rank from 1-1000
// Rank 1 = Most likely to appear
// Rank 1000 = Least likely to appear
// PLUG AND PLAY - Just change the numbers!

// ============================================
// ALL MESSAGES IN ONE PLACE
// ============================================

const BUTTON_MESSAGES = [

    // ============================================
    // ULTRA COMMON (Rank 1-50)
    // These appear all the time
    // ============================================

    { text: "CONTINUE READING", rank: 1 },
    { text: "KEEP GOING", rank: 2 },
    { text: "NEXT CHAPTER", rank: 3 },
    { text: "TURN THE PAGE", rank: 4 },
    { text: "READ MORE", rank: 5 },
    { text: "LET'S GO", rank: 6 },
    { text: "ONWARD", rank: 7 },
    { text: "KEEP IT MOVING", rank: 8 },
    { text: "WHAT'S NEXT", rank: 9 },
    { text: "MORE PLEASE", rank: 10 },
    { text: "GIMME MORE", rank: 11 },
    { text: "YOU GOT THIS", rank: 12 },
    { text: "DON'T STOP NOW", rank: 13 },
    { text: "HERE WE GO", rank: 14 },
    { text: "BUCKLE UP", rank: 15 },
    { text: "HOLD ON", rank: 16 },
    { text: "GET THIS", rank: 17 },
    { text: "LISTEN TO THIS", rank: 18 },
    { text: "CHECK IT OUT", rank: 19 },
    { text: "REAL TALK", rank: 20 },
    { text: "NO CAP", rank: 21 },
    { text: "SO ANYWAY", rank: 22 },
    { text: "ALRIGHT LET'S DO THIS", rank: 23 },
    { text: "TIME TO GET INTO IT", rank: 24 },
    { text: "STRAP IN", rank: 25 },
    { text: "READY?", rank: 26 },
    { text: "GO", rank: 27 },
    { text: "MORE", rank: 28 },
    { text: "NEXT", rank: 29 },
    { text: "BOOM", rank: 30 },
    { text: "READ", rank: 31 },
    { text: "PROCEED", rank: 32 },
    { text: "ADVANCE", rank: 33 },
    { text: "FINISH WHAT YOU STARTED", rank: 34 },
    { text: "SEE IT THROUGH", rank: 35 },
    { text: "LOCKED IN", rank: 36 },
    { text: "ALL IN", rank: 37 },
    { text: "COMMITTED", rank: 38 },
    { text: "YOUR MOVE", rank: 39 },
    { text: "STAY WITH ME", rank: 40 },
    { text: "FOCUS", rank: 41 },
    { text: "ZONE IN", rank: 42 },
    { text: "RIGHT HERE RIGHT NOW", rank: 43 },
    { text: "THIS MOMENT", rank: 44 },
    { text: "SEIZE THE MOMENT", rank: 45 },
    { text: "KEEP THE FAITH", rank: 46 },
    { text: "KEEP IT 100", rank: 47 },
    { text: "NO FILTER", rank: 48 },
    { text: "RAW", rank: 49 },
    { text: "THE JOURNEY CONTINUES", rank: 50 },

    // ============================================
    // COMMON (Rank 51-200)
    // Appear frequently
    // ============================================

    { text: "THE PLOT THICKENS", rank: 51 },
    { text: "WHAT HAPPENED NEXT", rank: 52 },
    { text: "SPILL THE TEA", rank: 53 },
    { text: "OFF THE RECORD", rank: 54 },
    { text: "BEHIND THE SCENES", rank: 55 },
    { text: "WHAT REALLY HAPPENED", rank: 56 },
    { text: "THE UNTOLD STORY", rank: 57 },
    { text: "DON'T MISS THIS", rank: 58 },
    { text: "YOU NEED TO SEE THIS", rank: 59 },
    { text: "PICTURE THIS", rank: 60 },
    { text: "YOU GOTTA HEAR THIS", rank: 61 },
    { text: "YO LISTEN", rank: 62 },
    { text: "STORY TIME", rank: 63 },
    { text: "NO TURNING BACK NOW", rank: 64 },
    { text: "RIDE OR DIE", rank: 65 },
    { text: "DECISION TIME", rank: 66 },
    { text: "WHENEVER YOU'RE READY", rank: 67 },
    { text: "STILL HERE", rank: 68 },
    { text: "HELLO", rank: 69 },
    { text: "EARTH TO READER", rank: 70 },

    // Baseball references (71-100)
    { text: "NEXT INNING", rank: 71 },
    { text: "PLAY BALL", rank: 72 },
    { text: "STEP UP TO THE PLATE", rank: 73 },
    { text: "SWING AWAY", rank: 74 },
    { text: "STEAL HOME", rank: 75 },
    { text: "GRAND SLAM", rank: 76 },
    { text: "BOTTOM OF THE NINTH", rank: 77 },
    { text: "EXTRA INNINGS", rank: 78 },
    { text: "GAME TIME", rank: 79 },
    { text: "FIRST PITCH", rank: 80 },
    { text: "CRUNCH TIME", rank: 81 },
    { text: "CLUTCH MOMENT", rank: 82 },
    { text: "BIG SPOT", rank: 83 },
    { text: "HIGH LEVERAGE", rank: 84 },
    { text: "PRESSURE SITUATION", rank: 85 },

    // Detroit vibes (86-110)
    { text: "MOTOR CITY HUSTLE", rank: 86 },
    { text: "313 ENERGY", rank: 87 },
    { text: "DETROIT VS EVERYBODY", rank: 88 },
    { text: "KEEP GRINDING", rank: 89 },
    { text: "NO DAYS OFF", rank: 90 },
    { text: "RUST BELT RESILIENCE", rank: 91 },

    // Add more common messages here up to rank 200...
    { text: "IMMERSE YOURSELF", rank: 100 },
    { text: "GET LOST IN IT", rank: 110 },
    { text: "ESCAPE", rank: 120 },
    { text: "YOLO THE PAGE", rank: 130 },
    { text: "TURN IT UP", rank: 140 },
    { text: "MAX IT OUT", rank: 150 },
    { text: "PUSH THE LIMITS", rank: 160 },
    { text: "SURPRISE YOURSELF", rank: 170 },
    { text: "ROLL THE DICE", rank: 180 },
    { text: "DIVE DEEP", rank: 190 },
    { text: "NO HALF MEASURES", rank: 200 },

    // ============================================
    // UNCOMMON (Rank 201-500)
    // Appear occasionally
    // ============================================

    { text: "BET YOU WON'T", rank: 201 },
    { text: "I DARE YOU", rank: 202 },
    { text: "WHAT ARE YOU WAITING FOR", rank: 203 },
    { text: "IT GETS DEEPER", rank: 204 },
    { text: "BRACE FOR IMPACT", rank: 205 },
    { text: "YOU'RE CRUSHING IT", rank: 206 },
    { text: "LOOK AT YOU GO", rank: 207 },
    { text: "ON A ROLL", rank: 208 },
    { text: "DOWN THE RABBIT HOLE", rank: 209 },
    { text: "WANT TO KNOW WHAT HAPPENED?", rank: 210 },
    { text: "CAN YOU HANDLE IT?", rank: 220 },
    { text: "TWIST MY ARM", rank: 230 },
    { text: "IF YOU INSIST", rank: 240 },
    { text: "I KNOW YOU'RE HOOKED", rank: 250 },
    { text: "YOU CAN'T STOP NOW", rank: 260 },
    { text: "ADMIT IT, YOU'RE CURIOUS", rank: 270 },
    { text: "TOLD YOU IT WAS GOOD", rank: 280 },
    { text: "SEE WHAT I MEAN", rank: 290 },
    { text: "JUST ONE MORE", rank: 300 },

    // Progress-specific (301-400)
    { text: "WELCOME TO THE SHOW", rank: 301, chapters: [1, 2, 3, 4] },
    { text: "LET'S GET INTO IT", rank: 302, chapters: [1, 2, 3, 4] },
    { text: "THIS IS JUST THE BEGINNING", rank: 303, chapters: [1, 2, 3, 4] },
    { text: "GETTING GOOD NOW", rank: 304, chapters: [5, 6, 7, 8, 9] },
    { text: "IT'S BUILDING", rank: 305, chapters: [5, 6, 7, 8, 9] },
    { text: "HALFWAY THERE", rank: 306, chapters: [10, 11, 12, 13, 14, 15] },
    { text: "NO TURNING BACK NOW", rank: 307, chapters: [10, 11, 12, 13, 14, 15] },
    { text: "IN THE THICK OF IT", rank: 308, chapters: [10, 11, 12, 13, 14, 15] },
    { text: "SHIT GETS REAL", rank: 309, chapters: [16, 17, 18, 19, 20] },
    { text: "HOLD ON TIGHT", rank: 310, chapters: [16, 17, 18, 19, 20] },
    { text: "BRACE YOURSELF", rank: 311, chapters: [16, 17, 18, 19, 20] },
    { text: "I KNOW RIGHT? YOU DON'T WANT IT TO END", rank: 312, chapters: [21, 22, 23, 24, 25] },
    { text: "BUT IT HAS TO", rank: 313, chapters: [21, 22, 23, 24, 25] },
    { text: "SAVOR THIS", rank: 314, chapters: [21, 22, 23, 24, 25] },
    { text: "ALMOST THERE", rank: 315, chapters: [26, 27, 28, 29, 30] },
    { text: "FINAL CHAPTERS", rank: 316, chapters: [26, 27, 28, 29, 30] },
    { text: "CLOSING TIME", rank: 317, chapters: [26, 27, 28, 29, 30] },
    { text: "THIS IS IT", rank: 318, chapters: [31, 32] },
    { text: "THE END", rank: 319, chapters: [31, 32] },
    { text: "IT'S OVER... OR IS IT?", rank: 320, chapters: [31, 32] },

    // ============================================
    // RARE (Rank 501-800)
    // Appear rarely
    // ============================================

    { text: "THE VERLANDER CHAPTER AWAITS", rank: 501, chapters: [1, 2, 3] },
    { text: "CLUBHOUSE DRAMA AHEAD", rank: 502 },
    { text: "PR NIGHTMARE INCOMING", rank: 503 },
    { text: "SOURCE TEXTS COMING", rank: 504 },
    { text: "FRONT OFFICE CHAOS", rank: 505 },
    { text: "RESPECTFULLY, CONTINUE", rank: 510 },
    { text: "PLEASE AND THANK YOU", rank: 520 },
    { text: "WELL ALRIGHT THEN", rank: 530 },
    { text: "DON'T MIND IF I DO", rank: 540 },
    { text: "OKAY FINE", rank: 550 },
    { text: "YOU TALKED ME INTO IT", rank: 560 },
    { text: "WHAT THEY DON'T WANT YOU TO KNOW", rank: 570 },
    { text: "CLASSIFIED", rank: 580 },
    { text: "EYES ONLY", rank: 590 },
    { text: "BETWEEN YOU AND ME", rank: 600 },
    { text: "THIS STAYS BETWEEN US", rank: 610 },
    { text: "OFF THE BOOKS", rank: 620 },

    // Chain messages (701-750)
    { text: "SO HERE'S THE THING...", rank: 701, chain: "reveal", position: 1 },
    { text: "IT GETS WORSE...", rank: 702, chain: "reveal", position: 2 },
    { text: "WAIT FOR IT...", rank: 703, chain: "reveal", position: 3 },
    { text: "TOLD YOU IT WAS BAD", rank: 704, chain: "reveal", position: 4 },

    { text: "OKAY SO LISTEN", rank: 710, chain: "hype", position: 1 },
    { text: "THIS IS IMPORTANT", rank: 711, chain: "hype", position: 2 },
    { text: "PAY ATTENTION", rank: 712, chain: "hype", position: 3 },
    { text: "HERE WE GO", rank: 713, chain: "hype", position: 4 },

    { text: "UH OH", rank: 720, chain: "dread", position: 1 },
    { text: "THIS ISN'T GOOD", rank: 721, chain: "dread", position: 2 },
    { text: "IT'S GETTING WORSE", rank: 722, chain: "dread", position: 3 },
    { text: "OH COME ON", rank: 723, chain: "dread", position: 4 },

    { text: "SO ABOUT VERLANDER...", rank: 730, chain: "verlander", position: 1, chapters: [2] },
    { text: "YEAH, THAT VERLANDER", rank: 731, chain: "verlander", position: 2, chapters: [2, 3] },
    { text: "THE INTERVIEW", rank: 732, chain: "verlander", position: 3, chapters: [2, 3, 4] },
    { text: "YOU'LL SEE", rank: 733, chain: "verlander", position: 4, chapters: [2, 3, 4, 5] },

    // ============================================
    // SUPER RARE (Rank 801-950)
    // Almost never appear
    // ============================================

    { text: "THEY DON'T WANT YOU TO READ THIS", rank: 801 },
    { text: "CONTROVERSIAL OPINION INCOMING", rank: 810 },
    { text: "THIS PART GOT ME IN TROUBLE", rank: 820 },
    { text: "MY EDITOR HATED THIS CHAPTER", rank: 830 },
    { text: "I PROBABLY SHOULDN'T SAY THIS", rank: 840 },
    { text: "DELETE THIS LATER", rank: 850 },
    { text: "SHHH DON'T TELL ANYONE", rank: 860 },
    { text: "THIS IS THE PART THEY TRIED TO CUT", rank: 870 },
    { text: "OOPS DID I SAY THAT OUT LOUD", rank: 880 },
    { text: "NO COMMENT", rank: 890 },
    { text: "ALLEGEDLY", rank: 900 },
    { text: "IN MY OPINION", rank: 910 },
    { text: "SOURCES SAY", rank: 920 },
    { text: "UNCONFIRMED REPORTS", rank: 930 },
    { text: "BREAKING NEWS", rank: 940 },
    { text: "EXCLUSIVE COVERAGE", rank: 950 },

    // ============================================
    // LEGENDARY (Rank 951-999)
    // People will never see these (probably)
    // ============================================

    { text: "MIGGY CABRERA SAYS KEEP READING", rank: 951 },
    { text: "VERLANDER IS WATCHING", rank: 960 },
    { text: "THE GHOST OF SPARKY ANDERSON APPROVES", rank: 970 },
    { text: "AL KALINE WOULD BE PROUD", rank: 975 },
    { text: "DETROIT VS EVERYBODY (INCLUDING YOU)", rank: 980 },
    { text: "THIS HAPPENS 1 IN 1000 TIMES", rank: 985 },
    { text: "YOU'RE THE CHOSEN ONE", rank: 990 },
    { text: "SCREENSHOT THIS IMMEDIATELY", rank: 995 },
    { text: "NOBODY WILL BELIEVE YOU", rank: 998 },
    { text: "YOU JUST WON THE BUTTON LOTTERY", rank: 999 },

    // ============================================
    // MYTHICAL (Rank 1000)
    // The rarest of the rare
    // ============================================

    { text: "ANTHONY FENECH IS WATCHING YOU READ", rank: 1000 }
];

// ============================================
// WEIGHTED RANDOM SELECTION
// ============================================

class SlotBasedButtonSystem {
    constructor() {
        this.currentChain = null;
        this.chainPosition = 0;
        this.loadChainState();
    }

    loadChainState() {
        const saved = sessionStorage.getItem('buttonChainState');
        if (saved) {
            const state = JSON.parse(saved);
            this.currentChain = state.chainId;
            this.chainPosition = state.position;
        }
    }

    saveChainState(chainId, position) {
        sessionStorage.setItem('buttonChainState', JSON.stringify({
            chainId: chainId,
            position: position
        }));
    }

    clearChainState() {
        this.currentChain = null;
        this.chainPosition = 0;
        sessionStorage.removeItem('buttonChainState');
    }

    getCurrentChapter() {
        return window.navigation?.currentChapter || 1;
    }

    getEligibleMessages() {
        const currentChapter = this.getCurrentChapter();

        // Filter messages that match current chapter (if specified)
        return BUTTON_MESSAGES.filter(msg => {
            if (msg.chapters && !msg.chapters.includes(currentChapter)) {
                return false;
            }
            return true;
        });
    }

    getChainMessage() {
        // Check if we're in a chain
        if (this.currentChain && this.chainPosition > 0) {
            const chainMessages = BUTTON_MESSAGES.filter(
                msg => msg.chain === this.currentChain && msg.position === this.chainPosition
            );

            if (chainMessages.length > 0) {
                const message = chainMessages[0];
                this.chainPosition++;

                // Check if there's a next message in chain
                const hasNext = BUTTON_MESSAGES.some(
                    msg => msg.chain === this.currentChain && msg.position === this.chainPosition
                );

                if (hasNext) {
                    this.saveChainState(this.currentChain, this.chainPosition);
                } else {
                    // Chain complete
                    this.clearChainState();
                }

                console.log(`🎬 Chain message: "${message.text}" (${message.position})`);
                return message.text;
            } else {
                // Chain ended
                this.clearChainState();
            }
        }

        // Check if we should start a new chain (5% chance)
        if (Math.random() < 0.05) {
            const currentChapter = this.getCurrentChapter();
            const chainStarters = BUTTON_MESSAGES.filter(msg => {
                if (!msg.chain || msg.position !== 1) return false;
                if (msg.chapters && !msg.chapters.includes(currentChapter)) return false;
                return true;
            });

            if (chainStarters.length > 0) {
                // Weighted selection among chain starters
                const selected = this.weightedRandomSelect(chainStarters);
                this.currentChain = selected.chain;
                this.chainPosition = 2; // Next message will be position 2
                this.saveChainState(this.currentChain, this.chainPosition);
                console.log(`🎬 Chain started: "${selected.text}" (${selected.chain})`);
                return selected.text;
            }
        }

        return null;
    }

    weightedRandomSelect(messages) {
        // Convert rank to weight: lower rank = higher weight
        // Rank 1 → weight 1000
        // Rank 1000 → weight 1
        const messagesWithWeights = messages.map(msg => ({
            ...msg,
            weight: 1001 - msg.rank
        }));

        // Calculate total weight
        const totalWeight = messagesWithWeights.reduce((sum, msg) => sum + msg.weight, 0);

        // Random selection
        let random = Math.random() * totalWeight;

        for (const msg of messagesWithWeights) {
            random -= msg.weight;
            if (random <= 0) {
                return msg;
            }
        }

        // Fallback
        return messagesWithWeights[0];
    }

    getMessage() {
        // Priority 1: Check for chain messages
        const chainMsg = this.getChainMessage();
        if (chainMsg) return chainMsg;

        // Priority 2: Weighted random from eligible messages
        const eligible = this.getEligibleMessages().filter(msg => !msg.chain);
        const selected = this.weightedRandomSelect(eligible);

        console.log(`🎲 Message: "${selected.text}" (rank ${selected.rank})`);
        return selected.text;
    }
}

// ============================================
// EXPORT
// ============================================

const buttonSystem = new SlotBasedButtonSystem();

function getRandomButtonMessage() {
    return buttonSystem.getMessage();
}

window.getRandomButtonMessage = getRandomButtonMessage;
window.buttonSystem = buttonSystem;

// Debug helpers
window.debugButtons = {
    // Show message by rank
    showRank: (rank) => {
        return BUTTON_MESSAGES.filter(m => m.rank === rank);
    },
    // Show all messages in rank range
    showRange: (minRank, maxRank) => {
        return BUTTON_MESSAGES.filter(m => m.rank >= minRank && m.rank <= maxRank)
            .sort((a, b) => a.rank - b.rank);
    },
    // Show current chain state
    getChainState: () => ({
        chain: buttonSystem.currentChain,
        position: buttonSystem.chainPosition
    }),
    // Force start a chain
    startChain: (chainId) => {
        buttonSystem.currentChain = chainId;
        buttonSystem.chainPosition = 1;
        buttonSystem.saveChainState(chainId, 1);
    },
    // Clear chain
    clearChain: () => buttonSystem.clearChainState(),
    // Count messages by rarity
    countByRarity: () => {
        return {
            ultraCommon: BUTTON_MESSAGES.filter(m => m.rank <= 50).length,
            common: BUTTON_MESSAGES.filter(m => m.rank > 50 && m.rank <= 200).length,
            uncommon: BUTTON_MESSAGES.filter(m => m.rank > 200 && m.rank <= 500).length,
            rare: BUTTON_MESSAGES.filter(m => m.rank > 500 && m.rank <= 800).length,
            superRare: BUTTON_MESSAGES.filter(m => m.rank > 800 && m.rank <= 950).length,
            legendary: BUTTON_MESSAGES.filter(m => m.rank > 950 && m.rank <= 999).length,
            mythical: BUTTON_MESSAGES.filter(m => m.rank === 1000).length
        };
    }
};
