import "dotenv/config";
import { prisma } from "../src/utils/prisma";

const sampleJobs = [
  {
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Remote",
    category: "Engineering",
    type: "Full-time",
    description: "We are looking for a skilled Frontend Developer to join our team. You will work with React, TypeScript, and modern CSS frameworks to build beautiful user interfaces.",
    salary: "$80,000 - $120,000",
  },
  {
    title: "Backend Developer",
    company: "DataFlow",
    location: "San Francisco, CA",
    category: "Engineering",
    type: "Full-time",
    description: "Join our backend team to build scalable APIs and services. Experience with Node.js, Express, and MongoDB required.",
    salary: "$90,000 - $130,000",
  },
  {
    title: "UX Designer",
    company: "DesignHub",
    location: "New York, NY",
    category: "Design",
    type: "Contract",
    description: "Looking for a creative UX Designer to help us redesign our core product. 6-month contract with possibility of extension.",
    salary: "$70,000 - $90,000",
  },
  {
    title: "Product Manager",
    company: "StartupX",
    location: "Remote",
    category: "Product",
    type: "Full-time",
    description: "Lead product development for our B2B SaaS platform. Experience with agile methodologies and user research required.",
    salary: "$100,000 - $140,000",
  },
  {
    title: "DevOps Engineer",
    company: "CloudScale",
    location: "Austin, TX",
    category: "Engineering",
    type: "Full-time",
    description: "Help us build and maintain our cloud infrastructure. Experience with AWS, Docker, and Kubernetes required.",
    salary: "$95,000 - $135,000",
  },
  {
    title: "Marketing Coordinator",
    company: "GrowthCo",
    location: "Chicago, IL",
    category: "Marketing",
    type: "Part-time",
    description: "Support our marketing team with campaign coordination, social media management, and content creation.",
    salary: "$40,000 - $55,000",
  },
  {
    title: "Data Analyst",
    company: "InsightData",
    location: "Remote",
    category: "Data",
    type: "Full-time",
    description: "Analyze business data and create reports to drive decision-making. Proficiency in SQL and Python required.",
    salary: "$75,000 - $105,000",
  },
  {
    title: "Mobile Developer",
    company: "AppWorks",
    location: "Seattle, WA",
    category: "Engineering",
    type: "Full-time",
    description: "Build cross-platform mobile apps using React Native. Experience with iOS and Android development required.",
    salary: "$85,000 - $125,000",
  },
];

async function seed() {
  try {
    // Clear existing jobs
    await prisma.job.deleteMany({});

    // Insert sample jobs
    await prisma.job.createMany({
      data: sampleJobs,
    });

    console.log(`✅ Seeded ${sampleJobs.length} jobs successfully`);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
