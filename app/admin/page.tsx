import { prisma } from '@/lib/prisma';
import { Briefcase, Layers, BookOpen, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboardPage() {
  const [projectsCount, servicesCount, blogsCount, testimonialsCount] = await Promise.all([
    prisma.project.count(),
    prisma.service.count(),
    prisma.blog.count(),
    prisma.testimonial.count(),
  ]);

  const stats = [
    { label: 'Projects', count: projectsCount, icon: Briefcase, href: '/admin/projects', color: 'bg-blue-500' },
    { label: 'Services', count: servicesCount, icon: Layers, href: '/admin/services', color: 'bg-brand-orange' },
    { label: 'Blogs', count: blogsCount, icon: BookOpen, href: '/admin/blogs', color: 'bg-purple-500' },
    { label: 'Testimonials', count: testimonialsCount, icon: MessageSquare, href: '/admin/testimonials', color: 'bg-green-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-3xl text-brand-dark mb-2">Dashboard</h1>
        <p className="text-[#5e5e5e]">Manage your portfolio content from one place.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white border border-[#e5e2da] rounded-3xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-2xl ${stat.color} text-white flex items-center justify-center mb-4`}>
                <Icon size={24} />
              </div>
              <div className="font-display font-bold text-3xl text-brand-dark">{stat.count}</div>
              <div className="text-[#5e5e5e] font-medium">{stat.label}</div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-[#e5e2da] rounded-3xl p-6 shadow-sm">
          <h2 className="font-display font-bold text-xl text-brand-dark mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Edit Hero', href: '/admin/hero' },
              { label: 'Edit About', href: '/admin/about' },
              { label: 'Edit Footer', href: '/admin/footer' },
              { label: 'Manage Projects', href: '/admin/projects' },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="px-4 py-3 bg-[#f3f2ee] hover:bg-brand-dark hover:text-white rounded-xl font-medium text-brand-dark transition-colors text-center"
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white border border-[#e5e2da] rounded-3xl p-6 shadow-sm">
          <h2 className="font-display font-bold text-xl text-brand-dark mb-4">Backup Info</h2>
          <p className="text-[#5e5e5e]">
            Every edit/delete automatically creates a backup. Up to 2 backups are kept per record.
          </p>
        </div>
      </div>
    </div>
  );
}
