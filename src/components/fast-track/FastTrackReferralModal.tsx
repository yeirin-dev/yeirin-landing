"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Check, Loader2, AlertTriangle } from "lucide-react";
import {
  Gender,
  GenderLabel,
  InstitutionType,
  InstitutionTypeLabel,
  GuardianContactAvailability,
  GuardianContactAvailabilityLabel,
  CrisisLevel,
  CrisisLevelLabel,
  GuardianConsentStatus,
  GuardianConsentStatusLabel,
  createFastTrackReferral,
  type CreateFastTrackReferralRequest,
} from "@/lib/api/fast-track-referral";

interface FastTrackReferralModalProps {
  onClose: () => void;
}

const STEPS = [
  "의뢰 정보",
  "아동 기본 정보",
  "위기 수준",
  "정서/심리 정보",
  "문제 행동",
  "의뢰 동기",
  "동의",
] as const;

type FormData = {
  // 의뢰 메타
  referralDate: string;
  institutionName: string;
  staffName: string;
  // 섹션 1
  childName: string;
  childGender: Gender | "";
  childAge: string;
  childGrade: string;
  facilityAdmissionDate: string;
  institutionType: InstitutionType | "";
  institutionTypeOther: string;
  guardianContactAvailability: GuardianContactAvailability | "";
  // 섹션 2
  crisisOccurrenceDate: string;
  crisisLevels: CrisisLevel[];
  crisisLevelOther: string;
  // 섹션 3
  hasPreExistingPsychiatricCondition: boolean;
  psychiatricDiagnosisName: string;
  isCurrentlyOnMedication: boolean;
  medicationName: string;
  childCharacteristicsAndCounselingNotes: string;
  // 섹션 4
  recentIncidentsAndBehavioralChanges: string;
  // 섹션 5
  referralMotivation: string;
  counselingGoal: string;
  // 섹션 6
  guardianConsentStatus: GuardianConsentStatus | "";
  consentPersonName: string;
  relationship: string;
  consentDate: string;
};

const initialFormData: FormData = {
  referralDate: new Date().toISOString().split("T")[0],
  institutionName: "",
  staffName: "",
  childName: "",
  childGender: "",
  childAge: "",
  childGrade: "",
  facilityAdmissionDate: "",
  institutionType: "",
  institutionTypeOther: "",
  guardianContactAvailability: "",
  crisisOccurrenceDate: "",
  crisisLevels: [],
  crisisLevelOther: "",
  hasPreExistingPsychiatricCondition: false,
  psychiatricDiagnosisName: "",
  isCurrentlyOnMedication: false,
  medicationName: "",
  childCharacteristicsAndCounselingNotes: "",
  recentIncidentsAndBehavioralChanges: "",
  referralMotivation: "",
  counselingGoal: "",
  guardianConsentStatus: "",
  consentPersonName: "",
  relationship: "",
  consentDate: new Date().toISOString().split("T")[0],
};

export default function FastTrackReferralModal({
  onClose,
}: FastTrackReferralModalProps) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setValidationErrors([]);
  };

  const toggleCrisisLevel = (level: CrisisLevel) => {
    setForm((prev) => ({
      ...prev,
      crisisLevels: prev.crisisLevels.includes(level)
        ? prev.crisisLevels.filter((l) => l !== level)
        : [...prev.crisisLevels, level],
    }));
    setValidationErrors([]);
  };

  const validateStep = (): string[] => {
    const errors: string[] = [];
    switch (step) {
      case 0:
        if (!form.referralDate) errors.push("의뢰일자를 입력해주세요");
        if (!form.institutionName.trim()) errors.push("기관명을 입력해주세요");
        if (!form.staffName.trim()) errors.push("담당자 성명을 입력해주세요");
        break;
      case 1:
        if (!form.childName.trim()) errors.push("아동 이름을 입력해주세요");
        if (!form.childGender) errors.push("성별을 선택해주세요");
        if (!form.childAge) errors.push("연령을 입력해주세요");
        if (!form.childGrade.trim()) errors.push("학년을 입력해주세요");
        if (!form.institutionType) errors.push("기관 유형을 선택해주세요");
        if (form.institutionType === InstitutionType.OTHER && !form.institutionTypeOther.trim())
          errors.push("기관 유형(기타)을 입력해주세요");
        if (!form.guardianContactAvailability)
          errors.push("보호자 연락 가능여부를 선택해주세요");
        break;
      case 2:
        if (!form.crisisOccurrenceDate)
          errors.push("위기 발생 시점을 입력해주세요");
        if (form.crisisLevels.length === 0)
          errors.push("위기 수준 항목을 최소 1개 선택해주세요");
        if (
          form.crisisLevels.includes(CrisisLevel.OTHER) &&
          !form.crisisLevelOther.trim()
        )
          errors.push("기타 위기 수준 내용을 입력해주세요");
        break;
      case 3:
        if (
          form.hasPreExistingPsychiatricCondition &&
          !form.psychiatricDiagnosisName.trim()
        )
          errors.push("진단명을 입력해주세요");
        if (form.isCurrentlyOnMedication && !form.medicationName.trim())
          errors.push("약물명을 입력해주세요");
        break;
      case 4:
        if (!form.recentIncidentsAndBehavioralChanges.trim())
          errors.push("최근 문제 행동을 입력해주세요");
        break;
      case 5:
        if (!form.referralMotivation.trim())
          errors.push("의뢰 동기를 입력해주세요");
        if (!form.counselingGoal.trim())
          errors.push("상담 목표를 입력해주세요");
        break;
      case 6:
        if (!form.guardianConsentStatus)
          errors.push("보호자 동의 여부를 선택해주세요");
        if (!form.consentPersonName.trim())
          errors.push("동의자 성명을 입력해주세요");
        if (!form.relationship.trim())
          errors.push("동의자와 아동의 관계를 입력해주세요");
        if (!form.consentDate) errors.push("동의 날짜를 입력해주세요");
        break;
    }
    return errors;
  };

  const handleNext = () => {
    const errors = validateStep();
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors([]);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const handlePrev = () => {
    setValidationErrors([]);
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async () => {
    const errors = validateStep();
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const payload: CreateFastTrackReferralRequest = {
      referralDate: form.referralDate,
      institutionName: form.institutionName,
      staffName: form.staffName,
      childBasicInfo: {
        name: form.childName,
        gender: form.childGender as Gender,
        age: parseInt(form.childAge, 10),
        grade: form.childGrade,
        facilityAdmissionDate: form.facilityAdmissionDate || undefined,
        institutionType: form.institutionType as InstitutionType,
        institutionTypeOther:
          form.institutionType === InstitutionType.OTHER
            ? form.institutionTypeOther
            : undefined,
        guardianContactAvailability:
          form.guardianContactAvailability as GuardianContactAvailability,
      },
      crisisStatus: {
        crisisOccurrenceDate: form.crisisOccurrenceDate,
        crisisLevels: form.crisisLevels,
        crisisLevelOther: form.crisisLevels.includes(CrisisLevel.OTHER)
          ? form.crisisLevelOther
          : undefined,
      },
      psychologicalInfo: {
        hasPreExistingPsychiatricCondition:
          form.hasPreExistingPsychiatricCondition,
        psychiatricDiagnosisName: form.hasPreExistingPsychiatricCondition
          ? form.psychiatricDiagnosisName
          : undefined,
        isCurrentlyOnMedication: form.isCurrentlyOnMedication,
        medicationName: form.isCurrentlyOnMedication
          ? form.medicationName
          : undefined,
        childCharacteristicsAndCounselingNotes:
          form.childCharacteristicsAndCounselingNotes || undefined,
      },
      recentBehavior: {
        recentIncidentsAndBehavioralChanges:
          form.recentIncidentsAndBehavioralChanges,
      },
      referralMotivation: {
        referralMotivation: form.referralMotivation,
        counselingGoal: form.counselingGoal,
      },
      privacyConsent: {
        guardianConsentStatus:
          form.guardianConsentStatus as GuardianConsentStatus,
        consentPersonName: form.consentPersonName,
        relationship: form.relationship,
        consentDate: form.consentDate,
      },
    };

    try {
      await createFastTrackReferral(payload);
      setIsSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "접수 중 오류가 발생했습니다. 다시 시도해주세요."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── 성공 화면 ───
  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative z-10 bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 text-center animate-fade-in">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            긴급 의뢰가 접수되었습니다
          </h3>
          <p className="text-gray-600 mb-6">
            담당자가 확인 후 빠르게 연락드리겠습니다.
          </p>
          <button
            onClick={onClose}
            className="w-full py-3 bg-yeirin-yellow text-gray-900 font-medium rounded-xl hover:bg-yellow-400 transition-colors"
          >
            확인
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl mx-4 my-6 md:my-12 z-10">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute -top-11 right-0 p-2 text-white hover:text-yeirin-yellow transition-colors rounded-full hover:bg-white/10"
          aria-label="닫기"
        >
          <X className="w-7 h-7" />
        </button>

        <div
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 헤더 */}
          <div className="bg-gradient-to-r from-amber-500 to-yeirin-orange px-6 py-5">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="w-5 h-5 text-white" />
              <h2 className="text-lg font-bold text-white">
                심리정서 위기 아동 긴급 의뢰서
              </h2>
            </div>
            {/* 스텝 인디케이터 */}
            <div className="flex items-center gap-1">
              {STEPS.map((label, i) => (
                <div key={label} className="flex-1 flex flex-col items-center">
                  <div
                    className={`h-1 w-full rounded-full transition-colors ${
                      i <= step ? "bg-white" : "bg-white/30"
                    }`}
                  />
                  <span
                    className={`text-[10px] mt-1 whitespace-nowrap ${
                      i === step
                        ? "text-white font-medium"
                        : "text-white/50"
                    } hidden md:block`}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-white/80 text-xs mt-2 md:hidden">
              {step + 1}/{STEPS.length} · {STEPS[step]}
            </p>
          </div>

          {/* 폼 본문 */}
          <div className="px-6 py-6 max-h-[60vh] overflow-y-auto">
            {/* 유효성 오류 */}
            {validationErrors.length > 0 && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                {validationErrors.map((err) => (
                  <p key={err}>• {err}</p>
                ))}
              </div>
            )}

            {/* API 오류 */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                {error}
              </div>
            )}

            {step === 0 && <Step0Meta form={form} updateField={updateField} />}
            {step === 1 && (
              <Step1ChildInfo form={form} updateField={updateField} />
            )}
            {step === 2 && (
              <Step2Crisis
                form={form}
                updateField={updateField}
                toggleCrisisLevel={toggleCrisisLevel}
              />
            )}
            {step === 3 && (
              <Step3Psychological form={form} updateField={updateField} />
            )}
            {step === 4 && (
              <Step4Behavior form={form} updateField={updateField} />
            )}
            {step === 5 && (
              <Step5Motivation form={form} updateField={updateField} />
            )}
            {step === 6 && (
              <Step6Consent form={form} updateField={updateField} />
            )}
          </div>

          {/* 푸터 (네비게이션) */}
          <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={step === 0}
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              이전
            </button>

            {step < STEPS.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-1 px-6 py-2.5 text-sm font-medium bg-yeirin-yellow text-gray-900 rounded-xl hover:bg-yellow-400 transition-colors"
              >
                다음
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium bg-yeirin-orange text-white rounded-xl hover:bg-amber-600 transition-colors disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    접수 중...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    접수하기
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Step Components
// ──────────────────────────────────────────────

type StepProps = {
  form: FormData;
  updateField: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
};

function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}

const inputClass =
  "w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-yeirin-yellow/50 focus:border-yeirin-yellow outline-none transition-colors";
const selectClass = `${inputClass} bg-white`;

// ─── Step 0: 의뢰 메타 정보 ───
function Step0Meta({ form, updateField }: StepProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-gray-900 mb-1">의뢰 기본 정보</h3>
      <p className="text-xs text-gray-500 mb-4">
        의뢰하시는 기관과 담당자 정보를 입력해주세요.
      </p>
      <div>
        <FieldLabel required>의뢰일자</FieldLabel>
        <input
          type="date"
          value={form.referralDate}
          onChange={(e) => updateField("referralDate", e.target.value)}
          className={inputClass}
        />
      </div>
      <div>
        <FieldLabel required>기관명</FieldLabel>
        <input
          type="text"
          value={form.institutionName}
          onChange={(e) => updateField("institutionName", e.target.value)}
          placeholder="예: 서울시 OO아동양육시설"
          className={inputClass}
        />
      </div>
      <div>
        <FieldLabel required>담당자 성명</FieldLabel>
        <input
          type="text"
          value={form.staffName}
          onChange={(e) => updateField("staffName", e.target.value)}
          placeholder="담당자 이름"
          className={inputClass}
        />
      </div>
    </div>
  );
}

// ─── Step 1: 아동 기본 정보 ───
function Step1ChildInfo({ form, updateField }: StepProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-gray-900 mb-1">
        1. 아동 기본 정보
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <FieldLabel required>아동 이름</FieldLabel>
          <input
            type="text"
            value={form.childName}
            onChange={(e) => updateField("childName", e.target.value)}
            placeholder="아동 이름"
            className={inputClass}
          />
        </div>
        <div>
          <FieldLabel required>성별</FieldLabel>
          <select
            value={form.childGender}
            onChange={(e) =>
              updateField("childGender", e.target.value as Gender)
            }
            className={selectClass}
          >
            <option value="">선택</option>
            {Object.entries(GenderLabel).map(([val, label]) => (
              <option key={val} value={val}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <FieldLabel required>연령 (만 나이)</FieldLabel>
          <input
            type="number"
            min={0}
            max={18}
            value={form.childAge}
            onChange={(e) => updateField("childAge", e.target.value)}
            placeholder="만 나이"
            className={inputClass}
          />
        </div>
        <div>
          <FieldLabel required>학년</FieldLabel>
          <input
            type="text"
            value={form.childGrade}
            onChange={(e) => updateField("childGrade", e.target.value)}
            placeholder="예: 초등학교 3학년"
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <FieldLabel>시설 입소일 / 센터 이용시작일</FieldLabel>
        <input
          type="date"
          value={form.facilityAdmissionDate}
          onChange={(e) =>
            updateField("facilityAdmissionDate", e.target.value)
          }
          className={inputClass}
        />
      </div>
      <div>
        <FieldLabel required>기관 유형</FieldLabel>
        <select
          value={form.institutionType}
          onChange={(e) =>
            updateField("institutionType", e.target.value as InstitutionType)
          }
          className={selectClass}
        >
          <option value="">선택</option>
          {Object.entries(InstitutionTypeLabel).map(([val, label]) => (
            <option key={val} value={val}>
              {label}
            </option>
          ))}
        </select>
      </div>
      {form.institutionType === InstitutionType.OTHER && (
        <div>
          <FieldLabel required>기관 유형 (직접 입력)</FieldLabel>
          <input
            type="text"
            value={form.institutionTypeOther}
            onChange={(e) =>
              updateField("institutionTypeOther", e.target.value)
            }
            placeholder="기관 유형을 입력해주세요"
            className={inputClass}
            maxLength={200}
          />
        </div>
      )}
      <div>
        <FieldLabel required>보호자 연락 가능여부</FieldLabel>
        <div className="flex gap-2">
          {Object.entries(GuardianContactAvailabilityLabel).map(
            ([val, label]) => (
              <button
                key={val}
                type="button"
                onClick={() =>
                  updateField(
                    "guardianContactAvailability",
                    val as GuardianContactAvailability
                  )
                }
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                  form.guardianContactAvailability === val
                    ? "bg-yeirin-yellow border-yeirin-yellow text-gray-900"
                    : "bg-white border-gray-300 text-gray-600 hover:border-yeirin-yellow"
                }`}
              >
                {label}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Step 2: 위기 수준 ───
function Step2Crisis({
  form,
  updateField,
  toggleCrisisLevel,
}: StepProps & { toggleCrisisLevel: (level: CrisisLevel) => void }) {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-gray-900 mb-1">
        2. 현재 위기 수준
      </h3>
      <div>
        <FieldLabel required>위기 발생 시점</FieldLabel>
        <input
          type="date"
          value={form.crisisOccurrenceDate}
          onChange={(e) =>
            updateField("crisisOccurrenceDate", e.target.value)
          }
          className={inputClass}
        />
      </div>
      <div>
        <FieldLabel required>위기 수준 (복수 선택 가능)</FieldLabel>
        <div className="space-y-2 mt-1">
          {Object.entries(CrisisLevelLabel).map(([val, label]) => (
            <label
              key={val}
              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                form.crisisLevels.includes(val as CrisisLevel)
                  ? "bg-amber-50 border-yeirin-orange"
                  : "bg-white border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="checkbox"
                checked={form.crisisLevels.includes(val as CrisisLevel)}
                onChange={() => toggleCrisisLevel(val as CrisisLevel)}
                className="w-4 h-4 rounded border-gray-300 text-yeirin-orange focus:ring-yeirin-yellow accent-yeirin-orange"
              />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </div>
      {form.crisisLevels.includes(CrisisLevel.OTHER) && (
        <div>
          <FieldLabel required>기타 위기 수준 내용</FieldLabel>
          <textarea
            value={form.crisisLevelOther}
            onChange={(e) => updateField("crisisLevelOther", e.target.value)}
            placeholder="기타 위기 상황을 구체적으로 작성해주세요"
            className={`${inputClass} resize-none`}
            rows={2}
            maxLength={500}
          />
        </div>
      )}
    </div>
  );
}

// ─── Step 3: 정서/심리 관련 정보 ───
function Step3Psychological({ form, updateField }: StepProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-gray-900 mb-1">
        3. 정서/심리 관련 정보
      </h3>
      <div>
        <FieldLabel>기존 신경정신과 질환 유무</FieldLabel>
        <div className="flex gap-2">
          {[
            { val: true, label: "있음" },
            { val: false, label: "없음" },
          ].map(({ val, label }) => (
            <button
              key={String(val)}
              type="button"
              onClick={() =>
                updateField("hasPreExistingPsychiatricCondition", val)
              }
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                form.hasPreExistingPsychiatricCondition === val
                  ? "bg-yeirin-yellow border-yeirin-yellow text-gray-900"
                  : "bg-white border-gray-300 text-gray-600 hover:border-yeirin-yellow"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      {form.hasPreExistingPsychiatricCondition && (
        <div>
          <FieldLabel required>진단명</FieldLabel>
          <input
            type="text"
            value={form.psychiatricDiagnosisName}
            onChange={(e) =>
              updateField("psychiatricDiagnosisName", e.target.value)
            }
            placeholder="진단명을 입력해주세요"
            className={inputClass}
            maxLength={300}
          />
        </div>
      )}
      <div>
        <FieldLabel>현재 복용 중인 약물 유무</FieldLabel>
        <div className="flex gap-2">
          {[
            { val: true, label: "있음" },
            { val: false, label: "없음" },
          ].map(({ val, label }) => (
            <button
              key={String(val)}
              type="button"
              onClick={() => updateField("isCurrentlyOnMedication", val)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                form.isCurrentlyOnMedication === val
                  ? "bg-yeirin-yellow border-yeirin-yellow text-gray-900"
                  : "bg-white border-gray-300 text-gray-600 hover:border-yeirin-yellow"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      {form.isCurrentlyOnMedication && (
        <div>
          <FieldLabel required>약물명</FieldLabel>
          <input
            type="text"
            value={form.medicationName}
            onChange={(e) => updateField("medicationName", e.target.value)}
            placeholder="복용 중인 약물명을 입력해주세요"
            className={inputClass}
            maxLength={300}
          />
        </div>
      )}
      <div>
        <FieldLabel>아동 특성 및 면담 시 주의사항</FieldLabel>
        <textarea
          value={form.childCharacteristicsAndCounselingNotes}
          onChange={(e) =>
            updateField(
              "childCharacteristicsAndCounselingNotes",
              e.target.value
            )
          }
          placeholder="아동의 특성이나 상담 시 유의해야 할 점이 있으면 작성해주세요"
          className={`${inputClass} resize-none`}
          rows={3}
          maxLength={2000}
        />
      </div>
    </div>
  );
}

// ─── Step 4: 최근 문제 행동 ───
function Step4Behavior({ form, updateField }: StepProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-gray-900 mb-1">
        4. 최근 문제 행동 및 에피소드
      </h3>
      <p className="text-xs text-gray-500">
        최근 1개월 이내의 주요 사건 또는 행동 변화를 최대한 구체적으로
        작성해주세요.
      </p>
      <div>
        <FieldLabel required>주요 사건 및 행동 변화</FieldLabel>
        <textarea
          value={form.recentIncidentsAndBehavioralChanges}
          onChange={(e) =>
            updateField(
              "recentIncidentsAndBehavioralChanges",
              e.target.value
            )
          }
          placeholder="최근 아동에게 나타난 문제 행동이나 사건을 구체적으로 작성해주세요"
          className={`${inputClass} resize-none`}
          rows={6}
          maxLength={5000}
        />
        <p className="text-xs text-gray-400 mt-1 text-right">
          {form.recentIncidentsAndBehavioralChanges.length}/5000
        </p>
      </div>
    </div>
  );
}

// ─── Step 5: 의뢰 동기 및 상담 목표 ───
function Step5Motivation({ form, updateField }: StepProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-gray-900 mb-1">
        5. 의뢰 동기 및 상담 목표
      </h3>
      <div>
        <FieldLabel required>의뢰 동기</FieldLabel>
        <textarea
          value={form.referralMotivation}
          onChange={(e) =>
            updateField("referralMotivation", e.target.value)
          }
          placeholder="아동을 의뢰하게 된 동기를 작성해주세요"
          className={`${inputClass} resize-none`}
          rows={4}
          maxLength={3000}
        />
        <p className="text-xs text-gray-400 mt-1 text-right">
          {form.referralMotivation.length}/3000
        </p>
      </div>
      <div>
        <FieldLabel required>상담 목표</FieldLabel>
        <textarea
          value={form.counselingGoal}
          onChange={(e) => updateField("counselingGoal", e.target.value)}
          placeholder="상담을 통해 달성하고자 하는 목표를 작성해주세요"
          className={`${inputClass} resize-none`}
          rows={4}
          maxLength={3000}
        />
        <p className="text-xs text-gray-400 mt-1 text-right">
          {form.counselingGoal.length}/3000
        </p>
      </div>
    </div>
  );
}

// ─── Step 6: 개인정보 동의 ───
function Step6Consent({ form, updateField }: StepProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-gray-900 mb-1">
        6. 개인정보 공유 및 상담 동의
      </h3>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 leading-relaxed">
        본 의뢰서에 기재된 아동의 개인정보는 상담 서비스 제공을 위한 목적으로만
        활용되며, 관련 법령에 따라 안전하게 관리됩니다.
      </div>
      <div>
        <FieldLabel required>보호자 동의 여부</FieldLabel>
        <div className="flex gap-2">
          {Object.entries(GuardianConsentStatusLabel).map(([val, label]) => (
            <button
              key={val}
              type="button"
              onClick={() =>
                updateField(
                  "guardianConsentStatus",
                  val as GuardianConsentStatus
                )
              }
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                form.guardianConsentStatus === val
                  ? "bg-yeirin-yellow border-yeirin-yellow text-gray-900"
                  : "bg-white border-gray-300 text-gray-600 hover:border-yeirin-yellow"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <FieldLabel required>동의자 성명</FieldLabel>
          <input
            type="text"
            value={form.consentPersonName}
            onChange={(e) =>
              updateField("consentPersonName", e.target.value)
            }
            placeholder="동의자 이름"
            className={inputClass}
          />
        </div>
        <div>
          <FieldLabel required>아동과의 관계</FieldLabel>
          <input
            type="text"
            value={form.relationship}
            onChange={(e) => updateField("relationship", e.target.value)}
            placeholder="예: 시설장, 생활지도원"
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <FieldLabel required>동의 날짜</FieldLabel>
        <input
          type="date"
          value={form.consentDate}
          onChange={(e) => updateField("consentDate", e.target.value)}
          className={inputClass}
        />
      </div>
    </div>
  );
}
