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
      </div>
      <div className="flex space-x-6 text-sm">
        <button className="text-blue-600 hover:underline">Edit</button>
        <button className="text-red-600 hover:underline">Delete</button>
        <button className="text-green-600 hover:underline">View Responses</button>
      </div>
    </div>
  )
}

export default FormRecord