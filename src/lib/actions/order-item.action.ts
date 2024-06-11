"use server";
import { revalidatePath } from "next/cache";
import { OrderItem } from "../models/order-item.model";
import { connectToDB } from "../mongoose";
import { parseJSON } from "../utils";
import { updateSoldCount } from "./product.action";

export const getOrderItems = async (orderId: string) => {
  try {
    await connectToDB();

    const res = await OrderItem.find({ orderId: orderId });

    if (!res) throw new Error("Could not find order items.");

    return parseJSON(res);
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getOrderItem = async (id: string) => {
  try {
    await connectToDB();

    const res = await OrderItem.findById(id);

    if (!res) throw new Error("Could not find order item.");

    return parseJSON(res);
  } catch (error: any) {
    console.error(error.message);
  }
};

export const createOrderItem = async (
  orderId: string,
  productId: string,
  quantity: number
) => {
  try {
    await connectToDB();

    const item = new OrderItem({
      orderId,
      productId,
      quantity,
    });

    const res = await item.save();

    if (res) await updateSoldCount(productId, quantity);
  } catch (error: any) {
    console.error(error.message);
  }
};

export const updateOrderItem = async (
  id: string,
  key: string,
  value: string | number
) => {
  try {
    await connectToDB();

    await OrderItem.findByIdAndUpdate(id, {
      [key]: value,
    });

    revalidatePath("/checkout");
  } catch (error: any) {
    console.error(error.message);
  }
};

export const deleteOrderItem = async (id: string, path: string) => {
  try {
    await connectToDB();

    await OrderItem.findByIdAndDelete(id);

    revalidatePath(path);
  } catch (error: any) {
    console.error(error.message);
  }
};
