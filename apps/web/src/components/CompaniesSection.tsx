import Image from "next/image";

const companies = [
  { name: "Vodafone", logo: "/assets/vodafone.png" },
  { name: "Intel", logo: "/assets/intel.png" },
  { name: "Tesla", logo: "/assets/tesla.png" },
  { name: "AMD", logo: "/assets/amd.png" },
  { name: "Talkit", logo: "/assets/talkit.png" },
];

export function CompaniesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-28">
        <h2 className="text-left font-normal text-[18px] leading-[160%] tracking-normal mb-12 opacity-50 font-epilogue" style={{ color: "#202430" }}>
          Companies we helped grow
        </h2>

        <div className="flex justify-between items-center h-10 max-w-5xl mx-auto">
          {companies.map((company) => (
            <div
              key={company.name}
              className="grayscale opacity-60 hover:opacity-100 transition-opacity"
            >
              <Image
                src={company.logo}
                alt={company.name}
                width={120}
                height={40}
                className="object-contain h-10"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
