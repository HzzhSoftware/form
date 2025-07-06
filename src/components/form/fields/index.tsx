import React from "react";
import { FormField } from "@hzzhsoftware/types-form";
import ShortTextInput from "./ShortTextInput";
import LongTextInput from "./LongTextInput";
import MultipleChoiceInput from "./MultipleChoiceInput";
import MultipleSelectInput from "./MultipleSelectInput";
import YesNoInput from "./YesNoInput";
import EmailInput from "./EmailInput";
import PhoneInput from "./PhoneInput";
import DateInput from "./DateInput";
import NumberInput from "./NumberInput";
import UrlInput from "./UrlInput";

// named exports for direct use
export {
  ShortTextInput,
  LongTextInput,
  MultipleChoiceInput,
  MultipleSelectInput,
  YesNoInput,
  EmailInput,
  PhoneInput,
  DateInput,
  NumberInput,
  UrlInput,
};

export default function Field({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: string;
  onChange: (val: string) => void;
}) {
  switch (field.type) {
    case "short_text":
      return <ShortTextInput field={field} value={value} onChange={onChange} />;
    case "long_text":
      return <LongTextInput field={field} value={value} onChange={onChange} />;
    case "multiple_choice":
      return <MultipleChoiceInput field={field} value={value} onChange={onChange} />;
    case "multiple_select":
      return <MultipleSelectInput field={field} value={value} onChange={onChange} />;
    case "yes_no":
      return <YesNoInput field={field} value={value} onChange={onChange} />;
    case "email":
      return <EmailInput field={field} value={value} onChange={onChange} />;
    case "phone":
      return <PhoneInput field={field} value={value} onChange={onChange} />;
    case "date":
      return <DateInput field={field} value={value} onChange={onChange} />;
    case "number":
      return <NumberInput field={field} value={value} onChange={onChange} />;
    case "url":
      return <UrlInput field={field} value={value} onChange={onChange} />;
    default:
      return (
        <input
          type="text"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border-b p-3"
        />
      );
  }
}
