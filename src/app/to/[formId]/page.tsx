import React from "react";
import { getForm } from "@/services/form";
import FormClient from "./FormClient";

interface PageProps {
  params: { formId: string };
}

export default async function FormPage({ params }: PageProps) {
  const { formId } = params;

  let form = null;
  try {
    form = await getForm(formId);
  } catch (err) {
    console.error("Failed to load form:", err);
  }

  if (!form) {
    return <div className="text-center text-red-600 text-xl">Form not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <FormClient form={form} />
    </div>
  );
}
