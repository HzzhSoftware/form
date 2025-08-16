"use client"

import React, { useState, useEffect } from 'react'
import { Card, Form } from '@hzzhsoftware/types-form'
import FieldConstructor from '../../../components/form/fields/FieldConstructor'
import { useFormBuilderContext } from '../components/FormBuilderContext';
import { v4 as uuidv4 } from 'uuid';

interface CardConstructorProps {
  card: Card;
  setLocalForm: (form: Form) => void;
  localForm: Form;
} 

// Renders the current card in the form
const CardConstructor: React.FC<CardConstructorProps> = ({ card, setLocalForm, localForm }) => {
  const { currentCardId, currentFieldId, setCurrentFieldId } = useFormBuilderContext();
  const [title, setTitle] = useState(card.title || "Your question here.");
  const [description, setDescription] = useState((card as any).description || "Description (optional)");

  // Update local state when card changes
  useEffect(() => {
    setTitle(card.title || "Your question here.");
    setDescription((card as any).description || "Description (optional)");
  }, [card]);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    setLocalForm({...localForm, cards: localForm.cards.map(card => card.id === currentCardId ? {...card, title: newTitle} : card)});
  };

  const handleDescriptionChange = (newDescription: string) => {
    setDescription(newDescription);
    setLocalForm({...localForm, cards: localForm.cards.map(card => card.id === currentCardId ? {...card, description: newDescription} : card)});
  };

  const handleFieldChange = (fieldId: string, value: string) => {
    setLocalForm({...localForm, cards: localForm.cards.map(card => card.id === currentCardId ? {...card, fields: card.fields.map(field => field.id === fieldId ? {...field, value: value} : field)} : card)});
  };

  const handleDeleteField = (fieldId: string) => {
    setLocalForm({
      ...localForm, 
      cards: localForm.cards.map(card => 
        card.id === currentCardId 
          ? {...card, fields: card.fields.filter(field => field.id !== fieldId)} 
          : card
      )
    });
  };

  const handleAddField = () => {
    // This would typically open a field type selector
    // For now, we'll add a placeholder field
    const newField = {
      id: uuidv4(),
      type: 'short_text' as const,
      label: 'New Field',
      isRequired: false,
    };
    
    setLocalForm({
      ...localForm,
      cards: localForm.cards.map(card =>
        card.id === currentCardId
          ? {...card, fields: [...card.fields, newField]}
          : card
      )
    });
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
        <div 
          onClick={handleAddField}
          className="flex items-center space-x-2 p-4 rounded cursor-pointer transition-colors bg-neutral-100 hover:bg-neutral-200 border-2 border-dashed border-neutral-300 hover:border-primary-400"
        >
          <div className="w-6 h-6 rounded flex items-center justify-center text-white text-xs font-medium bg-neutral-400">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <span className="text-sm text-neutral-600">
            Add Field
          </span>
        </div>
      </div>
    </div>
  )
}

export default CardConstructor
