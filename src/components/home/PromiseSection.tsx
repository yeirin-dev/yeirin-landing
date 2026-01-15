"use client";

import Image from "next/image";

// 3대 핵심가치 아이콘 컴포넌트 - 노란색/주황색 테마
const FamilyIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16 md:w-20 md:h-20">
    {/* 부모 왼쪽 */}
    <circle cx="18" cy="18" r="5" fill="#FF9F1C" />
    <path d="M18 24c-5 0-9 3-9 7v5h18v-5c0-4-4-7-9-7z" fill="#FF9F1C" />
    {/* 부모 오른쪽 */}
    <circle cx="46" cy="18" r="5" fill="#FF9F1C" />
    <path d="M46 24c-5 0-9 3-9 7v5h18v-5c0-4-4-7-9-7z" fill="#FF9F1C" />
    {/* 아이 중앙 */}
    <circle cx="32" cy="28" r="4" fill="#FF9F1C" />
    <path d="M32 33c-4 0-7 2.5-7 5.5v5.5h14v-5.5c0-3-3-5.5-7-5.5z" fill="#FF9F1C" />
  </svg>
);

const PeopleIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16 md:w-20 md:h-20">
    {/* 중앙 위 사람 */}
    <circle cx="32" cy="14" r="5" fill="#FF9F1C" />
    <path d="M32 20c-5 0-9 3-9 7v4h18v-4c0-4-4-7-9-7z" fill="#FF9F1C" />
    {/* 왼쪽 아래 사람 */}
    <circle cx="16" cy="32" r="4" fill="#FF9F1C" />
    <path d="M16 37c-4 0-7 2.5-7 5.5v5.5h14v-5.5c0-3-3-5.5-7-5.5z" fill="#FF9F1C" />
    {/* 오른쪽 아래 사람 */}
    <circle cx="48" cy="32" r="4" fill="#FF9F1C" />
    <path d="M48 37c-4 0-7 2.5-7 5.5v5.5h14v-5.5c0-3-3-5.5-7-5.5z" fill="#FF9F1C" />
  </svg>
);

const AtomIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16 md:w-20 md:h-20">
    {/* 중앙 원 */}
    <circle cx="32" cy="32" r="5" fill="#FF9F1C" />
    {/* 궤도 */}
    <ellipse cx="32" cy="32" rx="22" ry="9" stroke="#FF9F1C" strokeWidth="2" fill="none" />
    <ellipse cx="32" cy="32" rx="22" ry="9" stroke="#FF9F1C" strokeWidth="2" fill="none" transform="rotate(60 32 32)" />
    <ellipse cx="32" cy="32" rx="22" ry="9" stroke="#FF9F1C" strokeWidth="2" fill="none" transform="rotate(-60 32 32)" />
    {/* 전자 */}
    <circle cx="54" cy="32" r="3" fill="#FF9F1C" />
    <circle cx="21" cy="51" r="3" fill="#FF9F1C" />
    <circle cx="21" cy="13" r="3" fill="#FF9F1C" />
  </svg>
);

const coreValues = [
  {
    icon: <FamilyIcon />,
    titleKo: "풀필먼트",
    titleEn: "FULFILLMENT",
    description: "예이린은 취약아동과그 가정의 미충족의료 및 돌봄의 수요를 충족시킨다",
  },
  {
    icon: <PeopleIcon />,
    titleKo: "이노베이션",
    titleEn: "INNOVATION",
    description: "예이린은 전문성과 사회적 책무에 기반하여 취약아동 건강관리 및 돌봄 시장의 혁신을 이룬다",
  },
  {
    icon: <AtomIcon />,
    titleKo: "인터그레이션",
    titleEn: "INTERGRATION",
    description: "예이린은 아동의 건강과 돌봄의 빈틈을 채우고, 불평등을 해소하여 궁극적으로 사회통합에 기여한다",
  },
];

export default function PromiseSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-yeirin-cream/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Main Title with Decorative Lines */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-yeirin-orange mb-4 relative inline-block">
            건강특화 비영리 스타트업! 예이린
            {/* Decorative wavy lines */}
            <svg
              className="absolute -bottom-2 left-0 w-full h-3"
              viewBox="0 0 300 12"
              preserveAspectRatio="none"
            >
              <path
                d="M0,6 Q15,0 30,6 T60,6 T90,6 T120,6 T150,6 T180,6 T210,6 T240,6 T270,6 T300,6"
                stroke="#FFD43B"
                strokeWidth="2"
                fill="none"
                opacity="0.5"
              />
              <path
                d="M0,10 Q15,4 30,10 T60,10 T90,10 T120,10 T150,10 T180,10 T210,10 T240,10 T270,10 T300,10"
                stroke="#FF9F1C"
                strokeWidth="1.5"
                fill="none"
                opacity="0.3"
              />
            </svg>
          </h2>
        </div>

        {/* Mission Description */}
        <div className="text-center mb-10 max-w-4xl mx-auto">
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            예이린은{" "}
            <span className="text-yeirin-orange font-semibold">
              &apos;우리 아이가 평등하게 보호받는 건강한 세상 만들기&apos;
            </span>
            를 미션으로 하여
            <br className="hidden md:block" />
            &apos;취약아동&apos;을 대상으로 이들의{" "}
            <span className="text-yeirin-orange font-semibold">
              &apos;미충족 의료 및 돌봄&apos;
            </span>{" "}
            욕구 해결을 주 목적으로 하는 보건복지부, 과학기술정보통신부 소관 사회적협동조합입니다.
          </p>
        </div>

        {/* Government Ministry Logos */}
        <div className="flex justify-center items-center mb-16">
          <Image
            src="/images/gov-logo.png"
            alt="보건복지부, 과학기술정보통신부"
            width={500}
            height={80}
            className="h-14 md:h-16 w-auto object-contain"
          />
        </div>

        {/* Core Values Header */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-yeirin-yellow/10 via-yeirin-yellow/20 to-yeirin-yellow/10 py-3 px-6 rounded-lg">
            <h3 className="text-center text-lg md:text-xl font-bold text-yeirin-orange">
              예이린 3대 핵심가치
            </h3>
          </div>
        </div>

        {/* Core Values Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {coreValues.map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Icon Area */}
              <div className="pt-10 pb-8 flex justify-center bg-gradient-to-b from-gray-50 to-white">
                {value.icon}
              </div>

              {/* Content Area - flex-1 to fill equal height */}
              <div className="bg-yeirin-orange text-white p-8 rounded-t-3xl -mt-4 flex-1 flex flex-col">
                <h4 className="text-xl md:text-2xl font-bold text-center mb-1">
                  {value.titleKo}
                </h4>
                <p className="text-xs tracking-widest text-center text-white/80 mb-4">
                  {value.titleEn}
                </p>
                <p className="text-sm md:text-base text-center leading-relaxed text-white/90 flex-1 flex items-center justify-center">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
