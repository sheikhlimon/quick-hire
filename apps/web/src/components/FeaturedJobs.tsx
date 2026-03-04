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

        {/* Job Cards Grid - 4 columns on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
