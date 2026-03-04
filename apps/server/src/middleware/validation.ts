import { z } from "zod";
import type { Request, Response, NextFunction } from "express";
import { prisma } from "../utils/prisma";

// Job types enum
const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Remote"] as const;

// Schema definitions
export const jobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().min(1, "Location is required"),
  category: z.string().min(1, "Category is required"),
  type: z.enum(jobTypes, {
    message: "Type must be Full-time, Part-time, Contract, Internship, or Remote",
  }),
  description: z.string().min(10, "Description must be at least 10 characters"),
  salary: z.string().optional(),
});

export const applicationSchema = z.object({
  jobId: z.string().min(1, "Job ID is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  resumeLink: z.string().url("Resume link must be a valid URL"),
  coverNote: z.string().optional(),
});

export const authSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Validation middleware factory
export function validate(schema: z.ZodObject<z.ZodRawShape>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.issues.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        }));
        res.status(400).json({ success: false, errors });
        return;
      }
      res.status(400).json({ success: false, message: "Validation failed" });
    }
  };
}

// Verify job exists middleware
export async function jobExists(req: Request, res: Response, next: NextFunction) {
  try {
    const { jobId } = req.body;
    const { id } = req.params;

    const targetId = jobId || id;

    if (!targetId || typeof targetId !== "string") {
      res.status(400).json({ success: false, message: "Invalid job ID" });
      return;
    }

    const job = await prisma.job.findUnique({
      where: { id: targetId },
    });

    if (!job) {
      res.status(404).json({ success: false, message: "Job not found" });
      return;
    }

    next();
  } catch {
    res.status(500).json({ success: false, message: "Failed to verify job" });
  }
}
