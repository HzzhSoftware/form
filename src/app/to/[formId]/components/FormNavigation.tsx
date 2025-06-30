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
        className="px-5 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Back
      </button>
      {isLast ? (
        <button
          onClick={submit}
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Submit
        </button>
      ) : (
        <button
          onClick={next}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Next
        </button>
      )}
    </div>
  )
}