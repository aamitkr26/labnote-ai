# LabNote-AI — MVP Architecture

## 1. What LabNote-AI Is
A mobile-first lab notebook + AI assistant for students and researchers to:
- Write structured lab notes
- Ask AI questions about their own notes
- Export clean, shareable records

This is NOT:
- LIMS
- IoT platform
- Hardware-integrated system
- Collaboration tool

---

## 2. Core Features (MVP Only)

### Must-have
- Lab Notes CRUD (create, edit, delete)
- Markdown-based structured notes
- Fixed lab note template:
  - Title
  - Objective
  - Materials
  - Procedure
  - Observations
  - Results
  - Conclusion
  - Notes / Errors
- Context-aware AI assist (single provider, single model)
- Local-first storage (IndexedDB / LocalStorage)
- Export:
  - PDF
  - Markdown (.md)
  - Plain text (.txt)

### Explicitly NOT in MVP
- Login / signup
- Sync across devices
- Collaboration
- Image upload
- Voice input
- Hardware data ingestion
- Multiple AI providers or models
- Backend database

---

## 3. Page Structure (Mobile-First)

Flat navigation. No deep menus. Thumb-friendly UI.

### Pages / Routes
- Home (/)
  - List of lab notes
  - Search by title
  - Sticky “+ New Note” button

- Editor (/note/:id)
  - Section-based editor
  - Markdown input per section
  - Autosave
  - AI assist button per section

- AI Assist Modal
  - Prompt input
  - Context selector (checkboxes for sections)
  - Single AI response viewer

- Export (/note/:id/export)
  - Format selection
  - Preview
  - Download

- Settings (/settings)
  - AI provider config (single)
  - Model selection
  - API key input (stored locally)
  - Reset local data

---

## 4. Data Schema (Local, JSON-Based)

No server-side database. No relations. No migrations.

### LabNote
```json
{
  "id": "uuid",
  "title": "Magnetic Properties of CoFe Thin Film",
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601",
  "sections": {
    "objective": "string",
    "materials": "string",
    "procedure": "string",
    "observations": "string",
    "results": "string",
    "conclusion": "string",
    "notes": "string"
  },
  "tags": ["XRD", "VSM"],
  "version": 1
}

Settings

{
  "aiProvider": "openrouter",
  "model": "gpt-4o-mini",
  "apiKey": "stored_locally",
  "theme": "light"
}


---

5. Folder Structure (MVP)

Minimal, scalable, and readable.

/app
 ├── pages
 │    ├── index.tsx
 │    ├── note/[id].tsx
 │    ├── export.tsx
 │    └── settings.tsx
 │
 ├── components
 │    ├── NoteCard.tsx
 │    ├── SectionEditor.tsx
 │    ├── AIButton.tsx
 │    └── Modal.tsx
 │
 ├── lib
 │    ├── storage.ts
 │    ├── ai.ts
 │    └── export.ts
 │
 ├── types
 │    └── labnote.ts
 │
 ├── styles
 │    └── globals.css
 │
 └── utils
      └── uuid.ts


---

6. Development Phases (Locked)

Phase 0 — Validation

Finalize lab note template

Lock MVP scope

No scope changes after this phase


Phase 1 — Core Editor

Notes list

Editor

Autosave

Local storage

App must be usable without AI


Phase 2 — AI Integration

Single provider

Single model

Context injection

Manual rate-limit protection


Phase 3 — Export

Markdown export

PDF export

Plain text export

Filename standardization


Phase 4 — Polish & Deploy

Mobile UI fixes

Error handling

Deploy to Vercel / Netlify


---

## ✅ Ab kya karo (no deviation)

1. GitHub repo open karo  
2. `/docs/architecture.md` open karo  
3. **Pura code block paste karo**  
4. Commit message:

docs: add locked MVP architecture

---

### Jab commit ho jaaye, reply me **sirf ye likhna**:
> **architecture.md updated**

Uske baad main **Step-4 (Design via Stitch)** start karwaunga.
