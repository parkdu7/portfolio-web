"use client";

import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

interface Props {
    actions?: ReactNode;
}

export function BlogHeader({ actions }: Props) {
    return (
        <header className='sticky top-0 z-40 w-full border-b border-white/8 bg-[var(--bg)]/80 backdrop-blur-md'>
            <div className='max-w-5xl mx-auto px-8 h-16 flex items-end justify-between pt-5'>
                {/* Logo → /blog */}
                <Link href='/blog' className='flex items-center gap-2.5 group'>
                    <div className='relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-primary-500/30 group-hover:ring-primary-500/70 transition-all'>
                        <Image
                            src='/images/profile.jpg'
                            alt='profile'
                            fill
                            className='object-cover'
                            sizes='32px'
                        />
                    </div>
                    <span className='text-sm font-semibold text-(--fg) group-hover:text-primary-500 transition-colors'>
                        박승균의 블로그
                    </span>
                </Link>

                {/* Right: actions + portfolio link */}
                <div className='flex items-center gap-3'>
                    {actions}
                    <Link
                        href='/'
                        className='text-xs font-medium text-(--fg-muted) hover:text-primary-500 transition-colors px-3 py-1.5 rounded-lg hover:bg-white/8'
                    >
                        포트폴리오 →
                    </Link>
                </div>
            </div>
        </header>
    );
}
