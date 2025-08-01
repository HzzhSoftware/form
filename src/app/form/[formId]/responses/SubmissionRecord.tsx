import { Submission } from '@hzzhsoftware/types-form'
import Link from 'next/link'
import React from 'react'

const SubmissionRecord = ({ submission }: { submission: Submission }) => {
  return (
    <div key={submission.id} className="flex justify-between items-center p-5 bg-white shadow hover:shadow-lg rounded-lg transition w-full">
        <div>
            <h2 className="text-xl font-semibold">
                {submission.id}
            </h2>
        </div>
        <div className="flex space-x-6 text-sm">
            <Link href={`/form/${submission.formId}/responses/${submission.id}`} className="text-blue-600 hover:underline">View</Link>
        </div>
    </div>
  )
}

export default SubmissionRecord