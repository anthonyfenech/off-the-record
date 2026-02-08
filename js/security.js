// Security - Practical security utilities for the memoir site
// Input sanitization, rate limiting, session management

const LOGIN_STATE_KEY = 'otr_login_state';
const MAX_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

class Security {
    constructor() {
        this.rateLimits = new Map();
        // Load persistent login state from localStorage
        this._loadLoginState();
    }

    // Load login state from localStorage
    _loadLoginState() {
        try {
            const state = JSON.parse(localStorage.getItem(LOGIN_STATE_KEY));
            if (state) {
                this.loginAttempts = state.attempts || 0;
                this.lockoutUntil = state.lockoutUntil || 0;
            } else {
                this.loginAttempts = 0;
                this.lockoutUntil = 0;
            }
        } catch {
            this.loginAttempts = 0;
            this.lockoutUntil = 0;
        }
    }

    // Save login state to localStorage
    _saveLoginState() {
        localStorage.setItem(LOGIN_STATE_KEY, JSON.stringify({
            attempts: this.loginAttempts,
            lockoutUntil: this.lockoutUntil
        }));
    }

    // ═══════════════════════════════════════════════════════════════
    // INPUT SANITIZATION
    // ═══════════════════════════════════════════════════════════════

    // Sanitize user input to prevent XSS
    sanitizeInput(input) {
        if (typeof input !== 'string') return '';

        return input
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
    }

    // Sanitize for display (when you need to show user content)
    sanitizeForDisplay(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Validate email format
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validate name (letters, spaces, hyphens, apostrophes only)
    isValidName(name) {
        const nameRegex = /^[a-zA-Z\s'-]{1,100}$/;
        return nameRegex.test(name);
    }

    // Sanitize and validate guestbook entry
    validateGuestbookEntry(data) {
        const errors = [];

        // Name validation
        if (!data.name || data.name.trim().length < 1) {
            errors.push('Name is required');
        } else if (data.name.length > 100) {
            errors.push('Name must be under 100 characters');
        }

        // Message validation
        if (!data.message || data.message.trim().length < 1) {
            errors.push('Message is required');
        } else if (data.message.length > 280) {
            errors.push('Message must be under 280 characters');
        }

        // Email validation (if provided)
        if (data.email && !this.isValidEmail(data.email)) {
            errors.push('Invalid email format');
        }

        return {
            valid: errors.length === 0,
            errors,
            sanitized: {
                name: this.sanitizeInput(data.name || '').trim(),
                message: this.sanitizeInput(data.message || '').trim(),
                email: data.email ? this.sanitizeInput(data.email).trim() : ''
            }
        };
    }

    // ═══════════════════════════════════════════════════════════════
    // RATE LIMITING
    // ═══════════════════════════════════════════════════════════════

    // Check if action is rate limited
    isRateLimited(action, maxAttempts = 5, windowMs = 60000) {
        const now = Date.now();
        const key = action;

        if (!this.rateLimits.has(key)) {
            this.rateLimits.set(key, { attempts: [], blockedUntil: 0 });
        }

        const limit = this.rateLimits.get(key);

        // Check if currently blocked
        if (limit.blockedUntil > now) {
            const remainingSeconds = Math.ceil((limit.blockedUntil - now) / 1000);
            return { limited: true, remainingSeconds };
        }

        // Clean up old attempts outside the window
        limit.attempts = limit.attempts.filter(time => now - time < windowMs);

        // Check if over limit
        if (limit.attempts.length >= maxAttempts) {
            limit.blockedUntil = now + windowMs;
            return { limited: true, remainingSeconds: Math.ceil(windowMs / 1000) };
        }

        // Record this attempt
        limit.attempts.push(now);
        return { limited: false };
    }

    // Reset rate limit for an action
    resetRateLimit(action) {
        this.rateLimits.delete(action);
    }

    // ═══════════════════════════════════════════════════════════════
    // LOGIN PROTECTION (persisted to localStorage)
    // ═══════════════════════════════════════════════════════════════

    // Check login attempt (brute force protection)
    checkLoginAttempt() {
        const now = Date.now();

        // Reload state in case another tab modified it
        this._loadLoginState();

        // Check if locked out
        if (this.lockoutUntil > now) {
            const remainingSeconds = Math.ceil((this.lockoutUntil - now) / 1000);
            const remainingMinutes = Math.ceil(remainingSeconds / 60);
            return { allowed: false, remainingSeconds, remainingMinutes };
        }

        // If lockout expired, reset state
        if (this.lockoutUntil > 0 && this.lockoutUntil <= now) {
            this.loginAttempts = 0;
            this.lockoutUntil = 0;
            this._saveLoginState();
        }

        return { allowed: true, attemptsRemaining: MAX_ATTEMPTS - this.loginAttempts };
    }

    // Record failed login
    recordFailedLogin() {
        this.loginAttempts++;

        // Lock out after MAX_ATTEMPTS failed attempts for LOCKOUT_MINUTES
        if (this.loginAttempts >= MAX_ATTEMPTS) {
            this.lockoutUntil = Date.now() + (LOCKOUT_MINUTES * 60 * 1000);
            this._saveLoginState();
            return { locked: true, lockoutMinutes: LOCKOUT_MINUTES };
        }

        this._saveLoginState();
        return { locked: false, attemptsRemaining: MAX_ATTEMPTS - this.loginAttempts };
    }

    // Reset login attempts on success
    resetLoginAttempts() {
        this.loginAttempts = 0;
        this.lockoutUntil = 0;
        this._saveLoginState();
    }

    // ═══════════════════════════════════════════════════════════════
    // SESSION MANAGEMENT
    // ═══════════════════════════════════════════════════════════════

    // Create session with expiry
    createSession(key, expiryHours = 24) {
        const session = {
            authenticated: true,
            created: Date.now(),
            expires: Date.now() + (expiryHours * 60 * 60 * 1000)
        };
        localStorage.setItem(key, JSON.stringify(session));
    }

    // Check if session is valid
    isSessionValid(key) {
        try {
            const session = JSON.parse(localStorage.getItem(key));
            if (!session) return false;

            // Check expiry
            if (Date.now() > session.expires) {
                localStorage.removeItem(key);
                return false;
            }

            return session.authenticated === true;
        } catch {
            return false;
        }
    }

    // Clear session
    clearSession(key) {
        localStorage.removeItem(key);
    }
}

// Export single instance
export const security = new Security();
