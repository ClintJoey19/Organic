import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
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
    arrival: {
      month: {
        type: Number,
        required: true,
      },
      day: {
        type: Number,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
    },
  },
  { timestamps: true }
);

export const Order =
  mongoose.models?.Order || mongoose.model("Order", orderSchema);
