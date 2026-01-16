import { MetadataRoute } from "next";
import { getAllMemberIds } from "@/data/members";

const SITE_URL = "https://yeirin.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const memberIds = getAllMemberIds();

  // 정적 페이지들
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/partners`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/news`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // 멤버 프로필 페이지들 (이사회 + 기술개발본부)
  const memberPages: MetadataRoute.Sitemap = memberIds.map((id) => ({
    url: `${SITE_URL}/about/members/${id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...memberPages];
}
