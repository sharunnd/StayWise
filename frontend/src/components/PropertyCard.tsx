// src/components/PropertyCard.tsx
import Link from "next/link";
import { Property } from "../types";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="text-lg font-semibold">{property.title}</h3>
      <p className="text-sm text-muted">{property.location}</p>
      <p className="mt-2">{property.description?.slice(0, 120)}</p>
      <div className="mt-3 flex justify-between items-center">
        <div className="text-lg font-medium">₹{property.pricePerNight ?? "—"}/night</div>
        <Link href={`/properties/${property._id}`} className="text-blue-600">View</Link>
      </div>
    </div>
  );
}
