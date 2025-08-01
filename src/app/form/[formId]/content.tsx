"use client"

import React, { useState, useEffect } from 'react'
import { useFormContext } from '../components/FormContext'
import CardConstructor from './CardConstructor'
import FieldSideBar from './FieldSideBar'
import { updateForm } from '@/services/form'

const Content = ({ children }: { children: React.ReactNode }) => {
  const { form, currentCard, setCurrentCard } = useFormContext();
  const currentCardData = form.cards.find(card => card.id === currentCard);
  const [currentFieldId, setCurrentFieldId] = useState<string | null>(currentCardData?.fields[0].id || null);
  const currentFieldData = currentCardData?.fields.find(field => field.id === currentFieldId);
  
  // Auto-save and save functionality
  const [autoSave, setAutoSave] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Track changes to enable/disable save button
  useEffect(() => {
    // This would track actual changes to the form
    // For now, we'll set it to true when form data changes
    setHasChanges(true);
  }, [form]);
  
  // Auto-save functionality
  useEffect(() => {
    if (autoSave && hasChanges) {
      const timeoutId = setTimeout(() => {
        handleSave();
      }, 2000); // Auto-save after 2 seconds of no changes
      
      return () => clearTimeout(timeoutId);
    }
  }, [form, autoSave, hasChanges]);
  
  const handleSave = async () => {
    if (!hasChanges || isSaving) return;
    
    setIsSaving(true);
    try {
      await updateForm(form.id, form);
      console.log('Saving form:', form);
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving form:', error);
    } finally {
      setIsSaving(false);
    }
  };
  
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
        <aside className="w-64 bg-neutral-50 border-r border-neutral-200 p-4 overflow-y-auto gap-6 flex flex-col">
          <div className="flex items-center justify-between">
            {/* Auto-save Toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-neutral-600">Auto-save</span>
              <button
                onClick={() => setAutoSave(!autoSave)}
                className={`w-10 h-6 rounded-full relative transition-colors duration-200 ${
                  autoSave ? 'bg-primary-600' : 'bg-neutral-200'
                }`}
              >
                <div 
                  className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
                    autoSave ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>
            
            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              className={`flex items-center px-4 py-2 rounded text-sm font-medium transition-colors ${
                hasChanges && !isSaving
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
              }`}
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Save
                </>
              )}
            </button>
            
          </div>
          <div>
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
                
                {/* Add Card Button */}
                <div 
                  onClick={() => {
                    // TODO: Implement add card functionality
                    console.log('Add card clicked');
                  }}
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
          <div className="h-full bg-black rounded-lg shadow-lg">
            <div className="h-full flex flex-col">
              <div className="text-white text-2xl font-bold p-6">KYCombinator</div>
              
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-left max-w-md w-full">
                  {currentCardData ? (
                    <CardConstructor card={currentCardData} setCurrentFieldId={setCurrentFieldId} />
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
        <aside className="w-80 bg-white border-l border-neutral-200 p-6 overflow-y-auto">
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