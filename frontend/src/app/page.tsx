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

  if (isLoading) return <div className="min-h-[100vh] text-center pt-3 font-medium">Loading properties...</div>;
  if (isError) return <div className="min-h-[100vh] flex justify-center items-center font-bold text-2xl">Failed to load properties: {error.message}</div>;
  const reverseedData = data ? [...data].reverse() : []
  const topRowProperties = reverseedData?.slice(0, 2) || [];
  const bottomRowProperties = reverseedData?.slice(2,6) || [];
  return (
    <div className="space-y-3 p-6">
      <h2 className="text-3xl font-bold">Latest Properties</h2>
      <p>Most recent properties added by our hosts</p>
      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {topRowProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {bottomRowProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
}
