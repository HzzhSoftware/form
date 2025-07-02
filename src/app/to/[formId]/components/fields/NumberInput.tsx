import React from "react";
import { NumberField } from "@hzzhsoftware/types-form";

export default function NumberInput({
  field,
  value,
  onChange,
}: {
  field: NumberField;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <input
      type="number"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      required={field.required}
      className="w-full border-b p-3"
      placeholder={field.label}
    />
  );
}
