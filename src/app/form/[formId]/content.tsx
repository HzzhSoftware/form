"use client"

import React, { useState, useEffect } from 'react'
import { useFormBuilderContext } from '../components/FormBuilderContext'
import CardConstructor from './CardConstructor'
import FieldSideBar from './FieldSideBar'
import { v4 as uuidv4 } from 'uuid';
import { Card } from '@hzzhsoftware/types-form';

const Content = () => {
  const { 
    localForm, 
    currentCardId, 
    hasChanges, 
    isSaving,
    setCurrentCardId, 
    updateLocalForm,
  } = useFormBuilderContext();
  
  const currentCardData = localForm.cards.find(card => card.id === currentCardId);
  const [currentFieldId, setCurrentFieldId] = useState<string | null>(null);
  const currentFieldData = currentCardData?.fields.find(field => field.id === currentFieldId);
  
  // Update current field when card changes
  useEffect(() => {
    if (currentCardData && currentCardData.fields.length > 0) {
      setCurrentFieldId(currentCardData.fields[0].id);
    } else {
      setCurrentFieldId(null);
    }
  }, [currentCardId, currentCardData]);

  const addCard = () => {
    const newCard: Card = {
      id: uuidv4(),
      title: "New Card",
      fields: [],
    };

    updateLocalForm(form => ({
      ...form,
      cards: [...form.cards, newCard]
    }));
  };

  const deleteCard = (cardId: string) => {
    updateLocalForm(form => ({
      ...form,
      cards: form.cards.filter(card => card.id !== cardId)
    }));
  };
  
  return (
    <div className="flex flex-col w-full h-[calc(100vh-5rem)]">
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar (15-20% width) */}
        <aside className="w-64 bg-neutral-50 border-r border-neutral-200 p-4 overflow-y-auto gap-6 flex flex-col">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-neutral-700">Universal mode</span>
              <div className="flex items-center space-x-2">
                {/* Save Status Indicator */}
                {isSaving ? (
                  <div className="flex items-center space-x-1 text-xs text-neutral-600">
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary-600"></div>
                    <span>Saving...</span>
                  </div>
                ) : hasChanges ? (
                  <div className="flex items-center space-x-1 text-xs text-amber-600">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span>Unsaved</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1 text-xs text-green-600">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Saved</span>
                  </div>
                )}
                <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            <div className="bg-white border border-neutral-200 rounded-lg p-4 min-h-64">
              {/* Publish/Archive Button */}
              <div className="mb-4">
                {localForm.status === 'published' ? (
                  <button
                    onClick={() => updateLocalForm(form => ({ ...form, status: 'archived' }))}
                    className="w-full bg-neutral-600 hover:bg-neutral-700 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors flex items-center justify-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-14 0a2 2 0 012-2h2a2 2 0 012 2m0 0a2 2 0 002 2h2a2 2 0 002-2" />
                    </svg>
                    <span>Archive Form</span>
                  </button>
                ) : (
                  <button
                    onClick={() => updateLocalForm(form => ({ ...form, status: 'published' }))}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors flex items-center justify-center space-x-2"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span>Publish Form</span>
                  </button>
                )}
              </div>
              
              <div className="space-y-3">
                {localForm.cards.map((card, index) => (
                  <div 
                    key={card.id}
                    className={`flex items-center space-x-2 p-2 rounded cursor-pointer transition-colors ${
                      currentCardId === card.id ? 'bg-primary-100 border border-primary-300' : 'bg-neutral-100 hover:bg-neutral-200'
                    }`}
                    onClick={() => setCurrentCardId(card.id)}
                  >
                    <div className={`w-6 h-6 rounded flex items-center justify-center text-white text-xs font-medium ${
                      currentCardId === card.id ? 'bg-primary-600' : 'bg-primary-500'
                    }`}>
                      {index + 1}
                    </div>
                    <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className={`  text-sm text-neutral-600 flex-1 truncate 
                      ${currentCardId === card.id ? 'text-primary-on-600' : 'text-primary-600'}`}
                      >
                        {card.title || `Card ${index + 1}`}
                    </span>
                    <button onClick={() => deleteCard(card.id)} className="hover:cursor-pointer">
                      <svg className="w-4 h-4 text-neutral-500 hover:text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
                
                {/* Add Card Button */}
                <div 
                  onClick={addCard}
                  className="flex items-center space-x-2 p-2 rounded cursor-pointer transition-colors bg-neutral-100 hover:bg-neutral-200 border-2 border-dashed border-neutral-300 hover:border-primary-400"
                >
                  <div className="w-6 h-6 rounded flex items-center justify-center text-white text-xs font-medium bg-neutral-400">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm text-neutral-600 flex-1 truncate">
                    Add Card
                  </span>
                </div>
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
          <div className="h-full rounded-lg shadow-lg">
            <div className="h-full flex flex-col">
              <div className=" text-2xl font-bold p-6">KYCombinator</div>
              
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="max-w-6xl container w-full">
                  {currentCardData ? (
                    <CardConstructor card={currentCardData} />
                  ) : (
                    <div className="text-neutral-400 text-center">
                      <p>No card selected</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar (20-25% width) */}
        <aside className="w-80 border-l border-neutral-200 p-6 overflow-y-auto">
          {currentFieldData ? (
            <FieldSideBar field={currentFieldData} />
          ) : (
            <div className="text-neutral-400 text-center">
              <p>No field selected</p>
            </div>
            )}
        </aside>
      </div>
    </div>
  )
}

export default Content