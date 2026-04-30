"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import FastTrackReferralModal from "@/components/fast-track/FastTrackReferralModal";
import FastTrackCTA from "@/components/fast-track/FastTrackCTA";
import {FastTrackSection} from "@/components/home";

type TabType = "health" | "care" | "empowerment";

const tabs = [
  { id: "health" as TabType, label: "취약아동 건강사업" },
  { id: "care" as TabType, label: "취약아동 돌봄사업" },
  { id: "empowerment" as TabType, label: "조합 역량강화 사업" },
];

const contentData = {
  health: {
    image: "/images/activities/health.png",
    sections: [
      {
        title: "취약아동 대상 의료지원 사업",
        items: [
          "지역사회 의료 전문기관 및 전문가 발굴",
          "취약아동 대상 건강상태 스크리닝 및 미충족 의료 실태 조사",
          "만성질환 및 특수 건강관리가 필요한 아동 대상 의료서비스 연계 및 맞춤형 의료지원",
          "취약아동의 의료접근성 강화를 위한 온라인 플랫폼 구축 및 기술특허 출원",
        ],
      },
      {
        title: "취약 아동 대상 건강증진 사업",
        items: [
          "기 개발된 프로그램의 확신 및 보급",
          "취약아동 맞춤형 프로그램(교육용 콘텐츠) 기획 및 개발"
        ],
      },
    ],
    description:
      "취약아동을 대상으로 정기 건강검진을 실시해 성장·발육 상태를 확인하고, 건강문제와 요구를 조기에 발견합니다. 개인 맞춤형 건강관리서비스를 통해 아동의 자기 건강관리 역량과 건강정보 이해능력을 높이며, 지역사회 자원과 의료 전문가를 연계한 플랫폼으로 상담·중재·건강지원을 제공해 의료접근성을 강화하고 아동기 건강불평등 해소를 목표로 합니다.\n",
  },
  care: {
    image: "/images/activities/care.png",
    sections: [
      {
        title: "취약아동 대상 건강친화적 돌봄환경 구축",
        items: [
          "거점사업(지역아동센터) TFT 구성 및 운영",
          "건강특화 돌봄 거점사업 관련 현황조사 및 모델 연구"
        ],
      },
      {
        title: "취약아동 대상 센터 기반 돌봄서비스 제공",
        items: ["취약아동 대상 건강특화 돌봄서비스 제공"],
      },
    ],
    description:
      "취약아동 대취약아동 돌봄 사각지대 해소와 지역 중심 돌봄체계 구축을 위해 「건강특화 돌봄거점 사업」을 추진합니다. 추진단을 구성해 국내외 사례 조사와 모델 개발을 진행하고, 이를 바탕으로 지역사회 주도의 아동 돌봄 기반을 마련하며 향후 대표 모델로 자리잡는 것을 목표로 합니다.상 건강특화 돌봄서비스 제공합니다.",
  },
  empowerment: {
    image: "/images/activities/empowerment.png",
    sections: [
      {
        title: "조합원과 직원에 대한 상담, 교육, 훈련 및 정보제공 사업",
        items: [
          "협동조합 기본교육 및 훈련: 협동조합 기본이해 교육용",
          "협동조합 정보제공: 정기적인 조합 활동 정보제공 (예. 온라인 커뮤니티 개설)",
          "예이린 특화 교육 사업: ESG 경영 및 실천에 관한 교육, 최첨단 과학기술 활용에 관한 교육"
],
      },
      {
        title: "조합 간 협력을 위한 사업",
        items: [
          "협동조합 네트워크 활동: 조합 간 업무협약을 통한 협력사업 발굴",
          "예이린 특화 공동교육 사업: ESG 경영 및 실천에 관한 교육, 최첨단 과학기술 활용에 관한 교육"
],
      },
      {
        title: "조합의 홍보 및 지역사회를 위한 사업",
        items: [
          "협동조합 홍보활동: 지자체 행사와 연계한 예이린 홍보 캠패인",
          "예이린 특화 사업: 미래세대 환경 교육 사업, 기후위기대응 및 생태환경 보호 캠페인"
],
      },
    ],
    description:
      "사회적협동조합의 가치와 연대 의식을 강화하고, 조합의 방향성을 논의하는 자리를 마련합니다. ESG 경영을 바탕으로 교육과 협력을 통해 환경보호와 기후위기 대응의 중요성을 확산하며, 다양한 전문가와의 협업 및 기업·지자체 연계를 통해 자원을 확보하고 사회공헌과 ESG 실천을 추진합니다.",
  },
};

function ActivitiesContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>("health");
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && ["health", "care", "empowerment"].includes(tab)) {
      setActiveTab(tab as TabType);
    }
  }, [searchParams]);

  const currentContent = contentData[activeTab];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-yeirin-cream to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <p className="text-yeirin-orange font-medium mb-4">
            Health Care system for Your Child
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            예이린 사업 안내
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            예이린이 펼치는 다양한 활동을 소개합니다
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-center gap-2 md:gap-8 py-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 md:px-6 py-2 rounded-full font-medium text-sm md:text-base transition-colors ${
                  activeTab === tab.id
                    ? "bg-yeirin-yellow text-gray-900 font-medium"
                    : "text-gray-600 hover:text-yeirin-orange"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Program Details */}
            <div className="space-y-8">
              {currentContent.sections.map((section, index) => (
                <div key={index}>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-yeirin-yellow rounded-full" />
                    {section.title}
                  </h3>
                  <ul className="space-y-3 pl-4">
                    {section.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="text-gray-600 flex items-start gap-2"
                      >
                        <span className="text-yeirin-orange mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Right - Image */}
            <div className="flex items-center justify-center">
              <div className="w-full rounded-2xl overflow-hidden">
                <Image
                  src={currentContent.image}
                  alt={tabs.find((t) => t.id === activeTab)?.label || ""}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="mt-16 bg-gray-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              사업 상세 내용 소개
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {currentContent.description}
            </p>
          </div>

          {/* 긴급 의뢰 CTA - care 탭에서만 노출 */}
          {activeTab === "care" && (
            <FastTrackCTA
                onClick={() =>
                    window.open("https://fast.yeirin.com", "_blank", "noopener,noreferrer")
                }
            />
          )}
        </div>
      </section>

      {/* 긴급 의뢰 모달 */}
      {isReferralModalOpen && (
        <FastTrackReferralModal
          onClose={() => setIsReferralModalOpen(false)}
        />
      )}
    </div>
  );
}

export default function ActivitiesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ActivitiesContent />
    </Suspense>
  );
}
