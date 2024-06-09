"use server";
import { Order } from "../models/order.model";
import { connectToDB } from "../mongoose";
import { parseJSON } from "../utils";

export const getOrders = async () => {
  try {
    await connectToDB();

    const res = await Order.find();

    if (!res) throw new Error("There was an error fetching the orders");

    return parseJSON(res);
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getOrder = async (id: string) => {
  try {
    await connectToDB();

    const res = await Order.findById(id);

    if (!res) throw new Error("There was an error fetching the order");

    return parseJSON(res);
  } catch (error: any) {
    console.error(error.message);
  }
};

export const createOrder = async (
  productId: string,
  quantity: number,
  total: number,
  payment: string,
  address: string
) => {
  try {
    await connectToDB();

    const order = new Order({
      userId: "", // pending
      productId,
      quantity,
      status: "pending",
      total,
      payment,
      address,
    });

    await order.save();
  } catch (error: any) {
    console.error(error.message);
  }
};

export const updateOrder = async (id: string) => {
  try {
  } catch (error: any) {
    console.error(error.message);
  }
};

export const deleteOrder = async (id: string) => {
  try {
    await connectToDB();

    await Order.findByIdAndDelete(id);
  } catch (error: any) {
    console.error(error.message);
  }
};
