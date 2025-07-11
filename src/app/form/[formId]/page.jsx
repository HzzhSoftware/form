import React from "react";
import { getForm } from "@/services/form";
import LeftSidebar from "./components/LeftSideBar";
import RightSidebar from "./components/RightSideBar";
import CardCenter from "./components/CardCenter";
import { FormContextProvider } from "./components/FormContext";

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
    <div className="flex min-h-screen">
      <FormContextProvider form={form}>
        <LeftSidebar />
        <CardCenter />
        <RightSidebar />
      </FormContextProvider>
    </div>
  );
}
