# Claude Instructions - QuickHire Job Board

## 🚨 CRITICAL GUARDRAILS - Read Before ANY Action

### 📦 FILE CREATION RULE

**ONE FILE AT A TIME.** Never create multiple files in one operation.

- Complete and review each file before creating the next
- Prevents mistakes and ensures quality

**EXPLAIN FIRST, THEN CREATE:**
- Always explain what the file does BEFORE creating it
- Brief description of purpose and key functionality
- Wait for confirmation if unsure

### 📋 PRE-WORK CHECKLIST

Before writing ANY code, you MUST:
1. Read `plan.md` - Understand the implementation plan
2. Read `rules.md` - Review coding standards and Figma design
3. Read `progress.md` - Check what's completed
4. Update `progress.md` - Mark current task as `in_progress`
5. Check git status - Commit any completed work first

### 📏 FILE SIZE GUARDRAIL

**Max 250 lines per file.** If exceeding:
- Extract reusable utilities to separate files
- Split components into smaller modules
- Create shared packages in `/packages`

### 🎨 DESIGN REQUIREMENTS

- **UI must match screenshots exactly**
- Screenshots: `/home/limon/Pictures/screenshot-2026-02-28_*.png`
- Mobile-first approach (`w-full md:w-1/2 lg:w-1/3`)
- Use exact colors, spacing, typography from rules.md

## Project Overview

### What We're Building

A simple job board application with:

1. **Job Listings Page** (`/`) - Public page with search/filters
2. **Job Detail Page** (`/jobs/[id]`) - Public page with apply form
3. **Admin Page** (`/admin`) - Simple add/delete jobs

**This is a 6-8 hour task submission project.**

## Tech Stack (2026)

```
Frontend:  Next.js 16 (App Router)
Styling:   Tailwind CSS v4
Backend:   Express.js (separate server)
Database:  MongoDB + Prisma ORM
Auth:      JWT + bcrypt (simple admin only)
Validation: Zod schemas
Linting:   ESLint flat config + Husky
Monorepo:  Turborepo
```

## Project Structure

```
quick-hire/
├── apps/
│   ├── server/          # Express backend
│   └── web/             # Next.js frontend
├── packages/
│   ├── db/              # Prisma schema
│   ├── env/             # Environment variables
│   └── config/          # Shared configs
├── eslint.config.js
└── turbo.json
```

## API Endpoints

```
GET    /api/jobs              - List all jobs (w/ ?q=, ?category=, ?location=)
GET    /api/jobs/:id          - Get single job
POST   /api/jobs              - Create job (admin)
DELETE /api/jobs/:id          - Delete job (admin)
POST   /api/applications      - Submit application
```

## Common Mistakes

| ❌ Don't                      | ✅ Do                           |
| ----------------------------- | ------------------------------- |
| Create multiple files at once | One file, review, then next     |
| Use Next.js API routes        | Use Express routes              |
| Start with desktop styles     | Mobile-first: `w-full md:w-1/2` |
| Exceed 250 lines per file     | Split into modules              |
| `localStorage` for tokens     | httpOnly cookies                |
| Generic colors                | Use Figma color palette         |

## Quick Commands

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

## Implementation Order

### Phase 1: Backend (Current)
1. ✅ Setup project
2. ✅ ESLint + Prisma schema
3. ✅ JWT utility
4. [ ] Job routes + controller
5. [ ] Application routes + controller
6. [ ] Validation middleware
7. [ ] Seed data

### Phase 2: Frontend
8. [ ] Shared components
9. [ ] Job Listings page
10. [ ] Job Detail page
11. [ ] Admin page

### Phase 3: Polish
12. [ ] Testing
13. [ ] README
14. [ ] Deploy (optional)

---

**Remember:** Re-read this file, `rules.md`, and `plan.md` before coding.
**Match Figma exactly. Mobile-first. One file at a time.**
