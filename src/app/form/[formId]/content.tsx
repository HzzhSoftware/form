"use client"

import React, { useState } from 'react'
import { useFormContext } from '../components/FormContext'
import CardConstructor from './CardConstructor'
import FieldSideBar from './FieldSideBar'

const Content = ({ children }: { children: React.ReactNode }) => {
  const { form, currentCard, setCurrentCard } = useFormContext();
  const currentCardData = form.cards.find(card => card.id === currentCard);
  const [currentFieldId, setCurrentFieldId] = useState<string | null>(currentCardData?.fields[0].id || null);
  const currentFieldData = currentCardData?.fields.find(field => field.id === currentFieldId);
  
  return (
    <div className="flex flex-col w-full h-full">
      {/* Header Bar */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-neutral-200">
        <div className="flex items-center space-x-2 text-sm text-neutral-600">
          <span>{form.workspace || "My Workspace"}</span>
          <span>&gt;</span>
          <span>{form.name}</span>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex space-x-1">
            <button className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 border-b-2 border-primary-600">
              Content
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center btn btn-primary">
              <span>Share</span>
            </button>
            {children}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar (15-20% width) */}
        <aside className="w-64 bg-neutral-50 border-r border-neutral-200 p-4 overflow-y-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-neutral-700">Universal mode</span>
              <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            <div className="bg-white border border-neutral-200 rounded-lg p-4 min-h-64">
              <div className="space-y-3">
                {form.cards.map((card, index) => (
                  <div 
                    key={card.id}
                    className={`flex items-center space-x-2 p-2 rounded cursor-pointer transition-colors ${
                      currentCard === card.id ? 'bg-primary-100 border border-primary-300' : 'bg-neutral-100 hover:bg-neutral-200'
                    }`}
                    onClick={() => setCurrentCard(card.id)}
                  >
                    <div className={`w-6 h-6 rounded flex items-center justify-center text-white text-xs font-medium ${
                      currentCard === card.id ? 'bg-primary-600' : 'bg-primary-500'
                    }`}>
                      {index + 1}
                    </div>
                    <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className={`  text-sm text-neutral-600 flex-1 truncate 
                      ${currentCard === card.id ? 'text-primary-on-600' : 'text-primary-600'}`}
                      >
                        {card.title || `Card ${index + 1}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-neutral-700">Endings</span>
              <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            
            <div className="flex items-center space-x-2 p-2 bg-neutral-100 rounded">
              {/* <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm text-neutral-600">A</span> */}
            </div>
          </div>
        </aside>

        {/* Central Content Area (50-60% width) */}
        <main className="flex-1 bg-neutral-100 relative overflow-hidden p-6">
          <div className="h-full bg-black rounded-lg shadow-lg">
            <div className="h-full flex flex-col">
              <div className="text-white text-2xl font-bold p-6">KYCombinator</div>
              
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-left max-w-md w-full">
                  <CardConstructor card={currentCardData} setCurrentFieldId={setCurrentFieldId} />
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar (20-25% width) */}
        <aside className="w-80 bg-white border-l border-neutral-200 p-6 overflow-y-auto">
          <FieldSideBar field={currentFieldData} />
        </aside>
      </div>
    </div>
  )
}

export default Content