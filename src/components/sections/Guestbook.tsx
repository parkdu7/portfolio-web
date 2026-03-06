"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
    Send,
    Loader2,
    MessageSquare,
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { supabase, type GuestbookEntry } from "@/lib/supabase";

const COOLDOWN_MS = 5 * 1000; // 5초
const COOLDOWN_KEY = "guestbook_last_post";
const MAX_NAME = 20;
const MAX_MSG = 200;
const PAGE_SIZE = 16;

function timeAgo(dateStr: string, justNow: string, lang: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const sec = Math.floor(diff / 1000);
    if (sec < 60) return justNow;
    const min = Math.floor(sec / 60);
    if (min < 60) return lang === "ko" ? `${min}분 전` : `${min}m ago`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return lang === "ko" ? `${hr}시간 전` : `${hr}h ago`;
    const day = Math.floor(hr / 24);
    if (day < 7) return lang === "ko" ? `${day}일 전` : `${day}d ago`;
    return new Date(dateStr).toLocaleDateString(
        lang === "ko" ? "ko-KR" : "en-US",
        {
            year: "numeric",
            month: "short",
            day: "numeric",
        },
    );
}

function SkeletonCard() {
    return (
        <div className='glass-card rounded-2xl p-5 flex flex-col gap-3 animate-pulse break-inside-avoid mb-4'>
            <div className='h-3.5 w-1/3 rounded-full bg-[var(--border)]' />
            <div className='h-3 w-full rounded-full bg-[var(--border)]' />
            <div className='h-3 w-2/3 rounded-full bg-[var(--border)]' />
            <div className='h-2.5 w-1/4 rounded-full bg-[var(--border)] mt-1' />
        </div>
    );
}

const AVATAR_COLORS = [
    "bg-primary-500/15 text-primary-500",
    "bg-emerald-500/15 text-emerald-500",
    "bg-purple-500/15 text-purple-500",
    "bg-amber-500/15 text-amber-500",
    "bg-rose-500/15 text-rose-500",
];

function EntryCard({
    entry,
    index,
    justNow,
    lang,
}: {
    entry: GuestbookEntry;
    index: number;
    justNow: string;
    lang: string;
}) {
    const initials = entry.name.trim().slice(0, 2).toUpperCase();
    const colorClass = AVATAR_COLORS[entry.id % AVATAR_COLORS.length];

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.28,
                delay: index < 8 ? index * 0.04 : 0,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            className='glass-card rounded-2xl p-5 flex flex-col gap-2.5 break-inside-avoid mb-4'
        >
            <div className='flex items-center gap-2.5'>
                <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${colorClass}`}
                >
                    {initials}
                </div>
                <span className='font-semibold text-sm truncate'>
                    {entry.name}
                </span>
            </div>
            <p className='text-sm text-[var(--fg)] leading-relaxed break-words'>
                {entry.message}
            </p>
            <span className='text-xs text-[var(--fg-muted)]'>
                {timeAgo(entry.created_at, justNow, lang)}
            </span>
        </motion.div>
    );
}

export function Guestbook() {
    const { t, lang } = useLang();
    const g = t.guestbook;

    const [entries, setEntries] = useState<GuestbookEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [cooldown, setCooldown] = useState(false);
    const [page, setPage] = useState(0);
    const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

    const totalPages = Math.ceil(entries.length / PAGE_SIZE);
    const visibleEntries = entries.slice(
        page * PAGE_SIZE,
        (page + 1) * PAGE_SIZE,
    );

    useEffect(() => {
        const last = localStorage.getItem(COOLDOWN_KEY);
        if (last && Date.now() - Number(last) < COOLDOWN_MS) setCooldown(true);
    }, []);

    useEffect(() => {
        supabase
            .from("guestbook")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(200)
            .then(({ data }) => {
                if (data) setEntries(data as GuestbookEntry[]);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const channel = supabase
            .channel("guestbook-realtime")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "guestbook" },
                (payload) => {
                    const newEntry = payload.new as GuestbookEntry;
                    setEntries((prev) => {
                        if (prev.some((e) => e.id === newEntry.id)) return prev;
                        return [newEntry, ...prev];
                    });
                },
            )
            .subscribe();

        channelRef.current = channel;
        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (cooldown) {
            setError(g.cooldown);
            return;
        }

        setSubmitting(true);
        setError("");

        const { data: inserted, error: err } = await supabase
            .from("guestbook")
            .insert({ name: name.trim(), message: message.trim() })
            .select()
            .single();

        setSubmitting(false);

        if (err) {
            setError(g.error);
        } else {
            setEntries((prev) => {
                const entry = inserted as GuestbookEntry;
                if (prev.some((e) => e.id === entry.id)) return prev;
                return [entry, ...prev];
            });
            setName("");
            setMessage("");
            setPage(0); // 첫 페이지로 이동해서 새 글 보이게
            localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
            setCooldown(true);
            setTimeout(() => setCooldown(false), COOLDOWN_MS);
        }
    };

    const inputClass =
        "w-full px-4 py-3 rounded-xl bg-[var(--bg)] border border-[var(--card-border)] " +
        "text-[var(--fg)] text-sm placeholder:text-[var(--fg-muted)] " +
        "focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 " +
        "transition-colors disabled:opacity-50";

    return (
        <div className='min-h-screen py-16 px-4 md:px-8'>
            <div className='max-w-6xl mx-auto'>
                {/* 뒤로가기 */}
                <motion.div
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className='mb-10'
                >
                    <Link
                        href='/'
                        className='inline-flex items-center gap-2 text-sm text-[var(--fg-muted)]
                       hover:text-primary-500 transition-colors'
                    >
                        <ArrowLeft size={16} />
                        {lang === "ko" ? "돌아가기" : "Back"}
                    </Link>
                </motion.div>

                {/* 타이틀 */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                    className='mb-2'
                >
                    <h1 className='text-3xl md:text-4xl font-bold'>
                        {t.sections.guestbook}
                    </h1>
                </motion.div>
                <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className='text-[var(--fg-muted)] mb-10'
                >
                    {g.subtitle}
                </motion.p>

                {/* 작성 폼 */}
                <motion.form
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    onSubmit={handleSubmit}
                    className='glass-card rounded-2xl p-6 mb-10'
                >
                    <div className='flex flex-col sm:flex-row gap-3 mb-3'>
                        <div className='sm:w-40 shrink-0'>
                            <input
                                type='text'
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value.slice(0, MAX_NAME))
                                }
                                required
                                disabled={submitting || cooldown}
                                placeholder={g.namePlaceholder}
                                className={inputClass}
                            />
                        </div>
                        <textarea
                            value={message}
                            onChange={(e) =>
                                setMessage(e.target.value.slice(0, MAX_MSG))
                            }
                            required
                            rows={4}
                            disabled={submitting || cooldown}
                            placeholder={g.messagePlaceholder}
                            className={inputClass + " resize-none flex-1"}
                        />
                        <motion.button
                            type='submit'
                            disabled={submitting || cooldown}
                            whileHover={
                                !submitting && !cooldown
                                    ? { scale: 1.03, y: -1 }
                                    : {}
                            }
                            whileTap={
                                !submitting && !cooldown ? { scale: 0.97 } : {}
                            }
                            className='sm:self-start flex items-center justify-center gap-2 px-5 py-3 rounded-xl
                         bg-primary-500 text-white font-semibold text-sm shrink-0
                         hover:bg-primary-600 transition-colors
                         disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-primary-500/20'
                        >
                            {submitting ? (
                                <Loader2 size={16} className='animate-spin' />
                            ) : (
                                <Send size={16} />
                            )}
                            {submitting ? g.submitting : g.submit}
                        </motion.button>
                    </div>

                    <AnimatePresence>
                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className='text-xs text-red-500 mt-1'
                            >
                                {error}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </motion.form>

                {/* 엔트리 목록 */}
                {loading ? (
                    <div className='columns-2 md:columns-4 gap-4'>
                        {[...Array(8)].map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                ) : entries.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className='flex flex-col items-center gap-3 py-16 text-[var(--fg-muted)]'
                    >
                        <MessageSquare size={40} strokeWidth={1.5} />
                        <p className='text-sm'>{g.empty}</p>
                    </motion.div>
                ) : (
                    <>
                        <div className='columns-2 md:columns-4 gap-4'>
                            <AnimatePresence>
                                {visibleEntries.map((entry, i) => (
                                    <EntryCard
                                        key={entry.id}
                                        entry={entry}
                                        index={i}
                                        justNow={g.justNow}
                                        lang={lang}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* 페이지네이션 */}
                        {totalPages > 1 && (
                            <div className='flex items-center justify-center gap-4 mt-10'>
                                <motion.button
                                    onClick={() =>
                                        setPage((p) => Math.max(0, p - 1))
                                    }
                                    disabled={page === 0}
                                    whileHover={page > 0 ? { scale: 1.08 } : {}}
                                    whileTap={page > 0 ? { scale: 0.93 } : {}}
                                    className='w-10 h-10 rounded-xl flex items-center justify-center
                             glass-card border border-(--card-border)
                             text-(--fg-muted) hover:text-(--fg) hover:border-primary-500
                             disabled:opacity-30 disabled:cursor-not-allowed transition-colors'
                                    aria-label='Previous page'
                                >
                                    <ChevronLeft size={18} />
                                </motion.button>

                                <span className='text-sm text-(--fg-muted) min-w-16 text-center'>
                                    {page + 1} / {totalPages}
                                </span>

                                <motion.button
                                    onClick={() =>
                                        setPage((p) =>
                                            Math.min(totalPages - 1, p + 1),
                                        )
                                    }
                                    disabled={page === totalPages - 1}
                                    whileHover={
                                        page < totalPages - 1
                                            ? { scale: 1.08 }
                                            : {}
                                    }
                                    whileTap={
                                        page < totalPages - 1
                                            ? { scale: 0.93 }
                                            : {}
                                    }
                                    className='w-10 h-10 rounded-xl flex items-center justify-center
                             glass-card border border-(--card-border)
                             text-(--fg-muted) hover:text-(--fg) hover:border-primary-500
                             disabled:opacity-30 disabled:cursor-not-allowed transition-colors'
                                    aria-label='Next page'
                                >
                                    <ChevronRight size={18} />
                                </motion.button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
