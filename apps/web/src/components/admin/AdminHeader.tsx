"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    // Get user from localStorage
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img
              src="/assets/logo.png"
              alt="QuickHire"
              className="w-8 h-8"
            />
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Admin</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/admin/jobs/new"
            className="bg-brand-primary text-white px-4 py-2 font-medium text-sm hover:bg-brand-primary/90 transition-colors"
          >
            + New Job
          </Link>

          {user && (
            <>
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                <span className="font-epilogue">Welcome,</span>
                <span className="font-medium">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900 font-medium text-sm"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
