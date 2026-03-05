"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { TrashIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  category: string;
  description: string;
  salary?: string;
  createdAt: string;
}

interface Application {
  id: string;
  name: string;
  email: string;
  resumeLink: string;
  coverNote?: string;
  createdAt: string;
}

export default function JobDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [job, setJob] = useState<Job | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [showApplications, setShowApplications] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchJob(params.id as string);
      fetchApplications(params.id as string);
    }
  }, [params.id]);

  const fetchJob = async (id: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}`);
      const json = await res.json();
      setJob(json.data || json);
    } catch (error) {
      console.error("Failed to fetch job:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async (jobId: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/applications?jobId=${jobId}`);
      const json = await res.json();
      setApplications(json.data || []);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    }
  };

  const handleDelete = async () => {
    // Show custom confirmation using toast
    const confirmDelete = () =>
      new Promise<boolean>((resolve) => {
        toast(
          (t) => (
            <div className="flex flex-col gap-2">
              <p className="font-medium">Are you sure you want to delete this job?</p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    toast.dismiss(t.id);
                    resolve(false);
                  }}
                  className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    toast.dismiss(t.id);
                    resolve(true);
                  }}
                  className="px-3 py-1 text-sm bg-red-600 text-white hover:bg-red-700 rounded cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ),
          { duration: Infinity }
        );
      });

    const confirmed = await confirmDelete();
    if (!confirmed) return;

    toast.promise(
      (async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${params.id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          throw new Error("Failed to delete job");
        }

        router.push("/admin/jobs");
        return true;
      })(),
      {
        loading: "Deleting job...",
        success: "Job deleted successfully!",
        error: "Failed to delete job",
      }
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Job not found</p>
          <Link
            href="/admin/jobs"
            className="text-brand-primary font-medium hover:underline"
          >
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className="lg:ml-64">
        <AdminHeader onMenuClick={() => setMobileOpen(!mobileOpen)} />
        <main className="p-4 lg:p-6">
          {/* Back Button */}
          <Link
            href="/admin/jobs"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Back to Jobs</span>
          </Link>

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="font-clash-display font-semibold text-2xl text-gray-900">
                {job.title}
              </h1>
              <p className="font-clash-display text-gray-500 mt-1">{job.company} • {job.location}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDelete}
                className="inline-flex items-center gap-2 border border-red-300 text-red-600 px-4 py-2 font-medium text-sm hover:bg-red-50 transition-colors cursor-pointer"
              >
                <TrashIcon className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>

          {/* Job Details Card */}
          <div className="bg-white border border-gray-200 p-6 mb-6">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="text-sm px-3 py-1 bg-brand-primary/10 text-brand-primary font-medium">
                {job.type}
              </span>
              <span className="text-sm px-3 py-1 bg-gray-100 text-gray-700 font-medium">
                {job.category}
              </span>
              {job.salary && (
                <span className="text-sm px-3 py-1 bg-green-50 text-green-700 font-medium">
                  {job.salary}
                </span>
              )}
            </div>

            <div>
              <h2 className="font-clash-display font-semibold text-gray-900 mb-2">Job Description</h2>
              <p className="font-clash-display text-gray-600 whitespace-pre-wrap">{job.description}</p>
            </div>
          </div>

          {/* Applications Section */}
          <div className="bg-white border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="font-clash-display font-semibold text-gray-900">
                Applications ({applications.length})
              </h2>
              <button
                onClick={() => setShowApplications(!showApplications)}
                className="text-sm text-brand-primary font-medium hover:underline cursor-pointer"
              >
                {showApplications ? "Hide" : "Show"}
              </button>
            </div>

            {showApplications && (
              <div className="divide-y divide-gray-200">
                {applications.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    No applications yet
                  </div>
                ) : (
                  applications.map((app) => (
                    <div key={app.id} className="p-4">
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{app.name}</h3>
                          <p className="text-sm text-gray-500">{app.email}</p>
                          {app.coverNote && (
                            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{app.coverNote}</p>
                          )}
                        </div>
                        <div className="flex flex-col justify-between items-end flex-shrink-0 py-1">
                          <p className="text-sm font-epilogue text-gray-500">
                            {new Date(app.createdAt).toLocaleDateString()}
                          </p>
                          <a
                            href={app.resumeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex text-sm px-3 py-1 border border-brand-primary text-brand-primary font-medium hover:bg-brand-primary/10 transition-colors cursor-pointer"
                          >
                            View Resume
                          </a>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
