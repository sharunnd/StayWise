"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "../../lib/axiosInstance";
import Image from "next/image";
import { Suspense } from "react";
import { Property } from "@/types";
import Link from "next/link";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("query") || "";
  const page = Number(searchParams.get("page") || 1);
  const minPrice = Number(searchParams.get("minPrice") || 0);
  const maxPrice = Number(searchParams.get("maxPrice") || 0);
  const limit = 6;

  // Update filter in URL
  const handleFilterChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const min = (form.elements.namedItem("minPrice") as HTMLInputElement).value;
    const max = (form.elements.namedItem("maxPrice") as HTMLInputElement).value;

    // Update URL params without resetting query or page
    const params = new URLSearchParams(searchParams.toString());
    if (min) params.set("minPrice", min);
    else params.delete("minPrice");
    if (max) params.set("maxPrice", max);
    else params.delete("maxPrice");
    params.set("page", "1"); // reset page when filter changes
    router.push(`/search?${params.toString()}`);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["search", query, page, minPrice, maxPrice],
    queryFn: async () => {
      const res = await api.get(
        `/properties/search?location=${query}&page=${page}&limit=${limit}&minPrice=${minPrice}&maxPrice=${maxPrice}`
      );
      return res.data;
    },
    enabled: !!query,
  });

  if (isLoading)
    return <div className="p-8 text-center min-h-[100vh]">Loading...</div>;
  if (isError)
    return (
      <div className="p-8 text-center text-red-500 min-h-[100vh]">
        Failed to load results
      </div>
    );
  if (!data || data.properties.length === 0)
    return (
      <div className="p-8 text-center min-h-[100vh]">
        No results found for &quot;{query}&quot;
      </div>
    );

  const totalPages = Math.ceil(data.total / limit);

  return (
    <div className="container mx-auto px-4 py-8 min-h-[100vh] flex flex-col">
      <h1 className="text-3xl font-bold mb-6">
        Search results for: <span className="text-blue-500">{query}</span>
      </h1>
      {/* Price Filter Card */}
      <form
        onSubmit={handleFilterChange}
        className="flex items-end justify-center gap-4 bg-white p-3 rounded shadow mb-6 max-w-fit"
      >
        <div className="flex flex-col">
          <label className="text-sm font-medium text-blue-500">Min Price</label>
          <input
            name="minPrice"
            type="number"
            defaultValue={minPrice || ""}
            disabled={isLoading}
            className="border rounded px-2 py-1 w-28 disabled:bg-gray-100"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-blue-500">Max Price</label>
          <input
            name="maxPrice"
            type="number"
            defaultValue={maxPrice || ""}
            disabled={isLoading}
            className="border rounded px-2 py-1 w-28 disabled:bg-gray-100"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
          className="bg-blue-500 text-white px-4 h-fit py-1.5 rounded disabled:opacity-50"
        >
          Apply
        </button>
      </form>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.properties.map((property: Property) => (
          <Link
            href={`/properties/${property._id}`}
            key={property._id}
            className="border rounded-lg shadow overflow-hidden"
          >
            <div className="relative w-full h-[200px]">
              <Image
                src={property.images?.[0] || "/placeholder.jpg"}
                alt={property.title}
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="p-4 flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-lg">{property.title}</h2>
                <p className="text-sm text-gray-500">{property.location}</p>
              </div>
              <p>₹{property.pricePerNight}/-</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination at bottom */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", (page - 1).toString());
            router.push(`/search?${params.toString()}`);
          }}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", (page + 1).toString());
            router.push(`/search?${params.toString()}`);
          }}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center min-h-[100vh]">Loading search...</div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
