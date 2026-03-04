"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  HomeIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

interface NavItem {
  name: string;
  href: "/admin" | "/admin/jobs" | "/admin/applications";
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/admin", icon: HomeIcon },
  { name: "Job Listing", href: "/admin/jobs", icon: DocumentTextIcon },
  { name: "Applications", href: "/admin/applications", icon: UserGroupIcon },
];

interface AdminSidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function AdminSidebar({ mobileOpen, onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    // Only access localStorage on client side
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        setUser(JSON.parse(userStr));
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    toast.success("Logged out successfully");
    router.push("/");
  };

  const isActive = (href: string) => pathname === href || (href !== "/admin" && pathname.startsWith(href));

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`
          fixed lg:fixed inset-y-0 left-0 z-50
          w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 h-16 px-6 border-b border-gray-200 hover:opacity-80 transition-opacity">
            <img
              src="/assets/logo.png"
              alt="QuickHire"
              className="w-8 h-8"
            />
            <span className="font-clash-display font-bold text-xl text-gray-900">
              QuickHire
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={onCloseMobile}
                className={`
                  flex items-center gap-3 px-4 py-2.5
                  font-medium text-sm transition-colors
                  ${isActive(item.href)
                    ? "bg-brand-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-200">
            {user && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 px-2 py-2">
                  <div className="w-9 h-9 rounded-full bg-brand-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-primary font-semibold text-base">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-clash-display text-sm font-medium text-gray-900 truncate">
                      {user.name}
                    </p>
                    <p className="font-clash-display text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    onCloseMobile();
                  }}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium font-epilogue text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
