import React from "react";
import { listForms } from "@/services/form";
import FormRecord from "./components/FormRecord";
import DashboardHeader from "./components/DashboardHeader";
import DashboardSidebar from "./components/DashboardSidebar";

export default async function FormPage() {
  let forms = null;
  forms = await listForms(1, 10);

  if (!forms) {
    return <div className="text-center text-red-600 text-xl">No forms found</div>;
  }
  console.log(forms);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="flex h-screen">
        <DashboardSidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-semibold text-gray-900">Vision - Louisville</h1>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <select className="text-sm text-gray-600 bg-transparent border-none focus:outline-none">
                    <option>Date created</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-white rounded-lg p-1">
                <button className="px-3 py-1 text-sm font-medium text-purple-600 bg-purple-50 rounded">List</button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">Grid</button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Form Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responses</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Integrations</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {forms.map((form) => (
                      <FormRecord key={form.id} form={form} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
