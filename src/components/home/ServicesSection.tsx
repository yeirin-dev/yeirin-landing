"use client";

import Link from "next/link";
import Image from "next/image";

const services = [
  {
    icon: "/images/services/child-welfare.svg",
    title: "취약아동 건강사업",
    description: "취약계층 아동의 건강관리를 위한 체계적인 프로그램 운영",
    href: "/activities#health",
  },
  {
    icon: "/images/services/support.svg",
    title: "취약아동 돌봄사업",
    description: "아동들의 전인적 성장을 지원하는 돌봄 서비스 제공",
    href: "/activities#care",
  },
  {
    icon: "/images/services/community.svg",
    title: "조합 역량강화 사업",
    description: "조합원과 지역사회를 위한 교육 및 협력 프로그램",
    href: "/activities#empowerment",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            주요 사업 안내
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            예이린이 진행하는 다양한 사업들을 소개합니다
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="group bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-20 h-20 mb-6 group-hover:scale-110 transition-transform">
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={80}
                  height={80}
                  className="w-full h-full"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yeirin-orange transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>
              <div className="mt-4 flex items-center text-yeirin-orange font-medium text-sm">
                자세히 보기
                <svg
                  className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
