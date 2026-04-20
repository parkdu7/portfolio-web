'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminLoginModal({ isOpen, onClose }: Props) {
  const { isAdmin, signOut } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({
      email: 'tmdrbs0925@gmail.com',
      password,
    });
    setLoading(false);
    if (error) {
      setError('비밀번호가 올바르지 않습니다.');
    } else {
      setPassword('');
      onClose();
    }
  };

  const handleLogout = async () => {
    await signOut();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-80 rounded-2xl bg-[var(--nav-bg)] border border-[var(--nav-border)] p-6 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <Lock size={16} className="text-[var(--fg-muted)]" />
              <span className="text-sm font-medium text-[var(--fg)]">Admin</span>
            </div>

            {isAdmin ? (
              <div className="space-y-3">
                <p className="text-sm text-[var(--fg-muted)]">로그인 되어있습니다.</p>
                <button
                  onClick={handleLogout}
                  className="w-full py-2 rounded-xl text-sm font-medium bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-3">
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="비밀번호"
                  autoFocus
                  className="w-full px-3 py-2 rounded-xl text-sm bg-white/5 border border-[var(--nav-border)] text-[var(--fg)] placeholder:text-[var(--fg-muted)] outline-none focus:border-primary-500 transition-colors"
                />
                {error && <p className="text-xs text-red-500">{error}</p>}
                <button
                  type="submit"
                  disabled={loading || !password}
                  className="w-full py-2 rounded-xl text-sm font-medium bg-primary-500 text-white hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? '로그인 중...' : '로그인'}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
