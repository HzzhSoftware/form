import React from "react";
import { MultipleChoiceField } from "@hzzhsoftware/types-form";

export default function MultipleChoiceInput({
  field,
  value,
  onChange,
}: {
  field: MultipleChoiceField;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="space-y-2">
      {(field.options).map((opt) => (
        <label key={opt} className="block">
          <input
            type="radio"
            name={field.id}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
            required={field.required}
            className="mr-2"
          />
          {opt}
        </label>
      ))}
    </div>
  );
}
