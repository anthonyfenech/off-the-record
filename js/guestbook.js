// Guestbook - Sign the guestbook

const STORAGE_KEY = 'otr_guestbook_entries';
const MAX_DISPLAY_ENTRIES = 20;

class Guestbook {
    constructor() {
        this.entries = this.loadEntries();
    }

    // Load entries from localStorage
    loadEntries() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading guestbook entries:', error);
            return [];
        }
    }

    // Save entries to localStorage
    saveEntries() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.entries));
        } catch (error) {
            console.error('Error saving guestbook entries:', error);
        }
    }

    // Add a new entry
    addEntry(name, email, hometown, comment) {
        const entry = {
            id: Date.now(),
            name: name.trim(),
            email: email.trim(),
            hometown: hometown ? hometown.trim() : null,
            comment: comment ? comment.trim() : null,
            timestamp: new Date().toISOString()
        };

        this.entries.unshift(entry); // Add to beginning (newest first)
        this.saveEntries();
        return entry;
    }

    // Get recent entries for display
    getRecentEntries(count = MAX_DISPLAY_ENTRIES) {
        return this.entries.slice(0, count);
    }

    // Format date for display
    formatDate(isoString) {
        const date = new Date(isoString);
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    // Render the guestbook UI
    render(container) {
        container.innerHTML = '';

        // Create main wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'guestbook-wrapper';

        // Intro text
        wrapper.appendChild(this.createIntro());

        // Sign-in form
        wrapper.appendChild(this.createForm());

        // Recent entries
        wrapper.appendChild(this.createEntriesList());

        container.appendChild(wrapper);
    }

    // Create intro section
    createIntro() {
        const intro = document.createElement('div');
        intro.className = 'guestbook-intro';
        intro.textContent = 'Sign the guestbook. Let us know you stopped by.';
        return intro;
    }

    // Create the sign-in form
    createForm() {
        const formSection = document.createElement('div');
        formSection.className = 'guestbook-form-section';

        const form = document.createElement('form');
        form.className = 'guestbook-form';
        form.id = 'guestbookForm';

        // Name field
        const nameGroup = this.createFormGroup('name', 'Name', 'text', true, 'Your name');

        // Email field
        const emailGroup = this.createFormGroup('email', 'Email', 'email', true, 'your@email.com');

        // Hometown field
        const hometownGroup = this.createFormGroup('hometown', 'Hometown', 'text', false, 'Detroit, MI');

        // Comment field
        const commentGroup = document.createElement('div');
        commentGroup.className = 'form-group';

        const commentLabel = document.createElement('label');
        commentLabel.className = 'form-label';
        commentLabel.htmlFor = 'comment';
        commentLabel.textContent = 'Comments';

        const commentTextarea = document.createElement('textarea');
        commentTextarea.className = 'form-textarea';
        commentTextarea.id = 'comment';
        commentTextarea.name = 'comment';
        commentTextarea.rows = 4;
        commentTextarea.placeholder = 'Leave a comment...';

        commentGroup.appendChild(commentLabel);
        commentGroup.appendChild(commentTextarea);

        // Submit button
        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.className = 'guestbook-submit';
        submitBtn.textContent = 'SIGN THE GUESTBOOK';

        // Success message (hidden initially)
        const successMsg = document.createElement('div');
        successMsg.className = 'guestbook-success';
        successMsg.id = 'guestbookSuccess';
        successMsg.textContent = 'Thanks for signing the guestbook!';
        successMsg.style.display = 'none';

        form.appendChild(nameGroup);
        form.appendChild(emailGroup);
        form.appendChild(hometownGroup);
        form.appendChild(commentGroup);
        form.appendChild(submitBtn);
        form.appendChild(successMsg);

        // Form submission handler
        form.addEventListener('submit', (e) => this.handleSubmit(e));

        formSection.appendChild(form);

        return formSection;
    }

    // Create a form group (label + input)
    createFormGroup(id, labelText, type, required, placeholder) {
        const group = document.createElement('div');
        group.className = 'form-group';

        const label = document.createElement('label');
        label.className = 'form-label';
        label.htmlFor = id;
        label.textContent = labelText + (required ? ' *' : '');

        const input = document.createElement('input');
        input.type = type;
        input.className = 'form-input';
        input.id = id;
        input.name = id;
        input.required = required;
        input.placeholder = placeholder;

        group.appendChild(label);
        group.appendChild(input);

        return group;
    }

    // Handle form submission
    handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const hometown = form.hometown.value;
        const comment = form.comment.value;

        // Add entry
        this.addEntry(name, email, hometown, comment);

        // Show success message
        const successMsg = document.getElementById('guestbookSuccess');
        successMsg.style.display = 'block';

        // Reset form
        form.reset();

        // Update entries list
        const entriesSection = document.querySelector('.guestbook-entries');
        if (entriesSection) {
            const list = entriesSection.querySelector('.guestbook-entries-list');
            if (list) {
                list.innerHTML = '';
                const entries = this.getRecentEntries();
                if (entries.length === 0) {
                    const empty = document.createElement('div');
                    empty.className = 'guestbook-empty';
                    empty.textContent = 'Be the first to sign the guestbook!';
                    list.appendChild(empty);
                } else {
                    entries.forEach(entry => {
                        list.appendChild(this.createEntryItem(entry));
                    });
                }
            }
        }

        // Hide success message after 3 seconds
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 3000);
    }

    // Create the entries list
    createEntriesList() {
        const section = document.createElement('div');
        section.className = 'guestbook-entries';

        const heading = document.createElement('div');
        heading.className = 'guestbook-entries-heading';
        heading.textContent = 'RECENT ENTRIES';

        const list = document.createElement('div');
        list.className = 'guestbook-entries-list';

        const entries = this.getRecentEntries();

        if (entries.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'guestbook-empty';
            empty.textContent = 'Be the first to sign the guestbook!';
            list.appendChild(empty);
        } else {
            entries.forEach(entry => {
                list.appendChild(this.createEntryItem(entry));
            });
        }

        section.appendChild(heading);
        section.appendChild(list);

        return section;
    }

    // Create a single entry item
    createEntryItem(entry) {
        const item = document.createElement('div');
        item.className = 'guestbook-entry';

        // Name and hometown line
        const header = document.createElement('div');
        header.className = 'guestbook-entry-header';

        let headerText = entry.name;
        if (entry.hometown) {
            headerText += ` - ${entry.hometown}`;
        }
        header.textContent = headerText;

        item.appendChild(header);

        // Comment in quotes
        if (entry.comment) {
            const comment = document.createElement('div');
            comment.className = 'guestbook-entry-comment';
            comment.textContent = `"${entry.comment}"`;
            item.appendChild(comment);
        }

        return item;
    }
}

// Export singleton instance
export const guestbook = new Guestbook();
