import React from 'react';

// 1. Builder component - for building/editing the form structure
interface LongTextFieldBuilderProps {
  field: any;
  onChange?: (value: string) => void;
}

export const LongTextFieldBuilder: React.FC<LongTextFieldBuilderProps> = ({ 
  field, 
  onChange, 
}) => {
  return (
    <textarea
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={`Enter ${field.label?.toLowerCase() || 'text'}`}
      rows={4}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed resize-vertical"
    />
  );
};

// 2. User Input component - for users filling out the form
interface LongTextFieldInputProps {
  field: any;
  value: string;
  onChange: (value: string) => void;
}

export const LongTextFieldInput: React.FC<LongTextFieldInputProps> = ({ 
  field, 
  value,
  onChange,
}) => {
  return (
    <textarea
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      required={field.isRequired}
      className="w-full border p-3"
      placeholder={field.label}
      rows={4}
    />
  );
};

// 3. Display component - for showing submitted values in responses table
interface LongTextFieldDisplayProps {
  field: any;
  value: string;
}

export const LongTextFieldDisplay: React.FC<LongTextFieldDisplayProps> = ({ 
  field, 
  value 
}) => {
  return (
    <div className="text-sm text-neutral-800 max-w-xs">
      <div className="break-words">
        {value || "-"}
      </div>
    </div>
  );
};

// Default export for backward compatibility (builder)
export default LongTextFieldBuilder;
