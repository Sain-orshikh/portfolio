'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        router.push('/zlog');
        router.refresh();
      } else {
        setError('Invalid password');
        setPassword('');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-teal-500/10 rounded-full border border-teal-500/30">
              <Lock className="w-8 h-8 text-teal-400" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-white text-center mb-2">
            Admin Access
          </h1>
          <p className="text-slate-400 text-center mb-8 text-sm">
            Enter your password to continue
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20 transition-all"
                required
                autoFocus
                disabled={loading}
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-teal-500 hover:bg-teal-400 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            >
              {loading ? 'Authenticating...' : 'Access Admin Panel'}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-slate-500 text-xs mt-6">
            Unauthorized access is prohibited
          </p>
        </div>
      </div>
    </div>
  );
}
