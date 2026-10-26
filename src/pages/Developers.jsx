import { UserCircle2 } from 'lucide-react';
import { developers } from '../data/developers';

export default function Developers() {
  const visibleDevelopers = developers.filter((member) => member.name && member.name !== '[Enter Complete Name]');

  return (
    <div className="space-y-8">
      <section className="card p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <UserCircle2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Team</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">Developers</h2>
          </div>
        </div>
      </section>

      {visibleDevelopers.length === 0 ? (
        <div className="card p-10 text-center text-slate-500">
          No developers have been added yet. Update the values in <strong>src/data/developers.js</strong>.
        </div>
      ) : (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {visibleDevelopers.map((member) => (
            <div key={member.id} className="card p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                <UserCircle2 className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{member.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{member.role}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
