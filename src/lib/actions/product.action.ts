"use server";
import { Product } from "../models/product.model";
import { connectToDB } from "../mongoose";
import { parseJSON } from "../utils";

export const getProducts = async () => {
  try {
    await connectToDB();

    const res = await Product.find();

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
      name: name,
    });

    const res = await product.save();

    if (!res) throw new Error("There was an error adding the product");

    return parseJSON(res);
  } catch (error: any) {
    console.error(error.message);
    throw new Error("Failed to add product");
  }
};
