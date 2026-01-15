import { redirect } from "next/navigation";

// 모든 뉴스가 외부 링크로 연결되므로 뉴스 목록 페이지로 리다이렉트
export default function NewsDetailPage() {
  redirect("/news");
}
