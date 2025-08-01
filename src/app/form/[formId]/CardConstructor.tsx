"use client"

import React, { useState, useEffect } from 'react'
import { Card } from '@hzzhsoftware/types-form'

interface CardConstructorProps {
  card: Card;
  setCurrentFieldId?: (fieldId: string) => void;
} 

const CardConstructor: React.FC<CardConstructorProps> = ({ card, setCurrentFieldId }) => {
  const [title, setTitle] = useState(card.title || "Your question here.");
  const [description, setDescription] = useState("Description (optional)");

  useEffect(() => {
    setTitle(card.title || "Your question here.");
  }, [card.title]);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (onCardUpdate) {
      onCardUpdate({
        ...card,
        title: newTitle
      });
    }
  };

  const handleDescriptionChange = (newDescription: string) => {
    setDescription(newDescription);
    // Note: Card schema doesn't have description field, so we'll store it separately
    // or extend the card type if needed
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="w-full bg-transparent text-neutral-300 text-sm border-none outline-none placeholder-neutral-500 focus:ring-0"
          placeholder="Your question here."
        />
        <input
          type="text"
          value={description}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          className="w-full bg-transparent text-neutral-400 text-xs border-none outline-none placeholder-neutral-500 focus:ring-0"
          placeholder="Description (optional)"
        />
      </div>
                  
      <div className="rounded-lg p-4">
        <div className="space-y-2">
          {card.fields.map((field) => (
            <div
              key={field.id}
              className="flex items-center space-x-3 p-2 rounded cursor-pointer hover:bg-neutral-50 transition-colors"
              onClick={() => setCurrentFieldId(field.id)}
            >
              <div className="text-neutral-600">{field.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CardConstructor
