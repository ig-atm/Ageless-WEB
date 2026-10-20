import React, { useState } from "react";
import { motion } from "framer-motion";

/**
 * 9 Interactive Nodes situated along the Fibonacci Spiral
 * Points correspond precisely to sequential arc intersections and midpoints
 * along the Golden Spiral path.
 */
export const spiralNodes = [
  {
    id: 1,
    title: "Hydrate",
    emoji: "💧",
    x: 40.56,
    y: 63.05,
    type: "intersection",
    description: "Support cellular hydration and metabolic transport.",
  },
  {
    id: 2,
    title: "Move",
    emoji: "🏋️",
    x: 37.14,
    y: 71.30,
    type: "midpoint",
    description: "Stimulate muscular density and blood circulation.",
  },
  {
    id: 3,
    title: "Nourish",
    emoji: "🌿",
    x: 28.89,
    y: 74.72,
    type: "intersection",
    description: "Provide dense micronutrients and antioxidant defense.",
  },
  {
    id: 4,
    title: "Supplement",
    emoji: "💊",
    x: 15.53,
    y: 69.19,
    type: "midpoint",
    description: "Targeted longevity actives: NAD+, Berberine & Marine Collagen.",
  },
  {
    id: 5,
    title: "Breathe",
    emoji: "🫁",
    x: 10.00,
    y: 55.84,
    type: "intersection",
    description: "Shift into parasympathetic autonomic ease.",
  },
  {
    id: 6,
    title: "Restore",
    emoji: "🧘",
    x: 18.95,
    y: 34.23,
    type: "midpoint",
    description: "Deep slow-wave restorative sleep and cellular repair.",
  },
  {
    id: 7,
    title: "Connect",
    emoji: "🤝",
    x: 40.56,
    y: 25.28,
    type: "intersection",
    description: "Foster community, shared longevity, and positive emotion.",
  },
  {
    id: 8,
    title: "Reflect",
    emoji: "🧠",
    x: 75.52,
    y: 39.76,
    type: "midpoint",
    description: "Quiet stillness to integrate learning and lower cortisol.",
  },
  {
    id: 9,
    title: "Learn",
    emoji: "📖",
    x: 90.00,
    y: 74.72,
    type: "intersection",
    description: "Continual expansion of mind, knowledge, and neuroplasticity.",
  },
];

/**
 * FibonacciSpiral Component
 *
 * An interactive "Daily Spiral" graphic representing the Golden Spiral (Fibonacci sequence).
 * Features sequential step-by-step tracing along the golden curve with Framer Motion.
 */
export default function FibonacciSpiral() {
  const [currentStep, setCurrentStep] = useState(0);

  // True Golden Spiral SVG path constructed from sequential quarter-circle arcs (G1 continuous)
  // Radii: 1.70 -> 2.76 -> 4.46 -> 7.21 -> 11.67 -> 18.89 -> 30.56 -> 49.44 (scaling by phi ≈ 1.618)
  // Coordinates precisely centered within viewBox 0 0 100 100
  const goldenSpiralPath =
    "M 33.34 61.35 " +
    "A 1.70 1.70 0 0 1 31.64 63.05 " +
    "A 2.76 2.76 0 0 1 28.89 60.29 " +
    "A 4.46 4.46 0 0 1 33.34 55.84 " +
    "A 7.21 7.21 0 0 1 40.56 63.05 " +
    "A 11.67 11.67 0 0 1 28.89 74.72 " +
    "A 18.89 18.89 0 0 1 10.00 55.84 " +
    "A 30.56 30.56 0 0 1 40.56 25.28 " +
    "A 49.44 49.44 0 0 1 90.00 74.72";

  const handleTraceClick = () => {
    setCurrentStep((prev) => (prev >= 9 ? 0 : prev + 1));
  };

  const activeNodeInfo = currentStep > 0 ? spiralNodes[currentStep - 1] : null;

  return (
    <div className="min-h-screen bg-[#F8F4EC] text-[#383B35] flex flex-col items-center justify-center px-4 py-12 md:py-16 select-none">
      <div className="w-full max-w-3xl flex flex-col items-center text-center space-y-6">
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-4 max-w-xl"
        >
          <span className="text-xs uppercase tracking-[0.28em] text-[#383B35]/60 font-medium">
            Natural Compounding &amp; Rhythm
          </span>
          <h1 className="font-serif italic text-3xl sm:text-4xl md:text-5xl tracking-wide text-[#91ACB5] font-normal leading-tight">
            WHAT IS YOUR DAILY SPIRAL?
          </h1>
          <p className="text-sm sm:text-base text-[#383B35]/80 font-normal leading-relaxed max-w-lg mx-auto">
            Like the quiet geometry of nature, small intentional rituals build upon one
            another over time. Each day’s mindful choice compounds exponentially—expanding outward
            into enduring vitality, clarity, and cellular longevity.
          </p>

          {/* TRACE THE SPIRAL Button */}
          <div className="pt-2 flex flex-col items-center gap-2">
            <motion.button
              onClick={handleTraceClick}
              whileHover={{ scale: 1.04, backgroundColor: "#536151" }}
              whileTap={{ scale: 0.96 }}
              className="px-7 py-2.5 sm:px-9 sm:py-3 bg-[#657363] text-white font-medium text-xs sm:text-sm tracking-[0.2em] uppercase rounded-full shadow-md hover:shadow-lg transition-colors duration-200 flex items-center gap-2"
            >
              <span>{currentStep === 9 ? "RESET SPIRAL" : "TRACE THE SPIRAL"}</span>
              <span className="text-xs opacity-75 font-mono">
                ({currentStep}/9)
              </span>
            </motion.button>

            {/* Active habit subtitle tooltip */}
            <div className="h-6">
              {activeNodeInfo ? (
                <motion.p
                  key={activeNodeInfo.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-[#383B35]/85 italic font-serif"
                >
                  Step {activeNodeInfo.id}: {activeNodeInfo.title} — {activeNodeInfo.description}
                </motion.p>
              ) : (
                <p className="text-xs text-[#383B35]/40 italic font-serif">
                  Click to trace your compounding daily rituals
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Square Aspect Ratio SVG & Interactive Nodes Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md sm:max-w-lg aspect-square relative flex items-center justify-center p-4 sm:p-6"
        >
          {/* Base SVG Canvas */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full overflow-visible"
            aria-label="Golden Fibonacci Spiral Graphic"
          >
            {/* Ambient center point */}
            <circle
              cx="33.34"
              cy="61.35"
              r="0.75"
              fill="#D8B4AE"
              opacity="0.6"
            />

            {/* Base Fibonacci Spiral Track */}
            <path
              d={goldenSpiralPath}
              fill="none"
              stroke="#D8B4AE"
              strokeWidth="0.5"
              strokeOpacity="0.4"
              strokeLinecap="round"
            />

            {/* Animated Highlight Line (Champagne Gold) */}
            <motion.path
              d={goldenSpiralPath}
              fill="none"
              stroke="#C4A66A"
              strokeWidth="1"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: currentStep / 9 }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
              }}
            />
          </svg>

          {/* Interactive Nodes Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {spiralNodes.map((node, index) => {
              const isCompleted = index < currentStep;
              const isActive = index === currentStep - 1;

              return (
                <motion.div
                  key={node.id}
                  onClick={() => setCurrentStep(index + 1)}
                  className="absolute flex flex-col items-center pointer-events-auto cursor-pointer group"
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  animate={
                    isActive
                      ? {
                          opacity: 1,
                          scale: [1.16, 1.24, 1.16],
                        }
                      : {
                          opacity: isCompleted ? 1 : 0.3,
                          scale: isCompleted ? 1 : 0.92,
                        }
                  }
                  transition={
                    isActive
                      ? {
                          scale: {
                            repeat: Infinity,
                            duration: 1.8,
                            ease: "easeInOut",
                          },
                          opacity: { duration: 0.4 },
                        }
                      : {
                          duration: 0.45,
                          ease: "easeInOut",
                        }
                  }
                  whileHover={{ scale: 1.22 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Circular Icon Container */}
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted
                        ? "bg-white border-2 border-[#C4A66A] shadow-md"
                        : "bg-[#E5DFD5] border border-transparent shadow-sm"
                    } ${isActive ? "ring-2 ring-[#C4A66A]/40 ring-offset-2 ring-offset-[#F8F4EC]" : ""}`}
                  >
                    <span
                      className="text-sm sm:text-base select-none leading-none"
                      role="img"
                      aria-label={node.title}
                    >
                      {node.emoji}
                    </span>
                  </div>

                  {/* Text Label sitting just below it */}
                  <span
                    className={`mt-1 text-[10px] sm:text-xs tracking-wide whitespace-nowrap px-1.5 py-0.5 rounded shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-colors duration-300 ${
                      isCompleted
                        ? "font-semibold text-[#383B35] bg-white/90 border border-[#C4A66A]/30"
                        : "font-normal text-[#383B35]/70 bg-[#F8F4EC]/90"
                    }`}
                  >
                    {node.title}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
