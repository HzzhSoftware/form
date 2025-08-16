"use client"

import React, { useState, useEffect } from "react";
import { listSubmissions } from "@/services/form";
import { useParams } from "next/navigation";
import { useFormBuilderContext } from "../../components/FormBuilderContext";
import ResponsesTable from "./ResponsesTable";

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

  const formatDate = (isoDateString) => {
    try {
      const date = new Date(isoDateString);
      if (isNaN(date.getTime())) {
        return "-";
      }
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (err) {
      return "-";
    }
  };

  const filteredSubmissions = submissions.filter(submission => {
    if (!searchTerm) return true;
    
    // Search through all submission data
    const searchableText = Object.values(submission)
      .filter(value => typeof value === 'string')
      .join(' ')
      .toLowerCase();
    
    return searchableText.includes(searchTerm.toLowerCase());
  });

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
      <aside className="w-80 bg-white border-r border-neutral-200 p-6">
        {/* Navigation Tabs */}
        <div className="space-y-1 mb-6">
          <div className="flex items-center space-x-2 p-3 text-neutral-600 hover:bg-neutral-50 rounded cursor-pointer">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="text-sm">Summary</span>
          </div>
          <div className="flex items-center space-x-2 p-3 text-primary-600 bg-primary-50 border-r-2 border-primary-600 rounded cursor-pointer">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 00.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm font-medium">Responses [{submissions.length}]</span>
          </div>
        </div>

        {/* Search and Filters */}
        {/* <div className="space-y-4">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search responses"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex space-x-2">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="flex-1 px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option>All time</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
            <button className="px-3 py-2 border border-neutral-200 rounded-lg text-sm hover:bg-neutral-50">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
              </svg>
            </button>
          </div>
 
          <div className="flex space-x-2 pt-2">
            <button className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 rounded">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
            <button className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 rounded">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </button>
            <button className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 rounded">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3" />
              </svg>
            </button>
          </div>
        </div> */}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Table */}
        <ResponsesTable 
          form={form}
          filteredSubmissions={filteredSubmissions}
          formatDate={formatDate}
        />
      </div>
    </div>
  );
}
