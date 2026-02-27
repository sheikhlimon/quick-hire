import { PrismaClient } from "../prisma/generated/client";

export { PrismaClient };

const prisma = new PrismaClient();

export default prisma;
