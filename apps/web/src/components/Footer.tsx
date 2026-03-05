import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Dribbble,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 w-full">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-28 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 grid-rows-[auto_auto_auto] md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-12">
          {/* Logo & Description - Full width on mobile, first column on desktop */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/assets/logo.png"
                alt="QuickHire"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="text-white font-semibold text-xl">QuickHire</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Great platform for the job seeker that passionate about startups.
              Find your dream job easier.
            </p>
          </div>

          {/* Navigation Links - 2 columns on mobile, stays in middle on desktop */}
          <div className="col-span-1 grid grid-cols-2 gap-8 md:gap-12">
            {/* About Column */}
            <div>
              <h3 className="text-white font-medium text-base mb-4">About</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/about" className="text-gray-400 text-sm hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/features" className="text-gray-400 text-sm hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="/pricing" className="text-gray-400 text-sm hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="/careers" className="text-gray-400 text-sm hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="text-white font-medium text-base mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/blog" className="text-gray-400 text-sm hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/help" className="text-gray-400 text-sm hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="text-gray-400 text-sm hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-gray-400 text-sm hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Subscription - Full width on mobile, last column on desktop */}
          <div className="col-span-1">
            <h3 className="text-white font-medium text-base mb-4">
              Get job notifications
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get notified about new job openings.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded bg-white border-0 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
              <button className="bg-brand-primary text-white px-6 py-3 rounded font-medium text-sm hover:opacity-90 transition-opacity whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright & Social */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-500 text-sm">
              2021 @ QuickHire. All rights reserved.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-brand-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-brand-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-brand-primary transition-colors"
              >
                <Dribbble className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-brand-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-brand-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
