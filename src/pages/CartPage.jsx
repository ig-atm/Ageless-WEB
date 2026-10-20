import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CtaAndFooter from "../CtaAndFooter";

export default function CartPage({ cartItems, onUpdateQuantity, onRemoveItem }) {
  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Fallback initial items if cart is empty for demonstration
  const [demoItems, setDemoItems] = useState([
    {
      id: "deep-sleep",
      title: "Deep Sleep",
      category: "Rest & Circadian Rhythm",
      price: 64.0,
      quantity: 1,
      accentColor: "#B99B89",
      size: "60 Vegan Capsules"
    },
    {
      id: "glass-glow",
      title: "Glass Glow",
      category: "Skin, Hair & Cellular Matrix",
      price: 78.0,
      quantity: 1,
      accentColor: "#D8B4AE",
      size: "180g Botanical Elixir"
    }
  ]);

  const items = (cartItems && cartItems.length > 0) ? cartItems : demoItems;

  const handleQty = (id, delta) => {
    if (onUpdateQuantity) {
      onUpdateQuantity(id, delta);
    } else {
      setDemoItems((prev) =>
        prev
          .map((it) => (it.id === id ? { ...it, quantity: Math.max(1, it.quantity + delta) } : it))
      );
    }
  };

  const handleRemove = (id) => {
    if (onRemoveItem) {
      onRemoveItem(id);
    } else {
      setDemoItems((prev) => prev.filter((it) => it.id !== id));
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = discountApplied ? subtotal * 0.1 : 0;
  const freeShippingThreshold = 100;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 8.5;
  const total = subtotal - discount + shipping;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "AGELESS10" || promoCode.trim().toUpperCase() === "LONGEVITY") {
      setDiscountApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid code. Try 'AGELESS10' for 10% off.");
    }
  };

  return (
    <div className="w-full pt-28 pb-16 bg-[#F8F4EC] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Title */}
        <div className="mb-10 text-center sm:text-left">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#657363]">
            Your Protocol Bag
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#383B35] font-light mt-1">
            Shopping Cart ({items.length})
          </h1>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="mb-8 p-4 rounded-2xl bg-white/80 border border-[#E8DEC8] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#383B35] mb-2 font-medium">
            <span>
              {subtotal >= freeShippingThreshold ? (
                <span className="text-[#9EAA96] font-semibold">✓ You have unlocked Complimentary Express Shipping!</span>
              ) : (
                <span>Add <strong>${(freeShippingThreshold - subtotal).toFixed(2)}</strong> more to unlock Free Express Courier</span>
              )}
            </span>
            <span className="font-mono text-[11px] text-[#6B6E65]">
              ${subtotal.toFixed(0)} / ${freeShippingThreshold}
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#F0EBE1] overflow-hidden">
            <div
              className="h-full bg-[#9EAA96] transition-all duration-500 rounded-full"
              style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
            />
          </div>
        </div>

        {items.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white/80 border border-[#E8DEC8]">
            <p className="font-serif text-2xl text-[#383B35] mb-2">Your Bag is Empty</p>
            <p className="text-sm text-[#6B6E65] mb-6">Explore our targeted formulations to start your daily protocol.</p>
            <Link
              to="/shop"
              className="inline-flex items-center px-6 py-3 rounded-full bg-[#383B35] text-[#F8F4EC] text-xs font-semibold tracking-wider uppercase hover:bg-[#657363] transition-all"
            >
              Shop Collection →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Cart Items List */}
            <div className="lg:col-span-7 space-y-4">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  className="p-5 rounded-2xl bg-white/85 border border-[#E8DEC8] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center font-serif text-lg font-light flex-shrink-0"
                      style={{ backgroundColor: `${item.accentColor || "#B99B89"}25`, color: item.accentColor || "#383B35" }}
                    >
                      ◈
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#657363]">
                        {item.category || "Longevity Supplement"}
                      </span>
                      <h3 className="font-serif text-lg text-[#383B35] font-normal">{item.title}</h3>
                      <p className="text-xs text-[#6B6E65]">{item.size || "Standard Supply"}</p>
                      <p className="text-sm font-semibold text-[#383B35] mt-1">${item.price.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div className="flex items-center gap-4 self-end sm:self-center">
                    <div className="flex items-center border border-[#D9CDB8] rounded-full bg-[#F8F4EC] px-2.5 py-1">
                      <button
                        type="button"
                        onClick={() => handleQty(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center text-[#383B35] hover:text-[#657363]"
                      >
                        –
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-[#383B35]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQty(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center text-[#383B35] hover:text-[#657363]"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      className="text-xs text-rose-500 hover:text-rose-700 underline underline-offset-2"
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}

              <div className="pt-4 flex items-center justify-between text-xs">
                <Link to="/shop" className="text-[#657363] hover:text-[#383B35] underline underline-offset-4 font-medium">
                  ← Continue Shopping
                </Link>
                <span className="text-[#6B6E65]">30-Day Happiness Guarantee on All Orders</span>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white/90 border border-[#E8DEC8] shadow-sm space-y-6">
              <h3 className="font-serif text-2xl font-light text-[#383B35] border-b border-[#F0EBE1] pb-4">
                Order Summary
              </h3>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#383B35]">
                  Promotional Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. AGELESS10"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-xl border border-[#D9CDB8] bg-[#F8F4EC]/50 text-xs text-[#383B35] uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-[#9EAA96]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#383B35] text-[#F8F4EC] text-xs font-medium hover:bg-[#657363] transition-all"
                  >
                    Apply
                  </button>
                </div>
                {discountApplied && (
                  <p className="text-xs text-emerald-600 font-medium">✓ 10% Protocol Discount Applied!</p>
                )}
                {promoError && (
                  <p className="text-xs text-rose-600 font-medium">{promoError}</p>
                )}
              </form>

              {/* Financial Breakup */}
              <div className="space-y-3 pt-2 text-xs text-[#383B35]">
                <div className="flex justify-between">
                  <span className="text-[#6B6E65]">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>

                {discountApplied && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Protocol Savings (10%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-[#6B6E65]">Estimated Shipping</span>
                  <span>{shipping === 0 ? <strong className="text-[#9EAA96]">FREE</strong> : `$${shipping.toFixed(2)}`}</span>
                </div>

                <div className="pt-3 border-t border-[#F0EBE1] flex justify-between text-base font-semibold text-[#383B35]">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              {checkoutComplete ? (
                <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-center text-xs space-y-1">
                  <p className="font-semibold text-sm">Order Confirmed! 🎉</p>
                  <p>Your Ageless protocol package is being prepared with carbon-neutral shipping.</p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setCheckoutComplete(true)}
                  className="w-full py-4 rounded-full bg-[#383B35] text-[#F8F4EC] text-xs font-semibold tracking-widest uppercase hover:bg-[#657363] active:scale-[0.98] transition-all shadow-md"
                >
                  Proceed to Secure Checkout • ${total.toFixed(2)}
                </button>
              )}

              <div className="pt-2 text-center text-[11px] text-[#6B6E65] space-y-1">
                <p>🔒 256-Bit SSL Encrypted Checkout</p>
                <p>Accepts Visa, Mastercard, AMEX, Apple Pay & Google Pay</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-20">
        <CtaAndFooter />
      </div>
    </div>
  );
}
