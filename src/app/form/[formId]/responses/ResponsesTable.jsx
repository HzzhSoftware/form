import React, { useState, useRef, useCallback } from "react";
import { FieldDisplay } from "@/components/form/fields";
import formatDate from "@/utils/formatDate";

export default function ResponsesTable({ form, filteredSubmissions }) {
  // Get all field columns for width management
  const fieldColumns = form.cards.flatMap(card => 
    card.fields.filter(field => field.type !== 'static').map(field => ({
      cardId: card.cardId,
      fieldId: field.fieldId,
      label: field.label
    }))
  );

  // Initialize column widths
  const [columnWidths, setColumnWidths] = useState(() => {
    const initialWidths = {
      checkbox: 80,
      timestamp: 160
    };
    fieldColumns.forEach(field => {
      initialWidths[`${field.cardId}-${field.fieldId}`] = 250;
    });
    return initialWidths;
  });

  const [isResizing, setIsResizing] = useState(false);
  const [resizingColumn, setResizingColumn] = useState(null);
  const tableRef = useRef(null);

  const handleMouseDown = useCallback((e, columnKey) => {
    e.preventDefault();
    setIsResizing(true);
    setResizingColumn(columnKey);
    
    const startX = e.clientX;
    const startWidth = columnWidths[columnKey];

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newWidth = Math.max(100, startWidth + deltaX); // Minimum width of 100px
      
      setColumnWidths(prev => ({
        ...prev,
        [columnKey]: newWidth
      }));
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizingColumn(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [columnWidths]);

  return (
    <div className={`flex-1 bg-white flex flex-col overflow-hidden pb-2 ${isResizing ? 'select-none' : ''}`}>
      <div className="flex-1 overflow-auto">
        <div>
          <table ref={tableRef} className="divide-y divide-neutral-200 border border-neutral-200" style={{ width: 'max-content' }}>

            <thead className="bg-neutral-100 sticky top-0 z-10">
              <tr>
                <th 
                  className="px-4 py-3 text-left border-r border-neutral-200 relative"
                  style={{ width: `${columnWidths.checkbox}px` }}
                >
                  <input type="checkbox" className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
                  <div 
                    className={`absolute top-0 right-0 w-3 h-full cursor-col-resize hover:bg-primary-400 bg-transparent ${
                      resizingColumn === 'checkbox' ? 'bg-primary-500' : ''
                    }`}
                    onMouseDown={(e) => handleMouseDown(e, 'checkbox')}
                  />
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider border-r border-neutral-200 relative"
                  style={{ width: `${columnWidths.timestamp}px` }}
                >
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Response Time</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <div 
                    className={`absolute top-0 right-0 w-3 h-full cursor-col-resize hover:bg-primary-400 bg-transparent ${
                      resizingColumn === 'timestamp' ? 'bg-primary-500' : ''
                    }`}
                    onMouseDown={(e) => handleMouseDown(e, 'timestamp')}
                  />
                </th>
                {fieldColumns.map(field => (
                  <th 
                    key={`${field.cardId}-${field.fieldId}`} 
                    className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider border-r border-neutral-200 relative"
                    style={{ width: `${columnWidths[`${field.cardId}-${field.fieldId}`]}px` }}
                  >
                    <div className="flex items-start space-x-1">
                      <div className="w-3 h-3 bg-primary-500 rounded flex-shrink-0 mt-0.5"></div>
                      <span className="leading-tight break-words">{field.label}</span>
                    </div>
                    <div 
                      className={`absolute top-0 right-0 w-3 h-full cursor-col-resize hover:bg-primary-400 bg-transparent ${
                        resizingColumn === `${field.cardId}-${field.fieldId}` ? 'bg-primary-500' : ''
                      }`}
                      onMouseDown={(e) => handleMouseDown(e, `${field.cardId}-${field.fieldId}`)}
                    />
                  </th>
                ))}
              </tr>
            </thead>
            
            <tbody className="bg-white divide-y divide-neutral-200">
              {filteredSubmissions.map((submission, index) => (
                <tr key={submission.submissionId} className={`hover:bg-neutral-50 ${index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}`}>
                  <td 
                    className="px-4 py-4 border-r border-neutral-200"
                    style={{ width: `${columnWidths.checkbox}px` }}
                  >
                    <input type="checkbox" className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
                  </td>
                  <td 
                    className="px-4 py-4 text-sm text-neutral-900 border-r border-neutral-200"
                    style={{ width: `${columnWidths.timestamp}px` }}
                  >
                    {formatDate(submission.submittedAt)}
                  </td>
                  {fieldColumns.map(field => (
                    <td 
                      key={`${submission.submissionId}-${field.cardId}-${field.fieldId}`} 
                      className="px-4 py-4 border-r border-neutral-200"
                      style={{ width: `${columnWidths[`${field.cardId}-${field.fieldId}`]}px` }}
                    >
                      <div className="max-w-none">
                        <FieldDisplay field={field} value={submission[field.fieldId]} />
                      </div>
                    </td>
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
