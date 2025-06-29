"use client";

import React, { useState } from "react";

interface FormProps {
  form: {
    id: string;
    cards: {
      id: string;
      title: string;
      fields: {
        id: string;
        label: string;
        type: string;
        options?: string[];
      }[];
    }[];
  };
}

export default function FormClient({ form }: FormProps) {
  const initialValues = form.cards
    .flatMap((card) => card.fields || [])
    .reduce((acc, field) => ({ ...acc, [field.id]: "" }), {});

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (id: string, value: string) => {
    setValues({ ...values, [id]: value });
    setErrors({ ...errors, [id]: "" });
  };

  const handleSubmit = async () => {
    const newErrors: { [key: string]: string } = {};
    for (const fieldId in values) {
      if (!values[fieldId]) {
        newErrors[fieldId] = "This field is required.";
      }
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Submitting:", values);
      try {
        const res = await fetch("/api/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ formId: form.id, values })
        });
        if (!res.ok) {
          throw new Error("Failed to submit form");
        }
        alert("Form submitted successfully!");
      } catch (err) {
        console.error(err);
        alert("Submission failed.");
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="space-y-6"
    >
      {form.cards.map((card) => (
        <div
          key={card.id}
          className="p-6 border border-gray-200 rounded-xl shadow-sm"
        >
          <h2 className="text-xl font-semibold mb-4">{card.title}</h2>
          <div className="space-y-4">
            {card.fields?.map((field) => (
              <div key={field.id}>
                <label className="block text-sm font-medium mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type || "text"}
                  value={values[field.id] || ""}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="w-full border rounded p-2"
                />
                {errors[field.id] && (
                  <p className="text-red-500 text-sm">{errors[field.id]}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        type="submit"
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}
