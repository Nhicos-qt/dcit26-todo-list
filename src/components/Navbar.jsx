import { ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const titles = {
  '/home': 'Dashboard',
  '/groups': 'Task Groups',
  '/guide': 'User Guide',
  '/developers': 'Developers',
};

export default function Navbar() {
  const location = useLocation();
  const currentTitle = titles[location.pathname] || 'Task Manager';
  const shouldShowBackHome = location.pathname !== '/home';

  return (
    <header className="border-b border-slate-200 bg-white/80 px-5 py-4 backdrop-blur-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">DCIT 26</p>
          <h2 className="text-xl font-bold text-slate-900">{currentTitle}</h2>
        </div>

        {shouldShowBackHome && (
          <Link to="/home" className="secondary-btn w-fit">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Home
          </Link>
        )}
      </div>
    </header>
  );
}
