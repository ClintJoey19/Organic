"use server";
import { revalidatePath } from "next/cache";
import { CartItem } from "../models/cart-item.model";
import { connectToDB } from "../mongoose";
import { parseJSON } from "../utils";

export const getCartItems = async () => {
  try {
    await connectToDB();

    const res = await CartItem.find().sort({ createdAt: -1 });

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
  quantity: number,
  path: string
) => {
  try {
    await connectToDB();

    const item = new CartItem({
      userId,
      productId,
      quantity,
      isChecked: false,
    });

    await item.save();
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
