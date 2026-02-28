import type { Request, Response } from "express";
import { prisma } from "../utils/prisma";

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
