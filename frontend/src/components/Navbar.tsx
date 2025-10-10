// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useUser } from "../hooks/useUser";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { data: user } = useUser();
  const { logout } = useAuth();

  return (
    <nav className="bg-white shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="font-bold text-lg">StayWise</Link>

        <div className="flex items-center gap-4">
          <Link href="/">Properties</Link>
          <Link href="/bookings">My Bookings</Link>

          {user ? (
            <>
              <span className="text-sm">Hi, {user.name ?? user.email}</span>
              <button
                onClick={() => logout.mutate()}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm">Login</Link>
              <Link href="/signup" className="text-sm bg-green-500 text-white px-3 py-1 rounded">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
