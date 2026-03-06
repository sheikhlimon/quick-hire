import { MapPinIcon } from "@heroicons/react/24/outline";
import type { Job } from "@/lib/api";
import Link from "next/link";
import { getBadgeStyles } from "@/lib/badgeStyles";
import { CompanyLogo } from "./CompanyLogo";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/jobs/${job.id}`}>
      <div className="group bg-white border border-gray-200 p-6 hover:bg-brand-primary hover:border-brand-primary transition-all duration-300 h-full flex flex-col">
        {/* Header: Logo + Job Type Badge */}
        <div className="flex justify-between items-start mb-3">
          {/* Company Logo */}
          <CompanyLogo logo={job.logo} companyName={job.company} className="w-12 h-12" groupHover />

          {/* Job Type Badge */}
          <span className="font-epilogue px-3 py-1.5 text-xs font-medium border border-brand-primary text-brand-primary group-hover:text-white group-hover:border-white/50 transition-colors">
            {job.type}
          </span>
        </div>

        {/* Job Title */}
        <h3 className="font-clash-display font-semibold text-lg text-gray-900 mb-2 group-hover:text-white transition-colors">
          {job.title}
        </h3>

        {/* Company and Location */}
        <div className="flex items-center gap-2 text-gray-500 mb-2 group-hover:text-white/90 transition-colors">
          <span className="font-epilogue text-sm">{job.company}</span>
          <span className="text-gray-300 group-hover:text-white/50">•</span>
          <div className="flex items-center gap-1">
            <MapPinIcon className="w-3 h-3" />
            <span className="font-epilogue text-sm">{job.location}</span>
          </div>
        </div>

        {/* Job Description Preview - Truncate to 2 lines */}
        <p className="font-epilogue text-gray-500 text-sm leading-relaxed mb-2 line-clamp-2 group-hover:text-white/80 transition-colors">
          {job.description}
        </p>

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* Category Tag */}
        <div>
          <span
            className={`font-epilogue px-4 py-1.5 rounded-full text-xs font-medium ${getBadgeStyles(job.category).bg} ${getBadgeStyles(job.category).text} group-hover:bg-white/20 group-hover:text-white transition-colors`}
          >
            {job.category}
          </span>
        </div>
      </div>
    </Link>
  );
}
