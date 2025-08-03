"use client"

import React, { useState, useEffect } from 'react'
import { Card } from '@hzzhsoftware/types-form'
import Field from '@/components/form/fields'

interface CardConstructorProps {
  card: Card;
  setCurrentFieldId: (fieldId: string) => void;
} 

const CardConstructor: React.FC<CardConstructorProps> = ({ card, setCurrentFieldId }) => {
  const [title, setTitle] = useState(card.title || "Your question here.");
  const [description, setDescription] = useState("Description (optional)");
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});

  useEffect(() => {
    setTitle(card.title || "Your question here.");
  }, [card.title]);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleDescriptionChange = (newDescription: string) => {
    setDescription(newDescription);
    // Note: Card schema doesn't have description field, so we'll store it separately
    // or extend the card type if needed
  };

  const handleFieldChange = (fieldId: string, value: string) => {
    setFieldValues(prev => ({
      ...prev,
      [fieldId]: value
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
           <div
             key={field.id}
             className="relative group w-full"
             onClick={() => setCurrentFieldId(field.id)}
           >
            {/* Click overlay for field selection */}
            <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded pointer-events-none z-10" />
            
            {/* Field label */}
            <label className="block text-sm font-medium mb-1">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            
                         {/* Actual field component */}
             <div className="relative w-full">
               <Field
                 field={field}
                 value={fieldValues[field.id] ?? ""}
                 onChange={(val) => handleFieldChange(field.id, val)}
               />
              
              {/* Selection indicator */}
              <div className="absolute top-2 right-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
            </div>
          </div>
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
