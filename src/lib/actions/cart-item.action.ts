"use server";
import { revalidatePath } from "next/cache";
import { CartItem } from "../models/cart-item.model";
import { connectToDB } from "../mongoose";
import { parseJSON } from "../utils";

export const getCartItems = async (userId: string) => {
  try {
    await connectToDB();

    const res = await CartItem.find({ userId: userId }).sort({ createdAt: -1 });

    if (!res) throw new Error("There was an error fetching the cart items.");

    return parseJSON(res);
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getCartItem = async (id: string) => {
  try {
    await connectToDB();

    const res = await CartItem.findById(id);

    if (!res) throw new Error("There was an error fetching the cart item.");

    return parseJSON(res);
  } catch (error: any) {
    console.error(error.message);
  }
};

export const createCartItem = async (
  userId: string,
  productId: string,
  price: number,
  quantity: number,
  path: string
) => {
  try {
    await connectToDB();

    const filter = {
      userId,
      productId,
    };

    const item = await CartItem.findOneAndUpdate(
      filter,
      {
        userId,
        productId,
        price,
        $inc: { quantity: quantity },
        isChecked: false,
      },
      { upsert: true, new: true }
    );

    revalidatePath(path);
  } catch (error: any) {
    console.error(error.message);
  }
};

export const updateCartItem = async (
  id: string,
  key: string,
  value: number | boolean,
  path: string
) => {
  try {
    await connectToDB();

    await CartItem.findByIdAndUpdate(id, { [key]: value });
    revalidatePath(path);
  } catch (error: any) {
    console.error(error.message);
  }
};

export const deleteCartItem = async (id: string, path: string) => {
  try {
    await connectToDB();

    await CartItem.findByIdAndDelete(id);
    revalidatePath(path);
  } catch (error: any) {
    console.error(error.message);
  }
};
