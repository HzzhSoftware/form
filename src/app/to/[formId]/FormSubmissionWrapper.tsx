"use client";

import React, { useEffect, useState } from "react";
import { getSubmission } from "@/services/form";
import FormLoading from "./components/FormLoading";

const generateId = () => crypto.randomUUID?.() || Math.random().toString(36).substring(2, 10);

export default function SubmissionWrapper({
  formId,
  children,
}: {
  formId: string;
  children: (submissionId: string, savedValues: Record<string, string> | null) => React.ReactNode;
}) {
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [savedValues, setSavedValues] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let id = localStorage.getItem(`form_${formId}`);
    if (!id) {
      id = generateId();
      localStorage.setItem(`form_${formId}`, id);
    }
    setSubmissionId(id);
  }, [formId]);

  useEffect(() => {
    if (!submissionId) return;
    async function load() {
      try {
        const data = await getSubmission(formId, submissionId!);
        setSavedValues(data as Record<string, string>);
      } catch (err) {
        console.error("Failed to load saved submission:", err);
        setSavedValues(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [formId, submissionId]);

  if (!submissionId || loading) {
    return <FormLoading message="Preparing form..." />;
  }

  return <>{children(submissionId, savedValues)}</>;
}
