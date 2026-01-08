#!/usr/bin/env node
/**
 * Asset Scanner for OFF-THE-RECORD
 * Scans assets folders and compares against media.js
 *
 * Usage: node scripts/scan-assets.js
 */

const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '..', 'assets');
const MEDIA_FILE = path.join(__dirname, '..', 'data', 'media.js');

// File extensions to scan
const MEDIA_EXTENSIONS = {
    image: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
    audio: ['.mp3', '.m4a', '.wav', '.ogg'],
    video: ['.mp4', '.mov', '.webm']
};

// Emoji mapping by type
const TYPE_EMOJI = {
    image: '📷',
    audio: '🎵',
    video: '🎬'
};

// Folders to skip
const SKIP_FOLDERS = ['icons', 'credentials'];

// Get all media files from assets
function scanAssets() {
    const files = [];

    function scanDir(dir, relativePath = '') {
        const items = fs.readdirSync(dir);

        for (const item of items) {
            const fullPath = path.join(dir, item);
            const relPath = path.join(relativePath, item);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                // Skip certain folders
                if (!SKIP_FOLDERS.includes(item)) {
                    scanDir(fullPath, relPath);
                }
            } else {
                const ext = path.extname(item).toLowerCase();
                let type = null;

                for (const [t, exts] of Object.entries(MEDIA_EXTENSIONS)) {
                    if (exts.includes(ext)) {
                        type = t;
                        break;
                    }
                }

                if (type) {
                    files.push({
                        path: `./assets/${relPath}`,
                        name: item,
                        type,
                        folder: relativePath.split(path.sep)[0] || 'root'
                    });
                }
            }
        }
    }

    scanDir(ASSETS_DIR);
    return files;
}

// Parse existing media.js to get tracked files
function getTrackedMedia() {
    const content = fs.readFileSync(MEDIA_FILE, 'utf8');

    // Extract src paths from media.js
    const srcRegex = /src:\s*['"]([^'"]+)['"]/g;
    const tracked = new Set();
    let match;

    while ((match = srcRegex.exec(content)) !== null) {
        tracked.add(match[1]);
    }

    return tracked;
}

// Generate media entry for a file
function generateEntry(file, id) {
    const chapterMatch = file.folder.match(/^(\d+)/);
    const chapterNum = chapterMatch ? parseInt(chapterMatch[1]) : 1;

    return {
        id: `new_${id}`,
        icon: TYPE_EMOJI[file.type],
        chapter: chapterNum,
        status: '🔴',
        src: file.path,
        caption: file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')
    };
}

// Main
function main() {
    console.log('\n📂 ASSET SCANNER FOR OFF-THE-RECORD\n');
    console.log('='.repeat(50));

    // Scan assets
    const allFiles = scanAssets();
    console.log(`\nFound ${allFiles.length} media files in assets/\n`);

    // Get tracked media
    const tracked = getTrackedMedia();
    console.log(`Currently tracking ${tracked.size} files in media.js\n`);

    // Find untracked
    const untracked = allFiles.filter(f => !tracked.has(f.path));

    if (untracked.length === 0) {
        console.log('✅ All media files are tracked!\n');
        return;
    }

    console.log(`⚠️  Found ${untracked.length} UNTRACKED files:\n`);

    // Group by folder
    const byFolder = {};
    untracked.forEach(f => {
        if (!byFolder[f.folder]) byFolder[f.folder] = [];
        byFolder[f.folder].push(f);
    });

    for (const [folder, files] of Object.entries(byFolder)) {
        console.log(`\n📁 ${folder}/`);
        files.forEach(f => {
            console.log(`   ${TYPE_EMOJI[f.type]} ${f.name}`);
        });
    }

    // Generate entries
    console.log('\n' + '='.repeat(50));
    console.log('\n📝 GENERATED ENTRIES (copy to media.js):\n');

    const entries = untracked.map((f, i) => generateEntry(f, i + 1));

    entries.forEach(entry => {
        console.log(`{
    id: '${entry.id}',
    icon: '${entry.icon}',
    chapter: ${entry.chapter},
    status: '${entry.status}',
    src: '${entry.src}',
    caption: '${entry.caption}'
},`);
    });

    console.log('\n' + '='.repeat(50));
    console.log(`\n✨ ${untracked.length} entries generated. Copy them to data/media.js\n`);
}

main();
