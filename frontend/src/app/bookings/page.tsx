// src/app/bookings/page.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import api from "../../lib/axiosInstance";
import ProtectedRoute from "../../components/ProtectedRoute";
import { Booking } from "../../types";

function BookingsInner() {
  const { data, isLoading } = useQuery<Booking[]>({
    queryKey: ["myBookings"],
    queryFn: async () => {
      const res = await api.get("/bookings/my");
      return res.data.bookings as Booking[];
    },
    retry: false,
  });

  if (isLoading) return <div>Loading bookings...</div>;
  if (!data || data.length === 0) return <div>No bookings yet</div>;

  return (
    <div className="space-y-3">
      {data.map((b) => (
        <div key={b.id} className="bg-white p-3 rounded shadow">
          {/* <div className="text-lg font-semibold">{b.property?.title}</div> */}
          <div>
            {new Date(b.startDate).toLocaleDateString()} —{" "}
            {new Date(b.endDate).toLocaleDateString()}
          </div>
          <div className="text-sm text-muted">Guests: {b.guests}</div>
        </div>
      ))}
    </div>
  );
}

export default function MyBookingsPage() {
  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
        <BookingsInner />
      </div>
    </ProtectedRoute>
  );
}
