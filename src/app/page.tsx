import {
  HeroSection,
  PromiseSection,
  ServicesSection,
  PartnersStatsSection,
  NewsSection,
  FastTrackSection,
  // LogosSection, // 임시 비활성화: 기업 로고 섹션
} from "@/components/home";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PromiseSection />
      <ServicesSection />
      <PartnersStatsSection />
      <NewsSection />
      <FastTrackSection />
      {/* 임시 비활성화: 기업 로고 섹션 */}
      {/* <LogosSection /> */}
    </>
  );
}
