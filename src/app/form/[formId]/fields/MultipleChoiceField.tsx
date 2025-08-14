import React from 'react';

// 1. Builder component - for building/editing the form structure
interface MultipleChoiceFieldBuilderProps {
  field: any;
  setCurrentFieldId: (fieldId: string) => void;
  onChange?: (value: string) => void;
}

export const MultipleChoiceFieldBuilder: React.FC<MultipleChoiceFieldBuilderProps> = ({ 
  field, 
  setCurrentFieldId, 
  onChange, 
}) => {
  return (
    <div className="space-y-2" onClick={() => setCurrentFieldId(field.id)}>
      {'options' in field && field.options?.map((option: string, index: number) => (
        <label key={index} className="flex items-center">
          <input
            type="radio"
            name={`field-${field.id}`}
            value={option}
            onChange={(e) => onChange?.(e.target.value)}
            className="mr-2 text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed"
          />
          {option}
        </label>
      ))}
    </div>
  );
};

// 2. User Input component - for users filling out the form
interface MultipleChoiceFieldInputProps {
  field: any;
  value: string;
  onChange: (value: string) => void;
}

export const MultipleChoiceFieldInput: React.FC<MultipleChoiceFieldInputProps> = ({ 
  field, 
  value,
  onChange,
}) => {
  return (
    <div className="space-y-2">
      {'options' in field && field.options?.map((option: string, index: number) => (
        <label key={index} className="flex items-center">
          <input
            type="radio"
            name={`field-${field.id}`}
            value={option}
            checked={value === option}
            onChange={(e) => onChange(e.target.value)}
            required={field.isRequired}
            className="mr-2 text-primary-600 focus:ring-primary-500"
          />
          {option}
        </label>
      ))}
    </div>
  );
};

// 3. Display component - for showing submitted values in responses table
interface MultipleChoiceFieldDisplayProps {
  field: any;
  value: string;
}

export const MultipleChoiceFieldDisplay: React.FC<MultipleChoiceFieldDisplayProps> = ({ 
  field, 
  value 
}) => {
  return (
    <div className="text-sm text-neutral-800">
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        {value || "-"}
      </span>
    </div>
  );
};

// Default export for backward compatibility (builder)
export default MultipleChoiceFieldBuilder;
