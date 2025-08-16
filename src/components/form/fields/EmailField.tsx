import React from 'react';

// 1. Builder component - for building/editing the form structure
interface EmailFieldBuilderProps {
  field: any;
  onChange?: (value: string) => void;
}

export const EmailFieldBuilder: React.FC<EmailFieldBuilderProps> = ({ 
  field, 
  onChange,
}) => {
  return (
    <input
      type="email"
      onChange={(e) => onChange?.(e.target.value)}
      placeholder="Enter email address"
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
    />
  );
};

// 2. User Input component - for users filling out the form
interface EmailFieldInputProps {
  field: any;
  value: string;
  onChange: (value: string) => void;
}

export const EmailFieldInput: React.FC<EmailFieldInputProps> = ({ 
  field, 
  value,
  onChange,
}) => {
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
};

// 3. Display component - for showing submitted values in responses table
interface EmailFieldDisplayProps {
  field: any;
  value: string;
}

export const EmailFieldDisplay: React.FC<EmailFieldDisplayProps> = ({ 
  field, 
  value 
}) => {
  return (
    <div className="text-sm text-neutral-800">
      {value ? (
        <a href={`mailto:${value}`} className="text-primary-600 hover:text-primary-800 underline">
          {value}
        </a>
      ) : (
        "-"
      )}
    </div>
  );
};

// Default export for backward compatibility (builder)
export default EmailFieldBuilder;
