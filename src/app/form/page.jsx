import React from "react";
import { listForms } from "@/services/form";
import FormRecord from "./[formId]/components/FormRecord";

export default async function FormPage() {
  let forms = null;
  forms = await listForms(1, 10);

  if (!forms) {
    return <div className="text-center text-red-600 text-xl">No forms found</div>;
  }
  console.log(forms);

  return (
    <div className="min-h-screen flex h-full flex-col items-center">
      <div className="max-w-6xl w-full p-6">
        <h1 className="text-3xl font-bold mb-8">Forms</h1>
        <div className="space-y-4">
          {forms.map((form) => (
            <FormRecord key={form.id} form={form} />
          ))}
        </div>
      </div>
    </div>

  );
}
