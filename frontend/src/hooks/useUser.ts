
"use client";

import { useQuery } from "@tanstack/react-query";
import api from "../lib/axiosInstance";

export function useUser() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await api.get("/auth/me");
      return data?.user ?? null;
    },
    retry: false, // options go here, not in a third argument
  });
}
