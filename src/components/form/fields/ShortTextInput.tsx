import React from "react";
import { ShortTextField } from "@hzzhsoftware/types-form";

export default function ShortTextInput({
  field,
  value,
  onChange,
}: {
  field: ShortTextField;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <input
      type="text"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      required={field.isRequired}
      className="w-full border-b p-3"
      placeholder={field.label}
    />
  );
}
