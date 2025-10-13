"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "../../lib/axiosInstance";
import Image from "next/image";
import { useState, Suspense } from "react";
import { Property } from "@/types";
import Link from "next/link";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [page, setPage] = useState(1);
  const limit = 6;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["search", query, page],
    queryFn: async () => {
      const res = await api.get(
        `/properties/search?location=${query}&page=${page}&limit=${limit}`
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
      <div className="p-8 text-center">
        No results found for &quot;{query}&quot;
      </div>
    );

  const totalPages = Math.ceil(data.total / limit);

  return (
    <div className="container mx-auto px-4 py-8 min-h-[100vh]">
      <h1 className="text-3xl font-bold mb-6">
        Search results for: <span className="text-blue-500">{query}</span>
      </h1>

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
            <div className="p-4">
              <h2 className="font-semibold text-lg">{property.title}</h2>
              <p className="text-sm text-gray-500">{property.location}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center min-h-[100vh]">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}