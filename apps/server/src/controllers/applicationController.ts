import type { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export async function getAllApplications(req: Request, res: Response): Promise<void> {
  try {
    const { jobId } = req.query;

    const where = jobId ? { jobId: jobId as string } : {};

    const applications = await prisma.application.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ success: false, message: "Failed to fetch applications" });
  }
}

export async function submitApplication(req: Request, res: Response): Promise<void> {
  try {
    const { jobId, name, email, resumeLink, coverNote } = req.body;

    const application = await prisma.application.create({
      data: {
        jobId,
        name,
        email,
        resumeLink,
        coverNote: coverNote || null,
      },
    });

    res.status(201).json({ success: true, data: application });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ success: false, message: "Failed to submit application" });
  }
}
