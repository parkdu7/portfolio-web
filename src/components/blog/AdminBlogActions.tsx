'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PenLine, Pencil, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';

export function NewPostButton() {
  const { isAdmin } = useAuth();
  if (!isAdmin) return null;
  return (
    <Link
      href="/blog/new"
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-500 text-white text-xs font-semibold hover:bg-primary-600 transition-colors"
    >
      <PenLine size={12} />새 글
    </Link>
  );
}

export function PostAdminActions({ id }: { id: string }) {
  const { isAdmin } = useAuth();
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  if (!isAdmin) return null;

  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    setDeleting(true);
    const { data: { session } } = await supabase.auth.getSession();
    await fetch(`/api/blog/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${session?.access_token}` },
    });
    router.push('/blog');
  };

  return (
    <>
      <Link
        href={`/blog/${id}/edit`}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-(--fg-muted) hover:text-(--fg) hover:bg-white/10 transition-colors"
      >
        <Pencil size={13} />수정
      </Link>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-50"
      >
        <Trash2 size={13} />삭제
      </button>
    </>
  );
}
