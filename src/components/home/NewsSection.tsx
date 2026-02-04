"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { newsData } from "@/data/news";

export default function NewsSection() {
  // 홈페이지에는 최신 5개만 표시
  const newsItems = newsData.slice(0, 5);

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
            <a
              key={news.id}
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                {news.thumbnail ? (
                  <img
                    src={news.thumbnail}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
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
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                      />
                    </svg>
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span className="bg-yeirin-yellow text-gray-900 text-xs font-medium px-3 py-1 rounded-full">
                    보도자료
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <ExternalLink size={14} className="text-white drop-shadow-md" />
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-yeirin-orange font-medium">{news.media}</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-yeirin-orange transition-colors">
                  {news.title}
                </h3>
                <p className="text-gray-400 text-sm">{news.date}</p>
              </div>
            </a>
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
