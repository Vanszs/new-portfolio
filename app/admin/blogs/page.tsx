'use client';
import { useEffect, useState } from 'react';
import CrudList from '../components/CrudList';
import AdminLoading from '../components/AdminLoading';
import ImageUpload from '../components/ImageUpload';
import type { Blog } from '@prisma/client';

export default function BlogsAdminPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/admin/blogs');
      if (res.status === 401 || res.status === 403) {
        window.location.href = '/admin/login';
        return;
      }
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) return <AdminLoading />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-3xl text-brand-dark mb-2">Blogs</h1>
        <p className="text-[#5e5e5e]">Manage your blog posts.</p>
      </div>

      <CrudList<Blog>
        title="Blogs"
        items={blogs}
        apiPath="/api/admin/blogs"
        onRefresh={fetchBlogs}
        emptyItem={{ title: '', category: '', date: '', readTime: '', image: '', description: '', order: blogs.length + 1 }}
        renderForm={(item, onChange) => (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={(item as Blog).title || ''}
                onChange={(e) => onChange({ ...item, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-1">Category</label>
                <input
                  type="text"
                  name="category"
                  value={(item as Blog).category || ''}
                  onChange={(e) => onChange({ ...item, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-1">Read Time</label>
                <input
                  type="text"
                  name="readTime"
                  value={(item as Blog).readTime || ''}
                  onChange={(e) => onChange({ ...item, readTime: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1">Date</label>
              <input
                type="text"
                name="date"
                value={(item as Blog).date || ''}
                onChange={(e) => onChange({ ...item, date: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#e5e2da] bg-[#fcfbf9] focus:outline-none focus:border-brand-orange"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1">Image</label>
              <ImageUpload
                value={(item as Blog).image || ''}
                onChange={(url) => onChange({ ...item, image: url })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1">Description</label>
              <textarea
                name="description"
                value={(item as Blog).description || ''}
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
                value={(item as Blog).order || 0}
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
