import React from 'react'
import { useFormContext } from "../FormContext";

export default function FormNavigation() {
    const {
        back,
        next,
        submit,
        currentCardIdx,
        totalCards,
    } = useFormContext();

    const isFirst = currentCardIdx === 0;
    const isLast = currentCardIdx === totalCards - 1;

  return (
    <div className="absolute bottom-4 left-0 right-0 flex justify-between items-center px-6">
      <button
        onClick={back}
        disabled={isFirst}
        className="px-5 py-2 bg-background-200 rounded disabled:opacity-50"
      >
        Back
      </button>
      {isLast ? (
        <button
          onClick={submit}
          className="btn btn-secondary"
        >
          Submit
        </button>
      ) : (
        <button
          onClick={next}
          className="btn btn-primary"
        >
          Next
        </button>
      )}
    </div>
  )
}