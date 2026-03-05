import Image from "next/image";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-28 max-w-6xl bg-brand-primary py-12 md:py-16 relative" style={{ clipPath: 'polygon(70px 0, 100% 0, 100% calc(100% - 70px), calc(100% - 70px) 100%, 0 100%, 0 70px)' }}>
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-12">
          {/* Left Content */}
          <div className="w-full md:max-w-md flex flex-col gap-6 pt-8 pb-16">
            {/* Heading */}
            <h2 className="font-clash-display font-semibold text-4xl md:text-5xl text-white leading-none">
              Start posting<br />jobs today
            </h2>

            {/* Subtext */}
            <p className="font-epilogue text-base leading-[160%] text-white/90">
              Start posting jobs for only $10.
            </p>

            {/* CTA Button */}
            <Link href="/signup" className="bg-white text-brand-primary px-8 py-3 font-semibold text-base hover:bg-gray-50 transition-colors duration-200 w-fit">
              Sign Up For Free
            </Link>
          </div>

          {/* Right Image - Positioned at bottom on desktop */}
          <div className="w-full md:w-auto md:absolute md:bottom-0 md:right-12">
            <Image
              src="/assets/admin.png"
              alt="Admin hiring illustration"
              width={564}
              height={346}
              className="h-auto w-auto mx-auto"
            />
          </div>
        </div>
    </section>
  );
}
