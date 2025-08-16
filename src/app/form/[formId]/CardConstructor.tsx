"use client"

import React, { useState, useEffect } from 'react'
import { Card, FormFieldType } from '@hzzhsoftware/types-form'
import FieldConstructor from '../../../components/form/fields/FieldConstructor'
import { useFormBuilderContext } from '../components/FormBuilderContext';
import { v4 as uuidv4 } from 'uuid';
import FieldTypeSelector from './FieldTypeSelector';

interface CardConstructorProps {
  card: Card;
} 

// Renders the current card in the form
const CardConstructor: React.FC<CardConstructorProps> = ({ card }) => {
  const { currentCardId, currentFieldId, setCurrentFieldId, localForm, updateLocalForm } = useFormBuilderContext();
  const [title, setTitle] = useState(card.title || "Your question here.");
  const [description, setDescription] = useState((card as any).description || "Description (optional)");

  // Update local state when card changes
  useEffect(() => {
    setTitle(card.title || "Your question here.");
    setDescription((card as any).description || "Description (optional)");
  }, [card]);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    updateLocalForm(form => ({
      ...form, 
      cards: form.cards.map(c => c.id === currentCardId ? {...c, title: newTitle} : c)
    }));
  };

  const handleDescriptionChange = (newDescription: string) => {
    setDescription(newDescription);
    updateLocalForm(form => ({
      ...form, 
      cards: form.cards.map(c => c.id === currentCardId ? {...c, description: newDescription} : c)
    }));
  };

  const handleFieldChange = (fieldId: string, value: string) => {
    updateLocalForm(form => ({
      ...form, 
      cards: form.cards.map(c => c.id === currentCardId ? {
        ...c, 
        fields: c.fields.map(field => field.id === fieldId ? {...field, value: value} : field)
      } : c)
    }));
  };

  const handleDeleteField = (fieldId: string) => {
    updateLocalForm(form => ({
      ...form, 
      cards: form.cards.map(c => 
        c.id === currentCardId 
          ? {...c, fields: c.fields.filter(field => field.id !== fieldId)} 
          : c
      )
    }));
  };

  const handleAddField = (fieldType: FormFieldType) => {
    // Create a new field with the selected type and required properties
    const createField = (type: FormFieldType) => {
      const baseField = {
        id: uuidv4(),
        type,
        label: `New ${type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}`,
        isRequired: false,
      };

      // Add type-specific required properties
      switch (type) {
        case 'multiple_choice':
        case 'multiple_select':
          return {
            ...baseField,
            allowMultiple: false,
            isRandomized: false,
            allowOther: false,
            isVerticalAlignment: false,
          };
        case 'uploader':
          return {
            ...baseField,
            allowMultiple: false,
            uploadService: 'local' as const,
          };
        default:
          return baseField;
      }
    };

    const newField = createField(fieldType);
    
    updateLocalForm(form => ({
      ...form,
      cards: form.cards.map(c =>
        c.id === currentCardId
          ? {...c, fields: [...c.fields, newField as any]}
          : c
      )
    }));
  };

  return (
    <div className="w-full space-y-6">
      {/* Card Title */}
      <div className="space-y-2">
        <input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="w-full bg-transparent text-lg font-medium border-none outline-none placeholder-neutral-400 focus:ring-0"
          placeholder="Your question here."
        />
        <input
          type="text"
          value={description}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          className="w-full bg-transparent text-sm border-none outline-none placeholder-neutral-500 focus:ring-0"
          placeholder="Description (optional)"
        />
      </div>
                  
      {/* Fields - Rendered exactly as responders see them */}
      <div className="space-y-6">
        {card.fields.map((field) => (
          <div key={field.id} className="relative group">
            <div 
              className={`border-2 rounded-lg p-4 transition-all duration-200 ${
                field.id === currentFieldId 
                  ? 'border-primary-500 bg-neutral-200' 
                  : 'border-dashed border-neutral-200 hover:border-primary-300 hover:bg-neutral-50 cursor-pointer'
              }`}
              onClick={() => setCurrentFieldId(field.id)}
            >
              <FieldConstructor
                field={field}
                onChange={(val) => handleFieldChange(field.id, val)} 
              />
            </div>
            <button
              onClick={() => handleDeleteField(field.id)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded"
              title="Delete field"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
        
        {card.fields.length === 0 && (
          <div className="text-center py-8">
            <div className="text-neutral-500 text-sm">
              No fields added yet. Click on a field type to add one.
            </div>
          </div>
        )}

        {/* Add Field Button */}
        <FieldTypeSelector onAddField={handleAddField} />
      </div>
    </div>
  );
}

export default CardConstructor
