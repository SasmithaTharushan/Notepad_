import React from 'react';
import { FileText, Pin, Tag, Calendar, Sparkles } from 'lucide-react';

const CATEGORIES = ["All", "General", "Work", "Personal", "Study", "Ideas"];

export default function StatsBar({
  notes,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy
}) {
  const totalNotes = notes.length;
  const pinnedCount = notes.filter(n => n.pinned).length;

  return (
    <div className="mb-8 space-y-4">
      {/* Top Welcome / Metric Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Documents</span>
            <div className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">{totalNotes}</div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Pinned & Priority</span>
            <div className="text-2xl font-extrabold text-amber-500">{pinnedCount}</div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-500">
            <Pin className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Cloud Status</span>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Synced
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-teal-50 dark:bg-teal-950/50 flex items-center justify-center text-teal-600 dark:text-teal-400">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Category Pills & Sorting Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        {/* Categories */}
        <div className="flex flex-wrap items-center gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30 font-semibold'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-700 dark:text-slate-300 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="newest">Sort: Newest First</option>
            <option value="oldest">Sort: Oldest First</option>
            <option value="title">Sort: Title (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
