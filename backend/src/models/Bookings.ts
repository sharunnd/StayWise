import { Schema, model, Document, Types } from "mongoose";

export interface IBooking extends Document {
  user: Types.ObjectId;
  property: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  guests: number;
  createdAt: Date;
}

const bookingSchema = new Schema<IBooking>({
  user: { type: Schema.Types.ObjectId, red: "User", required: true },
  property: { type: Schema.Types.ObjectId, ref: "Property", required: true },
  startDate: Date,
  endDate: Date,
  guests: Number,
  createdAt: { type: Date, default: Date.now },
});

export const Booking = model<IBooking>("Booking", bookingSchema);
