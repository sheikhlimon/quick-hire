import { Router } from "express";
import { getAllApplications, submitApplication } from "../controllers/applicationController";
import { validate, applicationSchema, jobExists } from "../middleware/validation";

const router = Router();

router.get("/", getAllApplications);

router.post("/", validate(applicationSchema), jobExists, submitApplication);

export default router;
