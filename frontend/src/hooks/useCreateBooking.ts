// src/hooks/useCreateBooking.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axiosInstance";
import { Booking, BookingPayload } from "../types";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  // Return the raw mutation object
  const mutation = useMutation<Booking, Error, BookingPayload>({
    mutationFn: async (payload) => {
      const res = await api.post("/bookings", payload);
      return res.data.booking as Booking;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBookings"] });
    },
  });

  return mutation; // will use mutateAsync + local state in component
}
