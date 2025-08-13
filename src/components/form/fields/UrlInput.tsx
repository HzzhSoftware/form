import React from "react";
import { UrlField } from "@hzzhsoftware/types-form";

export default function UrlInput({
  field,
  value,
  onChange,
}: {
  field: UrlField;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <input
      type="url"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      required={field.isRequired}
      className="w-full border-b p-3"
      placeholder={field.label}
    />
  );
}
