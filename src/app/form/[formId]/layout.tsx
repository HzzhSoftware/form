
import React from "react";
import { getForm } from "@/services/form";
import { FormContextProvider } from "../components/FormContext";
import Header from "./Header";
import Avatar from "@/components/auth/Avatar";

export default async function FormLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ formId: string }>;
}) {
  const { formId } = await params;

  let form = null;
  try {
    form = await getForm({ formId });
  } catch (err) {
    console.error("Failed to load form:", err);
  }

  if (!form) {
    return <div className="text-center text-red-600 text-xl">Form not found</div>;
  }

  return (
    <div className="w-full h-screen">
      <FormContextProvider form={form}>
        <Header form={form}>
          <Avatar />
        </Header>
        {children}
      </FormContextProvider>
    </div>
  );
}
