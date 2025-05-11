import React from "react";
import { useState } from "react";
import axios from "axios";

const Jobform = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [requirements, setRequirements] = useState("");
  const [experience, setExperience] = useState("junior");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3001/api/questions", {
      jobTitle,
      requirements,
      experience,
    });
    setResult(res.data);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mt-10 items-center align-middle justify-center"
    >
      <input
        placeholder="Job Title"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        className="w-1/4 p-2  border-1 m-2"
      />
      <textarea
        placeholder="Requirements"
        value={requirements}
        onChange={(e) => setRequirements(e.target.value)}
        className="w-1/4 p-2  border-1 m-2"
      />
      <select
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        className="w-1/4 p-2  border-1 m-2"
      >
        <option value="junior">Junior</option>
        <option value="mid">Mid</option>
        <option value="senior">Senior</option>
      </select>
      <button
        type="submit"
        className="w-1/4 p-2 bg-sky-300 text-black font-bold border-1 m-2"
      >
        Generate Questions
      </button>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </form>
  );
};

export default Jobform;
