import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String || null,
      required: true,
    },
    lastname: {
      type: String || null,
      min: 1,
      required: true,
    },
    username: {
      type: String || null,
      min: 1,
      required: true,
    },
    email: {
      type: String || null,
      min: 1,
      required: true,
    },
    password: {
      type: String || null,
      min: 1,
    },
    profileImg: {
      type: String || null,
    },
    role: {
      type: String,
      required: true,
    },
    baranggay: {
      type: String,
    },
    municipality: {
      type: String,
    },
    province: {
      type: String,
    },
    zipcode: {
      type: Number,
    },
    phoneNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = mongoose.models?.User || mongoose.model("User", UserSchema);
