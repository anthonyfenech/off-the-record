#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise(resolve => rl.question(question, resolve));
}

async function main() {
    console.log('\n=== ADD NEW MEDIA ===\n');

    const mediaId = await ask('Media ID (e.g., ch5-photo-1): ');
    const type = await ask('Type (image/video/audio): ');
    const caption = await ask('Caption: ');
    const src = await ask('Source path (e.g., ./assets/photos/myimage.jpg): ');

    // Read current media.js
    const mediaPath = path.join(__dirname, 'data', 'media.js');
    let mediaContent = fs.readFileSync(mediaPath, 'utf8');

    // Create new entry
    const newEntry = `    '${mediaId}': {
        type: '${type}',
        caption: '${caption.replace(/'/g, "\\'")}',
        src: '${src}'
    }`;

    // Find the closing of MEDIA_CONTENT object and insert before it
    const insertPoint = mediaContent.lastIndexOf('};');
    if (insertPoint === -1) {
        console.log('\nError: Could not find insertion point in media.js');
        rl.close();
        return;
    }

    // Check if we need a comma (if there are existing entries)
    const beforeInsert = mediaContent.substring(0, insertPoint).trim();
    const needsComma = beforeInsert.endsWith('}') || beforeInsert.endsWith("'");

    const insertion = needsComma ? `,\n${newEntry}` : newEntry;
    mediaContent = mediaContent.substring(0, insertPoint) + insertion + '\n' + mediaContent.substring(insertPoint);

    // Write updated media.js
    fs.writeFileSync(mediaPath, mediaContent);
    console.log('\n✓ Added to data/media.js');

    // Generate span code
    const spanCode = `<span class="media-emoji" data-media-id="${mediaId}">📷</span>`;

    console.log('\n=== COPY THIS INTO YOUR CHAPTER ===\n');
    console.log(spanCode);
    console.log('\n===================================\n');

    rl.close();
}

main();
