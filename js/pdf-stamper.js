/**
 * PDF Stamper for OFF-THE-RECORD
 * Client-side serial stamping using pdf-lib
 *
 * Creates unique, trackable copies with:
 * - Library seal on page 2
 * - Diagonal watermark on all interior pages
 * - Serial number in PDF metadata
 */

// ═══════════════════════════════════════════════════════════
// CONFIGURATION — Replace https://script.google.com/macros/s/AKfycbzxbj0xjFmjzDA6L5MNG4IqZKuiI0mb9SAOOXhJY_UeQmeTWE7ldaas1fFC6xqUzHn0/exec after deploying
// ═══════════════════════════════════════════════════════════
var SERIAL_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzxbj0xjFmjzDA6L5MNG4IqZKuiI0mb9SAOOXhJY_UeQmeTWE7ldaas1fFC6xqUzHn0/exec';

var BASE_PDF_PATH = './assets/OFF-THE-RECORD.pdf';
var SERIAL_TIMEOUT = 10000; // 10 seconds

// ═══════════════════════════════════════════════════════════
// MAIN EXPORT: stampAndDownload
// ═══════════════════════════════════════════════════════════

async function stampAndDownload(buttonElement) {
    var originalText = buttonElement.innerHTML;
    var originalHref = buttonElement.getAttribute('href');

    try {
        // Step 1: Show preparing state
        buttonElement.innerHTML = '<span class="format-name">PREPARING YOUR COPY...</span>';
        buttonElement.style.pointerEvents = 'none';
        buttonElement.removeAttribute('href');

        // Step 2: Get serial number (with fallback)
        var serial = await getSerialNumber();
        console.log('[PDF Stamper] Serial assigned:', serial);

        // Step 3: Load base PDF
        var pdfBytes = await loadBasePdf();
        if (!pdfBytes) {
            throw new Error('Failed to load base PDF');
        }

        // Step 4: Load pdf-lib and stamp the PDF
        var pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);

        // Step 5: Apply stamps
        await applyLibrarySeal(pdfDoc, serial);
        await applyWatermarks(pdfDoc, serial);
        applyMetadata(pdfDoc, serial);

        // Step 6: Save and trigger download
        var stampedBytes = await pdfDoc.save();
        triggerDownload(stampedBytes, serial);

        // Step 7: Fire analytics
        fireAnalyticsEvent(serial);

        // Step 8: Reset button
        buttonElement.innerHTML = originalText;
        buttonElement.style.pointerEvents = '';
        if (originalHref) buttonElement.setAttribute('href', originalHref);

    } catch (error) {
        console.error('[PDF Stamper] Error:', error);

        // Show error state
        buttonElement.innerHTML = '<span class="format-name">DOWNLOAD ERROR — TRY AGAIN</span>';

        // Re-enable after 3 seconds
        setTimeout(function() {
            buttonElement.innerHTML = originalText;
            buttonElement.style.pointerEvents = '';
            if (originalHref) buttonElement.setAttribute('href', originalHref);
        }, 3000);
    }

    // Prevent default link behavior
    return false;
}

// ═══════════════════════════════════════════════════════════
// SERIAL NUMBER FETCHING
// ═══════════════════════════════════════════════════════════

async function getSerialNumber() {
    // Check if endpoint is configured (placeholder not replaced)
    if (SERIAL_ENDPOINT.indexOf('__APPS_SCRIPT_URL__') !== -1) {
        console.warn('[PDF Stamper] Serial endpoint not configured, using fallback');
        return generateFallbackSerial();
    }

    try {
        var controller = new AbortController();
        var timeoutId = setTimeout(function() { controller.abort(); }, SERIAL_TIMEOUT);

        var response = await fetch(SERIAL_ENDPOINT + '?action=assign_serial', {
            method: 'GET',
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error('Serial endpoint returned ' + response.status);
        }

        var data = await response.json();

        if (data && data.serial) {
            return data.serial;
        } else {
            throw new Error('Invalid response from serial endpoint');
        }

    } catch (error) {
        console.error('[PDF Stamper] Serial fetch failed:', error.message);
        return generateFallbackSerial();
    }
}

function generateFallbackSerial() {
    var now = new Date();
    var year = now.getFullYear();
    var month = String(now.getMonth() + 1).padStart(2, '0');
    var day = String(now.getDate()).padStart(2, '0');
    var hour = String(now.getHours()).padStart(2, '0');
    var minute = String(now.getMinutes()).padStart(2, '0');

    return 'OTR-OFF-' + year + month + day + '-' + hour + minute;
}

// ═══════════════════════════════════════════════════════════
// PDF LOADING
// ═══════════════════════════════════════════════════════════

async function loadBasePdf() {
    try {
        var response = await fetch(BASE_PDF_PATH);
        if (!response.ok) {
            throw new Error('PDF fetch failed: ' + response.status);
        }
        return await response.arrayBuffer();
    } catch (error) {
        console.error('[PDF Stamper] Failed to load PDF:', error);
        return null;
    }
}

// ═══════════════════════════════════════════════════════════
// LIBRARY SEAL (Page 2)
// ═══════════════════════════════════════════════════════════

async function applyLibrarySeal(pdfDoc, serial) {
    var pages = pdfDoc.getPages();
    var targetPage = pages.length > 1 ? pages[1] : pages[0]; // Page 2, or page 1 if only 1 page
    var pageSize = targetPage.getSize();

    // Seal dimensions
    var sealWidth = 200;
    var sealHeight = 140;
    var margin = 50;

    // Position: bottom-right, 50pt from edges
    var sealX = pageSize.width - sealWidth - margin;
    var sealY = margin;

    // Colors
    var darkRed = PDFLib.rgb(139/255, 0, 0);
    var darkRedTransparent = PDFLib.rgb(139/255, 0, 0);

    // Get Courier font (built into pdf-lib)
    var font = await pdfDoc.embedFont(PDFLib.StandardFonts.Courier);
    var fontBold = await pdfDoc.embedFont(PDFLib.StandardFonts.CourierBold);

    // Format date
    var now = new Date();
    var months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];
    var dateStr = months[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear();

    // Calculate center of seal for rotation
    var centerX = sealX + sealWidth / 2;
    var centerY = sealY + sealHeight / 2;

    // Rotation angle in radians (-2 degrees)
    var angle = -2 * Math.PI / 180;

    // Draw rotated rectangle border
    // We'll draw 4 lines to form the rectangle, rotated around center
    var corners = [
        { x: sealX, y: sealY },
        { x: sealX + sealWidth, y: sealY },
        { x: sealX + sealWidth, y: sealY + sealHeight },
        { x: sealX, y: sealY + sealHeight }
    ];

    // Rotate corners
    var rotatedCorners = corners.map(function(corner) {
        return rotatePoint(corner.x, corner.y, centerX, centerY, angle);
    });

    // Draw border lines
    for (var i = 0; i < 4; i++) {
        var start = rotatedCorners[i];
        var end = rotatedCorners[(i + 1) % 4];
        targetPage.drawLine({
            start: { x: start.x, y: start.y },
            end: { x: end.x, y: end.y },
            thickness: 2,
            color: darkRed,
            opacity: 0.85
        });
    }

    // Text content (from top to bottom within seal)
    var textLines = [
        { text: 'OFF-THE-RECORD', font: fontBold, size: 11, yOffset: 115 },
        { text: 'DIGITAL EDITION', font: font, size: 8, yOffset: 98 },
        { text: 'No. ' + serial, font: fontBold, size: 12, yOffset: 72 },
        { text: dateStr, font: font, size: 9, yOffset: 55 },
        { text: 'VERIFIED ORIGINAL', font: fontBold, size: 8, yOffset: 32 },
        { text: 'anthonyfenech.com', font: font, size: 7, yOffset: 18 }
    ];

    textLines.forEach(function(line) {
        var textWidth = line.font.widthOfTextAtSize(line.text, line.size);
        var textX = sealX + (sealWidth - textWidth) / 2;
        var textY = sealY + line.yOffset;

        // Rotate text position
        var rotated = rotatePoint(textX, textY, centerX, centerY, angle);

        targetPage.drawText(line.text, {
            x: rotated.x,
            y: rotated.y,
            size: line.size,
            font: line.font,
            color: darkRed,
            opacity: 0.85,
            rotate: PDFLib.degrees(-2)
        });
    });
}

function rotatePoint(x, y, cx, cy, angle) {
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    var dx = x - cx;
    var dy = y - cy;
    return {
        x: cx + dx * cos - dy * sin,
        y: cy + dx * sin + dy * cos
    };
}

// ═══════════════════════════════════════════════════════════
// INTERIOR WATERMARK (All pages except page 1)
// ═══════════════════════════════════════════════════════════

async function applyWatermarks(pdfDoc, serial) {
    var pages = pdfDoc.getPages();
    var font = await pdfDoc.embedFont(PDFLib.StandardFonts.Courier);

    // Watermark color: light gray at 8% opacity
    var watermarkColor = PDFLib.rgb(200/255, 200/255, 200/255);

    // Skip page 1 (index 0), apply to all other pages
    for (var i = 1; i < pages.length; i++) {
        var page = pages[i];
        var pageSize = page.getSize();

        // Calculate center position
        var textWidth = font.widthOfTextAtSize(serial, 48);
        var centerX = (pageSize.width - textWidth) / 2;
        var centerY = pageSize.height / 2;

        page.drawText(serial, {
            x: centerX,
            y: centerY,
            size: 48,
            font: font,
            color: watermarkColor,
            opacity: 0.08,
            rotate: PDFLib.degrees(45)
        });
    }
}

// ═══════════════════════════════════════════════════════════
// PDF METADATA
// ═══════════════════════════════════════════════════════════

function applyMetadata(pdfDoc, serial) {
    pdfDoc.setTitle('OFF-THE-RECORD by Anthony Fenech');
    pdfDoc.setAuthor('Anthony Fenech');
    pdfDoc.setSubject('Digital Edition — Serial ' + serial);
    pdfDoc.setKeywords([serial, 'anthonyfenech.com', 'verified']);
    pdfDoc.setCreator('OFF-THE-RECORD Digital Press');
    pdfDoc.setProducer('OFF-THE-RECORD Digital Press');
}

// ═══════════════════════════════════════════════════════════
// DOWNLOAD TRIGGER
// ═══════════════════════════════════════════════════════════

function triggerDownload(pdfBytes, serial) {
    var blob = new Blob([pdfBytes], { type: 'application/pdf' });
    var url = URL.createObjectURL(blob);

    var link = document.createElement('a');
    link.href = url;
    link.download = 'OFF-THE-RECORD-' + serial + '.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up blob URL after a delay
    setTimeout(function() {
        URL.revokeObjectURL(url);
    }, 1000);
}

// ═══════════════════════════════════════════════════════════
// ANALYTICS
// ═══════════════════════════════════════════════════════════

function fireAnalyticsEvent(serial) {
    var payload = {
        event: 'pdf_download',
        serial: serial,
        reader_name: localStorage.getItem('otr_reader_name') || 'anonymous',
        timestamp: new Date().toISOString(),
        device: navigator.userAgent
    };

    try {
        if (typeof OTR_ANALYTICS_CONFIG !== 'undefined' && OTR_ANALYTICS_CONFIG.trackingEnabled) {
            fetch(OTR_ANALYTICS_CONFIG.analyticsScriptUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }).then(function() {
                console.log('[PDF Stamper] Analytics event fired:', serial);
            }).catch(function(err) {
                console.log('[PDF Stamper] Analytics failed:', err.message);
            });
        } else {
            console.log('[PDF Stamper] Analytics (suppressed):', payload);
        }
    } catch (e) {
        console.log('[PDF Stamper] Analytics error:', e.message);
    }
}
