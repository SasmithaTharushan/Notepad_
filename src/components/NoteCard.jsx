import React from 'react';
import { Pin, Edit2, Trash2, FileDown, Calendar, Tag } from 'lucide-react';
import { exportSingleNotePDF } from '../utils/pdfExport';

export default function NoteCard({ note, onEdit, onDelete, onTogglePin }) {
  const categoryColors = {
    Work: "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-900",
    Personal: "bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-900",
    Study: "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-900",
    Ideas: "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-900",
    General: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900",
  };

  const badgeClass = categoryColors[note.category] || categoryColors.General;

  return (
    <div className={`group relative flex flex-col justify-between rounded-2xl p-5 transition-all duration-200 border ${
      note.pinned
        ? 'bg-gradient-to-b from-amber-500/[0.04] to-transparent bg-white dark:bg-slate-900 border-amber-300/80 dark:border-amber-700/80 shadow-md shadow-amber-500/5'
        : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600/80 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-black/40'
    }`}>
      
      {/* Card Header */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${badgeClass}`}>
            {note.category || 'General'}
          </span>

          <button
            onClick={() => onTogglePin(note)}
            className={`p-1.5 rounded-lg transition ${
              note.pinned
                ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/50'
                : 'text-slate-300 dark:text-slate-600 hover:text-amber-500 dark:hover:text-amber-400 opacity-60 group-hover:opacity-100'
            }`}
            title={note.pinned ? "Unpin note" : "Pin note to top"}
          >
            <Pin className={`w-4 h-4 ${note.pinned ? 'fill-amber-500 rotate-12' : ''}`} />
          </button>
        </div>

        {/* Note Title */}
        <h3 className="font-bold text-base text-slate-800 dark:text-slate-100 line-clamp-2 mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {note.title || "Untitled Document"}
        </h3>

        {/* Note Content Preview */}
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-5 whitespace-pre-wrap leading-relaxed">
          {note.content || "Empty note content..."}
        </p>
      </div>

      {/* Card Footer */}
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
          <Calendar className="w-3.5 h-3.5" />
          <span>{note.date || "Today"}</span>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => exportSingleNotePDF(note)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition"
            title="Download PDF document"
          >
            <FileDown className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onEdit(note)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition"
            title="Edit note"
          >
            <Edit2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => onDelete(note.id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
            title="Delete note"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
