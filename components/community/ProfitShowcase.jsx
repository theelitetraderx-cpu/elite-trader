"use client";

import Image from "next/image";
import CardSwap, { SwapCard } from "@/components/CardSwap";

export const PROFIT_IMAGES = [
  { src: "/community/profit1.png", alt: "Verified member profit — trade result 1" },
  { src: "/community/profit2.png", alt: "Verified member profit — trade result 2" },
  { src: "/community/profit3.png", alt: "Verified member profit — trade result 3" },
  { src: "/community/profit4.png", alt: "Verified member profit — trade result 4" },
];

export default function ProfitShowcase() {
  return (
    <div className="relative w-full h-[380px] sm:h-[440px] md:h-[500px] flex items-center justify-center">
      <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-gold-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      <CardSwap
        width={300}
        height={420}
        cardDistance={28}
        verticalDistance={32}
        delay={4000}
        pauseOnHover
        easing="smooth"
        skewAmount={3}
      >
        {PROFIT_IMAGES.map((img) => (
          <SwapCard
            key={img.src}
            className="border border-gold-500/20 shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 280px, 300px"
              className="object-cover"
              priority={img.src === PROFIT_IMAGES[0].src}
            />
          </SwapCard>
        ))}
      </CardSwap>
    </div>
  );
}
