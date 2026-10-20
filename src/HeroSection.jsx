import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setScrolled(currentScrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ── Fixed Navigation Bar ───────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 sm:px-10 h-20 flex items-center ${
          scrolled
            ? "bg-[#FAFAF8]/90 backdrop-blur-xl border-b border-[#657363]/15 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className={`flex items-center gap-2.5 no-underline transition-colors duration-300 ${
              scrolled ? "text-[#1E2A35]" : "text-white"
            }`}
          >
            <span
              className={`text-xl transition-colors duration-300 ${
                scrolled ? "text-[#657363]" : "text-[#A8C5A0]"
              }`}
            >
              ◈
            </span>
            <span className="font-serif text-2xl tracking-wider font-light">
              Ageless <em className="italic font-light">Longevity</em>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {[
              { label: "Philosophy", target: "philosophy" },
              { label: "Our Story", target: "about" },
              { label: "Collection", target: "products" },
              { label: "Explore", target: "cta" },
            ].map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.target)}
                className={`text-xs uppercase font-medium tracking-[0.16em] transition-all duration-300 relative py-1 hover:opacity-100 ${
                  scrolled
                    ? "text-[#383B35]/80 hover:text-[#657363]"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => scrollTo("products")}
              className={`text-xs font-semibold uppercase tracking-[0.14em] px-6 py-2.5 rounded-full transition-all duration-300 shadow-sm ${
                scrolled
                  ? "bg-[#657363] text-[#F8F4EC] hover:bg-[#4A7050] hover:shadow-md hover:-translate-y-0.5"
                  : "bg-white/15 text-white border border-white/30 backdrop-blur-md hover:bg-white/30 hover:border-white/60 hover:-translate-y-0.5"
              }`}
            >
              Shop Collection
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <span
              className={`w-6 h-0.5 rounded-full transition-all duration-300 ${
                scrolled ? "bg-[#383B35]" : "bg-white"
              } ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`w-6 h-0.5 rounded-full transition-all duration-300 ${
                scrolled ? "bg-[#383B35]" : "bg-white"
              } ${mobileMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`w-6 h-0.5 rounded-full transition-all duration-300 ${
                scrolled ? "bg-[#383B35]" : "bg-white"
              } ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 right-0 bg-[#F8F4EC]/95 backdrop-blur-2xl border-b border-[#383B35]/10 px-8 py-6 shadow-xl flex flex-col gap-5"
          >
            {[
              { label: "Philosophy", target: "philosophy" },
              { label: "Our Story", target: "about" },
              { label: "Collection", target: "products" },
              { label: "Contact & Routine", target: "cta" },
            ].map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.target)}
                className="text-left text-sm font-medium uppercase tracking-widest text-[#383B35] hover:text-[#657363] py-1 border-b border-[#383B35]/5"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("products")}
              className="mt-2 text-center text-xs font-semibold uppercase tracking-widest bg-[#657363] text-[#F8F4EC] py-3 rounded-full shadow-md"
            >
              Shop Collection
            </button>
          </motion.div>
        )}
      </header>

      {/* ── Hero Section ───────────────────────────────────────── */}
      <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#1E2A35]">
        {/* Background Image with subtle parallax */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/hero_background.jpg"
            alt="Natural sanctuary landscape"
            className="w-full h-full object-cover object-center will-change-transform scale-105"
            style={{
              transform: `translateY(${Math.min(scrollY * 0.15, 120)}px) scale(${1.05 - Math.min(scrollY * 0.0002, 0.04)})`,
              transition: "transform 0.1s cubic-bezier(0.1, 0.9, 0.2, 1)",
            }}
          />

          {/* Deep Cinematic Ambient Overlays */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, rgba(18,26,32,0.92) 0%, rgba(22,34,44,0.76) 45%, rgba(18,28,36,0.35) 75%, rgba(18,28,36,0.15) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 70% 50%, transparent 35%, rgba(12,18,24,0.65) 100%)",
            }}
          />
        </div>

        {/* Ambient Floating Particles */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute w-2 h-2 rounded-full bg-[#A8C5A0]/30 left-[15%] top-[35%] animate-ping" style={{ animationDuration: '4s' }} />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-[#A8C5A0]/25 left-[32%] top-[60%] animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute w-2.5 h-2.5 rounded-full bg-[#A8C5A0]/20 left-[22%] top-[75%] animate-ping" style={{ animationDuration: '7s' }} />
        </div>

        {/* Hero Main Content */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-16 pt-24 pb-16 flex flex-col items-start gap-7">
          {/* Sub-header Pill */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-flex items-center gap-3 bg-[#657363]/20 border border-[#A8C5A0]/40 backdrop-blur-md px-4 py-2 rounded-full text-xs font-medium tracking-[0.18em] uppercase text-[#A8C5A0]"
          >
            <span className="w-2 h-2 rounded-full bg-[#A8C5A0] animate-pulse" />
            FORMULATED BY DOCTORS &nbsp;|&nbsp; Inspired by science and nature
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="font-serif text-white font-light text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-tight leading-[0.95] flex flex-col"
          >
            <span>Ageless</span>
            <span className="italic font-light text-[#A8C5A0] pl-2 sm:pl-4">
              Longevity
            </span>
          </motion.h1>

          {/* Body Text */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/80 font-light text-base sm:text-lg md:text-xl leading-relaxed max-w-xl font-sans"
          >
            Ageless Longevity combines medical expertise with the ordered patterns found in nature to create precise, evidence-informed support for healthy ageing through nutrition, supplementation, education, and everyday habits.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <button
              onClick={() => scrollTo("products")}
              className="group inline-flex items-center gap-3 bg-[#657363] hover:bg-[#526D79] text-[#F8F4EC] font-semibold text-xs uppercase tracking-[0.14em] px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-0.5 border border-[#C4A66A]/30"
            >
              <span>Explore the Collection</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M4 10H16M10 4L16 10L10 16"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              onClick={() => scrollTo("about")}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium text-xs uppercase tracking-[0.14em] px-7 py-4 rounded-full border border-white/25 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
            >
              <span>Our Story</span>
            </button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex flex-wrap items-center gap-4 sm:gap-6 pt-6 text-white/70 text-xs tracking-wider"
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#A8C5A0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Clinically Formulated</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-white/30 hidden sm:inline-block" />
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#A8C5A0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <span>Evidence-Based</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-white/30 hidden sm:inline-block" />
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#A8C5A0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Natural Origins</span>
            </div>
          </motion.div>
        </div>

        {/* Ambient bottom scroll anchor indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none opacity-80">
          <span className="text-[10px] uppercase font-medium tracking-[0.2em] text-[#A8C5A0]">Scroll</span>
          <div className="w-4 h-7 rounded-full border border-[#A8C5A0]/40 flex justify-center pt-1">
            <div className="w-1 h-2 rounded-full bg-[#A8C5A0] animate-bounce" />
          </div>
        </div>
      </section>
    </>
  );
}
