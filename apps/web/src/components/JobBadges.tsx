import { getBadgeStyles } from "@/lib/badgeStyles";
import type { Job } from "@/lib/api";

interface JobBadgesProps {
  job: Job;
}

export function JobBadges({ job }: JobBadgesProps) {
  return (
    <div className="flex items-center gap-2">
      <span className={`font-epilogue px-3 py-1 rounded-full text-xs font-medium group-hover:bg-white/20 group-hover:text-white transition-colors ${getBadgeStyles(job.type).bg} ${getBadgeStyles(job.type).text}`}>
        {job.type}
      </span>
      <span className={`font-epilogue px-3 py-1 rounded-full text-xs font-medium group-hover:bg-white/20 group-hover:text-white transition-colors ${getBadgeStyles(job.category).bg} ${getBadgeStyles(job.category).text}`}>
        {job.category}
      </span>
      {job.subCategory && (
        <span className={`font-epilogue px-3 py-1 rounded-full text-xs font-medium group-hover:bg-white/20 group-hover:text-white transition-colors ${getBadgeStyles(job.subCategory).bg} ${getBadgeStyles(job.subCategory).text}`}>
          {job.subCategory}
        </span>
      )}
    </div>
  );
}
