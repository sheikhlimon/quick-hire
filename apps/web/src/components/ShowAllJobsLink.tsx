import { ChevronRightIcon } from "@heroicons/react/24/outline";

interface ShowAllJobsLinkProps {
  href?: string;
  text?: string;
}

export function ShowAllJobsLink({ href = "/jobs", text = "Show all jobs" }: ShowAllJobsLinkProps) {
  return (
    <div className="md:hidden flex justify-start mt-6">
      <a
        href={href}
        className="flex text-brand-primary font-medium items-center gap-2 text-sm"
      >
        {text}
        <ChevronRightIcon className="w-4 h-4" />
      </a>
    </div>
  );
}
