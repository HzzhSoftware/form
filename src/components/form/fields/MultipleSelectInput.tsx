import React from "react";
import { MultipleSelectField } from "@hzzhsoftware/types-form";

export default function MultipleSelectInput({
  field,
  value,
  onChange,
}: {
  field: MultipleSelectField;
  value: string;
  onChange: (val: string) => void;
}) {
  // Parse the current value as comma-separated string
  const selectedValues = value ? value.split(',').map(v => v.trim()).filter(Boolean) : [];

  const handleToggle = (option: string) => {
    const newSelectedValues = selectedValues.includes(option)
      ? selectedValues.filter(v => v !== option)
      : [...selectedValues, option];
    
    // Convert back to comma-separated string
    onChange(newSelectedValues.join(', '));
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {field.options.map((option) => {
          const isSelected = selectedValues.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => handleToggle(option)}
              className={`
                px-4 py-2 rounded-lg border-2 transition-all duration-200 font-medium
                ${isSelected 
                  ? 'bg-primary-500 text-white border-primary-500 shadow-md' 
                  : 'bg-white text-gray-700 border-gray-300 hover:border-primary-300 hover:bg-primary-50'
                }
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
              `}
            >
              {option}
            </button>
          );
        })}
      </div>
      
      {/* Hidden input for form validation */}
      <input
        type="hidden"
        name={field.id}
        value={value}
        required={field.required}
      />
      
      {/* Show selected count */}
      {selectedValues.length > 0 && (
        <p className="text-sm text-gray-600">
          Selected: {selectedValues.length} of {field.options.length}
        </p>
      )}
    </div>
  );
}
