import { PlusCircle, ArrowLeft, ListFilter } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TaskItem from '../components/TaskItem';
import { useTaskContext } from '../context/TaskContext';

export default function GroupTasks() {
  const { groupId } = useParams();
  const { getGroupById, getTasksByGroupId, addTask, toggleTask, deleteTask } = useTaskContext();
  const [taskTitle, setTaskTitle] = useState('');
  const [error, setError] = useState('');

  const group = getGroupById(groupId);
  const tasks = group ? getTasksByGroupId(group.id) : [];

  if (!group) {
    return (
      <div className="card flex flex-col items-center justify-center p-10 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Group not found</h2>
        <p className="mt-3 text-slate-600">The selected group does not exist or has been removed.</p>
        <Link to="/groups" className="primary-btn mt-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Groups
        </Link>
      </div>
    );
  }

  const handleAddTask = (event) => {
    event.preventDefault();
    const result = addTask(group.id, taskTitle);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setTaskTitle('');
    setError('');
  };

  return (
    <div className="space-y-6">
      <section className="card p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Group</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">{group.name}</h2>
          </div>
          <Link to="/groups" className="secondary-btn w-fit">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Groups
          </Link>
        </div>

        <form onSubmit={handleAddTask} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={taskTitle}
            onChange={(event) => setTaskTitle(event.target.value)}
            placeholder="Add a new task"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:border-brand-400 focus:bg-white"
            aria-label="New task title"
          />
          <button type="submit" className="primary-btn sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Task
          </button>
        </form>

        {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}
      </section>

      <section className="card p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h3 className="text-xl font-semibold text-slate-900">Tasks</h3>
          <span className="badge bg-slate-100 text-slate-700">{tasks.length} total</span>
        </div>

        {tasks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
            <ListFilter className="mx-auto h-10 w-10 text-slate-300" />
            <h4 className="mt-4 text-lg font-semibold text-slate-700">No tasks in this group yet</h4>
            <p className="mt-2 text-sm text-slate-500">Add your first task to begin tracking progress.</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} onToggle={() => toggleTask(task.id)} onDelete={() => deleteTask(task.id)} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
