import React from "react";
import { FormField } from "@hzzhsoftware/types-form";
import { ShortTextFieldDisplay } from "./ShortTextField";
import { LongTextFieldDisplay } from "./LongTextField";
import { EmailFieldDisplay } from "./EmailField";
import { PhoneFieldDisplay } from "./PhoneField";
import { NumberFieldDisplay } from "./NumberField";
import { UrlFieldDisplay } from "./UrlField";
import { DateFieldDisplay } from "./DateField";
import { TimestampFieldDisplay } from "./TimestampField";
import { YesNoFieldDisplay } from "./YesNoField";
import { MultipleChoiceFieldDisplay } from "./MultipleChoiceField";
import { MultipleSelectFieldDisplay } from "./MultipleSelectField";

export default function FieldDisplay({
  field,
  value,
}: {
  field: FormField;
  value: string;
}) {
  switch (field.type) {
    case "short_text":
      return <ShortTextFieldDisplay field={field} value={value} />;
    case "long_text":
      return <LongTextFieldDisplay field={field} value={value} />;
    case "email":
      return <EmailFieldDisplay field={field} value={value} />;
    case "phone":
      return <PhoneFieldDisplay field={field} value={value} />;
    case "number":
      return <NumberFieldDisplay field={field} value={value} />;
    case "url":
      return <UrlFieldDisplay field={field} value={value} />;
    case "date":
      return <DateFieldDisplay field={field} value={value} />;
    case "timestamp":
      return <TimestampFieldDisplay field={field} value={value} />;
    case "yes_no":
      return <YesNoFieldDisplay field={field} value={value} />;
    case "multiple_choice":
      return <MultipleChoiceFieldDisplay field={field} value={value} />;
    case "multiple_select":
      return <MultipleSelectFieldDisplay field={field} value={value} />;
    default:
      return (
        <div className="text-sm text-neutral-800">
          {value || "-"}
        </div>
      );
  }
}
