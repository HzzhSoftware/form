import React from 'react';
import { notFound } from 'next/navigation';

export default async function CustomFormPage({ params }) {
  const { customFormId } = params;

  if (!customFormId) return notFound();

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <main className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Form: {customFormId}</h1>
          <p className="text-lg text-gray-600 mb-6">
            This is a generic form page for the form ID:{' '}
            <span className="font-mono bg-gray-100 px-2 py-1 rounded">
              {customFormId}
            </span>
          </p>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-500">
              You can customize this page to fetch and display form details based on the ID in the URL.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
