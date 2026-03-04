"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { useState, useEffect } from "react";
import Link from "next/link";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  category: string;
  salary?: string;
  createdAt: string;
}

export default function AdminJobsPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`);
      const json = await res.json();
      setJobs(json.data || []);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}`, {
        method: "DELETE",
      });
      setJobs(jobs.filter((job) => job.id !== id));
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className="lg:ml-64">
        <AdminHeader onMenuClick={() => setMobileOpen(!mobileOpen)} />
        <main className="p-4 lg:p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="font-clash-display font-semibold text-2xl text-gray-900">
                Job Listing
              </h1>
              <p className="font-clash-display text-gray-500 mt-1">{jobs.length} jobs posted</p>
            </div>
            <Link
              href="/admin/jobs/new"
              className="bg-brand-primary text-white px-4 py-2 font-medium text-sm hover:bg-brand-primary/90 transition-colors"
            >
              + New Job
            </Link>
          </div>

          {/* Jobs Table */}
          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading...</div>
          ) : jobs.length === 0 ? (
            <div className="bg-white border border-gray-200 p-12 text-center">
              <p className="text-gray-500 mb-4">No jobs posted yet</p>
              <Link
                href="/admin/jobs/new"
                className="text-brand-primary font-medium hover:underline"
              >
                Create your first job
              </Link>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 overflow-hidden">
              {/* Mobile: Card layout */}
              <div className="md:hidden space-y-4">
                {jobs.map((job) => (
                  <div key={job.id} className="border-b border-gray-200 p-4 last:border-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{job.title}</h3>
                        <p className="text-sm text-gray-500">{job.company}</p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-brand-primary/10 text-brand-primary font-medium">
                        {job.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/jobs/${job.id}`}
                        className="p-2 text-gray-500 hover:text-brand-primary"
                        title="View"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/jobs/${job.id}/edit`}
                        className="p-2 text-gray-500 hover:text-brand-primary"
                        title="Edit"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="p-2 text-gray-500 hover:text-red-600"
                        title="Delete"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop: Table layout */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Job Title</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Company</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Location</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Type</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Category</th>
                      <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {jobs.map((job) => (
                      <tr key={job.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <span className="font-medium text-gray-900">{job.title}</span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{job.company}</td>
                        <td className="px-6 py-4 text-gray-600">{job.location}</td>
                        <td className="px-6 py-4">
                          <span className="text-xs px-2 py-1 bg-brand-primary/10 text-brand-primary font-medium">
                            {job.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{job.category}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/admin/jobs/${job.id}`}
                              className="p-2 text-gray-500 hover:text-brand-primary"
                              title="View"
                            >
                              <EyeIcon className="w-4 h-4" />
                            </Link>
                            <Link
                              href={`/admin/jobs/${job.id}/edit`}
                              className="p-2 text-gray-500 hover:text-brand-primary"
                              title="Edit"
                            >
                              <PencilIcon className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => handleDelete(job.id)}
                              className="p-2 text-gray-500 hover:text-red-600"
                              title="Delete"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
