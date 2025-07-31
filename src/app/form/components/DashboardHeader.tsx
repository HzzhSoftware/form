"use client";
import Link from "next/link";

export default function DashboardHeader() {
  return (
    <header className="border-b border-neutral-300 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-neutral-900">KyCombinator</span>
              <svg className="w-4 h-4 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex space-x-8">
            <Link href="/form" className="text-primary-500 border-b-2 border-primary-500 pb-2 px-1 text-sm font-medium">
              Forms
            </Link>
          </nav>
        </div>

        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-700 font-medium text-sm">DR</span>
          </div>
        </div>
      </div>
    </header>
  );
} 