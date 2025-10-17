import React from "react";
import { FormField } from "@hzzhsoftware/types-form";
import { ShortTextFieldInput } from "./ShortTextField";
import { LongTextFieldInput } from "./LongTextField";
import { EmailFieldInput } from "./EmailField";
import { PhoneFieldInput } from "./PhoneField";
import { NumberFieldInput } from "./NumberField";
import { UrlFieldInput } from "./UrlField";
import { DateFieldInput } from "./DateField";
import { TimestampFieldInput } from "./TimestampField";
import { YesNoFieldInput } from "./YesNoField";
import { MultipleChoiceFieldInput } from "./MultipleChoiceField";
import { MultipleSelectFieldInput } from "./MultipleSelectField";
import { StaticFieldInput } from "./StaticField";

export default function FieldInput({
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
      return <ShortTextFieldInput field={field} value={value} onChange={onChange} />;
    case "long_text":
      return <LongTextFieldInput field={field} value={value} onChange={onChange} />;
    case "email":
      return <EmailFieldInput field={field} value={value} onChange={onChange} />;
    case "phone":
      return <PhoneFieldInput field={field} value={value} onChange={onChange} />;
    case "number":
      return <NumberFieldInput field={field} value={value} onChange={onChange} />;
    case "url":
      return <UrlFieldInput field={field} value={value} onChange={onChange} />;
    case "date":
      return <DateFieldInput field={field} value={value} onChange={onChange} />;
    case "timestamp":
      return <TimestampFieldInput field={field} value={value} onChange={onChange} />;
    case "yes_no":
      return <YesNoFieldInput field={field} value={value} onChange={onChange} />;
    case "multiple_choice":
      return <MultipleChoiceFieldInput field={field} value={value} onChange={onChange} />;
    case "multiple_select":
      return <MultipleSelectFieldInput field={field} value={value} onChange={onChange} />;
    case "static":
      return <StaticFieldInput field={field}/>;
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
