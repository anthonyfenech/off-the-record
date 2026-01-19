// Simple, reliable prompt system - no fancy bullshit

class PromptSystem {
    constructor() {
        this.prompts = [];
        this.responses = this.loadResponses();
        this.observers = [];
        this.currentPrompt = null;
        this.init();
    }

    async init() {
        try {
            const response = await fetch('./prompts/prompts.json');
            const data = await response.json();
            this.prompts = data.prompts;

            // Set up triggers after a short delay to ensure chapter content is loaded
            setTimeout(() => this.setupTriggers(), 500);

            // Re-setup triggers when chapter changes
            document.addEventListener('chapterLoaded', () => {
                setTimeout(() => this.setupTriggers(), 100);
            });
        } catch (error) {
            console.error('Failed to load prompts:', error);
        }
    }

    setupTriggers() {
        // Disconnect existing observers
        this.observers.forEach(obs => obs.disconnect());
        this.observers = [];

        this.prompts.forEach(prompt => {
            const element = document.getElementById(prompt.triggerElement);
            if (!element) {
                return; // Element not in current chapter
            }

            // Skip if already answered
            if (this.hasAnswered(prompt.id)) {
                return;
            }

            // Create observer that triggers when element comes into view
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.showPrompt(prompt);
                            observer.disconnect();
                        }
                    });
                },
                { rootMargin: '100px 0px 0px 0px', threshold: 0 }
            );

            observer.observe(element);
            this.observers.push(observer);
        });
    }

    showPrompt(prompt) {
        const modal = document.getElementById('prompt-modal');
        if (!modal) return;

        // Don't show if another prompt is already active
        if (modal.classList.contains('active')) return;

        // Populate content
        document.getElementById('prompt-title').textContent = prompt.title;
        document.getElementById('prompt-setup').textContent = prompt.setup;
        document.getElementById('prompt-question').textContent = prompt.question;

        // Clear previous content
        const choicesDiv = document.getElementById('prompt-choices');
        const textDiv = document.getElementById('prompt-text');
        const contentDiv = document.querySelector('.prompt-content');

        // Remove any existing outcome screen
        const existingOutcome = contentDiv.querySelector('.outcome-screen');
        if (existingOutcome) {
            existingOutcome.remove();
        }

        choicesDiv.innerHTML = '';
        textDiv.innerHTML = '';
        choicesDiv.style.display = 'none';
        textDiv.style.display = 'none';

        // Show the input section
        document.getElementById('prompt-title').style.display = 'block';
        document.getElementById('prompt-setup').style.display = 'block';
        document.getElementById('prompt-question').style.display = 'block';
        document.querySelector('.prompt-buttons').style.display = 'flex';

        // Set up based on type
        if (prompt.type === 'multiple-choice') {
            this.setupMultipleChoice(prompt, choicesDiv);
        } else if (prompt.type === 'creative-text') {
            this.setupCreativeText(prompt, textDiv);
        }

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Store current prompt
        this.currentPrompt = prompt;

        // Focus first interactive element
        setTimeout(() => {
            const firstChoice = choicesDiv.querySelector('input[type="radio"]');
            const textarea = document.getElementById('prompt-textarea');
            if (firstChoice) {
                firstChoice.focus();
            } else if (textarea) {
                textarea.focus();
            }
        }, 100);
    }

    setupMultipleChoice(prompt, container) {
        container.style.display = 'block';

        prompt.choices.forEach(choice => {
            const label = document.createElement('label');
            label.className = 'prompt-choice';
            label.innerHTML = `
                <input type="radio" name="prompt-answer" value="${choice.id}">
                <span>${choice.text}</span>
            `;
            container.appendChild(label);
        });

        // Submit handler
        document.getElementById('prompt-submit').onclick = () => {
            const selected = document.querySelector('input[name="prompt-answer"]:checked');
            if (selected) {
                this.submitAnswer(selected.value);
            } else {
                alert('Please select an answer');
            }
        };
    }

    setupCreativeText(prompt, container) {
        container.style.display = 'block';

        const textarea = document.createElement('textarea');
        textarea.id = 'prompt-textarea';
        textarea.maxLength = prompt.maxLength;
        textarea.placeholder = prompt.placeholder || '';

        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.textContent = `0 / ${prompt.maxLength}`;

        textarea.addEventListener('input', () => {
            counter.textContent = `${textarea.value.length} / ${prompt.maxLength}`;
            if (textarea.value.length >= prompt.maxLength) {
                counter.classList.add('at-limit');
            } else {
                counter.classList.remove('at-limit');
            }
        });

        container.appendChild(textarea);
        container.appendChild(counter);

        // Submit handler
        document.getElementById('prompt-submit').onclick = () => {
            const text = textarea.value.trim();
            if (text.length > 0) {
                this.submitAnswer(text);
            } else {
                alert('Please write a response');
            }
        };
    }

    submitAnswer(answer) {
        const prompt = this.currentPrompt;

        // Save response
        this.responses[prompt.id] = {
            answer: answer,
            timestamp: new Date().toISOString()
        };
        this.saveResponses();

        // Show outcome
        this.showOutcome(prompt, answer);
    }

    showOutcome(prompt, userAnswer) {
        const content = document.querySelector('.prompt-content');

        // Hide the input elements
        document.getElementById('prompt-title').style.display = 'none';
        document.getElementById('prompt-setup').style.display = 'none';
        document.getElementById('prompt-question').style.display = 'none';
        document.getElementById('prompt-choices').style.display = 'none';
        document.getElementById('prompt-text').style.display = 'none';
        document.querySelector('.prompt-buttons').style.display = 'none';

        // Create outcome container
        const outcomeDiv = document.createElement('div');
        outcomeDiv.className = 'outcome-screen';

        if (prompt.type === 'multiple-choice') {
            // Find user's choice text
            const userChoice = prompt.choices.find(c => c.id === userAnswer);
            const userText = userChoice ? userChoice.text : userAnswer;

            outcomeDiv.innerHTML = `
                <h2>YOU CHOSE:</h2>
                <p class="user-choice">${userText}</p>

                <div class="divider">VS</div>

                <h2>FENECH CHOSE:</h2>
                <p class="fenech-choice">${prompt.answerText}</p>

                <div class="outcome-text">${prompt.outcome}</div>

                <button id="continue-btn" class="continue-btn">CONTINUE READING</button>
            `;
        } else if (prompt.type === 'creative-text') {
            let html = `
                <h3>YOU WROTE:</h3>
                <div class="user-response">"${this.escapeHTML(userAnswer)}"</div>

                <div class="divider">VS</div>

                <h3>FENECH WROTE:</h3>
                <div class="fenech-response">"${this.escapeHTML(prompt.answer)}"</div>

                <div class="outcome-text">${prompt.outcome}</div>
            `;

            // Add Pedro's response if it exists
            if (prompt.pedroResponse) {
                html += `
                    <div class="pedro-response">
                        <h3>PEDRO'S RESPONSE:</h3>
                        <div class="response-text">"${prompt.pedroResponse}"</div>
                    </div>
                `;
            }

            html += `<button id="continue-btn" class="continue-btn">CONTINUE READING</button>`;
            outcomeDiv.innerHTML = html;
        }

        content.appendChild(outcomeDiv);

        // Continue button handler
        document.getElementById('continue-btn').onclick = () => {
            outcomeDiv.remove();
            this.hidePrompt();
        };
    }

    hidePrompt() {
        const modal = document.getElementById('prompt-modal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    skipPrompt() {
        const prompt = this.currentPrompt;
        if (prompt) {
            this.responses[prompt.id] = {
                answer: 'SKIPPED',
                timestamp: new Date().toISOString()
            };
            this.saveResponses();
        }
        this.hidePrompt();
    }

    hasAnswered(promptId) {
        return this.responses[promptId] !== undefined;
    }

    loadResponses() {
        try {
            const saved = localStorage.getItem('otr-prompt-responses');
            return saved ? JSON.parse(saved) : {};
        } catch (error) {
            console.error('Failed to load responses:', error);
            return {};
        }
    }

    saveResponses() {
        try {
            localStorage.setItem('otr-prompt-responses', JSON.stringify(this.responses));
        } catch (error) {
            console.error('Failed to save responses:', error);
        }
    }

    escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // Reset all responses (for testing)
    resetResponses() {
        this.responses = {};
        localStorage.removeItem('otr-prompt-responses');
        console.log('Prompt responses reset');
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPromptSystem);
} else {
    initPromptSystem();
}

function initPromptSystem() {
    window.promptSystem = new PromptSystem();

    // Skip button handler
    const skipBtn = document.getElementById('prompt-skip');
    if (skipBtn) {
        skipBtn.addEventListener('click', () => {
            window.promptSystem.skipPrompt();
        });
    }

    // Overlay click to close
    const overlay = document.querySelector('.prompt-overlay');
    if (overlay) {
        overlay.addEventListener('click', () => {
            window.promptSystem.skipPrompt();
        });
    }

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('prompt-modal');
            if (modal && modal.classList.contains('active')) {
                window.promptSystem.skipPrompt();
            }
        }
    });

    // Keyboard navigation for multiple choice prompts
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('prompt-modal');
        if (!modal || !modal.classList.contains('active')) return;

        const choices = document.querySelectorAll('#prompt-choices input[type="radio"]');
        if (choices.length === 0) return;

        // Arrow key navigation
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            const currentIndex = Array.from(choices).findIndex(r => r === document.activeElement);
            let nextIndex;

            if (e.key === 'ArrowDown') {
                nextIndex = currentIndex < choices.length - 1 ? currentIndex + 1 : 0;
            } else {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : choices.length - 1;
            }

            choices[nextIndex].focus();
            choices[nextIndex].checked = true;
        }

        // Enter key to submit when choice is selected
        if (e.key === 'Enter') {
            const selected = document.querySelector('input[name="prompt-answer"]:checked');
            if (selected && window.promptSystem.currentPrompt?.type === 'multiple-choice') {
                e.preventDefault();
                window.promptSystem.submitAnswer(selected.value);
            }
        }
    });
}
