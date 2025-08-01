import React from "react";
import { getForm } from "@/services/form";
import { FormContextProvider } from "../components/FormContext";
import Content from "./content";
import Avatar from "@/components/auth/Avatar";

export default async function FormPage({ params }) {
  const { formId } = await params;

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
    <div className="w-full h-screen">
      <FormContextProvider form={form}>
        <Content>
          <Avatar />
        </Content>
      </FormContextProvider>
    </div>
  );
}
