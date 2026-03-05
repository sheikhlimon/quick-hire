"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Remote", "Internship"];
const CATEGORIES = ["Technology", "Design", "Marketing", "Sales", "Engineering", "Business", "Finance", "Human Resource"];

export default function NewJobPage() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    title: "",
    company: "QuickHire Inc.",
    location: "",
    type: "Full-time",
    category: "Technology",
    description: "",
    salary: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Job created successfully!");
        router.push("/admin/jobs");
      } else {
        const data = await res.json();
        // Handle validation errors
        if (data.errors && data.errors.length > 0) {
          const errorMap: Record<string, string> = {};
          data.errors.forEach((e: { field: string; message: string }) => {
            errorMap[e.field] = e.message;
          });
          setErrors(errorMap);
        } else {
          toast.error(data.message || "Failed to create job");
        }
      }
    } catch (error) {
      console.error("Failed to create job:", error);
      toast.error("Failed to create job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getErrorClass = (fieldName: string) => {
    return errors[fieldName] ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "";
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
              Create New Job
            </h1>
            <p className="font-clash-display text-gray-500 mt-1">Fill in the details to post a new job</p>
          </div>

          {/* Form */}
          <div className="bg-white border border-gray-200 p-6 max-w-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Senior Frontend Developer"
                  className={`w-full px-3 py-2 border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none ${getErrorClass("title")}`}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company *
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  placeholder="e.g. QuickHire Inc."
                  className={`w-full px-3 py-2 border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none ${getErrorClass("company")}`}
                />
                {errors.company && (
                  <p className="mt-1 text-sm text-red-600">{errors.company}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="e.g. San Francisco, CA or Remote"
                  className={`w-full px-3 py-2 border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none ${getErrorClass("location")}`}
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                )}
              </div>

              {/* Type & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className={`w-full px-3 py-2 border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none ${getErrorClass("type")}`}
                  >
                    {JOB_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.type && (
                    <p className="mt-1 text-sm text-red-600">{errors.type}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className={`w-full px-3 py-2 border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none ${getErrorClass("category")}`}
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                  )}
                </div>
              </div>

              {/* Salary */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salary
                </label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="e.g. $80,000 - $120,000"
                  className={`w-full px-3 py-2 border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none ${getErrorClass("salary")}`}
                />
                {errors.salary && (
                  <p className="mt-1 text-sm text-red-600">{errors.salary}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Describe the role, responsibilities, requirements..."
                  className={`w-full px-3 py-2 border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none resize-y ${getErrorClass("description")}`}
                />
                {!errors.description && (
                  <p className="mt-1 text-xs text-gray-500">Must be at least 10 characters</p>
                )}
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-brand-primary text-white px-6 py-2 font-medium text-sm hover:bg-brand-primary/90 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {loading ? "Creating..." : "Create Job"}
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/admin/jobs")}
                  className="border border-gray-300 text-gray-700 px-6 py-2 font-medium text-sm hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
