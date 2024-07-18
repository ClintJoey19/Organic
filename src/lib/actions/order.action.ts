"use server";
import { revalidatePath } from "next/cache";
import { Order } from "../models/order.model";
import { connectToDB } from "../mongoose";
import { calculateArrivalDate, isAdmin, parseJSON } from "../utils";
import { deleteAllCheckedItems } from "./cart-item.action";
import { createOrderItem } from "./order-item.action";

const pendingStatus = ["pending", "shipping", "delivered"];
const completedStatus = ["received", "reviewed"];

export const getOrders = async (page = 1) => {
  try {
    await connectToDB();

    const limit = 10;
    const skip = (page - 1) * limit;

    const ordersCount = await Order.countDocuments();

    const res = await Order.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    if (!res) throw new Error("There was an error fetching the orders");

    const hasNextPage = skip + limit < ordersCount;

    return { data: parseJSON(res), hasNextPage };
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getUserOrders = async (
  userId: string | null,
  isCompleted: boolean
) => {
  try {
    await connectToDB();

    const res = await Order.find({
      userId: userId,
      status: { $in: isCompleted ? completedStatus : pendingStatus },
    }).sort({ createdAt: 1 });

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
      arrival: calculateArrivalDate(new Date()),
    });

    const { _id } = await order.save();

    // saved the products as orderItems
    for (const product of products) {
      await createOrderItem(_id, product.productId, product.quantity);
    }

    // delete the cartItems if the products came from cart
    if (isInCart) await deleteAllCheckedItems(userId);
    revalidatePath("/checkout/success");
  } catch (error: any) {
    console.error(error.message);
  }
};

export const updateOrder = async (
  id: string,
  key: string,
  value: string | number
) => {
  try {
    await connectToDB();

    await Order.findByIdAndUpdate(id, {
      [key]: value,
    });

    revalidatePath("/transactions");
  } catch (error: any) {
    console.error(error.message);
  }
};

export const deleteOrder = async (id: string) => {
  try {
    await connectToDB();

    await Order.findByIdAndDelete(id);
    revalidatePath("/transactions");
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getOrdersCount = async () => {
  try {
    await connectToDB();

    const count = await Order.countDocuments();

    return count;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getDailyMonthSales = async (month: number, year: number) => {
  try {
    await isAdmin();

    await connectToDB();

    const startDate = new Date(year, 6, 1);
    const endDate = new Date(year, 7, 0);

    const pipeline = [
      {
        $match: {
          arrival: {
            month,
            year,
          }, // Filter by arrival month and creation date
        },
      },
      {
        $group: {
          _id: { day: { $dayOfMonth: "$createdAt" } },
          totalSales: { $sum: "$total" }, // Sum the total for each day
        },
      },
    ];

    const sales = await Order.aggregate(pipeline);
    return parseJSON(sales);
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getTotalSales = async (): Promise<number | undefined> => {
  try {
    await connectToDB();

    const salesTotal = await Order.aggregate([
      { $match: { status: { $in: ["delivered", "received"] } } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);

    return salesTotal[0].total;
  } catch (error: any) {
    console.error(error.message);
  }
};
