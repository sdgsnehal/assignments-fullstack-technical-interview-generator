import { openai } from "../utils/openaiClient";

export async function generateQuestions(
  jobTitle: string,
  requirements: string,
  experience: string
) {
  try {
    const prompt = `You are a technical interviewer. Generate 3 role-specific interview questions for a ${experience} ${jobTitle} with the following requirements:\n${requirements}\n\nInclude:\n- skill area\n- question\n- difficulty\n- evaluation criteria\nReturn in JSON format.`;
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
