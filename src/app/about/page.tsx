import { Heart, Lightbulb, Users } from "lucide-react";
import Image from "next/image";

const values = [
  {
    icon: Heart,
    title: "해움",
    subtitle: "배려와 사랑",
    description:
      "취약계층 아동과 그 가족의 건강과 복지를 위해 배려하고 사랑으로 대합니다.",
  },
  {
    icon: Lightbulb,
    title: "혁신",
    subtitle: "Innovation",
    description:
      "전문성과 사회적 책임을 바탕으로 지역사회의 건강과 복지를 위해 노력합니다.",
  },
  {
    icon: Users,
    title: "통합",
    subtitle: "Integration",
    description:
      "아동의 건강과 돌봄을 통합적 관점에서 바라보고 전문적 서비스를 제공합니다.",
  },
];

const organizationChart = {
  top: "조합원총회",
  second: ["이사회", "감사"],
  third: ["전략경영팀부", "사업부", "예이린관리팀"],
  programs: [
    {
      title: "취약아동 건강관리 사업",
      items: ["취약아동 대상 의료연계 사업"],
    },
    {
      title: "취약아동 돌봄 사업",
      items: ["취약아동 대상 건강증진 돌봄거점 사업"],
    },
    {
      title: "기타 사업",
      items: ["마음대로 환경교육", "조합원 교육", "조합간 연대교류"],
    },
  ],
};

const boardMembers = [
  { name: "이사 박지영", role: "이사장", image: "" },
  { name: "이사 백남청", role: "이사", image: "" },
  { name: "이사 이경희", role: "이사", image: "" },
  { name: "이사 황제민", role: "이사", image: "" },
  { name: "이사 박태숙", role: "이사", image: "" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-yeirin-cream to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <p className="text-yeirin-orange font-medium mb-4">
            Health Care system for Your Child
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            예이린의 ESG 경영
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            예이린은 아동의 건강 및 발달에 관한 지식 및 지역사회 자원을 활용하여
            취약계층 아동들을 돌보는 사회적협동조합입니다. 조합 이해관계자들과의
            관계를 중요시하며, 환경과 다양한 분들을 취약인으로 삼고 있습니다.
          </p>
        </div>
      </section>

      {/* Mission Banner */}
      <section className="bg-yeirin-yellow py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center text-gray-900">
            <p className="text-sm md:text-base mb-2">
              Creating a healthy world where our children are equally protected.
            </p>
            <p className="font-bold text-lg md:text-xl">
              Let Our Children Be Healthy
            </p>
          </div>
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
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-yeirin-cream rounded-full flex items-center justify-center">
                    <Icon className="w-10 h-10 text-yeirin-orange" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {value.title}
                  </h3>
                  <p className="text-yeirin-orange text-sm mb-4">
                    {value.subtitle}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Organization Chart */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            예이린 조직도
          </h2>

          <div className="max-w-4xl mx-auto">
            {/* Top Level */}
            <div className="flex justify-center mb-4">
              <div className="bg-yeirin-yellow text-gray-900 px-8 py-3 rounded-lg font-bold">
                {organizationChart.top}
              </div>
            </div>

            {/* Connector Line */}
            <div className="flex justify-center mb-4">
              <div className="w-px h-8 bg-gray-300" />
            </div>

            {/* Second Level */}
            <div className="flex justify-center gap-8 mb-4">
              {organizationChart.second.map((item, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-yeirin-yellow text-gray-900 px-6 py-2 rounded-lg font-medium"
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Connector Line */}
            <div className="flex justify-center mb-4">
              <div className="w-px h-8 bg-gray-300" />
            </div>

            {/* Third Level */}
            <div className="flex justify-center gap-4 mb-8">
              {organizationChart.third.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm"
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Programs */}
            <div className="grid md:grid-cols-3 gap-4">
              {organizationChart.programs.map((program, index) => (
                <div
                  key={index}
                  className="bg-yeirin-cream rounded-xl p-4 border border-yeirin-yellow/30"
                >
                  <h4 className="font-bold text-yeirin-orange mb-3 text-sm">
                    {program.title}
                  </h4>
                  <ul className="space-y-2">
                    {program.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="text-gray-600 text-sm flex items-start gap-2"
                      >
                        <span className="text-yeirin-orange">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
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
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {boardMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <p className="font-medium text-gray-900">{member.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
