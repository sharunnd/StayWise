// src/app/admin/create-property/page.tsx
"use client";

import { useState } from "react";
import { useCreateProperty, CreatePropertyPayload } from "@/hooks/useCreateProperty";

export default function CreatePropertyPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [location, setLocation] = useState("");
  const [images, setImages] = useState<File[]>([]);

  
  const propertyMutation = useCreateProperty();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!images.length) {
      alert("Please select at least one image.");
      return;
    }

    const payload: CreatePropertyPayload = {
      title,
      description,
      pricePerNight: price,
      location: location || undefined,
      images,
    };

    try {
      await propertyMutation.mutateAsync(payload);
      alert("Property created successfully!");
      // Optionally, reset form
      setTitle("");
      setDescription("");
      setPrice(0);
      setLocation("");
      setImages([]);
    } catch (err) {
      console.error(err);
      alert("Failed to create property");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Property</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Price per Night"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="border p-2 rounded"
          required
        />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImages(Array.from(e.target.files || []))}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          disabled={propertyMutation.isPending}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {propertyMutation.isPending ? "Creating..." : "Create Property"}
        </button>
      </form>
      {propertyMutation.error && <p className="text-red-500 mt-2">{propertyMutation.error.message}</p>}
    </div>
  );
}
