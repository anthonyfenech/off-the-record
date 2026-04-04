/**
 * OFF-THE-RECORD Guestbook - Complete Apps Script Reference
 * =========================================================
 *
 * This script handles BOTH:
 * - doGet: Fetching approved comments for display
 * - doPost: Receiving new guestbook submissions
 *
 * SHEET STRUCTURE (Guestbook tab):
 * A: Timestamp | B: Name | C: Email | D: Location | E: Comment | F: Reader Name | G: Device | H: Approved
 *
 * To approve a comment: Change column H from FALSE to TRUE
 * Only approved comments will appear on the website.
 *
 * DEPLOYMENT INSTRUCTIONS:
 * ========================
 * 1. Go to script.google.com → New Project (or open existing OTR project)
 * 2. Paste this entire file (replace all existing code)
 * 3. Click Deploy → New deployment → Web app
 * 4. Execute as: Me | Who has access: Anyone
 * 5. Click Deploy and authorize when prompted
 * 6. Copy the deployment URL
 * 7. Paste URL into js/analytics-config.js as guestbookUrl value
 * 8. Test: submit the form on the live site
 *
 * CORS: Apps Script web apps handle CORS via redirect. The script
 * returns JSON responses that work with mode: 'no-cors' fetch calls.
 */

/**
 * Handle GET requests (fetch approved comments)
 * ADD this function or merge with existing doGet
 */
function doGet(e) {
  const action = e.parameter.action || '';

  if (action === 'getApprovedComments') {
    return getApprovedComments();
  }

  return jsonResponse({ error: 'Unknown action' });
}

/**
 * Get approved comments for display on guestbook page
 */
function getApprovedComments() {
  try {
    // Check cache first (5 minute cache)
    const cache = CacheService.getScriptCache();
    const cached = cache.get('approved_comments');

    if (cached) {
      Logger.log('Returning cached comments');
      return jsonResponse(JSON.parse(cached));
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Guestbook');

    if (!sheet) {
      return jsonResponse({ comments: [] });
    }

    const data = sheet.getDataRange().getValues();
    const comments = [];

    // Skip header row (index 0)
    // Column indexes for YOUR schema:
    // 0: Timestamp, 1: Name, 2: Email, 3: Location, 4: Comment, 5: Reader Name, 6: Device, 7: Approved
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const approved = row[7]; // Column H: Approved

      if (approved === true || approved === 'TRUE' || approved === 'true') {
        comments.push({
          name: row[1],        // Column B: Name
          location: row[3],    // Column D: Location
          date: row[0],        // Column A: Timestamp
          comment: row[4]      // Column E: Comment
          // Email (column C) NOT included for privacy
        });
      }
    }

    // Sort by date, newest first
    comments.sort((a, b) => new Date(b.date) - new Date(a.date));

    const result = { comments: comments };

    // Cache for 5 minutes (300 seconds)
    cache.put('approved_comments', JSON.stringify(result), 300);

    Logger.log('Returning ' + comments.length + ' approved comments');
    return jsonResponse(result);

  } catch (error) {
    Logger.log('Error in getApprovedComments: ' + error.toString());
    return jsonResponse({ comments: [], error: error.toString() });
  }
}

/**
 * Clear the comments cache (run manually after approving comments)
 */
function clearCommentsCache() {
  const cache = CacheService.getScriptCache();
  cache.remove('approved_comments');
  Logger.log('Comments cache cleared');
}

/**
 * JSON response helper
 */
function jsonResponse(data) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

// ============================================================================
// WRITE OPERATIONS (doPost) - Receive new guestbook submissions
// ============================================================================

/**
 * Handle POST requests (receive new guestbook submissions)
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Route based on action
    if (data.action === 'guestbook_submit') {
      return jsonResponse(handleGuestbookSubmit(data));
    }

    return jsonResponse({ success: false, error: 'Unknown action' });

  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return jsonResponse({ success: false, error: error.toString() });
  }
}

/**
 * Handle guestbook form submission
 * Saves entry to the Guestbook sheet
 */
function handleGuestbookSubmit(data) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName('Guestbook');

    // Create Guestbook sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet('Guestbook');

      // Add header row
      const headers = ['Timestamp', 'Name', 'Email', 'Location', 'Comment', 'Reader Name', 'Device', 'Approved'];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#f0f0f0');

      // Set column widths
      sheet.setColumnWidth(1, 180);  // Timestamp
      sheet.setColumnWidth(2, 150);  // Name
      sheet.setColumnWidth(3, 200);  // Email
      sheet.setColumnWidth(4, 150);  // Location
      sheet.setColumnWidth(5, 400);  // Comment
      sheet.setColumnWidth(6, 150);  // Reader Name
      sheet.setColumnWidth(7, 300);  // Device
      sheet.setColumnWidth(8, 80);   // Approved

      // Freeze header row
      sheet.setFrozenRows(1);

      Logger.log('Created new Guestbook sheet with headers');
    }

    // Sanitize and enforce max lengths
    const sanitize = (str, maxLen) => {
      if (!str || typeof str !== 'string') return '';
      return str.trim().substring(0, maxLen);
    };

    // Build row data
    const rowData = [
      data.timestamp || new Date().toISOString(),
      sanitize(data.name, 100),
      sanitize(data.email, 100),
      sanitize(data.location, 100),
      sanitize(data.comment, 500),
      sanitize(data.reader_name, 100) || 'anonymous',
      sanitize(data.device, 500),
      false  // Approved defaults to FALSE
    ];

    // Append row
    sheet.appendRow(rowData);

    Logger.log('Guestbook entry added: ' + data.name);

    return { success: true, message: 'Entry added to guestbook' };

  } catch (error) {
    Logger.log('Error in handleGuestbookSubmit: ' + error.toString());
    return { success: false, error: error.toString() };
  }
}
