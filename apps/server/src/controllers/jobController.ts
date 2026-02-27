import type { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export async function getAllJobs(req: Request, res: Response): Promise<void> {
  try {
    const { q, category, location } = req.query;

    const where: any = {};

    // Search in title OR company to match user intent
    if (q && typeof q === "string") {
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { company: { contains: q, mode: "insensitive" } },
      ];
    }

    if (category && typeof category === "string") {
      where.category = { equals: category, mode: "insensitive" };
    }

    if (location && typeof location === "string") {
      where.location = { contains: location, mode: "insensitive" };
    }

    const jobs = await prisma.job.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ success: false, message: "Failed to fetch jobs" });
  }
}

export async function getJobById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const job = await prisma.job.findUnique({
      where: { id },
    });

    if (!job) {
      res.status(404).json({ success: false, message: "Job not found" });
      return;
    }

    res.status(200).json({ success: true, data: job });
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ success: false, message: "Failed to fetch job" });
  }
}

export async function createJob(req: Request, res: Response): Promise<void> {
  try {
    const { title, company, location, category, type, description, salary } = req.body;

    if (!title || !company || !location || !category || !type || !description) {
      res.status(400).json({ success: false, message: "Missing required fields" });
      return;
    }

    const job = await prisma.job.create({
      data: {
        title,
        company,
        location,
        category,
        type,
        description,
        salary: salary || null,
      },
    });

    res.status(201).json({ success: true, data: job });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ success: false, message: "Failed to create job" });
  }
}

export async function deleteJob(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const existingJob = await prisma.job.findUnique({
      where: { id },
    });

    if (!existingJob) {
      res.status(404).json({ success: false, message: "Job not found" });
      return;
    }

    await prisma.job.delete({
      where: { id },
    });

    res.status(200).json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ success: false, message: "Failed to delete job" });
  }
}
