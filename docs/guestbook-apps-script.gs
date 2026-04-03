/**
 * OFF-THE-RECORD Guestbook - Google Apps Script Backend
 * =====================================================
 *
 * Handles guestbook submissions and approved comments display.
 *
 * DEPLOYMENT INSTRUCTIONS:
 * ========================
 * 1. Open your Google Sheet → Extensions → Apps Script
 * 2. Paste this entire script (replace existing Code.gs if updating)
 * 3. Click "Deploy" → "New deployment" (or "Manage deployments" if updating)
 * 4. Select type: "Web app"
 * 5. Execute as: "Me"
 * 6. Who has access: "Anyone"
 * 7. Click "Deploy" and authorize when prompted
 * 8. Copy the Web app URL
 * 9. Paste URL into js/analytics-config.js as guestbookUrl
 * 10. Commit and push the config change
 *
 * SHEET STRUCTURE:
 * ================
 * The script will create a "Guestbook" tab (if it doesn't exist) with columns:
 * A: Timestamp | B: Name | C: Email | D: Location | E: Comment | F: Approved | G: ReaderName | H: Device
 *
 * To approve a comment: Change column F from FALSE to TRUE
 * Only approved comments will appear on the website.
 *
 * ALLOWED ORIGINS:
 * ================
 * - https://offrecordbook.com
 * - https://www.offrecordbook.com
 * - https://anthonyfenech.github.io
 * - http://localhost (for testing)
 */

// Allowed origins for CORS
var ALLOWED_ORIGINS = [
  'https://offrecordbook.com',
  'https://www.offrecordbook.com',
  'https://anthonyfenech.github.io',
  'http://localhost',
  'http://127.0.0.1'
];

/**
 * Handle GET requests (fetch approved comments)
 */
function doGet(e) {
  var origin = e.parameter.origin || '';
  var action = e.parameter.action || '';

  // Handle getApprovedComments action
  if (action === 'getApprovedComments') {
    return getApprovedComments(origin);
  }

  // Default response
  return createJsonResponse({ error: 'Unknown action' }, origin);
}

/**
 * Handle POST requests (submit new guestbook entry)
 */
function doPost(e) {
  var origin = '';

  try {
    var data = JSON.parse(e.postData.contents);
    origin = data.origin || '';

    // Route to appropriate handler based on action
    if (data.action === 'guestbook_submit') {
      return handleGuestbookSubmit(data, origin);
    }

    // If action is something else, pass to existing handlers
    // (This allows adding to existing analytics script)
    return createJsonResponse({ error: 'Unknown action: ' + data.action }, origin);

  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return createJsonResponse({ error: error.toString() }, origin);
  }
}

/**
 * Handle guestbook form submission
 */
function handleGuestbookSubmit(data, origin) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = 'Guestbook';
    var sheet = ss.getSheetByName(sheetName);

    // Create the Guestbook sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);

      // Set up headers
      var headers = ['Timestamp', 'Name', 'Email', 'Location', 'Comment', 'Approved', 'ReaderName', 'Device'];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

      // Format header row
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#f3f3f3');

      // Set column widths
      sheet.setColumnWidth(1, 150);  // Timestamp
      sheet.setColumnWidth(2, 120);  // Name
      sheet.setColumnWidth(3, 180);  // Email
      sheet.setColumnWidth(4, 120);  // Location
      sheet.setColumnWidth(5, 300);  // Comment
      sheet.setColumnWidth(6, 80);   // Approved
      sheet.setColumnWidth(7, 100);  // ReaderName
      sheet.setColumnWidth(8, 200);  // Device

      // Freeze header row
      sheet.setFrozenRows(1);

      Logger.log('Created new Guestbook sheet with headers');
    }

    // Prepare row data
    var rowData = [
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.location || '',
      data.comment || '',
      false,  // Approved defaults to FALSE
      data.reader_name || 'anonymous',
      data.device || ''
    ];

    // Append the new row
    sheet.appendRow(rowData);

    Logger.log('Guestbook entry added: ' + data.name);

    return createJsonResponse({
      success: true,
      message: 'Entry added to guestbook'
    }, origin);

  } catch (error) {
    Logger.log('Error in handleGuestbookSubmit: ' + error.toString());
    return createJsonResponse({
      success: false,
      error: error.toString()
    }, origin);
  }
}

/**
 * Get approved comments for display
 */
function getApprovedComments(origin) {
  try {
    // Check cache first (5 minute cache)
    var cache = CacheService.getScriptCache();
    var cached = cache.get('approved_comments');

    if (cached) {
      Logger.log('Returning cached comments');
      return createJsonResponse(JSON.parse(cached), origin);
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Guestbook');

    if (!sheet) {
      return createJsonResponse({ comments: [] }, origin);
    }

    var data = sheet.getDataRange().getValues();
    var comments = [];

    // Skip header row (index 0)
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      var approved = row[5]; // Column F: Approved

      // Only include approved comments
      if (approved === true || approved === 'TRUE' || approved === 'true') {
        comments.push({
          name: row[1],        // Column B: Name
          location: row[3],    // Column D: Location
          date: row[0],        // Column A: Timestamp
          comment: row[4]      // Column E: Comment
          // Note: Email (column C) is NOT included for privacy
        });
      }
    }

    // Sort by date, newest first
    comments.sort(function(a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    var result = { comments: comments };

    // Cache for 5 minutes (300 seconds)
    cache.put('approved_comments', JSON.stringify(result), 300);

    Logger.log('Returning ' + comments.length + ' approved comments');

    return createJsonResponse(result, origin);

  } catch (error) {
    Logger.log('Error in getApprovedComments: ' + error.toString());
    return createJsonResponse({ comments: [], error: error.toString() }, origin);
  }
}

/**
 * Create a JSON response with CORS headers
 */
function createJsonResponse(data, origin) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

/**
 * Clear the comments cache (call manually if needed)
 */
function clearCommentsCache() {
  var cache = CacheService.getScriptCache();
  cache.remove('approved_comments');
  Logger.log('Comments cache cleared');
}

/**
 * Test function - add a test entry
 */
function testGuestbookSubmit() {
  var testData = {
    action: 'guestbook_submit',
    timestamp: new Date().toISOString(),
    name: 'Test User',
    email: 'test@example.com',
    location: 'Detroit, MI',
    comment: 'This is a test comment from the Apps Script editor.',
    reader_name: 'test_reader',
    device: 'Apps Script Test'
  };

  var result = handleGuestbookSubmit(testData, '');
  Logger.log('Test result: ' + result.getContent());
}

/**
 * Test function - get approved comments
 */
function testGetApprovedComments() {
  clearCommentsCache(); // Clear cache to get fresh data
  var result = getApprovedComments('');
  Logger.log('Test result: ' + result.getContent());
}
