import { Router } from 'express';

const router = Router();

let orders = [
  {
    id: 'ORD-78912',
    customerName: 'Dr. Julian Vance',
    customerEmail: 'j.vance@longevityinstitute.org',
    items: [
      { id: 'ageless-nmn-resveratrol', name: 'Cellular NAD+ & Trans-Resveratrol', quantity: 2, price: 88.0 }
    ],
    total: 176.0,
    status: 'Shipped',
    date: '2026-10-18T09:24:00Z',
    trackingNumber: 'AGL-EXP-9021-EU'
  }
];

// GET /api/orders
router.get('/', (req, res) => {
  res.json({ success: true, count: orders.length, data: orders });
});

// POST /api/orders - Create new order
router.post('/', (req, res) => {
  const { customerName, customerEmail, items, total, shippingAddress } = req.body;
  if (!customerEmail || !items || !items.length) {
    return res.status(400).json({ success: false, message: 'Invalid order payload' });
  }

  const newOrder = {
    id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
    customerName: customerName || 'Valued Client',
    customerEmail,
    items,
    total: total || items.reduce((acc, it) => acc + (it.price * (it.quantity || 1)), 0),
    status: 'Confirmed',
    shippingAddress: shippingAddress || 'Not specified',
    date: new Date().toISOString(),
    trackingNumber: `AGL-EXP-${Math.floor(1000 + Math.random() * 9000)}`
  };

  orders.unshift(newOrder);
  res.status(201).json({ success: true, data: newOrder });
});

export default router;
