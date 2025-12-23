"use client";

const partners = [
  { name: "eBay", logo: "eBay" },
  { name: "EA", logo: "EA" },
  { name: "Google", logo: "Google" },
  { name: "Odoo", logo: "odoo" },
  { name: "Grab", logo: "Grab" },
  { name: "Intuit", logo: "intuit" },
  { name: "Mojang", logo: "MOJANG" },
  { name: "Atlassian", logo: "ATLASSIAN" },
  { name: "Sooji", logo: "SOOJI" },
  { name: "AWS", logo: "aws" },
  { name: "Kakao", logo: "kakao" },
  { name: "ATLAS", logo: "ATLAS" },
];

export default function LogosSection() {
  return (
    <section className="py-12 md:py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Partner Logos */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="text-gray-400 font-semibold text-sm md:text-base hover:text-gray-600 transition-colors cursor-default"
            >
              {partner.logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
