import Image from "next/image";
import { MapPinIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import type { Job } from "@/lib/api";

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

export function LatestJobs({ jobs = [] }: LatestJobsProps) {
  return (
    <section className="pt-[72px] pb-16 bg-gray-50 min-h-[745px]">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-[124px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-clash-display font-medium text-2xl leading-[120%]">
            <span className="text-text-primary">Latest</span>
            <span className="text-brand-primary"> jobs open</span>
          </h2>
          <a
            href="/jobs"
            className="text-brand-primary font-normal flex items-center gap-2 text-sm"
          >
            Show all jobs
            <ChevronRightIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Job Cards Grid - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {jobs.map((job) => {
            const categoryStyles = getCategoryStyles(job.category);
            return (
              <div
                key={job.id}
                className="bg-white rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex gap-4">
                  {/* Company Logo */}
                  <div className="flex-shrink-0">
                    {job.logo ? (
                      <Image
                        src={job.logo}
                        alt={job.company}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-brand-primary font-semibold text-base">
                          {job.company.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Job Details */}
                  <div className="flex-1">
                    {/* Job Title */}
                    <h3 className="font-semibold text-base text-text-primary mb-1">
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

                    {/* Tags */}
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                        {job.type}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${categoryStyles.bg} ${categoryStyles.text}`}
                      >
                        {job.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
