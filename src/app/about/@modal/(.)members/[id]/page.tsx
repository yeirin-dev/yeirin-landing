import { notFound } from "next/navigation";
import { getMemberById } from "@/data/members";
import MemberModal from "@/components/members/MemberModal";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MemberModalPage({ params }: PageProps) {
  const { id } = await params;
  const member = getMemberById(id);

  if (!member) {
    notFound();
  }

  return <MemberModal member={member} />;
}
