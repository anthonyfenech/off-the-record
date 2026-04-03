/**
 * Standalone Password Authentication for OFF-THE-RECORD
 * ======================================================
 * Self-contained auth module that can be loaded on any page needing password protection.
 * Uses the same salt, hash, and session logic as the main auth.js module.
 *
 * USAGE: Add <script src="./js/auth-standalone.min.js"></script> to any page with:
 *   - #passwordGate container
 *   - #passwordForm form
 *   - #passwordInput input field
 *   - #passwordError error message
 *   - #rememberMe checkbox (optional)
 */

(function() {
    'use strict';

    // ========== CONFIGURATION ==========
    var PASSWORD_HASH = -290606366;  // Hash of 'GOATMODE'
    var AUTH_KEY = 'otr_beta_session';
    var SESSION_HOURS = 168;         // 7 days
    var REMEMBER_ME_HOURS = 720;     // 30 days
    var LOGIN_STATE_KEY = 'otr_login_state';
    var MAX_ATTEMPTS = 5;
    var LOCKOUT_MINUTES = 15;

    // ========== HASH FUNCTION ==========
    function simpleHash(str) {
        if (!str || typeof str !== 'string') {
            return 0;
        }
        var hash = 0;
        var salt = 'otr2024beta';
        var salted = salt + str.toUpperCase() + salt;
        for (var i = 0; i < salted.length; i++) {
            var char = salted.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash;
    }

    // ========== LOGIN STATE (BRUTE FORCE PROTECTION) ==========
    function loadLoginState() {
        try {
            var state = JSON.parse(localStorage.getItem(LOGIN_STATE_KEY));
            if (state) {
                return {
                    attempts: state.attempts || 0,
                    lockoutUntil: state.lockoutUntil || 0
                };
            }
        } catch (e) {}
        return { attempts: 0, lockoutUntil: 0 };
    }

    function saveLoginState(state) {
        localStorage.setItem(LOGIN_STATE_KEY, JSON.stringify(state));
    }

    function checkLoginAttempt() {
        var now = Date.now();
        var state = loadLoginState();

        // Check if locked out
        if (state.lockoutUntil > now) {
            var remainingSeconds = Math.ceil((state.lockoutUntil - now) / 1000);
            var remainingMinutes = Math.ceil(remainingSeconds / 60);
            return { allowed: false, remainingSeconds: remainingSeconds, remainingMinutes: remainingMinutes };
        }

        // If lockout expired, reset state
        if (state.lockoutUntil > 0 && state.lockoutUntil <= now) {
            saveLoginState({ attempts: 0, lockoutUntil: 0 });
            return { allowed: true, attemptsRemaining: MAX_ATTEMPTS };
        }

        return { allowed: true, attemptsRemaining: MAX_ATTEMPTS - state.attempts };
    }

    function recordFailedLogin() {
        var state = loadLoginState();
        state.attempts++;

        // Lock out after MAX_ATTEMPTS
        if (state.attempts >= MAX_ATTEMPTS) {
            state.lockoutUntil = Date.now() + (LOCKOUT_MINUTES * 60 * 1000);
            saveLoginState(state);
            return { locked: true, lockoutMinutes: LOCKOUT_MINUTES };
        }

        saveLoginState(state);
        return { locked: false, attemptsRemaining: MAX_ATTEMPTS - state.attempts };
    }

    function resetLoginAttempts() {
        saveLoginState({ attempts: 0, lockoutUntil: 0 });
    }

    // ========== SESSION MANAGEMENT ==========
    function createSession(expiryHours) {
        var session = {
            authenticated: true,
            created: Date.now(),
            expires: Date.now() + (expiryHours * 60 * 60 * 1000)
        };
        localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    }

    function isSessionValid() {
        try {
            var session = JSON.parse(localStorage.getItem(AUTH_KEY));
            if (!session) return false;

            // Check expiry
            if (Date.now() > session.expires) {
                localStorage.removeItem(AUTH_KEY);
                return false;
            }

            return session.authenticated === true;
        } catch (e) {
            return false;
        }
    }

    // ========== GATE MANAGEMENT ==========
    function showGate() {
        var gate = document.getElementById('passwordGate');
        if (gate) {
            gate.style.display = 'flex';
            gate.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    function hideGate() {
        var gate = document.getElementById('passwordGate');
        if (gate) {
            gate.style.display = 'none';
            gate.classList.add('hidden');
            document.body.style.overflow = '';
            // Remove from DOM to prevent password manager autofill icons
            gate.remove();
        }
    }

    // ========== AUTHENTICATION ==========
    function authenticate(password, rememberMe) {
        // Check if locked out
        var loginCheck = checkLoginAttempt();
        if (!loginCheck.allowed) {
            var timeDisplay = loginCheck.remainingMinutes > 1
                ? loginCheck.remainingMinutes + ' minutes'
                : loginCheck.remainingSeconds + ' seconds';
            return {
                success: false,
                error: 'Too many attempts. Try again in ' + timeDisplay + '.'
            };
        }

        // Check password using hash comparison
        var inputHash = simpleHash(password);
        if (inputHash === PASSWORD_HASH) {
            resetLoginAttempts();
            var sessionLength = rememberMe ? REMEMBER_ME_HOURS : SESSION_HOURS;
            createSession(sessionLength);
            return { success: true };
        }

        // Record failed attempt
        var result = recordFailedLogin();
        if (result.locked) {
            return {
                success: false,
                error: 'Too many failed attempts. Locked out for ' + result.lockoutMinutes + ' minutes.'
            };
        }

        return {
            success: false,
            error: 'Incorrect password. ' + result.attemptsRemaining + ' attempts remaining.'
        };
    }

    // ========== INITIALIZATION ==========
    function init() {
        var gate = document.getElementById('passwordGate');
        var form = document.getElementById('passwordForm');
        var input = document.getElementById('passwordInput');
        var errorMsg = document.getElementById('passwordError');
        var rememberCheckbox = document.getElementById('rememberMe');

        if (!gate || !form || !input) {
            // No password gate on this page
            return;
        }

        // If already authenticated, hide the gate
        if (isSessionValid()) {
            hideGate();
            return;
        }

        // Show the gate
        showGate();

        // Handle form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            var password = input.value.trim().toUpperCase();
            var rememberMe = rememberCheckbox ? rememberCheckbox.checked : false;
            var result = authenticate(password, rememberMe);

            if (result.success) {
                hideGate();
                // Dispatch event so page knows auth succeeded
                window.dispatchEvent(new Event('authSuccess'));
            } else {
                // Show error message
                if (errorMsg) {
                    errorMsg.textContent = result.error;
                    errorMsg.style.display = 'block';
                }
                input.value = '';
                input.focus();

                // Shake animation
                form.classList.add('shake');
                setTimeout(function() {
                    form.classList.remove('shake');
                }, 500);
            }
        });

        // Clear error on input
        input.addEventListener('input', function() {
            if (errorMsg) {
                errorMsg.style.display = 'none';
            }
        });
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose for debugging
    window.OTR_AUTH = {
        isAuthenticated: isSessionValid,
        logout: function() {
            localStorage.removeItem(AUTH_KEY);
            window.location.reload();
        }
    };
})();
