import { Form } from '@hzzhsoftware/types-form'
import Link from 'next/link'
import React from 'react'

const FormRecord = ({ form }: { form: Form }) => {

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  return (
    <div
      key={form.id}
      className="flex justify-between items-center p-5 bg-white shadow hover:shadow-lg rounded-lg transition w-full"
    >
      <div>
        <h2 className="text-xl font-semibold">
          <Link href={`/form/${form.id}`} className="hover:underline">
            {form.name}
          </Link>
        </h2>
        <p className="text-gray-600">{form.description}</p>
        <p className="text-gray-600">{formatDate(form.createdAt)}</p>
        <p className="text-gray-600">{form.submissions} submissions</p>
      </div>
      <div className="flex space-x-6 text-sm">
        <Link href={`/form/${form.id}/edit`} className="text-blue-600 hover:underline">Edit</Link>
        <Link href={`/form/${form.id}/delete`} className="text-red-600 hover:underline">Delete</Link>
        <Link href={`/form/${form.id}/responses`} className="text-green-600 hover:underline">View Responses</Link>
      </div>
    </div>
  )
}

export default FormRecord