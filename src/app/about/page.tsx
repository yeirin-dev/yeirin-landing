import { Heart, Lightbulb, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { boardMembers, techMembers } from "@/data/members";

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

      {/* History Section */}
      <section className="py-16 md:py-24 bg-white">
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

      {/* Organization Chart */}
      <section className="py-16 md:py-24 bg-gray-50">
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
    </div>
  );
}
