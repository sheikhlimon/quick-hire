import { ChevronRightIcon } from "@heroicons/react/24/outline";

interface SectionHeaderProps {
  titleParts: { text: string; accent?: boolean }[];
  linkHref?: string;
  linkText?: string;
  className?: string;
}

export function SectionHeader({ titleParts, linkHref = "/jobs", linkText = "Show all jobs", className }: SectionHeaderProps) {
  return (
    <div className={`flex justify-between items-center ${className}`}>
      <h2 className="font-clash-display font-semibold text-3xl md:text-5xl tracking-tight">
        {titleParts.map((part, index) => (
          <span key={index} className={part.accent ? "text-brand-accent" : "text-text-primary"}>
            {part.text}
          </span>
        ))}
      </h2>
      <a
        href={linkHref}
        className="hidden md:flex text-brand-primary font-medium items-center gap-2 text-sm md:text-base"
      >
        {linkText}
        <ChevronRightIcon className="w-4 h-4" />
      </a>
    </div>
  );
}
