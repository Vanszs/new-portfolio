'use client';
import { useEffect, useState } from 'react';
import AdminLoading from '../components/AdminLoading';
import ImageUpload from '../components/ImageUpload';
import type { HeroConfig } from '@prisma/client';

export default function HeroAdminPage() {
  const [hero, setHero] = useState<Partial<HeroConfig>>({
    headline: '',
    subtitle: '',
    imageUrl: '',
    tagline: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchHero = async () => {
    const res = await fetch('/api/admin/hero');
    const data = await res.json();
    if (data) setHero(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchHero();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch('/api/admin/hero', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(hero),
    });
    if (res.ok) fetchHero();
    setSaving(false);
  };

  if (loading) return <AdminLoading />;

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display font-bold text-3xl text-brand-dark mb-2">Hero Section</h1>
        <p className="text-[#5e5e5e]">Edit the main hero section of your portfolio.</p>
      </div>

      <div className="bg-white border border-[#e5e2da] rounded-3xl p-8 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-1">Tagline</label>
          <input
            type="text"
            value={hero.tagline || ''}
            onChange={(e) => setHero({ ...hero, tagline: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-1">Headline</label>
          <input
            type="text"
            value={hero.headline || ''}
            onChange={(e) => setHero({ ...hero, headline: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-1">Subtitle</label>
          <textarea
            value={hero.subtitle || ''}
            onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-1">Hero Image</label>
          <ImageUpload value={hero.imageUrl || ''} onChange={(url) => setHero({ ...hero, imageUrl: url })} />
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-brand-dark hover:bg-brand-orange text-white font-display font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Hero'}
        </button>
      </div>
    </div>
  );
}
