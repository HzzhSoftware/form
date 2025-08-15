import React from 'react';

// 1. Builder component - for building/editing the form structure
interface DateFieldBuilderProps {
  field: any;
  setCurrentFieldId: (fieldId: string) => void;
  onChange?: (value: string) => void;
}

export const DateFieldBuilder: React.FC<DateFieldBuilderProps> = ({ 
  field, 
  setCurrentFieldId,
  onChange,
}) => {
  return (
    <input
      type="date"
      onClick={() => setCurrentFieldId(field.id)}
      onChange={(e) => onChange?.(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
    />
  );
};

// 2. User Input component - for users filling out the form
interface DateFieldInputProps {
  field: any;
  value: string;
  onChange: (value: string) => void;
}

export const DateFieldInput: React.FC<DateFieldInputProps> = ({ 
  field, 
  value,
  onChange,
}) => {
  return (
    <input
      type="date"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      required={field.isRequired}
      className="w-full border-b p-3"
      placeholder={field.label}
    />
  );
};

// 3. Display component - for showing submitted values in responses table
interface DateFieldDisplayProps {
  field: any;
  value: string;
}

export const DateFieldDisplay: React.FC<DateFieldDisplayProps> = ({ 
  field, 
  value 
}) => {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="text-sm text-neutral-800">
      {value ? formatDate(value) : "-"}
    </div>
  );
};

// Default export for backward compatibility (builder)
export default DateFieldBuilder;
