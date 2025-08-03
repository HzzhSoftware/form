"use client"

import React from 'react'
import { FormFieldType, FormField } from '@hzzhsoftware/types-form'

const fieldTypes = [
  {
    type: 'short_text' as FormFieldType,
    name: 'Short Text',
    description: 'Single line text input',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
      </svg>
    )
  },
  {
    type: 'long_text' as FormFieldType,
    name: 'Long Text',
    description: 'Multi-line text area',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    type: 'multiple_choice' as FormFieldType,
    name: 'Multiple Choice',
    description: 'Single selection from options',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    type: 'multiple_select' as FormFieldType,
    name: 'Multiple Select',
    description: 'Multiple selections from options',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    type: 'yes_no' as FormFieldType,
    name: 'Yes/No',
    description: 'Boolean choice',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    )
  },
  {
    type: 'email' as FormFieldType,
    name: 'Email',
    description: 'Email address input',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    type: 'phone' as FormFieldType,
    name: 'Phone',
    description: 'Phone number input',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    )
  },
  {
    type: 'date' as FormFieldType,
    name: 'Date',
    description: 'Date picker',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    type: 'number' as FormFieldType,
    name: 'Number',
    description: 'Numeric input',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
      </svg>
    )
  },
  {
    type: 'url' as FormFieldType,
    name: 'URL',
    description: 'Website URL input',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    )
  }
]

interface FieldSideBarProps {
  field: FormField;
  onFieldUpdate?: (updatedField: FormField) => void;
}

const FieldSideBar: React.FC<FieldSideBarProps> = ({ field, onFieldUpdate }) => {
  const handleRequiredToggle = () => {
    if (onFieldUpdate) {
      onFieldUpdate({
        ...field,
        required: !field.required
      });
    }
  };

  return (
    <div className="space-y-6">
    {/* Question Section */}
    <div>
      <h3 className="text-sm font-medium text-neutral-700 mb-3">Question</h3>
      <div className="flex space-x-1">
        <div>{field.label}</div>
      </div>
    </div>
    
    {/* Answer Section */}
    <div>
      <h3 className="text-sm font-medium text-neutral-700 mb-3">Answer</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-2 border border-neutral-300 rounded">
          <span className="text-sm text-neutral-700">Multiple Choice</span>
          <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-700">Required</span>
            <button
              onClick={handleRequiredToggle}
              className={`w-10 h-6 rounded-full relative transition-colors duration-200 ${
                field?.required ? 'bg-primary-600' : 'bg-neutral-200'
              }`}
            >
              <div 
                className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
                  field?.required ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-700">Multiple selection</span>
            <div className="w-10 h-6 bg-neutral-200 rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-700">Randomize</span>
            <div className="w-10 h-6 bg-neutral-200 rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-700">"Other" option</span>
            <div className="w-10 h-6 bg-neutral-200 rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-700">Vertical alignment</span>
            <div className="w-10 h-6 bg-primary-600 rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
            </div>
          </div>
        </div>
        
        <div className="pt-3 border-t border-neutral-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-700">Image or video</span>
            <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default FieldSideBar