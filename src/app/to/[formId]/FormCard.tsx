"use client";

import React from "react";
import { useFormContext } from "./FormContext";

export default function FormCard() {
  const {
    values,
    errors,
    handleChange,
    currentCardIdx,
    totalCards,
    next,
    back,
    submit,
    form // we'll add this to the context
  } = useFormContext();

  const isFirst = currentCardIdx === 0;
  const isLast = currentCardIdx === totalCards - 1;

  const card = form.cards[currentCardIdx];

  return (
    <div className="relative w-full max-w-xl p-6 border border-gray-200 rounded-xl shadow-sm bg-white min-h-[400px]">
      <div className="space-y-6">
        {card.fields?.map((field) => (
          <div key={field.id}>
            <label className="block text-sm font-medium mb-1">
              {field.label}
            </label>
            <input
              type={field.type || "text"}
              value={values[field.id] || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
              className="w-full border rounded p-3"
            />
            {errors[field.id] && (
              <p className="text-red-500 text-sm">{errors[field.id]}</p>
            )}
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-between items-center px-6">
        <button
          onClick={back}
          disabled={isFirst}
          className="px-5 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Back
        </button>
        <span className="text-sm text-gray-600">
          Card {currentCardIdx + 1} of {totalCards}
        </span>
        {isLast ? (
          <button
            onClick={submit}
            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={next}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
