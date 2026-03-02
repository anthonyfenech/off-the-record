/**
 * OTR Analytics - Google Apps Script
 * Handles incoming analytics events and maintains Reader Summary
 */

// Sheet names
const RAW_DATA_SHEET = 'Raw Data';
const READER_SUMMARY_SHEET = 'Reader Summary';
const COUNTERS_SHEET = 'Counters';

// Counter cell references (in Counters sheet)
// Row 1: Headers, Row 2: Values
const COUNTER_CELLS = {
  pdf_download: 'B2',      // PDF Downloads
  epub_download: 'C2',     // EPUB Downloads
  apple_books_click: 'D2', // Apple Books clicks
  kindle_click: 'E2',      // Kindle clicks
  google_play_click: 'F2'  // Google Play clicks
};

// Column headers for Reader Summary
const READER_SUMMARY_HEADERS = [
  'Reader Name',
  'Total Events',
  'Total Sessions',
  'Furthest Chapter',
  'Last Page Seen',
  'First Seen',
  'Last Seen',
  'Device',
  'Time Pattern',
  'Time Buckets'
];

/**
 * Handle incoming POST requests from analytics
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Log to Raw Data sheet (always happens first)
    logRawEvent(data);

    // Check if this is a Get The Book event
    const eventType = data.event_type || data.event;
    if (eventType && COUNTER_CELLS[eventType]) {
      incrementCounter(eventType);
    }

    // Update Reader Summary for regular analytics events
    if (data.readerName || data.reader_name) {
      updateReaderSummary(data);
    }

    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error('Error processing event:', error);
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Log raw event to Raw Data sheet
 */
function logRawEvent(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(RAW_DATA_SHEET);

  if (!sheet) {
    sheet = ss.insertSheet(RAW_DATA_SHEET);
    // Add headers
    sheet.appendRow([
      'Timestamp', 'Event', 'Reader Name', 'Visitor ID', 'Session ID',
      'Page', 'Chapter', 'Device Type', 'Browser', 'Screen Size',
      'Scroll Depth', 'Time Spent', 'URL', 'Extra Data'
    ]);
  }

  // Handle both old format (event) and new format (event_type)
  const eventName = data.event_type || data.event || '';
  const readerName = data.reader_name || data.readerName || 'Unknown Reader';
  const deviceType = data.device || data.deviceType || '';

  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    eventName,
    readerName,
    data.visitorId || '',
    data.sessionId || '',
    data.page || '',
    data.chapter || data.format || '',
    deviceType,
    data.browser || '',
    data.screenSize || '',
    data.scrollDepth || '',
    data.timeSpent || '',
    data.url || data.referrer || '',
    JSON.stringify(data)
  ]);
}

/**
 * Increment a counter in the Counters sheet
 */
function incrementCounter(eventType) {
  const cellRef = COUNTER_CELLS[eventType];
  if (!cellRef) {
    console.warn('No counter cell defined for event type:', eventType);
    return;
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(COUNTERS_SHEET);

  // Create Counters sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(COUNTERS_SHEET);
    // Add headers
    sheet.getRange('A1:F1').setValues([['Counter', 'PDF Downloads', 'EPUB Downloads', 'Apple Books', 'Kindle', 'Google Play']]);
    sheet.getRange('A2:F2').setValues([['Count', 0, 0, 0, 0, 0]]);
    sheet.getRange('A1:F1').setFontWeight('bold');
    console.log('Created Counters sheet with headers');
  }

  try {
    const cell = sheet.getRange(cellRef);
    const currentValue = cell.getValue();
    const numericValue = (typeof currentValue === 'number' && !isNaN(currentValue)) ? currentValue : 0;
    cell.setValue(numericValue + 1);
    console.log('Incremented', eventType, 'counter from', numericValue, 'to', numericValue + 1);
  } catch (error) {
    console.error('Error incrementing counter for', eventType, ':', error);
    // Don't throw - logging to Raw Data already succeeded
  }
}

/**
 * Get current counter values (for admin dashboard)
 */
function getCounters() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(COUNTERS_SHEET);

  if (!sheet) {
    return {
      pdf_download: 0,
      epub_download: 0,
      apple_books_click: 0,
      kindle_click: 0,
      google_play_click: 0
    };
  }

  const counters = {};
  for (const [eventType, cellRef] of Object.entries(COUNTER_CELLS)) {
    try {
      const value = sheet.getRange(cellRef).getValue();
      counters[eventType] = (typeof value === 'number' && !isNaN(value)) ? value : 0;
    } catch (e) {
      counters[eventType] = 0;
    }
  }

  return counters;
}

/**
 * Set a counter value (for manual corrections)
 */
function setCounter(eventType, value) {
  const cellRef = COUNTER_CELLS[eventType];
  if (!cellRef) {
    throw new Error('Unknown counter type: ' + eventType);
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(COUNTERS_SHEET);

  if (!sheet) {
    throw new Error('Counters sheet not found');
  }

  const numericValue = parseInt(value, 10);
  if (isNaN(numericValue) || numericValue < 0) {
    throw new Error('Invalid counter value: ' + value);
  }

  sheet.getRange(cellRef).setValue(numericValue);
  return { success: true, eventType: eventType, newValue: numericValue };
}

/**
 * Update or create Reader Summary entry
 */
function updateReaderSummary(data) {
  const readerName = data.readerName;
  if (!readerName || readerName === 'Unknown Reader') return;

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(READER_SUMMARY_SHEET);

  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(READER_SUMMARY_SHEET);
    sheet.appendRow(READER_SUMMARY_HEADERS);
    sheet.getRange(1, 1, 1, READER_SUMMARY_HEADERS.length).setFontWeight('bold');
  }

  // Find existing reader row
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  let readerRow = -1;

  for (let i = 1; i < values.length; i++) {
    if (values[i][0] === readerName) {
      readerRow = i + 1; // 1-indexed
      break;
    }
  }

  const now = new Date().toISOString();
  const hour = new Date().getHours();
  const timeBucket = getTimeBucket(hour);

  if (readerRow === -1) {
    // New reader - add row
    const sessionId = data.sessionId || '';
    sheet.appendRow([
      readerName,                                    // Reader Name
      1,                                             // Total Events
      1,                                             // Total Sessions
      data.chapter || 0,                             // Furthest Chapter
      data.page || '',                               // Last Page Seen
      now,                                           // First Seen
      now,                                           // Last Seen
      data.deviceType || 'unknown',                  // Device
      timeBucket,                                    // Time Pattern
      timeBucket + ':1'                              // Time Buckets (bucket:count)
    ]);
  } else {
    // Existing reader - update row
    const row = values[readerRow - 1];
    const currentEvents = parseInt(row[1]) || 0;
    const currentSessions = parseInt(row[2]) || 0;
    const currentFurthest = parseInt(row[3]) || 0;
    const existingTimeBuckets = row[9] || '';

    // Check if this is a new session
    const lastSessionId = getLastSessionId(readerName);
    const isNewSession = !lastSessionId || lastSessionId !== data.sessionId;

    // Update furthest chapter if current is higher
    const chapter = parseInt(data.chapter) || 0;
    const furthestChapter = Math.max(currentFurthest, chapter);

    // Update time buckets
    const timeBuckets = updateTimeBuckets(existingTimeBuckets, timeBucket);

    // Determine primary time pattern
    const timePattern = getTimePattern(timeBuckets);

    // Update the row
    sheet.getRange(readerRow, 2).setValue(currentEvents + 1);           // Total Events
    if (isNewSession) {
      sheet.getRange(readerRow, 3).setValue(currentSessions + 1);       // Total Sessions
    }
    sheet.getRange(readerRow, 4).setValue(furthestChapter);             // Furthest Chapter
    sheet.getRange(readerRow, 5).setValue(data.page || row[4]);         // Last Page Seen
    sheet.getRange(readerRow, 7).setValue(now);                         // Last Seen
    sheet.getRange(readerRow, 8).setValue(data.deviceType || row[7]);   // Device
    sheet.getRange(readerRow, 9).setValue(timePattern);                 // Time Pattern
    sheet.getRange(readerRow, 10).setValue(timeBuckets);                // Time Buckets

    // Store session ID for tracking
    storeLastSessionId(readerName, data.sessionId);
  }
}

/**
 * Get time bucket name based on hour
 */
function getTimeBucket(hour) {
  if (hour >= 5 && hour < 9) return 'Early Morning';
  if (hour >= 9 && hour < 12) return 'Morning';
  if (hour >= 12 && hour < 14) return 'Lunch';
  if (hour >= 14 && hour < 17) return 'Afternoon';
  if (hour >= 17 && hour < 20) return 'Evening';
  if (hour >= 20 && hour < 23) return 'Night';
  return 'Late Night';
}

/**
 * Update time bucket counts
 * Format: "Morning:5,Evening:3,Night:2"
 */
function updateTimeBuckets(existing, newBucket) {
  const buckets = {};

  // Parse existing
  if (existing) {
    existing.split(',').forEach(pair => {
      const [bucket, count] = pair.split(':');
      if (bucket) {
        buckets[bucket.trim()] = parseInt(count) || 0;
      }
    });
  }

  // Increment new bucket
  buckets[newBucket] = (buckets[newBucket] || 0) + 1;

  // Convert back to string, sorted by count descending
  return Object.entries(buckets)
    .sort((a, b) => b[1] - a[1])
    .map(([bucket, count]) => `${bucket}:${count}`)
    .join(',');
}

/**
 * Get primary time pattern from buckets
 */
function getTimePattern(bucketsStr) {
  if (!bucketsStr) return 'Unknown';

  const parts = bucketsStr.split(',');
  if (parts.length === 0) return 'Unknown';

  // Return the most common bucket
  const [topBucket] = parts[0].split(':');
  return topBucket || 'Unknown';
}

/**
 * Store last session ID for reader (uses cache)
 */
function storeLastSessionId(readerName, sessionId) {
  const cache = CacheService.getScriptCache();
  cache.put('session_' + readerName, sessionId, 21600); // 6 hours
}

/**
 * Get last session ID for reader
 */
function getLastSessionId(readerName) {
  const cache = CacheService.getScriptCache();
  return cache.get('session_' + readerName);
}

/**
 * Manual function to rebuild Reader Summary from Raw Data
 * Run this if you need to regenerate the summary
 */
function rebuildReaderSummary() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const rawSheet = ss.getSheetByName(RAW_DATA_SHEET);

  if (!rawSheet) {
    console.log('No Raw Data sheet found');
    return;
  }

  // Delete existing summary sheet
  const existingSummary = ss.getSheetByName(READER_SUMMARY_SHEET);
  if (existingSummary) {
    ss.deleteSheet(existingSummary);
  }

  // Create new summary sheet
  const summarySheet = ss.insertSheet(READER_SUMMARY_SHEET);
  summarySheet.appendRow(READER_SUMMARY_HEADERS);
  summarySheet.getRange(1, 1, 1, READER_SUMMARY_HEADERS.length).setFontWeight('bold');

  // Process raw data
  const rawData = rawSheet.getDataRange().getValues();
  const readers = {};

  // Skip header row
  for (let i = 1; i < rawData.length; i++) {
    const row = rawData[i];
    const timestamp = row[0];
    const event = row[1];
    const readerName = row[2];
    const sessionId = row[4];
    const page = row[5];
    const chapter = parseInt(row[6]) || 0;
    const deviceType = row[7];

    if (!readerName || readerName === 'Unknown Reader') continue;

    if (!readers[readerName]) {
      readers[readerName] = {
        totalEvents: 0,
        sessions: new Set(),
        furthestChapter: 0,
        lastPage: '',
        firstSeen: timestamp,
        lastSeen: timestamp,
        device: deviceType,
        timeBuckets: {}
      };
    }

    const reader = readers[readerName];
    reader.totalEvents++;
    if (sessionId) reader.sessions.add(sessionId);
    reader.furthestChapter = Math.max(reader.furthestChapter, chapter);
    reader.lastPage = page || reader.lastPage;
    reader.lastSeen = timestamp;

    // Track time bucket
    const date = new Date(timestamp);
    const hour = date.getHours();
    const bucket = getTimeBucket(hour);
    reader.timeBuckets[bucket] = (reader.timeBuckets[bucket] || 0) + 1;
  }

  // Write summary rows
  Object.entries(readers).forEach(([name, data]) => {
    const timeBucketsStr = Object.entries(data.timeBuckets)
      .sort((a, b) => b[1] - a[1])
      .map(([bucket, count]) => `${bucket}:${count}`)
      .join(',');

    const timePattern = getTimePattern(timeBucketsStr);

    summarySheet.appendRow([
      name,
      data.totalEvents,
      data.sessions.size,
      data.furthestChapter,
      data.lastPage,
      data.firstSeen,
      data.lastSeen,
      data.device,
      timePattern,
      timeBucketsStr
    ]);
  });

  console.log('Rebuilt Reader Summary with', Object.keys(readers).length, 'readers');
}
