import React from 'react';

// 1. Builder component - for building/editing the form structure
interface YesNoFieldBuilderProps {
  field: any;
  onChange?: (value: string) => void;
}

export const YesNoFieldBuilder: React.FC<YesNoFieldBuilderProps> = ({ 
  field, 
  onChange,
}) => {
  return (
    <div className="flex space-x-4">
      <label className="flex items-center">
        <input
          type="radio"
          name={`field-${field.id}`}
          value="yes"
          onChange={(e) => onChange?.(e.target.value)}
          className="mr-2 text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed"
        />
        Yes
      </label>
      <label className="flex items-center">
        <input
          type="radio"
          name={`field-${field.id}`}
          value="no"
          onChange={(e) => onChange?.(e.target.value)}
          className="mr-2 text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed"
        />
        No
      </label>
    </div>
  );
};

// 2. User Input component - for users filling out the form
interface YesNoFieldInputProps {
  field: any;
  value: string;
  onChange: (value: string) => void;
}

export const YesNoFieldInput: React.FC<YesNoFieldInputProps> = ({ 
  field, 
  value,
  onChange,
}) => {
  return (
    <div className="flex space-x-4">
      <label className="flex items-center">
        <input
          type="radio"
          name={`field-${field.id}`}
          value="yes"
          checked={value === "yes"}
          onChange={(e) => onChange(e.target.value)}
          required={field.isRequired}
          className="mr-2 text-primary-600 focus:ring-primary-500"
        />
        Yes
      </label>
      <label className="flex items-center">
        <input
          type="radio"
          name={`field-${field.id}`}
          value="no"
          checked={value === "no"}
          onChange={(e) => onChange(e.target.value)}
          required={field.isRequired}
          className="mr-2 text-primary-600 focus:ring-primary-500"
        />
        No
      </label>
    </div>
  );
};

// 3. Display component - for showing submitted values in responses table
interface YesNoFieldDisplayProps {
  field: any;
  value: string;
}

export const YesNoFieldDisplay: React.FC<YesNoFieldDisplayProps> = ({ 
  field, 
  value 
}) => {
  const getDisplayValue = (val: string) => {
    if (!val) return "-";
    const lowerVal = val.toLowerCase();
    if (lowerVal === "yes" || lowerVal === "true" || lowerVal === "1") {
      return "Yes";
    } else if (lowerVal === "no" || lowerVal === "false" || lowerVal === "0") {
      return "No";
    }
    return val;
  };

  return (
    <div className="text-sm text-neutral-800">
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        getDisplayValue(value) === "Yes" 
          ? "bg-green-100 text-green-800" 
          : getDisplayValue(value) === "No"
          ? "bg-red-100 text-red-800"
          : "bg-neutral-100 text-neutral-800"
      }`}>
        {getDisplayValue(value)}
      </span>
    </div>
  );
};

// Default export for backward compatibility (builder)
export default YesNoFieldBuilder;
