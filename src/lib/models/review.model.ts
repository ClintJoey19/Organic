import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      min: 1,
      required: true,
    },
  },
  { timestamps: true }
);

export const Review =
  mongoose.models?.Review || mongoose.model("Review", reviewSchema);
