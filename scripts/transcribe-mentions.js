#!/usr/bin/env node
/**
 * Tweet Screenshot Transcriber
 *
 * Uses OCR to extract text from tweet screenshots
 * Outputs CSV for sorting/analysis
 *
 * Usage:
 *   node scripts/transcribe-mentions.js [input-folder]
 */

const Tesseract = require('tesseract.js');
const fs = require('fs');
const path = require('path');

const CONFIG = {
    inputDir: process.argv[2] || '/Volumes/easystore/OFF-THE-RECORD/notes/misc. notes/twitter/twitter mute',
    outputDir: path.join(__dirname, '..', 'assets', 'mentions')
};

const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

// Extract username from tweet text (looks for @username patterns)
function extractUsername(text) {
    // Look for patterns like "@username" or "username @handle"
    const matches = text.match(/@[\w]+/g);
    if (matches && matches.length > 0) {
        // Return the first @username that's not @anthonyfenech (that's the author being replied to)
        for (const match of matches) {
            if (match.toLowerCase() !== '@anthonyfenech' &&
                match.toLowerCase() !== '@freepsports' &&
                match.toLowerCase() !== '@jeffmossdsr') {
                return match;
            }
        }
        return matches[0];
    }
    return '';
}

// Extract date from text (looks for date patterns)
function extractDate(text) {
    // Look for patterns like "Feb 25, 2016" or "Dec 11, 2014"
    const dateMatch = text.match(/(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2},?\s+\d{4}/i);
    return dateMatch ? dateMatch[0] : '';
}

// Escape CSV field
function escapeCSV(field) {
    if (!field) return '';
    const str = String(field);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
}

async function transcribeImage(imagePath, filename) {
    try {
        const result = await Tesseract.recognize(imagePath, 'eng', {
            logger: () => {}
        });

        const text = result.data.text
            .replace(/\n+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

        const username = extractUsername(text);
        const date = extractDate(text);

        return {
            filename,
            username,
            date,
            text,
            confidence: Math.round(result.data.confidence)
        };
    } catch (error) {
        return {
            filename,
            username: '',
            date: '',
            text: '',
            confidence: 0,
            error: error.message
        };
    }
}

async function main() {
    console.log('\n=== TWEET TRANSCRIBER (CSV) ===\n');
    console.log(`Input:  ${CONFIG.inputDir}`);
    console.log(`Output: ${CONFIG.outputDir}\n`);

    if (!fs.existsSync(CONFIG.inputDir)) {
        console.error(`ERROR: Input directory not found: ${CONFIG.inputDir}`);
        process.exit(1);
    }

    if (!fs.existsSync(CONFIG.outputDir)) {
        fs.mkdirSync(CONFIG.outputDir, { recursive: true });
    }

    const files = fs.readdirSync(CONFIG.inputDir)
        .filter(f => SUPPORTED_FORMATS.includes(path.extname(f).toLowerCase()))
        .sort();

    console.log(`Found ${files.length} images to transcribe`);
    console.log(`Estimated time: ${Math.round(files.length * 3 / 60)} minutes\n`);

    const startTime = Date.now();
    const transcripts = [];
    let processed = 0;

    // CSV header
    const csvRows = ['filename,username,date,text,confidence'];

    for (const file of files) {
        const inputPath = path.join(CONFIG.inputDir, file);
        processed++;

        // Progress update every 10 images
        if (processed % 10 === 0 || processed === 1) {
            const elapsed = (Date.now() - startTime) / 1000;
            const rate = processed / elapsed;
            const remaining = Math.round((files.length - processed) / rate / 60);
            process.stdout.write(`\r[${processed}/${files.length}] ~${remaining} min remaining...`);
        }

        const result = await transcribeImage(inputPath, file);
        transcripts.push(result);

        // Add to CSV
        csvRows.push([
            escapeCSV(result.filename),
            escapeCSV(result.username),
            escapeCSV(result.date),
            escapeCSV(result.text),
            result.confidence
        ].join(','));
    }

    console.log('\n');

    // Save CSV
    const csvPath = path.join(CONFIG.outputDir, 'transcripts.csv');
    fs.writeFileSync(csvPath, csvRows.join('\n'));

    // Save JSON too for programmatic use
    const jsonPath = path.join(CONFIG.outputDir, 'transcripts.json');
    fs.writeFileSync(jsonPath, JSON.stringify({
        generated: new Date().toISOString(),
        total: transcripts.length,
        transcripts
    }, null, 2));

    // Quick analysis
    const usernames = {};
    transcripts.forEach(t => {
        if (t.username) {
            usernames[t.username] = (usernames[t.username] || 0) + 1;
        }
    });

    const topUsers = Object.entries(usernames)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    console.log('=== COMPLETE ===\n');
    console.log(`Transcribed: ${transcripts.length} images`);
    console.log(`CSV: ${csvPath}`);
    console.log(`JSON: ${jsonPath}`);

    console.log('\n=== TOP HARASSERS ===');
    topUsers.forEach(([user, count]) => {
        console.log(`  ${user}: ${count} tweets`);
    });

    const elapsed = Math.round((Date.now() - startTime) / 1000 / 60);
    console.log(`\nTotal time: ${elapsed} minutes`);
}

main().catch(console.error);
