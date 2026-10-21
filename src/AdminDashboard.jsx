import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { agelessMockProducts } from "./agelessMockData";

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

const DEFAULT_CUSTOMERS = [
  {
    id: "crm-cust-101",
    name: "Dr. Julian Vance",
    email: "j.vance@longevityinstitute.org",
    phone: "+1 (555) 234-8910",
    status: "VIP Subscriber",
    stage: "Retention",
    lifetimeValue: 1240.0,
    ordersCount: 9,
    subscribedTo: ["Cellular NAD+ & Trans-Resveratrol", "Senolytic Cell Defence Complex"],
    healthGoal: "Biological Age Reversal",
    lastContactDate: "2026-10-18",
    notes: "Subscribed to quarterly biological biomarker testing bundle. Prefers morning courier deliveries."
  },
  {
    id: "crm-cust-102",
    name: "Elena Rostova",
    email: "elena.rostova@atelierdesign.ch",
    phone: "+41 79 555 8312",
    status: "Active Customer",
    stage: "Engagement",
    lifetimeValue: 460.0,
    ordersCount: 3,
    subscribedTo: ["Deep Circadian & Cortisol Rhythm"],
    healthGoal: "Sleep Architecture & Cortisol Balance",
    lastContactDate: "2026-10-14",
    notes: "Referred by concierge longevity clinic in Zurich."
  },
  {
    id: "crm-cust-103",
    name: "Marcus Sterling",
    email: "m.sterling@capitalpartners.co.uk",
    phone: "+44 20 7946 0918",
    status: "High Intent Lead",
    stage: "Consultation Scheduled",
    lifetimeValue: 0.0,
    ordersCount: 0,
    subscribedTo: [],
    healthGoal: "Executive Cognitive Longevity",
    lastContactDate: "2026-10-20",
    notes: "Booked 1-on-1 supplement protocol review with Ageless clinical advisor."
  },
  {
    id: "crm-cust-104",
    name: "Dr. Evelyn Mercer",
    email: "evelyn.mercer@bioage.org",
    phone: "+1 (555) 789-0123",
    status: "VIP Subscriber",
    stage: "Retention",
    lifetimeValue: 1890.0,
    ordersCount: 14,
    subscribedTo: ["Cellular NAD+ & Trans-Resveratrol", "Glass Glow Dermal Matrix"],
    healthGoal: "Cellular Senescence & Dermal Density",
    lastContactDate: "2026-10-21",
    notes: "Regular participant in epigenetic age clock diagnostics."
  }
];

const DEFAULT_LEADS = [
  {
    id: "lead-01",
    name: "Siddharth Rao",
    email: "siddharth@quantumventures.in",
    goal: "Cellular NAD+ Optimization",
    source: "Daily Spiral Diagnostic Quiz",
    status: "New",
    createdAt: "2026-10-20T10:15:00Z"
  },
  {
    id: "lead-02",
    name: "Camilla Laurent",
    email: "c.laurent@biolabs.fr",
    goal: "Mitochondrial Health",
    source: "Website Newsletter Popup",
    status: "Contacted",
    createdAt: "2026-10-19T14:30:00Z"
  },
  {
    id: "lead-03",
    name: "Liam Chen",
    email: "liam.chen@oxfordbio.ac.uk",
    goal: "Circadian Sleep Restoration",
    source: "Direct Consultation Request",
    status: "New",
    createdAt: "2026-10-21T08:45:00Z"
  }
];

const DEFAULT_ORDERS = [
  {
    id: "ORD-78912",
    customerName: "Dr. Julian Vance",
    customerEmail: "j.vance@longevityinstitute.org",
    items: [
      { id: "ageless-nmn-resveratrol", name: "Cellular NAD+ & Trans-Resveratrol", quantity: 2, price: 88.0 }
    ],
    total: 176.0,
    status: "Shipped",
    date: "2026-10-18T09:24:00Z",
    trackingNumber: "AGL-EXP-9021-EU"
  },
  {
    id: "ORD-78913",
    customerName: "Elena Rostova",
    customerEmail: "elena.rostova@atelierdesign.ch",
    items: [
      { id: "deep-sleep", name: "Deep Sleep Restorative Formulation", quantity: 1, price: 64.0 }
    ],
    total: 64.0,
    status: "Delivered",
    date: "2026-10-15T14:10:00Z",
    trackingNumber: "AGL-EXP-8842-CH"
  },
  {
    id: "ORD-78914",
    customerName: "Dr. Evelyn Mercer",
    customerEmail: "evelyn.mercer@bioage.org",
    items: [
      { id: "ageless-nmn-resveratrol", name: "Cellular NAD+ & Trans-Resveratrol", quantity: 1, price: 88.0 },
      { id: "glass-glow", name: "Glass Glow Dermal Matrix", quantity: 1, price: 78.0 }
    ],
    total: 166.0,
    status: "In Transit",
    date: "2026-10-20T11:05:00Z",
    trackingNumber: "AGL-EXP-9150-US"
  }
];

export default function AdminDashboard({ onBackToStorefront }) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("ageless_admin_auth") === "true"
  );
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");

  // Top Tabs: "clients" | "leads" | "orders" | "products"
  const [activeTab, setActiveTab] = useState("clients");

  // Notifications
  const [notification, setNotification] = useState(null);
  const notify = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // --------------------------------------------------------------------------
  // CRM STATE (Customers, Leads, Orders, Analytics)
  // --------------------------------------------------------------------------
  const [customers, setCustomers] = useState(DEFAULT_CUSTOMERS);
  const [leads, setLeads] = useState(DEFAULT_LEADS);
  const [orders, setOrders] = useState(DEFAULT_ORDERS);
  const [crmLoading, setCrmLoading] = useState(false);
  const [clientSearch, setClientSearch] = useState("");
  const [clientFilter, setClientFilter] = useState("All");

  // Client Details Modal
  const [selectedClient, setSelectedClient] = useState(null);
  const [newNoteInput, setNewNoteInput] = useState("");

  // Add Client Modal
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [newClientData, setNewClientData] = useState({
    name: "",
    email: "",
    phone: "",
    healthGoal: "Biological Age Reversal",
    stage: "Acquisition",
    status: "Active Customer",
    notes: ""
  });

  // Add Lead Modal
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [newLeadData, setNewLeadData] = useState({
    name: "",
    email: "",
    goal: "Cellular NAD+ Optimization",
    source: "Direct Consultation Request"
  });

  // --------------------------------------------------------------------------
  // PRODUCT CATALOG STATE
  // --------------------------------------------------------------------------
  const [products, setProducts] = useState(agelessMockProducts);
  const [productLoading, setProductLoading] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  // Form State (Product Create / Edit)
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

  // --------------------------------------------------------------------------
  // API FETCH CALLS
  // --------------------------------------------------------------------------
  const fetchProducts = async () => {
    setProductLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/products`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setProducts(json.data);
        }
      }
    } catch (err) {
      console.log("Using local formulations fallback:", err.message);
    } finally {
      setProductLoading(false);
    }
  };

  const fetchCrmData = async () => {
    setCrmLoading(true);
    try {
      // 1. Fetch Customers
      const custRes = await fetch(`${API_BASE_URL}/crm/customers`);
      if (custRes.ok) {
        const json = await custRes.json();
        if (json.success && Array.isArray(json.data)) {
          setCustomers(json.data);
        }
      }

      // 2. Fetch Leads
      const leadRes = await fetch(`${API_BASE_URL}/crm/leads`);
      if (leadRes.ok) {
        const json = await leadRes.json();
        if (json.success && Array.isArray(json.data)) {
          setLeads(json.data);
        }
      }

      // 3. Fetch Orders
      const orderRes = await fetch(`${API_BASE_URL}/orders`);
      if (orderRes.ok) {
        const json = await orderRes.json();
        if (json.success && Array.isArray(json.data)) {
          setOrders(json.data);
        }
      }
    } catch (err) {
      console.log("Using cached CRM records fallback:", err.message);
    } finally {
      setCrmLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
      fetchCrmData();
    }
  }, [isAuthenticated]);

  // Auth Submit
  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode.trim() === "ageless2026" || passcode.trim() === "admin") {
      setIsAuthenticated(true);
      localStorage.setItem("ageless_admin_auth", "true");
      setAuthError("");
      notify("Welcome to Ageless Longevity Admin & Client CRM");
    } else {
      setAuthError("Invalid access key. Use 'ageless2026' or 'admin' to proceed.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("ageless_admin_auth");
  };

  // --------------------------------------------------------------------------
  // CRM ACTIONS (Add Customer, Add Lead, Convert Lead, Add Note)
  // --------------------------------------------------------------------------
  const handleCreateCustomer = async (e) => {
    e.preventDefault();
    if (!newClientData.name.trim() || !newClientData.email.trim()) {
      notify("Client Name and Email are mandatory", "error");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/crm/customers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClientData)
      });
      const json = await res.json();
      if (json.success && json.data) {
        setCustomers((prev) => [json.data, ...prev]);
      } else {
        // Fallback local append
        const fallbackClient = {
          id: `crm-cust-${Date.now()}`,
          ...newClientData,
          lifetimeValue: 0.0,
          ordersCount: 0,
          subscribedTo: [],
          lastContactDate: new Date().toISOString().split("T")[0]
        };
        setCustomers((prev) => [fallbackClient, ...prev]);
      }
      notify(`Client profile created for ${newClientData.name}!`);
      setIsAddClientOpen(false);
      setNewClientData({
        name: "",
        email: "",
        phone: "",
        healthGoal: "Biological Age Reversal",
        stage: "Acquisition",
        status: "Active Customer",
        notes: ""
      });
    } catch (err) {
      const fallbackClient = {
        id: `crm-cust-${Date.now()}`,
        ...newClientData,
        lifetimeValue: 0.0,
        ordersCount: 0,
        subscribedTo: [],
        lastContactDate: new Date().toISOString().split("T")[0]
      };
      setCustomers((prev) => [fallbackClient, ...prev]);
      notify(`Client profile created for ${newClientData.name}!`);
      setIsAddClientOpen(false);
    }
  };

  const handleCreateLead = async (e) => {
    e.preventDefault();
    if (!newLeadData.email.trim()) {
      notify("Lead Email is required", "error");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/crm/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLeadData)
      });
      const json = await res.json();
      if (json.success && json.data) {
        setLeads((prev) => [json.data, ...prev]);
      } else {
        const fallbackLead = {
          id: `lead-${Date.now()}`,
          ...newLeadData,
          status: "New",
          createdAt: new Date().toISOString()
        };
        setLeads((prev) => [fallbackLead, ...prev]);
      }
      notify(`Inbound lead captured for ${newLeadData.email}!`);
      setIsAddLeadOpen(false);
      setNewLeadData({
        name: "",
        email: "",
        goal: "Cellular NAD+ Optimization",
        source: "Direct Consultation Request"
      });
    } catch (err) {
      const fallbackLead = {
        id: `lead-${Date.now()}`,
        ...newLeadData,
        status: "New",
        createdAt: new Date().toISOString()
      };
      setLeads((prev) => [fallbackLead, ...prev]);
      notify(`Inbound lead captured for ${newLeadData.email}!`);
      setIsAddLeadOpen(false);
    }
  };

  const handleConvertLeadToCustomer = (lead) => {
    const newCust = {
      id: `crm-cust-${Date.now()}`,
      name: lead.name || "Client",
      email: lead.email,
      phone: "",
      status: "Active Customer",
      stage: "Acquisition",
      lifetimeValue: 0.0,
      ordersCount: 0,
      subscribedTo: [],
      healthGoal: lead.goal || "Biological Age Reversal",
      lastContactDate: new Date().toISOString().split("T")[0],
      notes: `Converted from lead source: ${lead.source || "Website Inbound"}`
    };

    setCustomers((prev) => [newCust, ...prev]);
    setLeads((prev) =>
      prev.map((l) => (l.id === lead.id ? { ...l, status: "Converted" } : l))
    );
    notify(`Lead ${lead.email} converted to active client in CRM!`);
  };

  const handleAddNoteToClient = () => {
    if (!newNoteInput.trim() || !selectedClient) return;
    const updatedNotes = selectedClient.notes
      ? `${selectedClient.notes}\n• [${new Date().toLocaleDateString()}] ${newNoteInput.trim()}`
      : `• [${new Date().toLocaleDateString()}] ${newNoteInput.trim()}`;

    const updated = {
      ...selectedClient,
      notes: updatedNotes,
      lastContactDate: new Date().toISOString().split("T")[0]
    };

    setSelectedClient(updated);
    setCustomers((prev) =>
      prev.map((c) => (c.id === selectedClient.id ? updated : c))
    );
    setNewNoteInput("");
    notify("Clinical note appended to client file.");
  };

  // --------------------------------------------------------------------------
  // PRODUCT FORM LOGIC
  // --------------------------------------------------------------------------
  const handleNameChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name: val,
      id: isEditing
        ? prev.id
        : val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    }));
  };

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

  const handleEditClick = (product) => {
    setIsEditing(true);
    setEditingId(product.id);
    setActiveTab("products");
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

    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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

      const res = await fetch(endpoint, { method, body: payload });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to process product request");
      }

      notify(
        isEditing
          ? `Product '${formData.name}' updated successfully!`
          : `New product '${formData.name}' created and added to catalog!`
      );

      resetForm();
      fetchProducts();
    } catch (err) {
      // Local fallback for offline mode
      if (isEditing) {
        setProducts((prev) =>
          prev.map((p) =>
            p.id === editingId ? { ...p, ...formData, price: Number(formData.price) } : p
          )
        );
      } else {
        setProducts((prev) => [
          ...prev,
          { ...formData, price: Number(formData.price) }
        ]);
      }
      notify(
        isEditing
          ? `Product updated in local catalog.`
          : `Product added to local catalog.`
      );
      resetForm();
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteProduct = async (product) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to permanently delete '${product.name}' (${product.id})?`
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
      notify(`Product '${product.name}' removed from catalog.`);
      fetchProducts();
    } catch (err) {
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
      notify(`Product '${product.name}' removed from local catalog.`);
    } finally {
      setActionLoading(false);
    }
  };

  // --------------------------------------------------------------------------
  // KPI CALCULATIONS
  // --------------------------------------------------------------------------
  const totalLTV = customers.reduce((sum, c) => sum + (c.lifetimeValue || 0), 0);
  const avgLTV = customers.length ? (totalLTV / customers.length).toFixed(0) : 0;
  const activeSubscribers = customers.filter(
    (c) => c.status && c.status.toLowerCase().includes("subscriber")
  ).length;

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
      c.email.toLowerCase().includes(clientSearch.toLowerCase()) ||
      (c.healthGoal && c.healthGoal.toLowerCase().includes(clientSearch.toLowerCase()));

    const matchesFilter =
      clientFilter === "All" ||
      (c.status && c.status.toLowerCase() === clientFilter.toLowerCase());

    return matchesSearch && matchesFilter;
  });

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.id.toLowerCase().includes(productSearch.toLowerCase())
  );

  // --------------------------------------------------------------------------
  // UN-AUTHENTICATED PASSCODE LOGIN VIEW
  // --------------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8F4EC] flex items-center justify-center p-6 selection:bg-[#9EAA96] selection:text-[#F8F4EC]">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-[#E8DEC8] shadow-2xl text-[#383B35]"
        >
          <div className="text-center space-y-2 mb-8">
            <span className="w-12 h-12 mx-auto rounded-full bg-[#B99B89]/20 text-[#383B35] flex items-center justify-center font-serif text-2xl mb-4">
              ◈
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-light tracking-tight text-[#383B35]">
              Ageless Admin & Client CRM
            </h1>
            <p className="text-xs text-[#6B6E65] uppercase tracking-widest font-medium">
              Client Relationship Management & Formulations
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6E65] mb-2">
                Administrator Passkey
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter access key (e.g. ageless2026)"
                className="w-full px-4 py-3 rounded-2xl bg-[#F8F4EC]/60 border border-[#D9CDB8] focus:border-[#9EAA96] focus:bg-white focus:outline-none text-sm transition-all text-[#383B35] placeholder:text-stone-400"
                autoFocus
              />
              {authError && (
                <p className="text-xs text-rose-600 mt-2 font-medium flex items-center gap-1.5">
                  <span>⚠️</span> {authError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#383B35] text-[#F8F4EC] text-xs uppercase tracking-widest font-semibold hover:bg-[#657363] active:scale-[0.98] transition-all shadow-md"
            >
              Access Admin & Client CRM →
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#E8DEC8] text-center">
            {onBackToStorefront && (
              <button
                type="button"
                onClick={onBackToStorefront}
                className="text-xs text-[#6B6E65] hover:text-[#383B35] underline underline-offset-4 transition-colors"
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
  // AUTHENTICATED CRM & ADMIN DASHBOARD VIEW
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
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-[#E8DEC8] px-6 lg:px-12 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#B99B89]/20 text-[#383B35] flex items-center justify-center font-serif text-lg">
              ◈
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-xl sm:text-2xl font-light text-[#383B35] tracking-tight">
                  Ageless Longevity CRM
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-[#9EAA96]/20 text-[#657363] text-[10px] uppercase font-semibold tracking-wider">
                  /admin
                </span>
              </div>
              <p className="text-[11px] text-[#6B6E65] tracking-wider uppercase">
                Client Relationship Management & Formulation Control
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#F0EAE1] border border-[#E2D8C7] overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab("clients")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
                activeTab === "clients"
                  ? "bg-[#383B35] text-[#F8F4EC] shadow-sm"
                  : "text-[#6B6E65] hover:text-[#383B35] hover:bg-white/60"
              }`}
            >
              <span>👥</span>
              <span>Client CRM</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
                {customers.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("leads")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
                activeTab === "leads"
                  ? "bg-[#383B35] text-[#F8F4EC] shadow-sm"
                  : "text-[#6B6E65] hover:text-[#383B35] hover:bg-white/60"
              }`}
            >
              <span>📋</span>
              <span>Inbound Leads</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
                {leads.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
                activeTab === "orders"
                  ? "bg-[#383B35] text-[#F8F4EC] shadow-sm"
                  : "text-[#6B6E65] hover:text-[#383B35] hover:bg-white/60"
              }`}
            >
              <span>📦</span>
              <span>Client Orders</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("products")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
                activeTab === "products"
                  ? "bg-[#383B35] text-[#F8F4EC] shadow-sm"
                  : "text-[#6B6E65] hover:text-[#383B35] hover:bg-white/60"
              }`}
            >
              <span>🧪</span>
              <span>Formulations</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
                {products.length}
              </span>
            </button>
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

      <main className="max-w-7xl mx-auto px-6 lg:px-12 mt-8 space-y-8">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-3xl bg-white/85 border border-[#E8DEC8] shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs uppercase tracking-widest text-[#6B6E65] font-semibold">
              Total Clients
            </p>
            <p className="font-serif text-3xl font-light text-[#383B35] mt-2">
              {customers.length}
            </p>
            <p className="text-[11px] text-[#657363] mt-1 font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              {activeSubscribers} Active VIP Subscribers
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-white/85 border border-[#E8DEC8] shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs uppercase tracking-widest text-[#6B6E65] font-semibold">
              Average Client LTV
            </p>
            <p className="font-serif text-3xl font-light text-[#383B35] mt-2">
              ${avgLTV}
            </p>
            <p className="text-[11px] text-[#9EAA96] mt-1 font-medium">
              94.2% Client Retention Rate
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-white/85 border border-[#E8DEC8] shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs uppercase tracking-widest text-[#6B6E65] font-semibold">
              Client Orders
            </p>
            <p className="font-serif text-3xl font-light text-[#383B35] mt-2">
              {orders.length}
            </p>
            <p className="text-[11px] text-[#6B6E65] mt-1">
              ${orders.reduce((sum, o) => sum + (o.total || 0), 0).toFixed(2)} Total Order Volume
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-white/85 border border-[#E8DEC8] shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs uppercase tracking-widest text-[#6B6E65] font-semibold">
              Active Formulations
            </p>
            <p className="font-serif text-3xl font-light text-[#383B35] mt-2">
              {products.length} SKUs
            </p>
            <p className="text-[11px] text-[#6B6E65] mt-1">
              Restorative Longevity Catalog
            </p>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* TAB 1: CLIENT CRM DIRECTORY */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === "clients" && (
          <section className="bg-white/85 rounded-3xl p-6 sm:p-8 border border-[#E8DEC8] shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-light text-[#383B35]">
                  Client CRM Directory
                </h2>
                <p className="text-xs text-[#6B6E65] mt-0.5">
                  Comprehensive client health profiles, supplement regimens & clinical lifecycle management.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                {/* Search */}
                <div className="relative flex-1 md:w-64">
                  <input
                    type="text"
                    placeholder="Search by client, email, goal..."
                    value={clientSearch}
                    onChange={(e) => setClientSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-2xl bg-[#F8F4EC] border border-[#D9CDB8] text-xs focus:outline-none focus:border-[#9EAA96] focus:bg-white text-[#383B35]"
                  />
                  <span className="absolute left-3 top-2.5 text-xs text-[#6B6E65]">🔍</span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddClientOpen(true)}
                  className="px-4 py-2 rounded-full bg-[#383B35] text-[#F8F4EC] text-xs font-semibold uppercase tracking-wider hover:bg-[#657363] active:scale-95 transition-all flex items-center gap-2 shadow-sm"
                >
                  <span>+</span>
                  <span>Add Client</span>
                </button>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-[11px] text-[#6B6E65] uppercase tracking-wider font-semibold mr-1">
                Stage:
              </span>
              {["All", "VIP Subscriber", "Active Customer", "High Intent Lead", "New Lead"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setClientFilter(filter)}
                  className={`px-3 py-1 rounded-full transition-all text-xs ${
                    clientFilter === filter
                      ? "bg-[#657363] text-[#F8F4EC] font-medium"
                      : "bg-[#F8F4EC] text-[#6B6E65] hover:bg-[#E8DEC8]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Customers Table */}
            <div className="overflow-x-auto rounded-2xl border border-[#E8DEC8]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#E8DEC8] text-[#6B6E65] uppercase tracking-wider font-medium text-[11px]">
                    <th className="py-3 px-4">Client</th>
                    <th className="py-3 px-4">Health Goal & Protocol</th>
                    <th className="py-3 px-4">Subscribed Formulas</th>
                    <th className="py-3 px-4">Lifecycle Tier</th>
                    <th className="py-3 px-4">LTV</th>
                    <th className="py-3 px-4">Last Contact</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DEC8] bg-white">
                  {filteredCustomers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-[#6B6E65]">
                        No client records matching "{clientSearch}".
                      </td>
                    </tr>
                  ) : (
                    filteredCustomers.map((client) => {
                      const isVip = client.status && client.status.includes("VIP");
                      const initials = client.name
                        ? client.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")
                        : "CL";

                      return (
                        <tr key={client.id} className="hover:bg-[#FAF7F0] transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-xs text-white ${
                                  isVip ? "bg-[#B99B89]" : "bg-[#9EAA96]"
                                }`}
                              >
                                {initials}
                              </div>
                              <div>
                                <p className="font-medium text-[#383B35] text-sm">
                                  {client.name}
                                </p>
                                <p className="text-[11px] text-[#6B6E65]">
                                  {client.email} {client.phone && `• ${client.phone}`}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="font-medium text-[#383B35]">
                              {client.healthGoal || "Longevity Optimization"}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {Array.isArray(client.subscribedTo) && client.subscribedTo.length > 0 ? (
                                client.subscribedTo.map((sub, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-0.5 rounded-full bg-[#91ACB5]/20 text-[#383B35] text-[10px]"
                                  >
                                    {sub}
                                  </span>
                                ))
                              ) : (
                                <span className="text-[11px] text-[#6B6E65] italic">
                                  No active auto-ship
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide ${
                                isVip
                                  ? "bg-amber-100 text-amber-900 border border-amber-300"
                                  : "bg-[#9EAA96]/20 text-[#383B35]"
                              }`}
                            >
                              {client.status || "Customer"}
                            </span>
                            {client.stage && (
                              <p className="text-[10px] text-[#6B6E65] mt-0.5">
                                Stage: {client.stage}
                              </p>
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            <p className="font-semibold text-[#383B35]">
                              ${Number(client.lifetimeValue || 0).toFixed(2)}
                            </p>
                            <p className="text-[10px] text-[#6B6E65]">
                              {client.ordersCount || 0} orders
                            </p>
                          </td>

                          <td className="py-3.5 px-4 text-[#6B6E65] text-[11px]">
                            {client.lastContactDate || "Recent"}
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => setSelectedClient(client)}
                              className="px-3 py-1.5 rounded-full bg-[#FAF7F0] border border-[#D9CDB8] text-[#383B35] hover:bg-[#383B35] hover:text-white transition-all text-xs font-medium"
                            >
                              View File & Notes
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 2: INBOUND LEADS & DIAGNOSTICS */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === "leads" && (
          <section className="bg-white/85 rounded-3xl p-6 sm:p-8 border border-[#E8DEC8] shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-light text-[#383B35]">
                  Inbound Leads & Diagnostic Inquiries
                </h2>
                <p className="text-xs text-[#6B6E65] mt-0.5">
                  Prospective clients generated via the Daily Spiral quiz, consultation forms, and newsletter touchpoints.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddLeadOpen(true)}
                className="px-4 py-2 rounded-full bg-[#383B35] text-[#F8F4EC] text-xs font-semibold uppercase tracking-wider hover:bg-[#657363] active:scale-95 transition-all flex items-center gap-2 shadow-sm"
              >
                <span>+</span>
                <span>Record Inbound Lead</span>
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-[#E8DEC8]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#E8DEC8] text-[#6B6E65] uppercase tracking-wider font-medium text-[11px]">
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Health Focus</th>
                    <th className="py-3 px-4">Acquisition Channel</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Captured</th>
                    <th className="py-3 px-4 text-right">Convert to Client</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DEC8] bg-white">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-[#FAF7F0] transition-colors">
                      <td className="py-3.5 px-4">
                        <p className="font-medium text-[#383B35] text-sm">
                          {lead.name || "Anonymous Prospect"}
                        </p>
                        <p className="text-[11px] text-[#6B6E65]">{lead.email}</p>
                      </td>

                      <td className="py-3.5 px-4 font-medium text-[#383B35]">
                        {lead.goal || "Longevity Assessment"}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-full bg-[#F0EAE1] text-[#383B35] text-[10px]">
                          {lead.source || "Website Inbound"}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            lead.status === "Converted"
                              ? "bg-emerald-100 text-emerald-800"
                              : lead.status === "Contacted"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {lead.status || "New"}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-[#6B6E65] text-[11px]">
                        {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : "Today"}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        {lead.status === "Converted" ? (
                          <span className="text-emerald-700 font-medium text-xs">✓ Enrolled in CRM</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleConvertLeadToCustomer(lead)}
                            className="px-3 py-1.5 rounded-full bg-[#657363] text-white hover:bg-[#383B35] transition-all text-xs font-medium"
                          >
                            Convert to Client →
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 3: CLIENT ORDERS & SUBSCRIPTIONS */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === "orders" && (
          <section className="bg-white/85 rounded-3xl p-6 sm:p-8 border border-[#E8DEC8] shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-light text-[#383B35]">
                  Client Orders & Auto-Fulfillment
                </h2>
                <p className="text-xs text-[#6B6E65] mt-0.5">
                  Recent transactions, subscription refills, and courier tracking details.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-[#E8DEC8]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FAF7F0] border-b border-[#E8DEC8] text-[#6B6E65] uppercase tracking-wider font-medium text-[11px]">
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Client</th>
                    <th className="py-3 px-4">Formulations Ordered</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Tracking Code</th>
                    <th className="py-3 px-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DEC8] bg-white">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-[#FAF7F0] transition-colors">
                      <td className="py-3.5 px-4 font-mono font-medium text-[#383B35]">
                        {order.id}
                      </td>

                      <td className="py-3.5 px-4">
                        <p className="font-medium text-[#383B35]">{order.customerName}</p>
                        <p className="text-[11px] text-[#6B6E65]">{order.customerEmail}</p>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5">
                          {Array.isArray(order.items) &&
                            order.items.map((it, idx) => (
                              <p key={idx} className="text-xs text-[#383B35]">
                                <span className="font-semibold">{it.quantity}x</span> {it.name}
                              </p>
                            ))}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-[#383B35]">
                        ${Number(order.total || 0).toFixed(2)}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                            order.status === "Delivered"
                              ? "bg-emerald-100 text-emerald-800"
                              : order.status === "Shipped" || order.status === "In Transit"
                              ? "bg-sky-100 text-sky-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {order.status || "Confirmed"}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[11px] text-[#6B6E65]">
                        {order.trackingNumber || "Pending Courier"}
                      </td>

                      <td className="py-3.5 px-4 text-[#6B6E65] text-[11px]">
                        {order.date ? new Date(order.date).toLocaleDateString() : "Recent"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 4: FORMULATION CATALOG & EDITOR */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === "products" && (
          <div className="space-y-10">
            {/* Catalog Table */}
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
                  <div className="relative flex-1 sm:w-64">
                    <input
                      type="text"
                      placeholder="Search products, slugs..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-2xl bg-[#F8F4EC] border border-[#D9CDB8] text-xs focus:outline-none focus:border-[#9EAA96] focus:bg-white text-[#383B35]"
                    />
                    <span className="absolute left-3 top-2.5 text-xs text-[#6B6E65]">🔍</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      if (formRef.current) {
                        formRef.current.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="px-4 py-2 rounded-full bg-[#383B35] text-[#F8F4EC] text-xs font-semibold uppercase tracking-wider hover:bg-[#657363] active:scale-95 transition-all flex items-center gap-2 shadow-sm whitespace-nowrap"
                  >
                    <span>+</span>
                    <span>New SKU</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-[#E8DEC8]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#FAF7F0] border-b border-[#E8DEC8] text-[#6B6E65] uppercase tracking-wider font-medium text-[11px]">
                      <th className="py-3 px-4">Formula Thumbnail</th>
                      <th className="py-3 px-4">Product Name & Subtitle</th>
                      <th className="py-3 px-4">Slug ID</th>
                      <th className="py-3 px-4">Unit Price</th>
                      <th className="py-3 px-4">Brand Accent</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8DEC8] bg-white">
                    {filteredProducts.map((p) => {
                      const imgSrc = getProductImageUrl(p.imagePath || p.image);
                      return (
                        <tr key={p.id} className="hover:bg-[#FAF7F0] transition-colors">
                          <td className="py-3 px-4">
                            <div className="w-12 h-12 rounded-xl bg-[#F8F4EC] border border-[#E8DEC8] flex items-center justify-center overflow-hidden">
                              {imgSrc ? (
                                <img
                                  src={imgSrc}
                                  alt={p.name}
                                  className="w-full h-full object-contain p-1"
                                />
                              ) : (
                                <span className="font-serif text-stone-400 text-lg">◈</span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-medium text-[#383B35] text-sm">{p.name}</p>
                            <p className="text-[11px] text-[#6B6E65] line-clamp-1">{p.subtitle}</p>
                          </td>
                          <td className="py-3 px-4 font-mono text-[11px] text-[#6B6E65]">
                            {p.id}
                          </td>
                          <td className="py-3 px-4 font-semibold text-[#383B35]">
                            ${Number(p.price).toFixed(2)}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <span
                                className="w-4 h-4 rounded-full border border-black/10 shadow-inner"
                                style={{ backgroundColor: p.color }}
                              />
                              <span className="font-mono text-[11px] text-[#6B6E65]">
                                {p.color}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <button
                              type="button"
                              onClick={() => handleEditClick(p)}
                              className="px-3 py-1.5 rounded-full bg-[#FAF7F0] border border-[#D9CDB8] text-[#383B35] hover:bg-[#383B35] hover:text-white transition-all text-xs font-medium"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(p)}
                              className="px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-800 hover:bg-rose-600 hover:text-white transition-all text-xs font-medium"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Product Create / Edit Form */}
            <section
              ref={formRef}
              className="bg-white/85 rounded-3xl p-6 sm:p-8 border border-[#E8DEC8] shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-serif text-2xl font-light text-[#383B35]">
                    {isEditing ? `Edit Formulation: ${formData.name}` : "Add New Supplement SKU"}
                  </h2>
                  <p className="text-xs text-[#6B6E65] mt-0.5">
                    {isEditing
                      ? "Update bioactive profile, imagery, or pricing parameters"
                      : "Create and publish a new longevity formula directly into the storefront"}
                  </p>
                </div>

                {isEditing && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-1.5 rounded-full border border-[#D9CDB8] text-xs text-[#6B6E65] hover:bg-[#FAF7F0]"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmitForm} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6E65] mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Cellular NAD+ & Resveratrol"
                      value={formData.name}
                      onChange={handleNameChange}
                      className="w-full px-4 py-2.5 rounded-2xl bg-[#F8F4EC] border border-[#D9CDB8] focus:border-[#9EAA96] focus:bg-white text-xs focus:outline-none text-[#383B35]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6E65] mb-2">
                      Slug ID *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. cellular-nad-resveratrol"
                      value={formData.id}
                      disabled={isEditing}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, id: e.target.value }))
                      }
                      className="w-full px-4 py-2.5 rounded-2xl bg-[#F8F4EC] border border-[#D9CDB8] focus:border-[#9EAA96] focus:bg-white text-xs font-mono focus:outline-none text-[#383B35] disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6E65] mb-2">
                      Retail Price (USD) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="88.00"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, price: e.target.value }))
                      }
                      className="w-full px-4 py-2.5 rounded-2xl bg-[#F8F4EC] border border-[#D9CDB8] focus:border-[#9EAA96] focus:bg-white text-xs focus:outline-none text-[#383B35]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6E65] mb-2">
                    Subtitle / Biochemical Classification
                  </label>
                  <input
                    type="text"
                    placeholder="Mitochondrial Longevity & Sirtuin Pathway Activator"
                    value={formData.subtitle}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, subtitle: e.target.value }))
                    }
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#F8F4EC] border border-[#D9CDB8] focus:border-[#9EAA96] focus:bg-white text-xs focus:outline-none text-[#383B35]"
                  />
                </div>

                {/* Color Palette Selector */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6E65] mb-2">
                    Brand Palette Accent Color
                  </label>
                  <div className="flex flex-wrap items-center gap-3">
                    {BRAND_PALETTE.map((pal) => (
                      <button
                        key={pal.hex}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, color: pal.hex }))
                        }
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition-all ${
                          formData.color.toLowerCase() === pal.hex.toLowerCase()
                            ? "border-[#383B35] bg-[#F8F4EC] shadow-sm ring-1 ring-[#383B35]"
                            : "border-[#E8DEC8] bg-white hover:bg-[#FAF7F0]"
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10"
                          style={{ backgroundColor: pal.hex }}
                        />
                        <span className="text-[#383B35] font-medium">{pal.name}</span>
                      </button>
                    ))}
                    <div className="flex items-center gap-2 pl-2">
                      <span className="text-xs text-[#6B6E65]">Custom:</span>
                      <input
                        type="color"
                        value={formData.color}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, color: e.target.value }))
                        }
                        className="w-8 h-8 rounded-full border-0 cursor-pointer bg-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6E65] mb-2">
                    Formulation Packaging PNG (Transparent Preferred)
                  </label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="text-xs text-[#6B6E65] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#383B35] file:text-[#F8F4EC] hover:file:bg-[#657363] file:cursor-pointer"
                    />

                    {imagePreview && (
                      <div className="flex items-center gap-3 p-2 rounded-2xl bg-[#F8F4EC] border border-[#D9CDB8]">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-12 h-12 object-contain"
                        />
                        <div className="text-xs">
                          <p className="font-medium text-[#383B35]">Selected Image</p>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedFile(null);
                              setImagePreview(null);
                              if (fileInputRef.current) fileInputRef.current.value = "";
                            }}
                            className="text-rose-600 hover:underline text-[11px]"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6E65] mb-2">
                      Scientific Description
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Comprehensive bio-cellular formulation profile..."
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, description: e.target.value }))
                      }
                      className="w-full p-4 rounded-2xl bg-[#F8F4EC] border border-[#D9CDB8] focus:border-[#9EAA96] focus:bg-white text-xs focus:outline-none text-[#383B35] leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6E65] mb-2">
                      Daily Usage Protocol (How to Consume)
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Take 2 capsules 20 minutes prior to morning nutrition..."
                      value={formData.howToConsume}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, howToConsume: e.target.value }))
                      }
                      className="w-full p-4 rounded-2xl bg-[#F8F4EC] border border-[#D9CDB8] focus:border-[#9EAA96] focus:bg-white text-xs focus:outline-none text-[#383B35] leading-relaxed"
                    />
                  </div>
                </div>

                {/* Benefits Array */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6E65] mb-2">
                    Evidence-Backed Clinical Benefits
                  </label>
                  <div className="flex items-center gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="e.g. Elevates NAD+ pool by up to 40% in clinical human trials"
                      value={currentBenefitInput}
                      onChange={(e) => setCurrentBenefitInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddBenefit();
                        }
                      }}
                      className="flex-1 px-4 py-2.5 rounded-2xl bg-[#F8F4EC] border border-[#D9CDB8] text-xs focus:outline-none text-[#383B35]"
                    />
                    <button
                      type="button"
                      onClick={handleAddBenefit}
                      className="px-4 py-2.5 rounded-2xl bg-[#657363] text-white text-xs font-medium hover:bg-[#383B35] transition-all"
                    >
                      Add Benefit
                    </button>
                  </div>

                  <div className="space-y-2">
                    {formData.benefits.map((b, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF7F0] border border-[#E8DEC8] text-xs"
                      >
                        <span className="text-[#383B35]">• {b}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveBenefit(idx)}
                          className="text-stone-400 hover:text-rose-600 transition-colors ml-4 text-xs font-bold"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8DEC8]">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-5 py-2.5 rounded-full border border-[#D9CDB8] text-xs font-medium text-[#6B6E65] hover:bg-[#FAF7F0]"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="px-7 py-3 rounded-full bg-[#383B35] text-[#F8F4EC] text-xs uppercase tracking-widest font-semibold hover:bg-[#657363] active:scale-95 transition-all shadow-md disabled:opacity-50"
                  >
                    {actionLoading
                      ? "Processing SKU..."
                      : isEditing
                      ? "Save Formulation Changes"
                      : "Create & Publish Formulation"}
                  </button>
                </div>
              </form>
            </section>
          </div>
        )}
      </main>

      {/* -------------------------------------------------------------------- */}
      {/* MODAL 1: CLIENT DETAILS & PROTOCOL VIEWER */}
      {/* -------------------------------------------------------------------- */}
      <AnimatePresence>
        {selectedClient && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-[#E8DEC8] shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between border-b border-[#E8DEC8] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#B99B89] text-white flex items-center justify-center font-serif text-lg">
                    {selectedClient.name
                      ? selectedClient.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")
                      : "CL"}
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-light text-[#383B35]">
                      {selectedClient.name}
                    </h3>
                    <p className="text-xs text-[#6B6E65]">
                      {selectedClient.email} {selectedClient.phone && `• ${selectedClient.phone}`}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedClient(null)}
                  className="w-8 h-8 rounded-full bg-[#F8F4EC] text-[#6B6E65] hover:text-[#383B35] flex items-center justify-center text-sm"
                >
                  ✕
                </button>
              </div>

              {/* Status and Health Protocol */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-[#FAF7F0] border border-[#E8DEC8]">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#6B6E65] font-semibold">
                    Health Protocol Goal
                  </p>
                  <p className="text-sm font-medium text-[#383B35] mt-0.5">
                    {selectedClient.healthGoal || "General Longevity"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#6B6E65] font-semibold">
                    Lifecycle Status
                  </p>
                  <p className="text-sm font-medium text-emerald-800 mt-0.5">
                    {selectedClient.status || "Customer"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#6B6E65] font-semibold">
                    Lifetime Value (LTV)
                  </p>
                  <p className="text-sm font-semibold text-[#383B35] mt-0.5">
                    ${Number(selectedClient.lifetimeValue || 0).toFixed(2)} ({selectedClient.ordersCount || 0} orders)
                  </p>
                </div>
              </div>

              {/* Subscribed Stack */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#6B6E65] mb-2">
                  Active Longevity Stack Subscriptions
                </h4>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(selectedClient.subscribedTo) && selectedClient.subscribedTo.length > 0 ? (
                    selectedClient.subscribedTo.map((sub, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-[#91ACB5]/20 text-[#383B35] text-xs font-medium"
                      >
                        ✓ {sub}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-[#6B6E65] italic">No active subscriptions</span>
                  )}
                </div>
              </div>

              {/* Clinical Notes */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#6B6E65] mb-2">
                  Clinical & Protocol Notes
                </h4>
                <div className="p-4 rounded-2xl bg-[#F8F4EC] border border-[#D9CDB8] text-xs text-[#383B35] whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                  {selectedClient.notes || "No previous notes recorded for this client."}
                </div>
              </div>

              {/* Append Note */}
              <div className="space-y-2 pt-2 border-t border-[#E8DEC8]">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6E65]">
                  Append New Consultation Note
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Log conversation, biological biomarker note, courier preference..."
                    value={newNoteInput}
                    onChange={(e) => setNewNoteInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddNoteToClient();
                      }
                    }}
                    className="flex-1 px-4 py-2.5 rounded-2xl bg-[#F8F4EC] border border-[#D9CDB8] text-xs focus:outline-none text-[#383B35]"
                  />
                  <button
                    type="button"
                    onClick={handleAddNoteToClient}
                    className="px-4 py-2.5 rounded-2xl bg-[#383B35] text-white text-xs font-semibold uppercase hover:bg-[#657363] transition-all"
                  >
                    Add Note
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* -------------------------------------------------------------------- */}
      {/* MODAL 2: ADD NEW CLIENT */}
      {/* -------------------------------------------------------------------- */}
      <AnimatePresence>
        {isAddClientOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#E8DEC8] shadow-2xl space-y-6"
            >
              <div className="flex items-start justify-between border-b border-[#E8DEC8] pb-4">
                <div>
                  <h3 className="font-serif text-2xl font-light text-[#383B35]">
                    Enrol New CRM Client
                  </h3>
                  <p className="text-xs text-[#6B6E65]">
                    Add client contact details and individualized longevity targets.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddClientOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#F8F4EC] text-[#6B6E65] hover:text-[#383B35] flex items-center justify-center text-sm"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateCustomer} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#6B6E65] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Julian Vance"
                    value={newClientData.name}
                    onChange={(e) =>
                      setNewClientData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#F8F4EC] border border-[#D9CDB8] text-[#383B35] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#6B6E65] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="client@longevity.org"
                      value={newClientData.email}
                      onChange={(e) =>
                        setNewClientData((prev) => ({ ...prev, email: e.target.value }))
                      }
                      className="w-full px-4 py-2.5 rounded-2xl bg-[#F8F4EC] border border-[#D9CDB8] text-[#383B35] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#6B6E65] mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={newClientData.phone}
                      onChange={(e) =>
                        setNewClientData((prev) => ({ ...prev, phone: e.target.value }))
                      }
                      className="w-full px-4 py-2.5 rounded-2xl bg-[#F8F4EC] border border-[#D9CDB8] text-[#383B35] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#6B6E65] mb-1.5">
                      Health Protocol Focus
                    </label>
                    <select
                      value={newClientData.healthGoal}
                      onChange={(e) =>
                        setNewClientData((prev) => ({ ...prev, healthGoal: e.target.value }))
                      }
                      className="w-full px-4 py-2.5 rounded-2xl bg-[#F8F4EC] border border-[#D9CDB8] text-[#383B35] focus:outline-none"
                    >
                      <option value="Biological Age Reversal">Biological Age Reversal</option>
                      <option value="Sleep Architecture & Cortisol">Sleep Architecture & Cortisol</option>
                      <option value="Cellular NAD+ Optimization">Cellular NAD+ Optimization</option>
                      <option value="Executive Cognitive Longevity">Executive Cognitive Longevity</option>
                      <option value="Metabolic Glycemic Harmony">Metabolic Glycemic Harmony</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#6B6E65] mb-1.5">
                      Lifecycle Tier
                    </label>
                    <select
                      value={newClientData.status}
                      onChange={(e) =>
                        setNewClientData((prev) => ({ ...prev, status: e.target.value }))
                      }
                      className="w-full px-4 py-2.5 rounded-2xl bg-[#F8F4EC] border border-[#D9CDB8] text-[#383B35] focus:outline-none"
                    >
                      <option value="VIP Subscriber">VIP Subscriber</option>
                      <option value="Active Customer">Active Customer</option>
                      <option value="High Intent Lead">High Intent Lead</option>
                      <option value="New Lead">New Lead</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#6B6E65] mb-1.5">
                    Initial Protocol Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Biomarker preferences, concierge notes, referral source..."
                    value={newClientData.notes}
                    onChange={(e) =>
                      setNewClientData((prev) => ({ ...prev, notes: e.target.value }))
                    }
                    className="w-full p-3 rounded-2xl bg-[#F8F4EC] border border-[#D9CDB8] text-[#383B35] focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8DEC8]">
                  <button
                    type="button"
                    onClick={() => setIsAddClientOpen(false)}
                    className="px-4 py-2 rounded-full border border-[#D9CDB8] text-[#6B6E65] hover:bg-[#FAF7F0]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#383B35] text-white uppercase tracking-wider font-semibold hover:bg-[#657363] transition-all shadow-md"
                  >
                    Save Client Profile
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* -------------------------------------------------------------------- */}
      {/* MODAL 3: RECORD INBOUND LEAD */}
      {/* -------------------------------------------------------------------- */}
      <AnimatePresence>
        {isAddLeadOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#E8DEC8] shadow-2xl space-y-6"
            >
              <div className="flex items-start justify-between border-b border-[#E8DEC8] pb-4">
                <div>
                  <h3 className="font-serif text-2xl font-light text-[#383B35]">
                    Record Inbound Lead
                  </h3>
                  <p className="text-xs text-[#6B6E65]">
                    Capture consultation or diagnostic inquiry.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddLeadOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#F8F4EC] text-[#6B6E65] hover:text-[#383B35] flex items-center justify-center text-sm"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#6B6E65] mb-1.5">
                    Lead Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Camilla Laurent"
                    value={newLeadData.name}
                    onChange={(e) =>
                      setNewLeadData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#F8F4EC] border border-[#D9CDB8] text-[#383B35] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#6B6E65] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="prospect@biolabs.org"
                    value={newLeadData.email}
                    onChange={(e) =>
                      setNewLeadData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#F8F4EC] border border-[#D9CDB8] text-[#383B35] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#6B6E65] mb-1.5">
                    Longevity Goal
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mitochondrial & Cellular Energy"
                    value={newLeadData.goal}
                    onChange={(e) =>
                      setNewLeadData((prev) => ({ ...prev, goal: e.target.value }))
                    }
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#F8F4EC] border border-[#D9CDB8] text-[#383B35] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#6B6E65] mb-1.5">
                    Inbound Acquisition Channel
                  </label>
                  <select
                    value={newLeadData.source}
                    onChange={(e) =>
                      setNewLeadData((prev) => ({ ...prev, source: e.target.value }))
                    }
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#F8F4EC] border border-[#D9CDB8] text-[#383B35] focus:outline-none"
                  >
                    <option value="Daily Spiral Diagnostic Quiz">Daily Spiral Diagnostic Quiz</option>
                    <option value="Website Newsletter Popup">Website Newsletter Popup</option>
                    <option value="Direct Consultation Request">Direct Consultation Request</option>
                    <option value="Concierge Clinic Referral">Concierge Clinic Referral</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8DEC8]">
                  <button
                    type="button"
                    onClick={() => setIsAddLeadOpen(false)}
                    className="px-4 py-2 rounded-full border border-[#D9CDB8] text-[#6B6E65] hover:bg-[#FAF7F0]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#383B35] text-white uppercase tracking-wider font-semibold hover:bg-[#657363] transition-all shadow-md"
                  >
                    Record Lead
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
