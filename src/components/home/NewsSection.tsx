"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const newsItems = [
  {
    id: 1,
    title: "대화형 AI 심리상담 플랫폼... 아동돌봄 연계 생태계 구축",
    date: "2024.03.15",
    image: "/images/news/placeholder-1.svg",
    category: "보도자료",
  },
  {
    id: 2,
    title: "예이린, 사회서비스 박람회 참가",
    date: "2024.03.10",
    image: "/images/news/placeholder-2.svg",
    category: "활동소식",
  },
  {
    id: 3,
    title: "취약계층 아동 건강관리 프로그램 성과 발표",
    date: "2024.03.05",
    image: "/images/news/placeholder-3.svg",
    category: "보도자료",
  },
  {
    id: 4,
    title: "지역사회 협력 네트워크 확대",
    date: "2024.02.28",
    image: "/images/news/placeholder-4.svg",
    category: "활동소식",
  },
];

export default function NewsSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              예이린 뉴스룸
            </h2>
            <p className="text-gray-600">예이린의 최신 소식을 확인하세요</p>
          </div>
          <Link
            href="/news"
            className="hidden md:flex items-center gap-2 text-yeirin-orange font-medium hover:underline"
          >
            전체보기
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsItems.map((news) => (
            <Link
              key={news.id}
              href={`/news/${news.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-yeirin-yellow text-gray-900 text-xs font-medium px-3 py-1 rounded-full">
                    {news.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-yeirin-orange transition-colors">
                  {news.title}
                </h3>
                <p className="text-gray-400 text-sm">{news.date}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-yeirin-orange font-medium"
          >
            전체보기
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
