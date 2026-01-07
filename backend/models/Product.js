// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product_title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  year_of_manufacture: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  dimensions: {
    length: { type: Number },
    width: { type: Number },
    height: { type: Number },
  },
  material: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  original_packaging: {
    type: Boolean,
    default: false,
  },
  manual_included: {
    type: Boolean,
    default: false,
  },
  working_condition_description: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    enum: ["New", "Used", "Refurbished"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Available", "Sold"],
    required: true,
    default: "Available",
  },
  category: {
    type: String,
    enum: [
      "Furniture",
      "Clothes",
      "Electronics",
      "Beddings",
      "Wearables",
      "Home Decor",
      "Study Material",
      "Kitchen Appliances",
    ],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  seller_name: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("Product", productSchema);