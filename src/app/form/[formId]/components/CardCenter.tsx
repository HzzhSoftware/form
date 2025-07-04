"use client";

import React from 'react'
import { useFormContext } from './FormContext'

const CardCenter = () => {
  const { form, currentCard } = useFormContext();
  return (
    <main className="flex-1 p-8">
    <h1 className="text-2xl font-bold mb-4">{form.name}</h1>
    <div className="bg-white shadow rounded p-6">
      <h2 className="text-xl font-semibold mb-2">{form.cards.find(card => card.id === currentCard)?.title}</h2>

      {form.cards.find(card => card.id === currentCard)?.fields.map((field) => (
        <div key={field.id}>
          <h3 className="text-lg font-semibold mb-2">{field.label}</h3>
          <p className="text-gray-600">{field.type}</p>
        </div>
      ))}
    </div>
  </main>
  )
}

export default CardCenter