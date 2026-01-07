const fs = require('fs');

// Read the new HOT SEAT content
const newHotSeatContent = fs.readFileSync('/tmp/hot_seat_new.txt', 'utf8');

// Read chapters.js
let chapters = fs.readFileSync('data/chapters.js', 'utf8');

// Step 1: Find and extract all chapter objects
const chapterRegex = /\{\s*id:\s*(\d+),[\s\S]*?wordCount:\s*\d+\s*\}/g;

// Find HOT SEAT and UNCENSORED chapters
const hotSeatMatch = chapters.match(/\{\s*id:\s*11,\s*year:\s*2016,[\s\S]*?title:\s*"HOT SEAT"[\s\S]*?wordCount:\s*\d+\s*\}/);
const uncensoredMatch = chapters.match(/\{\s*id:\s*12,\s*year:\s*2016,[\s\S]*?title:\s*"UNCENSORED"[\s\S]*?wordCount:\s*\d+\s*\}/);

if (!hotSeatMatch) {
    console.log('Could not find HOT SEAT chapter');
    process.exit(1);
}
if (!uncensoredMatch) {
    console.log('Could not find UNCENSORED chapter');
    process.exit(1);
}

console.log('Found HOT SEAT chapter, length:', hotSeatMatch[0].length);
console.log('Found UNCENSORED chapter, length:', uncensoredMatch[0].length);

// Create new HOT SEAT chapter
const newHotSeatChapter = `{
        id: 11,
        year: 2016,
        section: 'year',
        title: "HOT SEAT",
        subtitle: "Washington, Baltimore, Anaheim, Blue Springs, San Diego, Detroit, Chicago, Arlington",
        teaser: "Manager Brad Ausmus fights to save his job as the Tigers stumble.",
        content: \`${newHotSeatContent}\`,
        wordCount: 3200
    }`;

// Replace HOT SEAT
chapters = chapters.replace(hotSeatMatch[0], newHotSeatChapter);

// Remove UNCENSORED (including the comma before it if present)
chapters = chapters.replace(/,\s*\{\s*id:\s*12,\s*year:\s*2016,[\s\S]*?title:\s*"UNCENSORED"[\s\S]*?wordCount:\s*\d+\s*\}/, '');

// Now renumber chapters 13+ to 12+
for (let i = 31; i >= 13; i--) {
    chapters = chapters.replace(new RegExp(`id: ${i},`, 'g'), `id: ${i - 1},`);
}

// Update comment
chapters = chapters.replace('// POSTSCRIPT CHAPTERS (30-31)', '// POSTSCRIPT CHAPTERS (29-30)');

// Write the file
fs.writeFileSync('data/chapters.js', chapters);

// Verify
const verify = fs.readFileSync('data/chapters.js', 'utf8');
const ids = verify.match(/id: \d+,/g) || [];
const uniqueIds = [...new Set(ids)].sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]));

console.log('\nChapter IDs found:', uniqueIds.length);
console.log(uniqueIds.join(', '));

if (verify.includes('title: "UNCENSORED"')) {
    console.log('\nWARNING: UNCENSORED still present!');
} else {
    console.log('\nUNCENSORED successfully removed.');
}

if (verify.includes('title: "HOT SEAT"')) {
    console.log('HOT SEAT present.');
} else {
    console.log('WARNING: HOT SEAT missing!');
}
