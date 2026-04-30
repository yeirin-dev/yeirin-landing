"use client";

import Link from "next/link";
import Image from "next/image";
import { ArcherContainer, ArcherElement } from "react-archer";
import type { RelationType } from "react-archer/lib/types";

interface Person {
  id?: string;
  name: string;
  role: string;
  affiliation?: string;
}

interface PersonNodeProps {
  person: Person;
}

function PersonNode({ person }: PersonNodeProps) {
  const content = (
    <div className="bg-white rounded-2xl px-3 py-3 md:px-4 md:py-3.5 shadow-[0_2px_8px_rgba(15,23,42,0.06)] ring-1 ring-gray-100 hover:ring-yeirin-yellow hover:shadow-[0_4px_14px_rgba(15,23,42,0.08)] transition-all w-full text-center">
      <p className="text-[15px] md:text-base font-bold text-gray-900 leading-tight tracking-tight break-keep">
        {person.name}
      </p>
      {person.role && (
        <p className="text-[12px] md:text-[13px] text-gray-700 mt-1 leading-tight font-medium break-keep">
          {person.role}
        </p>
      )}
      {person.affiliation && (
        <p className="text-[11px] text-gray-400 mt-1 leading-snug break-keep">
          {person.affiliation}
        </p>
      )}
    </div>
  );

  if (person.id) {
    return (
      <Link
        href={`/about/members/${person.id}`}
        className="block cursor-pointer w-full max-w-[220px]"
      >
        {content}
      </Link>
    );
  }
  return <div className="w-full max-w-[220px]">{content}</div>;
}

type HeaderColor = "red" | "orange" | "dark" | "yellow";

interface SectionHeaderProps {
  label: string;
  color: HeaderColor;
}

function SectionHeader({ label, color }: SectionHeaderProps) {
  const colorClasses: Record<HeaderColor, string> = {
    red: "bg-red-700 text-white shadow-[0_2px_6px_rgba(185,28,28,0.25)]",
    orange:
      "bg-yeirin-orange text-white shadow-[0_2px_6px_rgba(255,159,28,0.3)]",
    dark: "bg-gray-900 text-white shadow-[0_2px_6px_rgba(0,0,0,0.2)]",
    yellow:
      "bg-amber-400 text-gray-900 shadow-[0_2px_6px_rgba(251,191,36,0.35)]",
  };
  return (
    <div
      className={`inline-block px-6 py-2 rounded-full text-sm md:text-base font-bold tracking-tight ${colorClasses[color]}`}
    >
      {label}
    </div>
  );
}

interface GroupCardProps {
  header: { label: string; color: HeaderColor };
  children: React.ReactNode;
  className?: string;
}

function GroupCard({ header, children, className = "" }: GroupCardProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap">
        <SectionHeader label={header.label} color={header.color} />
      </div>
      <div className="bg-gray-100 rounded-3xl ring-1 ring-gray-300 pt-10 pb-6 px-5 md:px-6">
        {children}
      </div>
    </div>
  );
}

const directors: Person[] = [
  {
    id: "baek-seolhyang",
    name: "백설향",
    role: "이사",
    affiliation: "경북권역 총괄 (분사무소장)",
  },
  { id: "hwang-sein", name: "황세인", role: "이사" },
  { id: "park-taejoo", name: "박태주", role: "이사" },
];

const advisors: Person[] = [
  { id: "park-suyoung", name: "박수영", role: "운영대표", affiliation: "그랜드모먼트 유스호스텔" },
  { id: "kim-yejong", name: "김예종", role: "대표", affiliation: "아트교육컨설팅" },
  { id: "moon-jungjun", name: "문정준", role: "교수", affiliation: "부산백병원 정신건강의학과" },
  { id: "hwang-youngsook", name: "황영숙", role: "회장", affiliation: "부산시 보건교사회" },
  { id: "shin-hyunsang", name: "신현상", role: "교수", affiliation: "한양대학교 경영학부" },
  { id: "lee-sungjin", name: "이성진", role: "변호사", affiliation: "법무법인 YK" },
];

const businessTeam: Person[] = [
  { id: "kim-narae", name: "김나래", role: "팀장" },
  { id: "go-hyunsook", name: "고현숙", role: "주임" },
  { id: "kim-hunjeong", name: "김훈정", role: "주임" },
];

const bImpact: Person[] = [
  { id: "kim-younggeun", name: "김영근", role: "학계 대표", affiliation: "인제대학교 상담심리치료학과" },
  { id: "shim-mingyu", name: "심민규", role: "현장 대표", affiliation: "더자람 아동청소년발달센터" },
];

const borderlineExperts: Person[] = [
  { id: "ahn-yeji", name: "안예지", role: "학계 대표", affiliation: "경일대학교 평생교육학과" },
  { id: "jeon-jongsu", name: "전종수", role: "현장 대표", affiliation: "유스트로우 대표" },
];

const officeStaff: Person[] = [
  { id: "oh-seolhwa", name: "오설화", role: "주임" },
];

const specialists: Person[] = [
  { id: "lee-cheolwoo", name: "이철우", role: "변호사", affiliation: "문화 법률사무소" },
  { id: "shin-sangyong", name: "신상용", role: "행정사", affiliation: "한가람행정사사무소" },
  { id: "han-maneung", name: "한만응", role: "세무사", affiliation: "세무회계 혜안" },
  { id: "kwon-hyunae", name: "권현애", role: "노무사", affiliation: "유닉스 노무법인" },
];

const yeirinCorp: Person[] = [
  { id: "yun-sanghyun", name: "윤상현", role: "대표이사" },

];

const corporateMembers = [
  { id: "hwang-chadong", name: "(주) 아이피나우", logo: "/images/partners-orgchart/ipnow.png" },
  { id: "kim-seonho", name: "(주) 인텔리어스", logo: "/images/partners-orgchart/intellius.png" },
  { id: "lee-woojin", name: "(주) 아뮤즈", logo: "/images/partners-orgchart/amuz.png" },
];

// 점선 연결 스타일 (반복 사용)
const DASHED: NonNullable<RelationType["style"]> = {
  strokeColor: "#94a3b8",
  strokeWidth: 1.5,
  strokeDasharray: "4,4",
  endMarker: false,
  endShape: { circle: { radius: 0, fillColor: "#94a3b8" } },
};

export default function OrgChart() {
  return (
    <div className="w-full bg-white rounded-3xl p-6 md:p-12 ring-1 ring-gray-100">
      <ArcherContainer
        strokeColor="#94a3b8"
        strokeWidth={1.5}
        lineStyle="angle"
        endShape={{ circle: { radius: 0, fillColor: "#94a3b8" } }}
      >
        {/* Top Row */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 items-center mb-14">
          {/* 기업후원회 */}
          <div className="col-span-12 md:col-span-3 order-2 md:order-1">
            <ArcherElement id="supporter">
              <div>
                <GroupCard header={{ label: "기업후원회", color: "orange" }}>
                  <div className="flex justify-center">
                    <PersonNode person={{ name: "후원회장", role: "" }} />
                  </div>
                </GroupCard>
              </div>
            </ArcherElement>
          </div>

          {/* 이사장 (center) */}
          <div className="col-span-12 md:col-span-6 order-1 md:order-2 flex justify-center">
            <ArcherElement
              id="chairman"
              relations={[
                {
                  targetId: "supporter",
                  targetAnchor: "right",
                  sourceAnchor: "left",
                  style: DASHED,
                },
                {
                  targetId: "lab",
                  targetAnchor: "left",
                  sourceAnchor: "right",
                  style: DASHED,
                },
                {
                  targetId: "directors",
                  targetAnchor: "top",
                  sourceAnchor: "bottom",
                  style: DASHED,
                },
                {
                  targetId: "yeirin-corp",
                  targetAnchor: "top",
                  sourceAnchor: "bottom",
                  style: DASHED,
                },
              ]}
            >
              <Link
                href="/about/members/park-jiyoung"
                className="block bg-red-700 text-white rounded-2xl px-12 py-5 shadow-[0_8px_24px_rgba(185,28,28,0.25)] hover:shadow-[0_10px_28px_rgba(185,28,28,0.35)] hover:-translate-y-0.5 transition-all min-w-[220px] text-center cursor-pointer"
              >
                <p className="text-2xl md:text-[28px] font-extrabold tracking-tight">
                  박지영
                </p>
                <p className="text-base md:text-lg mt-1 font-medium">이사장</p>
              </Link>
            </ArcherElement>
          </div>

          {/* 예이린 연구소 */}
          <div className="col-span-12 md:col-span-3 order-3 flex md:justify-end justify-center">
            <ArcherElement id="lab">
              <div className="bg-red-700 text-white rounded-2xl px-7 py-4 shadow-[0_6px_18px_rgba(185,28,28,0.22)] font-extrabold text-lg md:text-xl tracking-tight">
                예이린 연구소
              </div>
            </ArcherElement>
          </div>
        </div>

        {/* 하단: 메인 영역 + 오른쪽 레일 */}
        <div className="grid md:grid-cols-[minmax(0,1fr)_240px] gap-6 md:gap-10">
          {/* MAIN 영역 */}
          <div className="space-y-14">
            {/* 이사진 + 감사 */}
            <div className="grid grid-cols-12 gap-4 md:gap-6">
              <div className="col-span-12 md:col-span-9">
                <ArcherElement
                  id="directors"
                  relations={[
                    {
                      targetId: "auditor",
                      targetAnchor: "left",
                      sourceAnchor: "right",
                      style: DASHED,
                    },
                    {
                      targetId: "advisors",
                      targetAnchor: "top",
                      sourceAnchor: "bottom",
                      style: DASHED,
                    },
                    {
                      targetId: "business",
                      targetAnchor: "top",
                      sourceAnchor: "bottom",
                      style: DASHED,
                    },
                    {
                      targetId: "office",
                      targetAnchor: "top",
                      sourceAnchor: "bottom",
                      style: DASHED,
                    },
                    {
                      targetId: "specialists",
                      targetAnchor: "top",
                      sourceAnchor: "bottom",
                      style: DASHED,
                    },
                  ]}
                >
                  <div>
                    <GroupCard header={{ label: "이사진", color: "red" }}>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                        {directors.map((p) => (
                          <div key={p.id} className="flex justify-center">
                            <PersonNode person={p} />
                          </div>
                        ))}
                      </div>
                    </GroupCard>
                  </div>
                </ArcherElement>
              </div>
              <div className="col-span-12 md:col-span-3 flex md:items-center justify-center md:justify-start">
                <ArcherElement id="auditor">
                  <div className="w-full max-w-[220px]">
                    <PersonNode
                      person={{
                        id: "lee-changhee",
                        name: "이창희",
                        role: "감사",
                      }}
                    />
                  </div>
                </ArcherElement>
              </div>
            </div>

            {/* 본부 / 사업단 */}
            <div className="grid grid-cols-12 gap-4 md:gap-6">

              {/* 사업본부 + 산하 */}
              <div className="col-span-12 md:col-span-4 space-y-7">
                <ArcherElement
                  id="business"
                  relations={[
                    {
                      targetId: "b-impact",
                      targetAnchor: "top",
                      sourceAnchor: "bottom",
                      style: DASHED,
                    },
                    {
                      targetId: "borderline",
                      targetAnchor: "top",
                      sourceAnchor: "bottom",
                      style: DASHED,
                    },
                  ]}
                >
                  <div>
                    <GroupCard header={{ label: "사업본부", color: "dark" }}>
                      <div className="space-y-3">
                        {businessTeam.map((p) => (
                          <div key={p.id} className="flex justify-center">
                            <PersonNode person={p} />
                          </div>
                        ))}
                      </div>
                    </GroupCard>
                  </div>
                </ArcherElement>

                {/*비임팩트 얼라이언스*/}
                <ArcherElement id="b-impact">
                  <div>
                    <GroupCard
                      header={{ label: "B-IMPACT 얼라이언스", color: "yellow" }}
                    >
                      <div className="space-y-3">
                        {bImpact.map((p) => (
                          <div key={p.id} className="flex justify-center">
                            <PersonNode person={p} />
                          </div>
                        ))}
                      </div>
                    </GroupCard>
                  </div>
                </ArcherElement>

                {/*경계선 아동*/}
                <ArcherElement id="borderline">
                  <div>
                    <GroupCard
                      header={{
                        label: "경계선 아동 파견전문가 양성단",
                        color: "yellow",
                      }}
                    >
                      <div className="space-y-3">
                        {borderlineExperts.map((p) => (
                          <div key={p.id} className="flex justify-center">
                            <PersonNode person={p} />
                          </div>
                        ))}
                      </div>
                    </GroupCard>
                  </div>
                </ArcherElement>
              </div>

              {/* 사무국 */}
              <div className="col-span-12 md:col-span-2">
                <ArcherElement id="office">
                  <div>
                    <GroupCard header={{ label: "사무국", color: "dark" }}>
                      <div className="space-y-3">
                        {officeStaff.map((p) => (
                          <div key={p.id} className="flex justify-center">
                            <PersonNode person={p} />
                          </div>
                        ))}
                      </div>
                    </GroupCard>
                  </div>
                </ArcherElement>
              </div>

              {/* 자문위원 */}
              <div className="col-span-12 md:col-span-3">
                <ArcherElement id="advisors">
                  <div>
                    <GroupCard header={{ label: "자문위원", color: "orange" }}>
                      <div className="space-y-3">
                        {advisors.map((p) => (
                            <div key={p.id} className="flex justify-center">
                              <PersonNode person={p} />
                            </div>
                        ))}
                      </div>
                    </GroupCard>
                  </div>
                </ArcherElement>
              </div>

              {/* 전문위원 */}
              <div className="col-span-12 md:col-span-3">
                <ArcherElement id="specialists">
                  <div>
                    <GroupCard header={{ label: "전문위원", color: "orange" }}>
                      <div className="space-y-3">
                        {specialists.map((p) => (
                          <div key={p.id} className="flex justify-center">
                            <PersonNode person={p} />
                          </div>
                        ))}
                      </div>
                    </GroupCard>
                  </div>
                </ArcherElement>
              </div>
            </div>
          </div>

          {/* RIGHT RAIL: (주) 예이린 + 법인조합원 */}
          <div className="space-y-7">
            <ArcherElement
              id="yeirin-corp"
              relations={[
                {
                  targetId: "corp-members",
                  targetAnchor: "top",
                  sourceAnchor: "bottom",
                  style: {
                    strokeColor: "#94a3b8",
                    strokeWidth: 1.5,
                    strokeDasharray: "4,4",
                    endMarker: true,
                    startMarker: true,
                  },
                },
              ]}
            >
              <div>
                <GroupCard header={{ label: "(주) 예이린", color: "red" }}>
                  <div className="space-y-3">
                    {yeirinCorp.map((p) => (
                      <div key={p.id} className="flex justify-center">
                        <PersonNode person={p} />
                      </div>
                    ))}
                  </div>
                </GroupCard>
              </div>
            </ArcherElement>

            {/*법인조합원*/}
            <ArcherElement id="corp-members">
              <div>
                <GroupCard header={{ label: "법인조합원", color: "red" }}>
                  <div className="space-y-3">
                    {corporateMembers.map((c) => (
                        <Link
                            key={c.name}
                            href={`/about/members/${c.id}`}
                            className="bg-white rounded-2xl px-3 py-4 shadow-[0_2px_8px_rgba(15,23,42,0.06)] ring-1 ring-gray-100 flex flex-col items-center gap-2.5 hover:ring-yeirin-yellow transition-all"
                        >
                          <div className="relative w-full h-10">
                            <Image
                                src={c.logo}
                                alt={c.name}
                                fill
                                className="object-contain"
                            />
                          </div>
                          <p className="text-[13px] font-bold text-gray-800 tracking-tight">
                            {c.name}
                          </p>
                        </Link>
                    ))}
                  </div>
                </GroupCard>
              </div>
            </ArcherElement>
          </div>
        </div>
      </ArcherContainer>
    </div>
  );
}
