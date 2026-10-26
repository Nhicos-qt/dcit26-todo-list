import { LayoutDashboard, ListChecks, BookOpen, Users, FolderKanban } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/home', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/groups', label: 'Task Groups', icon: FolderKanban },
  { to: '/guide', label: 'User Guide', icon: BookOpen },
  { to: '/developers', label: 'Developers', icon: Users },
];

export default function Sidebar() {
  const baseLink = 'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition';

  return (
    <aside className="w-full bg-slate-900 text-slate-100 lg:w-72">
      <div className="border-b border-slate-800 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white shadow-lg shadow-brand-500/30">
            <ListChecks className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold">DCIT 26</h1>
            <p className="text-xs text-slate-400">Task Manager</p>
          </div>
        </div>
      </div>

      <nav className="space-y-2 p-4">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `${baseLink} ${
                isActive
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
