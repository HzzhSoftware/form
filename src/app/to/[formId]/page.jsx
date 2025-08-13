import React from "react";
import { getForm } from "@/services/form";
import FormClient from "@/components/form/FormClient";

export async function generateMetadata({ params }) {
  const { formId } = await params;

  let form = null;
  try {
    form = await getForm(formId, true);
  } catch (err) {
    console.error("Failed to load form metadata:", err);
  }

  return {
    title: form.ogMetadata?.title || "KYX",
    description: form.ogMetadata?.description || "KYX",
    openGraph: {
      title: form.ogMetadata?.title || "KYX",
      description: form.ogMetadata?.description || "KYX",
      images: [form.ogMetadata?.image || "https://cdn.kycombinator.com/favicon.ico"],
    },
  };
}
export default async function FormPage({ params }) {
  const { formId } = await params;

  let form = null;
  try {
    form = await getForm(formId, false);
  } catch (err) {
    console.error("Failed to load form:", err);
  }

  if (!form) {
    return <div className="text-center text-red-600 text-xl">Form not found</div>;
  }

  return (
    <FormClient form={form} />
  );
}
