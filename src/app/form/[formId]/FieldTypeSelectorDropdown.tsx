"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { FormFieldType } from "@hzzhsoftware/types-form";

type Option = {
  value: FormFieldType;
  label: string;
  description: string;
  glyph: string; // simple, no extra packages
};

const OPTIONS: Option[] = [
  { value: "short_text",  label: "Short Text",     description: "Single line input",            glyph: "T" },
  { value: "long_text",   label: "Long Text",      description: "Multi-line textarea",         glyph: "¶" },
  { value: "email",       label: "Email",          description: "Email address field",         glyph: "@" },
  { value: "phone",       label: "Phone",          description: "Phone number input",          glyph: "📞" },
  { value: "number",      label: "Number",         description: "Numeric input",               glyph: "#" },
  { value: "url",         label: "URL",            description: "Website link input",          glyph: "🔗" },
  { value: "date",        label: "Date",           description: "Date picker",                 glyph: "📅" },
  { value: "yes_no",      label: "Yes / No",       description: "Boolean choice",              glyph: "✓" },
  { value: "multiple_choice", label: "Multiple Choice", description: "Single selection from options", glyph: "○" },
  { value: "multiple_select", label: "Multiple Select", description: "Multiple selections", glyph: "☑" },
  { value: "static",      label: "Static Content", description: "Display-only text/media",     glyph: "📄" },
];

export function FieldTypeSelectDropdown({
  value,
  onChange,
  className = "",
}: {
  value: FormFieldType;
  onChange: (v: FormFieldType) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(
    Math.max(0, OPTIONS.findIndex(o => o.value === value))
  );
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const current = useMemo(
    () => OPTIONS.find(o => o.value === value) ?? OPTIONS[0],
    [value]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); btnRef.current?.focus(); }
      if (e.key === "ArrowDown") { e.preventDefault(); setHighlight(h => Math.min(OPTIONS.length - 1, h + 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setHighlight(h => Math.max(0, h - 1)); }
      if (e.key === "Enter") {
        e.preventDefault();
        const opt = OPTIONS[highlight];
        if (opt) { onChange(opt.value); setOpen(false); btnRef.current?.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, highlight, onChange]);

  useEffect(() => {
    if (!open) return;
    // keep highlighted item in view
    const el = listRef.current?.querySelector<HTMLButtonElement>(
      `[data-index="${highlight}"]`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [open, highlight]);

  return (
    <div className={`relative ${className}`}>
      {/* Button */}
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
        className="group w-full rounded-xl border border-border bg-surface text-foreground px-3 py-2 shadow-sm hover:bg-surface-muted transition focus:outline-none focus:ring-2 focus:ring-primary-600 flex items-center gap-3"
      >
        <span className="grid h-9 w-9 place-content-center rounded-lg bg-primary-100 text-primary-on-100 font-semibold">
          {current.glyph}
        </span>
        <span className="flex-1 text-left">
          <span className="block text-sm font-medium">{current.label}</span>
          <span className="block text-xs text-foreground-500">{current.description}</span>
        </span>
        <svg
          className={`h-5 w-5 text-foreground-500 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
        >
          <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z"/>
        </svg>
      </button>

      {/* Popover */}
      {open && (
        <div
          role="listbox"
          aria-activedescendant={`field-type-${highlight}`}
          className="absolute z-20 mt-2 w-full rounded-xl border border-border bg-surface shadow-lg p-1"
        >
          <div ref={listRef} className="max-h-72 overflow-y-auto py-1">
            {OPTIONS.map((opt, i) => {
              const active = i === highlight;
              const selected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  id={`field-type-${i}`}
                  data-index={i}
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => setHighlight(i)}
                  onClick={() => { onChange(opt.value); setOpen(false); btnRef.current?.focus(); }}
                  className={`w-full text-left flex items-center gap-3 rounded-lg px-2.5 py-2 transition
                    ${active ? "bg-primary-100" : "hover:bg-background-100"}
                    ${selected ? "ring-1 ring-primary-600" : ""}
                  `}
                >
                  <span className={`grid h-8 w-8 place-content-center rounded-md ${active ? "bg-primary-200" : "bg-background-200"} font-semibold`}>
                    {opt.glyph}
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-medium">{opt.label}</span>
                    <span className="block text-xs text-foreground-500">{opt.description}</span>
                  </span>
                  {selected && (
                    <svg className="h-5 w-5 text-primary-700" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.001 7a1 1 0 0 1-1.414 0l-3.002-3a1 1 0 1 1 1.415-1.415l2.295 2.293 6.294-6.293a1 1 0 0 1 1.407.001z" clipRule="evenodd"/>
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
