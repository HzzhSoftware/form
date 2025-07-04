import React from "react";
import Header from "@/components/Header";

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex h-full flex-col">
      <Header />
      {children}
    </div>
  );
}
