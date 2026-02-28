import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CompaniesSection } from "@/components/CompaniesSection";
import { CategoriesSection } from "@/components/CategoriesSection";
import { CTASection } from "@/components/CTASection";
import { FeaturedJobs } from "@/components/FeaturedJobs";
import { getCategories, getFeaturedJobs } from "@/lib/api";

export default async function HomePage() {
  const categories = await getCategories();
  const featuredJobs = await getFeaturedJobs();

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <CompaniesSection />
      <CategoriesSection categories={categories} />
      <CTASection />
      <FeaturedJobs jobs={featuredJobs} />
    </div>
  );
}
