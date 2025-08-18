import React from 'react';
import { FormField } from '@hzzhsoftware/types-form';
import {
  ShortTextField,
  LongTextField,
  EmailField,
  PhoneField,
  NumberField,
  UrlField,
  DateField,
  YesNoField,
  MultipleChoiceField,
  MultipleSelectField,
  StaticField
} from './index';

interface FieldConstructorProps {
  field: FormField;
  onChange?: (value: string) => void;
  onOptionsChange?: (options: string[]) => void;
  onFieldUpdate?: (updates: Partial<any>) => void;
  onLabelChange?: (label: string) => void;
}

const FieldConstructor: React.FC<FieldConstructorProps> = ({ 
  field, 
  onChange, 
  onOptionsChange,
  onFieldUpdate,
  onLabelChange,
}) => {
  const renderField = () => {
    switch (field.type) {
      case 'short_text':
        return <ShortTextField field={field} onChange={onChange} />;
      
      case 'long_text':
        return <LongTextField field={field} onChange={onChange} />;
      
      case 'email':
        return <EmailField field={field} onChange={onChange} />;
      
      case 'phone':
        return <PhoneField field={field} onChange={onChange} />;
      
      case 'number':
        return <NumberField field={field} onChange={onChange} />;
      
      case 'url':
        return <UrlField field={field} onChange={onChange} />;
      
      case 'date':
        return <DateField field={field} onChange={onChange} />;
      
      case 'yes_no':
        return <YesNoField field={field} onChange={onChange} />;
      
      case 'multiple_choice':
        return <MultipleChoiceField field={field} onChange={onChange} onOptionsChange={onOptionsChange} />;
      
      case 'multiple_select':
        return <MultipleSelectField field={field} onChange={onChange} onOptionsChange={onOptionsChange} />;
      
      case 'static':
        return <StaticField field={field} onChange={onChange} onFieldUpdate={onFieldUpdate} />;
      
      default:
        return (
          <div className="text-gray-500 italic">
            Field type "{(field as any).type}" not supported
          </div>
        );
    }
  };

  return (
    <div className="mb-4">
      {onLabelChange ? (
        <div className="mb-2">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={field.label || ''}
              onChange={(e) => onLabelChange(e.target.value)}
              className="flex-1 bg-transparent text-sm font-medium border-none outline-none placeholder-neutral-400 focus:ring-0 text-gray-700 hover:bg-gray-50 rounded px-1 py-1 transition-colors"
              placeholder="Field label"
            />
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            {field.isRequired && <span className="text-red-500 ml-1">*</span>}
          </div>
        </div>
      ) : (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {field.label}
          {field.isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {renderField()}
    </div>
  );
};

export default FieldConstructor;
