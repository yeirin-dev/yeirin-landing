"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-yeirin-cream py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Left Section */}
          <div className="flex flex-col gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo/yeirin-logo.png"
                alt="예이린"
                width={100}
                height={36}
                className="h-9 w-auto object-contain"
              />
            </Link>

            {/* Contact Info */}
            <div className="text-sm text-gray-600 space-y-1">
              <p>(48117) 부산광역시 해운대구 달맞이길 117번다길 42-8 301호</p>
              <p>대표이메일 yeirin2023@gmail.com</p>
              <p>사업자번호</p>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="text-gray-400 cursor-default">
                이용약관
              </span>
              <span className="text-gray-400 cursor-default">
                개인정보처리방침
              </span>
              <span className="text-gray-400 cursor-default">
                인재채용
              </span>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col items-start md:items-end gap-4">
            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              aria-label="맨 위로 이동"
            >
              <ChevronUp size={24} className="text-gray-700" />
            </button>

            {/* Partner Logos */}
            <div className="flex flex-col items-end gap-3">
              <div className="flex items-center gap-3">
                <Link href="https://www.mohw.go.kr/" target="_blank" rel="noopener noreferrer">
                  <Image
                    src="/images/보건복지부.png"
                    alt="보건복지부"
                    width={150}
                    height={40}
                    className="h-10 w-auto object-contain"
                  />
                </Link>
                <Link href="https://www.msit.go.kr/index.do" target="_blank" rel="noopener noreferrer">
                  <Image
                    src="/images/과학기술정보통신부.png"
                    alt="과학기술정보통신부"
                    width={150}
                    height={40}
                    className="h-10 w-auto object-contain"
                  />
                </Link>
                <Link href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer">
                  <Image
                    src="/images/국세청.png"
                    alt="국세청"
                    width={200}
                    height={52}
                    className="h-12 w-auto object-contain"
                  />
                </Link>
              </div>
              <Link
                href="https://www.instagram.com/yeiri_n2023official/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="인스타그램"
              >
                <Image
                  src="/images/인스타그램.svg"
                  alt="인스타그램"
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain"
                />
              </Link>
            </div>

            {/* Copyright */}
            <p className="text-sm text-gray-500">
              © 2021 Yeirin All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
