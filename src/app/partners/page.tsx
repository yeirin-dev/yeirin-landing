"use client";

import { useState } from "react";
import { Building2, Brain, Heart, ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  {
    icon: Building2,
    title: "아동 복지시설",
    count: 12,
    color: "bg-yellow-100",
  },
  {
    icon: Brain,
    title: "마음건강 연계 플랫폼",
    count: 8,
    color: "bg-orange-100",
  },
  {
    icon: Heart,
    title: "심리 상담센터",
    count: 15,
    color: "bg-amber-100",
  },
];

const partners = [
  { name: "마루돌봄심리상담센터", phone: "010-1234-5678", region: "해운대구" },
  { name: "마루돌봄심리상담센터", phone: "010-1234-5678", region: "수영구" },
  { name: "마루돌봄심리상담센터", phone: "010-1234-5678", region: "동래구" },
  { name: "마루돌봄심리상담센터", phone: "010-1234-5678", region: "부산진구" },
  { name: "마루돌봄심리상담센터", phone: "010-1234-5678", region: "연제구" },
  { name: "마루돌봄심리상담센터", phone: "010-1234-5678", region: "사하구" },
  { name: "마루돌봄심리상담센터", phone: "010-1234-5678", region: "금정구" },
  { name: "마루돌봄심리상담센터", phone: "010-1234-5678", region: "북구" },
];

const regions = [
  "전체",
  "해운대구",
  "수영구",
  "동래구",
  "부산진구",
  "연제구",
  "사하구",
  "금정구",
  "북구",
  "강서구",
  "사상구",
  "남구",
];

export default function PartnersPage() {
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPartners =
    selectedRegion === "전체"
      ? partners
      : partners.filter((p) => p.region === selectedRegion);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-yeirin-cream to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <p className="text-yeirin-orange font-medium mb-4">
            Health Care system for Your Child
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            예이린과 협력한 기관
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            함께 걸은 지역에서 예이린과 함께 하고 있습니다
          </p>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 p-6 bg-white border border-gray-100 rounded-2xl hover:shadow-lg transition-shadow"
                >
                  <div
                    className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center`}
                  >
                    <Icon className="w-8 h-8 text-yeirin-orange" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{category.title}</h3>
                    <p className="text-gray-500 text-sm">{category.count}개 기관</p>
                  </div>
                  <div className="text-yeirin-orange">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Map & List Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Map Placeholder */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">
                부산광역시 예이린 희력관역시 기관
              </h3>
              <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center">
                {/* Map SVG Placeholder */}
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full max-w-md text-gray-300"
                >
                  <path
                    d="M100 20 L140 60 L160 100 L140 140 L100 180 L60 140 L40 100 L60 60 Z"
                    fill="currentColor"
                    opacity="0.3"
                  />
                  <circle cx="100" cy="100" r="5" fill="#FFD43B" />
                  <circle cx="120" cy="80" r="4" fill="#FF9F1C" />
                  <circle cx="80" cy="120" r="4" fill="#FF9F1C" />
                  <circle cx="110" cy="130" r="4" fill="#FF9F1C" />
                </svg>
              </div>
            </div>

            {/* Partners List */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              {/* Region Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                {regions.slice(0, 6).map((region) => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedRegion === region
                        ? "bg-yeirin-yellow text-gray-900 font-medium"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>

              {/* Partners Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                        No
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                        기관명
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                        연락처
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPartners.map((partner, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4 text-sm text-gray-900">
                          <span className="bg-yeirin-yellow text-gray-900 font-medium px-2 py-1 rounded text-xs">
                            {index + 1}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">
                          {partner.name}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {partner.phone}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-2 mt-6">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <ChevronLeft size={18} />
                </button>
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-sm ${
                      currentPage === page
                        ? "bg-yeirin-yellow text-gray-900 font-medium"
                        : "hover:bg-gray-100 text-gray-600"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
