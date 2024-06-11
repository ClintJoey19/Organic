"use server";
import { Order } from "../models/order.model";
import { connectToDB } from "../mongoose";
import { parseJSON } from "../utils";
import { deleteAllCheckedItems, deleteCartItem } from "./cart-item.action";
import { createOrderItem } from "./order-item.action";

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

interface IOrderItems {
  productId: string;
  quantity: number;
}

export const createOrder = async (
  userId: string,
  products: IOrderItems[],
  total: number,
  payment: string,
  address: string,
  isInCart: boolean
) => {
  try {
    await connectToDB();

    const order = new Order({
      userId: userId,
      status: "pending",
      total,
      payment,
      address,
    });

    const { _id } = await order.save();

    // saved the products as orderItems
    for (const product of products) {
      await createOrderItem(_id, product.productId, product.quantity);
    }

    // delete the cartItems if the products came from cart
    if (isInCart) await deleteAllCheckedItems(userId);
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
