"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type CSSProperties,
} from "react";

interface HistoryProject {
  name: string;
  featured?: boolean;
}

interface HistoryEvent {
  date: string;
  title: string;
  amount?: string;
  highlight?: boolean;
  project?: HistoryProject;
}

interface HistoryYear {
  year: string;
  events: HistoryEvent[];
}

const HISTORY: HistoryYear[] = [
  {
    year: "2025",
    events: [
      {
        date: "2025.05.01",
        title:
          "[과학기술정보통신부·한국과학기술단체총연합회] 「과학기술인 협동조합 사업화 지원사업(심화형)」 수주",
        amount: "6,600만원",
        project: {
          name: "초거대 AI 기반 취약계층 아동·청소년 맞춤형 심리케어 SaaS 개발 및 사업화 방안",
        },
      },
      {
        date: "2025.06.02",
        title:
          "[부산광역시 사회서비스원] 「사회서비스 공급자 성장지원 및 산업화」 수주",
        amount: "1,750만원",
        project: {
          name: "AI와 함께하는 마음건강+: 지역아동센터 연계 사회서비스 시범사업",
        },
      },
      {
        date: "2025.10.29",
        title:
          "[사회복지공동모금회] 「2026년 복권기금 경계선 지능 아동(느린학습자)의 사회적응력 향상 지원사업」 수주",
        amount: "5억원",
        highlight: true,
        project: {
          name: "「부산광역시 느린 거북이 학교」",
          featured: true,
        },
      },
      {
        date: "2025.12.01",
        title:
          "[부산광역시 사회서비스원] 2026년도 「사회서비스 공급자 성장지원 및 산업화」 수주",
        amount: "1,500만원 (※굿네이버스 2,000만원)",
        project: {
          name: "AI 기반 아동 마음건강 돌봄 통합 디지털 플랫폼 사업",
        },
      },
    ],
  },
  {
    year: "2024",
    events: [
      {
        date: "2024.03.29",
        title: "기획재정부 공익법인(지정기부금단체) 지정",
      },
      {
        date: "2024.05.10",
        title:
          "[과학기술정보통신부·한국과학기술단체총연합회] 「과학기술인 협동조합 사업화 지원사업」 수주",
        amount: "4,000만원",
        project: {
          name: "취약계층 아동·청소년 특화 인공지능 기반 헬스케어 챗봇 앱 개발 및 서비스 플랫폼 고도화",
        },
      },
      {
        date: "2024.07.01",
        title:
          "[사회복지공동모금회] 2024년도 「사회이슈 대응을 위한 창의적 해결방안 지원사업」 수주",
        amount: "1억원",
        project: {
          name: "청소년 마약류 오남용 예방을 위한 교육용 플랫폼 개발 및 사회안전망 구축 사업: 「SAY NO TO DRUGs in BUSAN」",
        },
      },
    ],
  },
  {
    year: "2023",
    events: [
      {
        date: "2023.10.10",
        title: "예이린사회적협동조합 보건복지부 소관 설립 인가",
      },
      {
        date: "2023.11.06",
        title: "과학기술정보통신부 과학기술인 협동조합 등록",
      },
      {
        date: "2023.11.15",
        title: "예이린사회적협동조합 설립",
        highlight: true,
      },
    ],
  },
  {
    year: "2022",
    events: [
      {
        date: "2022.11.27",
        title: "예이린사회적협동조합 창립총회 개최",
      },
    ],
  },
  {
    year: "2021",
    events: [
      {
        date: "2021.09.10",
        title: "예이린 사회적협동조합 설립 추진단 결성",
      },
    ],
  },
];

export default function YeirinHistory() {
  const [activeYear, setActiveYear] = useState<string>(HISTORY[0].year);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const eventRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [indicatorStyle, setIndicatorStyle] = useState<{ width: number; x: number }>({
    width: 0,
    x: 0,
  });
  const [visibleEvents, setVisibleEvents] = useState<Set<string>>(new Set());

  // 스크롤 기반 활성 연도 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const year = (visible[0].target as HTMLElement).dataset.year;
          if (year) setActiveYear(year);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // 이벤트별 fade-in 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = (e.target as HTMLElement).dataset.eventId;
            if (id) {
              setVisibleEvents((prev) => {
                const next = new Set(prev);
                next.add(id);
                return next;
              });
            }
          }
        });
      },
      { threshold: 0.15 }
    );
    eventRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // 모바일 탭 인디케이터 위치 갱신
  const updateIndicator = useCallback(() => {
    const activeTab = tabRefs.current[activeYear];
    if (activeTab) {
      setIndicatorStyle({
        width: activeTab.offsetWidth,
        x: activeTab.offsetLeft,
      });
    }
  }, [activeYear]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  const scrollToYear = (year: string) => {
    const target = sectionRefs.current[year];
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const indicatorTransform: CSSProperties = {
    width: `${indicatorStyle.width}px`,
    transform: `translateX(${indicatorStyle.x}px)`,
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
      {/* Hero */}
      <div className="px-6 md:px-12 py-10 md:py-14 bg-gradient-to-b from-yeirin-yellow/15 to-transparent border-b border-gray-100">
        <h3 className="text-2xl md:text-4xl font-bold leading-tight tracking-tight text-gray-900">
          예이린은 오늘도
          <br />
          <span className="text-yeirin-orange">기술로 돌봄의 미래</span>를
          만들고 있습니다
        </h3>
        <p className="mt-3 text-sm md:text-base text-gray-500">
          2021년부터 시작된 작은 추진단이 사회혁신 기업으로 성장하기까지
        </p>
      </div>

      {/* 모바일 상단 탭 */}
      <div className="md:hidden sticky top-16 z-10 bg-white border-b border-gray-100 px-4">
        <div className="relative flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {HISTORY.map(({ year }) => (
            <button
              key={year}
              ref={(el) => {
                tabRefs.current[year] = el;
              }}
              onClick={() => scrollToYear(year)}
              className={`flex-none px-4 py-4 text-sm font-semibold whitespace-nowrap transition-colors ${
                activeYear === year
                  ? "text-yeirin-orange"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {year}
            </button>
          ))}
          <span
            className="absolute bottom-0 h-0.5 rounded-full bg-yeirin-orange transition-[transform,width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={indicatorTransform}
          />
        </div>
      </div>

      <div className="md:grid md:grid-cols-[220px_1fr]">
        {/* 데스크톱 사이드바 */}
        <aside className="hidden md:block border-r border-gray-100 py-12 sticky top-16 self-start max-h-screen overflow-y-auto">
          <ul className="m-0 p-0 list-none">
            {HISTORY.map(({ year }) => {
              const isActive = activeYear === year;
              return (
                <li key={year}>
                  <button
                    onClick={() => scrollToYear(year)}
                    className={`relative w-full text-left py-3.5 px-8 font-semibold transition-all duration-300 ${
                      isActive
                        ? "text-yeirin-orange text-2xl translate-x-1.5"
                        : "text-gray-400 text-base hover:text-gray-600"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 rounded-r bg-yeirin-orange" />
                    )}
                    {year}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* 본문 */}
        <main className="px-6 md:px-12 py-8 md:py-12 min-h-[600px]">
          {HISTORY.map(({ year, events }) => {
            const isInView = activeYear === year;
            return (
              <section
                key={year}
                ref={(el) => {
                  sectionRefs.current[year] = el;
                }}
                data-year={year}
                className="mb-12 md:mb-16 last:mb-0 scroll-mt-24"
              >
                <h4
                  className={`text-5xl md:text-7xl font-extrabold leading-none tracking-tighter mb-8 transition-[color,opacity] duration-500 ${
                    isInView
                      ? "text-yeirin-orange opacity-100"
                      : "text-gray-900 opacity-10"
                  }`}
                >
                  {year}
                </h4>
                <ul className="relative m-0 p-0 list-none">
                  {/* timeline line */}
                  <span className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-yeirin-orange/40 to-yeirin-yellow/40" />
                  {events.map((ev, i) => {
                    const id = `${year}-${i}`;
                    const isVisible = visibleEvents.has(id);
                    return (
                      <li
                        key={id}
                        ref={(el) => {
                          eventRefs.current.push(el);
                        }}
                        data-event-id={id}
                        className={`relative pl-9 pb-10 last:pb-0 transition-all duration-700 ease-out ${
                          isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-6"
                        }`}
                      >
                        {/* timeline dot */}
                        <span
                          className={`absolute left-px top-1.5 w-3.5 h-3.5 rounded-full border-2 border-yeirin-orange transition-all duration-300 ${
                            isVisible
                              ? "bg-yeirin-orange scale-110"
                              : "bg-white"
                          }`}
                        />
                        <p className="text-xs font-semibold tracking-wide text-gray-400 mb-2">
                          {ev.date}
                        </p>
                        <h5
                          className={`leading-relaxed mb-1.5 ${
                            ev.highlight
                              ? "text-yeirin-orange text-lg md:text-xl font-bold"
                              : "text-gray-900 text-base font-semibold"
                          }`}
                        >
                          {ev.title}
                        </h5>
                        {ev.amount && (
                          <span className="inline-block mt-1.5 px-3 py-1 rounded-full text-xs font-semibold text-yeirin-orange bg-yeirin-yellow/30">
                            {ev.amount}
                          </span>
                        )}
                        {ev.project && (
                          <div
                            className={`mt-3.5 px-4 py-4 rounded-lg text-sm leading-relaxed border ${
                              ev.project.featured
                                ? "bg-gradient-to-br from-yeirin-orange to-amber-500 text-white border-transparent shadow-md shadow-amber-500/20"
                                : "bg-yeirin-cream text-gray-900 border-yeirin-yellow/40"
                            }`}
                          >
                            <span
                              className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold tracking-wider mb-2 ${
                                ev.project.featured
                                  ? "bg-white/20 text-white"
                                  : "bg-yeirin-orange/15 text-yeirin-orange"
                              }`}
                            >
                              사업명
                            </span>
                            <p
                              className={`m-0 ${
                                ev.project.featured
                                  ? "text-white"
                                  : "text-gray-800"
                              }`}
                            >
                              {ev.project.name}
                            </p>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </main>
      </div>
    </div>
  );
}
