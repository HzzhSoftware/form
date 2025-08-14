import React from 'react';

// 1. Builder component - for building/editing the form structure
interface MultipleSelectFieldBuilderProps {
  field: any;
  setCurrentFieldId: (fieldId: string) => void;
  onChange?: (value: string) => void;
}

export const MultipleSelectFieldBuilder: React.FC<MultipleSelectFieldBuilderProps> = ({ 
  field, 
  setCurrentFieldId,
  onChange,
}) => {
  return (
    <div className="space-y-2" onClick={() => setCurrentFieldId(field.id)}>
      {'options' in field && field.options?.map((option: string, index: number) => (
        <label key={index} className="flex items-center">
          <input
            type="checkbox"
            value={option}
            className="mr-2 text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed"
          />
          {option}
        </label>
      ))}
    </div>
  );
};

// 2. User Input component - for users filling out the form
interface MultipleSelectFieldInputProps {
  field: any;
  value: string;
  onChange: (value: string) => void;
}

export const MultipleSelectFieldInput: React.FC<MultipleSelectFieldInputProps> = ({ 
  field, 
  value,
  onChange,
}) => {
  const values = value ? value.split(',').map(v => v.trim()) : [];

  const handleOptionChange = (option: string, checked: boolean) => {
    if (checked) {
      const newValues = [...values, option];
      onChange(newValues.join(', '));
    } else {
      const newValues = values.filter(v => v !== option);
      onChange(newValues.join(', '));
    }
  };

  return (
    <div className="space-y-2">
      {'options' in field && field.options?.map((option: string, index: number) => (
        <label key={index} className="flex items-center">
          <input
            type="checkbox"
            value={option}
            checked={values.includes(option)}
            onChange={(e) => handleOptionChange(option, e.target.checked)}
            required={field.isRequired && values.length === 0}
            className="mr-2 text-primary-600 focus:ring-primary-500"
          />
          {option}
        </label>
      ))}
    </div>
  );
};

// 3. Display component - for showing submitted values in responses table
interface MultipleSelectFieldDisplayProps {
  field: any;
  value: string;
}

export const MultipleSelectFieldDisplay: React.FC<MultipleSelectFieldDisplayProps> = ({ 
  field, 
  value 
}) => {
  const values = value ? value.split(',').map(v => v.trim()) : [];

  return (
    <div className="text-sm text-neutral-800">
      {values.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {values.map((val, index) => (
            <span key={index} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              {val}
            </span>
          ))}
        </div>
      ) : (
        "-"
      )}
    </div>
  );
};

// Default export for backward compatibility (builder)
export default MultipleSelectFieldBuilder;
