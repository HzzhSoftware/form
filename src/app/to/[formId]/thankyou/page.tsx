"use client";

import React from "react";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8">
        <h1 className="text-3xl font-bold mb-4">🎉 Thank you!</h1>
        <p className="text-gray-600 mb-6">
          Your submission has been received. We’ll be in touch if needed.
        </p>
        <Link
          href="/"
          className="inline-block bg-primary-500 text-primary-on-500 btn rounded hover:bg-primary-700 hover:text-primary-on-700 transition"
        >
          Go back home
        </Link>
    </div>
  );
}
