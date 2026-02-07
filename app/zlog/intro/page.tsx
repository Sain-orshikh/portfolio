'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowLeft, Save, Loader } from 'lucide-react';

export default function IntroEditor() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    paragraphs: ['', ''],
    learning: '',
  });

  useEffect(() => {
    fetchIntroText();
  }, []);

  const fetchIntroText = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/intro');
      if (!response.ok) throw new Error('Failed to fetch intro text');
      
      const data = await response.json();
      setFormData(data.introText);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to load intro text');
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
      if (!formData.title.trim()) {
        setError('Title cannot be empty');
        return;
      }

      if (formData.paragraphs.some(p => !p.trim())) {
        setError('All paragraphs must have content');
        return;
      }

      if (!formData.learning.trim()) {
        setError('Learning section cannot be empty');
        return;
      }

      const response = await fetch('/api/admin/intro', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update intro text');
      }

      setSuccess('Homepage intro text updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const handleAddParagraph = () => {
    setFormData(prev => ({
      ...prev,
      paragraphs: [...prev.paragraphs, ''],
    }));
  };

  const handleRemoveParagraph = (index: number) => {
    setFormData(prev => ({
      ...prev,
      paragraphs: prev.paragraphs.filter((_, i) => i !== index),
    }));
  };

  const handleParagraphChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      paragraphs: prev.paragraphs.map((p, i) => (i === index ? value : p)),
    }));
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
            <h1 className="text-3xl font-bold text-white">Edit Homepage Introduction</h1>
            <p className="text-slate-400 mt-2">Update the introductory text on your homepage</p>
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
          {/* Title Section */}
          <div className="p-6 bg-slate-800/30 border border-slate-700/50 rounded-lg">
            <label className="block text-white font-semibold mb-3">
              Main Title
            </label>
            <textarea
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 resize-none"
              rows={3}
              placeholder="Enter the main title..."
            />
            <p className="text-slate-400 text-sm mt-2">This is the first line of your about section</p>
          </div>

          {/* Paragraphs Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-white font-semibold">
                Additional Paragraphs
              </label>
              <button
                onClick={handleAddParagraph}
                className="text-sm px-3 py-1 bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/50 rounded text-teal-300 transition-all"
              >
                Add Paragraph
              </button>
            </div>

            {formData.paragraphs.map((paragraph, index) => (
              <div key={index} className="p-6 bg-slate-800/30 border border-slate-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-white font-semibold">
                    Paragraph {index + 1}
                  </label>
                  {formData.paragraphs.length > 1 && (
                    <button
                      onClick={() => handleRemoveParagraph(index)}
                      className="text-sm px-2 py-1 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded text-red-300 transition-all"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <textarea
                  value={paragraph}
                  onChange={(e) => handleParagraphChange(index, e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 resize-none"
                  rows={4}
                  placeholder="Enter paragraph text..."
                />
              </div>
            ))}
          </div>

          {/* Learning Section */}
          <div className="p-6 bg-slate-800/30 border border-slate-700/50 rounded-lg">
            <label className="block text-white font-semibold mb-3">
              What I'm Learning
            </label>
            <textarea
              value={formData.learning}
              onChange={(e) => setFormData(prev => ({ ...prev, learning: e.target.value }))}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 resize-none"
              rows={4}
              placeholder="What are you currently learning..."
            />
            <p className="text-slate-400 text-sm mt-2">This section appears under "What I'm learning"</p>
          </div>

          {/* Save Button */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 disabled:bg-slate-600 text-white font-semibold rounded-lg transition-all"
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
            <div className="text-sm text-slate-400 flex items-center">
              Changes will commit to GitHub automatically
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
