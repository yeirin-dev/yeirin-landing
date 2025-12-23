import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// This would typically come from a database or CMS
const newsData: Record<string, {
  title: string;
  date: string;
  category: string;
  content: string;
}> = {
  "1": {
    title: "대화형 AI 심리상담 플랫폼... 아동돌봄 연계 생태계 구축",
    date: "2024.03.15",
    category: "보도자료",
    content: `예이린 사회적협동조합의 AI 기반 아동심리상담 서비스 확대, 서비스 모델을 선보이며 주목받고 있다.

예이린은 부산 지역에서 활발하게 아동심리상담 서비스를 전개하고 있으며 앞으로의 전망이 밝다.

이 기술은 첨단 대화형 AI 솔루션, 건강검진에서 아동들에게 맞춤 대화를 하고 있어 기존 상담시스템의 한계를 극복하고 있다.

지역 아동돌봄 및 상담 서비스를 기반으로 여러 기관과 연계하여 아동복지 서비스의 질적 향상을 이끌어가고 있다. 또한 향후 전국으로 확대 계획을 갖고 있다고 밝혔다.`,
  },
  "2": {
    title: "예이린, 사회서비스 박람회 참가",
    date: "2024.03.10",
    category: "활동소식",
    content: `지난 9월 서울에서 열린 대한민국 사회서비스 박람회에서 예이린 박지영 이사장이 심리상담 솔루션 '내친구 소올이' 사례 발표를 하고 있다.

이번 박람회에서는 전국의 다양한 사회서비스 기관들이 참가하여 각자의 서비스 모델을 공유하고 네트워킹을 진행했다.

예이린은 AI 기반 심리상담 솔루션인 '내친구 소올이'를 통해 취약계층 아동들에게 접근성 높은 심리상담 서비스를 제공하고 있다.

박지영 이사장은 "아동들의 정서적 건강은 그들의 미래를 위한 가장 중요한 투자"라며 "예이린은 앞으로도 혁신적인 방법으로 아동복지에 기여하겠다"고 밝혔다.`,
  },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { id } = await params;
  const news = newsData[id] || {
    title: "뉴스를 찾을 수 없습니다",
    date: "",
    category: "",
    content: "요청하신 뉴스 기사를 찾을 수 없습니다.",
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-yeirin-cream to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <p className="text-yeirin-orange font-medium mb-4">
            Health Care system for Your Child
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            예이린 활동 소식
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            예이린의 보도자료와 최근 소식을 확인할 수 있습니다
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-yeirin-orange mb-8 transition-colors"
          >
            <ArrowLeft size={18} />
            목록으로 돌아가기
          </Link>

          {/* Article Header */}
          <div className="mb-8">
            <span
              className={`inline-block text-xs px-3 py-1 rounded-full mb-4 ${
                news.category === "보도자료"
                  ? "bg-yeirin-yellow text-gray-900 font-medium"
                  : "bg-yeirin-orange text-white"
              }`}
            >
              {news.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {news.title}
            </h1>
            <p className="text-gray-500">{news.date}</p>
          </div>

          {/* Featured Image Placeholder */}
          <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-8 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {news.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Share & Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <Link
                href="/news"
                className="text-yeirin-orange hover:underline font-medium"
              >
                ← 목록으로
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
