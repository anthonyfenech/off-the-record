// js/admin-pwa.js
// Admin Panel — PWA controls (toggle enabled, force update, clear cache)

(() => {
    const CONFIG_PATH = '/pwa-config.json';
    const REPO_OWNER  = 'anthonyfenech';
    const REPO_NAME   = 'off-the-record';
    const PAT_KEY     = 'gh-admin-pat';
    const API_BASE    = 'https://api.github.com';

    // DOM refs (set in init)
    let toggle, currentStateEl, forceUpdateBtn, clearLocalBtn,
        rotatePatBtn, patRow, patInput, patSaveBtn, resultRow;

    // Cached state
    let currentConfig = null;   // { enabled, version }
    let currentSha    = null;   // SHA of pwa-config.json on GitHub

    // ---------- helpers ----------
    function log(msg, isError) {
        if (!resultRow) return;
        resultRow.textContent = msg;
        resultRow.style.color = isError ? '#dc3545' : '#28a745';
    }

    function getPAT() {
        return localStorage.getItem(PAT_KEY);
    }
    function setPAT(token) {
        localStorage.setItem(PAT_KEY, token);
    }
    function clearPAT() {
        localStorage.removeItem(PAT_KEY);
    }

    function b64encode(str) {
        // Standard base64 of UTF-8 string
        return btoa(unescape(encodeURIComponent(str)));
    }

    // ---------- GitHub API ----------
    async function fetchConfigFromGitHub() {
        // Used to get current SHA before any PUT
        const url = API_BASE + '/repos/' + REPO_OWNER + '/' +
                    REPO_NAME + '/contents/pwa-config.json?ref=main';
        const headers = { 'Accept': 'application/vnd.github.v3+json' };
        const pat = getPAT();
        if (pat) headers['Authorization'] = 'token ' + pat;

        const r = await fetch(url, { headers });
        if (!r.ok) {
            throw new Error('GitHub fetch failed: ' + r.status + ' ' + r.statusText);
        }
        const data = await r.json();
        currentSha = data.sha;
        const content = JSON.parse(atob(data.content.replace(/\s/g, '')));
        return content;
    }

    async function putConfigToGitHub(newConfig, commitMsg) {
        const pat = getPAT();
        if (!pat) {
            showPatPrompt();
            throw new Error('PAT required');
        }

        // Always re-fetch SHA before PUT to avoid 409 conflicts
        try {
            await fetchConfigFromGitHub();
        } catch (e) {
            // If fetch failed, abort — don't PUT with stale SHA
            throw e;
        }

        const url = API_BASE + '/repos/' + REPO_OWNER + '/' +
                    REPO_NAME + '/contents/pwa-config.json';
        const body = {
            message: commitMsg,
            content: b64encode(JSON.stringify(newConfig, null, 2) + '\n'),
            sha: currentSha,
            branch: 'main',
        };
        const r = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': 'token ' + pat,
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github.v3+json',
            },
            body: JSON.stringify(body),
        });

        if (r.status === 401) {
            clearPAT();
            showPatPrompt();
            throw new Error('PAT rejected (401). Cleared. Re-enter token.');
        }
        if (r.status === 409) {
            throw new Error('SHA conflict (409). Refresh and try again.');
        }
        if (!r.ok) {
            const errText = await r.text();
            throw new Error('GitHub PUT failed: ' + r.status + ' — ' + errText);
        }
        return await r.json();
    }

    // ---------- UI flows ----------
    function showPatPrompt() {
        patRow.hidden = false;
        patInput.focus();
    }

    async function handleToggle(e) {
        const newEnabled = e.target.checked;
        const newConfig = Object.assign({}, currentConfig, { enabled: newEnabled });
        const msg = 'admin: PWA ' +
                    (newEnabled ? 'enabled' : 'disabled') +
                    ' via admin panel';
        try {
            log('Committing toggle change…');
            await putConfigToGitHub(newConfig, msg);
            currentConfig = newConfig;
            updateStateDisplay();
            log('Toggle saved. Propagating to users in ~60 sec.');
        } catch (err) {
            // Revert UI
            e.target.checked = !newEnabled;
            log('Toggle failed: ' + err.message, true);
        }
    }

    async function handleForceUpdate() {
        const newConfig = Object.assign({}, currentConfig, {
            version: (currentConfig.version || 0) + 1
        });
        try {
            log('Bumping version to force cache refresh…');
            await putConfigToGitHub(newConfig, 'admin: force PWA cache refresh');
            currentConfig = newConfig;
            updateStateDisplay();
            log('Version bumped. Users will refresh cache on next visit.');
        } catch (err) {
            log('Force update failed: ' + err.message, true);
        }
    }

    async function handleClearLocal() {
        try {
            // Unregister all SW
            if ('serviceWorker' in navigator) {
                const regs = await navigator.serviceWorker.getRegistrations();
                for (const r of regs) await r.unregister();
            }
            // Clear all caches
            if ('caches' in window) {
                const keys = await caches.keys();
                await Promise.all(keys.map(k => caches.delete(k)));
            }
            log('Local cache + SW cleared. Reloading…');
            setTimeout(() => location.reload(), 500);
        } catch (err) {
            log('Clear local failed: ' + err.message, true);
        }
    }

    function handleRotatePAT() {
        clearPAT();
        showPatPrompt();
        log('PAT cleared. Enter new token below.');
    }

    function handleSavePAT() {
        const token = patInput.value.trim();
        if (!token.startsWith('ghp_') && !token.startsWith('github_pat_')) {
            log('PAT looks malformed (should start with ghp_ or github_pat_).', true);
            return;
        }
        setPAT(token);
        patInput.value = '';
        patRow.hidden = true;
        log('PAT saved to localStorage. Try the action again.');
    }

    function updateStateDisplay() {
        if (!currentConfig) {
            currentStateEl.textContent = 'Unable to load config';
            return;
        }
        const enabled = currentConfig.enabled ? 'ENABLED' : 'DISABLED';
        const version = currentConfig.version || 1;
        currentStateEl.textContent =
            enabled + ' (config version ' + version + ')';
        toggle.checked = !!currentConfig.enabled;
    }

    // ---------- init ----------
    async function init() {
        toggle          = document.getElementById('pwa-enabled-toggle');
        currentStateEl  = document.getElementById('pwa-current-state');
        forceUpdateBtn  = document.getElementById('pwa-force-update-btn');
        clearLocalBtn   = document.getElementById('pwa-clear-local-btn');
        rotatePatBtn    = document.getElementById('pwa-rotate-pat-btn');
        patRow          = document.getElementById('pwa-pat-row');
        patInput        = document.getElementById('pwa-pat-input');
        patSaveBtn      = document.getElementById('pwa-pat-save-btn');
        resultRow       = document.getElementById('pwa-result-row');

        if (!toggle) return; // PWA controls not on this page

        // Wire events
        toggle.addEventListener('change', handleToggle);
        forceUpdateBtn.addEventListener('click', handleForceUpdate);
        clearLocalBtn.addEventListener('click', handleClearLocal);
        rotatePatBtn.addEventListener('click', handleRotatePAT);
        patSaveBtn.addEventListener('click', handleSavePAT);

        // Load current config from public file (no auth needed)
        try {
            const r = await fetch(CONFIG_PATH, { cache: 'no-cache' });
            if (!r.ok) throw new Error('fetch failed: ' + r.status);
            currentConfig = await r.json();
            updateStateDisplay();
        } catch (err) {
            currentStateEl.textContent = 'Error loading config: ' + err.message;
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
