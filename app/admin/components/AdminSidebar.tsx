'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { LayoutDashboard, Image, Layers, User, Briefcase, BookOpen, MessageSquare, Share2, LogOut } from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/hero', label: 'Hero', icon: Image },
  { href: '/admin/services', label: 'Services', icon: Layers },
  { href: '/admin/about', label: 'About', icon: User },
  { href: '/admin/projects', label: 'Projects', icon: Briefcase },
  { href: '/admin/blogs', label: 'Blogs', icon: BookOpen },
  { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
  { href: '/admin/footer', label: 'Footer', icon: Share2 },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-[#e5e2da] sticky top-0 h-screen flex flex-col">
      <div className="p-6 border-b border-[#e5e2da]">
        <Link href="/admin" prefetch={false} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center">
            <span className="text-white font-display font-bold">B</span>
          </div>
          <span className="font-display font-bold text-xl text-brand-dark">
            Bevan<span className="text-brand-orange">.</span>
          </span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                active
                  ? 'bg-brand-dark text-white'
                  : 'text-[#5e5e5e] hover:bg-[#f3f2ee] hover:text-brand-dark'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-[#e5e2da]">
        <button
          onClick={() => signOut({ redirectTo: '/admin/login' })}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-[#5e5e5e] hover:bg-[#f3f2ee] hover:text-brand-dark font-medium transition-all"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
