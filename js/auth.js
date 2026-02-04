// Password Protection for Beta Access
// Includes brute force protection and session expiry

import { security } from './security.js';

// Password can be changed here - just update this value
const BETA_PASSWORD = 'BALLWRITER';
const AUTH_KEY = 'otr_beta_session';
const SESSION_HOURS = 168; // 7 days

export const auth = {
    // Check if user is authenticated
    isAuthenticated() {
        // Check for valid session
        return security.isSessionValid(AUTH_KEY);
    },

    // Verify password and store auth state
    authenticate(password) {
        // Check if locked out from too many attempts
        const loginCheck = security.checkLoginAttempt();
        if (!loginCheck.allowed) {
            return {
                success: false,
                error: `Too many attempts. Try again in ${loginCheck.remainingSeconds} seconds.`
            };
        }

        // Check password
        if (password === BETA_PASSWORD) {
            security.resetLoginAttempts();
            security.createSession(AUTH_KEY, SESSION_HOURS);
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
            const result = this.authenticate(password);

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
