import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CompaniesSection } from "@/components/CompaniesSection";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <CompaniesSection />
    </div>
  );
}
