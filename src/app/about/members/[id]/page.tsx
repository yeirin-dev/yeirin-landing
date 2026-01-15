import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getMemberById, getAllMemberIds, boardMembers, techMembers } from "@/data/members";
import MemberProfile from "@/components/members/MemberProfile";

const SITE_URL = "https://yeirin.org";
const SITE_NAME = "사회적협동조합 예이린";

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

  const isTechMember = techMembers.some((m) => m.id === id);
  const teamName = isTechMember ? "기술개발본부" : "이사회";

  const title = `${member.name} ${member.role} | ${SITE_NAME} ${teamName}`;
  const description = member.introduction.slice(0, 155) + (member.introduction.length > 155 ? "..." : "");
  const expertiseText = member.expertise.join(", ");
  const fullDescription = `${member.title}. ${description} 전문분야: ${expertiseText}`;

  const imageUrl = member.image ? `${SITE_URL}${member.image}` : `${SITE_URL}/images/og-default.png`;
  const pageUrl = `${SITE_URL}/about/members/${id}`;

  return {
    title,
    description: fullDescription.slice(0, 160),
    keywords: [
      member.name,
      "예이린",
      "사회적협동조합",
      member.role,
      teamName,
      "아동건강",
      "취약계층 아동",
      ...member.expertise,
    ],
    authors: [{ name: member.name }],
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
      title,
      description: fullDescription.slice(0, 200),
      type: "profile",
      url: pageUrl,
      siteName: SITE_NAME,
      locale: "ko_KR",
      images: [
        {
          url: imageUrl,
          width: 400,
          height: 400,
          alt: `${member.name} ${member.role} 프로필 사진`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: fullDescription.slice(0, 200),
      images: [imageUrl],
    },
    alternates: {
      canonical: pageUrl,
    },
    other: {
      "profile:first_name": member.name.slice(0, 1),
      "profile:last_name": member.name.slice(1),
    },
  };
}

export default async function MemberPage({ params }: PageProps) {
  const { id } = await params;
  const member = getMemberById(id);

  if (!member) {
    notFound();
  }

  const isTechMember = techMembers.some((m) => m.id === id);
  const teamName = isTechMember ? "기술개발본부" : "이사회";

  // JSON-LD structured data for SEO (Person schema)
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/about/members/${id}#person`,
    name: member.name,
    jobTitle: member.role,
    description: member.introduction,
    image: member.image ? `${SITE_URL}${member.image}` : undefined,
    url: `${SITE_URL}/about/members/${id}`,
    worksFor: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    affiliation: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    knowsAbout: member.expertise,
    alumniOf: member.education.map((edu) => ({
      "@type": "EducationalOrganization",
      name: edu.split(" ")[0], // 대학명 추출
    })),
    hasCredential: member.education.map((edu) => ({
      "@type": "EducationalOccupationalCredential",
      name: edu,
    })),
  };

  // Organization schema
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    description: "취약계층 아동의 건강과 복지를 위해 연구와 실천을 병행하는 사회적협동조합",
    foundingDate: "2021",
    address: {
      "@type": "PostalAddress",
      addressCountry: "KR",
      addressRegion: "부산광역시",
    },
    member: [...boardMembers, ...techMembers].map((m) => ({
      "@type": "Person",
      name: m.name,
      jobTitle: m.role,
      url: `${SITE_URL}/about/members/${m.id}`,
    })),
  };

  // BreadcrumbList schema for navigation
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "홈",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "소개",
        item: `${SITE_URL}/about`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: teamName,
        item: `${SITE_URL}/about#${isTechMember ? "tech" : "board"}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: `${member.name} ${member.role}`,
        item: `${SITE_URL}/about/members/${id}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
