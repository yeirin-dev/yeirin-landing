"use client";

import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    title: "아동 복지사업",
    description: "취약계층 아동의 건강과 복지를 위한 전문 돌봄 서비스",
    image: "/images/categories/child-welfare.svg",
    bgColor: "bg-yeirin-yellow",
    textColor: "text-white",
    href: "/activities#child",
  },
  {
    title: "성인 요양사업",
    description: "어르신들을 위한 맞춤형 요양 및 돌봄 서비스",
    image: "/images/categories/adult-care.svg",
    bgColor: "bg-yeirin-orange",
    textColor: "text-white",
    href: "/activities#adult",
  },
  {
    title: "생활 복지사업",
    description: "지역사회 주민들의 생활 안정을 위한 복지 프로그램",
    image: "/images/categories/living-welfare.svg",
    bgColor: "bg-emerald-500",
    textColor: "text-white",
    href: "/activities#living",
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

        {/* Category Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={category.href}
              className={`group relative rounded-2xl overflow-hidden ${category.bgColor} transition-transform hover:-translate-y-1 hover:shadow-xl`}
            >
              {/* Image */}
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content Overlay */}
              <div className={`p-6 ${category.textColor}`}>
                <h3 className="text-xl font-bold mb-2">
                  {category.title}
                </h3>
                <p className="text-sm opacity-90">
                  {category.description}
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
          ))}
        </div>
      </div>
    </section>
  );
}
