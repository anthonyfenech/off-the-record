/**
 * Live Prompts System
 * Connects driving range prompts to actual chapters
 * Works in both chapter pages and binge mode
 *
 * CRITICAL: NO outcome text is shown in reader-facing modals
 */

(function() {
    'use strict';

    const SMALL_TYPES = ['multiple-choice', 'yes-no', 'poll', 'emoji-reaction', 'prediction'];
    const RESPONSES_KEY = 'prompt_responses';
    const TRIGGERED_KEY = 'prompts_triggered';

    class LivePromptSystem {
        constructor() {
            this.prompts = {};
            this.currentPrompt = null;
            this.modal = null;
            this.loadPrompts();
            this.createModal();
            this.setupObservers();
        }

        loadPrompts() {
            // Load from driving range
            try {
                const drivingRange = JSON.parse(localStorage.getItem('driving_range_prompts') || '[]');
                if (Array.isArray(drivingRange)) {
                    drivingRange.forEach(p => {
                        this.prompts[p.id] = p;
                    });
                }
            } catch (e) {
                console.warn('[LivePrompts] Error loading driving range prompts:', e);
            }

            // Load from admin panel
            try {
                const admin = JSON.parse(localStorage.getItem('admin_interactivePrompts') || '[]');
                admin.forEach(p => {
                    this.prompts[p.id] = {
                        id: p.id,
                        type: p.type || 'multiple-choice',
                        question: p.question,
                        choices: p.choices ? p.choices.map(c => typeof c === 'string' ? c : c.text) : [],
                        triggerText: p.triggerText || '',
                        charLimit: p.charLimit || 280,
                        scaleMinLabel: p.scaleMinLabel || '1',
                        scaleMaxLabel: p.scaleMaxLabel || '10',
                        emojis: p.emojis || []
                    };
                });
            } catch (e) {
                console.warn('[LivePrompts] Error loading admin prompts:', e);
            }

            console.log(`[LivePrompts] Loaded ${Object.keys(this.prompts).length} prompts`);
        }

        createModal() {
            // Create modal overlay
            const overlay = document.createElement('div');
            overlay.id = 'live-prompt-modal';
            overlay.className = 'live-prompt-overlay';
            overlay.innerHTML = `
                <div class="live-prompt-modal" id="live-prompt-content">
                    <button class="live-prompt-close" id="live-prompt-close">&times;</button>
                    <div class="live-prompt-question" id="live-prompt-question"></div>
                    <div class="live-prompt-choices" id="live-prompt-choices"></div>
                    <div class="live-prompt-buttons" id="live-prompt-buttons">
                        <button class="live-prompt-btn skip" id="live-prompt-skip">SKIP</button>
                        <button class="live-prompt-btn submit" id="live-prompt-submit">SUBMIT</button>
                    </div>
                </div>
            `;

            // Add styles
            const style = document.createElement('style');
            style.textContent = `
                .live-prompt-overlay {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,0.5);
                    z-index: 10000;
                    align-items: center;
                    justify-content: center;
                }
                .live-prompt-overlay.active {
                    display: flex;
                }
                .live-prompt-modal {
                    background: var(--color-modal-bg, #fff);
                    width: 90%;
                    padding: 20px;
                    position: relative;
                    font-family: Arial, sans-serif;
                }
                .live-prompt-modal.small {
                    max-width: 260px;
                }
                .live-prompt-modal.medium {
                    max-width: 400px;
                }
                .live-prompt-close {
                    position: absolute;
                    top: 5px;
                    right: 10px;
                    background: none;
                    border: none;
                    font-size: 20px;
                    cursor: pointer;
                    color: var(--color-text-primary, #333);
                }
                .live-prompt-question {
                    font-size: 14px;
                    font-weight: normal;
                    margin-bottom: 15px;
                    color: var(--color-text-primary, #333);
                }
                .live-prompt-choices {
                    margin-bottom: 15px;
                }
                .live-prompt-choice {
                    display: block;
                    padding: 5px 0;
                    cursor: pointer;
                    font-size: 13px;
                    font-weight: normal;
                    color: var(--color-text-primary, #333);
                }
                .live-prompt-choice input {
                    margin-right: 8px;
                }
                .live-prompt-input {
                    width: 100%;
                    padding: 8px;
                    border: 1px solid var(--color-border, #ccc);
                    background: var(--color-background, #fff);
                    color: var(--color-text-primary, #333);
                    font-family: inherit;
                    font-size: 13px;
                    margin-bottom: 10px;
                    resize: vertical;
                    min-height: 60px;
                }
                .live-prompt-scale {
                    margin: 15px 0;
                }
                .live-prompt-scale-labels {
                    display: flex;
                    justify-content: space-between;
                    font-size: 11px;
                    color: var(--color-text-secondary, #666);
                    margin-bottom: 5px;
                }
                .live-prompt-scale input[type="range"] {
                    width: 100%;
                }
                .live-prompt-scale-value {
                    text-align: center;
                    font-size: 24px;
                    margin: 10px 0;
                    color: var(--color-text-primary, #333);
                }
                .live-prompt-emojis {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    justify-content: center;
                    margin: 10px 0;
                }
                .live-prompt-emoji {
                    font-size: 28px;
                    cursor: pointer;
                    padding: 5px;
                    border: 2px solid transparent;
                    border-radius: 8px;
                }
                .live-prompt-emoji:hover,
                .live-prompt-emoji.selected {
                    border-color: var(--color-accent, #000);
                }
                .live-prompt-buttons {
                    display: flex;
                    gap: 10px;
                }
                .live-prompt-btn {
                    flex: 1;
                    padding: 8px;
                    cursor: pointer;
                    font-size: 13px;
                    font-weight: normal;
                    font-family: Arial, sans-serif;
                }
                .live-prompt-btn.submit {
                    background: var(--color-accent, #000);
                    color: var(--color-background, #fff);
                    border: none;
                }
                .live-prompt-btn.skip {
                    background: var(--color-background, #fff);
                    color: var(--color-text-primary, #000);
                    border: 1px solid var(--color-border, #999);
                }
            `;

            document.head.appendChild(style);
            document.body.appendChild(overlay);
            this.modal = overlay;

            // Event listeners
            document.getElementById('live-prompt-close').addEventListener('click', () => this.closeModal());
            document.getElementById('live-prompt-skip').addEventListener('click', () => this.skipPrompt());
            document.getElementById('live-prompt-submit').addEventListener('click', () => this.submitPrompt());
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) this.closeModal();
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                    this.closeModal();
                }
            });
        }

        setupObservers() {
            // Initial setup
            this.observeTriggers();

            // Re-observe when new content is loaded (for binge mode)
            const observer = new MutationObserver(() => {
                this.observeTriggers();
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }

        observeTriggers() {
            const triggers = document.querySelectorAll('.prompt-trigger:not([data-observed])');
            if (triggers.length === 0) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.dataset.promptId;
                        if (this.shouldTrigger(id)) {
                            this.markTriggered(id);
                            this.openPrompt(id);
                        }
                        observer.unobserve(entry.target);
                    }
                });
            }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });

            triggers.forEach(trigger => {
                trigger.setAttribute('data-observed', 'true');
                observer.observe(trigger);
            });

            if (triggers.length > 0) {
                console.log(`[LivePrompts] Watching ${triggers.length} new prompt triggers`);
            }
        }

        shouldTrigger(id) {
            const responses = this.getResponses();
            const triggered = this.getTriggered();
            return !responses[id] && !triggered.includes(id);
        }

        getResponses() {
            try {
                return JSON.parse(localStorage.getItem(RESPONSES_KEY) || '{}');
            } catch {
                return {};
            }
        }

        saveResponse(id, response) {
            const responses = this.getResponses();
            responses[id] = {
                response,
                timestamp: Date.now()
            };
            localStorage.setItem(RESPONSES_KEY, JSON.stringify(responses));
        }

        getTriggered() {
            try {
                return JSON.parse(sessionStorage.getItem(TRIGGERED_KEY) || '[]');
            } catch {
                return [];
            }
        }

        markTriggered(id) {
            const triggered = this.getTriggered();
            if (!triggered.includes(id)) {
                triggered.push(id);
                sessionStorage.setItem(TRIGGERED_KEY, JSON.stringify(triggered));
            }
        }

        openPrompt(id) {
            const prompt = this.prompts[id];
            if (!prompt) {
                console.error(`[LivePrompts] Prompt not found: ${id}`);
                return;
            }

            this.currentPrompt = prompt;
            const modalContent = document.getElementById('live-prompt-content');
            const isSmall = SMALL_TYPES.includes(prompt.type);
            modalContent.className = 'live-prompt-modal ' + (isSmall ? 'small' : 'medium');

            // Set question - NO outcome text, just the question
            document.getElementById('live-prompt-question').textContent = prompt.question;

            // Render choices based on type
            const choicesEl = document.getElementById('live-prompt-choices');
            choicesEl.innerHTML = this.renderChoices(prompt);

            // Reset buttons
            document.getElementById('live-prompt-buttons').innerHTML = `
                <button class="live-prompt-btn skip" id="live-prompt-skip">SKIP</button>
                <button class="live-prompt-btn submit" id="live-prompt-submit">SUBMIT</button>
            `;
            document.getElementById('live-prompt-skip').addEventListener('click', () => this.skipPrompt());
            document.getElementById('live-prompt-submit').addEventListener('click', () => this.submitPrompt());

            // Show modal
            this.modal.classList.add('active');
        }

        renderChoices(prompt) {
            const type = prompt.type || 'multiple-choice';

            if (type === 'text-input') {
                return `<textarea class="live-prompt-input" id="live-prompt-text" maxlength="${prompt.charLimit || 280}" placeholder="Type your answer..."></textarea>`;
            }

            if (type === 'scale') {
                return `<div class="live-prompt-scale">
                    <div class="live-prompt-scale-labels">
                        <span>${prompt.scaleMinLabel || '1'}</span>
                        <span>${prompt.scaleMaxLabel || '10'}</span>
                    </div>
                    <input type="range" min="1" max="10" value="5" id="live-prompt-scale" oninput="document.getElementById('live-prompt-scale-val').textContent=this.value">
                    <div class="live-prompt-scale-value" id="live-prompt-scale-val">5</div>
                </div>`;
            }

            if (type === 'emoji-reaction') {
                const emojis = prompt.emojis && prompt.emojis.length > 0 ? prompt.emojis : ['😡','😂','😱','😢'];
                return `<div class="live-prompt-emojis">${emojis.map(e =>
                    `<span class="live-prompt-emoji" onclick="this.classList.toggle('selected');document.querySelectorAll('.live-prompt-emoji').forEach(el=>el!==this&&el.classList.remove('selected'))">${e}</span>`
                ).join('')}</div>`;
            }

            if (type === 'checkboxes') {
                return (prompt.choices || []).map((c, i) =>
                    `<label class="live-prompt-choice"><input type="checkbox" name="live-prompt-cb" value="${i}">${c}</label>`
                ).join('');
            }

            // Default: radio buttons (multiple-choice, yes-no, poll, prediction)
            return (prompt.choices || []).map((c, i) =>
                `<label class="live-prompt-choice" onclick="this.querySelector('input').checked=true"><input type="radio" name="live-prompt-radio" value="${i}">${c}</label>`
            ).join('');
        }

        closeModal() {
            this.modal.classList.remove('active');
            this.currentPrompt = null;
        }

        skipPrompt() {
            // Just close - already marked as triggered
            this.closeModal();
        }

        submitPrompt() {
            if (!this.currentPrompt) return;

            // Gather response
            let response = null;
            const type = this.currentPrompt.type || 'multiple-choice';

            if (type === 'text-input') {
                const textarea = document.getElementById('live-prompt-text');
                response = textarea ? textarea.value : '';
            } else if (type === 'scale') {
                const slider = document.getElementById('live-prompt-scale');
                response = slider ? slider.value : '5';
            } else if (type === 'emoji-reaction') {
                const selected = document.querySelector('.live-prompt-emoji.selected');
                response = selected ? selected.textContent : null;
            } else if (type === 'checkboxes') {
                const checked = document.querySelectorAll('input[name="live-prompt-cb"]:checked');
                response = Array.from(checked).map(cb => parseInt(cb.value));
            } else {
                const selected = document.querySelector('input[name="live-prompt-radio"]:checked');
                response = selected ? parseInt(selected.value) : null;
            }

            // Save response
            this.saveResponse(this.currentPrompt.id, response);

            // Close modal immediately - NO outcome text shown (critical requirement)
            this.closeModal();
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.livePrompts = new LivePromptSystem();
        });
    } else {
        window.livePrompts = new LivePromptSystem();
    }
})();
