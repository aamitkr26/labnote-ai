// Data Management
let notes = JSON.parse(localStorage.getItem('labNotes')) || [];
let currentNoteId = null;

// DOM Elements
const listView = document.getElementById('note-list-view');
const editorView = document.getElementById('editor-view');
const notesList = document.getElementById('notes-list');
const newNoteBtn = document.getElementById('new-note-btn');
const backBtn = document.getElementById('back-btn');
const deleteBtn = document.getElementById('delete-btn');

// Input Map
const inputs = {
    title: document.getElementById('note-title'),
    objective: document.getElementById('note-objective'),
    materials: document.getElementById('note-materials'),
    procedure: document.getElementById('note-procedure'),
    observations: document.getElementById('note-observations'),
    results: document.getElementById('note-results'),
    conclusion: document.getElementById('note-conclusion'),
    notes: document.getElementById('note-notes')
};

// Initialize App
function init() {
    renderNotes();
}

// Save notes to LocalStorage
function saveToStorage() {
    localStorage.setItem('labNotes', JSON.stringify(notes));
}

// Render the list of notes
function renderNotes() {
    notesList.innerHTML = '';

    if (notes.length === 0) {
        notesList.innerHTML = '<div class="empty-state">No notes yet. Create one to get started.</div>';
        return;
    }

    // Sort by updated date descending
    const sortedNotes = [...notes].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    sortedNotes.forEach(note => {
        const noteCard = document.createElement('div');
        noteCard.className = 'note-card';
        noteCard.onclick = () => openEditor(note.id);

        const date = new Date(note.updatedAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        noteCard.innerHTML = `
            <h3>${escapeHtml(note.title) || 'Untitled Note'}</h3>
            <div class="date">Last updated: ${date}</div>
        `;
        notesList.appendChild(noteCard);
    });
}

// Create a new note
function createNote() {
    const newNote = {
        id: Date.now().toString(),
        updatedAt: new Date().toISOString(),
        title: '',
        objective: '',
        materials: '',
        procedure: '',
        observations: '',
        results: '',
        conclusion: '',
        notes: ''
    };
    notes.push(newNote);
    saveToStorage();
    openEditor(newNote.id);
}

// Open the editor for a specific note
function openEditor(id) {
    currentNoteId = id;
    const note = notes.find(n => n.id === id);
    if (!note) return;

    // Populate fields
    Object.keys(inputs).forEach(key => {
        if (inputs[key]) {
            inputs[key].value = note[key] || '';
        }
    });

    // Switch views
    listView.classList.remove('active');
    listView.classList.add('hidden');
    editorView.classList.remove('hidden');
    editorView.classList.add('active');
}

// Close the editor and return to list
function closeEditor() {
    currentNoteId = null;
    listView.classList.remove('hidden');
    listView.classList.add('active');
    editorView.classList.remove('active');
    editorView.classList.add('hidden');
    renderNotes();
}

// Update the currently open note (Autosave)
function updateCurrentNote() {
    if (!currentNoteId) return;

    const noteIndex = notes.findIndex(n => n.id === currentNoteId);
    if (noteIndex === -1) return;

    const updatedNote = { ...notes[noteIndex] };
    updatedNote.updatedAt = new Date().toISOString();

    Object.keys(inputs).forEach(key => {
        if (inputs[key]) {
            updatedNote[key] = inputs[key].value;
        }
    });

    notes[noteIndex] = updatedNote;
    saveToStorage();
}

// Delete the current note
function deleteCurrentNote() {
    if (!currentNoteId) return;

    if (confirm('Are you sure you want to delete this note? This action cannot be undone.')) {
        notes = notes.filter(n => n.id !== currentNoteId);
        saveToStorage();
        closeEditor();
    }
}

// Utility: Escape HTML to prevent XSS
function escapeHtml(text) {
    if (!text) return '';
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Event Listeners
newNoteBtn.addEventListener('click', createNote);
backBtn.addEventListener('click', closeEditor);
deleteBtn.addEventListener('click', deleteCurrentNote);

// Attach autosave listener to all inputs
Object.values(inputs).forEach(input => {
    if (input) {
        input.addEventListener('input', updateCurrentNote);
    }
});

// Initialize
init();
