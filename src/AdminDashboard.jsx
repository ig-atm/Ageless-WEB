import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL || "";

const getProductImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith("http")) return imagePath;
  return `${BACKEND_BASE_URL}${imagePath}`;
};

const BRAND_PALETTE = [
  { name: "Soft Clay", hex: "#B99B89" },
  { name: "Soft Blush Pink", hex: "#D8B4AE" },
  { name: "Muted Sage Green", hex: "#9EAA96" },
  { name: "Soft Ocean Blue", hex: "#91ACB5" },
  { name: "Charcoal Olive", hex: "#383B35" },
  { name: "Pearl Ivory", hex: "#F8F4EC" }
];

export default function AdminDashboard({ onBackToStorefront }) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("ageless_admin_auth") === "true"
  );
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");

  // Product Catalog State
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // Form State (Create / Edit)
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    subtitle: "",
    price: "",
    color: "#B99B89",
    description: "",
    howToConsume: "",
    benefits: []
  });

  const [currentBenefitInput, setCurrentBenefitInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const formRef = useRef(null);
  const fileInputRef = useRef(null);

  // Show Toast
  const notify = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Fetch products from backend
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/products`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setProducts(json.data);
      } else {
        notify("Failed to retrieve products from CRM backend", "error");
      }
    } catch (err) {
      console.error("CRM Fetch Error:", err);
      notify("CRM API server unreachable. Ensure backend service is running.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  // Auth Submit
  const handleLogin = (e) => {
    e.preventDefault();
    // Default passkey: 'ageless2026' or 'admin'
    if (passcode.trim() === "ageless2026" || passcode.trim() === "admin") {
      setIsAuthenticated(true);
      localStorage.setItem("ageless_admin_auth", "true");
      setAuthError("");
      notify("Welcome to Ageless CRM Product Management");
    } else {
      setAuthError("Invalid access key. Use 'ageless2026' to proceed.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("ageless_admin_auth");
  };

  // Auto-generate slug from name if creating
  const handleNameChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name: val,
      id: isEditing ? prev.id : val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    }));
  };

  // Add Benefit to array
  const handleAddBenefit = () => {
    if (!currentBenefitInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      benefits: [...prev.benefits, currentBenefitInput.trim()]
    }));
    setCurrentBenefitInput("");
  };

  const handleRemoveBenefit = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  // Image Selection & Preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        notify("Please select an image file (PNG, JPG, WEBP)", "error");
        return;
      }
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
    }
  };

  // Reset Form
  const resetForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      id: "",
      name: "",
      subtitle: "",
      price: "",
      color: "#B99B89",
      description: "",
      howToConsume: "",
      benefits: []
    });
    setCurrentBenefitInput("");
    setSelectedFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Populate Form for Editing
  const handleEditClick = (product) => {
    setIsEditing(true);
    setEditingId(product.id);
    setFormData({
      id: product.id,
      name: product.name,
      subtitle: product.subtitle || "",
      price: product.price,
      color: product.color || "#B99B89",
      description: product.description || "",
      howToConsume: product.howToConsume || "",
      benefits: Array.isArray(product.benefits) ? product.benefits : []
    });
    setImagePreview(getProductImageUrl(product.imagePath));
    setSelectedFile(null);

    // Scroll form smoothly into view
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Submit Form (POST or PUT with Multipart FormData)
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.id.trim() || formData.price === "") {
      notify("Please provide a product Name, Slug ID, and Price", "error");
      return;
    }

    setActionLoading(true);

    try {
      const payload = new FormData();
      payload.append("id", formData.id.trim());
      payload.append("name", formData.name.trim());
      payload.append("subtitle", formData.subtitle.trim());
      payload.append("price", formData.price);
      payload.append("color", formData.color);
      payload.append("description", formData.description);
      payload.append("howToConsume", formData.howToConsume);
      payload.append("benefits", JSON.stringify(formData.benefits));

      if (selectedFile) {
        payload.append("image", selectedFile);
      }

      const endpoint = isEditing
        ? `${API_BASE_URL}/products/${editingId}`
        : `${API_BASE_URL}/products`;

      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        body: payload
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to process product request");
      }

      notify(
        isEditing
          ? `Product '${formData.name}' updated successfully!`
          : `New product '${formData.name}' created and added to CRM catalog!`
      );

      resetForm();
      fetchProducts();
    } catch (err) {
      console.error("Submit Error:", err);
      notify(err.message, "error");
    } finally {
      setActionLoading(false);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (product) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to permanently delete '${product.name}' (${product.id}) from the CRM catalog?`
    );
    if (!confirmDelete) return;

    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/products/${product.id}`, {
        method: "DELETE"
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to delete product");
      }

      notify(`Product '${product.name}' deleted successfully.`);
      if (editingId === product.id) {
        resetForm();
      }
      fetchProducts();
    } catch (err) {
      console.error("Delete Error:", err);
      notify(err.message, "error");
    } finally {
      setActionLoading(false);
    }
  };

  // Filter products by search
  const filteredProducts = products.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.name?.toLowerCase().includes(q) ||
      p.id?.toLowerCase().includes(q) ||
      p.subtitle?.toLowerCase().includes(q)
    );
  });

  // Calculate Metrics
  const averagePrice = products.length
    ? (products.reduce((acc, p) => acc + Number(p.price || 0), 0) / products.length).toFixed(2)
    : "0.00";

  // --------------------------------------------------------------------------
  // PROTECTED LOGIN VIEW
  // --------------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8F4EC] text-[#383B35] flex items-center justify-center p-6 selection:bg-[#9EAA96] selection:text-[#F8F4EC]">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl p-8 border border-[#E8DEC8] shadow-[0_20px_50px_rgba(56,59,53,0.08)]"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#B99B89]/20 text-[#383B35] font-serif text-2xl font-light mb-3">
              ◈
            </div>
            <h1 className="font-serif text-3xl font-light text-[#383B35]">
              Ageless CRM Portal
            </h1>
            <p className="text-xs text-[#6B6E65] mt-1.5 uppercase tracking-widest font-medium">
              Product Management & Catalog Admin
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#383B35] mb-1.5">
                Admin Passkey
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter admin passcode (ageless2026)"
                className="w-full px-4 py-3 rounded-xl border border-[#D9CDB8] bg-[#F8F4EC]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#9EAA96] text-sm text-[#383B35] transition-all"
                autoFocus
              />
              {authError && (
                <p className="text-xs text-rose-700 mt-2 font-medium">
                  {authError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-[#383B35] text-[#F8F4EC] text-sm font-medium tracking-wide hover:bg-[#657363] active:scale-[0.98] transition-all shadow-sm"
            >
              Access CRM Dashboard →
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#F0EBE1] text-center">
            {onBackToStorefront && (
              <button
                type="button"
                onClick={onBackToStorefront}
                className="text-xs text-[#6B6E65] hover:text-[#383B35] underline underline-offset-4"
              >
                ← Return to Public Storefront
              </button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // AUTHENTICATED CRM DASHBOARD VIEW
  // --------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#F8F4EC] text-[#383B35] pb-24 selection:bg-[#9EAA96] selection:text-[#F8F4EC]">
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-xl text-sm font-medium flex items-center gap-3 backdrop-blur-md border ${
              notification.type === "error"
                ? "bg-rose-50/95 text-rose-900 border-rose-200"
                : "bg-emerald-50/95 text-emerald-950 border-emerald-200"
            }`}
          >
            <span>{notification.type === "error" ? "⚠️" : "✓"}</span>
            <span>{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-[#E8DEC8] px-6 lg:px-12 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#B99B89]/20 text-[#383B35] flex items-center justify-center font-serif text-lg">
              ◈
            </span>
            <div>
              <h1 className="font-serif text-xl sm:text-2xl font-light text-[#383B35] tracking-tight">
                Ageless Longevity CRM
              </h1>
              <p className="text-[11px] text-[#6B6E65] tracking-wider uppercase">
                Catalog & Formulation Control Panel
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {onBackToStorefront && (
              <button
                type="button"
                onClick={onBackToStorefront}
                className="px-4 py-2 rounded-full border border-[#D9CDB8] bg-white text-xs font-medium text-[#383B35] hover:bg-[#F8F4EC] transition-all"
              >
                ← View Storefront
              </button>
            )}

            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 rounded-full bg-[#383B35]/10 text-xs font-medium text-[#383B35] hover:bg-rose-100 hover:text-rose-900 transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 mt-8 space-y-10">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-2xl bg-white/80 border border-[#E8DEC8] shadow-sm">
            <p className="text-xs uppercase tracking-widest text-[#6B6E65] font-semibold">Total SKUs</p>
            <p className="font-serif text-3xl font-light text-[#383B35] mt-2">{products.length}</p>
            <p className="text-[11px] text-[#9EAA96] mt-1 font-medium">Active In Catalog</p>
          </div>

          <div className="p-5 rounded-2xl bg-white/80 border border-[#E8DEC8] shadow-sm">
            <p className="text-xs uppercase tracking-widest text-[#6B6E65] font-semibold">Average Price</p>
            <p className="font-serif text-3xl font-light text-[#383B35] mt-2">${averagePrice}</p>
            <p className="text-[11px] text-[#6B6E65] mt-1">Per Formulation</p>
          </div>

          <div className="p-5 rounded-2xl bg-white/80 border border-[#E8DEC8] shadow-sm">
            <p className="text-xs uppercase tracking-widest text-[#6B6E65] font-semibold">API Status</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <p className="font-medium text-sm text-[#383B35]">Express API Active</p>
            </div>
            <p className="text-[11px] text-[#6B6E65] mt-1">/api • REST Endpoints</p>
          </div>

          <div className="p-5 rounded-2xl bg-white/80 border border-[#E8DEC8] shadow-sm">
            <p className="text-xs uppercase tracking-widest text-[#6B6E65] font-semibold">Upload Storage</p>
            <p className="font-serif text-3xl font-light text-[#383B35] mt-2">Multer PNG</p>
            <p className="text-[11px] text-[#6B6E65] mt-1">/uploads/products/</p>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: PRODUCT LISTING TABLE VIEW */}
        {/* ------------------------------------------------------------------ */}
        <section className="bg-white/85 rounded-3xl p-6 sm:p-8 border border-[#E8DEC8] shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="font-serif text-2xl font-light text-[#383B35]">
                Current Product Catalog
              </h2>
              <p className="text-xs text-[#6B6E65] mt-0.5">
                Real-time inventory retrieved from <code className="bg-[#F8F4EC] px-1 py-0.5 rounded text-[11px]">/api/products</code>
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Search Bar */}
              <div className="relative flex-1 sm:w-64">
                <input
                  type="text"
                  placeholder="Search products, slugs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-full border border-[#D9CDB8] bg-[#F8F4EC]/60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#9EAA96] text-xs text-[#383B35]"
                />
                <svg
                  className="w-4 h-4 absolute left-3 top-2.5 text-[#6B6E65]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <button
                type="button"
                onClick={fetchProducts}
                title="Reload products"
                className="p-2 rounded-full border border-[#D9CDB8] bg-white hover:bg-[#F8F4EC] text-[#383B35] transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-2xl border border-[#E8DEC8]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8F4EC] text-[#383B35] text-[11px] font-semibold uppercase tracking-wider border-b border-[#E8DEC8]">
                  <th className="py-3.5 px-4">Product Formulation</th>
                  <th className="py-3.5 px-4">Slug ID</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Accent Theme</th>
                  <th className="py-3.5 px-4">Benefits</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EBE1] text-xs">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#6B6E65]">
                      <div className="inline-block w-6 h-6 border-2 border-[#9EAA96] border-t-transparent rounded-full animate-spin mb-2" />
                      <p>Loading products from CRM API...</p>
                    </td>
                  </tr>
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#6B6E65]">
                      No products found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((p) => {
                    const imgSrc = getProductImageUrl(p.imagePath);

                    return (
                      <tr key={p.id} className="hover:bg-[#FAF7F0] transition-colors">
                        {/* Image & Title */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center border border-[#E8DEC8] overflow-hidden flex-shrink-0"
                              style={{ backgroundColor: p.color ? `${p.color}20` : "#F8F4EC" }}
                            >
                              {imgSrc ? (
                                <img
                                  src={imgSrc}
                                  alt={p.name}
                                  className="w-full h-full object-contain p-1"
                                  onError={(e) => {
                                    e.target.style.display = "none";
                                  }}
                                />
                              ) : (
                                <span className="font-serif text-sm font-semibold" style={{ color: p.color || "#383B35" }}>
                                  {p.name.slice(0, 2).toUpperCase()}
                                </span>
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-[#383B35] text-sm">{p.name}</p>
                              {p.subtitle && (
                                <p className="text-[11px] text-[#6B6E65] line-clamp-1">{p.subtitle}</p>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Slug */}
                        <td className="py-3.5 px-4 font-mono text-[11px] text-[#6B6E65]">
                          {p.id}
                        </td>

                        {/* Price */}
                        <td className="py-3.5 px-4 font-semibold text-[#383B35]">
                          ${Number(p.price).toFixed(2)}
                        </td>

                        {/* Accent Color */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-4 h-4 rounded-full border border-black/10 shadow-inner flex-shrink-0"
                              style={{ backgroundColor: p.color || "#B99B89" }}
                            />
                            <span className="font-mono text-[11px] text-[#6B6E65]">
                              {p.color || "—"}
                            </span>
                          </div>
                        </td>

                        {/* Benefits count */}
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-full bg-[#F0EBE1] text-[#383B35] text-[11px] font-medium">
                            {Array.isArray(p.benefits) ? p.benefits.length : 0} items
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleEditClick(p)}
                              className="px-3 py-1.5 rounded-lg bg-[#383B35]/5 hover:bg-[#383B35] text-[#383B35] hover:text-[#F8F4EC] text-xs font-medium transition-all"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(p)}
                              disabled={actionLoading}
                              className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white text-xs font-medium transition-all"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 2: CREATE / EDIT PRODUCT FORM */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={formRef}
          className="bg-white/85 rounded-3xl p-6 sm:p-10 border border-[#E8DEC8] shadow-sm scroll-mt-24"
        >
          <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-5 mb-8">
            <div>
              <span className="text-[11px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-full bg-[#B99B89]/20 text-[#383B35]">
                {isEditing ? "Formulation Editor" : "New Formulation"}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#383B35] mt-2">
                {isEditing ? `Editing: ${formData.name}` : "Create New Product"}
              </h2>
              <p className="text-xs text-[#6B6E65] mt-1">
                Inputs map strictly to the backend Express & Mongoose data schema.
              </p>
            </div>

            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 rounded-full border border-[#D9CDB8] text-xs font-medium text-[#6B6E65] hover:text-[#383B35] hover:bg-[#F8F4EC] transition-all"
              >
                ✕ Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmitForm} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* 1. Name */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#383B35] mb-1.5">
                  Product Name <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NAD+ Longevity Matrix"
                  value={formData.name}
                  onChange={handleNameChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D9CDB8] bg-[#F8F4EC]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#9EAA96] text-sm text-[#383B35]"
                />
              </div>

              {/* 2. Slug ID */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#383B35] mb-1.5">
                  Unique Slug ID <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. nad-longevity-matrix"
                  value={formData.id}
                  disabled={isEditing}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      id: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "-")
                    }))
                  }
                  className={`w-full px-4 py-2.5 rounded-xl border border-[#D9CDB8] font-mono text-xs text-[#383B35] ${
                    isEditing ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-[#F8F4EC]/40 focus:bg-white"
                  }`}
                />
              </div>

              {/* 3. Price */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#383B35] mb-1.5">
                  Price ($ USD) <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs text-[#6B6E65] font-semibold">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    placeholder="78.00"
                    value={formData.price}
                    onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#D9CDB8] bg-[#F8F4EC]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#9EAA96] text-sm text-[#383B35]"
                  />
                </div>
              </div>
            </div>

            {/* Subtitle & Brand Accent Color */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Subtitle */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#383B35] mb-1.5">
                  Subtitle / Category Tag
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cellular Renewal & Mitochondrial NAD+ Synergy"
                  value={formData.subtitle}
                  onChange={(e) => setFormData((prev) => ({ ...prev, subtitle: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D9CDB8] bg-[#F8F4EC]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#9EAA96] text-sm text-[#383B35]"
                />
              </div>

              {/* Color Swatch Picker */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#383B35] mb-1.5">
                  Accent Color (Hex)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData((prev) => ({ ...prev, color: e.target.value }))}
                    className="w-10 h-10 p-0 rounded-lg border border-[#D9CDB8] cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData((prev) => ({ ...prev, color: e.target.value }))}
                    className="flex-1 px-3 py-2 rounded-xl border border-[#D9CDB8] font-mono text-xs text-[#383B35] bg-[#F8F4EC]/40"
                  />
                </div>
                {/* Brand Preset Pills */}
                <div className="flex items-center gap-1.5 mt-2">
                  {BRAND_PALETTE.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      title={c.name}
                      onClick={() => setFormData((prev) => ({ ...prev, color: c.hex }))}
                      className="w-5 h-5 rounded-full border border-black/10 transition-transform hover:scale-110"
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Description Textarea */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#383B35] mb-1.5">
                Description (Text Block)
              </label>
              <textarea
                rows={3}
                placeholder="Comprehensive scientific description of the supplement formulation and biological pathways targeted..."
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-[#D9CDB8] bg-[#F8F4EC]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#9EAA96] text-sm text-[#383B35] leading-relaxed"
              />
            </div>

            {/* How to Consume Textarea */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#383B35] mb-1.5">
                How to Consume (Text Block)
              </label>
              <textarea
                rows={2}
                placeholder="Dosage instructions, optimal time of day, water/food pairing, and timing..."
                value={formData.howToConsume}
                onChange={(e) => setFormData((prev) => ({ ...prev, howToConsume: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-[#D9CDB8] bg-[#F8F4EC]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#9EAA96] text-sm text-[#383B35] leading-relaxed"
              />
            </div>

            {/* Dynamic Benefits Input Array */}
            <div className="rounded-2xl p-5 bg-[#F8F4EC]/60 border border-[#E8DEC8]">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#383B35] mb-1">
                Formulation Key Benefits (Dynamic Array)
              </label>
              <p className="text-[11px] text-[#6B6E65] mb-3">
                Add each key benefit or clinical claim. These render as a bulleted checklist on the storefront modal.
              </p>

              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="e.g. Promotes endogenous collagen synthesis"
                  value={currentBenefitInput}
                  onChange={(e) => setCurrentBenefitInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddBenefit();
                    }
                  }}
                  className="flex-1 px-4 py-2 rounded-xl border border-[#D9CDB8] bg-white text-xs text-[#383B35] focus:outline-none focus:ring-1 focus:ring-[#9EAA96]"
                />
                <button
                  type="button"
                  onClick={handleAddBenefit}
                  className="px-4 py-2 rounded-xl bg-[#383B35] text-[#F8F4EC] text-xs font-medium hover:bg-[#657363] transition-all"
                >
                  + Add Benefit
                </button>
              </div>

              {/* Rendered Benefits Chips */}
              <div className="space-y-2">
                {formData.benefits.length === 0 ? (
                  <p className="text-xs text-[#6B6E65] italic">No benefits added yet. Type above and click "+ Add Benefit".</p>
                ) : (
                  formData.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-3 px-3.5 py-2 rounded-xl bg-white border border-[#E8DEC8] text-xs text-[#383B35]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#9EAA96]/20 text-[#657363] text-[10px] font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span>{benefit}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveBenefit(idx)}
                        className="text-xs text-rose-500 hover:text-rose-700 px-1.5 py-0.5 rounded hover:bg-rose-50"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* SKU Image File Upload */}
            <div className="rounded-2xl p-5 bg-[#F8F4EC]/60 border border-[#E8DEC8]">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#383B35] mb-1">
                Product SKU Artwork / PNG File
              </label>
              <p className="text-[11px] text-[#6B6E65] mb-3">
                Upload your supplement bottle PNG or transparent product render (handled by Multer to <code className="text-[10px] bg-white px-1 py-0.5 rounded">/uploads/products/</code>).
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/svg+xml"
                  onChange={handleFileChange}
                  className="text-xs text-[#6B6E65] file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-medium file:bg-[#383B35] file:text-[#F8F4EC] hover:file:bg-[#657363] file:cursor-pointer"
                />

                {imagePreview && (
                  <div className="flex items-center gap-3 p-2 bg-white rounded-xl border border-[#E8DEC8]">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-12 h-12 object-contain rounded"
                    />
                    <div className="text-[11px]">
                      <p className="font-medium text-[#383B35]">Artwork Preview</p>
                      {selectedFile ? (
                        <p className="text-[#6B6E65]">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                      ) : (
                        <p className="text-[#9EAA96]">Current Server Asset</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#F0EBE1]">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2.5 rounded-full border border-[#D9CDB8] text-xs font-medium text-[#6B6E65] hover:text-[#383B35] hover:bg-[#F8F4EC] transition-all"
              >
                Reset
              </button>

              <button
                type="submit"
                disabled={actionLoading}
                className="px-8 py-3 rounded-full bg-[#383B35] text-[#F8F4EC] text-xs font-medium tracking-wide hover:bg-[#657363] active:scale-[0.98] transition-all shadow-md flex items-center gap-2"
              >
                {actionLoading && (
                  <div className="w-3.5 h-3.5 border-2 border-[#F8F4EC] border-t-transparent rounded-full animate-spin" />
                )}
                <span>{isEditing ? "Save Product Changes" : "Create & Publish Product"}</span>
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
