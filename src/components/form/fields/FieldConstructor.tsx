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
}

const FieldConstructor: React.FC<FieldConstructorProps> = ({ 
  field, 
  onChange, 
  onOptionsChange,
  onFieldUpdate,
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
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {field.label}
        {field.isRequired && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderField()}
    </div>
  );
};

export default FieldConstructor;
