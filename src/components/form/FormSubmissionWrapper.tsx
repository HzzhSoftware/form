"use client";

import React, { useEffect, useState } from "react";
import { getSubmission } from "@/services/form";
import FormLoading from "./FormLoading";
import FormSubmissionChoice from "./FormSubmissionChoice";
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
  const multipleSubmissions = form.multipleSubmissions ?? true; // default to true

  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [savedValues, setSavedValues] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(true);
  const [showChoice, setShowChoice] = useState(false);
  const [hasPreviousSubmission, setHasPreviousSubmission] = useState(false);
  const [previousSubmissionId, setPreviousSubmissionId] = useState<string | null>(null);
  const [previousSavedValues, setPreviousSavedValues] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    // Build a fully unpacked initial object
    const initialValues: Record<string, string> = {};
    for (let card of form.cards) {
      for (let field of card.fields) {
        initialValues[field.fieldId] = "";
      }
    }

    async function load(submissionId: string) {
      try {
        const data = await getSubmission({ formId, submissionId });
        const mergedValues = { ...initialValues, ...(data as Record<string, string>) };
        console.log("mergedValues", mergedValues);
        
        // Check if there's actual data (not just empty values)
        const hasData = Object.values(mergedValues).some(value => value && value.trim() !== "");
        
        if (hasData) {
          setPreviousSubmissionId(submissionId);
          setPreviousSavedValues(mergedValues);
          setHasPreviousSubmission(true);
          
          // Show choice if multipleSubmissions is enabled
          if (multipleSubmissions) {
            setShowChoice(true);
            setLoading(false);
            return;
          }
        }
        
        setSavedValues(mergedValues);
      } catch (err) {
        console.error("Failed to load saved submission:", err);
        // If loading fails, use initial values
        setSavedValues(initialValues);
      } finally {
        setLoading(false);
      }
    }

    let id = localStorage.getItem(`form_${formId}`);
    if (!id) {
      id = generateId();
      localStorage.setItem(`form_${formId}`, id);
      setSavedValues(initialValues);
      setLoading(false);
      setSubmissionId(id);
    } else {
      load(id);
      setSubmissionId(id);
    }
  }, [formId, multipleSubmissions, form.cards]);

  const handleStartNew = () => {
    const newId = generateId();
    localStorage.setItem(`form_${formId}`, newId);
    
    // Build fresh initial values
    const initialValues: Record<string, string> = {};
    for (let card of form.cards) {
      for (let field of card.fields) {
        initialValues[field.fieldId] = "";
      }
    }
    
    setSubmissionId(newId);
    setSavedValues(initialValues);
    setShowChoice(false);
  };

  const handleContinuePrevious = () => {
    if (previousSubmissionId) {
      setSubmissionId(previousSubmissionId);
      setSavedValues(previousSavedValues);
    }
    setShowChoice(false);
  };

  if (loading) {
    return <FormLoading message="Preparing form..." />;
  }

  if (showChoice && hasPreviousSubmission && multipleSubmissions) {
    return (
      <FormSubmissionChoice
        onStartNew={handleStartNew}
        onContinuePrevious={handleContinuePrevious}
        formName={form.name}
      />
    );
  }

  if (!submissionId) {
    return <FormLoading message="Preparing form..." />;
  }

  return <>{children(submissionId, savedValues)}</>;
}
