'use client';

import { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Bold, Heading1, Heading2, Heading3, List, Eye, EyeOff, Type } from 'lucide-react';
import { cn } from '@/lib/utils';

const COLORS = [
  { label: '기본',   value: 'inherit' },
  { label: '빨강',   value: '#ef4444' },
  { label: '주황',   value: '#f97316' },
  { label: '노랑',   value: '#eab308' },
  { label: '초록',   value: '#22c55e' },
  { label: '파랑',   value: '#3b82f6' },
  { label: '보라',   value: '#a855f7' },
];

const SIZES = [
  { label: 'S',  value: '0.8rem' },
  { label: 'M',  value: '1rem'   },
  { label: 'L',  value: '1.25rem' },
  { label: 'XL', value: '1.5rem' },
];

function extractSummary(content: string): string {
  return content
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .replace(/^[-*]\s+/gm, '')
    .replace(/\n+/g, ' ')
    .trim()
    .slice(0, 150);
}

interface Props {
  title: string;
  content: string;
  onTitleChange: (v: string) => void;
  onContentChange: (v: string) => void;
  onSave: () => void;
  saving: boolean;
  saveLabel: string;
  error: string;
}

export function BlogEditor({ title, content, onTitleChange, onContentChange, onSave, saving, saveLabel, error }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [preview, setPreview] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showSizePicker, setShowSizePicker] = useState(false);

  function applyInline(before: string, after: string = before) {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = content.slice(start, end);
    const next = content.slice(0, start) + before + selected + after + content.slice(end);
    onContentChange(next);
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(start + before.length, end + before.length);
    });
  }

  function applyLinePrefix(prefix: string) {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const lineStart = content.lastIndexOf('\n', start - 1) + 1;
    const currentLine = content.slice(lineStart);
    const cleanedLine = currentLine.replace(/^#{1,3}\s|^[-*]\s/, '');
    const next = content.slice(0, lineStart) + prefix + cleanedLine;
    onContentChange(next);
    requestAnimationFrame(() => {
      ta.focus();
      const newPos = lineStart + prefix.length;
      ta.setSelectionRange(newPos, newPos);
    });
  }

  function applyColor(color: string) {
    const ta = textareaRef.current;
    if (!ta) return;
    setShowColorPicker(false);
    if (color === 'inherit') { applyInline('', ''); return; }
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = content.slice(start, end) || '텍스트';
    const tag = `<span style="color:${color}">${selected}</span>`;
    onContentChange(content.slice(0, start) + tag + content.slice(end));
    requestAnimationFrame(() => ta.focus());
  }

  function applySize(size: string) {
    const ta = textareaRef.current;
    if (!ta) return;
    setShowSizePicker(false);
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = content.slice(start, end) || '텍스트';
    const tag = `<span style="font-size:${size}">${selected}</span>`;
    onContentChange(content.slice(0, start) + tag + content.slice(end));
    requestAnimationFrame(() => ta.focus());
  }

  return (
    <div className="flex flex-col gap-0">
      {/* Title */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-(--fg-muted) uppercase tracking-wider mb-2">제목</label>
        <input
          type="text"
          value={title}
          onChange={e => onTitleChange(e.target.value)}
          placeholder="글 제목을 입력하세요"
          className="w-full text-2xl font-bold bg-white/5 border border-white/10 rounded-xl px-4 py-3
                     text-(--fg) placeholder:text-white/20 outline-none focus:border-primary-500/60 transition-colors"
        />
      </div>

      {/* Content area */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-(--fg-muted) uppercase tracking-wider">내용</label>
          <button
            onClick={() => setPreview(p => !p)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-(--fg-muted) hover:text-(--fg) hover:bg-white/10 transition-colors"
          >
            {preview ? <EyeOff size={12} /> : <Eye size={12} />}
            {preview ? '편집' : '미리보기'}
          </button>
        </div>

        {/* Toolbar */}
        {!preview && (
          <div className="flex items-center gap-1 px-3 py-2 bg-white/5 border border-white/10 border-b-0 rounded-t-xl">
            <ToolbarBtn onClick={() => applyInline('**', '**')} title="Bold">
              <Bold size={13} />
            </ToolbarBtn>
            <div className="w-px h-4 bg-white/10 mx-1" />
            <ToolbarBtn onClick={() => applyLinePrefix('# ')} title="H1">
              <Heading1 size={13} />
            </ToolbarBtn>
            <ToolbarBtn onClick={() => applyLinePrefix('## ')} title="H2">
              <Heading2 size={13} />
            </ToolbarBtn>
            <ToolbarBtn onClick={() => applyLinePrefix('### ')} title="H3">
              <Heading3 size={13} />
            </ToolbarBtn>
            <div className="w-px h-4 bg-white/10 mx-1" />
            <ToolbarBtn onClick={() => applyLinePrefix('- ')} title="목록">
              <List size={13} />
            </ToolbarBtn>
            <div className="w-px h-4 bg-white/10 mx-1" />

            {/* Color picker */}
            <div className="relative">
              <ToolbarBtn onClick={() => { setShowColorPicker(p => !p); setShowSizePicker(false); }} title="글자 색">
                <span className="text-[11px] font-bold leading-none">A</span>
                <span className="w-full h-0.5 bg-gradient-to-r from-red-400 via-green-400 to-blue-400 absolute bottom-0.5 left-0 rounded" />
              </ToolbarBtn>
              {showColorPicker && (
                <div className="absolute top-8 left-0 z-50 p-2 rounded-xl bg-[var(--nav-bg)] border border-white/10 shadow-xl flex gap-1.5">
                  {COLORS.map(c => (
                    <button
                      key={c.value}
                      title={c.label}
                      onClick={() => applyColor(c.value)}
                      className="w-5 h-5 rounded-full border border-white/20 hover:scale-125 transition-transform"
                      style={{ background: c.value === 'inherit' ? 'var(--fg)' : c.value }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Size picker */}
            <div className="relative">
              <ToolbarBtn onClick={() => { setShowSizePicker(p => !p); setShowColorPicker(false); }} title="글자 크기">
                <Type size={13} />
              </ToolbarBtn>
              {showSizePicker && (
                <div className="absolute top-8 left-0 z-50 p-1 rounded-xl bg-[var(--nav-bg)] border border-white/10 shadow-xl flex flex-col gap-0.5">
                  {SIZES.map(s => (
                    <button
                      key={s.value}
                      onClick={() => applySize(s.value)}
                      className="px-3 py-1 rounded-lg text-left hover:bg-white/10 transition-colors text-(--fg)"
                      style={{ fontSize: s.value }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="ml-auto flex items-center gap-2">
              {error && <span className="text-xs text-red-500">{error}</span>}
              <button
                onClick={onSave}
                disabled={saving}
                className="px-4 py-1.5 rounded-lg bg-primary-500 text-white text-xs font-semibold hover:bg-primary-600 disabled:opacity-50 transition-colors"
              >
                {saving ? '저장 중...' : saveLabel}
              </button>
            </div>
          </div>
        )}

        {/* Editor / Preview */}
        {preview ? (
          <div className="min-h-[60vh] p-5 bg-white/3 border border-white/10 rounded-xl blog-prose">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {content || '*내용을 입력하세요*'}
            </ReactMarkdown>
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            value={content}
            onChange={e => onContentChange(e.target.value)}
            placeholder={'마크다운으로 작성하세요...\n\n# 제목 1\n## 제목 2\n\n- 목록 항목\n\n**굵게**  *기울임*\n\n```\n코드 블록\n```'}
            className="w-full min-h-[60vh] bg-white/3 border border-white/10 rounded-b-xl px-4 py-4
                       text-sm text-(--fg) placeholder:text-white/15 outline-none
                       resize-none font-mono leading-relaxed
                       focus:border-primary-500/40 transition-colors"
          />
        )}
      </div>
    </div>
  );
}

function ToolbarBtn({ onClick, title, children }: { onClick: () => void; title: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="relative w-7 h-7 flex items-center justify-center rounded-lg text-(--fg-muted) hover:text-(--fg) hover:bg-white/10 transition-colors"
    >
      {children}
    </button>
  );
}

export { extractSummary };
