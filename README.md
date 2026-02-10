# LabNote-AI

## Project Overview
LabNote-AI is a minimalist, browser-based electronic lab notebook (ELN) designed for researchers, students, and engineers. It solves the problem of organizing experiment data without the complexity or cost of enterprise LIMS or cloud-dependent platforms.

The application prioritizes data ownership and offline accessibility, allowing users to document experiments, gather observations, and generate structured reports directly from their browser.

## Key Features
- **Offline-First:** All data is stored locally in the browser (LocalStorage), ensuring notes are accessible without an internet connection.
- **Structured Documentation:** Pre-defined sections for Objectives, Materials, Procedure, Observations, Results, Conclusions, and Notes.
- **AI Assistance:** Context-aware AI modal (powered by OpenRouter/GPT-4o-mini) helps draft or summarize specific sections. Users control exactly what context is sent to the AI.
- **Autosave:** Real-time saving prevents data loss during experiments.
- **Export Options:** One-click export to Markdown for documentation or PDF for printing/archiving.
- **Privacy-Centric:** API keys are stored locally and are never sent to a backend server.

## Tech Stack
- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Storage:** Browser LocalStorage API
- **AI Integration:** OpenRouter API (gpt-4o-mini)
- **Zero Dependencies:** No build steps, frameworks, or external libraries required.

## Architecture Highlights
- **Serverless Design:** The application runs entirely client-side. There is no backend database or authentication server.
- **Local-First Data:** User data remains on the device, reducing latency and eliminating cloud vendor lock-in.
- **Scoped AI Context:** AI interactions are scoped to specific sections. The user explicitly selects which parts of their note to include as context for the prompt.
- **User-Managed Keys:** Users provide their own OpenRouter API key, which is stored securely in the browser's local storage and used only for direct API calls.

## How to Run
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/labnote-ai.git
   ```
2. **Open the application:**
   - Navigate to the project folder.
   - Open `index.html` in any modern web browser.

Alternatively, the project can be hosted on any static file server (e.g., GitHub Pages) without configuration.

## Screenshots

*(Placeholder: Home View)*
![Home View](docs/screenshots/home_placeholder.png)

*(Placeholder: Note Editor)*
![Note Editor](docs/screenshots/editor_placeholder.png)

*(Placeholder: AI Assistant Modal)*
![AI Assistant](docs/screenshots/ai_modal_placeholder.png)
