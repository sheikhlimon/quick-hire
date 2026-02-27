# Claude Instructions - QuickHire Job Board

## CRITICAL GUARDRAILS - Read Before ANY Action

### 🚨 FILE CREATION RULE

**ONE FILE AT A TIME.** Never create multiple files in one operation.

- Complete and review each file before creating the next
- Prevents mistakes and ensures quality

### 📋 PRE-WORK CHECKLIST (MANDATORY)

Before writing ANY code, you MUST:

1. Read `plan.md` - Understand the implementation plan
2. Read `rules.md` - Review coding standards
3. Read `progress.md` - Check what's completed
4. Update `progress.md` - Mark current task as `in_progress`

### 📏 FILE SIZE GUARDRAIL

**Max 250 lines per file.** If exceeding:

- Extract reusable utilities to separate files
- Split components into smaller modules
- Create shared packages in `/packages`

### 🎨 DESIGN REQUIREMENTS

- **UI must match Figma dashboard screenshot exactly**
- Mobile-first approach (`w-full md:w-1/2 lg:w-1/3`)
- Use `frontend-design` skill for all UI components
- Figma: https://www.figma.com/design/cLdiYqgjKdvrn4c0vQBdIT/QSL---QuickHire--Task-for-A.-Soft.-Engineer

## Architecture

### Tech Stack (2026)

```
Frontend:  Next.js 16 (App Router)
Styling:   Tailwind CSS v4
Backend:   Express.js (separate server)
Database:  MongoDB + Prisma ORM
Auth:      JWT + bcrypt + httpOnly cookies
Validation: Zod schemas
Linting:   ESLint flat config + Husky
Monorepo:  Turborepo
```

### Project Structure

```
quick-share/
├── apps/
│   ├── web/              # Next.js frontend
│   └── api/              # Express backend
├── packages/
│   ├── ui/               # Shared UI components
│   ├── db/               # Prisma schema
│   ├── config/           # Shared configs
│   └── types/            # Shared types
├── eslint.config.js      # Flat config
└── turbo.json
```

### Initialization Command

```bash
npx create-better-t-stack@latest quick-share \
  --frontend next --backend express --runtime node \
  --api none --auth none --payments none \
  --database mongodb --orm prisma \
  --package-manager npm --git \
  --addons husky turborepo --examples none
```

## Pages Required (Per Task)

1. **Job Listings** - Public page with search/filters
2. **Job Detail** - Public page with apply form
3. **Admin Dashboard** - Matches Figma screenshot (manage jobs)

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
npm run dev              # Start web + api
npm run dev --filter=web # Frontend only
npm run dev --filter=api # Backend only
npx prisma migrate dev   # DB migrations
npm run lint             # Lint (auto-runs on commit)
```

## Environment Variables

```env
# apps/api/.env
DATABASE_URL="mongodb+srv://..."
JWT_SECRET="your-secret"
API_PORT=4000

# apps/web/.env.local
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

**Remember**: Re-read this file, `rules.md`, and `plan.md` before coding. Consistency prevents mistakes.
