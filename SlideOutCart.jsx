import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function SlideOutCart({
  isOpen,
  onClose,
  items = [],
  onUpdateQuantity,
  onRemoveItem,
}) {
  // Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
  const freeShippingThreshold = 100;
  const isFreeShipping = subtotal >= freeShippingThreshold;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Blurred Dark Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1A1C18]/60 backdrop-blur-sm"
          />

          {/* Slide-out Panel from Right */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 32,
              }}
              className="w-screen max-w-md bg-[#F8F4EC] border-l border-[#D9CDB8] shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#E8DEC8] bg-white/70 backdrop-blur-md flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#657363]">
                    Your Protocol Bag
                  </span>
                  <h2 className="font-serif text-2xl font-light text-[#383B35]">
                    Cart ({items.reduce((acc, it) => acc + it.quantity, 0)})
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close cart drawer"
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-[#F8F4EC] hover:bg-white text-[#383B35] border border-[#D9CDB8] shadow-xs hover:scale-105 active:scale-95 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Free Express Shipping Meter */}
              <div className="px-6 py-3.5 bg-white/50 border-b border-[#E8DEC8]">
                <div className="flex items-center justify-between text-xs text-[#383B35] mb-1.5 font-medium">
                  <span>
                    {isFreeShipping ? (
                      <span className="text-[#657363] font-semibold">✓ Free Express Courier Unlocked!</span>
                    ) : (
                      <span>Add <strong>${(freeShippingThreshold - subtotal).toFixed(2)}</strong> for Free Express Shipping</span>
                    )}
                  </span>
                  <span className="font-mono text-[11px] text-[#6B6E65]">
                    ${subtotal.toFixed(0)} / ${freeShippingThreshold}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#E8DEC8] overflow-hidden">
                  <div
                    className="h-full bg-[#9EAA96] transition-all duration-500 rounded-full"
                    style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-white/80 border border-[#D9CDB8] flex items-center justify-center text-2xl text-[#383B35]/40 font-serif">
                      ◈
                    </div>
                    <div>
                      <p className="font-serif text-xl text-[#383B35]">Your Bag is Empty</p>
                      <p className="text-xs text-[#6B6E65] mt-1 max-w-xs leading-relaxed">
                        Explore our evidence-informed formulations to start your personalized daily protocol.
                      </p>
                    </div>
                    <Link
                      to="/shop"
                      onClick={onClose}
                      className="px-6 py-2.5 rounded-full bg-[#383B35] text-[#F8F4EC] text-xs font-semibold uppercase tracking-wider hover:bg-[#657363] transition-all"
                    >
                      Shop Formulations →
                    </Link>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      className="p-4 rounded-2xl bg-white/85 border border-[#E8DEC8] shadow-xs flex items-center gap-4 relative group"
                    >
                      {/* Product Accent Badge / Icon */}
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center font-serif text-base font-light flex-shrink-0"
                        style={{
                          backgroundColor: `${item.accentColor || "#B99B89"}25`,
                          color: item.accentColor || "#383B35",
                          border: `1px solid ${item.accentColor || "#B99B89"}50`,
                        }}
                      >
                        ◈
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] uppercase tracking-wider font-semibold text-[#657363] block">
                          {item.category || "Longevity Protocol"}
                        </span>
                        <h4 className="font-serif text-base text-[#383B35] font-normal truncate">
                          {item.title}
                        </h4>
                        <p className="text-xs font-semibold text-[#383B35] mt-0.5">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Stepper */}
                      <div className="flex items-center border border-[#D9CDB8] rounded-full bg-[#F8F4EC] px-2 py-0.5">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-5 h-5 flex items-center justify-center text-xs text-[#383B35] hover:text-[#657363]"
                        >
                          –
                        </button>
                        <span className="w-5 text-center text-xs font-semibold text-[#383B35]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-5 h-5 flex items-center justify-center text-xs text-[#383B35] hover:text-[#657363]"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        title="Remove formulation"
                        className="text-[#6B6E65] hover:text-rose-600 p-1 transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer / Summary / Checkout Button */}
              {items.length > 0 && (
                <div className="p-6 bg-white/90 border-t border-[#E8DEC8] space-y-4">
                  <div className="space-y-1.5 text-xs text-[#383B35]">
                    <div className="flex items-center justify-between">
                      <span className="text-[#6B6E65]">Subtotal</span>
                      <span className="font-semibold text-sm">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[#6B6E65]">
                      <span>Carbon-Neutral Express Shipping</span>
                      <span>{isFreeShipping ? <strong className="text-[#657363]">FREE</strong> : "$8.50"}</span>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Link
                      to="/cart"
                      onClick={onClose}
                      className="w-full py-4 rounded-full bg-[#383B35] text-[#F8F4EC] text-xs font-semibold uppercase tracking-widest hover:bg-[#657363] transition-colors shadow-md flex items-center justify-center gap-2"
                    >
                      <span>Proceed to Checkout</span>
                      <span className="text-sm">→</span>
                    </Link>
                  </motion.div>

                  <p className="text-[10px] text-center text-[#6B6E65]">
                    🔒 256-Bit SSL Encrypted • 30-Day Happiness Guarantee
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
