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

  // Mock data for demonstration - replace with actual data when available
  const mockResponses = Math.floor(Math.random() * 10) + 1;
  const mockCompletion = Math.floor(Math.random() * 100);
  const mockUpdatedDate = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded mr-3"></div>
          <div>
            <Link href={`/form/${form.id}`} className="text-sm font-medium text-gray-900 hover:text-purple-600">
              {form.name}
            </Link>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {mockResponses}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {mockCompletion}%
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {formatDate(mockUpdatedDate.toISOString())}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
          </svg>
        </button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </td>
    </tr>
  )
}

export default FormRecord