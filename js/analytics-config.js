// OFF-THE-RECORD Analytics Configuration
// ============================================
// Tracking is ON and live.
// analytics.js reads this file at startup and depends on it being
// loaded first, so it must stay listed before analytics.js on every page.
// .github/scripts/check-analytics-contract.sh fails the build if
// trackingEnabled is ever anything but literally true.
// Last updated: 2026-09-17
// ============================================
const OTR_ANALYTICS_CONFIG = {
  trackingEnabled: true,  // guarded by the analytics contract check
  analyticsScriptUrl: 'https://script.google.com/macros/s/AKfycbzxbj0xjFmjzDA6L5MNG4IqZKuiI0mb9SAOOXhJY_UeQmeTWE7ldaas1fFC6xqUzHn0/exec',
  readerCounterUrl: 'https://script.google.com/macros/s/AKfycbzxbj0xjFmjzDA6L5MNG4IqZKuiI0mb9SAOOXhJY_UeQmeTWE7ldaas1fFC6xqUzHn0/exec',
  guestbookUrl: 'https://script.google.com/macros/s/AKfycbzxbj0xjFmjzDA6L5MNG4IqZKuiI0mb9SAOOXhJY_UeQmeTWE7ldaas1fFC6xqUzHn0/exec'
};
