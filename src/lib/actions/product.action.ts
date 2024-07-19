"use server";
import { revalidatePath } from "next/cache";
import { Product } from "../models/product.model";
import { connectToDB } from "../mongoose";
import { parseJSON, setSortQuery } from "../utils";

interface Filters {
  page?: number;
  isPublished?: boolean;
  category?: string;
  sort?: string;
  dir?: string;
}

export const getProducts = async ({
  page = 1,
  isPublished,
  category,
  sort,
  dir,
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

    if (sort && dir) {
      sortQuery = setSortQuery(sortQuery, sort, dir);
    }

    const productsCount = await Product.countDocuments(filterQuery);

    const res = await Product.find(filterQuery)
      .sort(sortQuery)
      .limit(limit)
      .skip(skip);

    if (!res) throw new Error("There was an error fetching the products");

    const hasNextPage = skip + limit < productsCount;

    return { data: parseJSON(res), hasNextPage };
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

    revalidatePath("/admin/products");
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getProductsCount = async () => {
  try {
    await connectToDB();

    const count = await Product.countDocuments();

    return count;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getHighestSoldProducts = async (limit: number) => {
  try {
    await connectToDB();

    const products = await Product.find().sort({ sold: -1 }).limit(limit);

    if (!products) throw new Error("Products not found");

    return parseJSON(products);
  } catch (error: any) {
    console.error(error.message);
  }
};
