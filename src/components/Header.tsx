"use client";
import Link from "next/link";

export default function Header() {
    const createForm = () => {
      console.log("create form");
    }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-neutral-500 border-b text-primary-on-500">
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-xl font-bold">
          KyCombinator
        </Link>
        <Link href="/form" className="btn btn-primary">
          Forms
        </Link>
        <Link href="/form/create" className="btn btn-secondary">Create Form</Link>
      </div>
    </header>
  );
}