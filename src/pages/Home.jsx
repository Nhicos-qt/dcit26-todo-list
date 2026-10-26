import { ClipboardCheck, ListTodo, Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import { useTaskContext } from '../context/TaskContext';

export default function Home() {
  const { groups, totalStats, getGroupStats } = useTaskContext();

  return (
    <div className="space-y-8">
      <section className="card p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Welcome back</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">Stay on top of your tasks.</h2>
            <p className="mt-3 max-w-2xl text-base text-slate-600">
              Manage school activities, personal tasks, and project work in one organized place.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/groups" className="primary-btn">View Groups</Link>
            <Link to="/guide" className="secondary-btn">Read Guide</Link>
            <Link to="/developers" className="secondary-btn">Developers</Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Tasks" value={totalStats.total} icon={ListTodo} accent="brand" detail="All tasks across groups" />
        <StatCard title="Completed" value={totalStats.completed} icon={ClipboardCheck} accent="green" detail="Finished successfully" />
        <StatCard title="Pending" value={totalStats.pending} icon={Target} accent="amber" detail="Still needs attention" />
        <StatCard title="Groups" value={groups.length} icon={TrendingUp} accent="slate" detail="Active categories" />
      </section>

      <section className="card p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h3 className="text-xl font-semibold text-slate-900">Group Overview</h3>
          <Link to="/groups" className="text-sm font-medium text-brand-600 hover:text-brand-700">Manage groups</Link>
        </div>

        {groups.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
            No task groups yet. Create one to begin organizing your work.
          </div>
        ) : (
          <div className="space-y-4">
            {groups.map((group) => {
              const stats = getGroupStats(group.id);
              return (
                <div key={group.id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="text-base font-semibold text-slate-900">{group.name}</h4>
                    <p className="text-sm text-slate-500">
                      {stats.total} tasks • {stats.completed} done • {stats.pending} pending
                    </p>
                  </div>
                  <Link to={`/groups/${group.id}`} className="secondary-btn w-fit">Open Tasks</Link>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
