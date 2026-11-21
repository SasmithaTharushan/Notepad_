import React, { useState, useEffect } from 'react';
import { X, Flame, Check, HelpCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { getStoredFirebaseConfig } from '../firebase';

export default function FirebaseConfigModal({ isOpen, onClose, onConfigSaved }) {
  const [config, setConfig] = useState({
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: ''
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setConfig(getStoredFirebaseConfig());
      setSavedSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value.trim() }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('notepad_custom_firebase_config', JSON.stringify(config));
    setSavedSuccess(true);
    setTimeout(() => {
      onConfigSaved();
      onClose();
      window.location.reload(); // Reload to re-initialize Firebase
    }, 900);
  };

  const handleResetToDemo = () => {
    localStorage.removeItem('notepad_custom_firebase_config');
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
                Firebase Cloud Configuration
              </h2>
              <p className="text-xs text-slate-400">
                Connect your free Firebase project for real-time cloud sync
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed">
            <div className="font-bold flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>How it works:</span>
            </div>
            You can either enter your Firebase keys here or define them as environment variables (<code>.env</code> locally, or in <strong>Vercel Settings &gt; Environment Variables</strong>).
          </div>

          <form onSubmit={handleSave} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                API Key (VITE_FIREBASE_API_KEY)
              </label>
              <input
                type="text"
                name="apiKey"
                value={config.apiKey}
                onChange={handleChange}
                placeholder="AIzaSy..."
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Project ID (VITE_FIREBASE_PROJECT_ID)
              </label>
              <input
                type="text"
                name="projectId"
                value={config.projectId}
                onChange={handleChange}
                placeholder="my-notepad-project"
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Auth Domain (VITE_FIREBASE_AUTH_DOMAIN)
              </label>
              <input
                type="text"
                name="authDomain"
                value={config.authDomain}
                onChange={handleChange}
                placeholder="my-notepad-project.firebaseapp.com"
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                App ID (VITE_FIREBASE_APP_ID)
              </label>
              <input
                type="text"
                name="appId"
                value={config.appId}
                onChange={handleChange}
                placeholder="1:123456789:web:abcdef"
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={handleResetToDemo}
                className="text-xs text-rose-500 hover:underline"
              >
                Reset to Offline Demo Mode
              </button>

              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-md shadow-emerald-600/30 transition"
              >
                {savedSuccess ? <Check className="w-4 h-4" /> : <Flame className="w-4 h-4" />}
                <span>{savedSuccess ? "Saved! Reloading..." : "Save & Connect"}</span>
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
}
