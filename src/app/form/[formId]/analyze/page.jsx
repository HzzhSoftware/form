"use client"

import React, { useState, useEffect } from "react";
import { listSubmissions } from "@/services/form";
import { useParams } from "next/navigation";
import { useFormBuilderContext } from "../../components/FormBuilderContext";
import Link from "next/link";
import formatDate from "@/utils/formatDate";

export default function AnalyzePage() {
  const params = useParams();
  const formId = params.formId;
  const { form } = useFormBuilderContext();
  
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSubmissions = async () => {
      try {
        const submissionsData = await listSubmissions({formId, page: 1, limit: 1000});
        setSubmissions(submissionsData);
      } catch (err) {
        console.error("Failed to load submissions:", err);
      } finally {
        setLoading(false);
      }
    };
    
    loadSubmissions();
  }, [formId]);

  // Calculate aggregates for each field
  const calculateAggregates = () => {
    if (!form || !submissions.length) return {};

    const aggregates = {};
    
    form.cards.forEach(card => {
      card.fields.forEach(field => {
        if (field.type === 'static') return;
        
        const fieldId = field.fieldId;
        const values = submissions
          .map(s => s[fieldId])
          .filter(v => v !== undefined && v !== null && v !== '');

        if (values.length === 0) {
          aggregates[fieldId] = { type: field.type, label: field.label, empty: true };
          return;
        }

        switch (field.type) {
          case 'yes_no':
            const yesCount = values.filter(v => v === true || v === 'true' || v === 'yes').length;
            const noCount = values.length - yesCount;
            aggregates[fieldId] = {
              type: 'yes_no',
              label: field.label,
              total: values.length,
              yes: yesCount,
              no: noCount,
              yesPercent: ((yesCount / values.length) * 100).toFixed(1),
              noPercent: ((noCount / values.length) * 100).toFixed(1)
            };
            break;

          case 'multiple_choice':
            const choiceCounts = {};
            values.forEach(v => {
              const key = String(v);
              choiceCounts[key] = (choiceCounts[key] || 0) + 1;
            });
            // Get all unique options from field definition and responses
            const allChoiceOptions = new Set([
              ...(field.options || []),
              ...Object.keys(choiceCounts)
            ]);
            aggregates[fieldId] = {
              type: 'multiple_choice',
              label: field.label,
              total: values.length,
              options: Array.from(allChoiceOptions),
              counts: choiceCounts,
              percentages: Object.keys(choiceCounts).reduce((acc, key) => {
                acc[key] = ((choiceCounts[key] / values.length) * 100).toFixed(1);
                return acc;
              }, {})
            };
            break;

          case 'multiple_select':
            const selectCounts = {};
            values.forEach(v => {
              const selections = Array.isArray(v) ? v : [v];
              selections.forEach(sel => {
                const key = String(sel);
                selectCounts[key] = (selectCounts[key] || 0) + 1;
              });
            });
            // Get all unique options from field definition and responses
            const allSelectOptions = new Set([
              ...(field.options || []),
              ...Object.keys(selectCounts)
            ]);
            aggregates[fieldId] = {
              type: 'multiple_select',
              label: field.label,
              total: values.length,
              options: Array.from(allSelectOptions),
              counts: selectCounts,
              percentages: Object.keys(selectCounts).reduce((acc, key) => {
                acc[key] = ((selectCounts[key] / values.length) * 100).toFixed(1);
                return acc;
              }, {})
            };
            break;

          case 'number':
            const numbers = values.map(v => {
              const num = typeof v === 'string' ? parseFloat(v) : v;
              return isNaN(num) ? null : num;
            }).filter(n => n !== null);
            
            if (numbers.length > 0) {
              const sorted = [...numbers].sort((a, b) => a - b);
              const sum = numbers.reduce((a, b) => a + b, 0);
              const avg = sum / numbers.length;
              const median = sorted.length % 2 === 0
                ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
                : sorted[Math.floor(sorted.length / 2)];
              
              aggregates[fieldId] = {
                type: 'number',
                label: field.label,
                total: numbers.length,
                average: avg.toFixed(2),
                median: median.toFixed(2),
                min: Math.min(...numbers).toFixed(2),
                max: Math.max(...numbers).toFixed(2),
                sum: sum.toFixed(2)
              };
            }
            break;

          case 'date':
            const dates = values.map(v => {
              const date = new Date(v);
              return isNaN(date.getTime()) ? null : date;
            }).filter(d => d !== null);
            
            if (dates.length > 0) {
              const sorted = [...dates].sort((a, b) => a.getTime() - b.getTime());
              aggregates[fieldId] = {
                type: 'date',
                label: field.label,
                total: dates.length,
                earliest: sorted[0],
                latest: sorted[sorted.length - 1],
                dateDistribution: getDateDistribution(dates)
              };
            }
            break;

          case 'short_text':
          case 'long_text':
          case 'email':
          case 'phone':
          case 'url':
            const textValues = values.map(v => String(v));
            const totalChars = textValues.reduce((sum, v) => sum + v.length, 0);
            const totalWords = textValues.reduce((sum, v) => {
              const words = v.trim().split(/\s+/).filter(w => w.length > 0);
              return sum + words.length;
            }, 0);
            
            aggregates[fieldId] = {
              type: field.type,
              label: field.label,
              total: textValues.length,
              avgLength: (totalChars / textValues.length).toFixed(1),
              avgWords: (totalWords / textValues.length).toFixed(1),
              totalChars,
              totalWords
            };
            break;

          default:
            aggregates[fieldId] = {
              type: field.type,
              label: field.label,
              total: values.length,
              unique: new Set(values.map(v => String(v))).size
            };
        }
      });
    });

    return aggregates;
  };

  const getDateDistribution = (dates) => {
    const distribution = {};
    dates.forEach(date => {
      const key = date.toISOString().split('T')[0];
      distribution[key] = (distribution[key] || 0) + 1;
    });
    return distribution;
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

  const aggregates = calculateAggregates();
  const totalResponses = submissions.length;
  const fieldAggregates = Object.values(aggregates);

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
          <Link href={`/form/${formId}/responses`}>
            <div className="flex items-center space-x-2 p-3 text-neutral-600 hover:bg-neutral-50 rounded cursor-pointer">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 00.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm">Responses [{submissions.length}]</span>
            </div>
          </Link>
          <div className="flex items-center space-x-2 p-3 text-primary-600 bg-primary-50 border-r-2 border-primary-600 rounded cursor-pointer">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="text-sm font-medium">Analyze</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 overflow-y-auto">
        <div className="max-w-6xl w-full mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Response Analysis</h1>
            <p className="text-neutral-600">Aggregate statistics and insights from {totalResponses} response{totalResponses !== 1 ? 's' : ''}</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600 mb-1">Total Responses</p>
                  <p className="text-3xl font-bold text-neutral-900">{totalResponses}</p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 00.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600 mb-1">Fields Analyzed</p>
                  <p className="text-3xl font-bold text-neutral-900">{fieldAggregates.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600 mb-1">Completion Rate</p>
                  <p className="text-3xl font-bold text-neutral-900">
                    {totalResponses > 0 ? '100%' : '0%'}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Field Analysis */}
          {fieldAggregates.length === 0 ? (
            <div className="bg-white rounded-lg border border-neutral-200 p-12 text-center">
              <svg className="w-16 h-16 text-neutral-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-neutral-600 text-lg">No responses yet</p>
              <p className="text-neutral-500 text-sm mt-2">Once you receive responses, aggregate statistics will appear here.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {fieldAggregates.map((agg, index) => (
                <div key={index} className="bg-white rounded-lg border border-neutral-200 p-6">
                  <h2 className="text-xl font-semibold text-neutral-900 mb-4">{agg.label}</h2>
                  
                  {agg.empty ? (
                    <p className="text-neutral-500">No responses for this field</p>
                  ) : (
                    <div className="space-y-4">
                      {/* Yes/No Field */}
                      {agg.type === 'yes_no' && (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-neutral-600">Yes: {agg.yes} ({agg.yesPercent}%)</span>
                            <span className="text-sm text-neutral-600">No: {agg.no} ({agg.noPercent}%)</span>
                          </div>
                          <div className="w-full bg-neutral-200 rounded-full h-6 flex overflow-hidden">
                            <div 
                              className="bg-green-500 flex items-center justify-center text-white text-xs font-medium"
                              style={{ width: `${agg.yesPercent}%` }}
                            >
                              {agg.yesPercent > 10 && `${agg.yesPercent}%`}
                            </div>
                            <div 
                              className="bg-red-500 flex items-center justify-center text-white text-xs font-medium"
                              style={{ width: `${agg.noPercent}%` }}
                            >
                              {agg.noPercent > 10 && `${agg.noPercent}%`}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Multiple Choice Field */}
                      {agg.type === 'multiple_choice' && (
                        <div className="space-y-3">
                          {agg.options.map((option, optIndex) => {
                            const count = agg.counts[option] || 0;
                            const percent = agg.percentages[option] || '0';
                            return (
                              <div key={optIndex}>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium text-neutral-700">{option}</span>
                                  <span className="text-sm text-neutral-600">{count} ({percent}%)</span>
                                </div>
                                <div className="w-full bg-neutral-200 rounded-full h-4">
                                  <div 
                                    className="bg-primary-500 h-4 rounded-full flex items-center justify-end pr-2"
                                    style={{ width: `${percent}%` }}
                                  >
                                    {parseFloat(percent) > 15 && (
                                      <span className="text-white text-xs">{percent}%</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Multiple Select Field */}
                      {agg.type === 'multiple_select' && (
                        <div className="space-y-3">
                          {agg.options.map((option, optIndex) => {
                            const count = agg.counts[option] || 0;
                            const percent = agg.percentages[option] || '0';
                            return (
                              <div key={optIndex}>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium text-neutral-700">{option}</span>
                                  <span className="text-sm text-neutral-600">{count} ({percent}%)</span>
                                </div>
                                <div className="w-full bg-neutral-200 rounded-full h-4">
                                  <div 
                                    className="bg-blue-500 h-4 rounded-full flex items-center justify-end pr-2"
                                    style={{ width: `${percent}%` }}
                                  >
                                    {parseFloat(percent) > 15 && (
                                      <span className="text-white text-xs">{percent}%</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Number Field */}
                      {agg.type === 'number' && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-xs text-neutral-600 mb-1">Average</p>
                            <p className="text-lg font-semibold text-neutral-900">{agg.average}</p>
                          </div>
                          <div>
                            <p className="text-xs text-neutral-600 mb-1">Median</p>
                            <p className="text-lg font-semibold text-neutral-900">{agg.median}</p>
                          </div>
                          <div>
                            <p className="text-xs text-neutral-600 mb-1">Min</p>
                            <p className="text-lg font-semibold text-neutral-900">{agg.min}</p>
                          </div>
                          <div>
                            <p className="text-xs text-neutral-600 mb-1">Max</p>
                            <p className="text-lg font-semibold text-neutral-900">{agg.max}</p>
                          </div>
                        </div>
                      )}

                      {/* Date Field */}
                      {agg.type === 'date' && (
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-neutral-600 mb-1">Earliest</p>
                              <p className="text-sm font-medium text-neutral-900">
                                {formatDate(agg.earliest.toISOString())}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-neutral-600 mb-1">Latest</p>
                              <p className="text-sm font-medium text-neutral-900">
                                {formatDate(agg.latest.toISOString())}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Text Fields */}
                      {(agg.type === 'short_text' || agg.type === 'long_text' || agg.type === 'email' || agg.type === 'phone' || agg.type === 'url') && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-xs text-neutral-600 mb-1">Avg Length</p>
                            <p className="text-lg font-semibold text-neutral-900">{agg.avgLength} chars</p>
                          </div>
                          <div>
                            <p className="text-xs text-neutral-600 mb-1">Avg Words</p>
                            <p className="text-lg font-semibold text-neutral-900">{agg.avgWords}</p>
                          </div>
                          <div>
                            <p className="text-xs text-neutral-600 mb-1">Total Characters</p>
                            <p className="text-lg font-semibold text-neutral-900">{agg.totalChars.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-neutral-600 mb-1">Total Words</p>
                            <p className="text-lg font-semibold text-neutral-900">{agg.totalWords.toLocaleString()}</p>
                          </div>
                        </div>
                      )}

                      {/* Generic Field */}
                      {!['yes_no', 'multiple_choice', 'multiple_select', 'number', 'date', 'short_text', 'long_text', 'email', 'phone', 'url'].includes(agg.type) && (
                        <div>
                          <p className="text-sm text-neutral-600">
                            Total responses: {agg.total}
                            {agg.unique !== undefined && ` • Unique values: ${agg.unique}`}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

