"use client";

import React from "react";
import { useFormContext } from "../FormContext";

export default function FormProgressBar() {
  const { currentCardIdx, totalCards } = useFormContext();

  const progress = ((currentCardIdx + 1) / totalCards) * 100;

  return (
    <div className="absolute top-0 left-0 right-0 w-full h-2 bg-background-200 rounded-full overflow-hidden z-50">
      <div
        className="h-full bg-primary-500 transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
