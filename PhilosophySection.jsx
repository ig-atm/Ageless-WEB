import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   Design tokens (mirrors the Ageless Longevity brand palette)
───────────────────────────────────────────────────────────── */
const COLORS = {
  bg:        "#EEE9DF", // Warm Porcelain
  text:      "#383B35", // Charcoal Olive
  heading:   "#657363", // Deep Sage
  quote:     "#A98B52", // Antique Gold
  divider:   "#C9BFA8", // muted warm line
  pillBg:    "rgba(101,115,99,0.10)",
  pillBorder:"rgba(101,115,99,0.25)",
};

/* ─────────────────────────────────────────────────────────────
   Animation variants
───────────────────────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren:   0.1,
    },
  },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
};

const quoteVariants = {
  hidden:  { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.5 },
  },
};

/* ─────────────────────────────────────────────────────────────
   Column data
───────────────────────────────────────────────────────────── */
const columns = [
  {
    id:    "ageless",
    label: "Ageless",
    icon: (
      /* Leaf / organic life icon */
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <path
          d="M24 6C24 6 8 14 8 28C8 36.837 15.163 44 24 44C32.837 44 40 36.837 40 28C40 14 24 6 24 6Z"
          stroke="#657363" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        />
        <path d="M24 44V22" stroke="#657363" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M24 32C24 32 16 26 14 20" stroke="#657363" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M24 28C24 28 30 23 33 18" stroke="#657363" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    body: "Feeling ageless means looking and feeling your best at every stage of life, with energy, strength, and confidence supported by thoughtful nutrition, healthy habits, and purposeful supplementation.",
    tags: ["Energy", "Strength", "Confidence"],
  },
  {
    id:    "longevity",
    label: "Longevity",
    icon: (
      /* Cell / helix science icon */
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <circle cx="24" cy="24" r="16" stroke="#657363" strokeWidth="1.8"/>
        <circle cx="24" cy="24" r="6"  stroke="#657363" strokeWidth="1.8"/>
        <path d="M24 8V18M24 30V40M8 24H18M30 24H40" stroke="#657363" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="24" cy="8"  r="2" fill="#A98B52"/>
        <circle cx="24" cy="40" r="2" fill="#A98B52"/>
        <circle cx="8"  cy="24" r="2" fill="#A98B52"/>
        <circle cx="40" cy="24" r="2" fill="#A98B52"/>
      </svg>
    ),
    body: "Longevity means living well for longer by supporting mitochondrial metabolism, cellular health, recovery, resilience, energy, and independence.",
    tags: ["Cellular Health", "Recovery", "Resilience"],
  },
];

/* ─────────────────────────────────────────────────────────────
   PhilosophySection component
───────────────────────────────────────────────────────────── */
export default function PhilosophySection() {
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: COLORS.bg, color: COLORS.text }}
      className="relative w-full overflow-hidden py-28 px-6 md:px-12 lg:px-20"
    >

      {/* ── Decorative background elements ────────────── */}
      <DecorativeBackground />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center gap-20">

        {/* ── Section header ────────────────────────────── */}
        <motion.div
          className="flex flex-col items-center gap-5 text-center"
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow pill */}
          <span
            style={{
              backgroundColor: COLORS.pillBg,
              border: `1px solid ${COLORS.pillBorder}`,
              color: COLORS.heading,
            }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[0.68rem] font-semibold tracking-[0.18em] uppercase"
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: COLORS.heading }}
            />
            Our Philosophy
          </span>

          {/* Main heading */}
          <h2
            style={{ color: COLORS.heading }}
            className="font-serif text-3xl sm:text-4xl lg:text-[2.8rem] font-light leading-[1.18] tracking-[0.06em] max-w-3xl uppercase"
          >
            What does it mean to feel{" "}
            <em className="not-italic font-normal" style={{ color: COLORS.quote }}>
              ageless
            </em>{" "}
            and have{" "}
            <em className="not-italic font-normal" style={{ color: COLORS.quote }}>
              longevity?
            </em>
          </h2>

          {/* Rule */}
          <div
            className="w-16 h-px mt-2"
            style={{ backgroundColor: COLORS.divider }}
          />
        </motion.div>

        {/* ── Two-column cards ──────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 w-full"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {columns.map((col) => (
            <motion.div
              key={col.id}
              variants={itemVariants}
              className="group relative flex flex-col gap-6 rounded-2xl p-8 lg:p-10 overflow-hidden cursor-default"
              style={{
                backgroundColor: "rgba(255,255,255,0.45)",
                border: `1px solid rgba(169,139,82,0.15)`,
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Card hover shimmer */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 60%)",
                }}
              />

              {/* Icon */}
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "rgba(101,115,99,0.08)" }}
              >
                {col.icon}
              </div>

              {/* Label */}
              <div className="flex flex-col gap-2">
                <span
                  className="text-[0.68rem] font-semibold tracking-[0.2em] uppercase"
                  style={{ color: COLORS.heading }}
                >
                  {col.label}
                </span>
                <div className="w-8 h-px" style={{ backgroundColor: COLORS.quote }} />
              </div>

              {/* Body */}
              <p
                className="text-base lg:text-[1.05rem] font-light leading-[1.85]"
                style={{ color: COLORS.text, opacity: 0.85 }}
              >
                {col.body}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-auto pt-2">
                {col.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-[0.65rem] font-medium tracking-wider uppercase"
                    style={{
                      backgroundColor: COLORS.pillBg,
                      border: `1px solid ${COLORS.pillBorder}`,
                      color: COLORS.heading,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Pull Quote ────────────────────────────────── */}
        <motion.blockquote
          className="relative w-full max-w-4xl text-center flex flex-col items-center gap-6"
          variants={quoteVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Top ornament */}
          <QuoteOrnament />

          {/* Quote text */}
          <p
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light italic leading-[1.25] tracking-[0.01em] px-4"
            style={{ color: COLORS.quote }}
          >
            "Ageless in how you{" "}
            <span className="not-italic font-semibold">feel.</span>
            <br className="hidden sm:block" />
            {" "}Longevity in how you{" "}
            <span className="not-italic font-semibold">live."</span>
          </p>

          {/* Attribution rule */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-px" style={{ backgroundColor: COLORS.divider }} />
            <span
              className="text-[0.68rem] font-medium tracking-[0.25em] uppercase"
              style={{ color: COLORS.heading, opacity: 0.65 }}
            >
              Ageless Longevity
            </span>
            <div className="w-12 h-px" style={{ backgroundColor: COLORS.divider }} />
          </div>

          {/* Bottom ornament */}
          <QuoteOrnament flipped />
        </motion.blockquote>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────────────────────── */

function QuoteOrnament({ flipped = false }) {
  return (
    <div
      className={`flex items-center gap-3 ${flipped ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <div className="w-8 h-px" style={{ backgroundColor: "#A98B52", opacity: 0.5 }} />
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5"
        fill="none"
        style={{ color: "#A98B52", opacity: 0.7 }}
      >
        <path
          d="M3 21C3 21 4 17 4 14C4 11 6 9 9 9C9 9 8 12 8 14C8 16 9 17 11 17C11 17 10 21 7 21H3Z"
          stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"
        />
        <path
          d="M13 21C13 21 14 17 14 14C14 11 16 9 19 9C19 9 18 12 18 14C18 16 19 17 21 17C21 17 20 21 17 21H13Z"
          stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"
        />
      </svg>
      <div className="w-8 h-px" style={{ backgroundColor: "#A98B52", opacity: 0.5 }} />
    </div>
  );
}

function DecorativeBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Large soft circle — top right */}
      <div
        className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(101,115,99,0.07) 0%, transparent 70%)",
        }}
      />
      {/* Small circle — bottom left */}
      <div
        className="absolute -bottom-20 -left-20 w-[320px] h-[320px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(169,139,82,0.07) 0%, transparent 70%)",
        }}
      />
      {/* Grid dot pattern — subtle */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.035 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="#383B35" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </div>
  );
}
