"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

type CategoryType = "all" | "press" | "activity";

const categories = [
  { id: "all" as CategoryType, label: "전체" },
  { id: "press" as CategoryType, label: "보도자료" },
  { id: "activity" as CategoryType, label: "활동소식" },
];

const newsData = [
  {
    id: 1,
    title: "대화형 AI 심리상담 플랫폼... 아동돌봄 연계 생태계 구축",
    date: "2024.03.15",
    category: "press",
    excerpt:
      "예이린 사회적협동조합의 AI 기반 아동심리상담 서비스 확대, 서비스 모델을 선보이며 주목받고 있다. 예이린은 부산 지역에서 활발하게 아동심리상담 서비스를 전개하고 있으며 앞으로의 전망이 밝다.",
  },
  {
    id: 2,
    title: "예이린, 사회서비스 박람회 참가",
    date: "2024.03.10",
    category: "activity",
    excerpt:
      "지난 9월 서울에서 열린 대한민국 사회서비스 박람회에서 예이린 박지영 이사장이 심리상담 솔루션 '내친구 소올이' 사례 발표를 하고 있다.",
  },
  {
    id: 3,
    title: "취약계층 아동 건강관리 프로그램 성과 발표",
    date: "2024.03.05",
    category: "press",
    excerpt:
      "예이린이 운영하는 취약계층 아동 건강관리 프로그램의 성과가 발표되었습니다. 지난 1년간 100명 이상의 아동이 혜택을 받았습니다.",
  },
  {
    id: 4,
    title: "지역사회 협력 네트워크 확대",
    date: "2024.02.28",
    category: "activity",
    excerpt:
      "예이린이 지역사회 협력 네트워크를 확대하여 더 많은 기관과 협력하게 되었습니다.",
  },
  {
    id: 5,
    title: "아동 정서 발달 프로그램 신규 론칭",
    date: "2024.02.20",
    category: "press",
    excerpt:
      "예이린이 아동 정서 발달을 위한 새로운 프로그램을 론칭했습니다. 전문 상담사와 함께하는 맞춤형 프로그램입니다.",
  },
  {
    id: 6,
    title: "봄맞이 건강검진 캠페인 실시",
    date: "2024.02.15",
    category: "activity",
    excerpt:
      "예이린이 봄을 맞아 취약계층 아동을 대상으로 건강검진 캠페인을 실시합니다.",
  },
];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNews = newsData.filter((news) => {
    const matchesCategory =
      activeCategory === "all" || news.category === activeCategory;
    const matchesSearch =
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-yeirin-cream to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <p className="text-yeirin-orange font-medium mb-4">
            Health Care system for Your Child
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            예이린 소식
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            예이린의 보도자료와 최근 소식을 확인할 수 있습니다
          </p>
        </div>
      </section>

      {/* Filter & Search Section */}
      <section className="bg-white border-b py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Category Tabs */}
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? "bg-yeirin-yellow text-gray-900 font-medium"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-yeirin-yellow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((news) => (
              <Link
                key={news.id}
                href={`/news/${news.id}`}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Image Placeholder */}
                <div className="aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-gray-300"
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
                  <div className="absolute top-4 left-4">
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        news.category === "press"
                          ? "bg-yeirin-yellow text-gray-900 font-medium"
                          : "bg-yeirin-orange text-white"
                      }`}
                    >
                      {news.category === "press" ? "보도자료" : "활동소식"}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-yeirin-orange transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                    {news.excerpt}
                  </p>
                  <p className="text-gray-400 text-sm">{news.date}</p>
                </div>
              </Link>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">검색 결과가 없습니다.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
