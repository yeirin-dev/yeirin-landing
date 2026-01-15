/**
 * Landing API - Partners
 * 프록시를 통해 백엔드 API 호출 (Mixed Content 문제 해결)
 */

// 프록시 경로 사용 (next.config.ts rewrites 설정)
const API_BASE_PATH = "/api/proxy";

export enum FacilityType {
  CARE_FACILITY = "CARE_FACILITY",
  COMMUNITY_CENTER = "COMMUNITY_CENTER",
  EDUCATION_WELFARE_SCHOOL = "EDUCATION_WELFARE_SCHOOL",
}

export interface Partner {
  id: string;
  name: string;
  facilityType: FacilityType;
  facilityTypeDisplayName: string;
  district: string;
  phoneNumber: string | null;
  address: string;
}

export interface CategoryCount {
  facilityType: FacilityType;
  label: string;
  count: number;
}

export interface PartnerListResponse {
  partners: Partner[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  categoryCounts: CategoryCount[];
  availableDistricts: string[];
}

export interface PartnerQueryParams {
  page?: number;
  limit?: number;
  facilityType?: FacilityType;
  district?: string;
}

/**
 * 파트너 기관 목록 조회
 */
export async function getPartners(
  params?: PartnerQueryParams
): Promise<PartnerListResponse> {
  const searchParams = new URLSearchParams();

  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.facilityType) searchParams.set("facilityType", params.facilityType);
  if (params?.district) searchParams.set("district", params.district);

  const queryString = searchParams.toString();
  const url = `${API_BASE_PATH}/v1/landing/partners${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url, {
    next: { revalidate: 60 }, // 60초 캐시
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch partners: ${response.status}`);
  }

  return response.json();
}

/**
 * 구/군 목록 조회
 */
export async function getDistricts(): Promise<string[]> {
  const response = await fetch(`${API_BASE_PATH}/v1/landing/partners/districts`, {
    next: { revalidate: 300 }, // 5분 캐시
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch districts: ${response.status}`);
  }

  return response.json();
}
