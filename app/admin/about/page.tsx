'use client';
import { useEffect, useState } from 'react';
import AdminLoading from '../components/AdminLoading';
import type { AboutConfig } from '@prisma/client';

export default function AboutAdminPage() {
  const [about, setAbout] = useState<Partial<AboutConfig>>({
    bio: '',
    bioSecond: '',
    milestones: [],
    coreSkills: [],
    principles: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchAbout = async () => {
    try {
      const res = await fetch('/api/admin/about');
      if (res.status === 401 || res.status === 403) {
        window.location.href = '/admin/login';
        return;
      }
      const data = await res.json();
      if (data) setAbout(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch('/api/admin/about', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(about),
    });
    if (res.ok) fetchAbout();
    setSaving(false);
  };

  if (loading) return <AdminLoading />;

  const milestones = (about.milestones as any[]) || [];
  const coreSkills = (about.coreSkills as string[]) || [];
  const principles = (about.principles as any[]) || [];

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display font-bold text-3xl text-brand-dark mb-2">About Section</h1>
        <p className="text-[#5e5e5e]">Edit your bio, milestones, skills, and principles.</p>
      </div>

      <div className="bg-white border border-[#e5e2da] rounded-3xl p-8 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-1">Bio</label>
          <textarea
            name="bio"
            value={about.bio || ''}
            onChange={(e) => setAbout({ ...about, bio: e.target.value })}
            rows={5}
            className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-1">Second Bio Paragraph</label>
          <textarea
            name="bioSecond"
            value={about.bioSecond || ''}
            onChange={(e) => setAbout({ ...about, bioSecond: e.target.value })}
            rows={5}
            className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-1">Core Skills (one per line)</label>
          <textarea
            name="coreSkills"
            value={coreSkills.join('\n')}
            onChange={(e) => setAbout({ ...about, coreSkills: e.target.value.split('\n').map((s) => s.trim()).filter(Boolean) })}
            rows={6}
            className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-1">Milestones (JSON array)</label>
          <textarea
            name="milestones"
            value={JSON.stringify(milestones, null, 2)}
            onChange={(e) => {
              try {
                setAbout({ ...about, milestones: JSON.parse(e.target.value) });
              } catch {}
            }}
            rows={6}
            className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange font-mono text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-1">Principles (JSON array)</label>
          <textarea
            name="principles"
            value={JSON.stringify(principles, null, 2)}
            onChange={(e) => {
              try {
                setAbout({ ...about, principles: JSON.parse(e.target.value) });
              } catch {}
            }}
            rows={8}
            className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange font-mono text-sm"
          />
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-brand-dark hover:bg-brand-orange text-white font-display font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save About'}
        </button>
      </div>
    </div>
  );
}
