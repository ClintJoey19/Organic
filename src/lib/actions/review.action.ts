"use server";
import { revalidatePath } from "next/cache";
import { Review } from "../models/review.model";
import { connectToDB } from "../mongoose";
import { parseJSON } from "../utils";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Product } from "../models/product.model";

export const getReviews = async (productId: string) => {
  try {
    await connectToDB();

    const res = await Review.find({
      productId,
    }).sort({ createdBy: -1 });

    if (!res) throw new Error("No product reviews found");

    return parseJSON(res);
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getUserReviews = async (userId: string, productId: string) => {
  try {
    await connectToDB();

    const res = await Review.find({
      userId,
      productId,
    });

    if (!res) throw new Error("No user reviews found");

    return parseJSON(res);
  } catch (error: any) {
    console.error(error.message);
  }
};

export const createReview = async (
  productId: string,
  rating: number,
  comment: string
) => {
  try {
    await connectToDB();

    const { userId } = await auth();

    if (!userId) redirect("/sign-in");

    const product = await Product.findById(productId);

    const filter = {
      userId,
      productId,
    };

    const review = new Review({
      userId,
      productId,
      rating,
      comment,
    });

    await review.save();

    if (review) {
      const averageRatings = product.ratings
        ? (product.ratings + rating) / 2
        : rating;

      await Product.findByIdAndUpdate(productId, {
        ratings: averageRatings,
      });
    }

    revalidatePath(`/products/${productId}`);
  } catch (error: any) {
    console.error(error.message);
  }
};

export const updateReview = async (
  id: string,
  productId: string,
  key: string,
  value: number | string
) => {
  try {
    await connectToDB();

    const newReview = await Review.findByIdAndUpdate(id, {
      [key]: value,
    });

    revalidatePath(`/products/${productId}`);
  } catch (error: any) {
    console.error(error.message);
  }
};

export const deleteReview = async (id: string, productId: string) => {
  try {
    await connectToDB();

    await Review.findByIdAndDelete(id);
    revalidatePath(`/products/${productId}`);
  } catch (error: any) {
    console.error(error.message);
  }
};
