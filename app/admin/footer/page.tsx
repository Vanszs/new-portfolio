'use client';
import { useEffect, useState } from 'react';
import AdminLoading from '../components/AdminLoading';
import type { FooterConfig } from '@prisma/client';
import { Plus, Trash2 } from 'lucide-react';

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

        <div className="space-y-4">
          <label className="block text-sm font-semibold text-brand-dark">Social Links</label>
          <div className="space-y-3">
            {socialLinks.map((link: any, idx: number) => (
              <div key={idx} className="flex gap-3 items-start bg-[#fcfbf9] p-4 rounded-2xl border border-[#e5e2da]">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#8c8c8c] mb-1">Platform</label>
                    <input
                      type="text"
                      placeholder="e.g. Instagram"
                      value={link.platform || ''}
                      onChange={(e) => {
                        const newLinks = [...socialLinks];
                        newLinks[idx] = { ...newLinks[idx], platform: e.target.value };
                        setFooter({ ...footer, socialLinks: newLinks });
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-[#e5e2da] bg-white focus:outline-none focus:border-brand-orange text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#8c8c8c] mb-1">URL</label>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={link.url || ''}
                      onChange={(e) => {
                        const newLinks = [...socialLinks];
                        newLinks[idx] = { ...newLinks[idx], url: e.target.value };
                        setFooter({ ...footer, socialLinks: newLinks });
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-[#e5e2da] bg-white focus:outline-none focus:border-brand-orange text-sm"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newLinks = socialLinks.filter((_: any, i: number) => i !== idx);
                    setFooter({ ...footer, socialLinks: newLinks });
                  }}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-5 self-center"
                  title="Remove Link"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              setFooter({ ...footer, socialLinks: [...socialLinks, { platform: '', url: '' }] });
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-brand-dark text-brand-dark rounded-xl text-sm font-semibold hover:bg-[#f3f2ee] transition-colors"
          >
            <Plus size={16} /> Add Social Link
          </button>
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
