"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { MapPinIcon, ArrowLeftIcon, CalendarIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

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

export default function JobDetailPage() {
  const params = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resumeLink: "",
    coverNote: "",
  });

  useEffect(() => {
    if (params.id) {
      fetchJob(params.id as string);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: params.id,
          ...formData,
        }),
      });

      if (res.ok) {
        alert("Application submitted successfully!");
        setFormData({ name: "", email: "", resumeLink: "", coverNote: "" });
        setShowForm(false);
      } else {
        alert("Failed to submit application");
      }
    } catch (error) {
      console.error("Failed to submit:", error);
      alert("Failed to submit application");
    } finally {
      setSubmitting(false);
    }
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
          <Link href="/" className="text-brand-primary font-medium hover:underline">
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-28 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/assets/logo.png"
              alt="QuickHire"
              className="h-8 w-8"
            />
            <span className="font-clash-display font-bold text-xl text-gray-900">
              QuickHire
            </span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Back to Jobs</span>
          </Link>
        </div>
      </nav>

      <main className="mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-28 py-8 max-w-4xl">
        {/* Job Header */}
        <div className="bg-white border border-gray-200 p-6 mb-6">
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="text-sm px-3 py-1 bg-brand-accent/10 text-brand-accent font-medium">
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

          <h1 className="font-clash-display font-semibold text-3xl text-gray-900 mb-2">
            {job.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-600">
            <div className="flex items-center gap-1">
              <span className="font-medium">{job.company}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPinIcon className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarIcon className="w-4 h-4" />
              <span>{new Date(job.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="bg-white border border-gray-200 p-6 mb-6">
          <h2 className="font-clash-display font-semibold text-xl text-gray-900 mb-4">
            Job Description
          </h2>
          <p className="font-clash-display text-gray-600 whitespace-pre-wrap leading-relaxed">
            {job.description}
          </p>
        </div>

        {/* Apply Section */}
        <div className="bg-white border border-gray-200 p-6">
          {showForm ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="font-clash-display font-semibold text-xl text-gray-900 mb-4">
                Apply for this position
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resume Link *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={formData.resumeLink}
                  onChange={(e) => setFormData({ ...formData, resumeLink: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cover Note (optional)
                </label>
                <textarea
                  rows={4}
                  value={formData.coverNote}
                  onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none resize-y"
                  placeholder="Tell us why you're a great fit..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-brand-primary text-white px-6 py-2 font-medium text-sm hover:bg-brand-primary/90 transition-colors disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Submit Application"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="border border-gray-300 text-gray-700 px-6 py-2 font-medium text-sm hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
              <h2 className="font-clash-display font-semibold text-xl text-gray-900 mb-2">
                Interested in this position?
              </h2>
              <p className="font-clash-display text-gray-500 mb-6">Apply now and join our team!</p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-brand-primary text-white px-8 py-3 font-medium text-sm hover:bg-brand-primary/90 transition-colors"
              >
                Apply Now
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
