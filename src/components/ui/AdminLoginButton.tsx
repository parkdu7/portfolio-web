'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AdminLoginModal } from './AdminLoginModal';

export function AdminLoginButton() {
  const { isAdmin } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-40 w-6 h-6 flex items-center justify-center opacity-0 hover:opacity-30 transition-opacity duration-300"
        aria-label="Admin login"
      >
        {isAdmin ? (
          <span className="w-2 h-2 rounded-full bg-green-400" />
        ) : (
          <span className="w-2 h-2 rounded-full bg-[var(--fg-muted)]" />
        )}
      </button>
      <AdminLoginModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
