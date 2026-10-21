import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ cartCount = 0, onOpenCart, onOpenQuestionnaire }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Trigger as user scrolls down past 50px
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Our Philosophy", path: "/philosophy" },
    { name: "Daily Spiral", path: "/spiral" },
  ];

  return (
    <motion.header
      animate={{
        paddingTop: scrolled ? "0.65rem" : "1.25rem",
        paddingBottom: scrolled ? "0.65rem" : "1.25rem",
        backdropFilter: scrolled ? "blur(24px)" : "blur(12px)",
        WebkitBackdropFilter: scrolled ? "blur(24px)" : "blur(12px)",
        backgroundColor: scrolled ? "rgba(248, 244, 236, 0.88)" : "rgba(248, 244, 236, 0.70)",
        borderBottomColor: scrolled ? "rgba(56, 59, 53, 0.12)" : "rgba(56, 59, 53, 0)",
        boxShadow: scrolled ? "0 8px 30px rgba(56, 59, 53, 0.05)" : "0 0 0 rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md bg-[#F8F4EC]/70"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
        {/* Brand Logo - Far Left */}
        <div className="flex-1 flex items-center justify-start">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="inline-flex items-center"
          >
            <Link
              to="/"
              className="inline-flex items-center focus:outline-none"
              aria-label="Ageless Longevity Home"
            >
              <img
                src="/ageless-logo.webp"
                alt="Ageless Longevity Logo"
                className="h-12 w-auto object-contain"
              />
            </Link>
          </motion.div>
        </div>

        {/* Desktop Navigation Links - Centered */}
        <nav className="hidden md:flex items-center justify-center gap-8 lg:gap-10">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xs uppercase font-medium tracking-[0.16em] transition-all relative py-1 ${
                  isActive
                    ? "text-[#383B35] font-semibold"
                    : "text-[#383B35]/70 hover:text-[#383B35]"
                }`}
              >
                <span>{link.name}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#9EAA96] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons (Cart & Shop CTA) - Far Right */}
        <div className="flex-1 flex items-center justify-end gap-3 sm:gap-4">
          <motion.button
            type="button"
            onClick={onOpenCart}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="relative p-2 rounded-full text-[#383B35] hover:bg-black/5 transition-colors focus:outline-none"
            title="Open Slide-out Cart"
            aria-label="Open Cart"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#D8B4AE] text-[#383B35] text-[10px] font-bold flex items-center justify-center animate-scale-in shadow-xs">
                {cartCount}
              </span>
            )}
          </motion.button>

          {/* Build Routine Questionnaire Trigger Button */}
          {onOpenQuestionnaire && (
            <motion.button
              type="button"
              onClick={onOpenQuestionnaire}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.14em] border border-[#D4AF37] text-[#B58E24] hover:bg-amber-50/70 transition-all shadow-xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span>Build Routine</span>
            </motion.button>
          )}

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="hidden sm:block"
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-[0.14em] bg-[#383B35] text-[#F8F4EC] hover:bg-[#657363] transition-all shadow-sm"
            >
              <span>Explore Shop</span>
              <span className="text-[10px]">→</span>
            </Link>
          </motion.div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 text-[#383B35] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <span
              className={`w-5 h-0.5 rounded-full bg-[#383B35] transition-all duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 rounded-full bg-[#383B35] my-1 transition-all duration-300 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 rounded-full bg-[#383B35] transition-all duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu with Glassmorphic styling */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#F8F4EC]/95 backdrop-blur-2xl border-b border-[#383B35]/10 px-8 py-6 shadow-xl flex flex-col gap-4 overflow-hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-base font-serif text-[#383B35] hover:text-[#657363] py-2 border-b border-[#383B35]/5 flex items-center justify-between"
              >
                <span>{link.name}</span>
              </Link>
            ))}

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenCart) onOpenCart();
              }}
              className="text-base font-serif text-[#383B35] hover:text-[#657363] py-2 border-b border-[#383B35]/5 flex items-center justify-between text-left"
            >
              <span>View Cart</span>
              {cartCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#D8B4AE] text-xs font-sans font-semibold">
                  {cartCount} items
                </span>
              )}
            </button>

            {onOpenQuestionnaire && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuestionnaire();
                }}
                className="w-full py-3 rounded-full text-xs font-semibold uppercase tracking-[0.14em] border border-[#D4AF37] text-[#B58E24] hover:bg-amber-50 transition-all flex items-center justify-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span>Build Routine Questionnaire</span>
              </button>
            )}

            <Link
              to="/shop"
              className="mt-1 text-center text-xs font-semibold uppercase tracking-widest bg-[#383B35] text-[#F8F4EC] py-3.5 rounded-full shadow-md"
            >
              Shop All Formulations
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
