// src/components/ProtectedRoute.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../hooks/useUser";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { data: user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return <div className="p-8">Checking auth...</div>;
  }

  return <>{children}</>;
}
