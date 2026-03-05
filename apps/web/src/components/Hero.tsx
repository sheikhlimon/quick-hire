"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function Hero() {
  const [jobQuery, setJobQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!jobQuery && !locationQuery) return;
    const params = new URLSearchParams();
    if (jobQuery) params.append("q", jobQuery);
    if (locationQuery) params.append("location", locationQuery);
    const queryString = params.toString();
    router.push(`/jobs?${queryString}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="bg-hero-bg w-full min-h-[600px] md:min-h-[700px] lg:min-h-screen relative overflow-hidden">
      {/* Content */}
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-28 min-h-[600px] md:min-h-[700px] lg:min-h-screen relative z-10">
        <div className="flex flex-col justify-center h-full max-w-md lg:max-w-2xl py-12 lg:py-16">
          {/* Discover */}
          <h2 className="font-clash-display font-semibold text-5xl md:text-6xl lg:text-7xl text-gray-900 mb-0.5">
            Discover
          </h2>

          {/* more than */}
          <h2 className="font-clash-display font-semibold text-5xl md:text-6xl lg:text-7xl text-gray-900 mb-0.5">
            more than
          </h2>

          {/* 5000+ Jobs with underline */}
          <div className="mb-6 w-fit">
            <h2 className="font-clash-display font-semibold text-5xl md:text-6xl lg:text-7xl text-brand-accent">
              5000+ Jobs
            </h2>
            <img
              src="/assets/vector.svg"
              alt=""
              className="mt-2"
            />
          </div>

          {/* Subtitle */}
          <p className="font-epilogue font-normal text-base leading-[160%] tracking-normal text-gray-500 mb-6 md:mb-8 max-w-md">
            Great platform for the job seeker that searching for new career
            heights and passionate about startups.
          </p>

          {/* Search Bar */}
          <div className="bg-white border border-gray-200 shadow-sm px-3 py-2.5 mb-4 md:mb-6 w-full">
            {/* Mobile: Vertical layout */}
            <div className="flex flex-col md:hidden gap-3">
              {/* Job title input */}
              <div className="flex items-center gap-2 relative">
                <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                    type="text"
                    placeholder="Job title or keyword"
                    value={jobQuery}
                    onChange={(e) => setJobQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="font-epilogue font-normal text-sm text-gray-700 flex-1 min-w-0 outline-none placeholder:text-gray-400 pb-1 border-b border-gray-300"
                  />
              </div>

              {/* Location input */}
              <div className="flex items-center gap-2 relative">
                <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input
                    type="text"
                    placeholder="Florence, Italy"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="font-epilogue font-normal text-sm text-gray-700 flex-1 min-w-0 outline-none placeholder:text-gray-400"
                  />
              </div>

              {/* Search button */}
              <button
                onClick={handleSearch}
                className="font-epilogue bg-brand-primary text-white px-5 py-3 font-medium text-base w-full hover:opacity-90 transition-opacity cursor-pointer"
              >
                Search my job
              </button>
            </div>

            {/* Desktop: Horizontal layout */}
            <div className="hidden md:flex items-center gap-2 md:gap-3 overflow-hidden">
              {/* Search icon + Job title input */}
              <div className="flex items-center gap-2 flex-1 min-w-0 relative">
                <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                   type="text"
                   placeholder="Job title or keyword"
                   value={jobQuery}
                   onChange={(e) => setJobQuery(e.target.value)}
                   onKeyPress={handleKeyPress}
                   className="font-epilogue font-normal text-sm text-gray-700 flex-1 min-w-0 outline-none placeholder:text-gray-400 pb-1 border-b border-gray-300"
                 />
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-5 bg-gray-200 flex-shrink-0" />

              {/* Location icon + Location input */}
              <div className="hidden md:flex items-center gap-2 flex-1 min-w-0 relative">
                <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input
                   type="text"
                   placeholder="Florence, Italy"
                   value={locationQuery}
                   onChange={(e) => setLocationQuery(e.target.value)}
                   onKeyPress={handleKeyPress}
                   className="font-epilogue font-normal text-sm text-gray-700 flex-1 min-w-0 outline-none placeholder:text-gray-400 pb-1 border-b border-gray-300"
                 />
                <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Search button */}
              <button
                onClick={handleSearch}
                className="font-epilogue bg-brand-primary text-white px-5 py-2 font-medium text-sm whitespace-nowrap flex-shrink-0 hover:opacity-90 transition-opacity cursor-pointer"
              >
                Search my job
              </button>
            </div>
          </div>

          {/* Popular */}
          <div className="font-epilogue font-normal text-sm leading-[160%] tracking-normal text-gray-500">
            <span className="font-semibold">Popular :</span>
            <span> UI Designer, UX Researcher, Android, Admin</span>
          </div>
        </div>
      </div>

      {/* Images - OUTSIDE content container */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Pattern SVG */}
        <div className="hidden lg:block absolute top-0 right-0 w-[50vw] h-full">
          <Image
            src="/assets/patter-bg.svg"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        {/* Hero Image */}
        <div className="hidden lg:block absolute top-0 right-[-100px] w-[45vw] h-full">
          <Image
            src="/assets/hero-bg.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
