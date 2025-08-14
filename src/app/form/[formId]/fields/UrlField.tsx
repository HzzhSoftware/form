import React from 'react';

// 1. Builder component - for building/editing the form structure
interface UrlFieldBuilderProps {
  field: any;
  setCurrentFieldId: (fieldId: string) => void;
  onChange?: (value: string) => void;
}

export const UrlFieldBuilder: React.FC<UrlFieldBuilderProps> = ({ 
  field, 
  setCurrentFieldId,
  onChange,
}) => {
  return (
    <input
      type="url"
      onClick={() => setCurrentFieldId(field.id)}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder="Enter URL"
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
    />
  );
};

// 2. User Input component - for users filling out the form
interface UrlFieldInputProps {
  field: any;
  value: string;
  onChange: (value: string) => void;
}

export const UrlFieldInput: React.FC<UrlFieldInputProps> = ({ 
  field, 
  value,
  onChange,
}) => {
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
};

// 3. Display component - for showing submitted values in responses table
interface UrlFieldDisplayProps {
  field: any;
  value: string;
}

export const UrlFieldDisplay: React.FC<UrlFieldDisplayProps> = ({ 
  field, 
  value 
}) => {
  return (
    <div className="text-sm text-neutral-800">
      {value ? (
        <a href={value} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-800 underline">
          {value}
        </a>
      ) : (
        "-"
      )}
    </div>
  );
};

// Default export for backward compatibility (builder)
export default UrlFieldBuilder;
