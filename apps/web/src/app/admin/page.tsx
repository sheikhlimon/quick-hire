"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [stats, setStats] = useState({
    totalJobs: 0,
    applications: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [jobsRes, appsRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/applications`),
      ]);

      const jobsJson = await jobsRes.json();
      const appsJson = await appsRes.json();

      setStats({
        totalJobs: (jobsJson.data || []).length,
        applications: (appsJson.data || []).length,
      });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: "Total Jobs", value: loading ? "..." : stats.totalJobs.toString(), color: "bg-purple-50 text-purple-700" },
    { label: "Applications", value: loading ? "..." : stats.applications.toString(), color: "bg-blue-50 text-blue-700" },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
      <AdminSidebar
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className="lg:ml-64">
        <AdminHeader onMenuClick={() => setMobileOpen(!mobileOpen)} />
        <main className="p-4 lg:p-6">
          {/* Welcome */}
          <div className="mb-6">
            <h1 className="font-clash-display font-semibold text-2xl text-gray-900">
              Welcome back, Admin
            </h1>
            <p className="font-clash-display text-gray-500 mt-1">Manage your jobs and applications</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {statCards.map((stat) => (
              <div key={stat.label} className={`${stat.color} p-4`}>
                <p className="text-sm font-medium opacity-80">{stat.label}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-gray-200 p-6">
            <h2 className="font-clash-display font-semibold text-lg text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin/jobs/new"
                className="bg-brand-primary text-white px-4 py-2 font-medium text-sm hover:bg-brand-primary/90 transition-colors"
              >
                + Create New Job
              </Link>
              <Link
                href="/admin/jobs"
                className="border border-gray-300 text-gray-700 px-4 py-2 font-medium text-sm hover:bg-gray-50 transition-colors"
              >
                View All Jobs
              </Link>
              <Link
                href="/admin/applications"
                className="border border-gray-300 text-gray-700 px-4 py-2 font-medium text-sm hover:bg-gray-50 transition-colors"
              >
                View Applications
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
    </ProtectedRoute>
  );
}
