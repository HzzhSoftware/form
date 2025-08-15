"use client"

import React, { useState, useEffect } from 'react'
import { Card, Form } from '@hzzhsoftware/types-form'
import FieldConstructor from '../../../components/form/fields/FieldConstructor'
import { useFormContext } from '../components/FormContext';

interface CardConstructorProps {
  card: Card;
  setCurrentFieldId: (fieldId: string) => void;
  setLocalForm: (form: Form) => void;
  localForm: Form;
} 

// Renders the current card in the form
const CardConstructor: React.FC<CardConstructorProps> = ({ card, setCurrentFieldId, setLocalForm, localForm }) => {
  const { currentCardId } = useFormContext();
  const [title, setTitle] = useState(card.title || "Your question here.");
  const [description, setDescription] = useState((card as any).description || "Description (optional)");

  console.log(currentCardId);
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
           <FieldConstructor
             key={field.id}
             setCurrentFieldId={setCurrentFieldId}
             field={field}
             onChange={(val) => handleFieldChange(field.id, val)} 
           />
        ))}
        
        {card.fields.length === 0 && (
          <div className="text-center py-8">
            <div className="text-neutral-500 text-sm">
              No fields added yet. Click on a field type to add one.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CardConstructor
