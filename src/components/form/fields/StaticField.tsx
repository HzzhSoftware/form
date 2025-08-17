import React from 'react';

// 1. Builder component - for building/editing the form structure
interface StaticFieldBuilderProps {
  field: any;
  onChange?: (value: string) => void;
  onFieldUpdate?: (updates: Partial<any>) => void;
}

export const StaticFieldBuilder: React.FC<StaticFieldBuilderProps> = ({ 
  field, 
  onChange, 
  onFieldUpdate,
}) => {
  const handleTitleChange = (newTitle: string) => {
    if (onFieldUpdate) {
      onFieldUpdate({ title: newTitle });
    } else if (onChange) {
      // Fallback to onChange if onFieldUpdate is not available
      onChange(newTitle);
    }
  };

  const handleDescriptionChange = (newDescription: string) => {
    if (onFieldUpdate) {
      onFieldUpdate({ description: newDescription });
    } else if (onChange) {
      // Fallback to onChange if onFieldUpdate is not available
      onChange(newDescription);
    }
  };

  const handleImageChange = (newImage: string) => {
    if (onFieldUpdate) {
      onFieldUpdate({ image: newImage });
    } else if (onChange) {
      // Fallback to onChange if onFieldUpdate is not available
      onChange(newImage);
    }
  };

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium text-neutral-700 mb-2">Static Content:</div>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-neutral-600 mb-1">Title</label>
          <input
            type="text"
            value={field.title || ''}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter title"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-600 mb-1">Description (optional)</label>
          <textarea
            value={field.description || ''}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter description"
            rows={3}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-600 mb-1">Image URL (optional)</label>
          <input
            type="url"
            value={field.image || ''}
            onChange={(e) => handleImageChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>
    </div>
  );
};

// 2. User Input component - for users filling out the form (static fields don't have user input)
interface StaticFieldInputProps {
  field: any;

}

export const StaticFieldInput: React.FC<StaticFieldInputProps> = ({ 
  field, 
}) => {
  // Static fields don't have user input - they just display content
  return (
    <div className="space-y-2">
      {field.title && (
        <div className="text-lg font-medium text-neutral-900">{field.title}</div>
      )}
      {field.description && (
        <div className="text-sm text-neutral-600">{field.description}</div>
      )}
      {field.image && (
        <div className="mt-2">
          <img 
            src={field.image} 
            alt={field.title || 'Static content image'} 
            className="max-w-full h-auto rounded-md"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}
    </div>
  );
};

// 3. Display component - for showing submitted values in responses table
interface StaticFieldDisplayProps {
  field: any;
  value: string;
}

export const StaticFieldDisplay: React.FC<StaticFieldDisplayProps> = ({ 
  field, 
  value 
}) => {
  return (
    <div className="text-sm text-neutral-800">
      <span className="text-neutral-500 italic">Static content - no response needed</span>
    </div>
  );
};

// Default export for backward compatibility (builder)
export default StaticFieldBuilder;
