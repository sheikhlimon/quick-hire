# QuickHire - Simplify Job Application

A modern job board application built with Next.js and Express, allowing users to browse jobs, submit applications, and admins to manage listings.

## 🚀 Live Demo

- **Frontend**: [Coming Soon]
- **Backend**: [Coming Soon]

## 🛠 Tech Stack

- **TypeScript** - For type safety and improved developer experience
- **Next.js** - Full-stack React framework
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **Express** - Fast, unopinionated web framework
- **Node.js** - Runtime environment
- **Prisma** - TypeScript-first ORM
- **MongoDB** - Database engine
- **Husky** - Git hooks for code quality
- **Turborepo** - Optimized monorepo build system

## ✨ Features

- **Job Listings**: Browse, search, and filter jobs by category/location
- **Job Details**: View full job descriptions with company info
- **Application System**: Submit applications with resume and cover letter
- **Admin Panel**: Create and delete job listings
- **Authentication**: User signup and login
- **Responsive Design**: Mobile-friendly UI based on Figma design

## 📁 Project Structure

quick-hire/
├── apps/
│ ├── web/ # Next.js frontend (port 3001)
│ └── server/ # Express backend (port 3000)
├── packages/
│ ├── db/ # Prisma schema & client
│ └── env/ # Environment validation (Zod)
└── package.json # Monorepo root (Turborepo)

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database
- npm 10.9.4

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd quick-hire

2. Install dependencies
npm install

3. Setup environment files

Backend (apps/server/.env):
cp apps/server/.env.example apps/server/.env
# Then generate JWT secret:
openssl rand -base64 32

Frontend (apps/web/.env):
cp apps/web/.env.example apps/web/.env

4. Run database migrations
npm run db:generate
npm run db:push

5. Start development servers
npm run dev

6. Open in browser
- Frontend: http://localhost:3001
- Backend API: http://localhost:3000

📡 API Endpoints

Jobs

- GET /api/jobs - List all jobs
- GET /api/jobs/:id - Get job details
- POST /api/jobs - Create job (Admin)
- DELETE /api/jobs/:id - Delete job (Admin)

Applications

- POST /api/applications - Submit application

Auth

- POST /api/auth/signup - Register user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user

📝 Environment Variables

| Variable               | Description               | Example                                |
|------------------------|---------------------------|----------------------------------------|
| DATABASE_URL           | MongoDB connection string | mongodb+srv://user:pass@cluster/db     |
| CORS_ORIGIN            | Frontend URL for CORS     | http://localhost:3001                  |
| JWT_SECRET             | Secret for JWT tokens     | Generate with: openssl rand -base64 32 |
| NEXT_PUBLIC_SERVER_URL | Backend API URL           | http://localhost:3000                  |

🛠 Available Scripts

- npm run dev - Start all apps
- npm run build - Build all apps
- npm run dev:web - Start frontend only
- npm run dev:server - Start backend only
- npm run check-types - Type check all apps
- npm run db:push - Push schema to database
- npm run db:generate - Generate Prisma client
- npm run db:studio - Open Prisma Studio

📄 License

MIT

👤 Author

Built as a task evaluation project.

---
Design: This project follows the https://www.figma.com/design/cLdiYqgjKdvrn4c0vQBdIT/QSL---QuickHire--Task-for-A.-S
oft.-Engineer?m=auto&t=mMSVr1ZwNCz0M81D-1
```
