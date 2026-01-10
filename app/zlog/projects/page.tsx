'use client';
import { useState } from 'react';
import { ArrowLeft, Plus, Edit2, Trash2, Eye, ExternalLink, Github, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { projects as initialProjects } from '@/src/data/projects';
import type { Project } from '@/src/types';

export default function ProjectsManagement() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [techInput, setTechInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [pendingImageFile, setPendingImageFile] = useState<File | null>(null);

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
    setTechInput('');
    setImagePreview(null);
    setPendingImageFile(null);
    setIsModalOpen(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject({ ...project });
    setTechInput(project.tech.join(', '));
    setImagePreview(project.image || null);
    setPendingImageFile(null);
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
        alert('Deleted! Changes committed to GitHub.');
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
      let imagePath = editingProject.image;

      // Upload image first if there's a pending file
      if (pendingImageFile) {
        const formData = new FormData();
        formData.append('file', pendingImageFile);

        const uploadRes = await fetch('/api/admin/upload-image', {
          method: 'POST',
          body: formData,
        });

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          imagePath = uploadData.path;
        } else {
          const error = await uploadRes.json();
          alert(`Image upload failed: ${error.error}`);
          setSaving(false);
          return;
        }
      }

      const isNew = !initialProjects.find(p => p.id === editingProject.id);
      const method = isNew ? 'POST' : 'PUT';

      // Parse tech stack from input string
      const projectToSave = {
        ...editingProject,
        image: imagePath,
        tech: techInput.split(',').map(t => t.trim()).filter(Boolean)
      };

      const res = await fetch('/api/admin/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectToSave),
      });

      if (res.ok) {
        if (isNew) {
          setProjects([...projects, projectToSave]);
        } else {
          setProjects(projects.map(p => p.id === editingProject.id ? projectToSave : p));
        }
        setIsModalOpen(false);
        setEditingProject(null);
        setPendingImageFile(null);
        setImagePreview(null);
        alert('Saved! Changes committed to GitHub. Deployment will start shortly.');
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      alert('Invalid file type. Please use: jpg, png, webp, or gif');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File too large. Maximum size: 5MB');
      return;
    }

    // Store file for later upload when saving
    setPendingImageFile(file);

    // Show preview using object URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handlePreview = (project: Project) => {
    const previewData = {
      ...project,
      tech: techInput.split(',').map(t => t.trim()).filter(Boolean)
    };
    setPreviewProject(previewData);
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

        {/* Projects Grid */}
        <div className="grid gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="relative overflow-hidden rounded-xl border border-slate-800/50 bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm transition-all duration-500 hover:border-teal-500/30 hover:shadow-2xl hover:shadow-teal-500/5"
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-600/0 to-slate-700/0 hover:from-slate-600/10 hover:to-slate-700/10 transition-all duration-500 rounded-xl"></div>
              
              <div className="relative flex flex-col sm:flex-row gap-4 p-4">
                {/* Image */}
                {project.image && (
                  <div className="relative w-full sm:w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden border-2 border-slate-700/50">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Content */}
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
                        onClick={(e) => e.stopPropagation()}
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
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Demo
                      </a>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-2 bg-slate-800/80 hover:bg-slate-700 border border-slate-700/50 rounded-lg transition-colors backdrop-blur-sm"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4 text-teal-400" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
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
        {isModalOpen && editingProject && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-xl border border-slate-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">
                    {initialProjects.find(p => p.id === editingProject.id) ? 'Edit' : 'Add'} Project
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
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-teal-500"
                      placeholder="Python, Pygame, Game Development"
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

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Project Image
                    </label>
                    
                    {/* Image Preview */}
                    {imagePreview && (
                      <div className="mb-3 relative">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-48 object-cover rounded-lg border-2 border-slate-700"
                        />
                        <button
                          onClick={() => {
                            setImagePreview(null);
                            setEditingProject({ ...editingProject, image: '' });
                          }}
                          className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 rounded text-white text-xs"
                          type="button"
                        >
                          Remove
                        </button>
                      </div>
                    )}

                    {/* Upload Button */}
                    <div className="flex gap-2">
                      <label className="flex-1 cursor-pointer">
                        <div className="px-4 py-2 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 rounded-lg text-teal-400 text-center transition-colors">
                          {uploading ? 'Uploading...' : '📁 Upload Image'}
                        </div>
                        <input
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={uploading}
                        />
                      </label>
                    </div>
                    
                    {/* Or manual path input */}
                    <div className="mt-2">
                      <input
                        type="text"
                        value={editingProject.image || ''}
                        onChange={(e) => {
                          setEditingProject({ ...editingProject, image: e.target.value });
                          setImagePreview(e.target.value);
                        }}
                        className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-teal-500 text-sm"
                        placeholder="Or enter path manually: /image.webp"
                      />
                    </div>
                    
                    <p className="text-xs text-slate-500 mt-1">
                      Accepted: JPG, PNG, WebP, GIF (max 5MB)
                    </p>
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

              {/* Preview Card */}
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
