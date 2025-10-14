"use client"

import React, { useState, useEffect, useMemo } from 'react'
import { Card, FormFieldType } from '@hzzhsoftware/types-form'
import FieldConstructor from '../../../components/form/fields/FieldConstructor'
import { useFormBuilderContext } from '../components/FormBuilderContext';
import { v4 as uuidv4 } from 'uuid';
import FieldTypeSelector from './FieldTypeSelector';

import type { PointerSensorOptions } from '@dnd-kit/core';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

/** Check if element is interactive (should not start drag). */
function isInteractive(el: HTMLElement | null): boolean {
  if (!el) return false;
  // Allow drag handle buttons to work, but block other interactive elements
  if (el.closest('button[title="Drag to reorder"]')) return false;
  return !!el.closest('input,textarea,select,button,[contenteditable="true"],label,a');
}

/** Custom PointerSensor: block starting drags on interactive controls. */
class SafePointerSensor extends PointerSensor {
  static activators: Array<{
    eventName: 'onPointerDown';
    handler: (
      event: React.PointerEvent<Element>,
      options: PointerSensorOptions
    ) => boolean;
  }> = [
    {
      eventName: 'onPointerDown',
      handler: (event, { onActivation }) => {
        const target = event.nativeEvent.target as HTMLElement | null;
        if (isInteractive(target)) return false;
        onActivation?.({ event: event as unknown as Event });
        return true;
      },
    },
  ];
}

/** Custom KeyboardSensor: ignore key activation when focused in inputs, so Space works. */
class SafeKeyboardSensor extends KeyboardSensor {
  static activators = [
    {
      eventName: 'onKeyDown' as const,
      handler: (event: React.KeyboardEvent<Element>) => {
        const target = event.target as HTMLElement | null;
        if (isInteractive(target)) return false; // don't capture space/arrow keys in inputs
        return true;
      },
    },
  ];
}

interface CardConstructorProps {
  card: Card;
}

function SortableField({
  id,
  isActive,
  onSelect,
  onDelete,
  children,
}: {
  id: string;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      {/* Entire card is draggable (SafePointerSensor prevents starting drag on controls) */}
      <div
        className={`border-2 rounded-lg p-4 transition-all duration-200 ${
          isActive
            ? 'border-primary-500 bg-neutral-200'
            : 'border-dashed border-neutral-200 hover:border-primary-300 hover:bg-neutral-50 cursor-grab active:cursor-grabbing'
        }`}
        onClick={onSelect}
        {...attributes}
        {...listeners}
      >
        {children}
      </div>

      {/* Top-right controls */}
      <div className="absolute top-2 right-2 flex gap-1">
        {/* Drag handle (also draggable) */}
        <button
          type="button"
          title="Drag to reorder"
          aria-label="Drag to reorder"
          className="p-1 rounded border border-neutral-300 bg-white/80 text-neutral-500 hover:text-neutral-700 hover:bg-white shadow-sm cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition sm:opacity-100"
          {...attributes}
          {...listeners}
          onClick={(e) => e.stopPropagation()}
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <circle cx="6" cy="6" r="1.5" /><circle cx="6" cy="10" r="1.5" /><circle cx="6" cy="14" r="1.5" />
            <circle cx="10" cy="6" r="1.5" /><circle cx="10" cy="10" r="1.5" /><circle cx="10" cy="14" r="1.5" />
          </svg>
        </button>

        {/* Delete */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="p-1 rounded text-neutral-400 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition sm:opacity-100"
          title="Delete field"
          aria-label="Delete field"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

const CardConstructor: React.FC<CardConstructorProps> = ({ card }) => {
  const { currentCardId, currentFieldId, setCurrentFieldId, updateLocalForm } = useFormBuilderContext();
  const [title, setTitle] = useState(card.title || "Your question here.");
  const [description, setDescription] = useState((card as any).description || "Description (optional)");

  useEffect(() => {
    setTitle(card.title || "Your question here.");
    setDescription((card as any).description || "Description (optional)");
  }, [card]);

  const sensors = useSensors(
    useSensor(SafePointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(SafeKeyboardSensor)
  );

  const fieldIds = useMemo(() => card.fields.map(f => f.fieldId), [card.fields]);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    updateLocalForm(form => ({
      ...form,
      cards: form.cards.map(c => c.cardId === currentCardId ? { ...c, title: newTitle } : c)
    }));
  };

  const handleDescriptionChange = (newDescription: string) => {
    setDescription(newDescription);
    updateLocalForm(form => ({
      ...form,
      cards: form.cards.map(c => c.cardId === currentCardId ? { ...c, description: newDescription } : c)
    }));
  };

  const handleFieldChange = (fieldId: string, value: string) => {
    updateLocalForm(form => ({
      ...form,
      cards: form.cards.map(c => c.cardId === currentCardId ? {
        ...c,
        fields: c.fields.map(field => field.fieldId === fieldId ? { ...field, value } : field)
      } : c)
    }));
  };

  const handleFieldOptionsChange = (fieldId: string, options: string[]) => {
    updateLocalForm(form => ({
      ...form,
      cards: form.cards.map(c => c.cardId === currentCardId ? {
        ...c,
        fields: c.fields.map(field => field.fieldId === fieldId ? { ...field, options } : field)
      } : c)
    }));
  };

  const handleFieldUpdate = (fieldId: string, updates: Partial<any>) => {
    updateLocalForm(form => ({
      ...form,
      cards: form.cards.map(c => c.cardId === currentCardId ? {
        ...c,
        fields: c.fields.map(field => field.fieldId === fieldId ? { ...field, ...updates } : field)
      } : c)
    }));
  };

  const handleFieldLabelChange = (fieldId: string, newLabel: string) => {
    updateLocalForm(form => ({
      ...form,
      cards: form.cards.map(c => c.cardId === currentCardId ? {
        ...c,
        fields: c.fields.map(field => field.fieldId === fieldId ? { ...field, label: newLabel } : field)
      } : c)
    }));
  };

  const handleDeleteField = (fieldId: string) => {
    updateLocalForm(form => ({
      ...form,
      cards: form.cards.map(c =>
        c.cardId === currentCardId
          ? { ...c, fields: c.fields.filter(field => field.fieldId !== fieldId) }
          : c
      )
    }));
  };

  const handleAddField = (fieldType: FormFieldType) => {
    const createField = (type: FormFieldType) => {
      const baseField = {
        fieldId: uuidv4(),
        type,
        label: `New ${type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} Field`,
        isRequired: false,
      };

      switch (type) {
        case 'multiple_choice':
        case 'multiple_select':
          return {
            ...baseField,
            options: ['Option 1', 'Option 2', 'Option 3'],
            allowMultiple: false,
            isRandomized: false,
            allowOther: false,
            isVerticalAlignment: false,
          };
        case 'uploader':
          return { ...baseField, allowMultiple: false, uploadService: 'local' as const };
        case 'static':
          return { ...baseField, title: 'Static Content Title', description: 'Optional description text', image: '' };
        default:
          return baseField;
      }
    };

    const newField = createField(fieldType);
    updateLocalForm(form => ({
      ...form,
      cards: form.cards.map(c =>
        c.cardId === currentCardId ? { ...c, fields: [...c.fields, newField as any] } : c
      )
    }));
  };

  const onDragEnd = (event: DragEndEvent) => {
    const activeId = event.active.id as string;
    const overId = event.over?.id as string | undefined;
    if (!overId || activeId === overId) return;

    const startIndex = card.fields.findIndex(f => f.fieldId === activeId);
    const endIndex = card.fields.findIndex(f => f.fieldId === overId);
    if (startIndex === -1 || endIndex === -1) return;

    const reordered = arrayMove(card.fields, startIndex, endIndex);

    updateLocalForm(form => ({
      ...form,
      cards: form.cards.map(c =>
        c.cardId === currentCardId ? { ...c, fields: reordered } : c
      )
    }));

    if (currentFieldId === activeId) setCurrentFieldId(activeId);
  };

  return (
    <div className="w-full space-y-6">
      {/* Card Title */}
      <div className="space-y-2">
        <input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="w-full bg-transparent text-lg font-medium border-none outline-none placeholder-neutral-400 focus:ring-0"
          placeholder="Your question here."
        />
        <input
          type="text"
          value={description}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          className="w-full bg-transparent text-sm border-none outline-none placeholder-neutral-500 focus:ring-0"
          placeholder="Description (optional)"
        />
      </div>

      {/* Fields */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={fieldIds} strategy={verticalListSortingStrategy}>
          <div className="space-y-6 relative">
            {card.fields.map((field) => (
              <SortableField
                key={field.fieldId}
                id={field.fieldId}
                isActive={field.fieldId === currentFieldId}
                onSelect={() => setCurrentFieldId(field.fieldId)}
                onDelete={() => handleDeleteField(field.fieldId)}
              >
                <FieldConstructor
                  field={field}
                  onChange={(val) => handleFieldChange(field.id, val)}
                  onOptionsChange={(options) => handleFieldOptionsChange(field.id, options)}
                  onFieldUpdate={(updates) => handleFieldUpdate(field.id, updates)}
                  onLabelChange={(label) => handleFieldLabelChange(field.id, label)}
                />
              </SortableField>
            ))}

            {card.fields.length === 0 && (
              <div className="text-center py-8 text-neutral-500 text-sm">
                No fields added yet. Click on a field type to add one.
              </div>
            )}
          </div>
        </SortableContext>
      </DndContext>

      {/* Add Field */}
      <FieldTypeSelector onAddField={handleAddField} />
    </div>
  );
}

export default CardConstructor
