import "dotenv/config";
import { prisma } from "../src/utils/prisma";

const sampleJobs = [
  {
    title: "Senior UI Designer",
    company: "Airbnb",
    location: "San Francisco, CA",
    category: "Design",
    subCategory: "UI/UX",
    type: "Full time",
    description: "Join our design team to create beautiful and intuitive user experiences for our platform.",
    salary: "$120k - $150k",
  },
  {
    title: "Product Designer",
    company: "Google",
    location: "New York, NY",
    category: "Design",
    subCategory: "Product",
    type: "Full time",
    description: "Design innovative products that impact billions of users worldwide.",
    salary: "$130k - $170k",
  },
  {
    title: "UX Researcher",
    company: "Meta",
    location: "Remote",
    category: "Design",
    subCategory: "UI/UX",
    type: "Full time",
    description: "Conduct user research to inform product decisions and improve user experiences.",
    salary: "$110k - $140k",
  },
  {
    title: "Brand Designer",
    company: "Stripe",
    location: "San Francisco, CA",
    category: "Design",
    subCategory: "Brand",
    type: "Full time",
    description: "Create stunning brand experiences that resonate with our customers.",
    salary: "$115k - $145k",
  },
  {
    title: "Frontend Developer",
    company: "Spotify",
    location: "Stockholm, Sweden",
    category: "Technology",
    subCategory: "Frontend",
    type: "Full time",
    description: "Build responsive web applications using React and TypeScript.",
    salary: "$90k - $120k",
  },
  {
    title: "Backend Engineer",
    company: "Netflix",
    location: "Los Gatos, CA",
    category: "Technology",
    subCategory: "Backend",
    type: "Full time",
    description: "Develop scalable backend services to power our streaming platform.",
    salary: "$140k - $180k",
  },
  {
    title: "Full Stack Developer",
    company: "Airbnb",
    location: "Remote",
    category: "Technology",
    subCategory: "Full Stack",
    type: "Full time",
    description: "Build end-to-end features for our hosting platform.",
    salary: "$125k - $155k",
  },
  {
    title: "DevOps Engineer",
    company: "Twitter",
    location: "Remote",
    category: "Technology",
    subCategory: "DevOps",
    type: "Contract",
    description: "Build and maintain CI/CD pipelines and cloud infrastructure.",
    salary: "$130k - $160k",
  },
  {
    title: "Marketing Manager",
    company: "Uber",
    location: "San Francisco, CA",
    category: "Marketing",
    subCategory: "Brand",
    type: "Full time",
    description: "Lead marketing campaigns to drive user acquisition and engagement.",
    salary: "$100k - $130k",
  },
  {
    title: "Content Strategist",
    company: "Slack",
    location: "Remote",
    category: "Marketing",
    subCategory: "Content",
    type: "Part time",
    description: "Develop and execute content strategies to support our marketing initiatives.",
    salary: "$70k - $90k",
  },
  {
    title: "Growth Marketing Lead",
    company: "Notion",
    location: "San Francisco, CA",
    category: "Marketing",
    subCategory: "Growth",
    type: "Full time",
    description: "Drive user growth through data-driven marketing strategies.",
    salary: "$110k - $140k",
  },
  {
    title: "Product Marketing Manager",
    company: "Figma",
    location: "New York, NY",
    category: "Marketing",
    subCategory: "Product",
    type: "Full time",
    description: "Launch and market our collaborative design tools to new audiences.",
    salary: "$105k - $135k",
  },
  {
    title: "Data Scientist",
    company: "Amazon",
    location: "Seattle, WA",
    category: "Technology",
    subCategory: "Data",
    type: "Full time",
    description: "Analyze large datasets to uncover insights and drive business decisions.",
    salary: "$125k - $160k",
  },
  {
    title: "Business Analyst",
    company: "Microsoft",
    location: "Redmond, WA",
    category: "Business",
    subCategory: "Analytics",
    type: "Full time",
    description: "Analyze business processes and provide recommendations for improvement.",
    salary: "$95k - $120k",
  },
  {
    title: "Sales Representative",
    company: "Salesforce",
    location: "Chicago, IL",
    category: "Sales",
    subCategory: "Enterprise",
    type: "Full time",
    description: "Drive sales growth by acquiring new enterprise customers.",
    salary: "$80k - $110k",
  },
  {
    title: "HR Manager",
    company: "LinkedIn",
    location: "Sunnyvale, CA",
    category: "Human Resource",
    subCategory: "People Operations",
    type: "Full time",
    description: "Manage HR operations and develop employee engagement programs.",
    salary: "$90k - $115k",
  },
  {
    title: "Technical Recruiter",
    company: "Stripe",
    location: "Remote",
    category: "Human Resource",
    subCategory: "Recruiting",
    type: "Full time",
    description: "Source and hire top engineering talent for our growing team.",
    salary: "$75k - $95k",
  },
  {
    title: "Customer Success Manager",
    company: "Notion",
    location: "San Francisco, CA",
    category: "Business",
    subCategory: "Operations",
    type: "Full time",
    description: "Ensure customer success and drive product adoption.",
    salary: "$85k - $110k",
  },
  {
    title: "Sales Engineer",
    company: "Figma",
    location: "Remote",
    category: "Sales",
    subCategory: "Account Executive",
    type: "Full time",
    description: "Support sales team with technical expertise and product demos.",
    salary: "$120k - $150k",
  },
];

async function seed() {
  try {
    // Clear existing applications first (foreign key constraint)
    await prisma.application.deleteMany({});

    // Clear existing jobs
    await prisma.job.deleteMany({});

    // Insert sample jobs
    await prisma.job.createMany({
      data: sampleJobs,
    });

    console.log(` Seeded ${sampleJobs.length} jobs successfully`);
  } catch (error) {
    console.error(" Error seeding database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
