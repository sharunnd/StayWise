// src/app/page.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import api from "../lib/axiosInstance";
import PropertyCard from "../components/PropertyCard";
import { Property } from "../types";

export default function HomePage() {
  const { data, isLoading, isError, error } = useQuery<Property[], Error>({
    queryKey: ["properties"],
    queryFn: async () => {
      const res = await api.get("/properties"); // backend must be running
      return res.data.properties as Property[];
    },
    retry: 1,
  });

  if (isLoading) return <div>Loading properties...</div>;
  if (isError) return <div>Failed to load properties: {error.message}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">StayWise Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
}
