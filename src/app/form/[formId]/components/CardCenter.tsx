"use client";

import React from 'react'
import { useFormContext } from './FormContext'

const CardCenter = () => {
  const { form } = useFormContext();
  return (
    <main className="flex-1 p-8">
    <h1 className="text-2xl font-bold mb-4">{form.name}</h1>
    <div className="bg-white shadow rounded p-6">
      <h2 className="text-xl font-semibold mb-2">Card Title</h2>
      <p className="text-gray-600">Preview of the card contents...</p>
    </div>
  </main>
  )
}

export default CardCenter