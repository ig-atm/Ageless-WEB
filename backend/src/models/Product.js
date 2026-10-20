import mongoose from 'mongoose';

/**
 * Product Schema for Ageless Supplement Brand CRM & Catalog
 */
const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, 'Product slug ID is required'],
      unique: true,
      trim: true,
      lowercase: true,
      index: true
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: 0
    },
    color: {
      type: String,
      default: '#B99B89', // Defaults to Soft Clay, customizable to brand palette
      trim: true
    },
    imagePath: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    benefits: {
      type: [String],
      default: []
    },
    howToConsume: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
