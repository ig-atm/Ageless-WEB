import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

export default function HomeHero() {
  const containerRef = useRef(null);
  const badgeRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const subheadRef = useRef(null);
  const ctaBtnRef = useRef(null);
  const secondaryBtnRef = useRef(null);
  const trustRef = useRef(null);

  useEffect(() => {
    // GSAP Timeline for Hero Section entrance on mount
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Category Pill Badge fade in
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
      // 2. Main Headline line-by-line reveal without clipping glyphs
      .fromTo(
        [line1Ref.current, line2Ref.current],
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.05,
          stagger: 0.18,
          ease: "power3.out",
          clearProps: "all",
        },
        "-=0.25"
      )
      // 3. Subheadline fade-in
      .fromTo(
        subheadRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.55"
      )
      // 4. Primary CTA Button fading in using subtle spring physics effect
      .fromTo(
        ctaBtnRef.current,
        {
          opacity: 0,
          scale: 0.88,
          y: 20,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.05,
          ease: "elastic.out(1, 0.6)",
        },
        "-=0.35"
      )
      // 5. Secondary CTA Button & Trust Pillars
      .fromTo(
        secondaryBtnRef.current,
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, duration: 0.65 },
        "-=0.75"
      )
      .fromTo(
        trustRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.85 },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#F8F4EC] pt-28 pb-16 px-6 sm:px-10 lg:px-16"
    >
      {/* Luxurious Calming Ambient Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Blush Pink Glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#D8B4AE]/20 blur-3xl" />
        {/* Muted Sage Green Glow */}
        <div className="absolute top-1/3 -right-24 w-[28rem] h-[28rem] rounded-full bg-[#9EAA96]/20 blur-3xl" />
        {/* Soft Clay Glow */}
        <div className="absolute -bottom-24 left-1/4 w-[32rem] h-[32rem] rounded-full bg-[#B99B89]/15 blur-3xl" />
        {/* Soft Ocean Blue Glow */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[40rem] h-[20rem] rounded-full bg-[#91ACB5]/15 blur-3xl" />

        {/* Delicate Grid Pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.035]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#383B35" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center flex flex-col items-center">
        {/* 1. Category Pill Badge */}
        <div ref={badgeRef} className="mb-6 opacity-0">
          <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#D9CDB8] bg-white/80 backdrop-blur-md text-[11px] uppercase tracking-[0.22em] font-medium text-[#657363] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#9EAA96] animate-pulse" />
            <span>Cellular Longevity &amp; Circadian Medicine</span>
          </span>
        </div>

        {/* 2. Strong Headline with Clean Typography & Full Glyph Clearance */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] text-[#383B35] font-light tracking-tight leading-[1.15] mb-6 max-w-4xl flex flex-col items-center gap-1 sm:gap-2">
          <span className="block overflow-visible py-1">
            <span ref={line1Ref} className="inline-block will-change-transform">
              Science. Nature.
            </span>
          </span>
          <span className="block overflow-visible py-1">
            <span
              ref={line2Ref}
              className="inline-block italic font-normal text-[#657363] will-change-transform"
            >
              A Longer, Brighter You.
            </span>
          </span>
        </h1>

        {/* 3. Calming Subheadline */}
        <p
          ref={subheadRef}
          className="opacity-0 max-w-2xl text-base sm:text-lg md:text-xl text-[#383B35]/80 font-light leading-relaxed mb-10"
        >
          Evidence-informed cellular rejuvenation engineered to harmonize your natural
          circadian rhythms, mitochondrial health, and biological vitality through pure,
          physician-calibrated compounds.
        </p>

        {/* 4. Primary CTA Button (Spring Physics) & Secondary CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto">
          <div ref={ctaBtnRef} className="w-full sm:w-auto opacity-0">
            <Link
              to="/shop"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full text-xs font-medium uppercase tracking-[0.16em] bg-[#383B35] text-[#F8F4EC] hover:bg-[#657363] active:scale-95 transition-all shadow-md hover:shadow-xl group"
            >
              <span>Explore The Shop</span>
              <span className="transform group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>

          <div ref={secondaryBtnRef} className="w-full sm:w-auto opacity-0">
            <Link
              to="/philosophy"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs font-medium uppercase tracking-[0.16em] border border-[#383B35]/30 text-[#383B35] bg-white/40 hover:bg-white/80 active:scale-95 transition-all backdrop-blur-xs"
            >
              <span>Our Philosophy</span>
            </Link>
          </div>
        </div>

        {/* 5. Minimalist Scientific Rigor Badges */}
        <div
          ref={trustRef}
          className="opacity-0 mt-16 pt-10 border-t border-[#383B35]/10 w-full max-w-3xl flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-xs font-normal text-[#383B35]/65"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-[#657363]">◈</span>
            <span className="tracking-wide">Third-Party Lab Verified</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-[#657363]">◈</span>
            <span className="tracking-wide">100% Bioavailable Formulations</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-[#657363]">◈</span>
            <span className="tracking-wide">Physician-Led R&amp;D</span>
          </div>
        </div>
      </div>
    </section>
  );
}
