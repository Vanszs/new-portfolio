'use client';
import { useEffect, useState } from 'react';

export default function AdminHeader() {
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
    <header className="bg-white border-b border-[#e5e2da] px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <h1 className="font-display font-bold text-xl text-brand-dark">Admin Dashboard</h1>
      <div className="flex items-center gap-3">
        <span className="text-sm text-[#5e5e5e]">{session?.user?.email || ''}</span>
        <div className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center font-display font-bold text-sm">
          {session?.user?.name?.[0] || 'A'}
        </div>
      </div>
    </header>
  );
}

