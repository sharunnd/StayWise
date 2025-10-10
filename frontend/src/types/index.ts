// src/types/index.ts
export type User = {
  id: string;
  email: string;
  name?: string;
  role?: "user" | "admin";
};

export type Property = {
  _id: string;
  title: string;
  description?: string;
  pricePerNight?: number;
  images?: string[];
  location?: string;
};

export type BookingPayload = {
  propertyId: string;
  startDate: string;
  endDate: string;
  guests?: number;
};

export type Booking = {
  id: string;
  propertyId: string;
  userId: string;
  startDate: string;
  endDate: string;
  guests: number;
};
