/**
 * Rolodex Guestbook - OFF-THE-RECORD
 *
 * Handles form submission to Google Sheets and displays approved comments.
 *
 * SETUP INSTRUCTIONS:
 * ===================
 *
 * 1. CREATE GOOGLE SHEET:
 *    - Go to https://sheets.google.com and create a new spreadsheet
 *    - Name it "Rolodex Submissions"
 *    - In row 1, add headers: Timestamp | Name | Email | Location | Comment | Approved
 *    - Format column F (Approved) as checkboxes: Select column F → Insert → Checkbox
 *
 * 2. CREATE GOOGLE APPS SCRIPT:
 *    - In your spreadsheet, go to Extensions → Apps Script
 *    - Delete any existing code and paste the following:
 *
 * ============ GOOGLE APPS SCRIPT CODE - START ============
 *
 * // Configuration
 * const SHEET_NAME = 'Sheet1';
 * const HEADERS = ['Timestamp', 'Name', 'Email', 'Location', 'Comment', 'Approved'];
 *
 * // Handle POST requests (form submissions)
 * function doPost(e) {
 *   try {
 *     const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
 *
 *     // Parse incoming data
 *     const data = JSON.parse(e.postData.contents);
 *
 *     // Validate required fields
 *     if (!data.name || !data.email || !data.location || !data.comment) {
 *       return createJsonResponse({ success: false, error: 'Missing required fields' });
 *     }
 *
 *     // Validate comment length
 *     if (data.comment.length > 500) {
 *       return createJsonResponse({ success: false, error: 'Comment exceeds 500 characters' });
 *     }
 *
 *     // Sanitize inputs (basic XSS prevention)
 *     const sanitize = (str) => str.replace(/<[^>]*>/g, '').trim();
 *
 *     // Add new row
 *     sheet.appendRow([
 *       new Date().toISOString(),
 *       sanitize(data.name).substring(0, 100),
 *       sanitize(data.email).substring(0, 100),
 *       sanitize(data.location).substring(0, 100),
 *       sanitize(data.comment).substring(0, 500),
 *       false // Not approved by default
 *     ]);
 *
 *     return createJsonResponse({ success: true, message: 'Submission received' });
 *
 *   } catch (error) {
 *     return createJsonResponse({ success: false, error: error.toString() });
 *   }
 * }
 *
 * // Handle GET requests (fetch approved comments)
 * function doGet(e) {
 *   try {
 *     const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
 *     const data = sheet.getDataRange().getValues();
 *
 *     // Skip header row, filter approved entries
 *     const approvedComments = [];
 *     for (let i = 1; i < data.length; i++) {
 *       if (data[i][5] === true) { // Approved column
 *         approvedComments.push({
 *           timestamp: data[i][0],
 *           name: data[i][1],
 *           location: data[i][3],
 *           comment: data[i][4]
 *           // Note: Email (column 2) is NOT included for privacy
 *         });
 *       }
 *     }
 *
 *     // Sort by timestamp descending (newest first)
 *     approvedComments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
 *
 *     return createJsonResponse({ success: true, comments: approvedComments });
 *
 *   } catch (error) {
 *     return createJsonResponse({ success: false, error: error.toString(), comments: [] });
 *   }
 * }
 *
 * // Helper to create JSON response with CORS headers
 * function createJsonResponse(data) {
 *   return ContentService
 *     .createTextOutput(JSON.stringify(data))
 *     .setMimeType(ContentService.MimeType.JSON);
 * }
 *
 * // Initialize sheet with headers if empty
 * function initializeSheet() {
 *   const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
 *   if (sheet.getLastRow() === 0) {
 *     sheet.appendRow(HEADERS);
 *     // Format Approved column as checkboxes
 *     sheet.getRange('F2:F').insertCheckboxes();
 *   }
 * }
 *
 * ============ GOOGLE APPS SCRIPT CODE - END ============
 *
 * 3. DEPLOY AS WEB APP:
 *    - Click "Deploy" → "New deployment"
 *    - Click gear icon → Select "Web app"
 *    - Description: "Rolodex Guestbook"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 *    - Click "Deploy"
 *    - Authorize the app when prompted
 *    - Copy the Web app URL (looks like: https://script.google.com/macros/s/xxx/exec)
 *
 * 4. UPDATE THE URL BELOW:
 *    - Replace the SCRIPT_URL value with your Web app URL
 *
 * 5. TO APPROVE COMMENTS:
 *    - Open your Google Sheet
 *    - Check the checkbox in the "Approved" column for comments you want to display
 *    - Comments will appear on the website within 60 seconds
 */

// ============================================================
// CONFIGURATION - Update this URL after deploying your script
// ============================================================
const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';

// ============================================================
// ROLODEX CLASS
// ============================================================

class Rolodex {
    constructor() {
        this.form = document.getElementById('rolodexForm');
        this.commentsList = document.getElementById('commentsList');
        this.charCount = document.getElementById('charCount');
        this.submitBtn = document.getElementById('submitBtn');
        this.successMessage = document.getElementById('successMessage');
        this.errorMessage = document.getElementById('errorMessage');
        this.commentTextarea = document.getElementById('comment');

        this.maxChars = 500;
        this.refreshInterval = 60000; // 60 seconds

        this.init();
    }

    init() {
        // Set up event listeners
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }

        if (this.commentTextarea) {
            this.commentTextarea.addEventListener('input', () => this.updateCharCount());
        }

        // Load comments on page load
        this.loadComments();

        // Set up auto-refresh
        setInterval(() => this.loadComments(), this.refreshInterval);
    }

    // Update character counter
    updateCharCount() {
        const currentLength = this.commentTextarea.value.length;
        this.charCount.textContent = `${currentLength} / ${this.maxChars}`;

        // Add warning class when approaching limit
        if (currentLength >= this.maxChars * 0.9) {
            this.charCount.classList.add('warning');
        } else {
            this.charCount.classList.remove('warning');
        }
    }

    // Show message (success or error)
    showMessage(type, customMessage = null) {
        this.hideMessages();

        const messageEl = type === 'success' ? this.successMessage : this.errorMessage;

        if (customMessage) {
            messageEl.textContent = customMessage;
        }

        messageEl.classList.add('visible');

        // Auto-hide after 5 seconds
        setTimeout(() => {
            messageEl.classList.remove('visible');
        }, 5000);
    }

    // Hide all messages
    hideMessages() {
        this.successMessage.classList.remove('visible');
        this.errorMessage.classList.remove('visible');
    }

    // Handle form submission
    async handleSubmit(e) {
        e.preventDefault();

        // Check if script URL is configured
        if (SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE') {
            this.showMessage('error', 'Guestbook is not configured yet. Please check back later.');
            return;
        }

        // Get form data
        const formData = {
            name: this.form.name.value.trim(),
            email: this.form.email.value.trim(),
            location: this.form.location.value.trim(),
            comment: this.form.comment.value.trim()
        };

        // Client-side validation
        if (!formData.name || !formData.email || !formData.location || !formData.comment) {
            this.showMessage('error', 'Please fill in all required fields.');
            return;
        }

        if (formData.comment.length > this.maxChars) {
            this.showMessage('error', `Comment must be ${this.maxChars} characters or less.`);
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            this.showMessage('error', 'Please enter a valid email address.');
            return;
        }

        // Disable submit button
        this.submitBtn.disabled = true;
        this.submitBtn.textContent = 'SUBMITTING...';

        try {
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Required for Google Apps Script
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            // Note: With no-cors mode, we can't read the response
            // So we assume success if no error was thrown
            this.showMessage('success');
            this.form.reset();
            this.charCount.textContent = `0 / ${this.maxChars}`;
            this.charCount.classList.remove('warning');

        } catch (error) {
            console.error('Submission error:', error);
            this.showMessage('error', 'Failed to submit. Please try again later.');
        } finally {
            // Re-enable submit button
            this.submitBtn.disabled = false;
            this.submitBtn.textContent = 'SIGN IT';
        }
    }

    // Format date as "Month DD, YYYY"
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Load and display approved comments
    async loadComments() {
        // Check if script URL is configured
        if (SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE') {
            this.commentsList.innerHTML = '<p class="rolodex-empty">Be the first to sign the guestbook.</p>';
            return;
        }

        try {
            const response = await fetch(SCRIPT_URL);
            const data = await response.json();

            if (data.success && data.comments && data.comments.length > 0) {
                this.renderComments(data.comments);
            } else {
                this.commentsList.innerHTML = '<p class="rolodex-empty">Be the first to sign the guestbook.</p>';
            }

        } catch (error) {
            console.error('Error loading comments:', error);
            // Don't show error to user, just show empty state
            this.commentsList.innerHTML = '<p class="rolodex-empty">Be the first to sign the guestbook.</p>';
        }
    }

    // Render comments to DOM
    renderComments(comments) {
        if (!comments || comments.length === 0) {
            this.commentsList.innerHTML = '<p class="rolodex-empty">Be the first to sign the guestbook.</p>';
            return;
        }

        this.commentsList.innerHTML = comments.map(comment => `
            <div class="rolodex-comment">
                <div class="rolodex-comment-header">
                    <span class="rolodex-comment-name">${this.escapeHtml(comment.name)}</span>
                    <span class="rolodex-comment-location">${this.escapeHtml(comment.location)}</span>
                    <span class="rolodex-comment-date">${this.formatDate(comment.timestamp)}</span>
                </div>
                <p class="rolodex-comment-text">${this.escapeHtml(comment.comment)}</p>
            </div>
        `).join('');
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    new Rolodex();
});
