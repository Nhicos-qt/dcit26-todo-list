import { Check, Circle, Trash2 } from 'lucide-react';

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggle}
          className={`flex h-6 w-6 items-center justify-center rounded-full border transition ${
            task.completed
              ? 'border-emerald-500 bg-emerald-500 text-white'
              : 'border-slate-300 bg-white text-slate-500 hover:border-brand-400 hover:text-brand-500'
          }`}
          aria-label={task.completed ? 'Mark as not done' : 'Mark as done'}
        >
          {task.completed ? <Check className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
        </button>

        <div>
          <p className={`font-medium ${task.completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
            {task.title}
          </p>
          <span className={`badge mt-2 ${task.completed ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
            {task.completed ? 'Done' : 'Pending'}
          </span>
        </div>
      </div>

      <button type="button" onClick={onDelete} className="danger-btn" aria-label={`Delete ${task.title}`}>
        <Trash2 className="mr-2 h-4 w-4" />
        Delete
      </button>
    </li>
  );
}
