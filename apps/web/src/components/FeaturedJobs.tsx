"use client";

import type { Job } from "@/lib/api";
import { JobCard } from "./JobCard";
import { SectionHeader } from "./SectionHeader";
import { ShowAllJobsLink } from "./ShowAllJobsLink";

interface FeaturedJobsProps {
  jobs?: Job[];
}

export function FeaturedJobs({ jobs = [] }: FeaturedJobsProps) {

  return (
    <section className="py-16 bg-white max-w-[1920px] mx-auto">
      <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-28">
        {/* Header */}
        <SectionHeader
          titleParts={[
            { text: "Featured" },
            { text: " jobs", accent: true }
          ]}
          className="mb-8"
        />

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
        <ShowAllJobsLink />
      </div>
    </section>
  );
}
