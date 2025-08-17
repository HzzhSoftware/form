import React from 'react';
import { FormFieldType } from '@hzzhsoftware/types-form';

interface FieldTypeSelectorProps {
  onAddField: (fieldType: FormFieldType) => void;
}

const FieldTypeSelector: React.FC<FieldTypeSelectorProps> = ({ onAddField }) => {
  const fieldTypes = [
    { type: 'short_text' as FormFieldType, label: 'Short Text', icon: 'T', description: 'Single line text input' },
    { type: 'long_text' as FormFieldType, label: 'Long Text', icon: '¶', description: 'Multi-line text area' },
    { type: 'email' as FormFieldType, label: 'Email', icon: '@', description: 'Email address input' },
    { type: 'phone' as FormFieldType, label: 'Phone', icon: '📞', description: 'Phone number input' },
    { type: 'number' as FormFieldType, label: 'Number', icon: '#', description: 'Numeric input' },
    { type: 'url' as FormFieldType, label: 'URL', icon: '🔗', description: 'Website URL input' },
    { type: 'date' as FormFieldType, label: 'Date', icon: '📅', description: 'Date picker' },
    { type: 'yes_no' as FormFieldType, label: 'Yes/No', icon: '✓', description: 'Boolean choice' },
    { type: 'multiple_choice' as FormFieldType, label: 'Multiple Choice', icon: '○', description: 'Single selection from options', options: ['Yes', 'No'] },
    { type: 'multiple_select' as FormFieldType, label: 'Multiple Select', icon: '☑', description: 'Multiple selections from options' },
    { type: 'static' as FormFieldType, label: 'Static Content', icon: '📄', description: 'Display text, images, or other content' }
  ];

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium text-neutral-700 mb-2">Add Field Type:</div>
      <div className="flex flex-wrap gap-2">
        {fieldTypes.map((fieldType) => (
          <button
            key={fieldType.type}
            onClick={() => onAddField(fieldType.type)}
            className="flex items-center space-x-2 px-3 py-2 rounded-md border border-neutral-300 hover:border-primary-400 hover:bg-primary-50 transition-all duration-200 group"
            title={fieldType.description}
          >
            <div className="w-5 h-5 rounded-full bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center group-hover:bg-primary-200 transition-colors">
              {fieldType.icon}
            </div>
            <span className="text-xs text-neutral-600 group-hover:text-primary-700 transition-colors whitespace-nowrap">
              {fieldType.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FieldTypeSelector;
