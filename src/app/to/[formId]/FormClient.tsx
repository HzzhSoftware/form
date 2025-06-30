"use client";

import React from "react";
import { Form } from "@hzzhsoftware/types-form";
import { FormProvider } from "./FormContext";
import FormCard from "./components/FormCard"; // new orchestrator component
import FormNavigation from "./components/FormNavigation";
import FormProgressBar from "./components/FormProgressBar";

interface FormProps {
  form: Form;
}

export default function FormClient({ form }: FormProps) {
  return (
    <FormProvider initialForm={form}>
      <FormProgressBar />
      <FormCard/>
      <FormNavigation />
    </FormProvider>
  );
}