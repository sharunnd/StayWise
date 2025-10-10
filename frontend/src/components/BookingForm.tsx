"use client";

import { useState } from "react";
import { useCreateBooking } from "../hooks/useCreateBooking";
import { BookingPayload } from "../types";

type Props = { propertyId: string };

export default function BookingForm({ propertyId }: Props) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guests, setGuests] = useState(1);

  const bookingMutation = useCreateBooking();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
        className="border p-2 rounded w-full"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        required
        className="border p-2 rounded w-full"
      />
      <input
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
