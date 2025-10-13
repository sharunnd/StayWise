"use client";

import Link from "next/link";
import { useUser } from "../hooks/useUser";
import { useAuth } from "../hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const { data: user } = useUser();
  const { logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const [query, setQuery] = useState("");

  const linkClasses = (path: string) => {
    return pathname === path ? "text-blue-500" : "hover:text-gray-600";
  };

  const handleLogout = async () => {
    try {
      await logout.mutateAsync();
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?query=${encodeURIComponent(query.trim())}`);
    setQuery("");
  };

  return (
    <nav className="bg-white shadow p-6 z-50 w-full border-b-gray-100 top-0 sticky">
      <div className="w-full flex flex-wrap justify-between items-center gap-3">
        <Link href="/" className="font-bold text-2xl">
          StayWise
        </Link>

        {/*  Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex items-center border border-gray-300 rounded-lg px-3 py-1 w-full sm:w-auto flex-1 max-w-md"
        >
          <input
            type="text"
            placeholder="Search by location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 outline-none bg-transparent text-sm"
          />
          <button
            type="submit"
            className="text-sm cursor-pointer bg-black text-white px-3 py-1 rounded ml-2"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-4 overflow-x-auto">
          <Link href="/" className={linkClasses("/")}>
            Properties
          </Link>
          <Link href="/add-property" className={linkClasses("/add-property") + " whitespace-nowrap"}>
            Add Properties
          </Link>
          <Link
            href="/bookings"
            className={linkClasses("/bookings") + " whitespace-nowrap"}
          >
            My Bookings
          </Link>

          {user ? (
            <button
              onClick={handleLogout}
              className="text-sm bg-black text-white px-3 py-1 rounded cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" className={linkClasses("/login")}>
                Login
              </Link>
              <Link
                href="/signup"
                className="text-sm whitespace-nowrap bg-black text-white px-3 py-1 rounded"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
