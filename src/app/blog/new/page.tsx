'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BlogEditor, extractSummary } from '@/components/blog/BlogEditor';
import { BlogHeader } from '@/components/blog/BlogHeader';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

export default function NewPostPage() {
  const router = useRouter();
  const { isAdmin } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-(--bg)">
        <BlogHeader />
        <div className="flex items-center justify-center py-32">
          <p className="text-(--fg-muted)">접근 권한이 없습니다.</p>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) { setError('제목과 내용을 입력해주세요.'); return; }
    setSaving(true);
    setError('');
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch('/api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token}` },
      body: JSON.stringify({ title, content, summary: extractSummary(content) }),
    });
    setSaving(false);
    if (res.ok) {
      const post = await res.json();
      router.push(`/blog/${post.id}`);
    } else {
      setError('저장에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-(--bg)">
      <BlogHeader />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <BlogEditor
          title={title}
          content={content}
          onTitleChange={setTitle}
          onContentChange={setContent}
          onSave={handleSave}
          saving={saving}
          saveLabel="발행"
          error={error}
        />
      </main>
    </div>
  );
}
