'use client';
import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, ChevronDown, Edit2, Trash2, Eye, ExternalLink, Github } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { Project } from '@/src/types';

export default function ProjectsManagement() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/projects');
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingProject({
      id: `proj-${Date.now()}`,
      title: '',
      description: '',
      tech: [],
      repo: '',
      demo: '',
      image: '',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject({ ...project });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setProjects(projects.filter(p => p.id !== id));
      } else {
        alert('Failed to delete project');
      }
    } catch (error) {
      alert('Error deleting project');
    }
  };

  const handleSave = async () => {
    if (!editingProject) return;

    setSaving(true);
    try {
      const isNew = !projects.find(p => p.id === editingProject.id);
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch('/api/admin/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProject),
      });

      if (res.ok) {
        await fetchProjects();
        setIsModalOpen(false);
        setEditingProject(null);
      } else {
        const error = await res.json();
        alert(`Failed to save: ${error.error}`);
      }
    } catch (error) {
      alert('Error saving project');
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = (project: Project) => {
    setPreviewProject(project);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

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
              <h1 className="text-2xl font-bold text-white">Projects</h1>
              <p className="text-slate-400 text-sm">{projects.length} projects</p>
            </div>
          </div>

          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-400 rounded-lg text-white font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Project
          </button>
        </div>

        {/* Projects List - Accordion Style */}
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border border-slate-700/50 bg-slate-800/30 rounded-lg overflow-hidden"
            >
              {/* Collapsed Header */}
              <div
                onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform ${
                      expandedId === project.id ? 'rotate-180' : ''
                    }`}
                  />
                  <div>
                    <h3 className="text-white font-medium">{project.title}</h3>
                    <p className="text-slate-500 text-sm">{project.tech.join(', ')}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(project);
                    }}
                    className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4 text-teal-400" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(project.id);
                    }}
                    className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>

              {/* Expanded Content - Full Project Card */}
              {expandedId === project.id && (
                <div className="p-4 pt-0 border-t border-slate-700/30">
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/30">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {project.image && (
                        <div className="w-full sm:w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden border-2 border-slate-700/50">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                        <p className="text-slate-400 text-sm mb-3">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.tech.map((tech: string, i: number) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-teal-500/10 border border-teal-500/30 rounded text-teal-400 text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-3">
                          {project.repo && (
                            <a
                              href={project.repo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-slate-400 hover:text-teal-400 text-sm"
                            >
                              <Github className="w-4 h-4" />
                              Repo
                            </a>
                          )}
                          {project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-slate-400 hover:text-teal-400 text-sm"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Demo
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Edit/Add Modal */}
        {isModalOpen && editingProject && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-xl border border-slate-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">
                    {projects.find(p => p.id === editingProject.id) ? 'Edit' : 'Add'} Project
                  </h2>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditingProject(null);
                    }}
                    className="text-slate-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={editingProject.title}
                      onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-teal-500"
                      placeholder="Project Name"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={editingProject.description}
                      onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-teal-500 resize-none"
                      placeholder="Brief description of the project"
                    />
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Tech Stack (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={editingProject.tech.join(', ')}
                      onChange={(e) => setEditingProject({
                        ...editingProject,
                        tech: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                      })}
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-teal-500"
                      placeholder="Next.js, TypeScript, Tailwind"
                    />
                  </div>

                  {/* Repo URL */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Repository URL
                    </label>
                    <input
                      type="url"
                      value={editingProject.repo || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, repo: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-teal-500"
                      placeholder="https://github.com/..."
                    />
                  </div>

                  {/* Demo URL */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Demo URL
                    </label>
                    <input
                      type="url"
                      value={editingProject.demo || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, demo: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-teal-500"
                      placeholder="https://project-demo.com"
                    />
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Image Path
                    </label>
                    <input
                      type="text"
                      value={editingProject.image || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-teal-500"
                      placeholder="/project-image.webp"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => handlePreview(editingProject)}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                  <div className="flex-1"></div>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditingProject(null);
                    }}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving || !editingProject.title || !editingProject.description}
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
        {previewProject && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-xl border border-slate-700 max-w-3xl w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Preview</h2>
                <button
                  onClick={() => setPreviewProject(null)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Preview Card (same style as main site) */}
              <div className="relative overflow-hidden rounded-xl border border-slate-800/50 bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm flex flex-col sm:flex-row gap-4 p-4">
                {previewProject.image && (
                  <div className="relative w-full sm:w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden border-2 border-slate-700/50">
                    <img
                      src={previewProject.image}
                      alt={previewProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{previewProject.title}</h3>
                  <p className="text-slate-400 text-sm mb-3">{previewProject.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {previewProject.tech.map((tech: string, i: number) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-teal-500/10 border border-teal-500/30 rounded text-teal-400 text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {previewProject.repo && (
                      <span className="flex items-center gap-1 text-slate-400 text-sm">
                        <Github className="w-4 h-4" />
                        Repo
                      </span>
                    )}
                    {previewProject.demo && (
                      <span className="flex items-center gap-1 text-slate-400 text-sm">
                        <ExternalLink className="w-4 h-4" />
                        Demo
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
