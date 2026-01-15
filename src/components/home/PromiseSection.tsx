"use client";

// 3대 핵심가치 아이콘 컴포넌트
const FamilyIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16">
    {/* 부모 */}
    <circle cx="20" cy="20" r="6" fill="#C85A4A" />
    <path d="M20 28c-6 0-10 4-10 8v4h20v-4c0-4-4-8-10-8z" fill="#C85A4A" />
    <circle cx="44" cy="20" r="6" fill="#C85A4A" />
    <path d="M44 28c-6 0-10 4-10 8v4h20v-4c0-4-4-8-10-8z" fill="#C85A4A" />
    {/* 아이 */}
    <circle cx="32" cy="32" r="5" fill="#C85A4A" />
    <path d="M32 38c-5 0-8 3-8 6v4h16v-4c0-3-3-6-8-6z" fill="#C85A4A" />
  </svg>
);

const PeopleIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16">
    {/* 중앙 사람 */}
    <circle cx="32" cy="16" r="6" fill="#C85A4A" />
    <path d="M32 24c-6 0-10 4-10 8v4h20v-4c0-4-4-8-10-8z" fill="#C85A4A" />
    {/* 왼쪽 사람 */}
    <circle cx="16" cy="28" r="5" fill="#C85A4A" />
    <path d="M16 34c-5 0-8 3-8 6v4h16v-4c0-3-3-6-8-6z" fill="#C85A4A" />
    {/* 오른쪽 사람 */}
    <circle cx="48" cy="28" r="5" fill="#C85A4A" />
    <path d="M48 34c-5 0-8 3-8 6v4h16v-4c0-3-3-6-8-6z" fill="#C85A4A" />
    {/* 연결선 */}
    <path d="M20 36h24" stroke="#C85A4A" strokeWidth="2" strokeDasharray="2 2" />
  </svg>
);

const AtomIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16">
    {/* 중앙 원 */}
    <circle cx="32" cy="32" r="6" fill="#C85A4A" />
    {/* 궤도 */}
    <ellipse cx="32" cy="32" rx="24" ry="10" stroke="#C85A4A" strokeWidth="2" fill="none" />
    <ellipse cx="32" cy="32" rx="24" ry="10" stroke="#C85A4A" strokeWidth="2" fill="none" transform="rotate(60 32 32)" />
    <ellipse cx="32" cy="32" rx="24" ry="10" stroke="#C85A4A" strokeWidth="2" fill="none" transform="rotate(-60 32 32)" />
    {/* 전자 */}
    <circle cx="56" cy="32" r="3" fill="#C85A4A" />
    <circle cx="20" cy="52" r="3" fill="#C85A4A" />
    <circle cx="20" cy="12" r="3" fill="#C85A4A" />
  </svg>
);

// 태극 로고 컴포넌트
const TaegeukLogo = () => (
  <svg viewBox="0 0 40 40" className="w-10 h-10">
    <circle cx="20" cy="20" r="18" fill="white" stroke="#ddd" strokeWidth="0.5" />
    {/* 빨간 부분 */}
    <path d="M20 2a18 18 0 0 1 0 36c0-5 4-9 9-9s9-4 9-9-4-9-9-9-9 4-9 9" fill="#C8102E" />
    {/* 파란 부분 */}
    <path d="M20 38a18 18 0 0 1 0-36c0 5-4 9-9 9s-9 4-9 9 4 9 9 9 9-4 9-9" fill="#003478" />
    {/* 작은 원 */}
    <circle cx="20" cy="11" r="5" fill="#C8102E" />
    <circle cx="20" cy="29" r="5" fill="#003478" />
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
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Main Title with Decorative Lines */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#C85A4A] mb-2 relative inline-block">
            건강특화 비영리 스타트업! 예이린
            {/* Decorative wavy lines */}
            <svg
              className="absolute -bottom-2 left-0 w-full h-3"
              viewBox="0 0 300 12"
              preserveAspectRatio="none"
            >
              <path
                d="M0,6 Q15,0 30,6 T60,6 T90,6 T120,6 T150,6 T180,6 T210,6 T240,6 T270,6 T300,6"
                stroke="#C85A4A"
                strokeWidth="2"
                fill="none"
                opacity="0.3"
              />
              <path
                d="M0,10 Q15,4 30,10 T60,10 T90,10 T120,10 T150,10 T180,10 T210,10 T240,10 T270,10 T300,10"
                stroke="#C85A4A"
                strokeWidth="1.5"
                fill="none"
                opacity="0.2"
              />
            </svg>
          </h2>
        </div>

        {/* Mission Description */}
        <div className="text-center mb-10 max-w-4xl mx-auto">
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            예이린은{" "}
            <span className="text-[#E8A838] font-semibold">
              &apos;우리 아이가 평등하게 보호받는 건강한 세상 만들기&apos;
            </span>
            를 미션으로 하여
            <br className="hidden md:block" />
            &apos;취약아동&apos;을 대상으로 이들의{" "}
            <span className="text-[#E8A838] font-semibold">
              &apos;미충족 의료 및 돌봄&apos;
            </span>{" "}
            욕구 해결을 주 목적으로 하는 보건복지부, 과학기술정보통신부 소관 사회적협동조합입니다.
          </p>
        </div>

        {/* Government Ministry Logos */}
        <div className="flex justify-center items-center gap-8 md:gap-16 mb-12">
          <div className="flex items-center gap-2">
            <TaegeukLogo />
            <span className="text-sm md:text-base font-medium text-gray-700">보건복지부</span>
          </div>
          <div className="flex items-center gap-2">
            <TaegeukLogo />
            <span className="text-sm md:text-base font-medium text-gray-700">과학기술정보통신부</span>
          </div>
        </div>

        {/* Core Values Header */}
        <div className="mb-10">
          <div className="bg-gradient-to-r from-[#C85A4A]/10 via-[#C85A4A]/20 to-[#C85A4A]/10 py-3 px-6 rounded-lg">
            <h3 className="text-center text-lg md:text-xl font-bold text-[#C85A4A]">
              예이린 3대 핵심가치
            </h3>
          </div>
        </div>

        {/* Core Values Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {coreValues.map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Icon Area */}
              <div className="pt-8 pb-6 flex justify-center bg-gradient-to-b from-gray-50 to-white">
                {value.icon}
              </div>

              {/* Content Area */}
              <div className="bg-[#C85A4A] text-white p-6 rounded-t-3xl -mt-4">
                <h4 className="text-xl md:text-2xl font-bold text-center mb-1">
                  {value.titleKo}
                </h4>
                <p className="text-xs tracking-widest text-center text-white/80 mb-4">
                  {value.titleEn}
                </p>
                <p className="text-sm text-center leading-relaxed text-white/90">
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
