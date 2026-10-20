import React, { useState } from "react";
import AgelessProductGrid from "../AgelessProductGrid";
import CtaAndFooter from "../CtaAndFooter";
import { motion } from "framer-motion";

export default function ShopPage({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Formulations" },
    { id: "sleep", label: "Rest & Sleep" },
    { id: "skin", label: "Cellular Matrix" },
    { id: "metabolic", label: "Metabolic Health" },
    { id: "vision", label: "Neural & Vision" },
  ];

  return (
    <div className="w-full pt-28 pb-16 bg-[#F8F4EC]">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D9CDB8] bg-white/70 backdrop-blur-sm mb-4 text-xs uppercase tracking-widest text-[#657363]"
        >
          <span>◈</span>
          <span>Complete Supplement Apothecary</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#383B35] font-light tracking-tight mb-4"
        >
          Targeted Longevity Formulations
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto text-sm sm:text-base text-[#6B6E65] font-light leading-relaxed"
        >
          Every capsule, elixir, and softgel is manufactured in certified cGMP facilities and rigorously
          tested for identity, purity, and clinical potency.
        </motion.p>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all ${
                activeCategory === c.id
                  ? "bg-[#383B35] text-[#F8F4EC] shadow-sm"
                  : "bg-white/80 border border-[#D9CDB8] text-[#383B35] hover:bg-white"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Product Grid with Framer Motion LayoutId Modal */}
      <AgelessProductGrid onAddToCart={onAddToCart} />

      {/* Quality Guarantees Bar */}
      <section className="max-w-6xl mx-auto px-6 my-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 rounded-3xl bg-white/80 border border-[#E8DEC8]">
          <div className="flex items-start gap-3">
            <span className="text-xl text-[#9EAA96]">✓</span>
            <div>
              <h4 className="font-serif text-lg text-[#383B35]">Third-Party Verified</h4>
              <p className="text-xs text-[#6B6E65] mt-1 leading-relaxed">
                Independently batch tested for heavy metals, microbials, and ingredient concentration.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xl text-[#D8B4AE]">❋</span>
            <div>
              <h4 className="font-serif text-lg text-[#383B35]">Liposomal Absorption</h4>
              <p className="text-xs text-[#6B6E65] mt-1 leading-relaxed">
                Micronized delivery systems for cellular uptake up to 4.5x higher than standard powders.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xl text-[#B99B89]">◈</span>
            <div>
              <h4 className="font-serif text-lg text-[#383B35]">Carbon-Neutral Shipping</h4>
              <p className="text-xs text-[#6B6E65] mt-1 leading-relaxed">
                Packaged in recyclable miron violet glass and FSC-certified biodegradable cartons.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaAndFooter />
    </div>
  );
}
