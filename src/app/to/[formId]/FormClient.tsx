"use client";

import React from "react";
import { Form } from "@hzzhsoftware/types-form";
import { FormProvider } from "./FormContext";
import FormCard from "./FormCard"; // new orchestrator component
import FormNavigation from "./components/FormNavigation";

interface FormProps {
  form: Form;
}

export default function FormClient({ form }: FormProps) {
  return (
    <FormProvider initialForm={form}>
      <FormCard/>
      <FormNavigation />
    </FormProvider>
  );
}