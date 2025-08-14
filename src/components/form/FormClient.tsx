"use client";

import React, { Suspense } from "react";
import { Form } from "@hzzhsoftware/types-form";
import { FormProvider } from "./FormContext";
import FormSubmissionWrapper from "./FormSubmissionWrapper";
import FormCard from "./FormCard";
import FormNavigation from "./FormNavigation";
import FormProgressBar from "./FormProgressBar";
import FormLoading from "./FormLoading";

interface FormProps {
  form: Form;
}

export default function FormClient({ form }: FormProps) {

  return (
    <Suspense fallback={<FormLoading message="Loading form..." />}>
      <FormSubmissionWrapper form={form}>
        {(submissionId, savedValues) => (
          <FormProvider 
            initialForm={form} 
            submissionId={submissionId}
            initialValues={savedValues as Record<string, string>}
          >
            <FormProgressBar />
            <FormCard />
            <FormNavigation />
          </FormProvider>
        )}
      </FormSubmissionWrapper>
    </Suspense>
  );
}