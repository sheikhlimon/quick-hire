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

async function fetchWithRetry(url: string, options?: RequestInit) {
  for (let i = 0; i < 3; i++) {
    try {
      const res = await fetch(url, { ...options, cache: "no-store" });
      if (res.ok) return res;
      // Don't retry client errors
      if (res.status < 500) break;
    } catch {
      // Network error - retry
    }
    if (i < 2) await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
  }
  throw new Error("Failed to fetch");
}

export async function getJobs() {
  const res = await fetchWithRetry(`${API_URL}/api/jobs`);
  return res.json();
}

export async function getJobById(id: string) {
  const res = await fetchWithRetry(`${API_URL}/api/jobs/${id}`);
  return res.json();
}

// Fetch all data in one call
export async function getHomeData() {
  const res = await fetchWithRetry(`${API_URL}/api/jobs`);
  const data = await res.json();
  const jobs = data.data || [];

  // Extract unique categories with job counts
  const categoryMap = new Map<string, number>();
  jobs.forEach((job: { category: string }) => {
    categoryMap.set(job.category, (categoryMap.get(job.category) || 0) + 1);
  });
  const categories = Array.from(categoryMap.entries()).map(([name, jobs]) => ({ name, jobs }));

  // First 8 jobs as featured
  const featuredJobs = jobs.slice(0, 8);

  // Next 8 jobs as latest (or remaining jobs if less than 16 total)
  const latestJobs = jobs.slice(8, 16);

  return { categories, featuredJobs, latestJobs };
}

export async function getCategories() {
  const { categories } = await getHomeData();
  return categories;
}

export async function getFeaturedJobs() {
  const { featuredJobs } = await getHomeData();
  return featuredJobs;
}

export async function getLatestJobs() {
  const { latestJobs } = await getHomeData();
  return latestJobs;
}
