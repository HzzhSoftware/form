"use client"

import React, { useState, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Form } from '@hzzhsoftware/types-form'
import { updateForm } from '@/services/form'
import Link from 'next/link'

const HeaderBar = ({ form }: { form: Form }) => {
  const router = useRouter();
  const pathname = usePathname();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formName, setFormName] = useState(form.name);
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const isContentActive = pathname === `/form/${form.formId}`;
  const isResponsesActive = pathname === `/form/${form.formId}/responses`;
  const isSettingsActive = pathname === `/form/${form.formId}/settings`;
  
  // Update form name when form prop changes
  useEffect(() => {
    setFormName(form.name);
  }, [form.name]);
  
  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);
  
  const handleNameClick = () => {
    setIsEditing(true);
  };
  
  const handleNameSave = async () => {
    if (formName.trim() === '') {
      setFormName(form.name); // Reset to original if empty
      setIsEditing(false);
      return;
    }
    
    if (formName === form.name) {
      setIsEditing(false);
      return;
    }
    
    setIsSaving(true);
    try {
      const trimmedName = formName.trim();
      const updatedForm = {
        ...form,
        name: trimmedName
      };
      await updateForm({ formId: form.formId }, updatedForm);
      setFormName(trimmedName); // Update form name state to the saved value
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating form name:', error);
      setFormName(form.name); // Reset to original on error
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleNameCancel = () => {
    setFormName(form.name);
    setIsEditing(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSave();
    } else if (e.key === 'Escape') {
      handleNameCancel();
    }
  };
  
  return (
    <div className="flex items-center justify-between px-6 py-4 w-full">
      <div className="flex items-center space-x-1 text-sm text-neutral-600">
        <button
          onClick={() => router.push('/form')}
          className="hover:text-neutral-900 transition-all duration-300 hover:cursor-pointer hover:underline"
        >
          My Workspace
        </button>
        <span>&gt;</span>
        {isEditing ? (
          <div className="flex items-center space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleNameSave}
              className="px-2 py-1 text-sm border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              disabled={isSaving}
            />
            {isSaving && (
              <svg className="animate-spin h-4 w-4 text-neutral-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
          </div>
        ) : (
          <button
            onClick={handleNameClick}
            className="hover:text-neutral-900 transition-colors hover:underline focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 rounded px-1"
            title="Click to edit form name"
          >
            {form.name}
          </button>
        )}
        <Link 
          href={`/to/${form.formId}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-neutral-700 hover:text-neutral-900 transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </Link> 
      </div>
      
      {/* Center Navigation */}
      <div className="flex items-center space-x-8">
        <button 
          onClick={() => router.push(`/form/${form.formId}`)}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            isContentActive 
              ? 'text-primary-600 border-b-2 border-primary-600' 
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          Content
        </button>
        <button 
          onClick={() => router.push(`/form/${form.formId}/responses`)}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            isResponsesActive 
              ? 'text-primary-600 border-b-2 border-primary-600' 
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          Responses
        </button>
        <button 
          onClick={() => router.push(`/form/${form.formId}/settings`)}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            isSettingsActive 
              ? 'text-primary-600 border-b-2 border-primary-600' 
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          Settings
        </button>
      </div>
      
      <div className="flex items-center space-x-6">
        <button className="flex items-center btn btn-primary">
          <span>Share</span>
        </button>
      </div>
    </div>
  )
}

export default HeaderBar