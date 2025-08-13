import React from 'react';

interface MultipleSelectFieldProps {
  field: any;
  setCurrentFieldId: (fieldId: string) => void;
  onChange?: (value: string) => void;
}

const MultipleSelectField: React.FC<MultipleSelectFieldProps> = ({ 
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

export default MultipleSelectField;
