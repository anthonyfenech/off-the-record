// Admin Panel - Prompt Management System

class PromptAdmin {
    constructor() {
        this.prompts = [];
        this.currentPrompt = null;
        this.isNewPrompt = false;
        this.MAX_ACTIVE = 5;

        this.init();
    }

    async init() {
        await this.loadPrompts();
        this.renderTables();
        this.setupEventListeners();
        this.populateChapterDropdown();
    }

    // ==================== DATA LOADING ====================

    async loadPrompts() {
        try {
            const response = await fetch('../prompts/prompts.json');
            const data = await response.json();
            this.prompts = data.prompts;
        } catch (error) {
            console.error('Failed to load prompts:', error);
            this.showToast('Failed to load prompts', 'error');
        }
    }

    async savePrompts() {
        // For now, generate JSON and show in console
        // In production, this would POST to an API endpoint
        const data = { prompts: this.prompts };
        const json = JSON.stringify(data, null, 2);

        console.log('=== UPDATED PROMPTS.JSON ===');
        console.log(json);
        console.log('============================');

        // Copy to clipboard
        try {
            await navigator.clipboard.writeText(json);
            this.showToast('Changes saved! JSON copied to clipboard.', 'success');
        } catch (err) {
            // Fallback: show in prompt
            this.showToast('Check console for updated JSON', 'success');
        }

        return true;
    }

    // ==================== RENDERING ====================

    renderTables() {
        const activePrompts = this.getActivePrompts();
        const benchPrompts = this.getBenchPrompts();

        this.renderActiveTable(activePrompts);
        this.renderBenchTable(benchPrompts);
        this.updateCounts(activePrompts.length, benchPrompts.length);
        this.updateWarningBanner(activePrompts.length);
    }

    getActivePrompts() {
        return this.prompts
            .filter(p => p.status === 'active')
            .sort((a, b) => a.chapter - b.chapter);
    }

    getBenchPrompts() {
        return this.prompts
            .filter(p => p.status === 'bench')
            .sort((a, b) => (a.name || a.id).localeCompare(b.name || b.id));
    }

    renderActiveTable(prompts) {
        const tbody = document.getElementById('active-tbody');
        const empty = document.getElementById('active-empty');
        const table = document.getElementById('active-table');

        if (prompts.length === 0) {
            table.style.display = 'none';
            empty.style.display = 'block';
            return;
        }

        table.style.display = 'table';
        empty.style.display = 'none';

        tbody.innerHTML = prompts.map(p => this.renderPromptRow(p, 'active')).join('');
    }

    renderBenchTable(prompts) {
        const tbody = document.getElementById('bench-tbody');
        const empty = document.getElementById('bench-empty');
        const table = document.getElementById('bench-table');

        if (prompts.length === 0) {
            table.style.display = 'none';
            empty.style.display = 'block';
            return;
        }

        table.style.display = 'table';
        empty.style.display = 'none';

        tbody.innerHTML = prompts.map(p => this.renderPromptRow(p, 'bench')).join('');
    }

    renderPromptRow(prompt, section) {
        const isActive = section === 'active';
        const atLimit = this.getActivePrompts().length >= this.MAX_ACTIVE;

        const toggleBtn = isActive
            ? `<button class="action-btn deactivate" data-id="${prompt.id}" title="Move to bench">&#8595;</button>`
            : `<button class="action-btn activate" data-id="${prompt.id}" title="Activate" ${atLimit ? 'disabled' : ''}>&#8593;</button>`;

        const typeLabel = prompt.type === 'multiple-choice' ? 'Multiple Choice' : 'Creative Text';

        return `
            <tr data-id="${prompt.id}">
                <td class="col-status">
                    <span class="status-dot ${isActive ? 'active' : 'bench'}"></span>
                </td>
                <td class="col-name">
                    <span class="prompt-name">${prompt.name || prompt.id}</span>
                </td>
                <td class="col-chapter">Ch ${prompt.chapter}</td>
                <td class="col-type">
                    <span class="type-badge">${typeLabel}</span>
                </td>
                <td class="col-actions">
                    ${toggleBtn}
                    <button class="action-btn edit" data-id="${prompt.id}" title="Edit">&#9998;</button>
                    <button class="action-btn delete" data-id="${prompt.id}" title="Delete">&times;</button>
                </td>
            </tr>
        `;
    }

    updateCounts(activeCount, benchCount) {
        document.getElementById('active-count').textContent = `(${activeCount}/${this.MAX_ACTIVE})`;
        document.getElementById('bench-count').textContent = `(${benchCount})`;
    }

    updateWarningBanner(activeCount) {
        const banner = document.getElementById('limit-warning');
        banner.style.display = activeCount >= this.MAX_ACTIVE ? 'flex' : 'none';
    }

    // ==================== EVENT LISTENERS ====================

    setupEventListeners() {
        // New prompt button
        document.getElementById('new-prompt-btn').addEventListener('click', () => {
            this.openNewPromptModal();
        });

        // Table action buttons (delegated)
        document.getElementById('active-tbody').addEventListener('click', (e) => this.handleTableClick(e));
        document.getElementById('bench-tbody').addEventListener('click', (e) => this.handleTableClick(e));

        // Modal close buttons
        document.getElementById('modal-close').addEventListener('click', () => this.closeEditModal());
        document.getElementById('cancel-btn').addEventListener('click', () => this.closeEditModal());
        document.querySelector('#edit-modal .modal-overlay').addEventListener('click', () => this.closeEditModal());

        // Delete modal
        document.getElementById('delete-modal-close').addEventListener('click', () => this.closeDeleteModal());
        document.getElementById('delete-cancel').addEventListener('click', () => this.closeDeleteModal());
        document.querySelector('#delete-modal .modal-overlay').addEventListener('click', () => this.closeDeleteModal());
        document.getElementById('delete-confirm').addEventListener('click', () => this.confirmDelete());

        // Form submission
        document.getElementById('prompt-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.savePrompt();
        });

        // Prompt type toggle
        document.getElementById('prompt-type').addEventListener('change', (e) => {
            this.togglePromptTypeFields(e.target.value);
        });

        // Name to ID auto-generation
        document.getElementById('prompt-name').addEventListener('input', (e) => {
            if (this.isNewPrompt) {
                const id = this.generateId(e.target.value);
                document.getElementById('prompt-id').value = id;
            }
        });

        // Status toggle - check limit
        document.querySelectorAll('input[name="status"]').forEach(radio => {
            radio.addEventListener('change', () => {
                this.checkStatusToggle();
            });
        });

        // Add choice button
        document.getElementById('add-choice-btn').addEventListener('click', () => {
            this.addChoiceD();
        });

        // Escape key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeEditModal();
                this.closeDeleteModal();
            }
        });
    }

    handleTableClick(e) {
        const btn = e.target.closest('.action-btn');
        if (!btn) return;

        const id = btn.dataset.id;

        if (btn.classList.contains('activate')) {
            this.activatePrompt(id);
        } else if (btn.classList.contains('deactivate')) {
            this.deactivatePrompt(id);
        } else if (btn.classList.contains('edit')) {
            this.openEditModal(id);
        } else if (btn.classList.contains('delete')) {
            this.openDeleteModal(id);
        }
    }

    // ==================== ACTIVATION SYSTEM ====================

    activatePrompt(id) {
        const activeCount = this.getActivePrompts().length;

        if (activeCount >= this.MAX_ACTIVE) {
            this.showToast('Cannot activate: 5 active prompts already', 'error');
            return;
        }

        const prompt = this.prompts.find(p => p.id === id);
        if (prompt) {
            prompt.status = 'active';
            this.renderTables();
            this.savePrompts();
            this.showToast(`"${prompt.name || prompt.id}" activated`, 'success');
        }
    }

    deactivatePrompt(id) {
        const prompt = this.prompts.find(p => p.id === id);
        if (prompt) {
            prompt.status = 'bench';
            this.renderTables();
            this.savePrompts();
            this.showToast(`"${prompt.name || prompt.id}" moved to bench`, 'success');
        }
    }

    // ==================== EDIT MODAL ====================

    openNewPromptModal() {
        this.isNewPrompt = true;
        this.currentPrompt = null;
        document.getElementById('modal-title').textContent = 'New Prompt';
        this.resetForm();

        // Default to bench
        document.querySelector('input[name="status"][value="bench"]').checked = true;

        document.getElementById('edit-modal').classList.add('open');
    }

    openEditModal(id) {
        this.isNewPrompt = false;
        this.currentPrompt = this.prompts.find(p => p.id === id);

        if (!this.currentPrompt) return;

        document.getElementById('modal-title').textContent = 'Edit Prompt';
        this.populateForm(this.currentPrompt);
        document.getElementById('edit-modal').classList.add('open');
    }

    closeEditModal() {
        document.getElementById('edit-modal').classList.remove('open');
        this.currentPrompt = null;
        this.isNewPrompt = false;
    }

    resetForm() {
        const form = document.getElementById('prompt-form');
        form.reset();
        document.getElementById('prompt-id').value = '';
        document.getElementById('status-warning').style.display = 'none';
        this.togglePromptTypeFields('multiple-choice');
        this.resetChoices();
    }

    populateForm(prompt) {
        // Status
        document.querySelector(`input[name="status"][value="${prompt.status}"]`).checked = true;

        // Basic info
        document.getElementById('prompt-name').value = prompt.name || '';
        document.getElementById('prompt-id').value = prompt.id;
        document.getElementById('prompt-chapter').value = prompt.chapter;
        document.getElementById('prompt-trigger').value = prompt.triggerElement || '';
        document.getElementById('prompt-type').value = prompt.type;

        // Content
        document.getElementById('prompt-title').value = prompt.title || '';
        document.getElementById('prompt-setup').value = prompt.setup || '';
        document.getElementById('prompt-question').value = prompt.question || '';
        document.getElementById('prompt-outcome').value = prompt.outcome || '';

        // Type-specific fields
        this.togglePromptTypeFields(prompt.type);

        if (prompt.type === 'multiple-choice' && prompt.choices) {
            this.populateChoices(prompt.choices, prompt.answer);
        } else if (prompt.type === 'creative-text') {
            document.getElementById('prompt-maxlength').value = prompt.maxLength || 280;
            document.getElementById('prompt-placeholder').value = prompt.placeholder || '';
            document.getElementById('prompt-answer-text').value = prompt.answer || '';
        }

        this.checkStatusToggle();
    }

    populateChoices(choices, correctAnswer) {
        this.resetChoices();

        choices.forEach((choice, index) => {
            const input = document.querySelector(`.choice-input[data-choice="${choice.id}"]`);
            if (input) {
                input.value = choice.text;
            }

            // Add choice D if needed
            if (choice.id === 'D' && choices.length > 3) {
                this.addChoiceD();
                document.querySelector('.choice-input[data-choice="D"]').value = choice.text;
            }
        });

        // Set correct answer
        const correctRadio = document.querySelector(`input[name="correct-answer"][value="${correctAnswer}"]`);
        if (correctRadio) {
            correctRadio.checked = true;
        }
    }

    resetChoices() {
        // Remove choice D if exists
        const choiceD = document.querySelector('.choice-row[data-choice="D"]');
        if (choiceD) choiceD.remove();

        // Clear and show add button
        document.querySelectorAll('.choice-input').forEach(input => input.value = '');
        document.querySelectorAll('input[name="correct-answer"]').forEach(r => r.checked = false);
        document.getElementById('add-choice-btn').style.display = 'inline-block';
    }

    addChoiceD() {
        const container = document.getElementById('choices-container');
        const existing = container.querySelector('[data-choice="D"]');
        if (existing) return;

        const row = document.createElement('div');
        row.className = 'choice-row';
        row.dataset.choice = 'D';
        row.innerHTML = `
            <input type="text" class="choice-input" data-choice="D" placeholder="Choice D">
            <label class="correct-label"><input type="radio" name="correct-answer" value="D"> Correct</label>
        `;
        container.appendChild(row);

        // Hide add button
        document.getElementById('add-choice-btn').style.display = 'none';
    }

    togglePromptTypeFields(type) {
        const mcFields = document.getElementById('mc-fields');
        const ctFields = document.getElementById('ct-fields');

        if (type === 'multiple-choice') {
            mcFields.style.display = 'block';
            ctFields.style.display = 'none';
        } else {
            mcFields.style.display = 'none';
            ctFields.style.display = 'block';
        }
    }

    checkStatusToggle() {
        const activeRadio = document.querySelector('input[name="status"][value="active"]');
        const warning = document.getElementById('status-warning');
        const activeCount = this.getActivePrompts().length;
        const isCurrentActive = this.currentPrompt?.status === 'active';

        // If trying to activate and already at limit (and not editing an already-active prompt)
        if (activeRadio.checked && activeCount >= this.MAX_ACTIVE && !isCurrentActive) {
            warning.style.display = 'block';
            activeRadio.checked = false;
            document.querySelector('input[name="status"][value="bench"]').checked = true;
        } else {
            warning.style.display = 'none';
        }
    }

    generateId(name) {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .substring(0, 30);
    }

    // ==================== SAVE PROMPT ====================

    savePrompt() {
        const form = document.getElementById('prompt-form');

        // Gather form data
        const data = {
            id: document.getElementById('prompt-id').value || this.generateId(document.getElementById('prompt-name').value),
            status: document.querySelector('input[name="status"]:checked').value,
            name: document.getElementById('prompt-name').value,
            chapter: parseInt(document.getElementById('prompt-chapter').value),
            triggerElement: document.getElementById('prompt-trigger').value,
            type: document.getElementById('prompt-type').value,
            title: document.getElementById('prompt-title').value,
            setup: document.getElementById('prompt-setup').value,
            question: document.getElementById('prompt-question').value,
            outcome: document.getElementById('prompt-outcome').value
        };

        // Type-specific data
        if (data.type === 'multiple-choice') {
            data.choices = this.gatherChoices();
            data.answer = document.querySelector('input[name="correct-answer"]:checked')?.value || 'A';
            data.answerText = data.choices.find(c => c.id === data.answer)?.text || '';
        } else {
            data.maxLength = parseInt(document.getElementById('prompt-maxlength').value) || 280;
            data.placeholder = document.getElementById('prompt-placeholder').value;
            data.answer = document.getElementById('prompt-answer-text').value;
        }

        // Validate
        if (!this.validatePrompt(data)) return;

        // Save
        if (this.isNewPrompt) {
            this.prompts.push(data);
            this.showToast(`"${data.name}" created`, 'success');
        } else {
            const index = this.prompts.findIndex(p => p.id === this.currentPrompt.id);
            if (index !== -1) {
                this.prompts[index] = data;
            }
            this.showToast(`"${data.name}" updated`, 'success');
        }

        this.savePrompts();
        this.renderTables();
        this.closeEditModal();
    }

    gatherChoices() {
        const choices = [];
        document.querySelectorAll('.choice-input').forEach(input => {
            const text = input.value.trim();
            if (text) {
                choices.push({
                    id: input.dataset.choice,
                    text: text
                });
            }
        });
        return choices;
    }

    validatePrompt(data) {
        if (!data.name) {
            alert('Prompt name is required');
            return false;
        }
        if (!data.chapter) {
            alert('Chapter is required');
            return false;
        }
        if (!data.triggerElement) {
            alert('Trigger element ID is required');
            return false;
        }
        if (data.type === 'multiple-choice') {
            if (data.choices.length < 2) {
                alert('At least 2 choices are required');
                return false;
            }
        }
        return true;
    }

    // ==================== DELETE ====================

    openDeleteModal(id) {
        this.currentPrompt = this.prompts.find(p => p.id === id);
        if (!this.currentPrompt) return;

        document.getElementById('delete-prompt-name').textContent = this.currentPrompt.name || this.currentPrompt.id;
        document.getElementById('delete-active-warning').style.display =
            this.currentPrompt.status === 'active' ? 'block' : 'none';

        document.getElementById('delete-modal').classList.add('open');
    }

    closeDeleteModal() {
        document.getElementById('delete-modal').classList.remove('open');
    }

    confirmDelete() {
        if (!this.currentPrompt) return;

        const name = this.currentPrompt.name || this.currentPrompt.id;
        this.prompts = this.prompts.filter(p => p.id !== this.currentPrompt.id);

        this.savePrompts();
        this.renderTables();
        this.closeDeleteModal();
        this.showToast(`"${name}" deleted`, 'success');
    }

    // ==================== UTILITIES ====================

    populateChapterDropdown() {
        const select = document.getElementById('prompt-chapter');
        for (let i = 1; i <= 28; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Chapter ${i}`;
            select.appendChild(option);
        }
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type} show`;

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.promptAdmin = new PromptAdmin();
});
