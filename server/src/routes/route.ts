import express, { Request, Response } from "express";
import { generateQuestions } from "../services/questionGenerator";
import { z } from "zod";

const router = express.Router();
const questionSchema = z.object({
  jobTitle: z.string().min(2, "Job title is required"),
  requirements: z.string().min(10, "Requirements are too short"),
  experience: z.enum(["junior", "mid", "senior"]),
});

router.route("/questions").post(async (req: Request, res: Response) => {
  try {
    const parsedData = questionSchema.parse(req.body);

    const { jobTitle, requirements, experience } = parsedData;

    const questions = await generateQuestions(
      jobTitle,
      requirements,
      experience
    );

    res.status(200).json({ questions });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: "Validation failed", details: err.errors });
      return;
    }

    console.error("Error generating questions:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
