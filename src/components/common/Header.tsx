"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "예이린 소개", href: "/about" },
  { name: "협력 기관", href: "/partners" },
  { name: "사업 안내", href: "/activities" },
  { name: "소식", href: "/news" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"KOR" | "ENG">("KOR");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo/yeirin-logo.png"
              alt="예이린"
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-yeirin-orange transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Selector */}
            <div className="flex items-center text-sm text-gray-500">
              <button
                onClick={() => setLanguage("KOR")}
                className={`px-1 ${language === "KOR" ? "text-gray-900 font-semibold" : ""}`}
              >
                KOR
              </button>
              <span className="mx-1">|</span>
              <button
                onClick={() => setLanguage("ENG")}
                className={`px-1 ${language === "ENG" ? "text-gray-900 font-semibold" : ""}`}
              >
                ENG
              </button>
            </div>

            {/* CTA Button */}
            <Link
              href="/donation"
              className="bg-yeirin-yellow hover:bg-yeirin-orange text-gray-900 hover:text-white px-6 py-2 rounded-full font-medium transition-colors"
            >
              후원하기
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            aria-label="메뉴 열기"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-yeirin-orange transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center gap-4 py-2">
                <div className="flex items-center text-sm text-gray-500">
                  <button
                    onClick={() => setLanguage("KOR")}
                    className={`px-1 ${language === "KOR" ? "text-gray-900 font-semibold" : ""}`}
                  >
                    KOR
                  </button>
                  <span className="mx-1">|</span>
                  <button
                    onClick={() => setLanguage("ENG")}
                    className={`px-1 ${language === "ENG" ? "text-gray-900 font-semibold" : ""}`}
                  >
                    ENG
                  </button>
                </div>
              </div>
              <Link
                href="/donation"
                className="bg-yeirin-yellow hover:bg-yeirin-orange text-gray-900 hover:text-white px-6 py-2 rounded-full font-medium transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                후원하기
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
