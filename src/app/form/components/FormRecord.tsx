import { Form } from '@hzzhsoftware/types-form'
import Link from 'next/link'
import React from 'react'

const FormRecord = ({ form }: { form: Form }) => {

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

  // Mock data for demonstration - replace with actual data when available
  return (
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
    </tr>
  )
}

export default FormRecord