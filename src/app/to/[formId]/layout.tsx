import React from "react";

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto">
        {children}
      </div>
    </div>
  );
}
