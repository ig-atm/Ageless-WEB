import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Brand Color Palette & Accent Tokens
const BRAND = {
  pearlIvory: "#F8F4EC",
  charcoalOlive: "#383B35",
  softBlushPink: "#D8B4AE",
  mutedSageGreen: "#9EAA96",
  softClay: "#B99B89",
  softOceanBlue: "#91ACB5",
};

// Mock JSON Array of 4 Products
const mockProducts = [
  {
    id: "deep-sleep",
    title: "Deep Sleep",
    category: "Rest & Circadian Rhythm",
    price: 64.0,
    accentColor: BRAND.softClay,
    accentBg: "rgba(185, 155, 137, 0.14)",
    borderColor: "rgba(185, 155, 137, 0.35)",
    rating: 4.95,
    reviewsCount: 384,
    size: "60 Vegan Capsules • 30 Days",
    tagline: "Natural circadian rhythm restoration & non-groggy restorative deep sleep.",
    description:
      "A bio-optimized restorative night formula designed to naturally align your circadian biology, modulate nocturnal cortisol spikes, and guide neural pathways into sustained deep slow-wave and REM sleep phases.",
    keyBenefits: [
      "Facilitates smooth, natural transition into deep sleep without next-day brain fog",
      "Prolongs restorative REM & slow-wave stages for neurological cellular repair",
      "Calms evening autonomic HPA-axis activation and nocturnal muscle tension",
      "Formulated with Chelated Magnesium Bisglycinate, L-Theanine, Apigenin & Tart Cherry"
    ],
    howToConsume:
      "Take 2 capsules with 250ml of warm water or chamomile tea 45–60 minutes before bed. Dim artificial lighting after consumption to maximize endogenous melatonin synergy.",
    iconType: "moon"
  },
  {
    id: "glass-glow",
    title: "Glass Glow",
    category: "Skin, Hair & Cellular Matrix",
    price: 78.0,
    accentColor: BRAND.softBlushPink,
    accentBg: "rgba(216, 180, 174, 0.16)",
    borderColor: "rgba(216, 180, 174, 0.4)",
    rating: 4.98,
    reviewsCount: 512,
    size: "180g Botanical Elixir • 30 Servings",
    tagline: "Cellular dermal hydration, collagen architecture & inner radiance.",
    description:
      "A clinical-grade dermal elixir combining bioavailable marine collagen peptides, liposomal glutathione, cold-extracted phytoceramides, and botanical hyaluronic acid to fortify your extracellular matrix and awaken translucent skin luminosity.",
    keyBenefits: [
      "Stimulates endogenous Type I & III collagen synthesis to enhance skin density",
      "Fortifies lipid moisture barrier against environmental oxidative pollution",
      "Diminishes appearance of fine micro-creases while boosting dermal hydration",
      "Enriched with Liposomal Glutathione, French Maritime Pine Bark & Biotin"
    ],
    howToConsume:
      "Stir 1 level scoop (6g) into 200ml of room temperature water, coconut water, or your morning matcha. Best enjoyed in the morning 20 minutes before breakfast.",
    iconType: "sparkle"
  },
  {
    id: "slim-support",
    title: "Slim Support",
    category: "Metabolic Harmony & AMPK",
    price: 72.0,
    accentColor: BRAND.mutedSageGreen,
    accentBg: "rgba(158, 170, 150, 0.16)",
    borderColor: "rgba(158, 170, 150, 0.4)",
    rating: 4.91,
    reviewsCount: 290,
    size: "90 Pure Capsules • 45 Days",
    tagline: "Cellular metabolism, post-meal glucose stability & sustained vitality.",
    description:
      "An advanced phytotherapeutic compound engineered to activate the cellular AMPK longevity pathway, moderate postprandial glucose surges, and sustain metabolic equilibrium throughout demanding days.",
    keyBenefits: [
      "Activates AMPK longevity switch to optimize nutrient partitioning",
      "Buffers post-meal glucose spikes and attenuates mid-afternoon energy slumps",
      "Promotes mitochondrial fatty acid beta-oxidation and gut microbiome harmony",
      "Features Micro-encapsulated Berberine Phytosome, Chromium & Decaf EGCG"
    ],
    howToConsume:
      "Take 1 capsule twice daily, approximately 15 minutes before your two main meals of the day with water. Maintain consistent daily timing for optimal glycemic balance.",
    iconType: "leaf"
  },
  {
    id: "clear-vision-omega-3",
    title: "Clear Vision Omega-3",
    category: "Retinal Longevity & Neural Focus",
    price: 68.0,
    accentColor: BRAND.softOceanBlue,
    accentBg: "rgba(145, 172, 181, 0.16)",
    borderColor: "rgba(145, 172, 181, 0.4)",
    rating: 4.96,
    reviewsCount: 428,
    size: "60 Liquid Softgels • 30 Days",
    tagline: "Supercritical wild Omega-3 enriched with macular carotenoids & Astaxanthin.",
    description:
      "Sustainably harvested from wild Arctic fisheries using gentle supercritical CO2 extraction. Calibrated with clinical ratios of EPA, DHA, FloraGLO® Lutein, Zeaxanthin, and natural Astaxanthin to safeguard macular integrity and sharpen cognitive acuity.",
    keyBenefits: [
      "Shields delicate photoreceptor cells against high-energy blue light emissions",
      "Soothes digital eye strain, dryness, and visual fatigue during screen work",
      "Nourishes neural phospholipid membranes for sustained executive mental clarity",
      "Zero fishy regurgitation, gently flavored with cold-pressed Sicilian organic orange oil"
    ],
    howToConsume:
      "Take 2 softgels daily with a meal containing healthy dietary fats (e.g. avocado, olive oil, or whole eggs) for optimal carotenoid and lipid absorption.",
    iconType: "eye"
  }
];

// Product Image Visual Component (Custom Luxury Bottle Render)
function ProductBottleVisual({ product, isLarge = false }) {
  const { accentColor, title, iconType } = product;

  return (
    <div
      className={`relative flex items-center justify-center rounded-2xl overflow-hidden transition-all duration-500 ${
        isLarge ? "w-full h-full min-h-[280px] sm:min-h-[340px]" : "w-full h-56 sm:h-64"
      }`}
      style={{
        background: `radial-gradient(circle at 50% 35%, ${product.accentBg} 0%, rgba(248, 244, 236, 0.5) 70%, transparent 100%)`
      }}
    >
      {/* Ambient Glow */}
      <div
        className="absolute w-44 h-44 rounded-full blur-2xl opacity-60 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: accentColor }}
      />

      {/* SVG Luxury Bottle Art */}
      <svg
        viewBox="0 0 200 240"
        className={`relative z-10 drop-shadow-xl transition-transform duration-500 ${
          isLarge ? "w-52 h-64 sm:w-60 sm:h-72" : "w-36 h-44 group-hover:scale-105"
        }`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`glass-grad-${product.id}`} x1="40" y1="50" x2="160" y2="210" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="0.3" stopColor="#F8F4EC" stopOpacity="0.45" />
            <stop offset="0.7" stopColor={accentColor} stopOpacity="0.25" />
            <stop offset="1" stopColor="#383B35" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id={`gold-cap-${product.id}`} x1="75" y1="20" x2="125" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E4D5B7" />
            <stop offset="0.5" stopColor="#C4A66A" />
            <stop offset="1" stopColor="#9C7F46" />
          </linearGradient>
          <filter id={`shadow-${product.id}`} x="0" y="0" width="200" height="240" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#383B35" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Base Shadow */}
        <ellipse cx="100" cy="224" rx="48" ry="8" fill="#383B35" fillOpacity="0.08" />

        {/* Cap */}
        <rect x="76" y="24" width="48" height="12" rx="3" fill={`url(#gold-cap-${product.id})`} />
        <rect x="80" y="36" width="40" height="6" fill="#8C733E" />

        {/* Bottle Neck */}
        <path d="M84 42 H116 V54 H84 Z" fill="#EAE4D7" fillOpacity="0.6" stroke="#D9CDB8" strokeWidth="1" />

        {/* Bottle Body */}
        <rect
          x="52"
          y="54"
          width="96"
          height="158"
          rx="18"
          fill={`url(#glass-grad-${product.id})`}
          stroke="#D8CFBE"
          strokeWidth="1.5"
        />

        {/* Glass Highlight Glare */}
        <path
          d="M62 62 C62 62 70 80 70 120 C70 160 64 195 64 195"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeOpacity="0.55"
        />

        {/* Bottle Label */}
        <rect
          x="62"
          y="84"
          width="76"
          height="104"
          rx="6"
          fill="#FFFFFF"
          fillOpacity="0.92"
          stroke={product.borderColor}
          strokeWidth="1"
        />

        {/* Minimal Label Typography */}
        <text x="100" y="106" textAnchor="middle" fill="#383B35" fontSize="8" letterSpacing="2" fontFamily="sans-serif" fontWeight="600">
          AGELESS
        </text>
        <line x1="78" y1="112" x2="122" y2="112" stroke={accentColor} strokeWidth="1.2" />

        {/* Brand Symbol Icon */}
        <circle cx="100" cy="132" r="13" fill={product.accentBg} stroke={accentColor} strokeWidth="1" />
        {iconType === "moon" && (
          <path d="M103 126 A 7 7 0 1 0 103 138 A 5.5 5.5 0 0 1 103 126 Z" fill={accentColor} />
        )}
        {iconType === "sparkle" && (
          <path d="M100 124 L101.5 130.5 L108 132 L101.5 133.5 L100 140 L98.5 133.5 L92 132 L98.5 130.5 Z" fill={accentColor} />
        )}
        {iconType === "leaf" && (
          <path d="M96 138 C96 128 104 125 106 126 C106 135 99 138 96 138 Z" fill={accentColor} />
        )}
        {iconType === "eye" && (
          <g>
            <path d="M94 132 C97 127 103 127 106 132 C103 137 97 137 94 132 Z" stroke={accentColor} strokeWidth="1.5" fill="none" />
            <circle cx="100" cy="132" r="2.5" fill={accentColor} />
          </g>
        )}

        <text x="100" y="156" textAnchor="middle" fill="#383B35" fontSize="7.5" fontWeight="600" fontFamily="serif">
          {title.toUpperCase()}
        </text>
        <text x="100" y="167" textAnchor="middle" fill="#6B6E65" fontSize="5.5" letterSpacing="0.5">
          LONGEVITY BIO-FORMULA
        </text>

        <rect x="74" y="174" width="52" height="6" rx="2" fill={product.accentBg} />
        <text x="100" y="178.5" textAnchor="middle" fill={accentColor} fontSize="4.5" fontWeight="700" letterSpacing="0.8">
          EVIDENCE INFORMED
        </text>
      </svg>
    </div>
  );
}

// Staggered Cascade Variants for Right Column
const detailsCascadeContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.38, // Waits for layout morph to finish before cascading text
      staggerChildren: 0.12,
    },
  },
};

const cascadeItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function AgelessProductGrid({ onAddToCart }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedProduct(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll while modal is active
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setSelectedQuantity(1);
      setAddedAnimation(false);
    }
  }, [selectedProduct]);

  const handleAddToCart = (product) => {
    setAddedAnimation(true);
    setCartCount((prev) => prev + selectedQuantity);
    if (onAddToCart) {
      onAddToCart(product, selectedQuantity);
    }
    setTimeout(() => {
      setAddedAnimation(false);
    }, 1600);
  };

  return (
    <section className="relative w-full py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-[#F8F4EC] text-[#383B35]">
      {/* Decorative Brand Header */}
      <div className="max-w-7xl mx-auto mb-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D9CDB8] bg-white/70 backdrop-blur-sm mb-4 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-[#9EAA96] animate-pulse" />
          <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#657363]">
            Precision Formulations
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#383B35] tracking-tight mb-4"
        >
          Daily Spiral Formulations
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl mx-auto text-[#6B6E65] text-base sm:text-lg font-light leading-relaxed"
        >
          Targeted biological compounds calibrated to harmonize circadian rhythm, cellular elasticity,
          metabolic vitality, and neural longevity.
        </motion.p>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {mockProducts.map((product, idx) => (
          <motion.div
            key={product.id}
            layoutId={`card-container-${product.id}`}
            onClick={() => setSelectedProduct(product)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="group relative cursor-pointer flex flex-col justify-between rounded-3xl p-5 sm:p-6 bg-white/85 border border-[#E8DEC8] hover:border-[#383B35]/30 shadow-[0_4px_24px_rgba(56,59,53,0.04)] hover:shadow-[0_16px_36px_rgba(56,59,53,0.1)] transition-all duration-300"
          >
            {/* Top Badge & Rating */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span
                className="text-[11px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: product.accentBg,
                  color: product.accentColor
                }}
              >
                {product.category}
              </span>

              <div className="flex items-center text-xs text-[#383B35] font-medium">
                <span className="text-[#C4A66A] mr-1">★</span>
                <span>{product.rating}</span>
              </div>
            </div>

            {/* Product Image Visual with matching layoutId for seamless morph */}
            <motion.div
              layoutId={`product-image-${product.id}`}
              className="my-2 w-full flex items-center justify-center"
            >
              <ProductBottleVisual product={product} />
            </motion.div>

            {/* Title & Price Information */}
            <div className="mt-4 flex flex-col gap-1">
              <motion.h3
                layoutId={`product-title-${product.id}`}
                className="font-serif text-xl sm:text-2xl font-normal text-[#383B35] group-hover:text-[#657363] transition-colors"
              >
                {product.title}
              </motion.h3>

              <p className="text-xs text-[#6B6E65] line-clamp-2 leading-relaxed">
                {product.tagline}
              </p>

              <div className="mt-3 pt-3 border-t border-[#F0EBE1] flex items-center justify-between">
                <span className="text-lg font-medium text-[#383B35]">
                  ${product.price.toFixed(2)}
                </span>

                {/* Shop Now Button with spring physics */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium tracking-wide bg-[#383B35] text-[#F8F4EC] hover:bg-[#657363] transition-colors shadow-sm"
                >
                  <span>Shop Now</span>
                  <svg
                    className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* SEAMLESS EXPANDING DETAIL MODAL (80vw and 80vh Morph + Staggered Cascade)  */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-hidden">
            {/* Dark Backdrop with backdrop-blur-lg */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-[#1A1C18]/70 backdrop-blur-lg z-0"
            />

            {/* Expanded Card Container: 80vw and 80vh layoutId Morph */}
            <motion.div
              layoutId={`card-container-${selectedProduct.id}`}
              className="relative z-10 w-[94vw] h-[90vh] md:w-[80vw] md:h-[80vh] max-w-[80vw] max-h-[80vh] rounded-3xl bg-[#F8F4EC] border border-white/80 shadow-[0_25px_70px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col md:flex-row p-6 sm:p-8 lg:p-10"
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 28,
              }}
            >
              {/* Close 'X' Button in Top Right */}
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                aria-label="Close dialog"
                className="absolute top-5 right-5 sm:top-6 sm:right-6 z-30 w-10 h-10 rounded-full flex items-center justify-center bg-white/80 hover:bg-white text-[#383B35] shadow-sm hover:scale-105 active:scale-95 transition-all border border-[#E8DEC8]"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* ── LEFT SIDE: Product Image smoothly translating to large centered position ── */}
              <div className="w-full md:w-5/12 h-64 md:h-full flex flex-col items-center justify-center p-2 sm:p-4 flex-shrink-0">
                <motion.div
                  layoutId={`product-image-${selectedProduct.id}`}
                  className="w-full h-full rounded-2xl bg-white/70 p-4 border border-[#E8DEC8] shadow-inner flex items-center justify-center"
                >
                  <ProductBottleVisual product={selectedProduct} isLarge />
                </motion.div>

                <div className="mt-3 hidden sm:flex items-center justify-center gap-3 text-[11px] text-[#6B6E65]">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-[#9EAA96]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Third-Party Lab Tested
                  </span>
                  <span>•</span>
                  <span>{selectedProduct.size}</span>
                </div>
              </div>

              {/* ── RIGHT SIDE: Cascades in with staggered upward fade AFTER layout morph ── */}
              <motion.div
                variants={detailsCascadeContainer}
                initial="hidden"
                animate="visible"
                className="w-full md:w-7/12 h-full flex flex-col justify-between overflow-y-auto pl-0 md:pl-8 lg:pl-10 pt-4 md:pt-0 pr-1 space-y-5"
              >
                {/* Header: Category, Title & Price */}
                <motion.div variants={cascadeItem}>
                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: selectedProduct.accentBg,
                        color: selectedProduct.accentColor
                      }}
                    >
                      {selectedProduct.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-[#6B6E65]">
                      <span className="text-[#C4A66A]">★★★★★</span>
                      <span className="font-semibold text-[#383B35]">{selectedProduct.rating}</span>
                      <span>({selectedProduct.reviewsCount} reviews)</span>
                    </div>
                  </div>

                  <motion.h2
                    layoutId={`product-title-${selectedProduct.id}`}
                    className="font-serif text-3xl sm:text-4xl text-[#383B35] font-light mt-3 tracking-tight"
                  >
                    {selectedProduct.title}
                  </motion.h2>

                  <div className="text-2xl sm:text-3xl font-medium text-[#383B35] mt-1">
                    ${selectedProduct.price.toFixed(2)}
                  </div>
                </motion.div>

                {/* 1. Description Section */}
                <motion.div variants={cascadeItem} className="space-y-1.5 border-t border-[#E8DEC8] pt-3">
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-[#657363]">
                    Description
                  </h4>
                  <p className="text-xs sm:text-sm text-[#383B35]/90 leading-relaxed font-light">
                    {selectedProduct.description}
                  </p>
                </motion.div>

                {/* 2. Key Benefits Section (Rendered as sleek bulleted list) */}
                <motion.div variants={cascadeItem} className="space-y-2">
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-[#657363]">
                    Key Benefits
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedProduct.keyBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-xs text-[#383B35]/85">
                        <span
                          className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
                          style={{
                            backgroundColor: selectedProduct.accentBg,
                            color: selectedProduct.accentColor
                          }}
                        >
                          ✓
                        </span>
                        <span className="leading-snug">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* 3. How to Consume Section */}
                <motion.div variants={cascadeItem} className="rounded-2xl p-3.5 bg-white/70 border border-[#E8DEC8] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#383B35]">
                    <svg className="w-4 h-4 text-[#9EAA96]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>How to Consume</span>
                  </div>
                  <p className="text-xs text-[#6B6E65] leading-relaxed">
                    {selectedProduct.howToConsume}
                  </p>
                </motion.div>

                {/* 4. Quantity Stepper & Add to Cart with Spring Physics */}
                <motion.div variants={cascadeItem} className="flex flex-col sm:flex-row items-center gap-4 pt-1">
                  {/* Stepper */}
                  <div className="flex items-center border border-[#D9CDB8] rounded-full bg-white px-3 py-1.5 shadow-sm">
                    <button
                      type="button"
                      onClick={() => setSelectedQuantity((q) => Math.max(1, q - 1))}
                      className="w-7 h-7 flex items-center justify-center text-[#383B35] hover:text-[#657363] active:scale-95 text-base font-medium"
                    >
                      –
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-[#383B35]">
                      {selectedQuantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedQuantity((q) => q + 1)}
                      className="w-7 h-7 flex items-center justify-center text-[#383B35] hover:text-[#657363] active:scale-95 text-base font-medium"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart Button with spring physics */}
                  <motion.button
                    type="button"
                    onClick={() => handleAddToCart(selectedProduct)}
                    disabled={addedAnimation}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="w-full sm:flex-1 py-3.5 px-8 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase bg-[#383B35] text-[#F8F4EC] hover:bg-[#657363] transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {addedAnimation ? (
                      <>
                        <svg className="w-4 h-4 text-[#9EAA96] animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <span>Add to Cart • ${(selectedProduct.price * selectedQuantity).toFixed(2)}</span>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
