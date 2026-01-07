// Media content for inline emojis throughout chapters
// Each media item can be referenced by ID in chapter text

export const MEDIA_CONTENT = {
    // Photos
    'fantasy-camp': {
        type: 'newspaper',
        emoji: '📰',
        label: 'Newspaper Clipping',
        caption: 'Fantasy Camp Story',
        src: './assets/ch24-fantasy-camp-story.jpg',
        placeholder: false
    },
    'july-2019': {
        type: 'photo',
        emoji: '📷',
        label: 'Photo',
        caption: 'July 31, 2019',
        src: './assets/ch26-trade-deadline-dugout.jpg',
        placeholder: false
    },
    'tale-of-tape': {
        type: 'photo',
        emoji: '📷',
        label: 'Photo',
        caption: 'Tale of the Tape: Fenech vs. Verlander',
        src: './assets/ch12-verlander-tale-of-tape.jpg',
        placeholder: false
    },
    'dombrowski-extension': {
        type: 'newspaper',
        emoji: '📰',
        label: 'Newspaper',
        caption: 'Detroit Free Press, August 4, 2015',
        src: './assets/ch08-dombrowski-extension.jpg',
        placeholder: false
    },
    'espn-bottomline': {
        type: 'photo',
        emoji: '📷',
        label: 'Photo',
        caption: 'ESPN BottomLine: Verlander incident',
        src: './assets/ch12-espn-bottomline.png',
        placeholder: false
    },
    'k-rod-stats': {
        type: 'link',
        emoji: '🔗',
        label: 'Baseball Reference',
        caption: 'Francisco Rodríguez Career Stats',
        url: 'https://www.baseball-reference.com/players/r/rodrifr03.shtml',
        placeholder: false
    },
    'photo-1': {
        type: 'photo',
        emoji: '📷',
        label: 'Photo',
        caption: 'Sparky Anderson in the Lakeland dugout, Spring Training 1987',
        src: null, // Placeholder - add actual image path later
        placeholder: true
    },
    'photo-2': {
        type: 'photo',
        emoji: '📸',
        label: 'Photo',
        caption: 'Lou Whitaker and Alan Trammell double play practice',
        src: null,
        placeholder: true
    },
    'selfie-1': {
        type: 'selfie',
        emoji: '🤳',
        label: 'Selfie',
        caption: 'Press box selfie before the big game',
        src: null,
        placeholder: true
    },

    // Videos
    'video-1': {
        type: 'video',
        emoji: '🎬',
        label: 'Video',
        caption: 'The perfect 6-4-3 double play, July 1988',
        src: null,
        placeholder: true
    },
    'tv-local-1': {
        type: 'tv-local',
        emoji: '📺',
        label: 'Local TV Clip',
        caption: 'Local news coverage of Fielder\'s 50th home run',
        src: null,
        placeholder: true
    },
    'tv-network-1': {
        type: 'tv-network',
        emoji: '📡',
        label: 'Network TV Clip',
        caption: 'ESPN highlights from the 1984 World Series',
        src: null,
        placeholder: true
    },

    // Audio
    'audio-1': {
        type: 'audio',
        emoji: '⏺',
        label: 'Audio Recording',
        caption: 'Post-game interview with Jack Morris',
        src: null,
        placeholder: true
    },
    'radio-1': {
        type: 'radio',
        emoji: '📻',
        label: 'Radio Interview',
        caption: 'WJR Sports Talk radio appearance, 1991',
        src: null,
        placeholder: true
    },
    'interview-1': {
        type: 'interview',
        emoji: '🎤',
        label: 'Interview Audio',
        caption: 'Off-the-record conversation with Trammell',
        src: null,
        placeholder: true
    },
    'phone-1': {
        type: 'phone',
        emoji: '📞',
        label: 'Phone Call',
        caption: 'Phone conversation with Tigers GM',
        src: null,
        placeholder: true
    },

    // Documents
    'notes-1': {
        type: 'notes',
        emoji: '📝',
        label: 'Notes',
        caption: 'Reporter\'s notebook from first day on the beat',
        content: 'Content coming soon - This will contain handwritten notes and observations from the press box.',
        placeholder: true
    },
    'newspaper-1': {
        type: 'newspaper',
        emoji: '📰',
        label: 'Newspaper Clipping',
        caption: 'Detroit Free Press front page, October 1984',
        src: null,
        placeholder: true
    },
    'newspaper-2': {
        type: 'newspaper',
        emoji: '🗞',
        label: 'Newspaper Article',
        caption: 'Original article about Sparky\'s retirement',
        src: null,
        placeholder: true
    },
    'receipt-1': {
        type: 'receipt',
        emoji: '🧾',
        label: 'Receipt/Document',
        caption: 'Press credentials from 1987 Spring Training',
        src: null,
        placeholder: true
    },
    'pdf-1': {
        type: 'pdf',
        emoji: '📄',
        label: 'PDF Document',
        caption: 'Official scorecard from memorable game',
        src: null,
        placeholder: true
    },
    'email-1': {
        type: 'email',
        emoji: '✉️',
        label: 'E-mail',
        caption: 'Email exchange with Tigers PR department',
        content: 'Content coming soon - Email correspondence about press access.',
        placeholder: true
    },
    'text-1': {
        type: 'text',
        emoji: '💬',
        label: 'Text Message',
        caption: 'Text conversation with source',
        src: null,
        placeholder: true
    },

    // Links
    'link-1': {
        type: 'link',
        emoji: '🔗',
        label: 'External Link',
        caption: 'Baseball Reference stats page',
        url: 'https://www.baseball-reference.com',
        placeholder: true
    },

    // Special/Meta
    'scoop-1': {
        type: 'scoop',
        emoji: '🍦',
        label: 'Exclusive Scoop',
        caption: 'The Story Behind the Trade',
        content: 'Content coming soon - Exclusive information about what really happened behind closed doors.',
        placeholder: true
    },
    'duck-1': {
        type: 'duck',
        emoji: '🦆',
        label: 'Easter Egg',
        caption: 'Inside joke from the press box',
        content: 'Content coming soon - You found the duck! This is an inside reference that only beat writers would understand.',
        placeholder: true
    },
    'award-1': {
        type: 'award',
        emoji: '🏆',
        label: 'Award/Honor',
        caption: 'Lou Whitaker\'s Silver Slugger Award, 1983',
        content: 'Content coming soon - Details about this achievement and what it meant.',
        placeholder: true
    },
    'skeleton-1': {
        type: 'skeleton',
        emoji: '💀',
        label: 'Buried Story',
        caption: 'The Story That Never Ran',
        content: 'Content coming soon - Sometimes the most interesting stories are the ones we can\'t tell... until now.',
        placeholder: true
    },
    'baseball-1': {
        type: 'baseball',
        emoji: '⚾',
        label: 'Baseball Stats',
        caption: 'Career statistics breakdown',
        content: 'Content coming soon - Statistical deep dive.',
        placeholder: true
    },
    'stats-1': {
        type: 'stats',
        emoji: '📊',
        label: 'Statistics',
        caption: 'Performance analytics',
        content: 'Content coming soon - Advanced metrics and analysis.',
        placeholder: true
    },
    'miss-1': {
        type: 'correction',
        emoji: '❌',
        label: 'Correction',
        caption: 'What I Got Wrong',
        content: 'Content coming soon - Even experienced reporters make mistakes. Here\'s what I missed.',
        placeholder: true
    },
    'exclamation-1': {
        type: 'important',
        emoji: '❗',
        label: 'Important Note',
        caption: 'Critical context',
        content: 'Content coming soon - Important information that adds crucial context.',
        placeholder: true
    },
    'question-1': {
        type: 'question',
        emoji: '❓',
        label: 'Unanswered Question',
        caption: 'What we still don\'t know',
        content: 'Content coming soon - Some questions never get answered.',
        placeholder: true
    }
};

// Helper function to get media by ID
export const getMediaById = (id) => {
    return MEDIA_CONTENT[id] || null;
};

// Helper function to get all media of a certain type
export const getMediaByType = (type) => {
    return Object.entries(MEDIA_CONTENT)
        .filter(([_, media]) => media.type === type)
        .map(([id, media]) => ({ id, ...media }));
};

// Media type definitions with their emoji mappings
export const MEDIA_TYPES = {
    photo: { emoji: '📷', label: 'Photo' },
    photo2: { emoji: '📸', label: 'Photo' },
    video: { emoji: '🎬', label: 'Video' },
    'tv-local': { emoji: '📺', label: 'Local TV' },
    'tv-network': { emoji: '📡', label: 'Network TV' },
    radio: { emoji: '📻', label: 'Radio' },
    audio: { emoji: '⏺', label: 'Audio Recording' },
    record: { emoji: '🔴', label: 'Recording' },
    interview: { emoji: '🎤', label: 'Interview' },
    mic: { emoji: '🎙', label: 'Microphone' },
    phone: { emoji: '📞', label: 'Phone Call' },
    mobile: { emoji: '📱', label: 'Mobile' },
    notes: { emoji: '📝', label: 'Notes' },
    newspaper: { emoji: '📰', label: 'Newspaper' },
    newspaper2: { emoji: '🗞', label: 'Newspaper' },
    receipt: { emoji: '🧾', label: 'Receipt' },
    pdf: { emoji: '📄', label: 'PDF Document' },
    attachment: { emoji: '📎', label: 'Attachment' },
    link: { emoji: '🔗', label: 'Link' },
    email: { emoji: '✉️', label: 'E-mail' },
    text: { emoji: '💬', label: 'Text Message' },
    selfie: { emoji: '🤳', label: 'Selfie' },
    scoop: { emoji: '🍦', label: 'Scoop' },
    duck: { emoji: '🦆', label: 'Duck' },
    award: { emoji: '🏆', label: 'Award' },
    skeleton: { emoji: '💀', label: 'Buried Story' },
    baseball: { emoji: '⚾', label: 'Baseball' },
    stats: { emoji: '📊', label: 'Statistics' },
    correction: { emoji: '❌', label: 'Correction' },
    important: { emoji: '❗', label: 'Important' },
    question: { emoji: '❓', label: 'Question' }
};
