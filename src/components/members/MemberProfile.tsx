import { Member } from "@/data/members";
import { Briefcase, GraduationCap, Award, Quote, FlaskConical, FileText } from "lucide-react";

interface MemberProfileProps {
  member: Member;
  variant?: "page" | "modal";
}

export default function MemberProfile({
  member,
  variant = "page",
}: MemberProfileProps) {
  const isModal = variant === "modal";

  return (
    <div className={isModal ? "" : "min-h-screen bg-gray-50"}>
      <div
        className={
          isModal
            ? ""
            : "max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20"
        }
      >
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-yeirin-yellow to-yeirin-orange/80 h-32 md:h-40" />

          <div className="px-6 md:px-8 pb-8">
            {/* Profile Image */}
            <div className="-mt-16 md:-mt-20 mb-6">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-200 border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">
                {member.image && !member.image.includes("undefined") ? (
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
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {member.name}
                </h1>
                <span className="bg-yeirin-yellow text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                  {member.role}
                </span>
              </div>
              <p className="text-gray-600">{member.title}</p>
            </div>

            {/* Introduction */}
            <p className="text-gray-700 leading-relaxed mb-8 text-lg">
              {member.introduction}
            </p>

            {/* Message Quote */}
            {member.message && (
              <div className="bg-yeirin-cream rounded-xl p-6 mb-8">
                <div className="flex gap-4">
                  <Quote className="w-8 h-8 text-yeirin-orange flex-shrink-0" />
                  <p className="text-gray-800 italic leading-relaxed">
                    &ldquo;{member.message}&rdquo;
                  </p>
                </div>
              </div>
            )}

            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Career */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="w-5 h-5 text-yeirin-orange" />
                  <h2 className="font-bold text-gray-900">경력</h2>
                </div>
                <ul className="space-y-2">
                  {member.career.map((item, index) => (
                    <li
                      key={index}
                      className="text-gray-600 text-sm flex items-start gap-2"
                    >
                      <span className="text-yeirin-orange mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Education */}
              {member.education && member.education.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <GraduationCap className="w-5 h-5 text-yeirin-orange" />
                    <h2 className="font-bold text-gray-900">학력</h2>
                  </div>
                  <ul className="space-y-2">
                    {member.education.map((item, index) => (
                      <li
                        key={index}
                        className="text-gray-600 text-sm flex items-start gap-2"
                      >
                        <span className="text-yeirin-orange mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Expertise */}
              <div className="bg-gray-50 rounded-xl p-6 md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-yeirin-orange" />
                  <h2 className="font-bold text-gray-900">전문분야</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {member.expertise.map((item, index) => (
                    <span
                      key={index}
                      className="bg-yeirin-yellow/50 text-gray-800 px-4 py-2 rounded-full text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Research */}
              {member.research && member.research.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-6 md:col-span-2">
                  <div className="flex items-center gap-2 mb-4">
                    <FlaskConical className="w-5 h-5 text-yeirin-orange" />
                    <h2 className="font-bold text-gray-900">연구개발사업</h2>
                  </div>
                  <ul className="space-y-3">
                    {member.research.map((item, index) => (
                      <li
                        key={index}
                        className="text-gray-600 text-sm flex items-start gap-2"
                      >
                        <span className="text-yeirin-orange mt-1 flex-shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Policy Research */}
              {member.policyResearch && member.policyResearch.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-6 md:col-span-2">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-yeirin-orange" />
                    <h2 className="font-bold text-gray-900">정책연구 & 연구용역</h2>
                  </div>
                  <ul className="space-y-3">
                    {member.policyResearch.map((item, index) => (
                      <li
                        key={index}
                        className="text-gray-600 text-sm flex items-start gap-2"
                      >
                        <span className="text-yeirin-orange mt-1 flex-shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
