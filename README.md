# Notepad Cloud

<div align="center">

![Notepad Cloud](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**A modern, distraction-free document and note-taking workspace designed for speed, clarity, and real-time collaboration.**

[Explore Live Demo](https://racing-cerulean-1kz638g.tmp.now) · [Report Bug](https://github.com/SasmithaTharushan/Notepad_/issues) · [Request Feature](https://github.com/SasmithaTharushan/Notepad_/issues)

</div>

---

## Overview

**Notepad Cloud** is a lightweight, responsive document workspace built for capturing thoughts, structuring project tasks, and managing personal notes with zero friction. Built with modern web standards, it bridges intuitive design with powerful document management tools including real-time cloud synchronization, dual layout modes, and instant PDF report generation.

---

## Key Features

### ⚡ Distraction-Free Writing & Live Preview
- **Split Workspace**: Toggle instantly between interactive editing and formatted live preview.
- **Dynamic Metrics**: Real-time word count, character count, and creation timestamps for every document.
- **Custom Color Accents**: Visually organize and highlight documents using color-coded priority palettes.

### 🔄 Real-Time Cloud Synchronization
- **Multi-Device Sync**: Seamlessly synchronized state powered by Firebase Cloud Firestore.
- **Universal Auth**: Secure user registration, password authentication, and one-click Google Sign-In.
- **Guest Explorer Mode**: Instant access with zero barrier to entry for guest evaluation.

### 📋 Versatile Views & Organization
- **Dual Visual Modes**: Seamlessly switch between a modern responsive **Card Grid** and an enterprise **Document Table** view.
- **Smart Filtering & Search**: Instant real-time search across titles and document content with categorized sorting.
- **Priority Pinning**: Keep critical documents and ongoing tasks pinned to the top of your workspace.

### 📄 One-Click PDF Reporting
- **Single Document Export**: Generate formatted, clean PDF documents for printing or distribution.
- **Batch Document Summary**: Compile all filtered workspace documents into an organized multi-page PDF executive summary.

### ⌨️ Power-User Keyboard Shortcuts
| Shortcut | Action |
| :--- | :--- |
| <kbd>Ctrl</kbd> + <kbd>N</kbd> / <kbd>⌘</kbd> + <kbd>N</kbd> | Create New Document |
| <kbd>Ctrl</kbd> + <kbd>K</kbd> / <kbd>⌘</kbd> + <kbd>K</kbd> | Focus Instant Search |
| <kbd>Esc</kbd> | Close Active Modal / Editor |

---

## Tech Stack

- **Frontend Core**: React 18, Vite
- **Styling**: Tailwind CSS, Plus Jakarta Sans typography
- **Cloud Infrastructure**: Firebase Authentication, Cloud Firestore
- **Icons**: Lucide React
- **Document Engine**: jsPDF

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Quick Setup

```bash
# Clone the repository
git clone https://github.com/SasmithaTharushan/Notepad_.git

# Navigate to project directory
cd Notepad_

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## Architecture

```
Notepad_/
├── src/
│   ├── components/       # Modular UI components (Navbar, NoteCard, NoteTable, NoteModal, etc.)
│   ├── utils/            # Document formatting and PDF generation engine
│   ├── firebase.js       # Firebase initialization & cloud listeners
│   ├── App.jsx           # Application state controller
│   ├── main.jsx          # React virtual DOM entry point
│   └── index.css         # Tailwind custom layers and typography
├── legacy-desktop-app/   # Preserved NetBeans Java Swing desktop source
├── index.html            # Single-page application entry point
└── tailwind.config.js    # Design system configuration
```

---

## License

Distributed under the MIT License. See `LICENSE` for more information.
