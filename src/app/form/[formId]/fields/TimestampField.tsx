import React from 'react';

// 1. Builder component - for building/editing the form structure
interface TimestampFieldBuilderProps {
  field: any;
  setCurrentFieldId: (fieldId: string) => void;
  onChange?: (value: string) => void;
}

export const TimestampFieldBuilder: React.FC<TimestampFieldBuilderProps> = ({ 
  field, 
  setCurrentFieldId,
  onChange,
}) => {
  return (
    <input
      type="datetime-local"
      onClick={() => setCurrentFieldId(field.id)}
      onChange={(e) => onChange?.(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
    />
  );
};

// 2. User Input component - for users filling out the form
interface TimestampFieldInputProps {
  field: any;
  value: string;
  onChange: (value: string) => void;
}

export const TimestampFieldInput: React.FC<TimestampFieldInputProps> = ({ 
  field, 
  value,
  onChange,
}) => {
  // Convert ISO timestamp to datetime-local format
  const formatForInput = (isoString: string) => {
    if (!isoString) return "";
    try {
      const date = new Date(isoString);
      if (isNaN(date.getTime())) return "";
      
      // Format as YYYY-MM-DDTHH:mm
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    } catch {
      return "";
    }
  };

  return (
    <input
      type="datetime-local"
      value={formatForInput(value)}
      onChange={(e) => onChange(e.target.value)}
      required={field.isRequired}
      className="w-full border-b p-3"
      placeholder={field.label}
    />
  );
};

// 3. Display component - for showing submitted values in responses table
interface TimestampFieldDisplayProps {
  field: any;
  value: string;
}

export const TimestampFieldDisplay: React.FC<TimestampFieldDisplayProps> = ({ 
  field, 
  value 
}) => {
  const formatTimestamp = (timestampString: string) => {
    try {
      const date = new Date(timestampString);
      if (isNaN(date.getTime())) return timestampString;
      
      return date.toLocaleString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch {
      return timestampString;
    }
  };

  return (
    <div className="text-sm text-neutral-800">
      {value ? formatTimestamp(value) : "-"}
    </div>
  );
};

// Default export for backward compatibility (builder)
export default TimestampFieldBuilder;
