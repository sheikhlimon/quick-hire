import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CompaniesSection } from "@/components/CompaniesSection";
import { CategoriesSection } from "@/components/CategoriesSection";
import { getCategories } from "@/lib/api";

export default async function HomePage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <CompaniesSection />
      <CategoriesSection categories={categories} />
    </div>
  );
}
