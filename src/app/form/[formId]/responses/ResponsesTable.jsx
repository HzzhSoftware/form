import React from "react";
import { FieldDisplay } from "../fields";

export default function ResponsesTable({ form, filteredSubmissions, formatDate }) {
  return (
    <div className="flex-1 bg-white flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto">
        <div className="w-full">
          <table className="w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50 sticky top-0 z-10">
              <tr>
                <th className="w-20 px-4 py-3 text-left">
                  <input type="checkbox" className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
                </th>
                <th className="w-40 px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Response Time</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </th>
                {form.cards.map(card => (
                  card.fields.map(field => (
                    <th key={field.id} className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider min-w-[200px]">
                      <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-primary-500 rounded flex-shrink-0"></div>
                        <span className="truncate">{field.label}</span>
                      </div>
                    </th>
                  ))
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {filteredSubmissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-neutral-50">
                  <td className="w-20 px-4 py-4">
                    <input type="checkbox" className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
                  </td>
                  <td className="w-40 px-4 py-4 text-sm text-neutral-900">
                    {formatDate(submission.submittedAt)}
                  </td>
                  {form.cards.map(card => (
                    card.fields.map(field => (
                      <td key={field.id + "&" + submission.id} className="px-4 py-4 min-w-[200px]">
                        <div className="max-w-none">
                          <FieldDisplay field={field} value={submission[field.id]} />
                        </div>
                      </td>
                    ))
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
