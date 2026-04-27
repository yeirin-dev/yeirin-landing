"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  src: string;
  alt: string;
}

const slides: Slide[] = [
  { src: "/images/characters/emperor-penguins.jpg", alt: "예이린 CI 캐릭터 - 황제펭귄 피피, 페페, 핀" },
  { src: "/images/characters/character-design.jpg", alt: "예이린 캐릭터 디자인 컨셉" },
  { src: "/images/characters/pipi.jpg", alt: "피피 - 주황 가방 캐릭터" },
  { src: "/images/characters/pepe.jpg", alt: "페페 - 노란 가방 캐릭터" },
  { src: "/images/characters/pin.jpg", alt: "핀 - 빨간 가방 캐릭터" },
  { src: "/images/characters/branding-2.jpeg", alt: "예이린 브랜딩 시안 2" },
  { src: "/images/characters/branding-3.jpg", alt: "예이린 브랜딩 시안 3" },
  { src: "/images/characters/branding-4.jpg", alt: "예이린 브랜딩 시안 4" },
  { src: "/images/characters/branding-5.jpg", alt: "예이린 브랜딩 시안 5" },
  { src: "/images/characters/branding-6.jpg", alt: "예이린 브랜딩 시안 6" },
  { src: "/images/characters/branding-12.jpg", alt: "예이린 브랜딩 시안 12" },
];

export default function CICharacterCarousel() {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  const prev = () => setCurrent((i) => (i - 1 + total) % total);
  const next = () => setCurrent((i) => (i + 1) % total);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Slide viewport */}
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-yeirin-cream">
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === current ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-contain"
              priority={index === 0}
            />
          </div>
        ))}

        {/* Prev / Next buttons */}
        <button
          onClick={prev}
          aria-label="이전 이미지"
          className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-gray-900 shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={next}
          aria-label="다음 이미지"
          className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-gray-900 shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Counter */}
        <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/40 text-white text-xs font-semibold backdrop-blur-sm">
          {current + 1} / {total}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-6 flex-wrap">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`${index + 1}번째 이미지로 이동`}
            className={`h-2.5 rounded-full transition-all ${
              index === current
                ? "w-8 bg-yeirin-orange"
                : "w-2.5 bg-gray-300 hover:bg-yeirin-yellow"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
