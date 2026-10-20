import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   Brand Colors & Tokens
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
  creamBg:        "#EDE8DF",
};

/* ─────────────────────────────────────────────────────────────
   Habit stops along the spiral in daily_spiral.png (1024 × 768)
───────────────────────────────────────────────────────────── */
const stops = [
  { id: "hydrate",    name: "Hydrate",    question: "Have you had enough water today?",         x: 236, y: 494 },
  { id: "move",       name: "Move",       question: "Have you moved for strength and vitality?", x: 362, y: 276 },
  { id: "nourish",    name: "Nourish",    question: "Are you getting the nutrients you need?",   x: 546, y: 154 },
  { id: "supplement", name: "Supplement", question: "Do your supplements support your goals?",   x: 738, y: 208 },
  { id: "breathe",    name: "Breathe",    question: "Have you paused to reset?",                 x: 846, y: 386 },
  { id: "restore",    name: "Restore",    question: "Have you made time to recover?",            x: 836, y: 608 },
  { id: "connect",    name: "Connect",    question: "Have you connected with what matters?",     x: 694, y: 754 },
  { id: "reflect",    name: "Reflect",    question: "How do you feel today?",                    x: 518, y: 716 },
  { id: "learn",      name: "Learn",      question: "What can you learn about your health?",     x: 644, y: 532 },
];

/* Smooth spline path along the golden ribbon from entrance to center whirlpool */
const SPIRAL_PATH = "M 180 710 C 184.33 691.67, 196.67 636.00, 206 600 C 215.33 564.00, 220.67 530.67, 236 494 C 251.33 457.33, 277.00 416.33, 298 380 C 319.00 343.67, 336.67 306.33, 362 276 C 387.33 245.67, 419.33 218.33, 450 198 C 480.67 177.67, 513.33 159.00, 546 154 C 578.67 149.00, 614.00 159.00, 646 168 C 678.00 177.00, 711.33 188.33, 738 208 C 764.67 227.67, 788.00 256.33, 806 286 C 824.00 315.67, 838.00 350.67, 846 386 C 854.00 421.33, 855.67 461.00, 854 498 C 852.33 535.00, 849.00 573.33, 836 608 C 823.00 642.67, 799.67 681.67, 776 706 C 752.33 730.33, 722.33 745.67, 694 754 C 665.67 762.33, 635.33 762.33, 606 756 C 576.67 749.67, 538.33 737.00, 518 716 C 497.67 695.00, 479.67 658.50, 484 630 C 488.33 601.50, 517.33 561.33, 544 545 C 570.67 528.67, 627.33 534.17, 644 532";

/* ─────────────────────────────────────────────────────────────
   Stylized Golden Turtle SVG Component
───────────────────────────────────────────────────────────── */
function GoldenTurtle({ x, y, angle }) {
  return (
    <g transform={`translate(${x}, ${y}) rotate(${angle})`}>
      {/* Golden Aura Glow */}
      <circle cx="0" cy="0" r="28" fill="rgba(196,166,106,0.22)" filter="url(#goldTurtleBlur)" />
      <circle cx="0" cy="0" r="18" fill="rgba(216,180,110,0.35)" />

      {/* Rear Flippers */}
      <path
        d="M -9 8 Q -16 16 -13 22 Q -8 20 -5 12"
        fill="#A98B52"
        stroke="#7A6032"
        strokeWidth="1"
      />
      <path
        d="M 9 8 Q 16 16 13 22 Q 8 20 5 12"
        fill="#A98B52"
        stroke="#7A6032"
        strokeWidth="1"
      />

      {/* Front Flippers */}
      <path
        d="M -8 -6 Q -22 -14 -18 -22 Q -10 -16 -4 -9"
        fill="#C4A66A"
        stroke="#7A6032"
        strokeWidth="1.2"
      />
      <path
        d="M 8 -6 Q 22 -14 18 -22 Q 10 -16 4 -9"
        fill="#C4A66A"
        stroke="#7A6032"
        strokeWidth="1.2"
      />

      {/* Tail */}
      <path d="M 0 13 L -2 19 L 0 21 L 2 19 Z" fill="#91743E" />

      {/* Shell Body (Carapace) */}
      <ellipse
        cx="0"
        cy="2"
        rx="11"
        ry="14"
        fill="url(#turtleShellGrad)"
        stroke="#657363"
        strokeWidth="1.4"
      />

      {/* Shell Scute Patterns (Hexagonal lines) */}
      <path
        d="M 0 -8 L 4 -4 L 4 3 L 0 7 L -4 3 L -4 -4 Z"
        fill="none"
        stroke="#524323"
        strokeWidth="1"
        opacity="0.8"
      />
      <line x1="0" y1="-8" x2="0" y2="-12" stroke="#524323" strokeWidth="0.9" opacity="0.8" />
      <line x1="4" y1="-4" x2="9" y2="-7" stroke="#524323" strokeWidth="0.9" opacity="0.8" />
      <line x1="4" y1="3" x2="9" y2="6" stroke="#524323" strokeWidth="0.9" opacity="0.8" />
      <line x1="-4" y1="-4" x2="-9" y2="-7" stroke="#524323" strokeWidth="0.9" opacity="0.8" />
      <line x1="-4" y1="3" x2="-9" y2="6" stroke="#524323" strokeWidth="0.9" opacity="0.8" />
      <line x1="0" y1="7" x2="0" y2="12" stroke="#524323" strokeWidth="0.9" opacity="0.8" />

      {/* Turtle Head */}
      <ellipse
        cx="0"
        cy="-15"
        rx="4.5"
        ry="6"
        fill="#C4A66A"
        stroke="#7A6032"
        strokeWidth="1.2"
      />
      {/* Eyes */}
      <circle cx="-2.5" cy="-17" r="1" fill="#383B35" />
      <circle cx="2.5" cy="-17" r="1" fill="#383B35" />
    </g>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main DailySpiralSection Component
───────────────────────────────────────────────────────────── */
export default function DailySpiralSection() {
  const [animating, setAnimating] = useState(false);
  const [activeStop, setActiveStop] = useState(null);
  const [turtlePos, setTurtlePos] = useState(null);
  const pathRef = useRef(null);
  const animFrameRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  /* Run smooth turtle journey along the spiral */
  const runTurtle = useCallback(() => {
    if (!pathRef.current) return;
    const path = pathRef.current;
    const totalLen = path.getTotalLength();
    const duration = 7500; // 7.5 seconds smooth trip
    let startTime = null;

    setAnimating(true);

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentLen = progress * totalLen;

      const pt = path.getPointAtLength(currentLen);
      const nextPt = path.getPointAtLength(Math.min(currentLen + 2, totalLen));

      // Calculate tangent angle for natural swimming orientation (+90deg so head faces forward)
      const dx = nextPt.x - pt.x;
      const dy = nextPt.y - pt.y;
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;

      setTurtlePos({ x: pt.x, y: pt.y, angle });

      // Highlight nearest stop as the turtle passes
      const nearest = stops.find(s => {
        const dist = Math.hypot(s.x - pt.x, s.y - pt.y);
        return dist < 36;
      });
      if (nearest) {
        setActiveStop(nearest.id);
      }

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          setAnimating(false);
          setActiveStop("learn");
        }, 800);
      }
    }

    animFrameRef.current = requestAnimationFrame(step);
  }, []);

  const triggerAnimation = () => {
    if (animating) return;
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    runTurtle();
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-12 md:py-16"
      style={{ backgroundColor: T.creamBg }}
    >
      {/* ── Section Header (Clean & Minimal) ──────────────── */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-2xl px-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-2"
        >
          <div className="w-8 h-px" style={{ backgroundColor: `${T.antiqueGold}80` }} />
          <span
            className="text-[0.68rem] font-semibold tracking-[0.26em] uppercase"
            style={{ color: T.antiqueGold }}
          >
            Daily Habits
          </span>
          <div className="w-8 h-px" style={{ backgroundColor: `${T.antiqueGold}80` }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.04em] uppercase"
          style={{ color: T.charcoalOlive }}
        >
          What&apos;s Your Daily{" "}
          <span style={{ color: T.antiqueGold, fontStyle: "italic" }}>Spiral? 🌀</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.16 }}
          className="mt-3 text-sm md:text-base font-light leading-relaxed max-w-xl"
          style={{ color: `${T.charcoalOlive}CC` }}
        >
          Small habits shape how you feel, function, and look. Like a spiral that develops
          through repeated, balanced turns, your daily choices build over time.
        </motion.p>

        {/* Trace the Spiral CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.24 }}
          onClick={triggerAnimation}
          disabled={animating}
          className="mt-5 inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          style={{
            backgroundColor: animating ? T.warmTaupe : T.deepSage,
            color: T.pearlIvory,
            boxShadow: "0 6px 24px rgba(101,115,99,0.28)",
            cursor: animating ? "default" : "pointer",
          }}
        >
          {animating ? (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
              />
              <span>Turtle Journeying…</span>
            </>
          ) : (
            <>
              <span className="text-base">🐢</span>
              <span>Trace the Spiral</span>
            </>
          )}
        </motion.button>
      </div>

      {/* ── Full-Screen Fibonacci Spiral Visualizer ───────── */}
      <div className="relative z-10 w-full max-w-6xl xl:max-w-7xl px-4 sm:px-6 flex items-center justify-center">
        <div className="relative w-full aspect-[1024/768] max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl border border-[#D8CEBC]/50">
          {/* Base High-Resolution Golden Fibonacci Spiral Graphic */}
          <img
            src="/daily_spiral.png"
            alt="Ageless Longevity Fibonacci Daily Spiral"
            className="w-full h-full object-contain select-none pointer-events-none"
            loading="eager"
          />

          {/* Transparent SVG Overlay for Animation & Interactions */}
          <svg
            viewBox="0 0 1024 768"
            className="absolute inset-0 w-full h-full pointer-events-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <filter id="goldTurtleBlur" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="8" />
              </filter>
              <radialGradient id="turtleShellGrad" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#E5C583" />
                <stop offset="60%" stopColor="#C4A66A" />
                <stop offset="100%" stopColor="#7A6032" />
              </radialGradient>
              <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Hidden navigation path for the turtle */}
            <path
              ref={pathRef}
              d={SPIRAL_PATH}
              fill="none"
              stroke="transparent"
              strokeWidth="1"
            />

            {/* Interactive Hotspots for the 9 Stops */}
            {stops.map(stop => {
              const isActive = activeStop === stop.id;
              return (
                <g
                  key={stop.id}
                  className="cursor-pointer"
                  onClick={() => setActiveStop(activeStop === stop.id ? null : stop.id)}
                >
                  {/* Subtle pulsing highlight when active or visited */}
                  {isActive && (
                    <motion.circle
                      cx={stop.x}
                      cy={stop.y}
                      r="40"
                      fill="none"
                      stroke={T.champagneGold}
                      strokeWidth="2.5"
                      initial={{ scale: 0.8, opacity: 0.3 }}
                      animate={{ scale: [0.95, 1.15, 0.95], opacity: [0.9, 0.4, 0.9] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      filter="url(#nodeGlow)"
                    />
                  )}

                  {/* Invisible hit area for crisp clicking */}
                  <circle
                    cx={stop.x}
                    cy={stop.y}
                    r="34"
                    fill="transparent"
                  />
                </g>
              );
            })}

            {/* Animated Golden Turtle */}
            {turtlePos && (
              <GoldenTurtle
                x={turtlePos.x}
                y={turtlePos.y}
                angle={turtlePos.angle}
              />
            )}
          </svg>

          {/* Floating Elegant Tooltip for Active Stop */}
          <AnimatePresence>
            {activeStop && (() => {
              const current = stops.find(s => s.id === activeStop);
              if (!current) return null;
              // Calculate percent positions
              const leftPct = (current.x / 1024) * 100;
              const topPct = (current.y / 768) * 100;

              return (
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 10, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.94 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-full mb-4 z-30"
                  style={{
                    left: `${leftPct}%`,
                    top: `${topPct - 5}%`,
                  }}
                >
                  <div className="bg-[#383B35]/95 backdrop-blur-md text-[#F8F4EC] px-4 py-2.5 rounded-2xl shadow-xl border border-[#C4A66A]/40 flex flex-col items-center text-center max-w-[220px]">
                    <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#C4A66A]">
                      {current.name}
                    </span>
                    <span className="text-xs font-light text-[#F8F4EC]/90 mt-0.5 leading-snug">
                      {current.question}
                    </span>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
