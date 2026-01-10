'use client';
import { useRouter } from 'next/navigation';
import { FolderKanban, Briefcase, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    router.push('/zlog/login');
    router.refresh();
  };

  const cards = [
    {
      title: 'Projects',
      description: 'Manage your portfolio projects',
      icon: FolderKanban,
      path: '/zlog/projects',
      color: 'teal',
    },
    {
      title: 'Experience',
      description: 'Manage your work history',
      icon: Briefcase,
      path: '/zlog/experience',
      color: 'cyan',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Admin Panel
            </h1>
            <p className="text-slate-400">
              Manage your portfolio content
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700/50 rounded-lg text-slate-300 hover:text-white transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.path}
                onClick={() => router.push(card.path)}
                className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm p-8 text-left transition-all duration-300 hover:border-teal-500/30 hover:shadow-2xl hover:shadow-teal-500/10"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 to-cyan-500/0 group-hover:from-teal-500/5 group-hover:to-cyan-500/5 transition-all duration-300"></div>

                <div className="relative">
                  {/* Icon */}
                  <div className="mb-6 p-4 bg-teal-500/10 rounded-xl border border-teal-500/20 inline-block group-hover:border-teal-500/40 transition-all">
                    <Icon className="w-8 h-8 text-teal-400" />
                  </div>

                  {/* Content */}
                  <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">
                    {card.title}
                  </h2>
                  <p className="text-slate-400 mb-6">
                    {card.description}
                  </p>

                  {/* Arrow */}
                  <div className="flex items-center gap-2 text-teal-400 font-medium group-hover:gap-3 transition-all">
                    <span>Manage</span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Info Card */}
        <div className="mt-8 p-4 bg-slate-800/30 border border-slate-700/50 rounded-lg">
          <p className="text-slate-400 text-sm">
            <span className="text-teal-400 font-medium">Note:</span> Changes made here will commit directly to your GitHub repository and trigger a deployment.
          </p>
        </div>
      </div>
    </div>
  );
}
