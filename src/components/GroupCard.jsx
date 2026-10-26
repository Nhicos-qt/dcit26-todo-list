import { ArrowRight, CheckCircle2, CircleDashed, FolderKanban, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GroupCard({ group, stats, onDelete }) {
  return (
    <div className="card flex h-full flex-col justify-between p-5">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <FolderKanban className="h-5 w-5" />
          </div>
          <button
            type="button"
            onClick={onDelete}
            className="text-slate-400 transition hover:text-red-500"
            aria-label={`Delete ${group.name}`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <h3 className="text-lg font-semibold text-slate-900">{group.name}</h3>
        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
          <span className="badge bg-slate-100 text-slate-700">{stats.total} Tasks</span>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1 text-emerald-600">
            <CheckCircle2 className="h-4 w-4" />
            Completed
          </span>
          <strong>{stats.completed}</strong>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1 text-amber-600">
            <CircleDashed className="h-4 w-4" />
            Pending
          </span>
          <strong>{stats.pending}</strong>
        </div>
      </div>

      <Link
        to={`/groups/${group.id}`}
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-50 px-3 py-2 text-sm font-medium text-brand-700 transition hover:bg-brand-100"
      >
        Open Group
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
