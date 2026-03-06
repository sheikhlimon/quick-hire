import Image from "next/image";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="w-full py-1 md:py-2">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-28 max-w-[1920px]">
        <div className="bg-brand-primary py-12 md:py-16 px-6 md:px-12 relative [clip-path:polygon(120px_0,_100%_0,_100%_calc(100%_-_60px),_calc(100%_-_120px)_100%,_0_100%,_0_60px)]">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            {/* Left Content */}
            <div className="w-full md:max-w-md flex flex-col gap-6 pt-8 pb-[260px] md:py-0">
              {/* Heading */}
              <h2 className="font-clash-display font-semibold text-4xl md:text-5xl text-white leading-none">
                Start posting
                <br />
                jobs today
              </h2>

              {/* Subtext */}
              <p className="font-epilogue text-base leading-[160%] text-white/90">
                Start posting jobs for only $10.
              </p>

              {/* CTA Button */}
              <div className="flex justify-center md:justify-start">
                <Link
                  href="/signup"
                  className="bg-white text-brand-primary px-8 py-4 font-semibold text-base hover:bg-gray-50 transition-colors duration-200 w-full md:w-fit text-center"
                >
                  Sign Up For Free
                </Link>
              </div>
            </div>
          </div>

          {/* Right Image - Positioned at bottom, outside flex container */}
          <div className="absolute bottom-[60px] right-0 md:bottom-0 md:right-12">
            {/* Mobile: dashboard image */}
            <Image
              src="/assets/dashboard.png"
              alt="Admin hiring illustration"
              width={320}
              height={160}
              className="h-auto w-auto md:hidden"
            />
            {/* Desktop: admin image */}
            <Image
              src="/assets/admin.png"
              alt="Admin hiring illustration"
              width={480}
              height={300}
              className="h-auto w-auto hidden md:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
