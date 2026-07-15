'use client';
import { useEffect, useState } from 'react';
import CrudList from '../components/CrudList';
import AdminLoading from '../components/AdminLoading';
import type { Service } from '@prisma/client';

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    const res = await fetch('/api/admin/services');
    const data = await res.json();
    setServices(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  if (loading) return <AdminLoading />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-3xl text-brand-dark mb-2">Services</h1>
        <p className="text-[#5e5e5e]">Manage the services you offer.</p>
      </div>

      <CrudList<Service>
        title="Services"
        items={services}
        apiPath="/api/admin/services"
        onRefresh={fetchServices}
        emptyItem={{ title: '', description: '', tags: [], order: services.length + 1 }}
        renderForm={(item, onChange) => (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1">Title</label>
              <input
                type="text"
                value={(item as Service).title || ''}
                onChange={(e) => onChange({ ...item, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1">Tags (comma separated)</label>
              <input
                type="text"
                value={((item as Service).tags || []).join(', ')}
                onChange={(e) => onChange({ ...item, tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) })}
                className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1">Description</label>
              <textarea
                value={(item as Service).description || ''}
                onChange={(e) => onChange({ ...item, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1">Order</label>
              <input
                type="number"
                value={(item as Service).order || 0}
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
