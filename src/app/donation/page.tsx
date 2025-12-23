"use client";

import { useState } from "react";

export default function DonationPage() {
  const [formData, setFormData] = useState({
    organizationName: "",
    contact: "",
    managerName: "",
    managerEmail: "",
    receiptRequired: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
    alert("후원 신청이 접수되었습니다. 감사합니다!");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-yeirin-yellow to-yellow-400 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <p className="text-white/90 font-medium mb-4">
            Health Care system for Your Child
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            예이린 후원 안내
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            함께 만들어가는 따뜻한 세상, 지금 시작하세요
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-yeirin-orange text-center mb-8">
              후원 단체 정보
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Organization Name */}
              <div>
                <label
                  htmlFor="organizationName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  단체명
                </label>
                <input
                  type="text"
                  id="organizationName"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-yeirin-yellow rounded-lg focus:outline-none focus:ring-2 focus:ring-yeirin-yellow/50"
                  placeholder="단체명을 입력해주세요"
                  required
                />
              </div>

              {/* Contact */}
              <div>
                <label
                  htmlFor="contact"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  연락처
                </label>
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-yeirin-yellow rounded-lg focus:outline-none focus:ring-2 focus:ring-yeirin-yellow/50"
                  placeholder="연락처를 입력해주세요"
                  required
                />
              </div>

              {/* Manager Name */}
              <div>
                <label
                  htmlFor="managerName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  담당자명
                </label>
                <input
                  type="text"
                  id="managerName"
                  name="managerName"
                  value={formData.managerName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-yeirin-yellow rounded-lg focus:outline-none focus:ring-2 focus:ring-yeirin-yellow/50"
                  placeholder="담당자명을 입력해주세요"
                  required
                />
              </div>

              {/* Manager Email */}
              <div>
                <label
                  htmlFor="managerEmail"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  담당자 이메일
                </label>
                <input
                  type="email"
                  id="managerEmail"
                  name="managerEmail"
                  value={formData.managerEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-yeirin-yellow rounded-lg focus:outline-none focus:ring-2 focus:ring-yeirin-yellow/50"
                  placeholder="이메일을 입력해주세요"
                  required
                />
              </div>

              {/* Receipt Checkbox */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="receiptRequired"
                  name="receiptRequired"
                  checked={formData.receiptRequired}
                  onChange={handleChange}
                  className="w-5 h-5 border-2 border-gray-300 rounded text-yeirin-yellow focus:ring-yeirin-yellow"
                />
                <label
                  htmlFor="receiptRequired"
                  className="text-sm text-gray-600"
                >
                  기부금 영수증 발급 여부
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-yeirin-yellow hover:bg-yeirin-orange text-gray-900 hover:text-white font-semibold py-3 px-6 rounded-full transition-colors"
                >
                  다음
                </button>
              </div>
            </form>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>문의사항이 있으시면 아래로 연락해주세요.</p>
            <p className="mt-2">
              이메일:{" "}
              <a
                href="mailto:yeirin2023@gmail.com"
                className="text-yeirin-orange hover:underline"
              >
                yeirin2023@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
