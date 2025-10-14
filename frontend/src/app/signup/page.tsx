// src/app/signup/page.tsx
"use client";

import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { validatePassword } from "@/utils/validatePassword";
import { AxiosError } from "axios";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check confirm password
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Check password validation
    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    try {
      await signup.mutateAsync({ name, email, password });
      toast.success("Signup successful");
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(err?.response?.data?.message || "Signup failed!", {
          autoClose: 5000,
        });
      } else {
        toast.error("Signup failed!", {
          autoClose: 5000,
        });
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 min-h-[100vh]">
      <p className="text-sm mb-2">
        You can sign up using your StayWise account to access our services.
      </p>
      <form
        onSubmit={submit}
        className="flex flex-col gap-2 border border-gray-50 rounded-lg shadow p-6"
      >
        <label htmlFor="name">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          className="p-2 border rounded mb-2"
        />
        <label htmlFor="email">Email</label>
        <input
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="p-2 border mb-2 rounded"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value.trim())}
          placeholder="Enter password"
          className="p-2 border rounded mb-2"
          required
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value.trim())}
          placeholder="Confirm password"
          className="p-2 border rounded mb-3"
          required
        />
        <button
          type="submit"
          disabled={signup.isPending}
          style={{ cursor: signup.isPending ? "not-allowed" : "pointer" }}
          className="bg-black whitespace-nowrap hover:bg-white hover:text-black border text-white px-4 py-2 rounded cursor-pointer"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
