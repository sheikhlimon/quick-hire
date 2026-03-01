import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CompaniesSection } from "@/components/CompaniesSection";
import { CategoriesSection } from "@/components/CategoriesSection";
import { CTASection } from "@/components/CTASection";
import { FeaturedJobs } from "@/components/FeaturedJobs";
import { LatestJobs } from "@/components/LatestJobs";
import { Footer } from "@/components/Footer";
import { getCategories, getFeaturedJobs, getLatestJobs } from "@/lib/api";

export default async function HomePage() {
  const categories = await getCategories();
  const featuredJobs = await getFeaturedJobs();
  const latestJobs = await getLatestJobs();

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <CompaniesSection />
      <CategoriesSection categories={categories} />
      <CTASection />
      <FeaturedJobs jobs={featuredJobs} />
      <LatestJobs jobs={latestJobs} />
      <Footer />
    </div>
  );
}
