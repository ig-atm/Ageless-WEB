import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   Brand Tokens
───────────────────────────────────────────────────────────── */
const T = {
  pearlIvory:    "#F8F4EC",
  charcoalOlive: "#383B35",
  deepSage:      "#657363",
  mutedSage:     "#9EAA96",
  champagneGold: "#C4A66A",
  antiqueGold:   "#A98B52",
  divider:       "#D9CDB8",
  textMuted:     "#5A5E54",
};

/* ─────────────────────────────────────────────────────────────
   Shared animation config
───────────────────────────────────────────────────────────── */
const ease = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial:   { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport:  { once: true, margin: "-72px" },
  transition: { duration: 0.75, ease, delay },
});

const staggerContainer = {
  initial:     {},
  whileInView: { transition: { staggerChildren: 0.14, delayChildren: 0.08 } },
  viewport:    { once: true, margin: "-72px" },
};

const staggerChild = {
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.68, ease } },
};

/* ─────────────────────────────────────────────────────────────
   Lifestyle pillars for Part 2
───────────────────────────────────────────────────────────── */
const pillars = [
  { label: "Nutrition",   icon: <NutritionIcon /> },
  { label: "Movement",    icon: <MovementIcon /> },
  { label: "Rest",        icon: <RestIcon /> },
  { label: "Stress",      icon: <StressIcon /> },
  { label: "Habits",      icon: <HabitsIcon /> },
];

/* ─────────────────────────────────────────────────────────────
   Main export
───────────────────────────────────────────────────────────── */
export default function AboutSection() {
  return (
    <div className="w-full overflow-hidden">
      <OurStory />
      <HolisticApproach />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PART 1 — OUR STORY
══════════════════════════════════════════════════════════════ */
function OurStory() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: T.pearlIvory }}
    >
      {/* Decorative linen texture overlay */}
      <LinenTexture />

      {/* Top accent line */}
      <div className="w-full h-px" style={{ background: `linear-gradient(to right, transparent, ${T.champagneGold}55, transparent)` }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── Left column: heading + CTA ── */}
          <div className="flex flex-col gap-8 lg:sticky lg:top-28">

            {/* Eyebrow */}
            <motion.div {...fadeUp(0)} className="flex items-center gap-3">
              <div className="w-6 h-px" style={{ backgroundColor: T.champagneGold }} />
              <span
                className="text-[0.65rem] font-semibold tracking-[0.28em] uppercase"
                style={{ color: T.deepSage }}
              >
                About Us
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              {...fadeUp(0.1)}
              className="font-serif text-6xl sm:text-7xl lg:text-8xl font-light leading-[0.95] tracking-[0.04em] uppercase"
              style={{ color: T.charcoalOlive }}
            >
              Our<br />
              <em
                className="not-italic"
                style={{ color: T.deepSage }}
              >
                Story
              </em>
            </motion.h2>

            {/* Gold decorative rule */}
            <motion.div {...fadeUp(0.2)} className="flex items-center gap-0">
              <div className="h-px w-24" style={{ backgroundColor: T.champagneGold }} />
              <div
                className="w-2 h-2 rotate-45 mx-2 flex-shrink-0"
                style={{ backgroundColor: T.champagneGold }}
              />
              <div className="h-px w-12" style={{ backgroundColor: `${T.champagneGold}55` }} />
            </motion.div>

            {/* Founder portraits strip (decorative placeholder circles) */}
            <motion.div {...fadeUp(0.25)} className="flex items-center gap-2 mt-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-medium"
                  style={{
                    borderColor: T.deepSage,
                    backgroundColor: `${T.deepSage}18`,
                    color: T.deepSage,
                    marginLeft: i > 0 ? "-8px" : "0",
                    zIndex: 4 - i,
                  }}
                >
                  {["Dr", "Dr", "Co", "Co"][i]}
                </div>
              ))}
              <span
                className="ml-3 text-xs font-light tracking-wide"
                style={{ color: T.textMuted }}
              >
                2 Doctors · 2 Co-founders
              </span>
            </motion.div>

            {/* CTA Button */}
            <motion.div {...fadeUp(0.3)}>
              <MeetFoundersButton />
            </motion.div>
          </div>

          {/* ── Right column: body text + stats ── */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-72px" }}
            className="flex flex-col gap-8 pt-2 lg:pt-12"
          >
            {/* Drop cap paragraph */}
            <motion.div variants={staggerChild} className="relative">
              <div
                className="absolute -left-5 top-0 bottom-0 w-px"
                style={{ backgroundColor: `${T.champagneGold}40` }}
              />
              <p
                className="text-base lg:text-[1.07rem] font-light leading-[1.95] pl-5"
                style={{ color: T.charcoalOlive, opacity: 0.82 }}
              >
                <span
                  className="float-left font-serif text-6xl leading-[0.8] mr-3 mt-1"
                  style={{ color: T.deepSage, opacity: 0.55 }}
                >
                  A
                </span>
                geless Longevity was founded by two doctors and two health enthusiasts who share one belief: your health is shaped by what you do every day. Our doctors bring medical expertise and an evidence-informed approach. Our fellow founders bring a personal commitment to nutrition, movement, recovery, healthy ageing, and intentional living.
              </p>
            </motion.div>

            <motion.p
              variants={staggerChild}
              className="text-base lg:text-[1.07rem] font-light leading-[1.95]"
              style={{ color: T.charcoalOlive, opacity: 0.78 }}
            >
              Together, we are creating a clear, transparent brand to help you understand your health and make better choices for how you feel, look, and live — now and in the years ahead.
            </motion.p>

            {/* Stat cards */}
            <motion.div
              variants={staggerChild}
              className="grid grid-cols-3 gap-4 pt-4"
            >
              {[
                { number: "2",    label: "Medical Doctors" },
                { number: "100%", label: "Evidence-Based" },
                { number: "∞",    label: "Years Ahead" },
              ].map(({ number, label }) => (
                <div
                  key={label}
                  className="flex flex-col gap-1.5 p-4 rounded-xl border"
                  style={{
                    borderColor: `${T.champagneGold}30`,
                    backgroundColor: `${T.champagneGold}08`,
                  }}
                >
                  <span
                    className="font-serif text-3xl font-light"
                    style={{ color: T.deepSage }}
                  >
                    {number}
                  </span>
                  <span
                    className="text-[0.65rem] font-medium tracking-[0.15em] uppercase leading-tight"
                    style={{ color: T.textMuted }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Bottom wave into next section */}
      <div className="relative z-10 -mb-px" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 56H1440V0C1200 44 960 56 720 48C480 40 240 0 0 28V56Z" fill={T.mutedSage} />
        </svg>
      </div>
    </section>
  );
}

/* ─── Meet Our Founders Button ─────────────────────────────── */
function MeetFoundersButton() {
  return (
    <a
      href="#founders"
      id="btnMeetFounders"
      className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-[0.75rem] font-semibold tracking-[0.18em] uppercase overflow-hidden transition-all duration-500"
      style={{
        backgroundColor: T.deepSage,
        color: T.pearlIvory,
        border: `1.5px solid ${T.deepSage}`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = T.champagneGold;
        e.currentTarget.style.boxShadow   = `0 0 0 1px ${T.champagneGold}55, 0 8px 28px ${T.deepSage}40`;
        e.currentTarget.style.transform   = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = T.deepSage;
        e.currentTarget.style.boxShadow   = "none";
        e.currentTarget.style.transform   = "translateY(0)";
      }}
    >
      {/* Shimmer sweep */}
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(105deg, transparent 30%, ${T.champagneGold}22 50%, transparent 70%)`,
        }}
      />
      <span className="relative z-10">Meet Our Founders</span>
      <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
        <path d="M3 8H13M8 3L13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
  );
}

/* ══════════════════════════════════════════════════════════════
   PART 2 — HOLISTIC APPROACH
══════════════════════════════════════════════════════════════ */
function HolisticApproach() {
  const ref     = useRef(null);
  const inView  = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden py-28 px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: T.mutedSage }}
    >
      {/* Botanical background pattern */}
      <BotanicalPattern />

      {/* Ambient glow spots */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${T.antiqueGold}18 0%, transparent 70%)` }} />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-14">

        {/* ── Section eyebrow ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="flex items-center gap-3"
        >
          <div className="w-6 h-px bg-white opacity-50" />
          <span className="text-[0.65rem] font-semibold tracking-[0.28em] uppercase text-white opacity-70">
            Our Approach
          </span>
          <div className="w-6 h-px bg-white opacity-50" />
        </motion.div>

        {/* ── Lifestyle pillars row ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="flex flex-wrap justify-center gap-3"
        >
          {pillars.map(({ label, icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease }}
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                backgroundColor: "rgba(255,255,255,0.18)",
                border: "1px solid rgba(255,255,255,0.3)",
                backdropFilter: "blur(8px)",
              }}
            >
              <span className="text-white opacity-80">{icon}</span>
              <span className="text-white text-xs font-medium tracking-wider uppercase opacity-85">
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Glassmorphic card ── */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.85, delay: 0.28, ease }}
          className="relative w-full rounded-3xl overflow-hidden"
          style={{
            background:       "rgba(255, 255, 255, 0.22)",
            backdropFilter:   "blur(24px) saturate(160%)",
            WebkitBackdropFilter: "blur(24px) saturate(160%)",
            border:           "1px solid rgba(255, 255, 255, 0.38)",
            boxShadow:        "0 24px 64px rgba(56,59,53,0.18), inset 0 1px 0 rgba(255,255,255,0.5)",
          }}
        >
          {/* Inner shimmer edge */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%, rgba(255,255,255,0.06) 100%)",
            }}
          />

          <div className="relative z-10 p-10 md:p-14 lg:p-16 flex flex-col gap-10">

            {/* Card heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.42, ease }}
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light leading-[1.2] tracking-[0.03em] text-center uppercase"
              style={{ color: T.charcoalOlive }}
            >
              Supplements are part of{" "}
              <span style={{ color: T.deepSage }}>the picture.</span>
              <br className="hidden sm:block" />
              {" "}Your life is{" "}
              <span
                className="italic not-italic"
                style={{ color: T.antiqueGold, fontStyle: "italic" }}
              >
                the whole picture.
              </span>
            </motion.h2>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.55, ease }}
              className="w-full h-px origin-left"
              style={{ backgroundColor: `${T.champagneGold}50` }}
            />

            {/* Body text + icon grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">

              {/* Body text — wider */}
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.72, delay: 0.58, ease }}
                className="lg:col-span-3 text-base lg:text-[1.05rem] font-light leading-[1.9]"
                style={{ color: T.charcoalOlive, opacity: 0.83 }}
              >
                What you eat. How you move. How well you rest. How you manage stress. The habits you practise each day. Our supplements are designed to complement these foundations, supporting nutritional pathways linked to metabolic health, mitochondrial function, cellular resilience, energy, recovery, strength, and healthy ageing.
                <br /><br />
                Our education helps you understand your body, assess your options, and make informed decisions. Because feeling youthful and living well depends on how you care for your health over time.
              </motion.p>

              {/* Pillar highlights — narrower */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.72, delay: 0.66, ease }}
                className="lg:col-span-2 flex flex-col gap-3"
              >
                {[
                  { label: "Metabolic Health",        icon: "⚡" },
                  { label: "Mitochondrial Function",  icon: "🔬" },
                  { label: "Cellular Resilience",     icon: "🛡" },
                  { label: "Recovery & Strength",     icon: "💪" },
                  { label: "Healthy Ageing",          icon: "🌿" },
                ].map(({ label, icon }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: 12 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.72 + i * 0.07, ease }}
                    className="flex items-center gap-3 py-2.5 px-4 rounded-xl"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.28)",
                      border: "1px solid rgba(255,255,255,0.35)",
                    }}
                  >
                    <span className="text-base leading-none select-none" role="img" aria-hidden="true">
                      {icon}
                    </span>
                    <span
                      className="text-xs font-medium tracking-wider uppercase"
                      style={{ color: T.charcoalOlive, opacity: 0.78 }}
                    >
                      {label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Decorative sub-components
───────────────────────────────────────────────────────────── */

function LinenTexture() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.03]" aria-hidden="true">
      <svg width="100%" height="100%">
        <filter id="linen">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#linen)" />
      </svg>
    </div>
  );
}

function BotanicalPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10" aria-hidden="true">
      {/* Top-left large leaf */}
      <svg className="absolute -top-16 -left-16 w-80 h-80" viewBox="0 0 200 200" fill="none">
        <path d="M100 180C100 180 20 120 20 60C20 20 60 0 100 20C140 0 180 20 180 60C180 120 100 180 100 180Z"
          stroke="white" strokeWidth="1.5" fill="none"/>
        <line x1="100" y1="180" x2="100" y2="40" stroke="white" strokeWidth="1"/>
        <line x1="100" y1="100" x2="60" y2="70" stroke="white" strokeWidth="0.8"/>
        <line x1="100" y1="120" x2="140" y2="90" stroke="white" strokeWidth="0.8"/>
      </svg>
      {/* Bottom-right small leaf */}
      <svg className="absolute -bottom-8 -right-8 w-48 h-48" viewBox="0 0 200 200" fill="none">
        <path d="M100 180C100 180 20 120 20 60C20 20 60 0 100 20C140 0 180 20 180 60C180 120 100 180 100 180Z"
          stroke="white" strokeWidth="1.5" fill="none"/>
        <line x1="100" y1="180" x2="100" y2="40" stroke="white" strokeWidth="1"/>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Pillar Icons
───────────────────────────────────────────────────────────── */
function NutritionIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
      <path d="M10 2C10 2 5 6 5 11C5 14.314 7.239 17 10 17C12.761 17 15 14.314 15 11C15 6 10 2 10 2Z"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="10" y1="17" x2="10" y2="9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function MovementIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
      <circle cx="10" cy="4" r="2" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M10 6V11L7 15M10 11L13 15M7 9H13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function RestIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
      <path d="M3 10C3 6.686 5.686 4 9 4C9 4 8 6 8 8C8 10 10 11 12 11C14 11 16 10 16 10C16 13.314 13.314 16 10 16C6.686 16 3 13.314 3 10Z"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

function StressIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
      <path d="M10 3V5M10 15V17M3 10H5M15 10H17M5.05 5.05L6.46 6.46M13.54 13.54L14.95 14.95M5.05 14.95L6.46 13.54M13.54 6.46L14.95 5.05"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  );
}

function HabitsIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
      <path d="M4 10L7.5 13.5L16 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
