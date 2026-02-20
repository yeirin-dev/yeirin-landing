"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { type Partner, FacilityType } from "@/lib/api/partners";

// 카카오맵 타입 선언
declare global {
  interface Window {
    kakao: typeof kakao;
  }
}

declare namespace kakao.maps {
  class Map {
    constructor(container: HTMLElement, options: MapOptions);
    setCenter(latlng: LatLng): void;
    setLevel(level: number): void;
    setBounds(bounds: LatLngBounds): void;
  }

  class LatLng {
    constructor(lat: number, lng: number);
    getLat(): number;
    getLng(): number;
  }

  class LatLngBounds {
    constructor();
    extend(latlng: LatLng): void;
  }

  class Marker {
    constructor(options: MarkerOptions);
    setMap(map: Map | null): void;
    getPosition(): LatLng;
  }

  class CustomOverlay {
    constructor(options: CustomOverlayOptions);
    setMap(map: Map | null): void;
  }

  interface MapOptions {
    center: LatLng;
    level: number;
  }

  interface MarkerOptions {
    position: LatLng;
    map?: Map;
    image?: MarkerImage;
  }

  interface CustomOverlayOptions {
    position: LatLng;
    content: string | HTMLElement;
    map?: Map;
    yAnchor?: number;
    xAnchor?: number;
  }

  class MarkerImage {
    constructor(src: string, size: Size, options?: MarkerImageOptions);
  }

  class Size {
    constructor(width: number, height: number);
  }

  interface MarkerImageOptions {
    offset?: Point;
  }

  class Point {
    constructor(x: number, y: number);
  }

  namespace services {
    class Geocoder {
      addressSearch(
        address: string,
        callback: (result: GeocoderResult[], status: Status) => void
      ): void;
    }

    interface GeocoderResult {
      x: string;
      y: string;
      address_name: string;
    }

    enum Status {
      OK = "OK",
      ZERO_RESULT = "ZERO_RESULT",
      ERROR = "ERROR",
    }
  }

  namespace event {
    function addListener(
      target: Marker | Map,
      type: string,
      handler: () => void
    ): void;
  }

  function load(callback: () => void): void;
}

// 기관 유형별 마커 색상
const MARKER_COLORS: Record<FacilityType, string> = {
  [FacilityType.CARE_FACILITY]: "#FFB800", // 노란색 (양육시설)
  [FacilityType.COMMUNITY_CENTER]: "#FF6B35", // 주황색 (지역아동센터)
  [FacilityType.EDUCATION_WELFARE_SCHOOL]: "#4ECDC4", // 청록색 (교육복지사협회)
};

interface KakaoMapProps {
  partners: Partner[];
  selectedPartner?: Partner | null;
  onMarkerClick?: (partner: Partner) => void;
}

interface MarkerData {
  partner: Partner;
  marker: kakao.maps.Marker;
  overlay: kakao.maps.CustomOverlay;
  coords: kakao.maps.LatLng;
}

export default function KakaoMap({
  partners,
  selectedPartner,
  onMarkerClick,
}: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [activeOverlay, setActiveOverlay] = useState<kakao.maps.CustomOverlay | null>(null);
  const geocodedCache = useRef<Map<string, kakao.maps.LatLng>>(new Map());

  // SDK 동적 로드
  useEffect(() => {
    // 이미 로드된 경우
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        setIsLoaded(true);
      });
      return;
    }

    // 이미 스크립트 태그가 있는 경우
    const existingScript = document.querySelector('script[src*="dapi.kakao.com"]');
    if (existingScript) {
      const checkInterval = setInterval(() => {
        if (window.kakao && window.kakao.maps) {
          clearInterval(checkInterval);
          window.kakao.maps.load(() => {
            setIsLoaded(true);
          });
        }
      }, 100);
      return () => clearInterval(checkInterval);
    }

    // 스크립트 동적 로드
    const script = document.createElement("script");
    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=dea4dba14e9d393656d3cee92af2ccd4&libraries=services&autoload=false";
    script.async = true;

    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          setIsLoaded(true);
        });
      } else {
        setLoadError("카카오맵 SDK 초기화 실패");
      }
    };

    script.onerror = () => {
      setLoadError("카카오맵 스크립트 로드 실패");
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup은 하지 않음 - 스크립트는 전역으로 유지
    };
  }, []);

  // 지도 초기화
  useEffect(() => {
    if (!isLoaded || !mapRef.current || map) return;

    const options: kakao.maps.MapOptions = {
      center: new window.kakao.maps.LatLng(35.1796, 129.0756), // 부산 중심
      level: 9, // 부산 전체가 보이는 레벨
    };

    const newMap = new window.kakao.maps.Map(mapRef.current, options);
    setMap(newMap);
  }, [isLoaded, map]);

  // 마커 생성 및 표시
  useEffect(() => {
    if (!map || !isLoaded || partners.length === 0) return;

    const geocoder = new window.kakao.maps.services.Geocoder();
    const newMarkers: MarkerData[] = [];
    const bounds = new window.kakao.maps.LatLngBounds();
    let processedCount = 0;

    // 기존 마커 제거
    markers.forEach(({ marker, overlay }) => {
      marker.setMap(null);
      overlay.setMap(null);
    });

    partners.forEach((partner) => {
      // 캐시에서 좌표 확인
      const cachedCoords = geocodedCache.current.get(partner.address);

      if (cachedCoords) {
        const markerData = createMarker(map, partner, cachedCoords, onMarkerClick, setActiveOverlay, activeOverlay);
        if (markerData) {
          newMarkers.push(markerData);
          bounds.extend(markerData.coords);
        }
        processedCount++;
        if (processedCount === partners.length && newMarkers.length > 0) {
          map.setBounds(bounds);
          setMarkers(newMarkers);
        }
        return;
      }

      // 주소로 좌표 검색
      geocoder.addressSearch(partner.address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(
            parseFloat(result[0].y),
            parseFloat(result[0].x)
          );

          // 캐시에 저장
          geocodedCache.current.set(partner.address, coords);

          const markerData = createMarker(map, partner, coords, onMarkerClick, setActiveOverlay, activeOverlay);
          if (markerData) {
            newMarkers.push(markerData);
            bounds.extend(coords);
          }
        }

        processedCount++;
        if (processedCount === partners.length && newMarkers.length > 0) {
          map.setBounds(bounds);
          setMarkers(newMarkers);
        }
      });
    });
  }, [map, isLoaded, partners, onMarkerClick]);

  // 선택된 파트너로 이동
  useEffect(() => {
    if (!map || !selectedPartner) return;

    const markerData = markers.find((m) => m.partner.id === selectedPartner.id);
    if (markerData) {
      map.setCenter(markerData.coords);
      map.setLevel(3);

      // 기존 오버레이 닫기
      if (activeOverlay) {
        activeOverlay.setMap(null);
      }

      // 새 오버레이 표시
      markerData.overlay.setMap(map);
      setActiveOverlay(markerData.overlay);
    }
  }, [selectedPartner, map, markers]);

  return (
    <>
      <div
        ref={mapRef}
        className="w-full h-full min-h-[400px] rounded-xl bg-gray-100"
      >
        {loadError && (
          <div className="w-full h-full flex flex-col items-center justify-center text-red-500 p-4 text-center">
            <p className="font-medium mb-2">지도 로드 실패</p>
            <p className="text-sm text-gray-500">{loadError}</p>
          </div>
        )}
        {!isLoaded && !loadError && (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            지도를 불러오는 중...
          </div>
        )}
      </div>

      {/* 범례 */}
      {isLoaded && (
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md text-xs">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: MARKER_COLORS[FacilityType.CARE_FACILITY] }} />
              <span className="text-gray-700">양육시설/그룹홈</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: MARKER_COLORS[FacilityType.COMMUNITY_CENTER] }} />
              <span className="text-gray-700">지역아동센터</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// 마커 생성 헬퍼 함수
function createMarker(
  map: kakao.maps.Map,
  partner: Partner,
  coords: kakao.maps.LatLng,
  onMarkerClick?: (partner: Partner) => void,
  setActiveOverlay?: (overlay: kakao.maps.CustomOverlay | null) => void,
  currentActiveOverlay?: kakao.maps.CustomOverlay | null
): MarkerData | null {
  const color = MARKER_COLORS[partner.facilityType];

  // SVG 마커 이미지 생성
  const markerSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
      <path fill="${color}" stroke="#fff" stroke-width="2" d="M14 2C7.373 2 2 7.373 2 14c0 7.5 10 18 12 20 2-2 12-12.5 12-20 0-6.627-5.373-12-12-12z"/>
      <circle cx="14" cy="14" r="5" fill="#fff"/>
    </svg>
  `;

  const markerImage = new window.kakao.maps.MarkerImage(
    `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markerSvg)}`,
    new window.kakao.maps.Size(28, 36),
    { offset: new window.kakao.maps.Point(14, 36) }
  );

  const marker = new window.kakao.maps.Marker({
    position: coords,
    map: map,
    image: markerImage,
  });

  // 커스텀 오버레이 (정보창)
  const overlayContent = `
    <div style="
      background: white;
      border-radius: 8px;
      padding: 12px 14px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      min-width: 180px;
      max-width: 250px;
      font-size: 13px;
      line-height: 1.4;
    ">
      <div style="font-weight: 600; color: #1f2937; margin-bottom: 4px;">${partner.name}</div>
      <div style="
        display: inline-block;
        background: ${color}20;
        color: ${color};
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 11px;
        font-weight: 500;
        margin-bottom: 6px;
      ">${partner.facilityTypeDisplayName}</div>
      <div style="color: #6b7280; font-size: 12px;">${partner.address}</div>
      ${partner.phoneNumber ? `<div style="color: #6b7280; font-size: 12px; margin-top: 2px;">${partner.phoneNumber.startsWith("010") ? "010-****-****" : partner.phoneNumber}</div>` : ""}
    </div>
    <div style="
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid white;
      margin: 0 auto;
      filter: drop-shadow(0 2px 2px rgba(0,0,0,0.1));
    "></div>
  `;

  const overlay = new window.kakao.maps.CustomOverlay({
    position: coords,
    content: overlayContent,
    yAnchor: 1.3,
    xAnchor: 0.5,
  });

  // 마커 클릭 이벤트
  window.kakao.maps.event.addListener(marker, "click", () => {
    // 기존 오버레이 닫기
    if (currentActiveOverlay) {
      currentActiveOverlay.setMap(null);
    }

    // 새 오버레이 표시
    overlay.setMap(map);
    setActiveOverlay?.(overlay);
    onMarkerClick?.(partner);
  });

  return { partner, marker, overlay, coords };
}
