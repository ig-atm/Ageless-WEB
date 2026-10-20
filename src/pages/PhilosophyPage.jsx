import React from "react";
import PhilosophySection from "../PhilosophySection";
import AboutSection from "../AboutSection";
import CtaAndFooter from "../CtaAndFooter";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function PhilosophyPage() {
  return (
    <div className="w-full pt-28 pb-16 bg-[#F8F4EC]">
      {/* Intro Philosophy Header */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D9CDB8] bg-white/70 backdrop-blur-sm mb-4 text-xs uppercase tracking-widest text-[#657363]"
        >
          <span>◈</span>
          <span>The Ageless Philosophy</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl text-[#383B35] font-light tracking-tight mb-6"
        >
          Where Medical Precision Meets Natural Rhythms
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-[#6B6E65] font-light leading-relaxed max-w-2xl mx-auto"
        >
          We do not chase fleeting longevity trends. We build ordered, evidence-informed rituals
          calibrated to human biology, cellular autophagy, and circadian harmony.
        </motion.p>
      </div>

      {/* Philosophy Section */}
      <PhilosophySection />

      {/* About & Holistic Approach */}
      <AboutSection />


      {/* CTA Box */}
      <div className="max-w-4xl mx-auto px-6 my-16 text-center">
        <div className="p-10 rounded-3xl bg-white/80 border border-[#E8DEC8] shadow-sm">
          <h3 className="font-serif text-3xl font-light text-[#383B35] mb-3">
            Begin Your Longevity Protocol
          </h3>
          <p className="text-sm text-[#6B6E65] max-w-lg mx-auto mb-6">
            Explore our physician-calibrated formulations, tailored for every biological age and daily rhythm.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#383B35] text-[#F8F4EC] text-xs font-semibold uppercase tracking-widest hover:bg-[#657363] active:scale-95 transition-all shadow-md"
          >
            <span>Explore The Collection</span>
            <span>→</span>
          </Link>
        </div>
      </div>

      <CtaAndFooter />
    </div>
  );
}
