/**
 * Guestbook Form Handler - OFF-THE-RECORD
 * =====================================
 * Handles form submission for the standalone Guestbook/guestbook page.
 * Submits entries to Google Sheets via Apps Script.
 * Loads and displays approved comments.
 */

(function() {
    'use strict';

    // DOM Elements
    var form = document.getElementById('guestbookForm');
    var submitBtn = document.getElementById('submitBtn');
    var successMessage = document.getElementById('successMessage');
    var errorMessage = document.getElementById('errorMessage');
    var commentField = document.getElementById('comment');

    // Original button text
    var originalButtonText = submitBtn ? submitBtn.textContent : 'SUBMIT';

    // Submission state
    var isSubmitting = false;

    /**
     * Show inline error for a field
     */
    function showFieldError(fieldId, message) {
        var field = document.getElementById(fieldId);
        if (!field) return;

        // Remove existing error
        clearFieldError(fieldId);

        // Create error element
        var errorEl = document.createElement('div');
        errorEl.className = 'field-error';
        errorEl.id = fieldId + '-error';
        errorEl.textContent = message;
        errorEl.style.cssText = 'color: #DC143C; font-family: var(--font-mono); font-size: 11px; margin-top: 4px;';

        // Insert after field
        field.parentNode.insertBefore(errorEl, field.nextSibling);

        // Add error styling to field
        field.style.borderColor = '#DC143C';
    }

    /**
     * Clear inline error for a field
     */
    function clearFieldError(fieldId) {
        var errorEl = document.getElementById(fieldId + '-error');
        if (errorEl) {
            errorEl.remove();
        }

        var field = document.getElementById(fieldId);
        if (field) {
            field.style.borderColor = '';
        }
    }

    /**
     * Clear all field errors
     */
    function clearAllFieldErrors() {
        ['name', 'email', 'comment'].forEach(function(fieldId) {
            clearFieldError(fieldId);
        });
    }

    /**
     * Validate form fields
     * @returns {boolean} True if valid
     */
    function validateForm() {
        var isValid = true;
        clearAllFieldErrors();

        var nameField = document.getElementById('name');
        var emailField = document.getElementById('email');

        // Name validation
        if (!nameField || !nameField.value.trim()) {
            showFieldError('name', 'Name is required');
            isValid = false;
        }

        // Email validation
        if (!emailField || !emailField.value.trim()) {
            showFieldError('email', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailField.value.trim())) {
            showFieldError('email', 'Please enter a valid email');
            isValid = false;
        }

        // Comment validation
        if (!commentField || !commentField.value.trim()) {
            showFieldError('comment', 'Comment is required');
            isValid = false;
        }

        return isValid;
    }

    /**
     * Simple email validation
     */
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    /**
     * Show success message
     */
    function showSuccess() {
        if (successMessage) {
            successMessage.style.display = 'block';
            if (errorMessage) errorMessage.style.display = 'none';
        }

        // Hide after 5 seconds
        setTimeout(function() {
            if (successMessage) {
                successMessage.style.display = 'none';
            }
        }, 5000);
    }

    /**
     * Show error message
     */
    function showError(message) {
        if (errorMessage) {
            if (message) {
                errorMessage.textContent = message;
            }
            errorMessage.style.display = 'block';
            if (successMessage) successMessage.style.display = 'none';
        }

        // Hide after 5 seconds
        setTimeout(function() {
            if (errorMessage) {
                errorMessage.style.display = 'none';
            }
        }, 5000);
    }

    /**
     * Set button state
     */
    function setButtonState(disabled, text) {
        if (submitBtn) {
            submitBtn.disabled = disabled;
            submitBtn.textContent = text || originalButtonText;
        }
    }

    /**
     * Reset form
     */
    function resetForm() {
        if (form) {
            form.reset();
        }
        clearAllFieldErrors();
    }

    /**
     * Handle form submission
     */
    function handleSubmit(e) {
        e.preventDefault();

        // Prevent double submission
        if (isSubmitting) {
            return;
        }

        // Validate
        if (!validateForm()) {
            return;
        }

        // Build payload
        var payload = {
            action: 'guestbook_submit',
            timestamp: new Date().toISOString(),
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            comment: document.getElementById('comment').value.trim(),
            reader_name: localStorage.getItem('otr_reader_name') || 'anonymous',
            device: navigator.userAgent
        };

        // Set submitting state
        isSubmitting = true;
        setButtonState(true, 'SENDING...');

        // Get guestbook endpoint
        var endpoint = (typeof OTR_ANALYTICS_CONFIG !== 'undefined')
            ? (OTR_ANALYTICS_CONFIG.guestbookUrl || OTR_ANALYTICS_CONFIG.analyticsScriptUrl)
            : null;
        if (!endpoint) {
            console.error('[Guestbook] No endpoint configured');
            isSubmitting = false;
            setButtonState(false, originalButtonText);
            showError('Guestbook is not configured. Please try again later.');
            return;
        }

        // Submit to Google Sheets
        fetch(endpoint, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(function() {
            // With no-cors we can't read response, assume success
            console.log('[Guestbook] Submission sent');
            isSubmitting = false;
            setButtonState(false, originalButtonText);
            resetForm();
            showSuccess();
        })
        .catch(function(error) {
            console.error('[Guestbook] Submission failed:', error);
            isSubmitting = false;
            setButtonState(false, originalButtonText);
            showError('Something went wrong. Please try again.');
        });
    }

    /**
     * Initialize
     */
    function init() {
        if (!form) {
            console.warn('[Guestbook] Form not found');
            return;
        }

        // Attach form submit handler
        form.addEventListener('submit', handleSubmit);

        // Clear field errors on input
        ['name', 'email', 'comment'].forEach(function(fieldId) {
            var field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('input', function() {
                    clearFieldError(fieldId);
                });
            }
        });

        console.log('[Guestbook] Initialized');
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
