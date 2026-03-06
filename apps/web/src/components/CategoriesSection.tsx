import {
  ChevronRightIcon,
  PaintBrushIcon,
  ComputerDesktopIcon,
  MegaphoneIcon,
  BriefcaseIcon,
  CogIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { SectionHeader } from "./SectionHeader";
import { ShowAllJobsLink } from "./ShowAllJobsLink";

interface Category {
  name: string;
  jobs: number;
}

interface CategoriesSectionProps {
  categories?: Category[];
}

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Design: PaintBrushIcon,
  Technology: ComputerDesktopIcon,
  Marketing: MegaphoneIcon,
  Sales: BriefcaseIcon,
  Engineering: CogIcon,
  "Human Resource": UserGroupIcon,
  Finance: CurrencyDollarIcon,
  Business: BuildingOfficeIcon,
};

export function CategoriesSection({ categories = [] }: CategoriesSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-28">
        <SectionHeader
          titleParts={[
            { text: "Explore by" },
            { text: " category", accent: true }
          ]}
          className="mb-10"
        />

        {/* Mobile: horizontal list cards, Desktop: vertical grid cards */}
        <div className="flex flex-col md:grid md:grid-cols-3 gap-3 md:gap-8">
          {categories.map((category) => {
            const Icon = categoryIcons[category.name] || ChevronRightIcon;
            return (
              <Link
                key={category.name}
                href={`/jobs?category=${encodeURIComponent(category.name)}`}
                className="group/card relative border border-gray-200 hover:bg-brand-primary hover:border-brand-primary transition-all duration-300"
              >
                {/* Mobile: Horizontal card */}
                <div className="md:hidden flex items-center p-4 gap-3">
                  <Icon className="w-6 h-6 shrink-0 text-[#6C5CE7] group-hover/card:text-white transition-colors" />
                  <div className="flex-1">
                    <h3 className="font-clash-display font-semibold text-base text-text-primary group-hover/card:text-white transition-colors">
                      {category.name}
                    </h3>
                    <span className="text-sm text-text-secondary group-hover/card:text-white transition-colors">{category.jobs} jobs available</span>
                  </div>
                  <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover/card:text-white transition-colors shrink-0" />
                </div>

                {/* Desktop: Vertical card */}
                <div className="hidden md:flex flex-col p-8 w-[274px] h-[214px]">
                  <Icon className="w-10 h-10 text-[#6C5CE7] group-hover/card:text-white transition-colors" />
                  <div className="mt-6 flex-1 flex flex-col justify-end">
                    <h3 className="font-clash-display font-semibold text-lg mb-1 text-text-primary group-hover/card:text-white transition-colors">
                      {category.name}
                    </h3>
                    <div className="font-epilogue font-normal text-base leading-[160%] text-text-secondary group-hover/card:text-white flex items-center gap-2 transition-colors">
                      {category.jobs} jobs available
                      <ChevronRightIcon className="w-5 h-5 text-brand-primary group-hover/card:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile: Show all jobs after cards */}
        <ShowAllJobsLink />
      </div>
    </section>
  );
}
