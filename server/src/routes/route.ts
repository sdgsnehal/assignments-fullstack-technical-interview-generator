import express from "express";
import { generateQuestions } from "../services/questionGenerator";

const router = express.Router();

router.post("/questions", async (req, res) => {
  const { jobTitle, requirements, experience } = req.body;
  try {
    const questions = await generateQuestions(
      jobTitle,
      requirements,
      experience
    );
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: "Failed to generate questions" });
  }
});

export default router;
