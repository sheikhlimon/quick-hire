# Claude Instructions - QuickHire Job Board

## CRITICAL GUARDRAILS - Read Before ANY Action

### 🚨 FILE CREATION RULE

**ONE FILE AT A TIME.** Never create multiple files in one operation.

- Complete and review each file before creating the next
- Prevents mistakes and ensures quality

### 📦 COMMIT RULE (MANDATORY)

**COMMIT AFTER COMPLETING EACH FEATURE.** Before starting new work:
- Run `git status` to check changes
- Commit completed features with clear messages
- NEVER let uncommitted work pile up

### 📋 PRE-WORK CHECKLIST (MANDATORY)

Before writing ANY code, you MUST:

1. Read `plan.md` - Understand the implementation plan
2. Read `rules.md` - Review coding standards
3. Read `progress.md` - Check what's completed
4. Update `progress.md` - Mark current task as `in_progress`
5. Check git status - Commit any completed work first

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
│   ├── server/          # Express backend (NOT 'api')
│   └── web/             # Next.js frontend
├── packages/
│   ├── db/              # Prisma schema
│   ├── env/             # Environment variables
│   └── config/          # Shared configs
├── eslint.config.js     # Flat config
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
npm run dev              # Start web + server
npm run dev:web          # Frontend only
npm run dev:server       # Backend only
npm run check-types      # TypeScript check
npm run db:push          # Push schema to DB
npm run lint             # Lint (after ESLint setup)
```

## Environment Variables

```env
# apps/server/.env
DATABASE_URL="mongodb+srv://..."
JWT_SECRET="your-secret"
PORT=3000

# apps/web/.env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

**Remember**: Re-read this file, `rules.md`, and `plan.md` before coding. Consistency prevents mistakes.
