import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import api from "../lib/axiosInstance";
import { User } from "../types";

type LoginPayload = { email: string; password: string };
type SignupPayload = { name?: string; email: string; password: string };
type AuthResponse = { user: User; token?: string };

export function useAuth() {
  const qc = useQueryClient();

  const login = useMutation<AxiosResponse<AuthResponse>, Error, LoginPayload>({
    mutationFn: (payload) => api.post("/auth/login", payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["me"] }),
  });

  const signup = useMutation<AxiosResponse<AuthResponse>, Error, SignupPayload>({
    mutationFn: (payload) => api.post("/auth/signup", payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["me"] }),
  });

  const logout = useMutation<AxiosResponse<{ message: string }>, Error, void>({
    mutationFn: () => api.post("/auth/logout"),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["me"] }),
  });

  return { login, signup, logout };
}