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
          <h2 className="font-clash-display font-semibold text-2xl leading-[120%]">
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
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
          {categories.map((category) => {
            const Icon = categoryIcons[category.name] || ChevronRightIcon;
            return (
              <div
                key={category.name}
                className="border border-gray-200 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all cursor-pointer group p-4 md:p-8 flex items-center md:flex-col md:justify-between w-full h-auto md:w-72 md:h-52"
              >
                <Icon className="w-6 h-6 md:w-10 md:h-10 group-hover:text-white shrink-0 md:shrink-auto" style={{ color: "#6C5CE7" }} />

                <div className="flex-1 md:flex-none flex items-center justify-between ml-3 md:ml-0 gap-2">
                  <div className="md:block">
                    <h3 className="font-semibold text-base md:text-lg mb-0 md:mb-2 group-hover:text-white text-text-primary">
                      {category.name}
                    </h3>

                    <p className="hidden md:block font-epilogue font-normal text-base leading-[160%] group-hover:text-white text-text-secondary">
                      {category.jobs} jobs available
                    </p>
                  </div>

                  {/* Mobile: Show job count inline, Desktop: Hide */}
                  <span className="md:hidden text-sm text-text-secondary">
                    {category.jobs} jobs
                  </span>

                  {/* Desktop: Show arrow in bottom right */}
                  <ChevronRightIcon className="hidden md:block w-4 h-4 group-hover:text-white text-text-secondary" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
