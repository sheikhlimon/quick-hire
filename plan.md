# Implementation Plan - QuickHire Job Board

## Overview

Job board with 3 pages: Job Listings, Job Detail, Admin Dashboard.
Backend: Express + MongoDB (Prisma). Frontend: Next.js 16.

## Pages Required (Per Task)

### 1. Job Listings Page (Public)

- Display all jobs
- Search functionality
- Filter by category and location
- Responsive layout (mobile-first)

### 2. Job Detail Page (Public)

- Full job description
- "Apply Now" form with:
  - Name
  - Email
  - Resume link (URL)
  - Cover note

### 3. Admin Dashboard

- Add new job listings
- Delete job listings
- Match Figma design exactly

## Phase 1: Project Setup

### 1.1 Initialize Better-T-Stack

```bash
npx create-better-t-stack@latest quick-share \
  --frontend next --backend express --runtime node \
  --api none --auth none --payments none \
  --database mongodb --orm prisma \
  --package-manager npm --git \
  --addons husky turborepo --examples none
```

### 1.2 Configure ESLint Flat Config

Create `eslint.config.js` (2026 format).

### 1.3 Setup Prisma Schema

Define Job and Application models.

## Phase 2: Backend API

### Database Schema

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
```

### API Endpoints

```
GET    /api/jobs              - List all jobs (w/ search/filter)
GET    /api/jobs/:id          - Get single job
POST   /api/jobs              - Create job (admin)
DELETE /api/jobs/:id          - Delete job (admin)
POST   /api/applications      - Submit application
POST   /api/auth/login        - Admin login
```

### Backend Structure

```
apps/api/src/
├── server.ts
├── routes/
│   ├── jobs.ts
│   ├── applications.ts
│   └── auth.ts
├── controllers/
│   ├── jobController.ts
│   └── authController.ts
├── middleware/
│   ├── auth.ts
│   └── validation.ts
├── services/
│   └── jobService.ts
└── utils/
    ├── prisma.ts
    └── jwt.ts
```

## Phase 3: Frontend

### Frontend Structure

```
apps/web/
├── app/
│   ├── layout.tsx
│   ├── page.tsx          # Job listings
│   ├── jobs/[id]/page.tsx # Job detail
│   └── admin/
│       ├── login/page.tsx
│       └── dashboard/page.tsx
├── components/
│   ├── job/              # Job-related components
│   ├── admin/            # Admin dashboard components
│   └── ui/               # Shared UI components
├── lib/
│   ├── apiClient.ts
│   └── utils.ts
└── styles/globals.css
```

### Design System (From Figma)

```css
/* Colors */
--primary: #6366f1 /* Purple */ --secondary: #10b981 /* Teal */ --accent-blue: #3b82f6
  --bg-main: #f9fafb --bg-card: #ffffff --text-primary: #1f2937 --text-secondary: #6b7280
  /* Spacing */ p-4 /* 16px card padding */ p-6 /* 24px large padding */ rounded-md /* 8px radius */;
```

## Implementation Order

1. Setup project and configs
2. Backend: Prisma schema + migrations
3. Backend: Auth (JWT)
4. Backend: Job CRUD endpoints
5. Backend: Application submission
6. Frontend: Shared UI components
7. Frontend: Job listings page
8. Frontend: Job detail + apply form
9. Frontend: Admin login
10. Frontend: Admin dashboard (match Figma)
11. Testing + refinement

---

**Commit strategy**: One commit per completed feature.
