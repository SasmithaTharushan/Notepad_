import React, { useState, useEffect } from 'react';
import { X, Calendar, Tag, Check, Sparkles, Eye, Edit3, Palette } from 'lucide-react';

const CATEGORIES = ["General", "Work", "Personal", "Study", "Ideas"];
const COLORS = [
  { id: 'emerald', name: 'Emerald', dot: 'bg-emerald-500' },
  { id: 'blue', name: 'Blue', dot: 'bg-blue-500' },
  { id: 'purple', name: 'Purple', dot: 'bg-purple-500' },
  { id: 'amber', name: 'Amber', dot: 'bg-amber-500' },
  { id: 'rose', name: 'Rose', dot: 'bg-rose-500' },
];

export default function NoteModal({ isOpen, onClose, onSave, editingNote }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [color, setColor] = useState('emerald');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [pinned, setPinned] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title || '');
      setContent(editingNote.content || '');
      setCategory(editingNote.category || 'General');
      setColor(editingNote.color || 'emerald');
      setDate(editingNote.date || new Date().toISOString().split('T')[0]);
      setPinned(editingNote.pinned || false);
    } else {
      setTitle('');
      setContent('');
      setCategory('General');
      setColor('emerald');
      setDate(new Date().toISOString().split('T')[0]);
      setPinned(false);
    }
    setPreviewMode(false);
  }, [editingNote, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;

    onSave({
      id: editingNote ? editingNote.id : null,
      title: title.trim() || 'Untitled Note',
      content: content.trim(),
      category,
      color,
      date,
      pinned
    });
    onClose();
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-all flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
                {editingNote ? 'Edit Document' : 'Create New Document'}
              </h2>
              <p className="text-[11px] text-slate-400">
                {wordCount} words · {charCount} characters
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tab: Edit vs Preview */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setPreviewMode(false)}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg transition ${
                  !previewMode
                    ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Write</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewMode(true)}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg transition ${
                  previewMode
                    ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          
          {/* Note Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Document Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Project Plan, Meeting Minutes, Research Ideas..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500 font-semibold text-sm transition"
            />
          </div>

          {/* Meta Fields: Category & Date & Color Theme */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500 text-xs transition cursor-pointer"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500 text-xs transition cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Accent Color
              </label>
              <div className="flex items-center gap-2 pt-1">
                {COLORS.map(c => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setColor(c.id)}
                    className={`w-6 h-6 rounded-full ${c.dot} transition-transform ${
                      color === c.id ? 'ring-2 ring-offset-2 ring-slate-800 dark:ring-white scale-110' : 'opacity-70 hover:opacity-100'
                    }`}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Content Area or Preview Mode */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Content / Details
            </label>
            
            {previewMode ? (
              <div className="w-full min-h-[220px] p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-sm whitespace-pre-wrap leading-relaxed">
                {content || <span className="text-slate-400 italic">No content to preview...</span>}
              </div>
            ) : (
              <textarea
                rows={9}
                placeholder="Write or paste your notes here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500 text-sm leading-relaxed transition resize-none font-normal"
              />
            )}
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={pinned}
                onChange={(e) => setPinned(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
              />
              <span>Pin note to top</span>
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-xs shadow-md shadow-emerald-600/30 transition transform active:scale-95"
              >
                <Check className="w-4 h-4" />
                <span>{editingNote ? 'Save Changes' : 'Create Note'}</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
