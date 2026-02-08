/**
 * Interactive Prompts System
 * Triggers Q&A modals when user scrolls to specific text in the manuscript
 * Uses IntersectionObserver for scroll detection and TreeWalker for text searching
 * Only triggers when scrolling DOWN - prevents re-triggering on scroll back
 */

export class InteractivePrompts {
    constructor(prompts = []) {
        this.prompts = prompts;
        this.responses = this.loadResponses();
        this.modal = null;
        this.overlay = null;
        this.observers = [];
        this.autoCloseTimeout = null;
        this.currentPrompt = null;
        this.triggerElements = new Map();

        // Scroll direction tracking
        this.lastScrollY = window.scrollY;
        this.scrollingDown = true;
        this.triggeredThisSession = new Set(
            JSON.parse(sessionStorage.getItem('prompts_triggered_this_session') || '[]')
        );

        this.init();
    }

    /**
     * Initialize the prompt system
     */
    init() {
        if (!this.prompts || this.prompts.length === 0) {
            return;
        }

        this.createModal();
        this.setupScrollTracking();
        this.observeTriggers();
        this.setupKeyboardListeners();
    }

    /**
     * Set up scroll direction tracking
     */
    setupScrollTracking() {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    this.scrollingDown = currentScrollY > this.lastScrollY;
                    this.lastScrollY = currentScrollY;
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    /**
     * Create modal HTML structure and append to body
     */
    createModal() {
        // Create overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'prompt-overlay';

        // Create modal
        this.modal = document.createElement('div');
        this.modal.className = 'prompt-modal';
        this.modal.setAttribute('role', 'dialog');
        this.modal.setAttribute('aria-modal', 'true');
        this.modal.setAttribute('aria-labelledby', 'prompt-question');

        this.modal.innerHTML = `
            <button type="button" class="prompt-close" aria-label="Close">&times;</button>
            <div class="prompt-question" id="prompt-question"></div>
            <div class="prompt-choices"></div>
            <div class="prompt-results"></div>
        `;

        document.body.appendChild(this.overlay);
        document.body.appendChild(this.modal);

        // Attach close listeners
        this.modal.querySelector('.prompt-close').addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', () => this.close());
    }

    /**
     * Set up keyboard event listeners
     */
    setupKeyboardListeners() {
        document.addEventListener('keydown', (e) => {
            if (!this.modal.classList.contains('active')) return;

            if (e.key === 'Escape') {
                e.preventDefault();
                this.close();
            }

            // Tab trapping within modal
            if (e.key === 'Tab') {
                const focusableElements = this.modal.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });
    }

    /**
     * Loop through prompts and create observers for each trigger
     */
    observeTriggers() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this._setupObservers());
        } else {
            // Small delay to ensure chapter content is rendered
            setTimeout(() => this._setupObservers(), 500);
        }
    }

    /**
     * Internal method to set up observers after DOM is ready
     */
    _setupObservers() {
        this.prompts.forEach(prompt => {
            // Skip if already responded OR already triggered this session
            if (this.hasResponded(prompt.id) || this.triggeredThisSession.has(prompt.id)) {
                return;
            }

            const elements = this.findTriggerElements(prompt.triggerText);

            if (elements.length === 0) {
                return;
            }

            // Store trigger elements for this prompt
            this.triggerElements.set(prompt.id, elements);

            // Create observer for each element
            elements.forEach(element => {
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach(entry => {
                            // Only trigger if:
                            // 1. Element is intersecting (visible)
                            // 2. User is scrolling DOWN
                            // 3. User hasn't already responded
                            // 4. Prompt hasn't been triggered this session
                            if (entry.isIntersecting &&
                                this.scrollingDown &&
                                !this.hasResponded(prompt.id) &&
                                !this.triggeredThisSession.has(prompt.id)) {

                                // Mark as triggered this session
                                this.triggeredThisSession.add(prompt.id);
                                sessionStorage.setItem(
                                    'prompts_triggered_this_session',
                                    JSON.stringify([...this.triggeredThisSession])
                                );

                                // Disconnect this observer to prevent re-triggering
                                observer.disconnect();

                                // Show the prompt
                                this.show(prompt);
                            }
                        });
                    },
                    {
                        threshold: 0.5,
                        rootMargin: '0px'
                    }
                );

                observer.observe(element);
                this.observers.push(observer);
            });
        });
    }

    /**
     * Find elements containing the trigger text using TreeWalker
     * @param {string} triggerText - Exact text to find
     * @returns {Element[]} - Array of parent elements containing the text
     */
    findTriggerElements(triggerText) {
        const elements = [];
        const content = document.getElementById('content') || document.body;

        // Normalize the trigger text for comparison
        const normalizedTrigger = this._normalizeText(triggerText);

        // Create TreeWalker to iterate through all text nodes
        const walker = document.createTreeWalker(
            content,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: (node) => {
                    // Skip empty or whitespace-only nodes
                    if (!node.textContent.trim()) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    // Skip script and style elements
                    const parent = node.parentElement;
                    if (parent && (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE')) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );

        let node;
        while ((node = walker.nextNode())) {
            const normalizedContent = this._normalizeText(node.textContent);

            if (normalizedContent.includes(normalizedTrigger)) {
                // Get the parent element (paragraph, span, etc.)
                const parent = node.parentElement;
                if (parent && !elements.includes(parent)) {
                    elements.push(parent);
                }
            }
        }

        return elements;
    }

    /**
     * Normalize text for comparison (removes extra whitespace, normalizes quotes)
     * @param {string} text - Text to normalize
     * @returns {string} - Normalized text
     */
    _normalizeText(text) {
        return text
            .replace(/\s+/g, ' ')
            .replace(/['']/g, "'")
            .replace(/[""]/g, '"')
            .trim()
            .toLowerCase();
    }

    /**
     * Show the prompt modal
     * @param {Object} prompt - Prompt object with question and choices
     */
    show(prompt) {
        if (this.hasResponded(prompt.id)) {
            return;
        }

        this.currentPrompt = prompt;

        // Clear any existing timeout
        if (this.autoCloseTimeout) {
            clearTimeout(this.autoCloseTimeout);
            this.autoCloseTimeout = null;
        }

        // Set question
        const questionEl = this.modal.querySelector('.prompt-question');
        questionEl.textContent = prompt.question;

        // Render choices as radio buttons
        const choicesEl = this.modal.querySelector('.prompt-choices');
        const resultsEl = this.modal.querySelector('.prompt-results');

        // Show choices, hide results
        choicesEl.style.display = 'flex';
        resultsEl.classList.remove('active');

        const colors = ['red', 'blue', 'yellow', 'green'];

        choicesEl.innerHTML = prompt.choices.map((choice, index) => `
            <label class="prompt-choice">
                <input type="radio" name="prompt-answer" value="${index}" tabindex="0">
                <span class="prompt-choice-label">${choice.text}</span>
            </label>
        `).join('');

        // Add change listeners to radios
        choicesEl.querySelectorAll('input[type="radio"]').forEach((radio, index) => {
            radio.addEventListener('change', () => {
                this.handleChoice(index);
            });
        });

        // Show modal
        this.overlay.classList.add('active');
        this.modal.classList.add('active');

        // Focus first choice for accessibility
        setTimeout(() => {
            const firstRadio = choicesEl.querySelector('input[type="radio"]');
            if (firstRadio) {
                firstRadio.focus();
            }
        }, 100);
    }

    /**
     * Handle user's choice selection
     * @param {number} choiceIndex - Index of selected choice
     */
    handleChoice(choiceIndex) {
        if (!this.currentPrompt) return;

        // Save response
        this.responses[this.currentPrompt.id] = {
            choiceIndex,
            timestamp: Date.now()
        };
        this.saveResponses();

        // Show results
        this.showResults(choiceIndex);
    }

    /**
     * Display results with animated bar graphs
     * @param {number} userChoice - Index of user's selected choice
     */
    showResults(userChoice) {
        if (!this.currentPrompt) return;

        const choicesEl = this.modal.querySelector('.prompt-choices');
        const resultsEl = this.modal.querySelector('.prompt-results');

        // Hide choices instantly
        choicesEl.style.display = 'none';

        // Build results HTML
        const colors = ['red', 'blue', 'yellow', 'green'];

        resultsEl.innerHTML = this.currentPrompt.choices.map((choice, index) => {
            const isUserChoice = index === userChoice;
            const color = colors[index] || 'blue';

            return `
                <div class="prompt-result-item">
                    <div class="prompt-result-label">
                        <span class="prompt-result-text">${choice.text}</span>
                        ${isUserChoice ? '<span class="prompt-your-choice">&larr; Your choice</span>' : ''}
                    </div>
                    <div class="result-bar-container">
                        <div class="result-bar-wrapper">
                            <div class="result-bar-fill ${color}" data-percentage="${choice.percentage}">
                                <span class="result-bar-percentage">${choice.percentage}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Show results container
        resultsEl.classList.add('active');

        // Animate bars after a brief delay (allows CSS to compute initial state)
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                resultsEl.querySelectorAll('.result-bar-fill').forEach(bar => {
                    const percentage = bar.dataset.percentage;
                    bar.style.width = `${percentage}%`;
                });
            });
        });

        // Auto-dismiss after 3 seconds
        this.autoCloseTimeout = setTimeout(() => {
            this.close();
        }, 3000);
    }

    /**
     * Close the modal
     */
    close() {
        // Clear timeout
        if (this.autoCloseTimeout) {
            clearTimeout(this.autoCloseTimeout);
            this.autoCloseTimeout = null;
        }

        // Hide modal and overlay
        this.modal.classList.remove('active');
        this.overlay.classList.remove('active');

        // Reset current prompt
        this.currentPrompt = null;

        // Reset bar widths for next time
        this.modal.querySelectorAll('.result-bar-fill').forEach(bar => {
            bar.style.width = '0';
        });
    }

    /**
     * Check if user has already responded to a prompt
     * @param {string} promptId - ID of the prompt
     * @returns {boolean} - True if already responded
     */
    hasResponded(promptId) {
        return this.responses.hasOwnProperty(promptId);
    }

    /**
     * Load responses from localStorage
     * @returns {Object} - Saved responses object
     */
    loadResponses() {
        try {
            const stored = localStorage.getItem('prompt_responses');
            return stored ? JSON.parse(stored) : {};
        } catch (e) {
            console.error('Error loading prompt responses:', e);
            return {};
        }
    }

    /**
     * Save responses to localStorage
     */
    saveResponses() {
        try {
            localStorage.setItem('prompt_responses', JSON.stringify(this.responses));
        } catch (e) {
            console.error('Error saving prompt responses:', e);
        }
    }

    /**
     * Clear all saved responses (useful for testing)
     */
    clearResponses() {
        this.responses = {};
        localStorage.removeItem('prompt_responses');
    }

    /**
     * Clear session triggers (allows prompts to show again this session)
     */
    clearSessionTriggers() {
        this.triggeredThisSession.clear();
        sessionStorage.removeItem('prompts_triggered_this_session');
    }

    /**
     * Manually trigger a prompt by ID (useful for testing)
     * @param {string} promptId - ID of prompt to show
     */
    triggerPrompt(promptId) {
        const prompt = this.prompts.find(p => p.id === promptId);
        if (prompt) {
            // Temporarily remove from responses to allow re-showing
            const savedResponse = this.responses[promptId];
            delete this.responses[promptId];

            this.show(prompt);

            // Restore if user closes without answering
            if (savedResponse && !this.responses[promptId]) {
                this.responses[promptId] = savedResponse;
            }
        }
    }

    /**
     * Destroy the prompt system (cleanup)
     */
    destroy() {
        // Disconnect all observers
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];

        // Clear timeout
        if (this.autoCloseTimeout) {
            clearTimeout(this.autoCloseTimeout);
        }

        // Remove DOM elements
        if (this.modal && this.modal.parentNode) {
            this.modal.parentNode.removeChild(this.modal);
        }
        if (this.overlay && this.overlay.parentNode) {
            this.overlay.parentNode.removeChild(this.overlay);
        }
    }
}

// Export for ES6 modules
export default InteractivePrompts;
