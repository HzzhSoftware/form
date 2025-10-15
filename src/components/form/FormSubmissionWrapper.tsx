"use client";

import React, { useEffect, useState } from "react";
import { getSubmission } from "@/services/form";
import FormLoading from "./FormLoading";
import { Form } from "@hzzhsoftware/types-form";

const generateId = () => crypto.randomUUID?.() || Math.random().toString(36).substring(2, 10);

export default function SubmissionWrapper({
  form,
  children,
}: {
  form: Form;
  children: (submissionId: string, savedValues: Record<string, string> | null) => React.ReactNode;
}) {
  const formId = form.formId;

  // Build a fully unpacked initial object
  const initialValues: Record<string, string> = {};
  for (let card of form.cards) {
    for (let field of card.fields) {
      initialValues[field.fieldId] = "";
    }
  }

  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [savedValues, setSavedValues] = useState<Record<string, string> | null>(initialValues);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load(submissionId: string) {
      try {
        const data = await getSubmission({ formId, submissionId });
        const mergedValues = { ...initialValues, ...(data as Record<string, string>) };
        console.log("mergedValues", mergedValues);
        setSavedValues(mergedValues);
      } catch (err) {
        console.error("Failed to load saved submission:", err);
      } finally {
        setLoading(false);
      }
    }

    let id = localStorage.getItem(`form_${formId}`);
    if (!id) {
      id = generateId();
      localStorage.setItem(`form_${formId}`, id);
    } else {
      load(id);
    }
    setLoading(false);
    setSubmissionId(id);
  }, [formId]);

  if (!submissionId || loading) {
    return <FormLoading message="Preparing form..." />;
  }

  return <>{children(submissionId, savedValues)}</>;
}
