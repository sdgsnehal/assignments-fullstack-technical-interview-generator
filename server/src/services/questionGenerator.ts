import { openai } from "../utils/openaiClient";

export async function generateQuestions(
  jobTitle: string,
  requirements: string,
  experience: string
) {
  try {
    const prompt = `You are a technical interviewer. Generate 3 practical, real-world interview questions for a ${experience} ${jobTitle} based on the following job requirements:\n${requirements}\n
Focus on assessing the candidate's ability to solve problems, write code, debug, or make architectural decisions in real work scenarios — not just definitions or theory.

For each question, return the following in JSON format:
- skill_area (e.g., JavaScript, React)
- question (real-world, scenario-based)
- difficulty (easy, medium, hard — appropriate for the ${experience} level)
- evaluation_criteria (what a good answer should demonstrate)

Format your output strictly as JSON.`;

    console.log(prompt);
    const res = await openai.responses.create({
      model: "gpt-4",
      input: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });
    console.log(res.output_text);
    const text = res.output_text;
    return JSON.parse(text);
  } catch (err) {
    console.error("Error generating questions:", err);
    throw new Error("Failed to generate interview questions");
  }
}
