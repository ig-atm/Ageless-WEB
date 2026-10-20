import { Router } from 'express';

const router = Router();

// In-memory CRM database for Ageless custom CRM
let customers = [
  {
    id: 'crm-cust-101',
    name: 'Dr. Julian Vance',
    email: 'j.vance@longevityinstitute.org',
    phone: '+1 (555) 234-8910',
    status: 'VIP Subscriber',
    stage: 'Retention',
    lifetimeValue: 1240.0,
    ordersCount: 9,
    subscribedTo: ['Cellular NAD+ & Trans-Resveratrol', 'Senolytic Cell Defence Complex'],
    healthGoal: 'Biological Age Reversal',
    lastContactDate: '2026-10-18',
    notes: 'Subscribed to quarterly biological biomarker testing bundle. Prefers morning courier deliveries.'
  },
  {
    id: 'crm-cust-102',
    name: 'Elena Rostova',
    email: 'elena.rostova@atelierdesign.ch',
    phone: '+41 79 555 8312',
    status: 'Active Customer',
    stage: 'Engagement',
    lifetimeValue: 460.0,
    ordersCount: 3,
    subscribedTo: ['Deep Circadian & Cortisol Rhythm'],
    healthGoal: 'Sleep Architecture & Cortisol Balance',
    lastContactDate: '2026-10-14',
    notes: 'Referred by concierge longevity clinic in Zurich.'
  },
  {
    id: 'crm-cust-103',
    name: 'Marcus Sterling',
    email: 'm.sterling@capitalpartners.co.uk',
    phone: '+44 20 7946 0918',
    status: 'High Intent Lead',
    stage: 'Consultation Scheduled',
    lifetimeValue: 0.0,
    ordersCount: 0,
    subscribedTo: [],
    healthGoal: 'Executive Cognitive Longevity',
    lastContactDate: '2026-10-20',
    notes: 'Booked 1-on-1 supplement protocol review with Ageless clinical advisor.'
  }
];

let leads = [
  {
    id: 'lead-01',
    name: 'Siddharth Rao',
    email: 'siddharth@quantumventures.in',
    goal: 'Cellular NAD+ Optimization',
    source: 'Daily Spiral Diagnostic Quiz',
    status: 'New',
    createdAt: '2026-10-20T10:15:00Z'
  },
  {
    id: 'lead-02',
    name: 'Camilla Laurent',
    email: 'c.laurent@biolabs.fr',
    goal: 'Mitochondrial Health',
    source: 'Website Newsletter Popup',
    status: 'Contacted',
    createdAt: '2026-10-19T14:30:00Z'
  }
];

// GET /api/crm/customers - List all customers with optional search & filter
router.get('/customers', (req, res) => {
  const { search, status } = req.query;
  let results = [...customers];

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.healthGoal.toLowerCase().includes(q)
    );
  }

  if (status) {
    results = results.filter((c) => c.status.toLowerCase() === status.toLowerCase());
  }

  res.json({ success: true, count: results.length, data: results });
});

// POST /api/crm/customers - Add customer to CRM
router.post('/customers', (req, res) => {
  const { name, email, phone, healthGoal, notes } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email are required' });
  }

  const newCustomer = {
    id: `crm-cust-${Date.now()}`,
    name,
    email,
    phone: phone || '',
    status: 'New Lead',
    stage: 'Acquisition',
    lifetimeValue: 0.0,
    ordersCount: 0,
    subscribedTo: [],
    healthGoal: healthGoal || 'General Longevity',
    lastContactDate: new Date().toISOString().split('T')[0],
    notes: notes || 'Lead captured via website'
  };

  customers.unshift(newCustomer);
  res.status(201).json({ success: true, data: newCustomer });
});

// GET /api/crm/leads
router.get('/leads', (req, res) => {
  res.json({ success: true, count: leads.length, data: leads });
});

// POST /api/crm/leads - Lead capture endpoint
router.post('/leads', (req, res) => {
  const { name, email, goal, source } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  const newLead = {
    id: `lead-${Date.now()}`,
    name: name || 'Anonymous Visitor',
    email,
    goal: goal || 'Longevity Protocol',
    source: source || 'Organic Web',
    status: 'New',
    createdAt: new Date().toISOString()
  };

  leads.unshift(newLead);
  res.status(201).json({ success: true, data: newLead });
});

// GET /api/crm/analytics - Overview metrics for CRM Dashboard
router.get('/analytics', (req, res) => {
  const totalLTV = customers.reduce((sum, c) => sum + c.lifetimeValue, 0);
  const activeSubscribers = customers.filter((c) => c.status.includes('Subscriber')).length;

  res.json({
    success: true,
    data: {
      totalCustomers: customers.length,
      activeSubscribers,
      totalLeads: leads.length,
      averageLTV: customers.length ? (totalLTV / customers.length).toFixed(2) : 0,
      totalRevenue: totalLTV.toFixed(2),
      retentionRate: '94.2%',
      brandHealthScore: 98
    }
  });
});

export default router;
