"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

const newsItems = [
  {
    id: 17,
    title: "복권기금, 경계선지능 아동 예산 205억...\"장기지원 성과 확인\"",
    date: "2026.01.29",
    thumbnail: "https://imgnews.pstatic.net/image/047/2026/01/29/0002503182_001_20260129153618485.jpg?type=w800",
    category: "보도자료",
    media: "오마이뉴스",
    url: "https://n.news.naver.com/article/047/0002503182?sid=102",
  },
  {
    id: 16,
    title: "예이린 사회적협동조합, 'Say No to Drugs in BUSAN' 1년간 사회적 가치 7.7배 창출",
    date: "2026.01.20",
    thumbnail: "https://cdn.enewstoday.co.kr/news/thumbnail/202601/2383799_1213044_5733_v150.jpg",
    category: "보도자료",
    media: "이뉴스투데이",
    url: "http://www.enewstoday.co.kr/news/articleView.html?idxno=2383799",
  },
  {
    id: 15,
    title: "예이린 사회적협동조합, 'Say No to Drugs in BUSAN' 1년간 사회적 가치 7.7배 창출",
    date: "2026.01.20",
    thumbnail: "https://img.asiatoday.co.kr/file/2026y/01m/20d/20260120001452238_1.jpg",
    category: "보도자료",
    media: "아시아투데이",
    url: "https://m.asiatoday.co.kr/kn/view.php?key=20260120001452238",
  },
  {
    id: 14,
    title: "예이린 사회적협동조합, '2025 송년의 밤' 통해 B-IMPACT 얼라이언스 출범 선언",
    date: "2025.12.24",
    thumbnail: "https://m.segyebiz.com/content/image/2025/12/24/20251224512183.jpg",
    category: "보도자료",
    media: "세계비즈",
    url: "https://m.segyebiz.com/adxView/20251224512201",
  },
  {
    id: 12,
    title: "예이린 사회적협동조합–굿네이버스 영남본부, '아동 마음건강 지원' 업무협약 체결",
    date: "2025.12.02",
    thumbnail: "https://www.imaeil.com/photos/2025/12/02/2025120213540418970_l.jpg",
    category: "보도자료",
    media: "매일신문",
    url: "https://www.imaeil.com/page/view/2025120213551281055",
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
                    {news.category}
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
