"use server";
import { User } from "../models/user";
import { connectToDB } from "../mongoose";
import { parseJSON } from "../utils";

export interface IUser {
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

export const getUser = async (email: string) => {
  try {
    await connectToDB();

    const res = await User.findOne({ email });

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
