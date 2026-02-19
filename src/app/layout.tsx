import type { Metadata, Viewport } from 'next';
import { Providers } from '@/components/layout/Providers';
import { FloatingNav } from '@/components/layout/FloatingNav';
import './globals.css';

export const metadata: Metadata = {
  title: '홍길동 | Portfolio',
  description: 'Android, Backend, Frontend 개발자 포트폴리오',
  keywords: ['Android', 'Kotlin', 'Spring Boot', 'React', 'Next.js', 'Portfolio'],
  authors: [{ name: '홍길동' }],
  openGraph: {
    title: '홍길동 | Portfolio',
    description: 'Android, Backend, Frontend 개발자 포트폴리오',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <Providers>
          <FloatingNav />
          <main className="relative">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
