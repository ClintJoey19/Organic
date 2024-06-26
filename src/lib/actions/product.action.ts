"use server";
import { revalidatePath } from "next/cache";
import { Product } from "../models/product.model";
import { connectToDB } from "../mongoose";
import { parseJSON, setSortQuery } from "../utils";

interface Filters {
  page?: number;
  isPublished?: boolean;
  category?: string;
  name?: string;
  price?: string;
}

export const getProducts = async ({
  page = 1,
  isPublished,
  category,
  name,
  price,
}: Filters) => {
  try {
    await connectToDB();

    const limit = 10;
    const skip = (page - 1) * limit;
    let filterQuery = {};
    let sortQuery = {};

    if (isPublished !== null && isPublished !== undefined)
      filterQuery = { ...filterQuery, isPublished: isPublished };

    if (category && category !== "all")
      filterQuery = { ...filterQuery, category };

    if (name) {
      sortQuery = setSortQuery(sortQuery, "name", name);
    }

    if (price) {
      sortQuery = setSortQuery(sortQuery, "price", price);
    }

    const res = await Product.find(filterQuery)
      .sort(sortQuery)
      .limit(limit)
      .skip(skip);

    if (!res) throw new Error("There was an error fetching the products");

    return parseJSON(res);
  } catch (error: any) {
    console.error(error.message);
    throw new Error("Failed to get products");
  }
};

export const getProduct = async (id: string) => {
  try {
    await connectToDB();

    const res = await Product.findById(id);

    if (!res) throw new Error("There was an error fetching the product");

    return parseJSON(res);
  } catch (error: any) {
    console.error(error.message);
    throw new Error("Failed to fetch the product");
  }
};

export const addProduct = async (name: string) => {
  try {
    await connectToDB();

    const product = new Product({
      name,
      isPublished: false,
    });

    const res = await product.save();

    if (!res) throw new Error("There was an error adding the product");

    return parseJSON(res);
  } catch (error: any) {
    console.error(error.message);
    throw new Error("Failed to add product");
  }
};

export const editProduct = async (id: string, key: string, value: any) => {
  try {
    await connectToDB();

    const product = await Product.findByIdAndUpdate(id, {
      [key]: value,
    });

    if (!product) throw new Error("There was an error updating the product");

    revalidatePath(`/admin/products/${id}`);
  } catch (error: any) {
    console.error(error.message);
    throw new Error("Failed to edit the product");
  }
};

export const updateSoldCount = async (id: string, quantity: number) => {
  try {
    await connectToDB();

    await Product.findByIdAndUpdate(id, {
      $inc: { sold: quantity, stocks: -quantity },
    });
  } catch (error: any) {
    console.error(error.message);
  }
};

export const deleteProduct = async (id: string) => {
  try {
    await connectToDB();

    await Product.findByIdAndDelete(id);
  } catch (error: any) {
    console.error(error.message);
  }
};
