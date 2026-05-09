/**
 * OTR Reader Name Generator
 * Generates memorable reader personas like "Crimson Phoenix"
 * Persists across sessions via localStorage
 */
(function() {
    'use strict';

    const STORAGE_KEY = 'otr_reader_name';

    const ADJECTIVES = [
        // Colors
        'Crimson', 'Azure', 'Golden', 'Silver', 'Emerald', 'Violet', 'Scarlet', 'Ivory',
        'Obsidian', 'Amber', 'Cobalt', 'Copper', 'Jade', 'Onyx', 'Pearl', 'Ruby',
        // Qualities
        'Silent', 'Swift', 'Clever', 'Wandering', 'Midnight', 'Distant', 'Hidden', 'Restless',
        'Curious', 'Gentle', 'Bold', 'Quiet', 'Lone', 'Drifting', 'Shadowed', 'Burning',
        // Nature
        'Autumn', 'Winter', 'Coastal', 'Mountain', 'Northern', 'Southern', 'Eastern', 'Western',
        'Starlit', 'Moonlit', 'Foggy', 'Stormy', 'Frosty', 'Dusty', 'Twilight', 'Dawn'
    ];

    const NOUNS = [
        // Birds
        'Phoenix', 'Raven', 'Sparrow', 'Falcon', 'Owl', 'Hawk', 'Crow', 'Wren',
        'Heron', 'Dove', 'Finch', 'Lark', 'Robin', 'Swan', 'Crane', 'Jay',
        // Animals
        'Wolf', 'Fox', 'Bear', 'Deer', 'Hare', 'Lynx', 'Otter', 'Badger',
        'Stag', 'Panther', 'Tiger', 'Lion', 'Serpent', 'Moth', 'Beetle', 'Spider',
        // Objects/Abstract
        'Wanderer', 'Traveler', 'Stranger', 'Pilgrim', 'Nomad', 'Drifter', 'Seeker', 'Watcher',
        'Reader', 'Dreamer', 'Keeper', 'Shadow', 'Ghost', 'Specter', 'Phantom', 'Spirit'
    ];

    function generateName() {
        const adjIndex = Math.floor(Math.random() * ADJECTIVES.length);
        const nounIndex = Math.floor(Math.random() * NOUNS.length);
        return ADJECTIVES[adjIndex] + ' ' + NOUNS[nounIndex];
    }

    function getOrCreateReaderName() {
        try {
            let name = localStorage.getItem(STORAGE_KEY);
            if (!name) {
                name = generateName();
                localStorage.setItem(STORAGE_KEY, name);
            }
            return name;
        } catch (e) {
            // localStorage not available, generate ephemeral name
            return generateName();
        }
    }

    function resetReaderName() {
        try {
            const newName = generateName();
            localStorage.setItem(STORAGE_KEY, newName);
            window.OTR_READER_NAME = newName;
            return newName;
        } catch (e) {
            return generateName();
        }
    }

    // Initialize and expose globally
    var readerName = getOrCreateReaderName();
    window.OTR_READER_NAME = readerName;
    window.OTR_RESET_READER_NAME = resetReaderName;

    // Log for debugging

})();
