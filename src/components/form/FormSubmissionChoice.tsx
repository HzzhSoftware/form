"use client";

import React from "react";

interface FormSubmissionChoiceProps {
  onStartNew: () => void;
  onContinuePrevious: () => void;
  formName?: string;
}

export default function FormSubmissionChoice({
  onStartNew,
  onContinuePrevious,
  formName,
}: FormSubmissionChoiceProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground-200 mb-2">
            {formName ? `Continue ${formName}?` : "Continue Previous Submission?"}
          </h2>
          <p className="text-foreground-600">
            We found a previous submission. Would you like to continue where you left off or start fresh?
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={onContinuePrevious}
            className="w-full bg-primary-900 hover:bg-primary-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Continue Previous Submission
          </button>
          <button
            onClick={onStartNew}
            className="w-full bg-primary-200 hover:bg-primary-300 text-foreground-900 font-medium py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Start New Submission
          </button>
        </div>
      </div>
    </div>
  );
}

