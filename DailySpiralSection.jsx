import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   Brand Tokens
───────────────────────────────────────────────────────────── */
const T = {
  softOceanBlue:  "#91ACB5",
  deepOceanBlue:  "#526D79",
  pearlIvory:     "#F8F4EC",
  charcoalOlive:  "#383B35",
  warmTaupe:      "#A29A8E",
  champagneGold:  "#C4A66A",
  deepSage:       "#657363",
  antiqueGold:    "#A98B52",
};

/* ─────────────────────────────────────────────────────────────
   Spiral habit data
───────────────────────────────────────────────────────────── */
const habits = [
  {
    id:      "nourish",
    title:   "NOURISH",
    emoji:   "🌿",
    question:"Are you getting the nutrients you need?",
    tip:     "Aim for a diverse, whole-food plate with plenty of colour and quality protein.",
    accent:  "#8BAF7C", // sage green
    spiralAngle: 0,
  },
  {
    id:      "move",
    title:   "MOVE",
    emoji:   "💪",
    question:"Have you moved for strength and vitality?",
    tip:     "Even 20 minutes of intentional movement supports metabolic health and mood.",
    accent:  "#7A9BAB", // muted teal
    spiralAngle: 36,
  },
  {
    id:      "hydrate",
    title:   "HYDRATE",
    emoji:   "💧",
    question:"Have you had enough water today?",
    tip:     "Proper hydration supports cognition, energy, and cellular function.",
    accent:  "#6B8FA8", // ocean
    spiralAngle: 72,
  },
  {
    id:      "breathe",
    title:   "BREATHE",
    emoji:   "🌬️",
    question:"Have you paused to reset?",
    tip:     "A few minutes of intentional breathing activates the parasympathetic system.",
    accent:  "#A2B5BB", // light blue
    spiralAngle: 108,
  },
  {
    id:      "restore",
    title:   "RESTORE",
    emoji:   "🌙",
    question:"Have you made time to recover?",
    tip:     "Sleep is when repair happens. 7–9 hours supports hormones, immunity, and memory.",
    accent:  "#7B8FA6", // slate blue
    spiralAngle: 144,
  },
  {
    id:      "connect",
    title:   "CONNECT",
    emoji:   "🤝",
    question:"Have you connected with what matters?",
    tip:     "Social connection is one of the strongest predictors of long-term health and longevity.",
    accent:  "#A98B52", // antique gold
    spiralAngle: 180,
  },
  {
    id:      "protect",
    title:   "PROTECT",
    emoji:   "🛡️",
    question:"How are you supporting your future health?",
    tip:     "Sun protection, environmental awareness, and preventive habits compound over time.",
    accent:  "#7A9188", // muted sage
    spiralAngle: 216,
  },
  {
    id:      "supplement",
    title:   "SUPPLEMENT",
    emoji:   "💊",
    question:"Do your supplements support your goals?",
    tip:     "Evidence-informed supplementation fills gaps that diet alone may not address.",
    accent:  "#C4A66A", // champagne gold
    spiralAngle: 252,
  },
  {
    id:      "reflect",
    title:   "REFLECT",
    emoji:   "🪞",
    question:"How do you feel today?",
    tip:     "Body awareness is the foundation of informed health decisions.",
    accent:  "#9A8E7A", // warm taupe
    spiralAngle: 288,
  },
  {
    id:      "learn",
    title:   "LEARN",
    emoji:   "📖",
    question:"What can you learn about your health today?",
    tip:     "Understanding your biology empowers better choices every single day.",
    accent:  "#657363", // deep sage
    spiralAngle: 324,
  },
];

/* ─────────────────────────────────────────────────────────────
   Animation ease
───────────────────────────────────────────────────────────── */
const ease = [0.22, 1, 0.36, 1];

/* ─────────────────────────────────────────────────────────────
   Main export
───────────────────────────────────────────────────────────── */
export default function DailySpiralSection() {
  const [checked,  setChecked]  = useState(new Set());
  const [expanded, setExpanded] = useState(null);
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });

  const completedCount = checked.size;
  const progress       = (completedCount / habits.length) * 100;

  function toggleCheck(id) {
    setChecked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleExpand(id) {
    setExpanded(prev => (prev === id ? null : id));
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-24 lg:py-32 px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: T.softOceanBlue }}
    >
      {/* Ambient background layers */}
      <OceanBackground />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center gap-16">

        {/* ── Header ──────────────────────────────────── */}
        <div className="flex flex-col items-center gap-6 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
            className="flex items-center gap-3"
          >
            <div className="w-6 h-px" style={{ backgroundColor: `${T.pearlIvory}60` }} />
            <span
              className="text-[0.65rem] font-semibold tracking-[0.28em] uppercase"
              style={{ color: `${T.pearlIvory}99` }}
            >
              Daily Habits
            </span>
            <div className="w-6 h-px" style={{ backgroundColor: `${T.pearlIvory}60` }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease, delay: 0.08 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.15] tracking-[0.05em] uppercase"
            style={{ color: T.pearlIvory }}
          >
            What&apos;s your daily{" "}
            <em style={{ color: T.champagneGold, fontStyle: "italic" }}>spiral?</em>
            {" "}🌀
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.72, ease, delay: 0.16 }}
            className="text-base lg:text-[1.05rem] font-light leading-[1.9]"
            style={{ color: `${T.pearlIvory}CC` }}
          >
            Small habits shape how you feel, function, and look. Like a spiral that develops
            through repeated, balanced turns, your daily choices build over time.
          </motion.p>
        </div>

        {/* ── Animated SVG Spiral ──────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
          className="w-full flex justify-center"
        >
          <SpiralViz habits={habits} checked={checked} isInView={isInView} />
        </motion.div>

        {/* ── Progress tracker ────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease, delay: 0.3 }}
          className="w-full flex flex-col gap-3"
        >
          <div className="flex items-center justify-between">
            <span
              className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase"
              style={{ color: `${T.pearlIvory}CC` }}
            >
              Today&apos;s Spiral
            </span>
            <span
              className="font-serif text-xl font-light tabular-nums"
              style={{ color: T.champagneGold }}
            >
              {completedCount}
              <span className="text-sm font-sans" style={{ color: `${T.pearlIvory}80` }}>
                {" "}/ {habits.length}
              </span>
            </span>
          </div>

          {/* Progress bar */}
          <div
            className="w-full h-1.5 rounded-full overflow-hidden"
            style={{ backgroundColor: `${T.pearlIvory}25` }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(to right, ${T.champagneGold}, ${T.antiqueGold})` }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease }}
            />
          </div>

          {completedCount === habits.length && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-sm font-light"
              style={{ color: T.champagneGold }}
            >
              ✨ Your spiral is complete today. Remarkable.
            </motion.p>
          )}
        </motion.div>

        {/* ── Habit card grid ──────────────────────────── */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
          {habits.map((habit, i) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              index={i}
              isChecked={checked.has(habit.id)}
              isExpanded={expanded === habit.id}
              isInView={isInView}
              onToggleCheck={() => toggleCheck(habit.id)}
              onToggleExpand={() => toggleExpand(habit.id)}
            />
          ))}
        </div>

        {/* ── Section footer ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.45 }}
          className="flex flex-col items-center gap-7 text-center max-w-2xl"
        >
          {/* Gold ornament */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-px" style={{ backgroundColor: `${T.champagneGold}70` }} />
            <div
              className="w-2 h-2 rotate-45 flex-shrink-0"
              style={{ backgroundColor: T.champagneGold, opacity: 0.7 }}
            />
            <div className="w-10 h-px" style={{ backgroundColor: `${T.champagneGold}70` }} />
          </div>

          <p
            className="text-base font-light leading-[1.85]"
            style={{ color: `${T.pearlIvory}CC` }}
          >
            Discover simple, evidence-informed ways to support greater energy, confidence,
            strength, healthy-looking skin, recovery, and long-term wellbeing.
          </p>

          <ExploreButton />
        </motion.div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Animated SVG Spiral
───────────────────────────────────────────────────────────── */
function SpiralViz({ habits, checked, isInView }) {
  const pathRef  = useRef(null);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  // Build Archimedean spiral points
  const cx = 280, cy = 200;
  const turns = 2.6;
  const points = [];
  const totalSteps = 300;
  for (let i = 0; i <= totalSteps; i++) {
    const t   = (i / totalSteps) * turns * Math.PI * 2;
    const r   = 12 + (t / (turns * Math.PI * 2)) * 165;
    points.push({ x: cx + r * Math.cos(t - Math.PI / 2), y: cy + r * Math.sin(t - Math.PI / 2) });
  }
  const d = `M ${points.map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" L ")}`;

  // Place habit nodes along the spiral
  const nodePositions = habits.map((_, i) => {
    const idx = Math.round(((i + 0.5) / habits.length) * totalSteps);
    return points[Math.min(idx, points.length - 1)];
  });

  return (
    <div className="w-full max-w-[560px] mx-auto">
      <svg
        viewBox="0 50 560 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-hidden="true"
      >
        {/* Glow filter */}
        <defs>
          <filter id="goldGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Spiral path — animated draw */}
        <motion.path
          ref={pathRef}
          d={d}
          stroke={T.champagneGold}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.65"
          filter="url(#goldGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.65 } : {}}
          transition={{ duration: 2.8, ease: "easeInOut", delay: 0.35 }}
        />

        {/* Habit nodes */}
        {nodePositions.map((pos, i) => {
          const habit     = habits[i];
          const isChecked = checked.has(habit.id);
          return (
            <motion.g
              key={habit.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.45, ease, delay: 0.6 + i * 0.18 }}
              style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
              filter="url(#nodeGlow)"
            >
              {/* Outer ring */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isChecked ? 11 : 9}
                fill={isChecked ? T.champagneGold : `${T.softOceanBlue}`}
                stroke={isChecked ? T.champagneGold : `${T.pearlIvory}90`}
                strokeWidth={isChecked ? 0 : 1.5}
                style={{ transition: "all 0.3s" }}
              />
              {/* Emoji / check */}
              <text
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={isChecked ? "8" : "7"}
                style={{ transition: "all 0.3s", userSelect: "none" }}
              >
                {isChecked ? "✓" : habit.emoji}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   HabitCard
───────────────────────────────────────────────────────────── */
function HabitCard({ habit, index, isChecked, isExpanded, isInView, onToggleCheck, onToggleExpand }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1], delay: 0.28 + index * 0.055 }}
      id={`habit-card-${habit.id}`}
      className="group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer select-none"
      style={{
        backgroundColor: isChecked
          ? `rgba(255,255,255,0.26)`
          : "rgba(255,255,255,0.18)",
        border: `1px solid ${isChecked
          ? `${T.champagneGold}70`
          : "rgba(255,255,255,0.3)"}`,
        backdropFilter:       "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        boxShadow: `0 6px 28px rgba(${hexToRgb(T.warmTaupe)},0.22)`,
        transition: "background 0.3s, border 0.3s, box-shadow 0.3s",
      }}
      whileHover={{ y: -3, boxShadow: `0 12px 36px rgba(${hexToRgb(T.warmTaupe)},0.32)` }}
      onClick={onToggleExpand}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
        style={{
          backgroundColor: habit.accent,
          opacity: isChecked ? 1 : 0.6,
          transition: "opacity 0.3s",
        }}
      />

      {/* Card main content */}
      <div className="flex items-start gap-4 p-5 pl-6">

        {/* Emoji badge */}
        <div
          className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg mt-0.5"
          style={{
            backgroundColor: `${habit.accent}30`,
            border: `1px solid ${habit.accent}50`,
          }}
        >
          {habit.emoji}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0 flex flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <span
              className="text-[0.72rem] font-bold tracking-[0.18em] uppercase leading-none"
              style={{ color: T.deepOceanBlue }}
            >
              {habit.title}
            </span>

            {/* Expand chevron */}
            <motion.svg
              viewBox="0 0 16 16"
              fill="none"
              className="w-3.5 h-3.5 flex-shrink-0 opacity-40"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              style={{ color: T.pearlIvory }}
            >
              <path d="M3 5L8 10L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>
          </div>

          <p
            className="text-sm font-light leading-[1.65]"
            style={{ color: T.charcoalOlive, opacity: 0.88 }}
          >
            {habit.question}
          </p>
        </div>

        {/* Check button */}
        <button
          id={`check-${habit.id}`}
          aria-label={isChecked ? `Uncheck ${habit.title}` : `Check ${habit.title}`}
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 mt-0.5"
          style={{
            backgroundColor: isChecked ? T.champagneGold : "rgba(255,255,255,0.2)",
            border: `1.5px solid ${isChecked ? T.champagneGold : "rgba(255,255,255,0.4)"}`,
          }}
          onClick={e => { e.stopPropagation(); onToggleCheck(); }}
        >
          <AnimatePresence mode="wait">
            {isChecked ? (
              <motion.svg
                key="check"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                viewBox="0 0 12 12"
                fill="none"
                className="w-3.5 h-3.5"
              >
                <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </motion.svg>
            ) : (
              <motion.div
                key="empty"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
              />
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Expanded tip */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div
              className="mx-5 mb-5 px-4 py-3.5 rounded-xl text-sm font-light leading-[1.75] border-l-2"
              style={{
                backgroundColor: "rgba(255,255,255,0.15)",
                borderLeftColor: habit.accent,
                color: `${T.pearlIvory}DD`,
              }}
            >
              💡 <span className="font-medium">Tip:</span> {habit.tip}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Explore Healthy Living Button
───────────────────────────────────────────────────────────── */
function ExploreButton() {
  return (
    <a
      href="#healthy-living"
      id="btnExploreHealthyLiving"
      className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full text-[0.75rem] font-semibold tracking-[0.2em] uppercase overflow-hidden transition-all duration-400"
      style={{
        backgroundColor: T.deepOceanBlue,
        color:           T.pearlIvory,
        border:          `1.5px solid ${T.deepOceanBlue}`,
        boxShadow:       `0 4px 24px rgba(82,109,121,0.45)`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = "#3E5560";
        e.currentTarget.style.borderColor     = T.champagneGold;
        e.currentTarget.style.boxShadow       = `0 8px 36px rgba(82,109,121,0.6)`;
        e.currentTarget.style.transform       = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = T.deepOceanBlue;
        e.currentTarget.style.borderColor     = T.deepOceanBlue;
        e.currentTarget.style.boxShadow       = `0 4px 24px rgba(82,109,121,0.45)`;
        e.currentTarget.style.transform       = "translateY(0)";
      }}
    >
      {/* Shimmer */}
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.1) 50%, transparent 65%)" }}
      />
      <span className="relative z-10">Explore Healthy Living</span>
      <svg
        className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
        viewBox="0 0 16 16" fill="none"
      >
        <path d="M3 8H13M8 3L13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
  );
}

/* ─────────────────────────────────────────────────────────────
   Ocean Background
───────────────────────────────────────────────────────────── */
function OceanBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Top-left shimmer */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 65%)" }}
      />
      {/* Bottom-right deep */}
      <div
        className="absolute -bottom-32 -right-32 w-[480px] h-[480px] rounded-full"
        style={{ background: `radial-gradient(circle, rgba(82,109,121,0.4) 0%, transparent 70%)` }}
      />
      {/* Subtle wave lines */}
      <svg className="absolute bottom-0 left-0 w-full opacity-[0.07]" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0 60C240 20 480 100 720 60C960 20 1200 100 1440 60V120H0Z" fill="white"/>
      </svg>
      {/* Dot grid */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
        <defs>
          <pattern id="spiralDots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill={T.pearlIvory} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#spiralDots)" />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Utility
───────────────────────────────────────────────────────────── */
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
