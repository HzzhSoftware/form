import React from "react";
import { EmailField } from "@hzzhsoftware/types-form";

export default function EmailInput({
  field,
  value,
  onChange,
}: {
  field: EmailField;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <input
      type="email"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      required={field.isRequired}
      className="w-full border-b p-3"
      placeholder={field.label}
    />
  );
}
