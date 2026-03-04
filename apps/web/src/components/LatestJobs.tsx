import Image from "next/image";
import { MapPinIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import type { Job } from "@/lib/api";
import Link from "next/link";

interface LatestJobsProps {
  jobs?: Job[];
}

const getCategoryStyles = (category: string): { bg: string; text: string } => {
  const styles: Record<string, { bg: string; text: string }> = {
    Marketing: { bg: "bg-orange-100", text: "text-orange-700" },
    Design: { bg: "bg-blue-100", text: "text-blue-700" },
    Technology: { bg: "bg-purple-100", text: "text-purple-700" },
    Business: { bg: "bg-green-100", text: "text-green-700" },
    Sales: { bg: "bg-red-100", text: "text-red-700" },
  };
  return styles[category] || { bg: "bg-gray-100", text: "text-gray-700" };
};

const getJobTypeStyles = (type: string): { bg: string; text: string } => {
  const styles: Record<string, { bg: string; text: string }> = {
    "Full-Time": { bg: "bg-green-100", text: "text-green-700" },
    "Part-Time": { bg: "bg-blue-100", text: "text-blue-700" },
    Contract: { bg: "bg-purple-100", text: "text-purple-700" },
    Remote: { bg: "bg-orange-100", text: "text-orange-700" },
  };
  return styles[type] || { bg: "bg-gray-100", text: "text-gray-700" };
};

export function LatestJobs({ jobs = [] }: LatestJobsProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-28">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-clash-display font-semibold text-3xl md:text-5xl">
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
            const categoryStyles = getCategoryStyles(job.category);
            const jobTypeStyles = getJobTypeStyles(job.type);
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
                      <div className="flex items-center gap-2">
                        <span className={`font-epilogue px-3 py-1 rounded-full text-xs font-medium group-hover:bg-white/20 group-hover:text-white transition-colors ${jobTypeStyles.bg} ${jobTypeStyles.text}`}>
                          {job.type}
                        </span>
                        <span
                          className={`font-epilogue px-3 py-1 rounded-full text-xs font-medium group-hover:bg-white/20 group-hover:text-white transition-colors ${categoryStyles.bg} ${categoryStyles.text}`}
                        >
                          {job.category}
                        </span>
                      </div>
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
                        <div className="flex items-center gap-1">
                          <MapPinIcon className="w-3 h-3" />
                          <span className="font-epilogue text-sm">{job.location}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex items-center gap-2">
                        <span className={`font-epilogue px-3 py-1 rounded-full text-xs font-medium group-hover:bg-white/20 group-hover:text-white transition-colors ${jobTypeStyles.bg} ${jobTypeStyles.text}`}>
                          {job.type}
                        </span>
                        <span
                          className={`font-epilogue px-3 py-1 rounded-full text-xs font-medium group-hover:bg-white/20 group-hover:text-white transition-colors ${categoryStyles.bg} ${categoryStyles.text}`}
                        >
                          {job.category}
                        </span>
                      </div>
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
