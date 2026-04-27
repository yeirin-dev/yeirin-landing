"use client";

import FastTrackCTA from "@/components/fast-track/FastTrackCTA";

export default function FastTrackSection() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <FastTrackCTA
          onClick={() =>
            window.open("https://fast.yeirin.com", "_blank", "noopener,noreferrer")
          }
        />
      </div>
    </section>
  );
}
