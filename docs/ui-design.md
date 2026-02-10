# LabNote-AI — UI Design Specification

## Design Principles
- Mobile-first
- Minimal and clean
- Technical, lab-oriented
- Thumb-friendly interactions
- No visual clutter

Core workflow:
Write → Think → Export

---
Design a mobile-first web UI for a lab notebook application called "LabNote-AI".

Target users:

Electronics students

Research students

Lab work users

Core workflow:

Write → Think → Export

Pages required:

Home
List of lab notes (title + last updated date)

Search by title

Sticky “+ New Note” button at the bottom

Editor
Section-based editor with these sections:

Objective

Materials

Procedure

Observations

Results

Conclusion

Notes / Errors

Each section editable independently

Markdown-style text input

Autosave indicator

AI Assist button per section

AI Assist Modal
Prompt input field

Context selector (checkboxes for sections)

Single AI response viewer

Close / apply response actions

Export
Choose format: PDF / Markdown / Text

Preview before download

Style requirements:

Minimal

Clean

Technical

Light background

No flashy colors

Designed for thumb use

Output requirements:

Describe each page layout clearly

List UI components per page

No code

No CSS


The mobile-first web UI for LabNote-AI has been designed with a focus on utility, technical clarity, and thumb-friendly navigation:

Home Dashboard: Features a clean list of lab notes with search functionality and a prominent "New Note" action button for quick access.
Lab Editor: A structured, section-based writing environment with markdown support and dedicated AI Assist triggers for each scientific component.
AI Assist Modal: A focused overlay designed to gather context from your notes and generate intelligent suggestions or summaries.
Export Options: A streamlined interface to preview your work and export it into professional PDF, Markdown, or Text formats.

## 1. Home / Dashboard

Purpose:
Provide quick access to existing lab notes and creation of new notes.

Layout:
- Header with app name
- Search bar (title-based search)
- List of lab notes
  - Note title
  - Last updated timestamp
- Sticky “+ New Note” button at bottom-right

Behavior:
- Tapping a note opens the Editor
- “+ New Note” creates a blank lab note

---

## 2. Lab Note Editor

Purpose:
Primary workspace for writing and editing lab notes.

Layout:
- Section-based vertical layout
- Each section collapsible/expandable

Sections:
- Objective
- Materials
- Procedure
- Observations
- Results
- Conclusion
- Notes / Errors

Components per section:
- Section header
- Markdown-style text input
- Autosave indicator
- AI Assist button

Behavior:
- Autosave on every input
- Smooth scrolling between sections
- Editor usable without AI

---

## 3. AI Assist Modal

Purpose:
Provide contextual AI assistance for improving lab notes.

Layout:
- Modal overlay
- Prompt input field
- Context selector (checkboxes for sections)
- Single AI response display area

Behavior:
- User selects which sections are shared as context
- AI generates a single response
- User can discard or apply response to the section

---

## 4. Export View

Purpose:
Allow users to export lab notes in common formats.

Layout:
- Format selection:
  - PDF
  - Markdown
  - Plain Text
- Live preview panel
- Download button

Behavior:
- Preview updates with selected format
- File name standardized using note title and date

---

## UI Scope Constraints
- No collaboration UI
- No image upload UI
- No authentication UI
- No sync indicators
- No advanced settings UI
