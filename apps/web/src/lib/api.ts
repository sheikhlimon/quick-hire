const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  type: string;
  description: string;
  salary?: string;
  logo?: string;
}

export async function getJobs() {
  const res = await fetch(`${API_URL}/api/jobs`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
}

export async function getJobById(id: string) {
  const res = await fetch(`${API_URL}/api/jobs/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch job");
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${API_URL}/api/jobs`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch jobs");
  const data = await res.json();

  // Extract unique categories with job counts
  const categoryMap = new Map<string, number>();
  data.data?.forEach((job: { category: string }) => {
    categoryMap.set(job.category, (categoryMap.get(job.category) || 0) + 1);
  });

  return Array.from(categoryMap.entries()).map(([name, jobs]) => ({ name, jobs }));
}

export async function getFeaturedJobs() {
  const res = await fetch(`${API_URL}/api/jobs`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch jobs");
  const data = await res.json();

  // Return first 8 jobs as featured
  return data.data?.slice(0, 8) || [];
}

export async function getLatestJobs() {
  const res = await fetch(`${API_URL}/api/jobs`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch jobs");
  const data = await res.json();

  // Return next 8 jobs as latest
  return data.data?.slice(8, 16) || [];
}
