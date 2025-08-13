import React from 'react';

interface DateFieldProps {
  field: any;
  setCurrentFieldId: (fieldId: string) => void;
  onChange?: (value: string) => void;
}

const DateField: React.FC<DateFieldProps> = ({ 
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

export default DateField;
