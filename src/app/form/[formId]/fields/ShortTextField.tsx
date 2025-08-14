import React from 'react';

// 1. Builder component - for building/editing the form structure
interface ShortTextFieldBuilderProps {
  field: any;
  setCurrentFieldId: (fieldId: string) => void;
  onChange?: (value: string) => void;
}

export const ShortTextFieldBuilder: React.FC<ShortTextFieldBuilderProps> = ({ 
  field, 
  setCurrentFieldId,
  onChange,
}) => {
  return (
    <input
      type="text"
      onClick={() => setCurrentFieldId(field.id)}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={`Enter ${field.label?.toLowerCase() || 'text'}`}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
    />
  );
};

// 2. User Input component - for users filling out the form
interface ShortTextFieldInputProps {
  field: any;
  value: string;
  onChange: (value: string) => void;
}

export const ShortTextFieldInput: React.FC<ShortTextFieldInputProps> = ({ 
  field, 
  value,
  onChange,
}) => {
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
};

// 3. Display component - for showing submitted values in responses table
interface ShortTextFieldDisplayProps {
  field: any;
  value: string;
}

export const ShortTextFieldDisplay: React.FC<ShortTextFieldDisplayProps> = ({ 
  field, 
  value 
}) => {
  return (
    <div className="text-sm text-neutral-800">
      {value || "-"}
    </div>
  );
};

// Default export for backward compatibility (builder)
export default ShortTextFieldBuilder;
