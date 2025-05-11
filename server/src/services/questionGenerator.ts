import { openai } from "../utils/openaiClient";

export async function generateQuestions(
  jobTitle: string,
  requirements: string,
  experience: string
) {
  const prompt = `You are a technical interviewer. Generate 3 role-specific interview questions for a ${experience} ${jobTitle} with the following requirements:\n${requirements}\n\nInclude:\n- skill area\n- question\n- difficulty\n- evaluation criteria\nReturn in JSON format.`;

  const res = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  const text = res.choices[0].message?.content || "{}";
  return JSON.parse(text);
}
