// src/app/page.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import api from "../lib/axiosInstance";
import PropertyCard from "../components/PropertyCard";
import { Property } from "../types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "@/utils/corousal";
import CarouselPropertyCard from "@/components/CarouselPropertyCard";



export default function HomePage() {
  const { data, isLoading, isError, error } = useQuery<Property[], Error>({
    queryKey: ["properties"],
    queryFn: async () => {
      const res = await api.get("/properties"); // backend must be running
      return res.data.properties as Property[];
    },
    retry: 1,
  });

  if (isLoading)
    return (
      <div className="min-h-[100vh] text-center pt-3 font-medium">
        Loading properties...
      </div>
    );
  if (isError)
    return (
      <div className="min-h-[100vh] flex justify-center items-center font-bold text-2xl">
        Failed to load properties: {error.message}
      </div>
    );
  const reversedData = data ? [...data].reverse() : [];
  const topRowProperties = reversedData?.slice(0, 2) || [];
  const bottomRowProperties = reversedData?.slice(2, 8) || [];
  const uniqueProperties = data?.slice(0, 7) || [];
  const homesGuestsLike = reversedData?.slice(4, 12) || [];

  return (
    <div className="space-y-3 p-6">
      <h2 className="text-3xl font-bold">Latest Properties</h2>
      <p>Most recent properties added by our hosts</p>
      <div className="grid gap-4 mb-5">
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
      <section className="relative mt-5">
        <h2 className="text-2xl font-bold mb-1">Unique Properties</h2>
        <p className="text-gray-400">Discover stays that offer something truly special</p>
        <div className="mt-6 relative">
          <Carousel responsive={responsive} itemClass="px-1 pb-1">
            {uniqueProperties.map((property) => (
              <div key={property._id}>
                <CarouselPropertyCard property={property} />
              </div>
            ))}
          </Carousel>
        </div>
      </section>
      <section className="relative mt-5">
        <h2 className="text-2xl font-bold mb-1">Homes Guests Will Like</h2>
        <p className="text-gray-400">Top-rated and most-loved homes by our community</p>
        <div className="mt-6 relative">
          <Carousel responsive={responsive} itemClass="px-1 pb-1">
            {homesGuestsLike.map((property) => (
              <div key={property._id}>
                <CarouselPropertyCard property={property} />
              </div>
            ))}
          </Carousel>
        </div>
      </section>
    </div>
  );
}
