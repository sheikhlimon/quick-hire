import Image from "next/image";
import { MapPinIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import type { Job } from "@/lib/api";
import Link from "next/link";
import { JobBadges } from "./JobBadges";

interface LatestJobsProps {
  jobs?: Job[];
}

export function LatestJobs({ jobs = [] }: LatestJobsProps) {
  return (
    <section className="py-16 bg-hero-bg relative [clip-path:polygon(120px_0,_100%_0,_100%_100%,_0_100%,_0_60px)]">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-28">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-clash-display font-semibold text-3xl md:text-5xl tracking-tight">
            <span className="text-text-primary">Latest</span>
            <span className="text-brand-accent"> jobs open</span>
          </h2>
          <a
            href="/jobs"
            className="hidden md:flex text-brand-primary font-medium items-center gap-2 text-sm md:text-base"
          >
            Show all jobs
            <ChevronRightIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Job Cards Grid - Mobile: 1 column, Desktop: 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          {jobs.map((job) => {
            return (
              <Link key={job.id} href={`/jobs/${job.id}`}>
                <div className="group bg-white border border-gray-200 p-4 md:p-6 hover:bg-brand-primary hover:border-brand-primary transition-all duration-300">
                  {/* Mobile: Logo on top, text below */}
                  <div className="md:hidden">
                    {/* Company Logo */}
                    <div className="flex justify-start mb-3">
                      {job.logo ? (
                        <Image
                          src={job.logo}
                          alt={job.company}
                          width={48}
                          height={48}
                          className="rounded-full w-12 h-12"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                          <span className="text-brand-primary font-semibold text-base">
                            {job.company.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Job Details */}
                    <div>
                      {/* Job Title */}
                      <h3 className="font-clash-display font-semibold text-lg text-text-primary mb-1 group-hover:text-white transition-colors">
                        {job.title}
                      </h3>

                      {/* Company and Location */}
                      <div className="flex items-center gap-2 text-text-secondary mb-3 group-hover:text-white/90 transition-colors">
                        <span className="font-epilogue text-sm">{job.company}</span>
                        <span className="text-gray-300 group-hover:text-white/50">•</span>
                        <div className="flex items-center gap-1">
                          <MapPinIcon className="w-3 h-3" />
                          <span className="font-epilogue text-sm">{job.location}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <JobBadges job={job} />
                    </div>
                  </div>

                  {/* Desktop: Logo inline on left with proper spacing */}
                  <div className="hidden md:flex md:gap-4 items-start">
                    {/* Company Logo */}
                    <div className="flex-shrink-0">
                      {job.logo ? (
                        <Image
                          src={job.logo}
                          alt={job.company}
                          width={48}
                          height={48}
                          className="rounded-full w-12 h-12"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                          <span className="text-brand-primary font-semibold text-base">
                            {job.company.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Job Details */}
                    <div className="flex-1 min-w-0">
                      {/* Job Title */}
                      <h3 className="font-clash-display font-semibold text-lg text-text-primary mb-1 group-hover:text-white transition-colors">
                        {job.title}
                      </h3>

                      {/* Company and Location */}
                      <div className="flex items-center gap-2 text-text-secondary mb-4 group-hover:text-white/90 transition-colors">
                        <span className="font-epilogue text-sm">{job.company}</span>
                        <span className="text-gray-300 group-hover:text-white/50">•</span>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <MapPinIcon className="w-3 h-3" />
                          <span className="font-epilogue text-sm">{job.location}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <JobBadges job={job} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
