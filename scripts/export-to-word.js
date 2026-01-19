// Export chapters.js to Word-compatible HTML
// Open the output HTML in Word, then Save As .docx

import { CHAPTERS } from '../data/chapters.js';

let html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
body { font-family: Georgia, serif; font-size: 12pt; line-height: 1.5; }
h1 { font-family: "Courier New", monospace; font-size: 18pt; text-align: center; page-break-before: always; margin-top: 2in; }
h1:first-of-type { page-break-before: avoid; }
.subtitle { font-style: italic; text-align: center; margin-bottom: 2em; }
.dateline { font-weight: bold; }
.small-caps { font-variant: small-caps; }
p { text-indent: 0.5in; margin: 0 0 0.5em 0; }
p:first-of-type, p.has-dateline, p.signature { text-indent: 0; }
.signature { margin-top: 2em; }
blockquote { margin: 1em 2em; font-style: italic; }
</style>
</head>
<body>
`;

// Filter to just the actual chapters (skip title page, TOC, etc.)
const chapters = CHAPTERS.filter(ch => ch.id >= 1 && ch.content && !ch.content.includes('placeholderContent'));

for (const chapter of chapters) {
    // Skip chapters with placeholder content
    if (chapter.content.includes('placeholder') || chapter.content.includes('placeholderContent')) {
        continue;
    }

    // Chapter title as H1 (this becomes Heading 1 in Word)
    html += `<h1>${chapter.title}</h1>\n`;

    // No subtitles

    // Chapter content - clean up some HTML
    let content = chapter.content;

    // Convert spans to appropriate formatting
    content = content.replace(/<span class="dateline">/g, '<strong>');
    content = content.replace(/<\/span>/g, '</strong>');
    content = content.replace(/<span class="small-caps">/g, '');

    html += content + '\n\n';
}

html += `</body></html>`;

// Write to file
import { writeFileSync } from 'fs';
writeFileSync('/Users/fenech/off-the-record/OFF-THE-RECORD-for-Atticus.html', html);

console.log('Done! Created OFF-THE-RECORD-for-Atticus.html');
console.log('Open this file in Microsoft Word, then Save As .docx');
