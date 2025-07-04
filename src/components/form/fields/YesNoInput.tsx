import React from "react";
import { YesNoField } from "@hzzhsoftware/types-form";

export default function YesNoInput({
  field,
  value,
  onChange,
}: {
  field: YesNoField;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="flex space-x-4">
      {["Yes", "No"].map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`px-4 py-2 border rounded ${value === opt ? "bg-gray-200" : ""}`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
