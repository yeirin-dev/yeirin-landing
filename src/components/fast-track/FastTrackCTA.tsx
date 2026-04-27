"use client";

import { AlertTriangle } from "lucide-react";

interface FastTrackCTAProps {
  onClick: () => void;
  className?: string;
}

export default function FastTrackCTA({ onClick, className = "" }: FastTrackCTAProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 border border-amber-200/60 ${className}`}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-yeirin-orange/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-yeirin-yellow/15 to-transparent rounded-full translate-y-1/2 -translate-x-1/4" />

      <div className="relative px-8 py-10 md:px-12 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                <AlertTriangle className="w-3.5 h-3.5" />
                긴급 지원
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              심리정서 위기 아동이 있으신가요?
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-xl">
              긴급하게 심리상담 연계가 필요한 아동을 위해 빠른 의뢰 채널을
              운영하고 있습니다. 아래 버튼을 통해 즉시 의뢰서를 작성하실 수
              있습니다.
            </p>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={onClick}
              className="group relative inline-flex items-center gap-2.5 px-7 py-4 bg-gradient-to-r from-yeirin-orange to-amber-500 text-white font-semibold rounded-2xl shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 hover:from-amber-600 hover:to-amber-500 transition-all duration-200 active:scale-[0.98]"
            >
              <AlertTriangle className="w-5 h-5" />
              <span>심리정서 위기 아동 긴급 의뢰하기</span>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
