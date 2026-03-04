"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JobCard } from "@/components/JobCard";
import { getJobs } from "@/lib/api";
import type { Job } from "@/lib/api";

function JobsContent() {
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    fetchJobs();

    // Read category from URL params
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  const fetchJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data?.data || []);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories and locations from jobs
  const categories = Array.from(new Set(jobs.map((job) => job.category)));
  const locations = Array.from(new Set(jobs.map((job) => job.location)));

  // Filter jobs based on search, category, and location
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      searchQuery === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "" || job.category === selectedCategory;
    const matchesLocation = selectedLocation === "" || job.location === selectedLocation;

    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-28 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-clash-display font-semibold text-4xl md:text-5xl mb-2">
            <span className="text-text-primary">All</span>
            <span className="text-brand-accent"> Jobs</span>
          </h1>
          <p className="font-epilogue text-text-secondary text-base">
            Browse all available opportunities
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white border border-gray-200 p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="flex items-center gap-2 relative">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by job title, company, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="font-epilogue font-normal text-sm text-gray-700 flex-1 min-w-0 outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Category Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2 font-epilogue">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none font-epilogue text-sm"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2 font-epilogue">
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none font-epilogue text-sm"
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("");
                  setSelectedLocation("");
                }}
                className="w-full md:w-auto px-6 py-2 border border-gray-300 text-gray-700 font-epilogue text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="font-epilogue text-text-secondary text-sm">
            Showing {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"}
          </p>
        </div>

        {/* Jobs Grid */}
        {loading ? (
          <div className="text-center py-20">
            <p className="font-epilogue text-text-secondary text-lg">Loading jobs...</p>
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-epilogue text-text-secondary text-lg mb-4">
              {jobs.length === 0 ? "No jobs available at the moment." : "No jobs match your filters."}
            </p>
            {(searchQuery || selectedCategory || selectedLocation) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("");
                  setSelectedLocation("");
                }}
                className="text-brand-primary font-medium hover:underline font-epilogue"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="font-epilogue text-text-secondary text-lg">Loading...</p></div>}>
      <JobsContent />
    </Suspense>
  );
}
