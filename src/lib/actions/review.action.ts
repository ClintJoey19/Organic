"use server";
import { revalidatePath } from "next/cache";
import { Review } from "../models/review.model";
import { connectToDB } from "../mongoose";
import { parseJSON } from "../utils";

export const getReviews = async (productId: string) => {
  try {
    await connectToDB();

    const res = await Review.find({
      productId,
    });

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
  userId: string,
  productId: string,
  rating: number,
  comment: string
) => {
  try {
    await connectToDB();

    const filter = {
      userId,
      productId,
    };

    const review = await Review.findOneAndUpdate(
      filter,
      {
        userId,
        productId,
        rating,
        comment,
      },
      { upsert: true, new: true }
    );

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
