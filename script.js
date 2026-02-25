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

// -------- AI ASSIST --------
const aiModal = document.getElementById('ai-modal');
const aiPrompt = document.getElementById('ai-prompt');
const aiGenerateBtn = document.getElementById('ai-generate-btn');
const aiApplyBtn = document.getElementById('ai-apply-btn');
const aiCloseBtn = aiModal.querySelector('.secondary-btn');
const aiContextCheckboxes = aiModal.querySelectorAll('input[type="checkbox"]');

let currentAISection = null;

// Open AI Modal
function openAIModal(section) {
    currentAISection = section;
    aiModal.style.display = 'block';
    aiPrompt.value = ''; // Clear previous prompt/response
    aiContextCheckboxes.forEach(cb => cb.checked = false); // Reset checkboxes
    aiGenerateBtn.disabled = false;
    aiGenerateBtn.textContent = 'Generate';
}

// Close AI Modal
function closeAIModal() {
    aiModal.style.display = 'none';
    currentAISection = null;
    aiPrompt.value = '';
}

// Attach event listeners to AI buttons
document.querySelectorAll('.ai-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const section = e.target.getAttribute('data-section');
        openAIModal(section);
    });
});

// Override close button behavior
aiCloseBtn.onclick = (e) => {
    e.preventDefault();
    closeAIModal();
};

// Generate Response
aiGenerateBtn.addEventListener('click', async () => {
    const promptText = aiPrompt.value.trim();
    if (!promptText) {
        alert('Please enter a prompt.');
        return;
    }

    const apiKey = localStorage.getItem('openrouter_api_key');
    if (!apiKey) {
        alert('Please add your OpenRouter API key in Settings.');
        return;
    }

    // Build Context
    let contextText = '';
    aiContextCheckboxes.forEach(cb => {
        if (cb.checked) {
            const sectionName = cb.value; // e.g., 'objective'
            const sectionContent = inputs[sectionName] ? inputs[sectionName].value : '';
            if (sectionContent) {
                contextText += `${sectionName.toUpperCase()}:\n${sectionContent}\n\n`;
            }
        }
    });

    // Build Full Prompt
    const fullPrompt = `You are a lab assistant.
Task: ${promptText}

Context:
${contextText}`;

    // Show Loading State
    aiGenerateBtn.disabled = true;
    aiGenerateBtn.textContent = 'Generating...';

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [{ role: 'user', content: fullPrompt }]
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        const aiText = data.choices[0].message.content;

        // Display Response
        aiPrompt.value = aiText;

    } catch (error) {
        console.error(error);
        alert('Failed to generate response: ' + error.message);
    } finally {
        aiGenerateBtn.disabled = false;
        aiGenerateBtn.textContent = 'Generate';
    }
});

// Apply Response
aiApplyBtn.addEventListener('click', () => {
    if (!currentAISection || !inputs[currentAISection]) return;

    const responseText = aiPrompt.value;
    if (!responseText) return;

    // Append to existing content (with a newline if not empty)
    const currentContent = inputs[currentAISection].value;
    inputs[currentAISection].value = currentContent
        ? currentContent + '\n' + responseText
        : responseText;

    // Trigger input event to autosave
    inputs[currentAISection].dispatchEvent(new Event('input'));

    closeAIModal();
});


// -------- SETTINGS --------
const settingsView = document.getElementById('settings-view');
const settingsBtn = document.getElementById('settings-btn');
const settingsBackBtn = document.getElementById('settings-back-btn');
const apiKeyInput = document.getElementById('api-key-input');
const saveApiKeyBtn = document.getElementById('save-api-key-btn');
const clearApiKeyBtn = document.getElementById('clear-api-key-btn');

// Open Settings
function openSettings() {
    listView.classList.remove('active');
    listView.classList.add('hidden');
    editorView.classList.remove('active');
    editorView.classList.add('hidden');

    settingsView.classList.remove('hidden');
    settingsView.classList.add('active');

    // Load existing key
    const existingKey = localStorage.getItem('openrouter_api_key');
    if (existingKey) {
        apiKeyInput.value = existingKey;
    } else {
        apiKeyInput.value = '';
    }
}

// Close Settings (Return to List)
function closeSettings() {
    settingsView.classList.remove('active');
    settingsView.classList.add('hidden');

    // Default return to list view
    listView.classList.remove('hidden');
    listView.classList.add('active');

    // If we were editing a note, we could return there, but for simplicity
    // we return to the list. The user can just click the note again.
    currentNoteId = null;
}

// Save API Key
function saveApiKey() {
    const key = apiKeyInput.value.trim();
    if (key) {
        localStorage.setItem('openrouter_api_key', key);
        alert('API key saved.');
    } else {
        alert('Please enter an API key.');
    }
}

// Clear API Key
function clearApiKey() {
    localStorage.removeItem('openrouter_api_key');
    apiKeyInput.value = '';
    alert('API key removed.');
}

// Event Listeners for Settings
settingsBtn.addEventListener('click', openSettings);
settingsBackBtn.addEventListener('click', closeSettings);
saveApiKeyBtn.addEventListener('click', saveApiKey);
clearApiKeyBtn.addEventListener('click', clearApiKey);


// -------- EXPORT MARKDOWN --------
document.getElementById("export-md-btn").onclick = () => {
  if (!currentNoteId) return;

  const note = notes.find(n => n.id === currentNoteId);
  if (!note) return;

  let md = `# ${note.title}\n\n`;

  md += `## Objective\n${note.objective || ""}\n\n`;
  md += `## Materials\n${note.materials || ""}\n\n`;
  md += `## Procedure\n${note.procedure || ""}\n\n`;
  md += `## Observations\n${note.observations || ""}\n\n`;
  md += `## Results\n${note.results || ""}\n\n`;
  md += `## Conclusion\n${note.conclusion || ""}\n\n`;
  md += `## Notes / Errors\n${note.notes || ""}\n\n`;

  const blob = new Blob([md], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  const safeTitle = note.title ? note.title.replace(/\s+/g, "_") : "lab_note";
a.download = `${safeTitle}.md`;
  a.click();

  URL.revokeObjectURL(url);
};

// -------- EXPORT PDF --------
document.getElementById("export-pdf-btn").onclick = () => {
  window.print();
};
