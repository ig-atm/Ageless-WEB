import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CtaAndFooter from "./CtaAndFooter";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const pageContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text Blocks: Start opacity 0 and Y-offset 50px, smoothing into place on enter
      const textBlocks = gsap.utils.toArray(".editorial-text-block");
      textBlocks.forEach((block) => {
        gsap.fromTo(
          block,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // 2. Placeholder Images: Subtle parallax scrub effect (moves at slower speed than scroll velocity)
      const parallaxImages = gsap.utils.toArray(".editorial-image-parallax");
      parallaxImages.forEach((img) => {
        gsap.fromTo(
          img,
          {
            y: -35,
          },
          {
            y: 40,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2, // Smooth parallax feel against Pearl Ivory background
            },
          }
        );
      });

      // 3. Header Title Parallax and Fade
      gsap.fromTo(
        ".editorial-header-text",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power4.out" }
      );
    }, pageContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageContainerRef}
      className="w-full min-h-screen bg-[#F8F4EC] text-[#383B35] pt-28 pb-16 selection:bg-[#9EAA96] selection:text-[#F8F4EC] overflow-hidden"
    >
      {/* ── Editorial Monograph Header ───────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 mb-24">
        <div className="editorial-header-text border-b border-[#383B35]/15 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-semibold text-[#657363] mb-3">
              <span>Vol. IV • Clinical Monograph</span>
              <span>•</span>
              <span>The Ingredient Manifesto</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#383B35] tracking-tight leading-[1.05]">
              Our Philosophy
            </h1>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#383B35]/80 font-light leading-relaxed">
            We reject the industry dogma of proprietary fairy-dust blends. Every milligram
            in an Ageless formulation is backed by human clinical trials, delivered in
            patented bioavailable forms, and measured against the strict biomarker metrics of biological age reversal.
          </p>
        </div>
      </section>

      {/* ── Asymmetrical Block 1: Magtein® Magnesium L-Threonate ────────── */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Placeholder Image with Subtle Parallax Effect */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="editorial-image-parallax will-change-transform relative rounded-3xl p-8 bg-white/70 border border-[#D9CDB8] shadow-[0_16px_40px_rgba(56,59,53,0.06)] overflow-hidden">
              {/* Soft Ambient Glow */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#91ACB5]/20 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#657363]">
                    Patent US8216616B2
                  </span>
                  <span className="text-xs text-[#91ACB5] font-serif">◈ Synaptic Density</span>
                </div>

                {/* Editorial Visual Placeholder */}
                <div className="h-56 rounded-2xl bg-[#F8F4EC] border border-[#E8DEC8] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#91ACB5] flex items-center justify-center mb-3 animate-spin-slow">
                    <span className="font-serif text-2xl text-[#383B35]">Mg²⁺</span>
                  </div>
                  <p className="font-serif text-sm font-semibold text-[#383B35] tracking-wider">
                    MAGTEIN® (L-THREONIC ACID MAGNESIUM)
                  </p>
                  <p className="text-[11px] text-[#6B6E65] mt-1.5 max-w-xs">
                    Blood-Brain Barrier Crossing Ratio: <strong className="text-[#383B35]">9.2x vs Oxide/Citrate</strong>
                  </p>
                  {/* Subtle glass reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none" />
                </div>

                <div className="space-y-1.5 text-xs text-[#6B6E65]">
                  <p className="font-medium text-[#383B35]">Peer-Reviewed Finding:</p>
                  <p className="italic font-light leading-relaxed">
                    "Elevated cerebrospinal fluid magnesium levels directly correlate with restoration of short-term memory and synaptic density in double-blind, placebo-controlled human trials."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Asymmetrical Text Block with ScrollTrigger (0 opacity, Y-offset 50px) */}
          <div className="editorial-text-block lg:col-span-7 order-1 lg:order-2 space-y-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#91ACB5]/20 text-[#383B35] text-[10px] font-bold uppercase tracking-widest">
              Synaptic Architecture
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#383B35] tracking-tight leading-snug">
              Why We Formulate with Magtein®️ Magnesium L-Threonate
            </h2>

            <p className="text-sm sm:text-base text-[#383B35]/85 font-light leading-relaxed">
              Standard over-the-counter magnesium supplements (like magnesium oxide or citrate)
              possess low cellular uptake and cannot penetrate the selective endothelial cells of the
              blood-brain barrier. They remain in the intestinal tract, causing osmotic distress rather
              than neurological renewal.
            </p>

            <p className="text-sm sm:text-base text-[#383B35]/85 font-light leading-relaxed">
              In our <strong className="font-normal text-[#383B35] underline decoration-[#91ACB5] underline-offset-4">Deep Sleep</strong> protocol,
              we utilize genuine Magtein®️ (Magnesium L-Threonate). Discovered by MIT neuroscientists, it is the sole magnesium compound
              proven to significantly raise brain magnesium concentrations. By enhancing synaptic plasticity and calming evening NMDA receptor
              hyperexcitability, it deepens restorative slow-wave sleep and preserves executive cognitive sharpness across all biological decades.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-5 text-xs text-[#657363] font-medium">
              <span>✓ Non-laxative</span>
              <span>✓ Crosses Blood-Brain Barrier</span>
              <span>✓ Enhances REM Stability</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Asymmetrical Block 2: Marine Collagen & Liposomal Delivery ── */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Asymmetrical Text Block with ScrollTrigger */}
          <div className="editorial-text-block lg:col-span-7 space-y-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D8B4AE]/25 text-[#383B35] text-[10px] font-bold uppercase tracking-widest">
              Extracellular Matrix
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#383B35] tracking-tight leading-snug">
              Low-Dalton Peptides & Liposomal Dermal Hydration
            </h2>

            <p className="text-sm sm:text-base text-[#383B35]/85 font-light leading-relaxed">
              Skin ageing is fundamentally the progressive breakdown of the extracellular matrix:
              fibroblasts produce less collagen, and oxidative stress shears existing elastin fibers.
              Generic bovine collagen hydrolysates contain large molecular masses (over 5,000 Daltons)
              that the digestive tract cannot absorb intact.
            </p>

            <p className="text-sm sm:text-base text-[#383B35]/85 font-light leading-relaxed">
              Our <strong className="font-normal text-[#383B35] underline decoration-[#D8B4AE] underline-offset-4">Glass Glow</strong> formulation
              deploys ultra-pure wild-caught marine collagen tripeptides standardized to under 1,000 Daltons,
              synergized with liposomal reduced glutathione and botanical hyaluronic acid. The liposomal bilayer
              protects delicate molecules through gastric acidity, delivering them directly to dermal fibroblasts
              to reignite endogenous collagen synthesis and moisture barrier resilience.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-5 text-xs text-[#657363] font-medium">
              <span>✓ &lt;1000 Dalton Absorption</span>
              <span>✓ Liposomal Gastric Shield</span>
              <span>✓ Wild Arctic Provenance</span>
            </div>
          </div>

          {/* Right: Placeholder Image with Subtle Parallax Effect */}
          <div className="lg:col-span-5">
            <div className="editorial-image-parallax will-change-transform relative rounded-3xl p-8 bg-white/70 border border-[#D9CDB8] shadow-[0_16px_40px_rgba(56,59,53,0.06)] overflow-hidden">
              <div className="absolute top-0 left-0 w-36 h-36 bg-[#D8B4AE]/20 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#657363]">
                    Molecular Mass Audit
                  </span>
                  <span className="text-xs text-[#D8B4AE] font-serif">◈ Dermal Uptake</span>
                </div>

                {/* Visual Comparative Chart */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-[#383B35] mb-1">
                      <span>Ageless Marine Tripeptides</span>
                      <strong className="text-[#657363]">980 Da (Optimal Uptake)</strong>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#E8DEC8]">
                      <div className="w-4/5 h-full bg-[#D8B4AE] rounded-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-[#6B6E65] mb-1">
                      <span>Standard Generic Bovine Collagen</span>
                      <span>5,200 Da (Poor Absorption)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#E8DEC8]">
                      <div className="w-1/4 h-full bg-[#B99B89] rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8F4EC] border border-[#E8DEC8] text-xs text-[#6B6E65] leading-relaxed">
                  "Hydrolyzed peptides below 1,000 Daltons enter the bloodstream within 45 minutes, triggering skin fibroblast proliferation and reducing transepidermal water loss by 32%."
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Asymmetrical Block 3: Berberine Phytosome & AMPK Activation ── */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Placeholder Image with Parallax */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="editorial-image-parallax will-change-transform relative rounded-3xl p-8 bg-white/70 border border-[#D9CDB8] shadow-[0_16px_40px_rgba(56,59,53,0.06)] overflow-hidden">
              <div className="absolute bottom-0 right-0 w-36 h-36 bg-[#9EAA96]/20 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#657363]">
                    Phytosome Matrix
                  </span>
                  <span className="text-xs text-[#9EAA96] font-serif">◈ 9.6x Bioavailability</span>
                </div>

                <div className="h-56 rounded-2xl bg-[#F8F4EC] border border-[#E8DEC8] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                  <div className="w-18 h-18 rounded-2xl bg-[#9EAA96]/20 border border-[#9EAA96] flex items-center justify-center mb-3">
                    <span className="font-serif text-2xl text-[#383B35]">AMPK</span>
                  </div>
                  <p className="font-serif text-sm font-semibold text-[#383B35] tracking-wider">
                    BERBERIS ARISTATA PHYTOSOME®
                  </p>
                  <p className="text-[11px] text-[#6B6E65] mt-1.5 max-w-xs">
                    Mimics cellular caloric restriction longevity pathways
                  </p>
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none" />
                </div>

                <div className="text-xs text-[#6B6E65] space-y-1">
                  <p className="font-medium text-[#383B35]">Glycemic Stability:</p>
                  <p className="italic font-light leading-relaxed">
                    Buffers post-meal glucose and insulin peaks without digestive distress or cramping.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Asymmetrical Text Block with ScrollTrigger */}
          <div className="editorial-text-block lg:col-span-7 order-1 lg:order-2 space-y-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9EAA96]/25 text-[#383B35] text-[10px] font-bold uppercase tracking-widest">
              Metabolic Harmony
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#383B35] tracking-tight leading-snug">
              Micro-Encapsulated Berberine & The AMPK Longevity Switch
            </h2>

            <p className="text-sm sm:text-base text-[#383B35]/85 font-light leading-relaxed">
              Metabolic health is the master determinant of biological pace of ageing. Unmanaged post-meal
              glucose surges trigger advanced glycation end-products (AGEs) that stiffen arteries, degrade collagen,
              and accelerate mitochondrial dysfunction.
            </p>

            <p className="text-sm sm:text-base text-[#383B35]/85 font-light leading-relaxed">
              While berberine is celebrated as nature’s most potent AMPK activator, raw berberine hydrochloride
              has less than 5% intestinal absorption. In our <strong className="font-normal text-[#383B35] underline decoration-[#9EAA96] underline-offset-4">Slim Support</strong> formulation,
              we utilize a patented Phytosome technology that encapsulates natural berberine within food-grade pea phospholipids,
              amplifying systemic bioavailability by 9.6 times and ensuring gentle gastric tolerance.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-5 text-xs text-[#657363] font-medium">
              <span>✓ AMPK Pathway Activation</span>
              <span>✓ Buffered Glycemic Curve</span>
              <span>✓ 9.6x Phytosome Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Strict Formulation Standard Seal with ScrollTrigger ─────────── */}
      <section className="editorial-text-block max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 my-24">
        <div className="p-10 sm:p-14 rounded-3xl bg-white/80 border border-[#D9CDB8] shadow-sm text-center relative overflow-hidden">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#F8F4EC] border border-[#D9CDB8] flex items-center justify-center text-2xl font-serif text-[#383B35] mb-6">
            ◈
          </div>

          <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#383B35] mb-4">
            The Ageless Clean Protocol Standard
          </h3>

          <p className="text-sm sm:text-base text-[#6B6E65] max-w-2xl mx-auto leading-relaxed mb-8 font-light">
            We hold ourselves to pharmaceutical cGMP rigor. Every single production batch is independently
            audited by third-party ISO 17025 accredited laboratories to confirm zero heavy metals, microbials,
            or synthetic fillers.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-[#383B35] font-medium">
            <div className="p-3 rounded-xl bg-[#F8F4EC] border border-[#E8DEC8]">
              NO Magnesium Stearate
            </div>
            <div className="p-3 rounded-xl bg-[#F8F4EC] border border-[#E8DEC8]">
              NO Titanium Dioxide
            </div>
            <div className="p-3 rounded-xl bg-[#F8F4EC] border border-[#E8DEC8]">
              NO Artificial Colorants
            </div>
            <div className="p-3 rounded-xl bg-[#F8F4EC] border border-[#E8DEC8]">
              100% Vegan & Non-GMO
            </div>
          </div>

          <div className="mt-10">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#383B35] text-[#F8F4EC] text-xs font-semibold uppercase tracking-widest hover:bg-[#657363] active:scale-95 transition-all shadow-md"
            >
              <span>Explore The Formulations</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <CtaAndFooter />
    </div>
  );
}
