'use client';
import { useEffect, useState } from 'react';
import CrudList from '../components/CrudList';
import AdminLoading from '../components/AdminLoading';
import ImageUpload from '../components/ImageUpload';
import type { Testimonial } from '@prisma/client';

export default function TestimonialsAdminPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = async () => {
    const res = await fetch('/api/admin/testimonials');
    const data = await res.json();
    setTestimonials(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  if (loading) return <AdminLoading />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-3xl text-brand-dark mb-2">Testimonials</h1>
        <p className="text-[#5e5e5e]">Manage partner testimonials.</p>
      </div>

      <CrudList<Testimonial>
        title="Testimonials"
        items={testimonials}
        apiPath="/api/admin/testimonials"
        onRefresh={fetchTestimonials}
        emptyItem={{ name: '', role: '', company: '', avatar: '', text: '', rating: 5, order: testimonials.length + 1 }}
        renderForm={(item, onChange) => (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-1">Name</label>
                <input
                  type="text"
                  value={(item as Testimonial).name || ''}
                  onChange={(e) => onChange({ ...item, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-1">Rating</label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={(item as Testimonial).rating || 5}
                  onChange={(e) => onChange({ ...item, rating: parseInt(e.target.value) || 5 })}
                  className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-1">Role</label>
                <input
                  type="text"
                  value={(item as Testimonial).role || ''}
                  onChange={(e) => onChange({ ...item, role: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-1">Company</label>
                <input
                  type="text"
                  value={(item as Testimonial).company || ''}
                  onChange={(e) => onChange({ ...item, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1">Avatar</label>
              <ImageUpload
                value={(item as Testimonial).avatar || ''}
                onChange={(url) => onChange({ ...item, avatar: url })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1">Testimonial Text</label>
              <textarea
                value={(item as Testimonial).text || ''}
                onChange={(e) => onChange({ ...item, text: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1">Order</label>
              <input
                type="number"
                value={(item as Testimonial).order || 0}
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
