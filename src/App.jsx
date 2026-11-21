import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StatsBar from './components/StatsBar';
import NoteCard from './components/NoteCard';
import NoteTable from './components/NoteTable';
import NoteModal from './components/NoteModal';
import AuthModal from './components/AuthModal';
import FirebaseConfigModal from './components/FirebaseConfigModal';
import { exportAllNotesPDF } from './utils/pdfExport';
import { 
  auth, 
  db, 
  isFirebaseConfigured, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  googleProvider,
  signInWithPopup,
  updateProfile,
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  onSnapshot 
} from './firebase';
import { Plus, BookOpen, Search, Flame } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('notepad_theme') === 'dark' || 
      (!localStorage.getItem('notepad_theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [isFirebaseModalOpen, setIsFirebaseModalOpen] = useState(false);

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('notepad_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('notepad_theme', 'light');
    }
  }, [darkMode]);

  // Auth Listener
  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || "User",
            isGuest: false
          });
        } else {
          // Check for local guest session
          const guestSession = localStorage.getItem('notepad_guest_user');
          if (guestSession) {
            setUser(JSON.parse(guestSession));
          } else {
            setUser(null);
          }
        }
        setAuthLoading(false);
      });
      return () => unsubscribe();
    } else {
      const guestSession = localStorage.getItem('notepad_guest_user');
      if (guestSession) {
        setUser(JSON.parse(guestSession));
      }
      setAuthLoading(false);
    }
  }, []);

  // Notes Sync (Firestore vs LocalStorage)
  useEffect(() => {
    if (!user) {
      setNotes([]);
      return;
    }

    if (isFirebaseConfigured && db && !user.isGuest) {
      // Live Firestore Sync
      const notesRef = collection(db, 'notes');
      const q = query(notesRef, where('userId', '==', user.uid));
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetched = snapshot.docs.map(d => ({
          id: d.id,
          ...d.data()
        }));
        setNotes(fetched);
      }, (error) => {
        console.error("Firestore snapshot error:", error);
      });

      return () => unsubscribe();
    } else {
      // Local demo storage sync
      const saved = localStorage.getItem(`notepad_notes_${user.uid}`);
      if (saved) {
        try {
          setNotes(JSON.parse(saved));
        } catch (e) {
          setNotes([]);
        }
      } else {
        // Sample starter notes
        const starter = [
          {
            id: 'sample-1',
            title: 'Welcome to Notepad Cloud!',
            category: 'General',
            content: 'This is your modern cloud notepad workspace.\n\nKey features:\n• Create, edit, and organize notes\n• Categorize by Work, Personal, Study, or Ideas\n• Switch between Grid view and classic Table view\n• Export individual or bulk notes to PDF with 1 click\n• Connect your free Firebase account for live sync across devices!',
            date: new Date().toISOString().split('T')[0],
            pinned: true
          },
          {
            id: 'sample-2',
            title: 'Project Roadmap & Tasks',
            category: 'Work',
            content: '1. Finalize application architecture\n2. Configure Firebase Authentication & Firestore\n3. Deploy directly to Vercel or GitHub Pages\n4. Share link with team members',
            date: new Date().toISOString().split('T')[0],
            pinned: false
          }
        ];
        setNotes(starter);
        localStorage.setItem(`notepad_notes_${user.uid}`, JSON.stringify(starter));
      }
    }
  }, [user]);

  // Auth Handlers
  const handleLogin = async (email, password) => {
    if (isFirebaseConfigured && auth) {
      await signInWithEmailAndPassword(auth, email, password);
    } else {
      // Local fallback
      const guestUser = {
        uid: 'user-' + btoa(email).substring(0, 8),
        email,
        displayName: email.split('@')[0],
        isGuest: false
      };
      setUser(guestUser);
      localStorage.setItem('notepad_guest_user', JSON.stringify(guestUser));
    }
  };

  const handleRegister = async (name, email, password) => {
    if (isFirebaseConfigured && auth) {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name });
    } else {
      const guestUser = {
        uid: 'user-' + btoa(email).substring(0, 8),
        email,
        displayName: name,
        isGuest: false
      };
      setUser(guestUser);
      localStorage.setItem('notepad_guest_user', JSON.stringify(guestUser));
    }
  };

  const handleGoogleSignIn = async () => {
    if (isFirebaseConfigured && auth && googleProvider) {
      await signInWithPopup(auth, googleProvider);
    }
  };

  const handleContinueAsGuest = () => {
    const guestUser = {
      uid: 'guest-' + Date.now(),
      email: 'guest@notepad.local',
      displayName: 'Guest Explorer',
      isGuest: true
    };
    setUser(guestUser);
    localStorage.setItem('notepad_guest_user', JSON.stringify(guestUser));
  };

  const handleLogout = async () => {
    if (isFirebaseConfigured && auth && !user?.isGuest) {
      await signOut(auth);
    }
    localStorage.removeItem('notepad_guest_user');
    setUser(null);
  };

  // Note CRUD Handlers
  const handleSaveNote = async (noteData) => {
    if (!user) return;

    if (isFirebaseConfigured && db && !user.isGuest) {
      if (noteData.id) {
        // Update
        const docRef = doc(db, 'notes', noteData.id);
        const { id, ...dataToUpdate } = noteData;
        await updateDoc(docRef, dataToUpdate);
      } else {
        // Add new
        await addDoc(collection(db, 'notes'), {
          ...noteData,
          userId: user.uid,
          createdAt: new Date().toISOString()
        });
      }
    } else {
      // Local storage CRUD
      let updated;
      if (noteData.id) {
        updated = notes.map(n => n.id === noteData.id ? { ...noteData } : n);
      } else {
        const newNote = {
          ...noteData,
          id: 'note-' + Date.now(),
          userId: user.uid,
          createdAt: new Date().toISOString()
        };
        updated = [newNote, ...notes];
      }
      setNotes(updated);
      localStorage.setItem(`notepad_notes_${user.uid}`, JSON.stringify(updated));
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    if (isFirebaseConfigured && db && !user.isGuest) {
      await deleteDoc(doc(db, 'notes', noteId));
    } else {
      const updated = notes.filter(n => n.id !== noteId);
      setNotes(updated);
      localStorage.setItem(`notepad_notes_${user.uid}`, JSON.stringify(updated));
    }
  };

  const handleTogglePin = async (note) => {
    const newPinned = !note.pinned;
    if (isFirebaseConfigured && db && !user.isGuest) {
      await updateDoc(doc(db, 'notes', note.id), { pinned: newPinned });
    } else {
      const updated = notes.map(n => n.id === note.id ? { ...n, pinned: newPinned } : n);
      setNotes(updated);
      localStorage.setItem(`notepad_notes_${user.uid}`, JSON.stringify(updated));
    }
  };

  const handleOpenEdit = (note) => {
    setEditingNote(note);
    setIsNoteModalOpen(true);
  };

  const handleOpenNew = () => {
    setEditingNote(null);
    setIsNoteModalOpen(true);
  };

  // Filter & Sort
  const filteredNotes = notes.filter(note => {
    const matchesSearch = 
      (note.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (note.content || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCat = selectedCategory === 'All' || note.category === selectedCategory;

    return matchesSearch && matchesCat;
  }).sort((a, b) => {
    // Pinned notes always come first
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;

    if (sortBy === 'newest') {
      return (b.date || '').localeCompare(a.date || '') || (b.createdAt || '').localeCompare(a.createdAt || '');
    }
    if (sortBy === 'oldest') {
      return (a.date || '').localeCompare(b.date || '') || (a.createdAt || '').localeCompare(b.createdAt || '');
    }
    if (sortBy === 'title') {
      return (a.title || '').localeCompare(b.title || '');
    }
    return 0;
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs font-semibold text-slate-500">Loading Notepad...</span>
        </div>
      </div>
    );
  }

  // Not logged in -> Show modern auth view
  if (!user) {
    return (
      <AuthModal
        onLogin={handleLogin}
        onRegister={handleRegister}
        onGoogleSignIn={handleGoogleSignIn}
        onContinueAsGuest={handleContinueAsGuest}
        isFirebaseActive={isFirebaseConfigured}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      
      {/* Top Navbar */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        viewMode={viewMode}
        setViewMode={setViewMode}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenNewNote={handleOpenNew}
        onExportAll={() => exportAllNotesPDF(filteredNotes)}
        onOpenFirebaseConfig={() => setIsFirebaseModalOpen(true)}
        onLogout={handleLogout}
        user={user}
        isFirebaseActive={isFirebaseConfigured && !user.isGuest}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Greeting Banner */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Hello, {user.displayName} 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {isFirebaseConfigured && !user.isGuest 
                ? "Your workspace is securely synchronized with Firebase Cloud Firestore." 
                : "You are in Local Demo mode. Connect Firebase anytime to sync across devices."}
            </p>
          </div>

          <button
            onClick={handleOpenNew}
            className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/30 transition transform active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Create Document</span>
          </button>
        </div>

        {/* Stats & Filter Bar */}
        <StatsBar
          notes={notes}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Notes Content */}
        {filteredNotes.length === 0 ? (
          <div className="py-20 text-center rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
              {searchTerm ? "No matching documents found" : "No notes yet"}
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-5">
              {searchTerm 
                ? `No notes match your search "${searchTerm}". Try a different term or clear the filter.` 
                : "Create your first document to capture your thoughts, meetings, or project tasks."}
            </p>
            <button
              onClick={handleOpenNew}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Write a note</span>
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={handleOpenEdit}
                onDelete={handleDeleteNote}
                onTogglePin={handleTogglePin}
              />
            ))}
          </div>
        ) : (
          <NoteTable
            notes={filteredNotes}
            onEdit={handleOpenEdit}
            onDelete={handleDeleteNote}
            onTogglePin={handleTogglePin}
          />
        )}

      </main>

      {/* Note Modal */}
      <NoteModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        onSave={handleSaveNote}
        editingNote={editingNote}
      />

      {/* Firebase Cloud Config Modal */}
      <FirebaseConfigModal
        isOpen={isFirebaseModalOpen}
        onClose={() => setIsFirebaseModalOpen(false)}
        onConfigSaved={() => setIsFirebaseModalOpen(false)}
      />

    </div>
  );
}
