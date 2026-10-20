import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import productsRouter from './routes/products.js';
import crmRouter from './routes/crm.js';
import ordersRouter from './routes/orders.js';
import { connectDB } from './db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to Database if MONGODB_URI provided (or fallback to persistent local store)
connectDB();

// Enable CORS for development frontend
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploaded PNG files at /uploads
const uploadsPath = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsPath));

// Request logger
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

// Root / Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    brand: 'Ageless Longevity Supplements',
    service: 'Ageless E-Commerce & Custom CRM Core API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/products', productsRouter);
app.use('/api/crm', crmRouter);
app.use('/api/orders', ordersRouter);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.originalUrl} not found on Ageless API server`
  });
});

// Global Error Handler (including Multer error handling)
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`✨ Ageless Longevity API & Custom CRM running on http://localhost:${PORT}`);
  console.log(`🌿 Brand Base Color: Pearl Ivory (#F8F4EC) | Primary: Charcoal Olive (#383B35)`);
  console.log(`📁 Static SKU PNG uploads mounted at: http://localhost:${PORT}/uploads`);
});
