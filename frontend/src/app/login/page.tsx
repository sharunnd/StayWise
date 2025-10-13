"use client";

import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginPending =  login.isPending

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login.mutateAsync({ email, password });
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        alert(err?.response?.data?.message || "Login failed"); // Safe: Error has 'message'
      } else {
        alert("Login failed"); // fallback
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto my-[30vh]">
      <form onSubmit={submit} className="flex flex-col gap-2 md:gap-4 lg:gap-6">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="p-2 border"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-2 border"
        />
        <button
          type="submit"
          disabled={loginPending}
          style={{cursor: loginPending ? "not-allowed" : "pointer"}}
          className="bg-black hover:bg-white hover:text-black border text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
