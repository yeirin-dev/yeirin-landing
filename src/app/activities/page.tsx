"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import FastTrackReferralModal from "@/components/fast-track/FastTrackReferralModal";
import FastTrackCTA from "@/components/fast-track/FastTrackCTA";

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
    ],
    description:
      "취약아동을 대상으로 지역사회 건강검진 및 심사자가 의료를 연계하여 치료를 확인하고, 건강증진 정서인지발달지원 프로그램 통해 안전하게 성장시료를 제공하여 건강회복과 조기회복이 가능하도록 지원하고 있습니다. 또한 건강회복이 이루어진 아동은 건강의 지속성이 확보될 수 있도록 돌봄거점시설로 연계합니다.",
  },
  care: {
    image: "/images/activities/care.png",
    sections: [
      {
        title: "취약아동 대상 건강친화적 돌봄환경 구축",
        items: [
          "지역사회/취약아동돌봄 DB구축 및 설계",
          "건강적 돌봄 기금아동 건강증진시설 및 맞춤형 통합 지원",
        ],
      },
      {
        title: "취약아동 대상 센터 기반 돌봄서비스 제공",
        items: ["취약아동 대상 건강적 돌봄서비스 제공"],
      },
    ],
    description:
      "취약아동의 돌봄 서비스에 체소 및 자격 충실히 돌봄 체계를 구축을 위해 '취약아동 대상 건강적 돌봄거점 사업'을 추진사업으로서 운영하고 있습니다. 유영화시설(기타어린이집), 공동배움터(따하어린이), 함께 통 추진양육을 위한 출산 통 돌봄지원 이룸 돌봄 공동체시설 기반을 마련하고, 13개년 국내 의료시설 권역 돌봄시설 연계산업 외 증대적 발전을 잇는로만 약속힙니다.",
  },
  empowerment: {
    image: "/images/activities/empowerment.png",
    sections: [
      {
        title: "조합원과 직원에 대한 상담, 교육, 훈련 및 정보제공 사업",
        items: [
          "협동조합 기초교육 및 윤리 협동조합 기술사업 교육문",
          "협동조합 실무 교육 및 조합원 교육회의서 동의",
          "취약아동 맞춤형 돌봄서비스 교육과정 운영 및 협의",
        ],
      },
      {
        title: "조합 간 협력을 위한 사업",
        items: [
          "협동조합 네트워크 활동, 조합 간 발협력활동 등을 통한 협력사업 발굴",
          "예이린 특성 공동교육 과정 및 ESG경영과 관련한 연계 조직간 등과도 연대 교류",
        ],
      },
      {
        title: "조합의 홍보 및 지역사회를 위한 사업",
        items: [
          "협동조합 홍보물 기획제작 및 연행화 된 활동 홍보",
          "예이린 특성 사업 지역사회 홍보 교육 사업, 지역취약사업단과의 네트워킹 사업",
        ],
      },
    ],
    description:
      "사회적협동조합의 정신과 조합의 효과적 경영 및 미래을 다지고, 조합원 나아가 일 발전에게 어떠한 타달를을 하면된 협동조합 ESG(환경(Environment), 사회(Social), 지배구조(Governance)) 원격과 조합의 가치를 기반으로 살려가고, 지역사회조합원은 조합 간 교류를 통한 기관간역할강화 및 협력사업발굴을 운영하고 있습니다.",
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
              onClick={() => setIsReferralModalOpen(true)}
              className="mt-12"
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
