import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "예이린 | 취약계층 아동을 위한 건강 관리 시스템",
  description: "예이린은 취약계층 아동들의 건강한 성장을 지원합니다. Health Care System for Your Child.",
  keywords: ["예이린", "yeirin", "아동건강", "취약계층", "사회적협동조합", "건강관리시스템"],
  openGraph: {
    title: "예이린 | Health Care System for Your Child",
    description: "취약계층 아동을 위한 건강 관리 시스템",
    type: "website",
    locale: "ko_KR",
  },
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
