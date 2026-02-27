# Coding Standards & Conventions - QuickHire

## 🎯 Design System (From Figma Dashboard)

### Color Palette

```css
/* Primary */
--primary: #6366f1; /* Purple - main brand */
--primary-dark: #4f46e5;
--primary-light: #818cf8;

/* Secondary */
--secondary: #10b981; /* Teal - success */
--accent-blue: #3b82f6;
--accent-orange: #f59e0b;
--accent-red: #ef4444;

/* Background */
--bg-main: #f9fafb;
--bg-card: #ffffff;

/* Text */
--text-primary: #1f2937;
--text-secondary: #6b7280;
--text-tertiary: #9ca3af;
```

### Typography (Tailwind classes)

```tsx
// Font: Inter
"text-xs"; // 12px - labels
"text-sm"; // 13px - small text
"text-base"; // 14px - body
"text-lg"; // 16px - subheadings
"text-xl"; // 18px - headings
"text-2xl"; // 24px - section titles
"text-3xl"; // 30px - page titles

font - normal; // 400
font - medium; // 500
font - semibold; // 600
font - bold; // 700
```

### Spacing & Layout

```tsx
// Mobile-first responsive
"w-full md:w-1/2 lg:w-1/3";
"p-4 md:p-6 lg:p-8";
"gap-4 md:gap-6";

// Card padding
"p-4"; // 16px - standard card
"p-6"; // 24px - large card
```

### Border Radius

```tsx
"rounded-sm"; // 6px - buttons, inputs
"rounded-md"; // 8px - cards (most common)
"rounded-lg"; // 12px - large cards
"rounded-full"; // pills, badges
```

## 📁 File Naming Conventions

```
// Components: PascalCase
components/JobCard.tsx
components/JobList.tsx
components/Admin/Dashboard.tsx

// Utilities: camelCase
lib/formatDate.ts
lib/apiClient.ts

// Services: camelCase
services/jobService.ts
services/authService.ts

// Types: PascalCase with .types.ts suffix
types/job.types.ts
types/user.types.ts
```

## 🏗️ Component Structure

```tsx
// ❌ BAD - Too large, mixed concerns
// components/JobCard.tsx - 500+ lines

// ✅ GOOD - Split into modules
// components/JobCard/index.tsx (main, <100 lines)
// components/JobCard/JobCardHeader.tsx
// components/JobCard/JobCardMeta.tsx
// components/JobCard/useJobCard.ts (hooks)
```

### Component Template

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
  // Logic here
  return <div className="bg-white rounded-md p-4 shadow-sm">{/* JSX */}</div>;
}

// 4. Default export (if needed)
export default JobCard;
```

## 🔧 Code Style Rules

### TypeScript

```tsx
// ✅ Use explicit types for API data
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  createdAt: Date;
}

// ✅ Use Zod for validation
import { z } from "zod";

export const jobSchema = z.object({
  title: z.string().min(1),
  company: z.string().min(1),
  location: z.string().min(1),
});
```

### React Best Practices

```tsx
// ✅ Destructure props
function JobCard({ title, company, location }: JobProps) {
  return <div>{title}</div>;
}

// ✅ Use proper hooks
const [jobs, setJobs] = useState<Job[]>([]);

// ✅ Handle loading/error states
if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage />;
```

### Tailwind Guidelines

```tsx
// ✅ Mobile-first
className = "w-full md:w-1/2 lg:w-1/3";

// ✅ Use semantic colors
className = "text-text-secondary";
className = "bg-primary text-white";

// ❌ Don't use arbitrary values
className = "w-[327px]"; // BAD
className = "w-80"; // GOOD

// ❌ Don't override with !important
className = "!text-black";
```

## 🚨 Guardrails Checklist

Before committing any file:

- [ ] File under 250 lines? If no, refactor into modules
- [ ] Mobile-first responsive classes used?
- [ ] Figma colors matched exactly?
- [ ] TypeScript types defined?
- [ ] No console.log statements?
- [ ] No hardcoded values (use constants)?
- [ ] Components are reusable?

## 📝 Commit Message Format

```
feat: add job listings page with search
feat: implement admin dashboard
fix: resolve mobile layout overflow
refactor: extract shared button component
style: adjust dashboard card spacing
```

---

**Remember**: Keep it simple, keep it modular, match the design.
