'use client';
import { useEffect, useState } from 'react';
import AdminLoading from '../components/AdminLoading';
import type { FooterConfig } from '@prisma/client';

export default function FooterAdminPage() {
  const [footer, setFooter] = useState<Partial<FooterConfig>>({
    brandText: '',
    socialLinks: [],
    copyrightText: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchFooter = async () => {
    try {
      const res = await fetch('/api/admin/footer');
      if (res.status === 401 || res.status === 403) {
        window.location.href = '/admin/login';
        return;
      }
      const data = await res.json();
      if (data) setFooter(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFooter();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch('/api/admin/footer', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(footer),
    });
    if (res.ok) fetchFooter();
    setSaving(false);
  };

  if (loading) return <AdminLoading />;

  const socialLinks = (footer.socialLinks as any[]) || [];

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display font-bold text-3xl text-brand-dark mb-2">Footer</h1>
        <p className="text-[#5e5e5e]">Edit footer content and social links.</p>
      </div>

      <div className="bg-white border border-[#e5e2da] rounded-3xl p-8 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-1">Brand Text</label>
          <textarea
            name="brandText"
            value={footer.brandText || ''}
            onChange={(e) => setFooter({ ...footer, brandText: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-1">Copyright Text</label>
          <input
            type="text"
            name="copyrightText"
            value={footer.copyrightText || ''}
            onChange={(e) => setFooter({ ...footer, copyrightText: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-1">Social Links (JSON array)</label>
          <textarea
            name="socialLinks"
            value={JSON.stringify(socialLinks, null, 2)}
            onChange={(e) => {
              try {
                setFooter({ ...footer, socialLinks: JSON.parse(e.target.value) });
              } catch {}
            }}
            rows={10}
            className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange font-mono text-sm"
          />
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-brand-dark hover:bg-brand-orange text-white font-display font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Footer'}
        </button>
      </div>
    </div>
  );
}
