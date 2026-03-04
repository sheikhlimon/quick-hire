import Image from "next/image";
import { MapPinIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import type { Job } from "@/lib/api";
import Link from "next/link";

interface FeaturedJobsProps {
  jobs?: Job[];
}

const getCategoryStyles = (category: string): { bg: string; text: string } => {
  const styles: Record<string, { bg: string; text: string }> = {
    Marketing: { bg: "bg-orange-100", text: "text-orange-700" },
    Design: { bg: "bg-green-100", text: "text-green-700" },
    Technology: { bg: "bg-red-100", text: "text-red-700" },
    Business: { bg: "bg-purple-100", text: "text-purple-700" },
    Sales: { bg: "bg-blue-100", text: "text-blue-700" },
  };
  return styles[category] || { bg: "bg-gray-100", text: "text-gray-700" };
};

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
            className="hidden md:flex text-brand-primary font-normal items-center gap-2 text-sm hover:underline"
          >
            Show all jobs
            <ChevronRightIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Job Cards Grid - 4 columns on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobs.map((job) => {
            const categoryStyles = getCategoryStyles(job.category);
            return (
              <Link key={job.id} href={`/jobs/${job.id}`}>
                <div className="bg-white border border-gray-200 p-6 hover:shadow-md transition-all duration-200 h-64">
                  {/* Header: Logo + Job Type Badge */}
                  <div className="flex justify-between items-start mb-4">
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
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                          <span className="text-brand-primary font-semibold text-base">
                            {job.company.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Job Type Badge - Light blue background, square */}
                    <span className="px-3 py-1 text-xs font-medium bg-blue-50 text-brand-accent">
                      {job.type}
                    </span>
                  </div>

                  {/* Job Title */}
                  <h3 className="font-clash-display font-semibold text-lg text-gray-900 mb-3">
                    {job.title}
                  </h3>

                  {/* Company and Location */}
                  <div className="flex items-center gap-2 text-gray-500 mb-4">
                    <span className="text-sm">{job.company}</span>
                    <span className="text-gray-300">•</span>
                    <div className="flex items-center gap-1">
                      <MapPinIcon className="w-3 h-3" />
                      <span className="text-sm">{job.location}</span>
                    </div>
                  </div>

                  {/* Job Description Preview - Truncate to 2 lines */}
                  <p className="hidden md:block text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2">
                    {job.description}
                  </p>

                  {/* Category Tag */}
                  <div>
                    <span
                      className={`px-4 py-1.5 rounded-full text-xs font-medium ${categoryStyles.bg} ${categoryStyles.text}`}
                    >
                      {job.category}
                    </span>
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
