#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Check for command line arguments
const args = process.argv.slice(2);

if (args.length === 5) {
    // Direct mode: node add-media.js <id> <type> <caption> <src> <chapter>
    addMedia(args[0], args[1], args[2], args[3], args[4]);
} else if (args.length === 0) {
    // Interactive mode
    interactive();
} else {
    console.log('\nUsage:');
    console.log('  Interactive: node add-media.js');
    console.log('  Direct:      node add-media.js <id> <type> <caption> <src> <chapter>');
    console.log('\nExample:');
    console.log('  node add-media.js ch5-photo-1 photo "My caption" ./assets/photos/pic.jpg 5\n');
}

function addMedia(mediaId, type, caption, src, chapter) {
    // Read current media.js
    const mediaPath = path.join(__dirname, 'data', 'media.js');
    let mediaContent = fs.readFileSync(mediaPath, 'utf8');

    // Find MEDIA_CONTENT object end (look for }; after MEDIA_CONTENT but before getMediaById)
    const mediaContentStart = mediaContent.indexOf('export const MEDIA_CONTENT = {');
    const getMediaByIdStart = mediaContent.indexOf('export const getMediaById');

    if (mediaContentStart === -1 || getMediaByIdStart === -1) {
        console.log('\nError: Could not find MEDIA_CONTENT in media.js');
        return;
    }

    // Find the }; that closes MEDIA_CONTENT
    const searchSection = mediaContent.substring(mediaContentStart, getMediaByIdStart);
    const closingBrace = searchSection.lastIndexOf('};');
    const insertPoint = mediaContentStart + closingBrace;

    // Get icon based on type
    const iconMap = {
        'image': '📷',
        'photo': '📷',
        'video': '🎬',
        'audio': '⏺',
        'newspaper': '📰',
        'link': '🔗',
        'tweet': '🐦',
        'email': '✉️',
        'text': '💬'
    };
    const icon = iconMap[type] || '📷';

    // Find the last } before }; and add comma after it
    const beforeClose = mediaContent.substring(0, insertPoint);
    const lastBracePos = beforeClose.lastIndexOf('}');

    // Check if there's already a comma after that brace
    const afterBrace = beforeClose.substring(lastBracePos + 1).trim();
    const needsComma = afterBrace === '' || !afterBrace.startsWith(',');

    // Create new entry
    const newEntry = `    '${mediaId}': {
        type: '${type}',
        icon: '${icon}',
        label: '${type.charAt(0).toUpperCase() + type.slice(1)}',
        caption: '${caption.replace(/'/g, "\\'")}',
        src: '${src}',
        chapter: ${chapter},
        placeholder: false
    }`;

    // Build the new content
    let newContent;
    if (needsComma) {
        // Replace the last } with },
        newContent = mediaContent.substring(0, lastBracePos) + '},\n' + newEntry + '\n' + mediaContent.substring(insertPoint);
    } else {
        newContent = mediaContent.substring(0, insertPoint) + newEntry + '\n' + mediaContent.substring(insertPoint);
    }

    // Write updated media.js
    fs.writeFileSync(mediaPath, newContent);
    console.log('\n✓ Added to data/media.js');

    // Generate span code
    const spanCode = `<span class="media-icon" data-media-id="${mediaId}">${icon}</span>`;

    console.log('\n=== COPY THIS INTO CHAPTER ' + chapter + ' ===\n');
    console.log(spanCode);
    console.log('\n=====================================\n');
}

function interactive() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function ask(question) {
        return new Promise(resolve => rl.question(question, resolve));
    }

    async function run() {
        console.log('\n=== ADD NEW MEDIA ===\n');

        const mediaId = await ask('Media ID (e.g., ch5-photo-1): ');
        const type = await ask('Type (photo/newspaper/link/tweet/email/text/video/audio): ');
        const caption = await ask('Caption: ');
        const src = await ask('Source path (e.g., ./assets/photos/myimage.jpg): ');
        const chapter = await ask('Chapter number: ');

        rl.close();
        addMedia(mediaId, type, caption, src, chapter);
    }

    run();
}
