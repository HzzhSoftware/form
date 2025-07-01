"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Form, Card, FormField } from "@hzzhsoftware/types-form";
import { submitForm, getSubmission } from "@/services/form";
import { useRouter } from "next/navigation";

type FormContextType = {
  submissionId: string;
  values: Record<string, string>;
  errors: Record<string, string>;
  currentCardIdx: number;
  totalCards: number;
  direction: number; // +1 next, -1 back
  handleChange: (id: string, value: string) => void;
  next: () => void;
  back: () => void;
  submit: () => Promise<void>;
  form: Form;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

// UUID generator fallback
const generateId = () => crypto.randomUUID?.() || Math.random().toString(36).substring(2, 10);

export function FormProvider({
  initialForm,
  children
}: {
  initialForm: Form;
  children: React.ReactNode;
}) {
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  const formId = initialForm.id;

  // 🔥 Handle submissionId generation
  useEffect(() => {
    let submissionId = localStorage.getItem(`form_${formId}`);
    if (!submissionId) {
      submissionId = generateId();
      localStorage.setItem(`form_${formId}`, submissionId);
    }
    setSubmissionId(submissionId);
  }, [formId]);

  // 🔥 Once we have submissionId, load any saved state from backend
  useEffect(() => {
    if (!submissionId) return;

    async function loadSavedState() {
      try {
        const saved = await getSubmission(formId, submissionId);
        if (saved && typeof saved === "object") {
          setValues(saved);
        } else {
          // initialize fresh state
          const initialValues = initialForm.cards
            .flatMap((card: Card) => card.fields || [])
            .reduce((acc: Record<string, string>, field: FormField) => ({
              ...acc,
              [field.id]: ""
            }), {});
          setValues(initialValues);
        }
      } catch (err) {
        console.error("Failed to load saved submission:", err);
      }
    }

    loadSavedState();
  }, [submissionId, formId, initialForm.cards]);

  // 🔥 Save to localStorage for quick resume
  useEffect(() => {
    if (submissionId) {
      localStorage.setItem(`form_${formId}_${submissionId}`, JSON.stringify(values));
    }
  }, [values, formId, submissionId]);

  const handleChange = (id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const next = async () => {
    const card = initialForm.cards[currentCardIdx];
    const newErrors: Record<string, string> = {};

    card.fields?.forEach((field) => {
      if (!values[field.id]) {
        newErrors[field.id] = "This field is required.";
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setDirection(1);
      setCurrentCardIdx((idx) => Math.min(idx + 1, initialForm.cards.length - 1));
      await submitForm(formId, values, submissionId!);
    }
  };

  const back = () => {
    setDirection(-1);
    setCurrentCardIdx((idx) => Math.max(idx - 1, 0));
  };

  const submit = async () => {
    const allErrors: Record<string, string> = {};

    initialForm.cards.forEach((card) => {
      card.fields?.forEach((field) => {
        if (!values[field.id]) {
          allErrors[field.id] = "This field is required.";
        }
      });
    });

    setErrors(allErrors);

    if (Object.keys(allErrors).length === 0) {
      try {
        await submitForm(formId, values, submissionId!);
        router.push(`/to/${formId}/thankyou`);
      } catch (err) {
        console.error(err);
        alert("Submission failed.");
      }
    }
  };

  if (!submissionId) return <div>Preparing form...</div>;

  return (
    <FormContext.Provider value={{
      submissionId,
      values,
      errors,
      currentCardIdx,
      totalCards: initialForm.cards.length,
      direction,
      handleChange,
      next,
      back,
      submit,
      form: initialForm
    }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const ctx = useContext(FormContext);
  if (!ctx) {
    throw new Error("useFormContext must be used inside a FormProvider");
  }
  return ctx;
}
