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

// quick UUID
const generateId = () => crypto.randomUUID?.() || Math.random().toString(36).substring(2, 10);

export default function FormClient({ form }: FormProps) {
  const key = `submission_${form.id}`;
  const [submissionId, setSubmissionId] = useState<string | null>(null);

  useEffect(() => {
    let saved = localStorage.getItem(key);
    if (!saved) {
      saved = generateId();
      localStorage.setItem(key, saved);
      console.log(`Created new submissionId: ${saved}`);
    } else {
      console.log(`Loaded existing submissionId: ${saved}`);
    }
    setSubmissionId(saved);
  }, [key]);

  if (!submissionId) return null; // or a loading spinner

  return (
    <FormProvider initialForm={form} submissionId={submissionId}>
      <FormProgressBar />
      <FormCard />
      <FormNavigation />
    </FormProvider>
  );
}
