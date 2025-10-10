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
                isRequired: false,
                options: ["Choice 1", "Choice 2"],
                allowMultiple: false,
                isRandomized: false,
                allowOther: false,
                isVerticalAlignment: false
              }
            ]
          }
        ],
        submissions: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        starts: 0,
        orgId: "KYCOMBINATOR",
        userEmail: "DAN@KYCOMBINATOR.COM",
        status: "draft"
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
      <div className="p-6 border-b border-neutral-200">
        <button 
        onClick={handleCreateForm}
        className="w-full bg-primary-500 text-primary-on-500 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-primary-600 transition-colors hover:cursor-pointer">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">Create a new form</span>
        </button>
      </div>

      {/* Workspaces */}
      <div className="flex-1 p-6">
        {/* Private Workspaces */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Forms</h4>
            <svg className="w-4 h-4 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="space-y-1">
            {forms.map((form) => (
              <div key={form.id} className="flex items-center justify-between py-1 px-2 rounded hover:bg-neutral-50">
                <span className="text-sm text-neutral-700">{form.name}</span>
                <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-1 rounded">{form.submissions}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
} 