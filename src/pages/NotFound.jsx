import { Frown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="card flex min-h-[60vh] flex-col items-center justify-center p-10 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-50 text-brand-600">
        <Frown className="h-10 w-10" />
      </div>
      <h2 className="mt-6 text-3xl font-bold text-slate-900">Page Not Found</h2>
      <p className="mt-3 max-w-md text-slate-600">The page you are looking for does not exist or may have been moved.</p>
      <Link to="/home" className="primary-btn mt-6">Go Home</Link>
    </div>
  );
}
