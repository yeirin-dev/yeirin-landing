"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const STORAGE_KEY = "popup-ad-dismissed";

type PopupItem = {
  tab: string;
  imageSrc: string;
  imageAlt: string;
  linkHref?: string;
  endDate?: string; // 이 날까지 노출 (YYYY-MM-DD, KST, 당일 포함)
  applyUntil?: string; // 이 날까지만 신청 링크 활성 (YYYY-MM-DD, KST, 당일 포함)
};

const POPUPS: PopupItem[] = [
  {
    tab: "10월 특강",
    imageSrc: "/popup-october.png",
    imageAlt: "예이린 10월 아동·청소년 마음성장 아카데미 특강",
    linkHref: "https://forms.gle/YFEMxBo4PxyJhZ3T6",
    endDate: "2026-10-23",
    applyUntil: "2026-09-28",
  },
];

// 한국 시간 기준 오늘 날짜 (YYYY-MM-DD)
const todayKST = () =>
  new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Seoul" }).format(new Date());

export default function PopupAd() {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [popups, setPopups] = useState<PopupItem[]>([]);

  useEffect(() => {
    const today = todayKST();
    const active = POPUPS.filter((p) => !p.endDate || today <= p.endDate);
    if (active.length === 0) return; // 노출할 팝업 없으면 아예 안 띄움
    setPopups(active);
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) {
      const dismissedDate = new Date(dismissed);
      const now = new Date();
      if (
        dismissedDate.getFullYear() === now.getFullYear() &&
        dismissedDate.getMonth() === now.getMonth() &&
        dismissedDate.getDate() === now.getDate()
      ) {
        return;
      }
    }
    setVisible(true);
  }, []);

  const handleClose = () => setVisible(false);

  const handleDismissToday = () => {
    localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    setVisible(false);
  };

  if (!visible) return null;
  const current = popups[activeTab];
  const today = todayKST();
  const href =
    current.linkHref && (!current.applyUntil || today <= current.applyUntil)
      ? current.linkHref
      : undefined;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-[420px] max-h-[90vh] rounded-2xl overflow-hidden bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {popups.length > 1 && (
          <div className="flex border-b border-gray-200">
            {popups.map((popup, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex-1 py-3 text-sm font-semibold transition-colors ${activeTab === index ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-400 hover:text-gray-600"}`}
              >
                {popup.tab}
              </button>
            ))}
          </div>
        )}
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-auto max-h-[75vh]"
          >
            <Image
              src={current.imageSrc}
              alt={current.imageAlt}
              width={794}
              height={1123}
              className="w-full h-auto"
              priority
            />
          </a>
        ) : (
          <div className="block overflow-auto max-h-[75vh]">
            <Image
              src={current.imageSrc}
              alt={current.imageAlt}
              width={794}
              height={1123}
              className="w-full h-auto"
              priority
            />
          </div>
        )}
        <div className="flex border-t border-gray-200">
          <button
            onClick={handleDismissToday}
            className="flex-1 py-3 text-sm text-gray-500 hover:bg-gray-50 transition-colors"
          >
            오늘 하루 보지 않기
          </button>
          <div className="w-px bg-gray-200" />
          <button
            onClick={handleClose}
            className="flex-1 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
