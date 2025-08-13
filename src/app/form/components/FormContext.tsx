"use client";

import React, { createContext, useContext, useState } from "react";
import { Form } from "@hzzhsoftware/types-form";

type FormContextType = {
  form: Form;
  currentCardId: string;
  setCurrentCardId: (cardId: string) => void;
  setForm: (form: Form) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormContextProvider({ form, children }: { form: Form, children: React.ReactNode }) {
  const [currentCardId, setCurrentCardId] = useState<string>(form.cards[0].id);
  const [formState, setFormState] = useState<Form>(form);

  return (
    <FormContext.Provider value={{ 
      form: formState, 
      currentCardId, 
      setCurrentCardId,
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
