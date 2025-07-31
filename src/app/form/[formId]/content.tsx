"use client"

import React from 'react'
import { useFormContext } from '../components/FormContext'

const Content = () => {
  const { form, currentCard, setCurrentCard } = useFormContext();
  
  return (
    <div className="flex flex-col w-full h-full">
      {/* Header Bar */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Vision - Louisville</span>
          <span>&gt;</span>
          <span>My new form</span>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex space-x-1">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border-b-2 border-blue-600">
              Content
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
              Workflow
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
              Connect
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Share</span>
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium text-gray-700">
              DR
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar (15-20% width) */}
        <aside className="w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">Universal mode</span>
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4 min-h-64">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 p-2 bg-gray-100 rounded">
                  <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-medium">1</div>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm text-gray-600">-</span>
                </div>
                
                <div className="flex items-center space-x-2 p-2 bg-gray-100 rounded">
                  <span className="text-sm text-gray-600">Partial Submit Point</span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">Endings</span>
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            
            <div className="flex items-center space-x-2 p-2 bg-gray-100 rounded">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm text-gray-600">A</span>
            </div>
          </div>
        </aside>

        {/* Central Content Area (50-60% width) */}
        <main className="flex-1 bg-gray-100 relative overflow-hidden p-6">
          <div className="h-full bg-black rounded-lg shadow-lg">
            <div className="h-full flex flex-col">
              <div className="text-white text-2xl font-bold p-6">KY Combinator</div>
              
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-left max-w-md w-full">
                  <div className="text-gray-300 text-sm mb-2">1 → Your question here. Recall information with @</div>
                  <div className="text-gray-400 text-xs mb-4">Description (optional)</div>
                  
                  <div className="space-y-2 mb-4">
                    <button className="w-full text-left p-3 border border-gray-600 rounded hover:bg-gray-800 text-white">
                      A Choice 1
                    </button>
                    <button className="w-full text-left p-3 border border-gray-600 rounded hover:bg-gray-800 text-white">
                      B Choice 2
                    </button>
                  </div>
                  
                  <button className="text-blue-400 text-sm hover:text-blue-300">
                    Add choice
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar (20-25% width) */}
        <aside className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Question Section */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Question</h3>
              <div className="flex space-x-1">
                <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded">Text</button>
                <button className="px-3 py-1.5 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300">Video</button>
              </div>
            </div>
            
            {/* Answer Section */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Answer</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-2 border border-gray-300 rounded">
                  <span className="text-sm text-gray-700">Multiple Choice</span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Required</span>
                    <div className="w-10 h-6 bg-gray-200 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Multiple selection</span>
                    <div className="w-10 h-6 bg-gray-200 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Randomize</span>
                    <div className="w-10 h-6 bg-gray-200 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">"Other" option</span>
                    <div className="w-10 h-6 bg-gray-200 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Vertical alignment</span>
                    <div className="w-10 h-6 bg-blue-600 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Image or video</span>
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Content