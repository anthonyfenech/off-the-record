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
    var charCount = document.getElementById('charCount');
    var commentField = document.getElementById('comment');
    var commentsList = document.getElementById('commentsList');

    // Original button text
    var originalButtonText = submitBtn ? submitBtn.textContent : 'SIGN THE GUESTBOOK';

    // Submission state
    var isSubmitting = false;

    /**
     * Initialize character counter
     */
    function initCharCounter() {
        if (!commentField || !charCount) return;

        commentField.addEventListener('input', function() {
            var length = commentField.value.length;
            var maxLength = commentField.maxLength || 500;
            charCount.textContent = length + ' / ' + maxLength;

            // Add warning class when near limit
            if (length >= maxLength - 20) {
                charCount.classList.add('warning');
            } else {
                charCount.classList.remove('warning');
            }
        });
    }

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
        if (charCount) {
            charCount.textContent = '0 / 500';
            charCount.classList.remove('warning');
        }
        clearAllFieldErrors();
    }

    /**
     * Format date for display
     */
    function formatDate(isoString) {
        try {
            var date = new Date(isoString);
            var options = { month: 'short', day: 'numeric', year: 'numeric' };
            return date.toLocaleDateString('en-US', options);
        } catch (e) {
            return '';
        }
    }

    /**
     * Render a single comment
     */
    function renderComment(comment) {
        var div = document.createElement('div');
        div.style.cssText = 'padding: var(--space-md) 0; border-bottom: 1px solid var(--color-border);';

        var header = document.createElement('div');
        header.style.cssText = 'font-family: var(--font-mono); font-size: var(--font-size-xs); color: var(--color-text-secondary); margin-bottom: var(--space-xs);';
        header.textContent = comment.name;
        if (comment.location) {
            header.textContent += ' \u2022 ' + comment.location;
        }
        if (comment.date) {
            header.textContent += ' \u2022 ' + formatDate(comment.date);
        }

        var text = document.createElement('p');
        text.style.cssText = 'font-family: var(--font-serif); font-size: var(--font-size-base); line-height: 1.6; margin: 0;';
        text.textContent = comment.comment;

        div.appendChild(header);
        div.appendChild(text);

        return div;
    }

    /**
     * Load and display approved comments
     */
    function loadComments() {
        if (!commentsList) {
            console.warn('[Guestbook] Comments list container not found');
            return;
        }

        // Get guestbook endpoint
        var endpoint = (typeof OTR_ANALYTICS_CONFIG !== 'undefined')
            ? (OTR_ANALYTICS_CONFIG.guestbookUrl || OTR_ANALYTICS_CONFIG.analyticsScriptUrl)
            : null;
        if (!endpoint) {
            commentsList.innerHTML = '<p style="font-family: var(--font-mono); font-size: var(--font-size-sm); color: var(--color-text-tertiary); font-style: italic;">No comments yet. Be the first to sign the guestbook!</p>';
            return;
        }

        // Fetch approved comments
        fetch(endpoint + '?action=getApprovedComments', {
            method: 'GET',
            mode: 'cors'
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(function(data) {
            if (!data || !data.comments || data.comments.length === 0) {
                commentsList.innerHTML = '<p style="font-family: var(--font-mono); font-size: var(--font-size-sm); color: var(--color-text-tertiary); font-style: italic;">No comments yet. Be the first to sign the guestbook!</p>';
                return;
            }

            // Clear loading message
            commentsList.innerHTML = '';

            // Render each comment
            data.comments.forEach(function(comment) {
                commentsList.appendChild(renderComment(comment));
            });

            console.log('[Guestbook] Loaded ' + data.comments.length + ' comments');
        })
        .catch(function(error) {
            console.warn('[Guestbook] Could not load comments:', error.message);
            commentsList.innerHTML = '<p style="font-family: var(--font-mono); font-size: var(--font-size-sm); color: var(--color-text-tertiary); font-style: italic;">No comments yet. Be the first to sign the guestbook!</p>';
        });
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

        // Initialize character counter
        initCharCounter();

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

        // Load approved comments
        loadComments();

        console.log('[Guestbook] Initialized');
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
