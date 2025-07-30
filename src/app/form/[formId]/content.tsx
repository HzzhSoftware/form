import React from 'react'
import { useFormContext } from '../components/FormContext'

const Content = () => {
  const { form, currentCard, setCurrentCard } = useFormContext();
  return (
  <>
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
    <div className="w-80 bg-white border-l p-4">
      <h2 className="text-lg font-bold mb-4">Card Options</h2>
      <div className="space-y-4">
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Edit</button>
        <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Delete</button>
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">View Submissions</button>
      </div>
    </div>
  </>
  )
}

export default Content