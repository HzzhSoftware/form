"use client";

const DRAG_DEADZONE_PX = 6;

import React, { useMemo, useRef, useState, useLayoutEffect } from "react";
import type { Card } from "@hzzhsoftware/types-form";

type Props = {
  cards: Card[];
  currentCardId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onReorder: (cards: Card[]) => void;
};

export default function DraggableCardList({
  cards,
  currentCardId,
  onSelect,
  onDelete,
  onReorder,
}: Props) {
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragDy, setDragDy] = useState(0);
  const [fromIndex, setFromIndex] = useState<number>(-1);
  const [toIndex, setToIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef(new Map<string, HTMLDivElement>());
  const positions = useRef<{ id: string; top: number; height: number }[]>([]);

  // Measure items each render to keep midpoints correct
  useLayoutEffect(() => {
    positions.current = cards.map((c) => {
      const el = itemRefs.current.get(c.id)!;
      const r = el.getBoundingClientRect();
      return { id: c.id, top: r.top, height: r.height };
    });
  }, [cards]);

  const handlePointerDown = (e: React.PointerEvent, id: string) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    const startIdx = cards.findIndex((c) => c.id === id);
    setDragId(id);
    setFromIndex(startIdx);
    setToIndex(startIdx);
    setDragDy(0);
  };

const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragId) return;
    e.preventDefault();
  
    const dy = e.movementY + dragDy;
    setDragDy(dy);
  
    const idx = cards.findIndex((c) => c.id === dragId);
    const draggedMetrics = positions.current[idx];
    if (!draggedMetrics) return;
  
    const draggedMid = draggedMetrics.top + draggedMetrics.height / 2 + dy;
  
    const others = positions.current
      .map((p, i) => ({ ...p, i }))
      .filter((p) => p.i !== idx);
  
    // Find where the dragged midpoint would be inserted among the others
    let insert = others.findIndex((p) => draggedMid < p.top + p.height / 2);
    if (insert === -1) insert = others.length;
  
    // Translate "others index" back into the full array index space
    // If inserting after the original idx, shift by +1
    let newIndex = insert <= idx ? insert : insert;
  
    // When inserting after original idx, we actually place it at (insert)
    // which is the visual position after removing the dragged. But in the
    // full array, indices after the original idx are offset by +1.
    if (insert > idx) newIndex = insert;
  
    // Snap back to original slot if we're close (deadzone)
    const dyAbs = Math.abs(dy);
    if (dyAbs <= DRAG_DEADZONE_PX) {
      newIndex = idx;
    }
  
    setToIndex(newIndex);
  };
  

  const handlePointerUp = () => {
    if (dragId == null) return;
    const next = reorder(cards, fromIndex, toIndex);
    setDragId(null);
    setDragDy(0);
    setFromIndex(-1);
    setToIndex(-1);
    if (fromIndex !== toIndex) onReorder(next);
  };

const transforms = useMemo(() => {
    const m = new Map<string, string>();
    if (dragId == null || fromIndex < 0 || toIndex < 0) return m;
    if (toIndex === fromIndex) return m; // clears shifts immediately
  
    for (let i = 0; i < cards.length; i++) {
      const id = cards[i].id;
      if (id === dragId) continue;
  
      if (toIndex > fromIndex) {
        if (i > fromIndex && i <= toIndex) {
          const h = positions.current[i]?.height ?? 0;
          m.set(id, `translateY(${-h}px)`);
        }
      } else {
        if (i >= toIndex && i < fromIndex) {
          const h = positions.current[i]?.height ?? 0;
          m.set(id, `translateY(${h}px)`);
        }
      }
    }
    return m;
  }, [cards, dragId, fromIndex, toIndex, dragDy]);
  

  return (
    <div ref={containerRef} className="space-y-3">
      {cards.map((card, index) => {
        const isActive = currentCardId === card.id;
        const isDragging = dragId === card.id;
        const refCallback = (el: HTMLDivElement | null) => {
          if (!el) itemRefs.current.delete(card.id);
          else itemRefs.current.set(card.id, el);
        };

        return (
          <div
            key={card.id}
            ref={refCallback}
            // dragging styles
            style={{
              transform: isDragging
                ? `translateY(${dragDy}px)`
                : transforms.get(card.id) ?? "translateY(0px)",
              transition: isDragging ? "none" : "transform 160ms ease",
              zIndex: isDragging ? 10 : 0,
              boxShadow: isDragging ? "0 8px 20px rgba(0,0,0,0.12)" : "none",
              cursor: "grab",
              touchAction: "none",
            }}
            onPointerDown={(e) => handlePointerDown(e, card.id)}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={`flex items-center space-x-2 p-2 rounded transition-colors select-none ${
              isActive
                ? "bg-primary-100 border border-primary-300"
                : "bg-neutral-100 hover:bg-neutral-200"
            }`}
            onClick={(e) => {
              // Avoid click-selection immediately after a drag (tiny drags count as click otherwise)
              if (!dragId) onSelect(card.id);
            }}
          >
            <div
              className={`w-6 h-6 rounded flex items-center justify-center text-white text-xs font-medium ${
                isActive ? "bg-primary-600" : "bg-primary-500"
              }`}
            >
              {index + 1}
            </div>

            <svg
              className="w-4 h-4 text-neutral-500 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>

            <span
              className={`text-sm flex-1 truncate ${
                isActive ? "text-primary-on-600" : "text-primary-600"
              }`}
            >
              {card.title || `Card ${index + 1}`}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(card.id);
              }}
              className="hover:cursor-pointer"
              aria-label="Delete card"
            >
              <svg
                className="w-4 h-4 text-neutral-500 hover:text-red-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        );
      })}
    </div>
  );
}

function reorder<T>(arr: T[], from: number, to: number) {
  if (from === to || from < 0 || to < 0) return arr;
  const next = arr.slice();
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}
