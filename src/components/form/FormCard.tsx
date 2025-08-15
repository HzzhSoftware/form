"use client";

import React, { useEffect } from "react";
import { useFormContext } from "./FormContext";
import { AnimatePresence, motion } from "framer-motion";
import FieldInput from "./fields/FieldInput";
import FormLoading from "./FormLoading";

export default function FormCard() {
  const {
    values,
    errors,
    handleChange,
    currentCardIdx,
    direction,
    form,
    next,
    submit,
    isSubmitting,
  } = useFormContext();

  const card = form.cards[currentCardIdx];

  const allRequiredFilled = card.fields
    ?.filter((f) => f.isRequired)
    .every((f) => values[f.id]?.toString().trim() !== "" || values[f.id] === undefined);

  const handleNext = () => {
    if (allRequiredFilled) {
      next();
    }
  };

  return (
    <div className="relative w-full p-6 min-h-[400px] overflow-hidden">
      {isSubmitting && <FormLoading message="Submitting..." />}
      <AnimatePresence mode="wait">
        <motion.div
          key={card.id}
          initial={{ y: direction > 0 ? 100 : -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: direction > 0 ? -100 : 100, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* Card Title and Description */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-primary-900">{card.title}</h2>
            {card.description && (
              <p className="text-gray-600 text-base">{card.description}</p>
            )}
          </div>

          {card.fields?.map((field) => (
            <div key={field.id}>
              <label className="block text-sm font-medium mb-1 text-primary-800">
                {field.label}
                {field.isRequired && <span className="text-red-500 ml-1">*</span>}
              </label>
              <FieldInput
                field={field}
                value={values[field.id] ?? ""}
                onChange={(val) => handleChange(field.id, val)}
              />
              {errors[field.id] && (
                <p className="text-red-500 text-sm">{errors[field.id]}</p>
              )}
            </div>
          ))}
          <FormNavigationButton
            isLastCard={currentCardIdx === form.cards.length - 1}
            allRequiredFilled={allRequiredFilled}
            onNext={handleNext}
            onSubmit={submit}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

interface FormNavigationButtonProps {
  isLastCard: boolean;
  allRequiredFilled: boolean;
  onNext: () => void;
  onSubmit: () => void;
}

function FormNavigationButton({
  isLastCard,
  allRequiredFilled,
  onNext,
  onSubmit,
}: FormNavigationButtonProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && allRequiredFilled) {
        isLastCard ? onSubmit() : onNext();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [allRequiredFilled, isLastCard, onNext, onSubmit]);

  return (
    <button
      onClick={isLastCard ? onSubmit : onNext}
      disabled={!allRequiredFilled}
      className={`btn ${
        !allRequiredFilled
          ? "opacity-50 bg-neutral-500 cursor-not-allowed"
          : "btn-primary"
      }`}
    >
      {isLastCard ? "Submit" : "Press Enter to Continue"}
    </button>
  );
}
