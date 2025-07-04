import React from 'react';

interface FormLoadingProps {
  message?: string;
}

export default function FormLoading({ message = "Loading form..." }: FormLoadingProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
        <p className="text-foreground-500 text-lg font-medium">{message}</p>
        <p className="text-foreground-400 text-sm mt-2">Please wait while we prepare your form</p>
      </div>
    </div>
  );
} 