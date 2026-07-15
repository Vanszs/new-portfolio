'use client';
import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';

interface AdminHeaderProps {
  onMenuOpen: () => void;
}

export default function AdminHeader({ onMenuOpen }: AdminHeaderProps) {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => {
        if (data && Object.keys(data).length > 0) {
          setSession(data);
        }
      })
      .catch((err) => console.error('Failed to load session', err));
  }, []);

  return (
    <header className="bg-white border-b border-[#e5e2da] px-4 md:px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuOpen}
          className="md:hidden p-2 rounded-lg text-[#5e5e5e] hover:bg-[#f3f2ee]"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <h1 className="font-display font-bold text-lg md:text-xl text-brand-dark">Admin Dashboard</h1>
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        <span className="hidden sm:block text-sm text-[#5e5e5e] truncate max-w-[160px]">
          {session?.user?.email || ''}
        </span>
        <div className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center font-display font-bold text-sm shrink-0">
          {session?.user?.name?.[0] || 'A'}
        </div>
      </div>
    </header>
  );
}
