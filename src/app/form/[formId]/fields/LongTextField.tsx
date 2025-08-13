import React from 'react';

interface LongTextFieldProps {
  field: any;
  setCurrentFieldId: (fieldId: string) => void;
  onChange?: (value: string) => void;
}

const LongTextField: React.FC<LongTextFieldProps> = ({ 
  field, 
  setCurrentFieldId, 
  onChange, 
}) => {
  return (
    <textarea
      onClick={() => setCurrentFieldId(field.id)}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={`Enter ${field.label?.toLowerCase() || 'text'}`}
      rows={4}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed resize-vertical"
    />
  );
};

export default LongTextField;
