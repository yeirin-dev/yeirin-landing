import {
  HeroSection,
  PromiseSection,
  ServicesSection,
  PartnersStatsSection,
  NewsSection,
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
      {/* 임시 비활성화: 기업 로고 섹션 */}
      {/* <LogosSection /> */}
    </>
  );
}
