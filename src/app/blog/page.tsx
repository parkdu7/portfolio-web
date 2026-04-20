"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { PenLine, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { BlogHeader } from "@/components/blog/BlogHeader";
import type { BlogPost } from "@/types";

type PostSummary = Pick<BlogPost, "id" | "title" | "summary" | "created_at">;

export default function BlogPage() {
    const { isAdmin } = useAuth();
    const [posts, setPosts] = useState<PostSummary[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/blog")
            .then((r) => r.json())
            .then((data) => {
                setPosts(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const actions = isAdmin ? (
        <Link
            href='/blog/new'
            className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-500 text-white text-xs font-semibold hover:bg-primary-600 transition-colors'
        >
            <PenLine size={12} />새 글
        </Link>
    ) : null;

    return (
        <div className='min-h-screen bg-(--bg)'>
            <BlogHeader actions={actions} />

            <main className='max-w-5xl mx-auto px-8 py-16'>
                {loading ? (
                    <div className='space-y-3'>
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className='h-20 rounded-xl bg-white/5 animate-pulse' />
                        ))}
                    </div>
                ) : posts.length === 0 ? (
                    <div className='flex flex-col items-center py-32 gap-3'>
                        <p className='text-(--fg-muted) text-sm'>아직 작성된 글이 없습니다.</p>
                    </div>
                ) : (
                    <div className='flex flex-col gap-3'>
                        {posts.map((post, i) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.04 }}
                            >
                                <Link href={`/blog/${post.id}`} className='block group'>
                                    <div className='flex items-center justify-between px-6 py-5 rounded-xl
                                                    border-l-4 border-l-primary-500/40 border border-white/8
                                                    bg-white/2 hover:bg-white/5 hover:border-l-primary-500
                                                    hover:border-white/15 transition-all duration-200'>
                                        <div className='flex-1 min-w-0'>
                                            <h2 className='text-base font-semibold text-(--fg) group-hover:text-primary-500 transition-colors truncate'>
                                                {post.title}
                                            </h2>
                                            {post.summary && (
                                                <p className='text-xs text-(--fg-muted) truncate mt-1'>
                                                    {post.summary}
                                                </p>
                                            )}
                                        </div>
                                        <div className='flex items-center gap-1 text-xs text-(--fg-muted) ml-4 shrink-0'>
                                            <Calendar size={10} />
                                            <span>{new Date(post.created_at).toLocaleDateString('ko-KR')}</span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
