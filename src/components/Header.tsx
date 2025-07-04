"use client";
import Link from "next/link";

export default function Header() {
    const createForm = () => {
      console.log("create form");
    }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-primary-500 border-b text-primary-on-500">
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-xl font-bold">
          KyCombinator
        </Link>
        <nav className="space-x-6 ml-6">
          <Link href="/admin" className="hover:text-gray-900">Forms</Link>
        </nav>
        <button className="btn btn-secondary" onClick={createForm}>
          Create Form    
        </button>
      </div>
    </header>
  );
}