import { Router } from "express";
import { submitApplication } from "../controllers/applicationController";
import { validate, applicationSchema, jobExists } from "../middleware/validation";

const router = Router();

router.post("/", validate(applicationSchema), jobExists, submitApplication);

export default router;
