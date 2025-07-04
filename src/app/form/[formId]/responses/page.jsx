import React from "react";
import { listSubmissions } from "@/services/form";
import SubmissionRecord from "./components/SubmissionRecord";

export default async function FormPage({ params }) {
  const { formId } = await params;

  let submissions = null;
  try {
    submissions = await listSubmissions(formId, 1, 20);
    console.log(submissions);
    } catch (err) {
    console.error("Failed to load form:", err);
  }

  if (!submissions) {
    return <div className="text-center text-red-600 text-xl">Submissions not found</div>;
  }

  return (
    <div className="flex min-h-screen">
      <div className="max-w-6xl w-full p-6">
        <h1 className="text-3xl font-bold mb-8">Responses</h1>
        <div className="space-y-4">
          {submissions.map((submission) => (
            <SubmissionRecord key={submission.id} submission={submission} />
          ))}
        </div>
        </div>
    </div>
  );
}
