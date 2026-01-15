"use client";

import Image from "next/image";
import Link from "next/link";
import { boardMembers, techMembers } from "@/data/members";

// 3대 핵심가치 아이콘 컴포넌트 (메인페이지와 동일)
const FamilyIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16 md:w-20 md:h-20">
    <circle cx="18" cy="18" r="5" fill="#FF9F1C" />
    <path d="M18 24c-5 0-9 3-9 7v5h18v-5c0-4-4-7-9-7z" fill="#FF9F1C" />
    <circle cx="46" cy="18" r="5" fill="#FF9F1C" />
    <path d="M46 24c-5 0-9 3-9 7v5h18v-5c0-4-4-7-9-7z" fill="#FF9F1C" />
    <circle cx="32" cy="28" r="4" fill="#FF9F1C" />
    <path d="M32 33c-4 0-7 2.5-7 5.5v5.5h14v-5.5c0-3-3-5.5-7-5.5z" fill="#FF9F1C" />
  </svg>
);

const PeopleIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16 md:w-20 md:h-20">
    <circle cx="32" cy="14" r="5" fill="#FF9F1C" />
    <path d="M32 20c-5 0-9 3-9 7v4h18v-4c0-4-4-7-9-7z" fill="#FF9F1C" />
    <circle cx="16" cy="32" r="4" fill="#FF9F1C" />
    <path d="M16 37c-4 0-7 2.5-7 5.5v5.5h14v-5.5c0-3-3-5.5-7-5.5z" fill="#FF9F1C" />
    <circle cx="48" cy="32" r="4" fill="#FF9F1C" />
    <path d="M48 37c-4 0-7 2.5-7 5.5v5.5h14v-5.5c0-3-3-5.5-7-5.5z" fill="#FF9F1C" />
  </svg>
);

const AtomIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16 md:w-20 md:h-20">
    <circle cx="32" cy="32" r="5" fill="#FF9F1C" />
    <ellipse cx="32" cy="32" rx="22" ry="9" stroke="#FF9F1C" strokeWidth="2" fill="none" />
    <ellipse cx="32" cy="32" rx="22" ry="9" stroke="#FF9F1C" strokeWidth="2" fill="none" transform="rotate(60 32 32)" />
    <ellipse cx="32" cy="32" rx="22" ry="9" stroke="#FF9F1C" strokeWidth="2" fill="none" transform="rotate(-60 32 32)" />
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

const navButtons = [
  { label: "예이린", targetId: "top" },
  { label: "연혁", targetId: "history" },
  { label: "조직구성", targetId: "organization" },
  { label: "CI character", targetId: "ci-character" },
];

export default function AboutPage() {
  const scrollToSection = (targetId: string) => {
    if (targetId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen" id="top">
      {/* Hero Section - 메인페이지 문구 사용 */}
      <section className="bg-gradient-to-b from-yeirin-cream to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <p className="text-gray-600 text-sm md:text-base mb-4 tracking-wider">
            기술로 돌봄을 새롭게, 아이들의 내일을 따뜻하게
          </p>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-relaxed mb-2">
            대한민국을 넘어 글로벌 돌봄 혁신을 선도하는
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-yeirin-orange tracking-wide">
            TECH–NON PROFIT, 예이린 사회적협동조합
          </p>
        </div>
      </section>

      {/* Navigation Buttons - 노란색 섹션 */}
      <section className="bg-yeirin-yellow py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {navButtons.map((button) => (
              <button
                key={button.targetId}
                onClick={() => scrollToSection(button.targetId)}
                className="bg-white hover:bg-gray-50 px-6 py-3 rounded-lg text-gray-900 font-medium transition-all duration-200 hover:shadow-md min-w-[120px]"
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3대 핵심가치 - 메인페이지 컴포넌트 재활용 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-12">
            <div className="bg-gradient-to-r from-yeirin-yellow/10 via-yeirin-yellow/20 to-yeirin-yellow/10 py-3 px-6 rounded-lg">
              <h2 className="text-center text-lg md:text-xl font-bold text-yeirin-orange">
                예이린 3대 핵심가치
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <div className="pt-10 pb-8 flex justify-center bg-gradient-to-b from-gray-50 to-white">
                  {value.icon}
                </div>
                <div className="bg-yeirin-orange text-white p-8 rounded-t-3xl -mt-4 flex-1 flex flex-col">
                  <h3 className="text-xl md:text-2xl font-bold text-center mb-1">
                    {value.titleKo}
                  </h3>
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

      {/* History Section */}
      <section id="history" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            예이린 연혁
          </h2>
          <div className="max-w-6xl mx-auto">
            <Image
              src="/images/about/연혁.png"
              alt="예이린 연혁 - 2021년부터 2025년까지의 주요 활동"
              width={1200}
              height={400}
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Organization Section */}
      <section id="organization" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            예이린 조직도
          </h2>
          <div className="max-w-5xl mx-auto">
            <Image
              src="/images/about/조직도.png"
              alt="예이린 조직도 - 이사장, 이사진, 전문위원, 자문위원, 사업본부 등"
              width={1200}
              height={600}
              className="w-full h-auto rounded-2xl shadow-lg bg-white p-4"
            />
          </div>
        </div>
      </section>

      {/* Board Members */}
      <section className="py-16 md:py-24 bg-yeirin-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              이사회
            </h2>
            <p className="text-gray-600">
              예이린을 이끌어가고 있는{" "}
              <span className="text-yeirin-orange font-medium">구성원</span>을
              소개합니다
            </p>
            <p className="text-gray-500 text-sm mt-2">
              프로필을 클릭하면 상세 정보를 확인할 수 있습니다
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {boardMembers.map((member) => (
              <Link
                key={member.id}
                href={`/about/members/${member.id}`}
                className="group text-center"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center ring-4 ring-transparent group-hover:ring-yeirin-yellow transition-all duration-300 group-hover:scale-105">
                  {member.image && !member.image.includes("undefined") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      className="w-16 h-16 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  )}
                </div>
                <p className="font-medium text-gray-900 group-hover:text-yeirin-orange transition-colors">
                  {member.name}
                </p>
                <p className="text-sm text-gray-500">{member.role}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Development Team */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              기술개발본부
            </h2>
            <p className="text-gray-600">
              예이린의{" "}
              <span className="text-yeirin-orange font-medium">기술 혁신</span>을
              이끌어가는 구성원을 소개합니다
            </p>
            <p className="text-gray-500 text-sm mt-2">
              프로필을 클릭하면 상세 정보를 확인할 수 있습니다
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {techMembers.map((member) => (
              <Link
                key={member.id}
                href={`/about/members/${member.id}`}
                className="group text-center"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center ring-4 ring-transparent group-hover:ring-yeirin-yellow transition-all duration-300 group-hover:scale-105">
                  {member.image && !member.image.includes("undefined") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      className="w-16 h-16 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  )}
                </div>
                <p className="font-medium text-gray-900 group-hover:text-yeirin-orange transition-colors">
                  {member.name}
                </p>
                <p className="text-sm text-gray-500">{member.role}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ESG 경영 Section - 기존 Hero 내용 이동 */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <p className="text-yeirin-orange font-medium mb-4">
            Health Care system for Your Child
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            예이린의 ESG 경영
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            예이린은 아동의 건강 및 발달에 관한 지식 및 지역사회 자원을 활용하여
            취약계층 아동들을 돌보는 사회적협동조합입니다. 조합 이해관계자들과의
            관계를 중요시하며, 환경과 다양한 분들을 취약인으로 삼고 있습니다.
          </p>
          <div className="bg-yeirin-yellow/30 rounded-2xl py-8 px-6 max-w-2xl mx-auto">
            <p className="text-sm md:text-base mb-2 text-gray-700">
              Creating a healthy world where our children are equally protected.
            </p>
            <p className="font-bold text-lg md:text-xl text-gray-900">
              Let Our Children Be Healthy
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <span className="bg-gray-900/10 px-4 py-2 rounded-full text-gray-900 text-sm font-medium">
                아동건강관리
              </span>
              <span className="bg-gray-900/10 px-4 py-2 rounded-full text-gray-900 text-sm font-medium">
                사회복지서비스
              </span>
              <span className="bg-gray-900/10 px-4 py-2 rounded-full text-gray-900 text-sm font-medium">
                지역사회협력
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CI Character Section - 빈 공간 */}
      <section id="ci-character" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            CI Character
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-100 rounded-2xl h-64 md:h-96 flex items-center justify-center border-2 border-dashed border-gray-300">
              <p className="text-gray-400 text-lg">CI Character 영역</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
