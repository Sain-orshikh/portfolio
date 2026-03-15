'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowLeft, Save, Loader } from 'lucide-react';

export default function BirthdayConfigEditor() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    friendName: '',
    oldVersion: '',
    newVersion: '',
  });

  useEffect(() => {
    fetchBirthdayConfig();
  }, []);

  const fetchBirthdayConfig = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/birthday-config');
      if (!response.ok) throw new Error('Failed to fetch birthday config');
      
      const data = await response.json();
      setFormData(data.birthdayConfig);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to load birthday config');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');

      // Validate form data
      if (!formData.friendName.trim()) {
        setError('Friend name cannot be empty');
        return;
      }

      if (!formData.oldVersion.trim()) {
        setError('Old version cannot be empty');
        return;
      }

      if (!formData.newVersion.trim()) {
        setError('New version cannot be empty');
        return;
      }

      const response = await fetch('/api/admin/birthday-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update birthday config');
      }

      setSuccess('Birthday configuration updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 py-12 px-4 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push('/zlog')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700/50 rounded-lg text-slate-300 hover:text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">Birthday Configuration</h1>
            <p className="text-slate-400 mt-2">Configure the birthday page settings</p>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-300">
            {success}
          </div>
        )}

        {/* Form */}
        <div className="space-y-6">
          {/* Friend Name */}
          <div className="p-6 bg-slate-800/30 border border-slate-700/50 rounded-lg">
            <label className="block text-white font-semibold mb-3">
              Friend Name
            </label>
            <input
              type="text"
              value={formData.friendName}
              onChange={(e) =>
                setFormData(prev => ({ ...prev, friendName: e.target.value }))
              }
              placeholder="Enter friend's name"
              className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-teal-500 focus:outline-none transition-all"
            />
            <p className="text-slate-400 text-sm mt-2">
              This name will be displayed in the birthday celebration message
            </p>
          </div>

          {/* Old Version */}
          <div className="p-6 bg-slate-800/30 border border-slate-700/50 rounded-lg">
            <label className="block text-white font-semibold mb-3">
              Old Version
            </label>
            <input
              type="text"
              value={formData.oldVersion}
              onChange={(e) =>
                setFormData(prev => ({ ...prev, oldVersion: e.target.value }))
              }
              placeholder="e.g. 21.0"
              className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-teal-500 focus:outline-none transition-all"
            />
            <p className="text-slate-400 text-sm mt-2">
              The current version before upgrade
            </p>
          </div>

          {/* New Version */}
          <div className="p-6 bg-slate-800/30 border border-slate-700/50 rounded-lg">
            <label className="block text-white font-semibold mb-3">
              New Version
            </label>
            <input
              type="text"
              value={formData.newVersion}
              onChange={(e) =>
                setFormData(prev => ({ ...prev, newVersion: e.target.value }))
              }
              placeholder="e.g. 22.0"
              className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-teal-500 focus:outline-none transition-all"
            />
            <p className="text-slate-400 text-sm mt-2">
              The new version after upgrade
            </p>
          </div>

          {/* Save Button */}
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-600/50 text-white font-semibold rounded-lg transition-all"
            >
              {saving ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
