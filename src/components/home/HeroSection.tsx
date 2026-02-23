"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    image: "/images/hero/hero-bg.png",
    objectPosition: "center",
  },
  {
    id: 2,
    image: "/images/hero/hero-bg-2.jpeg",
    objectPosition: "center top 15%",
  },
  {
    id: 3,
    image: "/images/hero/hero-bg.png",
    objectPosition: "center",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating]);

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 700);
  };

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      {/* Slides Track - moves as a single unit */}
      <div
        ref={trackRef}
        className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
        style={{
          width: `${slides.length * 100}%`,
          transform: `translateX(-${currentSlide * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="relative h-full"
            style={{ width: `${100 / slides.length}%` }}
          >
            <Image
              src={slide.image}
              alt={`슬라이드 ${index + 1}`}
              fill
              className="object-cover"
              style={{ objectPosition: slide.objectPosition }}
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Text Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <p className="text-white/90 text-sm md:text-base mb-4 tracking-wider">
          기술로 돌봄을 새롭게, 아이들의 내일을 따뜻하게
        </p>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-relaxed mb-2">
          대한민국을 넘어 글로벌 돌봄 혁신을 선도하는
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-white tracking-wide">
          TECH–NON PROFIT, 예이린 사회적협동조합
        </p>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`슬라이드 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </section>
  );
}
