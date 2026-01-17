#!/usr/bin/env node
/**
 * Extract original dates from media file metadata
 * Uses macOS mdls to get EXIF/metadata dates
 * 
 * Usage: node scripts/extract-dates.js
 * Output: data/media-dates.json
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ASSETS_DIR = path.join(__dirname, '..', 'assets');
const OUTPUT_FILE = path.join(__dirname, '..', 'data', 'media-dates.json');

// File extensions to scan
const MEDIA_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.mp4', '.mov', '.mp3', '.m4a', '.wav'];

// Folders to skip
const SKIP_FOLDERS = ['icons', 'credentials', 'credentials-md', 'credentials-sm'];

// Extract date from file using mdls
function getDateFromMetadata(filePath) {
    try {
        // Try kMDItemContentCreationDate first (when media was created/taken)
        let result = execSync(`mdls -name kMDItemContentCreationDate -raw "${filePath}" 2>/dev/null`, { encoding: 'utf8' }).trim();
        
        if (result && result !== '(null)') {
            // Format: 2020-07-15 14:30:00 +0000
            const dateMatch = result.match(/^(\d{4}-\d{2}-\d{2})/);
            if (dateMatch) return dateMatch[1];
        }

        // Try kMDItemDateTimeOriginal (EXIF date for photos)
        result = execSync(`mdls -name kMDItemDateTimeOriginal -raw "${filePath}" 2>/dev/null`, { encoding: 'utf8' }).trim();
        
        if (result && result !== '(null)') {
            const dateMatch = result.match(/^(\d{4}-\d{2}-\d{2})/);
            if (dateMatch) return dateMatch[1];
        }

        return null;
    } catch (e) {
        return null;
    }
}

// Scan all media files
function scanAssets() {
    const dates = {};
    let found = 0;
    let total = 0;

    function scanDir(dir, relativePath = '') {
        const items = fs.readdirSync(dir);

        for (const item of items) {
            const fullPath = path.join(dir, item);
            const relPath = relativePath ? `${relativePath}/${item}` : item;
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                if (!SKIP_FOLDERS.includes(item)) {
                    scanDir(fullPath, relPath);
                }
            } else {
                const ext = path.extname(item).toLowerCase();
                if (MEDIA_EXTENSIONS.includes(ext)) {
                    total++;
                    const assetPath = `./assets/${relPath}`;
                    const date = getDateFromMetadata(fullPath);
                    
                    if (date) {
                        dates[assetPath] = date;
                        found++;
                        console.log(`✓ ${relPath}: ${date}`);
                    } else {
                        console.log(`  ${relPath}: no date found`);
                    }
                }
            }
        }
    }

    console.log('\n📅 EXTRACTING METADATA DATES\n');
    console.log('='.repeat(50) + '\n');

    scanDir(ASSETS_DIR);

    console.log('\n' + '='.repeat(50));
    console.log(`\n✨ Found dates for ${found}/${total} files\n`);

    return dates;
}

// Main
function main() {
    const dates = scanAssets();
    
    // Write to JSON file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(dates, null, 2));
    console.log(`📝 Saved to: ${OUTPUT_FILE}\n`);
}

main();
