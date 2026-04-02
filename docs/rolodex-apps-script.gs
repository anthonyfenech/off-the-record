/**
 * OFF-THE-RECORD Rolodex/Guestbook - Google Apps Script
 * =====================================================
 *
 * This script handles Rolodex (guestbook) submissions from the OFF-THE-RECORD site.
 * It receives form submissions and appends them to a "Rolodex" sheet tab.
 *
 * DEPLOYMENT INSTRUCTIONS:
 * ========================
 * 1. Open your existing Google Apps Script project (the one handling OTR analytics)
 * 2. Add the handleRolodexSubmit() function below to your Code.gs file
 * 3. Add the 'rolodex_submit' case to your existing doPost() function (see example below)
 * 4. After adding the code:
 *    - Click "Deploy" > "Manage deployments"
 *    - Click the pencil icon to edit your existing deployment
 *    - Change "Version" to "New version"
 *    - Click "Deploy"
 * 5. The existing deployment URL will now handle action: 'rolodex_submit'
 *
 * IMPORTANT: Do NOT create a new deployment - update the existing one so the URL stays the same.
 *
 * SHEET STRUCTURE:
 * ================
 * The script will create a "Rolodex" tab (if it doesn't exist) with these columns:
 * A: Timestamp | B: Name | C: Email | D: Location | E: Comment | F: Reader Name | G: Device
 *
 * The email column is collected but not displayed publicly - for follow-up contact only.
 */

// =============================================================================
// ADD THIS CASE TO YOUR EXISTING doPost() FUNCTION:
// =============================================================================
//
// In your existing doPost(e) function, add this case to your switch/if statement:
//
//   if (action === 'rolodex_submit') {
//     return handleRolodexSubmit(data);
//   }
//
// Example of where to add it:
//
//   function doPost(e) {
//     try {
//       var data = JSON.parse(e.postData.contents);
//       var action = data.action;
//
//       if (action === 'incrementStartReading') {
//         return handleIncrementStartReading(data);
//       }
//       else if (action === 'rolodex_submit') {     // <-- ADD THIS
//         return handleRolodexSubmit(data);          // <-- ADD THIS
//       }                                            // <-- ADD THIS
//       else {
//         // existing handlers...
//       }
//     } catch (error) {
//       // error handling...
//     }
//   }
//
// =============================================================================


/**
 * Handle Rolodex (guestbook) form submissions
 * @param {Object} data - The parsed JSON payload from the frontend
 * @returns {TextOutput} JSON response
 */
function handleRolodexSubmit(data) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = 'Rolodex';
    var sheet = ss.getSheetByName(sheetName);

    // Create the Rolodex sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);

      // Add headers
      var headers = ['Timestamp', 'Name', 'Email', 'Location', 'Comment', 'Reader Name', 'Device'];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

      // Format header row
      sheet.getRange(1, 1, 1, headers.length)
        .setFontWeight('bold')
        .setBackground('#f0f0f0');

      // Set column widths for readability
      sheet.setColumnWidth(1, 180);  // Timestamp
      sheet.setColumnWidth(2, 150);  // Name
      sheet.setColumnWidth(3, 200);  // Email
      sheet.setColumnWidth(4, 150);  // Location
      sheet.setColumnWidth(5, 400);  // Comment
      sheet.setColumnWidth(6, 150);  // Reader Name
      sheet.setColumnWidth(7, 300);  // Device

      // Freeze header row
      sheet.setFrozenRows(1);

      Logger.log('Created new Rolodex sheet with headers');
    }

    // Prepare row data
    var rowData = [
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.location || '',
      data.comment || '',
      data.reader_name || 'anonymous',
      data.device || ''
    ];

    // Append the new row
    sheet.appendRow(rowData);

    Logger.log('Rolodex entry added: ' + data.name);

    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Entry added to Rolodex'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Error in handleRolodexSubmit: ' + error.toString());

    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}


// =============================================================================
// OPTIONAL: Test function to verify the handler works
// =============================================================================
//
// You can run this function manually in the Apps Script editor to test:
//
function testRolodexSubmit() {
  var testData = {
    action: 'rolodex_submit',
    timestamp: new Date().toISOString(),
    name: 'Test User',
    email: 'test@example.com',
    location: 'Detroit, MI',
    comment: 'This is a test comment from the Apps Script editor.',
    reader_name: 'test_reader',
    device: 'Apps Script Test'
  };

  var result = handleRolodexSubmit(testData);
  Logger.log('Test result: ' + result.getContent());
}
