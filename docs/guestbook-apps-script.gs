/**
 * OFF-THE-RECORD Guestbook - getApprovedComments Addition
 * =======================================================
 *
 * ADD these functions to your existing Apps Script.
 * Compatible with your existing Guestbook sheet structure:
 * A: Timestamp | B: Name | C: Email | D: Location | E: Comment | F: Reader Name | G: Device | H: Approved
 *
 * To approve a comment: Change column H from FALSE to TRUE
 * Only approved comments will appear on the website.
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
 * JSON response helper (if you don't already have this)
 */
function jsonResponse(data) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
