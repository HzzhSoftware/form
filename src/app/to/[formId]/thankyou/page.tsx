"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getForm } from "@/services/form";
import { Form } from "@hzzhsoftware/types-form";
import FormLoading from "@/components/form/FormLoading";

export default function ThankYouPage() {
  const params = useParams();
  const formId = params?.formId as string;
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadForm() {
      if (!formId) {
        setLoading(false);
        return;
      }

      try {
        const formData = await getForm({ formId, custom: false });
        setForm(formData);
      } catch (err) {
        console.error("Failed to load form:", err);
      } finally {
        setLoading(false);
      }
    }

    loadForm();
  }, [formId]);

  const multipleSubmissions = form && 'multipleSubmissions' in form 
    ? (form as Form & { multipleSubmissions?: boolean }).multipleSubmissions ?? true
    : true;

  if (loading) {
    return <FormLoading message="Loading..." />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8">
      <h1 className="text-3xl font-bold mb-4">🎉 Thank you!</h1>
      <p className="text-gray-600 mb-6">
        Your submission has been received. We'll be in touch if needed.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        {multipleSubmissions && formId && (
          <Link
            href={`/to/${formId}`}
            className="inline-block bg-primary-500 text-primary-on-500 btn rounded hover:bg-primary-700 hover:text-primary-on-700 transition text-center"
          >
            Submit Again
          </Link>
        )}
        <Link
          href="/"
          className="inline-block bg-primary-500 text-primary-on-500 btn rounded hover:bg-primary-700 hover:text-primary-on-700 transition text-center"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
