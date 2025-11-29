"use client"

import React, { useState, useEffect } from "react";
import { listSubmissions } from "@/services/form";
import { useParams } from "next/navigation";
import { useFormBuilderContext } from "../../components/FormBuilderContext";
import ResponsesTable from "./ResponsesTable";
import formatDate from "@/utils/formatDate";
import Link from "next/link";

export default function ResponsesPage() {
  const params = useParams();
  const formId = params.formId;
  const { form } = useFormBuilderContext();
  
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    const loadSubmissions = async () => {
      try {
        const submissionsData = await listSubmissions({formId, page: 1, limit: 20});
        setSubmissions(submissionsData);
      } catch (err) {
        console.error("Failed to load submissions:", err);
      } finally {
        setLoading(false);
      }
    };
    
    loadSubmissions();
  }, [formId]);

  const filteredSubmissions = submissions.filter(submission => {
    if (!searchTerm) return true;
    
    // Search through all submission data
    const searchableText = Object.values(submission)
      .filter(value => typeof value === 'string')
      .join(' ')
      .toLowerCase();
    
    return searchableText.includes(searchTerm.toLowerCase());
  });

  const exportToCSV = () => {
    if (!form || !filteredSubmissions.length) return;

    // Create CSV headers
    const headers = ['Response Time'];
    form.cards.forEach(card => {
      card.fields.forEach(field => {
        headers.push(field.label);
      });
    });

    // Create CSV rows
    const csvRows = [headers.join(',')];
    
    filteredSubmissions.forEach(submission => {
      const row = [formatDate(submission.submittedAt)];
      
      form.cards.forEach(card => {
        card.fields.forEach(field => {
          let value = submission[field.fieldId] || '';
          
          // Handle different field types for CSV
          if (Array.isArray(value)) {
            value = value.join('; ');
          } else if (typeof value === 'object' && value !== null) {
            value = JSON.stringify(value);
          }
          
          // Escape commas and quotes in CSV
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            value = `"${value.replace(/"/g, '""')}"`;
          }
          
          row.push(value);
        });
      });
      
      csvRows.push(row.join(','));
    });

    // Create and download CSV file
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${form.title || 'form'}_responses_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!form) {
    return <div className="text-center text-red-600 text-xl">Form not found</div>;
  }

  return (
    <div className="flex min-h-[calc(100vh-5rem)] bg-neutral-50">
      {/* Left Sidebar */}
      <aside className="w-[250px] flex-shrink-0 bg-white border-r border-neutral-200 p-6">
        {/* Navigation Tabs */}
        <div className="space-y-1 mb-6">
          <Link href={`/form/${formId}/responses`}>
            <div className="flex items-center space-x-2 p-3 text-neutral-600 hover:bg-neutral-50 rounded cursor-pointer">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-sm">Summary</span>
            </div>
          </Link>
          <div className="flex items-center space-x-2 p-3 text-primary-600 bg-primary-50 border-r-2 border-primary-600 rounded cursor-pointer">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 00.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm font-medium">Responses [{submissions.length}]</span>
          </div>
          <Link href={`/form/${formId}/analyze`}>
            <div className="flex items-center space-x-2 p-3 text-neutral-600 hover:bg-neutral-50 rounded cursor-pointer">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-sm">Analyze</span>
            </div>
          </Link>
        </div>

        {/* Export Button */}
        <div className="mb-6">
          <button
            onClick={exportToCSV}
            disabled={!filteredSubmissions.length}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Export to CSV</span>
          </button>
          {filteredSubmissions.length > 0 && (
            <p className="text-xs text-neutral-500 text-center mt-2">
              Export {filteredSubmissions.length} response{filteredSubmissions.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Table */}
        <ResponsesTable 
          form={form}
          filteredSubmissions={filteredSubmissions}
        />
      </div>
    </div>
  );
}
