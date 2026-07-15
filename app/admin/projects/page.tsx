'use client';
import { useEffect, useState } from 'react';
import CrudList from '../components/CrudList';
import AdminLoading from '../components/AdminLoading';
import ImageUpload from '../components/ImageUpload';
import type { Project } from '@prisma/client';

const categories = [
  'Web App',
  'Mobile App',
  'Autonomous Systems',
  'Robotics',
  'AI/ML',
  'IoT',
  'Blockchain',
  'Community',
];

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/projects');
      if (res.status === 401 || res.status === 403) {
        window.location.href = '/admin/login';
        return;
      }
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) return <AdminLoading />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-3xl text-brand-dark mb-2">Projects</h1>
        <p className="text-[#5e5e5e]">Manage your portfolio projects.</p>
      </div>

      <CrudList<Project>
        title="Projects"
        items={projects}
        apiPath="/api/admin/projects"
        onRefresh={fetchProjects}
        emptyItem={{ title: '', category: 'Web App', image: '', tags: [], year: '', description: '', order: projects.length + 1 }}
        renderForm={(item, onChange) => (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={(item as Project).title || ''}
                onChange={(e) => onChange({ ...item, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-1">Category</label>
                <select
                  name="category"
                  value={(item as Project).category || 'Web App'}
                  onChange={(e) => onChange({ ...item, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-1">Year</label>
                <input
                  type="text"
                  name="year"
                  value={(item as Project).year || ''}
                  onChange={(e) => onChange({ ...item, year: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1">Image</label>
              <ImageUpload
                value={(item as Project).image || ''}
                onChange={(url) => onChange({ ...item, image: url })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1">Tags (comma separated)</label>
              <input
                type="text"
                name="tags"
                value={((item as Project).tags || []).join(', ')}
                onChange={(e) => onChange({ ...item, tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) })}
                className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1">Description</label>
              <textarea
                name="description"
                value={(item as Project).description || ''}
                onChange={(e) => onChange({ ...item, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1">Order</label>
              <input
                type="number"
                name="order"
                value={(item as Project).order || 0}
                onChange={(e) => onChange({ ...item, order: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange"
              />
            </div>
          </div>

        )}
      />
    </div>
  );
}
