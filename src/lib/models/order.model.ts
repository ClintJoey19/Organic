import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      required: true,
    },
    productId: {
      type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      required: true,
    },
    quantity: {
      type: Number,
      min: 1,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    payment: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Order =
  mongoose.models?.Order || mongoose.model("Order", orderSchema);
