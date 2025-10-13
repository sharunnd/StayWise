// src/app/signup/page.tsx
"use client";

import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log({signup});
  
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup.mutateAsync({ name, email, password });
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err?.message); // Safe: Error has 'message'
      } else {
        alert("Signup failed"); // fallback
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto my-[30vh]">
      {/* <h1 className="text-2xl font-bold mb-4">Sign up</h1> */}
      <form onSubmit={submit} className="flex flex-col gap-2 md:gap-4 lg:gap-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="p-2 border"
        />
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
          disabled={signup.isPending}
          style={{cursor: signup.isPending ? "not-allowed" : "pointer"}}
          className="bg-black whitespace-nowrap hover:bg-white hover:text-black border text-white px-4 py-2 rounded cursor-pointer"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
