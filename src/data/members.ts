export interface Member {
  id: string;
  name: string;
  role: string;
  title: string;
  image: string;
  /** 포부 한마디 */
  message?: string;
}

export const boardMembers: Member[] = [
  {
    id: "park-jiyoung",
    name: "박지영",
    role: "이사장",
    title: "인제대학교 교수 · 사회적협동조합 예이린 이사장",
    image: "/images/board/박지영.jpeg",
  },
  {
    id: "baek-seolhyang",
    name: "백설향",
    role: "이사",
    title: "동국대학교 교수 · 사회적협동조합 예이린 이사",
    image: "/images/board/백설향.jpg",
    message:
      "우리 사회에서 어린이와 청소년이 귀하게 양육되고 보호받기를 염원합니다.",
  },
  {
    id: "hwang-sein",
    name: "황세인",
    role: "이사",
    title: "인제대학교 사회복지학과 조교수 · 사회적협동조합 예이린 이사",
    image: "/images/board/황세인.jpg",
    message: "아이들의 건강한 성장을 위한 환경을 만들어 나가겠습니다.",
  },
  {
    id: "park-taejoo",
    name: "박태주",
    role: "이사",
    title:
      "부산·싱가폴 ‘카운티’ 총괄 본부장 · 사회적협동조합 예이린 이사",
    image: "/images/board/박태주.png",
  },
  {
    id: "lee-changhee",
    name: "이창희",
    role: "감사",
    title:
      "사회적협동조합 미선나무 이사장 · 사회적협동조합 예이린 감사",
    image: "/images/board/이창희.png",
    message: "슬픔을 지우는 따뜻한 사람",
  },
];

export const techMembers: Member[] = [
  {
    id: "yun-sanghyun",
    name: "윤상현",
    role: "대표이사",
    title: "(주) 예이린 대표이사 · 사회적협동조합 예이린 CTO",
    image: "/images/board/윤상현.jpg",
  },
];

// 조직도에만 표시되는 인원 (상세 프로필 추후 보강 예정)
export const orgChartMembers: Member[] = [
  // (주) 예이린
  {
    id: "kim-hunjeong",
    name: "김훈정",
    role: "주임",
    title: "(주) 예이린 주임",
    image: "",
    message: "기술을 통해 사회에 가치를 환원하겠습니다.",
  },
  // 자문위원
  {
    id: "park-suyoung",
    name: "박수영",
    role: "운영대표",
    title: "그랜드모먼트 유스호스텔 운영대표",
    image: "/images/board/박수영.jpg",
    message:
      "우리 청소년들은 대한민국의 미래를 이끌어 갈 소중한 자원입니다. 부울경 지역의 청소년학 1호 박사이자, 청소년 분야의 전문가로서 다년간의 청소년지도 경력과 연구 경험 등을 바탕으로 예이린의 사업 방향을 함께 고민하고 발전할 수 있도록 노력하겠습니다.",
  },
  {
    id: "kim-yejong",
    name: "김예종",
    role: "대표",
    title: "아트교육컨설팅 대표",
    image: "/images/board/김예종.jpg",
    message:
      "아동·청소년의 건강한 성장과 안전한 사회를 위해 현장 경험을 바탕으로 실질적인 변화를 만들어가겠습니다.",
  },
  {
    id: "moon-jungjun",
    name: "문정준",
    role: "교수",
    title: "부산백병원 정신건강의학과 교수",
    image: "/images/board/문정준.jpg",
    message:
      "정신건강의학의 관점에서 예이린의 사업을 도울 수 있도록 노력하겠습니다.",
  },
  {
    id: "hwang-youngsook",
    name: "황영숙",
    role: "회장",
    title: "부산시 보건교사회 회장",
    image: "/images/board/황영숙.jpg",
    message:
      "청소년의 건강한 성장과 안전한 미래를 지키는데 사명감을 갖고 실효성 있는 교육방향을 제시하고 마약으로부터 안전한 학교문화를 조성하는데 적극참여하겠습니다.",
  },
  {
    id: "shin-hyunsang",
    name: "신현상",
    role: "교수",
    title: "한양대학교 경영학부 교수",
    image: "/images/board/신현상.jpg",
    message: "다음 세대를 위한 컬렉티브 임팩트, 함께 하겠습니다.",
  },
  {
    id: "lee-sungjin",
    name: "이성진",
    role: "변호사",
    title: "법무법인 YK 변호사",
    image: "/images/board/이성진.jpg",
    message: "아이들이 소외감을 느끼지 않도록 돌보겠습니다.",
  },
  // 사업본부
  {
    id: "kim-narae",
    name: "김나래",
    role: "팀장",
    title: "예이린 사업본부 팀장",
    image: "/images/board/김나래.png",
    message:
      "돌봄이 닿지 못한 아이들 곁에서 동행하며, 연결의 길을 만들어가겠습니다.",
  },
  {
    id: "go-hyunsook",
    name: "고현숙",
    role: "주임",
    title: "예이린 사업본부 주임",
    image: "/images/board/고현숙.jpeg",
    message: "아이들의 따뜻한 미래를 만들어가는 길에 함께하겠습니다.",
  },
  // B-IMPACT 얼라이언스
  {
    id: "kim-younggeun",
    name: "김영근",
    role: "학계 대표",
    title: "인제대학교 상담심리치료학과 · B-IMPACT 학계 대표",
    image: "/images/board/김영근.jpg",
    message:
      "학계의 전문성을 바탕으로 지역사회의 취약 아동 계층에게 따뜻한 봄을 가져다 줄 수 있도록 최선을 다하겠습니다.",
  },
  {
    id: "shim-mingyu",
    name: "심민규",
    role: "현장 대표",
    title: "더자람 아동청소년발달센터 · B-IMPACT 현장 대표",
    image: "",
  },
  // 경계선 아동 파견전문가 양성단
  {
    id: "ahn-yeji",
    name: "안예지",
    role: "학계 대표",
    title:
      "경일대학교 평생교육학과 · 경계선 아동 파견전문가 양성단 학계 대표",
    image: "/images/board/안예지.jpeg",
    message:
      "특수교육전문가로서 교육사각지대 학습자의 생애주기별 특성과 요구를 연구하고, 다양한 학습자의 가능성을 지원하는 교육체계를 만들어가고 있습니다. 누구도 배움에서 소외되지 않도록, 현장의 문제를 연구와 실천으로 이어가겠습니다.",
  },
  // 사무국
  {
    id: "oh-seolhwa",
    name: "오설화",
    role: "주임",
    title: "예이린 사무국 주임",
    image: "/images/board/오설화.jpeg",
  },
  // 전문위원
  {
    id: "lee-cheolwoo",
    name: "이철우",
    role: "변호사",
    title: "문화 법률사무소 변호사",
    image: "",
  },
  {
    id: "shin-sangyong",
    name: "신상용",
    role: "행정사",
    title: "한가람행정사사무소 행정사",
    image: "",
  },
  {
    id: "han-maneung",
    name: "한만응",
    role: "세무사",
    title: "세무회계 혜안 세무사",
    image: "",
  },
  {
    id: "kwon-hyunae",
    name: "권현애",
    role: "노무사",
    title: "유닉스 노무법인 노무사",
    image: "/images/board/권현애.jpg",
    message: "공정한 노무 관리로 따뜻한 동행을 뒷받침하겠습니다.",
  },
];

// 현장 전문가 (조직도엔 없음)
export const fieldExpertMembers: Member[] = [
  {
    id: "lee-oesook",
    name: "이외숙",
    role: "현장 전문가",
    title: "박애원, 은혜의집",
    image: "/images/board/이외숙.jpg",
  },
  {
    id: "lee-jiseon",
    name: "이지선",
    role: "현장 전문가",
    title: "라온, 에바다드림, 에바다리더",
    image: "/images/board/이지선.jpg",
  },
  {
    id: "kim-eunjin",
    name: "김은진",
    role: "현장 전문가",
    title: "새들원",
    image: "/images/board/김은진.jpg",
  },
  {
    id: "han-moojin",
    name: "한무진",
    role: "현장 전문가",
    title: "새들원",
    image: "/images/board/한무진.jpg",
  },
  {
    id: "gwak-darin",
    name: "곽다린",
    role: "현장 전문가",
    title: "새롬아동센터",
    image: "/images/board/곽다린.jpg",
  },
  {
    id: "shim-hyemin",
    name: "심혜민",
    role: "현장 전문가",
    title: "온새미로",
    image: "/images/board/심혜민.jpg",
  },
  {
    id: "kim-shinae",
    name: "김신애",
    role: "현장 전문가",
    title: "파랑새아이들집",
    image: "/images/board/김신애.jpg",
  },
  {
    id: "jeon-seongmi",
    name: "전성미",
    role: "현장 전문가",
    title: "파랑새아이들집",
    image: "/images/board/전성미.jpg",
  },
  {
    id: "hwang-geummi",
    name: "황금미",
    role: "현장 전문가",
    title: "동성원",
    image: "/images/board/황금미.jpg",
  },
  {
    id: "kim-eunji",
    name: "김은지",
    role: "현장 전문가",
    title: "새들원",
    image: "/images/board/김은지.jpg",
  },
  {
    id: "lee-sangeon",
    name: "이상언",
    role: "현장 전문가",
    title: "동성원",
    image: "/images/board/이상언.jpg",
  },
  {
    id: "kang-minkyung",
    name: "강민경",
    role: "현장 전문가",
    title: "해피홈이삭나래자비동산",
    image: "/images/board/강민경.jpg",
  },
  {
    id: "kim-eunbi",
    name: "김은비",
    role: "현장 전문가",
    title: "새빛기독보육원",
    image: "/images/board/김은비.jpg",
  },
  {
    id: "jang-chanhae",
    name: "장찬해",
    role: "현장 전문가",
    title: "소양무지개동산",
    image: "/images/board/장찬해.jpg",
  },
  {
    id: "moon-bokyung",
    name: "문보경",
    role: "현장 전문가",
    title: "동산원",
    image: "/images/board/문보경.jpg",
  },
  {
    id: "cho-hyeji",
    name: "조혜지",
    role: "현장 전문가",
    title: "애아원",
    image: "/images/board/조혜지.jpg",
  },
  {
    id: "jeong-youngsook",
    name: "정영숙",
    role: "현장 전문가",
    title: "새들원",
    image: "/images/board/정영숙.jpg",
  },
  {
    id: "lee-sooin",
    name: "이수인",
    role: "현장 전문가",
    title: "우리집원",
    image: "/images/board/이수인.jpg",
  },
  {
    id: "park-soohee",
    name: "박수희",
    role: "현장 전문가",
    title: "희락원",
    image: "/images/board/박수희.png",
  },
  {
    id: "jin-sunnam",
    name: "진선남",
    role: "현장 전문가",
    title: "NK아이빌",
    image: "/images/board/진선남.jpg",
  },
];

export function getMemberById(id: string): Member | undefined {
  const allMembers = [
    ...boardMembers,
    ...techMembers,
    ...orgChartMembers,
    ...fieldExpertMembers,
  ];
  return allMembers.find((member) => member.id === id);
}

export function getMembersByIds(ids: string[]): Member[] {
  return ids
    .map((id) => getMemberById(id))
    .filter((m): m is Member => Boolean(m));
}

export function getAllMemberIds(): string[] {
  const allMembers = [
    ...boardMembers,
    ...techMembers,
    ...orgChartMembers,
    ...fieldExpertMembers,
  ];
  return allMembers.map((member) => member.id);
}
