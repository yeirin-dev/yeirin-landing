"use client";

import { useState } from "react";
import { Search, ExternalLink } from "lucide-react";

type CategoryType = "all" | "press";

const categories = [
  { id: "all" as CategoryType, label: "전체" },
  { id: "press" as CategoryType, label: "보도자료" },
];

const newsData = [
  {
    id: 17,
    title: "복권기금, 경계선지능 아동 예산 205억...\"장기지원 성과 확인\"",
    date: "2026.01.29",
    category: "press",
    media: "오마이뉴스",
    url: "https://n.news.naver.com/article/047/0002503182?sid=102",
    thumbnail: "https://imgnews.pstatic.net/image/047/2026/01/29/0002503182_001_20260129153618485.jpg?type=w800",
  },
  {
    id: 16,
    title: "예이린 사회적협동조합, 'Say No to Drugs in BUSAN' 1년간 사회적 가치 7.7배 창출",
    date: "2026.01.20",
    category: "press",
    media: "이뉴스투데이",
    url: "http://www.enewstoday.co.kr/news/articleView.html?idxno=2383799",
    thumbnail: "https://cdn.enewstoday.co.kr/news/thumbnail/202601/2383799_1213044_5733_v150.jpg",
  },
  {
    id: 15,
    title: "예이린 사회적협동조합, 'Say No to Drugs in BUSAN' 1년간 사회적 가치 7.7배 창출",
    date: "2026.01.20",
    category: "press",
    media: "아시아투데이",
    url: "https://m.asiatoday.co.kr/kn/view.php?key=20260120001452238",
    thumbnail: "https://img.asiatoday.co.kr/file/2026y/01m/20d/20260120001452238_1.jpg",
  },
  {
    id: 14,
    title: "예이린 사회적협동조합, '2025 송년의 밤' 통해 B-IMPACT 얼라이언스 출범 선언",
    date: "2025.12.24",
    category: "press",
    media: "세계비즈",
    url: "https://m.segyebiz.com/adxView/20251224512201",
    thumbnail: "https://m.segyebiz.com/content/image/2025/12/24/20251224512183.jpg",
  },
  {
    id: 13,
    title: "대화형 AI 심리상담 플랫폼… 아동돌봄 연계 생태계 구축",
    date: "2025.11.03",
    category: "press",
    media: "부산일보",
    url: "https://www.busan.com/view/busan/view.php?code=2025110317410585667",
    thumbnail: "https://www.busan.com/nas/wcms/wcms_data/photos/2025/11/03/2025110317410501022_l.jpg",
  },
  {
    id: 12,
    title: "예이린 사회적협동조합–굿네이버스 영남본부, '아동 마음건강 지원' 업무협약 체결",
    date: "2025.12.02",
    category: "press",
    media: "매일신문",
    url: "https://www.imaeil.com/page/view/2025120213551281055",
    thumbnail: "https://www.imaeil.com/photos/2025/12/02/2025120213540418970_l.jpg",
  },
  {
    id: 11,
    title: "인텔리어스, 'AI 마음건강+' 시범사업 성공적으로 수행",
    date: "2025.11.11",
    category: "press",
    media: "itbiznews",
    url: "https://www.itbiznews.com/news/articleView.html?idxno=186682",
    thumbnail: "https://cdn.itbiznews.com/news/photo/202511/186682_190683_2249.jpg",
  },
  {
    id: 10,
    title: "부산 사상구, 'AI와 함께하는 마음건강+' 시범사업 성과공유회 개최",
    date: "2025.10.24",
    category: "press",
    media: "국제신문",
    url: "https://www.kookje.co.kr/news2011/asp/newsbody.asp?code=0300&key=20251024.99099006178",
    thumbnail: "https://db.kookje.co.kr/news2000/photo/2025/1024/L20251024.99099006178i1.jpg",
  },
  {
    id: 9,
    title: "부산 사상구, 'AI와 함께하는 마음건강 돌봄사업' 협약식 체결",
    date: "2025.07.10",
    category: "press",
    media: "뉴스포털1",
    url: "https://www.civilreporter.co.kr/news/articleView.html?idxno=500240",
    thumbnail: "https://cdn.civilreporter.co.kr/news/photo/202507/500240_524239_2019.jpg",
  },
  {
    id: 8,
    title: "예이린 사회적협동조합, 복권기금 '경계선 지능 아동 사회적응력 향상 지원사업' 최종 선정",
    date: "2025.06.01",
    category: "press",
    media: "E동아",
    url: "https://www.newsis.com/view/NISX20250530_0003196626",
    thumbnail: "https://img1.newsis.com/2024/06/19/NISI20240619_0001579897_web.jpg",
  },
  {
    id: 7,
    title: "부산사회서비스원 'AI, IoT 기반 돌봄·아동상담' 나선다",
    date: "2025.06.01",
    category: "press",
    media: "뉴시스",
    url: "https://www.newsis.com/view/NISX20250530_0003196626",
    thumbnail: "https://img1.newsis.com/2024/06/19/NISI20240619_0001579897_web.jpg",
  },
  {
    id: 6,
    title: "부산사회서비스원, 인공지능·사물인터넷 활용 복지 서비스 제공",
    date: "2025.05.31",
    category: "press",
    media: "연합뉴스",
    url: "https://www.yna.co.kr/view/AKR20250530101500051",
    thumbnail: "https://img7.yna.co.kr/etc/inner/KR/2025/05/30/AKR20250530101500051_01_i_P4.jpg",
  },
  {
    id: 5,
    title: "부산사회서비스원, AI·IoT 기술 활용한 사회서비스 본격 추진",
    date: "2025.05.31",
    category: "press",
    media: "세계일보",
    url: "https://www.segye.com/newsView/20250530506079",
    thumbnail: "https://www.segye.com/content/image/2025/05/30/20250530506078.jpg",
  },
  {
    id: 4,
    title: "AI 아동 상담·돌봄서비스 연계…부산사회서비스원 복지기술 단체 2곳 선정",
    date: "2025.05.30",
    category: "press",
    media: "부산일보",
    url: "https://v.daum.net/v/pngEFG2XSJ",
    thumbnail: "https://img1.daumcdn.net/thumb/S1200x630/?fname=https://t1.daumcdn.net/news/202505/30/551750-8jup1yA/20250530163018366tbjz.png",
  },
  {
    id: 3,
    title: "예이린 사회적협동조합, 청소년 마약류 오남용 예방 워크숍",
    date: "2025.02.25",
    category: "press",
    media: "부산일보",
    url: "https://www.busan.com/view/busan/view.php?code=2025022509455771221",
    thumbnail: "https://www.busan.com/nas/wcms/wcms_data/photos/2025/02/25/2025022509454244169_l.jpg",
  },
  {
    id: 2,
    title: "보건의료·복지 사회적협동조합 예이린, 하계워크숍 열어",
    date: "2023.08.21",
    category: "press",
    media: "부산일보",
    url: "https://www.busan.com/view/busan/view.php?code=2023081716434739154",
    thumbnail: "https://www.busan.com/nas/wcms/wcms_data/photos/2023/08/17/2023081716394246758_l.jpg",
  },
  {
    id: 1,
    title: "[포토뉴스] 예이린 사회적협동조합 창립총회",
    date: "2022.11.29",
    category: "press",
    media: "부산일보",
    url: "https://www.busan.com/view/busan/view.php?code=2022112821363773756",
    thumbnail: "https://www.busan.com/nas/wcms/wcms_data/photos/2022/11/28/2022112821360592092_l.jpg",
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
      news.media.toLowerCase().includes(searchQuery.toLowerCase());
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
            예이린 뉴스룸
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
              <a
                key={news.id}
                href={news.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Thumbnail Image */}
                <div className="aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  {news.thumbnail ? (
                    <img
                      src={news.thumbnail}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
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
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="text-xs px-3 py-1 rounded-full bg-yeirin-yellow text-gray-900 font-medium">
                      보도자료
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <ExternalLink size={16} className="text-white drop-shadow-md" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-yeirin-orange font-medium">{news.media}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-yeirin-orange transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{news.date}</p>
                </div>
              </a>
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
