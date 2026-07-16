'use client';
import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import AdminLoading from '../components/AdminLoading';
import type { AboutConfig } from '@prisma/client';

export default function AboutAdminPage() {
  const [about, setAbout] = useState<Partial<AboutConfig>>({
    bio: '',
    bioSecond: '',
    milestones: [],
    coreSkills: [],
    principles: [],
    publications: [],
    certifications: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    setError(null);
    try {
      const res = await fetch('/api/admin/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(about),
      });
      if (res.ok) {
        fetchAbout();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Failed to save.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <AdminLoading />;

  const milestones = (about.milestones as any[]) || [];
  const coreSkills = (about.coreSkills as string[]) || [];
  const principles = (about.principles as any[]) || [];
  const publications = (about.publications as any[]) || [];
  const certifications = (about.certifications as any[]) || [];

  // Milestone helpers
  const updateMilestone = (index: number, field: string, value: string) => {
    const list = [...milestones];
    list[index] = { ...list[index], [field]: value };
    setAbout({ ...about, milestones: list });
  };

  const addMilestone = () => {
    setAbout({ ...about, milestones: [...milestones, { number: '', label: '' }] });
  };

  const removeMilestone = (index: number) => {
    const list = milestones.filter((_, i) => i !== index);
    setAbout({ ...about, milestones: list });
  };

  // Principle helpers
  const updatePrinciple = (index: number, field: string, value: string) => {
    const list = [...principles];
    list[index] = { ...list[index], [field]: value };
    setAbout({ ...about, principles: list });
  };

  const addPrinciple = () => {
    setAbout({ ...about, principles: [...principles, { title: '', desc: '' }] });
  };

  const removePrinciple = (index: number) => {
    const list = principles.filter((_, i) => i !== index);
    setAbout({ ...about, principles: list });
  };

  // Publication helpers
  const updatePublication = (index: number, value: string) => {
    const list = [...publications];
    list[index] = { ...list[index], title: value };
    setAbout({ ...about, publications: list });
  };

  const addPublication = () => {
    setAbout({ ...about, publications: [...publications, { title: '' }] });
  };

  const removePublication = (index: number) => {
    const list = publications.filter((_, i) => i !== index);
    setAbout({ ...about, publications: list });
  };

  // Certification helpers
  const updateCertification = (index: number, value: string) => {
    const list = [...certifications];
    list[index] = value;
    setAbout({ ...about, certifications: list });
  };

  const addCertification = () => {
    setAbout({ ...about, certifications: [...certifications, ''] });
  };

  const removeCertification = (index: number) => {
    const list = certifications.filter((_, i) => i !== index);
    setAbout({ ...about, certifications: list });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="border-b border-[#e5e2da] pb-5">
        <h1 className="font-display font-bold text-3xl text-brand-dark mb-2">About Section</h1>
        <p className="text-[#5e5e5e] text-sm">Edit your profile description, milestones, engineering principles, publications, and certifications.</p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm font-semibold">
          {error}
        </div>
      )}

      <div className="bg-white border border-[#e5e2da] rounded-[32px] p-8 shadow-sm space-y-8">
        
        {/* Bios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-brand-dark mb-1.5">Primary Bio Paragraph</label>
            <textarea
              name="bio"
              value={about.bio || ''}
              onChange={(e) => setAbout({ ...about, bio: e.target.value })}
              rows={6}
              className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange text-sm leading-relaxed"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-brand-dark mb-1.5">Second Bio Paragraph</label>
            <textarea
              name="bioSecond"
              value={about.bioSecond || ''}
              onChange={(e) => setAbout({ ...about, bioSecond: e.target.value })}
              rows={6}
              className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange text-sm leading-relaxed"
            />
          </div>
        </div>

        {/* Core Skills */}
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-1.5">Core Skills (one per line)</label>
          <textarea
            name="coreSkills"
            value={coreSkills.join('\n')}
            onChange={(e) => setAbout({ ...about, coreSkills: e.target.value.split('\n').map((s) => s.trim()).filter(Boolean) })}
            rows={5}
            className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange text-sm font-mono leading-relaxed"
          />
        </div>

        <hr className="border-[#e5e2da]" />

        {/* Milestones dynamic list */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-bold text-brand-dark">Milestones</label>
            <button
              onClick={addMilestone}
              type="button"
              className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white rounded-lg transition-colors"
            >
              <Plus size={14} />
              Add Milestone
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {milestones.map((m, idx) => (
              <div key={idx} className="p-4 border border-[#e5e2da] rounded-2xl bg-[#fcfbf9] relative space-y-3 shadow-sm">
                <button
                  type="button"
                  onClick={() => removeMilestone(idx)}
                  className="absolute top-3 right-3 text-neutral-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
                <div className="pr-6">
                  <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-0.5">Value (e.g. 3+)</label>
                  <input
                    type="text"
                    value={m.number || ''}
                    onChange={(e) => updateMilestone(idx, 'number', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#e5e2da] bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-0.5">Label (e.g. Years Experience)</label>
                  <input
                    type="text"
                    value={m.label || ''}
                    onChange={(e) => updateMilestone(idx, 'label', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#e5e2da] bg-white focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-[#e5e2da]" />

        {/* Principles dynamic list */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-bold text-brand-dark">Engineering Principles</label>
            <button
              onClick={addPrinciple}
              type="button"
              className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white rounded-lg transition-colors"
            >
              <Plus size={14} />
              Add Principle
            </button>
          </div>
          <div className="space-y-4">
            {principles.map((p, idx) => (
              <div key={idx} className="p-4 border border-[#e5e2da] rounded-2xl bg-[#fcfbf9] relative space-y-3 shadow-sm">
                <button
                  type="button"
                  onClick={() => removePrinciple(idx)}
                  className="absolute top-4 right-4 text-neutral-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-0.5">Title</label>
                    <input
                      type="text"
                      value={p.title || ''}
                      onChange={(e) => updatePrinciple(idx, 'title', e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#e5e2da] bg-white focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-0.5">Description</label>
                    <input
                      type="text"
                      value={p.desc || ''}
                      onChange={(e) => updatePrinciple(idx, 'desc', e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#e5e2da] bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-[#e5e2da]" />

        {/* Publications dynamic list */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-bold text-brand-dark">Publications</label>
            <button
              onClick={addPublication}
              type="button"
              className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white rounded-lg transition-colors"
            >
              <Plus size={14} />
              Add Publication
            </button>
          </div>
          <div className="space-y-3">
            {publications.map((pub, idx) => (
              <div key={idx} className="flex gap-3 items-center">
                <input
                  type="text"
                  value={pub.title || ''}
                  onChange={(e) => updatePublication(idx, e.target.value)}
                  className="flex-grow px-4 py-2.5 text-sm rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange"
                  placeholder="Enter publication title..."
                />
                <button
                  type="button"
                  onClick={() => removePublication(idx)}
                  className="p-2 border border-[#e5e2da] hover:border-red-200 hover:bg-red-50 text-neutral-400 hover:text-red-600 rounded-xl transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-[#e5e2da]" />

        {/* Certifications dynamic list */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-bold text-brand-dark">Certifications</label>
            <button
              onClick={addCertification}
              type="button"
              className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white rounded-lg transition-colors"
            >
              <Plus size={14} />
              Add Certification
            </button>
          </div>
          <div className="space-y-3">
            {certifications.map((cert, idx) => (
              <div key={idx} className="flex gap-3 items-center">
                <input
                  type="text"
                  value={cert || ''}
                  onChange={(e) => updateCertification(idx, e.target.value)}
                  className="flex-grow px-4 py-2.5 text-sm rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange"
                  placeholder="Enter certification name..."
                />
                <button
                  type="button"
                  onClick={() => removeCertification(idx)}
                  className="p-2 border border-[#e5e2da] hover:border-red-200 hover:bg-red-50 text-neutral-400 hover:text-red-600 rounded-xl transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-brand-dark hover:bg-brand-orange text-white font-display font-bold py-3.5 rounded-xl transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save About Settings'}
        </button>
      </div>
    </div>
  );
}
