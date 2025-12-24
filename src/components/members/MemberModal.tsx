"use client";

import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { Member } from "@/data/members";
import MemberProfile from "./MemberProfile";

interface MemberModalProps {
  member: Member;
}

export default function MemberModal({ member }: MemberModalProps) {
  const router = useRouter();

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [handleClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl mx-4 my-8 md:my-16 z-10">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute -top-12 right-0 md:right-0 md:-top-12 p-2 text-white hover:text-yeirin-yellow transition-colors rounded-full hover:bg-white/10"
          aria-label="닫기"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Modal Content */}
        <div
          className="bg-gray-50 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <MemberProfile member={member} variant="modal" />
        </div>
      </div>
    </div>
  );
}
