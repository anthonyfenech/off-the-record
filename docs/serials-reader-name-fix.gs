/**
 * OFF-THE-RECORD Serial Assignment Handler - Google Apps Script
 * ==============================================================
 *
 * This script handles serial number assignment for PDF downloads.
 * It assigns unique serial numbers and logs the reader name.
 *
 * DEPLOYMENT INSTRUCTIONS:
 * ========================
 * 1. Open your existing Google Apps Script project (the serial endpoint)
 * 2. Replace or update your existing assign_serial handler with this code
 * 3. Rename the "User-Agent" column header to "Reader" in the Serials sheet
 * 4. After updating the code:
 *    - Click "Deploy" > "Manage deployments"
 *    - Click the pencil icon to edit your existing deployment
 *    - Change "Version" to "New version"
 *    - Click "Deploy"
 * 5. The existing deployment URL will now read reader_name from the request
 *
 * IMPORTANT: Do NOT create a new deployment - update the existing one so the URL stays the same.
 *
 * SHEET STRUCTURE (Serials tab):
 * ==============================
 * Column A: Serial     (e.g., "000-000001-10")
 * Column B: Timestamp  (e.g., "2026-04-03T12:34:56.789Z")
 * Column C: Reader     (e.g., "Crimson Phoenix" or "anonymous")
 *
 * If you have an existing "User-Agent" column, rename it to "Reader".
 */

// Configuration
var SERIALS_SHEET_NAME = 'Serials';

/**
 * Handle GET requests for serial assignment
 * Add this case to your existing doGet() function:
 *
 *   case 'assign_serial':
 *     return handleAssignSerial(e);
 */
function handleAssignSerial(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SERIALS_SHEET_NAME);

    // Create the Serials sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(SERIALS_SHEET_NAME);

      // Add headers
      var headers = ['Serial', 'Timestamp', 'Reader'];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

      // Format header row
      sheet.getRange(1, 1, 1, headers.length)
        .setFontWeight('bold')
        .setBackground('#f0f0f0');

      // Set column widths
      sheet.setColumnWidth(1, 150);  // Serial
      sheet.setColumnWidth(2, 200);  // Timestamp
      sheet.setColumnWidth(3, 180);  // Reader

      // Freeze header row
      sheet.setFrozenRows(1);

      Logger.log('Created new Serials sheet with headers');
    }

    // Get the next serial number
    var lastRow = sheet.getLastRow();
    var nextNumber = lastRow; // Row 1 is header, so lastRow = count of serials

    // Format serial: 000-XXXXXX-10
    var serialNumber = '000-' + String(nextNumber).padStart(6, '0') + '-10';

    // Get reader name from request (sent by pdf-stamper.js)
    var readerName = e.parameter.reader_name || 'anonymous';

    // Prepare row data
    var rowData = [
      serialNumber,
      new Date().toISOString(),
      readerName
    ];

    // Append the new row
    sheet.appendRow(rowData);

    Logger.log('Serial assigned: ' + serialNumber + ' to ' + readerName);

    // Return the serial number
    return ContentService.createTextOutput(JSON.stringify({
      serial: serialNumber,
      status: 'success'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Error in handleAssignSerial: ' + error.toString());

    return ContentService.createTextOutput(JSON.stringify({
      serial: '000-ERROR-10',
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}


/**
 * UPDATED doGet() function
 * ========================
 * Merge this with your existing doGet() function.
 * Add the 'assign_serial' case to your switch statement.
 */
function doGet(e) {
  var action = e.parameter.action;

  switch (action) {
    case 'assign_serial':
      return handleAssignSerial(e);

    case 'getCounters':
      return handleGetCounters();

    case 'getReaderCount':
      return handleGetReaderCount();

    default:
      return ContentService.createTextOutput(JSON.stringify({
        error: 'Unknown action',
        validActions: ['assign_serial', 'getCounters', 'getReaderCount']
      })).setMimeType(ContentService.MimeType.JSON);
  }
}


// =============================================================================
// OPTIONAL: Test function to verify the handler works
// =============================================================================
function testAssignSerial() {
  var mockEvent = {
    parameter: {
      action: 'assign_serial',
      reader_name: 'Test Phoenix'
    }
  };

  var result = handleAssignSerial(mockEvent);
  Logger.log('Test result: ' + result.getContent());
}
