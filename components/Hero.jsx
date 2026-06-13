import {
  GraduationCap,
  BarChart3,
  Shield,
  Users,
  ArrowUpRight,
  Play,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const features = [
  {
    icon: GraduationCap,
    title: "Expert Mentorship",
    description: "Learn from experienced market professionals.",
    descriptionMobile: "Learn from experienced market professionals.",
  },
  {
    icon: BarChart3,
    title: "Proven Strategies",
    description: "Structured strategies with real market validation.",
    descriptionMobile: "Structured strategies with real market validation.",
  },
  {
    icon: Shield,
    title: "Risk Management",
    description: "Protect capital. Manage risk. Trade with confidence.",
    descriptionMobile: "Protect capital. Manage risk. Trade confidently.",
  },
  {
    icon: Users,
    title: "Elite Community",
    description: "Connect, grow, and succeed with serious traders.",
    descriptionMobile: "Connect, grow, and succeed together.",
  },
];

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col overflow-hidden">
      {/* Mobile background */}
      <Image
        src="/image-mobile.png"
        alt=""
        fill
        priority
        className="object-cover object-[center_20%] lg:hidden"
        sizes="100vw"
        quality={90}
      />

      {/* Desktop background */}
      <Image
        src="/pc-background.png"
        alt="Elite Trader lifestyle"
        fill
        priority
        className="hidden lg:block object-cover object-center"
        sizes="100vw"
        quality={90}
      />

      {/* Mobile overlays — lighter so lifestyle photo reads like mockup */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/20 to-black/90 lg:hidden" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/95 via-transparent to-black/35 lg:hidden" />

      {/* Desktop overlays */}
      <div className="absolute inset-0 z-[1] hidden lg:block bg-gradient-to-r from-black/85 via-black/45 to-black/15" />
      <div className="absolute inset-0 z-[1] hidden lg:block bg-gradient-to-t from-black/95 via-black/25 to-black/35" />

      {/* ——— Mobile hero ——— */}
      <div className="relative z-10 flex flex-col lg:hidden min-h-[100dvh] pt-[5.25rem] pb-5 px-4">
        <div className="flex items-center gap-2.5 mb-4 reveal">
          <span className="block w-7 h-px bg-[#d4af37] shrink-0" aria-hidden="true" />
          <p className="text-[#d4af37] text-[9px] font-semibold uppercase tracking-[0.2em] leading-tight">
            Discipline today, freedom tomorrow.
          </p>
        </div>

        <h1 className="font-playfair text-[2.125rem] leading-[1.14] font-medium tracking-tight text-white mb-3 reveal reveal-delayed-1">
          Think Smart.
          <br />
          Trade Wise.
          <br />
          <span className="text-[#d4af37]">Become Elite.</span>
        </h1>

        <span
          className="block w-10 h-px bg-[#d4af37] mb-4 reveal reveal-delayed-1"
          aria-hidden="true"
        />

        <p className="text-white/85 text-[13px] leading-[1.55] mb-6 max-w-[19rem] reveal reveal-delayed-2">
          Learn the skills, discipline, and mindset required to navigate the
          markets with confidence.
        </p>

        <div className="flex flex-col gap-2.5 mb-7 reveal reveal-delayed-3">
          <Link
            href="/register"
            className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#c9a227] via-[#e8c96a] to-[#f0d47a] text-black font-semibold text-sm shadow-[0_0_20px_rgba(212,175,55,0.35)] border border-[#f5e6a8]/25"
          >
            <span className="w-7 h-7 rounded-full bg-black/25 flex items-center justify-center shrink-0">
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
            </span>
            Start Your Journey
          </Link>

          <Link
            href="#courses"
            className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl border border-[#d4af37]/55 text-[#d4af37] font-semibold text-sm bg-black/35 backdrop-blur-sm"
          >
            <span className="w-7 h-7 rounded-full border border-[#d4af37]/45 flex items-center justify-center shrink-0">
              <Play className="w-3 h-3 ml-0.5" fill="currentColor" strokeWidth={0} />
            </span>
            Explore Courses
          </Link>
        </div>

        {/* Mobile feature cards 2×2 */}
        <div className="grid grid-cols-2 gap-2.5 mb-7">
          {features.map(({ icon: Icon, title, descriptionMobile }) => (
            <div
              key={title}
              className="rounded-xl border border-[#d4af37]/30 bg-black/45 backdrop-blur-md p-3"
            >
              <div className="w-8 h-8 rounded-full border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] mb-2">
                <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
              </div>
              <h3 className="text-[#d4af37] font-semibold text-[11px] mb-1 leading-snug">
                {title}
              </h3>
              <p className="text-white/55 text-[9px] leading-[1.45]">
                {descriptionMobile}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile footer tagline */}
        <div className="mt-auto flex flex-col items-center gap-3 pb-2">
          <div className="flex items-center w-full gap-2.5" aria-hidden="true">
            <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#d4af37]/55" />
            <span className="w-1.5 h-1.5 rotate-45 bg-[#d4af37] shrink-0" />
            <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#d4af37]/55" />
          </div>
          <p className="text-white/75 text-[9px] font-semibold uppercase tracking-[0.2em] text-center leading-relaxed px-1">
            Join the next generation of elite traders.
          </p>
        </div>
      </div>

      {/* ——— Desktop hero ——— */}
      <div className="relative z-10 hidden lg:flex flex-1 items-center pt-44 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full">
          <div className="max-w-xl lg:max-w-2xl">
            <h1 className="font-playfair text-[clamp(2.5rem,5.5vw,4.5rem)] font-medium tracking-tight text-white leading-[1.15] mb-6 reveal">
              Think Smart. Trade Wise.
              <br />
              <span className="text-[#d4af37]">Become Elite.</span>
            </h1>

            <p className="text-white/80 text-base sm:text-[17px] max-w-md mb-10 leading-relaxed reveal reveal-delayed-1">
              Learn the skills, discipline, and mindset required to navigate the
              markets with confidence.
            </p>

            <div className="flex flex-wrap items-center gap-4 reveal reveal-delayed-2">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 bg-gradient-to-b from-[#e8c96a] to-[#a88620] hover:from-[#f0d47a] hover:to-[#b89428] text-black font-semibold py-3.5 px-7 rounded-lg transition-all shadow-[0_4px_24px_rgba(212,175,55,0.35)] text-[15px] border border-[#f5e6a8]/30"
              >
                Start Your Journey
                <ArrowUpRight className="w-5 h-5" strokeWidth={2.5} />
              </Link>

              <Link
                href="#courses"
                className="inline-flex items-center gap-2 border border-[#d4af37]/70 text-[#d4af37] hover:text-[#f0d47a] hover:border-[#e8c96a] font-semibold py-3.5 px-7 rounded-lg transition-all text-[15px] bg-black/25 backdrop-blur-sm"
              >
                Explore Courses
                <ArrowUpRight className="w-5 h-5 rotate-90" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop features bar */}
      <div className="relative z-10 hidden lg:block border-t border-[#d4af37]/20 bg-black/75 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-9 sm:py-11">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0">
            {features.map(({ icon: Icon, title, description }, index) => (
              <div
                key={title}
                className={`flex gap-4 lg:px-8 ${
                  index > 0 ? "lg:border-l lg:border-[#d4af37]/20" : ""
                }`}
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/5 flex items-center justify-center text-[#d4af37]">
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-[#d4af37] font-semibold text-sm sm:text-[15px] mb-1.5">
                    {title}
                  </h3>
                  <p className="text-white/55 text-xs sm:text-sm leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
