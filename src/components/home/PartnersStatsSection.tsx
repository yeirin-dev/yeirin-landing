"use client";

import { useEffect, useState, useRef } from "react";
import { Users, MapPin, Building, Home } from "lucide-react";
import { getPartners } from "@/lib/api/partners";

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-yeirin-orange">
      {count}
      <span className="text-2xl md:text-3xl ml-1">{suffix}</span>
    </div>
  );
}

export default function PartnersStatsSection() {
  const [partnerCount, setPartnerCount] = useState(0);
  const [districtCount, setDistrictCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getPartners({ limit: 1 });
        setPartnerCount(response.total);
        setDistrictCount(response.availableDistricts?.length || 0);
      } catch (err) {
        console.error("Failed to fetch partner stats:", err);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    {
      icon: Users,
      label: "전문 인력",
      value: 15,
      suffix: "명",
      color: "text-blue-500"
    },
    {
      icon: MapPin,
      label: "협력 지역",
      value: districtCount,
      suffix: "구군",
      color: "text-green-500"
    },
    {
      icon: Building,
      label: "협력 기관",
      value: partnerCount,
      suffix: "곳",
      color: "text-purple-500"
    },
    {
      icon: Home,
      label: "돌봄 거점",
      value: partnerCount,
      suffix: "곳",
      color: "text-orange-500"
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-yeirin-yellow">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            예이린과 함께 하는 기관
          </h2>
          <p className="text-white/80">
            함께 걸어 지역에서 예이린과 함께 하고 있습니다
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex justify-center mb-4">
                  <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                <p className="text-gray-600 mt-2 text-sm">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
