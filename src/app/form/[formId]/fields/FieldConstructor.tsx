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
  MultipleSelectField
} from './index';

interface FieldConstructorProps {
  field: FormField;
  setCurrentFieldId: (fieldId: string) => void;
  onChange?: (value: string) => void;
}

const FieldConstructor: React.FC<FieldConstructorProps> = ({ 
  field, 
  setCurrentFieldId,
  onChange, 
}) => {
  const renderField = () => {
    switch (field.type) {
      case 'short_text':
        return <ShortTextField field={field} setCurrentFieldId={setCurrentFieldId} onChange={onChange} />;
      
      case 'long_text':
        return <LongTextField field={field} setCurrentFieldId={setCurrentFieldId} onChange={onChange} />;
      
      case 'email':
        return <EmailField field={field} setCurrentFieldId={setCurrentFieldId} onChange={onChange} />;
      
      case 'phone':
        return <PhoneField field={field} setCurrentFieldId={setCurrentFieldId} onChange={onChange} />;
      
      case 'number':
        return <NumberField field={field} setCurrentFieldId={setCurrentFieldId} onChange={onChange} />;
      
      case 'url':
        return <UrlField field={field} setCurrentFieldId={setCurrentFieldId} onChange={onChange} />;
      
      case 'date':
        return <DateField field={field} setCurrentFieldId={setCurrentFieldId} onChange={onChange} />;
      
      case 'yes_no':
        return <YesNoField field={field} setCurrentFieldId={setCurrentFieldId} onChange={onChange} />;
      
      case 'multiple_choice':
        return <MultipleChoiceField field={field} setCurrentFieldId={setCurrentFieldId} onChange={onChange} />;
      
      case 'multiple_select':
        return <MultipleSelectField field={field} setCurrentFieldId={setCurrentFieldId} onChange={onChange} />;
      
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
