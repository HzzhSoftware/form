import React from "react";
import Content from "./content";
import { getForm } from "@/services/form";

export async function generateMetadata({ params }) {
  const { formId } = await params;

  let form = null;
  try {
    form = await getForm({ formId });
  } catch (err) {
    console.error("Failed to load form metadata:", err);
  }

  return {
    title: form?.ogMetadata?.title || "KYX",
    description: form?.ogMetadata?.description || "KYX",
    openGraph: {
      title: form?.ogMetadata?.title || "KYX",
      description: form?.ogMetadata?.description || "KYX",
      images: [form?.ogMetadata?.image || "https://cdn.kycombinator.com/favicon.ico"],
    },
  };
}
export default function FormPage() {
  return (
    <Content />
  );
}
