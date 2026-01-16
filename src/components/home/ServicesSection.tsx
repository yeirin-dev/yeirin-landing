"use client";

import Link from "next/link";
import { Heart, Home, Users } from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "취약아동 건강사업",
    description: "지역사회 의료 전문기관과 협력하여 취약아동 건강검진, 관리지원 및 건강증진 프로그램을 제공합니다.",
    bgColor: "bg-yeirin-yellow",
    href: "/activities?tab=health",
  },
  {
    icon: Home,
    title: "취약아동 돌봄사업",
    description: "건강친화적 돌봄환경 구축 및 센터 기반 돌봄서비스를 통해 취약아동의 안전한 성장을 지원합니다.",
    bgColor: "bg-yeirin-orange",
    href: "/activities?tab=care",
  },
  {
    icon: Users,
    title: "조합 역량강화 사업",
    description: "조합원 교육, 조합 간 협력, 지역사회 홍보를 통해 협동조합의 가치를 실현합니다.",
    bgColor: "bg-emerald-500",
    href: "/activities?tab=empowerment",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            예이린 주요 사업
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            예이린이 진행하는 다양한 사업들을 소개합니다
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                key={index}
                href={service.href}
                className={`group relative rounded-2xl overflow-hidden ${service.bgColor} transition-transform hover:-translate-y-1 hover:shadow-xl`}
              >
                {/* Icon Area */}
                <div className="aspect-[4/3] relative overflow-hidden flex items-center justify-center">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-12 h-12 text-white" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm opacity-90 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mt-4 flex items-center text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">
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
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
