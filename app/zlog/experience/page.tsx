'use client';
import { useState } from 'react';
import { ArrowLeft, Plus, Edit2, Trash2, Eye, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { experiences as initialExperiences } from '@/src/data/experiences';
import type { Experience } from '@/src/types';

export default function ExperienceManagement() {
  const router = useRouter();
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [previewExperience, setPreviewExperience] = useState<Experience | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [techInput, setTechInput] = useState('');

  const handleAdd = () => {
    setEditingExperience({
      id: `exp-${Date.now()}`,
      role: '',
      company: '',
      period: '',
      description: '',
      achievements: [''],
      tech: [],
      type: 'paid',
      link: '',
    });
    setTechInput('');
    setIsModalOpen(true);
  };

  const handleEdit = (experience: Experience) => {
    setEditingExperience({ ...experience });
    setTechInput(experience.tech.join(', '));
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;

    try {
      const res = await fetch(`/api/admin/experience?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setExperiences(experiences.filter(e => e.id !== id));
      } else {
        alert('Failed to delete experience');
      }
    } catch (error) {
      alert('Error deleting experience');
    }
  };

  const handleSave = async () => {
    if (!editingExperience) return;

    setSaving(true);
    try {
      const isNew = !experiences.find(e => e.id === editingExperience.id);
      const method = isNew ? 'POST' : 'PUT';

      // Filter out empty achievements and parse tech stack
      const cleanedExperience = {
        ...editingExperience,
        achievements: editingExperience.achievements.filter((a: string) => a.trim() !== ''),
        tech: techInput.split(',').map(t => t.trim()).filter(Boolean)
      };

      const res = await fetch('/api/admin/experience', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanedExperience),
      });

      if (res.ok) {
        // Update local state
        if (isNew) {
          setExperiences([...experiences, cleanedExperience]);
        } else {
          setExperiences(experiences.map(e => e.id === cleanedExperience.id ? cleanedExperience : e));
        }
        setIsModalOpen(false);
        setEditingExperience(null);
        alert('Saved! Changes committed to GitHub. Deployment will start shortly.');
      } else {
        const error = await res.json();
        alert(`Failed to save: ${error.error}`);
      }
    } catch (error) {
      alert('Error saving experience');
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = (experience: Experience) => {
    const previewData = {
      ...experience,
      tech: techInput.split(',').map(t => t.trim()).filter(Boolean)
    };
    setPreviewExperience(previewData);
  };

  const addAchievement = () => {
    if (editingExperience) {
      setEditingExperience({
        ...editingExperience,
        achievements: [...editingExperience.achievements, ''],
      });
    }
  };

  const updateAchievement = (index: number, value: string) => {
    if (editingExperience) {
      const newAchievements = [...editingExperience.achievements];
      newAchievements[index] = value;
      setEditingExperience({
        ...editingExperience,
        achievements: newAchievements,
      });
    }
  };

  const removeAchievement = (index: number) => {
    if (editingExperience) {
      setEditingExperience({
        ...editingExperience,
        achievements: editingExperience.achievements.filter((_: string, i: number) => i !== index),
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/zlog')}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Experience</h1>
              <p className="text-slate-400 text-sm">{experiences.length} experiences</p>
            </div>
          </div>

          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-400 rounded-lg text-white font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Experience
          </button>
        </div>

        {/* Experience Grid - Same style as homepage */}
        <div className="grid gap-6">
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="relative overflow-hidden rounded-xl border border-slate-800/50 bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm p-6 transition-all duration-500 hover:border-teal-500/30 hover:shadow-2xl hover:shadow-teal-500/5"
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-600/0 to-slate-700/0 hover:from-slate-600/10 hover:to-slate-700/10 transition-all duration-500 rounded-xl"></div>
              
              <div className="relative">
                {/* Header */}
                <div className="mb-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-white">{experience.role}</h3>
                    <span className="px-2 py-1 bg-teal-500/10 border border-teal-500/30 rounded text-teal-400 text-xs flex-shrink-0">
                      {experience.type}
                    </span>
                  </div>
                  <p className="text-teal-400 font-medium">{experience.company}</p>
                  <p className="text-slate-500 text-sm">{experience.period}</p>
                </div>

                {/* Description */}
                <p className="text-slate-400 text-sm mb-4">{experience.description}</p>

                {/* Achievements */}
                {experience.achievements.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-white font-medium text-sm mb-2">Key Achievements:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {experience.achievements.map((achievement: string, i: number) => (
                        <li key={i} className="text-slate-400 text-sm">{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {experience.tech.map((tech: string, i: number) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-teal-500/10 border border-teal-500/30 rounded text-teal-400 text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Link */}
                {experience.link && (
                  <a
                    href={experience.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-slate-400 hover:text-teal-400 text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Website
                  </a>
                )}

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(experience)}
                    className="p-2 bg-slate-800/80 hover:bg-slate-700 border border-slate-700/50 rounded-lg transition-colors backdrop-blur-sm"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4 text-teal-400" />
                  </button>
                  <button
                    onClick={() => handleDelete(experience.id)}
                    className="p-2 bg-slate-800/80 hover:bg-slate-700 border border-slate-700/50 rounded-lg transition-colors backdrop-blur-sm"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edit/Add Modal */}
        {isModalOpen && editingExperience && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-slate-800 rounded-xl border border-slate-700 max-w-2xl w-full my-8">
              <div className="p-6 max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">
                    {experiences.find(e => e.id === editingExperience.id) ? 'Edit' : 'Add'} Experience
                  </h2>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditingExperience(null);
                    }}
                    className="text-slate-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Role */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Role/Position *
                    </label>
                    <input
                      type="text"
                      value={editingExperience.role}
                      onChange={(e) => setEditingExperience({ ...editingExperience, role: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-teal-500"
                      placeholder="Frontend Engineer"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Company/Organization *
                    </label>
                    <input
                      type="text"
                      value={editingExperience.company}
                      onChange={(e) => setEditingExperience({ ...editingExperience, company: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-teal-500"
                      placeholder="Company Name"
                    />
                  </div>

                  {/* Period & Type */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Period *
                      </label>
                      <input
                        type="text"
                        value={editingExperience.period}
                        onChange={(e) => setEditingExperience({ ...editingExperience, period: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-teal-500"
                        placeholder="Summer 2024"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Type *
                      </label>
                      <select
                        value={editingExperience.type}
                        onChange={(e) => setEditingExperience({ ...editingExperience, type: e.target.value as any })}
                        className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-teal-500"
                      >
                        <option value="paid">Paid</option>
                        <option value="unpaid">Unpaid</option>
                        <option value="school">School</option>
                        <option value="personal">Personal</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={editingExperience.description}
                      onChange={(e) => setEditingExperience({ ...editingExperience, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-teal-500 resize-none"
                      placeholder="Brief overview of your role"
                    />
                  </div>

                  {/* Achievements */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Achievements
                    </label>
                    {editingExperience.achievements.map((achievement: string, index: number) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={achievement}
                          onChange={(e) => updateAchievement(index, e.target.value)}
                          className="flex-1 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-teal-500"
                          placeholder="Achievement or responsibility"
                        />
                        <button
                          onClick={() => removeAchievement(index)}
                          className="px-3 py-2 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addAchievement}
                      className="text-teal-400 text-sm hover:text-teal-300 transition-colors"
                    >
                      + Add Achievement
                    </button>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Tech Stack (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-teal-500"
                      placeholder="TypeScript, Next.js, GraphQL"
                    />
                  </div>

                  {/* Link */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Company/Project Link
                    </label>
                    <input
                      type="url"
                      value={editingExperience.link || ''}
                      onChange={(e) => setEditingExperience({ ...editingExperience, link: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-teal-500"
                      placeholder="https://company.com"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => handlePreview(editingExperience)}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                  <div className="flex-1"></div>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditingExperience(null);
                    }}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving || !editingExperience.role || !editingExperience.company}
                    className="px-4 py-2 bg-teal-500 hover:bg-teal-400 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg text-white transition-colors"
                  >
                    {saving ? 'Saving...' : 'Save & Commit'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {previewExperience && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-xl border border-slate-700 max-w-3xl w-full p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Preview</h2>
                <button
                  onClick={() => setPreviewExperience(null)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Preview Card */}
              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700/30">
                <div className="mb-3">
                  <h3 className="text-lg font-bold text-white">{previewExperience.role}</h3>
                  <p className="text-teal-400">{previewExperience.company}</p>
                  <p className="text-slate-500 text-sm">{previewExperience.period}</p>
                </div>

                <p className="text-slate-400 text-sm mb-4">{previewExperience.description}</p>

                {previewExperience.achievements.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-white font-medium text-sm mb-2">Achievements:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {previewExperience.achievements.filter((a: string) => a.trim()).map((achievement: string, i: number) => (
                        <li key={i} className="text-slate-400 text-sm">{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-3">
                  {previewExperience.tech.map((tech: string, i: number) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-teal-500/10 border border-teal-500/30 rounded text-teal-400 text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {previewExperience.link && (
                  <a
                    href={previewExperience.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-slate-400 hover:text-teal-400 text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
