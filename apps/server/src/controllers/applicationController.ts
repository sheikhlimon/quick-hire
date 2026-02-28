import type { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export async function submitApplication(req: Request, res: Response): Promise<void> {
  try {
    const { jobId, name, email, resumeLink, coverNote } = req.body;

    // Basic validation
    if (!jobId || !name || !email || !resumeLink) {
      res.status(400).json({ success: false, message: "Missing required fields" });
      return;
    }

    // Verify job exists before creating application
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      res.status(404).json({ success: false, message: "Job not found" });
      return;
    }

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
