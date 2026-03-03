import Image from "next/image";
import { MapPinIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import type { Job } from "@/lib/api";
import { Card } from "./ui/Card";

interface FeaturedJobsProps {
  jobs?: Job[];
}

export function FeaturedJobs({ jobs = [] }: FeaturedJobsProps) {
  return (
    <section className="py-16 pb-[72px] bg-white">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-[124px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-clash-display font-semibold text-2xl leading-[120%]">
            <span className="text-text-primary">Featured</span>
            <span className="text-brand-primary"> jobs</span>
          </h2>
          <a
            href="/jobs"
            className="text-brand-primary font-normal flex items-center gap-2 text-sm"
          >
            Show all jobs
            <ChevronRightIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
          {jobs.map((job) => (
            <Card key={job.id} className="p-4 md:p-5 min-h-[200px] md:min-h-[220px]">
              {/* Company Logo */}
              <div className="mb-3">
                {job.logo ? (
                  <Image
                    src={job.logo}
                    alt={job.company}
                    width={40}
                    height={40}
                    className="rounded-full w-10 h-10"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-brand-primary font-semibold text-base">
                      {job.company.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Job Title */}
              <h3 className="font-semibold text-base text-text-primary mb-2">
                {job.title}
              </h3>

              {/* Company and Location */}
              <div className="flex items-center gap-2 text-text-secondary mb-3">
                <span className="text-sm">{job.company}</span>
                <span className="text-gray-300">•</span>
                <div className="flex items-center gap-1">
                  <MapPinIcon className="w-3 h-3" />
                  <span className="text-sm">{job.location}</span>
                </div>
              </div>

              {/* Job Type Badge - Border style */}
              <div className="mb-4">
                <span className="px-3 py-1 rounded text-xs font-medium border border-brand-primary text-brand-primary">
                  {job.type}
                </span>
              </div>

              {/* Salary and Apply Button */}
              <div className="flex justify-between items-center">
                <span className="font-semibold text-text-primary text-sm">{job.salary}</span>
                <button className="text-brand-primary font-medium text-sm hover:underline">
                  Apply Now
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
