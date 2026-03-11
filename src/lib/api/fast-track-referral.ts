/**
 * Landing API - Fast-track Counseling Referral
 * 긴급 상담의뢰서 접수 API
 */

const API_BASE_PATH = "/api/proxy";

// ──────────────────────────────────────────────
// Enums
// ──────────────────────────────────────────────

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export enum InstitutionType {
  CHILD_CARE_FACILITY = "CHILD_CARE_FACILITY",
  GROUP_HOME = "GROUP_HOME",
  COMMUNITY_CHILD_CENTER = "COMMUNITY_CHILD_CENTER",
  OTHER = "OTHER",
}

export enum GuardianContactAvailability {
  AVAILABLE = "AVAILABLE",
  LIMITED = "LIMITED",
  UNAVAILABLE = "UNAVAILABLE",
}

export enum CrisisLevel {
  SELF_HARM_OR_SUICIDE = "SELF_HARM_OR_SUICIDE",
  SEVERE_DEPRESSION_OR_LETHARGY = "SEVERE_DEPRESSION_OR_LETHARGY",
  AGGRESSIVE_BEHAVIOR_OR_IMPULSE_CONTROL = "AGGRESSIVE_BEHAVIOR_OR_IMPULSE_CONTROL",
  PEER_CONFLICT_OR_ISOLATION = "PEER_CONFLICT_OR_ISOLATION",
  SCHOOL_MALADJUSTMENT_OR_REFUSAL = "SCHOOL_MALADJUSTMENT_OR_REFUSAL",
  REPEATED_RUNAWAY_ATTEMPTS = "REPEATED_RUNAWAY_ATTEMPTS",
  SUSPECTED_ABUSE = "SUSPECTED_ABUSE",
  OTHER = "OTHER",
}

export enum GuardianConsentStatus {
  AGREED = "AGREED",
  NOT_AGREED = "NOT_AGREED",
}

// ──────────────────────────────────────────────
// Display Labels
// ──────────────────────────────────────────────

export const GenderLabel: Record<Gender, string> = {
  [Gender.MALE]: "남",
  [Gender.FEMALE]: "여",
  [Gender.OTHER]: "기타",
};

export const InstitutionTypeLabel: Record<InstitutionType, string> = {
  [InstitutionType.CHILD_CARE_FACILITY]: "아동양육시설",
  [InstitutionType.GROUP_HOME]: "공동생활가정",
  [InstitutionType.COMMUNITY_CHILD_CENTER]: "지역아동센터",
  [InstitutionType.OTHER]: "기타",
};

export const GuardianContactAvailabilityLabel: Record<
  GuardianContactAvailability,
  string
> = {
  [GuardianContactAvailability.AVAILABLE]: "가능",
  [GuardianContactAvailability.LIMITED]: "제한",
  [GuardianContactAvailability.UNAVAILABLE]: "불가",
};

export const CrisisLevelLabel: Record<CrisisLevel, string> = {
  [CrisisLevel.SELF_HARM_OR_SUICIDE]: "자해 또는 자살 관련 발언/행동",
  [CrisisLevel.SEVERE_DEPRESSION_OR_LETHARGY]: "심한 우울 또는 무기력 상태",
  [CrisisLevel.AGGRESSIVE_BEHAVIOR_OR_IMPULSE_CONTROL]:
    "공격적 행동 또는 충동 조절 어려움",
  [CrisisLevel.PEER_CONFLICT_OR_ISOLATION]:
    "또래 관계에서 심각한 갈등 또는 고립",
  [CrisisLevel.SCHOOL_MALADJUSTMENT_OR_REFUSAL]: "학교 부적응 또는 등교 거부",
  [CrisisLevel.REPEATED_RUNAWAY_ATTEMPTS]: "반복적인 가출 시도",
  [CrisisLevel.SUSPECTED_ABUSE]: "학대 경험 의심",
  [CrisisLevel.OTHER]: "기타",
};

export const GuardianConsentStatusLabel: Record<
  GuardianConsentStatus,
  string
> = {
  [GuardianConsentStatus.AGREED]: "동의함",
  [GuardianConsentStatus.NOT_AGREED]: "미동의",
};

// ──────────────────────────────────────────────
// Request / Response types
// ──────────────────────────────────────────────

export interface ChildBasicInfo {
  name: string;
  gender: Gender;
  age: number;
  grade: string;
  facilityAdmissionDate?: string;
  institutionType: InstitutionType;
  institutionTypeOther?: string;
  guardianContactAvailability: GuardianContactAvailability;
}

export interface CrisisStatus {
  crisisOccurrenceDate: string;
  crisisLevels: CrisisLevel[];
  crisisLevelOther?: string;
}

export interface PsychologicalInfo {
  hasPreExistingPsychiatricCondition: boolean;
  psychiatricDiagnosisName?: string;
  isCurrentlyOnMedication: boolean;
  medicationName?: string;
  childCharacteristicsAndCounselingNotes?: string;
}

export interface RecentBehavior {
  recentIncidentsAndBehavioralChanges: string;
}

export interface ReferralMotivation {
  referralMotivation: string;
  counselingGoal: string;
}

export interface PrivacyConsent {
  guardianConsentStatus: GuardianConsentStatus;
  consentPersonName: string;
  relationship: string;
  consentDate: string;
}

export interface CreateFastTrackReferralRequest {
  referralDate: string;
  institutionName: string;
  staffName: string;
  childBasicInfo: ChildBasicInfo;
  crisisStatus: CrisisStatus;
  psychologicalInfo: PsychologicalInfo;
  recentBehavior: RecentBehavior;
  referralMotivation: ReferralMotivation;
  privacyConsent: PrivacyConsent;
}

export interface FastTrackReferralResponse {
  id: string;
  status: string;
  createdAt: string;
}

// ──────────────────────────────────────────────
// API call
// ──────────────────────────────────────────────

export async function createFastTrackReferral(
  data: CreateFastTrackReferralRequest
): Promise<FastTrackReferralResponse> {
  const response = await fetch(
    `${API_BASE_PATH}/v1/landing/fast-track-referral`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(
      errorBody?.message || `접수에 실패했습니다 (${response.status})`
    );
  }

  return response.json();
}
