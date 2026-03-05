"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { useState, useEffect } from "react";

interface Application {
  id: string;
  jobId: string;
  jobTitle?: string;
  name: string;
  email: string;
  resumeLink: string;
  coverNote?: string;
  createdAt: string;
}

interface Job {
  id: string;
  title: string;
  company: string;
}

export default function ApplicationsPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
    fetchJobs();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/applications`);
      const json = await res.json();
      setApplications(json.data || []);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`);
      const json = await res.json();
      setJobs(json.data || []);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  };

  const getJobTitle = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId);
    return job ? `${job.title} at ${job.company}` : "Unknown Job";
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
          <div className="mb-6">
            <h1 className="font-clash-display font-semibold text-2xl text-gray-900">
              Applications
            </h1>
            <p className="font-clash-display text-gray-500 mt-1">{applications.length} total applications</p>
          </div>

          {/* Applications List */}
          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading...</div>
          ) : applications.length === 0 ? (
            <div className="bg-white border border-gray-200 p-12 text-center">
              <p className="font-clash-display text-gray-500">No applications yet</p>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 divide-y divide-gray-200">
              {applications.map((app) => (
                <div key={app.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-brand-primary font-semibold">
                          {app.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{app.name}</h3>
                        <p className="font-clash-display text-sm text-gray-500">{app.email}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 whitespace-nowrap">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    Applied for: {getJobTitle(app.jobId)}
                  </p>
                  {app.coverNote && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2 italic">
                      "{app.coverNote}"
                    </p>
                  )}
                  <div className="flex justify-end">
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
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
