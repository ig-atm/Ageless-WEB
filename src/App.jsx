import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./Navbar";
import HomePage from "./pages/HomePage";
import Shop from "./Shop";
import Philosophy from "./Philosophy";
import CartPage from "./pages/CartPage";
import AdminDashboard from "./AdminDashboard";
import SlideOutCart from "./SlideOutCart";
import FibonacciSpiral from "./FibonacciSpiral";
import RoutineQuestionnaireModal from "./RoutineQuestionnaireModal";

// Route Page Transition Variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 24, // gentle upward slide
    scale: 1,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98, // smoothly fades out and scales down slightly (scale: 0.98)
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function PageTransition({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full flex-grow flex flex-col justify-between"
    >
      {children}
    </motion.div>
  );
}

function AppContent() {
  const [cartItems, setCartItems] = useState([
    {
      id: "deep-sleep",
      title: "Deep Sleep",
      category: "Rest & Circadian Rhythm",
      price: 64.0,
      quantity: 1,
      accentColor: "#91ACB5",
      size: "60 Vegan Capsules",
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  const handleAddToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.name || product.title,
          category: product.category || product.subtitle || "Longevity Supplement",
          price: Number(product.price),
          quantity: qty,
          accentColor: product.color || product.accentColor || "#9EAA96",
          size: product.size || "Standard Supply",
        },
      ];
    });
    // Open slide-out cart when adding an item for immediate feedback
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, quantity: Math.max(1, it.quantity + delta) } : it))
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((it) => it.id !== id));
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navigate = useNavigate();

  // Keyboard shortcut (⌘+Shift+A or Ctrl+Shift+A) for admin access without storefront UI clutter
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        navigate("/admin");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#F8F4EC] text-[#383B35] font-sans antialiased selection:bg-[#9EAA96] selection:text-[#F8F4EC] relative flex flex-col justify-between overflow-x-hidden">
      {/* 1. Global Glassmorphic Sticky Navigation Bar (hidden on admin page) */}
      {!isAdminRoute && (
        <Navbar
          cartCount={totalCartCount}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenQuestionnaire={() => setIsQuestionnaireOpen(true)}
        />
      )}

      {/* 2. Slide-out Cart Drawer with Framer Motion slide-in animations */}
      <SlideOutCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* 2b. Personalized Routine Questionnaire Modal */}
      <RoutineQuestionnaireModal
        isOpen={isQuestionnaireOpen}
        onClose={() => setIsQuestionnaireOpen(false)}
      />

      {/* 3. React Router Route Declarations wrapped in AnimatePresence for Page Transitions */}
      <main className="flex-grow flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <HomePage
                    onAddToCart={handleAddToCart}
                    onOpenQuestionnaire={() => setIsQuestionnaireOpen(true)}
                  />
                </PageTransition>
              }
            />
            <Route
              path="/shop"
              element={
                <PageTransition>
                  <Shop onAddToCart={handleAddToCart} />
                </PageTransition>
              }
            />
            <Route
              path="/philosophy"
              element={
                <PageTransition>
                  <Philosophy />
                </PageTransition>
              }
            />
            <Route
              path="/cart"
              element={
                <PageTransition>
                  <CartPage
                    cartItems={cartItems}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemoveItem={handleRemoveItem}
                  />
                </PageTransition>
              }
            />
            <Route
              path="/spiral"
              element={
                <PageTransition>
                  <FibonacciSpiral />
                </PageTransition>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminDashboard onBackToStorefront={() => navigate("/")} />
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
