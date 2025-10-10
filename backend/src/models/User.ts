import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  name?: string;
  role: "user" | "admin";
}

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  role: { type: String, default: "user" },
});


export const User = mongoose.model<IUser>("User",userSchema)