import React from "react";
import { LongTextField } from "@hzzhsoftware/types-form";

export default function LongTextInput({
  field,
  value,
  onChange,
}: {
  field: LongTextField;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <textarea
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      required={field.required}
      className="w-full border p-3"
      placeholder={field.label}
    />
  );
}
