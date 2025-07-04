import React from "react";

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center h-full">
      <div className="max-w-6xl container w-full items-center justify-center flex-col">
        {children}
      </div>
    </div>
  );
}
