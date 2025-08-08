"use client";
import { createForm } from "@/services/form";
import { Form } from "@hzzhsoftware/types-form";

export default function DashboardSidebar({ forms }: { forms: Form[] }) {
  const handleCreateForm = async () => {
    try {
      const newForm: Form = {
        id: crypto.randomUUID(),
        name: "My new form",
        description: "",
        cards: [
          {
            id: crypto.randomUUID(),
            title: "Question 1",
            fields: [
              {
                id: crypto.randomUUID(),
                label: "Your question here",
                type: "multiple_choice",
                required: false,
                options: ["Choice 1", "Choice 2"]
              }
            ]
          }
        ],
        submissions: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        starts: 0
      };

      const response = await createForm(newForm);
      const formId = response.form.id;
      window.location.href = `/form/${formId}`;
    } catch (error) {
      console.error("Failed to create form:", error);
      alert("Failed to create form. Please try again later.");
    }
  };

  return (
    <aside className="w-80 bg-neutral-100 border-r border-neutral-200 flex flex-col">
      {/* Create Form Button */}
      <div className="p-6 border-b border-gray-200">
        <button 
        onClick={handleCreateForm}
        className="w-full bg-primary-500 text-primary-on-500 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-primary-600 transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">Create a new form</span>
        </button>
      </div>

      {/* Search */}
      <div className="p-6 border-b border-neutral-200">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
          <input
            type="text"
            placeholder="Search (Coming Soon)"
            className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Workspaces */}
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-neutral-900 flex items-center space-x-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            <span>Workspaces</span>
          </h3>
          <button className="text-neutral-400 hover:text-neutral-600">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Private Workspaces */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Forms</h4>
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="space-y-1">
            {forms.map((form) => (
              <div key={form.id} className="flex items-center justify-between py-1 px-2 rounded hover:bg-gray-50">
                <span className="text-sm text-gray-700">{form.name}</span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{form.submissions}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Shared Workspaces */}
        {/* <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Shared</h4>
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between py-1 px-2 rounded bg-gray-50">
              <span className="text-sm text-gray-900 font-medium">Vision - Louisville</span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">3</span>
            </div>
          </div>
        </div> */}
      </div>
    </aside>
  );
} 