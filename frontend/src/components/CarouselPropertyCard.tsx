"use client";

import { Property } from "../types";
import Image from "next/image";
import Link from "next/link";

export default function CarouselPropertyCard({ property }: { property: Property }) {
  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300">
      <Link href={`/properties/${property._id}`}>
        {/* Image on top */}
        <div className="relative h-48 w-full">
          <Image
            src={property.images?.[0] ?? "/placeholder.jpg"}
            fill
            className="object-cover object-center"
            alt={property.title}
          />
        </div>

        {/* Text below image */}
        <div className="p-3 space-y-1">
          <h3 className="text-lg font-bold">{property.title}</h3>
          {property.pricePerNight && (
            <p className="text-gray-800 font-semibold">₹{property.pricePerNight}/-</p>
          )}
          {property.location && (
            <p className="text-gray-500 text-sm">{property.location}</p>
          )}
          {property.description && (
            <p className="text-gray-600 text-sm line-clamp-2">
              {property.description}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}
