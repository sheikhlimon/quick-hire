import Image from "next/image";

export function CTASection() {
  return (
    <section className="bg-brand-primary w-full min-h-[414px] flex items-center">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-28 py-14 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
          {/* Left Content */}
          <div className="w-full max-w-[364px] flex flex-col gap-6">
            {/* Heading */}
            <h2 className="font-clash-display font-bold text-4xl leading-[120%] text-white">
              Start posting jobs today
            </h2>

            {/* Subtext */}
            <p className="text-lg font-normal text-white leading-[160%]">
              Start posting jobs for only $10.
            </p>

            {/* CTA Button */}
            <button className="bg-white text-brand-primary px-8 py-3 rounded font-semibold text-base hover:bg-gray-50 transition-colors duration-200 w-fit">
              Sign Up For Free
            </button>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-auto flex-shrink-0">
            <Image
              src="/assets/admin.png"
              alt="Admin hiring illustration"
              width={564}
              height={346}
              className="w-full max-w-[564px] h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
