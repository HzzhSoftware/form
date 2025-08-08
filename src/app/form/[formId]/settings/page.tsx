"use client"

import React, { useState, useEffect } from "react";
import { useFormContext } from "../../components/FormContext";
import { updateForm } from "@/services/form";
import { OGMetadata } from "@hzzhsoftware/types-form";

export default function SettingsPage() {
  const { form } = useFormContext();
  
  const [metadata, setMetadata] = useState<Partial<OGMetadata>>({
    title: form.ogMetadata?.title || "",
    description: form.ogMetadata?.description || "",  
    image: form.ogMetadata?.image || ""
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  useEffect(() => {
    setMetadata({
      title: form.ogMetadata?.title || "",
      description: form.ogMetadata?.description || "",
      image: form.ogMetadata?.image || ""
    });
  }, [form.ogMetadata]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus("Saving...");
    
    try {
      const updatedForm = { 
        ...form,
        ogMetadata: {
          ...form.ogMetadata,
          ...metadata
        }
      };
      
      await updateForm(form.id, updatedForm);
      setSaveStatus("Saved successfully!");
      
      setTimeout(() => {
        setSaveStatus("");
      }, 2000);
    } catch (error) {
      console.error("Error saving metadata:", error);
      setSaveStatus("Error saving changes");
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setMetadata(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="flex items-center justify-center">
      <div className="container w-full max-w-6xl p-8">  
        <div className="space-y-8">
          {/* Metadata Section */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Form Metadata</h2>
            <p className="text-sm text-neutral-600 mb-6">
              These settings control how your form appears when shared on social media and search results.
            </p>
            
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Form Title
                </label>
                <input
                  type="text"
                  value={metadata.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter form title"
                />
                <p className="text-xs text-neutral-500 mt-1">
                  This will be used as the page title and in social media previews
                </p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Form Description
                </label>
                <textarea
                  value={metadata.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter form description"
                />
                <p className="text-xs text-neutral-500 mt-1">
                  This will be used in search results and social media previews
                </p>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Featured Image URL
                </label>
                <input
                  type="url"
                  value={metadata.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-xs text-neutral-500 mt-1">
                  This image will be used in social media previews. Recommended size: 1200x630 pixels
                </p>
              </div>

              {/* Image Preview */}
              {metadata.image && (
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Image Preview
                  </label>
                  <div className="border border-neutral-300 rounded-md bg-neutral-50 flex items-center justify-center h-48 w-96">
                    <img
                      src={metadata.image}
                      alt="Form preview"
                      className="h-full w-full object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center space-x-4 pt-6 border-t border-neutral-200">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <div className="flex items-center space-x-2">
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Saving...</span>
                </div>
              ) : (
                "Save Changes"
              )}
            </button>
            
            {saveStatus && (
              <span className={`text-sm ${
                saveStatus.includes('Error') ? 'text-red-600' : 'text-green-600'
              }`}>
                {saveStatus}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 