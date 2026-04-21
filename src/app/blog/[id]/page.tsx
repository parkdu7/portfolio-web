import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { supabase } from '@/lib/supabase';
import { BlogHeader } from '@/components/blog/BlogHeader';
import { PostAdminActions } from '@/components/blog/AdminBlogActions';
import type { Metadata } from 'next';
import type { BlogPost } from '@/types';

async function getPost(id: string): Promise<BlogPost | null> {
  const { data } = await supabase.from('blog_posts').select('*').eq('id', id).single();
  return data ?? null;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) return { title: '글을 찾을 수 없습니다' };
  return {
    title: `${post.title} | 박승균의 블로그`,
    description: post.summary ?? post.content.slice(0, 150).replace(/[#*`>\-]/g, '').trim(),
    openGraph: {
      title: post.title,
      description: post.summary ?? undefined,
      type: 'article',
      publishedTime: post.created_at,
      authors: ['박승균'],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-(--bg)">
      <BlogHeader actions={<PostAdminActions id={id} />} />

      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-(--fg-muted) hover:text-primary-500 transition-colors mb-8"
        >
          <ArrowLeft size={14} />목록으로
        </Link>

        <h1 className="text-3xl font-bold text-(--fg) mb-3 leading-tight">{post.title}</h1>
        <div className="flex items-center gap-1.5 text-xs text-(--fg-muted) mb-10 pb-8 border-b border-white/8">
          <Calendar size={11} />
          <span>{new Date(post.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>

        <div className="blog-prose">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{post.content}</ReactMarkdown>
        </div>
      </main>
    </div>
  );
}
