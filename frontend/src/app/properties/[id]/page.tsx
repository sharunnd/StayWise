// src/app/properties/[id]/page.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import api from "../../../lib/axiosInstance";
import { useRouter } from "next/navigation";
import BookingForm from "../../../components/BookingForm";
import { Property } from "../../../types";

export default function PropertyPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const res = await api.get(`/properties/${id}`);
      return res.data.property as Property;
    },
    retry: false, // options go here
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Property not found</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{data.title}</h1>
      <p className="text-sm text-muted">{data.location}</p>
      <p className="mt-3">{data.description}</p>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Book this property</h2>
        <BookingForm propertyId={id} />
      </div>
    </div>
  );
}
