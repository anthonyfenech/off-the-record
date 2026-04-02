/**
 * OFF-THE-RECORD Admin Counters - Google Apps Script
 * ===================================================
 *
 * This script handles counter data for the admin dashboard.
 * It provides individual breakdowns for each event type.
 *
 * DEPLOYMENT INSTRUCTIONS:
 * ========================
 * 1. Open your existing Google Apps Script project (the one handling OTR analytics)
 * 2. Add this function to your existing Code.gs file (or create a new file in the project)
 * 3. The doGet() function should be updated to handle the new 'getCounters' action
 * 4. After adding the code:
 *    - Click "Deploy" > "Manage deployments"
 *    - Click the pencil icon to edit your existing deployment
 *    - Change "Version" to "New version"
 *    - Click "Deploy"
 * 5. The existing deployment URL will now support ?action=getCounters
 *
 * IMPORTANT: Do NOT create a new deployment - update the existing one so the URL stays the same.
 *
 * EXPECTED SHEET STRUCTURE:
 * =========================
 * The script assumes your Google Sheet has an "Events" sheet (or similar) with columns including:
 * - Column for event type (e.g., "event" column with values like "pdf_download", "start_reading", etc.)
 *
 * Adjust SHEET_NAME and EVENT_COLUMN below to match your actual sheet structure.
 */

// Configuration - adjust these to match your sheet
var SHEET_NAME = 'Events';      // Name of the sheet containing events
var EVENT_COLUMN = 'event';     // Column header containing event type

/**
 * Handle GET requests
 * Add this case to your existing doGet() function's switch/if statement
 */
function handleGetCounters() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        error: 'Sheet not found',
        total: 0,
        pdf_download: 0,
        epub_download: 0,
        apple_books_click: 0,
        kindle_click: 0,
        start_reading: 0
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var data = sheet.getDataRange().getValues();
    var headers = data[0];
    var eventIndex = headers.indexOf(EVENT_COLUMN);

    if (eventIndex === -1) {
      return ContentService.createTextOutput(JSON.stringify({
        error: 'Event column not found',
        total: 0,
        pdf_download: 0,
        epub_download: 0,
        apple_books_click: 0,
        kindle_click: 0,
        start_reading: 0
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Initialize counters
    var counts = {
      pdf_download: 0,
      epub_download: 0,
      apple_books_click: 0,
      kindle_click: 0,
      start_reading: 0
    };

    // Count events (skip header row)
    for (var i = 1; i < data.length; i++) {
      var eventType = data[i][eventIndex];
      if (eventType && counts.hasOwnProperty(eventType)) {
        counts[eventType]++;
      }
    }

    // Calculate total
    var total = counts.pdf_download + counts.epub_download +
                counts.apple_books_click + counts.kindle_click +
                counts.start_reading;

    var response = {
      total: total,
      pdf_download: counts.pdf_download,
      epub_download: counts.epub_download,
      apple_books_click: counts.apple_books_click,
      kindle_click: counts.kindle_click,
      start_reading: counts.start_reading
    };

    return ContentService.createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      error: error.toString(),
      total: 0,
      pdf_download: 0,
      epub_download: 0,
      apple_books_click: 0,
      kindle_click: 0,
      start_reading: 0
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * UPDATED doGet() function
 * ========================
 * Replace or merge with your existing doGet() function.
 * This version handles both the existing 'getReaderCount' and new 'getCounters' actions.
 */
function doGet(e) {
  var action = e.parameter.action;

  // Enable CORS
  var output;

  switch (action) {
    case 'getCounters':
      // New action for admin dashboard - returns individual breakdowns
      output = handleGetCounters();
      break;

    case 'getReaderCount':
      // Existing action for public counter - returns just total
      output = handleGetReaderCount();
      break;

    default:
      output = ContentService.createTextOutput(JSON.stringify({
        error: 'Unknown action',
        validActions: ['getCounters', 'getReaderCount']
      })).setMimeType(ContentService.MimeType.JSON);
  }

  return output;
}

/**
 * Existing getReaderCount handler (keep your current implementation)
 * This is a placeholder - use your actual existing code
 */
function handleGetReaderCount() {
  // Your existing implementation that returns { total, counter_enabled }
  // This is just a placeholder showing the expected structure

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var eventIndex = headers.indexOf(EVENT_COLUMN);

  var total = 0;
  for (var i = 1; i < data.length; i++) {
    var eventType = data[i][eventIndex];
    // Count all trackable events for the public total
    if (eventType === 'start_reading' || eventType === 'pdf_download' ||
        eventType === 'epub_download' || eventType === 'apple_books_click' ||
        eventType === 'kindle_click') {
      total++;
    }
  }

  return ContentService.createTextOutput(JSON.stringify({
    total: total,
    counter_enabled: true
  })).setMimeType(ContentService.MimeType.JSON);
}
