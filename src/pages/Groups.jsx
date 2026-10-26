import { FolderPlus, SearchX } from 'lucide-react';
import { useMemo, useState } from 'react';
import GroupCard from '../components/GroupCard';
import { useTaskContext } from '../context/TaskContext';

export default function Groups() {
  const { groups, getGroupStats, addGroup, deleteGroup } = useTaskContext();
  const [groupName, setGroupName] = useState('');
  const [error, setError] = useState('');

  const sortedGroups = useMemo(() => [...groups].sort((a, b) => a.name.localeCompare(b.name)), [groups]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = addGroup(groupName);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setGroupName('');
    setError('');
  };

  const handleDelete = (group) => {
    const confirmed = window.confirm(`Delete group "${group.name}" and all of its tasks?`);
    if (!confirmed) return;
    deleteGroup(group.id);
  };

  return (
    <div className="space-y-8">
      <section className="card p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <FolderPlus className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Create a Task Group</h2>
            <p className="text-sm text-slate-500">Organize your work by category.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={groupName}
            onChange={(event) => setGroupName(event.target.value)}
            placeholder="e.g. Lab Activities"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:border-brand-400 focus:bg-white"
            aria-label="New task group name"
          />
          <button type="submit" className="primary-btn sm:w-auto">Add Group</button>
        </form>

        {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-semibold text-slate-900">All Groups</h3>
          <span className="badge bg-slate-100 text-slate-700">{groups.length} groups</span>
        </div>

        {sortedGroups.length === 0 ? (
          <div className="card flex flex-col items-center justify-center p-10 text-center">
            <SearchX className="h-10 w-10 text-slate-300" />
            <h4 className="mt-4 text-lg font-semibold text-slate-700">No groups yet</h4>
            <p className="mt-2 text-sm text-slate-500">Create your first group to organize tasks and categories.</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {sortedGroups.map((group) => (
              <GroupCard key={group.id} group={group} stats={getGroupStats(group.id)} onDelete={() => handleDelete(group)} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
