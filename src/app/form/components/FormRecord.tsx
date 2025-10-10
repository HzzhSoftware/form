"use client"

import { Form } from '@hzzhsoftware/types-form'
import Link from 'next/link'
import React, { useState } from 'react'
import { deleteForm } from '@/services/form'

const FormRecord = ({ form }: { form: Form }) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-neutral-500'
      case 'published':
        return 'bg-primary-500'
      case 'unpublished':
        return 'bg-secondary-500'
      case 'archived':
        return 'bg-neutral-900'
      default:
        return 'bg-neutral-500'
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteForm({ formId: form.id })
      // Refresh the page to update the list
      window.location.reload()
    } catch (error) {
      console.error('Failed to delete form:', error)
      alert('Failed to delete form. Please try again.')
    } finally {
      setIsDeleting(false)
      setShowConfirmDialog(false)
    }
  }

  // Mock data for demonstration - replace with actual data when available
  return (
    <>
      <tr className="hover:bg-neutral-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className={`w-4 h-4 ${getStatusColor(form.status)} rounded mr-3`}></div>
          <div>
            <Link href={`/form/${form.id}`} className="text-sm font-medium text-neutral-900 hover:text-purple-600">
              {form.name}
            </Link>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
        {form.starts}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
        <Link href={`/form/${form.id}/responses`} className="font-bold text-primary-500 hover:cursor-pointer underline transition-all duration-300">
          {form.submissions}
        </Link>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
        {form.starts === 0 ? '0%' : `${Math.round((form.submissions / form.starts) * 100)}%`}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
        {formatDate(form.updatedAt)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Link href={`/to/${form.id}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50 hover:text-neutral-900 transition-colors duration-200">
          Go to Form
        </Link>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Link href={`/form/${form.id}/settings`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50 hover:text-neutral-900 transition-colors duration-200">
          Edit
        </Link>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button
          onClick={() => setShowConfirmDialog(true)}
          disabled={isDeleting}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-700 bg-white border border-red-300 rounded-md hover:bg-red-50 hover:text-red-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </td>
    </tr>
    
    {/* Confirmation Dialog */}
    {showConfirmDialog && (
      <tr>
        <td colSpan={7} className="px-6 py-4 bg-red-50 border-t border-red-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-red-800">
              Are you sure you want to delete "{form.name}"? This action cannot be undone and will delete all submissions.
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-3 py-1 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-3 py-1 text-sm font-medium text-white bg-red-600 border border-red-600 rounded hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </td>
      </tr>
    )}
    </>
  )
}

export default FormRecord