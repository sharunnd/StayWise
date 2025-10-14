"use client";

import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginPending = login.isPending;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login.mutateAsync({ email, password });
      toast.success("Login successful");
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(err?.response?.data?.message || "Login failed");
      } else {
        toast.error("Login failed"); // fallback
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 min-h-[100vh]">
      <p className="text-sm mb-2">
        You can login using your StayWise account to access our services.
      </p>
      <form
        onSubmit={submit}
        className="flex flex-col gap-2 border border-gray-50 rounded-lg shadow p-6"
      >
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="p-2 border rounded mb-2"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="p-2 border rounded mb-3"
          required
        />
        <button
          type="submit"
          disabled={loginPending}
          style={{ cursor: loginPending ? "not-allowed" : "pointer" }}
          className="bg-black hover:bg-white hover:text-black border text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
