"use client";

import React, { useEffect, useState } from "react";
import { Form } from "@hzzhsoftware/types-form";
import { FormProvider } from "./FormContext";
import FormCard from "./components/FormCard";
import FormNavigation from "./components/FormNavigation";
import FormProgressBar from "./components/FormProgressBar";

interface FormProps {
  form: Form;
}

export default function FormClient({ form }: FormProps) {
  const [submissionId, setSubmissionId] = useState<string | null>(null);

  useEffect(() => {
    const key = `submission_${form.id}`;
    const savedSubmissionId = localStorage.getItem(key);
    if (savedSubmissionId) {
      setSubmissionId(savedSubmissionId);
      console.log(`Loaded submissionId: ${savedSubmissionId} for form ${form.id}`);
    } else {
      const newSubmissionId = crypto.randomUUID();
      setSubmissionId(newSubmissionId);
      localStorage.setItem(key, newSubmissionId);
      console.log(`No submissionId found for form ${form.id}, generated new one: ${newSubmissionId}`);
    }
  }, [form.id]);

  return (
    <FormProvider initialForm={form} submissionId={submissionId}>
      <FormProgressBar />
      <FormCard />
      <FormNavigation />
    </FormProvider>
  );
}
