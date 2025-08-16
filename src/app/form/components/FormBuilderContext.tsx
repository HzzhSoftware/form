"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Form } from "@hzzhsoftware/types-form";
import { updateForm } from "@/services/form";

type FormBuilderContextType = {
  form: Form;
  localForm: Form;
  currentCardId: string;
  currentFieldId: string | null;
  hasChanges: boolean;
  isSaving: boolean;
  setCurrentCardId: (cardId: string) => void;
  setCurrentFieldId: (fieldId: string | null) => void;
  setForm: (form: Form) => void;
  updateLocalForm: (updater: (form: Form) => Form) => void;
  saveForm: () => Promise<void>;
}

const FormBuilderContext = createContext<FormBuilderContextType | undefined>(undefined);

export function FormBuilderContextProvider({ form, children }: { form: Form, children: React.ReactNode }) {
  const [currentCardId, setCurrentCardId] = useState<string>(form.cards[0].id);
  const [currentFieldId, setCurrentFieldId] = useState<string | null>(null);
  const [savedFormState, setSavedFormState] = useState<Form>(form);
  const [localForm, setLocalForm] = useState<Form>(form);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Track changes by comparing current form with local state
  useEffect(() => {
    // More reliable change detection using reference comparison and specific property checks
    const hasFormChanges = 
      savedFormState.cards.length !== localForm.cards.length ||
      savedFormState.status !== localForm.status ||
      savedFormState.name !== localForm.name ||
      savedFormState.description !== localForm.description ||
      savedFormState.cards.some((card, index) => {
        const localCard = localForm.cards[index];
        if (!localCard) return true;
        
        return (
          card.id !== localCard.id ||
          card.title !== localCard.title ||
          card.description !== localCard.description ||
          card.fields.length !== localCard.fields.length ||
          card.fields.some((field, fieldIndex) => {
            const localField = localCard.fields[fieldIndex];
            if (!localField) return true;
            
            return (
              field.id !== localField.id ||
              field.label !== localField.label ||
              field.type !== localField.type ||
              field.isRequired !== localField.isRequired ||
              field.description !== localField.description
            );
          })
        );
      });
    
    setHasChanges(hasFormChanges);
  }, [savedFormState, localForm]);

  // Update local form state
  const updateLocalForm = (updater: (form: Form) => Form) => {
    setLocalForm(updater);
  };

  // Save form to API
  const saveForm = async () => {
    if (!hasChanges || isSaving) return;
    
    setIsSaving(true);
    try {
      
      await updateForm({ formId: localForm.id }, localForm);
      console.log('Saving form:', localForm);
      
      // Update both context and local state with the saved form data
      setSavedFormState(localForm);
      setLocalForm(localForm);
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving form:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Auto-save functionality
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (hasChanges) {
      // Set a timer to save after 1 second of no changes
      timeoutId = setTimeout(() => {
        saveForm();
      }, 1000);
    }
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [localForm, hasChanges, saveForm]);

  return (
    <FormBuilderContext.Provider value={{ 
      form: savedFormState, 
      localForm,
      currentCardId, 
      currentFieldId,
      hasChanges,
      isSaving,
      setCurrentCardId,
      setCurrentFieldId,
      setForm: setSavedFormState,
      updateLocalForm,
      saveForm
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
