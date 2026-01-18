// Password Protection for Beta Access
// Password can be changed here - just update this value
const BETA_PASSWORD = 'BALLWRITER';

const AUTH_KEY = 'otr_beta_access';

export const auth = {
    // Check if user is authenticated
    isAuthenticated() {
        return localStorage.getItem(AUTH_KEY) === 'true';
    },

    // Verify password and store auth state
    authenticate(password) {
        if (password === BETA_PASSWORD) {
            localStorage.setItem(AUTH_KEY, 'true');
            return true;
        }
        return false;
    },

    // Clear authentication (logout)
    logout() {
        localStorage.removeItem(AUTH_KEY);
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

            if (this.authenticate(password)) {
                this.hideGate();
                // Dispatch event so app knows to load content
                window.dispatchEvent(new Event('authSuccess'));
            } else {
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
