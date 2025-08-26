"use client"

import React, { useState, useEffect } from 'react'
import { FormFieldType, FormField } from '@hzzhsoftware/types-form'
import { useFormBuilderContext } from '../components/FormBuilderContext'
import { FieldTypeSelectDropdown } from './FieldTypeSelectorDropdown'

interface FieldSideBarProps {
  field: FormField;
}

const coerceFieldForType = (prev: FormField, newType: FormFieldType): FormField => {
  // preserve common props; reset type-specific safely
  const base = { ...prev, type: newType } as FormField;

  // wipe type-specifics
  delete (base as any).options;
  delete (base as any).min;
  delete (base as any).max;
  delete (base as any).placeholder;

  if (newType === "multiple_choice" || newType === "multiple_select") {
    (base as any).options = (prev as any).options?.length ? (prev as any).options : ["Option 1"];
    // sensible defaults
    (base as any).allowMultiple = newType === "multiple_select";
    (base as any).isRandomized = !!(prev as any).isRandomized;
    (base as any).allowOther = !!(prev as any).allowOther;
    (base as any).isVerticalAlignment = !!(prev as any).isVerticalAlignment;
  }

  if (newType === "number") {
    (base as any).min = (prev as any).min ?? undefined;
    (base as any).max = (prev as any).max ?? undefined;
  }

  if (newType !== "static") {
    (base as any).placeholder = (prev as any).placeholder ?? "";
  }

  return base;
};

const FieldSideBar: React.FC<FieldSideBarProps> = ({ field }) => {
  const { updateLocalForm, currentCardId } = useFormBuilderContext();
  const [localField, setLocalField] = useState<FormField>(field);

  // Update local field when prop changes
  useEffect(() => {
    setLocalField(field);
  }, [field]);

  const updateField = (updates: Partial<FormField>) => {
    const updatedField = { ...localField, ...updates };
    setLocalField(updatedField as FormField);
    
    updateLocalForm(form => ({
      ...form,
      cards: form.cards.map(card =>
        card.id === currentCardId
          ? {
              ...card,
              fields: card.fields.map(f =>
                f.id === field.id ? updatedField : f
              )
            }
          : card
      )
    } as any));
  };

  const renderFieldSpecificOptions = () => {
    switch (localField.type) {
      case 'multiple_choice':
      case 'multiple_select':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-700">Multiple selection</span>
              <button
                onClick={() => updateField({ 
                  allowMultiple: !localField.allowMultiple 
                })}
                className={`w-10 h-6 rounded-full relative transition-colors duration-200 ${
                  localField.allowMultiple ? 'bg-primary-600' : 'bg-neutral-200'
                }`}
              >
                <div 
                  className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
                    localField.allowMultiple ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-700">Randomize options</span>
              <button
                onClick={() => updateField({ 
                  isRandomized: !localField.isRandomized 
                })}
                className={`w-10 h-6 rounded-full relative transition-colors duration-200 ${
                  localField.isRandomized ? 'bg-primary-600' : 'bg-neutral-200'
                }`}
              >
                <div 
                  className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
                    localField.isRandomized ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-700">"Other" option</span>
              <button
                onClick={() => updateField({ 
                  allowOther: !localField.allowOther 
                })}
                className={`w-10 h-6 rounded-full relative transition-colors duration-200 ${
                  localField.allowOther ? 'bg-primary-600' : 'bg-neutral-200'
                }`}
              >
                <div 
                  className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
                    localField.allowOther ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-700">Vertical alignment</span>
              <button
                onClick={() => updateField({ 
                  isVerticalAlignment: !localField.isVerticalAlignment 
                })}
                className={`w-10 h-6 rounded-full relative transition-colors duration-200 ${
                  localField.isVerticalAlignment ? 'bg-primary-600' : 'bg-neutral-200'
                }`}
              >
                <div 
                  className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
                    localField.isVerticalAlignment ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>
            
            {/* Options list - only show for multiple choice/select fields */}
            {localField.type === 'multiple_choice' && 'options' in localField && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-700">Options</span>
                  <button
                    onClick={() => {
                      const currentOptions = localField.options || [];
                      const newOption = `Option ${currentOptions.length + 1}`;
                      updateField({ options: [...currentOptions, newOption] });
                    }}
                    className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                  >
                    + Add Option
                  </button>
                </div>
                
                <div className="space-y-2">
                  {(localField.options || ['Option 1']).map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const currentOptions = localField.options || [];
                          const updatedOptions = [...currentOptions];
                          updatedOptions[index] = e.target.value;
                          updateField({ options: updatedOptions });
                        }}
                        className="flex-1 text-sm px-2 py-1 border border-neutral-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                        placeholder={`Option ${index + 1}`}
                      />
                      {(localField.options || []).length > 1 && (
                        <button
                          onClick={() => {
                            const currentOptions = localField.options || [];
                            const updatedOptions = currentOptions.filter((_, i) => i !== index);
                            updateField({ options: updatedOptions });
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Remove option"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
        
      case 'number':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-neutral-600 mb-1">Min Value</label>
                <input
                  type="number"
                  value={('min' in localField ? localField.min : '') || ''}
                  onChange={(e) => updateField({ 
                    min: e.target.value ? Number(e.target.value) : undefined 
                  })}
                  className="w-full text-sm px-2 py-1 border border-neutral-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                  placeholder="No limit"
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-600 mb-1">Max Value</label>
                <input
                  type="number"
                  value={('max' in localField ? localField.max : '') || ''}
                  onChange={(e) => updateField({ 
                    max: e.target.value ? Number(e.target.value) : undefined 
                  })}
                  className="w-full text-sm px-2 py-1 border border-neutral-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                  placeholder="No limit"
                />
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Field Type Display & Selector */}
      <div>
  <label className="block text-xs text-foreground-600 mb-2">Field Type</label>
  <FieldTypeSelectDropdown
    value={localField.type}
    onChange={(newType) => {
      const next = coerceFieldForType(localField, newType);
      updateField(next);
    }}
  />
</div>

      {/* Question Section */}
      <div>
        <h3 className="text-sm font-medium text-neutral-700 mb-3">Question</h3>
        <input
          type="text"
          value={localField.label || ''}
          onChange={(e) => updateField({ label: e.target.value })}
          className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Enter your question here..."
        />
        
        {localField.type !== 'static' && (
          <input
            type="text"
            value={('placeholder' in localField ? localField.placeholder : '') || ''}
            onChange={(e) => updateField({ placeholder: e.target.value })}
            className="w-full mt-2 px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Placeholder text (optional)"
          />
        )}
      </div>
      
      {/* Field-specific options */}
      {renderFieldSpecificOptions()}
      
      {/* Common Settings */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-neutral-700">Settings</h3>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-700">Required</span>
          <button
            onClick={() => updateField({ isRequired: !localField.isRequired })}
            className={`w-10 h-6 rounded-full relative transition-colors duration-200 ${
              localField.isRequired ? 'bg-primary-600' : 'bg-neutral-200'
            }`}
          >
            <div 
              className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
                localField.isRequired ? 'right-1' : 'left-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FieldSideBar