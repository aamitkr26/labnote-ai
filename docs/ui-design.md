# LabNote-AI — UI Design Specification

## Design Principles
- Mobile-first
- Minimal and clean
- Technical, lab-oriented
- Thumb-friendly interactions
- No visual clutter

Core workflow:
Write → Think → Export

Target users:
- Electronics students
- Research students
- Lab work users

---

## Overall UI Concept

The LabNote-AI interface is designed to prioritize clarity, focus, and speed for laboratory work.

The UI emphasizes:
- Structured writing over free-form clutter
- Clear separation of thinking (AI assist) and writing
- Simple navigation with no deep menus
- Usability without AI as a hard dependency

---

## 1. Home / Dashboard

### Purpose
Provide quick access to existing lab notes and creation of new notes.

### Layout
- Header with application name
- Search bar (title-based search)
- List of lab notes
  - Note title
  - Last updated timestamp
- Sticky “+ New Note” button at bottom-right

### Behavior
- Tapping a note opens the Lab Note Editor
- “+ New Note” creates a blank lab note

---

## 2. Lab Note Editor

### Purpose
Primary workspace for writing and editing lab notes.

### Layout
- Vertical, section-based layout
- Each section can be expanded or collapsed
- Smooth scrolling between sections

### Sections
- Objective
- Materials
- Procedure
- Observations
- Results
- Conclusion
- Notes / Errors

### Components per Section
- Section header
- Markdown-style text input area
- Autosave indicator
- AI Assist button

### Behavior
- Autosave triggered on every input
- Editor remains fully usable without AI
- No interruptions during writing flow

---

## 3. AI Assist Modal

### Purpose
Provide contextual AI assistance without disrupting the writing workflow.

### Layout
- Modal overlay above the editor
- Prompt input field
- Context selector (checkboxes for sections)
- Single AI response display area

### Behavior
- User selects which sections are shared as context
- AI generates a single focused response
- User can:
  - Apply response to the section
  - Discard response

---

## 4. Export View

### Purpose
Allow users to export lab notes in standard academic formats.

### Layout
- Export format selection:
  - PDF
  - Markdown
  - Plain Text
- Live preview panel
- Download action button

### Behavior
- Preview updates when format changes
- File name standardized using:
  - Lab note title
  - Date of creation or last update

---

## UI Scope Constraints

The following are explicitly out of scope for the UI:
- Collaboration or sharing interfaces
- Image upload or media handling
- Authentication or user accounts
- Sync indicators or cloud status
- Advanced customization settings
