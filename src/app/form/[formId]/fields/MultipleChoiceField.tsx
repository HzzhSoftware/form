import React from 'react';

interface MultipleChoiceFieldProps {
  field: any;
  setCurrentFieldId: (fieldId: string) => void;
  onChange?: (value: string) => void;
}

const MultipleChoiceField: React.FC<MultipleChoiceFieldProps> = ({ 
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

export default MultipleChoiceField;
