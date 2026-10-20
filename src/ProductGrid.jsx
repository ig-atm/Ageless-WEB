import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   Brand Tokens
───────────────────────────────────────────────────────────── */
const T = {
  pearlIvory:    "#F8F4EC",
  charcoalOlive: "#383B35",
  deepSage:      "#657363",
  champagneGold: "#C4A66A",
  antiqueGold:   "#A98B52",
  deepOceanBlue: "#526D79",
  divider:       "#D9CDB8",
  textMuted:     "#6B6E65",
  cardBg:        "#FFFFFF",
  // Product category colours
  glassGlow:     "#D8B4AE", // Skin, Hair & Nails
  slimSupport:   "#9EAA96", // Metabolic Health
  feelYoung:     "#E8DDC9", // Cellular Health
};

/* ─────────────────────────────────────────────────────────────
   Animation helpers
───────────────────────────────────────────────────────────── */
const ease = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: "-60px" },
  transition:  { duration: 0.72, ease, delay },
});

/* ─────────────────────────────────────────────────────────────
   Product data
───────────────────────────────────────────────────────────── */
const products = [
  {
    id:          "glass-glow",
    tag:         "Skin, Hair & Nails",
    name:        "Glass Glow",
    tagline:     "Radiance from within.",
    color:       T.glassGlow,
    colorDark:   "#B8897F",
    colorBg:     "#FAF2F0",
    description:
      "A targeted blend of collagen-supporting nutrients, antioxidants, and biotin designed to nourish skin elasticity, hair resilience, and nail strength — from the inside out.",
    keyIngredients: ["Marine Collagen", "Vitamin C", "Biotin", "Silica"],
    icon: <SkinIcon />,
    badge: "Bestseller",
  },
  {
    id:          "slim-support",
    tag:         "Metabolic Health",
    name:        "Slim Support",
    tagline:     "Metabolism, amplified.",
    color:       T.slimSupport,
    colorDark:   "#5A7258",
    colorBg:     "#F1F4F0",
    description:
      "Evidence-informed support for metabolic function, blood sugar balance, and energy regulation. Formulated to complement a whole-food diet and active lifestyle.",
    keyIngredients: ["Berberine", "Chromium", "Green Tea Extract", "CoQ10"],
    icon: <MetabolicIcon />,
    badge: "New",
    featured: true,
  },
  {
    id:          "feel-young",
    tag:         "Cellular Health",
    name:        "Feel Young",
    tagline:     "Longevity at the cellular level.",
    color:       T.feelYoung,
    colorDark:   "#A8956A",
    colorBg:     "#FAF7F0",
    description:
      "A precision formula targeting mitochondrial function, NAD+ pathways, and cellular resilience — to help you feel energised, sharp, and vital at every age.",
    keyIngredients: ["NMN", "Resveratrol", "Quercetin", "Alpha-Lipoic Acid"],
    icon: <CellularIcon />,
    badge: "Doctor's Pick",
  },
];

/* ─────────────────────────────────────────────────────────────
   Main export
───────────────────────────────────────────────────────────── */
export default function ProductGrid() {
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: T.pearlIvory }}
      className="relative w-full overflow-hidden py-24 lg:py-32 px-6 md:px-12 lg:px-20"
    >
      {/* Subtle background texture */}
      <BackgroundDecor />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center gap-16">

        {/* ── Section header ──────────────────────────── */}
        <div className="flex flex-col items-center gap-6 text-center max-w-3xl">

          {/* Eyebrow */}
          <motion.div {...fadeUp(0)} className="flex items-center gap-3">
            <div className="w-6 h-px" style={{ backgroundColor: T.champagneGold }} />
            <span
              className="text-[0.65rem] font-semibold tracking-[0.28em] uppercase"
              style={{ color: T.deepSage }}
            >
              Our Collection
            </span>
            <div className="w-6 h-px" style={{ backgroundColor: T.champagneGold }} />
          </motion.div>

          {/* Title */}
          <motion.h2
            {...fadeUp(0.1)}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.15] tracking-[0.06em] uppercase"
            style={{ color: T.deepSage }}
          >
            Support for{" "}
            <em style={{ color: T.antiqueGold, fontStyle: "italic" }}>
              your goals
            </em>
          </motion.h2>

          {/* Description */}
          <motion.p
            {...fadeUp(0.18)}
            className="text-base lg:text-[1.05rem] font-light leading-[1.9]"
            style={{ color: T.charcoalOlive, opacity: 0.78 }}
          >
            Explore supplements and nutrition for your personal goals, with clear information
            about ingredients, their intended benefits, and how to use them. Whether you want
            to support daily energy, metabolic health, skin, strength, recovery, focus,
            healthy ageing, or long-term wellbeing, we are here to help.
          </motion.p>
        </div>

        {/* ── Product card grid ────────────────────────── */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-end">
          {products.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              isInView={isInView}
              featured={product.featured}
            />
          ))}
        </div>

        {/* ── CTA button ───────────────────────────────── */}
        <motion.div {...fadeUp(0.55)} className="flex flex-col items-center gap-4">
          <ExploreButton />
          <p
            className="text-[0.72rem] tracking-widest uppercase font-light"
            style={{ color: T.textMuted }}
          >
            Free shipping on orders over $80
          </p>
        </motion.div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   ProductCard
───────────────────────────────────────────────────────────── */
function ProductCard({ product, index, isInView, featured }) {
  const cardRef  = useRef(null);
  const cardView = useInView(cardRef, { once: true, margin: "-40px" });

  const delay = 0.22 + index * 0.14;

  return (
    <motion.article
      ref={cardRef}
      id={`product-card-${product.id}`}
      initial={{ opacity: 0, y: 44, scale: 0.97 }}
      animate={cardView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
      className={`group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer ${
        featured ? "md:-translate-y-4 md:shadow-2xl" : "shadow-lg"
      }`}
      style={{
        backgroundColor: T.cardBg,
        boxShadow: featured
          ? `0 28px 64px rgba(56,59,53,0.16), 0 0 0 1px ${product.color}40`
          : `0 8px 32px rgba(56,59,53,0.10)`,
      }}
    >
      {/* ── Category colour bar (top border) ── */}
      <div className="h-1.5 w-full flex-shrink-0" style={{ backgroundColor: product.color }} />

      {/* ── Card body ── */}
      <div className="flex flex-col gap-0 flex-1">

        {/* Header zone */}
        <div
          className="relative flex flex-col gap-5 p-7 pb-6"
          style={{ backgroundColor: product.colorBg }}
        >
          {/* Badge */}
          {product.badge && (
            <div className="absolute top-5 right-5">
              <span
                className="text-[0.6rem] font-semibold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: product.color,
                  color: darken(product.color),
                }}
              >
                {product.badge}
              </span>
            </div>
          )}

          {/* Icon container */}
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${product.color}35` }}
          >
            <span style={{ color: product.colorDark }}>
              {product.icon}
            </span>
          </div>

          {/* Category tag */}
          <div className="flex flex-col gap-2">
            <span
              className="text-[0.62rem] font-semibold tracking-[0.2em] uppercase"
              style={{ color: product.colorDark }}
            >
              {product.tag}
            </span>
            <div className="w-8 h-px" style={{ backgroundColor: product.color }} />
          </div>

          {/* Name + tagline */}
          <div className="flex flex-col gap-1.5">
            <h3
              className="font-serif text-2xl font-light tracking-wide"
              style={{ color: T.charcoalOlive }}
            >
              {product.name}
            </h3>
            <p
              className="text-xs font-light italic tracking-wide"
              style={{ color: T.textMuted }}
            >
              {product.tagline}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mx-7" style={{ backgroundColor: `${product.color}40` }} />

        {/* Description + ingredients zone */}
        <div className="flex flex-col gap-5 p-7 pt-6 flex-1">
          <p
            className="text-sm font-light leading-[1.85]"
            style={{ color: T.charcoalOlive, opacity: 0.78 }}
          >
            {product.description}
          </p>

          {/* Key ingredients pills */}
          <div className="flex flex-col gap-2.5">
            <span
              className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase"
              style={{ color: T.textMuted }}
            >
              Key Ingredients
            </span>
            <div className="flex flex-wrap gap-1.5">
              {product.keyIngredients.map((ing) => (
                <span
                  key={ing}
                  className="px-2.5 py-1 rounded-full text-[0.6rem] font-medium tracking-wide uppercase"
                  style={{
                    backgroundColor: `${product.color}25`,
                    color: product.colorDark,
                    border: `1px solid ${product.color}55`,
                  }}
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Card footer CTA ── */}
        <div className="px-7 pb-7 mt-auto">
          <a
            href={`#${product.id}`}
            id={`btn-learn-more-${product.id}`}
            className="group/btn relative flex items-center justify-between w-full px-5 py-3.5 rounded-xl text-sm font-medium tracking-wider overflow-hidden transition-all duration-300"
            style={{
              backgroundColor: `${product.color}20`,
              color: product.colorDark,
              border: `1px solid ${product.color}50`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = product.color;
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = product.color;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = `${product.color}20`;
              e.currentTarget.style.color = product.colorDark;
              e.currentTarget.style.borderColor = `${product.color}50`;
            }}
          >
            <span>Learn More</span>
            <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
              viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M8 3L13 8L8 13" stroke="currentColor"
                strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

      </div>

      {/* Featured highlight ring */}
      {featured && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ border: `2px solid ${product.color}70` }}
        />
      )}
    </motion.article>
  );
}

/* ─────────────────────────────────────────────────────────────
   Explore Collection Button
───────────────────────────────────────────────────────────── */
function ExploreButton() {
  return (
    <a
      href="#collection"
      id="btnExploreCollection"
      className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full text-[0.75rem] font-semibold tracking-[0.2em] uppercase overflow-hidden transition-all duration-400"
      style={{
        backgroundColor: T.deepOceanBlue,
        color:           T.pearlIvory,
        border:          `1.5px solid ${T.deepOceanBlue}`,
        boxShadow:       `0 4px 24px ${T.deepOceanBlue}35`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = "#3E5560";
        e.currentTarget.style.boxShadow = `0 8px 36px ${T.deepOceanBlue}55`;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = T.deepOceanBlue;
        e.currentTarget.style.boxShadow = `0 4px 24px ${T.deepOceanBlue}35`;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Shimmer */}
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.12) 50%, transparent 65%)`,
        }}
      />
      <span className="relative z-10">Explore the Collection</span>
      <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5"
        viewBox="0 0 16 16" fill="none">
        <path d="M3 8H13M8 3L13 8L8 13" stroke="currentColor"
          strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
  );
}

/* ─────────────────────────────────────────────────────────────
   Decorative background
───────────────────────────────────────────────────────────── */
function BackgroundDecor() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Soft glow: top-right */}
      <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full"
        style={{ background: `radial-gradient(circle, ${T.glassGlow}18 0%, transparent 70%)` }} />
      {/* Soft glow: bottom-left */}
      <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full"
        style={{ background: `radial-gradient(circle, ${T.deepOceanBlue}10 0%, transparent 70%)` }} />
      {/* Fine dot grid */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.03 }}>
        <defs>
          <pattern id="pgDots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill={T.charcoalOlive} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pgDots)" />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Product Icons
───────────────────────────────────────────────────────────── */
function SkinIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <ellipse cx="16" cy="17" rx="9" ry="11" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M16 6C16 6 12 9 12 12C12 14 13.5 15.5 16 15.5C18.5 15.5 20 14 20 12C20 9 16 6 16 6Z"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M11 20C11 20 13 22 16 22C19 22 21 20 21 20" stroke="currentColor"
        strokeWidth="1.3" strokeLinecap="round"/>
      <circle cx="22" cy="9" r="1.5" fill="currentColor" opacity="0.5"/>
      <circle cx="25" cy="14" r="1" fill="currentColor" opacity="0.35"/>
    </svg>
  );
}

function MetabolicIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <path d="M16 4L19 10H25L20.5 14L22.5 21L16 17L9.5 21L11.5 14L7 10H13L16 4Z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M16 11V17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="16" cy="20" r="1.5" fill="currentColor"/>
    </svg>
  );
}

function CellularIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="16" cy="16" r="4"  stroke="currentColor" strokeWidth="1.5"/>
      <line x1="16" y1="6"  x2="16" y2="12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="16" y1="20" x2="16" y2="26" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="6"  y1="16" x2="12" y2="16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="20" y1="16" x2="26" y2="16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <circle cx="16" cy="6"  r="1.5" fill="currentColor" opacity="0.6"/>
      <circle cx="16" cy="26" r="1.5" fill="currentColor" opacity="0.6"/>
      <circle cx="6"  cy="16" r="1.5" fill="currentColor" opacity="0.6"/>
      <circle cx="26" cy="16" r="1.5" fill="currentColor" opacity="0.6"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Utility: approximate text darkening (for readable tag text)
───────────────────────────────────────────────────────────── */
function darken(hex) {
  // Returns a slightly darkened version of the hex for text
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const factor = 0.55;
  return `rgb(${Math.floor(r * factor)}, ${Math.floor(g * factor)}, ${Math.floor(b * factor)})`;
}
