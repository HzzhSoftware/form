import Header from "@/components/Header";
import React from "react";

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
