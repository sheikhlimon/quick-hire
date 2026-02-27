# Implementation Plan - QuickHire Job Board

## Actual Project Structure (from better-t-stack)

```
quick-share/
├── apps/
│   ├── server/          # Express backend (NOT 'api')
│   │   └── src/
│   │       └── index.ts
│   └── web/             # Next.js frontend
│       └── src/
│           └── app/     # App Router pages
├── packages/
│   ├── db/              # Prisma schema
│   │   └── prisma/
│   │       └── schema/
│   │           └── schema.prisma
│   ├── env/             # Environment variables
│   └── config/          # Shared configs
├── eslint.config.js     # ESLint flat config (need to create)
├── turbo.json
└── package.json
```

**Key difference**: Backend is `apps/server` NOT `apps/api`

## Pages Required (Per Task)

1. **Job Listings Page** (`apps/web/src/app/page.tsx`)
   - Display all jobs
   - Search functionality
   - Filter by category/location
   - Responsive layout

2. **Job Detail Page** (`apps/web/src/app/jobs/[id]/page.tsx`)
   - Full job description
   - Apply form (name, email, resume link, cover note)

3. **Admin Dashboard** (`apps/web/src/app/admin/dashboard/page.tsx`)
   - Add/delete job listings
   - Match Figma design exactly

## Backend Structure (apps/server/src/)

```
index.ts          # Express entry
routes/
  jobs.ts         # Job routes
  applications.ts # Application routes
  auth.ts         # Auth routes
controllers/
  jobController.ts
  authController.ts
middleware/
  auth.ts         # JWT verification
  validation.ts   # Zod validation
services/
  jobService.ts
utils/
  prisma.ts       # Prisma client singleton
  jwt.ts          # JWT utilities
```

## Database Schema (packages/db/prisma/schema/schema.prisma)

```prisma
model Job {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  title       String
  company     String
  location    String
  category    String
  type        String
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

## API Endpoints

```
GET    /api/jobs              - List all jobs (w/ search/filter)
GET    /api/jobs/:id          - Get single job
POST   /api/jobs              - Create job (admin)
DELETE /api/jobs/:id          - Delete job (admin)
POST   /api/applications      - Submit application
POST   /api/auth/login        - Admin login
```

## Implementation Order

1. ✅ Setup project (better-t-stack)
2. 🔄 Setup ESLint flat config + lint-staged
3. Setup Prisma schema + migrations
4. Backend: Auth (JWT)
5. Backend: Job CRUD endpoints
6. Backend: Application submission
7. Frontend: Shared UI components
8. Frontend: Job listings page
9. Frontend: Job detail + apply form
10. Frontend: Admin login
11. Frontend: Admin dashboard (match Figma)

## NPM Scripts Available

```bash
npm run dev              # Start all apps (web on :3001, server on :3000)
npm run dev:web          # Frontend only
npm run dev:server       # Backend only
npm run check-types      # TypeScript check
npm run db:push          # Push schema to DB
npm run db:studio        # Prisma Studio
```

---

**Commit strategy**: One commit per completed feature.
