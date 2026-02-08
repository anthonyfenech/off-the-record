// Driving Range - Interactive Prompts Testing Tool
// Extracted from driving-range.html

const STORAGE_KEY = 'driving_range_prompts';
const ANSWERED_KEY = 'driving_range_answered';
const TRIGGERED_KEY = 'driving_range_triggered';
const EMOJIS = ['😡','😂','😱','😢','🔥','💀','👏','🤔','😤','🙌','💯','🤷','😅','🤯','👍','👎'];
const TYPE_LIMITS = {'multiple-choice':4,'text-input':1,'checkboxes':6,'poll':4,'scale':1,'yes-no':2,'prediction':4,'emoji-reaction':8};
const SMALL_TYPES = ['multiple-choice','yes-no','poll','emoji-reaction','prediction'];

let allPrompts = [];
let currentTestPrompt = null;
let currentEditId = null;
let debounceTimer = null;
let selectedEmojis = [];

// Default prompts to migrate
const DEFAULT_PROMPTS = [
    {id:'verlander-camera',chapter:15,type:'multiple-choice',question:'What would you do?',context:'Verlander blew you off. TV cameras rolling.',triggerText:'',choices:['Nothing','Call him out privately','Call him out on camera'],outcome:'I asked it on-camera because I knew that\'s what he cared about most.'},
    {id:'verlander-trade',chapter:18,type:'text-input',question:'What do you tweet?',context:'Source confirmed: Verlander traded. You have 11 seconds.',triggerText:'',charLimit:280,outcome:'"The Tigers have traded Justin Verlander to the Astros." First by 2:27.'},
    {id:'astros-clubhouse',chapter:19,type:'yes-no',question:'Should I go in?',context:'Day after Verlander called you unethical on TV.',triggerText:'',choices:['Yes','No'],outcome:'Of course you went in. History will be on your side.'},
    {id:'pizza-resignation',chapter:22,type:'multiple-choice',question:'How should I quit?',context:'Frozen out. Jet\'s Pizza on speed dial.',triggerText:'',choices:['Fax','Twitter tirade','Send the Tigers a pizza'],outcome:'I sent them pizza. Career suicide. Worth it.'},
    {id:'vmart-hospital',chapter:17,type:'text-input',question:'What do you text back?',context:'V-Mart story drops at 2 AM. Ausmus texts: "Hold off."',triggerText:'',charLimit:280,outcome:'"What the fuck, man?" Story killed.'}
];

function init() {
    let stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        allPrompts = DEFAULT_PROMPTS.map(p => ({...p, created: Date.now(), modified: Date.now()}));
        savePrompts();
    } else {
        allPrompts = JSON.parse(stored);
    }
    // Load admin prompts
    loadAdminPrompts();
    updateChapterFilter();
    updateFormFields();
    renderPrompts();
    updateStats();
}

function loadAdminPrompts() {
    try {
        const admin = JSON.parse(localStorage.getItem('admin_interactivePrompts') || '[]');
        admin.forEach((p, i) => {
            const id = 'admin-' + (p.id || i);
            if (!allPrompts.find(x => x.id === id)) {
                allPrompts.push({
                    id,
                    chapter: null,
                    type: p.type || 'multiple-choice',
                    question: p.question,
                    context: '',
                    triggerText: p.triggerText || '',
                    choices: p.choices ? p.choices.map(c => c.text) : [],
                    outcome: 'Response recorded.',
                    created: Date.now(),
                    modified: Date.now()
                });
            }
        });
    } catch(e) {}
}

function savePrompts() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allPrompts));
}

function getAnswered() {
    try { return JSON.parse(localStorage.getItem(ANSWERED_KEY) || '{}'); } catch { return {}; }
}
function setAnswered(id) {
    const a = getAnswered(); a[id] = true;
    localStorage.setItem(ANSWERED_KEY, JSON.stringify(a));
}
function getTriggered() {
    try { return JSON.parse(sessionStorage.getItem(TRIGGERED_KEY) || '{}'); } catch { return {}; }
}
function setTriggered(id) {
    const t = getTriggered(); t[id] = true;
    sessionStorage.setItem(TRIGGERED_KEY, JSON.stringify(t));
}

function updateStats() {
    const answered = getAnswered();
    const tested = allPrompts.filter(p => answered[p.id]).length;
    const chapters = [...new Set(allPrompts.map(p => p.chapter).filter(c => c))].length;
    document.getElementById('statTotal').textContent = allPrompts.length + ' Total';
    document.getElementById('statTested').textContent = tested + ' Tested';
    document.getElementById('statUntested').textContent = (allPrompts.length - tested) + ' Untested';
    document.getElementById('statChapters').textContent = chapters + ' Chapters';
}

function updateChapterFilter() {
    const chapters = [...new Set(allPrompts.map(p => p.chapter).filter(c => c))].sort((a,b) => a-b);
    const sel = document.getElementById('chapterFilter');
    sel.innerHTML = '<option value="">All Chapters</option>' + chapters.map(c => `<option value="${c}">Chapter ${c}</option>`).join('');
}

function debounceRender() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(renderPrompts, 300);
}

function renderPrompts() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const chapterFilter = document.getElementById('chapterFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;
    const answered = getAnswered();

    let filtered = allPrompts.filter(p => {
        if (search && !p.question.toLowerCase().includes(search) && !(p.context||'').toLowerCase().includes(search)) return false;
        if (chapterFilter && p.chapter != chapterFilter) return false;
        if (typeFilter && p.type !== typeFilter) return false;
        return true;
    });

    // Group by chapter
    const groups = {};
    filtered.forEach(p => {
        const key = p.chapter || 'unassigned';
        if (!groups[key]) groups[key] = [];
        groups[key].push(p);
    });

    const container = document.getElementById('promptsContainer');
    let html = '';

    const sortedKeys = Object.keys(groups).sort((a,b) => {
        if (a === 'unassigned') return 1;
        if (b === 'unassigned') return -1;
        return Number(a) - Number(b);
    });

    sortedKeys.forEach(key => {
        const chapterLabel = key === 'unassigned' ? 'UNASSIGNED' : `CHAPTER ${key}`;
        html += `<div class="chapter-group"><div class="chapter-header">${chapterLabel} (${groups[key].length})</div>`;
        groups[key].forEach(p => {
            const status = answered[p.id] ? '<span class="prompt-card-status tested">✓ Tested</span>' : '<span class="prompt-card-status">○ Not tested</span>';
            const typeLabel = p.type.replace(/-/g,' ').toUpperCase();
            const modalSize = SMALL_TYPES.includes(p.type) ? 'SMALL' : 'MEDIUM';
            let details = '';
            if (p.choices) details = `${p.choices.length} options`;
            else if (p.type === 'text-input') details = `${p.charLimit || 280} chars`;
            else if (p.type === 'scale') details = `${p.scaleMinLabel || '1'} → ${p.scaleMaxLabel || '10'}`;
            else if (p.type === 'emoji-reaction') details = `${(p.emojis||[]).length} emojis`;

            html += `<div class="prompt-card" id="card-${p.id}">
                <div class="prompt-card-header">
                    <span class="prompt-card-id">#${p.id}</span>
                    ${status}
                </div>
                <span class="prompt-card-type">${typeLabel} (${modalSize})</span>
                <div class="prompt-card-question">${p.question}</div>
                ${p.context ? `<div class="prompt-card-details">Context: ${p.context}</div>` : ''}
                ${details ? `<div class="prompt-card-details">${details}</div>` : ''}
                <div class="trigger-line" data-prompt-id="${p.id}"></div>
                <div class="prompt-card-details" style="font-style:italic;">${p.outcome || ''}</div>
                <div class="prompt-card-actions">
                    <button onclick="editPrompt('${p.id}')">EDIT</button>
                    <button onclick="deletePrompt('${p.id}')" class="danger">DELETE</button>
                    <button onclick="duplicatePrompt('${p.id}')">DUPLICATE</button>
                    <button onclick="copyCode('${p.id}')">COPY CODE</button>
                    <button onclick="previewPrompt('${p.id}')" class="preview">PREVIEW</button>
                    <button onclick="testPrompt('${p.id}')">TEST</button>
                </div>
            </div>`;
        });
        html += '</div>';
    });

    container.innerHTML = html || '<div class="end-section">No prompts found</div>';
    setupObservers();
    updateStats();
}

function setupObservers() {
    const answered = getAnswered();
    const triggered = getTriggered();
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.dataset.promptId;
                if (!answered[id] && !triggered[id]) {
                    const prompt = allPrompts.find(p => p.id === id);
                    if (prompt) {
                        setTriggered(id);
                        testPrompt(id);
                    }
                }
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });
    document.querySelectorAll('.trigger-line').forEach(el => observer.observe(el));
}

// Form functions
function toggleForm() {
    document.getElementById('addForm').classList.toggle('collapsed');
}

function updateFormFields() {
    const type = document.getElementById('formType').value;
    const container = document.getElementById('dynamicFields');
    let html = '';

    if (['multiple-choice','poll','prediction'].includes(type)) {
        html = `<div class="form-row"><label>Choices (max ${TYPE_LIMITS[type]})</label>
            <div class="choices-list" id="choicesList"></div>
            <button type="button" class="add-choice-btn" onclick="addChoiceField()">+ Add Choice</button></div>`;
    } else if (type === 'checkboxes') {
        html = `<div class="form-row"><label>Options (max 6)</label>
            <div class="choices-list" id="choicesList"></div>
            <button type="button" class="add-choice-btn" onclick="addChoiceField()">+ Add Option</button></div>`;
    } else if (type === 'yes-no') {
        html = `<div class="form-row"><label>Choices (fixed)</label>
            <div class="choices-list"><div class="choice-row"><input value="Yes" disabled></div><div class="choice-row"><input value="No" disabled></div></div></div>`;
    } else if (type === 'scale') {
        html = `<div class="form-row scale-labels"><div><label>Min Label (1)</label><input type="text" id="scaleMin" placeholder="Bad idea"></div>
            <div><label>Max Label (10)</label><input type="text" id="scaleMax" placeholder="Brilliant"></div></div>`;
    } else if (type === 'emoji-reaction') {
        selectedEmojis = [];
        html = `<div class="form-row"><label>Select Emojis (max 8)</label>
            <div class="emoji-grid">${EMOJIS.map(e => `<button type="button" class="emoji-btn" onclick="toggleEmoji(this,'${e}')">${e}</button>`).join('')}</div>
            <div style="font-size:11px;color:#666;margin-top:5px;">Selected: <span id="emojiCount">0</span>/8</div></div>`;
    }

    container.innerHTML = html;
    if (['multiple-choice','poll','prediction','checkboxes'].includes(type)) {
        addChoiceField(); addChoiceField();
    }
}

function addChoiceField() {
    const type = document.getElementById('formType').value;
    const max = TYPE_LIMITS[type];
    const list = document.getElementById('choicesList');
    const count = list.querySelectorAll('.choice-row').length;
    if (count >= max) return;

    const div = document.createElement('div');
    div.className = 'choice-row';
    div.innerHTML = `<input type="text" placeholder="Option ${count+1}"><button type="button" onclick="this.parentElement.remove();updateAddBtn()">X</button>`;
    list.appendChild(div);
    updateAddBtn();
}

function updateAddBtn() {
    const type = document.getElementById('formType').value;
    const max = TYPE_LIMITS[type];
    const count = document.querySelectorAll('#choicesList .choice-row').length;
    const btn = document.querySelector('.add-choice-btn');
    if (btn) btn.disabled = count >= max;
}

function toggleEmoji(btn, emoji) {
    const idx = selectedEmojis.indexOf(emoji);
    if (idx > -1) {
        selectedEmojis.splice(idx, 1);
        btn.classList.remove('selected');
    } else if (selectedEmojis.length < 8) {
        selectedEmojis.push(emoji);
        btn.classList.add('selected');
    }
    document.getElementById('emojiCount').textContent = selectedEmojis.length;
}

function addPrompt() {
    const type = document.getElementById('formType').value;
    const question = document.getElementById('formQuestion').value.trim();
    if (!question) return alert('Question required');

    const prompt = {
        id: 'prompt-' + Date.now(),
        chapter: parseInt(document.getElementById('formChapter').value) || null,
        type,
        question,
        context: document.getElementById('formContext').value.trim(),
        triggerText: document.getElementById('formTrigger').value.trim(),
        outcome: document.getElementById('formOutcome').value.trim(),
        created: Date.now(),
        modified: Date.now()
    };

    if (['multiple-choice','poll','prediction','checkboxes'].includes(type)) {
        prompt.choices = [...document.querySelectorAll('#choicesList input')].map(i => i.value.trim()).filter(v => v);
    } else if (type === 'yes-no') {
        prompt.choices = ['Yes','No'];
    } else if (type === 'text-input') {
        prompt.charLimit = 280;
    } else if (type === 'scale') {
        prompt.scaleMinLabel = document.getElementById('scaleMin').value.trim() || '1';
        prompt.scaleMaxLabel = document.getElementById('scaleMax').value.trim() || '10';
    } else if (type === 'emoji-reaction') {
        prompt.emojis = [...selectedEmojis];
    }

    allPrompts.push(prompt);
    savePrompts();
    updateChapterFilter();
    renderPrompts();

    // Reset form
    document.getElementById('formQuestion').value = '';
    document.getElementById('formChapter').value = '';
    document.getElementById('formContext').value = '';
    document.getElementById('formTrigger').value = '';
    document.getElementById('formOutcome').value = '';
    updateFormFields();
}

// Test modal
function testPrompt(id) {
    const prompt = allPrompts.find(p => p.id === id);
    if (!prompt) return;
    currentTestPrompt = prompt;

    const modal = document.getElementById('testModalContent');
    modal.className = 'modal ' + (SMALL_TYPES.includes(prompt.type) ? 'small' : 'medium');

    document.getElementById('testQuestion').textContent = prompt.question;
    document.getElementById('testOutcome').style.display = 'none';
    document.getElementById('testButtons').style.display = 'flex';

    const choicesEl = document.getElementById('testChoices');

    if (prompt.type === 'text-input') {
        choicesEl.innerHTML = `<textarea class="modal-input" id="testTextInput" maxlength="${prompt.charLimit||280}" placeholder="Type your answer..."></textarea>`;
    } else if (prompt.type === 'scale') {
        choicesEl.innerHTML = `<div class="modal-scale">
            <div class="modal-scale-labels"><span>${prompt.scaleMinLabel||'1'}</span><span>${prompt.scaleMaxLabel||'10'}</span></div>
            <input type="range" min="1" max="10" value="5" id="testScaleInput" oninput="document.getElementById('scaleVal').textContent=this.value">
            <div class="modal-scale-value" id="scaleVal">5</div></div>`;
    } else if (prompt.type === 'emoji-reaction') {
        choicesEl.innerHTML = `<div class="modal-emojis">${(prompt.emojis||EMOJIS.slice(0,4)).map(e => `<span class="modal-emoji" onclick="selectEmoji(this)">${e}</span>`).join('')}</div>`;
    } else if (prompt.type === 'checkboxes') {
        choicesEl.innerHTML = (prompt.choices||[]).map((c,i) => `<div class="modal-choice"><input type="checkbox" id="cb${i}"><label for="cb${i}">${c}</label></div>`).join('');
    } else {
        choicesEl.innerHTML = (prompt.choices||[]).map((c,i) => `<div class="modal-choice" onclick="selectRadio(${i})"><input type="radio" name="testChoice" id="tc${i}" value="${i}"><label for="tc${i}">${c}</label></div>`).join('');
    }

    document.getElementById('testModal').classList.add('active');
}

function selectRadio(i) {
    document.querySelectorAll('#testChoices input[type="radio"]').forEach((el,idx) => el.checked = idx === i);
}
function selectEmoji(el) {
    document.querySelectorAll('.modal-emoji').forEach(e => e.classList.remove('selected'));
    el.classList.add('selected');
}

function submitTest() {
    if (!currentTestPrompt) return;
    setAnswered(currentTestPrompt.id);
    // Close modal immediately - NO outcome text shown (critical requirement)
    closeTestModal();
    renderPrompts();
}
function skipTest() { closeTestModal(); }
function closeTestModal() {
    document.getElementById('testModal').classList.remove('active');
    document.getElementById('testModalContent').classList.remove('mobile-preview');
    currentTestPrompt = null;
    isPreviewMode = false;
}

// Edit modal
function editPrompt(id) {
    const prompt = allPrompts.find(p => p.id === id);
    if (!prompt) return;
    currentEditId = id;

    let choicesHtml = '';
    if (['multiple-choice','poll','prediction','checkboxes','yes-no'].includes(prompt.type)) {
        choicesHtml = `<div class="form-row"><label>Choices</label><div id="editChoices">
            ${(prompt.choices||[]).map((c,i) => `<div class="choice-row"><input type="text" value="${c}" class="edit-choice"><button type="button" onclick="this.parentElement.remove()">X</button></div>`).join('')}
        </div>${prompt.type!=='yes-no'?'<button type="button" class="add-choice-btn" onclick="addEditChoice()">+ Add</button>':''}</div>`;
    }

    let extraHtml = '';
    if (prompt.type === 'scale') {
        extraHtml = `<div class="form-row scale-labels"><div><label>Min Label</label><input type="text" id="editScaleMin" value="${prompt.scaleMinLabel||''}"></div>
            <div><label>Max Label</label><input type="text" id="editScaleMax" value="${prompt.scaleMaxLabel||''}"></div></div>`;
    } else if (prompt.type === 'emoji-reaction') {
        selectedEmojis = prompt.emojis || [];
        extraHtml = `<div class="form-row"><label>Emojis</label><div class="emoji-grid">${EMOJIS.map(e => `<button type="button" class="emoji-btn ${selectedEmojis.includes(e)?'selected':''}" onclick="toggleEditEmoji(this,'${e}')">${e}</button>`).join('')}</div></div>`;
    }

    document.getElementById('editFormContent').innerHTML = `
        <div class="form-row"><label>Question</label><input type="text" id="editQuestion" value="${prompt.question}"></div>
        <div class="form-row"><label>Chapter</label><input type="number" id="editChapter" value="${prompt.chapter||''}"></div>
        <div class="form-row"><label>Context</label><input type="text" id="editContext" value="${prompt.context||''}"></div>
        <div class="form-row"><label>Trigger Text</label><textarea id="editTrigger">${prompt.triggerText||''}</textarea></div>
        ${choicesHtml}${extraHtml}
        <div class="form-row"><label>Outcome</label><textarea id="editOutcome">${prompt.outcome||''}</textarea></div>`;

    document.getElementById('editModal').classList.add('active');
}

function addEditChoice() {
    const div = document.createElement('div');
    div.className = 'choice-row';
    div.innerHTML = '<input type="text" class="edit-choice"><button type="button" onclick="this.parentElement.remove()">X</button>';
    document.getElementById('editChoices').appendChild(div);
}

function toggleEditEmoji(btn, emoji) {
    const idx = selectedEmojis.indexOf(emoji);
    if (idx > -1) { selectedEmojis.splice(idx,1); btn.classList.remove('selected'); }
    else if (selectedEmojis.length < 8) { selectedEmojis.push(emoji); btn.classList.add('selected'); }
}

function saveEdit() {
    const prompt = allPrompts.find(p => p.id === currentEditId);
    if (!prompt) return;

    prompt.question = document.getElementById('editQuestion').value.trim();
    prompt.chapter = parseInt(document.getElementById('editChapter').value) || null;
    prompt.context = document.getElementById('editContext').value.trim();
    prompt.triggerText = document.getElementById('editTrigger').value.trim();
    prompt.outcome = document.getElementById('editOutcome').value.trim();
    prompt.modified = Date.now();

    if (['multiple-choice','poll','prediction','checkboxes','yes-no'].includes(prompt.type)) {
        prompt.choices = [...document.querySelectorAll('.edit-choice')].map(i => i.value.trim()).filter(v => v);
    }
    if (prompt.type === 'scale') {
        prompt.scaleMinLabel = document.getElementById('editScaleMin').value.trim();
        prompt.scaleMaxLabel = document.getElementById('editScaleMax').value.trim();
    }
    if (prompt.type === 'emoji-reaction') {
        prompt.emojis = [...selectedEmojis];
    }

    savePrompts();
    closeEditModal();
    updateChapterFilter();
    renderPrompts();
}

function closeEditModal() {
    document.getElementById('editModal').classList.remove('active');
    currentEditId = null;
}

function deletePrompt(id) {
    if (!confirm('Delete this prompt?')) return;
    allPrompts = allPrompts.filter(p => p.id !== id);
    savePrompts();
    renderPrompts();
}

function copyCode(id) {
    const code = `<div class="prompt-trigger" data-prompt-id="${id}"></div>`;
    navigator.clipboard.writeText(code).then(() => {
        // Show brief feedback
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '✓ COPIED';
        setTimeout(() => btn.textContent = originalText, 2000);
    });
}

// Bulk operations
function exportAll() {
    const data = JSON.stringify(allPrompts, null, 2);
    const blob = new Blob([data], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'prompts-export.json'; a.click();
    URL.revokeObjectURL(url);
}

function importPrompts() {
    document.getElementById('importFile').click();
}

function handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(ev) {
        try {
            const imported = JSON.parse(ev.target.result);
            if (Array.isArray(imported)) {
                allPrompts = [...allPrompts, ...imported.map(p => ({...p, id: p.id || 'imported-'+Date.now()+Math.random()}))];
                savePrompts();
                updateChapterFilter();
                renderPrompts();
                alert('Imported ' + imported.length + ' prompts');
            }
        } catch(err) { alert('Invalid JSON file'); }
    };
    reader.readAsText(file);
    e.target.value = '';
}

function resetAll() {
    if (!confirm('Reset ALL prompts and test status?')) return;
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(ANSWERED_KEY);
    sessionStorage.removeItem(TRIGGERED_KEY);
    location.reload();
}

// View toggle
let currentView = 'list';
function setView(view) {
    currentView = view;
    document.getElementById('listViewBtn').classList.toggle('active', view === 'list');
    document.getElementById('mapViewBtn').classList.toggle('active', view === 'map');
    document.getElementById('promptsContainer').style.display = view === 'list' ? 'block' : 'none';
    document.getElementById('chapterMap').style.display = view === 'map' ? 'block' : 'none';
    document.querySelector('.filter-bar').style.display = view === 'list' ? 'flex' : 'none';
    document.querySelector('.add-form').style.display = view === 'list' ? 'block' : 'none';
    if (view === 'map') renderChapterMap();
}

// Chapter map
function renderChapterMap() {
    const answered = getAnswered();
    const grid = document.getElementById('chapterMapGrid');
    const summary = document.getElementById('chapterMapSummary');

    // Group prompts by chapter
    const chapterCounts = {};
    allPrompts.forEach(p => {
        const ch = p.chapter || 0;
        if (!chapterCounts[ch]) chapterCounts[ch] = { total: 0, tested: 0 };
        chapterCounts[ch].total++;
        if (answered[p.id]) chapterCounts[ch].tested++;
    });

    let html = '';
    for (let i = 1; i <= 29; i++) {
        const data = chapterCounts[i] || { total: 0, tested: 0 };
        const hasPrompts = data.total > 0;
        const dots = [];
        for (let j = 0; j < data.total; j++) {
            dots.push(j < data.tested ? '<span class="tested">●</span>' : '○');
        }
        html += `<div class="chapter-cell ${hasPrompts ? 'has-prompts' : 'empty'}" onclick="${hasPrompts ? `filterByChapter(${i})` : ''}">
            <div>Ch. ${i}</div>
            <div class="dots">${dots.join(' ') || '-'}</div>
        </div>`;
    }

    // Add unassigned
    const unassigned = chapterCounts[0] || { total: 0, tested: 0 };
    if (unassigned.total > 0) {
        const dots = [];
        for (let j = 0; j < unassigned.total; j++) {
            dots.push(j < unassigned.tested ? '<span class="tested">●</span>' : '○');
        }
        html += `<div class="chapter-cell has-prompts" onclick="filterByChapter(0)">
            <div>Unassigned</div>
            <div class="dots">${dots.join(' ')}</div>
        </div>`;
    }

    grid.innerHTML = html;

    const totalPrompts = allPrompts.length;
    const totalTested = allPrompts.filter(p => answered[p.id]).length;
    const chaptersWithPrompts = Object.keys(chapterCounts).filter(k => k !== '0').length;
    summary.innerHTML = `${totalPrompts} prompts across ${chaptersWithPrompts} chapters | ${totalTested} tested`;
}

function filterByChapter(ch) {
    setView('list');
    document.getElementById('chapterFilter').value = ch === 0 ? '' : ch;
    renderPrompts();
    if (ch === 0) {
        // Scroll to unassigned section
        const unassignedHeader = document.querySelector('.chapter-header');
        if (unassignedHeader && unassignedHeader.textContent.includes('UNASSIGNED')) {
            unassignedHeader.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Duplicate prompt
function duplicatePrompt(id) {
    const prompt = allPrompts.find(p => p.id === id);
    if (!prompt) return;

    const newPrompt = {
        ...prompt,
        id: 'prompt-' + Date.now(),
        created: Date.now(),
        modified: Date.now()
    };

    allPrompts.push(newPrompt);
    savePrompts();
    renderPrompts();

    // Open edit modal for the new prompt
    setTimeout(() => editPrompt(newPrompt.id), 100);
}

// Preview prompt (read-only test)
let isPreviewMode = false;
let previewDevice = 'desktop';

function previewPrompt(id) {
    const prompt = allPrompts.find(p => p.id === id);
    if (!prompt) return;
    isPreviewMode = true;
    previewDevice = 'desktop';
    currentTestPrompt = prompt;

    const modal = document.getElementById('testModalContent');
    modal.className = 'modal ' + (SMALL_TYPES.includes(prompt.type) ? 'small' : 'medium');

    const choicesEl = document.getElementById('testChoices');

    // Add preview header
    let previewHeader = `<div class="preview-badge">PREVIEW MODE</div>
        <div class="preview-toggle">
            <button class="${previewDevice==='desktop'?'active':''}" onclick="setPreviewDevice('desktop')">Desktop</button>
            <button class="${previewDevice==='mobile'?'active':''}" onclick="setPreviewDevice('mobile')">Mobile</button>
        </div>`;

    document.getElementById('testQuestion').innerHTML = previewHeader + prompt.question;
    document.getElementById('testOutcome').style.display = 'none';

    if (prompt.type === 'text-input') {
        choicesEl.innerHTML = `<textarea class="modal-input" disabled placeholder="Type your answer..."></textarea>`;
    } else if (prompt.type === 'scale') {
        choicesEl.innerHTML = `<div class="modal-scale">
            <div class="modal-scale-labels"><span>${prompt.scaleMinLabel||'1'}</span><span>${prompt.scaleMaxLabel||'10'}</span></div>
            <input type="range" min="1" max="10" value="5" disabled>
            <div class="modal-scale-value">5</div></div>`;
    } else if (prompt.type === 'emoji-reaction') {
        choicesEl.innerHTML = `<div class="modal-emojis">${(prompt.emojis||EMOJIS.slice(0,4)).map(e => `<span class="modal-emoji">${e}</span>`).join('')}</div>`;
    } else if (prompt.type === 'checkboxes') {
        choicesEl.innerHTML = (prompt.choices||[]).map((c,i) => `<div class="modal-choice"><input type="checkbox" disabled><label>${c}</label></div>`).join('');
    } else {
        choicesEl.innerHTML = (prompt.choices||[]).map((c,i) => `<div class="modal-choice"><input type="radio" name="testChoice" disabled><label>${c}</label></div>`).join('');
    }

    document.getElementById('testButtons').innerHTML = '<button class="modal-btn submit" onclick="closeTestModal()">CLOSE PREVIEW</button>';
    document.getElementById('testModal').classList.add('active');
}

function setPreviewDevice(device) {
    previewDevice = device;
    const modal = document.getElementById('testModalContent');
    modal.classList.toggle('mobile-preview', device === 'mobile');

    // Update toggle buttons
    document.querySelectorAll('.preview-toggle button').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase() === device);
    });
}

// Event listeners
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeTestModal(); closeEditModal(); }
});
document.getElementById('testModal').addEventListener('click', e => {
    if (e.target.id === 'testModal') closeTestModal();
});
document.getElementById('editModal').addEventListener('click', e => {
    if (e.target.id === 'editModal') closeEditModal();
});

// Initialize
init();
