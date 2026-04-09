/**
 * PDF Stamper for OFF-THE-RECORD
 * Client-side serial stamping using pdf-lib
 *
 * Creates unique, trackable copies with:
 * - Library seal on page 2
 * - Serial number in PDF metadata
 */

// ═══════════════════════════════════════════════════════════
// CONFIGURATION — Replace https://script.google.com/macros/s/AKfycbzxbj0xjFmjzDA6L5MNG4IqZKuiI0mb9SAOOXhJY_UeQmeTWE7ldaas1fFC6xqUzHn0/exec after deploying
// ═══════════════════════════════════════════════════════════
var SERIAL_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzxbj0xjFmjzDA6L5MNG4IqZKuiI0mb9SAOOXhJY_UeQmeTWE7ldaas1fFC6xqUzHn0/exec';

var BASE_PDF_PATH = './assets/OFF-THE-RECORD.pdf';
var SERIAL_TIMEOUT = 15000; // 15 seconds

// ═══════════════════════════════════════════════════════════
// MAIN EXPORT: stampAndDownload
// ═══════════════════════════════════════════════════════════

async function stampAndDownload(buttonElement) {
    // Button state management
    var btn = buttonElement
              || document.getElementById('pdfDownloadBtn')
              || document.querySelector('[data-action="download-pdf"]');
    var originalText = btn ? btn.textContent : '';

    if (btn) {
        btn.textContent = 'PREPARING YOUR COPY...';
        btn.disabled = true;
    }

    try {
        // Step 1: Get serial number (with fallback)
        var serial = await getSerialNumber();
        console.log('[PDF Stamper] Serial assigned:', serial);

        // Step 2: Load base PDF
        var pdfBytes = await loadBasePdf();
        if (!pdfBytes) {
            throw new Error('Failed to load base PDF');
        }

        // Step 3: Load pdf-lib and stamp the PDF
        var pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);

        // Step 4: Apply stamps
        await applyLibrarySeal(pdfDoc, serial);
        applyMetadata(pdfDoc, serial);

        // Step 5: Save and trigger download
        var stampedBytes = await pdfDoc.save();
        triggerDownload(stampedBytes, serial);

        // Step 6: Fire analytics
        fireAnalyticsEvent(serial);

    } catch (error) {
        console.error('[PDF Stamper] Error:', error);
    } finally {
        // Reset button state
        if (btn) {
            btn.textContent = originalText;
            btn.disabled = false;
        }
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

        // Include reader name in serial request
        var readerName = localStorage.getItem('otr_reader_name') || 'anonymous';
        var serialUrl = SERIAL_ENDPOINT + '?action=assign_serial&reader_name=' + encodeURIComponent(readerName);

        var response = await fetch(serialUrl, {
            method: 'GET',
            redirect: 'follow',
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
    // Offline fallback: 000-OFFLINE-10
    return '000-OFFLINE-10';
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

    // Embed fonts: Bold for serial, Regular for date
    var fontBold = await pdfDoc.embedFont(PDFLib.StandardFonts.TimesRomanBold);
    var fontRegular = await pdfDoc.embedFont(PDFLib.StandardFonts.TimesRoman);

    // Color: dark red at 85% opacity
    var darkRed = PDFLib.rgb(139/255, 0, 0);

    // Format date with timezone: M-D-YY H:MM AM/PM TZ
    var dateStr = formatDateWithTimezone();

    // Line 1: "# 000-XXXXXX-10" (14pt, Bold)
    var line1Text = '# ' + serial;
    var line1Size = 14;
    var line1Width = fontBold.widthOfTextAtSize(line1Text, line1Size);
    var line1Height = line1Size;

    // Line 2: "4-3-26 2:31 AM EST" (10pt, Regular)
    var line2Text = dateStr;
    var line2Size = 10;
    var line2Width = fontRegular.widthOfTextAtSize(line2Text, line2Size);
    var line2Height = line2Size;

    // Box padding
    var paddingH = 25; // horizontal
    var paddingV = 15; // vertical
    var lineSpacing = 8;

    // Calculate box dimensions based on content
    var contentWidth = Math.max(line1Width, line2Width);
    var contentHeight = line1Height + lineSpacing + line2Height;
    var boxWidth = contentWidth + (paddingH * 2);
    var boxHeight = contentHeight + (paddingV * 2);

    // Position: bottom-right of page, 50pt from edges
    var margin = 50;
    var boxX = pageSize.width - boxWidth - margin;
    var boxY = margin;

    // Draw bordered rectangle (no fill, just stroke)
    targetPage.drawRectangle({
        x: boxX,
        y: boxY,
        width: boxWidth,
        height: boxHeight,
        borderColor: darkRed,
        borderWidth: 2,
        borderOpacity: 0.85,
        opacity: 0 // no fill
    });

    // Calculate centered text positions inside box
    var line1X = boxX + (boxWidth - line1Width) / 2;
    var line1Y = boxY + paddingV + line2Height + lineSpacing;

    var line2X = boxX + (boxWidth - line2Width) / 2;
    var line2Y = boxY + paddingV;

    // Draw line 1: "# 000-XXXXXX-10" (Bold)
    targetPage.drawText(line1Text, {
        x: line1X,
        y: line1Y,
        size: line1Size,
        font: fontBold,
        color: darkRed,
        opacity: 0.85
    });

    // Draw line 2: date with timezone (Regular)
    targetPage.drawText(line2Text, {
        x: line2X,
        y: line2Y,
        size: line2Size,
        font: fontRegular,
        color: darkRed,
        opacity: 0.85
    });
}

function formatDateWithTimezone() {
    var now = new Date();

    // Get timezone abbreviation
    var tz = 'UTC';
    try {
        var parts = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' })
            .formatToParts(now);
        var tzPart = parts.find(function(p) { return p.type === 'timeZoneName'; });
        if (tzPart) {
            tz = tzPart.value;
        }
    } catch (e) {
        console.log('[PDF Stamper] Could not get timezone, using UTC');
    }

    // Format: M-D-YY H:MM AM/PM TZ (no leading zeros)
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var year = String(now.getFullYear()).slice(-2);

    var hours = now.getHours();
    var minutes = now.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    if (hours === 0) hours = 12;

    var minuteStr = minutes < 10 ? '0' + minutes : String(minutes);

    return month + '-' + day + '-' + year + ' ' + hours + ':' + minuteStr + ' ' + ampm + ' ' + tz;
}

// ═══════════════════════════════════════════════════════════
// PDF METADATA
// ═══════════════════════════════════════════════════════════

function applyMetadata(pdfDoc, serial) {
    pdfDoc.setTitle('OFF-THE-RECORD by Anthony Fenech');
    pdfDoc.setAuthor('Anthony Fenech');
    pdfDoc.setSubject('Digital Edition — # ' + serial);
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
    link.download = serial ? 'OFF-THE-RECORD-' + serial + '.pdf' : 'OFF-THE-RECORD.pdf';
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
