"use client";

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import type { Job } from "@/lib/api";
import { JobCard } from "./JobCard";

interface FeaturedJobsProps {
  jobs?: Job[];
}

export function FeaturedJobs({ jobs = [] }: FeaturedJobsProps) {

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-28">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-clash-display font-semibold text-3xl md:text-5xl">
            <span className="text-text-primary">Featured</span>
            <span className="text-brand-accent"> jobs</span>
          </h2>
          <a
            href="/jobs"
            className="hidden md:flex text-brand-primary font-medium items-center gap-2 text-sm md:text-base"
          >
            Show all jobs
            <ChevronRightIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile: Horizontal scroll carousel */}
        <div className="md:hidden">
          <div
            className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {jobs.map((job) => (
              <div
                key={job.id}
                className="flex-shrink-0 w-[85vw] snap-center"
              >
                <JobCard job={job} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Job Cards Grid - 4 columns */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {/* Mobile: Show all jobs after cards */}
        <div className="md:hidden flex justify-start mt-6">
          <a
            href="/jobs"
            className="flex text-brand-primary font-medium items-center gap-2 text-sm"
          >
            Show all jobs
            <ChevronRightIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
