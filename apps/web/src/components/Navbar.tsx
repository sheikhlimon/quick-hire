"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-hero-bg">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-28">
        <div className="flex justify-between items-center h-[78px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">Q</span>
            </div>
            <span className="font-red-hat font-bold text-2xl leading-[150%] tracking-[-0.01em] text-text-primary">
              QuickHire
            </span>
          </Link>

          {/* Desktop - Login and Signup buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="font-epilogue font-bold text-base leading-[160%] tracking-normal text-brand-primary"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="font-epilogue font-bold text-base leading-[160%] tracking-normal bg-brand-primary text-white px-6 py-3"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile - Hamburger menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-text-primary" />
            ) : (
              <Menu className="w-5 h-5 text-text-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-epilogue font-bold text-base leading-[160%] tracking-normal text-brand-primary py-2"
            >
              Login
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-epilogue font-bold text-base leading-[160%] tracking-normal bg-brand-primary text-white px-6 py-3 rounded text-center"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
