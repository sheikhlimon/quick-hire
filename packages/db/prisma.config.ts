import type { PrismaConfig } from "prisma";

import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Try to load .env file (works locally), but don't fail if missing (Render)
dotenv.config({
  path: path.resolve(__dirname, "../../apps/server/.env"),
});

export default {
  schema: path.join("prisma", "schema"),
  migrations: {
    path: path.join("prisma", "migrations"),
  },
} satisfies PrismaConfig;
