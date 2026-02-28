import { env } from "@quick-share/env/server";
import cors from "cors";
import express from "express";
import jobRoutes from "./routes/jobs";
import applicationRoutes from "./routes/applications";

const app = express();

app.use(
  cors({
    origin: env.CORS_ORIGIN,
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
  }),
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).send("OK");
});

app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
