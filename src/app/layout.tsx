import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const SITE_URL = "https://yeirin.org";
const SITE_NAME = "사회적협동조합 예이린";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFD700",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "예이린 | 취약계층 아동을 위한 건강 관리 시스템",
    template: "%s | 예이린",
  },
  description: "예이린은 취약계층 아동들의 건강한 성장을 지원하는 사회적협동조합입니다. AI 기반 심리상담, 아동건강관리, 지역사회 협력 서비스를 제공합니다.",
  keywords: [
    "예이린",
    "yeirin",
    "사회적협동조합",
    "아동건강",
    "취약계층 아동",
    "건강관리시스템",
    "AI 심리상담",
    "지역아동센터",
    "양육시설",
    "부산",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "예이린 | Health Care System for Your Child",
    description: "취약계층 아동의 건강한 성장을 지원하는 사회적협동조합. AI 기반 심리상담 및 아동건강관리 서비스.",
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: "예이린 | Health Care System for Your Child",
    description: "취약계층 아동의 건강한 성장을 지원하는 사회적협동조합",
  },
  verification: {
    google: "google-site-verification-code", // 추후 Google Search Console 등록 시 교체
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "health",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <Header />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
