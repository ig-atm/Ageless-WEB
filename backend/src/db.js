import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, '../data/products.json');

// Ensure data directory exists
const dataDir = path.dirname(DATA_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initial seed products
const initialProducts = [
  {
    id: 'deep-sleep',
    name: 'Deep Sleep',
    subtitle: 'Rest & Circadian Rhythm Support',
    price: 64.0,
    color: '#B99B89', // Soft Clay
    imagePath: '/uploads/products/deep-sleep.png',
    description:
      'A bio-optimized restorative night formula designed to naturally align your circadian biology, modulate nocturnal cortisol spikes, and guide neural pathways into sustained deep slow-wave and REM sleep phases.',
    benefits: [
      'Facilitates smooth, natural transition into deep sleep without next-day brain fog',
      'Prolongs restorative REM & slow-wave stages for neurological cellular repair',
      'Calms evening autonomic HPA-axis activation and nocturnal muscle tension',
      'Formulated with Chelated Magnesium Bisglycinate, L-Theanine, Apigenin & Tart Cherry'
    ],
    howToConsume:
      'Take 2 capsules with 250ml of warm water or chamomile tea 45–60 minutes before bed. Dim artificial lighting after consumption to maximize endogenous melatonin synergy.'
  },
  {
    id: 'glass-glow',
    name: 'Glass Glow',
    subtitle: 'Skin, Hair & Cellular Matrix',
    price: 78.0,
    color: '#D8B4AE', // Soft Blush Pink
    imagePath: '/uploads/products/glass-glow.png',
    description:
      'A clinical-grade dermal elixir combining bioavailable marine collagen peptides, liposomal glutathione, cold-extracted phytoceramides, and botanical hyaluronic acid to fortify your extracellular matrix and awaken translucent skin luminosity.',
    benefits: [
      'Stimulates endogenous Type I & III collagen synthesis to enhance skin density',
      'Fortifies lipid moisture barrier against environmental oxidative pollution',
      'Diminishes appearance of fine micro-creases while boosting dermal hydration',
      'Enriched with Liposomal Glutathione, French Maritime Pine Bark & Biotin'
    ],
    howToConsume:
      'Stir 1 level scoop (6g) into 200ml of room temperature water, coconut water, or your morning matcha. Best enjoyed in the morning 20 minutes before breakfast.'
  },
  {
    id: 'slim-support',
    name: 'Slim Support',
    subtitle: 'Metabolic Harmony & AMPK Activation',
    price: 72.0,
    color: '#9EAA96', // Muted Sage Green
    imagePath: '/uploads/products/slim-support.png',
    description:
      'An advanced phytotherapeutic compound engineered to activate the cellular AMPK longevity pathway, moderate postprandial glucose surges, and sustain metabolic equilibrium throughout demanding days.',
    benefits: [
      'Activates AMPK longevity switch to optimize nutrient partitioning',
      'Buffers post-meal glucose spikes and attenuates mid-afternoon energy slumps',
      'Promotes mitochondrial fatty acid beta-oxidation and gut microbiome harmony',
      'Features Micro-encapsulated Berberine Phytosome, Chromium & Decaf EGCG'
    ],
    howToConsume:
      'Take 1 capsule twice daily, approximately 15 minutes before your two main meals of the day with water. Maintain consistent daily timing for optimal glycemic balance.'
  },
  {
    id: 'clear-vision-omega-3',
    name: 'Clear Vision Omega-3',
    subtitle: 'Retinal Longevity & Neural Focus',
    price: 68.0,
    color: '#91ACB5', // Soft Ocean Blue
    imagePath: '/uploads/products/clear-vision-omega-3.png',
    description:
      'Sustainably harvested from wild Arctic fisheries using gentle supercritical CO2 extraction. Calibrated with clinical ratios of EPA, DHA, FloraGLO® Lutein, Zeaxanthin, and natural Astaxanthin to safeguard macular integrity and sharpen cognitive acuity.',
    benefits: [
      'Shields delicate photoreceptor cells against high-energy blue light emissions',
      'Soothes digital eye strain, dryness, and visual fatigue during screen work',
      'Nourishes neural phospholipid membranes for sustained executive mental clarity',
      'Zero fishy regurgitation, gently flavored with cold-pressed Sicilian organic orange oil'
    ],
    howToConsume:
      'Take 2 softgels daily with a meal containing healthy dietary fats (e.g. avocado, olive oil, or whole eggs) for optimal carotenoid and lipid absorption.'
  }
];

// Seed initial JSON file if empty
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(initialProducts, null, 2), 'utf-8');
}

export function readProductsData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return initialProducts;
  }
}

export function writeProductsData(products) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), 'utf-8');
}

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('ℹ️  MONGODB_URI not specified. Using local persistent JSON datastore for CRM products.');
    return false;
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 2500 });
    console.log('🌿 Connected successfully to MongoDB.');
    return true;
  } catch (err) {
    console.warn('⚠️  Could not connect to MongoDB:', err.message);
    console.log('ℹ️  Falling back to persistent JSON datastore for CRM products.');
    return false;
  }
}
