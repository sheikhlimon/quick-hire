# Implementation Plan - QuickHire Job Board

## Task Overview

Build a simple job board application based on Figma design. 6-8 hour task.

**Design Reference:** Screenshots in `/home/limon/Pcreenshots/`
- `screenshot-2026-02-28_02-52-07.png` - Job Listings (desktop)
- `screenshot-2026-02-28_02-50-39.png` - Job Listings (mobile)
- `screenshot-2026-02-28_02-52-26.png` - Job Detail (desktop)
- `screenshot-2026-02-28_02-51-02.png` - Job Detail (mobile)

## Project Structure

```
quick-hire/
├── apps/
│   ├── server/          # Express backend
│   │   └── src/
│   │       ├── index.ts
│   │       ├── routes/      # API endpoints
│   │       ├── controllers/ # Business logic
│   │       ├── middleware/  # Validation
│   │       └── utils/       # Helpers (prisma, jwt)
│   └── web/             # Next.js 16 frontend
│       └── src/
│           └── app/     # App Router pages
├── packages/
│   ├── db/              # Prisma schema
│   ├── env/             # Environment variables
│   └── config/          # Shared configs
└── turbo.json
```

## Requirements

### Frontend (Next.js)

| Page | Path | Description |
|------|------|-------------|
| Job Listings | `/` | Search, filter by category/location, job cards grid |
| Job Detail | `/jobs/[id]` | Full description + Apply form |
| Admin | `/admin` | Add/delete jobs (simple) |

**UI Must Match Screenshots:**
- Layout structure (see /home/limon/Pictures/screenshot-*.png)
- Typography
- Color scheme
- Spacing and alignment
- Mobile-first responsive

### Backend (Express)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/jobs` | GET | List all jobs (w/ search: `?q=`, `?category=`, `?location=`) |
| `/api/jobs/:id` | GET | Get single job details |
| `/api/jobs` | POST | Create job (admin) |
| `/api/jobs/:id` | DELETE | Delete job (admin) |
| `/api/applications` | POST | Submit application |

### Database (MongoDB + Prisma)

```prisma
model Job {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  title       String
  company     String
  location    String
  category    String
  type        String   // Full-time, Part-time, Contract, Remote
  description String
  salary      String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  applications Application[]
}

model Application {
  id         String   @id @default(auto()) @map("_id") @db.ObjectId
  jobId      String   @db.ObjectId
  job        Job      @relation(fields: [jobId], references: [id])
  name       String
  email      String
  resumeLink String
  coverNote  String?
  createdAt  DateTime @default(now())
}

model User {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  email     String   @unique
  password  String
  name      String
  role      String   @default("admin")
  createdAt DateTime @default(now())
}
```

### Validation (Zod)

- Required fields must be validated
- Email must be properly formatted
- Resume link must be valid URL

## Implementation Order (Backend First)

### Phase 1: Backend API
1. ✅ Setup project (better-t-stack)
2. ✅ ESLint flat config
3. ✅ Prisma schema
4. ✅ JWT utility (for admin)
5. [ ] Job routes + controller
6. [ ] Application routes + controller
7. [ ] Validation middleware (Zod)
8. [ ] Seed data script

### Phase 2: Frontend UI (One Component at a Time, Use frontend-design Skill)

#### Shared Components
9. [ ] Button component (primary, secondary, outline variants)
10. [ ] Input component (text, email, url types)
11. [ ] Textarea component
12. [ ] Badge component (Full-time, Part-time, Contract, Remote)
13. [ ] Card component (base card with shadow)

#### Job Listings Page (`/`)
14. [ ] Navbar component (QuickHire logo, conditional right side: Login+SignUp OR Post a Job)
15. [ ] Hero component ("Find Your Dream Job" heading + search bar)
16. [ ] FilterSection component (Category dropdown + Location dropdown + Search button)
17. [ ] JobCard component (company icon circle, title, company name, location, type badge, Apply button)
18. [ ] JobListings page (combine all above)

#### Job Detail Page (`/jobs/[id]`)
19. [ ] JobInfo component (title, company, location, type badge, description)
20. [ ] ApplyForm component (name input, email input, resume link input, cover note textarea, submit button)
21. [ ] JobDetail page (combine components)

#### Admin Page (`/admin`)
22. [ ] AddJobForm component (title, company, location, category, type, description, salary inputs)
23. [ ] AdminJobCard component (same as JobCard but with Delete button)
24. [ ] Admin page (combine components)
13. [ ] Responsive polish

### Phase 3: Polish & Deploy
14. [ ] Test all flows
15. [ ] README.md
16. [ ] Deploy (optional)

## NPM Scripts

```bash
npm run dev              # Start web + server
npm run dev:web          # Frontend only
npm run dev:server       # Backend only
npm run check-types      # TypeScript check
npm run db:push          # Push schema to DB
npm run lint             # Lint check
```

## Environment Variables

```env
# apps/server/.env
DATABASE_URL="mongodb+srv://..."
JWT_SECRET="your-secret"
PORT=3000
CORS_ORIGIN="http://localhost:3001"

# apps/web/.env
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

---

**Commit strategy:** One commit per completed feature.
**Remember:** Match Figma exactly, mobile-first, clean code.
