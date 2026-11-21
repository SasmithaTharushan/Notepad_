# 📝 Notepad Cloud — Modern React & Firebase Notes Workspace

A modern, cloud-synchronized notepad web application built with **React**, **Vite**, **Tailwind CSS**, and **Firebase (Auth & Firestore)**.

Converted and modernized from the original Java Swing desktop project. Ready to deploy directly to **Vercel** or **GitHub Pages** with zero hassle.

---

## ✨ Features

- 🔐 **Authentication**: Firebase Email/Password, Google Sign-In, and Instant Guest/Demo mode.
- ⚡ **Real-time Cloud Sync**: Real-time updates across multiple tabs and devices via Firebase Firestore.
- 🎨 **Modern Aesthetics**:
  - Dark Mode and Light Mode support with smooth persistence.
  - Responsive layout (mobile, tablet, desktop).
  - Modern cards view & classic table view (matching the original NetBeans `ContentTable`).
- 📂 **Organization**:
  - Categorization (`General`, `Work`, `Personal`, `Study`, `Ideas`).
  - Pinning important notes to the top.
  - Instant live search by title or content.
  - Sort by newest, oldest, or alphabetical.
- 📄 **PDF Reporting (Replaces JasperReports)**:
  - Export individual notes to PDF.
  - Export all filtered notes into a single formatted PDF report with 1 click.
- 💻 **Offline & Local Demo Fallback**: Works seamlessly right out of the box even before configuring Firebase keys.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Clone repository
git clone https://github.com/SasmithaTharushan/Notepad_.git
cd Notepad_

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔥 Setting Up Firebase (Optional for Cloud Sync)

1. Go to the [Firebase Console](https://console.firebase.google.com/) and click **Create a project**.
2. Under **Build**, enable **Authentication**:
   - Turn on **Email/Password** and (optionally) **Google** sign-in providers.
3. Under **Build**, enable **Firestore Database**:
   - Create database in **Production mode** (or test mode).
   - In the **Rules** tab, set:
     ```javascript
     rules_version = '2';
     service cloud.firestore {
       match /databases/{database}/documents {
         match /notes/{noteId} {
           allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
           allow create: if request.auth != null;
         }
       }
     }
     ```
4. In **Project Settings** > **General** > **Your apps**, click the **Web (`</>`)** icon to register a web app and copy the credentials.
5. Create a `.env` file in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```
*(Alternatively, you can click the **Firebase** button directly inside the running web app to enter your config without touching any files!)*

---

## 🌐 Deployment

### 1. Deploy to Vercel (Recommended)
1. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
2. Import your GitHub repository `Notepad_`.
3. In **Environment Variables**, paste the keys from `.env.example` (your Firebase config).
4. Click **Deploy**. Vercel will build and give you a live production URL (e.g. `https://notepad-cloud.vercel.app`).

### 2. Deploy to GitHub Pages
This repository includes a preconfigured GitHub Actions workflow (`.github/workflows/deploy.yml`):
1. In your GitHub repository, go to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Push to `main`:
   ```bash
   git add .
   git commit -m "Transform project to modern React web app"
   git push origin main
   ```
4. GitHub Actions will automatically build and publish your site!

---

## 📁 Repository Structure

```
Notepad_/
├── .github/workflows/deploy.yml   # Automatic GitHub Pages deployment
├── src/
│   ├── components/                # UI components (Navbar, NoteCard, NoteTable, AuthModal, etc.)
│   ├── utils/                     # PDF Export generator
│   ├── firebase.js                # Firebase Auth & Firestore client
│   ├── App.jsx                    # Core application logic
│   ├── main.jsx                   # React entrypoint
│   └── index.css                  # Tailwind styles
├── legacy-desktop-app/            # Original NetBeans Java Swing desktop application
├── index.html                     # Web entrypoint
├── tailwind.config.js
├── vite.config.js
├── vercel.json
└── package.json
```
