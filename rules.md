# Coding Standards & Conventions - QuickHire

## 🎯 Design System (From Figma)

### Color Palette

```css
/* Primary */
--primary: #6366f1; /* Indigo/Purple */
--primary-dark: #4f46e5;
--primary-light: #818cf8;

/* Secondary */
--success: #10b981; /* Green */
--warning: #f59e0b; /* Orange */
--danger: #ef4444; /* Red */

/* Backgrounds */
--bg-main: #f9fafb; /* Light gray */
--bg-card: #ffffff;
--bg-hover: #f3f4f6;

/* Text */
--text-primary: #1f2937; /* Dark gray */
--text-secondary: #6b7280; /* Medium gray */
--text-tertiary: #9ca3af; /* Light gray */
```

### Typography (Tailwind)

```tsx
// Font: Inter (or similar sans-serif)
"text-xs"    // 12px - labels, meta
"text-sm"    // 14px - small text
"text-base"  // 16px - body
"text-lg"    // 18px - subheadings
"text-xl"    // 20px - headings
"text-2xl"   // 24px - section titles
"text-3xl"   // 30px - page titles

// Weights
font-normal    // 400
font-medium    // 500
font-semibold  // 600
font-bold      // 700
```

### Spacing & Layout

```tsx
// Mobile-first responsive (MANDATORY)
"w-full md:w-1/2 lg:w-1/3"           // Cards: 1 → 2 → 3 columns
"p-4 md:p-6"                         // Padding: 16px → 24px
"gap-4 md:gap-6"                     // Gap spacing
"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// Container
"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
```

### Border Radius

```tsx
"rounded-sm"   // 4px - small elements
"rounded-md"   // 6px - buttons, inputs, cards
"rounded-lg"   // 8px - large cards
"rounded-full" // pills, badges, avatars
```

### Shadows

```tsx
"shadow-sm"    // Subtle card shadow
"shadow-md"    // Standard shadow
"shadow-lg"    // Elevated elements
```

## 📁 File Naming (Keeps it clean)

```
// Components: PascalCase
components/JobCard.tsx
components/Button.tsx
components/Badge.tsx

// Pages: App Router convention
app/page.tsx
app/jobs/[id]/page.tsx
app/admin/page.tsx

// Server: camelCase
routes/jobs.ts
controllers/jobController.ts
middleware/validation.ts
```

## 🏗️ Component Template

```tsx
// 1. Imports
import { useState } from "react";

// 2. Types
interface JobCardProps {
  job: Job;
  onApply?: (id: string) => void;
}

// 3. Component
export function JobCard({ job, onApply }: JobCardProps) {
  return (
    <div className="bg-white rounded-md p-4 shadow-sm">
      {/* JSX */}
    </div>
  );
}
```

## 🔧 Code Style Rules

### Comments Rule

**Keep comments minimal and meaningful.**

- ✅ Add comments for: WHY (business logic context), complex algorithms, non-obvious decisions
- ❌ Don't add comments for: WHAT (self-explanatory code)

```tsx
// ❌ BAD - Comment explains obvious code
// Get all jobs from database
const jobs = await prisma.job.findMany();

// ✅ GOOD - Comment explains WHY, not WHAT
// Search in title OR company to match user intent
const jobs = await prisma.job.findMany({
  where: {
    OR: [
      { title: { contains: query } },
      { company: { contains: query } }
    ]
  }
});
```

### TypeScript

```tsx
// ✅ Explicit types for API data
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  type: string;
  description: string;
  createdAt: Date;
}

// ✅ Zod for validation
import { z } from "zod";

export const jobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().min(1),
  category: z.string().min(1),
  type: z.string().min(1),
  description: z.string().min(10),
});

export const applicationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  resumeLink: z.string().url("Must be a valid URL"),
  coverNote: z.string().optional(),
});
```

### React Best Practices

```tsx
// ✅ Destructure props
function JobCard({ title, company, location }: JobProps) {
  return <div>{title}</div>;
}

// ✅ Handle loading/error states
if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage />;

// ✅ Use proper hooks
const [jobs, setJobs] = useState<Job[]>([]);
```

### Tailwind Guidelines

```tsx
// ✅ Mobile-first (REQUIRED)
className="w-full md:w-1/2 lg:w-1/3"

// ✅ Semantic colors
className="text-gray-600"
className="bg-indigo-500 text-white"

// ❌ No arbitrary values
className="w-[327px]"  // BAD
className="w-80"       // GOOD

// ❌ No !important
className="!text-black"  // BAD
```

## 🚨 Guardrails Checklist

Before committing:
- [ ] File under 250 lines?
- [ ] Mobile-first responsive classes?
- [ ] Figma colors matched?
- [ ] TypeScript types defined?
- [ ] No console.log statements?
- [ ] Components reusable?

## 📝 Commit Message Format

```
feat: add job listings page with search
feat: implement admin create/delete
fix: resolve mobile layout overflow
refactor: extract shared button component
style: adjust card spacing to match Figma
```

## 🔴 Critical: Match Screenshots Exactly

Reference: `/home/limon/Pictures/screenshot-2026-02-28_*.png`

**Job Listings Page:**
- **Header**: Logo left, "Post a Job" button right
- **Hero**: "Find Your Dream Job" heading + search bar
- **Filters**: Category + Location dropdowns
- **Job Card**: Company logo circle, title, company, location, type badge, Apply button
- **Mobile**: Single column stacked cards
- **Desktop**: 3 column grid

**Job Detail Page:**
- Left: Job info (title, company, location, type, description)
- Right: Apply form (name, email, resume link, cover note)

---

**Remember:** Keep it simple, keep it modular, match the design, mobile-first.
