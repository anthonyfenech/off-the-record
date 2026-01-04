// Guestbook - Press box style sign-in sheet

const STORAGE_KEY = 'otr_guestbook_entries';
const MAX_DISPLAY_ENTRIES = 15;

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
    addEntry(name, email, publication, message) {
        const entry = {
            id: Date.now(),
            name: name.trim(),
            email: email.trim(),
            publication: publication ? publication.trim() : null,
            message: message ? message.trim().substring(0, 280) : null,
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

        // Social share section
        wrapper.appendChild(this.createShareSection());

        // Sign-in form
        wrapper.appendChild(this.createForm());

        // Recent entries
        wrapper.appendChild(this.createEntriesList());

        container.appendChild(wrapper);
    }

    // Create social share section
    createShareSection() {
        const section = document.createElement('div');
        section.className = 'guestbook-share';

        const heading = document.createElement('div');
        heading.className = 'guestbook-share-heading';
        heading.textContent = 'SPREAD THE WORD:';

        const buttons = document.createElement('div');
        buttons.className = 'guestbook-share-buttons';

        const shareUrl = encodeURIComponent('https://anthonyfenech.com/off-the-record/');
        const shareText = encodeURIComponent('OFF-THE-RECORD: A Baseball Memoir by Anthony Fenech - 15 years covering the Detroit Tigers');

        // Twitter/X
        const twitter = document.createElement('a');
        twitter.className = 'share-btn share-twitter';
        twitter.href = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
        twitter.target = '_blank';
        twitter.rel = 'noopener noreferrer';
        twitter.textContent = 'X / TWITTER';

        // LinkedIn
        const linkedin = document.createElement('a');
        linkedin.className = 'share-btn share-linkedin';
        linkedin.href = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
        linkedin.target = '_blank';
        linkedin.rel = 'noopener noreferrer';
        linkedin.textContent = 'LINKEDIN';

        // Facebook
        const facebook = document.createElement('a');
        facebook.className = 'share-btn share-facebook';
        facebook.href = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        facebook.target = '_blank';
        facebook.rel = 'noopener noreferrer';
        facebook.textContent = 'FACEBOOK';

        buttons.appendChild(twitter);
        buttons.appendChild(linkedin);
        buttons.appendChild(facebook);

        section.appendChild(heading);
        section.appendChild(buttons);

        return section;
    }

    // Create the sign-in form
    createForm() {
        const formSection = document.createElement('div');
        formSection.className = 'guestbook-form-section';

        const heading = document.createElement('div');
        heading.className = 'guestbook-form-heading';
        heading.textContent = 'SIGN THE GUESTBOOK:';

        const form = document.createElement('form');
        form.className = 'guestbook-form';
        form.id = 'guestbookForm';

        // Name field
        const nameGroup = this.createFormGroup('name', 'NAME *', 'text', true, 'Your name');

        // Email field
        const emailGroup = this.createFormGroup('email', 'EMAIL *', 'email', true, 'your@email.com');

        // Publication field
        const pubGroup = this.createFormGroup('publication', 'PUBLICATION / OUTLET', 'text', false, 'ESPN, Freelance, etc.');

        // Message field
        const messageGroup = document.createElement('div');
        messageGroup.className = 'form-group';

        const messageLabel = document.createElement('label');
        messageLabel.className = 'form-label';
        messageLabel.htmlFor = 'message';
        messageLabel.textContent = 'MESSAGE (280 CHARS MAX)';

        const messageTextarea = document.createElement('textarea');
        messageTextarea.className = 'form-textarea';
        messageTextarea.id = 'message';
        messageTextarea.name = 'message';
        messageTextarea.maxLength = 280;
        messageTextarea.rows = 3;
        messageTextarea.placeholder = 'Leave a short message...';

        const charCount = document.createElement('div');
        charCount.className = 'char-count';
        charCount.id = 'charCount';
        charCount.textContent = '0 / 280';

        messageTextarea.addEventListener('input', () => {
            charCount.textContent = `${messageTextarea.value.length} / 280`;
        });

        messageGroup.appendChild(messageLabel);
        messageGroup.appendChild(messageTextarea);
        messageGroup.appendChild(charCount);

        // Submit button
        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.className = 'guestbook-submit';
        submitBtn.textContent = 'SIGN IN';

        // Success message (hidden initially)
        const successMsg = document.createElement('div');
        successMsg.className = 'guestbook-success';
        successMsg.id = 'guestbookSuccess';
        successMsg.textContent = 'Thanks for signing the guestbook!';
        successMsg.style.display = 'none';

        form.appendChild(nameGroup);
        form.appendChild(emailGroup);
        form.appendChild(pubGroup);
        form.appendChild(messageGroup);
        form.appendChild(submitBtn);
        form.appendChild(successMsg);

        // Form submission handler
        form.addEventListener('submit', (e) => this.handleSubmit(e));

        formSection.appendChild(heading);
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
        label.textContent = labelText;

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
        const publication = form.publication.value;
        const message = form.message.value;

        // Add entry
        this.addEntry(name, email, publication, message);

        // Show success message
        const successMsg = document.getElementById('guestbookSuccess');
        successMsg.style.display = 'block';

        // Reset form
        form.reset();
        document.getElementById('charCount').textContent = '0 / 280';

        // Update entries list
        const entriesList = document.querySelector('.guestbook-entries-list');
        if (entriesList) {
            entriesList.innerHTML = '';
            this.getRecentEntries().forEach(entry => {
                entriesList.appendChild(this.createEntryItem(entry));
            });
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
        heading.textContent = 'RECENT SIGN-INS:';

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

        const header = document.createElement('div');
        header.className = 'guestbook-entry-header';

        const name = document.createElement('span');
        name.className = 'guestbook-entry-name';
        name.textContent = entry.name;

        header.appendChild(name);

        if (entry.publication) {
            const pub = document.createElement('span');
            pub.className = 'guestbook-entry-publication';
            pub.textContent = ` - ${entry.publication}`;
            header.appendChild(pub);
        }

        const date = document.createElement('span');
        date.className = 'guestbook-entry-date';
        date.textContent = this.formatDate(entry.timestamp);

        item.appendChild(header);
        item.appendChild(date);

        if (entry.message) {
            const message = document.createElement('div');
            message.className = 'guestbook-entry-message';
            message.textContent = `"${entry.message}"`;
            item.appendChild(message);
        }

        return item;
    }
}

// Export singleton instance
export const guestbook = new Guestbook();
