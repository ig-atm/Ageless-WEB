import { Router } from 'express';
import { upload } from '../middleware/upload.js';
import { Product } from '../models/Product.js';
import { readProductsData, writeProductsData } from '../db.js';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';

const router = Router();

// Helper to normalize benefits array from body
function parseBenefits(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.map(b => String(b).trim()).filter(Boolean);
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed.map(b => String(b).trim()).filter(Boolean);
    } catch (_) {
      // Comma or newline separated fallback
      return raw.split(/\r?\n|,/).map(b => b.trim()).filter(Boolean);
    }
  }
  return [];
}

/**
 * GET /api/products
 * Retrieve all products in the CRM catalog
 */
router.get('/', async (req, res) => {
  try {
    // If MongoDB is connected
    if (mongoose.connection.readyState === 1) {
      const dbProducts = await Product.find().sort({ createdAt: -1 });
      return res.json({
        success: true,
        count: dbProducts.length,
        source: 'mongodb',
        data: dbProducts
      });
    }

    // Local datastore fallback
    const products = readProductsData();
    res.json({
      success: true,
      count: products.length,
      source: 'local-store',
      data: products
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * GET /api/products/:id
 * Retrieve a single product by its unique slug ID
 */
router.get('/:id', async (req, res) => {
  try {
    const slug = req.params.id.toLowerCase();

    if (mongoose.connection.readyState === 1) {
      const dbProduct = await Product.findOne({ id: slug });
      if (!dbProduct) {
        return res.status(404).json({ success: false, message: `Product '${slug}' not found` });
      }
      return res.json({ success: true, data: dbProduct });
    }

    const products = readProductsData();
    const product = products.find((p) => p.id === slug);
    if (!product) {
      return res.status(404).json({ success: false, message: `Product '${slug}' not found` });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * POST /api/products
 * Create a new product with optional SKU PNG file upload
 */
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { id, name, subtitle, price, color, description, benefits, howToConsume } = req.body;

    if (!id || !name || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: 'id' (slug), 'name', and 'price' are required."
      });
    }

    const slug = id.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
    const imagePath = req.file ? `/uploads/products/${req.file.filename}` : (req.body.imagePath || '');
    const parsedBenefits = parseBenefits(benefits);

    const newProductData = {
      id: slug,
      name: name.trim(),
      subtitle: subtitle ? subtitle.trim() : '',
      price: Number(price) || 0,
      color: color || '#B99B89',
      imagePath,
      description: description ? description.trim() : '',
      benefits: parsedBenefits,
      howToConsume: howToConsume ? howToConsume.trim() : ''
    };

    if (mongoose.connection.readyState === 1) {
      const existing = await Product.findOne({ id: slug });
      if (existing) {
        return res.status(409).json({ success: false, message: `Product with slug '${slug}' already exists.` });
      }
      const created = await Product.create(newProductData);
      return res.status(201).json({
        success: true,
        message: 'Product created successfully in CRM database',
        data: created
      });
    }

    // Local datastore
    const products = readProductsData();
    if (products.some((p) => p.id === slug)) {
      return res.status(409).json({ success: false, message: `Product with slug '${slug}' already exists.` });
    }

    products.push(newProductData);
    writeProductsData(products);

    res.status(201).json({
      success: true,
      message: 'Product created successfully in CRM datastore',
      data: newProductData
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * PUT /api/products/:id
 * Update an existing product, with optional replacement image upload
 */
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const slug = req.params.id.toLowerCase();
    const { name, subtitle, price, color, description, benefits, howToConsume } = req.body;

    const updates = {};
    if (name !== undefined) updates.name = name.trim();
    if (subtitle !== undefined) updates.subtitle = subtitle.trim();
    if (price !== undefined) updates.price = Number(price);
    if (color !== undefined) updates.color = color.trim();
    if (description !== undefined) updates.description = description.trim();
    if (benefits !== undefined) updates.benefits = parseBenefits(benefits);
    if (howToConsume !== undefined) updates.howToConsume = howToConsume.trim();

    if (req.file) {
      updates.imagePath = `/uploads/products/${req.file.filename}`;
    } else if (req.body.imagePath !== undefined) {
      updates.imagePath = req.body.imagePath;
    }

    if (mongoose.connection.readyState === 1) {
      const updated = await Product.findOneAndUpdate(
        { id: slug },
        { $set: updates },
        { new: true, runValidators: true }
      );
      if (!updated) {
        return res.status(404).json({ success: false, message: `Product '${slug}' not found` });
      }
      return res.json({
        success: true,
        message: `Product '${slug}' updated successfully`,
        data: updated
      });
    }

    // Local datastore
    const products = readProductsData();
    const index = products.findIndex((p) => p.id === slug);
    if (index === -1) {
      return res.status(404).json({ success: false, message: `Product '${slug}' not found` });
    }

    products[index] = { ...products[index], ...updates };
    writeProductsData(products);

    res.json({
      success: true,
      message: `Product '${slug}' updated successfully`,
      data: products[index]
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * DELETE /api/products/:id
 * Remove a product from the CRM catalog
 */
router.delete('/:id', async (req, res) => {
  try {
    const slug = req.params.id.toLowerCase();

    if (mongoose.connection.readyState === 1) {
      const deleted = await Product.findOneAndDelete({ id: slug });
      if (!deleted) {
        return res.status(404).json({ success: false, message: `Product '${slug}' not found` });
      }
      return res.json({
        success: true,
        message: `Product '${slug}' deleted successfully`,
        data: deleted
      });
    }

    // Local datastore
    const products = readProductsData();
    const index = products.findIndex((p) => p.id === slug);
    if (index === -1) {
      return res.status(404).json({ success: false, message: `Product '${slug}' not found` });
    }

    const [deleted] = products.splice(index, 1);
    writeProductsData(products);

    res.json({
      success: true,
      message: `Product '${slug}' deleted successfully`,
      data: deleted
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
