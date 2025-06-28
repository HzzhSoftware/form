// app/(form)/[formId]/page.tsx
import React from "react";
import { getForm } from "@/services/form";

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
    <>
      <h1 className="text-3xl font-bold mb-2">{form.name}</h1>
      <p className="text-gray-600 mb-6">{form.description}</p>

      <div className="space-y-4">
        {form.cards.map((card) => (
          <div
            key={card.id}
            className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">{card.title}</h2>
          </div>
        ))}
      </div>
    </>
  );
}
