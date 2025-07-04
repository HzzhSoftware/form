import React from "react";
import { PhoneField } from "@hzzhsoftware/types-form";

export default function PhoneInput({
  field,
  value,
  onChange,
}: {
  field: PhoneField;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <input
      type="tel"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      required={field.required}
      className="w-full border-b p-3"
      placeholder={field.label}
    />
  );
}
