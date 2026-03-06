"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CompaniesSection } from "@/components/CompaniesSection";
import { CategoriesSection } from "@/components/CategoriesSection";
import { CTASection } from "@/components/CTASection";
import { FeaturedJobs } from "@/components/FeaturedJobs";
import { LatestJobs } from "@/components/LatestJobs";
import { Footer } from "@/components/Footer";
import { getHomeData } from "@/lib/api";
import type { Job } from "@/lib/api";
import toast from "react-hot-toast";

export default function HomePage() {
  const [categories, setCategories] = useState<{ name: string; jobs: number }[]>([]);
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [latestJobs, setLatestJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getHomeData();
        setCategories(data.categories);
        setFeaturedJobs(data.featuredJobs);
        setLatestJobs(data.latestJobs);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to load jobs. The server is on free tier and needs time to warm up - Please try refreshing.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    // Show toast about free tier hosting (only once per session)
    if (typeof window !== "undefined") {
      const toastShown = sessionStorage.getItem("hostingToastShown");
      if (!toastShown) {
        setTimeout(() => {
          toast("Server warming up - initial load may take up to 50 seconds on free tier hosting", {
            duration: 6000,
            icon: "⚡",
          });
          sessionStorage.setItem("hostingToastShown", "true");
        }, 500);
      }
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <CompaniesSection />

      {loading ? (
        <>
          {/* Loading States */}
          <section className="py-16 bg-white">
            <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-28">
              <div className="flex justify-between items-center mb-8">
                <div className="h-10 bg-gray-100 rounded w-48 animate-pulse"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-100 rounded-lg p-6 h-48">
                    <div className="animate-pulse space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 bg-gray-50">
            <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-28">
              <div className="flex justify-between items-center mb-8">
                <div className="h-10 bg-gray-100 rounded w-64 animate-pulse"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white border border-gray-100 rounded-lg p-6 h-32">
                    <div className="animate-pulse space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <CategoriesSection categories={categories} />
          <CTASection />
          <FeaturedJobs jobs={featuredJobs} />
          <LatestJobs jobs={latestJobs} />
        </>
      )}

      <Footer />
    </div>
  );
}
