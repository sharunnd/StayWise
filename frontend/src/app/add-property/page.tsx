"use client";

import { useState } from "react";
import {
  useCreateProperty,
  CreatePropertyPayload,
} from "@/hooks/useCreateProperty";
import Image from "next/image";
import ProtectedRoute from "@/components/ProtectedRoute";

function CreatePropertyInner() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<string>("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const propertyMutation = useCreateProperty();

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !price || !location || images.length === 0) {
      alert("Please fill all fields and add at least one image.");
      return;
    }

    const payload: CreatePropertyPayload = {
      title,
      description,
      pricePerNight: Number(price),
      location,
      images,
    };

    try {
      await propertyMutation.mutateAsync(payload);
      alert("Property created successfully!");

      // Reset form
      setTitle("");
      setDescription("");
      setPrice("");
      setLocation("");
      setImages([]);
    } catch (error) {
      console.error(error);
      alert("Failed to create property");
    }
  };

  return (
  
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Add Property</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border p-2 rounded"
          />
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded min-h-40"
            required
          />
          <label htmlFor="price-per-night">Price per Night</label>
          <input
            type="number"
            name="price-per-night"
            placeholder="Price per Night"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="file"
            name="image"
            multiple
            accept="image/*"
            onChange={(e) => setImages(Array.from(e.target.files || []))}
            className="border p-2 rounded"
            required
          />
          {/* Preview selected images */}
          {images.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-2">
              {images.map((img, index) => (
                <div key={index} className="relative w-24 h-24">
                  <Image
                    src={URL.createObjectURL(img)}
                    alt={`preview-${index}`}
                    fill
                    className="object-cover rounded"
                    unoptimized // required for local object URLs
                  />
                  <button
                    type="button"
                    title="Remove image"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute cursor-pointer top-1 bg-white right-1 text-red-600 rounded-full px-2 py-1 text-xs"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )}
          <button
            type="submit"
            style={{
              cursor: propertyMutation.isPending ? "not-allowed" : "pointer",
            }}
            disabled={propertyMutation.isPending}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {propertyMutation.isPending ? "Adding..." : "Add"}
          </button>
        </form>
        {propertyMutation.error && (
          <p className="text-red-500 mt-2">{propertyMutation.error.message}</p>
        )}
      </div>

  );
}

export default function CreatePropertyPage() {
  return (
    <ProtectedRoute>
      <CreatePropertyInner />
    </ProtectedRoute>
  );
}
