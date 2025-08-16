"use client";

import React, { createContext, useContext, useState } from "react";
import { Form } from "@hzzhsoftware/types-form";

type FormContextType = {
  form: Form;
  currentCardId: string;
  currentFieldId: string | null;
  setCurrentCardId: (cardId: string) => void;
  setCurrentFieldId: (fieldId: string | null) => void;
  setForm: (form: Form) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormContextProvider({ form, children }: { form: Form, children: React.ReactNode }) {
  const [currentCardId, setCurrentCardId] = useState<string>(form.cards[0].id);
  const [currentFieldId, setCurrentFieldId] = useState<string | null>(null);
  const [formState, setFormState] = useState<Form>(form);

  return (
    <FormContext.Provider value={{ 
      form: formState, 
      currentCardId, 
      currentFieldId,
      setCurrentCardId,
      setCurrentFieldId,
      setForm: setFormState
    }}>
      {children}
    </FormContext.Provider>
  )
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormContextProvider");
  }
  return context;
}
