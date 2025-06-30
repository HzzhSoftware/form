"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Form, Card, FormField } from "@hzzhsoftware/types-form";
import { submitForm } from "@/services/form";
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

export function FormProvider({
  initialForm,
  submissionId,
  children
}: {
  initialForm: Form;
  submissionId: string;
  children: React.ReactNode;
}) {
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  const formId = initialForm.id;

  useEffect(() => {
    const saved = localStorage.getItem(`form_${formId}`);
    if (saved) {
      setValues(JSON.parse(saved));
    } else {
      const initialValues = initialForm.cards
        .flatMap((card: Card) => card.fields || [])
        .reduce((acc: Record<string, string>, field: FormField) => ({
          ...acc,
          [field.id]: ""
        }), {});
      setValues(initialValues);
    }
  }, [formId, initialForm.cards]);

  useEffect(() => {
    localStorage.setItem(`form_${formId}`, JSON.stringify(values));
  }, [values, formId]);

  const handleChange = (id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const next = () => {
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
        await submitForm(formId, values, submissionId);
        router.push(`/to/${formId}/thankyou`);
      } catch (err) {
        console.error(err);
        alert("Submission failed.");
      }
    }
    
  };
  

  return (
    <FormContext.Provider value={{
      submissionId,
      values,
      errors,
      currentCardIdx,
      totalCards: initialForm.cards.length,
      direction, // provide direction to consumers
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
