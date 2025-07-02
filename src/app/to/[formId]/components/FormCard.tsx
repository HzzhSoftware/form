"use client";

import React from "react";
import { useFormContext } from "../FormContext";
import { AnimatePresence, motion } from "framer-motion";

export default function FormCard() {
  const {
    values,
    errors,
    handleChange,
    currentCardIdx,
    direction,
    form
  } = useFormContext();

  const card = form.cards[currentCardIdx];

  return (
    <div className="relative w-full p-6 min-h-[400px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={card.id}
          initial={{ y: direction > 0 ? 100 : -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: direction > 0 ? 100 : -100, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {card.fields?.map((field) => (
            <div key={field.id}>
              <label className="block text-sm font-medium mb-1">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              <input
                type={field.type || "text"}
                value={values[field.id] ?? ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
                required={field.required}
                className="w-full border-b p-3"
              />
              {errors[field.id] && (
                <p className="text-red-500 text-sm">{errors[field.id]}</p>
              )}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
