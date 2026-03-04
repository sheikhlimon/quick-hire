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
        <div className="flex justify-between items-center mb-10">
          <h2 className="font-clash-display font-semibold text-[48px] leading-[110%] tracking-normal">
            <span>Explore by</span>
            <span className="text-brand-primary"> category</span>
          </h2>
          <a
            href="/jobs"
            className="text-brand-primary font-medium flex items-center gap-2 text-sm md:text-base"
          >
            Show all jobs
            <ChevronRightIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile: horizontal list cards, Desktop: vertical grid cards */}
        <div className="flex flex-col md:grid md:grid-cols-3 gap-3 md:gap-8">
          {categories.map((category) => {
            const Icon = categoryIcons[category.name] || ChevronRightIcon;
            return (
              <div
                key={category.name}
                className="group/card relative border border-gray-200 hover:bg-brand-primary hover:border-brand-primary transition-all duration-300 cursor-pointer"
              >
                {/* Mobile: Horizontal card */}
                <div className="md:hidden flex items-center p-4 h-[70px]">
                  <Icon className="w-6 h-6 shrink-0 text-[#6C5CE7] group-hover/card:text-white transition-colors" />
                  <div className="flex-1 flex items-center justify-between ml-3">
                    <h3 className="font-semibold text-base text-text-primary group-hover/card:text-white transition-colors">
                      {category.name}
                    </h3>
                    <span className="text-sm text-text-secondary group-hover/card:text-white transition-colors">{category.jobs} jobs</span>
                  </div>
                </div>

                {/* Desktop: Vertical card */}
                <div className="hidden md:flex flex-col p-8 w-[274px] h-[214px]">
                  <Icon className="w-10 h-10 text-[#6C5CE7] group-hover/card:text-white transition-colors" />
                  <div className="mt-6 flex-1 flex flex-col justify-end">
                    <h3 className="font-semibold text-lg mb-1 text-text-primary group-hover/card:text-white transition-colors">
                      {category.name}
                    </h3>
                    <div className="font-epilogue font-normal text-base leading-[160%] text-text-secondary group-hover/card:text-white flex items-center gap-2 transition-colors">
                      {category.jobs} jobs available
                      <ChevronRightIcon className="w-5 h-5 text-brand-primary group-hover/card:text-white transition-colors" />
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
