import React from 'react';

// Simple markdown parser for **bold** and *italic*
const parseMarkdown = (text: string): string => {
  if (!text) return '';
  
  // Escape HTML to prevent XSS
  const escapeHtml = (str: string) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  };
  
  let html = escapeHtml(text);
  const placeholders: { [key: string]: string } = {};
  let placeholderIndex = 0;
  
  // Handle ***bold italic*** first (must come before individual bold/italic)
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, (match, content) => {
    const key = `__PLACEHOLDER_${placeholderIndex++}__`;
    placeholders[key] = `<strong><em>${content}</em></strong>`;
    return key;
  });
  
  // Handle **bold**
  html = html.replace(/\*\*(.+?)\*\*/g, (match, content) => {
    const key = `__PLACEHOLDER_${placeholderIndex++}__`;
    placeholders[key] = `<strong>${content}</strong>`;
    return key;
  });
  
  // Handle *italic* (now safe since ** and *** are already replaced)
  html = html.replace(/\*(.+?)\*/g, (match, content) => {
    const key = `__PLACEHOLDER_${placeholderIndex++}__`;
    placeholders[key] = `<em>${content}</em>`;
    return key;
  });
  
  // Replace placeholders back
  Object.keys(placeholders).forEach(key => {
    html = html.replace(key, placeholders[key]);
  });
  
  return html;
};

// Component to render formatted text
const FormattedText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const html = parseMarkdown(text);
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
};

// 1. Builder component - for building/editing the form structure
interface MultipleChoiceFieldBuilderProps {
  field: any;
  onChange?: (value: string) => void;
  onOptionsChange?: (options: string[]) => void;
}

export const MultipleChoiceFieldBuilder: React.FC<MultipleChoiceFieldBuilderProps> = ({ 
  field, 
  onChange, 
  onOptionsChange,
}) => {
  const handleAddOption = () => {
    if (onOptionsChange && 'options' in field) {
      const newOptions = [...(field.options || []), `Option ${(field.options?.length || 0) + 1}`];
      onOptionsChange(newOptions);
    }
  };

  const handleDeleteOption = (index: number) => {
    if (onOptionsChange && 'options' in field) {
      // Prevent deleting the last option since schema requires at least 1
      if (field.options.length <= 1) return;
      const newOptions = field.options.filter((_: string, i: number) => i !== index);
      onOptionsChange(newOptions);
    }
  };

  const handleOptionChange = (index: number, newValue: string) => {
    if (onOptionsChange && 'options' in field) {
      const newOptions = [...field.options];
      newOptions[index] = newValue;
      onOptionsChange(newOptions);
    }
  };

  const handleOptionBlur = (index: number) => {
    if (onOptionsChange && 'options' in field && field.options[index]) {
      const trimmedValue = field.options[index].trim();
      if (trimmedValue !== field.options[index]) {
        const newOptions = [...field.options];
        newOptions[index] = trimmedValue;
        onOptionsChange(newOptions);
      }
    }
  };

  const insertFormatting = (index: number, format: 'bold' | 'italic') => {
    const input = document.getElementById(`option-input-${index}`) as HTMLInputElement;
    if (!input) return;
    
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const selectedText = field.options[index].substring(start, end);
    const before = field.options[index].substring(0, start);
    const after = field.options[index].substring(end);
    
    let formattedText = '';
    if (format === 'bold') {
      formattedText = selectedText ? `**${selectedText}**` : '****';
    } else {
      formattedText = selectedText ? `*${selectedText}*` : '**';
    }
    
    const newValue = before + formattedText + after;
    handleOptionChange(index, newValue);
    
    // Restore cursor position
    setTimeout(() => {
      input.focus();
      const newPosition = start + (selectedText ? formattedText.length : 2);
      input.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 'b') {
        e.preventDefault();
        insertFormatting(index, 'bold');
      } else if (e.key === 'i') {
        e.preventDefault();
        insertFormatting(index, 'italic');
      }
    }
  };

  const allowMultiple = field.allowMultiple || false;

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium text-neutral-700 mb-2">Options:</div>
      
      {'options' in field && field.options?.map((option: string, index: number) => (
        <div key={index} className="flex items-center space-x-2">
          <input
            type={allowMultiple ? "checkbox" : "radio"}
            name={`field-${field.fieldId}`}
            value={option}
            onChange={(e) => onChange?.(e.target.value)}
            className="text-primary-600 focus:ring-primary-500 disabled:cursor-not-allowed"
            disabled
          />
          <div className="flex-1 flex items-center space-x-1 border border-neutral-300 rounded">
            <button
              type="button"
              onClick={() => insertFormatting(index, 'bold')}
              className="p-1.5 hover:bg-neutral-100 transition-colors"
              title="Bold (Ctrl+B)"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => insertFormatting(index, 'italic')}
              className="p-1.5 hover:bg-neutral-100 transition-colors italic font-semibold"
              title="Italic (Ctrl+I)"
            >
              I
            </button>
            <div className="flex-1 border-l border-neutral-300">
              <input
                id={`option-input-${index}`}
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                onBlur={() => handleOptionBlur(index)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-full px-2 py-1 text-sm focus:ring-1 focus:ring-primary-500 focus:border-primary-500 border-0 focus:outline-none"
                placeholder="Option text"
              />
            </div>
          </div>
          <button
            onClick={() => handleDeleteOption(index)}
            disabled={field.options.length <= 1}
            className={`p-1 rounded transition-colors ${
              field.options.length <= 1 
                ? 'text-neutral-300 cursor-not-allowed' 
                : 'text-red-500 hover:text-red-700 hover:bg-red-50'
            }`}
            title={field.options.length <= 1 ? "Cannot delete last option" : "Delete option"}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
      
      <button
        onClick={handleAddOption}
        className="w-full px-3 py-2 text-sm border-2 border-dashed rounded-md transition-colors flex items-center justify-center space-x-2 border-neutral-300 text-neutral-600 hover:border-primary-400 hover:text-primary-600"
        title={"Add Option"}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span>Add Option</span>
      </button>
    </div>
  );
};

// 2. User Input component - for users filling out the form
interface MultipleChoiceFieldInputProps {
  field: any;
  value: string;
  onChange: (value: string) => void;
}

export const MultipleChoiceFieldInput: React.FC<MultipleChoiceFieldInputProps> = ({ 
  field, 
  value,
  onChange,
}) => {
  const allowMultiple = field.allowMultiple || false;
  
  // For multiple selections, parse value as comma-separated string
  const values = allowMultiple && value ? value.split(',').map(v => v.trim()) : [];

  const handleOptionChange = (option: string, checked: boolean) => {
    if (allowMultiple) {
      // Handle multiple selection with checkboxes
      if (checked) {
        const newValues = [...values, option];
        onChange(newValues.join(', '));
      } else {
        const newValues = values.filter(v => v !== option);
        onChange(newValues.join(', '));
      }
    } else {
      // Handle single selection with radio buttons
      onChange(option);
    }
  };

  if (allowMultiple) {
    // Render checkboxes for multiple selection
    return (
      <div className="space-y-2">
        {'options' in field && field.options?.map((option: string, index: number) => (
          <label key={index} className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              value={option}
              checked={values.includes(option)}
              onChange={(e) => handleOptionChange(option, e.target.checked)}
              required={field.isRequired && values.length === 0}
              className="mr-2 text-primary-600 focus:ring-primary-500 flex-shrink-0"
            />
            <span className="flex-1">
              <FormattedText text={option} />
            </span>
          </label>
        ))}
      </div>
    );
  }

  // Render radio buttons for single selection
  return (
    <div className="space-y-2">
      {'options' in field && field.options?.map((option: string, index: number) => (
        <label key={index} className="flex items-center cursor-pointer">
          <input
            type="radio"
            name={`field-${field.fieldId}`}
            value={option}
            checked={value === option}
            onChange={(e) => onChange(e.target.value)}
            required={field.isRequired}
            className="mr-2 text-primary-600 focus:ring-primary-500 flex-shrink-0"
          />
          <span className="flex-1">
            <FormattedText text={option} />
          </span>
        </label>
      ))}
    </div>
  );
};

// 3. Display component - for showing submitted values in responses table
interface MultipleChoiceFieldDisplayProps {
  field: any;
  value: string;
}

export const MultipleChoiceFieldDisplay: React.FC<MultipleChoiceFieldDisplayProps> = ({ 
  field, 
  value 
}) => {
  const allowMultiple = field.allowMultiple || false;
  
  if (allowMultiple && value) {
    // Handle multiple values (comma-separated)
    const values = value.split(',').map(v => v.trim()).filter(v => v);
    
    return (
      <div className="text-sm text-neutral-800">
        {values.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {values.map((val, index) => (
              <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                <FormattedText text={val} />
              </span>
            ))}
          </div>
        ) : (
          "-"
        )}
      </div>
    );
  }
  
  // Handle single value
  return (
    <div className="text-sm text-neutral-800">
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
        {value ? <FormattedText text={value} /> : "-"}
      </span>
    </div>
  );
};

// Default export for backward compatibility (builder)
export default MultipleChoiceFieldBuilder;
