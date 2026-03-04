import Image from "next/image";

const companies = [
  { name: "Vodafone", logo: "/assets/vodafone.png", wide: false },
  { name: "Intel", logo: "/assets/intel.png", wide: false },
  { name: "Talkit", logo: "/assets/talkit.png", wide: false },
  { name: "AMD", logo: "/assets/amd.png", wide: false },
  { name: "Tesla", logo: "/assets/tesla.png", wide: true },
];

export function CompaniesSection() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-28">
        <h2 className="text-center md:text-left font-normal text-base md:text-[18px] leading-[160%] tracking-normal mb-8 md:mb-12 opacity-50 font-epilogue text-text-primary">
          Companies we helped grow
        </h2>

        {/* Mobile: 2 columns, Desktop: all in one row */}
        <div className="grid grid-cols-2 md:flex md:justify-between md:items-center gap-x-8 gap-y-8 md:gap-0 max-w-5xl mx-auto">
          {companies.map((company) => (
            <div
              key={company.name}
              className="flex items-center justify-center grayscale opacity-60 hover:opacity-100 transition-opacity"
            >
              <Image
                src={company.logo}
                alt={company.name}
                width={company.wide ? 200 : 120}
                height={40}
                className="object-contain h-8 md:h-10"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
