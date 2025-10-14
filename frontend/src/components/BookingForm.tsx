"use client";

import { useState } from "react";
import { useCreateBooking } from "../hooks/useCreateBooking";
import { BookingPayload } from "../types";
import { useUser } from "@/hooks/useUser";
import { toast } from "react-toastify";

type Props = { propertyId: string };

export default function BookingForm({ propertyId }: Props) {
  const { data: user } = useUser();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guests, setGuests] = useState(1);

  const bookingMutation = useCreateBooking();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to book a property");
      return;
    }

    const payload: BookingPayload = { propertyId, startDate, endDate, guests };

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await bookingMutation.mutateAsync(payload); // use mutateAsync
      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message); // Safe: Error has 'message'
      } else {
        setError("Failed to create booking."); // fallback
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 max-w-md mx-auto"
    >
      <label htmlFor="start-date">Start Date</label>
      <input
        name="start-date"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
        className="border p-2 rounded w-full"
        max={endDate}
      />
      <label htmlFor="end-date">End Date</label>
      <input
        name="end-date"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        required
        className="border p-2 rounded w-full"
        min={startDate}
      />
      <label htmlFor="guests">Guests</label>
      <input
        name="guests"
        type="number"
        value={guests}
        onChange={(e) => setGuests(Number(e.target.value))}
        min={1}
        required
        className="border p-2 rounded w-full"
      />

      <button
        type="submit"
        disabled={loading}
        style={{ cursor: loading ? "not-allowed" : "pointer" }}
        className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
      >
        {loading ? "Booking..." : "Book Now"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && (
        <p className="text-green-500 mt-2">Booking created successfully!</p>
      )}
    </form>
  );
}
