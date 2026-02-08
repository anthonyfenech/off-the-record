// Password Protection for Beta Access
// Includes brute force protection and session expiry

import { security } from './security.js';

// Password hash (obfuscated) - generated from simpleHash('BALLWRITER')
// To change password: run simpleHash('NEWPASSWORD') in console and update this value
const PASSWORD_HASH = -1322527314;
const AUTH_KEY = 'otr_beta_session';
const SESSION_HOURS = 168; // 7 days
const REMEMBER_ME_HOURS = 720; // 30 days

// Simple hash function for password obfuscation
// Not cryptographically secure, but prevents casual password discovery
function simpleHash(str) {
    if (!str || typeof str !== 'string') {
        return 0;
    }
    let hash = 0;
    const salt = 'otr2024beta';
    const salted = salt + str.toUpperCase() + salt;
    for (let i = 0; i < salted.length; i++) {
        const char = salted.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return hash;
}

export const auth = {
    // Check if user is authenticated
    isAuthenticated() {
        // Check for valid session
        return security.isSessionValid(AUTH_KEY);
    },

    // Verify password and store auth state
    authenticate(password, rememberMe = false) {
        // Check if locked out from too many attempts
        const loginCheck = security.checkLoginAttempt();
        if (!loginCheck.allowed) {
            const timeDisplay = loginCheck.remainingMinutes > 1
                ? `${loginCheck.remainingMinutes} minutes`
                : `${loginCheck.remainingSeconds} seconds`;
            return {
                success: false,
                error: `Too many attempts. Try again in ${timeDisplay}.`
            };
        }

        // Check password using hash comparison
        const inputHash = simpleHash(password);
        if (inputHash === PASSWORD_HASH) {
            security.resetLoginAttempts();
            const sessionLength = rememberMe ? REMEMBER_ME_HOURS : SESSION_HOURS;
            security.createSession(AUTH_KEY, sessionLength);
            return { success: true };
        }

        // Record failed attempt
        const result = security.recordFailedLogin();
        if (result.locked) {
            return {
                success: false,
                error: `Too many failed attempts. Locked out for ${result.lockoutMinutes} minutes.`
            };
        }

        return {
            success: false,
            error: `Incorrect password. ${result.attemptsRemaining} attempts remaining.`
        };
    },

    // Clear authentication (logout)
    logout() {
        security.clearSession(AUTH_KEY);
        window.location.reload();
    },

    // Show the password gate
    showGate() {
        const gate = document.getElementById('passwordGate');
        if (gate) {
            gate.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    },

    // Hide the password gate
    hideGate() {
        const gate = document.getElementById('passwordGate');
        if (gate) {
            gate.style.display = 'none';
            document.body.style.overflow = '';
        }
    },

    // Initialize password gate
    init() {
        const gate = document.getElementById('passwordGate');
        const form = document.getElementById('passwordForm');
        const input = document.getElementById('passwordInput');
        const errorMsg = document.getElementById('passwordError');
        const rememberCheckbox = document.getElementById('rememberMe');

        if (!gate || !form || !input) return;

        // If already authenticated, hide the gate
        if (this.isAuthenticated()) {
            this.hideGate();
            return true;
        }

        // Show the gate
        this.showGate();

        // Handle form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const password = input.value.trim().toUpperCase();
            const rememberMe = rememberCheckbox ? rememberCheckbox.checked : false;
            const result = this.authenticate(password, rememberMe);

            if (result.success) {
                this.hideGate();
                // Dispatch event so app knows to load content
                window.dispatchEvent(new Event('authSuccess'));
            } else {
                // Show error message
                errorMsg.textContent = result.error;
                errorMsg.style.display = 'block';
                input.value = '';
                input.focus();

                // Shake animation
                form.classList.add('shake');
                setTimeout(() => form.classList.remove('shake'), 500);
            }
        });

        // Clear error on input
        input.addEventListener('input', () => {
            errorMsg.style.display = 'none';
        });

        return false;
    },

    // Initialize logout button
    initLogoutButton() {
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }
    }
};

// Initialize logout button when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => auth.initLogoutButton());
} else {
    auth.initLogoutButton();
}
