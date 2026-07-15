'use client';
import { ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-brand-bg">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg flex">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader onMenuOpen={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
