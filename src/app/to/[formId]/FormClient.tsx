"use client";

import React from "react";
import { Form } from "@hzzhsoftware/types-form";
import { FormProvider } from "./FormContext";
import FormCard from "./FormCard"; // new orchestrator component

interface FormProps {
  form: Form;
}

export default function FormClient({ form }: FormProps) {
  return (
    <FormProvider initialForm={form}>
      <h1 className="text-3xl font-bold mb-2">{form.name}</h1>
      <p className="text-gray-600 mb-6">{form.description}</p>
      <FormCard/>
    </FormProvider>
  );
}