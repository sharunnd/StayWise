
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axiosInstance";

export interface CreatePropertyPayload {
  title: string;
  description: string;
  pricePerNight: number;
  location?: string;
  images: File[];
}

export interface Property {
  _id: string;
  title: string;
  description: string;
  pricePerNight: number;
  location?: string;
  images: string[];
}

export function useCreateProperty() {
  const queryClient = useQueryClient();

  const mutation = useMutation<Property, Error, CreatePropertyPayload>({
    mutationFn: async (payload) => {
      const formData = new FormData();
      formData.append("title", payload.title);
      formData.append("description", payload.description);
      formData.append("pricePerNight", payload.pricePerNight.toString());
      if (payload.location) formData.append("location", payload.location);
      payload.images.forEach((img) => formData.append("images", img));

      const res = await api.post("/properties/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res.data.property as Property;
    },
    onSuccess: () => {
      // Invalidate the property list so the new property appears
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });

  return mutation; 
}
