import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <nav className="bg-hero-bg">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-28">
        <div className="flex justify-between items-center h-[78px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/assets/logo.png"
              alt="QuickHire"
              width={32}
              height={32}
            />
            <span className="font-red-hat font-bold text-2xl leading-[150%] tracking-[-0.01em]">
              QuickHire
            </span>
          </Link>

          {/* Right side - Login and Signup buttons */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="font-epilogue font-bold text-base leading-[160%] tracking-normal text-brand-primary"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="font-epilogue font-bold text-base leading-[160%] tracking-normal bg-brand-primary text-white px-6 py-3"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
