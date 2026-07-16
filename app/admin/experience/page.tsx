'use client';
import { useEffect, useState } from 'react';
import CrudList from '../components/CrudList';
import AdminLoading from '../components/AdminLoading';
import ImageUpload from '../components/ImageUpload';
import type { Experience } from '@prisma/client';

export default function ExperienceAdminPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExperiences = async () => {
    try {
      const res = await fetch('/api/admin/experience');
      if (res.status === 401 || res.status === 403) {
        window.location.href = '/admin/login';
        return;
      }
      const data = await res.json();
      setExperiences(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  if (loading) return <AdminLoading />;

  return (
    <div className="space-y-6">
      <div className="border-b border-[#e5e2da] pb-5">
        <h1 className="font-display font-bold text-3xl text-brand-dark mb-2">Experience</h1>
        <p className="text-[#5e5e5e] text-sm">Manage your professional work history and case studies.</p>
      </div>

      <CrudList<Experience>
        title="Experiences"
        items={experiences}
        apiPath="/api/admin/experience"
        onRefresh={fetchExperiences}
        emptyItem={{
          role: '',
          company: '',
          location: '',
          period: '',
          image: '',
          summary: '',
          description: '',
          gallery: [],
          tags: [],
          order: experiences.length + 1
        }}
        renderForm={(item, onChange) => (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-1">Role / Position</label>
                <input
                  type="text"
                  name="role"
                  value={(item as Experience).role || ''}
                  onChange={(e) => onChange({ ...item, role: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-1">Company / Organization</label>
                <input
                  type="text"
                  name="company"
                  value={(item as Experience).company || ''}
                  onChange={(e) => onChange({ ...item, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-1">Period (e.g. May 2026 - Present)</label>
                <input
                  type="text"
                  name="period"
                  value={(item as Experience).period || ''}
                  onChange={(e) => onChange({ ...item, period: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={(item as Experience).location || ''}
                  onChange={(e) => onChange({ ...item, location: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1">Cover Image</label>
              <ImageUpload
                value={(item as Experience).image || ''}
                onChange={(url) => onChange({ ...item, image: url })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1">Summary (Short bio overview)</label>
              <input
                type="text"
                name="summary"
                value={(item as Experience).summary || ''}
                onChange={(e) => onChange({ ...item, summary: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1">Description (Detailed history paragraph)</label>
              <textarea
                name="description"
                rows={4}
                value={(item as Experience).description || ''}
                onChange={(e) => onChange({ ...item, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1">Tags (Comma separated)</label>
              <input
                type="text"
                name="tags"
                value={((item as Experience).tags || []).join(', ')}
                onChange={(e) => onChange({ ...item, tags: e.target.value.split(',').map((t) => t.trim()) })}
                className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1">Gallery Images (Comma separated URLs)</label>
              <input
                type="text"
                name="gallery"
                value={((item as Experience).gallery || []).join(', ')}
                onChange={(e) => onChange({ ...item, gallery: e.target.value.split(',').map((g) => g.trim()).filter(Boolean) })}
                className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange"
              />
            </div>
          </div>
        )}
      />
    </div>
  );
}
