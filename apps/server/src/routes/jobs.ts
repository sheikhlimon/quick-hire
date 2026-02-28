import { Router } from "express";
import {
  getAllJobs,
  getJobById,
  createJob,
  deleteJob,
} from "../controllers/jobController";
import { validate, jobSchema } from "../middleware/validation";

const router = Router();

router.get("/", getAllJobs);

router.get("/:id", getJobById);

router.post("/", validate(jobSchema), createJob);

router.delete("/:id", deleteJob);

export default router;
