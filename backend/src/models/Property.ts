import { Schema, model, Document } from "mongoose";

export interface IProperty extends Document {
  title: string;
  description: string;
  pricePerNight: number;
  images: string[];
  location?: string;
}


const propertySchema = new Schema<IProperty>({
    title: String,
    description: String,
    pricePerNight: Number,
    images: [String],
    location: String,
})


export const Property = model<IProperty>("Property",propertySchema)