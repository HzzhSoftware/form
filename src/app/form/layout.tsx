// /form/layout.tsx this is a protected route
// to access all forms, you need to be logged in

import React from "react";

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
