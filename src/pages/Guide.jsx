import { BookText } from 'lucide-react';

const steps = [
  'Navigate the dashboard from the sidebar or the Home screen to see summary cards and group progress.',
  'Create a new task group from the Task Groups page using a clear name, such as School Activities or Personal Tasks.',
  'Open a group by clicking its card or the Open Group button to view only the tasks inside that category.',
  'Add a new task by typing in the input field and pressing Add Task or Enter.',
  'Mark a task as Done by clicking the check button next to it. This updates the status immediately.',
  'If a task is finished but should be reviewed again, click the same button to change it back to Pending.',
  'Delete a task using the Delete button beside the item when it is no longer needed.',
  'Delete a whole group using the delete action on the group card. This also removes the tasks in that group.',
  'Move between pages using the sidebar navigation or the back buttons available inside each page.',
];

export default function Guide() {
  return (
    <div className="space-y-6">
      <section className="card p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <BookText className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Help Center</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">User Guide</h2>
          </div>
        </div>
      </section>

      <section className="card p-6">
        <ol className="space-y-4">
          {steps.map((step, index) => (
            <li key={index} className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                {index + 1}
              </span>
              <p className="text-slate-700">{step}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
