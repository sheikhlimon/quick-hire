"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Not logged in, redirect to login
      router.push("/login");
    }
  }, [router]);

  // Show loading while checking
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="font-epilogue text-gray-500">Checking authentication...</p>
      </div>
    );
  }

  return <>{children}</>;
}
