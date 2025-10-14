"use client";

import { useQuery } from "@tanstack/react-query";
import api from "../../../lib/axiosInstance";
import BookingForm from "../../../components/BookingForm";
import { Property } from "../../../types";
import Image from "next/image";

export default function PropertyPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const res = await api.get(`/properties/${id}`);
      return res.data.property as Property;
    },
    retry: false, 
  });

  if (isLoading)
    return (
      <div className="min-h-[100vh] text-center pt-3 font-medium">
        Loading properties...
      </div>
    );
  if (!data)
    return (
      <div className="min-h-[100vh] flex justify-center items-center font-bold text-2xl">
        Property not found
      </div>
    );

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-3xl font-bold">{data.title}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {data?.images &&
          data.images.map((image, idx) => (
            <div key={idx} className="relative h-[300px] w-full">
              <Image
                src={image}
                alt={data.title}
                fill
                className="rounded-md object-cover object-center"
              />
            </div>
          ))}
      </div>
      <p className="text-lg">{data.location}</p>
      <p className="text-lg">Price per Night: ₹{data.pricePerNight}/-</p>
      <p className="mt-3">{data.description}</p>

      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Book this property</h2>
        <BookingForm propertyId={id} />
      </div>
    </div>
  );
}
