// src/components/PropertyCard.tsx
import Link from "next/link";
import { Property } from "../types";
import Image from "next/image";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div>
      <Link
        href={`/properties/${property._id}`}
        className="relative cursor-pointer overflow-hidden rounded-md"
      >
        <div className="h-[300px]">
          <Image
            src={property.images?.[0] ?? "/placeholder.jpg"}
            fill
            className="object-cover object-center rounded transition-transform duration-300 group-hover:scale-105"
            alt=""
          />
        </div>

        <div className="absolute bottom-0 p-4 bg-black/50 w-full rounded-b-md flex justify-between items-center">
          <p className="text-white font-bold tracking-tight text-3xl">
            {property.title} <span className="text-sm">{property.location}</span>
          </p>
          <p className="text-white font-bold tracking-tight text-xl">
            ₹{property.pricePerNight}/-
          </p>
        </div>
      </Link>
    </div>
  );
}
