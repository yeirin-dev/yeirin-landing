"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Building2, Heart, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import {
  getPartners,
  FacilityType,
  type Partner,
  type PartnerListResponse,
  type CategoryCount,
} from "@/lib/api/partners";
import KakaoMap from "@/components/KakaoMap";

// 카테고리 아이콘 매핑 (교육복지사협회는 학교측 요청으로 노출 제외)
const categoryIcons: Partial<Record<FacilityType, typeof Building2>> = {
  [FacilityType.CARE_FACILITY]: Building2,
  [FacilityType.COMMUNITY_CENTER]: Heart,
};

// 카테고리 색상 매핑
const categoryColors: Partial<Record<FacilityType, string>> = {
  [FacilityType.CARE_FACILITY]: "bg-yellow-100",
  [FacilityType.COMMUNITY_CENTER]: "bg-orange-100",
};

const ITEMS_PER_PAGE = 10;

export default function PartnersPage() {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<FacilityType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<PartnerListResponse | null>(null);
  const [allPartners, setAllPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const fetchPartners = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getPartners({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        facilityType: selectedCategory || undefined,
        district: selectedDistrict || undefined,
      });
      setData(response);
    } catch (err) {
      setError("기관 정보를 불러오는데 실패했습니다.");
      console.error("Failed to fetch partners:", err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, selectedCategory, selectedDistrict]);

  useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);

  // 지도에 표시할 모든 파트너 가져오기 (페이지네이션 없이)
  useEffect(() => {
    const fetchAllPartners = async () => {
      try {
        const response = await getPartners({
          limit: 200, // 충분히 큰 수
          facilityType: selectedCategory || undefined,
          district: selectedDistrict || undefined,
        });
        setAllPartners(response.partners);
      } catch (err) {
        console.error("Failed to fetch all partners for map:", err);
      }
    };
    fetchAllPartners();
  }, [selectedCategory, selectedDistrict]);

  // 필터 변경 시 페이지 리셋
  const handleDistrictChange = (district: string | null) => {
    setSelectedDistrict(district);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: FacilityType | null) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setCurrentPage(1);
  };

  // 표시할 지역 목록 (전체 + API에서 받은 지역들)
  const displayDistricts = data?.availableDistricts || [];

  // 페이지 번호 계산
  const totalPages = data?.totalPages || 1;
  const pageNumbers = Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
    const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
    return start + i;
  }).filter((p) => p <= totalPages);

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

      {/* Partnership Ecosystem */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            예이린 파트너십 생태계
          </h2>
          <div className="w-full">
            <Image
              src="/images/partners/파트너쉽.png"
              alt="예이린 파트너십 생태계 - 공공 거버넌스 파트너, 학술/연구 혁신 파트너, 국제/시민사회 파트너"
              width={1600}
              height={700}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {data?.categoryCounts.map((category: CategoryCount) => {
              const Icon = categoryIcons[category.facilityType];
              const colorClass = categoryColors[category.facilityType];
              if (!Icon || !colorClass) return null; // 교육복지사협회 등 미지원 카테고리 제외
              const isSelected = selectedCategory === category.facilityType;
              return (
                <button
                  key={category.facilityType}
                  onClick={() => handleCategoryChange(category.facilityType)}
                  className={`flex items-center gap-4 p-6 bg-white border rounded-2xl hover:shadow-lg transition-all text-left ${
                    isSelected
                      ? "border-yeirin-orange shadow-md"
                      : "border-gray-100"
                  }`}
                >
                  <div
                    className={`w-16 h-16 ${colorClass} rounded-2xl flex items-center justify-center`}
                  >
                    <Icon className="w-8 h-8 text-yeirin-orange" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{category.label}</h3>
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
                </button>
              );
            })}
            {/* 로딩 중 스켈레톤 */}
            {loading && !data && (
              <>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-6 bg-white border border-gray-100 rounded-2xl animate-pulse"
                  >
                    <div className="w-16 h-16 bg-gray-200 rounded-2xl" />
                    <div className="flex-1">
                      <div className="h-5 bg-gray-200 rounded w-24 mb-2" />
                      <div className="h-4 bg-gray-100 rounded w-16" />
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Map & List Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Kakao Map */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">
                부산광역시 예이린 협력 기관
              </h3>
              <div className="aspect-square relative rounded-xl overflow-hidden">
                <KakaoMap
                  partners={allPartners}
                  selectedPartner={selectedPartner}
                  onMarkerClick={(partner) => setSelectedPartner(partner)}
                />
              </div>
            </div>

            {/* Partners List */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              {/* Region Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => handleDistrictChange(null)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedDistrict === null
                      ? "bg-yeirin-yellow text-gray-900 font-medium"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  전체
                </button>
                {displayDistricts.slice(0, 5).map((district) => (
                  <button
                    key={district}
                    onClick={() => handleDistrictChange(district)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedDistrict === district
                        ? "bg-yeirin-yellow text-gray-900 font-medium"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {district}
                  </button>
                ))}
                {displayDistricts.length > 5 && (
                  <select
                    value={selectedDistrict || ""}
                    onChange={(e) =>
                      handleDistrictChange(e.target.value || null)
                    }
                    className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600 hover:bg-gray-200 border-none focus:ring-2 focus:ring-yeirin-orange"
                  >
                    <option value="">더보기</option>
                    {displayDistricts.slice(5).map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Error State */}
              {error && (
                <div className="text-center py-8 text-red-500">{error}</div>
              )}

              {/* Loading State */}
              {loading && (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-yeirin-orange" />
                </div>
              )}

              {/* Partners Table */}
              {!loading && !error && data && (
                <>
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
                        {data.partners.length === 0 ? (
                          <tr>
                            <td
                              colSpan={3}
                              className="text-center py-8 text-gray-500"
                            >
                              조건에 맞는 기관이 없습니다.
                            </td>
                          </tr>
                        ) : (
                          data.partners.map((partner, index) => (
                            <tr
                              key={partner.id}
                              onClick={() => setSelectedPartner(partner)}
                              className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                                selectedPartner?.id === partner.id ? "bg-yeirin-cream" : ""
                              }`}
                            >
                              <td className="py-3 px-4 text-sm text-gray-900">
                                <span className="bg-yeirin-yellow text-gray-900 font-medium px-2 py-1 rounded text-xs">
                                  {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-sm text-gray-900">
                                <div>{partner.name}</div>
                                <div className="text-xs text-gray-500">
                                  {partner.facilityTypeDisplayName} · {partner.district}
                                </div>
                              </td>
                              <td className="py-3 px-4 text-sm text-gray-600">
                                {partner.phoneNumber
                                  ? partner.phoneNumber.startsWith("010")
                                    ? "010-****-****"
                                    : partner.phoneNumber
                                  : "-"}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-6">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      {pageNumbers.map((page) => (
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
                        onClick={() =>
                          setCurrentPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  )}

                  {/* Total Count */}
                  <div className="text-center text-sm text-gray-500 mt-4">
                    총 {data.total}개 기관
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
