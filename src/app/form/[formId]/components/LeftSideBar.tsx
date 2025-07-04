"use client";

import React from 'react'
import { useFormContext } from './FormContext'

const LeftSideBar = () => {
  const { form, currentCard, setCurrentCard   } = useFormContext();
  return (
    <aside className="w-64 bg-white border-r p-4 overflow-y-auto">
    <h2 className="text-lg font-bold mb-4">Cards</h2>
    <div className="space-y-3">
      {form.cards.map((card) => (
        <div
          key={card.id}
          className={`p-3 rounded hover:bg-gray-100 cursor-pointer border ${currentCard === card.id ? "bg-gray-100" : ""}`}
            onClick={() => setCurrentCard(card.id)}
        >
          {card.title}
        </div>
      ))}
    </div>
  </aside>
  )
}

export default LeftSideBar