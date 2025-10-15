// src/app/bookings/page.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import api from "../../lib/axiosInstance";
import ProtectedRoute from "../../components/ProtectedRoute";
import { Booking } from "../../types";
import Image from "next/image";

function BookingsInner() {
  const { data, isLoading } = useQuery<Booking[]>({
    queryKey: ["myBookings"],
    queryFn: async () => {
      const res = await api.get("/bookings/my");
      return res.data.bookings as Booking[];
    },
    retry: false,
  });

  if (isLoading)
    return (
      <div className="min-h-[100vh] text-center pt-3 font-medium">
        Loading bookings...
      </div>
    );
  if (!data || data.length === 0)
    return (
      <div className="min-h-[100vh] flex justify-center items-center font-bold text-2xl">
        No bookings yet
      </div>
    );

  return (
    <div className="space-y-5 p-6">
      <h1 className="text-2xl font-bold">My Bookings</h1>
      {data.map((booking) => (
        <div
          key={booking.id}
          className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] border border-slate-300 rounded-lg p-8 gap-5"
        >
          <div className="relative w-full h-[250px] rounded-md overflow-hidden">
            <Image
              src={booking.property?.images?.[0] || "/placeholder.jpg"}
              fill
              className="w-full h-full object-cover object-center"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
            <div className="text-2xl font-bold flex flex-col gap-1">
              {booking?.property?.title}
              <div className="text-sm font-normal">
               ₹{booking?.property?.pricePerNight} /-
              </div>
              <div className="text-sm font-normal">
                {booking?.property?.location}
              </div>
            </div>

            <div>
              <div>
                <span className="font-bold mr-2">Dates: </span>
                <span>
                  {new Date(booking.startDate).toDateString()} -
                  {new Date(booking.startDate).toDateString()}
                </span>
              </div>
              <div>
                <span className="font-bold mr-2">Guests:</span>
                <span>{booking.guests}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function MyBookingsPage() {
  return (
    <ProtectedRoute>
      <BookingsInner />
    </ProtectedRoute>
  );
}
