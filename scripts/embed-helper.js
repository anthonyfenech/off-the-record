#!/usr/bin/env node
/**
 * EMBED HELPER - Find where to place unembedded media
 *
 * Usage: node scripts/embed-helper.js <media-id>
 * Example: node scripts/embed-helper.js pepper-voicemail
 */

const fs = require('fs');
const path = require('path');

const CHAPTERS_PATH = path.join(__dirname, '../data/chapters.js');
const MEDIA_PATH = path.join(__dirname, '../data/media.js');

// Get media ID from command line
const mediaId = process.argv[2];

if (!mediaId) {
    console.log('\n📋 UNEMBEDDED MEDIA LIST:\n');
    showUnembeddedList();
    console.log('\nUsage: node scripts/embed-helper.js <media-id>');
    console.log('Example: node scripts/embed-helper.js pepper-voicemail\n');
    process.exit(0);
}

// Load files
const chapters = fs.readFileSync(CHAPTERS_PATH, 'utf8');
const media = fs.readFileSync(MEDIA_PATH, 'utf8');

// Find media info
const mediaRegex = new RegExp(`'${mediaId}':\\s*\\{([^}]+)\\}`, 's');
const mediaMatch = media.match(mediaRegex);

if (!mediaMatch) {
    console.log(`\n❌ Media ID '${mediaId}' not found in media.js\n`);
    process.exit(1);
}

// Parse media info
const block = mediaMatch[1];
const type = block.match(/type:\s*'([^']+)'/)?.[1] || 'photo';
const caption = block.match(/caption:\s*'([^']+)'/)?.[1] || '';
const emoji = block.match(/emoji:\s*'([^']+)'/)?.[1] || '📷';
const src = block.match(/src:\s*'([^']+)'/)?.[1] || '';

// Extract chapter from src path
const chapterMatch = src.match(/assets\/(\d+)-([^/]+)/);
const chapterNum = chapterMatch ? chapterMatch[1] : null;
const chapterName = chapterMatch ? chapterMatch[2] : null;

console.log('\n═══════════════════════════════════════════════════════════════════');
console.log('EMBED HELPER');
console.log('═══════════════════════════════════════════════════════════════════\n');

console.log(`Media ID: ${mediaId}`);
console.log(`Type: ${type}`);
console.log(`Caption: "${caption}"`);
console.log(`Chapter: ${chapterNum}-${chapterName}`);
console.log(`File: ${src.split('/').pop()}`);

console.log('\n📋 EMBED CODE (copy this):');
console.log('─'.repeat(60));
console.log(`<span class="media-emoji" data-media-id="${mediaId}">${emoji}</span>`);
console.log('─'.repeat(60));

// Search for keywords in the chapter
console.log('\n🔍 SEARCHING FOR PLACEMENT HINTS...\n');

// Extract keywords from media ID and caption
const keywords = extractKeywords(mediaId, caption);
console.log(`Keywords: ${keywords.join(', ')}\n`);

// Find the chapter content
const chapterContentRegex = new RegExp(`id:\\s*${chapterNum},\\s*[^]*?content:\\s*\`([^\`]+)\``, 's');
const chapterContent = chapters.match(chapterContentRegex);

if (chapterContent) {
    const content = chapterContent[1];
    const lines = content.split('\n');

    // Search for keyword matches
    let matches = [];
    lines.forEach((line, idx) => {
        const lowerLine = line.toLowerCase();
        keywords.forEach(keyword => {
            if (lowerLine.includes(keyword.toLowerCase()) && keyword.length > 2) {
                matches.push({ line: idx + 1, text: line.trim(), keyword });
            }
        });
    });

    // Dedupe and limit
    const seen = new Set();
    matches = matches.filter(m => {
        const key = m.line;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    }).slice(0, 5);

    if (matches.length > 0) {
        console.log('📍 SUGGESTED PLACEMENTS:');
        console.log('─'.repeat(60));
        matches.forEach((m, i) => {
            const preview = m.text.length > 100 ? m.text.slice(0, 100) + '...' : m.text;
            console.log(`\n${i + 1}. Line ~${m.line} (matched: "${m.keyword}")`);
            console.log(`   ${preview}`);
        });
    } else {
        console.log('No keyword matches found. Try searching manually for:');
        keywords.forEach(k => console.log(`  - ${k}`));
    }
}

console.log('\n═══════════════════════════════════════════════════════════════════\n');

function extractKeywords(id, caption) {
    const words = [];

    // From ID (split on hyphens, filter short words)
    id.split('-').forEach(w => {
        if (w.length > 2 && !['the', 'and', 'for'].includes(w)) {
            words.push(w);
        }
    });

    // From caption
    caption.split(/\s+/).forEach(w => {
        const clean = w.replace(/[^a-zA-Z]/g, '').toLowerCase();
        if (clean.length > 3 && !['the', 'and', 'for', 'with'].includes(clean)) {
            words.push(clean);
        }
    });

    // Common name mappings
    const nameMap = {
        'verlander': ['Verlander', 'Justin'],
        'miggy': ['Cabrera', 'Miguel'],
        'harbaugh': ['Harbaugh', 'Jim'],
        'leyland': ['Leyland', 'Jim'],
        'zimm': ['Zimmermann'],
        'bernie': ['Bernie'],
        'kinsler': ['Kinsler', 'Ian'],
        'tito': ['Francona', 'Tito'],
        'pepper': ['Pepper'],
        'avila': ['Avila'],
        'scherzer': ['Scherzer', 'Max']
    };

    words.forEach(w => {
        if (nameMap[w.toLowerCase()]) {
            words.push(...nameMap[w.toLowerCase()]);
        }
    });

    return [...new Set(words)];
}

function showUnembeddedList() {
    const embedded = new Set([...chapters.matchAll(/data-media-id="([^"]+)"/g)].map(m => m[1]));
    const mediaIds = [...media.matchAll(/'([^']+)':\s*\{[^}]*placeholder:\s*false/g)]
        .map(m => m[1])
        .filter(id => !embedded.has(id));

    mediaIds.slice(0, 20).forEach(id => console.log(`  • ${id}`));
    if (mediaIds.length > 20) {
        console.log(`  ... and ${mediaIds.length - 20} more`);
    }
}
