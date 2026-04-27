import { Member } from "@/data/members";
import { Quote } from "lucide-react";

interface MemberProfileProps {
  member: Member;
  variant?: "page" | "modal";
}

export default function MemberProfile({
  member,
  variant = "page",
}: MemberProfileProps) {
  const isModal = variant === "modal";
  const hasImage = member.image && !member.image.includes("undefined");

  return (
    <div className={isModal ? "" : "min-h-screen bg-gray-50"}>
      <div
        className={
          isModal
            ? ""
            : "max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20"
        }
      >
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Banner */}
          <div className="bg-gradient-to-r from-yeirin-yellow to-yeirin-orange/80 h-32 md:h-40" />

          <div className="px-6 md:px-10 pb-10 md:pb-12">
            {/* Profile Image */}
            <div className="-mt-16 md:-mt-20 mb-6">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-200 border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">
                {hasImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg
                    className="w-20 h-20 md:w-24 md:h-24 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                )}
              </div>
            </div>

            {/* Name & Role */}
            <div className="mb-2">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {member.name}
                </h1>
                <span className="bg-yeirin-yellow text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                  {member.role}
                </span>
              </div>
              <p className="text-gray-600 text-sm md:text-base">
                {member.title}
              </p>
            </div>

            {/* 포부 */}
            {member.message && (
              <div className="bg-yeirin-cream rounded-2xl p-6 md:p-8 mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <Quote className="w-5 h-5 text-yeirin-orange" />
                  <h2 className="font-bold text-yeirin-orange text-sm tracking-wider">
                    포부 한마디
                  </h2>
                </div>
                <p className="text-gray-800 text-base md:text-lg leading-relaxed">
                  &ldquo;{member.message}&rdquo;
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
