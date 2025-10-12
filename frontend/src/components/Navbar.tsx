"use client";

import Link from "next/link";
import { useUser } from "../hooks/useUser";
import { useAuth } from "../hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const { data: user } = useUser();
  const { logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
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
  return (
    <nav className=" bg-white shadow p-6 z-50 w-full border-b-gray-100 top-0 sticky">
      <div className="w-full flex justify-between items-center gap-3">
        <Link href="/" className="font-bold text-2xl">
          StayWise
        </Link>

        <div className="flex items-center gap-4 overflow-x-auto">
          <Link href="/" className={linkClasses("/")}>
            Properties
          </Link>
          <Link href="/add-property" className={linkClasses("/add-property")}>
            Add Properties
          </Link>
          <Link href="/bookings" className={linkClasses("/bookings") + " whitespace-nowrap"}>
            My Bookings
          </Link>

          {user ? (
            <>
              {/* <span className="text-sm">Hi, {user.name ?? user.email}</span> */}
              <button
                onClick={handleLogout}
                className="text-sm bg-black text-white px-3 py-1 rounded cursor-pointer"
              >
                Logout
              </button>
            </>
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
