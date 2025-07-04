import React from "react";
import { DateField } from "@hzzhsoftware/types-form";

export default function DateInput({
  field,
  value,
  onChange,
}: {
  field: DateField;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <input
      type="date"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      required={field.required}
      className="w-full border-b p-3"
    />
  );
}
