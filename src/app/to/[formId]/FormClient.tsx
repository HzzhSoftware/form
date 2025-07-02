"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Form } from "@hzzhsoftware/types-form";
import { FormProvider } from "./FormContext";
import FormSubmissionWrapper from "./FormSubmissionWrapper";
import FormCard from "./components/FormCard";
import FormNavigation from "./components/FormNavigation";
import FormProgressBar from "./components/FormProgressBar";
import FormLoading from "./components/FormLoading";

interface FormProps {
  form: Form;
}

export default function FormClient({ form }: FormProps) {

  return (
    <Suspense fallback={<FormLoading message="Loading form..." />}>
      <FormSubmissionWrapper formId={form.id}>
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