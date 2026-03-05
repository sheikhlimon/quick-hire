"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import type { Job } from "@/lib/api";
import { JobCard } from "./JobCard";

interface FeaturedJobsProps {
  jobs?: Job[];
}

export function FeaturedJobs({ jobs = [] }: FeaturedJobsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollDirection = 1;
    let lastTime = performance.now();
    const scrollSpeed = 30; // pixels per second

    const autoScroll = (currentTime: number) => {
      if (!isPaused && scrollContainer) {
        const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
        lastTime = currentTime;

        const scrollAmount = scrollSpeed * deltaTime;
        scrollContainer.scrollLeft += scrollAmount * scrollDirection;

        // Reverse direction at the ends
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        if (scrollContainer.scrollLeft >= maxScroll - 1) {
          scrollDirection = -1;
        } else if (scrollContainer.scrollLeft <= 0) {
          scrollDirection = 1;
        }
      } else {
        lastTime = currentTime;
      }
      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);

    // Touch handlers for mobile
    const handleTouchStart = () => setIsPaused(true);
    const handleTouchMove = () => {
      // Allow manual scrolling
    };
    const handleTouchEnd = () => {
      setTimeout(() => setIsPaused(false), 2000);
    };

    // Mouse handlers for desktop testing
    const handleMouseDown = () => setIsPaused(true);
    const handleMouseUp = () => setTimeout(() => setIsPaused(false), 2000);
    const handleMouseLeave = () => setTimeout(() => setIsPaused(false), 2000);

    scrollContainer.addEventListener("touchstart", handleTouchStart);
    scrollContainer.addEventListener("touchmove", handleTouchMove);
    scrollContainer.addEventListener("touchend", handleTouchEnd);
    scrollContainer.addEventListener("mousedown", handleMouseDown);
    scrollContainer.addEventListener("mouseup", handleMouseUp);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener("touchstart", handleTouchStart);
      scrollContainer.removeEventListener("touchmove", handleTouchMove);
      scrollContainer.removeEventListener("touchend", handleTouchEnd);
      scrollContainer.removeEventListener("mousedown", handleMouseDown);
      scrollContainer.removeEventListener("mouseup", handleMouseUp);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isPaused]);

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-28">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-clash-display font-semibold text-3xl md:text-5xl">
            <span className="text-text-primary">Featured</span>
            <span className="text-brand-accent"> jobs</span>
          </h2>
          <a
            href="/jobs"
            className="hidden md:flex text-brand-primary font-medium items-center gap-2 text-sm md:text-base"
          >
            Show all jobs
            <ChevronRightIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile: Horizontal scroll carousel */}
        <div className="md:hidden">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {jobs.map((job) => (
              <div
                key={job.id}
                className="flex-shrink-0 w-[85vw] snap-center"
              >
                <JobCard job={job} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Job Cards Grid - 4 columns */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {/* Mobile: Show all jobs after cards */}
        <div className="md:hidden flex justify-start mt-6">
          <a
            href="/jobs"
            className="flex text-brand-primary font-medium items-center gap-2 text-sm"
          >
            Show all jobs
            <ChevronRightIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
