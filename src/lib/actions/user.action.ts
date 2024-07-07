"use server";
import { revalidatePath } from "next/cache";
import { User } from "../models/user";
import { connectToDB } from "../mongoose";
import { parseJSON } from "../utils";

export interface IUser {
  _id?: string;
  clerkId: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password?: string;
  profileImg: string;
  role: "user" | "admin";
  baranggay: string;
  municipality: string;
  province: string;
  zipcode: number;
  phoneNumber: string;
}

export const getUsers = async (page = 1) => {
  try {
    await connectToDB();

    const limit = 10;
    const skip = (page - 1) * limit;

    const usersCount = await User.countDocuments();

    const res = await User.find().limit(limit).skip(skip);

    if (!res) throw new Error("There was an error fetching the users");

    const hasNextPage = skip + limit < usersCount;

    return { data: parseJSON(res), hasNextPage };
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getUserById = async (id: string) => {
  try {
    await connectToDB();

    const user = await User.findById(id);

    if (!user) throw new Error("No user found");

    return parseJSON(user);
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getUser = async (clerkId: string) => {
  try {
    await connectToDB();

    const res = await User.findOne({ clerkId });

    if (!res) throw new Error("User cannot be find");

    return parseJSON(res);
  } catch (error: any) {
    console.error(error.message);
  }
};

export const addUser = async (user: IUser) => {
  try {
    connectToDB();

    const newUser = new User(user);

    const res = await newUser.save();

    return parseJSON(res);
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (id: string) => {
  try {
    await connectToDB();

    await User.findByIdAndDelete(id);

    revalidatePath("/admin/users");
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getUsersCount = async () => {
  try {
    await connectToDB();

    const count = await User.countDocuments();

    return count;
  } catch (error: any) {
    console.error(error.message);
  }
};
