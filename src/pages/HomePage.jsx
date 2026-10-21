import React from "react";
import HomeHero from "../HomeHero";
import PhilosophySection from "../PhilosophySection";
import AboutSection from "../AboutSection";
import AgelessProductGrid from "../AgelessProductGrid";
import CtaAndFooter from "../CtaAndFooter";

export default function HomePage({ onAddToCart, onOpenQuestionnaire }) {
  return (
    <div className="w-full">
      {/* 1. Luxurious Calming Hero Section with Framer Motion Stagger */}
      <HomeHero onOpenQuestionnaire={onOpenQuestionnaire} />

      {/* 2. Customer-Facing Product Grid */}
      <div id="shop-preview">
        <AgelessProductGrid onAddToCart={onAddToCart} />
      </div>

      {/* 3. Brand Philosophy */}
      <div id="philosophy-preview">
        <PhilosophySection />
      </div>

      {/* 4. About Us & Scientific Rigor */}
      <div id="about-preview">
        <AboutSection />
      </div>

      {/* 5. CTA & Brand Footer */}
      <CtaAndFooter />
    </div>
  );
}
