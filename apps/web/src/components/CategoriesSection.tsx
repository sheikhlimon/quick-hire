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
            className="text-brand-primary font-medium flex items-center gap-2 base"
          >
            Show all jobs
            <ChevronRightIcon className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => {
            const Icon = categoryIcons[category.name] || ChevronRightIcon;
            return (
              <div
                key={category.name}
                className="border hover:bg-brand-primary hover:text-white transition-all cursor-pointer group p-8 flex flex-col justify-between w-72 h-52"
              >
                <Icon className="w-10 h-10 group-hover:text-white" style={{ color: "#6C5CE7" }} />

                <div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-white text-gray-900">
                    {category.name}
                  </h3>

                  <div className="flex items-center justify-between font-epilogue font-normal text-base leading-[160%] group-hover:text-white text-gray-600">
                    <span>{category.jobs} jobs available</span>
                    <ChevronRightIcon className="w-4 h-4" />
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
