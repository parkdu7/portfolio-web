import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { BlogHeader } from '@/components/blog/BlogHeader';
import { NewPostButton } from '@/components/blog/AdminBlogActions';
import type { Metadata } from 'next';
import type { BlogPost } from '@/types';

export const metadata: Metadata = {
  title: '블로그 | 박승균',
  description: '박승균의 개발 블로그 — Android, Web, Backend 개발 이야기',
};

type PostSummary = Pick<BlogPost, 'id' | 'title' | 'summary' | 'created_at'>;

async function getPosts(): Promise<PostSummary[]> {
  const { data } = await supabase
    .from('blog_posts')
    .select('id, title, summary, created_at')
    .order('created_at', { ascending: false });
  return data ?? [];
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-(--bg)">
      <BlogHeader actions={<NewPostButton />} />

      <main className="max-w-5xl mx-auto px-8 py-16">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center py-32">
            <p className="text-(--fg-muted) text-sm">아직 작성된 글이 없습니다.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="block group">
                <div className="flex items-center justify-between px-6 py-5 rounded-xl
                                border-l-4 border-l-primary-500/40 border border-white/8
                                bg-white/2 hover:bg-white/5 hover:border-l-primary-500
                                hover:border-white/15 transition-all duration-200">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-base font-semibold text-(--fg) group-hover:text-primary-500 transition-colors truncate">
                      {post.title}
                    </h2>
                    {post.summary && (
                      <p className="text-xs text-(--fg-muted) truncate mt-1">{post.summary}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-(--fg-muted) ml-4 shrink-0">
                    <Calendar size={10} />
                    <span>{new Date(post.created_at).toLocaleDateString('ko-KR')}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
