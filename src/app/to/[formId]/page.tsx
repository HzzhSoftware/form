import React from 'react';
import { getForm } from '@/services/form';
interface PageProps {
  params: { formId: string };
}

export default async function FormPage({ params }: PageProps) {
  const { formId } = params;

  const form = await getForm(formId);

  if (!form) {
    return <div>Form not found</div>;
  }

  return (
    <div>
      <h1>{form.name}</h1>
      <p>{form.description}</p>
      <div>
        {form.cards.map((card) => (
          <div key={card.id}>{card.title}</div>
        ))}
      </div>
    </div>
  );
}
