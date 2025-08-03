"use client"

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Form } from '@hzzhsoftware/types-form'

const HeaderBar = ({ form, children }: { form: Form, children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  
  const isContentActive = pathname === `/form/${form.id}`;
  const isResponsesActive = pathname === `/form/${form.id}/responses`;
  
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-neutral-200">
      <div className="flex items-center space-x-2 text-sm text-neutral-600">
          <button
            onClick={() => router.push('/form')}
            className="hover:text-neutral-900 transition-all duration-300 hover:cursor-pointer hover:underline"
          >
            My Workspace
          </button>
          <span>&gt;</span>
          <span>{form.name}</span>
        </div>
      
      {/* Center Navigation */}
      <div className="flex items-center space-x-8">
        <button 
          onClick={() => router.push(`/form/${form.id}`)}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            isContentActive 
              ? 'text-primary-600 border-b-2 border-primary-600' 
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          Content
        </button>
        <button 
          onClick={() => router.push(`/form/${form.id}/responses`)}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            isResponsesActive 
              ? 'text-primary-600 border-b-2 border-primary-600' 
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          Responses
        </button>
      </div>
      
      <div className="flex items-center space-x-6">
        <button className="flex items-center btn btn-primary">
          <span>Share</span>
        </button>
        {children}
      </div>
    </header>
  )
}

export default HeaderBar