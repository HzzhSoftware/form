"use client";

import React, { useMemo, useState } from "react";
import type { Card } from "@hzzhsoftware/types-form";

import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { PointerSensorOptions } from "@dnd-kit/core";

// --- Prevent drag starting on interactive controls
function isInteractive(el: HTMLElement | null): boolean {
  if (!el) return false;
  return !!el.closest(
    'input,textarea,select,button,[contenteditable="true"],label,a'
  );
}

// --- Correctly typed custom PointerSensor
class SafePointerSensor extends PointerSensor {
  static activators: Array<{
    eventName: "onPointerDown";
    handler: (
      event: React.PointerEvent<Element>,
      options: PointerSensorOptions
    ) => boolean;
  }> = [
    {
      eventName: "onPointerDown" as const,
      handler: (event, { onActivation }) => {
        const target = event.nativeEvent.target as HTMLElement | null;
        if (isInteractive(target)) return false;
        onActivation?.({ event: event as unknown as Event });
        return true;
      },
    },
  ];
}

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
  const [isDragging, setIsDragging] = useState(false);

  const sensors = useSensors(
    useSensor(SafePointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor)
  );

  const ids = useMemo(() => cards.map((c) => c.id), [cards]);

  const onDragStart = (_e: DragStartEvent) => setIsDragging(true);

  const onDragEnd = (e: DragEndEvent) => {
    setIsDragging(false);
    const activeId = e.active.id as string;
    const overId = e.over?.id as string | undefined;
    if (!overId || activeId === overId) return;

    const from = cards.findIndex((c) => c.id === activeId);
    const to = cards.findIndex((c) => c.id === overId);
    if (from < 0 || to < 0) return;

    const next = arrayMove(cards, from, to);
    onReorder(next);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {cards.map((card, index) => (
            <SortableCardRow
              key={card.id}
              id={card.id}
              index={index}
              title={card.title || `Card ${index + 1}`}
              isActive={currentCardId === card.id}
              onClick={() => {
                // Avoid selecting during a drag
                if (!isDragging) onSelect(card.id);
              }}
              onDelete={() => onDelete(card.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

// --- Sortable item for each card (whole row is draggable)
function SortableCardRow({
  id,
  index,
  title,
  isActive,
  onClick,
  onDelete,
}: {
  id: string;
  index: number;
  title: string;
  isActive: boolean;
  onClick: () => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 10 : undefined,
    boxShadow: isDragging ? "0 8px 20px rgba(0,0,0,0.12)" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div
        {...attributes}
        {...listeners}
        onClick={onClick}
        className={`flex items-center space-x-2 p-2 rounded select-none transition-colors cursor-grab active:cursor-grabbing ${
          isActive
            ? "bg-primary-100 border border-primary-300"
            : "bg-neutral-100 hover:bg-neutral-200"
        }`}
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
          aria-hidden="true"
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
          {title}
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-1 rounded hover:bg-red-50"
          aria-label="Delete card"
          title="Delete card"
        >
          <svg
            className="w-4 h-4 text-neutral-500 hover:text-red-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
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
    </div>
  );
}