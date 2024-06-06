import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 1,
      required: true,
    },
    description: {
      type: String,
      min: 1,
    },
    price: {
      type: Number || null,
      min: 1,
    },
    stocks: {
      type: Number || null,
    },
    ratings: {
      type: Number,
    },
    sold: {
      type: Number,
    },
    productImg: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Product =
  mongoose.models?.Product || mongoose.model("Product", productSchema);
