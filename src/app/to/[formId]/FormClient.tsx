"use client";

import React, { Suspense } from "react";
import { Form } from "@hzzhsoftware/types-form";
import { FormProvider } from "./FormContext";
import FormCard from "./components/FormCard";
import FormNavigation from "./components/FormNavigation";
import FormProgressBar from "./components/FormProgressBar";
import FormLoading from './components/FormLoading';

interface FormProps {
  form: Form;
}

export default function FormClient({ form }: FormProps) {

  return (
    <Suspense fallback={<FormLoading message="Loading form..." />}>
      <FormProvider initialForm={form}>
        <FormProgressBar />
        <FormCard />
        <FormNavigation />
      </FormProvider>
    </Suspense>
  );
}