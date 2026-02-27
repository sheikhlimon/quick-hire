import type { Request, Response } from "express";
import { Router } from "express";
import {
  getAllJobs,
  getJobById,
  createJob,
  deleteJob,
} from "../controllers/jobController";

const router = Router();

// Search in title OR company to match user intent
router.get("/", getAllJobs);

router.get("/:id", getJobById);

router.post("/", createJob);

router.delete("/:id", deleteJob);

export default router;
