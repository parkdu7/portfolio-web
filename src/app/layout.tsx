import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "@/components/layout/Providers";
import { FloatingNav } from "@/components/layout/FloatingNav";
import { AdminLoginButton } from "@/components/ui/AdminLoginButton";
import "./globals.css";

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.seunggyun.site'),
    title: "박승균 | Portfolio",
    description: "Android, Backend, Frontend 개발자 포트폴리오",
    keywords: [
        "Android",
        "Kotlin",
        "Spring Boot",
        "React",
        "Next.js",
        "Portfolio",
    ],
    authors: [{ name: "박승균" }],
    openGraph: {
        title: "박승균 | Portfolio",
        description: "Android, Backend, Frontend 개발자 포트폴리오",
        type: "website",
        images: [{ url: "/images/profile.jpg" }],
    },
    verification: {
        google: 'z3jytr-QOoRWB9D6f3QQxtACARm0-1U-l89abZIEMhk',
        other: { 'naver-site-verification': ['c926525e71f369a80c6813ca1062f1b1637511e6'] },
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='ko' suppressHydrationWarning>
            <body className='min-h-screen antialiased'>
                <Providers>
                    <FloatingNav />
                    <AdminLoginButton />
                    <main className='relative'>{children}</main>
                </Providers>
                <Analytics />
            </body>
        </html>
    );
}
