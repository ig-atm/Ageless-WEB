import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SANS_FONT = {
  fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
};

/**
 * 5-Stage Header Stages & Step Progress Mapping:
 * Step 1: 0%  fill ("Start" active)
 * Step 2: 20% fill ("Start" & "Primary Goal" active)
 * Step 3: 40% fill ("Start", "Primary Goal", "Additional Support" active)
 * Step 4: 50% fill ("Start", "Primary Goal", "Additional Support" active)
 * Step 5: 65% fill ("Routine Builder" active)
 * Step 6: 80% fill ("Routine Builder" active)
 * Step 7: 100% fill ("Result" active)
 */
const STAGES = [
  { id: "start", label: "Start", minStep: 1, align: "text-left" },
  { id: "primary-goal", label: "Primary Goal", minStep: 2, align: "text-center" },
  { id: "additional-support", label: "Additional Support", minStep: 3, align: "text-center" },
  { id: "routine-builder", label: "Routine Builder", minStep: 5, align: "text-center" },
  { id: "result", label: "Result", minStep: 7, align: "text-right" },
];

const STEP_PERCENTAGES = {
  1: 0,
  2: 20,
  3: 40,
  4: 50,
  5: 65,
  6: 80,
  7: 100,
};

// Step 2: Primary Goal Options
const PRIMARY_GOAL_OPTIONS = [
  { id: "longevity", label: "Start my longevity journey", icon: "🌱" },
  { id: "energy", label: "Improve my energy levels", icon: "⚡" },
  { id: "joints", label: "Support joints, muscles, and bones", icon: "🦴" },
  { id: "athletic", label: "Support athletic performance", icon: "🏃" },
  { id: "ageing", label: "Support visible signs of ageing", icon: "✨" },
  { id: "additional", label: "I need additional support", icon: "❤️" },
];

// Step 3: Additional Support Options
const ADDITIONAL_SUPPORT_OPTIONS = [
  { id: "sleep", label: "Sleep & recovery", icon: "😴" },
  { id: "metabolism", label: "Metabolism", icon: "🔥" },
  { id: "focus", label: "Focus", icon: "🧠" },
  { id: "immunity", label: "Immunity", icon: "🛡️" },
  { id: "low-energy", label: "Low energy", icon: "🔋" },
  { id: "none", label: "No additional support", icon: "🚫" },
];

// Step 5: Health Optimisation Plan Options
const PLAN_OPTIONS = [
  { id: "simple", label: "Simple (1–3 products)" },
  { id: "essentials", label: "Essentials (up to 4 products)" },
  { id: "advanced", label: "Advanced (4+ products)" },
];

export default function RoutineQuestionnaireModal({
  isOpen = true,
  onClose = () => {},
  onCompleteRoutine,
}) {
  // State Hooks
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    primaryGoal: "",
    additionalSupport: [],
    age: "",
    plan: "",
    phone: "",
  });

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleRestart();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setFormData({
      name: "",
      primaryGoal: "",
      additionalSupport: [],
      age: "",
      plan: "",
      phone: "",
    });
  };

  // Step 2 selection handler
  const handleSelectPrimaryGoal = (goalLabel) => {
    setFormData((prev) => ({
      ...prev,
      primaryGoal: goalLabel,
    }));
  };

  // Step 3 selection handler (multi-select with "No additional support" exclusivity)
  const handleToggleAdditionalSupport = (itemLabel) => {
    setFormData((prev) => {
      const currentList = prev.additionalSupport || [];

      if (itemLabel === "No additional support") {
        const isAlreadySelected = currentList.includes("No additional support");
        return {
          ...prev,
          additionalSupport: isAlreadySelected ? [] : ["No additional support"],
        };
      }

      const filtered = currentList.filter((item) => item !== "No additional support");
      const exists = filtered.includes(itemLabel);
      const updated = exists
        ? filtered.filter((item) => item !== itemLabel)
        : [...filtered, itemLabel];

      return {
        ...prev,
        additionalSupport: updated,
      };
    });
  };

  // Step 5 selection handler
  const handleSelectPlan = (planLabel) => {
    setFormData((prev) => ({
      ...prev,
      plan: planLabel,
    }));
  };

  // Dynamic benefits resolution for Step 7
  const getDynamicBenefits = () => {
    const list = [];
    const goal = formData.primaryGoal || "";
    const extra = formData.additionalSupport || [];

    if (goal.includes("athletic") || extra.includes("Sleep & recovery")) {
      list.push("Faster recovery between workouts");
    } else if (goal.includes("energy") || extra.includes("Low energy")) {
      list.push("Sustained cellular ATP energy without crashes");
    } else if (goal.includes("longevity")) {
      list.push("Elevated NAD+ pool and cellular renewal");
    } else if (goal.includes("joints")) {
      list.push("Reinforced joint flexibility and connective tissue support");
    } else if (goal.includes("ageing")) {
      list.push("Enhanced dermal elasticity and antioxidant defense");
    }

    if (extra.includes("Metabolism") || goal.includes("Metabolism")) {
      list.push("A healthier metabolism");
    } else if (extra.includes("Focus")) {
      list.push("Sharpened cognitive clarity and daytime focus");
    } else if (extra.includes("Immunity")) {
      list.push("Strengthened immune resilience against seasonal fatigue");
    } else if (extra.includes("Sleep & recovery") && !list.includes("Faster recovery between workouts")) {
      list.push("Deeper restorative slow-wave delta sleep phases");
    }

    if (list.length === 0) {
      return ["Faster recovery between workouts", "A healthier metabolism"];
    }
    if (list.length === 1) {
      if (list[0] === "Faster recovery between workouts") {
        list.push("A healthier metabolism");
      } else {
        list.push("Faster recovery between workouts");
      }
    }
    return list.slice(0, 2);
  };

  const isStageActive = (stageMinStep) => {
    if (stageMinStep === 1) return true;
    if (stageMinStep === 2) return currentStep >= 2;
    if (stageMinStep === 3) return currentStep >= 3;
    if (stageMinStep === 5) return currentStep >= 5;
    if (stageMinStep === 7) return currentStep === 7;
    return false;
  };

  const progressPercent = STEP_PERCENTAGES[currentStep] || 0;
  const dynamicBenefits = getDynamicBenefits();

  return (
    <div
      style={SANS_FONT}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md overflow-y-auto font-sans"
    >
      {/* Background Dismiss Layer */}
      <div
        className="fixed inset-0 -z-10"
        onClick={onClose}
        aria-label="Close modal overlay"
      />

      {/* Main Modal Wrapper */}
      <motion.div
        style={SANS_FONT}
        initial={{ opacity: 0, scale: 0.97, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 14 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[1040px] w-full h-[520px] flex overflow-hidden shadow-2xl rounded-r-[24px] rounded-l-none relative my-auto bg-white font-sans"
      >
        {/* ================================================================= */}
        {/* 1. LEFT BLACK PANEL (34% width, sharp corners, py-10)             */}
        {/* ================================================================= */}
        <aside className="w-[34%] bg-[#0B0B0B] text-white px-10 py-10 flex flex-col justify-end rounded-none relative flex-shrink-0">
          <div className="flex flex-col">
            {/* Pill Badge */}
            <div
              style={SANS_FONT}
              className="bg-[#2C2C2C] text-white/90 text-xs font-medium px-4 py-1.5 rounded-full w-fit mb-4"
            >
              Personalised
            </div>

            {/* Main Heading (Explicit Sans-Serif font override) */}
            <h2
              style={SANS_FONT}
              className="text-[28px] font-bold leading-[1.2] tracking-tight text-white mb-3"
            >
              Build a Routine, Build Better Health.
            </h2>

            {/* Subtext */}
            <p
              style={SANS_FONT}
              className="text-[14px] text-white/80 leading-relaxed font-normal"
            >
              Because every wellness journey is unique, yours begins with a few questions.
            </p>
          </div>
        </aside>

        {/* ================================================================= */}
        {/* 2. RIGHT WHITE PANEL (66% width, rounded-r-[24px], py-10, px-12)  */}
        {/* ================================================================= */}
        <section className="w-[66%] bg-white px-12 py-10 flex flex-col justify-between relative rounded-r-[24px] text-[#111827]">
          {/* Close (✕) Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-6 right-6 text-gray-900 hover:opacity-70 transition p-2 rounded-full hover:bg-gray-100 z-20 flex items-center justify-center w-8 h-8"
          >
            <span className="text-xl leading-none">✕</span>
          </button>

          {/* TOP CONTAINER: Progress Track + Question Area (Always mt-8 below track) */}
          <div className="w-full flex flex-col">
            {/* Top Progress Header Container */}
            <div className="w-full">
              {/* Progress Track: w-full h-[4px] bg-[#EAECEF] rounded-full */}
              <div className="w-full h-[4px] bg-[#EAECEF] rounded-full overflow-hidden mb-2.5">
                <motion.div
                  className="h-full bg-[#111111] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              {/* Labels Row: grid grid-cols-5 w-full text-[12px] */}
              <div className="grid grid-cols-5 w-full text-[12px]" style={SANS_FONT}>
                {STAGES.map((stage) => {
                  const active = isStageActive(stage.minStep);
                  return (
                    <span
                      key={stage.id}
                      className={`${stage.align} transition-colors duration-200 ${
                        active ? "text-[#111111] font-semibold" : "text-[#9CA3AF] font-normal"
                      }`}
                    >
                      {stage.label}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* QUESTION AREA: Consistently starts mt-8 (32px) below progress labels */}
            <div className="w-full mt-8">
              <AnimatePresence mode="wait">
                {/* STEP 1: NAME INPUT */}
                {currentStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.22 }}
                    className="w-full"
                  >
                    <h3
                      style={SANS_FONT}
                      className="text-[26px] font-bold text-[#111827] leading-[1.3] mb-5 max-w-[540px]"
                    >
                      Hello — let's build you a supplement plan tailored to your needs.
                    </h3>

                    <label
                      style={SANS_FONT}
                      className="block text-[15px] font-semibold text-[#111827] mb-5"
                    >
                      Your name is
                    </label>

                    <input
                      type="text"
                      autoFocus
                      placeholder="e.g. Erica"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleNext();
                        }
                      }}
                      style={SANS_FONT}
                      className="w-[68%] border-b-[1.5px] border-[#111827] pb-2 text-[16px] text-[#111827] placeholder-[#8E95A2] focus:outline-none bg-transparent"
                    />
                  </motion.div>
                )}

                {/* STEP 2: PRIMARY GOAL */}
                {currentStep === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.22 }}
                    className="w-full"
                  >
                    <h3
                      style={SANS_FONT}
                      className="text-[24px] font-bold text-[#111827] leading-[1.3] mb-1.5"
                    >
                      Great, {formData.name.trim() || "there"}. What's your main goal over the next few months?
                    </h3>
                    <p style={SANS_FONT} className="text-gray-500 text-[13px] mb-4">
                      Pick the one outcome that matters most to you right now.
                    </p>

                    <div className="grid grid-cols-2 gap-2.5 max-h-[240px] overflow-y-auto pr-1">
                      {PRIMARY_GOAL_OPTIONS.map((goal) => {
                        const isSelected = formData.primaryGoal === goal.label;
                        return (
                          <div
                            key={goal.id}
                            onClick={() => handleSelectPrimaryGoal(goal.label)}
                            className={`p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer text-left ${
                              isSelected
                                ? "border-gray-500 bg-gray-50/70 shadow-xs"
                                : "border-gray-200 bg-white hover:border-gray-300"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm">
                                <span>{goal.icon}</span>
                              </div>
                              <span
                                style={SANS_FONT}
                                className="text-[13px] font-semibold text-[#111827] leading-tight"
                              >
                                {goal.label}
                              </span>
                            </div>

                            <div
                              className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ml-2 transition-all ${
                                isSelected
                                  ? "border-2 border-gray-900 bg-gray-900"
                                  : "border border-gray-300"
                              }`}
                            >
                              {isSelected && (
                                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: ADDITIONAL SUPPORT */}
                {currentStep === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.22 }}
                    className="w-full"
                  >
                    <h3
                      style={SANS_FONT}
                      className="text-[24px] font-bold text-[#111827] leading-[1.3] mb-1.5"
                    >
                      Any areas where you'd like extra support?
                    </h3>
                    <p style={SANS_FONT} className="text-gray-500 text-[13px] mb-4">
                      This helps us fine-tune your stack. If nothing applies, that's fine too.
                    </p>

                    <div className="grid grid-cols-2 gap-2.5 max-h-[240px] overflow-y-auto pr-1">
                      {ADDITIONAL_SUPPORT_OPTIONS.map((item) => {
                        const isSelected = (formData.additionalSupport || []).includes(item.label);
                        return (
                          <div
                            key={item.id}
                            onClick={() => handleToggleAdditionalSupport(item.label)}
                            className={`p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer text-left ${
                              isSelected
                                ? "border-gray-500 bg-gray-50/70 shadow-xs"
                                : "border-gray-200 bg-white hover:border-gray-300"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm">
                                <span>{item.icon}</span>
                              </div>
                              <span
                                style={SANS_FONT}
                                className="text-[13px] font-semibold text-[#111827] leading-tight"
                              >
                                {item.label}
                              </span>
                            </div>

                            <div
                              className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ml-2 transition-all ${
                                isSelected
                                  ? "border-2 border-gray-900 bg-gray-900"
                                  : "border border-gray-300"
                              }`}
                            >
                              {isSelected && (
                                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: AGE INPUT */}
                {currentStep === 4 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.22 }}
                    className="w-full"
                  >
                    <h3
                      style={SANS_FONT}
                      className="text-[26px] font-bold text-[#111827] leading-[1.3] mb-2 max-w-[540px]"
                    >
                      Different ages need different support.
                    </h3>
                    <p style={SANS_FONT} className="text-gray-500 text-[13px] mb-5">
                      Your age helps us match the right dosages to where your body is right now.
                    </p>

                    <label
                      style={SANS_FONT}
                      className="block text-[15px] font-semibold text-[#111827] mb-5"
                    >
                      Your age is
                    </label>

                    <input
                      type="number"
                      autoFocus
                      placeholder="e.g. 34"
                      value={formData.age}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, age: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleNext();
                        }
                      }}
                      style={SANS_FONT}
                      className="w-[68%] border-b-[1.5px] border-[#111827] pb-2 text-[16px] text-[#111827] placeholder-[#8E95A2] focus:outline-none bg-transparent"
                    />
                  </motion.div>
                )}

                {/* STEP 5: HEALTH OPTIMISATION PLAN */}
                {currentStep === 5 && (
                  <motion.div
                    key="step-5"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.22 }}
                    className="w-full"
                  >
                    <h3
                      style={SANS_FONT}
                      className="text-[24px] font-bold text-[#111827] leading-[1.3] mb-1.5"
                    >
                      Pick your health optimisation plan
                    </h3>
                    <p style={SANS_FONT} className="text-gray-500 text-[13px] mb-4">
                      This helps us keep your routine manageable. You can always scale up later.
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      {PLAN_OPTIONS.map((planOption) => {
                        const isSelected = formData.plan === planOption.label;
                        return (
                          <div
                            key={planOption.id}
                            onClick={() => handleSelectPlan(planOption.label)}
                            className={`p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer text-left ${
                              isSelected
                                ? "border-gray-500 bg-gray-50/70 shadow-xs"
                                : "border-gray-200 bg-white hover:border-gray-300"
                            }`}
                          >
                            <span
                              style={SANS_FONT}
                              className="text-[13px] font-semibold text-[#111827] leading-tight"
                            >
                              {planOption.label}
                            </span>

                            <div
                              className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ml-2 transition-all ${
                                isSelected
                                  ? "border-2 border-gray-900 bg-gray-900"
                                  : "border border-gray-300"
                              }`}
                            >
                              {isSelected && (
                                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 6: LEAD CAPTURE / PHONE NUMBER */}
                {currentStep === 6 && (
                  <motion.div
                    key="step-6"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.22 }}
                    className="w-full"
                  >
                    <h3
                      style={SANS_FONT}
                      className="text-[26px] font-bold text-[#111827] leading-[1.3] mb-2 max-w-[540px]"
                    >
                      Receive your personalised plan
                    </h3>
                    <p style={SANS_FONT} className="text-gray-500 text-[13px] mb-5">
                      We'll use this to send your results — no spam, ever.
                    </p>

                    <label
                      style={SANS_FONT}
                      className="block text-[15px] font-semibold text-[#111827] mb-5"
                    >
                      Phone number
                    </label>

                    <input
                      type="tel"
                      autoFocus
                      placeholder="e.g. 98765 43210"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, phone: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleNext();
                        }
                      }}
                      style={SANS_FONT}
                      className="w-[68%] border-b-[1.5px] border-[#111827] pb-2 text-[16px] text-[#111827] placeholder-[#8E95A2] focus:outline-none bg-transparent"
                    />
                  </motion.div>
                )}

                {/* STEP 7: RESULT */}
                {currentStep === 7 && (
                  <motion.div
                    key="step-7"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.22 }}
                    className="w-full"
                  >
                    <div>
                      <h3
                        style={SANS_FONT}
                        className="text-[22px] font-bold text-[#111111] tracking-tight mb-1"
                      >
                        Hi {formData.name.trim() || "Atharva"}, here's your starter routine.
                      </h3>
                      <p style={SANS_FONT} className="text-gray-500 text-[13px] mb-3 font-normal">
                        The plan is customised to address your health goals.
                      </p>
                    </div>

                    {/* Dynamic Benefits List */}
                    <div className="space-y-1 mb-3">
                      {dynamicBenefits.map((benefit, index) => (
                        <div
                          key={index}
                          style={SANS_FONT}
                          className="flex items-center gap-2 text-[14px] font-normal text-[#1F2937]"
                        >
                          <span className="text-[#D4A72C] font-bold text-sm leading-none">→</span>
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {/* Social Proof Callout Box */}
                    <div
                      style={SANS_FONT}
                      className="bg-[#FDF6E9] rounded-xl px-4 py-3 my-2.5 border-none text-[13px]"
                    >
                      <p className="not-italic font-normal text-[#1F2937] mb-0.5">
                        “After 3 months, I could genuinely feel the difference.”
                      </p>
                      <p className="text-[#374151] text-[12px] font-normal">
                        — 73% of verified customers
                      </p>
                    </div>

                    {/* Routine Cards Grid */}
                    <div className="grid grid-cols-2 gap-3 mt-2.5">
                      <div className="bg-[#1B1C1E] text-white py-3.5 px-4 rounded-xl shadow-xs">
                        <p style={SANS_FONT} className="text-[14px] font-bold text-white mb-0.5">
                          Morning
                        </p>
                        <p style={SANS_FONT} className="text-[12px] text-white/80 font-normal">
                          Core support formula
                        </p>
                      </div>

                      <div className="bg-[#26303A] text-white py-3.5 px-4 rounded-xl shadow-xs">
                        <p style={SANS_FONT} className="text-[14px] font-bold text-white mb-0.5">
                          Night
                        </p>
                        <p style={SANS_FONT} className="text-[12px] text-white/80 font-normal">
                          Recovery & repair formula
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* =============================================================== */}
          {/* 3. BOTTOM NAVIGATION FOOTER (Anchored at the bottom)             */}
          {/* =============================================================== */}
          <footer className="w-full flex items-center justify-between mt-auto pt-2">
            {/* Left Button: ← Back */}
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
              style={SANS_FONT}
              className={`border-[1.5px] border-[#CDA33B] text-[#A67C1E] font-bold text-sm px-8 py-2.5 rounded-full hover:bg-amber-50/50 transition duration-200 ${
                currentStep === 1 ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              ← Back
            </button>

            {/* Right Button: Next → or Restart */}
            <button
              type="button"
              onClick={handleNext}
              style={SANS_FONT}
              className="bg-[#D5B14D] text-[#111111] font-bold text-sm px-9 py-2.5 rounded-full hover:bg-[#c4a13e] transition duration-200 cursor-pointer shadow-xs active:scale-95"
            >
              {currentStep === 7 ? "Restart" : "Next →"}
            </button>
          </footer>
        </section>
      </motion.div>
    </div>
  );
}
