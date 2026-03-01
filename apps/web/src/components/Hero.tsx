import Image from "next/image";

export function Hero() {
  return (
    <section className="bg-hero-bg w-full min-h-[600px] md:min-h-[794px]">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-28 py-12 md:py-0">
        <div className="flex flex-col md:flex-row items-center md:h-[716px]">
          {/* Left Content */}
          <div className="flex-1 w-full text-center md:text-left">
            {/* Headline */}
            <div className="mb-6 md:mb-8">
              <div className="flex flex-col md:flex-row md:items-baseline justify-center md:justify-start gap-1 md:gap-3">
                <span className="font-semibold text-[28px] md:text-[42px] leading-[110%] tracking-normal text-text-primary">
                  Discover
                </span>
                <span className="font-semibold text-[28px] md:text-[42px] leading-[110%] tracking-normal text-text-primary">
                  more than
                </span>
                <div className="relative inline-block mt-1 md:mt-0">
                  <span className="font-semibold text-[42px] md:text-[72px] leading-[110%] tracking-normal text-brand-primary">
                    5000+ Jobs
                  </span>
                  <Image
                    src="/assets/vector.svg"
                    alt=""
                    width={533}
                    height={16}
                    className="absolute -bottom-2 md:-bottom-4 left-0 w-full"
                  />
                </div>
              </div>
            </div>

            {/* Subheadline */}
            <p className="text-sm md:text-base text-text-secondary max-w-lg mx-auto md:mx-0 mb-6 md:mb-8 leading-relaxed">
              Great platform for the job seeker that searching for new career
              heights and passionate about startups.
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-lg p-3 md:p-3 shadow-sm flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-3 mb-6">
              {/* Job Title Input */}
              <div className="flex items-center gap-2 px-3 py-2 flex-1">
                <svg
                  className="w-5 h-5 text-gray-400 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  className="flex-1 outline-none text-gray-600 text-sm md:text-base"
                />
              </div>

              {/* Divider - hidden on mobile */}
              <div className="hidden md:block w-px h-8 bg-gray-200" />

              {/* Location Input */}
              <div className="flex items-center gap-2 px-3 py-2 flex-1">
                <svg
                  className="w-5 h-5 text-gray-400 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Florence, Italy"
                  className="flex-1 outline-none text-gray-600 text-sm md:text-base"
                />
                <svg
                  className="w-4 h-4 text-gray-400 shrink-0 hidden md:block"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {/* Search Button */}
              <button className="bg-brand-primary text-white px-8 py-3 rounded font-semibold text-sm md:text-base hover:opacity-90 transition-opacity w-full md:w-auto">
                Search my job
              </button>
            </div>

            {/* Popular Categories */}
            <div className="text-sm md:text-base text-text-secondary">
              <span className="font-medium">Popular :</span>
              <span className="ml-1">
                UI Designer, UX Researcher, Android, Admin
              </span>
            </div>
          </div>

          {/* Right Content - Background pattern only, hidden on mobile */}
          <div className="hidden md:block flex-1 relative">
            <div
              className="absolute right-0 top-0 w-full h-full opacity-40"
              style={{
                backgroundImage: `url('/assets/hero-bg.png')`,
                backgroundSize: "contain",
                backgroundPosition: "right center",
                backgroundRepeat: "no-repeat",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
