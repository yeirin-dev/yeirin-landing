"use client";

const promises = [
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        <circle cx="32" cy="32" r="30" stroke="#FFD43B" strokeWidth="2" fill="#FFF8E7"/>
        <path d="M32 44c-6 0-12-6-12-12s6-12 12-12c3 0 6 1.5 8 4" stroke="#FF9F1C" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M32 20c6 0 12 6 12 12s-6 12-12 12" stroke="#FF9F1C" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M29 30l3 3 6-6" stroke="#FFD43B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "전문성",
    description:
      "의료 전문가, 돌봄전문가 등으로 구성된 전문 상담팀을 통해 아동의 건강과 복지를 체계적으로 관리합니다. 검증된 프로그램과 전문 인력이 함께합니다.",
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        <circle cx="32" cy="32" r="30" stroke="#FFD43B" strokeWidth="2" fill="#FFF8E7"/>
        <circle cx="24" cy="26" r="6" fill="#FF9F1C"/>
        <circle cx="40" cy="26" r="6" fill="#FF9F1C"/>
        <path d="M18 42c0-6 6-10 14-10s14 4 14 10" stroke="#FFD43B" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="32" cy="22" r="5" fill="#FFD43B"/>
        <path d="M26 38c0-4 3-6 6-6s6 2 6 6" stroke="#FF9F1C" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "접근성",
    description:
      "어디서나 쉽게 이용할 수 있는 건강 관리 서비스를 제공합니다. 지역사회와 연계하여 취약계층 아동들이 필요한 서비스에 쉽게 접근할 수 있도록 합니다.",
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        <circle cx="32" cy="32" r="30" stroke="#FFD43B" strokeWidth="2" fill="#FFF8E7"/>
        <path d="M32 20v8M28 24h8" stroke="#FF9F1C" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M22 32c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10" stroke="#FFD43B" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M26 38l-4 8h20l-4-8" stroke="#FF9F1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "지속성",
    description:
      "일시적인 지원이 아닌 지속적인 관리와 케어를 통해 아동들의 건강한 성장을 돕습니다. 장기적인 관점에서 아동 발달을 지원합니다.",
  },
];

export default function PromiseSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            예이린은 약속합니다
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            예이린은 사회적협동조합으로서 취약계층 아동의 건강과 복지를 위해 최선을 다하겠습니다.
            모든 아동이 건강하게 자랄 수 있는 세상을 만들어 갑니다.
          </p>
        </div>

        {/* Promise Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {promises.map((promise, index) => (
            <div
              key={index}
              className="text-center"
            >
              <div className="w-24 h-24 mx-auto mb-6">
                {promise.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {promise.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {promise.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
