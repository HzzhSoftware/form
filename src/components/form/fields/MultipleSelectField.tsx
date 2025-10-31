import React from 'react';

// 1. Builder component - for building/editing the form structure
interface MultipleSelectFieldBuilderProps {
  field: any;
  onChange?: (value: string) => void;
  onOptionsChange?: (options: string[]) => void;
}

export const MultipleSelectFieldBuilder: React.FC<MultipleSelectFieldBuilderProps> = ({ 
  field, 
  onChange,
  onOptionsChange,
}) => {
  const handleAddOption = () => {
    if (onOptionsChange && 'options' in field) {
      const newOptions = [...(field.options || []), `Option ${(field.options?.length || 0) + 1}`];
      onOptionsChange(newOptions);
    }
  };

  const handleDeleteOption = (index: number) => {
    if (onOptionsChange && 'options' in field) {
      // Prevent deleting the last option since schema requires at least 1
      if (field.options.length <= 1) return;
      const newOptions = field.options.filter((_: string, i: number) => i !== index);
      onOptionsChange(newOptions);
    }
  };

  const handleOptionChange = (index: number, newValue: string) => {
    if (onOptionsChange && 'options' in field) {
      const newOptions = [...field.options];
      newOptions[index] = newValue;
      onOptionsChange(newOptions);
    }
  };

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium text-neutral-700 mb-2">Options:</div>
      
      {'options' in field && field.options?.map((option: string, index: number) => (
        <div key={index} className="flex items-center space-x-2">
          <input
            type="checkbox"
            value={option}
            className="text-primary-600 focus:ring-primary-500 disabled:cursor-not-allowed"
            disabled
          />
          <input
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className="flex-1 px-2 py-1 text-sm border border-neutral-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Option text"
          />
          <button
            onClick={() => handleDeleteOption(index)}
            disabled={field.options.length <= 1}
            className={`p-1 rounded transition-colors ${
              field.options.length <= 1 
                ? 'text-neutral-300 cursor-not-allowed' 
                : 'text-red-500 hover:text-red-700 hover:bg-red-50'
            }`}
            title={field.options.length <= 1 ? "Cannot delete last option" : "Delete option"}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
      
      <button
        onClick={handleAddOption}
        className="w-full px-3 py-2 text-sm border-2 border-dashed rounded-md transition-colors flex items-center justify-center space-x-2 border-neutral-300 text-neutral-600 hover:border-primary-400 hover:text-primary-600"
        title="Add Option"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span>Add Option</span>
      </button>
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
