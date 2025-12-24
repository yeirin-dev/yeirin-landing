import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getMemberById, getAllMemberIds } from "@/data/members";
import MemberProfile from "@/components/members/MemberProfile";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const ids = getAllMemberIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const member = getMemberById(id);

  if (!member) {
    return {
      title: "멤버를 찾을 수 없습니다 | 예이린",
    };
  }

  const title = `${member.name} ${member.role} | 예이린 이사회`;
  const description = `${member.title}. ${member.introduction}`;

  return {
    title,
    description,
    keywords: [
      member.name,
      "예이린",
      "사회적협동조합",
      member.role,
      ...member.expertise,
    ],
    openGraph: {
      title,
      description,
      type: "profile",
      images: member.image ? [{ url: member.image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `/about/members/${id}`,
    },
  };
}

export default async function MemberPage({ params }: PageProps) {
  const { id } = await params;
  const member = getMemberById(id);

  if (!member) {
    notFound();
  }

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.title,
    description: member.introduction,
    affiliation: {
      "@type": "Organization",
      name: "사회적협동조합 예이린",
      url: "https://yeirin.org",
    },
    knowsAbout: member.expertise,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Back Navigation */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-yeirin-orange transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>소개 페이지로 돌아가기</span>
          </Link>
        </div>
      </div>

      <MemberProfile member={member} variant="page" />
    </>
  );
}
