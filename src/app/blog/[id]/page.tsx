'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Pencil, Trash2, Calendar, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { BlogHeader } from '@/components/blog/BlogHeader';
import type { BlogPost } from '@/types';

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { isAdmin } = useAuth();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch(`/api/blog/${id}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { setPost(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

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

  const adminActions = isAdmin && post ? (
    <>
      <Link
        href={`/blog/${id}/edit`}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-(--fg-muted) hover:text-(--fg) hover:bg-white/10 transition-colors"
      >
        <Pencil size={13} />
        수정
      </Link>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-50"
      >
        <Trash2 size={13} />
        삭제
      </button>
    </>
  ) : null;

  if (loading) return (
    <div className="min-h-screen bg-(--bg)">
      <BlogHeader />
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-4">
        <div className="h-8 w-2/3 rounded-lg bg-white/5 animate-pulse" />
        <div className="h-4 w-1/4 rounded bg-white/5 animate-pulse" />
        <div className="space-y-3 mt-8">
          {[...Array(8)].map((_, i) => <div key={i} className="h-4 rounded bg-white/5 animate-pulse" />)}
        </div>
      </div>
    </div>
  );

  if (!post) return (
    <div className="min-h-screen bg-(--bg)">
      <BlogHeader />
      <div className="flex items-center justify-center py-32">
        <p className="text-(--fg-muted)">글을 찾을 수 없습니다.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-(--bg)">
      <BlogHeader actions={adminActions} />

      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto px-6 py-12"
      >
        {/* Back to list */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-(--fg-muted) hover:text-primary-500 transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          목록으로
        </Link>

        <h1 className="text-3xl font-bold text-(--fg) mb-3 leading-tight">{post.title}</h1>
        <div className="flex items-center gap-1.5 text-xs text-(--fg-muted) mb-10 pb-8 border-b border-white/8">
          <Calendar size={11} />
          <span>{new Date(post.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>

        <div className="blog-prose">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{post.content}</ReactMarkdown>
        </div>
      </motion.main>
    </div>
  );
}
