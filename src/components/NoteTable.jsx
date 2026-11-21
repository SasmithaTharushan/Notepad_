import React from 'react';
import { Pin, Edit2, Trash2, FileDown, Calendar } from 'lucide-react';
import { exportSingleNotePDF } from '../utils/pdfExport';

export default function NoteTable({ notes, onEdit, onDelete, onTogglePin }) {
  if (notes.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-[11px] tracking-wider border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th scope="col" className="px-5 py-3.5 font-semibold w-12 text-center">Pin</th>
              <th scope="col" className="px-5 py-3.5 font-semibold">Doc Title</th>
              <th scope="col" className="px-5 py-3.5 font-semibold hidden md:table-cell">Category</th>
              <th scope="col" className="px-5 py-3.5 font-semibold">Content Summary</th>
              <th scope="col" className="px-5 py-3.5 font-semibold whitespace-nowrap">Created Date</th>
              <th scope="col" className="px-5 py-3.5 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {notes.map((note) => (
              <tr 
                key={note.id}
                className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group cursor-pointer"
                onClick={() => onEdit(note)}
              >
                <td className="px-5 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => onTogglePin(note)}
                    className={`p-1 rounded ${note.pinned ? 'text-amber-500' : 'text-slate-300 dark:text-slate-600 hover:text-amber-500'}`}
                  >
                    <Pin className={`w-3.5 h-3.5 ${note.pinned ? 'fill-amber-500' : ''}`} />
                  </button>
                </td>

                <td className="px-5 py-4 font-semibold text-slate-800 dark:text-slate-100 whitespace-nowrap max-w-[200px] truncate">
                  {note.title || "Untitled Document"}
                </td>

                <td className="px-5 py-4 hidden md:table-cell whitespace-nowrap">
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {note.category || "General"}
                  </span>
                </td>

                <td className="px-5 py-4 text-slate-500 dark:text-slate-400 max-w-[320px] truncate">
                  {note.content || "Empty note content..."}
                </td>

                <td className="px-5 py-4 text-slate-500 dark:text-slate-400 whitespace-nowrap text-xs">
                  {note.date || "Today"}
                </td>

                <td className="px-5 py-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => exportSingleNotePDF(note)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition"
                      title="Download PDF document"
                    >
                      <FileDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onEdit(note)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition"
                      title="Edit note"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDelete(note.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                      title="Delete note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
