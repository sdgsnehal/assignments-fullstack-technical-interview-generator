# Interview Question Generator — Fullstack App

This project leverages OpenAI's GPT-4 to generate interview questions dynamically based on a job title, experience level, and role requirements. The system provides the ability to generate interview questions with details like skill area, question, difficulty, and evaluation criteria.

The app is divided into two parts:

- **Frontend (React + Vite)**: Users input job title, requirements, and experience level.
- **Backend (Node.js + Express)**: Handles validation, communication with the OpenAI API, and serves the questions.

---

## 🧩 Question Generation Approach

To generate interview questions, the application sends a request to OpenAI’s GPT-4, which is instructed through a custom **system prompt** to generate:

- **Job Title**: e.g., “Frontend Developer”
- **Experience Level**: e.g., “junior”, “mid”, “senior”
- **Requirements**: e.g., “Experience with React, TypeScript, Tailwind CSS”

The prompt instructs the model to return **3 JSON-formatted interview questions** with the following fields:

- `skill_area`: The skill being tested (e.g., JavaScript, React)
- `question`: The actual interview question
- `difficulty`: Based on the experience level
- `evaluation_criteria`: What constitutes a good answer

---

## 🎯 Difficulty Calibration Strategy

The difficulty of the generated questions is calibrated based on the **experience level** provided by the user:

- **Junior**: Questions are more foundational, focusing on basic concepts and understanding.
- **Mid**: Questions are practical and focus on solving problems and real-world applications.
- **Senior**: Questions dive into architecture, optimizations, and high-level technical concepts.

GPT-4 uses the provided experience level in the prompt to adjust the tone, complexity, and depth of the questions.

---

## ⚙️ Technical Decisions & Tradeoffs

### ✅ Tech Stack

| Layer       | Stack                          |
| ----------- | ------------------------------ |
| Frontend    | React + Vite + Tailwind CSS    |
| Backend     | Node.js + Express + TypeScript |
| Validation  | Zod                            |
| AI Model    | OpenAI GPT-4                   |
| UI Feedback | react-toastify                 |

### ✍️ Input Validation

- The frontend uses **Zod** for input validation before submitting data.
- The backend also validates the input using **Zod** to ensure consistency and prevent malformed data from reaching the OpenAI API.

### 🚫 Tradeoffs

| Choice                     | Tradeoff                                                              |
| -------------------------- | --------------------------------------------------------------------- |
| GPT-4 for all logic        | Higher API cost, limited control over exact formatting                |
| Frontend-driven form logic | Relies on good user input – no auto-sanitization                      |
| JSON output from GPT       | Assumes GPT always follows correct structure; parsing errors possible |
| Zod on both ends           | Slight duplication, but gives better DX and security                  |

---

## 🛠️ Local Setup Instructions

### 📁 Project Structure

root/
├── client/ → React frontend
└── server/ → Node backend

---

### ✅ Prerequisites

- Node.js `>=18`
- npm or yarn
- OpenAI API key

---

### ⚙️ 1. Backend Setup

```bash
cd server
cp .env.example .env   # Or create .env manually
npm install
npm run dev            # Runs on http://localhost:8000
```

PORT=8000
OPENAI_API_KEY=your-openai-api-key
CORS_ORIGIN=http://localhost:5173

💻 2. Frontend Setup
cd client
cp .env.example .env
npm install
npm run dev # Runs on http://localhost:5173
VITE_API_BASE_URL=http://localhost:8000/api/v1
🌐 API Overview
POST /api/v1/questions
Request:

json
Copy
Edit
{
"jobTitle": "Frontend Developer",
"requirements": "React, TypeScript, Tailwind CSS",
"experience": "mid"
}
Response:

json
Copy
Edit
{
"questions": [
{
"skill_area": "React",
"question": "...",
"difficulty": "medium",
"evaluation_criteria": "..."
}
]
}
