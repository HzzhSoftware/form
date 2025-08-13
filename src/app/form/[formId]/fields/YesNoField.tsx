import React from 'react';

interface YesNoFieldProps {
  field: any;
  setCurrentFieldId: (fieldId: string) => void;
  onChange?: (value: string) => void;
}

const YesNoField: React.FC<YesNoFieldProps> = ({ 
  field, 
  setCurrentFieldId,
  onChange,
}) => {
  return (
    <div className="flex space-x-4" onClick={() => setCurrentFieldId(field.id)}>
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

export default YesNoField;
