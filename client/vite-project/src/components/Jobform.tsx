import { useState } from "react";
import api from "../api/api";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
type FormData = z.infer<typeof formSchema>;
const formSchema = z.object({
  jobTitle: z.string().min(2, "Job Title is required"),
  requirements: z
    .string()
    .min(10, "Requirements must be at least 10 characters"),
  experience: z.enum(["junior", "mid", "senior"]),
});
type Question = {
  skill_area: string;
  question: string;
  difficulty: string;
  evaluation_criteria: string;
};

const Jobform = () => {
  const [result, setResult] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: "",
      requirements: "",
      experience: "junior",
    },
  });

  const onSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      const { data } = await api.post("/api/v1/questions", formData);

      if (Array.isArray(data.questions.questions)) {
        setResult(data.questions.questions);
      } else {
        toast.error("Unexpected API response.");

        setResult([]);
      }
    } catch (error) {
      toast.error("Error fetching questions.");
      console.error("Error fetching questions:", error);
      setResult([]);
    } finally {
      setLoading(false);
    }
  };
  console.log(import.meta.env.VITE_API_BASE_URL);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col mt-10 items-center justify-center"
    >
      <div className="w-1/2 md:w-1/4 m-2">
        <input
          {...register("jobTitle")}
          placeholder="Job Title"
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.jobTitle && (
          <p className="text-red-500 text-sm mt-1">{errors.jobTitle.message}</p>
        )}
      </div>

      <div className="w-1/2 md:w-1/4 m-2">
        <textarea
          {...register("requirements")}
          placeholder="Requirements"
          className="w-full p-2 border border-gray-300 rounded"
          rows={5}
        />
        {errors.requirements && (
          <p className="text-red-500 text-sm mt-1">
            {errors.requirements.message}
          </p>
        )}
      </div>

      <div className="w-1/2 md:w-1/4 m-2">
        <select
          {...register("experience")}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="junior">Junior</option>
          <option value="mid">Mid</option>
          <option value="senior">Senior</option>
        </select>
      </div>

      <button
        type="submit"
        className={`w-1/2 md:w-1/4 p-2 font-bold m-2 rounded ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-sky-300 hover:bg-sky-400 text-black"
        }`}
        disabled={loading}
      >
        {loading ? "Generating... Please wait" : "Generate Questions"}
      </button>

      {result.length > 0 && (
        <div className="w-1/2  mt-6 space-y-4">
          {result.map((q, idx) => (
            <div key={idx} className="p-4 border rounded-md shadow-md bg-white">
              <h3 className="text-lg font-semibold mb-1">
                Skill Area: {q.skill_area}
              </h3>
              <p className="mb-2">
                <strong>Question:</strong> {q.question}
              </p>
              <p className="mb-2">
                <strong>Difficulty:</strong> {q.difficulty}
              </p>
              <p>
                <strong>Evaluation Criteria:</strong> {q.evaluation_criteria}
              </p>
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

export default Jobform;
