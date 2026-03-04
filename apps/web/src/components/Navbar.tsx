"use client";

import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <nav className="bg-hero-bg">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-28">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo + Navigation Links */}
          <div className="flex items-center gap-6 md:gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/assets/logo.png"
                alt="QuickHire"
                width={32}
                height={32}
                className="h-8 w-8 md:h-9 md:w-9"
              />
              <span className="font-sans font-bold text-xl md:text-2xl leading-tight tracking-tight text-gray-900">
                QuickHire
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/jobs"
                className="text-base font-normal text-gray-500 hover:text-gray-900 transition-colors"
              >
                Find Jobs
              </Link>
            </div>
          </div>

          {/* Desktop - Auth Buttons */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                <Link
                  href="/admin"
                  className="text-base font-medium text-gray-700"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-base font-medium text-brand-primary hover:underline"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-base font-medium text-brand-primary px-8 py-3"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="text-base font-medium bg-brand-primary text-white px-8 py-3"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile - Hamburger menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-gray-900" />
            ) : (
              <div className="flex flex-col gap-[3px] w-4.5">
                <span className="w-full h-[2px] bg-gray-900 rounded-sm"></span>
                <span className="w-full h-[2px] bg-gray-900 rounded-sm"></span>
                <span className="w-1/2 h-[2px] bg-gray-900 rounded-sm"></span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/jobs"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-normal text-gray-500 hover:text-gray-900 transition-colors py-2"
            >
              Find Jobs
            </Link>
            <hr className="border-gray-200" />
            {user ? (
              <>
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-medium text-gray-700 py-2"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-base font-medium text-brand-primary py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-medium text-brand-primary py-2"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-medium bg-brand-primary text-white px-6 py-3 text-center"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
