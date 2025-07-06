// app/[customFormId]/page.tsx
import React from "react";
import { getForm } from "@/services/form";
import FormClient from "@/components/form/FormClient";

export async function generateMetadata({ params }) {
  const { customFormId } = params;

  let form = null;
  try {
    form = await getForm(customFormId, true);
  } catch (err) {
    console.error("Failed to load form metadata:", err);
  }

  return {
    title: form?.metadata?.title || "KYX",
    description: form?.metadata?.description || "KYX",
    openGraph: {
      title: form?.metadata?.title || "KYX",
      description: form?.metadata?.description || "KYX",
    },
    images: [form?.metadata?.image || "https://cdn.kycombinator.com/logo.png"],
    // you can add more: openGraph, twitter, etc
  };
}

export default async function FormPage({ params }) {
  const { customFormId } = params;

  let form = null;
  try {
    form = await getForm(customFormId, true);
  } catch (err) {
    console.error("Failed to load form:", err);
  }

  if (!form) {
    return <div className="text-center text-red-600 text-xl">Form not found</div>;
  }

  return <FormClient form={form} />;
}
