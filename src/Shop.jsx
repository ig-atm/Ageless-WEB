import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { agelessMockProducts } from "./agelessMockData";

// 3D Tilt Card Component with Soft Colored Shadow
function TiltProductCard({ product, onSelect, idx }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 350, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 350, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["9deg", "-9deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-9deg", "9deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative group perspective-1000">
      {/* Soft colored glow shadow matching product accent color */}
      <div
        className="absolute -inset-1.5 rounded-[2.2rem] blur-xl opacity-35 group-hover:opacity-75 transition-all duration-500 pointer-events-none"
        style={{
          backgroundColor: product.color,
          filter: `drop-shadow(0 16px 36px ${product.color})`,
        }}
      />

      <motion.div
        layoutId={product.id}
        onClick={onSelect}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.65,
          delay: idx * 0.12,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{
          scale: 1.018,
          transition: { type: "spring", stiffness: 350, damping: 25 },
        }}
        style={{
          backgroundColor: product.color,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          boxShadow: `0 20px 45px -15px ${product.color}95, 0 10px 20px -8px rgba(56,59,53,0.12)`,
        }}
        className="relative cursor-pointer rounded-3xl p-8 sm:p-10 transition-shadow duration-300 flex flex-col justify-between overflow-hidden border border-black/5"
      >
        {/* Subtle Inner Glass Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-transparent to-black/10 pointer-events-none" />

        {/* Top Info: Name & Subtitle */}
        <div className="relative z-10 flex flex-col gap-1.5" style={{ transform: "translateZ(20px)" }}>
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#383B35]/75">
            Targeted Bio-Formula
          </span>

          <motion.h2
            layoutId={`title-${product.id}`}
            className="font-serif text-3xl sm:text-4xl text-[#383B35] font-light tracking-tight"
          >
            {product.name}
          </motion.h2>

          <p className="text-xs sm:text-sm text-[#383B35]/85 font-light leading-relaxed max-w-sm">
            {product.subtitle}
          </p>
        </div>

        {/* Center: Image Placeholder with 3D Depth */}
        <motion.div
          layoutId={`image-${product.id}`}
          className="relative z-10 my-8 py-4 flex items-center justify-center"
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="relative w-44 h-52 sm:w-48 sm:h-56 rounded-2xl bg-white/45 backdrop-blur-md border border-white/70 shadow-[0_8px_32px_rgba(56,59,53,0.12)] flex flex-col items-center justify-center p-4 group-hover:scale-105 transition-transform duration-500">
            {/* Visual Bottle Silhouette Art */}
            <div className="w-20 h-28 sm:w-24 sm:h-32 rounded-xl bg-white/80 border border-white shadow-inner flex flex-col items-center justify-center relative overflow-hidden">
              <div className="w-10 h-3 rounded-xs bg-[#C4A66A] absolute top-1 shadow-xs" />
              <div className="w-full text-center px-1">
                <span className="text-lg text-[#383B35]/40 font-serif">◈</span>
                <p className="font-serif text-[10px] text-[#383B35] font-semibold tracking-wider mt-1">
                  {product.name.toUpperCase()}
                </p>
                <p className="text-[7px] text-[#6B6E65] tracking-widest uppercase">
                  Ageless
                </p>
              </div>
              {/* Glass Glare */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent pointer-events-none" />
            </div>

            <span className="text-[10px] uppercase tracking-widest font-semibold text-[#383B35]/70 mt-3">
              Clinical Grade SKU
            </span>
          </div>
        </motion.div>

        {/* Bottom Row: Starting Price & Shop Now Pill with Spring Physics */}
        <div
          className="relative z-10 pt-4 border-t border-[#383B35]/15 flex items-center justify-between"
          style={{ transform: "translateZ(25px)" }}
        >
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#383B35]/70 block font-medium">
              Starting at
            </span>
            <span className="font-serif text-2xl font-normal text-[#383B35]">
              ${product.price.toFixed(2)}
            </span>
          </div>

          {/* Shop Now Pill Button with Spring Physics (hover: 1.05, tap: 0.95, stiffness: 400, damping: 10) */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.14em] bg-[#383B35] text-[#F8F4EC] hover:bg-[#2A2C27] transition-colors shadow-md group-hover:shadow-lg"
          >
            <span>Shop Now</span>
            <svg
              className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default function Shop({ onAddToCart }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addedItemAnimation, setAddedItemAnimation] = useState(false);
  const [quantity, setQuantity] = useState(1);

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

  // Lock body scroll while modal is active to prevent background scrolling
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuantity(1);
      setAddedItemAnimation(false);
    }
  }, [selectedProduct]);

  const handleCartAdd = (product) => {
    setAddedItemAnimation(true);
    if (onAddToCart) {
      onAddToCart(product, quantity);
    }
    setTimeout(() => {
      setAddedItemAnimation(false);
    }, 1600);
  };

  return (
    <div className="w-full min-h-screen bg-[#F8F4EC] text-[#383B35] pt-28 pb-20 px-6 sm:px-10 lg:px-16 selection:bg-[#9EAA96] selection:text-[#F8F4EC]">
      {/* Page Header */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D9CDB8] bg-white/80 backdrop-blur-sm mb-4 shadow-xs"
        >
          <span className="w-2 h-2 rounded-full bg-[#9EAA96] animate-pulse" />
          <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#657363]">
            Curated Formulations
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#383B35] font-light tracking-tight mb-4"
        >
          The Longevity Collection
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto text-sm sm:text-base text-[#6B6E65] font-light leading-relaxed"
        >
          Targeted biological compounds calibrated to harmonize circadian rhythms, cellular elasticity,
          metabolic health, and cognitive longevity.
        </motion.p>
      </div>

      {/* 2x2 Grid of Product Cards with 3D Tilt and Soft Colored Shadows */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {agelessMockProducts.map((product, idx) => (
          <TiltProductCard
            key={product.id}
            product={product}
            idx={idx}
            onSelect={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      {/* ========================================================================= */}
      {/* EXPANDING PRODUCT DETAIL MODAL (Framer Motion AnimatePresence + layoutId) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto">
            {/* Blurred Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-[#1A1C18]/65 backdrop-blur-md"
            />

            {/* Centered Expanded Modal Card sharing layoutId of clicked card */}
            <motion.div
              layoutId={selectedProduct.id}
              className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#F8F4EC] border border-white/80 shadow-[0_25px_70px_rgba(0,0,0,0.35)] z-10 p-6 sm:p-8 lg:p-10"
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 28,
              }}
            >
              {/* 'X' Close Button in Top Right */}
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                aria-label="Close modal and return to grid"
                className="absolute top-5 right-5 sm:top-6 sm:right-6 z-20 w-10 h-10 rounded-full flex items-center justify-center bg-white/80 hover:bg-white text-[#383B35] shadow-sm hover:scale-105 active:scale-95 transition-all border border-[#D9CDB8]"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Two-Column Split (Stacked on Mobile) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* ── LEFT SIDE: Glassmorphic Subtly Tinted Container for Product Image ── */}
                <div className="md:col-span-5 flex flex-col items-center">
                  <motion.div
                    layoutId={`image-${selectedProduct.id}`}
                    style={{
                      background: `radial-gradient(circle at 50% 40%, ${selectedProduct.color}40 0%, rgba(255,255,255,0.7) 70%, transparent 100%)`,
                    }}
                    className="w-full h-80 sm:h-96 rounded-2xl bg-white/60 backdrop-blur-lg p-6 border border-white/80 shadow-inner flex flex-col items-center justify-center relative overflow-hidden"
                  >
                    {/* Ambient Radial Accent Glow */}
                    <div
                      className="absolute w-44 h-44 rounded-full blur-3xl opacity-60 pointer-events-none"
                      style={{ backgroundColor: selectedProduct.color }}
                    />

                    {/* Luxury Product Bottle Visual Container */}
                    <div className="relative z-10 w-36 h-52 sm:w-40 sm:h-60 rounded-2xl bg-white/90 backdrop-blur-md border border-white/90 shadow-[0_12px_40px_rgba(56,59,53,0.16)] flex flex-col items-center justify-center p-4">
                      {/* Gold Cap */}
                      <div className="w-16 h-5 rounded-t-sm bg-gradient-to-r from-[#C4A66A] via-[#E4D5B7] to-[#9C7F46] shadow-sm mb-2" />

                      {/* Bottle Body */}
                      <div className="w-full flex-1 rounded-xl bg-gradient-to-b from-white/90 to-[#F8F4EC]/80 border border-[#E8DEC8] flex flex-col items-center justify-between py-3 px-2 text-center relative overflow-hidden">
                        <span className="text-xl text-[#383B35]">◈</span>
                        <div>
                          <p className="font-serif text-sm font-semibold tracking-wider text-[#383B35]">
                            {selectedProduct.name.toUpperCase()}
                          </p>
                          <p className="text-[8px] text-[#6B6E65] tracking-widest uppercase mt-0.5">
                            AGELESS LONGEVITY
                          </p>
                        </div>
                        <span
                          className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: `${selectedProduct.color}40`,
                            color: "#383B35",
                          }}
                        >
                          EVIDENCE INFORMED
                        </span>

                        {/* Glass Specular Glare */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/60 to-transparent pointer-events-none" />
                      </div>
                    </div>

                    <div className="relative z-10 mt-4 flex items-center gap-2 text-xs font-medium text-[#383B35]/80">
                      <span className="w-2 h-2 rounded-full bg-[#9EAA96]" />
                      <span>Third-Party Lab Certified • cGMP</span>
                    </div>
                  </motion.div>
                </div>

                {/* ── RIGHT SIDE: Product Details, Description, Benefits, How to Consume & Add to Cart ── */}
                <div className="md:col-span-7 flex flex-col gap-6">
                  {/* Category Pill, Name & Price */}
                  <div>
                    <span
                      className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: `${selectedProduct.color}35`,
                        color: "#383B35",
                      }}
                    >
                      {selectedProduct.subtitle}
                    </span>

                    {/* Product Name in Serif Font */}
                    <motion.h2
                      layoutId={`title-${selectedProduct.id}`}
                      className="font-serif text-3xl sm:text-4xl text-[#383B35] font-light mt-3 tracking-tight"
                    >
                      {selectedProduct.name}
                    </motion.h2>

                    {/* Price */}
                    <div className="flex items-center gap-4 mt-2">
                      <p className="font-serif text-2xl sm:text-3xl font-medium text-[#383B35]">
                        ${selectedProduct.price.toFixed(2)}
                      </p>
                      <span className="text-xs text-[#6B6E65] font-light">
                        • 30-Day Clinical Protocol Supply
                      </span>
                    </div>
                  </div>

                  {/* 1. Description Section */}
                  <div className="space-y-1.5 border-t border-[#E8DEC8] pt-4">
                    <h3 className="text-xs uppercase tracking-widest font-semibold text-[#657363]">
                      Description
                    </h3>
                    <p className="text-sm sm:text-base text-[#383B35]/90 leading-relaxed font-light">
                      {selectedProduct.description}
                    </p>
                  </div>

                  {/* 2. Key Benefits Section (Sleek bulleted list) */}
                  <div className="space-y-2">
                    <h3 className="text-xs uppercase tracking-widest font-semibold text-[#657363]">
                      Key Benefits
                    </h3>
                    <ul className="space-y-2">
                      {selectedProduct.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#383B35]/90">
                          <span
                            className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
                            style={{
                              backgroundColor: `${selectedProduct.color}50`,
                              color: "#383B35",
                            }}
                          >
                            ✓
                          </span>
                          <span className="leading-snug">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 3. How to Consume Section */}
                  <div className="p-4 rounded-2xl bg-white/70 border border-[#E8DEC8] space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#383B35]">
                      <svg className="w-4 h-4 text-[#9EAA96]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>How to Consume</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#6B6E65] leading-relaxed font-light">
                      {selectedProduct.howToConsume}
                    </p>
                  </div>

                  {/* 4. Prominent Add to Cart Button with Spring Physics */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#D9CDB8] rounded-full bg-white px-3 py-1.5 shadow-xs">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-7 h-7 flex items-center justify-center text-[#383B35] hover:text-[#657363] active:scale-95 text-base font-medium"
                      >
                        –
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-[#383B35]">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="w-7 h-7 flex items-center justify-center text-[#383B35] hover:text-[#657363] active:scale-95 text-base font-medium"
                      >
                        +
                      </button>
                    </div>

                    {/* Add to Cart Button with Spring Physics (hover: 1.05, tap: 0.95, stiffness: 400, damping: 10) */}
                    <motion.button
                      type="button"
                      onClick={() => handleCartAdd(selectedProduct)}
                      disabled={addedItemAnimation}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="w-full sm:flex-1 py-4 px-8 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase bg-[#383B35] text-[#F8F4EC] hover:bg-[#2A2C27] transition-colors shadow-md flex items-center justify-center gap-2.5 cursor-pointer"
                    >
                      {addedItemAnimation ? (
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
                          <span>Add to Cart • ${(selectedProduct.price * quantity).toFixed(2)}</span>
                        </>
                      )}
                    </motion.button>
                  </div>

                  <p className="text-[11px] text-center text-[#6B6E65]">
                    Complimentary carbon-neutral express delivery on all orders over $50.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
