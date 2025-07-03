import React from "react";
import { listForms } from "@/services/form";
import Link from "next/link";

export default async function FormPage() {
  let forms = null;
  forms = await listForms(1, 10);

  if (!forms) {
    return <div className="text-center text-red-600 text-xl">No forms found</div>;
  }
  console.log(forms);

  return (
    <div>
      <h1>Forms</h1>
      <div>
        {forms.map((form) => (
          <div key={form.id}>
            <Link href={`/form/${form.id}`}>{form.name}</Link>
            <div>{form.description}</div>
            <div>Edit</div>
            <div>Delete</div>
            <div>View Responses</div>

          </div>
        ))}
      </div>
    </div>
  );
}
