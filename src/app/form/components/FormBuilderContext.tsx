"use client";

import React, { createContext, useContext, useState } from "react";
import { Form } from "@hzzhsoftware/types-form";

type FormBuilderContextType = {
  form: Form;
  currentCardId: string;
  currentFieldId: string | null;
  setCurrentCardId: (cardId: string) => void;
  setCurrentFieldId: (fieldId: string | null) => void;
  setForm: (form: Form) => void;
}

const FormBuilderContext = createContext<FormBuilderContextType | undefined>(undefined);

export function FormBuilderContextProvider({ form, children }: { form: Form, children: React.ReactNode }) {
  const [currentCardId, setCurrentCardId] = useState<string>(form.cards[0].id);
  const [currentFieldId, setCurrentFieldId] = useState<string | null>(null);
  const [formState, setFormState] = useState<Form>(form);

  return (
    <FormBuilderContext.Provider value={{ 
      form: formState, 
      currentCardId, 
      currentFieldId,
      setCurrentCardId,
      setCurrentFieldId,
      setForm: setFormState
    }}>
      {children}
    </FormBuilderContext.Provider>
  )
}

export function useFormBuilderContext() {
  const context = useContext(FormBuilderContext);
  if (!context) {
    throw new Error("useFormBuilderContext must be used within a FormBuilderContextProvider");
  }
  return context;
}
